import { chambersPath, industryPath, typePath } from "./chamber-sections";
import { sectionPath } from "./company-sections";
import {
  testCategoryPath,
  testProductPath,
  testSystemsPath,
} from "./test-system-sections";
import {
  asset,
  contactEmail,
  contactPhoneHref,
  localeRoute,
  type Lang,
} from "./site-config";
import SiteHeader, { type HeaderCopy } from "./site-header";
import SiteFooter, { type FooterCopy } from "./site-footer";
import StructuredData from "./structured-data";

/* All copy lives here, keyed by locale — the KO / EN pages render from the
   same tree. Chamber category order is fixed by the site map:
   Automotive → Military → Commercial → Powertrain → RVC → Others.

   The navigation labels are localised like everything else. Korean labels are
   far shorter than the English ones ("챔버" against "Anechoic Chambers"), so
   the bar is laid out to keep the same design in both: see the `.nav` rules in
   globals.css, which anchor the mark and the controls and centre the menu in
   whatever space is left rather than letting label width move them. */
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
    heroTag: "EMC TEST SOLUTIONS · ENGINEERED IN GERMANY SINCE 1987",
    heroH1a: "EMC 시험의 모든 것,",
    heroH1b: "Frankonia",
    heroH1c: "가 함께합니다",
    heroP: "1987년 이래 전 세계 80여 개국에 EMC 무향 챔버와 시험 시스템을 공급해 왔습니다. 컨설팅과 설계부터 제작·구축·검증·사후지원까지, 하나의 팀이 프로젝트 전 과정을 책임집니다.",
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
    c3p: "전자파 보안·차폐 솔루션 CyberShield. 사이트 안에서 개요를 보고, 전체 사양은 제품 사이트로 이어집니다.",
    c3list: ["보안 차폐 솔루션", "데이터센터 전자기 보안 경계"],
    c3go: "CyberShield 자세히 보기",
    more: "자세히 보기",
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
    csK: "CYBERSHIELD",
    csH: "전자파 보안·차폐 솔루션",
    csP: "AI 데이터센터와 보안 시설 주위에 측정 가능한 전자기 보안 경계를 구축합니다. 설계부터 통합, 현장 검증까지 하나의 시스템으로 제공합니다.",
    cs: [
      "자립형 강구조에 볼트로 체결하는 모듈형 차폐 패널. 화기 작업 없이 운영 중인 시설과 병행 시공하고, 확장·이전 시 재사용합니다.",
      "차폐 경계의 출입을 담당하는 RF 차폐 도어. 단문·양문형으로 통행량과 반입 장비 규격에 맞춰 구성합니다.",
      "전원·신호·데이터 라인이 경계를 통과하는 지점의 필터 뱅크. 케이블을 타고 새는 방사를 차단합니다.",
      "환기·배관 관통부의 허니콤 도파관. 공조 성능은 유지하면서 개구부를 통한 누설을 억제합니다.",
    ],
    csGo: "CyberShield 자세히 보기",
    eq2models: "바이코니컬 · 로그페리오딕 · 혼 안테나",
    trK: "WHY FRANKONIA",
    trH1: "측정으로 증명하는",
    trH2: "EMC 엔지니어링",
    trH3: ", 1987년부터",
    trP1: "Frankonia는 1987년 설립 이후 전 세계 80여 개국에 EMC 챔버와 시험 시스템을 공급해 온 독일의 EMC 전문 기업입니다.",
    trP2: "챔버와 시험 시스템을 자체 엔지니어링 팀이 직접 설계하고 생산합니다. 요구사항 정의와 사전 검토부터 설치, 인수 시험, 교정과 유지보수까지 한 팀이 끝까지 담당합니다.",
    trGo: "회사 소개",
    badges: [["Since 1987", "Frankonia 설립"], ["80+", "공급 국가"], ["Made in Germany", "자체 설계·생산"], ["토탈 지원", "컨설팅–구축–사후관리"]],
    ctH: "견적 및 기술 상담",
    ctP: "프로젝트 요구사항을 알려주시면 최적의 솔루션을 제안해 드립니다.",
    ctB1: "이메일 문의",
    ctB2: "전화 상담",
    ftDesc: "EMC 무향 챔버 · 시험 시스템 · 차폐 솔루션 — 1987년부터 전 세계 80여 개국",
    // 본사 주소. frankonia-solutions.com 연락처와 CyberShield 임프린트가 일치하는 값.
    ftAddr: "Frankonia Germany EMC Solutions GmbH · Industriestraße 16, 91180 Heideck, Germany · T +49 9177 98-500",
    ftCompany: "회사소개",
    ftSol: "솔루션",
    ftL1: "챔버",
    ftL2: "EMC 시험장비",
    ftLink: "링크",
    ftHq: "Frankonia Group",
    ftContact: "견적·기술 문의",
    ftImprint: "법적 고지",
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
    heroTag: "EMC TEST SOLUTIONS · ENGINEERED IN GERMANY SINCE 1987",
    heroH1a: "Everything for EMC testing,",
    heroH1b: "Frankonia",
    heroH1c: " at your side",
    heroP: "Since 1987 we have supplied EMC anechoic chambers and test systems to more than 80 countries. One team carries the project from consulting and design through manufacturing, installation, verification and after-sales service.",
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
    c3p: "CyberShield — electromagnetic security & shielding solutions. Read the overview here; the full specifications continue on the product site.",
    c3list: ["Security shielding solutions", "Electromagnetic boundary for data centres"],
    c3go: "Explore CyberShield",
    more: "Learn more",
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
    csK: "CYBERSHIELD",
    csH: "Electromagnetic Security & Shielding",
    csP: "A measurable electromagnetic security boundary around AI data centres and secure facilities — engineered, integrated and verified on site as one system.",
    cs: [
      "Modular shielding panels bolted onto a self-supporting steel structure. No hot work, so installation runs alongside live operations, and the panels are reusable when the room is extended or relocated.",
      "RF shielded doors carrying access through the boundary — single or double leaf, sized to traffic and to the equipment that has to pass through.",
      "Filter banks where power, signal and data lines cross the boundary, stopping emissions that would otherwise travel out along the cabling.",
      "Honeycomb waveguides at ventilation and pipe penetrations, holding back leakage through the openings while airflow performance is preserved.",
    ],
    csGo: "Explore CyberShield",
    eq2models: "Biconical · Log-periodic · Horn antennas",
    trK: "WHY FRANKONIA",
    trH1: "EMC engineering",
    trH2: "proven by measurement",
    trH3: ", since 1987",
    trP1: "Since 1987, Frankonia has supplied EMC chambers and test systems to more than 80 countries worldwide.",
    trP2: "Our chambers and test systems are designed and built by our own engineering team. One team carries a project from requirements and pre-study through installation, acceptance testing, calibration and maintenance.",
    trGo: "About Frankonia",
    badges: [["Since 1987", "Frankonia founded"], ["80+", "Countries supplied"], ["Made in Germany", "Designed and built in-house"], ["Total Support", "Consulting – Installation – After-sales"]],
    ctH: "Quotation & Technical Consulting",
    ctP: "Tell us your project requirements and we will propose the optimal solution.",
    ctB1: "Email Us",
    ctB2: "Call Us",
    ftDesc: "EMC anechoic chambers, test systems and shielding solutions — more than 80 countries since 1987",
    ftAddr: "Frankonia Germany EMC Solutions GmbH · Industriestraße 16, 91180 Heideck, Germany · T +49 9177 98-500",
    ftCompany: "Company",
    ftSol: "Solutions",
    ftL1: "Chambers",
    ftL2: "EMC Test Systems",
    ftLink: "Links",
    ftHq: "Frankonia Group",
    ftContact: "Quote & Technical Support",
    ftImprint: "Imprint",
    ftPriv: "Privacy Policy",
  },
} as const;

/* The six cards the site map fixes the order of, each now pointing at the page
   that carries its models. Five are industries and RVC is a chamber form —
   that is the mix the site map asks for, and the chamber branch indexes both
   axes, so each card can reach its own list without flattening the two into
   one. The cards already lifted and turned their heading red on hover; they
   were simply not links, which is a promise a page should not make twice. */
/* `shot` is the card's picture. Every one is now a photograph of a real
   chamber, taken from the 2026 catalogue and photobook — Automotive, Military
   and Commercial were cutaway renders until those arrived, and a drawing of a
   chamber is a weaker argument than the chamber. `kind` stays because the
   fitting rule differs: photographs fill the frame, renders would have to be
   fitted whole against white, and the site may take renders again for a model
   that has no photograph.

   Others has none. The head office serves the same file for CTC as for ACTC,
   the reverberation chamber's photograph is already the RVC card's, and the
   tent has no picture at all — so that card keeps the icon the whole row used
   to carry. Better an even row with one plain tile than a made-up photograph. */
const chamberCards = [
  { name: "Automotive", models: "ACTC · UCC · AVTC · SAC-10V", path: industryPath("automotive"),
    shot: { src: "/chambers/images/industry-automotive.webp", w: 900, h: 578, kind: "photo" } },
  { name: "Military", models: "MIL-STD Chamber · Advanced · MIL CHC", path: industryPath("military"),
    shot: { src: "/chambers/images/industry-military.webp", w: 744, h: 590, kind: "photo" } },
  { name: "Commercial", models: "SAC 시리즈 · FAC 시리즈 · CHC · Shielded Room", path: industryPath("commercial"),
    shot: { src: "/chambers/images/industry-commercial.webp", w: 900, h: 636, kind: "photo" } },
  { name: "Powertrain", models: "EDTC-SA · EDTC-AX · EDTC-BB", path: industryPath("powertrain"),
    shot: { src: "/chambers/images/industry-powertrain-edtc.webp", w: 900, h: 600, kind: "photo" } },
  { name: "RVC", models: "Reverberation Chamber", path: typePath("rvc"),
    shot: { src: "/chambers/images/type-rvc-reverberation.webp", w: 900, h: 600, kind: "photo" } },
  { name: "Others", models: "CTC · Reverberation Tent", path: industryPath("others"), shot: null },
] as const;

const chamberIcons = [
  <svg key="automotive" viewBox="0 0 24 24" fill="none"><path d="M3 15l2.5-6h9L19 15M3 15h18M5 15v3m14-3v3M8 12h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="military" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3.5V12c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6.5L12 3z" stroke="#fff" strokeWidth="1.7" /><path d="M12 8v5m0 3v.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="commercial" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="1.7" /><path d="M8 20V10h8v10M10 7h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="powertrain" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="1.7" /><path d="M12 8v4l3 2M12 4V2m0 20v-2M4 12H2m20 0h-2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="rvc" viewBox="0 0 24 24" fill="none"><path d="M4 12c2-4 4-6 8-6s6 2 8 6c-2 4-4 6-8 6s-6-2-8-6z" stroke="#fff" strokeWidth="1.7" /><path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" stroke="#fff" strokeWidth="1.7" /></svg>,
  <svg key="others" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M17 14v6m-3-3h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
];

/* These three predate the Test Systems branch and do not line up with it. The
   branch is built from the head office's six product families — amplifiers,
   antennas, field strength meters, preamplifiers, power meters, integrated
   systems — and carries no EMI receiver at all, so "ERX-6 · ERC-6" names two
   models this site has no page for. Each card therefore goes to the nearest
   real destination rather than to a page that would have to be invented:
   antennas have their own family, EMI receivers are emission-measurement
   equipment, and Accessories spans four families at once so it goes to the
   overview. Reconciling the cards with the six families is a copy decision,
   noted in the README rather than made here. */
const equipCards = [
  { name: "EMI-Receiver", models: "ERX-6 · ERC-6", path: testCategoryPath("emission") },
  { name: "Antennas", models: "", path: testProductPath("antenna") },
  { name: "Accessories", models: "Amplifier · GTEM · Sensor · Meter", path: testSystemsPath },
] as const;

const equipIcons = [
  <svg key="receiver" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="11" rx="2" stroke="#fff" strokeWidth="1.7" /><path d="M6 12h6m-6 3h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /><circle cx="17" cy="13.5" r="2" stroke="#fff" strokeWidth="1.5" /><path d="M12 8V5m0 0L9 3m3 2l3-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  <svg key="antenna" viewBox="0 0 24 24" fill="none"><path d="M12 21V9m0 0L5 3m7 6l7-6M7.5 5.2L12 9l4.5-3.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 21h8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="accessories" viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.7" /><rect x="13" y="6" width="8" height="12" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M6 14h2m7-4h2m-2 4h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
];

/* CyberShield gets its own band below the test-system line-up: it is a
   shielding solution, not measurement equipment, so it does not belong in the
   EMC Test Systems grid. The cards mirror the product page's ecosystem —
   panels, doors, filters, waveguides — and the band closes with the link into
   /cybershield, where the full page lives. */
const cyberCards = [
  { name: "Shielding Panels", models: "Modular PAN Panel" },
  { name: "RF Doors", models: "Single · Double Leaf" },
  { name: "Filters", models: "Power · Signal · Data" },
  { name: "Waveguides", models: "Honeycomb Vent · Penetration" },
] as const;

const cyberIcons = [
  <svg key="panel" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M9 4v16m6-16v16M3 12h18" stroke="#fff" strokeWidth="1.5" /></svg>,
  <svg key="door" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M12 3v18" stroke="#fff" strokeWidth="1.5" /><path d="M9.5 12h-.01m5.01 0h.01" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg>,
  <svg key="filter" viewBox="0 0 24 24" fill="none"><path d="M3 12h4m10 0h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /><rect x="7" y="7" width="10" height="10" rx="1.5" stroke="#fff" strokeWidth="1.7" /><path d="M10 14l4-4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="waveguide" viewBox="0 0 24 24" fill="none"><path d="M7 4.5h4L13 8l-2 3.5H7L5 8l2-3.5zm6 0h4L19 8l-2 3.5h-4L11 8l2-3.5zM7 12.5h4L13 16l-2 3.5H7L5 16l2-3.5zm6 0h4L19 16l-2 3.5h-4L11 16l2-3.5z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
];

/** Strings the contact band needs, wherever it is reused. */
export type BandCopy = { ctH: string; ctP: string; ctB1: string; ctB2: string; heroB1: string };

/** The chrome slice of the copy object, shared with every other page, so the
 *  header, footer and contact band read the same strings as the landing. */
export const headerCopy = (lang: Lang): HeaderCopy & FooterCopy & BandCopy =>
  copy[lang];

export default function Landing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const cs = localeRoute(lang, "/cybershield");
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
        {/* The chamber behind the headline. Decorative — the h1 says what the
            company does and this says what that looks like; naming it in alt
            would only put a caption in front of the sentence it illustrates.
            An <img> rather than a CSS background so it is in the HTML the
            browser parses first: this is the largest thing on the page and
            wants to start downloading before the stylesheet resolves. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-shot"
          src={asset("/chambers/images/hero-anechoic-chamber.webp")}
          alt=""
          width={2000}
          height={1415}
          fetchPriority="high"
          decoding="async"
        />
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
                {/* The trailing glyph is its own element so it can lean out of
                    the link on hover, as it does on the reference page. */}
                {/* The branch overview, not this page's own summary band. The
                    band below is a preview of the branch; "read more" should
                    leave the landing page, not scroll it. */}
                <a className="go" href={localeRoute(lang, chambersPath)}>{t.more}<span aria-hidden="true">→</span></a>
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
                <a className="go" href={localeRoute(lang, testSystemsPath)}>{t.more}<span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="sol" id="cybershield">
              <div className="thumb t3">
                <svg viewBox="0 0 64 64" fill="none"><path d="M32 8l20 8v14c0 12-8.5 21-20 26C20.5 51 12 42 12 30V16l20-8z" stroke="#fff" strokeWidth="2.5" /><path d="M23 31l6 6 12-12" stroke="#e60000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="body">
                <h3>CyberShield</h3>
                <p>{t.c3p}</p>
                <ul>{t.c3list.map((li) => <li key={li}>{li}</li>)}</ul>
                <a className="go" href={cs}>{t.c3go}<span aria-hidden="true">→</span></a>
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
              <a className="lc" key={c.name} href={localeRoute(lang, c.path)}>
                {c.shot ? (
                  <div className={`lc-shot lc-shot--${c.shot.kind}`}>
                    {/* Decorative: the heading beside it already names the
                        category, and a screen reader repeating "cutaway of an
                        automotive chamber" under the word Automotive is noise.
                        The pictures are described in the asset ledger. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(c.shot.src)} alt="" width={c.shot.w} height={c.shot.h} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div className="lc-shot lc-shot--icon">
                    <span className="ic">{chamberIcons[i]}</span>
                  </div>
                )}
                <h4>{c.name}</h4>
                <p>{t.chambers[i]}</p>
                <div className="models">{c.models}</div>
              </a>
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
              <a className="lc" key={c.name} href={localeRoute(lang, c.path)}>
                <div className="ic">{equipIcons[i]}</div>
                <h4>{c.name}</h4>
                <p>{t.eq[i]}</p>
                <div className="models">{c.name === "Antennas" ? t.eq2models : c.models}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="cybershield-solutions">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.csK}</span>
            <h2>{t.csH}</h2>
            <p>{t.csP}</p>
          </div>
          <div className="line-grid">
            {cyberCards.map((c, i) => (
              <div className="lc" key={c.name}>
                <div className="ic">{cyberIcons[i]}</div>
                <h4>{c.name}</h4>
                <p>{t.cs[i]}</p>
                <div className="models">{c.models}</div>
              </div>
            ))}
          </div>
          <a className="go sec-go" href={cs}>{t.csGo}<span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section id="why">
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
            {/* The band makes a claim about the company and then left the
                reader with nowhere to check it. Philosophy is where the
                Company section opens. */}
            <a className="go" href={localeRoute(lang, sectionPath("philosophy"))}>
              {t.trGo}<span aria-hidden="true">→</span>
            </a>
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
          <a className="btn btn-red" href={`mailto:${contactEmail}`}>{t.ctB1}</a>
          <a className="btn btn-ghost" href={contactPhoneHref}>{t.ctB2}</a>
        </div>
      </div>
      </main>

      <SiteFooter lang={lang} t={t} />
    </>
  );
}
