import { NextRequest, NextResponse } from "next/server";

const FD_HOSTS = new Set([
  "fd.antidotetransform.com",
  "fd.localhost",
  "fd.localhost:3000",
]);

function isFdHost(host: string | null): boolean {
  if (!host) return false;
  const bare = host.split(":")[0]!.toLowerCase();
  return (
    FD_HOSTS.has(host.toLowerCase()) ||
    FD_HOSTS.has(bare) ||
    bare === "fd.antidotetransform.com"
  );
}

/**
 * fd.antidotetransform.com serves the Forward Deployed site at `/`
 * (rewrites to /mock/forward-deployed/...). Nested paths keep their
 * segments so client routing can deep-link offerings and pages.
 *
 * On the main marketing host, legacy `/transformation` still maps to
 * the pillar page `/forward-deployed`.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;

  if (!isFdHost(host)) {
    if (pathname === "/transformation" || pathname.startsWith("/transformation/")) {
      const url = request.nextUrl.clone();
      url.pathname = "/forward-deployed";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Leave Next internals + static files alone (including /mock/*.json assets)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/mock/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    const res = NextResponse.next();
    res.headers.set("x-antidote-site", "fd");
    return res;
  }

  // Legacy /forward-deployed on the FD host → hub (or nested path without prefix)
  if (pathname === "/forward-deployed" || pathname.startsWith("/forward-deployed/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/forward-deployed".length) || "/";
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/"
      ? "/mock/forward-deployed"
      : `/mock/forward-deployed${pathname}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("x-antidote-site", "fd");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
