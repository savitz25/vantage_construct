import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PRIMARY_HOST,
  buildPrimaryUrl,
  isSecondaryHost,
} from "@/lib/domain-migration";

/**
 * Priority 0 host migration:
 * - vantageconstruct.com (+ www) → 301 to vantagecustombuilds.com (path-mapped)
 * - www.vantagecustombuilds.com → 301 to apex vantagecustombuilds.com
 *
 * Requires secondary domain DNS to point at this Vercel project.
 * Until DNS is moved, apply the same map on WordPress hosting (see docs/PRIORITY-0-DOMAIN.md).
 */
export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const host = hostHeader.toLowerCase().split(":")[0] ?? "";
  const { pathname, search } = request.nextUrl;

  // Secondary domain: always 301 to primary with path map (page-by-page, never blanket homepage-only)
  if (isSecondaryHost(host) && host !== PRIMARY_HOST) {
    // www.custombuilds is in SECONDARY_HOSTS for apex normalization
    if (host === `www.${PRIMARY_HOST}`) {
      const url = request.nextUrl.clone();
      url.host = PRIMARY_HOST;
      url.protocol = "https:";
      return NextResponse.redirect(url, 301);
    }

    // vantageconstruct.com → custombuilds
    if (host === "vantageconstruct.com" || host === "www.vantageconstruct.com") {
      return NextResponse.redirect(buildPrimaryUrl(pathname, search), 301);
    }
  }

  // Apex force for primary www (if not already handled)
  if (host === `www.${PRIMARY_HOST}`) {
    const url = request.nextUrl.clone();
    url.host = PRIMARY_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
