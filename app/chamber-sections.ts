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
        "전 세계 120여 개 고객사의 Frankonia 챔버 구축 사례와 챔버 내부 360° 파노라마.",
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
        "Frankonia chamber installations at more than 120 customers worldwide, with 360° panoramas from inside the chambers.",
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
  groups: readonly { title: string; items: readonly string[] }[];
  close?: string;
  /** Decorative band under the lead. The heading above it already says what
   *  the page is about, so it carries no alt text of its own. */
  figure?: { src: string; w: number; h: number };
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
  },
};
