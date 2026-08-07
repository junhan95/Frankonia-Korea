import RootShell from "../root-shell";

export default function KoreanLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ko">{children}</RootShell>;
}
