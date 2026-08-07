import "./globals.css";
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
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
