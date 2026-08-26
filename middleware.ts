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
 * (rewrites to /mock/forward-deployed). The /mock/... URL stays on the main site.
 */
export function middleware(request: NextRequest) {
  if (!isFdHost(request.headers.get("host"))) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

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

  const url = request.nextUrl.clone();
  url.pathname = "/mock/forward-deployed";
  const res = NextResponse.rewrite(url);
  res.headers.set("x-antidote-site", "fd");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
