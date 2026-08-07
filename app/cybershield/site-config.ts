/**
 * Stand-in for the product site's own site-config, so the files ported from it
 * keep their upstream imports and stay easy to re-sync.
 *
 * Two things differ from the original: assets live under a `/cybershield/`
 * folder here rather than at the root of the site, and the language switcher is
 * this site's, so nothing in the port needs `languages` or `route`.
 */
import { asset as siteAsset } from "../site-config";

/**
 * The product site's locales. Wider than this site's `Lang` on purpose — the
 * ported copy objects still carry their German column, and this site's two
 * locales are a subset of these, so a `Lang` from site-config indexes them
 * without a cast.
 */
export type Lang = "en" | "de" | "ko";

/** Prefix a CyberShield file in `public/cybershield/` (e.g. `/images/x.webp`). */
export const asset = (path: string) => siteAsset(`/cybershield${path}`);
