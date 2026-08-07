import { industries, isIndustry, type Industry } from "./industries";
import type { Lang } from "./site-config";

/**
 * The EMC Test Systems branch: three ways into one set of instruments.
 *
 * The head office's own menu runs four levels deep over three axes it never
 * reconciles — Emission/Immunity at the top, a "Search products" list in the
 * middle, and a "Select standard" list of 24 entries at the bottom. That is
 * the right instinct (an engineer arrives holding a standard, a test setup or
 * a model number) buried in a structure nobody can scan.
 *
 * Here the same three axes sit side by side, two levels deep, and the standard
 * axis folds into industry: every one of those 24 standards belongs to an
 * industry, and industry is what the chamber branch already sorts by. The
 * standards themselves stay addressable through the index page, so no entry
 * point is lost.
 */

/** Industry, shared with the chamber branch. */
export const testIndustries = industries;
export const isTestIndustry = isIndustry;

/** Test discipline — the head office's top-level Emission / Immunity split,
 *  with the magnetic field system pulled out of "Radiated" where it hid. */
export const testCategories = ["emission", "conducted", "radiated", "magnetic"] as const;

/** Product family. */
export const testProducts = [
  "amplifier",
  "antenna",
  "efs",
  "preamp",
  "meter",
  "system",
] as const;

export type TestCategory = (typeof testCategories)[number];
export type TestProduct = (typeof testProducts)[number];

export const isTestCategory = (v: string): v is TestCategory =>
  (testCategories as readonly string[]).includes(v);
export const isTestProduct = (v: string): v is TestProduct =>
  (testProducts as readonly string[]).includes(v);

export type TestModel = {
  /** Model designation as the head office writes it. */
  name: string;
  /** Band or one-line specification from the source page. */
  desc: string;
  product: TestProduct;
};

/**
 * Instruments named on the head office's own product pages. Amplifiers carry
 * their band rather than a description because that is how the source tables
 * group them, and band is what a reader picks by.
 *
 * Antennas are deliberately absent: the head office's antenna page lists no
 * model at all, only a 2008 catalogue PDF. The category exists in the menu
 * because the product does; the models have to come out of that PDF before
 * they can be listed here.
 */
export const testModels: readonly TestModel[] = [
  // RF power amplifiers, 10 kHz – 300 MHz.
  { name: "FLL-25", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "FLL-25A", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "FLL-75", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "FLL-75A", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "FLL-100A", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-140", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-300", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-500L", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-600", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-1000L", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-1300", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-2000L", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-2500", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-3500L", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-5000", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-7000L", desc: "10 kHz – 300 MHz", product: "amplifier" },
  { name: "VLL-12000L", desc: "10 kHz – 300 MHz", product: "amplifier" },
  // 10 kHz – 400 MHz.
  { name: "VLC-60", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "VLC-110", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "FLC-75", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "FLC-180", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "VLC-220", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "VLC-400", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "VLC-1100", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "VLC-1200", desc: "10 kHz – 400 MHz", product: "amplifier" },
  { name: "VLC-2000", desc: "10 kHz – 400 MHz", product: "amplifier" },
  // 10 kHz – 1000 MHz.
  { name: "VLLH-25", desc: "10 kHz – 1000 MHz", product: "amplifier" },
  { name: "VLLH-70", desc: "10 kHz – 1000 MHz", product: "amplifier" },
  { name: "VLLH-150", desc: "10 kHz – 1000 MHz", product: "amplifier" },
  { name: "VLLH-260", desc: "10 kHz – 1000 MHz", product: "amplifier" },
  { name: "VLLH-800", desc: "10 kHz – 1000 MHz", product: "amplifier" },
  // 1 – 1000 MHz.
  { name: "FLH-4A", desc: "1 – 1000 MHz", product: "amplifier" },
  { name: "FLH-50A", desc: "1 – 1000 MHz", product: "amplifier" },
  { name: "FLH-100A", desc: "1 – 1000 MHz", product: "amplifier" },
  { name: "FLH-100C", desc: "1 – 1000 MHz", product: "amplifier" },
  { name: "FLH-200C", desc: "1 – 1000 MHz", product: "amplifier" },

  // Electrical field strength meters.
  { name: "EFS-10", desc: "10 kHz – 9.25 GHz, 0.5 – 500 V/m", product: "efs" },
  { name: "EFS-100", desc: "100 kHz – 9.25 GHz, 0.14 – 140 V/m", product: "efs" },
  { name: "EFS-300", desc: "300 kHz – 18 GHz, 1.5 – 1500 V/m", product: "efs" },
  { name: "EFS-500", desc: "300 kHz – 26.5 GHz, 0.4 – 800 V/m", product: "efs" },
  { name: "EFS-Laser", desc: "Laser-powered field probe", product: "efs" },

  // Pre-amplifiers for emission measurement.
  { name: "FPA-2", desc: "9 kHz – 2 GHz, +30 dB, NF 2.5 dB", product: "preamp" },
  { name: "FPA-6A", desc: "10 MHz – 6 GHz, +28 dB, NF 2.5 dB", product: "preamp" },
  { name: "FPA-6B", desc: "9 kHz – 6 GHz, +28 dB, NF 2.5 dB", product: "preamp" },
  { name: "FPA-18", desc: "1 – 18 GHz, ~33 dB, NF 2 dB", product: "preamp" },
  { name: "FPA-26", desc: "18 – 26.5 GHz, ~33 dB, NF 3.5 dB", product: "preamp" },
  { name: "FPA-40", desc: "18 – 40 GHz, ~35 dB, NF 5.5 dB", product: "preamp" },

  // Meters and switching.
  { name: "PMS 1084", desc: "100 kHz – 6 GHz, 2 channels (4 max)", product: "meter" },
  { name: "PMS 1084 B", desc: "10 kHz – 500 MHz", product: "meter" },
  { name: "RSU", desc: "DC – 12.4 GHz, extendable to 18 / 40 GHz", product: "meter" },

  // Integrated systems.
  { name: "CIT-100", desc: "Compact immunity test system, 4 kHz – 1.2 GHz, 25 / 75 W", product: "system" },
  { name: "PSG-300", desc: "Power signal generator, DC – 300 kHz, 250 W", product: "system" },
  { name: "PSG-300A", desc: "Power signal generator, DC – 300 kHz, 800 W", product: "system" },
  { name: "MTS-800", desc: "Magnetic field test system, DC – 250 kHz, up to 1000 A/m", product: "system" },
  { name: "GTEM", desc: "GTEM cell", product: "system" },
];

export const modelsByProduct = (product: TestProduct) =>
  testModels.filter((m) => m.product === product);

export type TestStandard = {
  name: string;
  industry: Industry;
  ko: string;
  en: string;
};

/**
 * The 24 standards the head office's "Select standard" menu offers, each
 * assigned to the industry that buys the test for it. Nothing is invented and
 * nothing is dropped: this is that list, re-sorted.
 *
 * Powertrain gets none of its own. Electric drivetrains are tested to the same
 * automotive standards — CISPR 25, ISO 11452 — under different conditions, and
 * saying otherwise would put a claim on the page that no standards body backs.
 * What differs there is the equipment, and that is what its page says.
 */
export const testStandards: readonly TestStandard[] = [
  { name: "CISPR 12 / EN 55012", industry: "automotive", ko: "차량 방출 — 차외 수신기 보호", en: "Vehicle emissions — protection of off-board receivers" },
  { name: "CISPR 25 / EN 55025", industry: "automotive", ko: "차량 부품 방출 — 차내 수신기 보호", en: "Component emissions — protection of on-board receivers" },
  { name: "ISO 11451-2", industry: "automotive", ko: "차량 전체, 차외 방사원", en: "Whole vehicle, off-vehicle radiation source" },
  { name: "ISO 11451-4", industry: "automotive", ko: "차량 전체, 전도 주입(BCI)", en: "Whole vehicle, bulk current injection" },
  { name: "ISO 11452-2 / -3 / -5 / -7", industry: "automotive", ko: "부품 — 무향실 · TEM 셀 · 스트립라인 · 전도 주입", en: "Components — anechoic chamber, TEM cell, stripline, conducted injection" },
  { name: "SAE J1113-2 / -22", industry: "automotive", ko: "부품 전도 내성 · 자기장", en: "Component conducted immunity and magnetic fields" },
  { name: "Ford ES-XW7T-1A278AC", industry: "automotive", ko: "Ford 사내 규격", en: "Ford company standard" },
  { name: "GM W 3097", industry: "automotive", ko: "GM 사내 규격", en: "GM company standard" },
  { name: "PSA B21 7110", industry: "automotive", ko: "PSA 사내 규격", en: "PSA company standard" },
  { name: "Renault 36-00-808, DC-11224, DC 10614", industry: "automotive", ko: "Renault 사내 규격", en: "Renault company standards" },

  { name: "MIL-STD-461 CE 101 · RE 101 · CS 101 · CS 109", industry: "military", ko: "전도·방사 방출과 전도 내성", en: "Conducted and radiated emissions, conducted susceptibility" },
  { name: "MIL-STD-461 RS 103", industry: "military", ko: "방사 전자기장 내성", en: "Radiated electromagnetic field susceptibility" },

  { name: "CISPR 11 / EN 55011", industry: "commercial", ko: "산업·과학·의료(ISM) 장비", en: "Industrial, scientific and medical equipment" },
  { name: "CISPR 14 / EN 55014", industry: "commercial", ko: "가전·전동공구", en: "Household appliances and power tools" },
  { name: "CISPR 15 / EN 55015", industry: "commercial", ko: "조명 기기", en: "Lighting equipment" },
  { name: "CISPR 22 / EN 55022", industry: "commercial", ko: "정보기술기기(ITE)", en: "Information technology equipment" },
  { name: "CISPR 32 / EN 55032", industry: "commercial", ko: "멀티미디어 기기", en: "Multimedia equipment" },
  { name: "EN 55103-1 / -2 / -3", industry: "commercial", ko: "전문 오디오·비디오·조명 기기", en: "Professional audio, video and lighting equipment" },
  { name: "IEC / EN 61000-4-3", industry: "commercial", ko: "방사 RF 전자기장 내성", en: "Radiated RF electromagnetic field immunity" },
  { name: "IEC / EN 61000-4-6", industry: "commercial", ko: "전도 RF 내성", en: "Conducted RF immunity" },
  { name: "IEC / EN 61000-4-16 / -19", industry: "commercial", ko: "전도 커먼모드 · DC 전원 내성", en: "Conducted common mode and DC power port immunity" },

  { name: "IEC / EN 61000-4-8", industry: "others", ko: "전원주파수 자기장 내성", en: "Power frequency magnetic field immunity" },
  { name: "IEC / EN 61000-4-20", industry: "others", ko: "TEM 도파관 시험", en: "Testing in TEM waveguides" },
  { name: "IEC / EN 61000-4-22", industry: "others", ko: "완전무향실(FAR) 방사 방출·내성", en: "Radiated emission and immunity in a fully anechoic room" },
];

export const standardsByIndustry = (industry: Industry) =>
  testStandards.filter((s) => s.industry === industry);

/** Which product families a test discipline is built from. Curated, not
 *  derived: it is the equipment list for a setup, not a category membership. */
const categoryProducts: Record<TestCategory, readonly TestProduct[]> = {
  emission: ["preamp", "antenna", "meter"],
  conducted: ["system", "amplifier", "meter"],
  radiated: ["amplifier", "antenna", "efs", "meter"],
  magnetic: ["system"],
};

export const productsOfCategory = (category: TestCategory) => categoryProducts[category];

type Entry = { label: string; description: string; note?: string };
type IndustryEntry = { description: string; note: string };

/** Industry copy for this branch. The label comes from industries.ts — only
 *  what is said about instruments differs from the chamber branch. */
export const testIndustryMeta = {
  ko: {
    automotive: {
      note: "CISPR 25 · ISO 11452 · OEM",
      description:
        "차량·전장부품 EMC 시험 장비 구성. CISPR 12·25, ISO 11451·11452, SAE J1113과 Ford·GM·PSA·Renault 사내 규격까지 10개 규격에 대응합니다.",
    },
    military: {
      note: "MIL-STD-461 CE · RE · CS · RS",
      description:
        "MIL-STD-461 대응 군수·방산 시험 장비. CE 101, RE 101, CS 101, CS 109, RS 101, RS 103 여섯 개 방법을 다룹니다.",
    },
    commercial: {
      note: "CISPR 11·32 · 61000-4",
      description:
        "일반 산업·전자기기 EMC 시험 장비. CISPR 11·14·15·22·32, EN 55103, IEC/EN 61000-4-3·-4-6·-4-16/-19 등 9개 규격에 대응합니다.",
    },
    powertrain: {
      note: "e-drive 시험 구성",
      description:
        "전기차 구동계 시험 장비 구성. 규격은 자동차와 같은 CISPR 25·ISO 11452를 따르되, 고전압과 인버터 노이즈 조건에 맞춰 장비 구성이 달라집니다.",
    },
    others: {
      note: "자기장 · GTEM · FAR",
      description:
        "표준 챔버 밖의 특수 시험 장비. 전원주파수 자기장(61000-4-8), TEM·GTEM 도파관(61000-4-20), 완전무향실(61000-4-22).",
    },
  },
  en: {
    automotive: {
      note: "CISPR 25 · ISO 11452 · OEM",
      description:
        "Test equipment for vehicle and automotive component EMC — ten standards from CISPR 12 and 25 through ISO 11451 and 11452 to SAE J1113 and the Ford, GM, PSA and Renault company standards.",
    },
    military: {
      note: "MIL-STD-461 CE · RE · CS · RS",
      description:
        "Defence-grade test equipment for MIL-STD-461, covering the CE 101, RE 101, CS 101, CS 109, RS 101 and RS 103 methods.",
    },
    commercial: {
      note: "CISPR 11·32 · 61000-4",
      description:
        "Test equipment for industrial and consumer electronics — nine standards including CISPR 11, 14, 15, 22 and 32, EN 55103, and IEC/EN 61000-4-3, -4-6 and -4-16/-19.",
    },
    powertrain: {
      note: "e-drive test setup",
      description:
        "Test equipment for electric drivetrains. The standards are the automotive ones — CISPR 25, ISO 11452 — but the high-voltage and inverter noise conditions change what the setup needs.",
    },
    others: {
      note: "Magnetic · GTEM · FAR",
      description:
        "Equipment for tests outside a standard chamber: power frequency magnetic fields (61000-4-8), TEM and GTEM waveguides (61000-4-20), and fully anechoic rooms (61000-4-22).",
    },
  },
} as const satisfies Record<Lang, Record<Industry, IndustryEntry>>;

export const testCategoryMeta = {
  ko: {
    emission: {
      label: "방출 Emission",
      note: "9kHz~40GHz",
      description:
        "방사·전도 방출 측정 구성 — 안테나, FPA 프리앰프 6종, RF 파워미터. 9kHz부터 40GHz까지 커버합니다.",
    },
    conducted: {
      label: "전도 내성 Conducted",
      note: "9kHz~400MHz",
      description:
        "전도 RF 내성과 BCI 시험 구성 — CIT-100 컴팩트 시스템, PSG-300 파워 신호 발생기, 9kHz~400MHz 대역 앰프.",
    },
    radiated: {
      label: "방사 내성 Radiated",
      note: "20MHz~18GHz",
      description:
        "방사 RF 내성 시험 구성 — 20MHz~18GHz 대역 앰프, 안테나, EFS 전계강도계, 파워미터와 스위칭 유닛.",
    },
    magnetic: {
      label: "자기장 내성 Magnetic",
      note: "DC~250kHz",
      description:
        "자기장 방출·내성 시험 구성 — MTS-800과 Helmholtz 코일·루프 센서. DC~250kHz, 최대 1000 A/m.",
    },
  },
  en: {
    emission: {
      label: "Emission",
      note: "9 kHz – 40 GHz",
      description:
        "Radiated and conducted emission setups — antennas, the six FPA pre-amplifiers and RF power meters, covering 9 kHz to 40 GHz.",
    },
    conducted: {
      label: "Conducted Immunity",
      note: "9 kHz – 400 MHz",
      description:
        "Conducted RF immunity and BCI setups — the CIT-100 compact system, the PSG-300 power signal generator, and amplifiers over 9 kHz to 400 MHz.",
    },
    radiated: {
      label: "Radiated Immunity",
      note: "20 MHz – 18 GHz",
      description:
        "Radiated RF immunity setups — amplifiers over 20 MHz to 18 GHz, antennas, EFS field strength meters, power meters and switching units.",
    },
    magnetic: {
      label: "Magnetic Field",
      note: "DC – 250 kHz",
      description:
        "Magnetic field emission and immunity setups — the MTS-800 with Helmholtz coils and loop sensors, DC to 250 kHz and up to 1000 A/m.",
    },
  },
} as const satisfies Record<Lang, Record<TestCategory, Entry>>;

export const testProductMeta = {
  ko: {
    amplifier: {
      label: "RF 파워앰프",
      description:
        "RF 파워앰프 36종 — 10kHz~300MHz FLL·VLL 계열 17종, ~400MHz VLC·FLC 9종, ~1GHz VLLH 5종, 1MHz~1GHz FLH 5종.",
    },
    antenna: {
      label: "안테나",
      description:
        "방출·내성 시험용 광대역 안테나 — 바이코니컬, 로그페리오딕, 혼 안테나.",
    },
    efs: {
      label: "전계강도계 EFS",
      description:
        "EFS-10·100·300·500과 EFS-Laser — 10kHz~26.5GHz, 0.14~1500 V/m, 광파이버 전송.",
    },
    preamp: {
      label: "프리앰프 FPA",
      description:
        "방출 측정용 광대역 프리앰프 6종 — FPA-2·6A·6B·18·26·40, 9kHz~40GHz, 이득 28~35dB.",
    },
    meter: {
      label: "파워미터·스위칭",
      description:
        "PMS 1084·1084B RF 파워미터와 RSU RF 릴레이 스위칭 유닛 — DC~12.4GHz, 18/40GHz 확장.",
    },
    system: {
      label: "통합 시험 시스템",
      description:
        "CIT-100 컴팩트 내성 시험 시스템, PSG-300·300A 파워 신호 발생기, MTS-800 자기장 시험 시스템, GTEM 셀.",
    },
  },
  en: {
    amplifier: {
      label: "RF Power Amplifiers",
      description:
        "Thirty-six RF power amplifiers — seventeen FLL and VLL models to 300 MHz, nine VLC and FLC to 400 MHz, five VLLH to 1 GHz and five FLH from 1 MHz to 1 GHz.",
    },
    antenna: {
      label: "Antennas",
      description:
        "Broadband antennas for emission and immunity testing — biconical, log-periodic and horn.",
    },
    efs: {
      label: "Field Strength Meters",
      description:
        "EFS-10, 100, 300 and 500 plus the EFS-Laser — 10 kHz to 26.5 GHz, 0.14 to 1500 V/m, over a fibre optic link.",
    },
    preamp: {
      label: "Pre-Amplifiers",
      description:
        "Six broadband pre-amplifiers for emission measurement — FPA-2, 6A, 6B, 18, 26 and 40, from 9 kHz to 40 GHz with 28 to 35 dB gain.",
    },
    meter: {
      label: "Meters & Switching",
      description:
        "PMS 1084 and 1084 B RF power meters and the RSU relay switching unit — DC to 12.4 GHz, extendable to 18 or 40 GHz.",
    },
    system: {
      label: "Integrated Systems",
      description:
        "The CIT-100 compact immunity test system, PSG-300 and 300A power signal generators, the MTS-800 magnetic field test system and GTEM cells.",
    },
  },
} as const satisfies Record<Lang, Record<TestProduct, Entry>>;

export const testSystemsOverviewMeta = {
  ko: {
    label: "EMC 시험장비",
    title: "EMC Test Systems",
    description:
      "RF 파워앰프부터 전계강도계·프리앰프·통합 시험 시스템까지. 산업군별, 시험 항목별, 제품군별 세 가지 방식으로 찾아보실 수 있습니다.",
  },
  en: {
    label: "EMC Test Systems",
    title: "EMC Test Systems",
    description:
      "From RF power amplifiers to field strength meters, pre-amplifiers and integrated systems — browse by industry, by test or by product.",
  },
} as const satisfies Record<Lang, { label: string; title: string; description: string }>;

export const testStandardsMeta = {
  ko: {
    label: "규격별 찾기",
    description:
      "Frankonia 시험 장비가 대응하는 EMC 규격 24건. 규격에서 산업군과 필요 장비 구성으로 이어집니다.",
  },
  en: {
    label: "Standards",
    description:
      "The 24 EMC standards Frankonia's test equipment addresses — each one leading to its industry and the equipment a test for it needs.",
  },
} as const satisfies Record<Lang, { label: string; description: string }>;

/** Column headings and utility-row labels for the Test Systems mega dropdown. */
export const testNavCopy = {
  ko: {
    byIndustry: "산업군별",
    byTest: "시험 항목별",
    byProduct: "제품군별",
    models: (n: number) => `${n}종`,
    allProducts: (n: number) => `전체 제품 ${n}종`,
    standards: (n: number) => `규격별 찾기 ${n}건`,
  },
  en: {
    byIndustry: "By Industry",
    byTest: "By Test",
    byProduct: "By Product",
    models: (n: number) => `${n} models`,
    allProducts: (n: number) => `All ${n} products`,
    standards: (n: number) => `${n} standards`,
  },
} as const;

/** Paths, relative to the locale root. */
export const testSystemsPath = "/test-systems";
export const testIndustryPath = (i: Industry) => `/test-systems/industry/${i}`;
export const testCategoryPath = (c: TestCategory) => `/test-systems/test/${c}`;
export const testProductPath = (p: TestProduct) => `/test-systems/product/${p}`;
export const testStandardsPath = "/test-systems/standards";
