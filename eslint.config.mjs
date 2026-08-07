import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 dropped `next lint`, so ESLint runs directly against this flat
// config — `npm run lint`.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
  {
    // app/cybershield is ported from the product site and re-synced by copying
    // (see app/cybershield/landing.tsx), so it carries no local suppressions.
    // next/image has nothing to offer it either: the static export runs with
    // images.unoptimized, which emits the same <img> with more around it.
    files: ["app/cybershield/**"],
    rules: { "@next/next/no-img-element": "off" },
  },
]);
