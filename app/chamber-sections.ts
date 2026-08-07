import { industries, isIndustry, type Industry } from "./industries";
import type { Lang } from "./site-config";

/**
 * The Anechoic Chambers branch of the navigation, and the model data both of
 * its index axes read from.
 *
 * The head office lists the same 27 chambers on one filtered portfolio page
 * (frankonia-solutions.com/chambers-2/), tagging each with an industry. A
 * chamber also has a form — semi-anechoic, fully anechoic, compact — which
 * that page carries only inside per-model tag strings and never surfaces as a
 * way in. Those are two independent axes over one set of products, which is
 * why the models live here as data with an `industry` and a `type` field
 * rather than in a folder per category: a folder tree can express one axis,
 * and we need both.
 */

/** Industry filter, in the head office's own order of prominence. The list
 *  itself lives in industries.ts because the test-system branch sorts by the
 *  same five. */
export const chamberIndustries = industries;

/** Chamber form. Largest family first, single-model families last. */
export const chamberTypes = [
  "sac",
  "fac",
  "chc",
  "component",
  "rvc",
  "shielded-room",
] as const;

/** Standalone pages under Anechoic Chambers that are not model indexes. Each
 *  one maps to a page the head office already publishes. */
export const chamberTopics = [
  "frankosorb",
  "shielding-gates",
  "automation",
  "services",
  "references",
] as const;

export type ChamberIndustry = Industry;
export type ChamberType = (typeof chamberTypes)[number];
export type ChamberTopic = (typeof chamberTopics)[number];

export const isChamberIndustry = isIndustry;
export const isChamberType = (v: string): v is ChamberType =>
  (chamberTypes as readonly string[]).includes(v);
export const isChamberTopic = (v: string): v is ChamberTopic =>
  (chamberTopics as readonly string[]).includes(v);

export type ChamberModel = {
  /** Product name exactly as the head office writes it. Not translated: these
   *  are model designations, and a Korean rendering would not match the
   *  catalogue, the drawings or the quotation. */
  name: string;
  /** One-line descriptor from the head office portfolio card. */
  desc: string;
  /** `industry` is single-valued because the source data is: every model
   *  carries exactly one `us_portfolio_category-*`. Widen to an array only
   *  when we deliberately cross-list a model, not by default. */
  industry: ChamberIndustry;
  type: ChamberType;
  /** Head office portfolio slug — the source page for this model's content,
   *  under frankonia-solutions.com/portfolio/. Kept so the content pass can
   *  find each original without searching for it again. */
  source: string;
};

/**
 * All 27 chambers. `industry` is the head office's own tag, read off the
 * portfolio grid. `type` is ours — derived from the model name and the head
 * office's per-model tag text (`semi-anechoic-…`, `fully-anechoic-…`,
 * `pre-compliant-3m-compact-…`).
 *
 * Three of them — AVTC and the two MIL-STD chambers — carry no form in their
 * tag, so they are placed by what they are (large vehicle-scale chambers) and
 * should be confirmed against the model page during the content pass.
 */
export const chamberModels: readonly ChamberModel[] = [
  { name: "ACTC", desc: "Automotive Component Testing Chamber", industry: "automotive", type: "component", source: "actc" },
  { name: "UCC", desc: "Pre-compliance Automotive Component Testing Chamber", industry: "automotive", type: "component", source: "ucc" },
  { name: "SAC-10V", desc: "Semi Anechoic 10m EMC Chamber dedicated to Vehicle Tests per ECE R10", industry: "automotive", type: "sac", source: "sac-10-v" },
  { name: "AVTC", desc: "Automotive Vehicle Testing Chamber", industry: "automotive", type: "sac", source: "avtc" },

  { name: "MIL CHC", desc: "Military Components Testing Chamber", industry: "military", type: "chc", source: "mil-chc" },
  { name: "MIL-STD Chamber", desc: "Military Testing Chamber for Vehicles and large EUTs", industry: "military", type: "sac", source: "mil-std-chamber" },
  { name: "MIL-STD Chamber Advanced", desc: "Military Testing Chamber for Vehicles and large EUTs", industry: "military", type: "sac", source: "mil-std-chamber-advanced" },

  { name: "SAC-3 Plus", desc: "Semi Anechoic 3m EMC Chamber with dome-shape design", industry: "commercial", type: "sac", source: "sac-3-plus" },
  { name: "SAC-3 Square", desc: "Semi Anechoic 3m EMC Chamber with traditional square design", industry: "commercial", type: "sac", source: "sac-3-square" },
  { name: "SAC-5 Plus", desc: "Semi Anechoic 5m EMC Chamber with dome-shape design", industry: "commercial", type: "sac", source: "sac-5-plus" },
  { name: "SAC-5 Square", desc: "Semi Anechoic 5m EMC Chamber with traditional square design", industry: "commercial", type: "sac", source: "sac-5-square" },
  { name: "SAC-10 Plus", desc: "Semi Anechoic 10m EMC Chamber with Single Axis", industry: "commercial", type: "sac", source: "sac-10-plus" },
  { name: "SAC-10 Plus Triton", desc: "Semi Anechoic 10m EMC Chamber with Multi-axes", industry: "commercial", type: "sac", source: "triton" },
  { name: "SAC-10/H Hybrid", desc: "Semi Anechoic 10m EMC Chamber with Hybrid Absorbers", industry: "commercial", type: "sac", source: "sac-10-h-hybrid" },
  { name: "SAC-10/P Pyramid", desc: "Semi Anechoic 10m EMC Chamber with Long-pyramid P2400 Absorbers", industry: "commercial", type: "sac", source: "sac-10-p-pyramid" },
  { name: "FAC-3", desc: "Compact Fully Anechoic 3m EMC Chamber for table-top EUTs", industry: "commercial", type: "fac", source: "fac-3" },
  { name: "FAC-3 L", desc: "Fully Anechoic 3m EMC Chamber for floor-standing EUTs", industry: "commercial", type: "fac", source: "fac-3-l" },
  { name: "SAC-3 / FAC-3 Transformer", desc: "Semi and Fully Anechoic 3m EMC Chamber, transformable combination", industry: "commercial", type: "fac", source: "sac-3-fac-3-transformer" },
  { name: "CHC", desc: "Pre-compliant 3m Compact EMC Chamber", industry: "commercial", type: "chc", source: "chc" },
  { name: "CHC Plus", desc: "Pre-compliant 3m Compact EMC Chamber", industry: "commercial", type: "chc", source: "chc-plus" },
  { name: "CTC", desc: "Component Testing Chamber", industry: "commercial", type: "component", source: "ctc" },

  { name: "EDTC-SA", desc: "Single Motor Setup — Electric or Hydraulic", industry: "powertrain", type: "component", source: "edtc" },
  { name: "EDTC-AX", desc: "Axis Setup", industry: "powertrain", type: "component", source: "edtc-ax" },
  { name: "EDTC-BB", desc: "with EMC-BlueBox", industry: "powertrain", type: "component", source: "edtc-bb" },

  { name: "Reverberation Chamber", desc: "Reverberation test solution", industry: "others", type: "rvc", source: "reverberation-solutions" },
  { name: "Reverberation Tent", desc: "Reverberation Test inside EMC Chambers", industry: "others", type: "rvc", source: "reverberation-tent" },
  { name: "Shielded Room", desc: "Modular and pre-fabricated Standard", industry: "others", type: "shielded-room", source: "shielded-room" },
];

export const modelsByIndustry = (industry: ChamberIndustry) =>
  chamberModels.filter((m) => m.industry === industry);

export const modelsByType = (type: ChamberType) =>
  chamberModels.filter((m) => m.type === type);

/** Nav label, dropdown caption and meta description per locale. Single source:
 *  the navigation, the page head and the search snippet all read from here. */
type Entry = { label: string; description: string; note?: string };

/** Industries carry no label of their own here — both branches read it from
 *  industries.ts so the two menus cannot drift apart. */
type IndustryEntry = { description: string; note: string };

export const chamberIndustryMeta = {
  ko: {
    automotive: {
      note: "ACTC · UCC · SAC-10V · AVTC",
      description:
        "차량·전장부품 EMC 시험용 챔버 4종. ECE R10, CISPR 25/EN 55025, ISO 11452-2, CISPR 12/EN 55012 시험에 대응합니다.",
    },
    military: {
      note: "MIL CHC · MIL-STD Chamber",
      description:
        "MIL-STD-461 RS-103 대응 군수·방산 EMC 시험 챔버 3종. 부품 단위부터 차량·대형 피시험체까지.",
    },
    commercial: {
      note: "SAC · FAC · CHC 계열",
      description:
        "일반 산업·전자기기용 EMC 챔버 14종. 3m·5m·10m 반무향, 완전무향, 컴팩트 챔버 전 계열.",
    },
    powertrain: {
      note: "EDTC-SA · AX · BB",
      description:
        "전기차 구동계 시험용 EMC 챔버 3종. 단일 모터(EDTC-SA), 축 구성(EDTC-AX), EMC-BlueBox(EDTC-BB).",
    },
    others: {
      note: "Reverberation · Shielded Room",
      description:
        "잔향실, 잔향 텐트, 모듈형 차폐룸 — 표준 카테고리에 속하지 않는 특수·맞춤 솔루션 3종.",
    },
  },
  en: {
    automotive: {
      note: "ACTC · UCC · SAC-10V · AVTC",
      description:
        "Four chambers for vehicle and automotive component EMC testing, covering ECE R10, CISPR 25 / EN 55025, ISO 11452-2 and CISPR 12 / EN 55012.",
    },
    military: {
      note: "MIL CHC · MIL-STD Chamber",
      description:
        "Three defence-grade EMC chambers for MIL-STD-461 RS-103, from component level up to vehicles and large EUTs.",
    },
    commercial: {
      note: "SAC · FAC · CHC series",
      description:
        "Fourteen chambers for industrial and consumer electronics — the full 3m, 5m and 10m semi-anechoic, fully anechoic and compact range.",
    },
    powertrain: {
      note: "EDTC-SA · AX · BB",
      description:
        "Three EMC chambers for electric drivetrain testing: single motor (EDTC-SA), axis setup (EDTC-AX) and EMC-BlueBox (EDTC-BB).",
    },
    others: {
      note: "Reverberation · Shielded Room",
      description:
        "Reverberation chamber, reverberation tent and modular shielded room — three solutions outside the standard categories.",
    },
  },
} as const satisfies Record<Lang, Record<ChamberIndustry, IndustryEntry>>;

export const typeMeta = {
  ko: {
    sac: {
      label: "반무향 챔버 SAC",
      description:
        "반무향 EMC 챔버 12종. 3m·5m·10m 측정거리의 SAC 전 계열과 차량용 대형 챔버를 한자리에서 비교합니다.",
    },
    fac: {
      label: "완전무향 챔버 FAC",
      description:
        "완전무향 EMC 챔버 3종. 테이블탑 FAC-3, 플로어스탠딩 FAC-3 L, 반무향·완전무향 변환형 Transformer.",
    },
    chc: {
      label: "컴팩트 챔버 CHC",
      description:
        "사전 인증(pre-compliance)용 3m 컴팩트 챔버 3종. CHC, CHC Plus, 군수용 MIL CHC.",
    },
    component: {
      label: "부품·구동계 챔버",
      description:
        "부품 단위 시험 챔버 6종. 전장부품용 ACTC·UCC·CTC와 전기차 구동계용 EDTC 시리즈.",
    },
    rvc: {
      label: "잔향실 RVC",
      description:
        "잔향 시험 솔루션 2종. 독립형 잔향실과 기존 챔버 안에 설치하는 잔향 텐트.",
    },
    "shielded-room": {
      label: "차폐룸",
      description:
        "모듈형 조립식 표준 차폐룸. 현장 조립·해체와 이전 후 재사용이 가능한 구조입니다.",
    },
  },
  en: {
    sac: {
      label: "Semi-Anechoic SAC",
      description:
        "Twelve semi-anechoic EMC chambers — the full SAC range at 3m, 5m and 10m measurement distance, plus the vehicle-scale chambers.",
    },
    fac: {
      label: "Fully Anechoic FAC",
      description:
        "Three fully anechoic EMC chambers: table-top FAC-3, floor-standing FAC-3 L, and the transformable SAC-3 / FAC-3 combination.",
    },
    chc: {
      label: "Compact CHC",
      description:
        "Three 3m compact chambers for pre-compliance testing: CHC, CHC Plus and the military MIL CHC.",
    },
    component: {
      label: "Component & E-Drive",
      description:
        "Six component-level chambers — ACTC, UCC and CTC for automotive components, and the EDTC series for electric drivetrains.",
    },
    rvc: {
      label: "Reverberation RVC",
      description:
        "Two reverberation solutions: the standalone reverberation chamber, and the tent installed inside an existing EMC chamber.",
    },
    "shielded-room": {
      label: "Shielded Room",
      description:
        "Modular, pre-fabricated standard shielded room — assembled and dismantled on site, and reusable after relocation.",
    },
  },
} as const satisfies Record<Lang, Record<ChamberType, Entry>>;

export const topicMeta = {
  ko: {
    frankosorb: {
      label: "Frankosorb® 흡수체",
      description:
        "Frankonia가 30년간 자체 개발한 Frankosorb® 흡수체 — 피라미드·하이브리드·HF 시리즈, 26MHz~40GHz, A2 불연 등급.",
    },
    "shielding-gates": {
      label: "차폐·도어",
      description:
        "PAN 모듈 차폐 패널과 자립형 강구조, RF 도어·게이트, 자동 플랫폼·램프. 10kHz~40GHz 최대 120dB(EN 50147-1).",
    },
    automation: {
      label: "자동화 장비",
      description:
        "FTM 턴테이블(ø1.2~11.0m), FAM·FBM 안테나 마스트, FC06.1 컨트롤러 — CISPR 16-1-4 대응 EMC 시험 자동화.",
    },
    services: {
      label: "엔지니어링 서비스",
      description:
        "EMC 랩 설계 컨설팅과 시험 준비 지원. 레이아웃·인프라 설계와 ROI 분석부터 교육·검증·인정 지원까지.",
    },
    references: {
      label: "구축 사례",
      description:
        "전 세계 120여 개 고객사의 Frankonia 챔버 구축 사례와 챔버 내부 360° 파노라마.",
    },
  },
  en: {
    frankosorb: {
      label: "Frankosorb® Absorbers",
      description:
        "Frankosorb® absorbers, developed in-house over 30 years — pyramid, hybrid and HF series, 26 MHz to 40 GHz, class A2 non-combustible.",
    },
    "shielding-gates": {
      label: "Shielding & Gates",
      description:
        "PAN modular shielding panels on a self-supporting steel structure, RF doors and gates, automatic platforms and ramps. Up to 120 dB from 10 kHz to 40 GHz (EN 50147-1).",
    },
    automation: {
      label: "Automation",
      description:
        "FTM turntables (ø1.2 to 11.0 m), FAM and FBM antenna masts, and the FC06.1 controller — EMC test automation to CISPR 16-1-4.",
    },
    services: {
      label: "Extended Services",
      description:
        "EMC laboratory planning and testing readiness — from layout, infrastructure design and ROI analysis through training, verification and accreditation support.",
    },
    references: {
      label: "References",
      description:
        "Frankonia chamber installations at more than 120 customers worldwide, with 360° panoramas from inside the chambers.",
    },
  },
} as const satisfies Record<Lang, Record<ChamberTopic, Entry>>;

export const chambersOverviewMeta = {
  ko: {
    label: "챔버",
    title: "Anechoic Chambers",
    description:
      "Frankosorb® 흡수체 기반의 모듈형 EMC 무향 챔버 27종. 산업군별로도, 챔버 형식별로도 찾아보실 수 있습니다.",
  },
  en: {
    label: "Anechoic Chambers",
    title: "Anechoic Chambers",
    description:
      "Twenty-seven modular EMC anechoic chambers built on Frankosorb® absorber technology — browse by industry or by chamber type.",
  },
} as const satisfies Record<Lang, { label: string; title: string; description: string }>;

export const downloadsMeta = {
  ko: {
    label: "자료실",
    description:
      "Frankonia 챔버 카탈로그, 포토북, 서비스 포트폴리오, ISO 9001 인증서 다운로드.",
  },
  en: {
    label: "Downloads",
    description:
      "Frankonia chamber catalogue, photobook, service portfolio and ISO 9001 certificate downloads.",
  },
} as const satisfies Record<Lang, { label: string; description: string }>;

/** Column headings and utility-row labels for the Chambers mega dropdown. */
export const chamberNavCopy = {
  ko: {
    byIndustry: "산업군별",
    byType: "챔버 형식별",
    technology: "기술 · 서비스",
    models: (n: number) => `${n}종`,
    allModels: (n: number) => `전체 라인업 ${n}종`,
  },
  en: {
    byIndustry: "By Industry",
    byType: "By Chamber Type",
    technology: "Technology & Services",
    models: (n: number) => `${n} models`,
    allModels: (n: number) => `All ${n} models`,
  },
} as const;

/** Paths, relative to the locale root. */
export const chambersPath = "/chambers";
export const industryPath = (i: ChamberIndustry) => `/chambers/industry/${i}`;
export const typePath = (t: ChamberType) => `/chambers/type/${t}`;
export const topicPath = (t: ChamberTopic) => `/chambers/${t}`;

/**
 * One downloads hub for the whole site, not one per branch. The head office
 * splits catalogues (Download Area, under Anechoic Chambers) from papers
 * (Publications, under Company); this keeps that split but stops the Contact
 * menu's "catalogue" entry pointing at the papers page, which is where it
 * used to land.
 */
export const downloadsPath = "/downloads";
