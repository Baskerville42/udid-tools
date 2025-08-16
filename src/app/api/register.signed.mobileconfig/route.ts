import { NextResponse } from "next/server";
import { buildSignedProfile, replacePlaceholdersInConfig } from "@/utils/signProfile";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const actualURL = `${url.protocol}//${url.host}/api/retrieve/`;

    const unsignedConfig = await fetch(
      new URL("/register.unsigned.mobileconfig", process.env.NEXT_PUBLIC_BASE_URL ?? url.origin),
      { cache: "no-store" }
    )
      .then((r) => r.arrayBuffer())
      .then((b) => Buffer.from(b));

    const prepared = replacePlaceholdersInConfig(unsignedConfig, actualURL);
    const der = await buildSignedProfile(prepared);

    return new NextResponse(der, {
      headers: {
        "Content-Type": "application/x-apple-aspen-config; charset=utf-8",
        "Content-Disposition": 'attachment; filename="register.signed.mobileconfig"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("sign error", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
