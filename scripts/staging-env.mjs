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
  // Held empty, not merely left unset. `next build` reads .env on its own, and
  // .env is the production file — it carries NEXT_PUBLIC_INDEXABLE=1. Anything
  // this object does not name would be inherited from there, so a developer
  // with deploy credentials configured would quietly produce an indexable
  // staging build. Naming it here means the staging target cannot be indexable
  // whatever .env says. (The GitHub Actions runner has no .env, so this only
  // ever mattered locally — which is where nobody would have looked.)
  NEXT_PUBLIC_INDEXABLE: "",
};
