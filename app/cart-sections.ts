import type { Lang } from "./site-config";

/**
 * MyCart — the route and the copy the navigation, the page head and the search
 * snippet all read from.
 *
 * A sibling of MyChamber rather than a part of it. MyChamber answers one
 * question — which chamber is yours — and ends in one enquiry about one model.
 * A laboratory being fitted out is rarely one model: a semi-anechoic chamber
 * and the amplifier and the antenna mast that go in it are one project and one
 * quotation, and until now the only way to ask for all three was to write the
 * mail by hand. MyCart is that basket, and the enquiry it sends names
 * everything in it.
 *
 * The label is never translated, for the same reason MyChamber's is not: it is
 * the name of the feature, and the bar should not name two different things in
 * the two locales.
 *
 * The route table lives here rather than in cart-store.ts so the header, the
 * sitemap and the page can import the path without pulling the client store —
 * and its `localStorage` access — into their module graph.
 */

/** Path, relative to the locale root. */
export const cartPath = "/mycart";

export const cartMeta = {
  ko: {
    label: "My Enquiry",
    title: "My Enquiry",
    description:
      "관심 있는 챔버와 시험 시스템을 담아 두었다가, 필요한 것만 골라 한 통의 견적 문의로 보냅니다. 담긴 목록은 이 브라우저에만 남고, 보내기 전까지 어디로도 전송되지 않습니다.",
    /** Accessible name of the bar's icon. The count is in the name because the
     *  badge beside it is `aria-hidden` — a number with no word next to it is
     *  not something a screen reader can make sense of. */
    aria: (n: number) => `My Enquiry — 담긴 제품 ${n}개`,
    ariaEmpty: "My Enquiry — 담긴 제품 없음",
  },
  en: {
    label: "My Enquiry",
    title: "My Enquiry",
    description:
      "Keep the chambers and test systems you are weighing up in one place, then send the ones you want as a single quotation enquiry. The list stays in this browser and goes nowhere until you send it.",
    aria: (n: number) => `My Enquiry — ${n} item${n === 1 ? "" : "s"}`,
    ariaEmpty: "My Enquiry — empty",
  },
} as const satisfies Record<
  Lang,
  { label: string; title: string; description: string; aria: (n: number) => string; ariaEmpty: string }
>;
