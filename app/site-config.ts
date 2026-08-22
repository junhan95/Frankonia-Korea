// GitHub Pages serves this project from a repository subpath, so every asset
// and internal link needs that prefix. Raw <img>/<a> tags do not get Next's
// basePath rewriting, so they go through the helpers below.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** German was dropped for the development phase to keep the page count down;
 *  the copy objects are structured so it can be added back as a third key. */
export type Lang = "ko" | "en";

/**
 * The locales, and where each one is served from.
 *
 * English holds the root and Korean sits at `/ko`. This is the head office's
 * site, English is the language it leads with, and a visitor who types the
 * domain with no further instruction should land in it — the site used to
 * open in Korean, which read as a Korean branch site rather than the head
 * office's own.
 *
 * The fourth field is the route prefix, and it is the single source of that
 * fact: `langPath` looks entries up by code, `localeRoute` builds every
 * internal link from it, and the sitemap gives priority 1 to whichever locale
 * has "/". Changing which locale owns the root is this table plus the two
 * directory trees under `app/`; nothing else hard-codes it.
 */
export const languages = [
  ["en", "EN", "English", "/"],
  ["ko", "KO", "한국어", "/ko"],
] as const satisfies readonly (readonly [Lang, string, string, string])[];

/** The locale served from the root — what an unqualified visit resolves to,
 *  and therefore what `x-default` points at. */
export const defaultLang: Lang = "en";

export const langPath = (lang: Lang) =>
  languages.find(([code]) => code === lang)![3];

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

/**
 * One address for every enquiry on the site. The CyberShield page arrives from
 * the product site already addressed here, and a second inbox beside it would
 * split the same conversation in two — so the contact band, the company pages
 * and the structured data all read from this.
 */
export const contactEmail = "sales@frankoniagroup.com";

/**
 * The head office switchboard, in the form the footer prints and the
 * structured data states — one value, because a page that gives two different
 * numbers is a page a reader cannot act on. The landing's "call us" button
 * used to carry `tel:+8200000000`, a placeholder Korean number, on a page
 * whose own footer said this one.
 */
export const contactPhone = "+49 9177 98-500";

/** The same number as a dialler will take it: E.164, no spaces or dashes. */
export const contactPhoneHref = "tel:+49917798500";

/**
 * The head office site, for the pages this one deliberately does not copy:
 * the live vacancy PDFs and their application forms. Those are data the head
 * office keeps current, and a copy here would outlive the posting.
 */
export const headOfficeUrl = "https://frankonia-solutions.com";

/**
 * Search engines are kept out until the site moves to www.frankonia-korea.com.
 * Indexing the GitHub Pages staging URL would park ranking signals on a
 * personal subdomain and leave duplicate content behind at launch.
 * Set NEXT_PUBLIC_INDEXABLE=1 in the deploy workflow to open it up.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "1";

/**
 * CyberShield lives on its own product site. The navigation, the landing card
 * and the footer point at this site's own summary page instead — leaving the
 * site from the menu bar with no warning is not something a reader asked for —
 * and the summary is where the hand-over happens: see app/cybershield-content.
 *
 * Those links open in a new tab (2026-08-11, head office). The earlier renewal
 * brief asked for the same window ("새 창에서 열리는 것이 아닌 현재 창에서"),
 * which was written when this route carried the product page itself and there
 * was nothing here to come back to.
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
 * Locale-prefixed internal route. The root locale takes no prefix — every
 * caller that needs a per-locale link goes through here rather than repeating
 * that exception.
 *
 *   localeRoute("en")                 → "/"
 *   localeRoute("ko", "/cybershield") → "/ko/cybershield/"
 */
export const localeRoute = (lang: Lang, path = "") => {
  const prefix = langPath(lang);
  return route(prefix === "/" ? path || "/" : `${prefix}${path}`);
};

/** Absolute form of `localeRoute`, for canonical / hreflang / sitemap URLs. */
export const localeUrl = (lang: Lang, path = "") =>
  `${siteOrigin}${localeRoute(lang, path)}`;

/**
 * "1 model", not "1 models". Nothing calls this any more: the category and
 * family counts it was written for came off the site, because a line that
 * says how many items a list holds has to be rewritten every time the
 * catalogue grows. Kept for the next string that has to count something the
 * reader supplies rather than something we publish.
 */
export const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;
