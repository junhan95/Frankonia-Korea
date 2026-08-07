import type { NextConfig } from "next";

// The default build targets a Node server (Vercel or self-hosted). Setting
// STATIC_EXPORT=1 switches to a plain static build for GitHub Pages, so both
// deployment targets keep working from the same source.
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath: basePath || undefined,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
