import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.udid.tools";
const NOINDEX_HEADER_VALUE = "noindex, nofollow, noarchive, nosnippet";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (process.env.NODE_ENV === "development") return NextResponse.next();

  const needsHostFix = url.hostname !== CANONICAL_HOST;
  const needsHttps = url.protocol !== "https:";

  if (needsHostFix || needsHttps) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  if (url.pathname === "/success" || url.pathname.startsWith("/success/")) {
    response.headers.set("X-Robots-Tag", NOINDEX_HEADER_VALUE);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/|monitoring|favicon.ico|robots.txt|sitemap.xml|sitemap-\\d+\\.xml).*)"],
};
