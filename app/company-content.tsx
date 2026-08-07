import PageShell from "./page-shell";
import type { CompanySection } from "./company-sections";
import type { Lang } from "./site-config";

const contactEmail = "info@frankonia-korea.com";

/* Content is deliberately limited to what the company has actually stated —
   the founding year, the countries supplied, the partner role. Dated Korean
   milestones, catalogue PDFs and the exhibition calendar are marked as
   pending rather than invented; each list below fills in without a layout
   change once the real entries arrive. */
const copy = {
  ko: {
    philosophy: {
      eyebrow: "WHO WE ARE",
      title: "측정으로 증명하는 EMC 파트너십",
      intro:
        "Frankonia Korea는 독일 Frankonia의 EMC 챔버와 시험 시스템을 한국 시장에 공급하는 공식 파트너입니다. 컨설팅부터 설계·구축·교정·유지보수까지 프로젝트 전 과정을 한국어로 지원합니다.",
      principlesKicker: "OUR PRINCIPLES",
      principlesTitle: "세 가지 원칙",
      principles: [
        ["01", "측정으로 증명한다", "차폐 성능과 시험 환경은 가정이 아니라 현장 실측으로 확인합니다. 규격에 따른 검증 결과로 인수 조건을 명확히 합니다."],
        ["02", "프로젝트 전 주기를 함께한다", "요구사항 정의와 사전 검토부터 설치, 인수 시험, 정기 교정과 유지보수까지 한 팀이 끝까지 담당합니다."],
        ["03", "본사 엔지니어링과 직결한다", "독일 본사 엔지니어링 팀과 직접 협업해 표준 제품은 물론 프로젝트별 맞춤 설계까지 대응합니다."],
      ],
      callout:
        "1987년 설립 이후 전 세계 80여 개국에 EMC 챔버와 시험 시스템을 공급해 온 Frankonia의 기술을, 한국 고객에게 가장 가까운 자리에서 전달합니다.",
    },
    history: {
      eyebrow: "OUR HISTORY",
      title: "연혁",
      intro: "독일 Frankonia와 Frankonia Korea가 걸어온 길.",
      groupKicker: "FRANKONIA GROUP",
      groupTitle: "독일 본사",
      groupFacts: [
        ["1987", "독일에서 Frankonia 설립"],
        ["80+", "EMC 챔버·시험 시스템 공급 국가"],
        ["35+", "표준 챔버 라인업"],
      ],
      koreaKicker: "FRANKONIA KOREA",
      koreaTitle: "한국 법인 연혁",
      entries: [] as readonly (readonly [string, string])[],
      pendingTitle: "연혁 정리 중",
      pendingBody:
        "설립 연도와 주요 프로젝트 이력은 확정되는 대로 이 페이지에 게시합니다. 그 전까지 회사 이력이 필요하시면 이메일로 요청해 주세요.",
      cta: "회사 이력 요청하기",
    },
    career: {
      eyebrow: "CAREER",
      title: "함께 일할 분을 찾습니다",
      intro:
        "EMC 챔버 프로젝트는 영업·설계·시공·측정이 한 팀으로 움직입니다. 기술을 정확히 이해하고 정확히 전달하는 사람과 함께하고 싶습니다.",
      valuesKicker: "WHO WE LOOK FOR",
      valuesTitle: "인재상",
      values: [
        ["01", "정확함을 편드는 사람", "EMC 시험은 숫자로 판정됩니다. 규격과 측정값 앞에서 타협하지 않는 태도를 가장 중요하게 봅니다."],
        ["02", "현장에서 배우는 사람", "챔버는 도면이 아니라 현장에서 완성됩니다. 설치와 검증 현장을 직접 확인하며 배우는 사람을 찾습니다."],
        ["03", "언어의 경계를 넘는 사람", "독일 본사 엔지니어링 팀과 한국 고객 사이에서 기술 내용을 정확히 옮기는 일이 업무의 큰 축입니다."],
      ],
      openingsKicker: "OPEN POSITIONS",
      openingsTitle: "채용 공고",
      openings: [] as readonly (readonly [string, string])[],
      pendingTitle: "현재 공개 채용 공고가 없습니다",
      pendingBody:
        "상시 지원을 받고 있습니다. 이력서와 간단한 자기소개를 이메일로 보내주시면 채용 계획이 생겼을 때 우선 검토합니다.",
      cta: "상시 지원하기",
    },
    publications: {
      eyebrow: "PUBLICATIONS",
      title: "발간자료",
      intro: "제품 카탈로그와 기술 자료를 안내합니다.",
      listKicker: "CATALOGUES",
      listTitle: "자료 목록",
      items: [
        ["Anechoic Chambers 카탈로그", "챔버 6개 카테고리 제품 라인업과 대표 사양"],
        ["EMC Test Systems 카탈로그", "EMI 리시버 · 안테나 · 액세서리 사양"],
        ["CyberShield 브로슈어", "데이터센터 전자기 차폐 솔루션 개요"],
      ],
      status: "이메일 요청",
      note:
        "PDF 직접 다운로드는 순차적으로 공개합니다. 그 전까지는 필요한 자료를 이메일로 요청해 주시면 회신드립니다.",
      cta: "자료 요청하기",
    },
    events: {
      eyebrow: "EVENTS",
      title: "행사·전시",
      intro: "Frankonia와 Frankonia Korea가 참가하는 전시회와 기술 세미나를 안내합니다.",
      listKicker: "SCHEDULE",
      listTitle: "예정된 일정",
      entries: [] as readonly (readonly [string, string])[],
      pendingTitle: "예정된 행사가 없습니다",
      pendingBody:
        "Frankonia는 국내외 EMC·자동차 전장 분야 전시회에 참가합니다. 일정이 확정되면 이 페이지에 먼저 안내합니다.",
      cta: "일정 문의하기",
    },
  },
  en: {
    philosophy: {
      eyebrow: "WHO WE ARE",
      title: "An EMC partnership proven by measurement",
      intro:
        "Frankonia Korea is the official Korean partner for Frankonia's EMC chambers and test systems, supporting the whole project — consulting, design, installation, calibration and maintenance — locally.",
      principlesKicker: "OUR PRINCIPLES",
      principlesTitle: "Three principles",
      principles: [
        ["01", "Prove it by measurement", "Shielding performance and test conditions are confirmed on site, not assumed. Acceptance is defined by verification against the applicable standard."],
        ["02", "Stay for the whole project", "One team carries a project from requirements and pre-study through installation, acceptance testing, calibration and maintenance."],
        ["03", "Work directly with engineering", "We collaborate directly with the engineering team in Germany, on standard products and on project-specific designs alike."],
      ],
      callout:
        "Since 1987 Frankonia has supplied EMC chambers and test systems to more than 80 countries. Our job is to put that engineering within reach of customers in Korea.",
    },
    history: {
      eyebrow: "OUR HISTORY",
      title: "History",
      intro: "Where Frankonia and Frankonia Korea have come from.",
      groupKicker: "FRANKONIA GROUP",
      groupTitle: "Headquarters, Germany",
      groupFacts: [
        ["1987", "Frankonia founded in Germany"],
        ["80+", "Countries supplied with chambers and test systems"],
        ["35+", "Standard chamber models"],
      ],
      koreaKicker: "FRANKONIA KOREA",
      koreaTitle: "Korean operation",
      entries: [] as readonly (readonly [string, string])[],
      pendingTitle: "Timeline in preparation",
      pendingBody:
        "The founding year and project milestones will be published here once confirmed. In the meantime, please ask by email if you need a company history.",
      cta: "Request a company history",
    },
    career: {
      eyebrow: "CAREER",
      title: "We are looking for colleagues",
      intro:
        "An EMC chamber project moves as one team across sales, design, installation and measurement. We want people who understand the engineering and can convey it precisely.",
      valuesKicker: "WHO WE LOOK FOR",
      valuesTitle: "What we value",
      values: [
        ["01", "People who side with precision", "EMC testing is settled by numbers. What matters most is refusing to compromise in front of a standard and a measured value."],
        ["02", "People who learn on site", "A chamber is finished on site, not on a drawing. We look for people who go and see the installation and the verification."],
        ["03", "People who cross the language line", "Carrying technical content accurately between the engineering team in Germany and customers in Korea is a large part of the job."],
      ],
      openingsKicker: "OPEN POSITIONS",
      openingsTitle: "Openings",
      openings: [] as readonly (readonly [string, string])[],
      pendingTitle: "No open positions at the moment",
      pendingBody:
        "Speculative applications are welcome. Send a CV and a short introduction by email and we will look at it first when a role opens.",
      cta: "Apply speculatively",
    },
    publications: {
      eyebrow: "PUBLICATIONS",
      title: "Publications",
      intro: "Product catalogues and technical documentation.",
      listKicker: "CATALOGUES",
      listTitle: "Available documents",
      items: [
        ["Anechoic Chambers catalogue", "The six chamber categories and their headline specifications"],
        ["EMC Test Systems catalogue", "EMI receivers, antennas and accessories"],
        ["CyberShield brochure", "Electromagnetic shielding for data centres"],
      ],
      status: "By email",
      note:
        "Direct PDF downloads are being published in stages. Until then, ask by email for the document you need and we will send it.",
      cta: "Request a document",
    },
    events: {
      eyebrow: "EVENTS",
      title: "Events",
      intro: "Exhibitions and technical seminars where Frankonia and Frankonia Korea take part.",
      listKicker: "SCHEDULE",
      listTitle: "Upcoming",
      entries: [] as readonly (readonly [string, string])[],
      pendingTitle: "No scheduled events",
      pendingBody:
        "Frankonia exhibits at EMC and automotive electronics trade fairs in Korea and abroad. Dates are announced here first once confirmed.",
      cta: "Ask about dates",
    },
  },
} as const;

/** Section head: red eyebrow over a Light heading (design reference §4.2-1). */
function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="sec-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}

function NumberedColumns({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <div className="line-grid three">
      {items.map(([no, heading, body]) => (
        <div className="num-col" key={no}>
          <span className="num">{no}</span>
          <h4>{heading}</h4>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

/** Shown wherever a list is real but not yet populated, so the page reads as
 *  deliberately empty rather than broken. */
function EmptyState({
  title,
  body,
  cta,
  subject,
}: {
  title: string;
  body: string;
  cta: string;
  subject: string;
}) {
  return (
    <div className="empty">
      <h4>{title}</h4>
      <p>{body}</p>
      <a className="btn btn-red" href={`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`}>
        {cta}
      </a>
    </div>
  );
}

export default function CompanyPage({
  lang,
  section,
}: {
  lang: Lang;
  section: CompanySection;
}) {
  const t = copy[lang];

  if (section === "philosophy") {
    const p = t.philosophy;
    return (
      <PageShell lang={lang} eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <section>
          <div className="wrap">
            <SectionHead kicker={p.principlesKicker} title={p.principlesTitle} />
            <NumberedColumns items={p.principles} />
            <div className="callout">{p.callout}</div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (section === "history") {
    const h = t.history;
    return (
      <PageShell lang={lang} eyebrow={h.eyebrow} title={h.title} intro={h.intro}>
        <section>
          <div className="wrap">
            <SectionHead kicker={h.groupKicker} title={h.groupTitle} />
            <div className="badges badges-wide">
              {h.groupFacts.map(([value, label]) => (
                <div className="bd" key={label}>
                  <b>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={h.koreaKicker} title={h.koreaTitle} />
            {h.entries.length > 0 ? (
              <div className="hairline-list">
                {h.entries.map(([year, text]) => (
                  <div className="hl-row" key={year}>
                    <b>{year}</b>
                    <span className="hl-desc">{text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title={h.pendingTitle}
                body={h.pendingBody}
                cta={h.cta}
                subject="[Frankonia Korea] Company history"
              />
            )}
          </div>
        </section>
      </PageShell>
    );
  }

  if (section === "career") {
    const c = t.career;
    return (
      <PageShell lang={lang} eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
        <section>
          <div className="wrap">
            <SectionHead kicker={c.valuesKicker} title={c.valuesTitle} />
            <NumberedColumns items={c.values} />
          </div>
        </section>
        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={c.openingsKicker} title={c.openingsTitle} />
            {c.openings.length > 0 ? (
              <div className="hairline-list">
                {c.openings.map(([role, detail]) => (
                  <div className="hl-row" key={role}>
                    <b>{role}</b>
                    <span className="hl-desc">{detail}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title={c.pendingTitle}
                body={c.pendingBody}
                cta={c.cta}
                subject="[Frankonia Korea] Speculative application"
              />
            )}
          </div>
        </section>
      </PageShell>
    );
  }

  if (section === "publications") {
    const p = t.publications;
    return (
      <PageShell lang={lang} eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <section>
          <div className="wrap">
            <SectionHead kicker={p.listKicker} title={p.listTitle} />
            <div className="hairline-list">
              {p.items.map(([name, detail], i) => (
                <div className="hl-row" key={name}>
                  <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                  <b>{name}</b>
                  <span className="hl-desc">
                    {detail}
                    <a
                      className="hl-action"
                      href={`mailto:${contactEmail}?subject=${encodeURIComponent(`[Frankonia Korea] ${name}`)}`}
                    >
                      {p.status} ↗
                    </a>
                  </span>
                </div>
              ))}
            </div>
            <div className="callout">{p.note}</div>
          </div>
        </section>
      </PageShell>
    );
  }

  const e = t.events;
  return (
    <PageShell lang={lang} eyebrow={e.eyebrow} title={e.title} intro={e.intro}>
      <section>
        <div className="wrap">
          <SectionHead kicker={e.listKicker} title={e.listTitle} />
          {e.entries.length > 0 ? (
            <div className="hairline-list">
              {e.entries.map(([date, name]) => (
                <div className="hl-row" key={date}>
                  <b>{date}</b>
                  <span className="hl-desc">{name}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title={e.pendingTitle}
              body={e.pendingBody}
              cta={e.cta}
              subject="[Frankonia Korea] Event schedule"
            />
          )}
        </div>
      </section>
    </PageShell>
  );
}
