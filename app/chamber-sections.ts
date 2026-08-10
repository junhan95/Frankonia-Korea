import { industries, type Industry } from "./industries";
import type { PageBody } from "./page-body";
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
   * Our own slug, for `/chambers/model/<slug>`.
   *
   * Usually the same string as `source`, which keeps the ledger checkable by
   * eye — but it is deliberately a separate field, because the two answer
   * different questions. `source` is where the material came from; `slug` is
   * where a reader of this site lands. Three models differ:
   *
   * - EDTC-SA — the head office files it under `edtc` and titles the page just
   *   "EDTC". The catalogue calls it EDTC-SA, and so do we.
   * - SAC-10 Plus Triton — the head office slug is `triton` alone. Spelled out
   *   here so it sorts and reads beside its sibling `sac-10-plus`.
   * - The seven RVCs — one page at the head office, one spread in the
   *   catalogue, and one page here. They all carry `rvc`, so every row of the
   *   model list can link somewhere that actually says something about it.
   *
   * A slug shared by several models is therefore not a mistake: the route
   * generator takes the distinct set (`chamberModelSlugs`).
   */
  slug: string;
  /**
   * Figures from the Anechoic Chambers 2026 catalogue, which is the reference
   * the content pass follows (docs/source/catalogue-2026.md). Optional because
   * it arrives model by model — a page renders what it has and says nothing
   * about what it does not.
   *
   * Both fields are the catalogue's own words, not a summary of them. `size`
   * is the external dimension L × W × H — the catalogue prints the figure with
   * no qualifier at all, and the head office's own model pages are the only
   * source that names it, as `External dimension`
   * (docs/source/chambers-models.md §2). `range` is the frequency span and the
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
  { name: "ACTC", desc: "CISPR 25 Automotive Component Testing Chamber", industry: "automotive", type: "component", source: "actc", slug: "actc",
    spec: { size: "6,380 × 5,480 × 3,750 mm", note: "CISPR 25 component level at 1.0 m test distance", range: "150 kHz / 26 MHz – 18 GHz (40 GHz option)" } },
  { name: "UCC", desc: "Ultra-compact hybrid chamber for pre-compliance component testing, an alternative to the GTEM cell", industry: "automotive", type: "component", source: "ucc", slug: "ucc",
    spec: { size: "4,580 × 3,080 × 2,550 mm", note: "Pre-compliant component level at 1.0 m test distance", range: "150 kHz / 26 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10V", desc: "10 m Semi Anechoic Chamber for ECE R10 vehicle testing with integrated dynamometer", industry: "automotive", type: "sac", source: "sac-10-v", slug: "sac-10-v",
    spec: { size: "22,580 × 15,680 × 8,700 mm", note: "Quiet zone ø6.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 150 kHz – 18 GHz (40 GHz option)" } },
  { name: "AVTC", desc: "3 m Automotive Vehicle Testing Chamber for component and full-vehicle tests", industry: "automotive", type: "sac", source: "avtc", slug: "avtc",
    spec: { size: "11,480 × 9,380 × 6,000 mm", note: "Quiet zone ø3.0 m at 3.0 m test distance (H = 2.5 m)", range: "9 kHz / 150 kHz – 18 GHz (40 GHz option)" } },

  { name: "MIL CHC", desc: "Compact Hybrid Chamber for military component testing", industry: "military", type: "chc", source: "mil-chc", slug: "mil-chc",
    spec: { size: "4,880 × 4,880 × 3,000 mm", range: "9 kHz / 30 MHz – 40 GHz, hybrid absorber lining" } },
  { name: "MIL-STD Chamber", desc: "Military Testing Chamber for Vehicles and large EUTs", industry: "military", type: "sac", source: "mil-std-chamber", slug: "mil-std-chamber",
    spec: { size: "Custom size", range: "9 kHz / 80 MHz – 40 GHz, short-pyramid absorbers" } },
  { name: "MIL-STD Chamber Advanced", desc: "Military Testing Chamber for Vehicles and large EUTs, also compliant with commercial and automotive test site requirements", industry: "military", type: "sac", source: "mil-std-chamber-advanced", slug: "mil-std-chamber-advanced",
    spec: { size: "Custom size", range: "9 kHz / 26 MHz – 40 GHz long-pyramid, or 30 MHz – 40 GHz hybrid" } },

  { name: "SAC-3 Plus", desc: "3 m Semi Anechoic Chamber in dome design — the most selected chamber in its class, for full compliant emission and immunity", industry: "commercial", type: "sac", source: "sac-3-plus", slug: "sac-3-plus",
    spec: { size: "9,680 × 6,530 × 6,000 mm", note: "Quiet zone ø2.0 m at 3.0 m test distance (H = 2.0 m); ø1.2–2.0 m across the S, M and L sizes", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-3 Square", desc: "3 m Semi Anechoic Chamber in the traditional square design", industry: "commercial", type: "sac", source: "sac-3-square", slug: "sac-3-square",
    spec: { size: "9,680 × 6,530 × 6,000 mm", note: "Quiet zone ø2.0 m at 3.0 m test distance (H = 2.5 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-5 Plus", desc: "5 m Semi Anechoic Chamber in dome design, covering both 3.0 m and 5.0 m test distances", industry: "commercial", type: "sac", source: "sac-5-plus", slug: "sac-5-plus",
    spec: { size: "12,680 × 7,730 × 6,300 mm", note: "Quiet zone ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-5 Square", desc: "5 m Semi Anechoic Chamber in the traditional square design, covering 3.0 m and 5.0 m test distances", industry: "commercial", type: "sac", source: "sac-5-square", slug: "sac-5-square",
    spec: { size: "12,680 × 7,730 × 6,000 mm", note: "Quiet zone ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10 Plus", desc: "10 m Semi Anechoic Chamber with a single test axis — the cost-saving configuration of the Triton shell", industry: "commercial", type: "sac", source: "sac-10-plus", slug: "sac-10-plus",
    spec: { size: "19,205 × 12,080 × 8,325 mm", note: "Quiet zone ø3.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10 Plus Triton", desc: "10 m Semi Anechoic Chamber with three independent test axes in one polygonal shell — the most compact 10 m chamber Frankonia builds", industry: "commercial", type: "sac", source: "triton", slug: "sac-10-plus-triton",
    spec: { size: "19,205 × 12,080 × 8,325 mm", note: "Quiet zone ø3.0 m (H = 3.0 m) — one 10.0 m axis and two 3.0 m axes, antennas and floor absorbers staying in place", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10/H Hybrid", desc: "10 m Semi Anechoic Chamber lined with Frankosorb hybrid absorbers, sized to the quiet zone required", industry: "commercial", type: "sac", source: "sac-10-h-hybrid", slug: "sac-10-h-hybrid",
    spec: { size: "18,380 × 12,830 × 8,550 mm (ø3.0 m) up to 21,680 × 15,680 × 8,700 mm (ø6.0 m)", note: "Quiet zone ø3.0 m to ø6.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-10/P Pyramid", desc: "10 m Semi Anechoic Chamber fully lined with Frankosorb long-pyramid absorbers, a cost-efficient alternative to the hybrid lining", industry: "commercial", type: "sac", source: "sac-10-p-pyramid", slug: "sac-10-p-pyramid",
    spec: { size: "21,680 × 13,730 × 8,550 mm (ø3.0 m) up to 24,980 × 17,180 × 9,000 mm (ø6.0 m)", note: "Quiet zone ø3.0 m to ø6.0 m at 10.0 m test distance (H = 3.0 m)", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "FAC-3", desc: "3 m Fully Anechoic Chamber for free-space EMC tests on table-top EUTs", industry: "commercial", type: "fac", source: "fac-3", slug: "fac-3",
    spec: { size: "8,705 × 4,655 × 3,750 mm", note: "Quiet zone ø1.5 m at 3.0 m test distance (H = 1.5 m), table-top products", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "FAC-3 L", desc: "Extended 3 m Fully Anechoic Chamber for floor-standing as well as table-top EUTs, with height scan", industry: "commercial", type: "fac", source: "fac-3-l", slug: "fac-3-l",
    spec: { size: "9,380 × 5,780 × 6,000 mm", note: "Quiet zone ø1.5 m at 3.0 m test distance (H = 2.0 m), floor-standing and table-top products", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "SAC-3 / FAC-3 Transformer", desc: "One chamber convertible between semi-anechoic with ground plane and fully anechoic with floor absorbers", industry: "commercial", type: "fac", source: "sac-3-fac-3-transformer", slug: "sac-3-fac-3-transformer",
    spec: { size: "9,680 × 6,530 × 6,000 mm", note: "SAC setup: quiet zone ø2.0 m (H = 2.5 m) · FAC setup: ø1.5 m (H = 1.5 m), both at 3.0 m", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "CHC", desc: "3 m Compact Hybrid Chamber — pre-compliant emission and full compliant immunity at 3.0 m", industry: "commercial", type: "chc", source: "chc", slug: "chc",
    spec: { size: "7,355 × 3,755 × 3,300 mm", note: "Quiet zone ø1.2 m at 3.0 m test distance", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "CHC Plus", desc: "Compact Hybrid Chamber in the advanced setup, adding compliant emission measurement from 1 GHz to 18 GHz", industry: "commercial", type: "chc", source: "chc-plus", slug: "chc-plus",
    spec: { size: "7,355 × 3,755 × 3,300 mm", note: "Quiet zone ø1.2 m at 3.0 m test distance, compliant emission above 1 GHz", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },
  { name: "CTC", desc: "Full compliant component test chamber focused on immunity testing for industrial, automotive and military components", industry: "commercial", type: "component", source: "ctc", slug: "ctc",
    spec: { size: "8,480 × 5,485 × 3,750 mm", note: "Full compliant immunity per IEC 61000-4-3; CISPR 25, ISO 11452, MIL-STD 461 and DO-160", range: "9 kHz / 30 MHz – 18 GHz (40 GHz option)" } },

  { name: "EDTC-SA", desc: "E-Drive test chamber prepared for a single external load machine with fixed shaft", industry: "powertrain", type: "component", source: "edtc", slug: "edtc-sa",
    spec: { size: "7,880 × 5,480 × 3,750 mm", note: "Fixed-shaft version, e.g. 1 × 250 kW at 3,000 RPM and 3,000 Nm" } },
  { name: "EDTC-AX", desc: "E-Drive test chamber for e-axle tests, prepared for two external load machines with fixed shaft", industry: "powertrain", type: "component", source: "edtc-ax", slug: "edtc-ax",
    spec: { size: "9,080 × 6,080 × 3,750 mm", note: "Fixed-shaft version, e.g. 2 × 250 kW at 3,000 RPM and 3,000 Nm" } },
  { name: "EDTC-BB", desc: "E-Drive test chamber including the EMC-BlueBox mobile load machine for dynamic powertrain tests", industry: "powertrain", type: "component", source: "edtc-bb", slug: "edtc-bb",
    spec: { size: "7,880 × 6,380 × 3,750 mm", note: "For the EMC-BlueBox mobile load machine up to 120 kW" } },

  { name: "RVC e1", desc: "Reverberation chamber for small and medium size ISM and multimedia products", industry: "commercial", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "7,580 × 5,630 × 4,200 mm", note: "Working volume 3.3 × 3.5 × 2.6 m · 1 × Z-fold stirrer (vertical)", range: "Lowest usable frequency 200 MHz" } },
  { name: "RVC e2", desc: "Reverberation chamber for large ISM and multimedia products", industry: "commercial", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "11,280 × 7,280 × 4,950 mm", note: "Working volume 5.5 × 4.0 × 2.6 m · 2 × Z-fold stirrer (vertical and horizontal)", range: "Lowest usable frequency 80 MHz" } },
  { name: "RVC S", desc: "Reverberation chamber for military and automotive components", industry: "automotive", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "5,330 × 3,380 × 3,300 mm", note: "Working volume 2.5 × 1.0 × 1.5 m · 1 × Z-fold stirrer (vertical)", range: "Lowest usable frequency 200 MHz" } },
  { name: "RVC M", desc: "Reverberation chamber for large military and automotive components", industry: "automotive", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "7,580 × 5,630 × 4,200 mm", note: "Working volume 3.3 × 3.5 × 2.6 m · 1 × Z-fold stirrer (vertical)", range: "Lowest usable frequency 200 MHz" } },
  { name: "RVC L", desc: "Reverberation chamber for vehicles", industry: "automotive", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "13,880 × 11,480 × 6,300 mm (custom)", note: "Working volume 8.0 × 5.0 × 3.0 m · 2 × Z-fold stirrer (vertical and horizontal)", range: "Lowest usable frequency 80 MHz" } },
  { name: "RVC XL", desc: "Reverberation chamber for vehicles, with large-disc stirrer", industry: "automotive", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "15,530 × 11,480 × 6,600 mm (custom)", note: "Working volume 8.0 × 5.0 × 3.0 m · 1 × large-disc stirrer ø9.0 m, 2 × disc stirrer ø4.0 m", range: "Lowest usable frequency 80 MHz" } },
  { name: "RVC XXL", desc: "Reverberation chamber for large vehicles", industry: "automotive", type: "rvc", source: "reverberation-solutions", slug: "rvc",
    spec: { size: "17,480 × 13,580 × 6,600 mm (custom)", note: "Working volume 8.0 × 5.0 × 3.0 m · 1 × large-disc stirrer ø12.0 m, 2 × disc stirrer ø4.0 m", range: "Lowest usable frequency 80 MHz" } },
  { name: "Shielded Room", desc: "Modular and pre-fabricated Standard", industry: "commercial", type: "shielded-room", source: "shielded-room", slug: "shielded-room",
    spec: { size: "Any size — modular PAN type panels", range: "10 kHz – 18 GHz, or 40 GHz as an option, acc. EN 50147-1 / IEEE-299" } },
];

export const modelsByIndustry = (industry: ChamberIndustry) =>
  chamberModels.filter((m) => m.industry === industry);

export const modelsByType = (type: ChamberType) =>
  chamberModels.filter((m) => m.type === type);

/**
 * The distinct slugs, in catalogue order — one per model page.
 *
 * Distinct rather than one per model because the seven reverberation chambers
 * share a slug (see `ChamberModel.slug`). Derived rather than written down, so
 * that adding a chamber to the list above is the only edit a new model page
 * needs.
 */
export const chamberModelSlugs: readonly string[] = [
  ...new Set(chamberModels.map((m) => m.slug)),
];

export const isChamberModelSlug = (v: string) => chamberModelSlugs.includes(v);

/** Every model filed under one slug. One entry for all but `rvc`, which has
 *  seven — the page tabulates them together, the way both sources do. */
export const modelsBySlug = (slug: string) =>
  chamberModels.filter((m) => m.slug === slug);

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
        "28개국 106건의 구축 사례, 그리고 설치 현장 3곳의 360° 파노라마.",
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
        "106 installations across 28 countries, with 360° panoramas from three of them.",
    },
  },
} as const satisfies Record<Lang, Record<ChamberTopic, Entry>>;

/**
 * Per-model page meta.
 *
 * `label` is the model name and is therefore not translated — the same reason
 * `ChamberModel.name` is not. What differs by locale is only the search
 * snippet. Two slugs carry a name that is not any one model's: `rvc` covers the
 * seven reverberation chambers, and both sources present them together.
 */
export const modelMeta: Record<Lang, Record<string, Entry>> = {
  ko: {
    "sac-3-plus": { label: "SAC-3 Plus", description: "3m 돔 설계 반무향실. 자기 등급에서 가장 많이 선택된 모델로, Quiet Zone ø1.2~2.0m의 네 가지 크기와 CISPR 16-1-4 · ANSI C63.4 정식 인증을 제공합니다." },
    "sac-3-square": { label: "SAC-3 Square", description: "3m 정방형 반무향실. Quiet Zone ø2.0m 또는 ø3.0m, 대형 턴테이블과 이동식 다이나모미터 통합이 가능합니다." },
    "sac-5-plus": { label: "SAC-5 Plus", description: "5m 돔 설계 반무향실. 3.0m와 5.0m 측정 거리를 함께 쓰며 Quiet Zone은 ø3.0m까지입니다." },
    "sac-5-square": { label: "SAC-5 Square", description: "5m 정방형 반무향실. 3.0m·5.0m 측정 거리에 Quiet Zone ø2.0~4.0m, XL 구성은 대형 턴테이블을 수용합니다." },
    "sac-10-plus": { label: "SAC-10 Plus", description: "단일 시험 축의 10m 반무향실. 다각형 셸로 만든 Frankonia의 가장 콤팩트한 10m 챔버입니다." },
    "sac-10-plus-triton": { label: "SAC-10 Plus Triton", description: "하나의 다각형 셸에 10.0m 축 1개와 3.0m 축 2개를 담은 10m 반무향실. 안테나와 바닥 흡수체를 연결한 채로 둘 수 있습니다." },
    "sac-10-h-hybrid": { label: "SAC-10/H Hybrid", description: "Frankosorb® 하이브리드 라이닝의 10m 반무향실. Quiet Zone ø3.0~6.0m에 맞춰 네 가지 크기로 제작됩니다." },
    "sac-10-p-pyramid": { label: "SAC-10/P Pyramid", description: "P2400 롱피라미드 흡수체로 전면 라이닝한 10m 반무향실. 하이브리드 라이닝의 비용 효율적인 대안입니다." },
    "sac-10-v": { label: "SAC-10V", description: "다이나모미터를 내장한 ECE R10 차량 시험용 10m 반무향실. 하이브리드와 롱피라미드 두 계열, 최대 18m 차량까지 수용합니다." },
    avtc: { label: "AVTC", description: "3m·5m 차량 시험 챔버. 부품(CISPR 25) · 차량(CISPR 12) · 상용 제품(CISPR 16-1-4) 시험을 한 챔버에서 수행합니다." },
    actc: { label: "ACTC", description: "1.0m 거리의 CISPR 25 자동차 부품 시험 챔버. ISO 11452 정식 인증에 대응하며 L 구성은 차량 시험까지 가능합니다." },
    ucc: { label: "UCC", description: "1.0m 거리의 초소형 하이브리드 챔버. CISPR 25 사전 인증용이며 GTEM 셀의 대안입니다." },
    ctc: { label: "CTC", description: "산업·자동차·군수 부품의 내성 시험에 특화된 부품 시험 챔버. IEC 61000-4-3 · CISPR 25 · ISO 11452 · MIL-STD 461 · DO-160 정식 인증." },
    chc: { label: "CHC", description: "3.0m 거리 Quiet Zone ø1.2m의 컴팩트 하이브리드 챔버. 사전 인증 방출과 정식 인증 내성 시험을 함께 수행합니다." },
    "chc-plus": { label: "CHC Plus", description: "1GHz~18GHz 구간의 정식 인증 방출 측정을 더한 컴팩트 하이브리드 챔버." },
    "fac-3": { label: "FAC-3", description: "테이블탑 피시험체용 3m 완전무향실. 접지면 없는 자유공간 조건에서 CISPR 16-1-4 · IEC/EN 61000-4-22 정식 인증." },
    "fac-3-l": { label: "FAC-3 L", description: "거치형과 테이블탑 피시험체를 모두 수용하는 확장형 3m 완전무향실. 안테나 마스트를 이용한 높이 스캔이 가능합니다." },
    "sac-3-fac-3-transformer": { label: "SAC-3 / FAC-3 Transformer", description: "접지면을 갖춘 반무향과 바닥 흡수체를 깐 완전무향 사이를 전환하는 3m 챔버. 두 구성 각각의 성능이 보증됩니다." },
    rvc: { label: "잔향실 RVC", description: "Frankonia 스터러 패키지를 갖춘 잔향실 7종. 소형 부품용 RVC S부터 대형 차량용 RVC XXL까지, IEC/EN 61000-4-21 · ISO 11452-11 · ISO 11451-5." },
    "mil-chc": { label: "MIL CHC", description: "MIL-STD 461 · DO-160 부품 시험용 컴팩트 하이브리드 챔버. 1.0m 거리, 9kHz/30MHz~40GHz." },
    "mil-std-chamber": { label: "MIL-STD Chamber", description: "대형 피시험체와 차량을 위한 군용 챔버. MIL-STD 461 기준 1.0m 거리, 숏피라미드 흡수체로 80MHz~40GHz." },
    "mil-std-chamber-advanced": { label: "MIL-STD Chamber Advanced", description: "군용 규격과 상용·자동차 시험장 요건을 함께 만족하는 군용 챔버. 롱피라미드 또는 하이브리드 라이닝." },
    "edtc-sa": { label: "EDTC-SA", description: "고정축 외부 부하기 1대를 전제로 제작하는 구동계 시험 챔버. CISPR 25 방출과 ISO 11452 내성 시험용." },
    "edtc-ax": { label: "EDTC-AX", description: "e-액슬 시험용 구동계 챔버. 고정축 외부 부하기 2대를 수용하는 특허 구성입니다." },
    "edtc-bb": { label: "EDTC-BB", description: "이동식 부하기 EMC-BlueBox를 포함한 구동계 시험 챔버. 4상한 운전으로 어떤 부하 상황도 재현합니다." },
    "shielded-room": { label: "Shielded Room", description: "모듈형 사전 제작 PAN 타입 차폐룸. 크기 제한이 없고 10kHz~40GHz에서 최대 120dB의 차폐 성능을 보증합니다." },
  },
  en: {
    "sac-3-plus": { label: "SAC-3 Plus", description: "3 m semi-anechoic chamber in dome design — the most selected chamber in its class, in four sizes from a ø1.2 m to a ø2.0 m quiet zone, full compliant to CISPR 16-1-4 and ANSI C63.4." },
    "sac-3-square": { label: "SAC-3 Square", description: "3 m semi-anechoic chamber in the traditional square design, with a ø2.0 m or ø3.0 m quiet zone and room for a large turntable or a mobile dynamometer." },
    "sac-5-plus": { label: "SAC-5 Plus", description: "5 m semi-anechoic chamber in dome design, covering both the 3.0 m and 5.0 m measuring distance with a quiet zone up to ø3.0 m." },
    "sac-5-square": { label: "SAC-5 Square", description: "5 m semi-anechoic chamber in the traditional square design — 3.0 m and 5.0 m measuring distances, quiet zone ø2.0 m to ø4.0 m." },
    "sac-10-plus": { label: "SAC-10 Plus", description: "10 m semi-anechoic chamber with a single test axis — the most compact 10 m chamber Frankonia builds, in a polygonal shell." },
    "sac-10-plus-triton": { label: "SAC-10 Plus Triton", description: "10 m semi-anechoic chamber with one 10.0 m and two 3.0 m test axes in one polygonal shell, antennas and floor absorbers staying connected between them." },
    "sac-10-h-hybrid": { label: "SAC-10/H Hybrid", description: "10 m semi-anechoic chamber lined with Frankosorb® hybrid absorbers, built in four sizes for a ø3.0 m to ø6.0 m quiet zone." },
    "sac-10-p-pyramid": { label: "SAC-10/P Pyramid", description: "10 m semi-anechoic chamber fully lined with P2400 long-pyramid absorbers — the cost-efficient alternative to a hybrid lining." },
    "sac-10-v": { label: "SAC-10V", description: "10 m semi-anechoic chamber for ECE R10 vehicle testing with an integrated dynamometer, in hybrid and long-pyramid versions for vehicles up to 18 m." },
    avtc: { label: "AVTC", description: "3 m and 5 m automotive vehicle testing chamber — components to CISPR 25, vehicles to CISPR 12 and commercial products to CISPR 16-1-4 in one solution." },
    actc: { label: "ACTC", description: "CISPR 25 automotive component testing chamber at 1.0 m, full compliant to ISO 11452, with an L configuration large enough for vehicle tests." },
    ucc: { label: "UCC", description: "Ultra-compact hybrid chamber at 1.0 m for pre-compliance testing to the CISPR 25 method — an alternative to the GTEM cell." },
    ctc: { label: "CTC", description: "Component test chamber focused on immunity testing for industrial, automotive and military components — IEC 61000-4-3, CISPR 25, ISO 11452, MIL-STD 461 and DO-160." },
    chc: { label: "CHC", description: "Compact hybrid chamber with a ø1.2 m quiet zone at 3.0 m — pre-compliance emission and full compliant immunity in one room." },
    "chc-plus": { label: "CHC Plus", description: "The compact hybrid chamber in the advanced setup, adding compliant emission measurement from 1 GHz to 18 GHz." },
    "fac-3": { label: "FAC-3", description: "3 m fully anechoic chamber for table-top EUTs — free-space conditions without a ground plane, full compliant to CISPR 16-1-4 and IEC/EN 61000-4-22." },
    "fac-3-l": { label: "FAC-3 L", description: "Extended 3 m fully anechoic chamber for floor-standing as well as table-top EUTs, with a height scan on a FAM or FBM antenna mast." },
    "sac-3-fac-3-transformer": { label: "SAC-3 / FAC-3 Transformer", description: "One 3 m chamber converted between semi-anechoic with a ground plane and fully anechoic with floor absorbers, each configuration with its own guaranteed performance." },
    rvc: { label: "Reverberation Chambers", description: "Seven reverberation chambers with the Frankonia stirrer package, from the RVC S for components to the RVC XXL for large vehicles — IEC/EN 61000-4-21, ISO 11452-11 and ISO 11451-5." },
    "mil-chc": { label: "MIL CHC", description: "Compact hybrid chamber for MIL-STD 461 and DO-160 component testing at 1.0 m, 9 kHz / 30 MHz to 40 GHz." },
    "mil-std-chamber": { label: "MIL-STD Chamber", description: "Military testing chamber for vehicles and large EUTs — MIL-STD 461 at 1.0 m, short-pyramid absorbers from 80 MHz to 40 GHz." },
    "mil-std-chamber-advanced": { label: "MIL-STD Chamber Advanced", description: "Military chamber that also meets commercial and automotive test site requirements, lined with long-pyramid or hybrid absorbers." },
    "edtc-sa": { label: "EDTC-SA", description: "E-Drive test chamber prepared for a single external load machine with a fixed shaft, for CISPR 25 emission and ISO 11452 immunity testing." },
    "edtc-ax": { label: "EDTC-AX", description: "E-Drive test chamber for e-axle tests — a patented setup prepared for two external load machines with fixed shafts." },
    "edtc-bb": { label: "EDTC-BB", description: "E-Drive test chamber including the EMC-BlueBox mobile load machine, working in four-quadrant operation to simulate any EUT stress situation." },
    "shielded-room": { label: "Shielded Room", description: "Modular and prefabricated PAN type shielded room — any size, with guaranteed shielding attenuation up to 120 dB from 10 kHz to 40 GHz." },
  },
};

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
/** A model page sits a segment deeper than the two index axes, which is what
 *  keeps it out of `/chambers/[topic]`'s way. */
export const modelPath = (slug: string) => `/chambers/model/${slug}`;

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
 * Page copy for a chamber page, carried over from the 2026 catalogue.
 *
 * Originally the technology topics only, where the prose is the whole page.
 * The industry and chamber-type indexes now read from the same shape: they
 * carry a model list as well, so their body arrives split around it — lead and
 * plates above the list, tables and feature groups below. A page with a body
 * drops the "documents on request" band; a page without one is unchanged.
 * That is the same rule `spec` follows — the data arrives a page at a time and
 * nothing pretends otherwise.
 *
 * The shape itself — lead, plates, tables, titled groups — is `PageBody`, which
 * the EMC Test Systems branch reads from as well; only the two blocks below
 * belong to this branch alone. See page-body.ts.
 *
 * Absorber designations (P600, H1300 Turbine), standard numbers and the
 * figures beside them are not translated: they are what a reader matches
 * against a drawing and a quotation.
 */
export type TopicBody = PageBody & {
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

/**
 * One model page.
 *
 * `PageBody` already carries what the 2026 catalogue spread prints — the lead
 * paragraphs, the plates, the configuration table and the titled bullet groups
 * (Features, Absorbers, Performance & Compliance). The two fields added here
 * are what only the head office's own model pages carry, and what the
 * catalogue has no equivalent of (docs/source/chambers-models.md §5.3).
 *
 * Bolted on by intersection rather than pushed into `PageBody`, for the same
 * reason `TopicBody` keeps its panoramas here: the test-system branch shares
 * `PageBody` and has neither of these.
 */
export type ModelBody = PageBody & {
  /**
   * The head office's "Overview" strip — four to six label/value pairs a reader
   * checks before anything else: which emission and immunity standards, at what
   * distance, into what volume. Rendered as badges rather than a table, because
   * it is a summary of the page and not one of its measurements.
   *
   * `label` is translated, `value` is not: the values are standard numbers and
   * distances.
   */
  overview?: readonly { label: string; value: string }[];
  /**
   * Typical Product and Verification Standards, as the head office pairs them —
   * emission in one column, immunity in the other. `title` and the column heads
   * are translated; the entries never are, because a reader matches them
   * against the standards their own product is tested to.
   */
  standards?: readonly {
    title: string;
    columns: readonly { head: string; items: readonly string[] }[];
  }[];
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
            caption: "Absorbers above, a reflecting ground plane below — under the dome-shaped roof that is the SAC-5 Plus's own concept.",
          },
          "sac-10-hybrid": {
            alt: "Large vehicle chamber. A white two-seat sports car stands on the turntable circle with a corrugated duct running from its tailpipe to a box in the floor. Short pyramid absorbers on the ceiling, long pyramid absorbers on the right-hand wall, dark panelling above them, and an antenna mast behind the car.",
            caption: "The duct at the tailpipe takes the exhaust out through the floor, so the car can run inside a room that stays shielded.",
          },
        },
      },
      references: {
        title: "Some of our references",
        note: "Customer names appear as the customers themselves publish them. Where an organisation runs more than one Frankonia installation, each one is listed separately.",
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
            caption: "위는 흡수체, 아래는 반사 접지면 — 그리고 SAC-5 Plus만의 개념인 돔형 천장입니다.",
          },
          "sac-10-hybrid": {
            alt: "대형 차량 챔버 내부. 턴테이블 원 위에 흰색 2인승 스포츠카가 서 있고 배기구에서 나온 주름 덕트가 바닥의 배기함으로 이어진다. 천장은 단피라미드, 우측 벽은 장피라미드 흡수체이며 그 위쪽 벽면은 어두운 패널이다. 차 뒤에 안테나 마스트가 있다.",
            caption: "배기구에 연결된 덕트가 배기를 바닥으로 빼냅니다. 차폐를 유지한 채 차량을 구동시키기 위한 구조입니다.",
          },
        },
      },
      references: {
        title: "주요 구축 사례",
        note: "고객사명은 고객사가 공개한 표기를 따릅니다. 한 기관에 Frankonia 설비가 둘 이상인 경우에는 각각을 따로 표기했습니다.",
      },
    },
  },
};

/**
 * The chambers overview.
 *
 * The two index axes are the page's job, so the body sits around them: what the
 * range is and what holds it together above, and the catalogue's own closing
 * argument — Advantages & Benefits, printed on p.66 — below. Neither repeats
 * what the axes already say.
 */
export const overviewBody: Record<Lang, TopicBody> = {
  en: {
    lead: [
      "Frankonia has been building EMC and antenna test laboratories since 1987. What follows on these pages is one system rather than a catalogue of separate products: a shielded room, compact chambers for pre-compliance work, the semi-anechoic and fully anechoic families at 3, 5 and 10 metres, component and e-drive chambers, and reverberation chambers sized from a single part up to a large vehicle.",
      "Every one of them is modular and prefabricated. Nothing is welded and nothing is glued — the panels are bolted from the inside every 75 mm onto a conductive mesh gasket — so a chamber can be modified, extended, relocated or resold long after handover. The shielding performance is identical across the whole system, and so is the absorber technology behind it: Frankosorb®, in service for more than 35 years without a defect.",
    ],
    figure: {
      src: "/chambers/images/overview-lineup.webp", w: 1600, h: 989,
      alt: "Semi-anechoic chamber seen down its length. Pyramid absorbers cover the side walls and the ceiling, a ferrite-tile wall closes the far end, and the reflecting floor carries a flush turntable outlined in the ground plane.",
      caption: "Absorbers above, a conductive ground plane below, and a turntable set flush into it — the shape almost every chamber in this range starts from.",
    },
    figureRow: [
      { src: "/chambers/images/overview-absorber.webp", w: 900, h: 556,
        alt: "Close view of two Frankosorb® absorber walls meeting at a corner, long pyramids in the foreground and a shorter profile behind.",
        caption: "Frankosorb® — one absorber technology across the range." },
      { src: "/chambers/images/overview-shielding.webp", w: 900, h: 556,
        alt: "A shielded chamber inside a factory hall: an open RF door showing the absorber lining, a steel gantry above, and building services running overhead.",
        caption: "Each chamber is an independent room, with simple interfaces to the building." },
      { src: "/chambers/images/overview-vehicle.webp", w: 900, h: 556,
        alt: "A car turning on the turntable of a large chamber, blurred by the exposure, with long pyramid absorbers on the right-hand wall.",
        caption: "The same system scales to a vehicle on a dynamometer." },
    ],
    groups: [
      { title: "Product advantages", items: [
        "Modular and self-supporting system, which is what guarantees the shielding performance",
        "Prefabricated standard paired with in-house production",
        "An extremely broad range of standard and custom-specific products",
        "In-house developed products, kept current with the latest technologies",
        "Identical shielding performance throughout the whole system",
        "Comprehensive automation devices, from turntable to mast",
        "Frankosorb® absorber technology as a modular and interchangeable solution",
        "Nothing glued or welded — everything mounted by bolting and screwing",
        "No timber works at all, and no harmful materials: no carbon, no polyethylene, no glue",
        "Local adjustment to electricity, statics, technical parameters or building conditions is taken as self-evident",
      ] },
      { title: "Customer benefits", items: [
        "Proven technologies and solutions for more than 35 years",
        "Safety for people, laboratory and building with class A2 non-combustible absorbers",
        "Only recyclable materials, produced in Frankonia's own eco-friendly manufacturing",
        "Few building conditions and requirements to consider",
        "A made-to-order arrangement of chamber and accessories that fits the building it goes into",
        "Simple interfaces to the building — electricity, ventilation, exhaust, data, gas",
        "Improved handling of absorbers and antennas, for faster throughput",
        "A modular setup, so the complete chamber can be relocated, modified or resold",
        "Experienced project management, from the smallest detail to the whole picture",
        "Professional installation and after-sales service by Frankonia",
      ] },
    ],
    close: "No compromises; just satisfaction throughout every custom-built setup.",
  },
  ko: {
    lead: [
      "Frankonia는 1987년부터 EMC·안테나 시험실을 지어 왔습니다. 이 페이지에 실린 제품군은 개별 제품의 목록이 아니라 하나의 시스템입니다 — 차폐룸, 사전 인증용 컴팩트 챔버, 3m·5m·10m의 반무향·완전무향 계열, 부품과 구동계 챔버, 그리고 단일 부품부터 대형 차량까지 수용하는 잔향실.",
      "전부 모듈형 사전 제작입니다. 용접도 접착도 하지 않고, 도전성 메시 개스킷 위로 패널을 75mm 간격으로 안쪽에서 볼트 체결합니다. 인수 후 오랜 시간이 지나도 개조·증설·이전·재매각이 가능한 이유입니다. 차폐 성능은 시스템 전체에서 동일하며, 그 바탕이 되는 흡수체 기술도 하나입니다 — 35년 이상 결함 없이 가동해 온 Frankosorb®.",
    ],
    figure: {
      src: "/chambers/images/overview-lineup.webp", w: 1600, h: 989,
      alt: "반무향 챔버를 길이 방향으로 본 내부. 측벽과 천장은 피라미드 흡수체로 덮여 있고 안쪽 끝은 페라이트 타일 벽이며, 반사면인 바닥에는 매립형 턴테이블이 접지면 위에 원으로 드러나 있다.",
      caption: "위는 흡수체, 아래는 도전성 접지면, 그리고 그 안에 매립된 턴테이블 — 이 라인업의 거의 모든 챔버가 여기서 출발합니다.",
    },
    figureRow: [
      { src: "/chambers/images/overview-absorber.webp", w: 900, h: 556,
        alt: "Frankosorb® 흡수체 두 벽면이 모서리에서 만나는 근접 사진. 앞쪽은 장피라미드, 뒤쪽은 더 짧은 형상이다.",
        caption: "Frankosorb® — 전 라인업을 관통하는 하나의 흡수체 기술." },
      { src: "/chambers/images/overview-shielding.webp", w: 900, h: 556,
        alt: "공장 홀 안의 차폐 챔버. 열린 RF 도어 너머로 흡수체 라이닝이 보이고, 위쪽으로 철골 갠트리와 건물 설비 배관이 지난다.",
        caption: "모든 챔버는 독립된 방이며, 건물과는 단순한 인터페이스로만 연결됩니다." },
      { src: "/chambers/images/overview-vehicle.webp", w: 900, h: 556,
        alt: "대형 챔버의 턴테이블 위에서 회전하며 흐릿하게 찍힌 승용차. 우측 벽은 장피라미드 흡수체다.",
        caption: "같은 시스템이 다이나모미터 위의 차량 규모까지 확장됩니다." },
    ],
    groups: [
      { title: "제품 강점", items: [
        "모듈형 자립 구조 — 차폐 성능을 보장하는 것이 바로 이 구조입니다",
        "사전 제작 표준과 자체 생산의 결합",
        "표준 제품과 맞춤 제품을 아우르는 대단히 넓은 제품군",
        "최신 기술을 반영해 계속 갱신되는 자체 개발 제품",
        "시스템 전체에서 동일한 차폐 성능",
        "턴테이블부터 마스트까지 포괄하는 자동화 장비",
        "모듈형·교체 가능한 솔루션으로서의 Frankosorb® 흡수체 기술",
        "접착도 용접도 없이 전부 볼트·나사 체결",
        "목공 작업 없음, 유해 물질 없음 — 카본도, 폴리에틸렌도, 접착제도 쓰지 않습니다",
        "전기·구조·기술 파라미터·건물 조건에 대한 현지 조정은 당연한 전제로 둡니다",
      ] },
      { title: "고객 이점", items: [
        "35년 이상 검증된 기술과 솔루션",
        "A2 불연 흡수체로 확보하는 인원·시험실·건물의 안전",
        "재활용 가능한 소재만 사용하며, 자체 친환경 생산 설비에서 제조",
        "건물 측에서 고려해야 할 조건과 요구사항이 적음",
        "들어갈 건물에 맞춰 챔버와 부속을 주문 제작 구성",
        "건물과의 단순한 인터페이스 — 전기, 환기, 배기, 데이터, 가스",
        "흡수체와 안테나 취급성 개선으로 처리량 향상",
        "모듈형 구성이므로 챔버 전체를 이전·개조·재매각 가능",
        "세부부터 전체까지 챙기는 숙련된 프로젝트 관리",
        "Frankonia의 전문 설치 서비스와 사후 서비스",
      ] },
    ],
    close: "타협하지 않습니다. 맞춤으로 지은 모든 설비에서 남는 것은 만족뿐이어야 합니다.",
  },
};

/**
 * The four industry indexes.
 *
 * An industry page answers a different question from a chamber-type page:
 * not "what shape is this room" but "what does this sector have to prove, and
 * which chambers prove it". So the tables here follow the catalogue's own
 * industry spreads — Automotive p.40–45, Military p.54–55, E-Drive p.48–49 —
 * and the commercial page, whose seventeen models are spread across six
 * different spreads, gets the one table the catalogue never prints: the
 * measuring distance each family is built for.
 */
export const industryBody: Record<Lang, Partial<Record<ChamberIndustry, TopicBody>>> = {
  en: {
    automotive: {
      lead: [
        "The automotive range follows a part from the bench to the vehicle. The ACTC tests components at 1.0 m to CISPR 25 and ISO 11452, with the permanent plug-in contact strip and the bonded test table the standard asks for; the UCC does the same work pre-compliantly in an ultra-compact shell, as an alternative to the GTEM cell and for research.",
        "The AVTC brings components, whole vehicles and commercial products into one chamber at 3.0 m or 5.0 m, and the SAC-10V is the 10 m vehicle chamber with an integrated dynamometer for ECE R10 — up to a heavy-load test zone for vehicles 18 m long.",
        "Beside them stand five reverberation chambers, from a component in the RVC S to a large vehicle in the RVC XXL, listed with the rest of the range below.",
      ],
      figure: {
        src: "/chambers/images/ind-automotive-vehicle.webp", w: 1600, h: 1095,
        alt: "A dark saloon car on the turntable of a large chamber, with a broad boom of log-periodic antenna elements aimed at it from the left and long pyramid absorbers lining the walls and ceiling.",
        caption: "A full vehicle on the turntable, with the antenna boom at the test distance — the setup ECE R10 and CISPR 12 are written around.",
      },
      tables: [
        { title: "Component chambers — ACTC and UCC",
          note: "Frequency range 150 kHz / 26 MHz to 18 GHz, 40 GHz as an option.",
          head: ["Configuration", "External dimension (L × W × H)", "Test condition"],
          rows: [
            ["ACTC", "6,380 × 5,480 × 3,750 mm", "CISPR 25 component level at 1.0 m test distance"],
            ["ACTC L", "11,480 × 6,580 × 4,500 mm", "CISPR 25 component level and vehicle at 1.0 m test distance"],
            ["UCC", "4,580 × 3,080 × 2,550 mm", "Pre-compliant component level at 1.0 m test distance"],
          ] },
        { title: "Vehicle chamber — AVTC",
          note: "Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["AVTC", "11,480 × 9,380 × 6,000 mm", "QZ ø3.0 m at 3.0 m test distance (H = 2.5 m)\ne.g., with a turntable up to ø5.0 m"],
            ["AVTC L", "14,780 × 11,480 × 6,300 mm", "QZ ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)\ne.g., with a turntable up to ø6.0 m"],
            ["AVTC XL", "16,280 × 12,680 × 6,300 mm", "QZ ø4.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)\ne.g., with an integrated dynamometer ø7.0 m"],
          ] },
        { title: "ECE R10 vehicle chamber — SAC-10V",
          note: "/H is the Frankosorb® hybrid absorber solution, /P the full long-pyramid P2400 lining. Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-10VC-6/H", "23,030 × 14,480 × 6,300 mm", "QZ ø6.0 m at 5.0 m test distance (H = 2.5 m)\nPrepared for a 10.0 m test distance for vehicle tests"],
            ["SAC-10V-6/H", "22,580 × 15,680 × 8,700 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10V-6/H (SL12)", "24,380 × 16,580 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 12 m long vehicles"],
            ["SAC-10V-6/H (SL18)", "26,780 × 18,080 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 18 m long vehicles"],
            ["SAC-10V-6/P", "26,480 × 20,180 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10V-6/P (SL12)", "26,480 × 20,180 × 10,500 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 12 m long vehicles"],
            ["SAC-10V-6/P (SL18)", "30,080 × 20,180 × 10,500 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 18 m long vehicles"],
          ] },
      ],
      groups: [
        { title: "Performance and compliance", items: [
          "Full compliant emission (EMI) according to CISPR 25 and CISPR 12",
          "Full compliant immunity (EMS) according to ISO 11452 and ISO 11451",
          "Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI C63.4 — NSA ±3.5 dB (30 MHz to 1 GHz), SVSWR +5.5 dB (1 GHz to 18 GHz), NSIL ±4.0 dB (9 kHz to 30 MHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3 — FU 0/+6 dB at 75 % of 16 measuring points (26/80 MHz to 18 GHz)",
          "ECE R10 with a dynamometer, at 3.0 m in the AVTC and at 10.0 m in the SAC-10V",
          "CISPR 36 in the SAC-10V",
          "ACTC uniform field 0.5 × 0.5 m at 1.0 m, FU 0/+6 dB at 100 %; ACTC L uniform field 1.5 × 1.5 m at 3.0 m",
        ] },
        { title: "Setup and upgrades", items: [
          "A permanent plug-in contact strip between the absorbers keeps the test table electrically connected to the shielding, as CISPR 25 requires",
          "The UCC as an alternative to the GTEM cell, for pre-compliance and for research and scientific purposes",
          "Floor absorber board for an efficient and fast modification of the test setup (AVTC)",
          "Upgradeable for E-Drive throughout: load machine, EMC-BlueBox, battery test system",
          "Optimised Frankosorb® hybrid lining — Ferrite with H450 in the ACTC and UCC, Ferrite with H1000 and H600 in the AVTC",
          "Heavy load test zones for 12 m and 18 m vehicles in the SAC-10V SL12 and SL18",
        ] },
      ],
    },
    military: {
      lead: [
        "The MIL-STD Chamber is Frankonia's large military chamber at 1.0 m test distance to MIL-STD 461, for radiated emission and immunity on large EUTs and vehicles, lined with short-pyramid absorbers from 80 MHz to 40 GHz.",
        "The MIL-STD Advanced adds commercial and automotive test site compliance on the same MIL-STD 461 basis, with either a long-pyramid or a hybrid lining. Both are fully customised to the customer's requirements for large and heavyweight EUTs.",
        "For lightweight equipment at component level there are the compact chambers: the MIL CHC with a Frankosorb® hybrid absorber layout, and the MIL CPC with short-pyramid absorbers — both full compliant to MIL-STD 461 and DO-160 at 1.0 m test distance.",
      ],
      figure: {
        src: "/chambers/images/ind-military-milchc.webp", w: 744, h: 590,
        alt: "A compact military chamber: hybrid absorbers on the walls and ceiling, and a long wooden test table with a ground plane standing on the reflecting floor.",
        caption: "Component level to MIL-STD 461 — the bonded wooden test table at the centre of the chamber is what the standard specifies.",
      },
      tables: [
        { title: "Configurations",
          note: "The MIL-STD chambers are dimensioned to the customer's own requirement; the compact MIL CHC and MIL CPC are supplied in the sizes given here.",
          head: ["Configuration", "External dimension (L × W × H)", "Frequency range and lining"],
          rows: [
            ["MIL-STD Chamber", "Custom size", "9 kHz / 80 MHz to 40 GHz with short-pyramid absorbers\nMilitary compliance"],
            ["MIL-STD Advanced Pyramid", "Custom size", "9 kHz / 26 MHz to 40 GHz with long-pyramid absorbers\nMilitary, industrial and automotive compliance"],
            ["MIL-STD Advanced Hybrid", "Custom size", "9 kHz / 30 MHz to 40 GHz with hybrid absorber lining\nMilitary, industrial and automotive compliance"],
            ["MIL CHC", "4,880 × 4,880 × 3,000 mm", "9 kHz / 30 MHz to 40 GHz with hybrid absorber lining"],
            ["MIL CHC / DO-160", "5,330 × 4,880 × 3,000 mm", "9 kHz / 30 MHz to 40 GHz with hybrid absorber lining"],
            ["MIL CPC", "6,080 × 5,380 × 3,750 mm", "9 kHz / 80 MHz to 40 GHz with short-pyramid lining"],
          ] },
        { title: "Absorption at normal incidence",
          head: ["Frequency", "Absorption"],
          rows: [
            ["80 MHz to 250 MHz", "6 dB, as per standard requirements"],
            ["Above 250 MHz", "10 dB, as per standard requirements"],
          ] },
      ],
      groups: [
        { title: "Performance and compliance", items: [
          "Full compliant emission (EMI) and immunity (EMS) according to MIL-STD 461 and DO-160, 30 MHz / 80 MHz to 40 GHz",
          "Full compliant for components according to MIL-STD 461 and DO-160 — MIL CHC and MIL CPC",
          "Commercial compliance for the MIL-STD Advanced: full compliant emission according to CISPR 16-1-4 and ANSI C63.4 — NSA ±3.5 dB (30 MHz to 1 GHz), SVSWR +5.5 dB (1 GHz to 18 GHz), NSIL ±4.0 dB (9 kHz to 30 MHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3 — FU 0/+6 dB at 75 % of 16 measuring points (26/80 MHz to 18 GHz)",
        ] },
        { title: "Absorbers", items: [
          "Frankosorb® short-pyramid, long-pyramid or hybrid absorber lining, chosen with the frequency range",
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible according to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable according to EN 13501-1 class B as the alternative",
        ] },
      ],
    },
    commercial: {
      lead: [
        "The commercial range is the widest of the four: seventeen chambers, from a bare shielded room to a 10 m semi-anechoic chamber with a ø6.0 m quiet zone. Which one a laboratory needs follows from two figures — the measuring distance the standard asks for, and the quiet zone the EUT has to sit inside.",
        "From 3.0 m upwards the chambers are full compliant for emission to CISPR 16-1-4 and ANSI C63.4 and for immunity to IEC/EN 61000-4-3. Below that, the compact chambers trade compliant emission for a room that fits an existing building: the CHC is pre-compliant for emission and full compliant for immunity, and the CHC Plus adds compliant emission above 1 GHz.",
      ],
      figure: {
        src: "/chambers/images/ind-commercial-sac.webp", w: 1600, h: 988,
        alt: "An empty semi-anechoic chamber. Pyramid absorbers on the walls and ceiling, a ferrite-tile wall at the far end, and a bare ground plane with a flush turntable marked out in yellow and black tape.",
        caption: "The chamber before a test: ground plane, turntable and marked measuring points, with the antenna side left clear.",
      },
      tables: [
        { title: "By measuring distance",
          note: "The models themselves, with their own dimensions, are listed above. Frequency range 9 kHz / 30 MHz to 18 GHz across the range, 40 GHz as an option; the shielded room is specified from 10 kHz instead.",
          head: ["Measuring distance", "Chambers", "Quiet zone"],
          rows: [
            ["Shielding only", "Shielded Room", "10 kHz to 18/40 GHz, up to 120 dB"],
            ["Component level", "CTC", "Full compliant immunity per IEC 61000-4-3"],
            ["3.0 m, pre-compliance", "CHC · CHC Plus", "ø1.2 m"],
            ["3.0 m, free space", "FAC-3 · FAC-3 L", "ø1.5 m"],
            ["3.0 m", "SAC-3 Plus · SAC-3 Square", "ø1.2 m to ø3.0 m"],
            ["3.0 m, convertible", "SAC-3 / FAC-3 Transformer", "SAC ø2.0 m · FAC ø1.5 m"],
            ["3.0 m and 5.0 m", "SAC-5 Plus · SAC-5 Square", "ø2.0 m to ø4.0 m"],
            ["10.0 m", "SAC-10 Plus · Triton · SAC-10/H · SAC-10/P", "ø3.0 m to ø6.0 m"],
            ["Reverberation", "RVC e1 · RVC e2", "Working volume 3.3 × 3.5 × 2.6 m and 5.5 × 4.0 × 2.6 m"],
          ] },
      ],
      groups: [
        { title: "Shared compliance", items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI C63.4, ETSI upgradeable — NSA ±3.5 dB (30 MHz to 1 GHz), SVSWR +5.5 dB (1 GHz to 18 GHz), NSIL ±4.0 dB (9 kHz to 30 MHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3 — FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
          "Free-space emission and immunity according to IEC/EN 61000-4-22 in the fully anechoic chambers — deviation SdB 1.8 dB",
          "Pre-compliant emission in the compact chambers — NSA ±4.0 dB (30 MHz to 1 GHz) with limited height scan, SVSWR +6.0 dB above 1 GHz",
        ] },
        { title: "Shared construction", items: [
          "Modular, prefabricated PAN type shielding — nothing welded, nothing glued",
          "Optimised Frankosorb® hybrid absorber lining, or a full long-pyramid lining at 10 m",
          "Non-combustible absorbers to EN 13501-1 class A2 - s1 d0, class B as the alternative",
          "Upgradeable for E-Drive across the SAC families: load machine, EMC-BlueBox, battery test system",
          "CE conformity per Machinery Directive 2006/42/EC for the product as standard, or for the complete laboratory as an option",
          "Usable for automotive and military standard tests",
        ] },
      ],
    },
    powertrain: {
      lead: [
        "The E-Drive test solutions are Frankonia's dedicated test sites for powertrain components and for the facilities around hybrid, electric, fuel cell and battery drive systems. They offer superior conditions for radiation testing according to CISPR 25 and ISO 11452.",
        "The EDTC-SA is prepared for a single external load machine with a fixed shaft; the EDTC-AX for e-axle tests on powertrain units, with two. The patented system is open to any dynamometer supplier — Frankonia takes care of the EMC setup inside the chamber, with adapted test tables, a grounding conception and 90° angle gear boxes.",
        "The EDTC-BB brings the load machine inside instead. The EMC-BlueBox is a mobile four-quadrant load machine, so braking, driving, direction of rotation, speed regulation and torque control can be simulated in any mix — and on a turntable it gives a 360° view of the EUT.",
      ],
      figure: {
        src: "/chambers/images/ind-powertrain-edtc.webp", w: 1600, h: 1095,
        alt: "A powertrain test rig on the turntable of an absorber-lined chamber: a blue load machine housing on a wheeled frame, a green electric motor on a bench beside it, and copper busbars running between them.",
        caption: "The load machine and the motor under test share the turntable, so the whole rig turns together for a 360° scan.",
      },
      tables: [
        { title: "Chamber configurations",
          head: ["Configuration", "External dimension (L × W × H)", "Load machine"],
          rows: [
            ["EDTC-SA", "7,880 × 5,480 × 3,750 mm", "For the fixed-shaft version with an external load machine\ne.g., 1 × 250 kW with 3,000 RPM and 3,000 Nm"],
            ["EDTC-AX", "9,080 × 6,080 × 3,750 mm", "For the fixed-shaft version with external load machines\ne.g., 2 × 250 kW with 3,000 RPM and 3,000 Nm"],
            ["EDTC-BB", "7,880 × 6,380 × 3,750 mm", "For the mobile load machine EMC-BlueBox up to 120 kW"],
            ["EDTC-BB with turntable", "10,880 × 6,980 × 3,900 mm", "For the mobile load machine EMC-BlueBox up to 120 kW\nWith a turntable for a 360° scan"],
            ["EDTC-HY", "6,380 × 5,480 × 3,750 mm", "For a hydraulic load machine, e.g., 2 × 250 kW"],
          ] },
        { title: "External load machines",
          head: ["", "EDTC-250", "EDTC-500"],
          rows: [
            ["Power", "1 × 250 kW", "2 × 250 kW"],
            ["Speed", "3,000 RPM", "3,000 RPM"],
            ["Torque", "3,000 Nm", "3,000 Nm"],
          ] },
        { title: "EMC-BlueBox mobile load machine",
          head: ["", "BlueBox-30", "BlueBox-40", "BlueBox-65", "BlueBox-120"],
          rows: [
            ["Power", "30 kW", "40 kW", "63 kW", "120 kW"],
            ["Speed", "11,000 RPM", "9,000 RPM", "6,500 RPM", "6,000 RPM"],
            ["Torque", "82 Nm", "140 Nm", "240 Nm", "470 Nm"],
          ] },
      ],
      groups: [
        { title: "Features", items: [
          "Fully compliant with CISPR 25 and ISO 11452",
          "Optimised Frankosorb® hybrid absorber lining",
          "Component or system test level",
          "Mobile, flexible and adjustable to any kind of EUT",
          "360° view when placed on a turntable, for an extended testing range",
          "Combination with battery tests",
          "Integration kit for existing chambers",
          "Optional EUT e-motor power source and water cooling system",
        ] },
        { title: "Installation", items: [
          "Motor adapter, grounding and connection per CISPR 25",
          "Vibration-free and non-interacting solid basement (floating slab)",
          "Extended services in consultancy and test readiness guidance",
        ] },
      ],
    },
  },
  ko: {
    automotive: {
      lead: [
        "자동차 계열은 부품이 차량에 실리기까지의 경로를 그대로 따라갑니다. ACTC는 1.0m 거리에서 CISPR 25와 ISO 11452에 따라 부품을 시험하며, 규격이 요구하는 상시 플러그인 접촉 스트립과 접지 연결된 시험대를 갖춥니다. UCC는 같은 시험을 사전 인증 수준으로, 초소형 챔버에서 수행합니다 — GTEM 셀의 대안이자 연구용 솔루션입니다.",
        "AVTC는 부품과 완성차, 상용 제품 시험을 3.0m 또는 5.0m 거리의 한 챔버에 모읍니다. SAC-10V는 다이나모미터를 내장한 10m 차량 챔버로 ECE R10에 대응하며, 최대 18m 길이 차량을 위한 중하중 시험 구역까지 구성할 수 있습니다.",
        "여기에 잔향실 5종이 더해집니다. RVC S의 부품부터 RVC XXL의 대형 차량까지, 아래 라인업에 함께 실려 있습니다.",
      ],
      figure: {
        src: "/chambers/images/ind-automotive-vehicle.webp", w: 1600, h: 1095,
        alt: "대형 챔버의 턴테이블 위에 짙은 색 세단이 있고, 왼쪽에서 로그페리오딕 소자가 넓게 배열된 붐이 차량을 겨누고 있다. 벽과 천장은 장피라미드 흡수체다.",
        caption: "턴테이블 위의 완성차와 시험 거리에 놓인 안테나 붐 — ECE R10과 CISPR 12가 전제하는 배치입니다.",
      },
      tables: [
        { title: "부품 시험 챔버 — ACTC · UCC",
          note: "주파수 범위 150 kHz / 26 MHz ~ 18 GHz, 40 GHz 옵션.",
          head: ["구성", "외형 치수 (L × W × H)", "시험 조건"],
          rows: [
            ["ACTC", "6,380 × 5,480 × 3,750 mm", "CISPR 25 component level at 1.0 m test distance"],
            ["ACTC L", "11,480 × 6,580 × 4,500 mm", "CISPR 25 component level and vehicle at 1.0 m test distance"],
            ["UCC", "4,580 × 3,080 × 2,550 mm", "Pre-compliant component level at 1.0 m test distance"],
          ] },
        { title: "차량 시험 챔버 — AVTC",
          note: "주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz 옵션.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["AVTC", "11,480 × 9,380 × 6,000 mm", "QZ ø3.0 m at 3.0 m test distance (H = 2.5 m)\ne.g., with a turntable up to ø5.0 m"],
            ["AVTC L", "14,780 × 11,480 × 6,300 mm", "QZ ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)\ne.g., with a turntable up to ø6.0 m"],
            ["AVTC XL", "16,280 × 12,680 × 6,300 mm", "QZ ø4.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)\ne.g., with an integrated dynamometer ø7.0 m"],
          ] },
        { title: "ECE R10 차량 챔버 — SAC-10V",
          note: "/H는 Frankosorb® 하이브리드 흡수체 구성, /P는 P2400 장피라미드 전면 라이닝입니다. 주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz 옵션.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-10VC-6/H", "23,030 × 14,480 × 6,300 mm", "QZ ø6.0 m at 5.0 m test distance (H = 2.5 m)\nPrepared for a 10.0 m test distance for vehicle tests"],
            ["SAC-10V-6/H", "22,580 × 15,680 × 8,700 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10V-6/H (SL12)", "24,380 × 16,580 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 12 m long vehicles"],
            ["SAC-10V-6/H (SL18)", "26,780 × 18,080 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 18 m long vehicles"],
            ["SAC-10V-6/P", "26,480 × 20,180 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10V-6/P (SL12)", "26,480 × 20,180 × 10,500 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 12 m long vehicles"],
            ["SAC-10V-6/P (SL18)", "30,080 × 20,180 × 10,500 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 18 m long vehicles"],
          ] },
      ],
      groups: [
        { title: "성능과 적합성", items: [
          "CISPR 25·CISPR 12에 따른 전 규격 방사 방출(EMI) 적합",
          "ISO 11452·ISO 11451에 따른 전 규격 면역(EMS) 적합",
          "CISPR 16-1-4·ANSI C63.4에 따른 전 규격 방출 적합 — NSA ±3.5 dB (30 MHz~1 GHz), SVSWR +5.5 dB (1~18 GHz), NSIL ±4.0 dB (9 kHz~30 MHz)",
          "IEC/EN 61000-4-3에 따른 전 규격 면역 적합 — FU 0/+6 dB, 16개 측정점의 75 % (26/80 MHz~18 GHz)",
          "다이나모미터를 갖춘 ECE R10 — AVTC는 3.0m, SAC-10V는 10.0m 거리",
          "SAC-10V의 CISPR 36 대응",
          "ACTC 균일 전계 0.5 × 0.5 m at 1.0 m, FU 0/+6 dB 100 % · ACTC L 균일 전계 1.5 × 1.5 m at 3.0 m",
        ] },
        { title: "구성과 확장", items: [
          "흡수체 사이에 상시 설치되는 플러그인 접촉 스트립이 시험대와 차폐체의 전기적 연결을 유지합니다 — CISPR 25의 요구 사항입니다",
          "UCC는 사전 인증용과 연구·학술용으로 GTEM 셀을 대체합니다",
          "시험 배치를 빠르게 바꾸기 위한 바닥 흡수체 보드(AVTC)",
          "전 계열 E-Drive 확장 가능 — 부하기, EMC-BlueBox, 배터리 시험 시스템",
          "최적화된 Frankosorb® 하이브리드 라이닝 — ACTC·UCC는 페라이트와 H450, AVTC는 페라이트와 H1000·H600",
          "SAC-10V SL12·SL18의 12m·18m 차량용 중하중 시험 구역",
        ] },
      ],
    },
    military: {
      lead: [
        "MIL-STD Chamber는 MIL-STD 461에 따른 1.0m 측정거리의 대형 군용 챔버로, 대형 피시험체와 차량의 방사 방출·면역 시험에 대응합니다. 80 MHz에서 40 GHz까지의 단피라미드 흡수체로 라이닝됩니다.",
        "MIL-STD Advanced는 같은 MIL-STD 461 기반 위에 상용·자동차 시험장 요구사항 적합성을 더한 구성으로, 장피라미드 또는 하이브리드 라이닝을 선택할 수 있습니다. 두 솔루션 모두 대형·고중량 피시험체에 대한 고객 요구에 맞춰 전면 맞춤 설계됩니다.",
        "경량 장비의 부품 단위 시험에는 컴팩트 챔버가 있습니다. Frankosorb® 하이브리드 흡수체를 적용한 MIL CHC와 단피라미드 흡수체를 적용한 MIL CPC로, 둘 다 1.0m 거리에서 MIL-STD 461과 DO-160에 전 규격 적합합니다.",
      ],
      figure: {
        src: "/chambers/images/ind-military-milchc.webp", w: 744, h: 590,
        alt: "소형 군용 챔버 내부. 벽과 천장은 하이브리드 흡수체로 덮여 있고, 반사면인 바닥 위에 접지면을 갖춘 긴 목재 시험대가 놓여 있다.",
        caption: "MIL-STD 461 부품 단위 시험 — 챔버 중앙의 접지 연결된 목재 시험대가 규격이 지정하는 배치입니다.",
      },
      tables: [
        { title: "구성과 치수",
          note: "MIL-STD 계열은 고객 요구사항에 맞춰 치수를 설계합니다. 컴팩트 챔버인 MIL CHC와 MIL CPC는 위 치수로 공급됩니다.",
          head: ["구성", "외형 치수 (L × W × H)", "주파수 범위와 라이닝"],
          rows: [
            ["MIL-STD Chamber", "Custom size", "9 kHz / 80 MHz to 40 GHz with short-pyramid absorbers\nMilitary compliance"],
            ["MIL-STD Advanced Pyramid", "Custom size", "9 kHz / 26 MHz to 40 GHz with long-pyramid absorbers\nMilitary, industrial and automotive compliance"],
            ["MIL-STD Advanced Hybrid", "Custom size", "9 kHz / 30 MHz to 40 GHz with hybrid absorber lining\nMilitary, industrial and automotive compliance"],
            ["MIL CHC", "4,880 × 4,880 × 3,000 mm", "9 kHz / 30 MHz to 40 GHz with hybrid absorber lining"],
            ["MIL CHC / DO-160", "5,330 × 4,880 × 3,000 mm", "9 kHz / 30 MHz to 40 GHz with hybrid absorber lining"],
            ["MIL CPC", "6,080 × 5,380 × 3,750 mm", "9 kHz / 80 MHz to 40 GHz with short-pyramid lining"],
          ] },
        { title: "수직 입사 흡수량",
          head: ["주파수", "흡수량"],
          rows: [
            ["80 MHz ~ 250 MHz", "6 dB (규격 요구 기준)"],
            ["250 MHz 초과", "10 dB (규격 요구 기준)"],
          ] },
      ],
      groups: [
        { title: "성능과 적합성", items: [
          "MIL-STD 461·DO-160에 따른 전 규격 방출(EMI)·면역(EMS) 적합, 30 MHz / 80 MHz ~ 40 GHz",
          "MIL-STD 461·DO-160에 따른 부품 단위 전 규격 적합 — MIL CHC, MIL CPC",
          "MIL-STD Advanced의 상용 적합성: CISPR 16-1-4·ANSI C63.4에 따른 전 규격 방출 적합 — NSA ±3.5 dB (30 MHz~1 GHz), SVSWR +5.5 dB (1~18 GHz), NSIL ±4.0 dB (9 kHz~30 MHz)",
          "IEC/EN 61000-4-3에 따른 전 규격 면역 적합 — FU 0/+6 dB, 16개 측정점의 75 % (26/80 MHz~18 GHz)",
        ] },
        { title: "흡수체", items: [
          "주파수 범위에 맞춰 선택하는 Frankosorb® 단피라미드·장피라미드·하이브리드 라이닝",
          "장기 안정성이 입증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연",
          "대안으로 EN 13501-1 class B 난연",
        ] },
      ],
    },
    commercial: {
      lead: [
        "일반 산업·전자기기 계열은 네 산업군 중 가장 넓습니다. 차폐룸 한 칸에서 ø6.0m Quiet Zone을 갖춘 10m 반무향 챔버까지 17종이며, 어느 것이 필요한지는 두 값에서 결정됩니다 — 규격이 요구하는 측정 거리, 그리고 피시험체가 들어가야 할 Quiet Zone의 크기입니다.",
        "3.0m 이상의 챔버는 CISPR 16-1-4·ANSI C63.4 방출과 IEC/EN 61000-4-3 면역에 전 규격 적합합니다. 그 아래의 컴팩트 챔버는 적합 방출 대신 기존 건물에 들어가는 크기를 택한 구성입니다. CHC는 방출 사전 인증·면역 전 규격 적합이고, CHC Plus는 1 GHz 이상의 적합 방출을 더합니다.",
      ],
      figure: {
        src: "/chambers/images/ind-commercial-sac.webp", w: 1600, h: 988,
        alt: "비어 있는 반무향 챔버 내부. 벽과 천장은 피라미드 흡수체, 안쪽 끝은 페라이트 타일 벽이며, 노랑·검정 테이프로 구획된 접지면에 매립형 턴테이블이 있다.",
        caption: "시험 전의 챔버 — 접지면과 턴테이블, 표시된 측정 위치, 그리고 비워 둔 안테나 쪽 공간.",
      },
      tables: [
        { title: "측정 거리별 선택",
          note: "각 모델의 개별 치수는 위 라인업에 있습니다. 주파수 범위는 전 계열 9 kHz / 30 MHz ~ 18 GHz(40 GHz 옵션)이며, 차폐룸만 10 kHz부터로 규정됩니다.",
          head: ["측정 거리", "챔버", "Quiet Zone"],
          rows: [
            ["차폐 전용", "Shielded Room", "10 kHz ~ 18/40 GHz, 최대 120 dB"],
            ["부품 단위", "CTC", "IEC 61000-4-3 전 규격 면역"],
            ["3.0 m 사전 인증", "CHC · CHC Plus", "ø1.2 m"],
            ["3.0 m 자유공간", "FAC-3 · FAC-3 L", "ø1.5 m"],
            ["3.0 m", "SAC-3 Plus · SAC-3 Square", "ø1.2 m ~ ø3.0 m"],
            ["3.0 m 변환형", "SAC-3 / FAC-3 Transformer", "SAC ø2.0 m · FAC ø1.5 m"],
            ["3.0 m · 5.0 m", "SAC-5 Plus · SAC-5 Square", "ø2.0 m ~ ø4.0 m"],
            ["10.0 m", "SAC-10 Plus · Triton · SAC-10/H · SAC-10/P", "ø3.0 m ~ ø6.0 m"],
            ["잔향", "RVC e1 · RVC e2", "작업 체적 3.3 × 3.5 × 2.6 m, 5.5 × 4.0 × 2.6 m"],
          ] },
      ],
      groups: [
        { title: "공통 적합성", items: [
          "CISPR 16-1-4·ANSI C63.4에 따른 전 규격 방출(EMI) 적합, ETSI 업그레이드 가능 — NSA ±3.5 dB (30 MHz~1 GHz), SVSWR +5.5 dB (1~18 GHz), NSIL ±4.0 dB (9 kHz~30 MHz)",
          "IEC/EN 61000-4-3에 따른 전 규격 면역(EMS) 적합 — FU 0/+6 dB, 16개 측정점의 75 % (30/80 MHz~18 GHz)",
          "완전무향 챔버의 IEC/EN 61000-4-22 자유공간 방출·면역 적합 — 편차 SdB 1.8 dB",
          "컴팩트 챔버의 사전 인증 방출 — NSA ±4.0 dB (30 MHz~1 GHz, 높이 스캔 제한), 1 GHz 이상 SVSWR +6.0 dB",
        ] },
        { title: "공통 구조", items: [
          "모듈형 사전 제작 PAN 타입 차폐 — 용접 없음, 접착 없음",
          "최적화된 Frankosorb® 하이브리드 라이닝, 또는 10m 계열의 장피라미드 전면 라이닝",
          "EN 13501-1 class A2 - s1 d0 불연 흡수체, 대안으로 class B",
          "SAC 계열 전반의 E-Drive 확장 — 부하기, EMC-BlueBox, 배터리 시험 시스템",
          "기계류 지침 2006/42/EC에 따른 CE 적합성 — 제품 단위 기본, 시험실 전체는 옵션",
          "자동차·군수 규격 시험에도 사용 가능",
        ] },
      ],
    },
    powertrain: {
      lead: [
        "E-Drive 시험 솔루션은 구동계 부품과, 하이브리드·전기·연료전지·배터리 구동 시스템 관련 설비를 위한 전용 시험장입니다. CISPR 25와 ISO 11452에 따른 방사 시험에 최적화된 조건을 제공합니다.",
        "EDTC-SA는 고정축 외부 부하기 1대를, EDTC-AX는 구동계 유닛의 e-axle 시험을 위해 2대를 전제로 구성됩니다. 특허 시스템은 어떤 다이나모미터 공급사와도 결합할 수 있습니다 — Frankonia는 챔버 내부의 EMC 구성을 맡아 전용 시험대와 접지 개념, 90° 앵글 기어박스를 제공합니다.",
        "EDTC-BB는 반대로 부하기를 챔버 안으로 들입니다. EMC-BlueBox는 4사분면 운전이 가능한 이동식 부하기이므로 제동·구동·정회전/역회전·속도 제어·토크 제어를 임의로 조합해 재현할 수 있고, 턴테이블에 올리면 피시험체를 360°로 볼 수 있습니다.",
      ],
      figure: {
        src: "/chambers/images/ind-powertrain-edtc.webp", w: 1600, h: 1095,
        alt: "흡수체로 둘러싸인 챔버의 턴테이블 위에 구동계 시험 장치가 놓여 있다. 바퀴 달린 프레임 위의 파란색 부하기 함체, 옆 시험대의 초록색 전기 모터, 그 사이를 잇는 구리 부스바가 보인다.",
        caption: "부하기와 피시험 모터가 같은 턴테이블을 쓰기 때문에, 360° 스캔에서 장치 전체가 함께 회전합니다.",
      },
      tables: [
        { title: "챔버 구성",
          head: ["구성", "외형 치수 (L × W × H)", "부하기"],
          rows: [
            ["EDTC-SA", "7,880 × 5,480 × 3,750 mm", "For the fixed-shaft version with an external load machine\ne.g., 1 × 250 kW with 3,000 RPM and 3,000 Nm"],
            ["EDTC-AX", "9,080 × 6,080 × 3,750 mm", "For the fixed-shaft version with external load machines\ne.g., 2 × 250 kW with 3,000 RPM and 3,000 Nm"],
            ["EDTC-BB", "7,880 × 6,380 × 3,750 mm", "For the mobile load machine EMC-BlueBox up to 120 kW"],
            ["EDTC-BB with turntable", "10,880 × 6,980 × 3,900 mm", "For the mobile load machine EMC-BlueBox up to 120 kW\nWith a turntable for a 360° scan"],
            ["EDTC-HY", "6,380 × 5,480 × 3,750 mm", "For a hydraulic load machine, e.g., 2 × 250 kW"],
          ] },
        { title: "외부 부하기",
          head: ["", "EDTC-250", "EDTC-500"],
          rows: [
            ["출력", "1 × 250 kW", "2 × 250 kW"],
            ["회전수", "3,000 RPM", "3,000 RPM"],
            ["토크", "3,000 Nm", "3,000 Nm"],
          ] },
        { title: "EMC-BlueBox 이동식 부하기",
          head: ["", "BlueBox-30", "BlueBox-40", "BlueBox-65", "BlueBox-120"],
          rows: [
            ["출력", "30 kW", "40 kW", "63 kW", "120 kW"],
            ["회전수", "11,000 RPM", "9,000 RPM", "6,500 RPM", "6,000 RPM"],
            ["토크", "82 Nm", "140 Nm", "240 Nm", "470 Nm"],
          ] },
      ],
      groups: [
        { title: "특성", items: [
          "CISPR 25·ISO 11452 완전 적합",
          "최적화된 Frankosorb® 하이브리드 흡수체 라이닝",
          "부품 단위 또는 시스템 단위 시험",
          "이동성과 유연성 — 어떤 형태의 피시험체에도 맞춰 조정",
          "턴테이블에 올리면 360° 관측이 가능해 시험 범위가 확장됩니다",
          "배터리 시험과의 조합",
          "기존 챔버용 통합 키트",
          "피시험 전동기용 전원과 수랭 시스템 옵션",
        ] },
        { title: "설치 조건", items: [
          "CISPR 25에 따른 모터 어댑터·접지·결선",
          "진동이 없고 상호 간섭하지 않는 견고한 기초(플로팅 슬래브)",
          "컨설팅과 시험 준비 안내를 포함한 확장 서비스",
        ] },
      ],
    },
  },
};

/**
 * The six chamber-type indexes.
 *
 * Where an industry page asks what a sector has to prove, a type page asks what
 * a shape of room can do — and the catalogue answers that spread by spread, so
 * these bodies follow its spreads: the dome and square SACs and the two 10 m
 * linings (p.18–37), the fully anechoic pair and the Transformer (p.16, p.26),
 * the compact hybrids (p.12), the component and e-drive chambers (p.40, p.48),
 * the reverberation range (p.50) and the shielded room the whole system starts
 * from (p.10).
 */
export const typeBody: Record<Lang, Partial<Record<ChamberType, TopicBody>>> = {
  en: {
    sac: {
      lead: [
        "A semi-anechoic chamber is lined with absorbers above and reflective below: the floor is a conductive ground plane, which is the test site CISPR 16-1-4 and ANSI C63.4 describe. Twelve of Frankonia's chambers are built that way, at 3, 5 and 10 metres.",
        "Two shells exist for the same distances. The dome design — the SAC-3 Plus and the SAC-5 Plus — shapes the roof so that the Frankosorb® layout minimises reflections; since its introduction the SAC-3 Plus has been the most selected chamber in its class. The square design keeps the traditional shell, reaches a ø4.0 m quiet zone, and takes a larger turntable or a mobile dynamometer.",
        "At 10 m the question becomes the lining and the number of axes. The SAC-10 Plus is a single axis. The Triton folds one 10.0 m and two 3.0 m axes into one polygonal shell, with the antennas and floor absorbers staying connected between them — which is what cuts the setup time. The SAC-10/H is lined hybrid, the SAC-10/P entirely with P2400 long pyramids as the cost-efficient alternative.",
      ],
      figure: {
        src: "/chambers/images/type-sac-dome.webp", w: 1600, h: 1095,
        alt: "The inside of a dome-design semi-anechoic chamber. The ceiling arches over the room in a dark band framed by pyramid absorbers, the walls are fully lined, and trolleys of white floor absorbers stand at the sides of the reflecting floor.",
        caption: "The dome roof, seen from inside: the curve is what carries the absorber layout that minimises reflections. The floor absorbers wait on trolleys at the wall, for when the same room is used for immunity.",
      },
      tables: [
        { title: "Dome design — SAC-3 Plus and SAC-5 Plus",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Optimised Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-3 Plus S", "8,480 × 6,530 × 6,000 mm", "QZ ø1.2 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus M", "8,780 × 6,530 × 6,000 mm", "QZ ø1.5 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus L", "9,230 × 6,530 × 6,000 mm", "QZ ø2.0 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus", "9,680 × 6,530 × 6,000 mm", "QZ ø2.0 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-5 Plus", "12,680 × 7,730 × 6,300 mm", "QZ ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Plus L", "12,680 × 8,180 × 6,300 mm", "QZ ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
          ] },
        { title: "Square design — SAC-3 Square and SAC-5 Square",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Optimised Frankosorb® hybrid lining with Ferrite, H450 or H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-3 Square", "9,680 × 6,530 × 6,000 mm", "QZ ø2.0 m at 3.0 m test distance (H = 2.5 m)"],
            ["SAC-3 Square L", "10,880 × 6,980 × 6,000 mm", "QZ ø3.0 m at 3.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square", "12,680 × 7,730 × 6,000 mm", "QZ ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square L", "12,680 × 8,180 × 6,000 mm", "QZ ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square XL", "13,280 × 9,380 × 6,300 mm", "QZ ø4.0 m at 5.0 m test distance (H = 2.5 m)\nQZ ø3.0 m at 3.0 m test distance (H = 2.5 m)\nReady for a larger turntable or mobile dynamometer"],
          ] },
        { title: "10 m — single and multiple test axes",
          head: ["Configuration", "External dimension (L × W × H)", "Test axes"],
          rows: [
            ["SAC-10 Plus", "19,205 × 12,080 × 8,325 mm", "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)\nSingle test axis — the cost-saving configuration of the same shell"],
            ["SAC-10 Plus Triton", "19,205 × 12,080 × 8,325 mm", "QZ ø3.0 m with multiple test axes (H = 3.0 m)\n1 × 10.0 m test distance (axis 1 = EMI and EMS)\n1 × 3.0 m test distance (axis 2 = EMI and EMS)\n1 × 3.0 m test distance (axis 3 = EMS)"],
          ] },
        { title: "10 m — sized to the quiet zone",
          note: "/H is lined with Frankosorb® hybrid absorbers — Ferrite with H1000, H600 and the H1300 Turbine; /P is fully lined with P2400 long pyramids. Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-10-3/H", "18,380 × 12,830 × 8,550 mm", "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-4/H", "19,280 × 13,280 × 8,550 mm", "QZ ø4.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-5/H", "21,080 × 15,080 × 8,700 mm", "QZ ø5.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-6/H", "21,680 × 15,680 × 8,700 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-3/P", "21,680 × 13,730 × 8,550 mm", "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-4/P", "21,680 × 13,730 × 8,550 mm", "QZ ø4.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-5/P", "23,480 × 16,580 × 9,000 mm", "QZ ø5.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-6/P", "24,980 × 17,180 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
          ] },
      ],
      groups: [
        { title: "Performance and compliance", items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI C63.4, ETSI upgradeable — NSA ±3.5 dB (30 MHz to 1 GHz), SVSWR +5.5 dB (1 GHz to 18 GHz), NSIL ±4.0 dB (9 kHz to 30 MHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3 — FU 0/+6 dB at 75 % of 16 measuring points, from 30/80 MHz at 3 m and 5 m and from 26/80 MHz at 10 m, up to 18 GHz",
          "Full compliant according to CISPR 25 and MIL-STD 461 in the Triton",
          "Full compliant with military and automotive standards in the SAC-10/H and SAC-10/P",
        ] },
        { title: "What separates them", items: [
          "Dome design: an innovatively shaped roof with an optimised Frankosorb® layout, minimised reflections, and outstanding NSA, SVSWR and FU — the most selected chamber in its class since its introduction",
          "Square design: the traditional shell, a quiet zone from ø2.0 m up to ø4.0 m, a large turntable or mobile dynamometer, and immunity floor absorbers stored in the chamber on trolleys",
          "Triton: three independent axes in a polygonal shell, antennas and floor absorbers staying connected, and a guided floor absorber arrangement that cuts setup time while reproducibility stays stable — the most compact and lightweight 10 m chamber existing",
          "SAC-10/H: adjustable size, characteristics and configuration for different EUT requirements, single or double test axis, specialised for out-of-the-range test environments",
          "SAC-10/P: a full long-pyramid lining as a cost-efficient alternative to hybrid without limitations, with floor absorber storage below the pyramids",
          "All SAC families are upgradeable for E-Drive — load machine, BlueBox, battery test system — and usable for automotive and military standard tests",
        ] },
      ],
    },
    fac: {
      lead: [
        "A fully anechoic chamber has absorbers on the floor as well, so there is no ground plane and no reflection to account for: the measurement is made under free-space conditions, on a test site CISPR 16-1-4 describes without a ground plane.",
        "The FAC-3 is the compact version for table-top EUTs, with a ø1.5 m quiet zone at 1.5 m height. The FAC-3 L extends it to floor-standing products as well, and adds a height scan using a FAM or FBM antenna mast.",
        "The Transformer is one chamber that is both. It runs as a semi-anechoic chamber with a ground plane, and an optimised floor absorber modification kit turns it into a fully anechoic test site for table-top EUTs — the two setups keep their own quiet zones and their own compliance figures.",
      ],
      figure: {
        src: "/chambers/images/type-fac-freespace.webp", w: 1600, h: 1095,
        alt: "A fully anechoic chamber. White pyramid absorbers cover the floor as well as the walls and ceiling, a wooden test bench stands on a walkway across them, and a horn antenna on a red mount points in from the left.",
        caption: "Absorbers underfoot as well: with no ground plane there is no reflected ray to add, which is what free-space conditions mean in practice.",
      },
      tables: [
        { title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Optimised Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and products"],
          rows: [
            ["FAC-3", "8,705 × 4,655 × 3,750 mm", "QZ ø1.5 m at 3.0 m test distance (H = 1.5 m)\nTable-top products"],
            ["FAC-3 L", "9,380 × 5,780 × 6,000 mm", "QZ ø1.5 m at 3.0 m test distance (H = 2.0 m)\nFloor-standing and table-top products, with height scan"],
            ["SAC-3 / FAC-3 Transformer", "9,680 × 6,530 × 6,000 mm", "SAC setup: QZ ø2.0 m at 3.0 m test distance (H = 2.5 m)\nFAC setup: QZ ø1.5 m at 3.0 m test distance (H = 1.5 m)"],
          ] },
      ],
      groups: [
        { title: "Performance and compliance", items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4 — FS NSA ±3.5 dB (30 MHz to 1 GHz), SVSWR +5.5 dB (1 GHz to 18 GHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3 — FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
          "Full compliant immunity and emission according to IEC/EN 61000-4-22 — deviation SdB 1.8 dB",
          "Full compliant emission according to CISPR 16-1-4, IEC/EN 61000-4-22 and ETSI",
          "Transformer in the semi configuration: NSA ±3.5 dB, SVSWR +5.5 dB, NSIL ±4.0 dB (9 kHz to 30 MHz); in the fully configuration: FS NSA ±3.5 dB, SVSWR +5.5 dB",
          "Transformer additionally full compliant according to CISPR 25 and MIL-STD 461",
        ] },
        { title: "Features", items: [
          "FAC-3: a test site for table-top EUTs",
          "FAC-3 L: a test site for table-top and floor-standing EUTs, with height scan",
          "A cost-effective solution for free-space measurements",
          "Compact chamber design with an advanced Frankosorb® absorber lining",
          "Double test axis option",
          "Transformer: an optimised floor absorber modification kit, and upgradeable for E-Drive (load machine, BlueBox, battery test system)",
        ] },
      ],
    },
    chc: {
      lead: [
        "A compact hybrid chamber is the smallest full test site in the range: a 3.0 m measuring distance and a ø1.2 m quiet zone inside a shell 7.4 m long. It is pre-compliant for emission and full compliant for immunity — the combination that carries most of a development department's work, in a fraction of the room a compliant emission site needs.",
        "The CHC Plus is the advanced setup, which adds compliant emission measurement from 1 GHz to 18 GHz. The L versions of both add an absorber-lined partition wall, so that RF power amplifiers, antennas or floor absorbers can be housed and stored inside the chamber itself.",
        "The MIL CHC is the same idea for defence work: a Frankosorb® hybrid absorber layout from 30 MHz to 40 GHz, full compliant for components to MIL-STD 461 and DO-160 at 1.0 m test distance.",
      ],
      figure: {
        src: "/chambers/images/type-chc-panel.webp", w: 1122, h: 591,
        alt: "Close view inside a chamber corner: hybrid absorbers meeting a dark panelled wall, with a bolted feed-through plate and a warning label between them, and the Frankonia mark stamped into the panel beside it.",
        caption: "The wall behind the absorbers is the chamber: bolted panels, a feed-through plate and the electrics, all reachable from outside.",
      },
      tables: [
        { title: "Configurations",
          note: "CHC family 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option; MIL CHC 9 kHz / 30 MHz to 40 GHz with a hybrid absorber lining.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and feature"],
          rows: [
            ["CHC", "7,355 × 3,755 × 3,300 mm", "QZ ø1.2 m at 3.0 m test distance"],
            ["CHC L", "8,255 × 3,755 × 3,300 mm", "QZ ø1.2 m at 3.0 m test distance\nAn amplifier, for example, can be stored in the chamber"],
            ["CHC Plus", "7,355 × 3,755 × 3,300 mm", "QZ ø1.2 m at 3.0 m test distance\nCompliant emission above 1 GHz"],
            ["CHC Plus L", "7,580 × 4,655 × 4,350 mm", "QZ ø1.2 m at 3.0 m test distance\nTurntable ø2.0 m, compliant emission above 1 GHz"],
            ["MIL CHC", "4,880 × 4,880 × 3,000 mm", "Component testing to MIL-STD 461 and DO-160 at 1.0 m"],
            ["MIL CHC / DO-160", "5,330 × 4,880 × 3,000 mm", "Component testing to MIL-STD 461 and DO-160 at 1.0 m"],
          ] },
      ],
      groups: [
        { title: "Performance and compliance", items: [
          "Pre-compliant emission (EMI) according to CISPR 16-1-4 — NSA ±4.0 dB (30 MHz to 1 GHz) with limited height scan",
          "Compliant emission (EMI) according to CISPR 16-1-4 — SVSWR +6.0 dB (1 GHz to 18 GHz), in the CHC Plus",
          "Full compliant and cost saving solution for immunity (EMS) according to IEC/EN 61000-4-3 — FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
          "MIL CHC: full compliant emission and immunity for components according to MIL-STD 461 and DO-160",
        ] },
        { title: "Absorbers", items: [
          "Optimised Frankosorb® hybrid absorber lining with Ferrite, H450 or H600",
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible according to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable according to EN 13501-1 class B as the alternative",
        ] },
      ],
    },
    component: {
      lead: [
        "A component chamber tests a part rather than a product: the EUT sits on a table at a fixed distance, the harness is bonded to the shield, and the standard prescribes the geometry down to the millimetre. CISPR 25 and ISO 11452 for automotive parts, MIL-STD 461 and DO-160 for defence, IEC/EN 61000-4-3 for immunity across all of them.",
        "The ACTC is the full compliant CISPR 25 chamber at 1.0 m, with a permanent plug-in contact strip installed between the absorbers to keep the test table electrically connected to the shielding. The UCC does the same work pre-compliantly in an ultra-compact shell — an alternative to the GTEM cell, and to research and scientific setups in any sector. The CTC is the full compliant immunity chamber: industrial products, automotive components and military tests in one room.",
        "The three EDTC chambers extend the same discipline to a running powertrain, built either around an external load machine with a fixed shaft or around the mobile EMC-BlueBox.",
      ],
      figure: {
        src: "/chambers/images/type-component-cispr25.webp", w: 1600, h: 988,
        alt: "A component test setup: a wooden test table with a ground plane standing in an absorber-lined chamber, a red antenna trolley aimed at it from the left, and a hybrid ferrite-and-pyramid wall behind.",
        caption: "The CISPR 25 geometry: a bonded wooden table, a fixed 1.0 m distance, and the harness routed along the table edge.",
      },
      tables: [
        { title: "Configurations",
          note: "Frequency range — ACTC and UCC 150 kHz / 26 MHz to 18 GHz (40 GHz option), CTC 9 kHz / 30 MHz to 18 GHz (40 GHz option). The EDTC chambers are specified by the load machine they are built around.",
          head: ["Configuration", "External dimension (L × W × H)", "Test condition"],
          rows: [
            ["ACTC", "6,380 × 5,480 × 3,750 mm", "CISPR 25 component level at 1.0 m test distance"],
            ["ACTC L", "11,480 × 6,580 × 4,500 mm", "CISPR 25 component level and vehicle at 1.0 m test distance"],
            ["UCC", "4,580 × 3,080 × 2,550 mm", "Pre-compliant component level at 1.0 m test distance"],
            ["CTC", "8,480 × 5,485 × 3,750 mm", "Full compliant immunity testing per IEC 61000-4-3\nFull compliant to CISPR 25 and ISO 11452, MIL-STD 461 and DO-160"],
            ["EDTC-SA", "7,880 × 5,480 × 3,750 mm", "One external load machine with fixed shaft"],
            ["EDTC-AX", "9,080 × 6,080 × 3,750 mm", "Two external load machines with fixed shaft, for e-axle tests"],
            ["EDTC-BB", "7,880 × 6,380 × 3,750 mm", "The mobile load machine EMC-BlueBox, up to 120 kW"],
          ] },
      ],
      groups: [
        { title: "Performance and compliance", items: [
          "ACTC: full compliant emission according to CISPR 25, full compliant immunity according to ISO 11452, compliant immunity according to IEC/EN 61000-4-3 — uniform field 0.5 × 0.5 m at 1.0 m, FU 0/+6 dB at 100 % (26/80 MHz to 18 GHz)",
          "ACTC L: full compliant emission according to CISPR 25 and immunity according to ISO 11452 and IEC/EN 61000-4-3 — uniform field 1.5 × 1.5 m at 3.0 m, FU 0/+6 dB at 75 % of 16 measuring points",
          "UCC: pre-compliant emission according to CISPR 25 and pre-compliant immunity according to ISO 11452",
          "CTC: full compliant immunity per IEC 61000-4-3, full compliant with CISPR 25 and ISO 11452, MIL-STD 461 and DO-160",
          "EDTC: fully compliant with CISPR 25 and ISO 11452",
        ] },
        { title: "Setup", items: [
          "A permanent plug-in contact strip between the absorbers, and the test table CISPR 25 requires",
          "Optimised Frankosorb® hybrid absorber lining with Ferrite and H450",
          "Upgradeable for E-Drive: load machine, EMC-BlueBox, battery test system",
          "EDTC: motor adapter, grounding and connection per CISPR 25, on a vibration-free floating slab",
          "EDTC-BB: four-quadrant operation, on a turntable for a 360° view of the EUT",
        ] },
      ],
    },
    rvc: {
      lead: [
        "A reverberation chamber does not absorb. Its walls reflect, and a stirrer keeps changing the boundary conditions so that the field inside becomes statistically uniform over one turn. For immunity work that means a high field strength from modest amplifier power, and no antenna alignment to argue about.",
        "Frankonia builds them on the same modular construction system as the anechoic chambers. Prefabricated high-quality shielding panels above 8 MS/m guarantee the performance, and they can be installed reverse for a flat inside surface or as regular PAN shielding mounted from within — which leaves a later absorber lining possible. An existing EMC chamber can be converted into an RVC, and an RVC retrofitted with Frankosorb® hybrid absorbers.",
        "The stirrer is the instrument. Frankonia designs its own — Z-fold, disc, tube and large-disc — and also implements a customer's own stirrer design, in a new chamber or a converted one.",
      ],
      figure: {
        src: "/chambers/images/type-rvc-stirrer.webp", w: 1122, h: 591,
        alt: "Inside a reverberation chamber: bare metal shielding panels on every surface, a large disc stirrer turning under the ceiling and blurred by the exposure, a blue car on the turntable, and white reflectors standing beside it.",
        caption: "No absorbers anywhere — the stirrer overhead, caught mid-turn, is what makes the field uniform.",
      },
      tables: [
        { title: "Commercial and industrial RVC",
          head: ["Model", "External dimension (L × W × H)", "Working volume, LUF and stirrer"],
          rows: [
            ["RVC e1", "7,580 × 5,630 × 4,200 mm", "Working volume 3.3 × 3.5 × 2.6 m · LUF 200 MHz\n1 × Z-Fold stirrer (vertical oriented)\nSmall or medium size ISM and multimedia products"],
            ["RVC e2", "11,280 × 7,280 × 4,950 mm", "Working volume 5.5 × 4.0 × 2.6 m · LUF 80 MHz\n2 × Z-Fold stirrer (vertical and horizontal oriented)\nLarge ISM and multimedia products"],
          ] },
        { title: "Automotive and military RVC",
          head: ["Model", "External dimension (L × W × H)", "Working volume, LUF and stirrer"],
          rows: [
            ["RVC S", "5,330 × 3,380 × 3,300 mm", "Working volume 2.5 × 1.0 × 1.5 m · LUF 200 MHz\n1 × Z-Fold stirrer (vertical oriented)\nComponents for military or automotive"],
            ["RVC M", "7,580 × 5,630 × 4,200 mm", "Working volume 3.3 × 3.5 × 2.6 m · LUF 200 MHz\n1 × Z-Fold stirrer (vertical oriented)\nLarge components for military or automotive"],
            ["RVC L", "13,880 × 11,480 × 6,300 mm (custom)", "Working volume 8.0 × 5.0 × 3.0 m · LUF 80 MHz\n2 × Z-Fold stirrer (vertical and horizontal oriented)\nVehicles"],
            ["RVC XL", "15,530 × 11,480 × 6,600 mm (custom)", "Working volume 8.0 × 5.0 × 3.0 m · LUF 80 MHz\n1 × Large-disc stirrer ø9.0 m, 2 × disc stirrer ø4.0 m\nVehicles"],
            ["RVC XXL", "17,480 × 13,580 × 6,600 mm (custom)", "Working volume 8.0 × 5.0 × 3.0 m · LUF 80 MHz\n1 × Large-disc stirrer ø12.0 m, 2 × disc stirrer ø4.0 m\nLarge vehicles"],
          ] },
        { title: "Frankonia stirrers",
          note: "Frankonia offers various stirrer designs and concepts, and also adapts a customer's own design for a new RVC or a converted chamber.",
          head: ["Type", "Rotation", "Example size"],
          rows: [
            ["Regular Z-Fold", "up to 30 RPM", "ø1.8 m"],
            ["Performance Z-Fold", "up to 60 RPM", "ø2.8 m"],
            ["Disc-style", "up to 120 RPM", "ø4.0 m"],
            ["Tube-style", "up to 240 RPM", "ø2.0 m"],
            ["Large-disc", "up to 10 RPM", "ø12.0 m"],
          ] },
      ],
      groups: [
        { title: "Features and compliance", items: [
          "Immunity compliance according to IEC/EN 61000-4-21 and ISO 11452-11",
          "Immunity and emission compliance according to ISO 11451-5 (fast stirring)",
          "Full safety integration per Machinery Directive 2006/42/EC",
          "Prefabricated high-quality shielding panels above 8 MS/m",
          "Panels installed reverse for a flat surface inside, or as regular PAN shielding mounted from within, which allows future upgrades such as an absorber lining",
          "Retrofit of an RVC with Frankosorb® hybrid absorbers, or conversion of an old EMC chamber into an RVC",
          "A cost-effective and high-performance solution from small products up to vehicles",
        ] },
      ],
    },
    "shielded-room": {
      lead: [
        "The shielded room is where the whole range starts. Prefabricated PAN type modules of 2.0 mm galvanised steel are bolted from the inside every 75 mm onto a high-conductivity mesh gasket that seals the joints; the short screwing distance and a precise, predefined tightening torque are what make the shielding attenuation last.",
        "The modules pass through a standard building door, so any size of shielding is possible and the installation can run close to the walls of the parent building. Nothing is glued and nothing is welded, which means the room can be dismantled without damage, modified, maintained, or transferred somewhere else entirely.",
        "The same panels are the substrate for Frankosorb® absorbers. That is how a shielded room becomes an anechoic chamber later — and why every chamber on the rest of these pages is built on this one.",
      ],
      figure: {
        src: "/chambers/images/type-shielded-room-pan.webp", w: 1122, h: 591,
        alt: "A row of shielded rooms inside a factory hall, seen from outside: grey panel walls held by red steel columns, white electrical distribution units and RF doors along the front, and a plain concrete floor in front of them.",
        caption: "Seen from the hall: bolted panels, a steel structure sized to the local seismic condition, and the electrical distribution reachable from outside the room.",
      },
      tables: [
        { title: "Guaranteed performance",
          note: "Frequency range according to EN 50147-1, or IEEE-299 as an option, from 10 kHz up to 18 GHz or 40 GHz. The same performance applies to every feed-through component, honeycomb, door, gate and filter.",
          head: ["Frequency", "Attenuation", "Field"],
          rows: [
            ["10 kHz", "90 dB", "Magnetic Field"],
            ["100 kHz", "100 dB", "Magnetic Field"],
            ["1 MHz", "110 dB", "Magnetic Field"],
            ["100 MHz", "120 dB", "Plane Wave"],
            ["400 MHz", "120 dB", "Plane Wave"],
            ["1 GHz", "110 dB", "Plane Wave"],
            ["18 GHz", "100 dB", "Microwave"],
            ["40 GHz", "100 dB", "Microwave"],
          ] },
      ],
      groups: [
        { title: "Construction", items: [
          "PAN type shielding modules made of 2.0 mm thick galvanized steel",
          "Modular and prefabricated standard",
          "Self-supporting stability, or a static steel structure for any seismic condition",
          "Mounted from the inside; reverse installation possible for a flat surface inside",
          "Interior finishing of walls and ceiling possible",
          "Raised floor systems, or welded floor systems",
          "Acoustic panels with absorption per ISO 354, w = 0.65 (MH)",
        ] },
        { title: "In service", items: [
          "Long life shielding attenuation characteristics",
          "Equal performance for any kind of feed-through component, honeycomb, door, gate or filter",
          "Perfectly adapted for Frankosorb® absorbers",
          "Any size of shielding is possible",
          "No glue, no welding — dismountable without any damage, with easy modification and maintenance",
          "A complete transfer or a future modification stays possible",
          "Turnkey solution",
        ] },
      ],
    },
  },
  ko: {
    sac: {
      lead: [
        "반무향 챔버는 위는 흡수체, 아래는 반사면입니다. 바닥이 도전성 접지면이며, 이것이 CISPR 16-1-4와 ANSI C63.4가 규정하는 시험장의 형태입니다. Frankonia의 챔버 12종이 이 구조로, 3m·5m·10m 측정거리에 걸쳐 있습니다.",
        "같은 거리를 두 가지 외형으로 구현합니다. 돔형인 SAC-3 Plus와 SAC-5 Plus는 지붕 형상을 설계해 Frankosorb® 배치가 반사를 최소화하도록 만든 구성으로, SAC-3 Plus는 출시 이후 동급에서 가장 많이 선택된 챔버입니다. 각형은 전통적인 외형을 유지하면서 ø4.0m Quiet Zone까지 확보하고, 더 큰 턴테이블이나 이동식 다이나모미터를 수용합니다.",
        "10m에서는 질문이 라이닝과 시험 축의 수로 바뀝니다. SAC-10 Plus는 단일 축입니다. Triton은 10.0m 1축과 3.0m 2축을 하나의 다각형 셸에 접어 넣고, 축 사이에서 안테나와 바닥 흡수체를 연결된 채로 둡니다 — 시험 준비 시간이 크게 줄어드는 이유입니다. SAC-10/H는 하이브리드, SAC-10/P는 P2400 장피라미드 전면 라이닝으로 비용 효율적인 대안입니다.",
      ],
      figure: {
        src: "/chambers/images/type-sac-dome.webp", w: 1600, h: 1095,
        alt: "돔형 반무향 챔버 내부. 천장이 어두운 띠를 이루며 아치로 넘어가고 그 둘레를 피라미드 흡수체가 감싼다. 벽면은 전면 라이닝이며, 반사면 바닥 양옆에 흰색 바닥 흡수체를 실은 대차가 서 있다.",
        caption: "안에서 본 돔 지붕 — 반사를 최소화하는 흡수체 배치를 가능하게 하는 것이 이 곡면입니다. 바닥 흡수체는 같은 방을 면역 시험에 쓸 때를 위해 벽쪽 대차에 대기합니다.",
      },
      tables: [
        { title: "돔형 — SAC-3 Plus · SAC-5 Plus",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz 옵션. 페라이트와 H1000·H600의 최적화된 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-3 Plus S", "8,480 × 6,530 × 6,000 mm", "QZ ø1.2 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus M", "8,780 × 6,530 × 6,000 mm", "QZ ø1.5 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus L", "9,230 × 6,530 × 6,000 mm", "QZ ø2.0 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus", "9,680 × 6,530 × 6,000 mm", "QZ ø2.0 m at 3.0 m test distance (H = 2.0 m)"],
            ["SAC-5 Plus", "12,680 × 7,730 × 6,300 mm", "QZ ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Plus L", "12,680 × 8,180 × 6,300 mm", "QZ ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
          ] },
        { title: "각형 — SAC-3 Square · SAC-5 Square",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz 옵션. 페라이트와 H450 또는 H600의 최적화된 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-3 Square", "9,680 × 6,530 × 6,000 mm", "QZ ø2.0 m at 3.0 m test distance (H = 2.5 m)"],
            ["SAC-3 Square L", "10,880 × 6,980 × 6,000 mm", "QZ ø3.0 m at 3.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square", "12,680 × 7,730 × 6,000 mm", "QZ ø2.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square L", "12,680 × 8,180 × 6,000 mm", "QZ ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square XL", "13,280 × 9,380 × 6,300 mm", "QZ ø4.0 m at 5.0 m test distance (H = 2.5 m)\nQZ ø3.0 m at 3.0 m test distance (H = 2.5 m)\nReady for a larger turntable or mobile dynamometer"],
          ] },
        { title: "10 m — 단일 축과 다중 축",
          head: ["구성", "외형 치수 (L × W × H)", "시험 축"],
          rows: [
            ["SAC-10 Plus", "19,205 × 12,080 × 8,325 mm", "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)\n단일 축 — 같은 셸의 비용 절감형 구성"],
            ["SAC-10 Plus Triton", "19,205 × 12,080 × 8,325 mm", "QZ ø3.0 m with multiple test axes (H = 3.0 m)\n1 × 10.0 m test distance (axis 1 = EMI and EMS)\n1 × 3.0 m test distance (axis 2 = EMI and EMS)\n1 × 3.0 m test distance (axis 3 = EMS)"],
          ] },
        { title: "10 m — Quiet Zone에 맞춘 크기",
          note: "/H는 페라이트와 H1000·H600·H1300 Turbine의 Frankosorb® 하이브리드 라이닝, /P는 P2400 장피라미드 전면 라이닝입니다. 주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz 옵션.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-10-3/H", "18,380 × 12,830 × 8,550 mm", "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-4/H", "19,280 × 13,280 × 8,550 mm", "QZ ø4.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-5/H", "21,080 × 15,080 × 8,700 mm", "QZ ø5.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-6/H", "21,680 × 15,680 × 8,700 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-3/P", "21,680 × 13,730 × 8,550 mm", "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-4/P", "21,680 × 13,730 × 8,550 mm", "QZ ø4.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-5/P", "23,480 × 16,580 × 9,000 mm", "QZ ø5.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-6/P", "24,980 × 17,180 × 9,000 mm", "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
          ] },
      ],
      groups: [
        { title: "성능과 적합성", items: [
          "CISPR 16-1-4·ANSI C63.4에 따른 전 규격 방출(EMI) 적합, ETSI 업그레이드 가능 — NSA ±3.5 dB (30 MHz~1 GHz), SVSWR +5.5 dB (1~18 GHz), NSIL ±4.0 dB (9 kHz~30 MHz)",
          "IEC/EN 61000-4-3에 따른 전 규격 면역(EMS) 적합 — FU 0/+6 dB, 16개 측정점의 75 % (3m·5m 계열은 30/80 MHz, 10m 계열은 26/80 MHz부터 18 GHz까지)",
          "Triton의 CISPR 25·MIL-STD 461 전 규격 적합",
          "SAC-10/H·SAC-10/P의 군수·자동차 규격 전 규격 적합",
        ] },
        { title: "무엇이 다른가", items: [
          "돔형 — 새롭게 설계한 지붕 형상과 최적화된 Frankosorb® 배치로 반사를 최소화하고 NSA·SVSWR·FU에서 뛰어난 성능을 냅니다. 출시 이후 동급에서 가장 많이 선택된 챔버입니다",
          "각형 — 전통적 외형, ø2.0m에서 ø4.0m까지의 Quiet Zone, 대형 턴테이블 또는 이동식 다이나모미터, 그리고 면역용 바닥 흡수체를 챔버 안 대차에 보관",
          "Triton — 다각형 셸 안의 독립된 3개 축. 안테나와 바닥 흡수체가 연결된 채로 유지되고, 유도식 바닥 흡수체 배치가 준비 시간을 크게 줄이면서 재현성은 그대로 유지합니다. 현존하는 가장 작고 가벼운 10m 챔버입니다",
          "SAC-10/H — 피시험체 요구에 따라 크기·특성·구성을 조정할 수 있고, 단일 또는 이중 시험 축을 선택합니다. 통상 범위를 벗어난 시험 환경에 특화됩니다",
          "SAC-10/P — 제약 없이 하이브리드를 대체하는 장피라미드 전면 라이닝. 피라미드 아래 공간에 바닥 흡수체를 보관합니다",
          "SAC 전 계열이 E-Drive로 확장 가능하며(부하기, BlueBox, 배터리 시험 시스템), 자동차·군수 규격 시험에도 사용됩니다",
        ] },
      ],
    },
    fac: {
      lead: [
        "완전무향 챔버는 바닥에도 흡수체를 둡니다. 접지면이 없고 더할 반사파도 없으므로, 측정은 자유공간 조건에서 이루어집니다 — CISPR 16-1-4가 접지면 없는 시험장으로 규정하는 조건입니다.",
        "FAC-3은 테이블탑 피시험체를 위한 컴팩트 구성으로, 높이 1.5m에서 ø1.5m Quiet Zone을 확보합니다. FAC-3 L은 여기에 플로어스탠딩 제품까지 포함하도록 확장하고, FAM 또는 FBM 안테나 마스트를 이용한 높이 스캔을 더합니다.",
        "Transformer는 둘을 겸하는 한 챔버입니다. 접지면을 둔 반무향 챔버로 운용하다가, 최적화된 바닥 흡수체 개조 키트를 깔면 테이블탑 피시험체용 완전무향 시험장이 됩니다 — 두 구성은 각자의 Quiet Zone과 각자의 적합성 수치를 그대로 갖습니다.",
      ],
      figure: {
        src: "/chambers/images/type-fac-freespace.webp", w: 1600, h: 1095,
        alt: "완전무향 챔버 내부. 벽과 천장은 물론 바닥까지 흰 피라미드 흡수체로 덮여 있고, 그 위를 가로지르는 통로에 목재 시험대가 놓여 있으며 왼쪽에서 붉은 마운트의 혼 안테나가 안쪽을 향한다.",
        caption: "발밑까지 흡수체입니다. 접지면이 없으니 더해질 반사파도 없다는 것 — 자유공간 조건은 실제로는 이 뜻입니다.",
      },
      tables: [
        { title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz 옵션. 페라이트와 H1000·H600의 최적화된 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 대상 제품"],
          rows: [
            ["FAC-3", "8,705 × 4,655 × 3,750 mm", "QZ ø1.5 m at 3.0 m test distance (H = 1.5 m)\nTable-top products"],
            ["FAC-3 L", "9,380 × 5,780 × 6,000 mm", "QZ ø1.5 m at 3.0 m test distance (H = 2.0 m)\nFloor-standing and table-top products, with height scan"],
            ["SAC-3 / FAC-3 Transformer", "9,680 × 6,530 × 6,000 mm", "SAC setup: QZ ø2.0 m at 3.0 m test distance (H = 2.5 m)\nFAC setup: QZ ø1.5 m at 3.0 m test distance (H = 1.5 m)"],
          ] },
      ],
      groups: [
        { title: "성능과 적합성", items: [
          "CISPR 16-1-4에 따른 전 규격 방출(EMI) 적합 — FS NSA ±3.5 dB (30 MHz~1 GHz), SVSWR +5.5 dB (1~18 GHz)",
          "IEC/EN 61000-4-3에 따른 전 규격 면역(EMS) 적합 — FU 0/+6 dB, 16개 측정점의 75 % (30/80 MHz~18 GHz)",
          "IEC/EN 61000-4-22에 따른 전 규격 면역·방출 적합 — 편차 SdB 1.8 dB",
          "CISPR 16-1-4·IEC/EN 61000-4-22·ETSI에 따른 전 규격 방출 적합",
          "Transformer 반무향 구성: NSA ±3.5 dB, SVSWR +5.5 dB, NSIL ±4.0 dB (9 kHz~30 MHz) · 완전무향 구성: FS NSA ±3.5 dB, SVSWR +5.5 dB",
          "Transformer는 CISPR 25·MIL-STD 461에도 전 규격 적합합니다",
        ] },
        { title: "특성", items: [
          "FAC-3 — 테이블탑 피시험체를 위한 시험장",
          "FAC-3 L — 테이블탑과 플로어스탠딩 피시험체를 위한 시험장, 높이 스캔 포함",
          "자유공간 측정을 위한 비용 효율적인 솔루션",
          "진보된 Frankosorb® 흡수체 라이닝을 적용한 컴팩트 설계",
          "이중 시험 축 옵션",
          "Transformer — 최적화된 바닥 흡수체 개조 키트, E-Drive 확장 가능(부하기, BlueBox, 배터리 시험 시스템)",
        ] },
      ],
    },
    chc: {
      lead: [
        "컴팩트 하이브리드 챔버는 이 라인업에서 가장 작은 완결형 시험장입니다. 길이 7.4m의 셸 안에서 3.0m 측정거리와 ø1.2m Quiet Zone을 확보합니다. 방출은 사전 인증, 면역은 전 규격 적합 — 개발 부서 업무의 대부분을 감당하는 조합을, 적합 방출 시험장이 요구하는 공간의 일부만으로 구현한 구성입니다.",
        "CHC Plus는 여기에 1 GHz~18 GHz 적합 방출 측정을 더한 상위 구성입니다. 두 모델의 L 버전은 흡수체를 두른 칸막이벽을 추가해, RF 전력 증폭기·안테나·바닥 흡수체를 챔버 안에 두고 보관할 수 있게 합니다.",
        "MIL CHC는 같은 발상을 방산 업무에 옮긴 것입니다. 30 MHz~40 GHz의 Frankosorb® 하이브리드 흡수체 구성으로, 1.0m 거리에서 MIL-STD 461과 DO-160에 부품 단위 전 규격 적합합니다.",
      ],
      figure: {
        src: "/chambers/images/type-chc-panel.webp", w: 1122, h: 591,
        alt: "챔버 모서리 근접 사진. 하이브리드 흡수체가 어두운 패널 벽과 만나고, 그 사이에 볼트로 고정된 관통 패널과 경고 라벨이 있으며 옆 패널에는 FRANKONIA 마크가 새겨져 있다.",
        caption: "흡수체 뒤의 벽이 곧 챔버입니다 — 볼트로 조립된 패널, 관통 패널, 그리고 밖에서 접근하는 전기 설비.",
      },
      tables: [
        { title: "구성",
          note: "CHC 계열 9 kHz / 30 MHz ~ 18 GHz(40 GHz 옵션), MIL CHC 9 kHz / 30 MHz ~ 40 GHz 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 특징"],
          rows: [
            ["CHC", "7,355 × 3,755 × 3,300 mm", "QZ ø1.2 m at 3.0 m test distance"],
            ["CHC L", "8,255 × 3,755 × 3,300 mm", "QZ ø1.2 m at 3.0 m test distance\n증폭기 등을 챔버 안에 보관 가능"],
            ["CHC Plus", "7,355 × 3,755 × 3,300 mm", "QZ ø1.2 m at 3.0 m test distance\n1 GHz 이상 적합 방출"],
            ["CHC Plus L", "7,580 × 4,655 × 4,350 mm", "QZ ø1.2 m at 3.0 m test distance\nø2.0 m 턴테이블, 1 GHz 이상 적합 방출"],
            ["MIL CHC", "4,880 × 4,880 × 3,000 mm", "1.0 m 거리 MIL-STD 461·DO-160 부품 시험"],
            ["MIL CHC / DO-160", "5,330 × 4,880 × 3,000 mm", "1.0 m 거리 MIL-STD 461·DO-160 부품 시험"],
          ] },
      ],
      groups: [
        { title: "성능과 적합성", items: [
          "CISPR 16-1-4에 따른 사전 인증 방출(EMI) — NSA ±4.0 dB (30 MHz~1 GHz, 높이 스캔 제한)",
          "CISPR 16-1-4에 따른 적합 방출(EMI) — SVSWR +6.0 dB (1~18 GHz), CHC Plus 구성",
          "IEC/EN 61000-4-3에 따른 전 규격 면역(EMS) 적합 — FU 0/+6 dB, 16개 측정점의 75 % (30/80 MHz~18 GHz)",
          "MIL CHC — MIL-STD 461·DO-160에 따른 부품 단위 전 규격 방출·면역 적합",
        ] },
        { title: "흡수체", items: [
          "페라이트와 H450 또는 H600의 최적화된 Frankosorb® 하이브리드 라이닝",
          "장기 안정성이 입증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연",
          "대안으로 EN 13501-1 class B 난연",
        ] },
      ],
    },
    component: {
      lead: [
        "부품 챔버는 제품이 아니라 부품을 시험합니다. 피시험체는 정해진 거리의 시험대 위에 놓이고, 하니스는 차폐체에 접지되며, 배치는 규격이 밀리미터 단위로 지정합니다. 전장부품은 CISPR 25와 ISO 11452, 방산은 MIL-STD 461과 DO-160, 면역은 공통으로 IEC/EN 61000-4-3입니다.",
        "ACTC는 1.0m 거리의 CISPR 25 전 규격 적합 챔버로, 흡수체 사이에 상시 설치된 플러그인 접촉 스트립이 시험대와 차폐체의 전기적 연결을 유지합니다. UCC는 같은 시험을 초소형 챔버에서 사전 인증 수준으로 수행합니다 — GTEM 셀의 대안이자, 분야를 가리지 않는 연구·학술 용도의 대안이기도 합니다. CTC는 산업용 제품과 전장부품, 군수 시험을 한 방에서 소화하는 전 규격 면역 챔버입니다.",
        "EDTC 3종은 같은 원칙을 구동 중인 파워트레인까지 확장한 것으로, 고정축 외부 부하기 또는 이동식 EMC-BlueBox를 중심으로 구성됩니다.",
      ],
      figure: {
        src: "/chambers/images/type-component-cispr25.webp", w: 1600, h: 988,
        alt: "부품 시험 배치. 흡수체로 둘러싸인 챔버 안에 접지면을 갖춘 목재 시험대가 놓이고, 왼쪽의 붉은 안테나 대차가 시험대를 향한다. 뒤쪽 벽은 페라이트와 피라미드를 섞은 하이브리드 라이닝이다.",
        caption: "CISPR 25가 지정하는 배치 — 접지된 목재 시험대, 고정된 1.0m 거리, 그리고 시험대 가장자리를 따라 배선된 하니스.",
      },
      tables: [
        { title: "구성",
          note: "주파수 범위 — ACTC·UCC 150 kHz / 26 MHz ~ 18 GHz(40 GHz 옵션), CTC 9 kHz / 30 MHz ~ 18 GHz(40 GHz 옵션). EDTC 계열은 중심이 되는 부하기 사양으로 정의됩니다.",
          head: ["구성", "외형 치수 (L × W × H)", "시험 조건"],
          rows: [
            ["ACTC", "6,380 × 5,480 × 3,750 mm", "CISPR 25 component level at 1.0 m test distance"],
            ["ACTC L", "11,480 × 6,580 × 4,500 mm", "CISPR 25 component level and vehicle at 1.0 m test distance"],
            ["UCC", "4,580 × 3,080 × 2,550 mm", "Pre-compliant component level at 1.0 m test distance"],
            ["CTC", "8,480 × 5,485 × 3,750 mm", "Full compliant immunity testing per IEC 61000-4-3\nFull compliant to CISPR 25 and ISO 11452, MIL-STD 461 and DO-160"],
            ["EDTC-SA", "7,880 × 5,480 × 3,750 mm", "고정축 외부 부하기 1대"],
            ["EDTC-AX", "9,080 × 6,080 × 3,750 mm", "고정축 외부 부하기 2대, e-axle 시험용"],
            ["EDTC-BB", "7,880 × 6,380 × 3,750 mm", "이동식 부하기 EMC-BlueBox, 최대 120 kW"],
          ] },
      ],
      groups: [
        { title: "성능과 적합성", items: [
          "ACTC — CISPR 25 전 규격 방출, ISO 11452 전 규격 면역, IEC/EN 61000-4-3 적합 면역. 균일 전계 0.5 × 0.5 m at 1.0 m, FU 0/+6 dB 100 % (26/80 MHz~18 GHz)",
          "ACTC L — CISPR 25 전 규격 방출과 ISO 11452·IEC/EN 61000-4-3 전 규격 면역. 균일 전계 1.5 × 1.5 m at 3.0 m, FU 0/+6 dB 16개 측정점의 75 %",
          "UCC — CISPR 25 사전 인증 방출, ISO 11452 사전 인증 면역",
          "CTC — IEC 61000-4-3 전 규격 면역, CISPR 25·ISO 11452·MIL-STD 461·DO-160 전 규격 적합",
          "EDTC — CISPR 25·ISO 11452 완전 적합",
        ] },
        { title: "구성 요소", items: [
          "흡수체 사이에 상시 설치되는 플러그인 접촉 스트립과, CISPR 25가 요구하는 시험대",
          "페라이트와 H450의 최적화된 Frankosorb® 하이브리드 흡수체 라이닝",
          "E-Drive 확장 가능 — 부하기, EMC-BlueBox, 배터리 시험 시스템",
          "EDTC — CISPR 25에 따른 모터 어댑터·접지·결선, 진동 없는 플로팅 슬래브 기초",
          "EDTC-BB — 4사분면 운전, 턴테이블 위에서 피시험체의 360° 관측",
        ] },
      ],
    },
    rvc: {
      lead: [
        "잔향실은 흡수하지 않습니다. 벽이 반사하고, 스터러가 경계 조건을 계속 바꾸어 한 바퀴 동안 내부 전계가 통계적으로 균일해지게 만듭니다. 면역 시험에서는 이것이 곧 크지 않은 증폭기 출력으로 높은 전계 강도를 얻는다는 뜻이고, 안테나 정렬을 두고 다툴 일이 없다는 뜻입니다.",
        "Frankonia는 무향실과 같은 모듈형 구조 시스템 위에 잔향실을 짓습니다. 8 MS/m 이상의 사전 제작 고품질 차폐 패널이 성능을 보장하며, 안쪽 면이 평평하도록 역방향으로 설치하거나 안쪽에서 체결하는 일반 PAN 차폐로 설치할 수 있습니다 — 후자는 나중에 흡수체 라이닝을 추가할 여지를 남깁니다. 기존 EMC 챔버를 잔향실로 개조할 수 있고, 잔향실에 Frankosorb® 하이브리드 흡수체를 후설치할 수도 있습니다.",
        "핵심 장치는 스터러입니다. Frankonia는 Z-폴드·디스크·튜브·대형 디스크 방식을 자체 설계하며, 고객이 가진 스터러 설계를 신규 챔버나 개조 챔버에 그대로 구현하기도 합니다.",
      ],
      figure: {
        src: "/chambers/images/type-rvc-stirrer.webp", w: 1122, h: 591,
        alt: "잔향실 내부. 모든 면이 금속 차폐 패널이며, 천장 아래에서 회전하는 대형 디스크 스터러가 노출 시간 때문에 흐릿하게 찍혀 있다. 턴테이블 위에 파란색 승용차가 있고 옆에 흰 반사판이 서 있다.",
        caption: "어디에도 흡수체가 없습니다 — 회전 중에 포착된 천장의 스터러가 전계를 균일하게 만드는 장치입니다.",
      },
      tables: [
        { title: "상용·산업용 RVC",
          head: ["모델", "외형 치수 (L × W × H)", "작업 체적 · LUF · 스터러"],
          rows: [
            ["RVC e1", "7,580 × 5,630 × 4,200 mm", "Working volume 3.3 × 3.5 × 2.6 m · LUF 200 MHz\n1 × Z-Fold stirrer (vertical oriented)\n소형·중형 ISM·멀티미디어 제품"],
            ["RVC e2", "11,280 × 7,280 × 4,950 mm", "Working volume 5.5 × 4.0 × 2.6 m · LUF 80 MHz\n2 × Z-Fold stirrer (vertical and horizontal oriented)\n대형 ISM·멀티미디어 제품"],
          ] },
        { title: "차량·군수용 RVC",
          head: ["모델", "외형 치수 (L × W × H)", "작업 체적 · LUF · 스터러"],
          rows: [
            ["RVC S", "5,330 × 3,380 × 3,300 mm", "Working volume 2.5 × 1.0 × 1.5 m · LUF 200 MHz\n1 × Z-Fold stirrer (vertical oriented)\n군수·자동차 부품"],
            ["RVC M", "7,580 × 5,630 × 4,200 mm", "Working volume 3.3 × 3.5 × 2.6 m · LUF 200 MHz\n1 × Z-Fold stirrer (vertical oriented)\n대형 군수·자동차 부품"],
            ["RVC L", "13,880 × 11,480 × 6,300 mm (custom)", "Working volume 8.0 × 5.0 × 3.0 m · LUF 80 MHz\n2 × Z-Fold stirrer (vertical and horizontal oriented)\n차량"],
            ["RVC XL", "15,530 × 11,480 × 6,600 mm (custom)", "Working volume 8.0 × 5.0 × 3.0 m · LUF 80 MHz\n1 × Large-disc stirrer ø9.0 m, 2 × disc stirrer ø4.0 m\n차량"],
            ["RVC XXL", "17,480 × 13,580 × 6,600 mm (custom)", "Working volume 8.0 × 5.0 × 3.0 m · LUF 80 MHz\n1 × Large-disc stirrer ø12.0 m, 2 × disc stirrer ø4.0 m\n대형 차량"],
          ] },
        { title: "Frankonia 스터러",
          note: "Frankonia는 여러 스터러 설계와 개념을 제공하며, 고객의 자체 설계를 신규 RVC나 개조 챔버에 맞춰 구현하기도 합니다.",
          head: ["형식", "회전 속도", "크기 예"],
          rows: [
            ["Regular Z-Fold", "최대 30 RPM", "ø1.8 m"],
            ["Performance Z-Fold", "최대 60 RPM", "ø2.8 m"],
            ["Disc-style", "최대 120 RPM", "ø4.0 m"],
            ["Tube-style", "최대 240 RPM", "ø2.0 m"],
            ["Large-disc", "최대 10 RPM", "ø12.0 m"],
          ] },
      ],
      groups: [
        { title: "특성과 적합성", items: [
          "IEC/EN 61000-4-21·ISO 11452-11에 따른 면역 적합",
          "ISO 11451-5(고속 스터링)에 따른 면역·방출 적합",
          "기계류 지침 2006/42/EC에 따른 안전 통합",
          "8 MS/m 이상의 사전 제작 고품질 차폐 패널",
          "안쪽 면이 평평하도록 역방향 설치하거나, 안쪽에서 체결하는 일반 PAN 차폐로 설치 — 후자는 흡수체 라이닝 등 이후 업그레이드를 남겨 둡니다",
          "잔향실에 Frankosorb® 하이브리드 흡수체 후설치, 또는 기존 EMC 챔버의 잔향실 개조",
          "소형 제품부터 차량까지 아우르는 비용 효율적인 고성능 솔루션",
        ] },
      ],
    },
    "shielded-room": {
      lead: [
        "차폐룸은 이 라인업 전체가 출발하는 지점입니다. 2.0mm 아연도금 강판의 사전 제작 PAN 타입 모듈을, 이음부를 밀봉하는 고전도 메시 개스킷 위로 75mm 간격으로 안쪽에서 볼트 체결합니다. 짧은 체결 간격과 규정 토크에 따른 정밀한 조임 — 차폐 감쇠 성능이 오래 유지되는 이유가 여기 있습니다.",
        "모듈은 일반 건물 출입문을 통과하므로 어떤 크기의 차폐도 구현할 수 있고, 기존 건물 벽에 바짝 붙여 설치할 수 있습니다. 접착도 용접도 하지 않기 때문에 손상 없이 해체하고, 개조하고, 유지보수하고, 통째로 다른 곳으로 옮길 수 있습니다.",
        "같은 패널이 Frankosorb® 흡수체의 바탕이 됩니다. 차폐룸이 나중에 무향실이 되는 경로가 이것이고, 이 페이지들의 모든 챔버가 여기 위에 지어지는 이유이기도 합니다.",
      ],
      figure: {
        src: "/chambers/images/type-shielded-room-pan.webp", w: 1122, h: 591,
        alt: "공장 홀에서 밖에서 본 차폐룸 여러 동. 붉은 철골 기둥이 잡아 주는 회색 패널 벽면, 전면에 늘어선 흰색 배전반과 RF 도어, 그 앞의 콘크리트 바닥.",
        caption: "홀에서 본 모습 — 볼트로 조립된 패널, 현지 내진 조건에 맞춘 철골 구조, 그리고 방 밖에서 접근하는 배전 설비.",
      },
      tables: [
        { title: "보장 차폐 성능",
          note: "EN 50147-1 또는 옵션인 IEEE-299 기준으로 10 kHz부터 18 GHz 또는 40 GHz까지. 관통 소자, 허니콤, 도어, 게이트, 필터 등 모든 부속에 같은 성능이 적용됩니다.",
          head: ["주파수", "감쇠량", "전자계"],
          rows: [
            ["10 kHz", "90 dB", "Magnetic Field"],
            ["100 kHz", "100 dB", "Magnetic Field"],
            ["1 MHz", "110 dB", "Magnetic Field"],
            ["100 MHz", "120 dB", "Plane Wave"],
            ["400 MHz", "120 dB", "Plane Wave"],
            ["1 GHz", "110 dB", "Plane Wave"],
            ["18 GHz", "100 dB", "Microwave"],
            ["40 GHz", "100 dB", "Microwave"],
          ] },
      ],
      groups: [
        { title: "구조", items: [
          "2.0mm 두께 아연도금 강판의 PAN 타입 차폐 모듈",
          "모듈형 사전 제작 표준",
          "자립 구조, 또는 어떤 내진 조건에도 대응하는 정적 철골 구조",
          "안쪽에서 체결하며, 안쪽 면을 평평하게 하는 역방향 설치도 가능",
          "벽면과 천장의 실내 마감 가능",
          "이중바닥 시스템 또는 용접 바닥 시스템",
          "ISO 354 기준 흡음 성능의 음향 패널, w = 0.65 (MH)",
        ] },
        { title: "운용", items: [
          "오래 유지되는 차폐 감쇠 특성",
          "관통 소자, 허니콤, 도어, 게이트, 필터 등 모든 부속에서 동일한 성능",
          "Frankosorb® 흡수체에 최적화된 구조",
          "어떤 크기의 차폐도 구현 가능",
          "접착 없음, 용접 없음 — 손상 없이 해체되며 개조와 유지보수가 쉽습니다",
          "전체 이전이나 이후의 개조가 언제든 가능합니다",
          "턴키 솔루션",
        ] },
      ],
    },
  },
};

/**
 * The model pages, keyed by `ChamberModel.slug`.
 *
 * Source of record is the 2026 catalogue spread for the model, supplemented by
 * the head office's own model page for what the catalogue does not print —
 * the Overview strip, the standards lists and the load capacity. Where the two
 * disagree the catalogue wins; every such case is listed in
 * docs/source/chambers-models.md §3.
 *
 * `Partial`, and read the same way every other body table on this site is: a
 * page with an entry drops the "documents on request" band, a page without one
 * keeps it. The catalogue arrives a spread at a time and nothing pretends
 * otherwise.
 *
 * Model names, dimensions, frequencies, standard numbers, absorber
 * designations (F006, H450, H600, H1000, H1300 Turbine, P2400) and the
 * guaranteed deviations are never translated — they are what a reader matches
 * against a drawing and a quotation.
 */
/** The four bullet lines every hybrid-lined chamber repeats, with only the
 *  ferrite combination changing. Written once and taken by that combination —
 *  twenty-six pages should not carry twenty-six copies of the same sentence. */
const absorbersEn = (lining: string) => [
  `Optimized Frankosorb® hybrid absorber lining with ${lining}`,
  "High-performance nano thin-film technology with proven long-term stability",
  "Non-combustible acc. to EN 13501-1 class A2 - s1 d0",
  "Hardly inflammable acc. to EN 13501-1 class B (alternative)",
];
const absorbersKo = (lining: string) => [
  `${lining} 조합의 최적화된 Frankosorb® 하이브리드 흡수체 라이닝`,
  "장기 안정성이 검증된 고성능 나노 박막 기술",
  "EN 13501-1 class A2 - s1 d0 불연 등급",
  "EN 13501-1 class B 난연 등급(대체 사양)",
];

/** The full-compliance SAC performance block. `fu` is the only figure that
 *  moves between models — 30/80 MHz on most, 26/80 MHz on the 10 m chambers and
 *  the vehicle and military ranges. */
const sacPerformanceEn = (fu: "26" | "30" = "30") => [
  "Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI C63.4",
  "Deviation NSA ±3.5 dB (30 MHz to 1 GHz)",
  "Deviation SVSWR +5.5 dB (1 GHz to 18 GHz)",
  "Deviation NSIL ±4.0 dB (9 kHz to 30 MHz)",
  "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
  `Deviation FU 0/+6 dB at 75 % of 16 measuring points (${fu}/80 MHz to 18 GHz)`,
];
const sacPerformanceKo = (fu: "26" | "30" = "30") => [
  "CISPR 16-1-4 · ANSI C63.4 기준 방출(EMI) 정식 인증",
  "NSA 편차 ±3.5 dB (30 MHz ~ 1 GHz)",
  "SVSWR 편차 +5.5 dB (1 GHz ~ 18 GHz)",
  "NSIL 편차 ±4.0 dB (9 kHz ~ 30 MHz)",
  "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
  `FU 편차 0/+6 dB, 16개 측정점의 75 % (${fu}/80 MHz ~ 18 GHz)`,
];

/** Titles the group bands take, in the source's own words. */
const G = {
  en: { features: "Features", absorbers: "Absorbers", performance: "Performance & Compliance" },
  ko: { features: "특징", absorbers: "흡수체", performance: "성능과 인증" },
} as const;

/** The two standards blocks the head office prints, and their column heads. */
const S = {
  en: { product: "Typical Product Standards", verification: "Typical Verification Standards", emission: "Emission", immunity: "Immunity" },
  ko: { product: "대표 적용 규격", verification: "검증 규격", emission: "방출 (EMI)", immunity: "내성 (EMS)" },
} as const;

/**
 * The two standards blocks a model page carries.
 *
 * The verification pair defaults to the one the whole semi-anechoic range
 * shares — a chamber validated as a CISPR 16-1-4 / ANSI C63.4 test site, with
 * immunity to IEC/EN 61000-4-3. The fully anechoic and compact chambers verify
 * differently and pass their own.
 */
const standardsPair = (
  lang: Lang,
  emission: readonly string[],
  immunity: readonly string[],
  verification: { e: readonly string[]; i: readonly string[] } = {
    e: ["CISPR 16-1-4", "and/or ANSI C63.4"],
    i: ["IEC/EN 61000-4-3"],
  },
) => [
  {
    title: S[lang].product,
    columns: [
      { head: S[lang].emission, items: emission },
      { head: S[lang].immunity, items: immunity },
    ],
  },
  {
    title: S[lang].verification,
    columns: [
      { head: S[lang].emission, items: verification.e },
      { head: S[lang].immunity, items: verification.i },
    ],
  },
];

const sacProductEmission = ["CISPR 11", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"];
const sacProductImmunity = ["IEC/EN 61000-4-3", "ISO 11452", "MIL-STD 461"];

export const modelBody: Record<Lang, Partial<Record<string, ModelBody>>> = {
  ko: {
    "sac-3-plus": {
      lead: [
        "SAC-3 Plus는 3.0 m 측정 거리에서 최대 ø2.0 m의 Quiet Zone을 제공하는 Frankonia의 가장 범용적인 정식 인증 EMC 시험 솔루션입니다. 방출과 내성 모두 정식 인증 수준으로 수행합니다.",
        "돔 설계라 부르는 이 독창적인 지붕 형상은 최적화된 Frankosorb® 흡수체 배치와 맞물려 반사를 최소화하고, NSA · SVSWR · FU에서 뛰어난 성능을 냅니다.",
      ],
      close:
        "출시 이후 SAC-3 Plus는 자기 등급에서 가장 많이 선택된 챔버 자리를 지켜 왔습니다. 독창적인 구조와 맞춤 제작, 그리고 뛰어난 성능이 효율적이고 경제적인 해법으로 이어집니다.",
      figure: {
        src: "/chambers/models/sac-3-plus-1.webp", w: 1600, h: 1067,
        alt: "돔 설계 반무향실 내부. 좌우 벽면이 흰 피라미드 흡수체로 덮여 있고, 천장은 검은 페라이트 면이 아치를 그리며 지나가며 조명 두 개가 켜져 있습니다. 바닥은 회색 도장 접지면이고 시험 구역 둘레에 노란 표시가 있습니다.",
        caption: "돔 지붕은 외형을 위한 선택이 아닙니다. 굽은 천장이 Quiet Zone으로 들어오는 반사를 줄이는 흡수체 배치를 지탱합니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "최대 ø2.0 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-3 Plus S", "8,480 × 6,530 × 6,000 mm", "ø1.2 m\n3.0 m 측정 거리 (H = 2.0 m)"],
            ["SAC-3 Plus M", "8,780 × 6,530 × 6,000 mm", "ø1.5 m\n3.0 m 측정 거리 (H = 2.0 m)"],
            ["SAC-3 Plus L", "9,230 × 6,530 × 6,000 mm", "ø2.0 m\n3.0 m 측정 거리 (H = 2.0 m)"],
            ["SAC-3 Plus", "9,680 × 6,530 × 6,000 mm", "ø2.0 m\n3.0 m 측정 거리 (H = 2.0 m)"],
          ],
        },
      ],
      standards: standardsPair("ko", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.ko.features, items: [
          "3.0 m 측정 거리와 ø1.2 m ~ ø2.0 m Quiet Zone을 위한 비용 효율적인 고성능 솔루션",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증 (ETSI 확장 가능)",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "경량 강구조와 최적화된 RF 차폐",
          "독창적인 돔형 지붕 설계",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "수명이 긴 Frankosorb® 하이브리드 흡수체로 얻는 뛰어난 성능",
          "자동차·군수 규격 시험에도 사용 가능",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600") },
        { title: G.ko.performance, items: sacPerformanceKo() },
      ],
    },

    "sac-5-plus": {
      lead: [
        "SAC-5 Plus는 3.0 m와 5.0 m 측정 거리에서 최대 ø3.0 m의 Quiet Zone을 제공하는 Frankonia의 정식 인증 EMC 시험 솔루션입니다.",
        "돔형 지붕과 맞춤 제작, 그리고 성능이 맞물려 효율적이고 경제적인 해법을 이룹니다.",
      ],
      close:
        "SAC-3 Plus의 성공에 이어, 5.0 m 시험 거리의 SAC-5 Plus는 같은 돔 설계 개념 위에 서 있습니다.",
      figure: {
        src: "/chambers/models/sac-5-plus-1.webp", w: 1600, h: 1067,
        alt: "돔 설계 반무향실 내부 정면. 정면 벽과 천장이 흰 피라미드 흡수체로 덮여 있고 천장 중앙에 검은 페라이트 아치가 지납니다. 좌우 바닥에 흰 바닥 흡수체를 실은 트롤리가 한 대씩 서 있고, 바닥 중앙에 턴테이블 원과 붉은 레이저 선이 보입니다.",
        caption: "바닥 흡수체는 벽 쪽 트롤리에서 대기합니다 — 같은 방을 내성 시험에 쓸 때 깔기 위한 것입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m · 5.0 m" },
        { label: "Quiet Zone", value: "ø2.0 m 또는 ø3.0 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-5 Plus", "12,680 × 7,730 × 6,300 mm", "ø2.0 m\n3.0 m · 5.0 m 측정 거리 (H = 2.5 m)"],
            ["SAC-5 Plus L", "12,680 × 8,180 × 6,300 mm", "ø3.0 m\n3.0 m · 5.0 m 측정 거리 (H = 2.5 m)"],
          ],
        },
      ],
      standards: standardsPair("ko", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.ko.features, items: [
          "3.0 m·5.0 m 측정 거리와 ø2.0 m ~ ø3.0 m Quiet Zone을 위한 효율적인 고성능 솔루션",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증 (ETSI 확장 가능)",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "경량 강구조와 최적화된 RF 차폐",
          "독창적인 돔형 지붕 설계",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "수명이 긴 Frankosorb® 흡수체로 얻는 뛰어난 성능",
          "자동차·군수 규격 시험에도 사용 가능",
          "턴키 솔루션",
          "이중 시험 축 옵션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600") },
        { title: G.ko.performance, items: sacPerformanceKo() },
      ],
    },

    "sac-3-square": {
      lead: [
        "SAC-3 Square는 3.0 m 측정 거리를 위한 Frankonia의 범용 정식 인증 EMC 시험 솔루션입니다.",
        "정방형 설계의 SAC-3와 SAC-5는 사용성·맞춤성·성능을 아우르는 구조로, 효율적이고 경제적인 해법을 제시합니다.",
      ],
      figure: {
        src: "/chambers/models/sac-3-square-1.webp", w: 1600, h: 1067,
        alt: "정방형 반무향실 내부. 벽과 천장이 흰 피라미드 흡수체로 덮여 있고, 바닥 앞쪽에 바닥 흡수체가 한 줄로 깔려 있습니다. 왼쪽 벽 앞에 흰 구조물이 서 있고 바닥 접지면에는 노란 안전 표시가 있습니다.",
        caption: "전통적인 정방형 셸. 지붕이 평평한 만큼 대형 턴테이블이나 이동식 다이나모미터를 넣을 여유가 생깁니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "최대 ø3.0 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-3 Square", "9,680 × 6,530 × 6,000 mm", "ø2.0 m\n3.0 m 측정 거리 (H = 2.5 m)"],
            ["SAC-3 Square L", "10,880 × 6,980 × 6,000 mm", "ø3.0 m\n3.0 m 측정 거리 (H = 2.5 m)"],
          ],
        },
      ],
      standards: standardsPair("ko", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.ko.features, items: [
          "전통적인 정방형 설계",
          "3.0 m 또는 5.0 m 측정 거리를 위한 고성능 솔루션",
          "ø2.0 m ~ ø4.0 m Quiet Zone",
          "대형 턴테이블 또는 이동식 다이나모미터 통합",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증 (ETSI 확장 가능)",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "내성 시험용 바닥 흡수체를 챔버 내부 트롤리에 보관",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "수명이 긴 Frankosorb® 흡수체로 얻는 뛰어난 성능",
          "자동차·군수 규격 시험에도 사용 가능",
          "턴키 솔루션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: sacPerformanceKo() },
      ],
    },

    "sac-5-square": {
      lead: [
        "SAC-5 Square는 3.0 m와 5.0 m 측정 거리를 함께 제공하는 정식 인증 EMC 시험 솔루션입니다. Quiet Zone은 ø2.0 m · ø3.0 m · ø4.0 m 세 가지입니다.",
        "정방형 설계의 SAC-3와 SAC-5는 사용성·맞춤성·성능을 아우르는 구조로, 효율적이고 경제적인 해법을 제시합니다.",
      ],
      figure: {
        src: "/chambers/models/sac-5-square-1.webp", w: 1600, h: 1067,
        alt: "정방형 반무향실 내부. 벽과 천장이 흰 피라미드 흡수체로 덮여 있고, 오른쪽에 흰 안테나 마스트가 바닥에서 천장까지 서 있습니다. 바닥 접지면에 노란 표시와 파란 케이블이 놓여 있습니다.",
        caption: "5.0 m 측정 거리의 안테나 마스트. 같은 방이 3.0 m 거리로도 쓰입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m · 5.0 m" },
        { label: "Quiet Zone", value: "최대 ø4.0 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "10,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-5 Square", "12,680 × 7,730 × 6,000 mm", "ø2.0 m\n3.0 m · 5.0 m 측정 거리 (H = 2.5 m)"],
            ["SAC-5 Square L", "12,680 × 8,180 × 6,000 mm", "ø3.0 m\n3.0 m · 5.0 m 측정 거리 (H = 2.5 m)"],
            ["SAC-5 Square XL", "13,280 × 9,380 × 6,300 mm", "ø4.0 m (5.0 m 측정 거리) · ø3.0 m (3.0 m 측정 거리)\n두 경우 모두 H = 2.5 m · 대형 턴테이블 또는 이동식 다이나모미터 수용"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461"],
      ),
      groups: [
        { title: G.ko.features, items: [
          "전통적인 정방형 설계",
          "3.0 m 또는 5.0 m 측정 거리를 위한 고성능 솔루션",
          "ø2.0 m ~ ø4.0 m Quiet Zone",
          "대형 턴테이블 또는 이동식 다이나모미터 통합",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증 (ETSI 확장 가능)",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "내성 시험용 바닥 흡수체를 챔버 내부 트롤리에 보관",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "수명이 긴 Frankosorb® 흡수체로 얻는 뛰어난 성능",
          "자동차·군수 규격 시험에도 사용 가능",
          "턴키 솔루션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: sacPerformanceKo() },
      ],
    },

    "sac-10-plus": {
      lead: [
        "SAC-10 Plus는 10.0 m 측정 거리에서 ø3.0 m Quiet Zone을 제공하는 단일 시험 축 챔버입니다. 독창적인 다각형 형상과 최적화된 Frankosorb® 흡수체 배치가 공간과 비용을 함께 아낍니다.",
        "CISPR 16-1-4와 ANSI C63.4의 시험장 요건을 만족하는 챔버 가운데 Frankonia가 만드는 가장 콤팩트한 10 m 챔버입니다.",
      ],
      figure: {
        src: "/chambers/models/sac-10-plus-1.webp", w: 1600, h: 1067,
        alt: "10 m 반무향실 내부. 벽과 천장이 흰 피라미드 흡수체로 덮여 있고, 중앙에 붉은 함체가 달린 흰 안테나 마스트가 서 있습니다. 바닥은 회색 접지면입니다.",
        caption: "시험 축은 하나입니다. 축을 더 두지 않는 대신 셸이 작아집니다 — Triton과 갈라지는 지점입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 · 5.0 · 10.0 m" },
        { label: "Quiet Zone", value: "ø3.0 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝. 턴테이블 ø3.0 m 또는 ø4.0 m.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-10 Plus", "19,205 × 12,080 × 8,325 mm", "ø3.0 m\n10.0 m 측정 거리 (H = 3.0 m) · 단일 시험 축"],
          ],
        },
      ],
      standards: standardsPair("ko", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.ko.features, items: [
          "10.0 m · 5.0 m · 3.0 m 시험 거리, Quiet Zone ø3.0 m",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "다각형 형상의 공간 절약형 콤팩트 설계",
          "재현성과 안정적인 성능",
          "수명이 긴 불연 Frankosorb® 흡수체 라이닝",
          "비용을 아끼면서 오래 쓰는 투자",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: sacPerformanceKo() },
      ],
    },

    "sac-10-plus-triton": {
      lead: [
        "SAC-10 Plus Triton은 10.0 m 축 1개와 3.0 m 축 2개를 하나의 셸에 담은 다축 EMC 시험 솔루션입니다. Quiet Zone은 ø3.0 m입니다.",
        "독창적인 다각형 형상과 최적화된 Frankosorb® 흡수체 배치가 공간과 비용을 아끼면서 여러 시험 축을 성립시킵니다.",
      ],
      close:
        "SAC-10 Plus Triton은 현존하는 가장 콤팩트하고 가벼운 10 m 챔버입니다. CISPR 16-1-4 · ANSI C63.4 기준 방출 시험과 IEC/EN 61000-4-3 · CISPR 25 · MIL-STD 461 기준 내성 시험 모두 정식 인증 수준으로 수행합니다.",
      figure: {
        src: "/chambers/models/triton-2.webp", w: 1600, h: 1067,
        alt: "다각형 셸의 10 m 반무향실 내부. 벽이 각을 이루며 꺾이고 전면이 피라미드 흡수체로 덮여 있습니다. 앞쪽 바닥에 흰 바닥 흡수체가 여러 장 세워져 있고, 바닥 중앙에는 대형 턴테이블 원과 노란 안전 표시가 있습니다.",
        caption: "바닥 흡수체는 정해진 대기 위치에 세워 둡니다. 축을 바꿀 때 안테나와 흡수체를 다시 설치하지 않는 것이 이 챔버가 아끼는 시간입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 · 5.0 · 10.0 m" },
        { label: "Quiet Zone", value: "ø3.0 m" },
        { label: "시험 축", value: "3개" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝. 턴테이블 ø3.0 m 또는 ø4.0 m.",
          head: ["구성", "외형 치수 (L × W × H)", "시험 축"],
          rows: [
            ["SAC-10 Plus Triton", "19,205 × 12,080 × 8,325 mm", "Quiet Zone ø3.0 m (H = 3.0 m)\n축 1 — 10.0 m (EMI · EMS)\n축 2 — 3.0 m (EMI · EMS)\n축 3 — 3.0 m (EMS)"],
            ["SAC-10 Plus", "19,205 × 12,080 × 8,325 mm", "Quiet Zone ø3.0 m (H = 3.0 m)\n10.0 m 측정 거리, 단일 축"],
          ],
        },
      ],
      standards: standardsPair("ko", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.ko.features, items: [
          "Quiet Zone ø3.0 m의 다축 챔버",
          "10.0 m 축 1개와 3.0 m 축 2개를 한 솔루션에",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증",
          "CISPR 25 · MIL-STD 461 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "다각형 형상의 공간 절약형 콤팩트 설계",
          "바닥 흡수체와 안테나를 챔버 안에 연결한 채로 유지",
          "재현성과 안정적인 성능",
          "시험 준비 시간을 줄이는 작업 흐름",
          "수명이 긴 불연 Frankosorb® 흡수체 라이닝",
          "비용을 아끼면서 오래 쓰는 투자",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: sacPerformanceKo() },
      ],
    },

    "sac-10-h-hybrid": {
      lead: [
        "SAC-10/H는 10.0 m 측정 거리에서 ø3.0 m부터 ø6.0 m까지의 Quiet Zone을 하이브리드 흡수체 배치로 구현하는 맞춤형 정식 인증 챔버입니다.",
        "고객 요구에 맞춘 제작 폭이 넓어 크기와 구성을 조정할 수 있습니다. Frankosorb® 하이브리드 배치가 방출 측정과 내성 시험 양쪽에서 뛰어난 성능을 냅니다.",
      ],
      figure: {
        src: "/chambers/models/sac-10-h-hybrid-1.webp", w: 1600, h: 1067,
        alt: "10 m 반무향실 내부. 벽 하단은 격자 무늬의 페라이트 타일이고 그 위와 천장은 흰 피라미드 흡수체입니다. 바닥은 회색 접지면이고 노란 표시가 시험 구역을 둘러쌉니다.",
        caption: "하이브리드 라이닝은 이 두 층을 뜻합니다 — 아래는 페라이트, 위는 흡수체. 층이 나뉘는 만큼 셸이 작아집니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "최대 10.0 m" },
        { label: "Quiet Zone", value: "ø3.0 – ø6.0 m" },
        { label: "라이닝", value: "하이브리드" },
        { label: "하중", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 · H1300 Turbine 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-10-3/H", "18,380 × 12,830 × 8,550 mm", "ø3.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10-4/H", "19,280 × 13,280 × 8,550 mm", "ø4.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10-5/H", "21,080 × 15,080 × 8,700 mm", "ø5.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10-6/H", "21,680 × 15,680 × 8,700 mm", "ø6.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101 · RS102 · RS103"],
      ),
      groups: [
        { title: G.ko.features, items: [
          "수명이 길고 불연인 Frankosorb® 하이브리드 흡수체의 최적 라이닝 (Frankonia 기술)",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "군수·자동차 규격 정식 인증",
          "단일 또는 이중 시험 축 옵션 — 어떤 EMC 시험에도 맞추는 맞춤 제작",
          "피시험체 요건에 따라 챔버 크기·특성·구성을 폭넓게 조정",
          "범위를 벗어나는 EMC 시험 환경에 특화",
          "턴키 솔루션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600 · H1300 Turbine") },
        { title: G.ko.performance, items: sacPerformanceKo("26") },
      ],
    },

    "sac-10-p-pyramid": {
      lead: [
        "SAC-10/P는 10.0 m 측정 거리에서 ø3.0 m부터 ø6.0 m까지의 Quiet Zone을 Frankonia 고유의 롱피라미드 흡수체 배치로 구현하는 맞춤형 정식 인증 챔버입니다.",
        "고객 요구에 맞춘 제작 폭이 넓어 크기와 구성을 조정할 수 있습니다.",
      ],
      close:
        "롱피라미드 흡수체 기술은 방출과 내성 시험 모두에서 뛰어난 성능을 내며, 전 주파수 범위에 걸쳐 가장 높은 균일도와 임피던스 정확도를 제공합니다.",
      figure: {
        src: "/chambers/models/sac-10-p-pyramid-2.webp", w: 1024, h: 500,
        alt: "10 m 반무향실 내부 광각. 벽과 천장 전체가 긴 피라미드 흡수체로 덮여 있고 페라이트 타일 구간이 없습니다. 바닥 접지면에 턴테이블 원호가 보입니다.",
        caption: "페라이트가 없습니다. P2400 롱피라미드 하나로 26 MHz부터 40 GHz까지 덮는 것이 이 구성의 논지입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "최대 10.0 m" },
        { label: "Quiet Zone", value: "ø3.0 – ø6.0 m" },
        { label: "라이닝", value: "P2400 롱피라미드" },
        { label: "하중", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. 3/P와 4/P의 치수가 같은 것은 카탈로그 표기 그대로이며, Quiet Zone만 다릅니다.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-10-3/P", "21,680 × 13,730 × 8,550 mm", "ø3.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10-4/P", "21,680 × 13,730 × 8,550 mm", "ø4.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10-5/P", "23,480 × 16,580 × 9,000 mm", "ø5.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10-6/P", "24,980 × 17,180 × 9,000 mm", "ø6.0 m\n10.0 m 측정 거리 (H = 3.0 m)"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101 · RS102 · RS103"],
      ),
      groups: [
        { title: G.ko.features, items: [
          "수명이 길고 불연인 Frankosorb® 롱피라미드 흡수체 전면 라이닝 (Frankonia 기술)",
          "하이브리드 라이닝의 비용 효율적인 대안 — 성능 제약 없음",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "군수·자동차 규격 정식 인증",
          "단일 또는 이중 시험 축 옵션 — 어떤 EMC 시험에도 맞추는 맞춤 제작",
          "피시험체 요건에 따라 챔버 크기·특성·구성을 폭넓게 조정",
          "범위를 벗어나는 EMC 시험 환경에 특화",
          "피라미드 아래 공간에 바닥 흡수체 보관",
          "턴키 솔루션",
        ] },
        { title: G.ko.absorbers, items: [
          "P2400 Frankosorb® 롱피라미드 흡수체 라이닝",
          "장기 안정성이 검증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연 등급",
          "EN 13501-1 class B 난연 등급(대체 사양)",
        ] },
        { title: G.ko.performance, items: sacPerformanceKo("26") },
      ],
    },

    "fac-3": {
      lead: [
        "FAC-3는 3.0 m 측정 거리에서 테이블탑 피시험체를 시험하는 Frankonia의 콤팩트한 완전무향실입니다. Quiet Zone은 ø1.5 m (H = 1.5 m)입니다.",
        "접지면이 없는 시험장으로서 CISPR 16-1-4를 근거로 자유공간 조건의 측정을 위해 설계되었습니다. 바닥 반사가 없으므로 높이 스캔이 필요하지 않습니다.",
      ],
      figure: {
        src: "/chambers/models/fac-3-2.webp", w: 1600, h: 1067,
        alt: "완전무향실 내부. 벽·천장뿐 아니라 바닥까지 흰 피라미드 흡수체로 덮여 있고, 정면 벽은 검은 페라이트 면입니다. 그 앞 삼각대 위에 붉은 혼 안테나가 놓여 있고, 앞쪽에는 격자 무늬의 흰 시험 테이블이 있습니다.",
        caption: "바닥에도 흡수체가 깔립니다. 반사면이 없다는 것이 반무향실과 갈라지는 지점이고, 높이 스캔이 사라지는 이유입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "ø1.5 m (H = 1.5 m)" },
        { label: "턴테이블", value: "ø1.5 m" },
        { label: "하중", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["FAC-3", "8,705 × 4,655 × 3,750 mm", "ø1.5 m\n3.0 m 측정 거리 (H = 1.5 m) · 테이블탑 제품"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 14 등", "ETSI"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4", "IEC/EN 61000-4-22"], i: ["IEC/EN 61000-4-3", "IEC/EN 61000-4-22"] },
      ),
      groups: [
        { title: G.ko.features, items: [
          "테이블탑 피시험체를 위한 시험장",
          "CISPR 16-1-4 · IEC/EN 61000-4-22 · ETSI 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "자유공간 측정을 위한 비용 효율적인 해법",
          "진화한 Frankosorb® 흡수체 라이닝의 콤팩트한 챔버 설계",
          "이중 시험 축 옵션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600") },
        { title: G.ko.performance, items: [
          "CISPR 16-1-4 기준 방출(EMI) 정식 인증",
          "FS NSA 편차 ±3.5 dB (30 MHz ~ 1 GHz)",
          "SVSWR 편차 +5.5 dB (1 GHz ~ 18 GHz)",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "FU 편차 0/+6 dB, 16개 측정점의 75 % (30/80 MHz ~ 18 GHz)",
          "IEC/EN 61000-4-22 기준 내성·방출 정식 인증 — SdB c ≤ 1.8 dB",
        ] },
      ],
    },

    "fac-3-l": {
      lead: [
        "FAC-3 L은 3.0 m 측정 거리의 완전무향실 확장형으로, 테이블탑뿐 아니라 거치형 피시험체까지 수용합니다. Quiet Zone은 ø1.5 m (H = 2.0 m)입니다.",
        "접지면이 없는 시험장으로서 CISPR 16-1-4를 근거로 자유공간 조건의 측정을 위해 설계되었으며, FAM 또는 FBM 안테나 마스트를 이용한 높이 스캔이 가능합니다.",
      ],
      figure: {
        src: "/chambers/models/fac-3-l-2.webp", w: 1600, h: 1067,
        alt: "완전무향실 내부. 벽·천장·바닥이 모두 흰 피라미드 흡수체로 덮여 있고, 중앙에 붉은 부품이 달린 흰 안테나 마스트가 서 있습니다. 앞쪽 바닥에는 회색 격자 구조물이 놓여 있습니다.",
        caption: "마스트가 있는 완전무향실. 바닥 반사가 없어도 높이 스캔을 할 수 있다는 것이 L 구성이 더한 것입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "ø1.5 m (H = 2.0 m)" },
        { label: "턴테이블", value: "ø1.5 m" },
        { label: "하중", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["FAC-3 L", "9,380 × 5,780 × 6,000 mm", "ø1.5 m\n3.0 m 측정 거리 (H = 2.0 m) · 거치형과 테이블탑 제품, 높이 스캔"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 14", "CISPR 15", "CISPR 32", "ETSI"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4", "IEC/EN 61000-4-22"], i: ["IEC/EN 61000-4-3", "IEC/EN 61000-4-22"] },
      ),
      groups: [
        { title: G.ko.features, items: [
          "테이블탑과 거치형 피시험체를 위한 시험장 (높이 스캔 포함)",
          "CISPR 16-1-4 · IEC/EN 61000-4-22 · ETSI 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "자유공간 측정을 위한 비용 효율적인 해법",
          "진화한 Frankosorb® 흡수체 라이닝의 콤팩트한 챔버 설계",
          "이중 시험 축 옵션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600") },
        { title: G.ko.performance, items: [
          "CISPR 16-1-4 기준 방출(EMI) 정식 인증",
          "FS NSA 편차 ±3.5 dB (30 MHz ~ 1 GHz)",
          "SVSWR 편차 +5.5 dB (1 GHz ~ 18 GHz)",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "FU 편차 0/+6 dB, 16개 측정점의 75 % (30/80 MHz ~ 18 GHz)",
          "IEC/EN 61000-4-22 기준 내성·방출 정식 인증 — SdB c ≤ 1.8 dB",
        ] },
      ],
    },

    "sac-3-fac-3-transformer": {
      lead: [
        "SAC-3/FAC-3 Transformer는 3.0 m 측정 거리에서 반무향과 완전무향 조건을 모두 제공하는 정식 인증 EMC 솔루션입니다.",
        "접지면이 있는 조건과, 최적화된 바닥 흡수체 개조 키트를 쓴 테이블탑 피시험체용 FAR 조건 양쪽에 대응합니다. 전통적인 정방형 설계로 방출과 내성 모두 정식 인증 수준입니다.",
      ],
      figure: {
        src: "/chambers/models/sac-3-fac-3-transformer-1.webp", w: 1600, h: 1067,
        alt: "챔버 내부 정면. 정면 벽 전체가 사각 페라이트 타일 격자이고, 좌우 벽과 천장은 흰 피라미드 흡수체입니다. 바닥은 반사 접지면입니다.",
        caption: "지금은 접지면이 드러난 반무향 구성입니다. 바닥에 흡수체를 깔면 같은 방이 완전무향 시험장이 됩니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "ø2.0 m / ø1.5 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone"],
          rows: [
            ["SAC-3 / FAC-3 Transformer", "9,680 × 6,530 × 6,000 mm", "SAC 구성 — ø2.0 m, 3.0 m 측정 거리 (H = 2.5 m)\nFAC 구성 — ø1.5 m, 3.0 m 측정 거리 (H = 1.5 m)"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        sacProductEmission,
        sacProductImmunity,
        { e: ["CISPR 16-1-4", "및/또는 ANSI C63.4", "IEC/EN 61000-4-22"], i: ["IEC/EN 61000-4-3", "IEC/EN 61000-4-22"] },
      ),
      groups: [
        { title: G.ko.features, items: [
          "3.0 m 시험 거리를 위한 비용 효율적인 고성능 솔루션",
          "SAC 구성 — 거치형 제품을 위한 ø2.0 m Quiet Zone",
          "FAC 구성 — 테이블탑 제품을 위한 ø1.5 m Quiet Zone",
          "CISPR 16-1-4 · ANSI C63.4 · IEC/EN 61000-4-22 · ETSI 기준 방출 정식 인증",
          "CISPR 25 · MIL-STD 461 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "진화한 흡수체 라이닝의 콤팩트한 챔버 설계",
          "수명이 긴 Frankosorb® 흡수체로 얻는 뛰어난 성능",
          "자동차·군수 규격 시험에도 사용 가능",
          "턴키 솔루션",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600") },
        { title: "성능과 인증 — SAC(반무향) 구성", items: sacPerformanceKo() },
        { title: "성능과 인증 — FAC(완전무향) 구성", items: [
          "CISPR 16-1-4 기준 방출(EMI) 정식 인증",
          "FS NSA 편차 ±3.5 dB (30 MHz ~ 1 GHz)",
          "SVSWR 편차 +5.5 dB (1 GHz ~ 18 GHz)",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "FU 편차 0/+6 dB, 16개 측정점의 75 % (30/80 MHz ~ 18 GHz)",
        ] },
      ],
    },

    chc: {
      lead: [
        "CHC는 3.0 m 측정 거리에서 ø1.2 m Quiet Zone을 제공하는 컴팩트 하이브리드 챔버입니다. 사전 인증 방출 시험과 정식 인증 내성 시험을 한 방에서 수행하기에 알맞습니다.",
        "확장형 CHC L에는 흡수체를 붙인 칸막이벽이 들어갑니다. RF 전력 증폭기와 안테나, 바닥 흡수체를 챔버 안에 두고 쓸 수 있습니다.",
      ],
      figure: {
        src: "/chambers/models/chc-2.webp", w: 1600, h: 1067,
        alt: "컴팩트 하이브리드 챔버 내부. 좌우 벽과 천장의 피라미드 흡수체가 원근으로 모이고, 정면 검은 페라이트 벽 앞에 노란 지주에 달린 붉은 혼 안테나가 서 있습니다. 앞쪽 바닥에는 바닥 흡수체가 놓여 있습니다.",
        caption: "3.0 m 거리를 이 크기 안에 넣은 챔버입니다. 방출은 사전 인증, 내성은 정식 인증 — 그 조합이 크기를 결정합니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "사전 인증" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "ø1.2 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 특징"],
          rows: [
            ["CHC", "7,355 × 3,755 × 3,300 mm", "ø1.2 m\n3.0 m 측정 거리"],
            ["CHC L", "8,255 × 3,755 × 3,300 mm", "ø1.2 m\n3.0 m 측정 거리 · 증폭기 등을 챔버 안에 보관"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["30 MHz ~ 1 GHz 사전 인증"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4"], i: ["IEC/EN 61000-4-3"] },
      ),
      groups: [
        { title: G.ko.features, items: [
          "CISPR 16-1-4 기준 30 MHz ~ 1 GHz 사전 인증 방출",
          "IEC/EN 61000-4-3 기준 내성 정식 인증 — 비용을 아끼는 구성",
          "흡수체를 붙인 칸막이벽 옵션(CHC L)으로 증폭기·안테나·바닥 흡수체를 챔버 안에 보관",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: [
          "CISPR 16-1-4 기준 방출(EMI) 사전 인증",
          "NSA 편차 ±4.0 dB (30 MHz ~ 1 GHz), 높이 스캔 제한",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "FU 편차 0/+6 dB, 16개 측정점의 75 % (30/80 MHz ~ 18 GHz)",
        ] },
      ],
    },

    "chc-plus": {
      lead: [
        "CHC Plus는 컴팩트 하이브리드 챔버의 확장 구성으로, 1 GHz부터 18 GHz까지의 방출 측정을 정식 인증 수준으로 수행합니다.",
        "3.0 m 측정 거리와 ø1.2 m Quiet Zone은 CHC와 같습니다. 달라지는 것은 1 GHz 위쪽의 방출 측정입니다.",
      ],
      figure: {
        src: "/chambers/models/chc-plus-2.webp", w: 1600, h: 1067,
        alt: "컴팩트 챔버 내부. 바닥에 매립된 은색 턴테이블의 덮개가 열려 케이블 커넥터 패널이 드러나 있고, 둘레에 노란 검정 안전 표시가 있습니다. 벽면은 피라미드 흡수체입니다.",
        caption: "바닥 아래로 배선이 지나갑니다. 챔버가 작을수록 배선을 어디로 빼는지가 설계의 문제가 됩니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "1 GHz 이상 정식 인증" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m" },
        { label: "Quiet Zone", value: "ø1.2 m" },
        { label: "턴테이블", value: "ø1.2 m / ø2.0 m" },
        { label: "하중", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 특징"],
          rows: [
            ["CHC Plus", "7,355 × 3,755 × 3,300 mm", "ø1.2 m\n3.0 m 측정 거리 · 1 GHz 이상 정식 인증 방출"],
            ["CHC Plus L", "7,580 × 4,655 × 4,350 mm", "ø1.2 m\n3.0 m 측정 거리 · 턴테이블 ø2.0 m, 1 GHz 이상 정식 인증 방출"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["30 MHz ~ 1 GHz 사전 인증", "1 GHz ~ 18 GHz 정식 인증"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4"], i: ["IEC/EN 61000-4-3"] },
      ),
      groups: [
        { title: G.ko.features, items: [
          "CISPR 16-1-4 기준 30 MHz ~ 1 GHz 사전 인증 방출",
          "1 GHz ~ 18/40 GHz 정식 인증 방출",
          "IEC/EN 61000-4-3 기준 내성 정식 인증 — 비용을 아끼는 구성",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: [
          "CISPR 16-1-4 기준 방출(EMI) 사전 인증",
          "NSA 편차 ±4.0 dB (30 MHz ~ 1 GHz), 높이 스캔 제한",
          "CISPR 16-1-4 기준 방출(EMI) 인증",
          "SVSWR 편차 +6.0 dB (1 GHz ~ 18 GHz)",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "FU 편차 0/+6 dB, 16개 측정점의 75 % (30/80 MHz ~ 18 GHz)",
        ] },
      ],
    },

    ctc: {
      lead: [
        "CTC는 산업용 제품의 내성 시험에 집중하는 정식 인증 부품 시험 챔버입니다. 여기에 자동차 부품의 방출·내성 시험과 군수 시험이 함께 붙습니다.",
        "1.0 m 시험 거리에서 CISPR 25 · ISO 11452 · MIL-STD 461 · DO-160을, 3.0 m 측정 거리에서 IEC/EN 61000-4-3을 정식 인증 수준으로 수행합니다.",
      ],
      figure: {
        src: "/chambers/models/ctc-1.webp", w: 1600, h: 1200,
        alt: "부품 시험 챔버 내부. 정면 벽이 사각 격자의 흡수체 면이고 좌우와 천장은 피라미드 흡수체입니다. 중앙에 목재 시험대가 놓여 있고, 바닥에는 노란 배치 표시선이 그어져 있습니다.",
        caption: "목재 시험대와 바닥의 배치선. CISPR 25가 요구하는 것은 챔버만이 아니라 이 배치입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 25" },
        { label: "내성 (EMS)", value: "ISO 11452" },
        { label: "측정 거리", value: "1.0 m · 3.0 m" },
        { label: "군수 규격", value: "MIL-STD 461 · DO-160" },
        { label: "주파수 범위", value: "9 kHz – 18 GHz" },
        { label: "하중", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 또는 H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "시험 조건"],
          rows: [
            ["CTC", "8,480 × 5,485 × 3,750 mm", "IEC 61000-4-3 기준 내성 정식 인증\nCISPR 25 · ISO 11452 · MIL-STD 461 · DO-160 정식 인증\n테이블 배치와 거치형 배치"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 25", "MIL-STD 461 / DO-160"],
        ["ISO 11452", "MIL-STD 461 / DO-160", "IEC/EN 61000-4-3"],
        { e: ["CISPR 25", "MIL-STD 461 / DO-160"], i: ["IEC/EN 61000-4-3"] },
      ),
      groups: [
        { title: G.ko.features, items: [
          "IEC/EN 61000-4-3 기준 내성 정식 인증 — 비용을 아끼는 구성",
          "CISPR 25 · ISO 11452 정식 인증",
          "MIL-STD 461 · DO-160 정식 인증",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: [
          "IEC 61000-4-3 기준 내성(EMS) 정식 인증",
          "CISPR 25 · ISO 11452 기준 자동차 부품 시험 정식 인증",
          "MIL-STD 461 · DO-160 기준 군수·항공 시험 정식 인증",
        ] },
      ],
    },

    actc: {
      lead: [
        "ACTC는 1.0 m 측정 거리의 자동차 부품 시험 챔버입니다. CISPR 25와 ISO 11452에 따른 자동차 부품 시험을 정식 인증 수준으로 수행합니다.",
        "흡수체 사이에 상시 접속용 플러그인 컨택트 스트립을 설치해 시험 테이블과 차폐체의 전기적 연결을 확보하고, CISPR 25가 요구하는 시험 테이블을 포함합니다.",
      ],
      figure: {
        src: "/chambers/models/actc-1.webp", w: 1600, h: 1068,
        alt: "자동차 부품 시험 챔버 내부. 벽과 천장이 피라미드 흡수체로 덮여 있고, 중앙에 목재 시험대와 금속 접지판이 놓여 있습니다. 왼쪽에는 붉은 계측 함체와 삼각대가 서 있습니다.",
        caption: "부품 시험은 챔버보다 배치가 규격입니다. 시험 테이블과 접지 연결이 CISPR 25가 정하는 대상입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 25" },
        { label: "내성 (EMS)", value: "ISO 11452" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "배치", value: "테이블 시험" },
        { label: "주파수 범위", value: "26 MHz – 18 GHz" },
        { label: "하중", value: "10,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 150 kHz / 26 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "시험 조건"],
          rows: [
            ["ACTC", "6,380 × 5,480 × 3,750 mm", "CISPR 25 부품 시험\n1.0 m 측정 거리"],
            ["ACTC L", "11,480 × 6,580 × 4,500 mm", "CISPR 25 부품 시험과 차량 시험\n1.0 m 측정 거리"],
          ],
        },
      ],
      standards: [
        {
          title: S.ko.verification,
          columns: [
            { head: S.ko.emission, items: ["CISPR 25"] },
            { head: S.ko.immunity, items: ["ISO 11452"] },
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "ACTC — 부품에 대해 CISPR 25 · ISO 11452 정식 인증",
          "ACTC L — 부품과 차량 시험이 가능한 크기, CISPR 25 · ISO 11452 정식 인증",
          "자동차 부품 시험을 위한 콤팩트한 챔버 솔루션",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "수명이 긴 Frankosorb® 하이브리드 흡수체의 진화한 최적 라이닝",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450") },
        { title: "성능과 인증 — ACTC", items: [
          "CISPR 25 기준 방출(EMI) 정식 인증",
          "ISO 11452 기준 내성(EMS) 정식 인증",
          "IEC/EN 61000-4-3 기준 내성(EMS) 인증",
          "1.0 m 측정 거리에서 균일 전계 0.5 × 0.5 m",
          "FU 편차 0/+6 dB, 100 % (26/80 MHz ~ 18 GHz)",
        ] },
        { title: "성능과 인증 — ACTC L", items: [
          "CISPR 25 기준 방출(EMI) 정식 인증",
          "ISO 11452 기준 내성(EMS) 정식 인증",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "3.0 m 측정 거리에서 균일 전계 1.5 × 1.5 m",
          "FU 편차 0/+6 dB, 16개 측정점의 75 % (26/80 MHz ~ 18 GHz)",
        ] },
      ],
    },

    ucc: {
      lead: [
        "UCC는 1.0 m 측정 거리의 초소형 하이브리드 솔루션입니다. 사전 인증 방사 방출·내성 시험, 전도 시험, 그리고 CISPR 25 방식의 자동차 부품 사전 인증 시험을 위해 설계되었습니다.",
        "사전 인증 시험에서 GTEM 셀을 대신할 수 있고, 전 분야의 연구·학술 목적에도 쓰입니다.",
      ],
      figure: {
        src: "/chambers/models/ucc-2.webp", w: 1600, h: 1200,
        alt: "초소형 하이브리드 챔버 내부. 흰 지지 프레임 위에 구리색 접지판을 올린 시험 테이블이 놓여 있고, 벽면은 가까이에서 피라미드 흡수체가 보입니다. 바닥에는 매립 패널이 있습니다.",
        caption: "구리 접지판과 그 위의 배치. GTEM 셀을 대신한다는 말은 이 배치를 그대로 쓸 수 있다는 뜻입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 25 사전 인증" },
        { label: "내성 (EMS)", value: "ISO 11452 사전 인증" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "배치", value: "테이블 시험" },
        { label: "주파수 범위", value: "26 MHz – 18 GHz" },
        { label: "대체 대상", value: "GTEM 셀" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 150 kHz / 26 MHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H450 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "시험 조건"],
          rows: [
            ["UCC", "4,580 × 3,080 × 2,550 mm", "사전 인증 부품 시험\n1.0 m 측정 거리"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "CISPR 25 · ISO 11452 기준 부품 사전 인증 (GTEM 셀의 대안)",
          "자동차 부품 시험을 위한 콤팩트한 챔버 솔루션",
          "E-Drive 확장 가능 (부하기, BlueBox, 배터리 시험 시스템)",
          "수명이 긴 Frankosorb® 하이브리드 흡수체의 진화한 최적 라이닝",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450") },
        { title: G.ko.performance, items: [
          "CISPR 25 기준 방출(EMI) 사전 인증",
          "ISO 11452 기준 내성(EMS) 사전 인증",
        ] },
      ],
    },

    avtc: {
      lead: [
        "AVTC는 3.0 m 또는 5.0 m 측정 거리에서 상용 제품 시험용 Quiet Zone ø4.0 m를 제공하면서 자동차 부품과 차량 시험에 초점을 맞춘 무향실입니다.",
        "CISPR 12에 따른 차량 방사 방출, CISPR 25에 따른 부품 방출, CISPR 16-1-4 · ANSI C63.4에 따른 상용 제품 시험에 대응하며, IEC/EN 61000-4-3 · ISO 11451 · ISO 11452 방사 내성에도 대응합니다.",
      ],
      figure: {
        src: "/chambers/models/avtc-4.webp", w: 1600, h: 1067,
        alt: "차량 시험 챔버 내부. 벽과 천장이 피라미드 흡수체로 덮여 있고, 바닥 접지면에는 대형 턴테이블의 원과 매립 그레이팅이 보입니다. 챔버 안은 비어 있습니다.",
        caption: "바닥에 남은 원이 턴테이블입니다. 차량을 올리는 지름이 곧 이 챔버의 크기를 정합니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "3.0 m · 5.0 m" },
        { label: "Quiet Zone", value: "최대 ø4.0 m" },
        { label: "ECE R10", value: "다이나모미터 3.0 m" },
        { label: "하중", value: "30,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz는 옵션입니다. Ferrite · H1000 · H600 조합의 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 턴테이블"],
          rows: [
            ["AVTC", "11,480 × 9,380 × 6,000 mm", "ø3.0 m, 3.0 m 측정 거리 (H = 2.5 m)\n턴테이블 최대 ø5.0 m"],
            ["AVTC L", "14,780 × 11,480 × 6,300 mm", "ø3.0 m, 3.0 m·5.0 m 측정 거리 (H = 2.5 m)\n턴테이블 최대 ø6.0 m"],
            ["AVTC XL", "16,280 × 12,680 × 6,300 mm", "ø4.0 m, 3.0 m·5.0 m 측정 거리 (H = 2.5 m)\n다이나모미터 내장 ø7.0 m"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461", "ECE R10.5"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101 · RS102 · RS103", "ECE R10.5"],
      ),
      groups: [
        { title: G.ko.features, items: [
          "진화한 Frankosorb® 하이브리드 흡수체 라이닝",
          "자동차 부품·차량 시험과 상용 시험을 한 솔루션에",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "CISPR 25 · CISPR 12 · ISO 11452 · ISO 11451 정식 인증",
          "3.0 m 시험 거리까지 내장형 또는 이동식 다이나모미터로 ECE R10 대응",
          "3.0 m 또는 5.0 m 시험 거리를 위한 비용 효율적인 고성능 솔루션",
          "시험 배치를 빠르게 바꾸는 바닥 흡수체 보드",
          "EDTC 구성품으로 확장 가능 (부하기, BlueBox 등)",
          "어떤 EMC 시험에도 맞추는 맞춤 제작",
          "상용·군수 규격 시험에도 사용 가능",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H1000 · H600") },
        { title: G.ko.performance, items: [
          ...sacPerformanceKo("26"),
          "CISPR 25 · CISPR 12 기준 방출(EMI) 정식 인증",
          "ISO 11452 · ISO 11451 기준 내성(EMS) 정식 인증",
          "다이나모미터를 갖춘 3.0 m 시험 거리에서 ECE R10 대응",
        ] },
      ],
    },

    "sac-10-v": {
      lead: [
        "SAC-10V는 10.0 m 측정 거리에서 여러 크기의 Quiet Zone을 제공하며, 다이나모미터를 내장한 차량 전체 시험에 전용으로 쓰이는 맞춤형 정식 인증 챔버입니다.",
        "고객 요구에 맞춘 제작 폭이 넓어 크기와 구성을 조정할 수 있습니다. 하이브리드 라이닝과 롱피라미드 라이닝 두 계열이 있고, 두 방식은 같은 성능을 냅니다.",
      ],
      figure: {
        src: "/chambers/models/sac-10-v-5.webp", w: 1600, h: 1067,
        alt: "대형 차량 시험 챔버 내부. 바닥 턴테이블 위에 검은 세단 한 대가 서 있고 배기 호스가 연결되어 있습니다. 천장 가까이 대형 안테나 붐 구조물이 지나가고, 벽과 천장은 피라미드 흡수체입니다.",
        caption: "차량 한 대가 턴테이블 위에 올라간 상태. 배기 호스와 다이나모미터가 함께 들어가는 것이 ECE R10 시험의 조건입니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "CISPR 16-1-4" },
        { label: "내성 (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "측정 거리", value: "최대 10.0 m" },
        { label: "Quiet Zone", value: "ø6.0 m" },
        { label: "ECE R10.5", value: "10.0 m 정식 인증" },
        { label: "하중", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "하이브리드 흡수체 구성",
          note: "주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz는 옵션입니다. 최적화된 Frankosorb® 하이브리드 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 시험 구역"],
          rows: [
            ["SAC-10VC-6/H", "23,030 × 14,480 × 6,300 mm", "ø6.0 m, 5.0 m 측정 거리 (H = 2.5 m)\n차량 시험용 10.0 m 측정 거리 대응 준비"],
            ["SAC-10V-6/H", "22,580 × 15,680 × 8,700 mm", "ø6.0 m, 10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10V-6/H (SL12)", "24,380 × 16,580 × 9,000 mm", "ø6.0 m, 10.0 m 측정 거리 (H = 3.0 m)\n최대 12 m 길이 차량의 중하중 시험 구역"],
            ["SAC-10V-6/H (SL18)", "26,780 × 18,080 × 9,000 mm", "ø6.0 m, 10.0 m 측정 거리 (H = 3.0 m)\n최대 18 m 길이 차량의 중하중 시험 구역"],
          ],
        },
        {
          title: "롱피라미드 흡수체 구성",
          note: "주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz는 옵션입니다. P2400 Frankosorb® 롱피라미드 전면 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "Quiet Zone과 시험 구역"],
          rows: [
            ["SAC-10V-6/P", "26,480 × 20,180 × 9,000 mm", "ø6.0 m, 10.0 m 측정 거리 (H = 3.0 m)"],
            ["SAC-10V-6/P (SL12)", "26,480 × 20,180 × 10,500 mm", "ø6.0 m, 10.0 m 측정 거리 (H = 3.0 m)\n최대 12 m 길이 차량의 중하중 시험 구역"],
            ["SAC-10V-6/P (SL18)", "30,080 × 20,180 × 10,500 mm", "ø6.0 m, 10.0 m 측정 거리 (H = 3.0 m)\n최대 18 m 길이 차량의 중하중 시험 구역"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461", "ECE R10.5"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101 · RS102 · RS103", "ECE R10.5"],
      ),
      groups: [
        { title: G.ko.features, items: [
          "SAC-10V-6/H — 최적화된 진화형 Frankosorb® 하이브리드 흡수체 라이닝",
          "SAC-10V-6/P — P2400 Frankosorb® 롱피라미드 전면 라이닝",
          "CISPR 16-1-4 · ANSI C63.4 기준 방출 정식 인증",
          "IEC/EN 61000-4-3 기준 내성 정식 인증",
          "CISPR 25 · CISPR 12 · CISPR 36 · ISO 11452 · ISO 11451 정식 인증",
          "10.0 m 시험 거리에서 내장형 다이나모미터로 ECE R10 대응",
          "차량 크기와 중량, 어떤 시험에도 맞추는 맞춤 제작",
          "범위를 벗어나는 EMC 시험 환경에 특화",
          "상용·군수 규격 시험에도 사용 가능",
        ] },
        { title: G.ko.absorbers, items: [
          "장기 안정성이 검증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연 등급",
          "EN 13501-1 class B 난연 등급(대체 사양)",
        ] },
        { title: G.ko.performance, items: [
          "CISPR 16-1-4 · ANSI C63.4 기준 방출(EMI) 정식 인증",
          "CISPR 25 · CISPR 12 기준 방출(EMI) 정식 인증",
          "IEC/EN 61000-4-3 기준 내성(EMS) 정식 인증",
          "ISO 11452 · ISO 11451 기준 내성(EMS) 정식 인증",
          "다이나모미터를 갖춘 10.0 m 시험 거리에서 ECE R10 대응",
        ] },
      ],
    },

    "edtc-sa": {
      lead: [
        "E-Drive 시험 솔루션은 하이브리드·전기·연료전지·배터리 구동계의 부품과 설비를 위한 Frankonia의 전용 시험장입니다. CISPR 25와 ISO 11452에 따른 방사 시험에 뛰어난 조건을 제공합니다.",
        "EDTC-SA는 고정축 외부 부하기 한 대를 전제로 제작하는 챔버 구성입니다. 제동·구동·회전 방향·속도 조절·토크 제어와 그 조합을 포함한 동적 시험에 쓰입니다.",
      ],
      figure: {
        src: "/chambers/models/edtc-3.webp", w: 1600, h: 1067,
        alt: "구동계 시험 챔버 내부. 중앙의 흰 받침대 위에 전동기가 설치되어 있고 굵은 케이블 두 가닥이 연결되어 있습니다. 왼쪽 벽은 페라이트 타일, 오른쪽은 피라미드 흡수체입니다.",
        caption: "시험 대상은 모터 자체입니다. 부하기는 챔버 밖에 두고 축만 차폐를 통과해 들어옵니다.",
      },
      overview: [
        { label: "적용 규격", value: "CISPR 25 · ISO 11452" },
        { label: "부하기", value: "외부 · 고정축" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "배치", value: "벽면 앞 테이블" },
        { label: "주파수 범위", value: "150 kHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz는 옵션입니다. 최적화된 Frankosorb® 하이브리드 흡수체 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "부하기"],
          rows: [
            ["EDTC-SA", "7,880 × 5,480 × 3,750 mm", "고정축 외부 부하기 1대\n예) 1 × 250 kW, 3,000 RPM, 3,000 Nm"],
          ],
        },
        {
          title: "외부 부하기",
          note: "챔버가 아니라 챔버에 들어가는 장비입니다. 부하기는 고객이 선호하는 공급사의 것을 그대로 쓸 수 있습니다.",
          head: ["", "EDTC-250", "EDTC-500"],
          rows: [
            ["출력", "1 × 250 kW", "2 × 250 kW"],
            ["회전 속도", "3,000 RPM", "3,000 RPM"],
            ["토크", "3,000 Nm", "3,000 Nm"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "CISPR 25 · ISO 11452 정식 인증",
          "최적화된 Frankosorb® 하이브리드 흡수체 라이닝",
          "부품 단위 또는 시스템 단위 시험",
          "배터리 시험과의 조합",
          "기존 챔버를 위한 통합 키트",
          "피시험체용 전원과 수냉 시스템 옵션",
          "CISPR 25에 맞춘 모터 어댑터·접지·결선",
          "진동이 전달되지 않는 독립 기초(플로팅 슬래브)",
          "시험 준비에 대한 컨설팅과 확장 서비스",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: [
          "CISPR 25 기준 방사 방출 시험",
          "ISO 11452 기준 방사 내성 시험",
        ] },
      ],
    },

    "edtc-ax": {
      lead: [
        "EDTC-AX는 구동계 유닛의 e-액슬 시험을 위해 정의된 챔버 구성으로, 고정축 외부 부하기 두 대를 전제로 제작합니다.",
        "특허받은 이 구성은 전기 구동계의 동적 구동 시험에 쓰이며, 고객이 선호하는 다이나모미터 공급사와 맞물립니다. Frankonia는 챔버 안의 올바른 EMC 배치에 집중해 시험 테이블과 접지 구상, 90° 앵글 기어박스를 제공합니다.",
      ],
      figure: {
        src: "/chambers/models/edtc-ax-0.webp", w: 1600, h: 1067,
        alt: "구동계 시험 챔버 내부. 앞쪽에 구리색 접지 테이블이 있고, 중앙의 흰 프레임 위에 초록색 전동기와 검은 커플링이 설치되어 있습니다. 왼쪽 벽에는 축이 통과하는 은색 함체가 있습니다.",
        caption: "왼쪽 벽의 함체가 차폐된 샤프트 관통부입니다. 부하기를 밖에 두고도 챔버가 차폐를 유지하는 지점입니다.",
      },
      overview: [
        { label: "적용 규격", value: "CISPR 25 · ISO 11452" },
        { label: "부하기", value: "외부 2대 · 고정축" },
        { label: "출력 범위", value: "예) 2 × 250 kW" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "주파수 범위", value: "150 kHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 150 kHz ~ 18 GHz, 40 GHz는 옵션입니다. 최적화된 Frankosorb® 하이브리드 흡수체 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "부하기"],
          rows: [
            ["EDTC-AX", "9,080 × 6,080 × 3,750 mm", "고정축 외부 부하기 2대\n예) 2 × 250 kW, 3,000 RPM, 3,000 Nm"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "e-액슬 배치를 위한 특허 구성",
          "CISPR 25 · ISO 11452 정식 인증",
          "최적화된 Frankosorb® 하이브리드 흡수체 라이닝",
          "차폐된 샤프트, 피시험체 위치 결정, 접지, 시험 테이블 제공",
          "90° 앵글 기어박스 — 어떤 다이나모미터에도 대응",
          "CISPR 25에 맞춘 모터 어댑터·접지·결선",
          "진동이 전달되지 않는 독립 기초(플로팅 슬래브)",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: [
          "CISPR 25 기준 방사 방출 시험",
          "ISO 11452 기준 방사 내성 시험",
        ] },
      ],
    },

    "edtc-bb": {
      lead: [
        "EDTC-BB는 이동식 부하기 EMC-BlueBox를 포함하는 챔버 구성으로, 차폐된 공간 안에서 전기 구동계의 동적 EMC 시험을 수행합니다.",
        "BlueBox는 4상한 운전을 하므로 피시험체가 받는 어떤 부하 상황도 재현할 수 있습니다. 고정축 외부 부하기와 마찬가지로 제동·구동·회전 방향·속도 조절·토크 제어와 그 조합을 포함합니다.",
      ],
      figure: {
        src: "/chambers/models/edtc-bb-0.webp", w: 1600, h: 1067,
        alt: "구동계 시험 챔버 내부. 긴 흰 시험대 위에 축으로 연결된 초록색 전동기가 놓여 있고, 오른쪽 끝에 청색 장비가 함께 설치되어 있습니다. 바닥에는 노란 안전 표시가 있습니다.",
        caption: "부하기가 챔버 안으로 들어옵니다. 차폐를 뚫는 축이 없다는 것이 BlueBox 구성이 바꾸는 조건입니다.",
      },
      overview: [
        { label: "적용 규격", value: "CISPR 25 · ISO 11452" },
        { label: "부하기", value: "이동식 · 전기 구동" },
        { label: "최대 출력", value: "120 kW" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "주파수 범위", value: "30 MHz – 18 GHz" },
        { label: "하중", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "주파수 범위 9 kHz / 30 MHz ~ 18 GHz, 40 GHz는 옵션입니다. 최적화된 Frankosorb® 하이브리드 흡수체 라이닝.",
          head: ["구성", "외형 치수 (L × W × H)", "부하기"],
          rows: [
            ["EDTC-BB", "7,880 × 6,380 × 3,750 mm", "이동식 부하기 EMC-BlueBox, 최대 120 kW"],
            ["EDTC-BB (턴테이블 포함)", "10,880 × 6,980 × 3,900 mm", "이동식 부하기 EMC-BlueBox, 최대 120 kW\n360° 스캔용 턴테이블"],
          ],
        },
        {
          title: "EMC-BlueBox 이동식 부하기",
          note: "챔버가 아니라 챔버에 들어가는 장비입니다. 중량·적재·외형은 본사 제품 페이지 기준입니다.",
          head: ["", "BlueBox-30", "BlueBox-40", "BlueBox-65", "BlueBox-120"],
          rows: [
            ["출력", "30 kW", "40 kW", "63 kW", "120 kW"],
            ["최대 회전 속도", "11,000 RPM", "9,000 RPM", "6,500 RPM", "6,000 RPM"],
            ["토크", "82 Nm", "140 Nm", "240 Nm", "470 Nm"],
            ["중량", "1,100 kg", "1,200 kg", "1,700 kg", "2,500 kg"],
            ["적재", "800 kg", "800 kg", "1,000 kg", "1,400 kg"],
            ["외형", "2.0 × 1.3 × 1.3 m", "2.2 × 1.3 × 1.3 m", "2.5 × 1.4 × 1.3 m", "2.8 × 1.6 × 1.3 m"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "4상한 운전 — 어떤 부하 상황도 재현",
          "CISPR 25 · ISO 11452 정식 인증",
          "최적화된 Frankosorb® 하이브리드 흡수체 라이닝",
          "이동식이라 어떤 피시험체에도 맞춰 배치",
          "턴테이블 위에 올리면 360° 시험 범위",
          "배터리 시험과의 조합",
          "기존 챔버를 위한 통합 키트",
          "EMC 엔지니어라면 누구나 쓸 수 있는 조작",
        ] },
        { title: G.ko.absorbers, items: absorbersKo("Ferrite · H450 또는 H600") },
        { title: G.ko.performance, items: [
          "CISPR 25 기준 방사 방출 시험",
          "ISO 11452 기준 방사 내성 시험",
        ] },
      ],
    },

    "mil-chc": {
      lead: [
        "MIL CHC는 MIL-STD 461과 DO-160에 따른 부품 시험을 위한 컴팩트 하이브리드 챔버입니다. Frankosorb® 하이브리드 흡수체 배치로 라이닝합니다.",
        "1.0 m 측정 거리에서 경량 피시험체의 방사 방출·내성 시험을 정식 인증 수준으로 수행합니다. DO-160을 만족하려면 흡수체 라이닝 때문에 챔버가 조금 더 길어집니다.",
      ],
      figure: {
        src: "/chambers/models/mil-chc-2.webp", w: 1600, h: 1067,
        alt: "군용 컴팩트 하이브리드 챔버 내부. 벽과 천장이 피라미드 흡수체로 덮여 있고, 삼각대 위 붉은 안테나를 한 사람이 조정하고 있습니다. 오른쪽에 시험대가 놓여 있고 왼쪽 벽 상단에 aselsan 로고가 붙어 있습니다.",
        caption: "1.0 m 측정 거리는 사람이 안테나에 손이 닿는 거리입니다. 군용 부품 시험이 이 크기에서 이루어집니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "MIL-STD 461 · DO-160" },
        { label: "내성 (EMS)", value: "MIL-STD 461 · DO-160" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "배치", value: "테이블 시험" },
        { label: "주파수 범위", value: "30 MHz – 40 GHz" },
        { label: "라이닝", value: "하이브리드" },
      ],
      tables: [
        {
          title: "구성",
          note: "Frankosorb® 하이브리드 흡수체 라이닝. DO-160 구성은 흡수체 라이닝 때문에 길이가 늘어납니다.",
          head: ["구성", "외형 치수 (L × W × H)", "주파수 범위와 라이닝"],
          rows: [
            ["MIL CHC", "4,880 × 4,880 × 3,000 mm", "9 kHz / 30 MHz ~ 40 GHz\n하이브리드 흡수체 라이닝"],
            ["MIL CHC / DO-160", "5,330 × 4,880 × 3,000 mm", "9 kHz / 30 MHz ~ 40 GHz\n하이브리드 흡수체 라이닝"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "MIL-STD 461 · DO-160 기준 부품 시험 정식 인증",
          "군용 용도의 콤팩트한 챔버 설계",
          "수명이 긴 Frankosorb® 흡수체의 진화한 라이닝",
        ] },
        { title: G.ko.absorbers, items: [
          "Frankosorb® 숏피라미드 · 롱피라미드 또는 하이브리드 흡수체 라이닝",
          "장기 안정성이 검증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연 등급",
          "EN 13501-1 class B 난연 등급(대체 사양)",
        ] },
        { title: G.ko.performance, items: [
          "MIL-STD 461 · DO-160 기준 방출(EMI)과 내성(EMS) 정식 인증, 30 MHz / 80 MHz ~ 40 GHz",
          "수직 입사 흡수율 — 80 MHz ~ 250 MHz 6 dB (규격 요구 수준)",
          "수직 입사 흡수율 — 250 MHz 이상 10 dB (규격 요구 수준)",
        ] },
      ],
    },

    "mil-std-chamber": {
      lead: [
        "MIL-STD Chamber는 MIL-STD 461에 따라 1.0 m 측정 거리에서 대형 피시험체와 차량의 방사 방출·내성 시험을 수행하는 대형 챔버입니다.",
        "대형·고중량 피시험체의 군용 시험을 위해 고객 요구에 맞춰 전면 맞춤 제작합니다.",
      ],
      figure: {
        src: "/chambers/models/mil-std-chamber-0.webp", w: 1250, h: 875,
        alt: "군용 대형 챔버의 절개 렌더. 붉은 철골 구조가 셸을 감싸고 내부 벽면은 흰 흡수체로 덮여 있으며, 중앙 바닥에 전차 한 대가 놓여 있습니다. 왼쪽에 진입 램프가 있습니다.",
        caption: "치수를 정해 두지 않은 이유가 이 그림에 있습니다. 무엇이 들어오느냐가 챔버의 크기를 정합니다.",
      },
      overview: [
        { label: "방출 (EMI)", value: "MIL-STD 461 · DO-160" },
        { label: "내성 (EMS)", value: "MIL-STD 461 · DO-160" },
        { label: "측정 거리", value: "1.0 m" },
        { label: "시험 대상", value: "차량 · 대형 피시험체" },
        { label: "주파수 범위", value: "80 MHz – 40 GHz" },
        { label: "하중", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "치수는 피시험체의 종류와 크기에 따라 정합니다. 특수 턴테이블과 설비 통합이 가능합니다.",
          head: ["구성", "외형 치수 (L × W × H)", "주파수 범위와 라이닝"],
          rows: [
            ["MIL-STD Chamber", "맞춤 제작", "9 kHz / 80 MHz ~ 40 GHz\n숏피라미드 흡수체 · 군용 규격 대응"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "MIL-STD 461 · DO-160 정식 인증",
          "흡수체 대역 80 MHz ~ 40 GHz",
          "대형·고중량 피시험체를 위한 고성능 솔루션",
          "고객 요구에 맞춘 전면 맞춤 제작",
        ] },
        { title: G.ko.absorbers, items: [
          "Frankosorb® 숏피라미드 흡수체 라이닝",
          "장기 안정성이 검증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연 등급",
          "EN 13501-1 class B 난연 등급(대체 사양)",
        ] },
        { title: G.ko.performance, items: [
          "MIL-STD 461 · DO-160 기준 방출(EMI)과 내성(EMS) 정식 인증, 30 MHz / 80 MHz ~ 40 GHz",
          "수직 입사 흡수율 — 80 MHz ~ 250 MHz 6 dB (규격 요구 수준)",
          "수직 입사 흡수율 — 250 MHz 이상 10 dB (규격 요구 수준)",
        ] },
      ],
    },

    "mil-std-chamber-advanced": {
      lead: [
        "MIL-STD Chamber Advanced는 MIL-STD 461에 따른 대형 피시험체 시험을 수행하면서, 상용 또는 자동차 시험장 요건까지 함께 만족하는 군용 챔버입니다.",
        "Frankonia 고유의 Frankosorb® 롱피라미드 또는 하이브리드 흡수체 기술이 MIL-STD 461 요구와 CISPR 16-1-4 · ANSI C63.4의 상용 요구, 그리고 차량·자동차 부품 시험을 한 챔버에서 성립시킵니다.",
      ],
      figure: {
        src: "/chambers/models/mil-std-chamber-advanced-3.webp", w: 1478, h: 1108,
        alt: "대형 무향실 내부에 2층 관광버스 한 대가 서 있습니다. 벽과 천장은 피라미드 흡수체로 덮여 있고, 오른쪽에 대형 로그페리오딕 안테나가 세워져 있으며 바닥에는 노란 표시선이 그어져 있습니다.",
        caption: "군용 규격으로 지은 챔버에 관광버스가 들어와 있습니다. 상용 시험장 요건을 함께 만족한다는 말의 뜻이 이것입니다.",
      },
      overview: [
        { label: "군용 규격", value: "MIL-STD 461 · DO-160" },
        { label: "상용 규격", value: "CISPR 16-1-4" },
        { label: "측정 거리", value: "1.0 m · 최대 10.0 m" },
        { label: "Quiet Zone", value: "예) ø6.0 m" },
        { label: "주파수 범위", value: "26 MHz – 40 GHz" },
        { label: "하중", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "구성",
          note: "치수는 피시험체의 종류와 크기에 따라 정합니다. MIL-STD 461은 1.0 m, 상용 용도는 최대 10.0 m 측정 거리입니다.",
          head: ["구성", "외형 치수 (L × W × H)", "주파수 범위와 라이닝"],
          rows: [
            ["MIL-STD Advanced Pyramid", "맞춤 제작", "9 kHz / 26 MHz ~ 40 GHz\n롱피라미드 흡수체 · 군용·산업·자동차 대응"],
            ["MIL-STD Advanced Hybrid", "맞춤 제작", "9 kHz / 30 MHz ~ 40 GHz\n하이브리드 흡수체 라이닝 · 군용·산업·자동차 대응"],
          ],
        },
      ],
      standards: standardsPair(
        "ko",
        ["MIL-STD 461", "DO-160", "CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32"],
        ["MIL-STD 461 RS101 · RS102 · RS103", "DO-160", "IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "ECE R10"],
      ),
      groups: [
        { title: G.ko.features, items: [
          "MIL-STD 461 · DO-160 정식 인증",
          "상용·자동차 규격의 방출·내성 정식 인증",
          "흡수체 대역 30 MHz ~ 40 GHz",
          "대형·고중량 피시험체를 위한 진화형 고성능 솔루션",
          "고객 요구에 맞춘 전면 맞춤 제작",
        ] },
        { title: G.ko.absorbers, items: [
          "Frankosorb® 롱피라미드 또는 하이브리드 흡수체 라이닝",
          "장기 안정성이 검증된 고성능 나노 박막 기술",
          "EN 13501-1 class A2 - s1 d0 불연 등급",
          "EN 13501-1 class B 난연 등급(대체 사양)",
        ] },
        { title: "성능과 인증 — 군용", items: [
          "MIL-STD 461 · DO-160 기준 방출(EMI)과 내성(EMS) 정식 인증, 30 MHz / 80 MHz ~ 40 GHz",
          "수직 입사 흡수율 — 80 MHz ~ 250 MHz 6 dB (규격 요구 수준)",
          "수직 입사 흡수율 — 250 MHz 이상 10 dB (규격 요구 수준)",
        ] },
        { title: "성능과 인증 — 상용", items: sacPerformanceKo("26") },
      ],
    },

    rvc: {
      lead: [
        "RVC 잔향실은 Frankonia의 모듈형 구조 시스템을 바탕으로 설계됩니다. 사전 제작된 고품질 차폐 패널(>8 MS/m)이 유연성과 성능을 보장합니다.",
        "차폐 패널은 평면이 안쪽으로 오도록 뒤집어 설치할 수도, 안쪽에서 체결하는 일반 PAN 방식으로 설치할 수도 있습니다. 후자는 나중에 흡수체 라이닝 같은 개조를 열어 둡니다.",
      ],
      close:
        "Frankonia는 여러 스터러 설계와 개념을 제공하며, 고객이 가진 스터러 설계를 그대로 반영해 새 RVC에 구현하거나 기존 챔버를 개조하기도 합니다.",
      figure: {
        src: "/chambers/models/reverberation-solutions-0.webp", w: 1600, h: 1067,
        alt: "잔향실 내부. 벽과 천장이 금속 차폐 패널이고 흡수체가 없습니다. 천장의 대형 스터러가 회전 중이라 흐릿하게 찍혔고, 바닥 턴테이블 위에는 청색 승용차가 서 있습니다.",
        caption: "흡수체가 없는 것이 이 방의 원리입니다. 반사를 없애는 대신 스터러로 장을 휘저어 균일하게 만듭니다.",
      },
      overview: [
        { label: "적용 규격", value: "IEC/EN 61000-4-21" },
        { label: "자동차 규격", value: "ISO 11452-11 · 11451-5" },
        { label: "최저 사용 주파수", value: "80 – 200 MHz" },
        { label: "최대 작업 체적", value: "8.0 × 5.0 × 3.0 m" },
        { label: "주파수 범위", value: "10 kHz – 18 GHz" },
        { label: "모델", value: "7종" },
      ],
      tables: [
        {
          title: "Commercial & Industrial RVC",
          note: "주파수 범위 10 kHz ~ 18 GHz, 40 GHz는 옵션입니다. 작업 체적에서 벽까지의 거리는 400 mm(λ/4) 이상입니다.",
          head: ["모델", "외형 치수 (L × W × H)", "작업 체적 · LUF · 스터러 · 대상"],
          rows: [
            ["RVC e1", "7,580 × 5,630 × 4,200 mm", "3.3 × 3.5 × 2.6 m · LUF 200 MHz\nZ-폴드 스터러 1대(수직)\n소·중형 ISM 및 멀티미디어 제품"],
            ["RVC e2", "11,280 × 7,280 × 4,950 mm", "5.5 × 4.0 × 2.6 m · LUF 80 MHz\nZ-폴드 스터러 2대(수직·수평)\n대형 ISM 및 멀티미디어 제품"],
          ],
        },
        {
          title: "Automotive RVC",
          note: "주파수 범위 10 kHz ~ 18 GHz, 40 GHz는 옵션입니다. L · XL · XXL은 맞춤 치수입니다.",
          head: ["모델", "외형 치수 (L × W × H)", "작업 체적 · LUF · 스터러 · 대상"],
          rows: [
            ["RVC S", "5,330 × 3,380 × 3,300 mm", "2.5 × 1.0 × 1.5 m · LUF 200 MHz\nZ-폴드 스터러 1대(수직)\n군수·자동차 부품"],
            ["RVC M", "7,580 × 5,630 × 4,200 mm", "3.3 × 3.5 × 2.6 m · LUF 200 MHz\nZ-폴드 스터러 1대(수직)\n대형 군수·자동차 부품"],
            ["RVC L", "13,880 × 11,480 × 6,300 mm (맞춤)", "8.0 × 5.0 × 3.0 m · LUF 80 MHz\nZ-폴드 스터러 2대(수직·수평)\n차량"],
            ["RVC XL", "15,530 × 11,480 × 6,600 mm (맞춤)", "8.0 × 5.0 × 3.0 m · LUF 80 MHz\n대형 디스크 스터러 ø9.0 m 1대, 디스크 스터러 ø4.0 m 2대\n차량"],
            ["RVC XXL", "17,480 × 13,580 × 6,600 mm (맞춤)", "8.0 × 5.0 × 3.0 m · LUF 80 MHz\n대형 디스크 스터러 ø12.0 m 1대, 디스크 스터러 ø4.0 m 2대\n대형 차량"],
          ],
        },
      ],
      groups: [
        { title: "특징과 인증", items: [
          "Frankosorb® 하이브리드 흡수체와 일반 PAN 차폐로 RVC를 개조하거나, 기존 EMC 챔버를 RVC로 전환",
          "소형 제품부터 차량까지 아우르는 비용 효율적인 고성능 솔루션",
          "IEC/EN 61000-4-21 · ISO 11452-11 기준 내성 인증",
          "ISO 11451-5 기준 내성·방출 인증 (고속 스터링)",
          "기계류 지침(2006/42/EC)에 따른 안전 통합",
        ] },
        { title: "Frankonia 스터러", items: [
          "일반 Z-폴드 스터러 — 예) ø1.8 m에서 최대 30 RPM",
          "성능형 Z-폴드 스터러 — 예) ø2.8 m에서 최대 60 RPM",
          "디스크형 스터러 — 예) ø4.0 m에서 최대 120 RPM",
          "튜브형 스터러 — 예) ø2.0 m에서 최대 240 RPM",
          "대형 디스크 스터러 — 예) ø12.0 m에서 최대 10 RPM",
        ] },
      ],
    },

    "shielded-room": {
      lead: [
        "Frankonia의 차폐룸과 무향실은 모듈형 구조 시스템을 바탕으로 설계됩니다. 사전 제작된 고품질 차폐 패널이 치수 선택의 폭을 보장하고, 모든 PAN 타입 모듈은 일반 건물 출입문으로 반입할 수 있습니다.",
        "표준 모듈은 도전성 메시 개스킷을 끼운 뒤 안쪽에서 75 mm 간격으로 볼트 체결합니다. 덕분에 모체 건물 벽에 바짝 붙여 설치할 수 있고, 짧은 체결 간격과 규정 토크로 조인 볼트가 오랜 시간 차폐 성능을 유지합니다.",
      ],
      figure: {
        src: "/chambers/models/shielded-room-7.webp", w: 1600, h: 1067,
        alt: "공장 홀에서 본 차폐실 정면. 회색 차폐 패널 벽체에 붉은 프레임의 대형 차폐문 두 짝이 나란히 달려 있고, 경고 라벨이 붙어 있습니다. 상부로 덕트와 케이블 트레이가 지납니다.",
        caption: "차폐는 벽만의 문제가 아닙니다. 문·통기구·필터가 벽과 같은 성능을 내야 이 수치가 성립합니다.",
      },
      overview: [
        { label: "크기", value: "제한 없음" },
        { label: "차폐 규격", value: "EN 50147-1 · IEEE-299" },
        { label: "최대 차폐량", value: "120 dB" },
        { label: "주파수 범위", value: "10 kHz – 40 GHz" },
        { label: "패널", value: "2.0 mm 아연도강판" },
        { label: "하중", value: "제한 없음" },
      ],
      tables: [
        {
          title: "보증 차폐 성능",
          note: "EN 50147-1 또는 IEEE-299(옵션) 기준입니다. 관통 부품·허니콤·문과 게이트·필터 모두 같은 성능을 냅니다.",
          head: ["주파수", "차폐량", "전자기장"],
          rows: [
            ["10 kHz", "90 dB", "자계"],
            ["100 kHz", "100 dB", "자계"],
            ["1 MHz", "110 dB", "자계"],
            ["100 MHz", "120 dB", "평면파"],
            ["400 MHz", "120 dB", "평면파"],
            ["1 GHz", "110 dB", "평면파"],
            ["18 GHz", "100 dB", "마이크로파"],
            ["40 GHz", "100 dB", "마이크로파"],
          ],
        },
      ],
      groups: [
        { title: G.ko.features, items: [
          "2.0 mm 두께 아연도강판의 PAN 타입 차폐 모듈",
          "모듈형 사전 제작 표준",
          "자립 구조 또는 내진 조건에 맞춘 강구조",
          "안쪽에서 체결하는 방식",
          "역방향 설치 가능 (평면이 안쪽)",
          "벽과 천장의 내부 마감 가능",
          "이중 바닥 시스템 또는 용접 바닥 시스템",
          "오래 유지되는 차폐 감쇠 특성",
          "접착 없음, 용접 없음",
          "손상 없이 해체 가능 — 개조와 유지보수가 쉽습니다",
          "전체 이전이나 이후의 개조가 언제든 가능합니다",
          "어떤 크기의 차폐도 구현 가능",
          "ISO 354 기준 흡음률 w = 0.65 (MH)의 음향 패널",
          "Frankosorb® 흡수체에 최적화된 구조",
          "턴키 솔루션",
        ] },
      ],
    },
  },

  en: {
    "sac-3-plus": {
      lead: [
        "The SAC-3 Plus is Frankonia's most versatile full compliant EMC testing solution at 3.0 m measuring distance with a Quiet Zone (QZ) up to ø2.0 m. It is adapted for full compliant emission and immunity testing.",
        "The innovatively shaped roof, called dome design, with its optimized Frankosorb® absorber layout leads to minimized reflections and offers outstanding performance for NSA, SVSWR and FU.",
      ],
      close:
        "Since its introduction, the SAC-3 Plus has been the undisputed most selected chamber in its class. Through the innovative concept, customization and the excellent performance, it represents an efficient and economical solution that fully satisfies our customers.",
      figure: {
        src: "/chambers/models/sac-3-plus-1.webp", w: 1600, h: 1067,
        alt: "Inside a dome-design semi-anechoic chamber. Pyramid absorbers cover both side walls, the dark ferrite ceiling arches over the room between two lights, and the grey reflecting floor carries yellow markings around the test area.",
        caption: "The dome is not a styling choice: the curved roof is what carries the absorber layout that keeps reflections out of the quiet zone.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "up to ø2.0 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-3 Plus S", "8,480 × 6,530 × 6,000 mm", "ø1.2 m\nat 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus M", "8,780 × 6,530 × 6,000 mm", "ø1.5 m\nat 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus L", "9,230 × 6,530 × 6,000 mm", "ø2.0 m\nat 3.0 m test distance (H = 2.0 m)"],
            ["SAC-3 Plus", "9,680 × 6,530 × 6,000 mm", "ø2.0 m\nat 3.0 m test distance (H = 2.0 m)"],
          ],
        },
      ],
      standards: standardsPair("en", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.en.features, items: [
          "Cost-effective high-performance solution for a 3.0 m measuring distance and QZ from ø1.2 m of up to ø2.0 m",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 (ETSI upgradeable)",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Adapted lightweight steel structure and optimized RF-shielding",
          "Innovative dome-shaped roof design",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Outstanding performance with long-lasting Frankosorb® hybrid absorbers",
          "Usable for automotive and military standard tests",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000 and H600") },
        { title: G.en.performance, items: sacPerformanceEn() },
      ],
    },

    "sac-5-plus": {
      lead: [
        "The SAC-5 Plus is Frankonia's full compliant EMC testing solution at 3.0 m and 5.0 m measuring distance with a Quiet Zone (QZ) up to ø3.0 m.",
        "It offers an innovative concept with its dome shaped roof, customization and performance, and therefore represents an efficient and economical solution that fully satisfies our customers.",
      ],
      close:
        "Following the success of the SAC-3 Plus, the SAC-5 Plus with its 5.0 m test distance is based on the same innovative dome-shape concept.",
      figure: {
        src: "/chambers/models/sac-5-plus-1.webp", w: 1600, h: 1067,
        alt: "A dome-design semi-anechoic chamber seen head on. The end wall and ceiling are fully lined with pyramid absorbers and a dark ferrite arch crosses the roof. A trolley of white floor absorbers stands at each side wall, and a turntable circle and a red laser line mark the floor.",
        caption: "The floor absorbers wait on trolleys at the wall — for when the same room is used for immunity.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m · 5.0 m" },
        { label: "Quiet zone", value: "ø2.0 m or ø3.0 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-5 Plus", "12,680 × 7,730 × 6,300 mm", "ø2.0 m\nat 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Plus L", "12,680 × 8,180 × 6,300 mm", "ø3.0 m\nat 3.0 m and 5.0 m test distance (H = 2.5 m)"],
          ],
        },
      ],
      standards: standardsPair("en", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.en.features, items: [
          "Efficient high-performance solution for a 3.0 m and 5.0 m measuring distance and QZ from ø2.0 m of up to ø3.0 m",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 (ETSI upgradeable)",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Adapted lightweight steel structure and optimized RF-shielding",
          "Innovative dome-shaped roof design",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Outstanding performance with long-lasting Frankosorb® absorbers",
          "Usable for automotive and military standard tests",
          "Turnkey solution",
          "Double test axis option",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000 and H600") },
        { title: G.en.performance, items: sacPerformanceEn() },
      ],
    },

    "sac-3-square": {
      lead: [
        "The SAC-3 Square is Frankonia's versatile full compliant EMC testing solution at 3.0 m measuring distance.",
        "The SAC-3 and the SAC-5 in square design offer an innovative concept with its usability, customization and performance, and therefore represent efficient and economical solutions.",
      ],
      figure: {
        src: "/chambers/models/sac-3-square-1.webp", w: 1600, h: 1067,
        alt: "Inside a square-design semi-anechoic chamber. Walls and ceiling are lined with pyramid absorbers, a row of floor absorbers stands across the near part of the floor, and a white structure stands against the left wall. Yellow markings run along the reflecting floor.",
        caption: "The traditional square shell. A flat roof is what leaves room for a large turntable or a mobile dynamometer.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "up to ø3.0 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-3 Square", "9,680 × 6,530 × 6,000 mm", "ø2.0 m\nat 3.0 m test distance (H = 2.5 m)"],
            ["SAC-3 Square L", "10,880 × 6,980 × 6,000 mm", "ø3.0 m\nat 3.0 m test distance (H = 2.5 m)"],
          ],
        },
      ],
      standards: standardsPair("en", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.en.features, items: [
          "Traditional square design",
          "High-performance solution for 3.0 m or 5.0 m measuring distance",
          "QZ from ø2.0 m up to ø4.0 m",
          "Large turntable or mobile dynamometer integration",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 (ETSI upgradeable)",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Immunity floor absorber storage in the chamber on trolley's",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Outstanding performance with long-lasting Frankosorb® absorbers",
          "Usable for automotive and military standard tests",
          "Turnkey solution",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: sacPerformanceEn() },
      ],
    },

    "sac-5-square": {
      lead: [
        "The SAC-5 Square offers a 3.0 m and a 5.0 m measuring distance, with a Quiet Zone (QZ) of ø2.0 m, ø3.0 m or ø4.0 m.",
        "The SAC-3 and the SAC-5 in square design offer an innovative concept with its usability, customization and performance, and therefore represent efficient and economical solutions.",
      ],
      figure: {
        src: "/chambers/models/sac-5-square-1.webp", w: 1600, h: 1067,
        alt: "Inside a square-design semi-anechoic chamber. Walls and ceiling are lined with pyramid absorbers and a white antenna mast stands floor to ceiling at the right. Yellow markings and a blue cable lie on the reflecting floor.",
        caption: "The antenna mast at the 5.0 m position. The same room is also used at 3.0 m.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m · 5.0 m" },
        { label: "Quiet zone", value: "up to ø4.0 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "10,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-5 Square", "12,680 × 7,730 × 6,000 mm", "ø2.0 m\nat 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square L", "12,680 × 8,180 × 6,000 mm", "ø3.0 m\nat 3.0 m and 5.0 m test distance (H = 2.5 m)"],
            ["SAC-5 Square XL", "13,280 × 9,380 × 6,300 mm", "ø4.0 m at 5.0 m · ø3.0 m at 3.0 m\nboth H = 2.5 m · ready for a larger turntable or mobile dynamometer"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461"],
      ),
      groups: [
        { title: G.en.features, items: [
          "Traditional square design",
          "High-performance solution for 3.0 m or 5.0 m measuring distance",
          "QZ from ø2.0 m up to ø4.0 m",
          "Large turntable or mobile dynamometer integration",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 (ETSI upgradeable)",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Immunity floor absorber storage in the chamber on trolley's",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Outstanding performance with long-lasting Frankosorb® absorbers",
          "Usable for automotive and military standard tests",
          "Turnkey solution",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: sacPerformanceEn() },
      ],
    },

    "sac-10-plus": {
      lead: [
        "The SAC-10 Plus is a single test axis chamber with a Quiet Zone (QZ) of ø3.0 m at 10.0 m measuring distance. The innovative polygonal shape along with its optimized Frankosorb® absorber layout is a space-saving, cost-saving and efficient solution.",
        "It is Frankonia's most compact 10 m chamber available to meet the CISPR 16-1-4 and ANSI C63.4 test site requirements.",
      ],
      figure: {
        src: "/chambers/models/sac-10-plus-1.webp", w: 1600, h: 1067,
        alt: "Inside a 10 m semi-anechoic chamber. Walls and ceiling are lined with pyramid absorbers and a white antenna mast with a red head unit stands in the middle of the grey reflecting floor.",
        caption: "One test axis. Not adding the others is what makes the shell smaller — this is where the Triton parts company.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 · 5.0 · 10.0 m" },
        { label: "Quiet zone", value: "ø3.0 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600. Turntable ø3.0 m or ø4.0 m.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-10 Plus", "19,205 × 12,080 × 8,325 mm", "ø3.0 m\nat 10.0 m test distance (H = 3.0 m) · single test axis"],
          ],
        },
      ],
      standards: standardsPair("en", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.en.features, items: [
          "10.0 m, 5.0 m and 3.0 m test distance with a Quiet Zone of ø3.0 m",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Space-saving and compact chamber design with polygonal shape",
          "Reproducibility and stable performance",
          "Ingenious lining with long-lasting Frankosorb® non-combustible absorbers",
          "Cost-saving and future-proof investment",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: sacPerformanceEn() },
      ],
    },

    "sac-10-plus-triton": {
      lead: [
        "The SAC-10 Plus Triton is Frankonia's full compliant state-of-the-art EMC testing solution with multiple test axes — 1× 10.0 m and 2× 3.0 m measuring distances with a Quiet Zone (QZ) of ø3.0 m.",
        "The innovative polygonal shape along with its optimized Frankosorb® absorber layout is a space-saving, cost-saving and efficient solution with multiple test axes.",
      ],
      close:
        "The SAC-10 Plus Triton is the most compact and lightweight 10 m chamber existing. It is full compliant for emission tests validated according to CISPR 16-1-4 and ANSI C63.4, as well as full compliant for immunity tests according to IEC/EN 61000-4-3, CISPR 25 and MIL-STD 461.",
      figure: {
        src: "/chambers/models/triton-2.webp", w: 1600, h: 1067,
        alt: "Inside a polygonal 10 m semi-anechoic chamber. The walls turn at angles and are lined with pyramid absorbers. Several panels of white floor absorbers stand upright at the near side, and a large turntable circle with yellow markings is set into the floor.",
        caption: "The floor absorbers stand in defined parking positions. Not re-rigging the antennas and absorbers between axes is the time this chamber saves.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 · 5.0 · 10.0 m" },
        { label: "Quiet zone", value: "ø3.0 m" },
        { label: "Test axes", value: "Three" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600. Turntable ø3.0 m or ø4.0 m.",
          head: ["Configuration", "External dimension (L × W × H)", "Test axes"],
          rows: [
            ["SAC-10 Plus Triton", "19,205 × 12,080 × 8,325 mm", "Quiet zone ø3.0 m (H = 3.0 m)\nAxis 1 — 10.0 m (EMI and EMS)\nAxis 2 — 3.0 m (EMI and EMS)\nAxis 3 — 3.0 m (EMS)"],
            ["SAC-10 Plus", "19,205 × 12,080 × 8,325 mm", "Quiet zone ø3.0 m (H = 3.0 m)\n10.0 m test distance, single axis"],
          ],
        },
      ],
      standards: standardsPair("en", sacProductEmission, sacProductImmunity),
      groups: [
        { title: G.en.features, items: [
          "Multiple test axes chamber with a Quiet Zone of ø3.0 m",
          "1× 10.0 m test distance and 2× 3.0 m test distance in one solution",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant acc. to CISPR 25 and MIL-STD 461",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Space-saving and compact chamber design with polygonal shape",
          "Floor absorbers and antennas remain connected in the chamber",
          "Reproducibility and stable performance",
          "Time-saving test setup with improved workflow and efficiency",
          "Ingenious lining with long-lasting Frankosorb® non-combustible absorbers",
          "Cost-saving and future-proof investment",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: sacPerformanceEn() },
      ],
    },

    "sac-10-h-hybrid": {
      lead: [
        "The SAC-10/H is Frankonia's full compliant and customizable EMC testing solution at 10.0 m measuring distance with a Quiet Zone (QZ) of ø3.0 m up to ø6.0 m and hybrid absorber layout.",
        "Due to the high grade of customization reflecting the demands of our customers, this semi anechoic chamber is adaptable in size and offers several configuration possibilities. The Frankosorb® hybrid absorber layout achieves exceptional performance for emission measurements and immunity testing.",
      ],
      figure: {
        src: "/chambers/models/sac-10-h-hybrid-1.webp", w: 1600, h: 1067,
        alt: "Inside a 10 m semi-anechoic chamber. The lower walls are a grid of ferrite tiles; above them and across the ceiling the lining is white pyramid absorber. Yellow markings run around the test area on the grey reflecting floor.",
        caption: "The hybrid lining is these two layers — ferrite below, absorber above. Splitting them is what keeps the shell small.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "up to 10.0 m" },
        { label: "Quiet zone", value: "ø3.0 – ø6.0 m" },
        { label: "Lining", value: "Hybrid" },
        { label: "Load capacity", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000, H600 and H1300 Turbine absorbers.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-10-3/H", "18,380 × 12,830 × 8,550 mm", "ø3.0 m\nat 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-4/H", "19,280 × 13,280 × 8,550 mm", "ø4.0 m\nat 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-5/H", "21,080 × 15,080 × 8,700 mm", "ø5.0 m\nat 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-6/H", "21,680 × 15,680 × 8,700 mm", "ø6.0 m\nat 10.0 m test distance (H = 3.0 m)"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101, RS102, RS103"],
      ),
      groups: [
        { title: G.en.features, items: [
          "Optimized lining with long-lasting and non-combustible Frankosorb® hybrid absorbers (Frankonia technology)",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Full compliant with military and automotive standards",
          "Highly customizable solution for any kind of EMC testing and limitless integration of individual applications; as single or double test axis option",
          "Notably adjustable anechoic chamber size, characteristics and configuration due to different EUT requirements",
          "Specialized for 'out-of-the-range' EMC test environments",
          "Turnkey solutions",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000, H600 and H1300 Turbine absorbers") },
        { title: G.en.performance, items: sacPerformanceEn("26") },
      ],
    },

    "sac-10-p-pyramid": {
      lead: [
        "The SAC-10/P is Frankonia's full compliant and customizable EMC testing solution at 10.0 m measuring distance with a Quiet Zone (QZ) of ø3.0 m up to ø6.0 m and the unique Frankonia long-pyramid absorber layout.",
        "Due to the high grade of customization reflecting the demands of our customers, this semi-anechoic chamber is adaptable in size and offers several configuration possibilities.",
      ],
      close:
        "The innovative long-pyramid absorber technology achieves exceptional performance for emissions and immunity testing and offers the highest homogeneity and impedance accuracy for the complete frequency range.",
      figure: {
        src: "/chambers/models/sac-10-p-pyramid-2.webp", w: 1024, h: 500,
        alt: "A wide view inside a 10 m semi-anechoic chamber. Walls and ceiling are lined entirely with long pyramid absorbers, with no ferrite tile section. The arc of a turntable is visible in the reflecting floor.",
        caption: "No ferrite. That one P2400 long pyramid covers 26 MHz to 40 GHz on its own is the whole argument for this lining.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "up to 10.0 m" },
        { label: "Quiet zone", value: "ø3.0 – ø6.0 m" },
        { label: "Lining", value: "P2400 long pyramid" },
        { label: "Load capacity", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. The 3/P and the 4/P carry the same dimensions in the catalogue and differ only in quiet zone; the figures are printed as found.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-10-3/P", "21,680 × 13,730 × 8,550 mm", "ø3.0 m\nat 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-4/P", "21,680 × 13,730 × 8,550 mm", "ø4.0 m\nat 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-5/P", "23,480 × 16,580 × 9,000 mm", "ø5.0 m\nat 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10-6/P", "24,980 × 17,180 × 9,000 mm", "ø6.0 m\nat 10.0 m test distance (H = 3.0 m)"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101, RS102, RS103"],
      ),
      groups: [
        { title: G.en.features, items: [
          "Full lining with long-lasting and non-combustible Frankosorb® long-pyramid absorbers (Frankonia technology)",
          "Cost-efficient alternative to hybrid absorber lining without any limitations",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Full compliant with military and automotive standards",
          "Highly customizable solution for any kind of EMC testing and limitless integration of individual applications; as single or double test axis option",
          "Notably adjustable anechoic chamber size, characteristics and configuration due to different EUT requirements",
          "Specialized for 'out-of-the-range' EMC test environments",
          "Floor absorbers storage below the pyramids",
          "Turnkey solutions",
        ] },
        { title: G.en.absorbers, items: [
          "Frankosorb® long-pyramid absorber lining with P2400",
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible acc. to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable acc. to EN 13501-1 class B (alternative)",
        ] },
        { title: G.en.performance, items: sacPerformanceEn("26") },
      ],
    },

    "fac-3": {
      lead: [
        "The FAC-3 is Frankonia's compact fully anechoic chamber at 3.0 m measuring distance for EMC tests on table-top positioned EUT's with a Quiet Zone (QZ) of ø1.5 m (H = 1.5 m).",
        "It is designed for measurements under free-space conditions based on CISPR 16-1-4 as a test site without ground plane. Without the reflections from the floor, a height scan is no longer necessary.",
      ],
      figure: {
        src: "/chambers/models/fac-3-2.webp", w: 1600, h: 1067,
        alt: "Inside a fully anechoic chamber. Pyramid absorbers cover the walls, the ceiling and the floor; the end wall is dark ferrite. A red horn antenna stands on a tripod in front of it, with a white gridded test table in the foreground.",
        caption: "The floor is lined too. Having no reflecting surface is what separates this from a semi-anechoic chamber — and why the height scan disappears.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "ø1.5 m (H = 1.5 m)" },
        { label: "Turntable", value: "ø1.5 m" },
        { label: "Load capacity", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["FAC-3", "8,705 × 4,655 × 3,750 mm", "ø1.5 m\nat 3.0 m test distance (H = 1.5 m) · table-top products"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["e.g., CISPR 14", "ETSI"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4", "IEC/EN 61000-4-22"], i: ["IEC/EN 61000-4-3", "IEC/EN 61000-4-22"] },
      ),
      groups: [
        { title: G.en.features, items: [
          "Test site for table-top EUT's",
          "Full compliant EMI acc. to CISPR 16-1-4, IEC/EN 61000-4-22, and ETSI",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Cost-effective solution for free-space measurements",
          "Compact chamber design with advanced Frankosorb® absorber lining",
          "Double test axis option",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000 and H600") },
        { title: G.en.performance, items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4",
          "Deviation FS NSA ±3.5 dB (30 MHz to 1 GHz)",
          "Deviation SVSWR +5.5 dB (1 GHz to 18 GHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Deviation FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
          "Full compliant immunity (EMS) and emission (EMI) according to IEC/EN 61000-4-22 — Deviation SdB c ≤ 1.8 dB",
        ] },
      ],
    },

    "fac-3-l": {
      lead: [
        "The FAC-3 L is the extended version of Frankonia's fully anechoic chamber at 3.0 m measuring distance with a Quiet Zone (QZ) of ø1.5 m (H = 2.0 m), for EMC tests on table-top positioned as well as on floor-standing EUT's.",
        "It is designed for measurements under free-space conditions based on CISPR 16-1-4 as a test site without ground plane, and offers in addition a height scan possibility using a FAM or FBM antenna mast.",
      ],
      figure: {
        src: "/chambers/models/fac-3-l-2.webp", w: 1600, h: 1067,
        alt: "Inside a fully anechoic chamber. Walls, ceiling and floor are all lined with white pyramid absorbers, and a white antenna mast with red fittings stands in the middle. A grey grid structure lies on the floor in the foreground.",
        caption: "A fully anechoic chamber with a mast. Being able to scan in height without a reflecting floor is what the L configuration adds.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "ø1.5 m (H = 2.0 m)" },
        { label: "Turntable", value: "ø1.5 m" },
        { label: "Load capacity", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["FAC-3 L", "9,380 × 5,780 × 6,000 mm", "ø1.5 m\nat 3.0 m test distance (H = 2.0 m) · floor-standing and table-top products, with height scan"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 14", "CISPR 15", "CISPR 32", "ETSI"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4", "IEC/EN 61000-4-22"], i: ["IEC/EN 61000-4-3", "IEC/EN 61000-4-22"] },
      ),
      groups: [
        { title: G.en.features, items: [
          "Test site for table-top and floor-standing EUT's (with height scan)",
          "Full compliant EMI acc. to CISPR 16-1-4, IEC/EN 61000-4-22, and ETSI",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Cost-effective solution for free-space measurements",
          "Compact chamber design with advanced Frankosorb® absorber lining",
          "Double test axis option",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000 and H600") },
        { title: G.en.performance, items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4",
          "Deviation FS NSA ±3.5 dB (30 MHz to 1 GHz)",
          "Deviation SVSWR +5.5 dB (1 GHz to 18 GHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Deviation FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
          "Full compliant immunity (EMS) and emission (EMI) according to IEC/EN 61000-4-22 — Deviation SdB c ≤ 1.8 dB",
        ] },
      ],
    },

    "sac-3-fac-3-transformer": {
      lead: [
        "Frankonia's SAC-3/FAC-3 Transformer is a full compliant EMC solution at 3.0 m measuring distance offering semi as well as fully conditions.",
        "This special solution focuses on conditions with ground plane, as well as FAR conditions for table-top EUT tests with an optimized floor absorber modification kit. The SAC-3/FAC-3 Transformer is adapted to full compliant emission and immunity testing with a traditional square design.",
      ],
      figure: {
        src: "/chambers/models/sac-3-fac-3-transformer-1.webp", w: 1600, h: 1067,
        alt: "A chamber seen head on. The end wall is a grid of square ferrite tiles; the side walls and ceiling are white pyramid absorber. The floor is a bare reflecting ground plane.",
        caption: "Here the ground plane is exposed — the semi-anechoic setup. Lay the floor absorbers and the same room becomes a free-space test site.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "ø2.0 m / ø1.5 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone"],
          rows: [
            ["SAC-3 / FAC-3 Transformer", "9,680 × 6,530 × 6,000 mm", "SAC setup — ø2.0 m at 3.0 m test distance (H = 2.5 m)\nFAC setup — ø1.5 m at 3.0 m test distance (H = 1.5 m)"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        sacProductEmission,
        sacProductImmunity,
        { e: ["CISPR 16-1-4", "and/or ANSI C63.4", "IEC/EN 61000-4-22"], i: ["IEC/EN 61000-4-3", "IEC/EN 61000-4-22"] },
      ),
      groups: [
        { title: G.en.features, items: [
          "Cost-effective and high-performance solution for a 3.0 m test distance",
          "SAC setup: QZ of ø2.0 m for floor standing products",
          "FAC setup: QZ of ø1.5 m for table-top products",
          "Full compliant EMI acc. to CISPR 16-1-4, ANSI C63.4, IEC/EN 61000-4-22, ETSI",
          "Full compliant acc. to CISPR 25 and MIL-STD 461",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Compact chamber design with advanced absorber lining",
          "Outstanding performance with long-lasting Frankosorb® absorbers",
          "Usable for automotive and military standard tests",
          "Turnkey solution",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000 and H600") },
        { title: "Performance & Compliance — SAC (semi) configuration", items: sacPerformanceEn() },
        { title: "Performance & Compliance — FAC (fully) configuration", items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4",
          "Deviation FS NSA ±3.5 dB (30 MHz to 1 GHz)",
          "Deviation SVSWR +5.5 dB (1 GHz to 18 GHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Deviation FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
        ] },
      ],
    },

    chc: {
      lead: [
        "The CHC is Frankonia's compact hybrid chamber solution at 3.0 m measuring distance with a Quiet Zone (QZ) of ø1.2 m. It is an optimal solution for both pre-compliance emission tests and full compliant immunity tests at 3.0 m measuring distance.",
        "The extended version CHC L includes an absorber-lined partition wall that offers the feature to house and store RF power amplifiers, antennas, or floor absorbers inside the chamber.",
      ],
      figure: {
        src: "/chambers/models/chc-2.webp", w: 1600, h: 1067,
        alt: "Inside a compact hybrid chamber. The pyramid absorbers of the side walls and ceiling converge towards a dark ferrite end wall, where a red horn antenna sits on a yellow post. Floor absorbers lie in the foreground.",
        caption: "A 3.0 m distance fitted into this footprint. Pre-compliance for emission and full compliance for immunity is the trade that sets the size.",
      },
      overview: [
        { label: "Emission (EMI)", value: "Pre-compliant" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "ø1.2 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and feature"],
          rows: [
            ["CHC", "7,355 × 3,755 × 3,300 mm", "ø1.2 m\nat 3.0 m test distance"],
            ["CHC L", "8,255 × 3,755 × 3,300 mm", "ø1.2 m\nat 3.0 m test distance · e.g., amplifier can be stored in the chamber"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["Pre-compliance from 30 MHz to 1 GHz"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4"], i: ["IEC/EN 61000-4-3"] },
      ),
      groups: [
        { title: G.en.features, items: [
          "Pre-compliant EMI from 30 MHz to 1 GHz acc. to CISPR 16-1-4",
          "Full compliant and cost saving solution for EMS acc. to IEC/EN 61000-4-3",
          "Absorber-lined partition wall (CHC L) to house RF power amplifiers, antennas and floor absorbers inside the chamber",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: [
          "Pre-compliant emission (EMI) according to CISPR 16-1-4",
          "Deviation NSA ±4.0 dB (30 MHz to 1 GHz) with limited height scan",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Deviation FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
        ] },
      ],
    },

    "chc-plus": {
      lead: [
        "The CHC Plus version is the advanced setup of the compact hybrid chamber, and allows compliant emission measurements from 1 GHz to 18 GHz.",
        "The 3.0 m measuring distance and the ø1.2 m Quiet Zone are those of the CHC. What changes is the emission measurement above 1 GHz.",
      ],
      figure: {
        src: "/chambers/models/chc-plus-2.webp", w: 1600, h: 1067,
        alt: "Inside a compact chamber. The cover of a turntable set into the floor stands open, showing the cable connector panel underneath, with yellow and black safety markings around it. The walls are lined with pyramid absorbers.",
        caption: "The cabling runs under the floor. The smaller the chamber, the more where the cables leave becomes a design question.",
      },
      overview: [
        { label: "Emission (EMI)", value: "Compliant above 1 GHz" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m" },
        { label: "Quiet zone", value: "ø1.2 m" },
        { label: "Turntable", value: "ø1.2 m / ø2.0 m" },
        { label: "Load capacity", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and feature"],
          rows: [
            ["CHC Plus", "7,355 × 3,755 × 3,300 mm", "ø1.2 m\nat 3.0 m test distance · compliant emission >1 GHz"],
            ["CHC Plus L", "7,580 × 4,655 × 4,350 mm", "ø1.2 m\nat 3.0 m test distance · turntable ø2.0 m, compliant emission >1 GHz"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["Pre-compliant from 30 MHz to 1 GHz", "Full compliant from 1 GHz to 18 GHz"],
        ["IEC/EN 61000-4-3"],
        { e: ["CISPR 16-1-4"], i: ["IEC/EN 61000-4-3"] },
      ),
      groups: [
        { title: G.en.features, items: [
          "Pre-compliant EMI from 30 MHz to 1 GHz acc. to CISPR 16-1-4",
          "Compliant EMI from 1 GHz to 18/40 GHz",
          "Full compliant and cost saving solution for EMS acc. to IEC/EN 61000-4-3",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: [
          "Pre-compliant emission (EMI) according to CISPR 16-1-4",
          "Deviation NSA ±4.0 dB (30 MHz to 1 GHz) with limited height scan",
          "Compliant emission (EMI) according to CISPR 16-1-4",
          "Deviation SVSWR +6.0 dB (1 GHz to 18 GHz)",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Deviation FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)",
        ] },
      ],
    },

    ctc: {
      lead: [
        "The CTC is Frankonia's full compliant component test chamber that entirely focuses on immunity testing for industrial products, paired with automotive component EMI and EMS, as well as military tests.",
        "It is full compliant to CISPR 25, ISO 11452, MIL-STD 461 and DO-160 at 1.0 m test distance, and to IEC/EN 61000-4-3 at a 3.0 m measuring distance.",
      ],
      figure: {
        src: "/chambers/models/ctc-1.webp", w: 1600, h: 1200,
        alt: "Inside a component test chamber. The end wall is a square grid of absorber, the side walls and ceiling are pyramid absorber, and a wooden test bench stands in the middle. Yellow setup lines are marked on the floor.",
        caption: "The wooden bench and the lines on the floor. What CISPR 25 prescribes is not only the chamber but this layout.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 25" },
        { label: "Immunity (EMS)", value: "ISO 11452" },
        { label: "Test distance", value: "1.0 m · 3.0 m" },
        { label: "Military", value: "MIL-STD 461 · DO-160" },
        { label: "Frequency range", value: "9 kHz – 18 GHz" },
        { label: "Load capacity", value: "2,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H450 or H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Test condition"],
          rows: [
            ["CTC", "8,480 × 5,485 × 3,750 mm", "Full compliant immunity testing per IEC 61000-4-3\nFull compliant to CISPR 25, ISO 11452, MIL-STD 461 and DO-160\nTable setup and floor standing"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 25", "MIL-STD 461 / DO-160"],
        ["ISO 11452", "MIL-STD 461 / DO-160", "IEC/EN 61000-4-3"],
        { e: ["CISPR 25", "MIL-STD 461 / DO-160"], i: ["IEC/EN 61000-4-3"] },
      ),
      groups: [
        { title: G.en.features, items: [
          "Full compliant and cost saving solution for EMS acc. to IEC/EN 61000-4-3",
          "Full compliant with CISPR 25 and ISO 11452",
          "Full compliant with MIL-STD 461 and DO-160",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: [
          "Full compliant immunity (EMS) according to IEC 61000-4-3",
          "Full compliant automotive component testing according to CISPR 25 and ISO 11452",
          "Full compliant military and airborne testing according to MIL-STD 461 and DO-160",
        ] },
      ],
    },

    actc: {
      lead: [
        "The ACTC is Frankonia's automotive component testing chamber solution at 1.0 m measuring distance. This chamber solution is adapted to full compliant tests of automotive components according to CISPR 25 and ISO 11452.",
        "A permanent plug-in contact strip is installed between the absorbers to ensure the electrical connection of the test table to the shielding, and includes the test table as required by CISPR 25.",
      ],
      figure: {
        src: "/chambers/models/actc-1.webp", w: 1600, h: 1068,
        alt: "Inside an automotive component testing chamber. Walls and ceiling are lined with pyramid absorbers, a wooden test bench with a metal ground plane stands in the middle, and a red instrument case and a tripod stand at the left.",
        caption: "In component testing the layout is the standard, not just the chamber. The test table and its bond to the shielding are what CISPR 25 prescribes.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 25" },
        { label: "Immunity (EMS)", value: "ISO 11452" },
        { label: "Test distance", value: "1.0 m" },
        { label: "Setup", value: "Table setup" },
        { label: "Frequency range", value: "26 MHz – 18 GHz" },
        { label: "Load capacity", value: "10,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 150 kHz / 26 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite and H450.",
          head: ["Configuration", "External dimension (L × W × H)", "Test condition"],
          rows: [
            ["ACTC", "6,380 × 5,480 × 3,750 mm", "CISPR 25 component level\nat 1.0 m test distance"],
            ["ACTC L", "11,480 × 6,580 × 4,500 mm", "CISPR 25 component level and vehicle\nat 1.0 m test distance"],
          ],
        },
      ],
      standards: [
        {
          title: S.en.verification,
          columns: [
            { head: S.en.emission, items: ["CISPR 25"] },
            { head: S.en.immunity, items: ["ISO 11452"] },
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "ACTC: Full compliant per CISPR 25 and ISO 11452 for components",
          "ACTC L: Full compliant per CISPR 25 and ISO 11452 for components and large enough for tests on vehicles",
          "Compact chamber solution for automotive component testing",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Advanced and optimized lining with long-lasting Frankosorb® hybrid absorbers",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite and H450") },
        { title: "Performance & Compliance — ACTC", items: [
          "Full compliant emission (EMI) according to CISPR 25",
          "Full compliant immunity (EMS) according to ISO 11452",
          "Compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Uniform field 0.5 × 0.5 m at 1.0 m measuring distance",
          "Deviation FU 0/+6 dB at 100 % (26/80 MHz to 18 GHz)",
        ] },
        { title: "Performance & Compliance — ACTC L", items: [
          "Full compliant emission (EMI) according to CISPR 25",
          "Full compliant immunity (EMS) according to ISO 11452",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Uniform field 1.5 × 1.5 m at 3.0 m measuring distance",
          "Deviation FU 0/+6 dB at 75 % of 16 measuring points (26/80 MHz to 18 GHz)",
        ] },
      ],
    },

    ucc: {
      lead: [
        "The UCC is Frankonia's ultra-compact hybrid solution at 1.0 m measuring distance. The chamber is designed for pre-compliance radiated emission and immunity tests, conducted tests, and pre-compliance tests for automotive components as per the CISPR 25 method.",
        "It is an alternative solution for the GTEM cell for pre-compliance testing as well as for research and scientific purposes in all sectors.",
      ],
      figure: {
        src: "/chambers/models/ucc-2.webp", w: 1600, h: 1200,
        alt: "Inside an ultra-compact hybrid chamber. A test table with a copper ground plane rests on a white frame, the pyramid absorbers of the wall are close behind it, and a service panel is set into the floor.",
        caption: "The copper ground plane and the layout on it. Replacing a GTEM cell means keeping exactly this setup.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 25 pre-compliance" },
        { label: "Immunity (EMS)", value: "ISO 11452 pre-compliance" },
        { label: "Test distance", value: "1.0 m" },
        { label: "Setup", value: "Table setup" },
        { label: "Frequency range", value: "26 MHz – 18 GHz" },
        { label: "Replaces", value: "GTEM cell" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 150 kHz / 26 MHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite and H450.",
          head: ["Configuration", "External dimension (L × W × H)", "Test condition"],
          rows: [
            ["UCC", "4,580 × 3,080 × 2,550 mm", "Pre-compliant component level\nat 1.0 m test distance"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "UCC: Pre-compliant per CISPR 25 and ISO 11452 (alternative to GTEM cell)",
          "Compact chamber solution for automotive component testing",
          "Upgradeable for E-Drive (load machine, BlueBox, battery test system)",
          "Advanced and optimized lining with long-lasting Frankosorb® hybrid absorbers",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite and H450") },
        { title: G.en.performance, items: [
          "Pre-compliant emission (EMI) according to CISPR 25",
          "Pre-compliant immunity (EMS) according to ISO 11452",
        ] },
      ],
    },

    avtc: {
      lead: [
        "The AVTC is Frankonia's automotive anechoic chamber solution at 3.0 m or 5.0 m measuring distance offering a Quiet Zone (QZ) of ø4.0 m for commercial testing combined with a focus on automotive component and vehicle tests.",
        "It is adapted for radiated emissions on vehicles acc. to CISPR 12 and components acc. to CISPR 25 as well as for commercial product tests acc. to CISPR 16-1-4 and ANSI C63.4. Furthermore, it is adapted to radiated immunity acc. to IEC/EN 61000-4-3, ISO 11451 and ISO 11452.",
      ],
      figure: {
        src: "/chambers/models/avtc-4.webp", w: 1600, h: 1067,
        alt: "Inside a vehicle testing chamber. Walls and ceiling are lined with pyramid absorbers, and the circle of a large turntable with a recessed grating is set into the reflecting floor. The chamber is empty.",
        caption: "The circle left in the floor is the turntable. The diameter a vehicle has to stand on is what sets the size of this chamber.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "3.0 m · 5.0 m" },
        { label: "Quiet zone", value: "up to ø4.0 m" },
        { label: "ECE R10", value: "dynamometer at 3.0 m" },
        { label: "Load capacity", value: "30,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option. Frankosorb® hybrid lining with Ferrite, H1000 and H600.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and turntable"],
          rows: [
            ["AVTC", "11,480 × 9,380 × 6,000 mm", "ø3.0 m at 3.0 m test distance (H = 2.5 m)\ne.g., with turntable up to ø5.0 m"],
            ["AVTC L", "14,780 × 11,480 × 6,300 mm", "ø3.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)\ne.g., with turntable up to ø6.0 m"],
            ["AVTC XL", "16,280 × 12,680 × 6,300 mm", "ø4.0 m at 3.0 m and 5.0 m test distance (H = 2.5 m)\ne.g., with integrated dynamometer ø7.0 m"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461", "ECE R10.5"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101, RS102, RS103", "ECE R10.5"],
      ),
      groups: [
        { title: G.en.features, items: [
          "Advanced Frankosorb® hybrid absorber lining",
          "Automotive component & vehicle and commercial tests in a single solution",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Full compliant with CISPR 25, CISPR 12, ISO 11452 and ISO 11451",
          "ECE R10 with integrated or mobile dynamometer up to 3.0 m test distance",
          "Cost-effective and high-performance solution for 3.0 m or 5.0 m test distance",
          "Floor absorber board for an efficient and fast modification of the test setup",
          "Upgradeable with EDTC components (load machine, BlueBox, etc.)",
          "Highly customizable solution for any kind of EMC testing",
          "Usable for commercial and military standard tests",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H1000 and H600") },
        { title: G.en.performance, items: [
          ...sacPerformanceEn("26"),
          "Full compliant emission (EMI) according to CISPR 25 and CISPR 12",
          "Full compliant immunity (EMS) according to ISO 11452 and ISO 11451",
          "ECE R10 at 3.0 m test distance with dynamometer",
        ] },
      ],
    },

    "sac-10-v": {
      lead: [
        "The SAC-10V is Frankonia's full compliant and customizable EMC testing solution at 10.0 m measuring distance, offering various sizes of Quiet Zone and dedicated to automotive full vehicle testing with an integrated dynamometer.",
        "Due to the high grade of customization reflecting the demands of our customers, this semi-anechoic chamber is adaptable in size and offers several configuration possibilities. Identical performance can be offered using hybrid or long-pyramid absorbers.",
      ],
      figure: {
        src: "/chambers/models/sac-10-v-5.webp", w: 1600, h: 1067,
        alt: "Inside a large vehicle testing chamber. A black saloon car stands on the floor turntable with an exhaust hose connected to it, a large antenna boom structure runs below the ceiling, and walls and ceiling are lined with pyramid absorbers.",
        caption: "One vehicle on the turntable. That the exhaust extraction and the dynamometer come in with it is what an ECE R10 test requires.",
      },
      overview: [
        { label: "Emission (EMI)", value: "CISPR 16-1-4" },
        { label: "Immunity (EMS)", value: "IEC/EN 61000-4-3" },
        { label: "Test distance", value: "up to 10.0 m" },
        { label: "Quiet zone", value: "ø6.0 m" },
        { label: "ECE R10.5", value: "full compliant at 10.0 m" },
        { label: "Load capacity", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "Hybrid absorber solution",
          note: "Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option. Optimized Frankosorb® hybrid absorber lining.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and test zone"],
          rows: [
            ["SAC-10VC-6/H", "23,030 × 14,480 × 6,300 mm", "ø6.0 m at 5.0 m test distance (H = 2.5 m)\nPrepared for a 10.0 m test distance for vehicle tests"],
            ["SAC-10V-6/H", "22,580 × 15,680 × 8,700 mm", "ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10V-6/H (SL12)", "24,380 × 16,580 × 9,000 mm", "ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 12 m long vehicles"],
            ["SAC-10V-6/H (SL18)", "26,780 × 18,080 × 9,000 mm", "ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 18 m long vehicles"],
          ],
        },
        {
          title: "Pyramid absorber solution",
          note: "Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option. Full lining with Frankosorb® long-pyramid P2400 absorbers.",
          head: ["Configuration", "External dimension (L × W × H)", "Quiet zone and test zone"],
          rows: [
            ["SAC-10V-6/P", "26,480 × 20,180 × 9,000 mm", "ø6.0 m at 10.0 m test distance (H = 3.0 m)"],
            ["SAC-10V-6/P (SL12)", "26,480 × 20,180 × 10,500 mm", "ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 12 m long vehicles"],
            ["SAC-10V-6/P (SL18)", "30,080 × 20,180 × 10,500 mm", "ø6.0 m at 10.0 m test distance (H = 3.0 m)\nHeavy load test zone up to 18 m long vehicles"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32", "MIL-STD 461", "ECE R10.5"],
        ["IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "MIL-STD 461 RS101, RS102, RS103", "ECE R10.5"],
      ),
      groups: [
        { title: G.en.features, items: [
          "SAC-10V-6/H: Optimized and advanced Frankosorb® hybrid absorber lining",
          "SAC-10V-6/P: Full lining with Frankosorb® long-pyramid P2400 absorbers",
          "Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant EMS acc. to IEC/EN 61000-4-3",
          "Full compliant with CISPR 25, CISPR 12, CISPR 36, ISO 11452 and ISO 11451",
          "ECE R10 with integrated dynamometer at 10.0 m test distance",
          "Highly customizable for any kind of testing, vehicle sizes and weights",
          "Specialized for 'out-of-the-range' EMC test environments",
          "Usable for commercial and military standard tests",
        ] },
        { title: G.en.absorbers, items: [
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible acc. to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable acc. to EN 13501-1 class B (alternative)",
        ] },
        { title: G.en.performance, items: [
          "Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI C63.4",
          "Full compliant emission (EMI) according to CISPR 25 and CISPR 12",
          "Full compliant immunity (EMS) according to IEC/EN 61000-4-3",
          "Full compliant immunity (EMS) according to ISO 11452 and ISO 11451",
          "ECE R10 at 10.0 m test distance with dynamometer",
        ] },
      ],
    },

    "edtc-sa": {
      lead: [
        "E-Drive Test Solutions are Frankonia's dedicated test sites for powertrain components and facilities related to hybrid, electric, fuel cell and battery drive systems. They offer superior conditions for radiation testing according to CISPR 25 and ISO 11452.",
        "The EDTC-SA is the chamber solution that is specifically prepared for a single external load machine with fixed shaft. It includes braking, driving, direction of rotation, speed regulation, torque control and a mix out of this range.",
      ],
      figure: {
        src: "/chambers/models/edtc-3.webp", w: 1600, h: 1067,
        alt: "Inside an e-drive test chamber. An electric motor is mounted on a white plinth in the middle with two heavy cables running to it. The left wall is ferrite tile, the right is pyramid absorber.",
        caption: "The motor itself is the EUT. The load machine stays outside and only the shaft crosses the shielding.",
      },
      overview: [
        { label: "Compliance", value: "CISPR 25 · ISO 11452" },
        { label: "Load machine", value: "External, fixed shaft" },
        { label: "Test distance", value: "1.0 m" },
        { label: "Setup", value: "Table in front of wall" },
        { label: "Frequency range", value: "150 kHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option. Optimized Frankosorb® hybrid absorber lining.",
          head: ["Configuration", "External dimension (L × W × H)", "Load machine"],
          rows: [
            ["EDTC-SA", "7,880 × 5,480 × 3,750 mm", "For the fixed-shaft version with one external load machine\ne.g., 1 × 250 kW with 3,000 RPM and 3,000 Nm"],
          ],
        },
        {
          title: "External load machines",
          note: "Equipment that goes into the chamber rather than the chamber itself. The load machine can be the one your preferred dynamometer supplier builds.",
          head: ["", "EDTC-250", "EDTC-500"],
          rows: [
            ["Power", "1 × 250 kW", "2 × 250 kW"],
            ["Speed", "3,000 RPM", "3,000 RPM"],
            ["Torque", "3,000 Nm", "3,000 Nm"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "Fully compliant with CISPR 25 and ISO 11452",
          "Optimized Frankosorb® hybrid absorber lining",
          "Component or system test level",
          "Combination with battery tests",
          "Integration kit for existing chambers",
          "Optional EUT e-motor power source and water cooling system",
          "Motor adapter, grounding and connection per CISPR 25",
          "Vibration-free and non-interacting solid basement (floating slab)",
          "Extended services in consultancy and test readiness guidance",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: [
          "Radiated emission testing according to CISPR 25",
          "Radiated immunity testing according to ISO 11452",
        ] },
      ],
    },

    "edtc-ax": {
      lead: [
        "The EDTC-AX is the chamber setup that is defined for e-axle tests on powertrain units and is prepared for two external load machines with fixed shaft.",
        "The patented system can be used for dynamic drive tests of electrical powertrain units and matches with your preferred dynamometer supplier. Frankonia focuses on the proper EMC setup inside an EMC chamber and provides adapted test tables, grounding conception and 90° angle gear boxes.",
      ],
      figure: {
        src: "/chambers/models/edtc-ax-0.webp", w: 1600, h: 1067,
        alt: "Inside an e-drive test chamber. A copper ground plane table stands in the foreground and a green electric motor with a black coupling is mounted on a white frame behind it. A metal housing where the shaft passes through sits in the left wall.",
        caption: "The housing in the left wall is the shielded shaft feed-through. It is the point at which the chamber stays shielded with the load machine outside it.",
      },
      overview: [
        { label: "Compliance", value: "CISPR 25 · ISO 11452" },
        { label: "Load machines", value: "Two, fixed shaft" },
        { label: "Power range", value: "e.g., 2 × 250 kW" },
        { label: "Test distance", value: "1.0 m" },
        { label: "Frequency range", value: "150 kHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 150 kHz to 18 GHz, 40 GHz as an option. Optimized Frankosorb® hybrid absorber lining.",
          head: ["Configuration", "External dimension (L × W × H)", "Load machines"],
          rows: [
            ["EDTC-AX", "9,080 × 6,080 × 3,750 mm", "For the fixed-shaft version with two external load machines\ne.g., 2 × 250 kW with 3,000 RPM and 3,000 Nm"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "Patented setup for the e-axle configuration",
          "Fully compliant with CISPR 25 and ISO 11452",
          "Optimized Frankosorb® hybrid absorber lining",
          "Shielded shaft, proper DUT positioning, grounding and test tables provided",
          "90° angle gear boxes — open to any dynamometer",
          "Motor adapter, grounding and connection per CISPR 25",
          "Vibration-free and non-interacting solid basement (floating slab)",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: [
          "Radiated emission testing according to CISPR 25",
          "Radiated immunity testing according to ISO 11452",
        ] },
      ],
    },

    "edtc-bb": {
      lead: [
        "The EDTC-BB is the adapted chamber solution that includes the EMC-BlueBox mobile load machine for dynamic EMC tests of electrical powertrain units in a shielded enclosure.",
        "The BlueBox works in a four-quadrant operation; any EUT stress situation can be simulated. Similar to the external load machine with a fixed shaft, it includes braking, driving, direction of rotation, speed regulation, torque control and a mix out of this range.",
      ],
      figure: {
        src: "/chambers/models/edtc-bb-0.webp", w: 1600, h: 1067,
        alt: "Inside an e-drive test chamber. A green electric motor sits on a long white bench, connected along a shaft to a blue unit at the far end. Yellow markings run along the floor.",
        caption: "Here the load machine comes into the chamber. Having no shaft through the shielding is what the BlueBox setup changes.",
      },
      overview: [
        { label: "Compliance", value: "CISPR 25 · ISO 11452" },
        { label: "Load machine", value: "Mobile, electrical" },
        { label: "Maximum power", value: "120 kW" },
        { label: "Test distance", value: "1.0 m" },
        { label: "Frequency range", value: "30 MHz – 18 GHz" },
        { label: "Load capacity", value: "5,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frequency range 9 kHz / 30 MHz to 18 GHz, 40 GHz as an option. Optimized Frankosorb® hybrid absorber lining.",
          head: ["Configuration", "External dimension (L × W × H)", "Load machine"],
          rows: [
            ["EDTC-BB", "7,880 × 6,380 × 3,750 mm", "For the mobile load machine EMC-BlueBox up to 120 kW"],
            ["EDTC-BB with turntable", "10,880 × 6,980 × 3,900 mm", "For the mobile load machine EMC-BlueBox up to 120 kW\nwith turntable for 360° scan"],
          ],
        },
        {
          title: "EMC-BlueBox mobile load machine",
          note: "Equipment that goes into the chamber rather than the chamber itself. Weight, payload and dimensions are as the head office publishes them.",
          head: ["", "BlueBox-30", "BlueBox-40", "BlueBox-65", "BlueBox-120"],
          rows: [
            ["Power", "30 kW", "40 kW", "63 kW", "120 kW"],
            ["Speed max.", "11,000 RPM", "9,000 RPM", "6,500 RPM", "6,000 RPM"],
            ["Torque", "82 Nm", "140 Nm", "240 Nm", "470 Nm"],
            ["Weight", "1,100 kg", "1,200 kg", "1,700 kg", "2,500 kg"],
            ["Payload", "800 kg", "800 kg", "1,000 kg", "1,400 kg"],
            ["Dimensions", "2.0 × 1.3 × 1.3 m", "2.2 × 1.3 × 1.3 m", "2.5 × 1.4 × 1.3 m", "2.8 × 1.6 × 1.3 m"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "Four-quadrant operation — any EUT stress situation can be simulated",
          "Fully compliant with CISPR 25 and ISO 11452",
          "Optimized Frankosorb® hybrid absorber lining",
          "Mobile, flexible and adjustable to any kind of EUT",
          "360° view when placed on a turntable (extended testing range)",
          "Combination with battery tests",
          "Integration kit for existing chambers",
          "Easy to use for every EMC expert",
        ] },
        { title: G.en.absorbers, items: absorbersEn("Ferrite, H450 or H600") },
        { title: G.en.performance, items: [
          "Radiated emission testing according to CISPR 25",
          "Radiated immunity testing according to ISO 11452",
        ] },
      ],
    },

    "mil-chc": {
      lead: [
        "The MIL CHC is Frankonia's Compact Hybrid Chamber, lined with a Frankosorb® hybrid absorber layout, for MIL-STD 461 and DO-160 component testing.",
        "It is adapted for full compliant radiated emission and immunity tests of lightweight EUT's at 1.0 m test distance. To meet DO-160 the chamber is slightly longer, because of the absorber lining.",
      ],
      figure: {
        src: "/chambers/models/mil-chc-2.webp", w: 1600, h: 1067,
        alt: "Inside a compact hybrid chamber for military component testing. Walls and ceiling are lined with pyramid absorbers, one person is adjusting a red antenna on a tripod, a test bench stands to the right, and an aselsan logo is fixed high on the left wall.",
        caption: "A 1.0 m measuring distance is a distance you can reach across. Military component testing happens at this size.",
      },
      overview: [
        { label: "Emission (EMI)", value: "MIL-STD 461 · DO-160" },
        { label: "Immunity (EMS)", value: "MIL-STD 461 · DO-160" },
        { label: "Test distance", value: "1.0 m" },
        { label: "Setup", value: "Table setup" },
        { label: "Frequency range", value: "30 MHz – 40 GHz" },
        { label: "Lining", value: "Hybrid" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "Frankosorb® hybrid absorber lining. The DO-160 configuration is longer because of the absorber lining.",
          head: ["Configuration", "External dimension (L × W × H)", "Frequency range and lining"],
          rows: [
            ["MIL CHC", "4,880 × 4,880 × 3,000 mm", "9 kHz / 30 MHz to 40 GHz\nwith hybrid absorber lining"],
            ["MIL CHC / DO-160", "5,330 × 4,880 × 3,000 mm", "9 kHz / 30 MHz to 40 GHz\nwith hybrid absorber lining"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "Full compliant for components acc. to MIL-STD 461 and DO-160",
          "Compact chamber design for military applications",
          "Advanced lining with long-lasting Frankosorb® absorbers",
        ] },
        { title: G.en.absorbers, items: [
          "Frankosorb® short-pyramid, long-pyramid or hybrid absorber lining",
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible acc. to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable acc. to EN 13501-1 class B (alternative)",
        ] },
        { title: G.en.performance, items: [
          "Full compliant emission (EMI) and immunity (EMS) acc. to MIL-STD 461 and DO-160, 30 MHz / 80 MHz to 40 GHz",
          "Absorption at normal incidence: 80 MHz to 250 MHz 6 dB, as per standard requirements",
          "Absorption at normal incidence: above 250 MHz 10 dB, as per standard requirements",
        ] },
      ],
    },

    "mil-std-chamber": {
      lead: [
        "The MIL-STD Chamber is Frankonia's large chamber solution at 1.0 m measuring distance according to MIL-STD 461, adapted for radiated emission and immunity tests for large EUT's or vehicles.",
        "It can be fully customized according to customers' requirements for military testing of large and heavyweight EUT's.",
      ],
      figure: {
        src: "/chambers/models/mil-std-chamber-0.webp", w: 1250, h: 875,
        alt: "A cutaway render of a large military chamber. A red steel structure frames the shell, the inner walls are lined with white absorbers, and a tank stands on the floor in the middle. An access ramp leads in from the left.",
        caption: "This picture is why no dimensions are given. What has to come in is what sets the size of the chamber.",
      },
      overview: [
        { label: "Emission (EMI)", value: "MIL-STD 461 · DO-160" },
        { label: "Immunity (EMS)", value: "MIL-STD 461 · DO-160" },
        { label: "Test distance", value: "1.0 m" },
        { label: "EUT", value: "Vehicles, large EUT's" },
        { label: "Frequency range", value: "80 MHz – 40 GHz" },
        { label: "Load capacity", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "The size is defined according to the EUT type and size. Special turntable systems and integrations are possible.",
          head: ["Configuration", "External dimension (L × W × H)", "Frequency range and lining"],
          rows: [
            ["MIL-STD Chamber", "Custom size", "9 kHz / 80 MHz to 40 GHz\nwith short-pyramid absorbers · military compliance"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "Full compliant acc. to MIL-STD 461 and DO-160",
          "Frequency of absorbers: 80 MHz to 40 GHz",
          "High performance solution for large and heavyweight EUT's",
          "Fully customized according to customers' requirements",
        ] },
        { title: G.en.absorbers, items: [
          "Frankosorb® short-pyramid absorber lining",
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible acc. to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable acc. to EN 13501-1 class B (alternative)",
        ] },
        { title: G.en.performance, items: [
          "Full compliant emission (EMI) and immunity (EMS) acc. to MIL-STD 461 and DO-160, 30 MHz / 80 MHz to 40 GHz",
          "Absorption at normal incidence: 80 MHz to 250 MHz 6 dB, as per standard requirements",
          "Absorption at normal incidence: above 250 MHz 10 dB, as per standard requirements",
        ] },
      ],
    },

    "mil-std-chamber-advanced": {
      lead: [
        "The MIL-STD Advanced Chamber is Frankonia's military chamber solution acc. to MIL-STD 461 for large EUT's, and is compliant with commercial or automotive test site requirements.",
        "Frankonia's unique Frankosorb® long-pyramid or hybrid absorber technology offers the possibility to combine MIL-STD 461 test requirements with commercial test requirements as per CISPR 16-1-4 and ANSI C63.4, as well as vehicle and automotive component tests.",
      ],
      figure: {
        src: "/chambers/models/mil-std-chamber-advanced-3.webp", w: 1478, h: 1108,
        alt: "A double-deck coach stands inside a large anechoic chamber. Walls and ceiling are lined with pyramid absorbers, a large log-periodic antenna stands at the right, and yellow lines are marked on the floor.",
        caption: "A coach, inside a chamber built to a military standard. That is what also meeting the commercial test site requirement looks like.",
      },
      overview: [
        { label: "Military", value: "MIL-STD 461 · DO-160" },
        { label: "Commercial", value: "CISPR 16-1-4" },
        { label: "Test distance", value: "1.0 m · up to 10.0 m" },
        { label: "Quiet zone", value: "e.g. ø6.0 m" },
        { label: "Frequency range", value: "26 MHz – 40 GHz" },
        { label: "Load capacity", value: "80,000 kg" },
      ],
      tables: [
        {
          title: "Configurations",
          note: "The size is defined according to the EUT type and size. 1.0 m for MIL-STD 461; up to 10.0 m for commercial applications.",
          head: ["Configuration", "External dimension (L × W × H)", "Frequency range and lining"],
          rows: [
            ["MIL-STD Advanced Pyramid", "Custom size", "9 kHz / 26 MHz to 40 GHz\nwith long-pyramid absorbers · military, industrial and automotive compliance"],
            ["MIL-STD Advanced Hybrid", "Custom size", "9 kHz / 30 MHz to 40 GHz\nwith hybrid absorber lining · military, industrial and automotive compliance"],
          ],
        },
      ],
      standards: standardsPair(
        "en",
        ["MIL-STD 461", "DO-160", "CISPR 11", "CISPR 12", "CISPR 14", "CISPR 15", "CISPR 25", "CISPR 32"],
        ["MIL-STD 461 RS101, RS102, RS103", "DO-160", "IEC/EN 61000-4-3", "ISO 11451", "ISO 11452", "ECE R10"],
      ),
      groups: [
        { title: G.en.features, items: [
          "Full compliant acc. to MIL-STD 461 and DO-160",
          "Full compliant EMI/EMS for commercial and automotive standards",
          "Frequency of absorbers: 30 MHz to 40 GHz",
          "Advanced high-performance solution for large and heavyweight EUT's",
          "Fully customized according to customers' requirements",
        ] },
        { title: G.en.absorbers, items: [
          "Frankosorb® long-pyramid or hybrid absorber lining",
          "High-performance nano thin-film technology with proven long-term stability",
          "Non-combustible acc. to EN 13501-1 class A2 - s1 d0",
          "Hardly inflammable acc. to EN 13501-1 class B (alternative)",
        ] },
        { title: "Performance & Compliance — military", items: [
          "Full compliant emission (EMI) and immunity (EMS) acc. to MIL-STD 461 and DO-160, 30 MHz / 80 MHz to 40 GHz",
          "Absorption at normal incidence: 80 MHz to 250 MHz 6 dB, as per standard requirements",
          "Absorption at normal incidence: above 250 MHz 10 dB, as per standard requirements",
        ] },
        { title: "Performance & Compliance — commercial", items: sacPerformanceEn("26") },
      ],
    },

    rvc: {
      lead: [
        "The RVC Chambers are designed based on Frankonia's modular construction system. Prefabricated high-quality shielding panels (>8 MS/m) guarantee a maximum of flexibility and performance.",
        "The shielding panels can be installed reverse (flat surface inside) or as regular PAN shielding with mounting from the inside, which allows future upgrades, e.g., absorber lining.",
      ],
      close:
        "Frankonia offers various stirrer designs and concepts, and maintains its role as a solution provider by adapting our customers' stirrer designs, which we then implement in new RVC chambers or in converting old ones.",
      figure: {
        src: "/chambers/models/reverberation-solutions-0.webp", w: 1600, h: 1067,
        alt: "Inside a reverberation chamber. Walls and ceiling are bare metal shielding panels with no absorber at all. The large ceiling stirrer is blurred mid-rotation, and a blue car stands on the floor turntable.",
        caption: "That there is no absorber is the principle of this room. Instead of removing the reflections, a stirrer keeps stirring the field until it is uniform.",
      },
      overview: [
        { label: "Compliance", value: "IEC/EN 61000-4-21" },
        { label: "Automotive", value: "ISO 11452-11 · 11451-5" },
        { label: "Lowest usable freq.", value: "80 – 200 MHz" },
        { label: "Max. working volume", value: "8.0 × 5.0 × 3.0 m" },
        { label: "Frequency range", value: "10 kHz – 18 GHz" },
        { label: "Models", value: "Seven" },
      ],
      tables: [
        {
          title: "Commercial & Industrial RVC",
          note: "Frequency range 10 kHz to 18 GHz, 40 GHz as an option. Working volume to wall and similar >400 mm (λ/4).",
          head: ["Model", "External dimension (L × W × H)", "Working volume, LUF, stirrer and products"],
          rows: [
            ["RVC e1", "7,580 × 5,630 × 4,200 mm", "3.3 × 3.5 × 2.6 m · LUF 200 MHz\n1× Z-Fold stirrer (vertical)\nSmall or medium size ISM & multimedia"],
            ["RVC e2", "11,280 × 7,280 × 4,950 mm", "5.5 × 4.0 × 2.6 m · LUF 80 MHz\n2× Z-Fold stirrer (vertical and horizontal)\nLarge ISM & multimedia"],
          ],
        },
        {
          title: "Automotive RVC",
          note: "Frequency range 10 kHz to 18 GHz, 40 GHz as an option. The L, XL and XXL are custom sizes.",
          head: ["Model", "External dimension (L × W × H)", "Working volume, LUF, stirrer and products"],
          rows: [
            ["RVC S", "5,330 × 3,380 × 3,300 mm", "2.5 × 1.0 × 1.5 m · LUF 200 MHz\n1× Z-Fold stirrer (vertical)\nComponents for military or automotive"],
            ["RVC M", "7,580 × 5,630 × 4,200 mm", "3.3 × 3.5 × 2.6 m · LUF 200 MHz\n1× Z-Fold stirrer (vertical)\nLarge components for military or automotive"],
            ["RVC L", "13,880 × 11,480 × 6,300 mm (custom)", "8.0 × 5.0 × 3.0 m · LUF 80 MHz\n2× Z-Fold stirrer (vertical and horizontal)\nVehicles"],
            ["RVC XL", "15,530 × 11,480 × 6,600 mm (custom)", "8.0 × 5.0 × 3.0 m · LUF 80 MHz\n1× large-disc stirrer ø9.0 m, 2× disc stirrer ø4.0 m\nVehicles"],
            ["RVC XXL", "17,480 × 13,580 × 6,600 mm (custom)", "8.0 × 5.0 × 3.0 m · LUF 80 MHz\n1× large-disc stirrer ø12.0 m, 2× disc stirrer ø4.0 m\nLarge vehicles"],
          ],
        },
      ],
      groups: [
        { title: "Features & Compliance", items: [
          "Retrofit of a RVC with Frankosorb® hybrid absorbers and regular PAN shielding, or converting old EMC chambers to RVC chambers",
          "Cost-effective and performance solution for small products up to vehicles",
          "Immunity compliance according to IEC/EN 61000-4-21 and ISO 11452-11",
          "Immunity and emission compliance according to ISO 11451-5 (fast stirring)",
          "Full safety integration per Machinery Directive (2006/42/EC)",
        ] },
        { title: "Frankonia stirrers", items: [
          "Regular Z-Fold stirrers with up to 30 RPM at e.g. ø1.8 m",
          "Performance Z-Fold stirrers with up to 60 RPM at e.g. ø2.8 m",
          "Disc-style stirrers with up to 120 RPM at e.g. ø4.0 m",
          "Tube-style stirrers with up to 240 RPM at e.g. ø2.0 m",
          "Large-disc stirrers with up to 10 RPM at e.g. ø12.0 m",
        ] },
      ],
    },

    "shielded-room": {
      lead: [
        "Frankonia shielded rooms and anechoic chambers are designed based on a modular construction system. Prefabricated high quality shielding panels guarantee a maximum of flexibility regarding possible dimensions, and all PAN type modules allow an easy handling and entry via standard building doors.",
        "The standard modules are bolted from inside every 75 mm with high conductivity mesh gasket inserted for sealing the joints of the panels. This facilitates an installation close to the walls of the parent building, and the short screwing distance with a predefined torque guarantees long life shielding attenuation characteristics.",
      ],
      figure: {
        src: "/chambers/models/shielded-room-7.webp", w: 1600, h: 1067,
        alt: "A shielded room seen from the factory hall. Two large RF doors in red frames sit side by side in a grey shielding panel wall, carrying warning labels, with ducting and cable trays running overhead.",
        caption: "Shielding is not only a question of the wall. The doors, the vents and the filters have to reach the same figure before the number below means anything.",
      },
      overview: [
        { label: "Size", value: "Any size" },
        { label: "Shielding standard", value: "EN 50147-1 · IEEE-299" },
        { label: "Max. attenuation", value: "120 dB" },
        { label: "Frequency range", value: "10 kHz – 40 GHz" },
        { label: "Panel", value: "2.0 mm galvanized steel" },
        { label: "Load capacity", value: "Any loading" },
      ],
      tables: [
        {
          title: "Guaranteed performance",
          note: "Acc. to EN 50147-1 or IEEE-299 (option). Equal performance for any kind of feed-through component, honeycomb, door, gate or filter.",
          head: ["Frequency", "Attenuation", "Field"],
          rows: [
            ["10 kHz", "90 dB", "Magnetic field"],
            ["100 kHz", "100 dB", "Magnetic field"],
            ["1 MHz", "110 dB", "Magnetic field"],
            ["100 MHz", "120 dB", "Plane wave"],
            ["400 MHz", "120 dB", "Plane wave"],
            ["1 GHz", "110 dB", "Plane wave"],
            ["18 GHz", "100 dB", "Microwave"],
            ["40 GHz", "100 dB", "Microwave"],
          ],
        },
      ],
      groups: [
        { title: G.en.features, items: [
          "PAN Type shielding modules made of 2.0 mm thick galvanized steel",
          "Modular and prefabricated standard",
          "Self-supporting stability or with static steel structure for any seismic condition",
          "Mounted from the inside",
          "Reverse installation possible (flat surface inside)",
          "Interior finishing (walls and ceiling) possible",
          "Raised floor systems, or welded floor systems",
          "Long life shielding attenuation characteristics",
          "No glue, no welding",
          "Dismountable without any damage, easy modifications and maintenance",
          "A complete transfer or future modification is possible",
          "Any size of shielding is possible",
          "Acoustic panels with absorption per ISO 354 w = 0.65 (MH)",
          "Perfectly adapted for Frankosorb® absorbers",
          "Turnkey solution",
        ] },
      ],
    },
  },
};
