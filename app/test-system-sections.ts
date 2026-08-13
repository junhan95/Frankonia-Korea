import type { Industry } from "./industries";
import type { PageBody } from "./page-body";
import type { Lang } from "./site-config";

/**
 * The EMC Test Systems branch: two ways into one set of instruments.
 *
 * The head office's own menu runs four levels deep over three axes it never
 * reconciles — Emission/Immunity at the top, a "Search products" list in the
 * middle, and a "Select standard" list of 24 entries at the bottom. That is
 * the right instinct (an engineer arrives holding a standard, a test setup or
 * a model number) buried in a structure nobody can scan.
 *
 * Here those axes sit side by side, two levels deep: what the test is, and
 * what the equipment is. The standards keep their own index, where they are
 * grouped by the industry that buys the test — the third axis this branch used
 * to carry in the menu. It was dropped because an industry page could only
 * list that industry's standards, which is exactly what the standards index
 * already prints under the same heading; industry is a way of ordering that
 * list, not a separate way in.
 */

/** Test discipline — the head office's top-level Emission / Immunity split,
 *  with the magnetic field system pulled out of "Radiated" where it hid. */
export const testCategories = ["emission", "conducted", "radiated", "magnetic"] as const;

/**
 * Product family, in the order every list of them prints — the dropdown
 * column, the index, and the equipment list on a test page.
 *
 * Integrated systems lead. The five families under them are components of a
 * setup the buyer assembles; CIT-100, PSG-300, MTS-800 and the GTEM cells are
 * the setup, bought whole. A reader who can use one should meet it before the
 * parts list, and a reader who cannot loses one line to reach the amplifiers.
 * The rest keep the signal chain's own order: what drives the field, what
 * radiates it, what measures it, what conditions the measurement, what routes
 * it.
 */
export const testProducts = [
  "system",
  "amplifier",
  "antenna",
  "efs",
  "preamp",
  "meter",
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
  /** One-line specification from the source page. May be empty: the head
   *  office's amplifier pages are a matrix of band against model name and
   *  publish nothing else per model, so those rows carry their band in `group`
   *  and nothing here. Inventing a figure to fill the column is the one thing
   *  that would be worse than an empty one. */
  desc: string;
  product: TestProduct;
  /**
   * The heading the source files this model under — a band for the amplifiers,
   * an antenna form for the antennas. Not translated, for the same reason the
   * model name is not: "10 kHz – 300 MHz" and "Horn" are what a reader matches
   * against a quotation.
   *
   * It is a group *heading*, not the model's own range. The head office prints
   * FLL-25A, FLL-25 and FLL-75 under "10 kHz – 300 MHz" while its own 2019
   * selection book gives them 10 kHz–230 MHz, 100 kHz–250 MHz and
   * 100 kHz–300 MHz. The heading is the group's envelope; the per-model range
   * is in that catalogue and is not carried here yet.
   */
  group?: string;
};

/**
 * Instruments named on the head office's own product pages, in the order and
 * under the headings it prints them.
 *
 * Two sources. The solid-state amplifiers to 1 GHz, the field strength meters,
 * the pre-amplifiers, the meters, the antennas and the integrated systems come
 * from the product pages. The WBA microwave amplifiers come from the 2020
 * `Wideband-Amplifiers_web.pdf`, which is the only place the head office
 * publishes them — its own amplifier menu stops at 1 GHz, so a reader who needs
 * 18 GHz would leave the site thinking Frankonia does not build one.
 */
export const testModels: readonly TestModel[] = [
  // RF power amplifiers. The band is the head office's own column heading —
  // see the note on `group`.
  { name: "FLL-25", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "FLL-25A", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "FLL-75", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "FLL-75A", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "FLL-100A", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-140", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-300", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-500L", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-600", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-1000L", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-1300", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-2000L", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-2500", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-3500L", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-5000", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-7000L", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLL-12000L", desc: "", product: "amplifier", group: "10 kHz – 300 MHz" },
  { name: "VLC-60", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLC-110", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "FLC-75", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "FLC-180", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLC-220", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLC-400", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLC-1100", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLC-1200", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLC-2000", desc: "", product: "amplifier", group: "10 kHz – 400 MHz" },
  { name: "VLLH-25", desc: "", product: "amplifier", group: "10 kHz – 1000 MHz" },
  { name: "VLLH-70", desc: "", product: "amplifier", group: "10 kHz – 1000 MHz" },
  { name: "VLLH-150", desc: "", product: "amplifier", group: "10 kHz – 1000 MHz" },
  { name: "VLLH-260", desc: "", product: "amplifier", group: "10 kHz – 1000 MHz" },
  { name: "VLLH-800", desc: "", product: "amplifier", group: "10 kHz – 1000 MHz" },
  { name: "FLH-4A", desc: "", product: "amplifier", group: "1 – 1000 MHz" },
  { name: "FLH-50A", desc: "", product: "amplifier", group: "1 – 1000 MHz" },
  { name: "FLH-100A", desc: "", product: "amplifier", group: "1 – 1000 MHz" },
  { name: "FLH-100C", desc: "", product: "amplifier", group: "1 – 1000 MHz" },
  { name: "FLH-200C", desc: "", product: "amplifier", group: "1 – 1000 MHz" },
  // WBA microwave amplifiers. These carry a description because the wideband
  // catalogue prints output power and gain per model, which the website's
  // amplifier matrix does not.
  { name: "WBA-0,5/18 – 10", desc: "10 W, 43 dB", product: "amplifier", group: "500 MHz – 18 GHz" },
  { name: "WBA-0,5/18 – 20", desc: "10 – 20 W, 43 dB", product: "amplifier", group: "500 MHz – 18 GHz" },
  { name: "WBA-0,5/18 – 50", desc: "50 W, 47 dB", product: "amplifier", group: "500 MHz – 18 GHz" },
  { name: "WBA-1/20 – 4", desc: "4 W, 36 dB", product: "amplifier", group: "1 – 20 GHz" },
  { name: "WBA-1/20 – 20", desc: "20 W, 43 dB", product: "amplifier", group: "1 – 20 GHz" },
  { name: "WBA-2/18 – 5", desc: "5 W, 37 dB", product: "amplifier", group: "2 – 18 GHz" },
  { name: "WBA-2/18 – 10", desc: "10 W, 40 dB", product: "amplifier", group: "2 – 18 GHz" },
  { name: "WBA-2/20 – 5", desc: "5 W, 37 dB", product: "amplifier", group: "2 – 20 GHz" },
  { name: "WBA-2/20 – 20", desc: "20 W, 43 dB", product: "amplifier", group: "2 – 20 GHz" },
  { name: "WBA-6/10 – 50", desc: "50 W, 47 dB", product: "amplifier", group: "6 – 10 GHz" },
  { name: "WBA-6/10 – 100", desc: "100 W, 50 dB", product: "amplifier", group: "6 – 10 GHz" },
  { name: "WBA-6/12 – 20", desc: "20 W, 43 dB", product: "amplifier", group: "6 – 12 GHz" },
  { name: "WBA-6/12 – 50", desc: "50 W, 47 dB", product: "amplifier", group: "6 – 12 GHz" },
  { name: "WBA-6/18 – 10", desc: "10 W, 40 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 20", desc: "20 W, 43 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 40", desc: "40 W, 46 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 50", desc: "50 W, 47 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 60", desc: "60 W, 47 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 100", desc: "100 W, 50 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 150", desc: "150 W, 52 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 200", desc: "200 W, 53 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/18 – 300", desc: "300 W, 55 dB", product: "amplifier", group: "6 – 18 GHz" },
  { name: "WBA-6/26.5 – 20", desc: "20 W, 43 dB", product: "amplifier", group: "6 – 26.5 GHz" },
  { name: "WBA-18/26.5 – 5", desc: "5 W, 37 dB", product: "amplifier", group: "18 – 26.5 GHz" },
  { name: "WBA-18/26.5 – 10", desc: "10 W, 40 dB", product: "amplifier", group: "18 – 26.5 GHz" },
  { name: "WBA-18/26.5 – 20", desc: "20 W, 43 dB", product: "amplifier", group: "18 – 26.5 GHz" },
  { name: "WBA-18/26.5 – 25", desc: "25 W, 44 dB", product: "amplifier", group: "18 – 26.5 GHz" },
  { name: "WBA-18/26.5 – 40", desc: "40 W, 46 dB", product: "amplifier", group: "18 – 26.5 GHz" },
  { name: "WBA-18/26.5 – 80", desc: "80 W, 49 dB", product: "amplifier", group: "18 – 26.5 GHz" },
  { name: "WBA-18/40 – 10", desc: "8 – 10 W, 40 dB", product: "amplifier", group: "18 – 40 GHz" },
  { name: "WBA-26.5/40 – 5", desc: "5 W, 37 dB", product: "amplifier", group: "26.5 – 40 GHz" },
  { name: "WBA-26.5/40 – 10", desc: "10 W, 40 dB", product: "amplifier", group: "26.5 – 40 GHz" },
  { name: "WBA-26.5/40 – 40", desc: "40 W, 46 dB", product: "amplifier", group: "26.5 – 40 GHz" },
  { name: "WBA-26.5/40 – 80", desc: "80 W, 49 dB", product: "amplifier", group: "26.5 – 40 GHz" },

  // Antennas, under the five headings the head office's antenna page uses.
  // The form names stay in English for the same reason `industryLabel` keeps
  // Automotive: that is how they are written in Korean EMC practice.
  { name: "ALX-4000E", desc: "25 MHz – 4 GHz, 100 W cont. / 200 W intermitt.", product: "antenna", group: "Broadband" },
  { name: "ALX-8000E", desc: "25 MHz – 8 GHz, 100 W cont. / 200 W intermitt.", product: "antenna", group: "Broadband" },
  { name: "MAX-9", desc: "600 MHz – 10.5 GHz, 300 W at 1 GHz", product: "antenna", group: "Stacked log.-periodic" },
  { name: "MAX-9-7/16", desc: "0.6 – 7.5 GHz, 950 W at 1 GHz", product: "antenna", group: "Stacked log.-periodic" },
  { name: "MAX-18", desc: "700 MHz – 20 GHz, 50 W", product: "antenna", group: "Stacked log.-periodic" },
  { name: "HAX-6", desc: "500 MHz – 6 GHz, 6 – 18 dBi", product: "antenna", group: "Horn" },
  { name: "HAX-18", desc: "800 MHz – 18 GHz, 6 – 18 dBi", product: "antenna", group: "Horn" },
  { name: "HAX-40", desc: "14 – 40 GHz, 15 – 20 dBi", product: "antenna", group: "Horn" },
  { name: "SAX-10", desc: "9 kHz – 30 MHz, antenna factor +10 dB/m", product: "antenna", group: "Active rod" },
  { name: "LAX-10", desc: "9 kHz – 30 MHz, 0.5 m loop", product: "antenna", group: "Active loop" },

  // Electrical field strength meters.
  { name: "EFS-10", desc: "10 kHz – 9.25 GHz, 0.5 – 500 V/m", product: "efs" },
  { name: "EFS-100", desc: "100 kHz – 9.25 GHz, 0.14 – 140 V/m", product: "efs" },
  { name: "EFS-300", desc: "300 kHz – 18 GHz, 1.5 – 1500 V/m", product: "efs" },
  { name: "EFS-500", desc: "300 kHz – 26.5 GHz, 0.4 – 800 V/m", product: "efs" },
  { name: "EFS-Laser", desc: "10 kHz – 6 GHz, 0.1 V/m – 10 kV/m, laser-powered", product: "efs" },

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

/**
 * A product family's models, split under the source's own headings.
 *
 * Order comes from `testModels`, not from a sort: the head office prints its
 * amplifier bands lowest-first and its antennas broadband-first, and a reader
 * comparing this page against theirs should find the same sequence. A family
 * whose models carry no `group` comes back as one untitled run, which is what
 * the meters, the pre-amplifiers and the systems want.
 */
export const modelGroups = (product: TestProduct) => {
  const groups: { title?: string; models: TestModel[] }[] = [];
  for (const model of modelsByProduct(product)) {
    const last = groups[groups.length - 1];
    if (last && last.title === model.group) last.models.push(model);
    else groups.push({ title: model.group, models: [model] });
  }
  return groups;
};

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
 * So the index shows four headings, not five: an industry with no standards of
 * its own has nothing to head.
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
 *  derived: it is the equipment list for a setup, not a category membership.
 *  A set, though — the order it prints in comes from `testProducts`. */
const categoryProducts: Record<TestCategory, readonly TestProduct[]> = {
  emission: ["antenna", "preamp", "meter"],
  conducted: ["system", "amplifier", "meter"],
  radiated: ["amplifier", "antenna", "efs", "meter"],
  magnetic: ["system"],
};

/** Sorted rather than printed as written, so the equipment list on a test page
 *  reads in the same order as the menu column and the index — one order for
 *  the branch, and editing the table above cannot put it out of step. */
export const productsOfCategory = (category: TestCategory) =>
  testProducts.filter((p) => categoryProducts[category].includes(p));

type Entry = { label: string; description: string; note?: string };

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
      note: "내성 시험 구동용 고체소자·광대역 — 최대 12kW",
      description:
        "RF 파워앰프 70종 — 10kHz~1GHz 고체소자 앰프 36종(최대 12kW)과 500MHz~40GHz 광대역 WBA 34종.",
    },
    antenna: {
      label: "안테나",
      note: "방출과 내성, 송신과 수신 양쪽",
      description:
        "방출·내성 시험용 안테나 10종 — 광대역 ALX, 스택 로그페리오딕 MAX, 혼 HAX, 액티브 로드 SAX-10과 루프 LAX-10. 9kHz부터 40GHz까지.",
    },
    efs: {
      label: "전계강도계 EFS",
      note: "챔버 안 전계 측정 — 광파이버 전송",
      description:
        "EFS-10·100·300·500과 EFS-Laser — 10kHz~26.5GHz, 0.14~1500 V/m, 광파이버 전송.",
    },
    preamp: {
      label: "프리앰프 FPA",
      note: "수신기 앞단에서 방출 신호 증폭",
      description:
        "방출 측정용 광대역 프리앰프 6종 — FPA-2·6A·6B·18·26·40, 9kHz~40GHz, 이득 28~35dB.",
    },
    meter: {
      label: "파워미터·스위칭",
      note: "진행·반사 전력 측정과 RF 경로 전환",
      description:
        "PMS 1084·1084B RF 파워미터와 RSU RF 릴레이 스위칭 유닛 — DC~12.4GHz, 18/40GHz 확장.",
    },
    system: {
      label: "통합 시험 시스템",
      note: "랙 또는 셀 하나로 완결되는 시험 구성",
      description:
        "CIT-100 컴팩트 내성 시험 시스템, PSG-300·300A 파워 신호 발생기, MTS-800 자기장 시험 시스템, GTEM 셀.",
    },
  },
  en: {
    amplifier: {
      label: "RF Power Amplifiers",
      note: "Immunity drive, solid-state and wideband — to 12 kW",
      description:
        "Seventy RF power amplifiers — thirty-six solid-state models from 10 kHz to 1 GHz, up to 12 kW, and thirty-four WBA wideband models from 500 MHz to 40 GHz.",
    },
    antenna: {
      label: "Antennas",
      note: "Transmit and receive, emission and immunity",
      description:
        "Ten antennas for emission and immunity testing — the broadband ALX, the stacked log-periodic MAX, the HAX horns, and the SAX-10 rod and LAX-10 loop, covering 9 kHz to 40 GHz.",
    },
    efs: {
      label: "Field Strength Meters",
      note: "Reads the field inside the chamber, over fibre",
      description:
        "EFS-10, 100, 300 and 500 plus the EFS-Laser — 10 kHz to 26.5 GHz, 0.14 to 1500 V/m, over a fibre optic link.",
    },
    preamp: {
      label: "Pre-Amplifiers",
      note: "Lifts the emission signal ahead of the receiver",
      description:
        "Six broadband pre-amplifiers for emission measurement — FPA-2, 6A, 6B, 18, 26 and 40, from 9 kHz to 40 GHz with 28 to 35 dB gain.",
    },
    meter: {
      label: "Meters & Switching",
      note: "Forward and reflected power, and the RF paths between",
      description:
        "PMS 1084 and 1084 B RF power meters and the RSU relay switching unit — DC to 12.4 GHz, extendable to 18 or 40 GHz.",
    },
    system: {
      label: "Integrated Systems",
      note: "A whole test in one rack or cell",
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
      "RF 파워앰프부터 전계강도계·프리앰프·통합 시험 시스템까지. 시험 항목별, 제품군별 두 가지 방식으로 찾아보실 수 있습니다.",
  },
  en: {
    label: "EMC Test Systems",
    title: "EMC Test Systems",
    description:
      "From RF power amplifiers to field strength meters, pre-amplifiers and integrated systems — browse by test or by product.",
  },
} as const satisfies Record<Lang, { label: string; title: string; description: string }>;

export const testStandardsMeta = {
  ko: {
    label: "규격별 찾기",
    description:
      "Frankonia 시험 장비가 대응하는 EMC 규격 24건. 그 규격으로 시험하는 산업군별로 묶어 정리했습니다.",
  },
  en: {
    label: "Standards",
    description:
      "The 24 EMC standards Frankonia's test equipment addresses, grouped by the industry that tests to them.",
  },
} as const satisfies Record<Lang, { label: string; description: string }>;

/**
 * Page copy, carried over from the head office's own product pages and — for
 * the WBA amplifiers — from its 2020 wideband catalogue. See
 * docs/source/test-systems-source.md for the verbatim originals and for what
 * was left behind.
 *
 * English is the head office's wording. Korean is a translation of it, not new
 * copy written for a Korean market. Model designations, bands, gains, field
 * strengths and standard numbers are not translated: they are what a reader
 * matches against a quotation.
 *
 * The standards index has no body. Its 24 entries and the industry groupings
 * over them are the page; the head office's `/select-standard/` is a bare list
 * with no prose, and writing an introduction for it would mean writing
 * something the head office never said.
 */
export const overviewBody: Record<Lang, PageBody> = {
  en: {
    lead: [
      "Our Test System division offers a wide range of EMC Test Systems for emission and immunity testing as well as the planning, delivery and installation of turn-key EMC-Laboratories acc. to industrial, automotive and military standards.",
      "Next to the complete systems we offer also single instruments/components, like RF-Power-Amplifiers, Antennas, Signal Generators, RF-Power-Meters, E-Field Sensors, GTEM-Cells, EMI-Receiver and many other accessories for EMC-testing.",
    ],
    groups: [
      {
        title: "During the last 25 years, the following product lines were developed",
        items: [
          "Compact Immunity Test System for immunity testing acc. to IEC/EN 61000-4-6 with integrated signal generator, RF-power-amplifier, directional coupler and 3-channel RF-power-meter",
          "Compact Immunity Test System for immunity testing acc. to IEC/EN 61000-4-16",
          "Radiated immunity test systems acc. to IEC/EN 61000-4-3, ISO 11452-2, MIL-STD 461, RS 103",
          "Full-compliant EMI-Receiver with FFT for emission measurements from 9 kHz to 6 GHz",
          "Control software for automated emission and immunity testing",
          "Complete range of antennas for emission and immunity testing in the frequency range from 9 kHz up to 40 GHz",
          "Wide range of RF-Power-Amplifiers from DC to 18 GHz and output power up to 12.000 W",
          "EMC Control-Unit “ECU 3/6” with integrated signal-generator, relay-switching-unit, directional couplers, RF-power-meters, EUT-monitoring",
          "GTEM-Cells",
          "E-field-sensors, battery- or laser-powered",
          "Low-frequency- / Magnetic-field-test-system for emission and immunity tests, for example magnetic-field-testing up to 1000 A/m, MIL-STD 461 testing, parts CE101, CS101, CS109, RE101, RS101",
        ],
      },
    ],
  },
  ko: {
    lead: [
      "Frankonia 시험장비 사업부는 방출·내성 시험을 위한 EMC 시험 시스템 전반을 공급하고, 산업·자동차·군수 규격에 따른 턴키 EMC 실험실의 설계·납품·설치까지 맡습니다.",
      "완성 시스템과 별도로 RF 파워앰프, 안테나, 신호발생기, RF 파워미터, 전계 센서, GTEM 셀, EMI 리시버를 비롯한 EMC 시험용 단품과 액세서리도 공급합니다.",
    ],
    groups: [
      {
        title: "지난 25년간 개발한 제품군",
        items: [
          "IEC/EN 61000-4-6 내성 시험용 컴팩트 내성 시험 시스템 — 신호발생기, RF 파워앰프, 방향성 결합기, 3채널 RF 파워미터 내장",
          "IEC/EN 61000-4-16 내성 시험용 컴팩트 내성 시험 시스템",
          "IEC/EN 61000-4-3, ISO 11452-2, MIL-STD 461 RS 103 대응 방사 내성 시험 시스템",
          "9 kHz~6 GHz 방출 측정용 FFT 탑재 풀컴플라이언트 EMI 리시버",
          "방출·내성 시험 자동화 제어 소프트웨어",
          "9 kHz~40 GHz 방출·내성 시험용 안테나 전 라인업",
          "DC~18 GHz, 출력 12,000 W까지의 RF 파워앰프",
          "신호발생기·릴레이 스위칭 유닛·방향성 결합기·RF 파워미터·EUT 모니터링을 통합한 EMC 컨트롤 유닛 “ECU 3/6”",
          "GTEM 셀",
          "배터리 또는 레이저 급전 전계 센서",
          "방출·내성 시험용 저주파·자기장 시험 시스템 — 최대 1000 A/m 자기장 시험, MIL-STD 461 CE101·CS101·CS109·RE101·RS101",
        ],
      },
    ],
  },
};

/**
 * The four test disciplines.
 *
 * The head office has no prose of its own on these: its Emission and Immunity
 * pages are card menus. So each page's lead is taken from the instruments that
 * setup is actually built from — the magnetic page from the MTS-800, the
 * conducted page from the CIT-100, the emission page from the FPA
 * pre-amplifiers, the radiated page from the amplifier catalogue's own
 * statement of what it is for. Nothing here is written from scratch.
 */
export const categoryBody: Record<Lang, Partial<Record<TestCategory, PageBody>>> = {
  en: {
    emission: {
      lead: [
        "The wide frequency range up to 2/6 GHz allows measurements acc. CISPR 22. Due to the high gain and the low noise figure the system noise is nearly independent of the other components including cable and receiver. These features make the FPA-x very useful for the measurement of very low limits, as required for CISPR 25. In this case it will be connected directly to the antenna.",
        "It must be noted that the use of pre-amplifier is generally not recommended for the measurement of impulsive signals. Such broadband noise is typical for many EMC measurements. This means that any broadband pre-amplifier is not suitable for EMC measurement of a broadband pulse spectrum.",
      ],
      figure: {
        src: "/test-systems/images/preamp-fpa.webp",
        w: 1200,
        h: 920,
        alt: "An FPA pre-amplifier: a machined metal housing with N-type flange connectors at each end and an engraved type plate on the lid",
        caption: "The type plate carries the band and the gain — the two figures an emission measurement is set up around.",
      },
      groups: [],
    },
    conducted: {
      lead: [
        "The CIT-100 is a complete test system for conducted RF-immunity testing and BCI-testing acc. to IEC/EN 61000-4-6, ISO 11452-4, MIL-STD 461, CS114 and similar standards.",
        "As a “stand-alone” test system the CIT-100 is convincing by its easy and comfortable handling and the excellent cost-performance ratio. We also offer the full range of coupling/decoupling networks (CDN's), EM-coupling clamp, BCI- and current clamps.",
        "For immunity tests to conducted common mode disturbances acc. to IEC/EN 61000-4-16 and differential mode disturbances acc. to IEC/EN 61000-4-19, the PSG-300 provides a linear precision power amplifier over DC – 300 kHz.",
      ],
      figure: {
        src: "/test-systems/images/system-cit-100.webp",
        w: 1600,
        h: 609,
        alt: "The CIT-100 in a 19-inch case, front panel lettered “Conducted Immunity Test System”",
        caption: "Generator, amplifier, power meter and directional coupler in one case — and each still reachable on its own connector.",
      },
      groups: [],
    },
    radiated: {
      lead: [
        "FRANKONIA offers RF-power amplifiers whose frequency range and output power have been tailored especially to the applications in immunity test systems like radiated immunity test systems acc. to IEC/EN 61000-4-3, ISO 11452-2 and MIL-STD 461 RS 103.",
        "A radiated setup is the amplifier, the antenna that carries its power into the chamber, and the field probe that says what arrived. All three are here.",
      ],
      figure: {
        src: "/test-systems/images/antenna-hax-6.webp",
        w: 1600,
        h: 1200,
        alt: "The HAX-6 broadband horn antenna on its mast, aperture facing the camera",
        caption: "500 MHz to 6 GHz. The gain rises with frequency, which is what compensates the cable loss at the top of the band.",
      },
      groups: [],
    },
    magnetic: {
      lead: [
        "The MTS-800 is a compact test system for broadband generation and measurement of magnetic fields. Its internal components allow automatic EMC tests according to automotive standards where high field strength need to be generated or measured.",
        "In combination with our triaxial Helmholtz coils full automated susceptibility tests are possible at magnetic field strength up to 1000 A/m for frequencies from DC to 1 kHz. Lower field strength can be generated for frequencies up to 250 kHz. Due to the triaxial setup of our Helmholtz coil major improvement in device handling is achieved because there is no need to turn an EUT during tests.",
        "Tests and measurements are controlled by a program which will set most parameter automatically. For any relevant standard, which are fulfilled by the MTS-800, limit values are already included into the software package, although any different value can be defined by a user. After every test full reports will be created automatically.",
      ],
      figure: {
        src: "/test-systems/images/system-mts-800.webp",
        w: 1400,
        h: 782,
        alt: "The MTS-800 front panel, lettered “Magnetic Test System”, with banana jacks, BNC inputs and a mains switch",
        caption: "An 800 W power amplifier, a signal generator and a spectrum analyser in one unit — each usable stand-alone.",
      },
      groups: [
        {
          title: "Special features",
          items: [
            "Frequency range for emission and immunity measurements: DC – 250 kHz",
            "800 W precision power amplifier, signal generator and spectrum analyzer in one compact unit",
            "All instruments may as well be used as stand-alone devices",
            "Powerful but easy to operate software, fully expandable for future standards modifications",
            "Standard software allows easy operation, report generation and integration of external measuring instrument for EUT monitoring",
            "Fully automated tests with triaxial Helmholtz coil — software controlled generation of magnetic field in x-, y- and z-direction; no need to turn the EUT",
            "The MTS-800 complies to all magnetic field requirements of relevant EMC and military standards",
          ],
        },
        {
          title: "Automatic testing capabilities",
          items: [
            "Full compliance with ISO 11452-8, MIL-STD-461 RS101, CS101, CS109, IEC/EN 55103-2, IEC/EN 61000-4-8, SAE J1113-2 and J1113-22",
            "The OEM standards Ford ES-XW7T-1A278-AC, GM W3097, PSA B21 7110 and Renault 36-00-808, DC-11224, DC 10614",
            "Emission measurements according to MIL-STD-461E/F RE101, CE101 and IEC/EN 55103-1",
          ],
        },
      ],
      tables: [
        {
          title: "MTS-800",
          head: ["", "Specification"],
          rows: [
            ["Generator — frequency range", "DC – 250 kHz"],
            ["Generator — signal", "Sine wave / triangular / square wave / DC"],
            ["Generator — amplitude", "0 to 10 VAC, −10 V to +10 VDC"],
            ["Amplifier — frequency range", "DC – 1 MHz"],
            ["Amplifier — current", "16 Arms"],
            ["Amplifier — voltage", "50 Vrms / 75 VDC"],
            ["Amplifier — distortion", "< 0.10 %\nDC – 100 kHz, load ≥ 4 Ω"],
            ["Analyzer — voltage input", "DC – 250 kHz\n1 MΩ / 50 Ω switchable"],
            ["Analyzer — current input", "DC – 250 kHz\nshunts 10 mΩ / 1 Ω / 100 Ω, max 20 A continuous"],
            ["AD converter", "16 bit, 1.25 MSPS"],
            ["Connection to computer", "USB"],
            ["Dimensions (W×H×D)", "449 × 177 × 580 mm"],
            ["Weight", "approx. 34 kg net"],
          ],
        },
        {
          title: "MIL-STD-461 methods the system covers",
          note: "The head office's own definition of each method, with the band it applies over.",
          head: ["Method", "Test", "Band"],
          rows: [
            ["CE101", "Conducted emission, power leads", "30 Hz – 10 kHz"],
            ["CS101", "Conducted susceptibility, power lead", "30 Hz – 150 kHz"],
            ["CS109", "Conducted susceptibility, structure current", "60 Hz – 100 kHz"],
            ["RE101", "Radiated emission, magnetic field", "30 Hz – 100 kHz"],
            ["RS101", "Radiated susceptibility, magnetic field", "30 Hz – 100 kHz"],
          ],
        },
      ],
    },
  },
  ko: {
    emission: {
      lead: [
        "FPA 프리앰프는 2/6 GHz까지의 넓은 대역으로 CISPR 22 측정에 대응합니다. 이득이 높고 잡음지수가 낮아 시스템 잡음이 케이블·리시버 등 다른 구성요소에 거의 좌우되지 않습니다. CISPR 25처럼 한계값이 매우 낮은 측정에서 특히 유용하며, 이때는 안테나에 직결합니다.",
        "다만 임펄스 신호 측정에는 프리앰프 사용을 권하지 않습니다. 광대역 잡음은 EMC 측정에서 흔하지만, 어떤 광대역 프리앰프도 광대역 펄스 스펙트럼 측정에는 적합하지 않습니다.",
      ],
      figure: {
        src: "/test-systems/images/preamp-fpa.webp",
        w: 1200,
        h: 920,
        alt: "FPA 프리앰프 — 양 끝에 N형 플랜지 커넥터가 달린 금속 하우징, 뚜껑에 각인된 명판",
        caption: "명판에 적힌 대역과 이득이 방출 측정 구성의 출발점입니다.",
      },
      groups: [],
    },
    conducted: {
      lead: [
        "CIT-100은 IEC/EN 61000-4-6, ISO 11452-4, MIL-STD 461 CS114 등에 따른 전도 RF 내성 시험과 BCI 시험을 위한 완성형 시험 시스템입니다.",
        "단독 시험 시스템으로서 조작이 간편하고 가격 대비 성능이 뛰어납니다. 결합·분리 회로망(CDN) 전 라인업과 EM 결합 클램프, BCI 클램프, 전류 클램프도 함께 공급합니다.",
        "IEC/EN 61000-4-16 커먼모드, IEC/EN 61000-4-19 차동모드 전도 내성 시험에는 DC~300 kHz 선형 정밀 파워앰프를 갖춘 PSG-300을 씁니다.",
      ],
      figure: {
        src: "/test-systems/images/system-cit-100.webp",
        w: 1600,
        h: 609,
        alt: "19인치 케이스에 든 CIT-100, 전면 패널에 “Conducted Immunity Test System” 표기",
        caption: "발생기·앰프·파워미터·방향성 결합기가 한 케이스에 들어 있고, 각각을 개별 커넥터로 따로 쓸 수도 있습니다.",
      },
      groups: [],
    },
    radiated: {
      lead: [
        "Frankonia의 RF 파워앰프는 주파수 범위와 출력을 내성 시험 용도에 맞춰 설계했습니다 — IEC/EN 61000-4-3, ISO 11452-2, MIL-STD 461 RS 103에 따른 방사 내성 시험이 그 대상입니다.",
        "방사 시험 구성은 앰프, 그 출력을 챔버 안으로 실어 나르는 안테나, 그리고 도달한 전계를 알려 주는 전계 프로브 세 가지입니다. 셋 모두 이 브랜치 안에 있습니다.",
      ],
      figure: {
        src: "/test-systems/images/antenna-hax-6.webp",
        w: 1600,
        h: 1200,
        alt: "마스트에 장착된 HAX-6 광대역 혼 안테나, 개구면이 정면을 향한 모습",
        caption: "500 MHz~6 GHz. 주파수가 올라갈수록 이득이 커지는 특성이 대역 상단의 케이블 손실을 보상합니다.",
      },
      groups: [],
    },
    magnetic: {
      lead: [
        "MTS-800은 자기장의 광대역 발생과 측정을 함께 하는 컴팩트 시험 시스템입니다. 높은 자계강도를 발생시키거나 측정해야 하는 자동차 규격 EMC 시험을 자동으로 수행합니다.",
        "삼축 Helmholtz 코일과 조합하면 DC~1 kHz에서 최대 1000 A/m까지 완전 자동 내성 시험이 가능하고, 더 낮은 자계강도는 250 kHz까지 발생시킬 수 있습니다. 삼축 구성이라 시험 중 EUT를 돌려놓을 필요가 없습니다.",
        "시험과 측정은 대부분의 파라미터를 자동으로 설정하는 프로그램이 제어합니다. MTS-800이 대응하는 규격의 한계값은 소프트웨어에 이미 들어 있고 사용자가 다른 값을 정의할 수도 있습니다. 시험이 끝나면 보고서가 자동으로 생성됩니다.",
      ],
      figure: {
        src: "/test-systems/images/system-mts-800.webp",
        w: 1400,
        h: 782,
        alt: "“Magnetic Test System” 표기가 있는 MTS-800 전면 패널 — 바나나 잭, BNC 입력, 전원 스위치",
        caption: "800 W 파워앰프와 신호발생기, 스펙트럼 분석기가 한 대에 들어 있고 각각 단독으로도 씁니다.",
      },
      groups: [
        {
          title: "주요 특징",
          items: [
            "방출·내성 측정 주파수 범위: DC~250 kHz",
            "800 W 정밀 파워앰프, 신호발생기, 스펙트럼 분석기를 한 대에 통합",
            "내장 계측기는 모두 단독 장비로도 사용 가능",
            "조작이 간단하면서도 강력한 소프트웨어 — 향후 규격 개정에 맞춰 확장 가능",
            "표준 소프트웨어로 조작·보고서 생성과 EUT 모니터링용 외부 계측기 연동까지",
            "삼축 Helmholtz 코일로 완전 자동 시험 — x·y·z 방향 자기장을 소프트웨어가 제어하므로 EUT를 돌릴 필요가 없음",
            "관련 EMC·군용 규격의 자기장 요구사항 전부에 대응",
          ],
        },
        {
          title: "자동 시험 대응 규격",
          items: [
            "ISO 11452-8, MIL-STD-461 RS101·CS101·CS109, IEC/EN 55103-2, IEC/EN 61000-4-8, SAE J1113-2·J1113-22 완전 대응",
            "OEM 규격 Ford ES-XW7T-1A278-AC, GM W3097, PSA B21 7110, Renault 36-00-808·DC-11224·DC 10614",
            "MIL-STD-461E/F RE101·CE101, IEC/EN 55103-1 방출 측정",
          ],
        },
      ],
      tables: [
        {
          title: "MTS-800",
          head: ["", "사양"],
          rows: [
            ["Generator — frequency range", "DC – 250 kHz"],
            ["Generator — signal", "Sine wave / triangular / square wave / DC"],
            ["Generator — amplitude", "0 to 10 VAC, −10 V to +10 VDC"],
            ["Amplifier — frequency range", "DC – 1 MHz"],
            ["Amplifier — current", "16 Arms"],
            ["Amplifier — voltage", "50 Vrms / 75 VDC"],
            ["Amplifier — distortion", "< 0.10 %\nDC – 100 kHz, load ≥ 4 Ω"],
            ["Analyzer — voltage input", "DC – 250 kHz\n1 MΩ / 50 Ω switchable"],
            ["Analyzer — current input", "DC – 250 kHz\nshunts 10 mΩ / 1 Ω / 100 Ω, max 20 A continuous"],
            ["AD converter", "16 bit, 1.25 MSPS"],
            ["Connection to computer", "USB"],
            ["Dimensions (W×H×D)", "449 × 177 × 580 mm"],
            ["Weight", "approx. 34 kg net"],
          ],
        },
        {
          title: "대응하는 MIL-STD-461 시험 방법",
          note: "각 방법의 정의와 적용 대역은 본사 표기 그대로입니다.",
          head: ["Method", "시험", "대역"],
          rows: [
            ["CE101", "전도 방출, 전원선", "30 Hz – 10 kHz"],
            ["CS101", "전도 내성, 전원선", "30 Hz – 150 kHz"],
            ["CS109", "전도 내성, 구조체 전류", "60 Hz – 100 kHz"],
            ["RE101", "방사 방출, 자기장", "30 Hz – 100 kHz"],
            ["RS101", "방사 내성, 자기장", "30 Hz – 100 kHz"],
          ],
        },
      ],
    },
  },
};

/**
 * The six product families.
 *
 * Tables are the point of these pages. A reader arrives holding a band and a
 * field strength and leaves with a model number, and the specification tables
 * are the only thing on the site that closes that gap — so where the head
 * office prints a table, it is here, in its own row order and its own units.
 *
 * Where two models share a table's rows they share a table, as the head office
 * does for EFS-10/EFS-100. Where they do not, they get their own.
 */
export const productBody: Record<Lang, Partial<Record<TestProduct, PageBody>>> = {
  en: {
    amplifier: {
      lead: [
        "FRANKONIA offers RF-power amplifiers whose frequency range and output power have been tailored especially to the applications in immunity test systems: radiated immunity acc. to IEC/EN 61000-4-3, ISO 11452-2 and MIL-STD 461 RS 103; conducted immunity acc. to IEC/EN 61000-4-6; and BCI testing acc. to ISO 11452-4 and MIL-STD 461 CS 114.",
        "Two ranges sit side by side. The solid-state amplifiers reach from 10 kHz to 1 GHz at up to 12 kW; the WBA wideband series takes over from 500 MHz and runs to 40 GHz.",
      ],
      groups: [
        {
          title: "Special features",
          items: [
            "Modular design",
            "Easy repair by change of modules",
            "Rapid remote diagnostics",
            "Output power of many models upgradable",
            "3 years standard warranty",
            "Upgrade of the output power over the operational frequency range is possible for most models",
          ],
        },
        {
          title: "Available versions",
          items: [
            "V-type, class A, 2U and 4U: −S standard · −SD with integrated directional coupler · −D with display, digital control and IEEE 488 GPIB · −DC as −D with directional coupler and display of instantaneous power",
            "V-type, 7U and 8U: −D and −DC only. 18U and larger are available as −DC only",
            "F-type, class A / AB: −S standard · −E with display, digital control, communication interface and circuit protection",
          ],
        },
      ],
      tables: [
        {
          title: "Solid-state range — band and output power",
          note: "From the head office's 2019 Amplifier Selection Book. The bands overlap because the ranges are built for different applications, not to partition the spectrum.",
          head: ["Band", "Output power"],
          rows: [
            ["10 kHz – 300 MHz", "25 W – 12000 W"],
            ["10 kHz – 400 MHz", "75 W – 2000 W"],
            ["10 kHz – 1000 MHz", "25 W – 800 W"],
            ["1 MHz – 1000 MHz", "4 W – 200 W"],
            ["20 MHz – 1 GHz", "20 W – 600 W"],
            ["80 MHz – 1 GHz", "100 W – 3500 W"],
            ["0,8 – 2 GHz", "7 W – 500 W"],
            ["0,8 – 3,2 GHz", "10 W – 1000 W"],
            ["0,8 – 4 GHz", "18 W – 800 W"],
            ["2 – 4 GHz", "15 W – 200 W"],
            ["2 – 6 GHz", "9 W – 180 W"],
            ["0,7 – 6 GHz", "15 W – 200 W"],
            ["0,8 – 6 GHz", "40 W / 15 W – 220 W / 100 W"],
          ],
        },
      ],
    },
    antenna: {
      lead: [
        "The ALX-4000E is an especially optimized version for emission measurements. It offers lower antenna factors and improved VSWR. Additionally it can be used for immunity tests which require an input power of less than 100 W cw (200 W intermitt.). The ALX-8000E has an extended frequency range up to 8 GHz. All antennas are supplied with antenna factors for 3.0 m and 10.0 m measuring distance (1.0 m on request).",
        "The MAX series is a stacked logarithmic-periodic broadband antenna for radiated immunity tests and emission measurements in the microwave frequency range, its structure made of laser-cut brass and protected by a low loss plastic cover. It is especially suitable for immunity testing acc. to IEC 61000-4-3 because of its good field uniformity.",
        "The horn antennas HAX offer a very low SWR in their nominal frequency range and a very broad bandwidth. The gain increases with frequency up to approx. 18 dBi, which helps to compensate cable losses. The HAX series is suitable for both transmission and receiving applications.",
      ],
      figure: {
        src: "/test-systems/images/antenna-alx-4000.webp",
        w: 1600,
        h: 1200,
        alt: "The ALX-4000E on a mast: a bow-tie element at the back and a tapering log-periodic boom of red-tipped elements in front",
        caption: "One antenna over 25 MHz to 4 GHz — the biconical element carries the bottom of the band, the log-periodic boom the rest.",
      },
      figureRow: [
        {
          src: "/test-systems/images/antenna-max-9.webp",
          w: 1200,
          h: 900,
          alt: "The MAX-9 under its red plastic protection cover, mounted on a tube",
          caption: "MAX-9 — 300 W at 1 GHz through a laser-cut brass structure.",
        },
        {
          src: "/test-systems/images/antenna-hax-18.webp",
          w: 1200,
          h: 900,
          alt: "The HAX-18, a silver pyramidal horn on a mounting tube",
          caption: "HAX-18 — 800 MHz to 18 GHz from a 245 mm aperture.",
        },
        {
          src: "/test-systems/images/antenna-hax-40.webp",
          w: 1200,
          h: 900,
          alt: "The HAX-40, a small horn with a waveguide transition and an SMA-compatible connector",
          caption: "HAX-40 — 14 to 40 GHz, and it weighs 0.3 kg.",
        },
      ],
      groups: [],
      tables: [
        {
          title: "Broadband antennas",
          head: ["", "ALX-4000E", "ALX-8000E"],
          rows: [
            ["Frequency range", "25 MHz to 4 GHz", "25 MHz to 8 GHz"],
            ["Max. input power", "200 W (intermtt.)\n100 W (cont.)", "200 W (intermtt.)\n100 W (cont.)"],
            ["Nominal impedance", "50 Ω", "50 Ω"],
            ["Connector", "type N female", "type N female"],
            ["Isotropic gain (LP-Section)", "6.4 ± 1.2 dBi", "6.4 ± 1.2 dBi"],
            ["Antenna factor", "7 … 34 dB/m", "7 … 43 dB/m"],
            ["Standing wave ratio SWR typ.", "< 1.5", "< 1.5 (f > 150 MHz)"],
            ["Front to back ratio", "20 dB (f > 150 MHz)", "20 dB (f > 150 MHz)"],
            ["Cross polarization", "> 20 dB (30 MHz … 1 GHz)", "> 20 dB (30 MHz … 1 GHz)"],
            ["3 dB beamwidth typ. (E-plane)", "45° – 65° (f > 150 MHz)\n≈ 78° (f < 150 MHz)", "45° – 65° (f > 150 MHz)\n≈ 78° (f < 150 MHz)"],
            ["3 dB beamwidth typ. (H-plane)", "90° – 120° (f > 150 MHz)", "90° – 120° (f > 150 MHz)"],
            ["Dimensions (W × L × D)", "1500 × 910 (1240) × 620 mm", "1500 × 920 (1253) × 620 mm"],
            ["Weight", "3.1 kg", "3.1 kg"],
            ["Fixation (indexing ring)", "22 mm tube", "22 mm tube"],
          ],
        },
        {
          title: "Stacked log.-periodic antennas",
          note: "The MAX-9-7/16 is the MAX-9 with a 7/16 connector: 0,6 – 7,5 GHz, isotropic gain typ. 10.3 dBi, max. input power 950 W at 1 GHz and 380 W at 5 GHz. Everything else is as the MAX-9 column.",
          head: ["", "MAX-9", "MAX-18"],
          rows: [
            ["Frequency range", "600 MHz – 10.5 GHz", "700 MHz – 20 GHz"],
            ["Max input power", "300 W (f = 1 GHz)\n150 W (f = 6 GHz)", "50 W"],
            ["Nominal impedance", "50 Ω", "50 Ω"],
            ["Connection", "type N female", "type N female"],
            ["Isotropic gain", "typ. 10.3 dBi ± 1.5 dB", "typ. 8.6 dBi ± 1 dB"],
            ["Antenna factor", "18 … 41 dB/m", "20 … 49 dB/m"],
            ["SWR typical", "< 1.5 (f < 7 GHz)", "< 2"],
            ["Front to back ratio", "> 25 dB typ.", "> 25 dB typ."],
            ["Cross polarization rejection", "> 30 dB typ.", "> 28 dB typ."],
            ["Half-power beamwidth (E-plane)", "46° ± 10°", "58°"],
            ["Half-power beamwidth (H-plane)", "48° ± 10°", "60°"],
            ["Dimensions (W × L × D)", "460 (+215) × 270 × 270 mm", "490 × 270 × 270 mm"],
            ["Weight", "3.7 kg", "1.2 kg"],
          ],
        },
        {
          title: "Broadband horn antennas",
          head: ["", "HAX-6", "HAX-18", "HAX-40"],
          rows: [
            ["Frequency range", "500 MHz – 6 GHz", "800 MHz – 18 GHz", "14 GHz – 40 GHz"],
            ["Max input power", "limited only by N-connector", "—", "10 W (cont.)\n25 W peak"],
            ["Connection", "type N female", "N-female", "SMA-compatible, female"],
            ["Isotropic gain", "6 … 18 dBi", "6 … 18 dBi", "15 … 20 dBi"],
            ["Antenna factor", "19 … 29 dB/m", "24 … 50 dB/m", "38 … 45 dB/m"],
            ["SWR typical", "< 2", "≈ 1.5", "≈ 2"],
            ["Front to back ratio", "—", "> 25 dB (f > 1.3 GHz)", "> 30 dB"],
            ["Cross polarization rejection", "—", "> 25 dB (1 … 18 GHz)", "> 25 dB"],
            ["Dimensions (W × L × D)", "424 × 314 × 820 mm", "245 × 195 (408) × 142 mm", "75 × 86 × 60 mm"],
            ["Weight", "4.1 kg", "1.3 kg", "0.3 kg"],
            ["Fixation", "Ø 22 mm mounting tube", "Ø 22 mm mounting tube", "3/8″, 1/4″"],
          ],
        },
        {
          title: "Active rod and loop antennas",
          head: ["", "SAX-10", "LAX-10"],
          rows: [
            ["Frequency range", "9 kHz – 30 MHz", "9 kHz – 30 MHz"],
            ["Antenna factor", "+10 dB/m ± 1.5 dB", "20 dB/m for fictitious E-field\n−31.5 dB/Ω for H-field"],
            ["Connector, female", "BNC, 50 Ω nom.", "BNC, 50 Ω"],
            ["Measuring range", "up to 1 V/m at 1 MHz, 1 dB compression\ninput attenuator optional for higher field strength", "QP detector, 9 kHz IF: 30 – 130 dBμV/m\nAV detector, 200 Hz IF: 8 – 130 dBμV/m"],
            ["Loop diameter", "—", "0.5 m"],
            ["Power supply", "9.6 V / 1100 mAh NiMH", "12 V NiMH 1.9 Ah"],
            ["Operation time", "typ. at least 50 hours", "typ. 12 hours"],
            ["Dimensions", "rod 1 m including thread connection\namplifier top plate 220 × 120 mm", "520 × 585 × 120 mm"],
            ["Weight", "rod approx. 0.2 kg\namplifier approx. 0.7 kg", "1.9 kg"],
            ["Threads for tripods", "1/4″, 3/8″", "1/4″, 3/8″"],
          ],
        },
      ],
    },
    efs: {
      lead: [
        "The Frankonia EFS field strength meters especially have been designed for field strength measurements / field homogeneity measurements during radiated immunity tests according to IEC/EN 61000-4-3 / -20. But it could also be used to measure the radiation exposure of the environment, for example at workplaces or flats.",
        "The EFS is an isotropic miniature E-field sensor to ensure that the E-field will not be influenced by the size of the sensor itself. It even does not need any metering unit, because of its direct fibre optic output which allows direct connection of the sensor to the USB-interface of the control PC or laptop.",
        "The EFS-Laser is a smart, fast, extremely accurate electric field probe, which provides linearization, temperature compensation, control and communication functions. Noise reduction and temperature compensation allow accurate measurements down to 0.1 V/m. The probe is laser-powered to allow continuous, galvanically isolated operation without recharging or battery replacement.",
      ],
      figure: {
        src: "/test-systems/images/efs-probe.webp",
        w: 360,
        h: 595,
        alt: "An EFS probe on a slim white tripod, the sensor body no thicker than a finger",
        caption: "17 mm across and 25 g. The probe is that small so that it does not disturb the field it is measuring.",
      },
      groups: [
        {
          title: "Special features",
          items: [
            "PC connection via fibre optic link",
            "Excellent isotropy (0.3 dB typical)",
            "Frequency range: 10 kHz to 26.5 GHz",
            "Field strength measurements from 0.14 V/m to 500 V/m",
            "Up to 100 hours operating time before recharging",
            "EFS-Laser: laser powered — no more empty batteries, continuous real-time data streaming, temperature compensation",
          ],
        },
      ],
      tables: [
        {
          title: "EFS-10 and EFS-100",
          head: ["", "EFS-10", "EFS-100"],
          rows: [
            ["Frequency range", "10 kHz – 9.25 GHz", "100 kHz – 9.25 GHz"],
            ["Dynamic range (single range)", "0.5 – 500 V/m (60 dB)", "0.14 – 140 V/m (60 dB)"],
            ["Flatness, frequency correction on", "0.05 – 7500 MHz: 0.4 dB", "0.3 – 7500 MHz: 0.4 dB"],
            ["Overload", "1000 V/m", "300 V/m"],
            ["Resolution", "0.01 V/m", "0.01 V/m"],
            ["Sensors", "6 monopoles", "6 monopoles"],
            ["Isotropicity", "0.5 dB (0.3 dB typical) at 50 MHz", "0.5 dB (0.3 dB typical) at 50 MHz"],
            ["Sampling rate", "22 S/s to 0.03 S/s\ndepending on filter setting", "22 S/s to 0.03 S/s\ndepending on filter setting"],
            ["Internal battery", "3 V / 5 mAh rechargeable Li-Mn", "3 V / 5 mAh rechargeable Li-Mn"],
            ["Operation time", "100 hours at 0.4 S/s, 28 Hz filter", "100 hours at 0.4 S/s, 28 Hz filter"],
            ["Communication", "bidirectional fibre optic link", "bidirectional fibre optic link"],
            ["Fibre optic length", "10 m standard, 20 / 40 m optional", "10 m standard, 20 / 40 m optional"],
            ["Dimensions", "53 mm overall, body 17 mm diameter", "53 mm overall, body 17 mm diameter"],
            ["Weight", "25 g including 1 m pigtail", "25 g including 1 m pigtail"],
          ],
        },
        {
          title: "EFS-300 and EFS-500",
          note: "The head office publishes two different dynamic ranges for the EFS-300 — 1.5 – 1500 V/m on the product page and 0.17 – 170 V/m on the overview page. The product page is followed here; confirm against the quotation.",
          head: ["", "EFS-300", "EFS-500"],
          rows: [
            ["Frequency range", "300 kHz – 18 GHz", "300 kHz – 26.5 GHz"],
            ["Dynamic range (single range)", "1.5 – 1500 V/m (60 dB)", "0.4 – 800 V/m (66 dB)"],
            ["Flatness, frequency correction on", "0.05 – 7500 MHz: 0.4 dB", "0.3 – 26500 MHz: 0.4 dB"],
            ["Overload", "350 V/m", "1600 V/m"],
            ["Resolution", "0.01 V/m", "0.01 V/m"],
            ["Sensors", "6 monopoles", "6 monopoles"],
            ["Sampling rate", "22 S/s to 0.03 S/s", "22 S/s to 0.03 S/s"],
            ["Operation time", "100 hours at 0.4 S/s, 28 Hz filter", "100 hours at 0.4 S/s, 28 Hz filter"],
            ["Dimensions", "53 mm overall, body 17 mm diameter", "53 mm overall, body 17 mm diameter"],
            ["Weight", "25 g including 1 m pigtail", "25 g including 1 m pigtail"],
          ],
        },
        {
          title: "EFS-Laser",
          head: ["", "Specification"],
          rows: [
            ["Frequency range", "10 kHz … 6 GHz"],
            ["Field strength", "10 kHz … 100 MHz: < 1 V/m … > 10 kV/m\n100 MHz … 6 GHz: < 0.1 V/m … > 700 V/m"],
            ["Damage level", "40 kV/m below 100 MHz, 10 kV/m above"],
            ["Dynamic range", "80 … 100 dB below 100 MHz, 70 … 80 dB above"],
            ["Isotropy at 900 MHz", "< 1 dB"],
            ["Resolution", "< 0.01 dB"],
            ["Linearity error", "< 0.1 dB"],
            ["Sampling rate", "burst 2 MSample/s, streaming > 500 kSample/s"],
            ["Laser wavelength / output power", "850 nm / 750 mW"],
            ["Fibre optic cable length", "15 m, up to 100 m on request"],
            ["PC interface", "USB 2.0"],
            ["Sensor dimensions (W × D × H)", "67 × 67 × 124 mm"],
          ],
        },
      ],
    },
    preamp: {
      lead: [
        "The FPA-x is a general purpose broadband pre-amplifier with high gain and low internal noise. The wide frequency range up to 2/6 GHz allows measurements acc. CISPR 22. Due to the high gain and the low noise figure the system noise is nearly independent of the other components including cable and receiver. These features make the FPA-x very useful for the measurement of very low limits, as required for CISPR 25. In this case it will be connected directly to the antenna.",
        "The amplifiers FPA-2 and FPA-6A are ESD protected to prevent defects by unintentional electrostatic discharge. The FPA-6B offers a frequency range from 9 kHz to 6 GHz; for technical reasons it cannot be ESD-protected and special care is necessary. Pre-amplifiers are generally ESD-sensitive devices, therefore it is very important to discharge coaxial cables before being connected.",
      ],
      figure: {
        src: "/test-systems/images/preamp-fpa.webp",
        w: 1200,
        h: 920,
        alt: "An FPA pre-amplifier: a machined metal housing with N-type flange connectors at each end and an engraved type plate on the lid",
        caption: "An aluminium enclosure and N-type flanges. The 12 V supply is deliberately a linear one — a switching supply raises the interference level the amplifier is there to measure.",
      },
      groups: [],
      tables: [
        {
          title: "FPA-2, FPA-6A and FPA-6B",
          note: "The FPA-18, FPA-26 and FPA-40 continue the range to 40 GHz; their figures are in the model list above.",
          head: ["", "FPA-2", "FPA-6A", "FPA-6B"],
          rows: [
            ["Frequency range", "9 kHz – 2 GHz", "10 MHz – 6 GHz", "9 kHz – 6 GHz"],
            ["Noise figure", "2.5 dB (1.0 GHz)", "2.5 dB (1.0 GHz)", "2.5 dB (1.0 GHz)"],
            ["Gain", "+ 30 dB", "+ 28 dB", "+ 28 dB"],
            ["Amplitude flatness", "< ± 3 dB", "< ± 3 dB", "< ± 3 dB"],
            ["1 dB compression point at input", "≥ −20 dBm (87 dBμV)", "≥ −18 dBm (89 dBμV)", "> 100 dBμV"],
            ["Impedance", "50 Ω", "50 Ω", "50 Ω"],
            ["VSWR input / output", "< 2:1", "< 2:1", "< 2:1"],
            ["Power supply", "+ 12 V (± 2 V)", "+ 12 V (± 2 V)", "+ 12 V (± 2 V)"],
            ["Current consumption", "< 120 mA", "< 130 mA", "< 120 mA"],
          ],
        },
      ],
    },
    meter: {
      lead: [
        "The PMS 1084 is in the standard version a 2-channel RF-Power Meter for the frequency range from 100 kHz up to 6 GHz or from 10 kHz to 500 MHz (PMS 1084 B). The measuring range reaches from −60 dBm to +20 dBm. It is possible to upgrade the PMS 1084 up to max. 4 measuring channels at any time. Hence the PMS 1084 is very good suitable for the automated measurement of forward and reverse power in immunity test systems acc. to IEC/EN 61000-4-3 / -6.",
        "The RSU RF-Relay Switching Unit is applicable for all fields of RF- and EMC measurements to switch, manually or remote controlled, from one input to 2 or 3 outputs. Typical applications in measuring systems are changeover switching between different amplifiers, antennas or power meters. This does also prevent circuit faults due to wrong cabling.",
      ],
      figure: {
        src: "/test-systems/images/meter-pms-1084.webp",
        w: 1600,
        h: 249,
        alt: "The PMS 1084 as a 1U rack unit, front panel lettered “RF Power Meter”",
        caption: "One rack unit high, two channels as standard and four at most — the count a forward-and-reverse measurement on two amplifiers needs.",
      },
      groups: [],
      tables: [
        {
          title: "PMS 1084 and PMS 1084 B",
          head: ["", "PMS 1084", "PMS 1084 B"],
          rows: [
            ["Number of channels", "2 standard, up to 4 optional", "2 standard, up to 4 optional"],
            ["Frequency range", "100 kHz – 6 GHz", "10 kHz – 500 MHz"],
            ["Measuring range", "−60 dBm to +20 dBm (10 kHz ≤ f ≤ 4 GHz)\n−45 dBm to +20 dBm (4 GHz < f ≤ 6 GHz)", "−60 dBm to +20 dBm"],
            ["Accuracy", "± 1 dB (0.5 dB typical)", "± 1 dB (0.5 dB typical)"],
            ["Resolution", "0.1 dB", "0.1 dB"],
            ["Integration time", "0.5 – 200 ms (firmware)", "0.5 – 200 ms (firmware)"],
            ["Max. input level", "+27 dBm (= 500 mW)", "+27 dBm (= 500 mW)"],
            ["VSWR", "1:1.15 to 2 GHz\n1:1.25 over 2 – 4 GHz\n1:1.35 over 4 – 6 GHz", "1:1.15"],
            ["Interface (PC)", "USB, RS232", "USB, RS232"],
            ["Input", "N-type female connector", "N-type female connector"],
            ["Dimensions (D × W × H)", "172 × 482.6 × 44.3 mm", "172 × 482.6 × 44.3 mm"],
            ["Weight", "approx. 2.5 kg", "approx. 2.5 kg"],
          ],
        },
        {
          title: "RSU relay switching unit",
          note: "DC to 12.4 GHz as standard, extendable to 18 or 40 GHz. Up to four relays of 2 or 3 outputs each; test level 50 V continuous, 300 V for 1 s.",
          head: ["", "DC … 1 GHz", "1 … 5 GHz", "5 … 10 GHz", "10 … 12.4 GHz"],
          rows: [
            ["VSWR", "< 1.04", "< 1.14", "< 1.3", "< 1.5"],
            ["Isolation", "> 90 dB", "> 80 dB", "> 70 dB", "> 70 dB"],
            ["Insertion loss", "< 0.05 dB", "< 0.1 dB", "< 0.2 dB", "< 0.3 dB"],
            ["Max. power input", "< 1.00 kW", "< 0.44 kW", "< 0.31 kW", "< 0.28 kW"],
          ],
        },
      ],
    },
    system: {
      lead: [
        "The CIT-100 is a complete test system for conducted RF-immunity testing and BCI-testing acc. to IEC/EN 61000-4-6, ISO 11452-4, MIL-STD 461, CS114 and similar standards. The system consists of a built-in signal generator (4 kHz – 1.2 GHz), an RF-power amplifier (25 / 75 W), a 3-channel RF-power-meter, a directional coupler and the control software.",
        "The PSG-300 contains a linear precision power amplifier with a wide bandwidth (DC – 300 kHz), suitable for all applications concerning fast alternating signals at high output power. The application software is suited for general power generator applications and for immunity tests according to IEC/EN 61000-4-16 as well as to IEC/EN 61543.",
        "The MTS-800 is a compact test system for broadband generation and measurement of magnetic fields, and with the triaxial Helmholtz coils it reaches 1000 A/m from DC to 1 kHz.",
      ],
      figure: {
        src: "/test-systems/images/system-cit-100.webp",
        w: 1600,
        h: 609,
        alt: "The CIT-100 in a 19-inch case, front panel lettered “Conducted Immunity Test System”",
        caption: "The whole 61000-4-6 chain in one case — and every instrument in it still reachable on its own connector.",
      },
      figureRow: [
        {
          src: "/test-systems/images/system-psg-300.webp",
          w: 1400,
          h: 554,
          alt: "The PSG-300 front panel, lettered “Power Signal Generator DC … 300 kHz”",
          caption: "PSG-300 — 250 W, and 800 W in the PSG-300A.",
        },
        {
          src: "/test-systems/images/system-mts-800.webp",
          w: 1400,
          h: 782,
          alt: "The MTS-800 front panel, lettered “Magnetic Test System”, with banana jacks and BNC inputs",
          caption: "MTS-800 — magnetic fields to 1000 A/m, generated and measured by the same unit.",
        },
        {
          src: "/test-systems/images/meter-rsu.webp",
          w: 1600,
          h: 669,
          alt: "The RSU rear panel with four relay blocks of N-type connectors",
          caption: "RSU — the unit that keeps a multi-amplifier bench from being re-cabled by hand.",
        },
      ],
      groups: [
        {
          title: "CIT-100",
          items: [
            "Conducted RF immunity tests acc. to IEC/EN 61000-4-6 and BCI tests acc. to ISO 11452-4 and MIL-STD 461 CS 114",
            "Signal generator, RF-power amplifier, RF-power meter and directional coupler in one 19″-case",
            "All built in instruments can also be used separately, via existing input / output connector",
            "Stand-alone operation possible with optional available netbook",
            "Most important parameters are shown on an integrated display",
            "Automatic EUT-monitoring, and the complete range of CDNs available",
          ],
        },
        {
          title: "PSG-300",
          items: [
            "Simulation of DC / AC supply lines",
            "Control of piezo actors",
            "Generation of magnetic fields with Helmholtz or similar coils",
            "Immunity testing according to IEC/EN 61000-4-16, IEC/EN 61000-4-19 and IEC/EN 61543",
            "Short circuit and overload protection, completely linear and low noise design, outstanding DC stability",
          ],
        },
      ],
      tables: [
        {
          title: "CIT-100",
          head: ["", "Specification"],
          rows: [
            ["RF generator — outputs", "2 × SMA, one usable at a time"],
            ["RF generator — frequency range", "4 kHz to 1.2 GHz"],
            ["RF generator — frequency resolution", "1 Hz"],
            ["RF generator — output level", "0 to −63 dBm, resolution 0.1 dB"],
            ["RF generator — harmonics / spurious", "< 30 dBc / < 45 dBc"],
            ["LF generator (modulation)", "1 Hz to 100 kHz, sine / square / triangular, 0 … 1 V"],
            ["Amplitude modulation", "internal 0 – 100 %, resolution 1 %"],
            ["Internal RF power amplifier", "25 W and 75 W modules available as standard"],
            ["RF voltmeter 1 (test level)", "4 kHz to 1.2 GHz, −40 to +30 dBm"],
            ["RF voltmeter 2 + 3 (forward, reverse)", "4 kHz to 1.2 GHz, −40 to +30 dBm\nplus directional coupler typ. 40 dB"],
            ["EUT monitor input", "0 – 10 V, resolution 2.5 mV, 100 kΩ"],
            ["Interfaces", "USB 2.0, LAN 100 Mbit, GPIB optional"],
          ],
        },
        {
          title: "PSG-300 and PSG-300A",
          note: "The PSG-E300 option adds an external power source for short term tests at 300 V, DC / 16⅔ / 50 / 60 Hz; PSG-EXT adds phase controlled switching of that source.",
          head: ["", "PSG-300", "PSG-300A"],
          rows: [
            ["Power bandwidth", "DC – 200 kHz", "DC – 200 kHz"],
            ["Slew rate", "100 V/μs", "100 V/μs"],
            ["Gain", "10 ± 0.1 %", "10 ± 0.1 %"],
            ["Output voltage", "50 Veff / ± 75 Vpeak", "50 Veff / ± 75 Vpeak"],
            ["Output current", "5 Aeff / ± 7.5 Apeak", "16 Aeff / ± 23 Apeak"],
            ["Power output", "250 W", "800 W"],
            ["Distortion", "< 0.10 %", "< 0.10 %"],
            ["Generator frequency range", "DC, 0.05 Hz – 300 kHz", "DC, 0.05 Hz – 300 kHz"],
            ["Waveform", "sine, square, triangle", "sine, square, triangle"],
            ["Remote control", "USB connector", "USB connector"],
            ["Dimensions (L × W × D)", "448.9 × 132.55 × 435.5 mm", "448.9 × 177 × 585.5 mm"],
            ["Weight", "approx. 14 kg", "approx. 30 kg"],
          ],
        },
      ],
    },
  },
  ko: {
    amplifier: {
      lead: [
        "Frankonia의 RF 파워앰프는 주파수 범위와 출력을 내성 시험 용도에 맞춰 설계했습니다 — IEC/EN 61000-4-3, ISO 11452-2, MIL-STD 461 RS 103 방사 내성, IEC/EN 61000-4-6 전도 내성, ISO 11452-4와 MIL-STD 461 CS 114 BCI 시험이 그 대상입니다.",
        "두 계열이 나란히 있습니다. 고체소자 앰프는 10 kHz부터 1 GHz까지 최대 12 kW를 내고, WBA 광대역 계열이 500 MHz에서 이어받아 40 GHz까지 커버합니다.",
      ],
      groups: [
        {
          title: "주요 특징",
          items: [
            "모듈 구조",
            "모듈 교체만으로 수리 가능",
            "원격 진단이 빠름",
            "다수 모델은 출력 업그레이드 가능",
            "기본 보증 3년",
            "대부분의 모델은 동작 주파수 범위 전체에서 출력 업그레이드 가능",
          ],
        },
        {
          title: "선택 가능한 버전",
          items: [
            "V-type, class A, 2U·4U: −S 기본형 · −SD 방향성 결합기 내장 · −D 디스플레이·디지털 제어·IEEE 488 GPIB · −DC는 −D에 방향성 결합기와 순시전력 표시 추가",
            "V-type, 7U·8U: −D와 −DC만. 18U 이상은 −DC만",
            "F-type, class A / AB: −S 기본형 · −E 디스플레이·디지털 제어·통신 인터페이스·회로 보호",
          ],
        },
      ],
      tables: [
        {
          title: "고체소자 계열 — 대역과 출력",
          note: "본사 2019년 Amplifier Selection Book 기준. 대역이 서로 겹치는 것은 용도별로 설계된 계열이기 때문이며, 스펙트럼을 나눠 가진 것이 아닙니다.",
          head: ["대역", "출력"],
          rows: [
            ["10 kHz – 300 MHz", "25 W – 12000 W"],
            ["10 kHz – 400 MHz", "75 W – 2000 W"],
            ["10 kHz – 1000 MHz", "25 W – 800 W"],
            ["1 MHz – 1000 MHz", "4 W – 200 W"],
            ["20 MHz – 1 GHz", "20 W – 600 W"],
            ["80 MHz – 1 GHz", "100 W – 3500 W"],
            ["0,8 – 2 GHz", "7 W – 500 W"],
            ["0,8 – 3,2 GHz", "10 W – 1000 W"],
            ["0,8 – 4 GHz", "18 W – 800 W"],
            ["2 – 4 GHz", "15 W – 200 W"],
            ["2 – 6 GHz", "9 W – 180 W"],
            ["0,7 – 6 GHz", "15 W – 200 W"],
            ["0,8 – 6 GHz", "40 W / 15 W – 220 W / 100 W"],
          ],
        },
      ],
    },
    antenna: {
      lead: [
        "ALX-4000E는 방출 측정에 맞춰 최적화한 모델로, 안테나 팩터가 낮고 VSWR이 개선되어 있습니다. 100 W cw(간헐 200 W) 미만이면 내성 시험에도 쓸 수 있습니다. ALX-8000E는 대역이 8 GHz까지 확장된 모델입니다. 모든 안테나는 3.0 m와 10.0 m 측정거리의 안테나 팩터와 함께 공급됩니다(1.0 m는 요청 시).",
        "MAX 계열은 마이크로파 대역의 방사 내성 시험과 방출 측정을 위한 스택 로그페리오딕 광대역 안테나입니다. 레이저 커팅한 황동 구조를 저손실 플라스틱 커버로 보호합니다. 전계 균일도가 좋아 IEC 61000-4-3 내성 시험에 특히 적합합니다.",
        "HAX 혼 안테나는 정격 대역에서 SWR이 매우 낮고 대역폭이 넓습니다. 주파수가 올라갈수록 이득이 약 18 dBi까지 커져 케이블 손실을 보상합니다. 송신과 수신 모두에 쓸 수 있습니다.",
      ],
      figure: {
        src: "/test-systems/images/antenna-alx-4000.webp",
        w: 1600,
        h: 1200,
        alt: "마스트에 장착된 ALX-4000E — 뒤쪽의 바이코니컬 소자와 앞으로 뻗은 로그페리오딕 붐",
        caption: "25 MHz~4 GHz를 안테나 하나로. 대역 하단은 바이코니컬 소자가, 나머지는 로그페리오딕 붐이 맡습니다.",
      },
      figureRow: [
        {
          src: "/test-systems/images/antenna-max-9.webp",
          w: 1200,
          h: 900,
          alt: "붉은 플라스틱 보호 커버를 씌운 MAX-9, 마운팅 튜브에 장착된 모습",
          caption: "MAX-9 — 레이저 커팅 황동 구조로 1 GHz에서 300 W.",
        },
        {
          src: "/test-systems/images/antenna-hax-18.webp",
          w: 1200,
          h: 900,
          alt: "마운팅 튜브에 장착된 은색 피라미드형 혼 안테나 HAX-18",
          caption: "HAX-18 — 245 mm 개구면으로 800 MHz~18 GHz.",
        },
        {
          src: "/test-systems/images/antenna-hax-40.webp",
          w: 1200,
          h: 900,
          alt: "도파관 전이부와 SMA 호환 커넥터가 달린 소형 혼 안테나 HAX-40",
          caption: "HAX-40 — 14~40 GHz, 무게는 0.3 kg.",
        },
      ],
      groups: [],
      tables: [
        {
          title: "광대역 안테나",
          head: ["", "ALX-4000E", "ALX-8000E"],
          rows: [
            ["Frequency range", "25 MHz to 4 GHz", "25 MHz to 8 GHz"],
            ["Max. input power", "200 W (intermtt.)\n100 W (cont.)", "200 W (intermtt.)\n100 W (cont.)"],
            ["Nominal impedance", "50 Ω", "50 Ω"],
            ["Connector", "type N female", "type N female"],
            ["Isotropic gain (LP-Section)", "6.4 ± 1.2 dBi", "6.4 ± 1.2 dBi"],
            ["Antenna factor", "7 … 34 dB/m", "7 … 43 dB/m"],
            ["Standing wave ratio SWR typ.", "< 1.5", "< 1.5 (f > 150 MHz)"],
            ["Front to back ratio", "20 dB (f > 150 MHz)", "20 dB (f > 150 MHz)"],
            ["Cross polarization", "> 20 dB (30 MHz … 1 GHz)", "> 20 dB (30 MHz … 1 GHz)"],
            ["3 dB beamwidth typ. (E-plane)", "45° – 65° (f > 150 MHz)\n≈ 78° (f < 150 MHz)", "45° – 65° (f > 150 MHz)\n≈ 78° (f < 150 MHz)"],
            ["3 dB beamwidth typ. (H-plane)", "90° – 120° (f > 150 MHz)", "90° – 120° (f > 150 MHz)"],
            ["Dimensions (W × L × D)", "1500 × 910 (1240) × 620 mm", "1500 × 920 (1253) × 620 mm"],
            ["Weight", "3.1 kg", "3.1 kg"],
            ["Fixation (indexing ring)", "22 mm tube", "22 mm tube"],
          ],
        },
        {
          title: "스택 로그페리오딕 안테나",
          note: "MAX-9-7/16은 MAX-9의 7/16 커넥터 사양입니다 — 0,6~7,5 GHz, 등방성 이득 typ. 10.3 dBi, 최대 입력 1 GHz에서 950 W·5 GHz에서 380 W. 나머지는 MAX-9 열과 같습니다.",
          head: ["", "MAX-9", "MAX-18"],
          rows: [
            ["Frequency range", "600 MHz – 10.5 GHz", "700 MHz – 20 GHz"],
            ["Max input power", "300 W (f = 1 GHz)\n150 W (f = 6 GHz)", "50 W"],
            ["Nominal impedance", "50 Ω", "50 Ω"],
            ["Connection", "type N female", "type N female"],
            ["Isotropic gain", "typ. 10.3 dBi ± 1.5 dB", "typ. 8.6 dBi ± 1 dB"],
            ["Antenna factor", "18 … 41 dB/m", "20 … 49 dB/m"],
            ["SWR typical", "< 1.5 (f < 7 GHz)", "< 2"],
            ["Front to back ratio", "> 25 dB typ.", "> 25 dB typ."],
            ["Cross polarization rejection", "> 30 dB typ.", "> 28 dB typ."],
            ["Half-power beamwidth (E-plane)", "46° ± 10°", "58°"],
            ["Half-power beamwidth (H-plane)", "48° ± 10°", "60°"],
            ["Dimensions (W × L × D)", "460 (+215) × 270 × 270 mm", "490 × 270 × 270 mm"],
            ["Weight", "3.7 kg", "1.2 kg"],
          ],
        },
        {
          title: "광대역 혼 안테나",
          head: ["", "HAX-6", "HAX-18", "HAX-40"],
          rows: [
            ["Frequency range", "500 MHz – 6 GHz", "800 MHz – 18 GHz", "14 GHz – 40 GHz"],
            ["Max input power", "N 커넥터 정격까지", "—", "10 W (cont.)\n25 W peak"],
            ["Connection", "type N female", "N-female", "SMA-compatible, female"],
            ["Isotropic gain", "6 … 18 dBi", "6 … 18 dBi", "15 … 20 dBi"],
            ["Antenna factor", "19 … 29 dB/m", "24 … 50 dB/m", "38 … 45 dB/m"],
            ["SWR typical", "< 2", "≈ 1.5", "≈ 2"],
            ["Front to back ratio", "—", "> 25 dB (f > 1.3 GHz)", "> 30 dB"],
            ["Cross polarization rejection", "—", "> 25 dB (1 … 18 GHz)", "> 25 dB"],
            ["Dimensions (W × L × D)", "424 × 314 × 820 mm", "245 × 195 (408) × 142 mm", "75 × 86 × 60 mm"],
            ["Weight", "4.1 kg", "1.3 kg", "0.3 kg"],
            ["Fixation", "Ø 22 mm mounting tube", "Ø 22 mm mounting tube", "3/8″, 1/4″"],
          ],
        },
        {
          title: "액티브 로드·루프 안테나",
          head: ["", "SAX-10", "LAX-10"],
          rows: [
            ["Frequency range", "9 kHz – 30 MHz", "9 kHz – 30 MHz"],
            ["Antenna factor", "+10 dB/m ± 1.5 dB", "20 dB/m (가정 E-field)\n−31.5 dB/Ω (H-field)"],
            ["Connector, female", "BNC, 50 Ω nom.", "BNC, 50 Ω"],
            ["Measuring range", "1 MHz에서 1 V/m까지, 1 dB 압축\n더 높은 전계는 입력 감쇠기 옵션", "QP 검출, 9 kHz IF: 30 – 130 dBμV/m\nAV 검출, 200 Hz IF: 8 – 130 dBμV/m"],
            ["Loop diameter", "—", "0.5 m"],
            ["Power supply", "9.6 V / 1100 mAh NiMH", "12 V NiMH 1.9 Ah"],
            ["Operation time", "typ. 50시간 이상", "typ. 12시간"],
            ["Dimensions", "로드 1 m (나사 결합부 포함)\n앰프 상판 220 × 120 mm", "520 × 585 × 120 mm"],
            ["Weight", "로드 약 0.2 kg\n앰프 약 0.7 kg", "1.9 kg"],
            ["Threads for tripods", "1/4″, 3/8″", "1/4″, 3/8″"],
          ],
        },
      ],
    },
    efs: {
      lead: [
        "Frankonia EFS 전계강도계는 IEC/EN 61000-4-3 / -20에 따른 방사 내성 시험 중의 전계강도 측정과 전계 균일도 측정을 위해 설계되었습니다. 작업장이나 주거 공간의 전자파 노출량 측정에도 쓸 수 있습니다.",
        "EFS는 등방성 초소형 E-field 센서로, 센서 자체의 크기가 전계에 영향을 주지 않도록 만들어졌습니다. 광파이버 출력을 직접 내보내므로 별도의 계측 유닛조차 필요 없고, 제어 PC나 노트북의 USB 인터페이스에 곧바로 연결합니다.",
        "EFS-Laser는 선형화·온도보상·제어·통신 기능을 갖춘 빠르고 정확한 전계 프로브입니다. 잡음 저감과 온도보상으로 0.1 V/m까지 정확히 측정하며, 레이저 급전 방식이라 충전이나 배터리 교체 없이 절연 상태로 연속 동작합니다.",
      ],
      figure: {
        src: "/test-systems/images/efs-probe.webp",
        w: 360,
        h: 595,
        alt: "가느다란 흰색 삼각대에 올린 EFS 프로브, 센서 몸통이 손가락 굵기 정도",
        caption: "지름 17 mm에 25 g. 측정 대상인 전계를 흐트러뜨리지 않으려고 이만큼 작게 만든 것입니다.",
      },
      groups: [
        {
          title: "주요 특징",
          items: [
            "광파이버 링크로 PC 연결",
            "뛰어난 등방성 (typ. 0.3 dB)",
            "주파수 범위 10 kHz~26.5 GHz",
            "전계강도 측정 0.14~500 V/m",
            "충전 없이 최대 100시간 동작",
            "EFS-Laser는 레이저 급전 — 배터리 방전 없음, 실시간 연속 데이터 스트리밍, 온도 보상",
          ],
        },
      ],
      tables: [
        {
          title: "EFS-10 · EFS-100",
          head: ["", "EFS-10", "EFS-100"],
          rows: [
            ["Frequency range", "10 kHz – 9.25 GHz", "100 kHz – 9.25 GHz"],
            ["Dynamic range (single range)", "0.5 – 500 V/m (60 dB)", "0.14 – 140 V/m (60 dB)"],
            ["Flatness, frequency correction on", "0.05 – 7500 MHz: 0.4 dB", "0.3 – 7500 MHz: 0.4 dB"],
            ["Overload", "1000 V/m", "300 V/m"],
            ["Resolution", "0.01 V/m", "0.01 V/m"],
            ["Sensors", "6 monopoles", "6 monopoles"],
            ["Isotropicity", "0.5 dB (0.3 dB typical) at 50 MHz", "0.5 dB (0.3 dB typical) at 50 MHz"],
            ["Sampling rate", "22 S/s to 0.03 S/s\ndepending on filter setting", "22 S/s to 0.03 S/s\ndepending on filter setting"],
            ["Internal battery", "3 V / 5 mAh rechargeable Li-Mn", "3 V / 5 mAh rechargeable Li-Mn"],
            ["Operation time", "100 hours at 0.4 S/s, 28 Hz filter", "100 hours at 0.4 S/s, 28 Hz filter"],
            ["Communication", "bidirectional fibre optic link", "bidirectional fibre optic link"],
            ["Fibre optic length", "10 m standard, 20 / 40 m optional", "10 m standard, 20 / 40 m optional"],
            ["Dimensions", "53 mm overall, body 17 mm diameter", "53 mm overall, body 17 mm diameter"],
            ["Weight", "25 g including 1 m pigtail", "25 g including 1 m pigtail"],
          ],
        },
        {
          title: "EFS-300 · EFS-500",
          note: "EFS-300의 동적 범위를 본사가 두 곳에서 다르게 적고 있습니다 — 제품 페이지는 1.5~1500 V/m, 개요 페이지는 0.17~170 V/m. 여기서는 제품 페이지를 따랐습니다. 견적서와 대조해 확인하시기 바랍니다.",
          head: ["", "EFS-300", "EFS-500"],
          rows: [
            ["Frequency range", "300 kHz – 18 GHz", "300 kHz – 26.5 GHz"],
            ["Dynamic range (single range)", "1.5 – 1500 V/m (60 dB)", "0.4 – 800 V/m (66 dB)"],
            ["Flatness, frequency correction on", "0.05 – 7500 MHz: 0.4 dB", "0.3 – 26500 MHz: 0.4 dB"],
            ["Overload", "350 V/m", "1600 V/m"],
            ["Resolution", "0.01 V/m", "0.01 V/m"],
            ["Sensors", "6 monopoles", "6 monopoles"],
            ["Sampling rate", "22 S/s to 0.03 S/s", "22 S/s to 0.03 S/s"],
            ["Operation time", "100 hours at 0.4 S/s, 28 Hz filter", "100 hours at 0.4 S/s, 28 Hz filter"],
            ["Dimensions", "53 mm overall, body 17 mm diameter", "53 mm overall, body 17 mm diameter"],
            ["Weight", "25 g including 1 m pigtail", "25 g including 1 m pigtail"],
          ],
        },
        {
          title: "EFS-Laser",
          head: ["", "사양"],
          rows: [
            ["Frequency range", "10 kHz … 6 GHz"],
            ["Field strength", "10 kHz … 100 MHz: < 1 V/m … > 10 kV/m\n100 MHz … 6 GHz: < 0.1 V/m … > 700 V/m"],
            ["Damage level", "100 MHz 이하 40 kV/m, 그 이상 10 kV/m"],
            ["Dynamic range", "100 MHz 이하 80 … 100 dB, 그 이상 70 … 80 dB"],
            ["Isotropy at 900 MHz", "< 1 dB"],
            ["Resolution", "< 0.01 dB"],
            ["Linearity error", "< 0.1 dB"],
            ["Sampling rate", "burst 2 MSample/s, streaming > 500 kSample/s"],
            ["Laser wavelength / output power", "850 nm / 750 mW"],
            ["Fibre optic cable length", "15 m, 요청 시 100 m까지"],
            ["PC interface", "USB 2.0"],
            ["Sensor dimensions (W × D × H)", "67 × 67 × 124 mm"],
          ],
        },
      ],
    },
    preamp: {
      lead: [
        "FPA 계열은 이득이 높고 내부 잡음이 낮은 범용 광대역 프리앰프입니다. 2/6 GHz까지의 넓은 대역으로 CISPR 22 측정에 대응하며, 이득이 높고 잡음지수가 낮아 시스템 잡음이 케이블·리시버 등 다른 구성요소에 거의 좌우되지 않습니다. CISPR 25처럼 한계값이 매우 낮은 측정에서 특히 유용하고, 이때는 안테나에 직결합니다.",
        "FPA-2와 FPA-6A는 의도치 않은 정전기 방전으로 인한 손상을 막기 위해 ESD 보호가 되어 있습니다. FPA-6B는 9 kHz~6 GHz 대역을 갖지만 기술적 이유로 ESD 보호가 불가하므로 취급에 주의가 필요합니다. 프리앰프는 본래 ESD에 민감한 장비이므로 동축 케이블을 연결하기 전에 반드시 방전시켜야 합니다.",
      ],
      figure: {
        src: "/test-systems/images/preamp-fpa.webp",
        w: 1200,
        h: 920,
        alt: "FPA 프리앰프 — 양 끝에 N형 플랜지 커넥터가 달린 금속 하우징, 뚜껑에 각인된 명판",
        caption: "알루미늄 하우징에 N형 플랜지. 12 V 전원을 리니어 방식으로 쓰는 것은 의도된 것입니다 — 스위칭 전원은 이 앰프가 측정하려는 잡음 레벨 자체를 올립니다.",
      },
      groups: [],
      tables: [
        {
          title: "FPA-2 · FPA-6A · FPA-6B",
          note: "FPA-18, FPA-26, FPA-40이 40 GHz까지 이어집니다. 해당 수치는 위 모델 목록에 있습니다.",
          head: ["", "FPA-2", "FPA-6A", "FPA-6B"],
          rows: [
            ["Frequency range", "9 kHz – 2 GHz", "10 MHz – 6 GHz", "9 kHz – 6 GHz"],
            ["Noise figure", "2.5 dB (1.0 GHz)", "2.5 dB (1.0 GHz)", "2.5 dB (1.0 GHz)"],
            ["Gain", "+ 30 dB", "+ 28 dB", "+ 28 dB"],
            ["Amplitude flatness", "< ± 3 dB", "< ± 3 dB", "< ± 3 dB"],
            ["1 dB compression point at input", "≥ −20 dBm (87 dBμV)", "≥ −18 dBm (89 dBμV)", "> 100 dBμV"],
            ["Impedance", "50 Ω", "50 Ω", "50 Ω"],
            ["VSWR input / output", "< 2:1", "< 2:1", "< 2:1"],
            ["Power supply", "+ 12 V (± 2 V)", "+ 12 V (± 2 V)", "+ 12 V (± 2 V)"],
            ["Current consumption", "< 120 mA", "< 130 mA", "< 120 mA"],
          ],
        },
      ],
    },
    meter: {
      lead: [
        "PMS 1084는 기본 사양이 2채널 RF 파워미터로, 100 kHz~6 GHz(PMS 1084 B는 10 kHz~500 MHz) 대역을 −60 dBm에서 +20 dBm까지 측정합니다. 언제든 최대 4채널까지 확장할 수 있습니다. IEC/EN 61000-4-3 / -6 내성 시험 시스템에서 순방향·역방향 전력을 자동 측정하는 데 적합합니다.",
        "RSU 릴레이 스위칭 유닛은 입력 하나를 2~3개 출력으로 전환합니다(수동 또는 원격). 앰프·안테나·파워미터를 바꿔 가며 쓰는 계측 시스템에서 주로 쓰이며, 케이블을 잘못 연결해 생기는 회로 사고도 막아 줍니다.",
      ],
      figure: {
        src: "/test-systems/images/meter-pms-1084.webp",
        w: 1600,
        h: 249,
        alt: "1U 랙 유닛 형태의 PMS 1084, 전면 패널에 “RF Power Meter” 표기",
        caption: "1U 높이에 기본 2채널, 최대 4채널 — 앰프 두 대의 순방향·역방향을 동시에 보는 데 필요한 수입니다.",
      },
      groups: [],
      tables: [
        {
          title: "PMS 1084 · PMS 1084 B",
          head: ["", "PMS 1084", "PMS 1084 B"],
          rows: [
            ["Number of channels", "2 standard, up to 4 optional", "2 standard, up to 4 optional"],
            ["Frequency range", "100 kHz – 6 GHz", "10 kHz – 500 MHz"],
            ["Measuring range", "−60 dBm to +20 dBm (10 kHz ≤ f ≤ 4 GHz)\n−45 dBm to +20 dBm (4 GHz < f ≤ 6 GHz)", "−60 dBm to +20 dBm"],
            ["Accuracy", "± 1 dB (0.5 dB typical)", "± 1 dB (0.5 dB typical)"],
            ["Resolution", "0.1 dB", "0.1 dB"],
            ["Integration time", "0.5 – 200 ms (firmware)", "0.5 – 200 ms (firmware)"],
            ["Max. input level", "+27 dBm (= 500 mW)", "+27 dBm (= 500 mW)"],
            ["VSWR", "1:1.15 to 2 GHz\n1:1.25 over 2 – 4 GHz\n1:1.35 over 4 – 6 GHz", "1:1.15"],
            ["Interface (PC)", "USB, RS232", "USB, RS232"],
            ["Input", "N-type female connector", "N-type female connector"],
            ["Dimensions (D × W × H)", "172 × 482.6 × 44.3 mm", "172 × 482.6 × 44.3 mm"],
            ["Weight", "approx. 2.5 kg", "approx. 2.5 kg"],
          ],
        },
        {
          title: "RSU 릴레이 스위칭 유닛",
          note: "기본 DC~12.4 GHz, 옵션으로 18 GHz 또는 40 GHz까지. 2출력 또는 3출력 릴레이를 최대 4개까지 탑재하며, 시험 레벨은 연속 50 V·1초간 300 V입니다.",
          head: ["", "DC … 1 GHz", "1 … 5 GHz", "5 … 10 GHz", "10 … 12.4 GHz"],
          rows: [
            ["VSWR", "< 1.04", "< 1.14", "< 1.3", "< 1.5"],
            ["Isolation", "> 90 dB", "> 80 dB", "> 70 dB", "> 70 dB"],
            ["Insertion loss", "< 0.05 dB", "< 0.1 dB", "< 0.2 dB", "< 0.3 dB"],
            ["Max. power input", "< 1.00 kW", "< 0.44 kW", "< 0.31 kW", "< 0.28 kW"],
          ],
        },
      ],
    },
    system: {
      lead: [
        "CIT-100은 IEC/EN 61000-4-6, ISO 11452-4, MIL-STD 461 CS114 등에 따른 전도 RF 내성 시험과 BCI 시험을 위한 완성형 시험 시스템입니다. 신호발생기(4 kHz~1.2 GHz), RF 파워앰프(25 / 75 W), 3채널 RF 파워미터, 방향성 결합기와 제어 소프트웨어가 내장되어 있습니다.",
        "PSG-300은 대역폭이 넓은(DC~300 kHz) 선형 정밀 파워앰프로, 높은 출력에서 빠르게 변하는 신호가 필요한 모든 용도에 쓰입니다. 응용 소프트웨어는 범용 파워 제너레이터 용도와 IEC/EN 61000-4-16, IEC/EN 61543 내성 시험에 대응합니다.",
        "MTS-800은 자기장의 광대역 발생과 측정을 함께 하는 컴팩트 시험 시스템으로, 삼축 Helmholtz 코일과 조합하면 DC~1 kHz에서 1000 A/m에 이릅니다.",
      ],
      figure: {
        src: "/test-systems/images/system-cit-100.webp",
        w: 1600,
        h: 609,
        alt: "19인치 케이스에 든 CIT-100, 전면 패널에 “Conducted Immunity Test System” 표기",
        caption: "61000-4-6 시험 체인 전체가 한 케이스에. 그러면서 안의 계측기를 각각 개별 커넥터로 따로 쓸 수 있습니다.",
      },
      figureRow: [
        {
          src: "/test-systems/images/system-psg-300.webp",
          w: 1400,
          h: 554,
          alt: "“Power Signal Generator DC … 300 kHz” 표기가 있는 PSG-300 전면 패널",
          caption: "PSG-300 — 250 W, PSG-300A는 800 W.",
        },
        {
          src: "/test-systems/images/system-mts-800.webp",
          w: 1400,
          h: 782,
          alt: "“Magnetic Test System” 표기가 있는 MTS-800 전면 패널 — 바나나 잭과 BNC 입력",
          caption: "MTS-800 — 1000 A/m까지의 자기장을 한 대가 만들고 또 측정합니다.",
        },
        {
          src: "/test-systems/images/meter-rsu.webp",
          w: 1600,
          h: 669,
          alt: "N형 커넥터 릴레이 블록 네 개가 배열된 RSU 후면 패널",
          caption: "RSU — 앰프 여러 대를 쓰는 시험대에서 케이블을 손으로 갈아 끼우지 않게 해 주는 장비.",
        },
      ],
      groups: [
        {
          title: "CIT-100",
          items: [
            "IEC/EN 61000-4-6 전도 RF 내성 시험, ISO 11452-4와 MIL-STD 461 CS 114 BCI 시험",
            "신호발생기·RF 파워앰프·RF 파워미터·방향성 결합기를 19″ 케이스 하나에",
            "내장 계측기는 기존 입출력 커넥터를 통해 각각 따로 사용 가능",
            "옵션 넷북과 함께 단독 운용 가능",
            "주요 파라미터는 내장 디스플레이에 표시",
            "EUT 자동 모니터링, CDN 전 라인업 공급",
          ],
        },
        {
          title: "PSG-300",
          items: [
            "DC / AC 전원선 시뮬레이션",
            "피에조 액추에이터 구동",
            "Helmholtz 코일 등으로 자기장 발생",
            "IEC/EN 61000-4-16, IEC/EN 61000-4-19, IEC/EN 61543 내성 시험",
            "단락·과부하 보호, 완전 선형 저잡음 설계, 뛰어난 DC 안정도",
          ],
        },
      ],
      tables: [
        {
          title: "CIT-100",
          head: ["", "사양"],
          rows: [
            ["RF generator — outputs", "2 × SMA, 동시 사용은 하나만"],
            ["RF generator — frequency range", "4 kHz to 1.2 GHz"],
            ["RF generator — frequency resolution", "1 Hz"],
            ["RF generator — output level", "0 to −63 dBm, resolution 0.1 dB"],
            ["RF generator — harmonics / spurious", "< 30 dBc / < 45 dBc"],
            ["LF generator (modulation)", "1 Hz to 100 kHz, sine / square / triangular, 0 … 1 V"],
            ["Amplitude modulation", "internal 0 – 100 %, resolution 1 %"],
            ["Internal RF power amplifier", "25 W · 75 W 모듈 기본 제공"],
            ["RF voltmeter 1 (test level)", "4 kHz to 1.2 GHz, −40 to +30 dBm"],
            ["RF voltmeter 2 + 3 (forward, reverse)", "4 kHz to 1.2 GHz, −40 to +30 dBm\n방향성 결합기 typ. 40 dB 포함"],
            ["EUT monitor input", "0 – 10 V, resolution 2.5 mV, 100 kΩ"],
            ["Interfaces", "USB 2.0, LAN 100 Mbit, GPIB 옵션"],
          ],
        },
        {
          title: "PSG-300 · PSG-300A",
          note: "PSG-E300 옵션은 단시간 시험용 외부 전원(300 V, DC / 16⅔ / 50 / 60 Hz)을, PSG-EXT는 그 외부 전원의 위상 제어 스위칭을 추가합니다.",
          head: ["", "PSG-300", "PSG-300A"],
          rows: [
            ["Power bandwidth", "DC – 200 kHz", "DC – 200 kHz"],
            ["Slew rate", "100 V/μs", "100 V/μs"],
            ["Gain", "10 ± 0.1 %", "10 ± 0.1 %"],
            ["Output voltage", "50 Veff / ± 75 Vpeak", "50 Veff / ± 75 Vpeak"],
            ["Output current", "5 Aeff / ± 7.5 Apeak", "16 Aeff / ± 23 Apeak"],
            ["Power output", "250 W", "800 W"],
            ["Distortion", "< 0.10 %", "< 0.10 %"],
            ["Generator frequency range", "DC, 0.05 Hz – 300 kHz", "DC, 0.05 Hz – 300 kHz"],
            ["Waveform", "sine, square, triangle", "sine, square, triangle"],
            ["Remote control", "USB connector", "USB connector"],
            ["Dimensions (L × W × D)", "448.9 × 132.55 × 435.5 mm", "448.9 × 177 × 585.5 mm"],
            ["Weight", "approx. 14 kg", "approx. 30 kg"],
          ],
        },
      ],
    },
  },
};

/** Column headings for the Test Systems mega dropdown. The captions under each
 *  link come from the test category's and the product family's own meta. */
export const testNavCopy = {
  ko: {
    byTest: "시험 항목별",
    byProduct: "제품군별",
  },
  en: {
    byTest: "By Test",
    byProduct: "By Product",
  },
} as const;

/** Paths, relative to the locale root. */
export const testSystemsPath = "/test-systems";
export const testCategoryPath = (c: TestCategory) => `/test-systems/test/${c}`;
export const testProductPath = (p: TestProduct) => `/test-systems/product/${p}`;
export const testStandardsPath = "/test-systems/standards";
