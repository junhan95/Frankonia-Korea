import type { Lang } from "./site-config";

/**
 * The Company section, in the order the navigation lists it. Kept free of
 * component imports so both the header and the page content can read it —
 * the header is a client component, and importing the page module there
 * would close an import cycle.
 */
export const companySections = [
  "philosophy",
  "history",
  "career",
  "publications",
  "events",
] as const;

export type CompanySection = (typeof companySections)[number];

/**
 * The subset the Company dropdown lists. Career keeps its own top-level GNB
 * item pointing at the same page, so repeating it here only gave the reader
 * two links to one place.
 */
export const companyNavSections: readonly CompanySection[] =
  companySections.filter((s) => s !== "career");

export const isCompanySection = (value: string): value is CompanySection =>
  (companySections as readonly string[]).includes(value);

/** Nav label and meta description per locale. Single source: the navigation,
 *  the page title and the search snippet all read from here. */
export const sectionMeta = {
  ko: {
    philosophy: {
      label: "경영이념",
      description:
        "전문성과 유연성, 품질, 높은 기술 수준으로 전 세계를 무대로 미래에도 유효한 EMC 솔루션을 만듭니다. Frankonia가 추구하는 것과 제공하는 것.",
    },
    history: {
      label: "연혁",
      description:
        "1987년 설립부터 Frankosorb® 흡수체 개발과 전 세계 법인 설립까지 — Frankonia 그룹의 연혁과 제품·기술 마일스톤 25건.",
    },
    career: {
      label: "채용",
      description:
        "Frankonia 채용 공고와 상시 지원 안내, 그리고 네 가지 핵심 가치.",
    },
    publications: {
      label: "발간자료",
      description:
        "흡수체와 무향 챔버에 관해 Frankonia 연구진과 협력 대학이 발표한 논문·기고문 11건.",
    },
    events: {
      label: "행사·전시",
      description:
        "Frankonia가 참가하는 전시회와 세미나 안내.",
    },
  },
  en: {
    philosophy: {
      label: "Philosophy",
      description:
        "Expertise, flexibility, quality and a high degree of technology, generating future-proof solutions on a global scale. What Frankonia stands for, and what Frankonia provides.",
    },
    history: {
      label: "History",
      description:
        "From the foundation in 1987 through the Frankosorb® absorber to the group's companies worldwide — the Frankonia timeline and 25 product and technology milestones.",
    },
    career: {
      label: "Career",
      description:
        "Open positions at Frankonia, how to apply speculatively, and the four core values.",
    },
    publications: {
      label: "Publications",
      description:
        "Eleven papers and articles on absorbers and anechoic chambers, published by Frankonia's researchers and their university partners.",
    },
    events: {
      label: "Events",
      description:
        "Exhibitions and seminars where Frankonia takes part.",
    },
  },
} as const satisfies Record<Lang, Record<CompanySection, { label: string; description: string }>>;

/** Path of a section relative to the locale root. */
export const sectionPath = (section: CompanySection) => `/company/${section}`;
