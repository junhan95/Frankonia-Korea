import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import { CheckList } from "./page-parts";
import { contactPath } from "./contact-sections";
import { pageDescription } from "./site-metadata";
import { asset, cyberShieldUrl, localeRoute, type Lang } from "./site-config";

/* CyberShield, summarised.
 *
 * The head office asks this site for a short CyberShield page that hands the
 * reader over to the product site — www.frankonia-cybershield.com — rather
 * than for the product page itself. This route used to carry a full port of
 * that page (app/cybershield/, ~3,200 lines and its own stylesheet), which
 * kept a second copy of copy the product team owns and edits: every figure,
 * standard and price-shaped claim on it went stale the moment the product site
 * moved. The port is gone; what stays is a summary written in this site's own
 * bands, and a link out of every band that makes a claim the full site backs
 * up.
 *
 * The copy below is condensed from that product page rather than written
 * fresh, so the two read as one voice — the six product lines keep their
 * headings and their order, the attenuation figures and the standards list are
 * quoted as the product site states them, and nothing here says more than the
 * page it summarises. Which band condenses which section, and the ten figures
 * that have to be checked against the product site when it changes, are in
 * docs/source/cybershield.md — read the ledger before editing any copy here.
 *
 * Every outbound link goes through `cyberShieldUrl`, which carries the reader's
 * locale — the product site serves English from its root and Korean from /ko/.
 *
 * They open in a new tab (2026-08-11, head office). The earlier renewal brief
 * asked for the opposite ("새 창에서 열리는 것이 아닌 현재 창에서"), which was
 * written when this route was the product page itself and leaving it meant
 * leaving nothing behind; now the reader has a summary worth coming back to, so
 * the summary stays open. `rel="noopener"` and no `noreferrer`, as on the
 * footer's head-office link and the two on the legal pages: the referrer is how
 * the product site sees that this page sends it traffic.
 * tests/rendered-html.test.mjs holds both halves.
 */

const copy = {
  ko: {
    eyebrow: "CYBERSHIELD",
    title: "AI 데이터센터를 보호하고, 신호를 경계 안에 가두십시오.",
    intro:
      "CyberShield는 미션 크리티컬 데이터 인프라 주변에 측정 가능한 전자기 보안 경계를 구축합니다. 설계부터 통합, 현장 검증까지 하나의 완전한 시스템으로 제공합니다.",

    valueKicker: "CYBERSHIELD의 핵심 가치",
    valueTitle: "설계부터 시공, 측정까지 하나의 책임으로 묶인 단일 경계.",
    valueBody:
      "차폐 구조와 도어, 필터, 환기 도파관, 모든 관통부를 하나의 연속된 경계로 설계하고, 운영을 멈추지 않는 무용접 방식으로 시공한 뒤, EN 50147-1 / IEEE 299에 따라 현장에서 측정해 문서로 인도합니다. 마지막에 남는 것은 약속이 아니라 측정값입니다.",
    openSite: "CyberShield 사이트 열기",
    talk: "상담 문의",
    metrics: [
      ["현장 측정 검증", "설치 후 차폐 성능을 현장에서 측정합니다 — 추정이 아닌 증거"],
      ["무용접 모듈 조립", "화기 작업 없는 볼트 체결 — 운영 중인 시설과 병행 시공"],
      ["확장·이전 가능", "손상 없이 해체해 확장·변경·이전에 재사용"],
    ],

    threatKicker: "소프트웨어만으로 제공할 수 없는 보안 계층",
    threatTitle: "모든 위협이 네트워크를 통해 들어오지는 않습니다.",
    threatBody:
      "암호화와 제로 트러스트는 디지털 영역을 보호합니다. CyberShield는 시설 경계에서 발생하는 물리적·전자기적 노출을 통제합니다.",
    impactLabel: "잠재 영향",
    threats: [
      ["전자기 정보 방사", "네트워크에 접촉하지 않고도 비의도적 전자기 신호를 통해 민감한 처리 활동이 노출될 수 있습니다.", "기밀성 노출"],
      ["의도적 전자기 간섭", "국소 고출력 RF 또는 전자기 에너지는 전자장비, 제어 및 통신을 교란할 수 있습니다.", "서비스 중단"],
      ["EMP / HEMP 노출", "방사 및 전도성 펄스 영향은 중요 시스템과 업무 연속성 체계를 위협할 수 있습니다.", "업무 연속성 위험"],
      ["경계 구성요소 취약점", "도어, 환기, 전원, 데이터, 냉각 및 설비 관통부가 차폐 경계의 가장 약한 경로가 될 수 있습니다.", "보호 성능 저하"],
    ],

    systemKicker: "모듈형 PAN 차폐 시스템",
    systemTitle: "시설의 실제 조건에 맞춰 설계하는 보안 공간.",
    systemBody:
      "사전 제작된 PAN 모듈은 표준 건물 출입문으로 반입할 수 있고 내부에서 조립되며 기존 벽에 근접 설치할 수 있습니다. 접착제와 용접 없이 확장과 이전이 가능합니다.",
    features: [
      ["01", "정밀 조립", "패널을 75 mm 간격으로 규정 토크로 체결하고, 전도성 메시 개스킷으로 접합부를 밀봉합니다."],
      ["02", "건축 통합", "평탄한 내부 마감면을 확보하고, 이중바닥·랙·소방·조명·냉각·출입통제를 함께 설계에 반영합니다."],
      ["03", "확장 가능한 구조", "손상 없이 해체해 확장, 변경 또는 전체 이전에 재사용할 수 있습니다."],
      ["04", "완전한 보호 경계", "차폐 구조, 도어, 필터, 허니콤 및 도파관을 하나의 시스템으로 구성합니다."],
    ],
    cutawayAlt: "구조, 도어, 필터, 덕트, 전력실을 포함한 CyberShield 차폐 데이터홀 단면도",
    cutawayCaption:
      "차폐 경계를 이루는 21가지 솔루션. CyberShield 사이트에서 항목을 선택하면 각각의 역할과 필요성을 확인할 수 있습니다.",

    ecoKicker: "하나의 연속된 차폐 경계",
    ecoTitle: "여섯 개의 제품군, 누설 없는 하나의 차폐 경계.",
    ecoBody:
      "모든 구성요소를 동일한 차폐 외피의 일부로 설계합니다. 접합부, 도어, 관통부에서 성능이 손실되지 않습니다.",
    eco: [
      "벽체·천장·바닥을 구성하는 2.0 mm 아연도금 강판 PAN 모듈 시스템.",
      "고하중 슬라이딩·힌지 RF 도어, 고차폐 RF 윈도우 및 출입 모니터링 연동.",
      "고성능 전원 라인 필터, 광케이블 도파관 관통부 및 RF 신호 억제 장치.",
      "허니콤 환기 패널, 흡음 패널(ISO 354), 액체냉각·설비용 차폐 도파관.",
      "EN 50147-1 / IEEE 299 차폐 성능 측정, 누설 탐지, SE 시험 및 규격 문서화.",
      "예방 정비, 재교정 및 주기적 재인증 서비스.",
    ],
    ecoGo: "CyberShield 사이트에서 제품군 전체 보기",

    verifyKicker: "추정이 아닌 검증",
    verifyTitle: "약속이 아니라 측정으로 증명합니다.",
    verifyBody: [
      "모든 CyberShield 프로젝트는 측정된 증거로 완료됩니다. 차폐 성능은 국제 표준에 따라 설치 후 현장에서 시험하고, 문서화된 인수 결과를 공간과 함께 인도합니다.",
      "업계 기준을 선도하는 PAN 타입 모듈 시스템의 성능을 10 kHz에서 40 GHz까지 검증하며, 경계를 구성하는 모든 도어와 필터, 허니콤 환기구, 관통부에 동일한 차폐 성능을 설계 반영합니다.",
    ],
    attenuation: [
      ["≥ 90 dB", "10 kHz 자계"],
      ["≥ 120 dB", "100–400 MHz 최대 성능"],
      ["≥ 100 dB", "40 GHz까지 전 대역"],
      ["EN 50147-1", "인도 시점 현장 측정"],
    ],
    standardsTitle: "적용 표준",
    standards: [
      ["EN 50147-1", "차폐효과 측정 표준"],
      ["IEEE 299", "프로젝트 옵션으로 제공"],
      ["BSI TL-03305 / 03306", "도청 방지실 및 IT 차폐실 규격"],
      ["NATO SDIP-27 Level A", "TEMPEST 설계·승인, NSA 94-106 정합"],
      ["MIL-STD-188-125-1 / -2", "HEMP·IEMI 방호, 프로젝트별 검증"],
      ["ISO/IEC 27001", "물리적·환경적 보안 통제 항목 지원"],
    ],
    attenuationNote:
      "표준 PAN 타입 시스템의 보증 성능 범위입니다. 프로젝트에 적용되는 범위는 사양서와 현장 인수 시험을 통해 확정됩니다.",

    appKicker: "차폐실 구성 방식",
    appTitle: "하나의 플랫폼, 네 가지 미션 프로파일.",
    applications: [
      ["Sovereign Compute Vault", "정부·소버린 클라우드", "기밀 또는 국가 중요 워크로드를 위한 통제된 처리 구역을 구축합니다."],
      ["AI & HPC Shielded Zone", "AI 연구소·하이퍼스케일", "고가치 모델, 학습 데이터 및 가속 컴퓨팅 인프라를 보호합니다."],
      ["Colocation Shielded Vault", "코로케이션 사업자", "규제 산업 고객을 위한 측정 가능한 프리미엄 보안 등급을 제공합니다."],
      ["Mission Continuity Suite", "국방·금융·통신", "전자기 교란 위험에 노출된 중요 업무의 연속성 아키텍처를 지원합니다."],
    ],

    fullKicker: "CYBERSHIELD 전용 사이트",
    fullTitle: "이 페이지는 요약본입니다. 전체 내용은 전용 사이트에서 이어집니다.",
    fullBody:
      "CyberShield는 별도의 제품 사이트를 두고 있습니다. 아래 링크는 새 탭에서, 현재 보고 계신 언어로 열립니다. 이 요약 페이지는 그대로 남습니다.",
    fullList: [
      "차폐실 단면도 — 경계를 이루는 21가지 솔루션을 항목별로 설명",
      "10 kHz–40 GHz 측정 차폐 성능 곡선과 인용한 근거 자료",
      "일반적인 차폐 방식과의 항목별 비교",
      "초기 상담부터 검증 인도까지 6단계 도입 절차",
      "공급 범위 구분, 프로젝트 사례, 자주 묻는 질문",
      "동일한 담당자에게 전달되는 프로젝트 문의 양식",
    ],
  },
  en: {
    eyebrow: "CYBERSHIELD",
    title: "Protect the AI data centre. Contain the signal.",
    intro:
      "CyberShield creates a measurable electromagnetic security boundary around mission-critical data infrastructure — engineered, integrated and verified as one complete system.",

    valueKicker: "WHAT CYBERSHIELD ADDS",
    valueTitle: "One boundary — designed, built and measured under a single responsibility.",
    valueBody:
      "Shielding structure, doors, filters, ventilation waveguides and every penetration are engineered as one continuous boundary, assembled weld-free alongside live operations, then measured on site to EN 50147-1 / IEEE 299 and handed over as documented evidence. What you keep at the end is a measurement, not an assurance.",
    openSite: "Open the CyberShield site",
    talk: "Talk to a specialist",
    metrics: [
      ["Verified on site", "Shielding performance is measured after installation — not assumed"],
      ["Weld-free assembly", "Bolted modules installed alongside live operations, no hot work"],
      ["Built to change", "Dismount, expand or relocate the room without damage"],
    ],

    threatKicker: "THE SECURITY LAYER SOFTWARE CANNOT PROVIDE",
    threatTitle: "Not every threat enters through the network.",
    threatBody:
      "Encryption and zero-trust protect the digital domain. CyberShield addresses physical and electromagnetic exposure at the facility boundary.",
    impactLabel: "Potential impact",
    threats: [
      ["Compromising emanations", "Sensitive processing activity can be exposed through unintended electromagnetic signals — without touching the network.", "Confidentiality exposed"],
      ["Intentional interference", "Localized high-power RF or electromagnetic energy can disrupt electronics, controls and communications.", "Service interruption"],
      ["EMP / HEMP exposure", "Radiated and conducted pulse effects can challenge critical systems and continuity architectures.", "Mission continuity risk"],
      ["Boundary vulnerabilities", "Doors, ventilation, power, data, cooling and utility penetrations can become the weakest path through the shield.", "Protection degraded"],
    ],

    systemKicker: "MODULAR PAN SHIELDING SYSTEM",
    systemTitle: "A secure room engineered around the reality of your facility.",
    systemBody:
      "Prefabricated PAN modules pass through standard building doors, assemble from the inside and can be installed close to existing walls. No glue. No welding. No irreversible commitment.",
    features: [
      ["01", "Precision assembly", "Panels are bolted every 75 mm with predefined torque and conductive mesh gaskets."],
      ["02", "Architectural integration", "Flat interior surfaces for finishing, designed around raised floors, fire systems, lighting, cooling and access control."],
      ["03", "Adaptable by design", "Dismountable without damage for expansion, modification or complete relocation."],
      ["04", "Complete boundary", "Shielding structure, doors, filters, honeycombs and waveguides are treated as one system."],
    ],
    cutawayAlt: "Cutaway view of a CyberShield shielded data hall with its structure, doors, filters, ducts and power room",
    cutawayCaption:
      "Twenty-one engineered solutions make up the shielding boundary. Pick any one on the CyberShield site to see what it does and why it is there.",

    ecoKicker: "ONE CONTINUOUS BARRIER",
    ecoTitle: "Six product lines. One zero-leak boundary.",
    ecoBody:
      "Every component is engineered as part of the same shielding envelope, so performance is not lost at the joints, the doors or the penetrations.",
    eco: [
      "Prefabricated 2.0 mm galvanized steel PAN module system for walls, ceilings and floors.",
      "Heavy-duty sliding and hinged RF doors, high-attenuation RF windows and integrated access monitoring.",
      "High-performance power line filters, fibre-optic waveguide penetrations and RF signal suppressors.",
      "Honeycomb ventilation panels, acoustic panels (ISO 354) and shielded waveguides for liquid cooling and utilities.",
      "EN 50147-1 / IEEE 299 shielding measurement, leak detection, SE testing and compliance documentation.",
      "Preventive maintenance, recalibration and periodic re-certification services.",
    ],
    ecoGo: "See every product line on the CyberShield site",

    verifyKicker: "VERIFIED, NOT ASSUMED",
    verifyTitle: "Performance you don't have to take on faith.",
    verifyBody: [
      "Every CyberShield project ends with measured evidence. Shielding effectiveness is tested on site according to international standards, and documented acceptance results are handed over with the room.",
      "The standard-setting PAN type module system is verified from 10 kHz to 40 GHz, and the same attenuation is engineered into every door, filter, honeycomb vent and feed-through in the boundary.",
    ],
    attenuation: [
      ["≥ 90 dB", "Magnetic field at 10 kHz"],
      ["≥ 120 dB", "Peak, 100–400 MHz"],
      ["≥ 100 dB", "Held to 40 GHz"],
      ["EN 50147-1", "Measured on site at handover"],
    ],
    standardsTitle: "Measured and validated against",
    standards: [
      ["EN 50147-1", "Shielding effectiveness measurement"],
      ["IEEE 299", "Available as a project option"],
      ["BSI TL-03305 / 03306", "Eavesdropping-protected rooms & IT enclosures"],
      ["NATO SDIP-27 Level A", "TEMPEST design & approval, aligned with NSA 94-106"],
      ["MIL-STD-188-125-1 / -2", "HEMP and IEMI protection, project-specific validation"],
      ["ISO/IEC 27001", "Supports the physical and environmental security controls"],
    ],
    attenuationNote:
      "Values describe the guaranteed performance envelope of the standard PAN type system. The scope that applies to your project is confirmed in the specification and by on-site acceptance testing.",

    appKicker: "HOW THE ROOM IS CONFIGURED",
    appTitle: "One platform. Four mission profiles.",
    applications: [
      ["Sovereign Compute Vault", "Government & sovereign cloud", "Create a controlled processing zone for classified or nationally sensitive workloads."],
      ["AI & HPC Shielded Zone", "AI labs & hyperscale operators", "Protect high-value models, training data and accelerated compute infrastructure."],
      ["Colocation Shielded Vault", "Colocation providers", "Offer a measurable premium security tier for regulated enterprise customers."],
      ["Mission Continuity Suite", "Defense, finance & communications", "Support continuity architectures exposed to electromagnetic disruption risks."],
    ],

    fullKicker: "THE COMPLETE CYBERSHIELD SITE",
    fullTitle: "This page is a summary. The full account continues on the product site.",
    fullBody:
      "CyberShield keeps a site of its own. The link below opens in a new tab, in the language you are reading now — this summary stays where it is.",
    fullList: [
      "The room in cutaway — twenty-one engineered solutions, each explained where it sits",
      "The measured attenuation curve from 10 kHz to 40 GHz, with the publications behind it",
      "How CyberShield compares with conventional shielding, criterion by criterion",
      "The six steps from first consultation to verified handover",
      "Scope of supply, project scenarios and the questions every project starts with",
      "A project enquiry form addressed to the same specialists",
    ],
  },
} as const;

/**
 * The six product lines, in the order the product site introduces them.
 *
 * `spec` is the same figure-and-standard line the landing page's CyberShield
 * band carries, so a reader meets the identical six headings and figures on the
 * way in; it reads the same in both locales and stays out of the copy table.
 * `shot` names the photograph the product site uses for that line.
 */
/** What every link to the product site carries, so all four sites of it agree.
 *  Spread rather than repeated: a card row that opened in this window while the
 *  button above it opened a tab would be the kind of inconsistency nobody
 *  notices in review. */
const outbound = { target: "_blank", rel: "noopener" } as const;

const lines = [
  { name: "Structure", spec: "2.0 mm DX 52 D+Z · 75 mm bolt pitch", shot: "structure" },
  { name: "Access", spec: "Sliding · Hinged · RF Window", shot: "access" },
  { name: "Connectivity", spec: "Power · Signal · Data · DN200", shot: "connectivity" },
  { name: "Air & Waveguides", spec: "Honeycomb · ISO 354 αw 0.65", shot: "air" },
  { name: "Validation", spec: "EN 50147-1 · IEEE 299", shot: "validation" },
  { name: "Lifecycle", spec: "Maintenance · Re-certification", shot: "lifecycle" },
] as const;

export default function CyberShieldPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  /* One value, read in five places below: the locale-aware product site URL.
     No target attribute anywhere — same window, by the brief. */
  const site = cyberShieldUrl(lang);

  return (
    <>
      <StructuredData lang={lang} page="cybershield" description={pageDescription(lang, "cybershield")} />

      <PageShell lang={lang} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        {/* What the product is, and the way out to it — above everything a
            reader would have to scroll past to find it. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.valueKicker}</span>
              <h2>{t.valueTitle}</h2>
              <p>{t.valueBody}</p>
            </div>
            <div className="btns">
              <a className="btn btn-red" href={site} {...outbound}>
                {t.openSite}<span aria-hidden="true">↗</span>
              </a>
              <a className="btn btn-outline" href={localeRoute(lang, contactPath)}>
                {t.talk}<span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="badges badges-wide" style={{ marginTop: "56px" }}>
              {t.metrics.map(([b, s]) => (
                <div className="bd" key={b}>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why the boundary is needed. The red index slot carries the impact
            rather than a number: which of four exposures a card describes is
            the useful thing to read there, and the cards have no order. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.threatKicker}</span>
              <h2>{t.threatTitle}</h2>
              <p>{t.threatBody}</p>
            </div>
            <div className="line-grid">
              {t.threats.map(([name, body, impact]) => (
                <div className="num-col" key={name}>
                  <span className="num">{t.impactLabel} · {impact}</span>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is built. The cutaway is the product site's own render; the
            interactive version of it is one of the reasons to follow the link,
            so the caption says where it lives rather than leaving a picture
            that looks clickable and is not. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.systemKicker}</span>
              <h2>{t.systemTitle}</h2>
              <p>{t.systemBody}</p>
            </div>
            <div className="line-grid">
              {t.features.map(([no, name, body]) => (
                <div className="num-col" key={no}>
                  <span className="num">{no}</span>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <figure className="figure figure-wide" style={{ maxWidth: 1000 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/cybershield/images/cutaway.webp")}
                alt={t.cutawayAlt}
                width={1800}
                height={1009}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{t.cutawayCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* The six lines. Cards, and links — the landing page's CyberShield
            band is built the same way and lands here; these carry on to the
            product site, where each line has its own section. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.ecoKicker}</span>
              <h2>{t.ecoTitle}</h2>
              <p>{t.ecoBody}</p>
            </div>
            <div className="line-grid three">
              {lines.map((line, i) => (
                <a className="lc" key={line.name} href={site} {...outbound}>
                  <div className="lc-shot lc-shot--photo">
                    {/* Decorative, as on the landing's card rows: the heading
                        beside it names the line, and the product site
                        describes the same photograph for a screen reader. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(`/cybershield/images/ecosystem/${line.shot}.webp`)}
                      alt=""
                      width={1000}
                      height={667}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4>{line.name}</h4>
                  <p>{t.eco[i]}</p>
                  <div className="models">{line.spec}</div>
                </a>
              ))}
            </div>
            <a className="go sec-go" href={site} {...outbound}>
              {t.ecoGo}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* The measurement, and the standards it is taken against. */}
        <section>
          <div className="wrap trust">
            <div>
              <span className="kicker">{t.verifyKicker}</span>
              <h2>{t.verifyTitle}</h2>
              {t.verifyBody.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="badges badges-compact">
              {t.attenuation.map(([b, s]) => (
                <div className="bd" key={b}>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: "72px" }}>
            <h3 className="sub-head"><b>{t.standardsTitle}</b></h3>
            <div className="hairline-list">
              {/* `--name`: these are document designations with slashes and
                  hyphens in them, far longer than the short labels the row's
                  nowrap default is written for. */}
              {t.standards.map(([name, note]) => (
                <div className="hl-row hl-row--name" key={name}>
                  <b>{name}</b>
                  <span className="hl-desc">{note}</span>
                </div>
              ))}
            </div>
            <p className="cs-note">{t.attenuationNote}</p>
          </div>
        </section>

        {/* How the same platform is configured for four kinds of project. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.appKicker}</span>
              <h2>{t.appTitle}</h2>
            </div>
            <div className="hairline-list">
              {t.applications.map(([name, segment, body], i) => (
                <div className="hl-row hl-row--name" key={name}>
                  <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                  <b>{name}</b>
                  <span className="hl-desc">{segment} — {body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The hand-over. A summary that does not say what it left out asks the
            reader to guess whether following the link is worth it. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.fullKicker}</span>
              <h2>{t.fullTitle}</h2>
              <p>{t.fullBody}</p>
            </div>
            <CheckList items={t.fullList} />
            <div className="btns" style={{ marginTop: "44px" }}>
              <a className="btn btn-red" href={site} {...outbound}>
                {t.openSite}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
