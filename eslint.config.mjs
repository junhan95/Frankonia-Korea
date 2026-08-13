import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 dropped `next lint`, so ESLint runs directly against this flat
// config — `npm run lint`.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // `.next-static` is the static export's build directory — see the note on
  // `distDir` in next.config.ts. Build output, same as `.next`.
  globalIgnores([".next/**", ".next-static/**", "out/**", "next-env.d.ts"]),
]);
