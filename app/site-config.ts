// GitHub Pages serves this project from a repository subpath, so every asset
// and internal link needs that prefix. Raw <img>/<a> tags do not get Next's
// basePath rewriting, so they go through the helpers below.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** German was dropped for the development phase to keep the page count down;
 *  the copy objects are structured so it can be added back as a third key. */
export type Lang = "ko" | "en";

/** Language switcher order. Korean is the primary locale and lives at the
 *  root; English is served from a subpath. */
export const languages = [
  ["ko", "KO", "한국어", "/"],
  ["en", "EN", "English", "/en"],
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

/**
 * CyberShield lives on its own product site, so every entry point here —
 * navigation, landing card, footer — hands the visitor straight over to it,
 * in the same window rather than a new tab (renewal brief: "새 창에서 열리는
 * 것이 아닌 현재 창에서").
 *
 * That site serves English from the root and Korean from /ko/; it has no /en/.
 */
export const cyberShieldUrl = (lang: Lang) =>
  lang === "en"
    ? "https://www.frankonia-cybershield.com/"
    : `https://www.frankonia-cybershield.com/${lang}/`;

/** Prefix a file in `public/` (e.g. `/images/hero.jpg`). */
export const asset = (path: string) => `${basePath}${path}`;

/** Prefix an internal route, keeping the trailing slash static export expects. */
export const route = (path: string) => {
  const withBase = `${basePath}${path}`;
  return withBase.endsWith("/") ? withBase : `${withBase}/`;
};

/**
 * Locale-prefixed internal route. Korean is served from the root, so it takes
 * no prefix — every caller that needs a per-locale link goes through here
 * rather than repeating that exception.
 *
 *   localeRoute("ko")                 → "/"
 *   localeRoute("en", "/cybershield") → "/en/cybershield/"
 */
export const localeRoute = (lang: Lang, path = "") => {
  const prefix = langPath(lang);
  return route(prefix === "/" ? path || "/" : `${prefix}${path}`);
};

/** Absolute form of `localeRoute`, for canonical / hreflang / sitemap URLs. */
export const localeUrl = (lang: Lang, path = "") =>
  `${siteOrigin}${localeRoute(lang, path)}`;
