import { industries, type Industry } from "./industries";
import { plural, type Lang } from "./site-config";

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
/**
 * The industries the chamber branch sorts by. Four of the shared five: the
 * chamber range has nothing left that does not belong to one of them, now
 * that the reverberation chambers are filed by what they are built to test
 * and the shielded room sits with the commercial range the catalogue puts it
 * in. `others` stays in `industries` because the test-system branch still
 * uses it — the slug set is shared so the two branches can point at each
 * other, not so they must carry the same categories.
 */
export const chamberIndustries = industries.filter(
  (i): i is Exclude<Industry, "others"> => i !== "others",
);

export type ChamberIndustry = (typeof chamberIndustries)[number];

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

export type ChamberType = (typeof chamberTypes)[number];
export type ChamberTopic = (typeof chamberTopics)[number];

/** Narrows to the chamber branch's four, not the shared five. Re-using
 *  `isIndustry` here let `others` through the route guard while the meta
 *  tables no longer had an entry for it — the type checker caught it, and
 *  this is the fix rather than a cast at each call site. */
export const isChamberIndustry = (value: string): value is ChamberIndustry =>
  (chamberIndustries as readonly string[]).includes(value);
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
  /**
   * Figures from the Anechoic Chambers 2026 catalogue, which is the reference
   * the content pass follows (docs/source/catalogue-2026.md). Optional because
   * it arrives model by model — a page renders what it has and says nothing
   * about what it does not.
   *
   * Both fields are the catalogue's own words, not a summary of them. `size`
   * is inner dimensions L × W × H; `range` is the frequency span and the
   * absorber lining it is achieved with, which the catalogue always states
   * together because one does not mean anything without the other.
   */
  spec?: {
    size: string;
    /** Optional: the E-Drive spread gives no frequency figure at all — those
     *  chambers are specified by the load machine they are built around, and
     *  their compliance is stated as standards rather than a span. A field
     *  invented to fill the gap would be a figure the catalogue does not give. */
    range?: string;
    /** The qualifier the catalogue prints under a size: the test distance the
     *  dimensions are compliant at, or the quiet zone they produce. Optional
     *  because it only appears where the catalogue tabulates sizes separately
     *  from the frequency row — the military table folds the equivalent into
     *  `range` instead, which is how it is written there. */
    note?: string;
  };
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
  { name: "ACTC", desc: "CISPR 25 Automotive Component Testing Chamber", industry: "automotive", type: "component", source: "actc",
    spec: { size: "6,380 × 5,480 × 3,750 mm", note: "CISPR 25 component level at 1.0 m test distance", range: "150 kHz / 26 MHz – 18 GHz (40 GHz option)" } },
  { name: "UCC", desc: "Ultra-compact hybrid chamber for pre-compliance component testing, an alternative to the GTEM cell", industry: "automotive", type: "component", source: "ucc",
    spec: { size: "4,580 × 3,080 × 2,550 mm", note: "Pre-compliant component level at 1.0 m test distance", range: "150 kHz / 26 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10V", desc: "10 m Semi Anechoic Chamber for ECE R10 vehicle testing with integrated dynamometer", industry: "automotive", type: "sac", source: "sac-10-v",
    spec: { size: "22,580 × 15,680 × 8,700 mm", note: "Quiet zone ø6.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 150 kHz – 18 GHz (40 GHz option)" } },
  { name: "AVTC", desc: "3 m Automotive Vehicle Testing Chamber for component and full-vehicle tests", industry: "automotive", type: "sac", source: "avtc",
    spec: { size: "11,480 × 9,380 × 6,000 mm", note: "Quiet zone ø3.0 m at 3.0 m test distance (H = 2.5 m)", range: "9 kHz / 150 kHz – 18 GHz (40 GHz option)" } },

  { name: "MIL CHC", desc: "Compact Hybrid Chamber for military component testing", industry: "military", type: "chc", source: "mil-chc",
    spec: { size: "4,880 × 4,880 × 3,000 mm", range: "9 kHz / 30 MHz – 40 GHz, hybrid absorber lining" } },
  { name: "MIL-STD Chamber", desc: "Military Testing Chamber for Vehicles and large EUTs", industry: "military", type: "sac", source: "mil-std-chamber",
    spec: { size: "Custom size", range: "9 kHz / 80 MHz – 40 GHz, short-pyramid absorbers" } },
  { name: "MIL-STD Chamber Advanced", desc: "Military Testing Chamber for Vehicles and large EUTs, also compliant with commercial and automotive test site requirements", industry: "military", type: "sac", source: "mil-std-chamber-advanced",
    spec: { size: "Custom size", range: "9 kHz / 26 MHz – 40 GHz long-pyramid, or 30 MHz – 40 GHz hybrid" } },

  { name: "SAC-3 Plus", desc: "3 m Semi Anechoic Chamber in dome design — the most selected chamber in its class, for full compliant emission and immunity", industry: "commercial", type: "sac", source: "sac-3-plus",
    spec: { size: "9,680 × 6,530 × 6,000 mm", note: "Quiet zone ø2.0 m at 3.0 m test distance (H = 2.0 m); ø1.2–2.0 m across the S, M and L sizes", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-3 Square", desc: "3 m Semi Anechoic Chamber in the traditional square design", industry: "commercial", type: "sac", source: "sac-3-square",
    spec: { size: "9,680 × 6,530 × 6,000 mm", note: "Quiet zone ø2.0 m at 3.0 m test distance (H = 2.5 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-5 Plus", desc: "5 m Semi Anechoic Chamber in dome design, covering both 3.0 m and 5.0 m test distances", industry: "commercial", type: "sac", source: "sac-5-plus",
    spec: { size: "12,680 × 7,730 × 6,300 mm", note: "Quiet zone ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-5 Square", desc: "5 m Semi Anechoic Chamber in the traditional square design, covering 3.0 m and 5.0 m test distances", industry: "commercial", type: "sac", source: "sac-5-square",
    spec: { size: "12,680 × 7,730 × 6,000 mm", note: "Quiet zone ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10 Plus", desc: "10 m Semi Anechoic Chamber with a single test axis — the cost-saving configuration of the Triton shell", industry: "commercial", type: "sac", source: "sac-10-plus",
    spec: { size: "19,205 × 12,080 × 8,325 mm", note: "Quiet zone ø3.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10 Plus Triton", desc: "10 m Semi Anechoic Chamber with three independent test axes in one polygonal shell — the most compact 10 m chamber Frankonia builds", industry: "commercial", type: "sac", source: "triton",
    spec: { size: "19,205 × 12,080 × 8,325 mm", note: "Quiet zone ø3.0 m (H = 3.0 m) — one 10.0 m axis and two 3.0 m axes, antennas and floor absorbers staying in place", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10/H Hybrid", desc: "10 m Semi Anechoic Chamber lined with Frankosorb hybrid absorbers, sized to the quiet zone required", industry: "commercial", type: "sac", source: "sac-10-h-hybrid",
    spec: { size: "18,380 × 12,830 × 8,550 mm (ø3.0 m) up to 21,680 × 15,680 × 8,700 mm (ø6.0 m)", note: "Quiet zone ø3.0 m to ø6.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10/P Pyramid", desc: "10 m Semi Anechoic Chamber fully lined with Frankosorb long-pyramid absorbers, a cost-efficient alternative to the hybrid lining", industry: "commercial", type: "sac", source: "sac-10-p-pyramid",
    spec: { size: "21,680 × 13,730 × 8,550 mm (ø3.0 m) up to 24,980 × 17,180 × 9,000 mm (ø6.0 m)", note: "Quiet zone ø3.0 m to ø6.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "FAC-3", desc: "3 m Fully Anechoic Chamber for free-space EMC tests on table-top EUTs", industry: "commercial", type: "fac", source: "fac-3",
    spec: { size: "8,705 × 4,655 × 3,750 mm", note: "Quiet zone ø1.5 m at 3.0 m test distance (H = 1.5 m), table-top products", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "FAC-3 L", desc: "Extended 3 m Fully Anechoic Chamber for floor-standing as well as table-top EUTs, with height scan", industry: "commercial", type: "fac", source: "fac-3-l",
    spec: { size: "9,380 × 5,780 × 6,000 mm", note: "Quiet zone ø1.5 m at 3.0 m test distance (H = 2.0 m), floor-standing and table-top products", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-3 / FAC-3 Transformer", desc: "One chamber convertible between semi-anechoic with ground plane and fully anechoic with floor absorbers", industry: "commercial", type: "fac", source: "sac-3-fac-3-transformer",
    spec: { size: "9,680 × 6,530 × 6,000 mm", note: "SAC setup: quiet zone ø2.0 m (H = 2.5 m) · FAC setup: ø1.5 m (H = 1.5 m), both at 3.0 m", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "CHC", desc: "3 m Compact Hybrid Chamber — pre-compliant emission and full compliant immunity at 3.0 m", industry: "commercial", type: "chc", source: "chc",
    spec: { size: "7,355 × 3,755 × 3,300 mm", note: "Quiet zone ø1.2 m at 3.0 m test distance", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "CHC Plus", desc: "Compact Hybrid Chamber in the advanced setup, adding compliant emission measurement from 1 GHz to 18 GHz", industry: "commercial", type: "chc", source: "chc-plus",
    spec: { size: "7,355 × 3,755 × 3,300 mm", note: "Quiet zone ø1.2 m at 3.0 m test distance, compliant emission above 1 GHz", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "CTC", desc: "Full compliant component test chamber focused on immunity testing for industrial, automotive and military components", industry: "commercial", type: "component", source: "ctc",
    spec: { size: "8,480 × 5,485 × 3,750 mm", note: "Full compliant immunity per IEC 61000-4-3; CISPR 25, ISO 11452, MIL-STD 461 and DO-160", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },

  { name: "EDTC-SA", desc: "E-Drive test chamber prepared for a single external load machine with fixed shaft", industry: "powertrain", type: "component", source: "edtc",
    spec: { size: "7,880 × 5,480 × 3,750 mm", note: "Fixed-shaft version, e.g. 1 × 250 kW at 3,000 RPM and 3,000 Nm" } },
  { name: "EDTC-AX", desc: "E-Drive test chamber for e-axle tests, prepared for two external load machines with fixed shaft", industry: "powertrain", type: "component", source: "edtc-ax",
    spec: { size: "9,080 × 6,080 × 3,750 mm", note: "Fixed-shaft version, e.g. 2 × 250 kW at 3,000 RPM and 3,000 Nm" } },
  { name: "EDTC-BB", desc: "E-Drive test chamber including the EMC-BlueBox mobile load machine for dynamic powertrain tests", industry: "powertrain", type: "component", source: "edtc-bb",
    spec: { size: "7,880 × 6,380 × 3,750 mm", note: "For the EMC-BlueBox mobile load machine up to 120 kW" } },

  { name: "RVC e1", desc: "Reverberation chamber for small and medium size ISM and multimedia products", industry: "commercial", type: "rvc", source: "reverberation-solutions",
    spec: { size: "7,580 × 5,630 × 4,200 mm", note: "Working volume 3.3 × 3.5 × 2.6 m · 1 × Z-fold stirrer (vertical)", range: "Lowest usable frequency 200 MHz" } },
  { name: "RVC e2", desc: "Reverberation chamber for large ISM and multimedia products", industry: "commercial", type: "rvc", source: "reverberation-solutions",
    spec: { size: "11,280 × 7,280 × 4,950 mm", note: "Working volume 5.5 × 4.0 × 2.6 m · 2 × Z-fold stirrer (vertical and horizontal)", range: "Lowest usable frequency 80 MHz" } },
  { name: "RVC S", desc: "Reverberation chamber for military and automotive components", industry: "automotive", type: "rvc", source: "reverberation-solutions",
    spec: { size: "5,330 × 3,380 × 3,300 mm", note: "Working volume 2.5 × 1.0 × 1.5 m · 1 × Z-fold stirrer (vertical)", range: "Lowest usable frequency 200 MHz" } },
  { name: "RVC M", desc: "Reverberation chamber for large military and automotive components", industry: "automotive", type: "rvc", source: "reverberation-solutions",
    spec: { size: "7,580 × 5,630 × 4,200 mm", note: "Working volume 3.3 × 3.5 × 2.6 m · 1 × Z-fold stirrer (vertical)", range: "Lowest usable frequency 200 MHz" } },
  { name: "RVC L", desc: "Reverberation chamber for vehicles", industry: "automotive", type: "rvc", source: "reverberation-solutions",
    spec: { size: "13,880 × 11,480 × 6,300 mm (custom)", note: "Working volume 8.0 × 5.0 × 3.0 m · 2 × Z-fold stirrer (vertical and horizontal)", range: "Lowest usable frequency 80 MHz" } },
  { name: "RVC XL", desc: "Reverberation chamber for vehicles, with large-disc stirrer", industry: "automotive", type: "rvc", source: "reverberation-solutions",
    spec: { size: "15,530 × 11,480 × 6,600 mm (custom)", note: "Working volume 8.0 × 5.0 × 3.0 m · 1 × large-disc stirrer ø9.0 m, 2 × disc stirrer ø4.0 m", range: "Lowest usable frequency 80 MHz" } },
  { name: "RVC XXL", desc: "Reverberation chamber for large vehicles", industry: "automotive", type: "rvc", source: "reverberation-solutions",
    spec: { size: "17,480 × 13,580 × 6,600 mm (custom)", note: "Working volume 8.0 × 5.0 × 3.0 m · 1 × large-disc stirrer ø12.0 m, 2 × disc stirrer ø4.0 m", range: "Lowest usable frequency 80 MHz" } },
  { name: "Shielded Room", desc: "Modular and pre-fabricated Standard", industry: "commercial", type: "shielded-room", source: "shielded-room",
    spec: { size: "Any size — modular PAN type panels", range: "10 kHz – 18 GHz, or 40 GHz as an option, acc. EN 50147-1 / IEEE-299" } },
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
      note: "ACTC · UCC · AVTC · RVC",
      description:
        "차량·전장부품 EMC 시험용 챔버 9종. 무향 챔버 4종에 차량·부품용 잔향실(RVC S~XXL) 5종을 더해, ECE R10, CISPR 25/EN 55025, ISO 11452-2, CISPR 12/EN 55012 시험에 대응합니다.",
    },
    military: {
      note: "MIL CHC · MIL-STD Chamber",
      description:
        "MIL-STD-461 RS-103 대응 군수·방산 EMC 시험 챔버 3종. 부품 단위부터 차량·대형 피시험체까지.",
    },
    commercial: {
      note: "SAC · FAC · CHC · RVC",
      description:
        "일반 산업·전자기기용 EMC 챔버 17종. 3m·5m·10m 반무향, 완전무향, 컴팩트 챔버 전 계열에 차폐룸과 ISM·멀티미디어용 잔향실(RVC e1·e2)까지.",
    },
    powertrain: {
      note: "EDTC-SA · AX · BB",
      description:
        "전기차 구동계 시험용 EMC 챔버 3종. 단일 모터(EDTC-SA), 축 구성(EDTC-AX), EMC-BlueBox(EDTC-BB).",
    },
  },
  en: {
    automotive: {
      note: "ACTC · UCC · AVTC · RVC",
      description:
        "Nine chambers for vehicle and automotive EMC testing — four anechoic plus the five reverberation chambers from RVC S to XXL — covering ECE R10, CISPR 25 / EN 55025, ISO 11452-2 and CISPR 12 / EN 55012.",
    },
    military: {
      note: "MIL CHC · MIL-STD Chamber",
      description:
        "Three defence-grade EMC chambers for MIL-STD-461 RS-103, from component level up to vehicles and large EUTs.",
    },
    commercial: {
      note: "SAC · FAC · CHC · RVC",
      description:
        "Seventeen chambers for industrial and consumer electronics — the full 3m, 5m and 10m semi-anechoic, fully anechoic and compact range, plus the shielded room and the RVC e1 and e2 reverberation chambers.",
    },
    powertrain: {
      note: "EDTC-SA · AX · BB",
      description:
        "Three EMC chambers for electric drivetrain testing: single motor (EDTC-SA), axis setup (EDTC-AX) and EMC-BlueBox (EDTC-BB).",
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
        "잔향실 7종. 상용·산업용 RVC e1·e2와 차량·부품용 RVC S~XXL — IEC/EN 61000-4-21, ISO 11452-11 대응, Frankonia 스터러 기반.",
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
        "Seven reverberation chambers: RVC e1 and e2 for industry, RVC S to XXL for components and vehicles — to IEC/EN 61000-4-21 and ISO 11452-11, with Frankonia performance stirrers.",
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
        "Frankonia 자체 개발 Frankosorb® 나노 박막 흡수체 — 피라미드·하이브리드 시리즈, 26MHz~40GHz, DIN EN 13501-1 A2 불연 등급, 35년 이상 무결함 가동.",
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
        "본사가 공개한 구축 사례 목록 그대로 — 28개국 106건, 그리고 설치 현장 3곳의 360° 파노라마.",
    },
  },
  en: {
    frankosorb: {
      label: "Frankosorb® Absorbers",
      description:
        "Frankonia's own Frankosorb® nano thin-film absorbers — pyramid and hybrid series, 26 MHz to 40 GHz, DIN EN 13501-1 class A2 non-combustible, and more than 35 years in service without a defect.",
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
        "The head office's own reference list, as published — 106 entries across 28 countries, with 360° panoramas from three installations.",
    },
  },
} as const satisfies Record<Lang, Record<ChamberTopic, Entry>>;

export const chambersOverviewMeta = {
  ko: {
    label: "챔버",
    title: "Anechoic Chambers",
    description:
      "Frankosorb® 흡수체 기반의 모듈형 EMC 챔버 32종. 산업군별로도, 챔버 형식별로도 찾아보실 수 있습니다.",
  },
  en: {
    label: "Anechoic Chambers",
    title: "Anechoic Chambers",
    description:
      "Thirty-two modular EMC chambers built on Frankosorb® absorber technology — browse by industry or by chamber type.",
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
    models: (n: number) => plural(n, "model"),
    allModels: (n: number) => `All ${plural(n, "model")}`,
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

/**
 * The three installations the head office publishes a 360° panorama of, in its
 * own order (docs/source/chambers-references.md).
 *
 * Each is headed `MODEL – PLACE` there, and neither half is translated in
 * either locale: the designation has to match the catalogue, and the place is a
 * place. They are kept as two fields rather than one string so the heading can
 * set the model in bold and let the place stay light, the way `.sub-head`
 * splits every other group heading on this site.
 *
 * The head office says nothing about whose lab each one is, so neither do we —
 * Heideck is the head office's own address, which makes "customer installation"
 * a claim its own page does not make.
 *
 * Every panorama is cropped the same way, so the dimensions are one constant
 * rather than three copies of the same pair.
 */
export const chamberPanoramas = [
  { key: "fac-3", model: "FAC-3", place: "Marktheidenfeld", src: "/chambers/images/pano-fac-3.webp" },
  { key: "sac-5-plus", model: "SAC-5 Plus", place: "Heideck", src: "/chambers/images/pano-sac-5-plus.webp" },
  { key: "sac-10-hybrid", model: "SAC-10 Hybrid", place: "Kösching", src: "/chambers/images/pano-sac-10-hybrid.webp" },
] as const;

export type PanoramaKey = (typeof chamberPanoramas)[number]["key"];

/** The middle half of a 2:1 equirectangular source — ±45° of elevation, which
 *  is the band a cylindrical projection keeps readable. See `.pano`. */
export const panoramaSize = { w: 2000, h: 500 } as const;

/**
 * The head office's reference list, grouped by country.
 *
 * The source lists all 106 entries flat across two columns, roughly
 * alphabetical for the first forty and then in the order they were added. This
 * groups them instead, which is the one thing the flat list cannot show: how
 * far the range has travelled. Countries run by number of entries, then
 * alphabetically; `international` is last because it is not a country — it is
 * the word the head office itself put where a country goes.
 *
 * **Customer names are the head office's own spelling and are never
 * translated or corrected** — `Fuijan-Daimler`, `Harmann-Becker`, `RI.SE`,
 * `Uni Brüssel` included. They work like a citation: a reader has to be able
 * to match them against what the head office publishes. Near-duplicates
 * (`Daimler AG` and `Daimler`, `Linetest` and `IMC Linetest`) are left as two
 * entries for the same reason — only the head office knows whether they are
 * one organisation or two sites.
 *
 * Three country tokens were normalised so the grouping does not split on a
 * spelling: `Singapur` → Singapore (the list already carries `Singapore`),
 * `Brasil` → Brazil, and `Dortmund` → Germany (a city, not a country). All
 * three are recorded in docs/source/chambers-references.md.
 */
export const referenceGroups = [
  { country: "germany", customers: [
    "Adam Opel AG", "AKKA EMC", "Audi AG", "BDS Technik", "BMW AG", "Bosch", "Continental",
    "Daimler AG", "EMC Test NRW", "EMITEL", "Eurofins", "Harmann-Becker", "Heidelberger Druck",
    "IABG", "Siemens", "TÜV Süd", "MBtech EMC", "MECTRONIC", "Messtechnik Nord", "Miele",
    "PKM electronic GmbH", "Rheinmetall Kassel", "VDE Offenbach", "Uni Magdeburg",
    "ZDP-Duisburg", "Viessmann", "Daimler", "DEKRA",
  ] },
  { country: "india", customers: [
    "ARAI", "BEL", "Bosch", "CPRI", "EQDC", "HiPhysics", "Azista", "Eaton", "RCI", "Rishabh",
    "TÜV Rheinland India", "WIPRO",
  ] },
  { country: "china", customers: [
    "CATARC", "EETI", "Fuijan-Daimler", "HID Corp Ltd", "JAC Motors", "NMEI", "NRIST", "SDQI",
    "SQI", "Wuhan Long An 6907",
  ] },
  { country: "france", customers: [
    "Alcatel Lucent", "ATERMES", "EDF", "Airbus/Ariane Group", "Nokia Alcatel Lucent", "RSI",
    "SAGEM", "Thales",
  ] },
  { country: "usa", customers: [
    "Electrolux", "AT4 Wireless (DEKRA)", "Ubiquiti Networks", "Garmin", "TÜV Rheinland",
    "A123", "Gentherm",
  ] },
  { country: "israel", customers: ["Elbit", "Standard Institute", "Mellanox", "RADA"] },
  { country: "thailand", customers: ["Daikin", "NSTDA", "Suranaree", "TMUC"] },
  { country: "turkey", customers: ["Arcelik", "Aselsan", "BTK", "ETU"] },
  { country: "australia", customers: ["AUSTEST Labs", "ELSA", "Rheinmetall"] },
  { country: "russia", customers: ["IMC Linetest", "Linetest", "Willtest"] },
  { country: "italy", customers: ["CAME", "CMC"] },
  { country: "japan", customers: ["Atom Medical", "Stanley"] },
  { country: "malaysia", customers: ["Keysight", "TÜV Rheinland"] },
  { country: "singapore", customers: ["Ametek", "Speedy"] },
  { country: "argentina", customers: ["LENOR"] },
  { country: "austria", customers: ["TÜV Austria"] },
  { country: "belarus", customers: ["TKC"] },
  { country: "belgium", customers: ["Uni Brüssel"] },
  { country: "brazil", customers: ["IBEC"] },
  { country: "indonesia", customers: ["PT Qualis"] },
  { country: "morocco", customers: ["CETIEV"] },
  { country: "netherlands", customers: ["Prodrives"] },
  { country: "poland", customers: ["PCB"] },
  { country: "saudi-arabia", customers: ["NCMS"] },
  { country: "spain", customers: ["AT4 Wireless (DEKRA)"] },
  { country: "sweden", customers: ["RI.SE"] },
  { country: "switzerland", customers: ["Quinel"] },
  { country: "ukraine", customers: ["SELTEQ"] },
  { country: "international", customers: ["Continental (International)"] },
] as const;

export type ReferenceCountry = (typeof referenceGroups)[number]["country"];

/** Country names are the one part of an entry that is translated — the name
 *  beside them is not. `satisfies` makes a missing label a type error rather
 *  than a blank heading. */
export const referenceCountryLabel = {
  ko: {
    germany: "독일", india: "인도", china: "중국", france: "프랑스", usa: "미국",
    israel: "이스라엘", thailand: "태국", turkey: "튀르키예", australia: "호주",
    russia: "러시아", italy: "이탈리아", japan: "일본", malaysia: "말레이시아",
    singapore: "싱가포르", argentina: "아르헨티나", austria: "오스트리아",
    belarus: "벨라루스", belgium: "벨기에", brazil: "브라질", indonesia: "인도네시아",
    morocco: "모로코", netherlands: "네덜란드", poland: "폴란드",
    "saudi-arabia": "사우디아라비아", spain: "스페인", sweden: "스웨덴",
    switzerland: "스위스", ukraine: "우크라이나", international: "국제",
  },
  en: {
    germany: "Germany", india: "India", china: "China", france: "France", usa: "USA",
    israel: "Israel", thailand: "Thailand", turkey: "Turkey", australia: "Australia",
    russia: "Russia", italy: "Italy", japan: "Japan", malaysia: "Malaysia",
    singapore: "Singapore", argentina: "Argentina", austria: "Austria",
    belarus: "Belarus", belgium: "Belgium", brazil: "Brazil", indonesia: "Indonesia",
    morocco: "Morocco", netherlands: "Netherlands", poland: "Poland",
    "saudi-arabia": "Saudi Arabia", spain: "Spain", sweden: "Sweden",
    switzerland: "Switzerland", ukraine: "Ukraine", international: "International",
  },
} as const satisfies Record<Lang, Record<ReferenceCountry, string>>;

/** Entries, and countries excluding `international`. Counted rather than
 *  written down, so the figures on the page cannot drift from the list above.
 *  The one place they are still written by hand is
 *  `topicMeta.references.description`, which metadata reads as a static
 *  string. */
export const referenceTotals = {
  entries: referenceGroups.reduce((n, g) => n + g.customers.length, 0),
  countries: referenceGroups.filter((g) => g.country !== "international").length,
};

/**
 * Page copy for the technology topics, carried over from the 2026 catalogue.
 *
 * These four pages have no model list, so the prose is the page. A topic with
 * a body renders it and drops the "content in preparation" band; a topic
 * without one is unchanged. That is the same rule `spec` follows — the data
 * arrives a page at a time and nothing pretends otherwise.
 *
 * Absorber designations (P600, H1300 Turbine), standard numbers and the
 * figures beside them are not translated: they are what a reader matches
 * against a drawing and a quotation.
 */
export type TopicBody = {
  lead: readonly string[];
  /** May be empty: References is built from the two blocks below instead, and
   *  an empty list renders no band rather than an empty one. */
  groups: readonly { title: string; items: readonly string[] }[];
  close?: string;
  /** Decorative band under the lead. The heading above it already says what
   *  the page is about, so it carries no alt text of its own — which is also
   *  how the head office marks up its own header images (`alt=""`). */
  figure?: { src: string; w: number; h: number };
  /**
   * References only. `shots` is keyed rather than ordered so a caption cannot
   * drift onto the wrong panorama; the label and the file live in
   * `chamberPanoramas`, because neither is translated.
   *
   * `hint` is interface copy, not head office copy: the strip is scrolled to
   * pan it, and a reader has to be told that before they will try.
   */
  panoramas?: {
    title: string;
    hint: string;
    shots: Record<PanoramaKey, { alt: string; caption: string }>;
  };
  /** References only. The entries themselves are in `referenceGroups` — this
   *  is the heading over them and the note that says what the list is. */
  references?: { title: string; note: string };
};

export const topicBody: Record<Lang, Partial<Record<ChamberTopic, TopicBody>>> = {
  en: {
    frankosorb: {
      lead: [
        "Since Frankonia's Frankosorb® nano thin-film absorber technology started to conquer the world market, more and more customers have come to appreciate its stable performance characteristics. Frankosorb® convinces with more than 35 years of operation without malfunction, defect, quality or performance loss, and without the need to refurbish.",
        "The technology is available either as a hybrid solution in combination with ferrite absorbers, or as a stand-alone pyramid solution with a length of up to 2.4 m. The most important advantage of the long-pyramid absorbers is that they cover the whole frequency range from 26 MHz up to 40 GHz on their own, so additional ferrite absorbers become unnecessary — a pure cost saver.",
      ],
      figure: { src: "/chambers/images/topic-frankosorb.webp", w: 1280, h: 533 },
      groups: [
        { title: "Pyramid (P) series", items: [
          "Short-pyramid absorbers from 80 MHz to 18/40 GHz: P600 or P900",
          "Long-pyramid absorbers from 26 MHz to 18/40 GHz: P2000, P2200 or P2400",
        ] },
        { title: "Hybrid (H) series", items: [
          "Ferrite absorbers from 30 MHz to 1 GHz",
          "Hybrid absorbers from 30 MHz to 18/40 GHz: H450, H600 or H1000",
          "Performance hybrid absorber from 30 MHz to 18/40 GHz: H1300 Turbine",
        ] },
        { title: "Unique features", items: [
          "High absorption capability paired with a fast cooling feature (hollow absorber)",
          "A manufacturing process that guarantees identical performance",
          "No ageing or drooping, no loss of performance — proven stability for more than 35 years",
          "White colouring improves the illumination level, so no covers are necessary",
          "Equal performance for hybrid and long-pyramid absorbers",
          "Compliant with all existing verification standards, including magnetic field standards",
        ] },
        { title: "People safety and laboratory protection", items: [
          "Non-combustible absorbers to DIN EN 13501-1 class A2 - s1 d0, handling up to 1 kW/m² or 600 V/m continuous and 2.0 kW/m² or 850 V/m intermediate",
          "Hardly inflammable absorbers to DIN EN 13501-1 class B as the alternative, handling up to 0.9 kW/m² or 550 V/m continuous and 1.8 kW/m² or 800 V/m intermediate",
          "With the non-combustible absorbers no sprinkler or fire extinguishing system is necessary",
        ] },
        { title: "Eco and user-friendliness", items: [
          "No toxic gases emitted if an absorber heats up",
          "No dirt, no carbon dust, solvent-free, and free of glue or other harmful substances",
          "Recyclable at 99%",
          "Non-hygroscopic materials, so humidity- and temperature-proof",
          "Clean room classification to ISO 14644-1",
          "Easy to clean and washable, with a virus and bacteria resistant surface",
        ] },
      ],
      close: "The Frankosorb® absorber technology remains the number one choice when it comes to long-term performance paired with its unique non-combustibility.",
    },
    "shielding-gates": {
      lead: [
        "Since 1987 Frankonia has followed a prefabrication and modular standard at the highest quality and efficiency. Nothing is welded, nothing is glued: everything stays modular so that any future modification remains possible.",
        "Every chamber is designed as an independent room with its own fully integrated electrical setup and simple interfaces to the building around it. As a specialist in RF shielding and EMC test chambers, Frankonia supplies the complementary products — standard and customised — that keep it a turnkey provider.",
      ],
      figure: { src: "/chambers/images/topic-shielding-gates.webp", w: 1600, h: 1067 },
      groups: [
        { title: "Shielding and structure", items: [
          "Modular and prefabricated PAN type shielding system",
          "Highest shielding attenuation for every accessory — honeycombs, doors, feed-through elements, electrics and gates",
          "Acoustic panels (FAP) with absorption per ISO 354",
          "Static steel structure adapted to local seismic conditions",
        ] },
        { title: "Doors and gates", items: [
          "Single-leaf door (SLD)",
          "Double-leaf door (DLD)",
          "Sliding door (SSD)",
          "Sliding gate (SG)",
          "A broad range of sizes, modular and prefabricated throughout",
        ] },
        { title: "Ramps and platforms", items: [
          "Automatic ramps",
          "Automatic platforms with a flush entrance",
          "Customised entrance solutions",
        ] },
        { title: "Electrical integration and compliance", items: [
          "Electrical distribution unit accessible from outside, cabling and safety functions to local standards",
          "LED lighting, explosion protection option, emergency lighting",
          "AC and DC filters, signal and data filters, optic converters",
          "Safety matrix and higher-level laboratory control unit (PLC system)",
          "CE conformity per Machinery Directive 2006/42/EC as standard, or for the complete laboratory as an option",
        ] },
        { title: "Ventilation, smoke and gas", items: [
          "Honeycombs, cooling and exhaust systems",
          "Air sampling network for gas and smoke detection",
          "Smoke and gas detection analyser with alarm central, ATEX compliance",
          "Liquid detection system",
          "Extinguishing solutions such as sprinklers",
        ] },
        { title: "Video, audio and test tables", items: [
          "HD camera systems, fixed or mobile",
          "Audio and recording systems",
          "CISPR 25 and MIL wooden test tables (FGT) with ground plane",
          "CISPR 32 transparent test tables (FTT)",
        ] },
      ],
    },
    automation: {
      lead: [
        "Frankonia builds its own positioning equipment — turntables and antenna masts — in its R&D department, to the quality and technology standards the current EMC standards ask for.",
        "The FTM turntables are fully compliant with the chamber environment: integrated flush into the raised floor and surrounded by a conductivity grounding ring that keeps contact with the chamber's ground plane. The FC06.1 controller drives them over IEEE 488.2 (GPIB) commands.",
        "The FAM antenna mast is the standard solution to CISPR 16-1-4, on wheels for easy handling and built from fibreglass and plastics so that reflecting material is kept to a minimum. The FBM boresight mast adds a tilt function compliant with ANSI C63.4 and CISPR 16-1-4 — its software calculates the tilt angle from the antenna reference point, the distance and the size of the EUT, and monitors the test procedure. The tilt can be switched off, leaving the FBM working as a standard mast.",
      ],
      figure: { src: "/chambers/images/topic-automation.webp", w: 1600, h: 1067 },
      groups: [
        { title: "Turntables — FTM series", items: [
          "Integrated turntables from ø1.2 m to ø12.0 m, up to 80 tons",
          "Energy chains, rotary joints for data, electrics or fluids, exhaust and cooling systems, or customer-specific items",
          "Dynamometers integrated: fitted, free-roller or mobile on-top",
          "FC06.1 controller with independent software (SCPI commands)",
          "Controllable from common EMC software, with a wireless access option",
        ] },
        { title: "Antenna masts — FAM, FBM and FSM", items: [
          "FAM standard antenna mast (CISPR)",
          "FBM boresight antenna mast (FCC/ANSI and CISPR)",
          "FSM antenna stand, optionally with a polarisation unit",
          "FC06 controller with independent software (SCPI commands)",
          "Controllable from common EMC software",
          "Wireless interface for control from a handheld device",
        ] },
      ],
    },
    services: {
      lead: [
        "Frankonia starts at the first moment, with the planning, technical drawings, coordination and definition a customer's own demands call for, and stays through every stage that follows.",
        "The consultancy runs from a first idea to a complete testing readiness level. For decades Frankonia has guided customers through the whole course of realising a laboratory — and then, together with them, defined the work packages and milestones that get to their EMC goals, drawing on a network of EMC experts and the standards and practice of the industrial, military and automotive world.",
      ],
      figure: { src: "/chambers/images/topic-services.webp", w: 1240, h: 591 },
      groups: [
        { title: "Through every stage of a project", items: [
          "Project planning — customised projects defined with the customer, with technical details, timelines and complete drawings",
          "Project management — one interface between Frankonia's scope of delivery and the building parties, from first moment to final handover",
          "Engineering — requirements implemented from a single product up to a complete solution",
          "Research and development — Frankosorb®, and continuous research on materials against future standards",
          "Manufacturing — a stand-alone production network, invested in continuously",
          "Implementation — Frankonia's own European installation team, working to its modular and prefabricated standard",
        ] },
        { title: "Planning and consultation", items: [
          "Layout of labs, practical usability, consultation on needs and requirements",
          "Building planning in 3D for new facilities, or the use of existing buildings",
          "Infrastructure definition including building services — ventilation, power, fire prevention and fire simulation",
          "Lab planning for and with architects, and efficient implementation of test equipment parameters",
          "Cost calculation, return on investment, and profitability analysis for running the lab in practice",
        ] },
        { title: "Testing readiness", items: [
          "Test system and software training for newcomers and professionals, with insight into the EMC standards",
          "Hardware and software setup, functionality check, and equipment set up for verification procedures and routines",
          "Test templates, test plans and measurement methods — or supervision of your accreditation",
        ] },
      ],
      close: "With more than 35 years of experience, the goal is to turn individual requirements into reliable, state-of-the-art solutions — because only a complete solution creates long-term satisfaction.",
    },
    references: {
      lead: [
        "Frankonia is recognized as a highly specialized technology corporation for EMC anechoic chambers and test system within the automotive and industrial sector for testing of electromagnetic compatibility.",
        "Our EMC anechoic chambers and test systems are proven and tested in the development departments of well-known manufacturers, in the areas of research by universities and colleges, as well as in labs of leading EMC service providers. Our customers benefit from our extensive experience and our multi-layered knowledge.",
      ],
      figure: { src: "/chambers/images/reference-3.webp", w: 1280, h: 533 },
      groups: [],
      panoramas: {
        title: "360° Panoramas",
        hint: "Each strip is one full turn of the room, flattened out. Drag it sideways — or use the arrow keys — to look around.",
        shots: {
          "fac-3": {
            alt: "Fully anechoic chamber lined with long pyramid absorbers on the walls, the ceiling and the floor. A grey single-leaf shielded door stands under an illuminated emergency exit sign, with a feed-through panel in the wall beside it, and a small antenna sits on a yellow and white mast at the right.",
            caption: "The absorbers carry on across the floor, which is what makes the chamber fully anechoic — the FAC-3 measures under free-space conditions, as a test site without a ground plane.",
          },
          "sac-5-plus": {
            alt: "Semi-anechoic chamber. Pyramid absorbers cover a dome-shaped ceiling and the walls; the floor is a hard reflecting surface with a flush turntable, marked out in red lines and yellow and black tape.",
            caption: "Absorbers above, a reflecting ground plane below — under the dome-shaped roof the catalogue gives as the SAC-5 Plus's own concept.",
          },
          "sac-10-hybrid": {
            alt: "Large vehicle chamber. A white two-seat sports car stands on the turntable circle with a corrugated duct running from its tailpipe to a box in the floor. Short pyramid absorbers on the ceiling, long pyramid absorbers on the right-hand wall, dark panelling above them, and an antenna mast behind the car.",
            caption: "The duct at the tailpipe takes the exhaust out through the floor, so the car can run inside a room that stays shielded.",
          },
        },
      },
      references: {
        title: "Some of our references",
        note: "Reproduced entire from the head office's own list, read on 10 August 2026. Names are kept in the head office's spelling, and entries it publishes twice are left as two.",
      },
    },
  },
  ko: {
    frankosorb: {
      lead: [
        "Frankonia의 Frankosorb® 나노 박막 흡수체 기술이 세계 시장에 자리 잡은 이래, 안정적인 성능 특성을 평가하는 고객이 계속 늘고 있습니다. Frankosorb®는 35년 이상 가동하는 동안 오작동·결함·품질 저하·성능 손실이 없었고, 교체 보수도 필요하지 않았습니다.",
        "이 기술은 페라이트 흡수체와 결합한 하이브리드 방식으로도, 길이 2.4m까지의 단독 피라미드 방식으로도 제공됩니다. 장피라미드 흡수체의 가장 큰 장점은 26MHz~40GHz 전 대역을 단독으로 커버한다는 점입니다 — 페라이트 흡수체를 따로 두지 않아도 되므로 그 자체가 비용 절감입니다.",
      ],
      figure: { src: "/chambers/images/topic-frankosorb.webp", w: 1280, h: 533 },
      groups: [
        { title: "피라미드(P) 시리즈", items: [
          "단피라미드 흡수체 80MHz~18/40GHz: P600, P900",
          "장피라미드 흡수체 26MHz~18/40GHz: P2000, P2200, P2400",
        ] },
        { title: "하이브리드(H) 시리즈", items: [
          "페라이트 흡수체 30MHz~1GHz",
          "하이브리드 흡수체 30MHz~18/40GHz: H450, H600, H1000",
          "고성능 하이브리드 흡수체 30MHz~18/40GHz: H1300 Turbine",
        ] },
        { title: "고유 특성", items: [
          "높은 흡수 성능과 빠른 방열(중공 구조)을 함께 확보",
          "동일한 성능을 보장하는 제조 공정",
          "노화·처짐 없음, 성능 저하 없음 — 35년 이상 입증된 장기 안정성",
          "흰색 마감으로 조도가 개선되어 별도 커버가 불필요",
          "하이브리드와 장피라미드 흡수체가 동등한 성능",
          "자기장 규격을 포함한 모든 현행 검증 규격에 적합",
        ] },
        { title: "인체 안전과 시험실 보호", items: [
          "DIN EN 13501-1 A2 - s1 d0 불연 흡수체 — 연속 1kW/m²·600V/m, 중간 출력 2.0kW/m²·850V/m까지 대응",
          "대안으로 DIN EN 13501-1 class B 난연 흡수체 — 연속 0.9kW/m²·550V/m, 중간 출력 1.8kW/m²·800V/m까지 대응",
          "불연 흡수체를 쓰면 스프링클러나 소화 설비를 두지 않아도 됩니다",
        ] },
        { title: "환경과 사용성", items: [
          "흡수체가 가열되어도 유독 가스가 발생하지 않음",
          "분진·카본 더스트 없음, 무용제, 접착제 및 유해 물질 없음",
          "99% 재활용 가능",
          "비흡습성 소재로 습도·온도 변화에 강함",
          "ISO 14644-1 클린룸 등급",
          "세척이 쉽고 물청소 가능, 바이러스·세균에 강한 표면",
        ] },
      ],
      close: "장기 성능과 고유의 불연 특성을 함께 요구할 때, Frankosorb® 흡수체 기술은 여전히 첫 번째 선택지입니다.",
    },
    "shielding-gates": {
      lead: [
        "Frankonia는 1987년부터 최고 수준의 품질과 효율을 목표로 사전 제작·모듈형 표준을 지켜 왔습니다. 용접도 접착도 하지 않습니다 — 모든 것을 모듈로 두어 이후의 어떤 변경 요구에도 대응할 수 있게 합니다.",
        "모든 챔버는 자체 전기 설비를 완결적으로 갖추고 건물과는 단순한 인터페이스로만 연결되는 독립된 방으로 설계됩니다. RF 차폐와 EMC 시험 챔버 전문 기업으로서, 턴키 공급자의 자리를 지키는 데 필요한 표준·맞춤 부대 제품을 함께 공급합니다.",
      ],
      figure: { src: "/chambers/images/topic-shielding-gates.webp", w: 1600, h: 1067 },
      groups: [
        { title: "차폐와 구조", items: [
          "모듈형 사전 제작 PAN 타입 차폐 시스템",
          "허니콤, 도어, 관통 소자, 전기 설비, 게이트 등 모든 부속에 최고 수준의 차폐 감쇠",
          "ISO 354 흡음 성능의 음향 패널(FAP)",
          "현지 내진 조건에 맞춘 정적 철골 구조",
        ] },
        { title: "도어와 게이트", items: [
          "단문형 도어(SLD)",
          "양문형 도어(DLD)",
          "슬라이딩 도어(SSD)",
          "슬라이딩 게이트(SG)",
          "전 규격 모듈형 사전 제작, 다양한 크기",
        ] },
        { title: "램프와 플랫폼", items: [
          "자동 램프",
          "단차 없는 진입을 위한 자동 플랫폼",
          "맞춤형 진입 솔루션",
        ] },
        { title: "전기 통합과 적합성", items: [
          "외부에서 접근 가능한 배전반, 현지 규격에 따른 배선과 안전 기능",
          "LED 조명, 방폭 옵션, 비상 조명",
          "AC·DC 필터, 신호·데이터 필터, 광 변환기",
          "안전 매트릭스와 상위 시험실 제어 유닛(PLC)",
          "기계류 지침 2006/42/EC에 따른 CE 적합성 — 제품 단위 기본, 시험실 전체는 옵션",
        ] },
        { title: "환기·연기·가스", items: [
          "허니콤, 냉각·배기 시스템",
          "가스·연기 감지용 공기 샘플링 네트워크",
          "경보 중앙 장치와 연동되는 연기·가스 분석기, ATEX 적합",
          "누액 감지 시스템",
          "스프링클러 등 소화 솔루션",
        ] },
        { title: "영상·음향과 시험대", items: [
          "고정형·이동형 HD 카메라 시스템",
          "음향 및 녹화 시스템",
          "접지면이 있는 CISPR 25·MIL 목재 시험대(FGT)",
          "CISPR 32 투명 시험대(FTT)",
        ] },
      ],
    },
    automation: {
      lead: [
        "Frankonia는 턴테이블과 안테나 마스트를 자체 R&D 부서에서 설계·개발합니다. 현행 EMC 규격이 요구하는 품질과 기술 수준을 기준으로 삼습니다.",
        "FTM 턴테이블은 챔버 환경에 완전히 부합합니다. 이중바닥에 매립되고 도전성 접지 링으로 둘러싸여 챔버 접지면과의 접촉을 유지합니다. 제어는 IEEE 488.2(GPIB) 명령을 쓰는 FC06.1 컨트롤러가 담당합니다.",
        "FAM 안테나 마스트는 CISPR 16-1-4에 적합한 표준 솔루션으로, 취급이 쉽도록 바퀴가 달려 있고 반사를 최소화하기 위해 유리섬유와 플라스틱으로 제작됩니다. FBM 보어사이트 마스트는 여기에 ANSI C63.4·CISPR 16-1-4 적합 틸트 기능을 더합니다 — 소프트웨어가 안테나 기준점과 거리, 피시험체 크기로부터 틸트 각도를 계산하고 시험 절차 전체를 감시합니다. 틸트를 끄면 표준 마스트로 동작합니다.",
      ],
      figure: { src: "/chambers/images/topic-automation.webp", w: 1600, h: 1067 },
      groups: [
        { title: "턴테이블 — FTM 시리즈", items: [
          "ø1.2m~ø12.0m 매립형 턴테이블, 최대 80톤",
          "에너지 체인, 데이터·전기·유체용 로터리 조인트, 배기·냉각 계통, 고객 지정 품목 통합",
          "다이나모미터 통합 — 고정형, 프리롤러, 이동식 온톱",
          "독립 소프트웨어(SCPI 명령)를 갖춘 FC06.1 컨트롤러",
          "일반 EMC 소프트웨어에서 제어 가능, 무선 접속 옵션",
        ] },
        { title: "안테나 마스트 — FAM · FBM · FSM", items: [
          "FAM 표준 안테나 마스트(CISPR)",
          "FBM 보어사이트 안테나 마스트(FCC/ANSI · CISPR)",
          "FSM 안테나 스탠드, 편파 유닛 옵션",
          "독립 소프트웨어(SCPI 명령)를 갖춘 FC06 컨트롤러",
          "일반 EMC 소프트웨어에서 제어 가능",
          "휴대 기기에서 제어하는 무선 인터페이스",
        ] },
      ],
    },
    services: {
      lead: [
        "Frankonia는 프로젝트의 첫 순간부터 함께합니다. 고객의 요구에 맞춘 기획, 기술 도면, 조율과 사양 정의로 시작해 이후 모든 단계를 이어서 담당합니다.",
        "컨설팅은 최초 구상에서 완전한 시험 준비 상태까지 이어집니다. 수십 년간 시험실 구축의 전 과정을 안내해 왔고, 이후에는 고객과 함께 작업 패키지와 마일스톤을 정해 EMC 목표에 도달합니다. 산업·군수·자동차 분야의 규격과 실무를 공유하는 EMC 전문가 네트워크가 그 바탕입니다.",
      ],
      figure: { src: "/chambers/images/topic-services.webp", w: 1240, h: 591 },
      groups: [
        { title: "프로젝트 전 단계", items: [
          "프로젝트 기획 — 고객과 함께 정의하는 맞춤 프로젝트, 기술 상세·일정·전체 도면 제공",
          "프로젝트 관리 — 최초 시점부터 최종 인수까지, Frankonia 공급 범위와 건축 관련 주체 사이의 단일 창구",
          "엔지니어링 — 단일 제품부터 완결 솔루션까지 요구사항을 그대로 구현",
          "연구개발 — Frankosorb®, 그리고 미래 규격을 염두에 둔 지속적인 소재 연구",
          "제조 — 독립된 생산 네트워크와 지속적인 설비 투자",
          "시공 — 모듈형·사전 제작 표준에 따라 작업하는 Frankonia 자체 유럽 설치팀",
        ] },
        { title: "기획과 컨설팅", items: [
          "시험실 레이아웃, 실사용성, 요구사항 상담",
          "신축 시설의 3D 건축 기획, 또는 기존 건물 활용 방안",
          "환기·전력·화재 예방·화재 시뮬레이션을 포함한 인프라 정의",
          "건축가와 함께하는 시험실 설계, 시험 장비 파라미터의 효율적 반영",
          "비용 산정, 투자수익률, 실제 운영을 전제로 한 수익성 분석",
        ] },
        { title: "시험 준비", items: [
          "입문자·실무자 대상 시험 시스템과 소프트웨어 교육, EMC 규격 해설",
          "하드웨어·소프트웨어 셋업, 기능 점검, 검증 절차와 루틴을 위한 장비 구성",
          "시험 템플릿·시험 계획·측정 방법 수립, 또는 인정(accreditation) 취득 지원",
        ] },
      ],
      close: "35년 이상의 경험으로, 개별 요구사항을 신뢰할 수 있는 최신 솔루션으로 옮기는 것이 목표입니다 — 완결된 솔루션만이 장기적인 만족을 만들기 때문입니다.",
    },
    references: {
      lead: [
        "Frankonia는 전자기 적합성 시험을 위한 EMC 무향실과 시험 시스템 분야에서, 자동차와 산업 부문의 고도로 전문화된 기술 기업으로 인정받고 있습니다.",
        "Frankonia의 EMC 무향실과 시험 시스템은 이름이 알려진 제조사의 개발 부서에서, 대학과 고등교육기관의 연구 현장에서, 그리고 주요 EMC 시험 서비스 기업의 시험실에서 검증되어 왔습니다. 고객은 그렇게 쌓인 폭넓은 경험과 여러 층으로 축적된 지식을 그대로 활용합니다.",
      ],
      figure: { src: "/chambers/images/reference-3.webp", w: 1280, h: 533 },
      groups: [],
      panoramas: {
        title: "360° 파노라마",
        hint: "각 띠는 챔버를 한 바퀴 돌아 펼친 것입니다. 좌우로 끌거나 화살표 키로 둘러보실 수 있습니다.",
        shots: {
          "fac-3": {
            alt: "완전 무향실 내부. 벽과 천장, 그리고 바닥까지 장피라미드 흡수체로 덮여 있다. 좌측에는 비상구 표시등 아래 회색 단문형 차폐문과 그 옆 벽면의 관통 패널이 있고, 우측에는 노랑·흰색 마스트에 얹힌 소형 안테나가 있다.",
            caption: "흡수체가 바닥까지 이어지는 것이 완전 무향실의 조건입니다 — FAC-3은 접지면이 없는 시험장으로서 자유공간 조건에서 측정합니다.",
          },
          "sac-5-plus": {
            alt: "반무향실 내부. 돔형 천장과 벽면은 피라미드 흡수체로 덮여 있고, 바닥은 반사면이다. 매립형 턴테이블이 있고 붉은 선과 노랑·검정 표시로 시험 구역이 구획되어 있다.",
            caption: "위는 흡수체, 아래는 반사 접지면 — 그리고 카탈로그가 SAC-5 Plus의 고유 개념으로 꼽는 돔형 천장입니다.",
          },
          "sac-10-hybrid": {
            alt: "대형 차량 챔버 내부. 턴테이블 원 위에 흰색 2인승 스포츠카가 서 있고 배기구에서 나온 주름 덕트가 바닥의 배기함으로 이어진다. 천장은 단피라미드, 우측 벽은 장피라미드 흡수체이며 그 위쪽 벽면은 어두운 패널이다. 차 뒤에 안테나 마스트가 있다.",
            caption: "배기구에 연결된 덕트가 배기를 바닥으로 빼냅니다. 차폐를 유지한 채 차량을 구동시키기 위한 구조입니다.",
          },
        },
      },
      references: {
        title: "주요 구축 사례",
        note: "본사가 공개한 목록을 2026년 8월 10일 기준으로 그대로 옮겼습니다. 고객사 표기는 본사 표기를 그대로 쓰고 국가명만 번역했으며, 본사가 두 번 올린 항목은 두 건으로 두었습니다.",
      },
    },
  },
};
