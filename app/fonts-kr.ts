import { Noto_Sans_KR } from "next/font/google";

/**
 * The Korean typeface — in a module of its own so that only the Korean locale
 * imports it.
 *
 * next/font emits an `@font-face` block per unicode range, and this family has
 * 125 of them: 76 KB of stylesheet, 26 KB over the wire, and render-blocking
 * on whatever page loads it. It used to sit beside Inter in fonts.ts, which
 * the shared root shell imports — so every English page paid for it too, and
 * there is not one Hangul character on any of them. Splitting the file is what
 * lets the two locales load different stylesheets: an ES import is the unit
 * next/font's CSS is attached to, so a shared module means a shared cost
 * however the value is used.
 *
 * No `subsets` on purpose. next/font only knows this family's Latin, Cyrillic
 * and Vietnamese subsets — Korean is not among them, and asking for a named
 * subset makes the request specific enough to drop the Korean ranges entirely,
 * which on the Korean site is most of the text. Leaving it off fetches the
 * whole face; `preload: false` is then required, and is what we want anyway:
 * preloading a hundred-odd range files would be worse than not preloading at
 * all. The browser fetches only the ranges a page actually uses.
 */
export const notoSansKR = Noto_Sans_KR({
  display: "swap",
  variable: "--font-noto-kr",
  preload: false,
});
