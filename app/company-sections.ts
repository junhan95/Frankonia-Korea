import type { Lang } from "./site-config";

/**
 * The Company section, in the order the navigation lists it. Kept free of
 * component imports so both the header and the page content can read it —
 * the header is a client component, and importing the page module there
 * would close an import cycle.
 *
 * All three are in the dropdown. Career was a fourth until the August 2026
 * review, when HQ asked for it to come off the Korean site — applications are
 * handled on the head office site, which is where the live vacancy postings
 * always were.
 *
 * Philosophy and History used to be two entries. They are one page now —
 * About: what the company is, then how it got there. Both were short of a
 * full page on their own and neither answered the question a reader opens the
 * Company menu with without the other. The slug `about` is the merged page;
 * `/company/philosophy` and `/company/history` no longer exist.
 */
export const companySections = [
  "about",
  "publications",
  "events",
] as const;

export type CompanySection = (typeof companySections)[number];

export const isCompanySection = (value: string): value is CompanySection =>
  (companySections as readonly string[]).includes(value);

/** Nav label and meta description per locale. Single source: the navigation,
 *  the page title and the search snippet all read from here. */
export const sectionMeta = {
  ko: {
    about: {
      label: "이념과 연혁",
      description:
        "전문성과 유연성, 품질, 높은 기술 수준으로 전 세계를 무대로 미래에도 유효한 EMC 솔루션을 만듭니다. Frankonia가 추구하는 것과 제공하는 것, 그리고 1987년 설립부터의 연혁과 제품·기술 마일스톤.",
    },
    publications: {
      label: "발간자료",
      description:
        "흡수체와 무향 챔버에 관해 Frankonia 연구진과 협력 대학이 발표한 논문과 기고문.",
    },
    events: {
      label: "행사·전시",
      description:
        "Frankonia가 참가하는 전시회와 세미나 안내.",
    },
  },
  en: {
    about: {
      label: "About",
      description:
        "Expertise, flexibility, quality and a high degree of technology, generating future-proof solutions on a global scale. What Frankonia stands for and provides, and the timeline from the foundation in 1987 through the Frankosorb® absorber to the group's companies worldwide.",
    },
    publications: {
      label: "Publications",
      description:
        "Papers and articles on absorbers and anechoic chambers, published by Frankonia's researchers and their university partners.",
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
