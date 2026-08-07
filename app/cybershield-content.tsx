import { cyberShieldUrl, localeRoute, type Lang } from "./site-config";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { headerCopy } from "./landing";
import StructuredData from "./structured-data";

/* Internal CyberShield page. The product site (frankonia-cybershield.com)
   sends X-Frame-Options: SAMEORIGIN, so it cannot be iframed here — instead
   this page renders the CyberShield story natively in our design system and
   links out to the full product site per locale. */

const csCopy = {
  ko: {
    eyebrow: "CYBERSHIELD — PHYSICAL & ELECTROMAGNETIC SECURITY",
    h1a: "AI 데이터센터를 보호하고,",
    h1b: "신호를 가둡니다",
    p: "CyberShield는 미션 크리티컬 데이터 인프라 주위에 측정 가능한 전자기 보안 경계를 만듭니다 — 하나의 완결된 시스템으로 설계·시공·검증됩니다.",
    b1: "전체 사이트 보기 ↗",
    b2: "견적·기술 상담",
    stats: [["120dB", "최대 차폐 성능 (10kHz–40GHz)"], ["EN 50147-1", "IEEE 299 현장 실측 검증"], ["Weld-free", "무용접 볼트 조립 시공"], ["1987", "Frankonia 차폐 기술 헤리티지"]],
    envK: "WHO CYBERSHIELD IS BUILT FOR",
    envH: "경계가 반드시 지켜져야 하는 세 개의 환경",
    envs: [
      ["01", "하이퍼스케일 클라우드 · AI 센터", "핵심 AI 컴퓨팅 클러스터와 양자 하드웨어를 RF 탬퍼링·고출력 전자기 위협으로부터 차폐합니다."],
      ["02", "코로케이션 · 엔터프라이즈 데이터센터", "엄격한 거버넌스 요건의 고객에게 인증된 차폐 볼트를 측정 가능한 프리미엄 보안 티어로 제공합니다."],
      ["03", "국방 · 정부 · 금융 기관", "소버린 클라우드와 고빈도 거래 인프라 — 가정이 아닌 측정으로 입증되는 보안."],
    ],
    lineK: "ONE CONTINUOUS BARRIER",
    lineH: "여섯 개의 제품 라인, 하나의 연속된 경계",
    lines: [
      ["CyberShield Structure", "2.0mm 아연도금 강판 PAN 모듈 차폐 구조체"],
      ["CyberShield Access", "RF 차폐 도어 및 윈도우"],
      ["CyberShield Connectivity", "전원·데이터 라인 필터"],
      ["CyberShield Air & Waveguides", "허니컴 환기 도파관"],
      ["CyberShield Validation", "현장 측정·인증 (EN 50147-1 / IEEE 299)"],
      ["CyberShield Lifecycle", "유지보수·재검증 서비스"],
    ],
    ctH: "CyberShield 프로젝트 상담",
    ctP: "시설 규모와 보안 요건을 알려주시면 본사 엔지니어링 팀과 함께 구성을 제안합니다.",
    ctB1: "전체 사이트에서 보기 ↗",
    ctB2: "견적 문의",
    note: "상세 사양·표준·인터랙티브 룸 구성은 CyberShield 전용 사이트에서 확인할 수 있습니다.",
  },
  en: {
    eyebrow: "CYBERSHIELD — PHYSICAL & ELECTROMAGNETIC SECURITY",
    h1a: "Protect the AI data centre.",
    h1b: "Contain the signal",
    p: "CyberShield creates a measurable electromagnetic security boundary around mission-critical data infrastructure — engineered, integrated and verified as one complete system.",
    b1: "Visit the full site ↗",
    b2: "Request a Quote",
    stats: [["120dB", "Attenuation up to (10kHz–40GHz)"], ["EN 50147-1", "Verified on site to IEEE 299"], ["Weld-free", "Bolted modular assembly"], ["1987", "Frankonia shielding heritage"]],
    envK: "WHO CYBERSHIELD IS BUILT FOR",
    envH: "Three environments where the boundary has to hold",
    envs: [
      ["01", "Hyperscale cloud & AI centres", "Core AI compute clusters and quantum hardware, shielded against RF tampering and high-power electromagnetic threats."],
      ["02", "Colocation & enterprise data centres", "A certified shielded vault offered as a premium, measurable security tier under strict governance requirements."],
      ["03", "Defence, government & financial", "Sovereign cloud and high-frequency trading infrastructure — security proven by measurement, not assumption."],
    ],
    lineK: "ONE CONTINUOUS BARRIER",
    lineH: "Six product lines, one continuous boundary",
    lines: [
      ["CyberShield Structure", "2.0mm galvanized-steel PAN shielding modules"],
      ["CyberShield Access", "RF-shielded doors and windows"],
      ["CyberShield Connectivity", "Power and data line filters"],
      ["CyberShield Air & Waveguides", "Honeycomb ventilation waveguides"],
      ["CyberShield Validation", "On-site testing & certification (EN 50147-1 / IEEE 299)"],
      ["CyberShield Lifecycle", "Maintenance and re-validation services"],
    ],
    ctH: "Discuss your CyberShield project",
    ctP: "Tell us your facility scale and security requirements — we will propose a configuration together with the engineering team in Germany.",
    ctB1: "View the full site ↗",
    ctB2: "Get a Quote",
    note: "Full specifications, standards and the interactive room configurator are available on the dedicated CyberShield site.",
  },
} as const;

/** Locale-matched URL on the external CyberShield site (English at the root,
 *  Korean under /ko/). */
const csExternal = (lang: Lang) =>
  lang === "en" ? cyberShieldUrl : `${cyberShieldUrl}${lang}/`;

export default function CyberShieldPage({ lang }: { lang: Lang }) {
  const t = csCopy[lang];
  const home = localeRoute(lang);
  return (
    <>
      <StructuredData lang={lang} page="cybershield" description={t.p} />
      <SiteHeader lang={lang} t={headerCopy(lang)} />

      <main id="main">
      <div className="hero" id="top">
        <div className="wrap hero-in">
          <span className="tag">{t.eyebrow}</span>
          <h1>
            {t.h1a}
            <br />
            <em>{t.h1b}</em>.
          </h1>
          <p>{t.p}</p>
          <div className="btns">
            <a className="btn btn-red" href={csExternal(lang)} target="_blank" rel="noopener">{t.b1}</a>
            <a className="btn btn-ghost" href={`${home}#contact`}>{t.b2}</a>
          </div>
        </div>
        <div className="wrap hero-stats">
          {t.stats.map(([num, label]) => (
            <div className="st" key={label}>
              <b>{num}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.envK}</span>
            <h2>{t.envH}</h2>
          </div>
          <div className="line-grid three">
            {t.envs.map(([no, title, body]) => (
              <div className="num-col" key={no}>
                <span className="num">{no}</span>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.lineK}</span>
            <h2>{t.lineH}</h2>
          </div>
          <div className="hairline-list">
            {t.lines.map(([name, desc], i) => (
              <div className="hl-row" key={name}>
                <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                <b>{name}</b>
                <span className="hl-desc">{desc}</span>
              </div>
            ))}
          </div>
          <p className="cs-note">{t.note}</p>
        </div>
      </section>

      <div className="band" id="contact">
        <h2>{t.ctH}</h2>
        <p>{t.ctP}</p>
        <div className="btns">
          <a className="btn btn-red" href={csExternal(lang)} target="_blank" rel="noopener">{t.ctB1}</a>
          <a className="btn btn-ghost" href={`${home}#contact`}>{t.ctB2}</a>
        </div>
      </div>
      </main>

      <SiteFooter lang={lang} t={headerCopy(lang)} />
    </>
  );
}
