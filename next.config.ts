import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // /transformation → /forward-deployed is host-scoped in middleware
  // so fd.antidotetransform.com can own /transformation as an offering route.
};

export default nextConfig;
