import RootShell from "../root-shell";
import { inter } from "../fonts";

/** Latin only. No page under this layout carries a Hangul character — the
 *  Korean face and its 125 `@font-face` blocks belong to the other locale. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en" fontClass={inter.variable}>{children}</RootShell>;
}
