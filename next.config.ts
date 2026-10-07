import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All internal links and canonical URLs use a trailing slash (/[city]/[service]/),
  // so make that the canonical form instead of redirecting it away.
  trailingSlash: true,
};

export default nextConfig;
