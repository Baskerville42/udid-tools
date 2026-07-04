const DEFAULT_HOST = "www.udid.tools";
const DEFAULT_KEY = "e67fc0a36f388fc28107bace704aae67029e7c53858f74abbad717c694e31052";

const host = process.env.INDEXNOW_HOST ?? DEFAULT_HOST;
const key = process.env.INDEXNOW_KEY ?? DEFAULT_KEY;
const endpoint = process.env.INDEXNOW_ENDPOINT ?? "https://api.indexnow.org/indexnow";
const sitemapUrl = process.env.INDEXNOW_SITEMAP_URL ?? `https://${host}/sitemap.xml`;
const keyLocation = process.env.INDEXNOW_KEY_LOCATION ?? `https://${host}/${key}.txt`;
const dryRun = process.argv.includes("--dry-run");

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "UDIDTools-IndexNow/1.0 (+https://www.udid.tools)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function readLocValues(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) =>
    match[1].trim().replace(/&amp;/g, "&"),
  );
}

async function readSitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) {
    return [];
  }

  seen.add(url);

  const xml = await fetchText(url);
  const locations = readLocValues(xml);

  if (xml.includes("<sitemapindex")) {
    const nested = await Promise.all(locations.map((location) => readSitemapUrls(location, seen)));
    return nested.flat();
  }

  return locations;
}

function uniquePublicUrls(urls) {
  return [
    ...new Set(
      urls.filter((url) => {
        try {
          const parsed = new URL(url);
          return parsed.hostname === host && !parsed.pathname.startsWith("/success");
        } catch {
          return false;
        }
      }),
    ),
  ];
}

function chunk(values, size) {
  const chunks = [];

  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }

  return chunks;
}

async function submitUrls(urlList) {
  const body = {
    host,
    key,
    keyLocation,
    urlList,
  };

  if (dryRun) {
    console.log(JSON.stringify(body, null, 2));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`IndexNow rejected ${urlList.length} URL(s): ${response.status} ${text}`);
  }

  console.log(`Submitted ${urlList.length} URL(s) to IndexNow.`);
}

const sitemapUrls = await readSitemapUrls(sitemapUrl);
const urls = uniquePublicUrls(sitemapUrls);

if (urls.length === 0) {
  throw new Error(`No URLs found in ${sitemapUrl}`);
}

for (const urlList of chunk(urls, 10000)) {
  await submitUrls(urlList);
}
