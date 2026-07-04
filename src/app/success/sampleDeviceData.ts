export const sampleDeviceData = {
  udid: "00008101-000A1C3E1234567E",
  model: "iPhone 15 Pro",
  version: "iOS 17.4.1 (21E236)",
  serial: "F2LXN4KDJKLF",
  product: "iPhone16,1",
  imei: "353456789012345",
  meid: "A100000A2BC4D6",
};

export const SAMPLE_RESULT_QUERY_PARAM = "RESULT_SOURCE";
export const SAMPLE_RESULT_SOURCE = "sample";

export const sampleDeviceSuccessUrl = `/success?${new URLSearchParams({
  UDID: sampleDeviceData.udid,
  IMEI: sampleDeviceData.imei,
  MEID: sampleDeviceData.meid,
  PRODUCT: sampleDeviceData.product,
  [SAMPLE_RESULT_QUERY_PARAM]: SAMPLE_RESULT_SOURCE,
  SERIAL: sampleDeviceData.serial,
  VERSION: sampleDeviceData.version,
}).toString()}`;
