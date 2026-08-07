// GitHub Pages serves this project from a repository subpath, so every asset
// and internal link needs that prefix. Raw <img>/<a> tags do not get Next's
// basePath rewriting, so they go through the helpers below.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Lang = "ko" | "en" | "de";

/** Language switcher order. Korean is the primary locale and lives at the
 *  root; English and German are served from subpaths. */
export const languages = [
  ["ko", "KO", "한국어", "/"],
  ["en", "EN", "English", "/en"],
  ["de", "DE", "Deutsch", "/de"],
] as const satisfies readonly (readonly [Lang, string, string, string])[];

export const langPath = (lang: Lang) =>
  languages.find(([code]) => code === lang)![3];

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

/**
 * Search engines are kept out until the site moves to www.frankonia-korea.com.
 * Indexing the GitHub Pages staging URL would park ranking signals on a
 * personal subdomain and leave duplicate content behind at launch.
 * Set NEXT_PUBLIC_INDEXABLE=1 in the deploy workflow to open it up.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "1";

/** External link to the CyberShield product site (opens in a new tab). */
export const cyberShieldUrl = "https://www.frankonia-cybershield.com/";

/** Prefix a file in `public/` (e.g. `/images/hero.jpg`). */
export const asset = (path: string) => `${basePath}${path}`;

/** Prefix an internal route, keeping the trailing slash static export expects. */
export const route = (path: string) => {
  const withBase = `${basePath}${path}`;
  return withBase.endsWith("/") ? withBase : `${withBase}/`;
};
