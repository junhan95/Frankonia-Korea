import type { Lang } from "./site-config";

/**
 * MyChamber — the route, and the copy the navigation, the page head and the
 * search snippet all read from.
 *
 * It sits where Career used to sit in the top-level menu. Career is not gone:
 * it moved back into the Company dropdown it was always a part of (see
 * `companyNavSections`), which is where a reader looking for a job would open
 * first anyway. The slot itself is worth more to a visitor who has arrived to
 * buy a chamber than to one who has arrived to apply for a job — this site's
 * one job is to get a specification into a quotation.
 *
 * The questionnaire and the recommendation engine live in mychamber-advisor.ts;
 * this file carries nothing but the route and the labels, so the header can
 * import it without pulling the engine into the header's own module graph.
 */

/** Path, relative to the locale root. */
export const mychamberPath = "/mychamber";

export const mychamberMeta = {
  ko: {
    /** Never translated. It is the name of the feature, and it is the word on
     *  the navigation bar in both locales — a Korean rendering would make the
     *  two bars name two different things. */
    label: "MyChamber",
    title: "MyChamber",
    /** Sub-head under the title, and the meta description. */
    description:
      "네다섯 개의 질문으로 32종의 Frankonia 챔버 중 요구사항에 맞는 모델을 좁혀 드립니다. 추천 결과는 선택 내용과 함께 그대로 견적 문의 메일로 이어집니다.",
    /** Dropdown caption in the Chambers mega panel. */
    note: "질문 4~6개로 챔버 추천",
  },
  en: {
    label: "MyChamber",
    title: "MyChamber",
    description:
      "Four or five questions narrow the 32 Frankonia chambers down to the models that match your requirement. The recommendation carries your answers straight into a quotation enquiry.",
    note: "Find your chamber in 4–6 questions",
  },
} as const satisfies Record<Lang, { label: string; title: string; description: string; note: string }>;
