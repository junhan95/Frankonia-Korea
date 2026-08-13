import RootShell from "../root-shell";
import { inter } from "../fonts";
import { notoSansKR } from "../fonts-kr";

/** Both faces: Latin for the model designations and the standards numbers,
 *  Korean for everything else. */
export default function KoreanLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell lang="ko" fontClass={`${inter.variable} ${notoSansKR.variable}`}>
      {children}
    </RootShell>
  );
}
