import "./globals.css";
import { fontVariables } from "./fonts";
import type { Lang } from "./site-config";

/**
 * The document shell. Each locale has its own root layout (see the `(ko)` and
 * `(en)` route groups) purely so `<html lang>` is correct in the served HTML —
 * a single shared root layout can only ever declare one language, and the
 * static export has no runtime to correct it afterwards. Route groups keep the
 * URLs unchanged: `(ko)/page.tsx` is still `/`, `(en)/en/page.tsx` is `/en/`.
 */
export default function RootShell({
  lang,
  children,
}: Readonly<{ lang: Lang; children: React.ReactNode }>) {
  return (
    // The font variables are declared on <html> rather than <body> so the
    // stylesheet can reach them from :root, where the rest of the tokens live.
    <html lang={lang} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
