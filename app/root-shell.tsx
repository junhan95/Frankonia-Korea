import "./globals.css";
import type { Lang } from "./site-config";

/**
 * The document shell. Each locale has its own root layout (see the `(ko)` and
 * `(en)` route groups) purely so `<html lang>` is correct in the served HTML —
 * a single shared root layout can only ever declare one language, and the
 * static export has no runtime to correct it afterwards. Route groups keep the
 * URLs unchanged: `(en)/page.tsx` is still `/`, `(ko)/ko/page.tsx` is `/ko/`.
 *
 * `fontClass` is the locale's typeface set, passed in rather than imported
 * here. This module is shared by both layouts, and next/font attaches its
 * stylesheet to whatever imports the font — so importing the Korean face here
 * would put its 125 `@font-face` blocks in front of the first paint of every
 * English page as well. See fonts-kr.ts.
 */
export default function RootShell({
  lang,
  fontClass,
  children,
}: Readonly<{ lang: Lang; fontClass: string; children: React.ReactNode }>) {
  return (
    // The font variables are declared on <html> rather than <body> so the
    // stylesheet can reach them from :root, where the rest of the tokens live.
    <html lang={lang} className={fontClass}>
      <body>{children}</body>
    </html>
  );
}
