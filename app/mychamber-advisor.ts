import type { ChamberIndustry, ChamberType } from "./chamber-sections";
import type { Lang } from "./site-config";

/**
 * The MyChamber questionnaire and the engine that turns its answers into a
 * chamber recommendation.
 *
 * ## Why this is scoring and not a decision tree
 *
 * A tree would need one branch per combination of industry, test, size,
 * distance and standard — and the catalogue does not split that cleanly: the
 * MIL-STD Chamber Advanced is a military chamber that also meets the
 * commercial and automotive test-site requirements, the CTC is filed under
 * Commercial and built for automotive and military components, and every
 * reverberation chamber crosses two industries at once. Scoring says all of
 * that as data — `alsoIndustries`, one line — where a tree would have to
 * duplicate a whole branch to say it.
 *
 * The engine therefore does two things in order:
 *
 *   1. **Hard filters**, for the answers where a chamber is not merely a worse
 *      fit but physically cannot do the job: a chamber smaller than the EUT, a
 *      reverberation chamber asked for a compliant radiated-emission
 *      measurement at a defined distance, a 3 m chamber asked for 10 m, an
 *      E-Drive chamber built around a load machine the customer is not using.
 *      These return no result at all rather than a bad one.
 *   2. **Weighted scoring** over what is left, so the answer is a ranked
 *      shortlist with the reason for each place in it, not a single verdict.
 *      A reader who disagrees with the first result can see the second.
 *
 * ## Why the question set is this short
 *
 * Everything the engine needs is five facts: the industry, the tests, the size
 * of the EUT, the measurement distance, and the load machine. Three of those
 * are asked of everyone; the other two are asked only of the readers they
 * apply to — the distance question only appears once a radiated *emission*
 * test is selected (nothing else in the catalogue is specified by distance),
 * and the load-machine question only once Powertrain is. Standards are asked
 * last and pre-ticked from the answers already given, because a reader who has
 * said "automotive" and "radiated emission" has already told us CISPR 25 — so
 * that step is a confirmation, and it is skippable.
 *
 * That is four questions for the shortest path and six for the longest.
 *
 * ## What this file may not do
 *
 * Every figure it reasons about — size, frequency range, quiet zone, test
 * distance — comes from `chamberModels` in chamber-sections.ts, which is the
 * 2026 catalogue. Nothing here invents a specification. `modelFit` below is an
 * *index* of the catalogue: which tests a model performs, at what distances,
 * against which standards. Where the catalogue is silent, so is the index —
 * see the `caveat` entries, which say out loud where a model's compliance is
 * partial rather than letting the recommendation imply more than the source.
 */

/* ------------------------------------------------------------------ *
 * Answer axes
 * ------------------------------------------------------------------ */

/** The four EMC test kinds, in the order the questionnaire lists them:
 *  conducted immunity, radiated immunity, conducted emission, radiated
 *  emission. */
export const testKinds = ["ci", "ri", "ce", "re"] as const;
export type TestKind = (typeof testKinds)[number];

/** EUT scale, smallest first. The order is load-bearing: a chamber that takes
 *  a vehicle also takes a component, so the engine compares indexes. */
export const dutSizes = ["component", "equipment", "vehicle", "large-vehicle"] as const;
export type DutSize = (typeof dutSizes)[number];

/** Measurement distances the catalogue specifies chambers at. 1 m is the
 *  component-level distance CISPR 25 and MIL-STD-461 work at; 3, 5 and 10 m
 *  are the test-site distances. */
export const distances = ["1m", "3m", "5m", "10m"] as const;
export type Distance = (typeof distances)[number];
export type DistanceAnswer = Distance | "pre" | "unsure";

/** Chamber family. `shielded` is the Shielded Room, which is a room and not a
 *  test site — it performs no EMC test and is therefore never recommended. */
export type Family = "anechoic" | "reverberation" | "shielded";
export type FamilyAnswer = "anechoic" | "reverberation" | "unsure";

/** E-Drive load machine setup — the one thing that separates the three EDTC
 *  chambers from each other. */
export const drives = ["single", "eaxle", "bluebox"] as const;
export type Drive = (typeof drives)[number];
export type DriveAnswer = Drive | "unsure";

/* ------------------------------------------------------------------ *
 * Standards
 * ------------------------------------------------------------------ */

/**
 * The standards the questionnaire offers, and what each one implies.
 *
 * `industries` and `tests` are what the suggestion runs on: a standard is
 * pre-ticked when the reader has selected one of its industries *and* one of
 * its tests. An empty `industries` means the standard is never suggested and
 * can only be ticked by hand — EN 50147-1 is shielding attenuation, which is a
 * property of every chamber here rather than a test anybody chooses one for.
 *
 * Designations are not translated in either locale. They are what a reader
 * matches against a drawing, a quotation and an accreditation certificate.
 */
export const standards = [
  { id: "cispr25", name: "CISPR 25 / EN 55025", industries: ["automotive", "powertrain"], tests: ["ce", "re"],
    hint: { ko: "차량 전장부품 방출, 1 m 부품 시험", en: "Vehicle component emission, 1 m component test" } },
  { id: "cispr12", name: "CISPR 12 / EN 55012", industries: ["automotive"], tests: ["ce", "re"],
    hint: { ko: "완성차 방출", en: "Whole-vehicle emission" } },
  { id: "ecer10", name: "ECE R10", industries: ["automotive"], tests: ["ci", "ri", "ce", "re"],
    hint: { ko: "차량 EMC 형식승인", en: "Vehicle EMC type approval" } },
  { id: "iso11452", name: "ISO 11452-2", industries: ["automotive", "powertrain"], tests: ["ri"],
    hint: { ko: "부품 방사 내성 (무향실)", en: "Component radiated immunity, absorber-lined chamber" } },
  { id: "iso11451", name: "ISO 11451-2", industries: ["automotive"], tests: ["ri"],
    hint: { ko: "완성차 방사 내성", en: "Whole-vehicle radiated immunity" } },
  { id: "iso1145211", name: "ISO 11452-11", industries: ["automotive", "powertrain"], tests: ["ri"],
    hint: { ko: "부품 방사 내성 (잔향실)", en: "Component radiated immunity, reverberation chamber" } },
  { id: "mil461", name: "MIL-STD-461", industries: ["military"], tests: ["ci", "ri", "ce", "re"],
    hint: { ko: "군수 EMC — RE/RS/CE/CS", en: "Defence EMC — RE / RS / CE / CS" } },
  { id: "do160", name: "RTCA DO-160", industries: ["military"], tests: ["ci", "ri", "ce", "re"],
    hint: { ko: "항공 탑재 장비", en: "Airborne equipment" } },
  { id: "cispr32", name: "CISPR 32 / EN 55032", industries: ["commercial"], tests: ["ce", "re"],
    hint: { ko: "멀티미디어 기기 방출", en: "Multimedia equipment emission" } },
  { id: "iec61000_4_3", name: "IEC / EN 61000-4-3", industries: ["commercial", "automotive", "powertrain"], tests: ["ri"],
    hint: { ko: "방사 전자기장 내성", en: "Radiated RF field immunity" } },
  { id: "iec61000_4_21", name: "IEC / EN 61000-4-21", industries: ["commercial", "automotive", "military"], tests: ["ri"],
    hint: { ko: "잔향실 시험법", en: "Reverberation chamber test method" } },
  { id: "cispr16", name: "CISPR 16-1-4", industries: ["commercial", "automotive"], tests: ["re"],
    hint: { ko: "시험장 적합성 검증 (NSA/sVSWR)", en: "Test site validation — NSA / sVSWR" } },
  { id: "en50147", name: "EN 50147-1 / IEEE 299", industries: [], tests: [],
    hint: { ko: "차폐 감쇠량 측정", en: "Shielding attenuation measurement" } },
] as const satisfies readonly {
  id: string;
  name: string;
  industries: readonly ChamberIndustry[];
  tests: readonly TestKind[];
  hint: Record<Lang, string>;
}[];

export type StandardId = (typeof standards)[number]["id"];

export const standardName = (id: StandardId) =>
  standards.find((s) => s.id === id)!.name;

/* ------------------------------------------------------------------ *
 * Answers
 * ------------------------------------------------------------------ */

export type Answers = {
  industries: readonly ChamberIndustry[];
  tests: readonly TestKind[];
  dut?: DutSize;
  distance?: DistanceAnswer;
  family?: FamilyAnswer;
  drive?: DriveAnswer;
  /**
   * `undefined` means the reader has not touched the standards step yet, and
   * the suggestion below stands in for it — including in the scoring, so the
   * result is the same whether they confirmed the suggestion or skipped it.
   * The moment they tick or untick anything it becomes an explicit list, empty
   * included.
   */
  standards?: readonly StandardId[];
};

export const emptyAnswers: Answers = { industries: [], tests: [] };

/** The standards the answers already imply. See the note on `Answers.standards`. */
export const suggestStandards = (a: Answers): StandardId[] =>
  standards
    .filter(
      (s) =>
        s.industries.some((i) => a.industries.includes(i)) &&
        s.tests.some((t) => a.tests.includes(t)),
    )
    .map((s) => s.id);

/** What the engine actually scores against — the reader's list if they made
 *  one, the suggestion otherwise. */
export const effectiveStandards = (a: Answers): readonly StandardId[] =>
  a.standards ?? suggestStandards(a);

/* ------------------------------------------------------------------ *
 * Questions
 * ------------------------------------------------------------------ */

export type QuestionId = "industries" | "tests" | "dut" | "distance" | "family" | "drive" | "standards";

export type Option = {
  id: string;
  label: Record<Lang, string>;
  note?: Record<Lang, string>;
};

export type Question = {
  id: QuestionId;
  /** Checkboxes when true, radio buttons when false. */
  multi: boolean;
  /** May be left empty and still advance. Only the standards step is. */
  optional?: boolean;
  kicker: Record<Lang, string>;
  title: Record<Lang, string>;
  hint?: Record<Lang, string>;
  options: readonly Option[];
  /** Absent means the question is asked of everyone. */
  when?: (a: Answers) => boolean;
};

export const questions: readonly Question[] = [
  {
    id: "industries",
    multi: true,
    kicker: { ko: "적용 분야", en: "Application" },
    title: {
      ko: "어떤 종류의 제품을 시험하시나요?",
      en: "What kind of product are you testing?",
    },
    hint: {
      ko: "해당하는 분야를 모두 선택하세요. 두 분야를 함께 다루는 챔버도 있습니다.",
      en: "Select every field that applies — several chambers serve two of them at once.",
    },
    options: [
      { id: "automotive", label: { ko: "Automotive", en: "Automotive" },
        note: { ko: "차량·전장부품", en: "Vehicles and vehicle components" } },
      { id: "military", label: { ko: "Military", en: "Military" },
        note: { ko: "군수·방산·항공", en: "Defence, aerospace" } },
      { id: "commercial", label: { ko: "Commercial", en: "Commercial" },
        note: { ko: "일반 산업·전자기기", en: "Industrial and consumer electronics" } },
      { id: "powertrain", label: { ko: "Powertrain", en: "Powertrain" },
        note: { ko: "전기차 구동계·모터", en: "Electric drivetrains and motors" } },
    ],
  },
  {
    id: "tests",
    multi: true,
    kicker: { ko: "시험 종류", en: "Test kind" },
    title: {
      ko: "어떤 EMC 시험을 하시나요?",
      en: "Which EMC tests do you run?",
    },
    hint: {
      ko: "내성(Immunity)은 전자파를 걸어 견디는지 보는 시험, 방출(Emission)은 제품이 내보내는 전자파를 재는 시험입니다.",
      en: "Immunity applies a field and checks the product survives it; emission measures what the product radiates.",
    },
    options: [
      { id: "ci", label: { ko: "내성 — 전도(Conducted immunity)", en: "Conducted immunity" },
        note: { ko: "케이블로 주입 · BCI, CS", en: "Injected on the cabling — BCI, CS" } },
      { id: "ri", label: { ko: "내성 — 방사(Radiated immunity)", en: "Radiated immunity" },
        note: { ko: "안테나로 조사 · RS, IEC 61000-4-3", en: "Applied by antenna — RS, IEC 61000-4-3" } },
      { id: "ce", label: { ko: "방출 — 전도(Conducted emission)", en: "Conducted emission" },
        note: { ko: "전원·신호선 방출 · CE, LISN", en: "From power and signal lines — CE, LISN" } },
      { id: "re", label: { ko: "방출 — 방사(Radiated emission)", en: "Radiated emission" },
        note: { ko: "공간 방사 측정 · RE", en: "Measured over the air — RE" } },
    ],
  },
  {
    id: "dut",
    multi: false,
    kicker: { ko: "피시험체", en: "EUT" },
    title: {
      ko: "시험대상체(DUT)의 크기는 어느 정도인가요?",
      en: "How large is the equipment under test?",
    },
    hint: {
      ko: "가장 큰 피시험체를 기준으로 선택하세요. 챔버 크기와 정합 거리를 결정하는 값입니다.",
      en: "Answer for the largest EUT you will test — this is what sets the chamber size and the test distance.",
    },
    options: [
      { id: "component", label: { ko: "부품 · 테이블탑 (~1 m)", en: "Component, table-top (up to ~1 m)" },
        note: { ko: "ECU, 모듈, 소형 기기", en: "ECUs, modules, small equipment" } },
      { id: "equipment", label: { ko: "거치형 · 대형 기기 (~2 m)", en: "Floor-standing equipment (up to ~2 m)" },
        note: { ko: "가전, 산업 장비, 캐비닛", en: "Appliances, industrial equipment, cabinets" } },
      { id: "vehicle", label: { ko: "차량 · 대형 피시험체 (~5 m)", en: "Vehicle-scale EUT (up to ~5 m)" },
        note: { ko: "승용차, 이륜차, 대형 어셈블리", en: "Passenger cars, motorcycles, large assemblies" } },
      { id: "large-vehicle", label: { ko: "대형 차량 (버스 · 트럭 · 장갑차)", en: "Large vehicles — buses, trucks, armour" },
        note: { ko: "맞춤 설계 구간", en: "The custom-size range" } },
    ],
  },
  {
    // Only radiated emission is specified by a distance. Asking everyone would
    // be asking most readers a question that cannot change their answer.
    id: "distance",
    multi: false,
    when: (a) => a.tests.includes("re"),
    kicker: { ko: "측정 거리", en: "Measurement distance" },
    title: {
      ko: "방사 방출은 어느 측정 거리에서 하시나요?",
      en: "At what distance do you measure radiated emission?",
    },
    hint: {
      ko: "규격이 정한 안테나–피시험체 거리입니다. 정온 영역(quiet zone)과 챔버 크기가 여기서 결정됩니다.",
      en: "The antenna-to-EUT distance the standard prescribes. It sets the quiet zone, and with it the chamber.",
    },
    options: [
      { id: "1m", label: { ko: "1 m — 부품 시험", en: "1 m — component level" },
        note: { ko: "CISPR 25, MIL-STD-461", en: "CISPR 25, MIL-STD-461" } },
      { id: "3m", label: { ko: "3 m", en: "3 m" },
        note: { ko: "가장 널리 쓰이는 정식 인증 거리", en: "The most common full-compliance distance" } },
      { id: "5m", label: { ko: "5 m", en: "5 m" },
        note: { ko: "3 m와 5 m를 함께 쓰는 구성", en: "Chambers covering 3 m and 5 m together" } },
      { id: "10m", label: { ko: "10 m", en: "10 m" },
        note: { ko: "완성차, 대형 피시험체, CISPR 16-1-4", en: "Whole vehicles, large EUTs, CISPR 16-1-4" } },
      { id: "pre", label: { ko: "사전 인증만 (pre-compliance)", en: "Pre-compliance only" },
        note: { ko: "개발 단계 스크리닝 — 컴팩트 챔버", en: "Development screening — the compact chambers" } },
      { id: "unsure", label: { ko: "아직 정하지 못했습니다", en: "Not decided yet" },
        note: { ko: "규격에서 역산해 제안드립니다", en: "We will derive it from the standards instead" } },
    ],
  },
  {
    // Asked only where a reverberation chamber is actually on the table: it
    // performs no compliant radiated-emission measurement at a distance, so
    // once that test is selected the answer is already fixed and the question
    // would be theatre.
    id: "family",
    multi: false,
    when: (a) => a.tests.includes("ri") && !a.tests.includes("re"),
    kicker: { ko: "챔버 형식", en: "Chamber form" },
    title: {
      ko: "원하시는 챔버 형식이 있으신가요?",
      en: "Do you have a chamber form in mind?",
    },
    hint: {
      ko: "방사 내성만 하신다면 잔향실이 선택지가 됩니다. 같은 증폭기로 훨씬 높은 전계를 얻고 시험 시간이 짧지만, 방사 방출 정식 측정에는 쓸 수 없습니다.",
      en: "For radiated immunity alone a reverberation chamber is a real option: far higher field strength from the same amplifier, and a shorter test — but it cannot make a compliant radiated-emission measurement.",
    },
    options: [
      { id: "anechoic", label: { ko: "무향 챔버 (Anechoic)", en: "Anechoic chamber" },
        note: { ko: "결정론적 시험 · 편파와 조사 방향이 정해짐", en: "Deterministic — defined polarisation and direction" } },
      { id: "reverberation", label: { ko: "잔향실 (RVC)", en: "Reverberation chamber (RVC)" },
        note: { ko: "통계적 시험 · 고전계, IEC 61000-4-21", en: "Statistical — high field strength, IEC 61000-4-21" } },
      { id: "unsure", label: { ko: "잘 모르겠습니다", en: "Not sure" },
        note: { ko: "시험 내용에 맞춰 제안드립니다", en: "We will choose from the tests you selected" } },
    ],
  },
  {
    id: "drive",
    multi: false,
    when: (a) => a.industries.includes("powertrain"),
    kicker: { ko: "구동계 구성", en: "Drivetrain setup" },
    title: {
      ko: "구동계 시험은 어떤 부하 구성인가요?",
      en: "Which load setup does the drivetrain test use?",
    },
    hint: {
      ko: "E-Drive 챔버는 부하기(load machine) 구성으로 나뉩니다. 이 답 하나로 EDTC 세 모델이 갈립니다.",
      en: "The E-Drive chambers differ by their load machine — this one answer separates the three EDTC models.",
    },
    options: [
      { id: "single", label: { ko: "단일 모터 · 고정 샤프트", en: "Single motor, fixed shaft" },
        note: { ko: "외부 부하기 1대 (예: 250 kW)", en: "One external load machine, e.g. 250 kW" } },
      { id: "eaxle", label: { ko: "e-axle · 2축", en: "E-axle, two shafts" },
        note: { ko: "외부 부하기 2대", en: "Two external load machines" } },
      { id: "bluebox", label: { ko: "이동식 부하기 (EMC-BlueBox)", en: "Mobile load machine (EMC-BlueBox)" },
        note: { ko: "동적 시험 · 최대 120 kW", en: "Dynamic testing, up to 120 kW" } },
      { id: "unsure", label: { ko: "아직 정하지 못했습니다", en: "Not decided yet" },
        note: { ko: "세 구성을 함께 제안드립니다", en: "We will show all three" } },
    ],
  },
  {
    // Last, optional, and pre-ticked from everything above — see the note on
    // `Answers.standards`.
    id: "standards",
    multi: true,
    optional: true,
    kicker: { ko: "적용 규격", en: "Standards" },
    title: {
      ko: "만족해야 하는 시험 규격을 확인해 주세요.",
      en: "Check the standards you have to satisfy.",
    },
    hint: {
      ko: "앞선 답변에서 해당할 만한 규격을 미리 선택해 두었습니다. 더하거나 빼시고, 확실하지 않으면 그대로 넘어가셔도 됩니다.",
      en: "The ones your answers imply are ticked already. Add or remove any — or leave them as they are and move on.",
    },
    options: standards.map((s) => ({
      id: s.id,
      label: { ko: s.name, en: s.name },
      note: s.hint,
    })),
  },
];

/** The questions this set of answers actually asks. Recomputed on every
 *  change, so unticking the last radiated-emission box removes the distance
 *  step rather than leaving a dead answer behind. */
export const visibleQuestions = (a: Answers): readonly Question[] =>
  questions.filter((q) => !q.when || q.when(a));

/**
 * Drop the answers to questions that are no longer asked.
 *
 * Removing a step from the flow is not enough: a reader who selected radiated
 * emission, answered "10 m", then went back and unticked it would otherwise
 * still be filtered against a 10 m requirement they can no longer see, and
 * every 3 m chamber would vanish from the result for no visible reason. Every
 * write to the answers goes through here.
 */
export const prune = (a: Answers): Answers => {
  const asked = new Set(visibleQuestions(a).map((q) => q.id));
  return {
    ...a,
    distance: asked.has("distance") ? a.distance : undefined,
    family: asked.has("family") ? a.family : undefined,
    drive: asked.has("drive") ? a.drive : undefined,
  };
};

/* ------------------------------------------------------------------ *
 * The catalogue index
 * ------------------------------------------------------------------ */

/**
 * What the engine knows about a model beyond its catalogue entry.
 *
 * `full` and `pre` are kept apart on purpose. The CHC measures emission only
 * pre-compliantly while its immunity is fully compliant, and a recommendation
 * that folded those together would tell a reader they can certify in a chamber
 * they can only screen in.
 */
export type Fit = {
  family: Family;
  /** EUT scales the chamber takes. */
  dut: readonly DutSize[];
  /** Tests it performs to full compliance. */
  full: readonly TestKind[];
  /** Tests it performs pre-compliantly only. */
  pre: readonly TestKind[];
  /** Measurement distances the catalogue specifies it at. Empty for the
   *  reverberation chambers, which have no distance concept at all. */
  distances: readonly Distance[];
  /** True where the model is a pre-compliance instrument by design. */
  precompliance?: boolean;
  standards: readonly StandardId[];
  /** Industries beyond the model's own tag that the catalogue text names. */
  alsoIndustries?: readonly ChamberIndustry[];
  drive?: Drive;
  /** Where the catalogue's compliance claim is narrower than the row above
   *  would suggest. Printed on the result card, verbatim. */
  caveat?: Record<Lang, string>;
};

const ALL: readonly TestKind[] = testKinds;

/**
 * One entry per model in `chamberModels`. Coverage is checked where the
 * catalogue and this index are joined (mychamber-content.tsx), so adding a
 * chamber without indexing it fails the build rather than quietly dropping it
 * out of every recommendation.
 */
export const modelFit: Record<string, Fit> = {
  /* Automotive */
  ACTC: {
    family: "anechoic", dut: ["component"], full: ALL, pre: [], distances: ["1m"],
    standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["powertrain"],
  },
  UCC: {
    family: "anechoic", dut: ["component"], full: ["ci", "ri"], pre: ["ce", "re"], distances: ["1m"],
    precompliance: true, standards: ["cispr25", "iso11452"], alsoIndustries: ["powertrain"],
    caveat: {
      ko: "GTEM 셀을 대체하는 초소형 사전 인증 챔버입니다. 방출 측정은 사전 인증 범위입니다.",
      en: "An ultra-compact pre-compliance chamber, the alternative to a GTEM cell. Emission measurement is pre-compliant.",
    },
  },
  "SAC-10V": {
    family: "anechoic", dut: ["vehicle"], full: ALL, pre: [], distances: ["10m"],
    standards: ["ecer10", "cispr12", "iso11451", "cispr16"],
    caveat: {
      ko: "다이나모미터가 통합된 구성으로, 구동 상태의 완성차 시험을 전제로 합니다.",
      en: "Built around an integrated dynamometer, for whole vehicles tested under load.",
    },
  },
  AVTC: {
    family: "anechoic", dut: ["component", "equipment", "vehicle"], full: ALL, pre: [], distances: ["3m"],
    standards: ["ecer10", "cispr12", "iso11451", "cispr25"],
  },

  /* Military */
  "MIL CHC": {
    family: "anechoic", dut: ["component"], full: ALL, pre: [], distances: ["1m"],
    standards: ["mil461", "do160"],
  },
  "MIL-STD Chamber": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [], distances: ["1m", "3m"],
    standards: ["mil461", "do160"],
  },
  "MIL-STD Chamber Advanced": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [], distances: ["1m", "3m", "10m"],
    standards: ["mil461", "do160", "cispr12", "ecer10", "cispr32", "cispr16"],
    alsoIndustries: ["automotive", "commercial"],
  },

  /* Commercial — semi-anechoic */
  "SAC-3 Plus": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    standards: ["cispr32", "cispr16", "iec61000_4_3"],
  },
  "SAC-3 Square": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    standards: ["cispr32", "cispr16", "iec61000_4_3"],
  },
  "SAC-5 Plus": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m", "5m"],
    standards: ["cispr32", "cispr16", "iec61000_4_3"],
  },
  "SAC-5 Square": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m", "5m"],
    standards: ["cispr32", "cispr16", "iec61000_4_3"],
  },
  "SAC-10 Plus": {
    family: "anechoic", dut: ["equipment", "vehicle"], full: ALL, pre: [], distances: ["10m"],
    standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },
  "SAC-10 Plus Triton": {
    family: "anechoic", dut: ["equipment", "vehicle"], full: ALL, pre: [], distances: ["3m", "10m"],
    standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"], alsoIndustries: ["automotive"],
    caveat: {
      ko: "하나의 다각형 쉘 안에 10 m 축 1개와 3 m 축 2개를 두어, 안테나와 바닥 흡수체를 옮기지 않고 세 시험을 병행합니다.",
      en: "One 10 m axis and two 3 m axes in a single polygonal shell — three tests in parallel, with the antennas and floor absorbers staying in place.",
    },
  },
  "SAC-10/H Hybrid": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [], distances: ["10m"],
    standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },
  "SAC-10/P Pyramid": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [], distances: ["10m"],
    standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },

  /* Commercial — fully anechoic */
  "FAC-3": {
    family: "anechoic", dut: ["component"], full: ALL, pre: [], distances: ["3m"],
    standards: ["cispr32", "iec61000_4_3"],
    caveat: {
      ko: "접지면이 없는 자유공간 조건입니다. 접지면을 요구하는 시험장 규격에는 반무향(SAC) 계열이 필요합니다.",
      en: "Free-space conditions, with no ground plane. A test-site standard that requires one needs a semi-anechoic chamber instead.",
    },
  },
  "FAC-3 L": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    standards: ["cispr32", "iec61000_4_3"],
    caveat: {
      ko: "접지면이 없는 자유공간 조건입니다. 높이 스캔으로 거치형 피시험체까지 대응합니다.",
      en: "Free-space conditions, with a height scan that extends it to floor-standing EUTs.",
    },
  },
  "SAC-3 / FAC-3 Transformer": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    standards: ["cispr32", "cispr16", "iec61000_4_3"],
    caveat: {
      ko: "바닥 흡수체를 넣고 빼는 것으로 반무향과 완전무향을 오갑니다. 두 조건이 모두 필요할 때의 답입니다.",
      en: "Converts between semi-anechoic and fully anechoic by adding or removing the floor absorbers — the answer when both conditions are needed.",
    },
  },

  /* Commercial — compact and component */
  CHC: {
    family: "anechoic", dut: ["component", "equipment"], full: ["ci", "ri", "ce"], pre: ["re"], distances: ["3m"],
    precompliance: true, standards: ["iec61000_4_3", "cispr32"],
    caveat: {
      ko: "내성은 3 m 정식 인증, 방사 방출은 사전 인증 범위입니다.",
      en: "Full compliant immunity at 3 m; radiated emission is pre-compliant.",
    },
  },
  "CHC Plus": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    precompliance: true, standards: ["iec61000_4_3", "cispr32"],
    caveat: {
      ko: "적합 방사 방출 측정 구간은 1 GHz~18 GHz입니다. 그 아래 대역은 사전 인증 범위입니다.",
      en: "Compliant emission measurement runs from 1 GHz to 18 GHz; below that it is pre-compliant.",
    },
  },
  CTC: {
    family: "anechoic", dut: ["component"], full: ["ci", "ri"], pre: [], distances: ["1m"],
    standards: ["iec61000_4_3", "cispr25", "iso11452", "mil461", "do160"],
    alsoIndustries: ["automotive", "military", "powertrain"],
    caveat: {
      ko: "내성 시험에 특화된 부품 챔버로, 방출 측정용으로는 규정되어 있지 않습니다.",
      en: "A component chamber built around immunity testing; it is not specified for emission measurement.",
    },
  },

  /* Powertrain */
  "EDTC-SA": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["1m"],
    drive: "single", standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },
  "EDTC-AX": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["1m"],
    drive: "eaxle", standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },
  "EDTC-BB": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["1m"],
    drive: "bluebox", standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },

  /* Reverberation */
  "RVC e1": {
    family: "reverberation", dut: ["component", "equipment"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21"],
  },
  "RVC e2": {
    family: "reverberation", dut: ["component", "equipment"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21"],
  },
  "RVC S": {
    family: "reverberation", dut: ["component"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso1145211", "mil461"], alsoIndustries: ["military", "powertrain"],
  },
  "RVC M": {
    family: "reverberation", dut: ["component", "equipment"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso1145211", "mil461"], alsoIndustries: ["military", "powertrain"],
  },
  "RVC L": {
    family: "reverberation", dut: ["vehicle"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso11451", "mil461"], alsoIndustries: ["military"],
  },
  "RVC XL": {
    family: "reverberation", dut: ["vehicle"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso11451", "mil461"], alsoIndustries: ["military"],
  },
  "RVC XXL": {
    family: "reverberation", dut: ["vehicle", "large-vehicle"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso11451", "mil461"], alsoIndustries: ["military"],
  },

  /* Shielding */
  "Shielded Room": {
    family: "shielded", dut: ["component", "equipment", "vehicle", "large-vehicle"], full: [], pre: [], distances: [],
    standards: ["en50147"],
    alsoIndustries: ["automotive", "military", "commercial", "powertrain"],
  },
};

/* ------------------------------------------------------------------ *
 * The engine
 * ------------------------------------------------------------------ */

/** What the wizard needs about a model in the browser. Built on the server
 *  from `chamberModels` so the questionnaire does not pull the whole chamber
 *  content module — with its two locales of topic prose — into the client
 *  bundle. */
export type CatalogueEntry = {
  name: string;
  desc: string;
  industry: ChamberIndustry;
  industryLabel: string;
  type: ChamberType;
  typeLabel: string;
  spec?: { size: string; range?: string; note?: string };
  /** The model's category index page, in the reader's locale. */
  href: string;
  /** A photograph of the category, not of this model — see `shotNote`. */
  shot: { src: string; w: number; h: number };
};

export type Recommendation = {
  entry: CatalogueEntry;
  score: number;
  /** Why this model, in the reader's language — at most four lines. */
  reasons: string[];
  caveat?: string;
};

const reasonCopy = {
  ko: {
    industry: (label: string) => `${label} 라인업의 모델입니다`,
    // Both halves, because the interesting part is the cross-over: a military
    // chamber that also meets the automotive test-site requirement is a
    // different proposition from an automotive one, and a reader deciding
    // between three models needs to know which it is.
    alsoIndustry: (own: string, want: string) => `${own} 라인업이지만 ${want} 시험에도 대응합니다`,
    testsAll: "선택하신 시험을 모두 정식 인증 수준으로 수행합니다",
    testsSome: (n: number) => `선택하신 시험 중 ${n}개를 정식 인증 수준으로 수행합니다`,
    testsPre: "일부 시험은 사전 인증 범위로 대응합니다",
    dut: (label: string) => `${label} 규모의 피시험체를 수용합니다`,
    dutOver: (label: string) => `${label} 규모를 넘는 크기까지 수용합니다`,
    distance: (d: string) => `${d} 측정 거리 규격에 적합합니다`,
    pre: "사전 인증 스크리닝을 전제로 설계된 챔버입니다",
    rvc: "같은 증폭기로 더 높은 전계를 만드는 잔향실 방식입니다",
    drive: (label: string) => `${label} 부하 구성에 맞춰 제작됩니다`,
    standards: (list: string) => `${list} 대응`,
  },
  en: {
    industry: (label: string) => `In the ${label} line-up`,
    alsoIndustry: (own: string, want: string) => `In the ${own} line-up, and built for ${want} testing too`,
    testsAll: "Performs every test you selected to full compliance",
    testsSome: (n: number) => `Performs ${n} of the tests you selected to full compliance`,
    testsPre: "Some of the selected tests are covered pre-compliantly",
    dut: (label: string) => `Takes an EUT of ${label} scale`,
    dutOver: (label: string) => `Sized beyond ${label} scale, with room to spare`,
    distance: (d: string) => `Compliant at the ${d} measurement distance`,
    pre: "Designed as a pre-compliance screening chamber",
    rvc: "A reverberation chamber — higher field strength from the same amplifier",
    drive: (label: string) => `Built for the ${label} load setup`,
    standards: (list: string) => `Covers ${list}`,
  },
} as const;

/** Short forms of the EUT options — the option labels themselves carry a size
 *  in brackets, which reads as an aside in a sentence. */
const dutLabel: Record<Lang, Record<DutSize, string>> = {
  ko: {
    component: "부품·테이블탑",
    equipment: "거치형 대형 기기",
    vehicle: "차량",
    "large-vehicle": "대형 차량",
  },
  en: {
    component: "component / table-top",
    equipment: "floor-standing equipment",
    vehicle: "vehicle",
    "large-vehicle": "large-vehicle",
  },
};

/** The industry names, read off the first question rather than kept as a
 *  second copy — they are the labels the reader just chose from. */
const industryName = (i: ChamberIndustry, lang: Lang) =>
  questions
    .find((q) => q.id === "industries")!
    .options.find((o) => o.id === i)?.label[lang] ?? i;

const driveLabel: Record<Lang, Record<Drive, string>> = {
  ko: { single: "단일 모터", eaxle: "e-axle 2축", bluebox: "EMC-BlueBox 이동식" },
  en: { single: "single-motor", eaxle: "e-axle", bluebox: "EMC-BlueBox" },
};

/**
 * Rank the catalogue against a set of answers and return the shortlist.
 *
 * Empty is a real answer, not a failure: a 3 m compliant measurement of a bus
 * is a chamber Frankonia builds to order, and the page says so rather than
 * offering the nearest model that cannot do it.
 */
export function recommend(
  catalogue: readonly CatalogueEntry[],
  answers: Answers,
  lang: Lang,
  limit = 3,
): Recommendation[] {
  const picked = catalogue
    .map((entry) => evaluate(entry, answers, lang))
    .filter((r): r is Recommendation => r !== null);

  // Ties keep catalogue order, which runs largest family first — so two models
  // that score the same come back in the order the head office lists them.
  picked.sort((a, b) => b.score - a.score);
  if (picked.length === 0) return [];

  /*
   * Three results is a ceiling, not a quota.
   *
   * The hard filters only remove what cannot do the job, so a chamber that
   * merely fits badly still survives them — ask for an e-axle drivetrain and
   * the military vehicle chambers technically clear every filter, because they
   * take the EUT at the distance and run the tests. Printing those under
   * "Alternative" would present a defence chamber as a runner-up to a
   * powertrain one, which is not what the ranking means.
   *
   * So a result also has to be in the same class as the winner: positive, and
   * at least half its score. Two strong alternatives are worth more than two
   * filled slots, and one recommendation on its own is a legitimate answer.
   */
  const floor = Math.max(1, picked[0].score * 0.5);
  return picked.filter((r) => r.score >= floor).slice(0, limit);
}

function evaluate(entry: CatalogueEntry, a: Answers, lang: Lang): Recommendation | null {
  const fit = modelFit[entry.name];
  if (!fit) return null;

  const t = reasonCopy[lang];
  const reasons: string[] = [];
  let score = 0;

  /* --- hard filters ------------------------------------------------ */

  // A room is not a test site. The Shielded Room performs no EMC test, so it
  // is never the answer to "which chamber runs this test".
  if (fit.full.length === 0 && fit.pre.length === 0) return null;

  // An explicit form preference is a filter, not a nudge: a reader who picked
  // "reverberation" is not served by a list of anechoic chambers.
  if (a.family === "anechoic" && fit.family !== "anechoic") return null;
  if (a.family === "reverberation" && fit.family !== "reverberation") return null;

  // A reverberation chamber cannot make a compliant radiated-emission
  // measurement at a defined distance — the field in it is deliberately
  // stirred, which is the whole point of the method.
  if (a.tests.includes("re") && fit.family !== "anechoic") return null;

  // Too small for the EUT.
  const want = a.dut ? dutSizes.indexOf(a.dut) : -1;
  const covers = fit.dut.map((d) => dutSizes.indexOf(d));
  if (want >= 0) {
    if (covers.includes(want)) {
      score += 20;
      reasons.push(t.dut(dutLabel[lang][a.dut!]));
    } else if (Math.max(...covers) > want) {
      score += 7;
      reasons.push(t.dutOver(dutLabel[lang][a.dut!]));
    } else {
      return null;
    }
  }

  // A 3 m chamber does not become a 10 m chamber. Pre-compliance chambers stay
  // in the list at a penalty, because screening at the wrong distance is still
  // something a laboratory does on purpose.
  if (a.distance && a.distance !== "unsure") {
    if (a.distance === "pre") {
      if (fit.precompliance) {
        score += 22;
        reasons.push(t.pre);
      }
    } else if (fit.distances.includes(a.distance)) {
      score += 24;
      reasons.push(t.distance(a.distance.replace("m", " m")));
    } else if (fit.precompliance) {
      score -= 10;
    } else {
      return null;
    }
  }

  // An E-Drive chamber is built around one load machine. Offering the e-axle
  // chamber to somebody who has one motor is offering the wrong building.
  if (a.drive && a.drive !== "unsure") {
    if (fit.drive === a.drive) {
      score += 26;
      reasons.push(t.drive(driveLabel[lang][a.drive]));
    } else if (fit.drive) {
      return null;
    }
  } else if (a.industries.includes("powertrain") && fit.drive) {
    score += 6;
  }

  /* --- weighted scoring -------------------------------------------- */

  if (a.industries.includes(entry.industry)) {
    score += 30;
    reasons.unshift(t.industry(entry.industryLabel));
  } else {
    const also = fit.alsoIndustries?.find((i) => a.industries.includes(i));
    if (also) {
      score += 20;
      reasons.unshift(t.alsoIndustry(entry.industryLabel, industryName(also, lang)));
    } else {
      score -= 12;
    }
  }

  const fullHits = a.tests.filter((k) => fit.full.includes(k)).length;
  const preHits = a.tests.filter((k) => !fit.full.includes(k) && fit.pre.includes(k)).length;
  score += fullHits * 14 + preHits * 5 - (a.tests.length - fullHits - preHits) * 16;
  if (a.tests.length > 0) {
    if (fullHits === a.tests.length) reasons.push(t.testsAll);
    else if (fullHits > 0) reasons.push(t.testsSome(fullHits));
    if (preHits > 0) reasons.push(t.testsPre);
  }

  // No stated preference: a reverberation chamber earns a small edge where it
  // is genuinely the better instrument — radiated immunity with no emission
  // measurement to satisfy.
  if ((!a.family || a.family === "unsure") && fit.family === "reverberation") {
    score += 8;
    reasons.push(t.rvc);
  }

  const wanted = effectiveStandards(a);
  const hits = wanted.filter((s) => fit.standards.includes(s));
  score += hits.length * 7;
  if (wanted.length > 0 && hits.length === 0) score -= 8;
  if (hits.length > 0) reasons.push(t.standards(hits.map(standardName).join(", ")));

  return {
    entry,
    score,
    // Four lines is what a card can carry before it stops being read.
    reasons: reasons.slice(0, 4),
    caveat: fit.caveat?.[lang],
  };
}
