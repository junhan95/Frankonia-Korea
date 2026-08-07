import type { Metadata } from "next";
import { isIndexable, langPath, languages, siteOrigin, basePath, type Lang } from "./site-config";

const titles: Record<Lang, string> = {
  ko: "Frankonia Korea — EMC 챔버 · 시험 시스템 · CyberShield",
  en: "Frankonia Korea — EMC Chambers, Test Systems & CyberShield",
};

const descriptions: Record<Lang, string> = {
  ko: "독일 Frankonia의 EMC 무향 챔버와 시험 시스템을 한국 시장에 공급하는 공식 파트너. 컨설팅부터 구축·사후지원까지 토탈 솔루션을 제공합니다.",
  en: "Official Korean partner of Frankonia Germany for EMC anechoic chambers and test systems — consulting, installation and after-sales support.",
};

export function pageMetadata(lang: Lang): Metadata {
  const url = `${siteOrigin}${basePath}${langPath(lang)}`;
  return {
    title: titles[lang],
    description: descriptions[lang],
    robots: isIndexable ? undefined : { index: false, follow: false },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        languages.map(([code, , , path]) => [
          code,
          `${siteOrigin}${basePath}${path}`,
        ]),
      ),
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url,
      siteName: "Frankonia Korea",
      type: "website",
    },
  };
}
