import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { recordApiResult } from "@/lib/observability/server";
import { buildSignedProfile, replacePlaceholdersInConfig } from "@/utils/signProfile";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const startedAt = performance.now();
  const requestId = req.headers.get("x-vercel-id");

  try {
    const url = new URL(req.url);
    const actualURL = `${url.protocol}//${url.host}/api/retrieve/`;

    const unsignedConfig = await Sentry.startSpan(
      { name: "Fetch unsigned mobileconfig", op: "http.client" },
      async () => {
        const response = await fetch(
          new URL(
            "/register.unsigned.mobileconfig",
            process.env.NEXT_PUBLIC_BASE_URL ?? url.origin
          ),
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error(`Unsigned profile fetch failed: ${response.status}`);
        return Buffer.from(await response.arrayBuffer());
      }
    );

    const prepared = replacePlaceholdersInConfig(unsignedConfig, actualURL);
    const der = await Sentry.startSpan(
      { name: "Sign iOS configuration profile", op: "profile.sign" },
      () => buildSignedProfile(prepared)
    );

    Sentry.addBreadcrumb({
      category: "udid-flow",
      message: "Signed profile generated",
      data: { profile_size: der.length, stage: "profile_signed" },
    });
    recordApiResult({
      durationMs: performance.now() - startedAt,
      requestId,
      route: "/api/register.signed.mobileconfig",
      status: 200,
    });

    return new NextResponse(der, {
      headers: {
        "Content-Type": "application/x-apple-aspen-config; charset=utf-8",
        "Content-Disposition": 'attachment; filename="register.signed.mobileconfig"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    Sentry.captureException(e, {
      tags: { flow: "udid_retrieval", stage: "generate_signed_profile" },
    });
    recordApiResult({
      durationMs: performance.now() - startedAt,
      errorType: e instanceof Error ? e.name : "unknown_error",
      requestId,
      route: "/api/register.signed.mobileconfig",
      status: 500,
    });
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
