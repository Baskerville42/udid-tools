import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { recordApiResult } from "@/lib/observability/server";
import { createQueryStringFromDict, parseXMLData } from "@/utils/retrieveData";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const startedAt = performance.now();
  const requestId = request.headers.get("x-vercel-id");

  try {
    const data = await request.text();
    Sentry.addBreadcrumb({
      category: "udid-flow",
      message: "Received profile response",
      data: { payload_size: data.length, stage: "profile_response_received" },
    });

    const result = await Sentry.startSpan(
      { name: "Parse iOS profile response", op: "profile.parse" },
      () => parseXMLData(data)
    );

    const dict = result?.plist?.dict?.[0];
    if (!dict) {
      recordApiResult({
        durationMs: performance.now() - startedAt,
        errorType: "malformed_payload",
        requestId,
        route: "/api/retrieve",
        status: 400,
      });
      return NextResponse.json({ error: "Malformed XML payload" }, { status: 400 });
    }

    const queryString = await Sentry.startSpan(
      { name: "Prepare device result", op: "profile.transform" },
      () => createQueryStringFromDict(dict)
    );

    const url = new URL(`/success?${queryString}`, request.url);
    recordApiResult({
      durationMs: performance.now() - startedAt,
      requestId,
      route: "/api/retrieve",
      status: 301,
    });
    return NextResponse.redirect(url, 301);
  } catch (err) {
    Sentry.captureException(err, {
      tags: { flow: "udid_retrieval", stage: "parse_profile_response" },
    });
    recordApiResult({
      durationMs: performance.now() - startedAt,
      errorType: err instanceof Error ? err.name : "unknown_error",
      requestId,
      route: "/api/retrieve",
      status: 500,
    });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
