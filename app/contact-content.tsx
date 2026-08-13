import PageShell, { type HeadShot } from "./page-shell";
import StructuredData from "./structured-data";
import { contactMeta, contactPath, offices } from "./contact-sections";
import { downloadsPath } from "./chamber-sections";
import { mychamberMeta, mychamberPath } from "./mychamber-sections";
import SiteLink from "./site-link";
import { localeRoute, type Lang } from "./site-config";

/* The contact page.

   It exists because the site had five ways in and one door: every "Get a
   Quote" on every page scrolled to the red band at the foot of the landing
   page, which offered the general sales address and the German switchboard.
   The head office publishes four entities on its own contact page and there is
   a Korean office besides, so the band now invites the enquiry and this page
   answers who receives it.

   Two bands, and the second is the one that does the work. A list of addresses
   is a page a reader leaves as uncertain as they arrived — the question behind
   "who do I write to" is almost always "what do I even ask for". So the offices
   come first, and then the three things that turn a first mail into a first
   answer rather than a first question back. */

const copy = {
  ko: {
    eyebrow: "CONTACT",
    title: "문의",
    intro:
      "요구사항이 다 정리되지 않은 단계에서 연락하셔도 됩니다. 어떤 규격을 통과해야 하는지와 무엇을 시험하는지, 두 가지만 알면 나머지는 함께 좁혀 갑니다.",
    officesKicker: "OFFICES",
    officesTitle: "사업장 다섯 곳",
    officesLead:
      "설계와 생산은 독일 하이데크에 있고, 프로젝트는 가까운 사업장이 받습니다. 어느 주소로 보내셔도 담당 엔지니어에게 전달됩니다.",
    /** The Korean office has no premises to publish yet. Said outright rather
     *  than left as a blank line, which reads as a field someone forgot. */
    addressPending: "주소 준비 중",
    askKicker: "WHAT TO SEND",
    askTitle: "이 세 가지가 있으면 첫 회신부터 구체적입니다",
    askLead:
      "없으면 없는 대로 보내주셔도 됩니다 — 아래는 저희가 어차피 되묻게 되는 것들이고, 미리 담아 주시면 그 왕복이 사라집니다.",
    ask: [
      [
        "01",
        "통과해야 하는 규격",
        "ECE R10 · CISPR 25 · ISO 11452 · MIL-STD-461 · IEC/EN 61000-4-3 — 시험이 무엇을 증명해야 하는지가 측정 거리와 흡수체 사양을 정하고, 그 둘이 챔버 크기를 정합니다.",
      ],
      [
        "02",
        "피시험체와 Quiet Zone",
        "가장 큰 피시험체의 치수와 무게, 그리고 필요한 측정 거리(1 · 3 · 5 · 10 m). 부품 한 점이면 1.0 m 챔버에서 끝나고, 차량이면 ø6.0 m Quiet Zone까지 올라갑니다.",
      ],
      [
        "03",
        "설치 공간과 일정",
        "확보된 실내 치수와 층고, 반입 경로, 바닥 하중, 그리고 목표 준공 시점. 운영 중인 건물 안에 짓는 경우라면 특히 — 용접 없이 볼트로만 체결하므로 화기 작업 없이 병행 시공이 가능합니다.",
      ],
    ],
    goMychamber: "어느 챔버인지부터 좁혀 보기",
    goDownloads: "카탈로그 먼저 보기",
  },
  en: {
    eyebrow: "CONTACT",
    title: "Contact",
    intro:
      "You do not need a finished specification to get in touch. Two things — which standard the test has to satisfy, and what is being tested — are enough to start narrowing down the rest together.",
    officesKicker: "OFFICES",
    officesTitle: "Five offices",
    officesLead:
      "Design and production are in Heideck, Germany; the office nearest you takes the project. Whichever address you write to, it reaches the engineer who answers it.",
    addressPending: "Address to follow",
    askKicker: "WHAT TO SEND",
    askTitle: "Three things that make the first reply a useful one",
    askLead:
      "Send what you have — the list below is what we would ask for anyway, and putting it in the first mail removes a round trip.",
    ask: [
      [
        "01",
        "The standard it has to meet",
        "ECE R10 · CISPR 25 · ISO 11452 · MIL-STD-461 · IEC/EN 61000-4-3 — what the test has to prove sets the measurement distance and the absorber lining, and those two set the size of the chamber.",
      ],
      [
        "02",
        "The EUT and the quiet zone",
        "Dimensions and weight of the largest device under test, and the measurement distance you need (1, 3, 5 or 10 m). A single component ends at a 1.0 m chamber; a vehicle takes it up to a ø6.0 m quiet zone.",
      ],
      [
        "03",
        "The room and the schedule",
        "Internal dimensions and clear height of the space you have, the access route, the floor loading, and when it has to be finished — particularly if it goes inside a building that stays in use. Nothing is welded, so the room goes up without hot work.",
      ],
    ],
    goMychamber: "Start by narrowing down the chamber",
    goDownloads: "Browse the catalogues first",
  },
} as const;

/* The head band. The trade-fair stand rather than the head office building:
   this page is five addresses and the people at them, and the stand is the one
   photograph on the site with a conversation in it. The logo wall and the
   product plinths sit right of centre, which is the half of the band the scrim
   clears. Framed above centre to keep the hall's ceiling rig out of it. */
const contactShot: HeadShot = {
  src: "/company/images/events-trade-fair-booth.webp", w: 1600, h: 1200, at: "50% 40%",
};

export default function ContactPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const { label, description } = contactMeta[lang];

  return (
    <PageShell
      lang={lang}
      eyebrow={t.eyebrow}
      title={t.title}
      intro={t.intro}
      shot={contactShot}
      /* The shared band's primary button points at this page, which from this
         page is a link to itself. The two next steps take its place: the
         questionnaire for a reader who does not have a model name yet, and the
         catalogues for one who would rather read first. */
      bandActions={
        <>
          <SiteLink className="btn btn-red" href={localeRoute(lang, mychamberPath)}>
            {mychamberMeta[lang].label}
          </SiteLink>
          <SiteLink className="btn btn-ghost" href={localeRoute(lang, downloadsPath)}>
            {t.goDownloads}
          </SiteLink>
        </>
      }
    >
      <StructuredData
        lang={lang}
        page="path"
        path={contactPath}
        trail={[{ name: label, path: contactPath }]}
        description={description}
      />

      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.officesKicker}</span>
            <h2>{t.officesTitle}</h2>
            <p>{t.officesLead}</p>
          </div>
          <div className="hairline-list">
            {/* `--name`: the row's left cell holds a registered company name,
                which is far longer than the short labels its nowrap default is
                written for — see globals.css. */}
            {offices.map((o) => (
              <div className="hl-row hl-row--name" key={o.id}>
                <b>{o.name}</b>
                <span className="hl-desc">
                  {o.address ?? t.addressPending}
                  {/* Not `.hl-spec`, which is the line the chamber lists put
                      catalogue figures on: it is --mute on this band, and a
                      reader is meant to click these. `.hl-contact` inherits
                      the descriptor's own colour instead. */}
                  <span className="hl-contact">
                    <a href={`mailto:${o.email}`}>{o.email}</a>
                    <span className="sep" aria-hidden="true">·</span>
                    <a href={o.phoneHref}>{o.phone}</a>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.askKicker}</span>
            <h2>{t.askTitle}</h2>
            <p>{t.askLead}</p>
          </div>
          <div className="line-grid three">
            {t.ask.map(([no, name, body]) => (
              <div className="num-col" key={no}>
                <span className="num">{no}</span>
                <h4>{name}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <SiteLink className="go sec-go" href={localeRoute(lang, mychamberPath)}>
            {t.goMychamber}<span aria-hidden="true">→</span>
          </SiteLink>
        </div>
      </section>
    </PageShell>
  );
}
