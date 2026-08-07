import { cyberShieldUrl, type Lang } from "./site-config";
import SiteHeader, { type HeaderCopy } from "./site-header";
import SiteFooter, { type FooterCopy } from "./site-footer";
import StructuredData from "./structured-data";

/* All copy lives here, keyed by locale — the KO / EN pages render from the
   same tree. Chamber category order is fixed by the site map:
   Automotive → Military → Commercial → Powertrain → RVC → Others. */
const copy = {
  ko: {
    nav: { company: "회사소개", chamber: "챔버", equip: "EMC 시험장비", cyber: "CyberShield", contact: "문의", career: "채용", cta: "견적 문의" },
    navSubs: {
      contact: { quote: "견적·기술 문의", catalog: "카탈로그 다운로드" },
    },
    a11y: {
      skip: "본문 바로가기",
      primaryNav: "주 메뉴",
      mobileNav: "모바일 메뉴",
      menuOpen: "메뉴 열기",
      menuClose: "메뉴 닫기",
    },
    heroTag: "GERMAN ENGINEERING · KOREAN PARTNERSHIP",
    heroH1a: "EMC 시험의 모든 것,",
    heroH1b: "Frankonia Korea",
    heroH1c: "가 함께합니다",
    heroP: "독일 Frankonia의 EMC 챔버와 시험 시스템을 한국 시장에 공급하는 공식 파트너로서, 컨설팅부터 구축·사후지원까지 토탈 솔루션을 제공합니다.",
    heroB1: "솔루션 보기",
    heroB2: "견적·기술 상담",
    stats: [["1987", "Frankonia 설립"], ["80+", "공급 국가"], ["35+", "챔버 라인업"], ["3", "핵심 솔루션 영역"]],
    solK: "OUR SOLUTIONS",
    solH: "3대 핵심 솔루션",
    solP: "EMC 챔버, 시험장비, 그리고 CyberShield까지 — 시험 환경 구축에 필요한 모든 것을 제공합니다.",
    c1h: "챔버",
    c1sub: "Anechoic Chambers",
    c1p: "Frankosorb® 흡수체 기반의 모듈형 EMC 챔버. 사전 인증부터 완전 인증까지 표준·맞춤 설계를 모두 지원합니다.",
    c1list: ["Automotive", "Military", "Commercial", "Powertrain", "RVC (Reverberation Chamber)", "Others"],
    c2h: "EMC 시험장비",
    c2sub: "EMC Test Systems",
    c2p: "FFT 기반 EMI 리시버부터 광대역 안테나, 각종 액세서리까지 국제 규격에 부합하는 측정 장비 일체를 공급합니다.",
    c2list: ["EMI-Receiver (9kHz–6GHz)", "Antennas (9kHz–40GHz)", "Accessories · Amplifiers · GTEM"],
    ext: "외부 링크",
    c3p: "전자파 보안·차폐 솔루션 CyberShield. 상세 사양과 룸 구성은 CyberShield 공식 사이트에서 확인하실 수 있습니다.",
    c3list: ["보안 차폐 솔루션", "데이터센터 전자기 보안 경계"],
    c3go: "CyberShield 사이트 바로가기 ↗",
    more: "자세히 보기 →",
    chH: "챔버 라인업",
    chP: "적용 분야에 맞는 최적의 챔버를 제안합니다.",
    chambers: [
      "차량·전장부품 EMC 시험용 챔버 (ECE R10, CISPR 25, ISO 11452)",
      "MIL-STD-461 대응 군수·방산 EMC 시험 챔버",
      "일반 산업·전자기기용 표준 EMC 챔버",
      "전기차·파워트레인 전용 EMC 시험 챔버 솔루션",
      "잔향실(Reverberation Chamber) — 고효율 방사 내성 시험",
      "특수 목적·맞춤형 챔버 및 기타 솔루션",
    ],
    eqH: "EMC 시험장비",
    eqP: "국제 규격(IEC · CISPR · ISO · MIL-STD)에 부합하는 측정 장비 라인업",
    eq: [
      "FFT 기반 고속 EMI 측정 리시버. CISPR 16-1-1 완전 부합, 9kHz~6GHz 대역.",
      "방사 시험용 광대역 안테나 시스템. 9kHz~40GHz 전 대역 커버.",
      "RF 파워앰프(최대 12kW), GTEM 셀, E-field 센서, RF 파워미터 등 주변 장비 일체.",
    ],
    eq2models: "바이코니컬 · 로그페리오딕 · 혼 안테나",
    trK: "WHY FRANKONIA KOREA",
    trH1: "독일 본사의 기술력,",
    trH2: "한국 파트너",
    trH3: "의 밀착 지원",
    trP1: "Frankonia는 1987년 설립 이후 전 세계 80여 개국에 EMC 챔버와 시험 시스템을 공급해 온 독일의 EMC 전문 기업입니다.",
    trP2: "Frankonia Korea는 국내 고객에게 컨설팅, 설계, 구축, 교정·유지보수까지 전 과정을 한국어로 지원하며, 본사 엔지니어링 팀과의 직접 협업으로 프로젝트를 수행합니다.",
    badges: [["Since 1987", "독일 Frankonia 설립"], ["80+", "공급 국가"], ["공식 파트너", "Frankonia Group 한국 파트너"], ["토탈 지원", "컨설팅–구축–사후관리"]],
    ctH: "견적 및 기술 상담",
    ctP: "프로젝트 요구사항을 알려주시면 최적의 솔루션을 제안해 드립니다.",
    ctB1: "이메일 문의",
    ctB2: "전화 상담",
    ftDesc: "독일 Frankonia의 EMC 챔버 및 시험 시스템 한국 공식 파트너",
    ftAddr: "주소 · 사업자등록번호 · 대표자명 (추후 기입)",
    ftCompany: "회사소개",
    ftSol: "솔루션",
    ftL1: "챔버",
    ftL2: "EMC 시험장비",
    ftLink: "링크",
    ftHq: "Frankonia Group (독일 본사)",
    ftContact: "견적·기술 문의",
    ftPriv: "개인정보처리방침",
  },
  en: {
    nav: { company: "Company", chamber: "Anechoic Chambers", equip: "EMC Test Systems", cyber: "CyberShield", contact: "Contact", career: "Career", cta: "Get a Quote" },
    navSubs: {
      contact: { quote: "Quote & Technical Support", catalog: "Catalog Downloads" },
    },
    a11y: {
      skip: "Skip to content",
      primaryNav: "Primary navigation",
      mobileNav: "Mobile navigation",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    heroTag: "GERMAN ENGINEERING · KOREAN PARTNERSHIP",
    heroH1a: "Everything for EMC testing,",
    heroH1b: "Frankonia Korea",
    heroH1c: " at your side",
    heroP: "As the official Korean partner of Frankonia Germany, we deliver EMC chambers and test systems with total support — from consulting to installation and after-sales service.",
    heroB1: "Explore Solutions",
    heroB2: "Request a Quote",
    stats: [["1987", "Frankonia founded"], ["80+", "Countries supplied"], ["35+", "Chamber models"], ["3", "Core solution areas"]],
    solK: "OUR SOLUTIONS",
    solH: "Three Core Solutions",
    solP: "EMC chambers, test systems, and CyberShield — everything you need to build your test environment.",
    c1h: "Chambers",
    c1sub: "Anechoic Chambers",
    c1p: "Modular EMC chambers built on Frankosorb® absorber technology. From pre-compliance to full compliance, standardized or fully customized.",
    c1list: ["Automotive", "Military", "Commercial", "Powertrain", "RVC (Reverberation Chamber)", "Others"],
    c2h: "Test Systems",
    c2sub: "EMC Test Systems",
    c2p: "From FFT-based EMI receivers to broadband antennas and accessories — complete measurement equipment compliant with international standards.",
    c2list: ["EMI-Receiver (9kHz–6GHz)", "Antennas (9kHz–40GHz)", "Accessories · Amplifiers · GTEM"],
    ext: "External link",
    c3p: "CyberShield — electromagnetic security & shielding solutions. Full specifications and the room configurator are on the CyberShield site.",
    c3list: ["Security shielding solutions", "Electromagnetic boundary for data centres"],
    c3go: "Go to the CyberShield site ↗",
    more: "Learn more →",
    chH: "Chamber Line-up",
    chP: "The right chamber for every application field.",
    chambers: [
      "Chambers for vehicle & component EMC testing (ECE R10, CISPR 25, ISO 11452)",
      "Defense-grade EMC chambers for MIL-STD-461",
      "Standard EMC chambers for industrial & consumer electronics",
      "Dedicated EMC chambers for e-mobility & powertrain testing",
      "Reverberation chambers for high-efficiency radiated immunity testing",
      "Special-purpose and customized chamber solutions",
    ],
    eqH: "EMC Test Systems",
    eqP: "Measurement equipment compliant with IEC · CISPR · ISO · MIL-STD",
    eq: [
      "FFT-based high-speed EMI receivers. Fully CISPR 16-1-1 compliant, 9kHz–6GHz.",
      "Broadband antenna systems for radiated testing, covering 9kHz–40GHz.",
      "RF power amplifiers (up to 12kW), GTEM cells, E-field sensors, RF power meters and more.",
    ],
    eq2models: "Biconical · Log-periodic · Horn antennas",
    trK: "WHY FRANKONIA KOREA",
    trH1: "German engineering,",
    trH2: "your Korean partner",
    trH3: " at your side",
    trP1: "Since 1987, Frankonia has supplied EMC chambers and test systems to more than 80 countries worldwide.",
    trP2: "Frankonia Korea supports domestic customers through the entire project life cycle — consulting, design, installation, calibration and maintenance — in direct collaboration with the engineering team in Germany.",
    badges: [["Since 1987", "Frankonia founded in Germany"], ["80+", "Countries supplied"], ["Official Partner", "Korean partner of Frankonia Group"], ["Total Support", "Consulting – Installation – After-sales"]],
    ctH: "Quotation & Technical Consulting",
    ctP: "Tell us your project requirements and we will propose the optimal solution.",
    ctB1: "Email Us",
    ctB2: "Call Us",
    ftDesc: "Official Korean partner for Frankonia EMC chambers and test systems",
    ftAddr: "Address · Business Reg. No. · CEO (to be added)",
    ftCompany: "Company",
    ftSol: "Solutions",
    ftL1: "Chambers",
    ftL2: "EMC Test Systems",
    ftLink: "Links",
    ftHq: "Frankonia Group (Headquarters)",
    ftContact: "Quote & Technical Support",
    ftPriv: "Privacy Policy",
  },
} as const;

const chamberCards = [
  { name: "Automotive", models: "ACTC · UCC · AVTC · SAC-10V" },
  { name: "Military", models: "MIL-STD Chamber · Advanced · MIL CHC" },
  { name: "Commercial", models: "SAC 시리즈 · FAC 시리즈 · CHC · Shielded Room" },
  { name: "Powertrain", models: "EDTC-SA · EDTC-AX · EDTC-BB" },
  { name: "RVC", models: "Reverberation Chamber" },
  { name: "Others", models: "CTC · Reverberation Tent" },
] as const;

const chamberIcons = [
  <svg key="automotive" viewBox="0 0 24 24" fill="none"><path d="M3 15l2.5-6h9L19 15M3 15h18M5 15v3m14-3v3M8 12h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="military" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3.5V12c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6.5L12 3z" stroke="#fff" strokeWidth="1.7" /><path d="M12 8v5m0 3v.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="commercial" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="1.7" /><path d="M8 20V10h8v10M10 7h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="powertrain" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="1.7" /><path d="M12 8v4l3 2M12 4V2m0 20v-2M4 12H2m20 0h-2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="rvc" viewBox="0 0 24 24" fill="none"><path d="M4 12c2-4 4-6 8-6s6 2 8 6c-2 4-4 6-8 6s-6-2-8-6z" stroke="#fff" strokeWidth="1.7" /><path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" stroke="#fff" strokeWidth="1.7" /></svg>,
  <svg key="others" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M17 14v6m-3-3h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
];

const equipCards = [
  { name: "EMI-Receiver", models: "ERX-6 · ERC-6" },
  { name: "Antennas", models: "" },
  { name: "Accessories", models: "Amplifier · GTEM · Sensor · Meter" },
] as const;

const equipIcons = [
  <svg key="receiver" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="11" rx="2" stroke="#fff" strokeWidth="1.7" /><path d="M6 12h6m-6 3h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /><circle cx="17" cy="13.5" r="2" stroke="#fff" strokeWidth="1.5" /><path d="M12 8V5m0 0L9 3m3 2l3-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  <svg key="antenna" viewBox="0 0 24 24" fill="none"><path d="M12 21V9m0 0L5 3m7 6l7-6M7.5 5.2L12 9l4.5-3.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 21h8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="accessories" viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><rect x="13" y="6" width="8" height="12" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M6 14h2m7-4h2m-2 4h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
];

/** Strings the contact band needs, wherever it is reused. */
export type BandCopy = { ctH: string; ctP: string; ctB1: string; ctB2: string; heroB1: string };

/** The chrome slice of the copy object, shared with every other page, so the
 *  header, footer and contact band read the same strings as the landing. */
export const headerCopy = (lang: Lang): HeaderCopy & FooterCopy & BandCopy =>
  copy[lang];

export default function Landing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const cs = cyberShieldUrl(lang);
  return (
    <>
      {/* Standards below are the ones the chamber and equipment cards name
          further down this page — the markup restates them, it does not add
          claims. */}
      <StructuredData
        lang={lang}
        page="landing"
        description={t.heroP}
        productLines={[
          {
            id: "anechoic-chambers",
            name: "Frankonia Anechoic Chambers",
            description: t.c1p,
            standards: ["ECE R10", "CISPR 25", "ISO 11452", "MIL-STD-461"],
          },
          {
            id: "emc-test-systems",
            name: "Frankonia EMC Test Systems",
            description: t.c2p,
            standards: ["CISPR 16-1-1"],
          },
        ]}
      />
      <SiteHeader lang={lang} t={t} />

      <main id="main">
      <div className="hero" id="top">
        <div className="wrap hero-in">
          <span className="tag">{t.heroTag}</span>
          <h1>
            {t.heroH1a}
            <br />
            <em>{t.heroH1b}</em>
            {t.heroH1c}
          </h1>
          <p>{t.heroP}</p>
          <div className="btns">
            <a className="btn btn-red" href="#solutions">{t.heroB1}</a>
            <a className="btn btn-ghost" href="#contact">{t.heroB2}</a>
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

      <section id="solutions">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.solK}</span>
            <h2>{t.solH}</h2>
            <p>{t.solP}</p>
          </div>
          <div className="sol-grid">
            <div className="sol">
              <div className="thumb t1">
                <svg viewBox="0 0 64 64" fill="none"><rect x="8" y="14" width="48" height="36" rx="3" stroke="#fff" strokeWidth="2.5" /><path d="M14 20l6 6M24 20l6 6M34 20l6 6M44 20l6 6M14 30l6 6M24 30l6 6M34 30l6 6M44 30l6 6" stroke="#e60000" strokeWidth="2" /><rect x="26" y="42" width="12" height="8" fill="#fff" opacity=".8" /></svg>
              </div>
              <div className="body">
                <h3>{t.c1h} <span className="sub-label">{t.c1sub}</span></h3>
                <p>{t.c1p}</p>
                <ul>{t.c1list.map((li) => <li key={li}>{li}</li>)}</ul>
                <a className="go" href="#chambers">{t.more}</a>
              </div>
            </div>
            <div className="sol">
              <div className="thumb t2">
                <svg viewBox="0 0 64 64" fill="none"><rect x="10" y="26" width="34" height="24" rx="3" stroke="#fff" strokeWidth="2.5" /><path d="M15 33h10M15 39h14M15 45h8" stroke="#e60000" strokeWidth="2" /><circle cx="37" cy="42" r="4" stroke="#fff" strokeWidth="2" /><path d="M46 34l8-8m0 0v7m0-7h-7" stroke="#fff" strokeWidth="2.5" /><path d="M48 18c3 0 6 1.5 6 1.5" stroke="#e60000" strokeWidth="2" /></svg>
              </div>
              <div className="body">
                <h3>{t.c2h} <span className="sub-label">{t.c2sub}</span></h3>
                <p>{t.c2p}</p>
                <ul>{t.c2list.map((li) => <li key={li}>{li}</li>)}</ul>
                <a className="go" href="#equipment">{t.more}</a>
              </div>
            </div>
            <div className="sol" id="cybershield">
              <div className="thumb t3">
                <svg viewBox="0 0 64 64" fill="none"><path d="M32 8l20 8v14c0 12-8.5 21-20 26C20.5 51 12 42 12 30V16l20-8z" stroke="#fff" strokeWidth="2.5" /><path d="M23 31l6 6 12-12" stroke="#e60000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="body">
                <h3>CyberShield <span className="ext">{t.ext}</span></h3>
                <p>{t.c3p}</p>
                <ul>{t.c3list.map((li) => <li key={li}>{li}</li>)}</ul>
                <a className="go" href={cs}>{t.c3go}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt" id="chambers">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">CHAMBERS</span>
            <h2>{t.chH}</h2>
            <p>{t.chP}</p>
          </div>
          <div className="line-grid three">
            {chamberCards.map((c, i) => (
              <div className="lc" key={c.name}>
                <div className="ic">{chamberIcons[i]}</div>
                <h4>{c.name}</h4>
                <p>{t.chambers[i]}</p>
                <div className="models">{c.models}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">TEST SYSTEMS</span>
            <h2>{t.eqH}</h2>
            <p>{t.eqP}</p>
          </div>
          <div className="line-grid three">
            {equipCards.map((c, i) => (
              <div className="lc" key={c.name}>
                <div className="ic">{equipIcons[i]}</div>
                <h4>{c.name}</h4>
                <p>{t.eq[i]}</p>
                <div className="models">{c.name === "Antennas" ? t.eq2models : c.models}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="why">
        <div className="wrap trust">
          <div>
            <span className="kicker">{t.trK}</span>
            <h2>
              {t.trH1}
              <br />
              <em>{t.trH2}</em>
              {t.trH3}
            </h2>
            <p>{t.trP1}</p>
            <p>{t.trP2}</p>
          </div>
          <div className="badges">
            {t.badges.map(([b, s]) => (
              <div className="bd" key={s}>
                <b>{b}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="band" id="contact">
        <h2>{t.ctH}</h2>
        <p>{t.ctP}</p>
        <div className="btns">
          <a className="btn btn-red" href="mailto:info@frankonia-korea.com">{t.ctB1}</a>
          <a className="btn btn-ghost" href="tel:+8200000000">{t.ctB2}</a>
        </div>
      </div>
      </main>

      <SiteFooter lang={lang} t={t} />
    </>
  );
}
