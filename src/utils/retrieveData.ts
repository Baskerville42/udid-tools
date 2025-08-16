import xml2js from "xml2js";

export interface PlistDictNode {
  key: string[];
  string?: string[];
  integer?: string[];
  date?: string[];
  dict?: PlistDictNode[];
  array?: unknown[];
  [k: string]: unknown;
}

export interface PlistXml {
  plist: {
    dict: PlistDictNode[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export type KnownUdidKeys = "IMEI" | "MEID" | "PRODUCT" | "SERIAL" | "UDID" | "VERSION";

export type QueryParamsStrict = Partial<Record<KnownUdidKeys, string>>;

export function parseXMLData(xmlData: string): Promise<PlistXml> {
  return new Promise((resolve, reject) => {
    const plistBegin = '<?xml version="1.0"';
    const plistEnd = "</plist>";

    const pos1 = xmlData.indexOf(plistBegin);
    const pos2 = xmlData.indexOf(plistEnd);
    const data = xmlData.substring(pos1, pos2 + plistEnd.length);

    const xmlParser = new xml2js.Parser();
    xmlParser.parseString(data, (err: Error | null, result: PlistXml) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function createQueryStringFromDict(dict: PlistDictNode): string {
  const keys = dict.key ?? [];
  const values = dict.string ?? [];

  const len = Math.min(keys.length, values.length);

  const params: QueryParamsStrict = {};
  for (let i = 0; i < len; i++) {
    const k = keys[i] as KnownUdidKeys;
    const v = String(values[i] ?? "");
    if (k) (params as QueryParamsStrict)[k] = v;
  }

  return new URLSearchParams(params).toString();
}
