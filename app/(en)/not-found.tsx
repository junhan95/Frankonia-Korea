import Link from "next/link";

/* Lives in the (en) group because that group owns "/" — a not-found file
   applies to the segment it sits in, and the root is where an unmatched URL
   lands. Bilingual, English first, because a 404 has no locale of its own to
   read: the reader may have arrived from either side of the site. */
export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24 }}>
      <h1 style={{ fontSize: 40, fontWeight: 300 }}>404</h1>
      <p style={{ color: "var(--sub)" }}>Page not found · 페이지를 찾을 수 없습니다</p>
      <Link href="/" style={{ color: "var(--red)", fontWeight: 700 }}>← Home</Link>
    </div>
  );
}
