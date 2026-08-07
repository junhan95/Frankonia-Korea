/**
 * Build variables for the GitHub Pages staging target. Shared by
 * `scripts/build-static.mjs` and the rendered-HTML tests so the assertions
 * cannot drift from the build they are checking.
 *
 * The production values live in `.env` (see `.env.example`) and are applied by
 * `deploy/deploy.py`, not here.
 */
export const stagingEnv = {
  STATIC_EXPORT: "1",
  NEXT_PUBLIC_BASE_PATH: "/Frankonia-Korea",
  NEXT_PUBLIC_SITE_ORIGIN: "https://junhan95.github.io",
};
