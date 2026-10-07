import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site is deployed as plain HTML/CSS/JS to shared PHP hosting (Jino),
  // which has no Node.js runtime. The lead form posts to lead.php instead of a Next.js API route.
  output: "export",
  // All internal links and canonical URLs use a trailing slash (/[city]/[service]/),
  // so make that the canonical form instead of redirecting it away.
  trailingSlash: true,
  // Static export has no image-optimization server to call.
  images: { unoptimized: true },
};

export default nextConfig;
