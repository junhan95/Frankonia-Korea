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
      // A build directory of its own, because the two targets are routinely
      // used at the same time: you keep `next dev` open and run
      // `npm run build:static` to check the export. Both default to `.next`,
      // and the build rewrites the manifests the dev server is holding open —
      // after which every request it serves is a 500 (`SyntaxError: Unexpected
      // non-whitespace character after JSON`), with nothing wrong in the source
      // and nothing in the terminal to say a build did it. Restarting dev is
      // the fix, and never needing to is better. `out/` is unaffected: the
      // export lands there either way.
      distDir: ".next-static",
    }
  : {};

export default nextConfig;
