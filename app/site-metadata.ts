import type { Metadata, Viewport } from "next";
import {
  sectionMeta,
  sectionPath,
  type CompanySection,
} from "./company-sections";
import {
  asset,
  defaultLang,
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
export type PageKey = "landing" | "cybershield";

/** Path of a page relative to its locale root. */
const paths: Record<PageKey, string> = {
  landing: "",
  cybershield: "/cybershield",
};

const content: Record<PageKey, Record<Lang, { title: string; description: string }>> = {
  landing: {
    ko: {
      title: "Frankonia — EMC 챔버 · 시험 시스템 · CyberShield",
      description:
        "1987년부터 전 세계 80여 개국에 EMC 무향 챔버와 시험 시스템을 공급해 온 Frankonia. 컨설팅과 설계부터 제작·구축·사후지원까지 토탈 솔루션을 제공합니다.",
    },
    en: {
      title: "Frankonia — EMC Chambers, Test Systems & CyberShield",
      description:
        "EMC anechoic chambers and test systems supplied to more than 80 countries since 1987 — consulting, design, installation and after-sales support.",
    },
  },
  cybershield: {
    ko: {
      title: "CyberShield — Frankonia",
      description:
        "미션 크리티컬 데이터 인프라를 위한 측정 가능한 전자기 보안 경계. 10kHz~40GHz 최대 120dB, EN 50147-1 · IEEE 299 현장 검증.",
    },
    en: {
      title: "CyberShield — Frankonia",
      description:
        "A measurable electromagnetic security boundary for mission-critical data infrastructure. Up to 120 dB from 10 kHz to 40 GHz, verified on site to EN 50147-1 and IEEE 299.",
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

/** The description the page's meta tag carries, so the structured data on the
 *  page can state the same thing rather than keep a second copy of it. */
export const pageDescription = (lang: Lang, page: PageKey = "landing") =>
  content[page][lang].description;

export function pageMetadata(lang: Lang, page: PageKey = "landing"): Metadata {
  const { title, description } = content[page][lang];
  return build(lang, paths[page], title, description);
}

/**
 * For routes whose title and description live beside their own route table
 * rather than in `content` above — the company sections and the whole chamber
 * branch. Everything still goes through `build`, so the robots policy and the
 * hreflang set stay in one place.
 */
export function routeMetadata(
  lang: Lang,
  path: string,
  label: string,
  description: string,
): Metadata {
  return build(lang, path, `${label} — Frankonia`, description);
}

/** Company sections are one dynamic route, so their copy comes from
 *  company-sections.ts rather than the table above. */
export function companyMetadata(lang: Lang, section: CompanySection): Metadata {
  const { label, description } = sectionMeta[lang][section];
  return routeMetadata(lang, sectionPath(section), label, description);
}

function build(lang: Lang, path: string, title: string, description: string): Metadata {
  const canonical = localeUrl(lang, path);

  return {
    title,
    description,
    // The Frankonia knot. SVG first for browsers that take it, .ico for the
    // ones that still do not (Safari, older Edge).
    icons: {
      icon: [
        { url: asset("/favicon.svg"), type: "image/svg+xml" },
        { url: asset("/favicon.ico"), sizes: "32x32 48x48" },
      ],
      apple: asset("/apple-touch-icon.png"),
    },
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
        // Whatever locale holds the root: it is what an unqualified visit
        // resolves to, so it is what a crawler with no language signal should
        // be sent to as well.
        "x-default": localeUrl(defaultLang, path),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Frankonia",
      locale: ogLocale[lang],
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Frankonia" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/** themeColor belongs to the viewport export, not metadata. */
export const siteViewport: Viewport = { themeColor: "#25282b" };
