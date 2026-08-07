import type { Metadata, Viewport } from "next";
import {
  sectionMeta,
  sectionPath,
  type CompanySection,
} from "./company-sections";
import {
  asset,
  isIndexable,
  languages,
  localeUrl,
  siteOrigin,
  type Lang,
} from "./site-config";

/** Every route that carries its own title. Add a key here, not a bespoke
 *  `metadata` export on the page — a page that declares its own metadata
 *  object silently opts out of the robots policy below, which is how the old
 *  /cybershield route stayed indexable on the staging URL. */
export type PageKey = "landing";

/** Path of a page relative to its locale root. */
const paths: Record<PageKey, string> = {
  landing: "",
};

const content: Record<PageKey, Record<Lang, { title: string; description: string }>> = {
  landing: {
    ko: {
      title: "Frankonia Korea — EMC 챔버 · 시험 시스템 · CyberShield",
      description:
        "독일 Frankonia의 EMC 무향 챔버와 시험 시스템을 한국 시장에 공급하는 공식 파트너. 컨설팅부터 구축·사후지원까지 토탈 솔루션을 제공합니다.",
    },
    en: {
      title: "Frankonia Korea — EMC Chambers, Test Systems & CyberShield",
      description:
        "Official Korean partner of Frankonia Germany for EMC anechoic chambers and test systems — consulting, installation and after-sales support.",
    },
  },
};

const ogLocale: Record<Lang, string> = { ko: "ko_KR", en: "en_US" };

/**
 * Share card served from `public/og.png` (1200×630, dark ink with the red
 * lockup). Spelled out as an absolute URL rather than left to `metadataBase`,
 * which does not know about the GitHub Pages base path and would point social
 * crawlers at the host root. Bump the version when the artwork changes —
 * platforms cache preview images by URL.
 */
const ogImage = `${siteOrigin}${asset("/og.png")}?v=1`;

export function pageMetadata(lang: Lang, page: PageKey = "landing"): Metadata {
  const { title, description } = content[page][lang];
  return build(lang, paths[page], title, description);
}

/** Company sections are one dynamic route, so their copy comes from
 *  company-sections.ts rather than the table above. */
export function companyMetadata(lang: Lang, section: CompanySection): Metadata {
  const { label, description } = sectionMeta[lang][section];
  return build(lang, sectionPath(section), `${label} — Frankonia Korea`, description);
}

function build(lang: Lang, path: string, title: string, description: string): Metadata {
  const canonical = localeUrl(lang, path);

  return {
    title,
    description,
    icons: { icon: [{ url: asset("/favicon.svg"), type: "image/svg+xml" }] },
    // Held back until the site moves to www.frankonia-korea.com — indexing the
    // GitHub Pages staging URL would park ranking signals on a personal
    // subdomain. A project page cannot serve a robots.txt crawlers will read
    // (they only fetch it from the host root), so this meta tag carries it.
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          languages.map(([code]) => [code, localeUrl(code, path)]),
        ),
        "x-default": localeUrl("ko", path),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Frankonia Korea",
      locale: ogLocale[lang],
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Frankonia Korea" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/** themeColor belongs to the viewport export, not metadata. */
export const siteViewport: Viewport = { themeColor: "#25282b" };
