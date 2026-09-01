import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/case-studies",
        destination: "/forward-deployed",
        permanent: false,
      },
      {
        source: "/case-studies/:slug*",
        destination: "/forward-deployed",
        permanent: false,
      },
    ];
  },
  // /transformation → /forward-deployed is host-scoped in middleware
  // so fd.antidotetransform.com can own /transformation as an offering route.
};

export default nextConfig;
