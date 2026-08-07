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

export const isCompanySection = (value: string): value is CompanySection =>
  (companySections as readonly string[]).includes(value);

/** Nav label and meta description per locale. Single source: the navigation,
 *  the page title and the search snippet all read from here. */
export const sectionMeta = {
  ko: {
    philosophy: {
      label: "경영이념",
      description:
        "Frankonia Korea의 세 가지 원칙 — 측정으로 증명하고, 프로젝트 전 주기를 함께하며, 독일 본사 엔지니어링과 직결합니다.",
    },
    history: {
      label: "연혁",
      description:
        "1987년 설립 이후 80여 개국에 공급해 온 Frankonia와 Frankonia Korea의 연혁.",
    },
    career: {
      label: "채용",
      description: "Frankonia Korea 인재상과 채용 안내. 상시 지원을 받고 있습니다.",
    },
    publications: {
      label: "발간자료",
      description: "EMC 챔버·시험장비 카탈로그와 CyberShield 브로슈어 안내.",
    },
    events: {
      label: "행사·전시",
      description:
        "Frankonia와 Frankonia Korea가 참가하는 EMC 전시회 및 기술 세미나 일정.",
    },
  },
  en: {
    philosophy: {
      label: "Philosophy",
      description:
        "Three principles at Frankonia Korea — prove it by measurement, stay for the whole project, work directly with engineering in Germany.",
    },
    history: {
      label: "History",
      description:
        "Frankonia has supplied EMC chambers to more than 80 countries since 1987. The history of the group and of Frankonia Korea.",
    },
    career: {
      label: "Career",
      description:
        "What Frankonia Korea looks for, and how to apply. Speculative applications welcome.",
    },
    publications: {
      label: "Publications",
      description:
        "Catalogues for EMC chambers and test systems, and the CyberShield brochure.",
    },
    events: {
      label: "Events",
      description:
        "Exhibitions and technical seminars where Frankonia and Frankonia Korea take part.",
    },
  },
} as const satisfies Record<Lang, Record<CompanySection, { label: string; description: string }>>;

/** Path of a section relative to the locale root. */
export const sectionPath = (section: CompanySection) => `/company/${section}`;
