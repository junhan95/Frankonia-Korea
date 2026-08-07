import { Inter, Noto_Sans_KR } from "next/font/google";

/**
 * The two typefaces, downloaded at build time and served from this origin.
 *
 * They used to arrive from fonts.googleapis.com through an `@import` at the
 * top of globals.css. Two problems with that, and self-hosting answers both:
 *
 *   - Every visitor's IP reached Google before a single glyph was drawn. This
 *     site is operated from Germany, and German courts have treated an
 *     unconsented Google Fonts embed as a GDPR violation. Nothing here is
 *     worth a data-protection argument.
 *   - `@import` at the top of a stylesheet is the slowest way to load a font:
 *     the browser cannot even discover the request until globals.css has
 *     arrived and parsed, so it is one full round trip behind everything else.
 *
 * Both are declared as variable fonts. One file per unicode range covers every
 * weight from 300 to 800, rather than one file per weight per range — which
 * matters much more for Korean than for Latin, where the range count is high.
 */

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * No `subsets` here on purpose. next/font only knows this family's Latin,
 * Cyrillic and Vietnamese subsets — Korean is not among them, and asking for
 * a named subset makes the request specific enough to drop the Korean ranges
 * entirely, which on this site is most of the text. Leaving it off fetches the
 * whole face; `preload: false` is then required, and is what we want anyway:
 * preloading a hundred-odd range files would be worse than not preloading at
 * all. The browser fetches only the ranges a page actually uses.
 */
export const notoSansKR = Noto_Sans_KR({
  display: "swap",
  variable: "--font-noto-kr",
  preload: false,
});

/** Both variables, for the <html> element. */
export const fontVariables = `${inter.variable} ${notoSansKR.variable}`;
