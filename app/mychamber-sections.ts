import type { Lang } from "./site-config";

/**
 * MyChamber — the route, and the copy the navigation, the page head and the
 * search snippet all read from.
 *
 * It sits where Career used to sit in the top-level menu. Career itself came
 * off the site in the August 2026 review — HQ's call, and the right one for a
 * site whose one job is to get a specification into a quotation; applications
 * are handled on the head office site, which is where the live vacancy
 * postings always were.
 *
 * The decision tree itself lives in mychamber-advisor.ts; this file carries
 * nothing but the route and the labels, so the header can import it without
 * pulling the tree into the header's own module graph.
 */

/** Path, relative to the locale root. */
export const mychamberPath = "/mychamber";

export const mychamberMeta = {
  ko: {
    /** Never translated. It is the name of the feature, and it is the word on
     *  the navigation bar in both locales — a Korean rendering would make the
     *  two bars name two different things. */
    label: "My Chamber",
    title: "My Chamber",
    /** Sub-head under the title, and the meta description. */
    description:
      "Frankonia 본사의 Chamber Matrix를 그대로 따라가는 두세 번에서 다섯 번의 질문으로 요구사항에 맞는 챔버에 도달합니다. 결과는 선택하신 경로와 함께 그대로 견적 문의 메일로 이어집니다.",
    /** Dropdown caption in the Chambers mega panel. */
    note: "질문 2~5개로 챔버 선택",
  },
  en: {
    label: "My Chamber",
    title: "My Chamber",
    description:
      "Two to five questions, taken straight from the Frankonia Chamber Matrix, lead to the chamber that matches your requirement. The result carries the branch you took into a quotation enquiry.",
    note: "Find your chamber in 2–5 questions",
  },
} as const satisfies Record<Lang, { label: string; title: string; description: string; note: string }>;
