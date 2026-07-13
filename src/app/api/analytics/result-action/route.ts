import { track } from "@vercel/analytics/server";
import { NextResponse } from "next/server";
import { PROFILE_RESULT_SOURCE, SAMPLE_RESULT_SOURCE } from "@/app/success/sampleDeviceData";

export const runtime = "nodejs";

const EVENT_NAMES = new Set(["result_page_viewed", "result_page_action"]);
const RESULT_SOURCES = new Set([SAMPLE_RESULT_SOURCE, PROFILE_RESULT_SOURCE]);

type AnalyticsPayload = {
  action?: unknown;
  button?: unknown;
  event_name?: unknown;
  field_count?: unknown;
  field_label?: unknown;
  field_type?: unknown;
  format?: unknown;
  has_device_info?: unknown;
  outcome?: unknown;
  result_source?: unknown;
  share_available?: unknown;
};

function stringValue(value: unknown) {
  return typeof value === "string" && value.length <= 80 ? value : undefined;
}

function booleanValue(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function fieldCountValue(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 20
    ? value
    : undefined;
}

export async function POST(request: Request) {
  let payload: AnalyticsPayload;

  try {
    payload = (await request.json()) as AnalyticsPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = stringValue(payload.event_name);
  const resultSource = stringValue(payload.result_source);

  if (!eventName || !EVENT_NAMES.has(eventName)) {
    return NextResponse.json({ error: "Invalid event_name" }, { status: 400 });
  }

  if (!resultSource || !RESULT_SOURCES.has(resultSource)) {
    return NextResponse.json({ error: "Invalid result_source" }, { status: 400 });
  }

  await track(
    eventName,
    {
      action: stringValue(payload.action),
      button: stringValue(payload.button),
      field_count: fieldCountValue(payload.field_count),
      field_label: stringValue(payload.field_label),
      field_type: stringValue(payload.field_type),
      format: stringValue(payload.format),
      has_device_info: booleanValue(payload.has_device_info),
      outcome: stringValue(payload.outcome),
      result_source: resultSource,
      share_available: booleanValue(payload.share_available),
    },
    {
      headers: {
        "user-agent": request.headers.get("user-agent") ?? undefined,
        "x-forwarded-for": request.headers.get("x-forwarded-for") ?? undefined,
      },
    }
  );

  return new NextResponse(null, { status: 204 });
}
