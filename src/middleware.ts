import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.udid.tools";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const needsHostFix = url.hostname !== CANONICAL_HOST;
  const needsHttps = url.protocol !== "https:";

  if (needsHostFix || needsHttps) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml|sitemap-\\d+\\.xml).*)"],
};
