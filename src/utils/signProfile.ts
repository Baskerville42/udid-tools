import axios from "axios";
import forge from "node-forge";
import { randomUUID } from "crypto";

const APPLE_ROOT_CERT_URL = process.env.APPLE_ROOT_CERT_URL;
const APPLE_INTERMEDIATE_CERT_URL = process.env.APPLE_INTERMEDIATE_CERT_URL;

// Simple in-memory cache for Apple CAs
let cachedRootPem: string | null = null;
let cachedInterPem: string | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

function derToPem(buf: Buffer, label = "CERTIFICATE") {
  const b64 = buf.toString("base64");
  const wrapped = b64.match(/.{1,64}/g)?.join("\n") ?? b64;
  return `-----BEGIN ${label}-----\n${wrapped}\n-----END ${label}-----\n`;
}

async function fetchAppleCerts() {
  if (!APPLE_ROOT_CERT_URL || !APPLE_INTERMEDIATE_CERT_URL) {
    throw new Error("Apple cert URLs are not configured");
  }

  const now = Date.now();
  if (cachedRootPem && cachedInterPem && now - cachedAt < CACHE_TTL_MS) {
    return { rootPem: cachedRootPem, interPem: cachedInterPem };
  }
  const [rootRes, interRes] = await Promise.all([
    axios.get<ArrayBuffer>(APPLE_ROOT_CERT_URL, { responseType: "arraybuffer" }),
    axios.get<ArrayBuffer>(APPLE_INTERMEDIATE_CERT_URL, { responseType: "arraybuffer" }),
  ]);
  cachedRootPem = derToPem(Buffer.from(rootRes.data));
  cachedInterPem = derToPem(Buffer.from(interRes.data));
  cachedAt = now;
  return { rootPem: cachedRootPem!, interPem: cachedInterPem! };
}

function getSignerFromP12() {
  const p12b64 = process.env.MDM_SERVER_P12_BASE64;
  const pass = process.env.MDM_SERVER_P12_PASSCODE || "";
  if (!p12b64) throw new Error("MDM_SERVER_P12_BASE64 is not set");

  const p12Buf = Buffer.from(p12b64, "base64");
  const p12Asn1 = forge.asn1.fromDer(forge.util.createBuffer(p12Buf.toString("binary")));
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, pass);

  // Private key
  const keyBags =
    p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
      forge.pki.oids.pkcs8ShroudedKeyBag
    ] || p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag];

  if (!keyBags || keyBags.length === 0) {
    throw new Error("Private key not found in P12");
  }
  const privateKey = keyBags[0].key as forge.pki.PrivateKey;

  // Certs from P12 (first is signer)
  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
  if (!certBags || certBags.length === 0) {
    throw new Error("Certificate not found in P12");
  }
  const signerCert = certBags[0].cert as forge.pki.Certificate;

  const keyPem = forge.pki.privateKeyToPem(privateKey);
  const certPem = forge.pki.certificateToPem(signerCert);
  const extraPems = certBags
    .filter(hasCert)
    .map((b) => forge.pki.certificateToPem(b.cert))
    .filter((pem) => pem !== certPem);

  return { keyPem, certPem, extraPems };
}

export function replacePlaceholdersInConfig(buf: Buffer, actualURL: string): Buffer {
  let config = buf.toString("utf8");

  config = config.replace("{{RESPONSE_URL}}", actualURL);
  config = config.replace("{{PAYLOAD_UUID}}", randomUUID());

  return Buffer.from(config, "utf8");
}

export async function buildSignedProfile(unsignedConfig: Buffer) {
  const [{ rootPem, interPem }, { keyPem, certPem, extraPems }] = await Promise.all([
    fetchAppleCerts(),
    Promise.resolve(getSignerFromP12()),
  ]);

  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(unsignedConfig.toString("binary"));

  const signerCert = forge.pki.certificateFromPem(certPem);
  const privateKey = forge.pki.privateKeyFromPem(keyPem);
  p7.addCertificate(signerCert);
  [...extraPems, interPem, rootPem].forEach((pem) =>
    p7.addCertificate(forge.pki.certificateFromPem(pem))
  );

  p7.addSigner({
    key: privateKey,
    certificate: signerCert,
    digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime },
    ],
  });

  p7.sign({ detached: false });
  const der = forge.asn1.toDer(p7.toAsn1()).getBytes();
  return Buffer.from(der, "binary");
}

function hasCert(bag: forge.pkcs12.Bag): bag is forge.pkcs12.Bag & { cert: forge.pki.Certificate } {
  return !!bag.cert;
}
