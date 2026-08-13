import type { ChamberIndustry, ChamberType } from "./chamber-sections";
import type { Lang } from "./site-config";

/**
 * The MyChamber questionnaire and the engine that turns its answers into a
 * chamber recommendation.
 *
 * ## The source
 *
 * The branch points below are the head office's own — the hand-drawn *Chamber
 * Matrix* of 11 August 2026, extended on 12 August 2026, which sorts the range
 * into segments and three or four levels under each:
 *
 *   Automotive   components  → reverberation / pre-compliance / full compliance
 *                vehicle     → 3 m / 10 m → hybrid or pyramid
 *                reverberation → components / vehicle
 *                E-Drive     → mobile / fixed single / fixed axis dyno
 *   Commercial   reverberation · pre-compliance · full compliance SAC (3/5/10 m,
 *   Industrial   hybrid or pyramid, quiet zone ø3–6 m) · full compliance FAC ·
 *                special
 *   Military     components → hybrid / pyramid
 *                vehicle    → hybrid / pyramid
 *   Special      SAT chamber · antenna components (OTA) · antenna vehicle · RCS
 *
 * The 12 August extension adds two things the tree of models cannot carry:
 * the *Special Chambers* segment, whose four entries are measurement tasks
 * rather than catalogue models, and a questionnaire behind every segment —
 * Ⓐ Automotive, Ⓑ Commercial Industrial, Ⓒ Military, Ⓓ Special Chambers,
 * plus a free-standing ⓧ Custom Request. Those live in
 * mychamber-questionnaires.ts; what this file carries is the Special segment
 * itself and the one question under it, because both branch the flow.
 *
 * Everything the matrix branches on is asked here: what is being tested,
 * pre-compliance against full compliance, the measurement distance, the
 * absorber lining, and the quiet zone. Two things are asked that the matrix
 * does not — the EMC test kinds and the standards — because the renewal brief
 * asks for them and because both feed the enquiry the page ends in.
 *
 * ## Why this is scoring and not the tree itself
 *
 * The matrix is a tree, and a tree cannot say that a model belongs to two
 * branches at once. The MIL-STD Chamber Advanced is a military chamber that
 * also meets the commercial and automotive test-site requirements; the CTC is
 * filed under Commercial and built for automotive and military components;
 * every reverberation chamber crosses two segments. Scoring says all of that
 * as data — `alsoIndustries`, one line — where the tree has to duplicate a
 * branch to say it, or stay silent.
 *
 * So the matrix is the answer key rather than the implementation. The engine
 * does two things in order:
 *
 *   1. **Hard filters**, for the answers where a chamber is not merely a worse
 *      fit but physically cannot do the job: a chamber smaller than the EUT, a
 *      reverberation chamber asked for a compliant radiated-emission
 *      measurement at a defined distance, a 3 m chamber asked for 10 m, an
 *      E-Drive chamber built around a load machine the customer is not using.
 *   2. **Weighted scoring** over what is left, so the answer is a ranked
 *      shortlist with the reason for each place in it.
 *
 * A test walks every leaf of the matrix and asserts the engine puts that leaf's
 * model first — see tests/mychamber-matrix.test.mjs. If the two ever disagree,
 * that test fails rather than a customer being sent the wrong chamber.
 *
 * ## What this file may not do
 *
 * Every figure it reasons about comes from `chamberModels` and the model-page
 * specification tables in chamber-sections.ts, which are the 2026 catalogue.
 * Nothing here invents a specification. Where a model's compliance is narrower
 * than the row would suggest, `caveat` says so out loud.
 */

/* ------------------------------------------------------------------ *
 * Answer axes
 * ------------------------------------------------------------------ */

/**
 * The three segments the matrix sorts the whole range into, in its own order.
 *
 * Three answers rather than four, on purpose. The site's product taxonomy has
 * an industry axis of five slugs — Automotive, Military, Commercial,
 * Powertrain, Others — because that is how the head office files the catalogue
 * and how /chambers/industry/… is routed. The matrix is not that axis. It has
 * three segments, and it files the E-Drive benches *inside* Automotive, as a
 * sibling of "components" and "vehicle", because a drivetrain bench is
 * something an automotive laboratory buys.
 *
 * Offering Powertrain here as a fourth segment asked the reader to separate two
 * things the matrix treats as one, and took E-Drive off the Automotive branch
 * the head office put it on. So the questionnaire asks the matrix's three, and
 * `segmentIndustries` below is the one place that knows a Powertrain chamber
 * answers to the Automotive segment.
 */
export const segments = ["automotive", "commercial", "military"] as const;
export type Segment = (typeof segments)[number];

/**
 * The 12 August extension's fourth segment. It is a choice on the first
 * question, but not a member of `segments`: those three are what the scoring
 * engine knows, because they are the ones with catalogue models behind them.
 * The Special Chambers segment has none — its four entries are measurement
 * tasks, and its whole branch ends in questionnaire Ⓓ rather than in a
 * recommendation. Choosing it is exclusive: the matrix draws it as a track of
 * its own, not a fourth thing to tick alongside Automotive.
 */
export type SegmentChoice = Segment | "special";

/** The four measurement tasks the matrix files under Special Chambers. */
export const specialUses = ["sat", "ota", "antenna-vehicle", "rcs"] as const;
export type SpecialUse = (typeof specialUses)[number];

/** True where the reader is on the Special Chambers track — the standard
 *  questions close and the flow ends in questionnaire Ⓓ. */
export const isSpecialTrack = (a: Answers): boolean => a.segments.includes("special");

/** The catalogue industries each segment covers. The join between the matrix's
 *  three and the catalogue's four. */
const segmentIndustries: Record<Segment, readonly ChamberIndustry[]> = {
  automotive: ["automotive", "powertrain"],
  commercial: ["commercial"],
  military: ["military"],
};

/** Every catalogue industry the chosen segments cover — what the scoring
 *  compares a model's own filing against. The Special segment covers none:
 *  nothing in the catalogue answers to it. */
export const coveredIndustries = (segs: readonly SegmentChoice[]): readonly ChamberIndustry[] =>
  segs.flatMap((s) => (s === "special" ? [] : segmentIndustries[s]));

/** The segment a catalogue industry is filed under. */
export const segmentOf = (i: ChamberIndustry): Segment =>
  i === "powertrain" ? "automotive" : i;

/** The four EMC test kinds: conducted immunity, radiated immunity, conducted
 *  emission, radiated emission. */
export const testKinds = ["ci", "ri", "ce", "re"] as const;
export type TestKind = (typeof testKinds)[number];

/** EUT scale, smallest first. The order is load-bearing: a chamber that takes
 *  a vehicle also takes a component, so the engine compares indexes. */
export const dutSizes = ["component", "equipment", "vehicle", "large-vehicle"] as const;
export type DutSize = (typeof dutSizes)[number];

/**
 * What is being tested. Four scales plus E-Drive, which the matrix makes a
 * sibling of "components" and "vehicle" rather than a size — an E-Drive bench
 * is a different kind of test, built around a load machine, and the chambers
 * that do it do nothing else.
 */
export type DutClass = DutSize | "edrive" | "shielding";

/** Measurement distances the catalogue specifies chambers at. 1 m is the
 *  component-level distance CISPR 25 and MIL-STD-461 work at; 3, 5 and 10 m
 *  are the test-site distances. */
export const distances = ["1m", "3m", "5m", "10m"] as const;
export type Distance = (typeof distances)[number];

/**
 * The matrix's first branch under a segment: is this a screening chamber or a
 * test site? Asked as one question together with the distance, because for
 * everything but the component chambers the two answers are the same answer —
 * "3 m" already means full compliance.
 *
 * `pre-1ghz` is the one rung between the two, and it is there because a
 * chamber is: the CHC Plus screens from 30 MHz to 1 GHz and certifies from
 * 1 GHz to 18 GHz. For a radar or radio module that boundary is the whole
 * decision, and without this answer the only route to that chamber is to tick
 * radiated emission and hope.
 */
export type LevelAnswer = Distance | "pre" | "pre-1ghz" | "unsure";

/** True where the answer names a test-site distance rather than a screening
 *  level. The two behave differently everywhere they are read. */
export const isDistance = (level: LevelAnswer | undefined): level is Distance =>
  level !== undefined && (distances as readonly string[]).includes(level);

/** Absorber lining. The matrix splits on this at every 10 m branch and through
 *  the whole military segment: hybrid buys a smaller room, long pyramid a
 *  cheaper lining and a lower start frequency. */
export const absorbers = ["hybrid", "pyramid"] as const;
export type Absorber = (typeof absorbers)[number];
export type AbsorberAnswer = Absorber | "unsure";

/**
 * Quiet zone diameter.
 *
 * The matrix tabulates it under the 10 m commercial chambers, and the model
 * pages carry it for the 3 m and 5 m chambers too — which is the difference
 * between the dome and the square shells. A SAC-3 Plus is built for ø1.2 m to
 * ø2.0 m and a SAC-3 Square for ø2.0 m to ø3.0 m, so this is the answer that
 * chooses between them; without it the two are the same chamber twice.
 */
export const qzSizes = ["1.2m", "1.5m", "2m", "3m", "4m", "5m", "6m", "custom"] as const;
export type QzSize = (typeof qzSizes)[number];
export type QzAnswer = QzSize | "unsure";

/** Chamber family. `shielded` is the Shielded Room, which is a room and not a
 *  test site — it performs no EMC test and is therefore never recommended. */
export type Family = "anechoic" | "reverberation" | "shielded";
export type FamilyAnswer = "anechoic" | "reverberation" | "unsure";

/**
 * Lowest usable frequency of a reverberation chamber, in MHz — the first
 * figure the catalogue gives for one, and the only thing separating the RVC e1
 * from the e2. It is a floor set by the room's own volume: a chamber usable
 * from 80 MHz is usable from 200 MHz, and no amount of stirring takes a
 * 200 MHz chamber below its own cut-off.
 */
export type Luf = 80 | 200;
export type LufAnswer = "80" | "200" | "unsure";

/**
 * How a reverberation chamber stirs its field. The Z-fold paddle fits a
 * smaller room; the large discs (ø9.0 m and ø12.0 m) take more room and return
 * more uncorrelated field samples, which is what separates the RVC L from the
 * XL and XXL — they share a working volume and a lowest usable frequency, and
 * differ only here.
 */
export type Stirrer = "zfold" | "disc";
export type StirrerAnswer = Stirrer | "unsure";

/**
 * Whether the floor reflects. A semi-anechoic chamber keeps a conducting
 * ground plane because the test-site standards ask for one; a fully anechoic
 * chamber lines the floor too and measures in free space. The Transformer is
 * the chamber that does both, and nothing else in the questionnaire can ask
 * for it.
 */
export type Ground = "sac" | "fac" | "both";
export type GroundAnswer = Ground | "unsure";

/**
 * How a 10 m chamber is built. The head office files two of these under
 * "Special" — they are the same polygonal shell wired one way or another, and
 * a customer chooses between them on floor area and throughput rather than on
 * any figure in the specification.
 */
export type Shell = "sized" | "compact" | "multi";
export type ShellAnswer = Shell | "unsure";

/** E-Drive load machine — the one thing that separates the three EDTC
 *  chambers, and the matrix's own third level under E-Drive. */
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
  // Never suggested, only ticked by hand — but the one answer that asks for a
  // fully anechoic room. A reader who knows they measure in free space knows
  // this number, and nothing else in the questionnaire separates the FAC
  // chambers from the SAC ones at the same distance.
  { id: "iec61000_4_22", name: "IEC / EN 61000-4-22", industries: [], tests: [],
    hint: { ko: "완전무향실(FAR) 시험장 — 접지면 없는 자유공간", en: "Fully anechoic room — free space, no ground plane" } },
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
  /** The matrix's segments, not the catalogue's four industries — see the
   *  notes on `segments` and `SegmentChoice`. */
  segments: readonly SegmentChoice[];
  /** The Special Chambers track's one question. */
  specialUse?: SpecialUse;
  dut?: DutClass;
  tests: readonly TestKind[];
  level?: LevelAnswer;
  family?: FamilyAnswer;
  luf?: LufAnswer;
  stirrer?: StirrerAnswer;
  ground?: GroundAnswer;
  absorber?: AbsorberAnswer;
  shell?: ShellAnswer;
  qz?: QzAnswer;
  drive?: DriveAnswer;
  /**
   * The flow no longer asks — see the note where the step used to be — so in
   * the wizard this is always `undefined` and the suggestion below stands in
   * for it. It stays an overridable field because the scoring is specified
   * against explicit lists: that is how the matrix tests pin a path down, and
   * how a caller with a real list of standards in hand can supply one.
   */
  standards?: readonly StandardId[];
};

export const emptyAnswers: Answers = { segments: [], tests: [] };

/** The standards the answers already imply. See the note on `Answers.standards`.
 *  A standard is filed against the catalogue's industries, so the reader's
 *  segments are expanded before they are compared — which is what keeps
 *  CISPR 25 suggested to an Automotive reader testing a drivetrain. */
export const suggestStandards = (a: Answers): StandardId[] => {
  const covered = coveredIndustries(a.segments);
  return standards
    .filter(
      (s) =>
        s.industries.some((i) => covered.includes(i)) &&
        s.tests.some((t) => a.tests.includes(t)),
    )
    .map((s) => s.id);
};

/** What the engine actually scores against — the reader's list if they made
 *  one, the suggestion otherwise. */
export const effectiveStandards = (a: Answers): readonly StandardId[] =>
  a.standards ?? suggestStandards(a);

/* ------------------------------------------------------------------ *
 * Questions
 * ------------------------------------------------------------------ */

export type QuestionId =
  | "segments" | "specialUse" | "dut" | "tests"
  | "family" | "luf" | "stirrer" | "level" | "ground"
  | "absorber" | "qz" | "shell" | "drive";

export type Option = {
  id: string;
  label: Record<Lang, string>;
  note?: Record<Lang, string>;
  /** Options that only make sense given an earlier answer — E-Drive is only
   *  offered once Automotive or Powertrain is selected. */
  when?: (a: Answers) => boolean;
};

export type Question = {
  id: QuestionId;
  /** Checkboxes when true, radio buttons when false. */
  multi: boolean;
  /** May be left empty and still advance. No step is, since the standards
   *  question was taken out; the flag stays for the next one that is. */
  optional?: boolean;
  kicker: Record<Lang, string>;
  title: Record<Lang, string>;
  hint?: Record<Lang, string>;
  options: readonly Option[];
  /** Absent means the question is asked of everyone. */
  when?: (a: Answers) => boolean;
};

/** A real EUT scale, as opposed to an E-Drive bench or a bare shielded room —
 *  the two answers that take the reader off the main flow entirely. */
export const isSized = (dut: DutClass | undefined): dut is DutSize =>
  dut !== undefined && (dutSizes as readonly string[]).includes(dut);

/** True where the reader is being sized for an absorber-lined test chamber, so
 *  the questions about how one is built are worth asking. */
export const wantsAnechoic = (a: Answers) =>
  isSized(a.dut) && a.family !== "reverberation";

/**
 * The questionnaire, in the order it is asked.
 *
 * Two rules shape the order, and between them they are why a reader answers
 * four questions on one path and eight on another.
 *
 *   1. **Each question narrows what the next one can be.** Segment, then what
 *      the chamber is for, then the tests, then the family — and only then the
 *      specification of that family. A reverberation chamber has no test
 *      distance, so a reader who chose one is never asked for one; an E-Drive
 *      bench is always a 1 m component chamber, so it goes straight to the
 *      load machine.
 *   2. **A question that cannot change the answer is not asked.** Every
 *      `when` below is that rule written down. The absorber question is for
 *      the branches where the catalogue offers both linings; the quiet zone
 *      is for the distances it is tabulated at; the shell is for the one
 *      distance where three shells exist.
 *
 * Every question also has to be able to reach something. The test in
 * tests/mychamber-matrix.test.mjs fails if any chamber in the catalogue cannot
 * be brought out first by some set of answers — which is what most of the
 * later questions are here for. Without the stirrer question the RVC L and the
 * XL are the same room twice; without the shell question the SAC-10 Plus and
 * the Triton are unreachable behind the SAC-10/H.
 */
export const questions: readonly Question[] = [
  {
    // The matrix's first level, in its own order — the three model segments,
    // and the Special Chambers segment the 12 August extension added. The note
    // under Automotive names the drivetrain out loud, because that is the one
    // place a reader could expect a segment of its own and find none — see the
    // note on `segments`. The Commercial label carries "Industrial" because
    // the extension renamed the box.
    id: "segments",
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
        note: { ko: "차량·전장부품·전기 구동계(E-Drive)", en: "Vehicles, vehicle components and electric drivetrains" } },
      { id: "commercial", label: { ko: "Commercial · Industrial", en: "Commercial · Industrial" },
        note: { ko: "일반 산업·전자기기", en: "Industrial and consumer electronics" } },
      { id: "military", label: { ko: "Military", en: "Military" },
        note: { ko: "군수·방산·항공", en: "Defence, aerospace" } },
      { id: "special", label: { ko: "특수 챔버 (Special Chambers)", en: "Special chambers" },
        note: { ko: "위성 시험 · 안테나 측정(OTA) · RCS — EMC 시험이 아닌 측정 과제", en: "Satellite testing, antenna measurement (OTA), RCS — measurement tasks beyond EMC" } },
    ],
  },
  {
    /*
     * The Special Chambers track's one question — the four measurement tasks
     * the matrix files under the segment. They are not catalogue models, so
     * the flow does not end in a recommendation: it ends in questionnaire Ⓓ,
     * with this answer carried in. The descriptions name the measurement, not
     * a specification — a special chamber is designed to the task.
     */
    id: "specialUse",
    multi: false,
    when: (a) => isSpecialTrack(a),
    kicker: { ko: "측정 과제", en: "The measurement" },
    title: {
      ko: "어떤 측정을 위한 챔버인가요?",
      en: "What will the chamber measure?",
    },
    hint: {
      ko: "특수 챔버는 표준 모델이 아니라 측정 과제에 맞춰 설계됩니다. 용도를 선택하시면 다음 단계에서 요구사항을 받아 설계팀 검토로 바로 이어집니다.",
      en: "A special chamber is designed to the measurement task rather than picked from the standard range. Choose the task and the next step takes the requirement straight to the engineering team.",
    },
    options: [
      { id: "sat", label: { ko: "위성 시험 (SAT chamber)", en: "Satellite testing — SAT chamber" },
        note: { ko: "위성·탑재체 시험 설비", en: "Satellites and payloads under test" } },
      { id: "ota", label: { ko: "안테나 부품 · OTA", en: "Antenna components — OTA" },
        note: { ko: "안테나·무선 부품의 방사 특성 측정", en: "Radiated performance of antennas and wireless components" } },
      { id: "antenna-vehicle", label: { ko: "차량 안테나 측정", en: "Vehicle antenna measurement" },
        note: { ko: "완성차에 장착된 안테나의 방사 특성", en: "Antenna performance measured on the whole vehicle" } },
      { id: "rcs", label: { ko: "RCS 측정", en: "RCS measurement" },
        note: { ko: "레이더 반사 단면적(Radar Cross Section)", en: "Radar cross-section" } },
    ],
  },
  {
    // The matrix's second level, and the question that does the most work: it
    // separates the component chambers from the test sites from the E-Drive
    // benches — and the shielded room from all of them — before anything else
    // is asked. Not on the Special track, which has no models to size.
    id: "dut",
    multi: false,
    when: (a) => !isSpecialTrack(a),
    kicker: { ko: "용도", en: "What it is for" },
    title: {
      ko: "무엇을 위한 챔버인가요?",
      en: "What is the chamber for?",
    },
    hint: {
      ko: "가장 큰 피시험체를 기준으로 선택하세요. 챔버의 크기와 정합 거리를 결정하는 값입니다.",
      en: "Answer for the largest EUT you will test — this is what sets the size of the chamber and the test distance.",
    },
    options: [
      { id: "component", label: { ko: "부품 · 모듈 (테이블탑, ~1 m)", en: "Components and modules (table-top, up to ~1 m)" },
        note: { ko: "ECU, 센서, 소형 기기", en: "ECUs, sensors, small equipment" } },
      { id: "equipment", label: { ko: "거치형 · 대형 기기 (~2 m)", en: "Floor-standing equipment (up to ~2 m)" },
        note: { ko: "가전, 산업 장비, 캐비닛", en: "Appliances, industrial equipment, cabinets" } },
      { id: "vehicle", label: { ko: "차량 · 대형 피시험체 (~5 m)", en: "Vehicle-scale EUT (up to ~5 m)" },
        note: { ko: "승용차, 이륜차, 대형 어셈블리", en: "Passenger cars, motorcycles, large assemblies" } },
      { id: "large-vehicle", label: { ko: "대형 차량 (버스 · 트럭 · 장갑차)", en: "Large vehicles — buses, trucks, armour" },
        note: { ko: "맞춤 설계 구간", en: "The custom-size range" } },
      // The matrix files E-Drive under Automotive, level with "components" and
      // "vehicle", so this is where it is asked. The catalogue still tags those
      // three chambers Powertrain — that is the industry axis, and the segment
      // question is not it.
      { id: "edrive", label: { ko: "구동계 (E-Drive)", en: "Drivetrain (E-Drive)" },
        note: { ko: "부하기를 갖춘 전기 구동계 시험대", en: "An electric drivetrain bench with a load machine" },
        when: (a) => a.segments.includes("automotive") },
      // Not every customer is buying a test site. The shielded room is the
      // product the whole range is built on, and it is bought on its own — for
      // security work, for isolating a sensitive instrument, or as the shell a
      // chamber is added to later.
      { id: "shielding", label: { ko: "차폐만 필요합니다 (시험 없음)", en: "Shielding only — no testing" },
        note: { ko: "차폐룸 · 전자파 차폐 구조물", en: "A shielded room, on its own" } },
    ],
  },
  {
    id: "tests",
    multi: true,
    when: (a) => !isSpecialTrack(a) && a.dut !== "shielding",
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
    /*
     * The chamber family, and it comes before the specification rather than
     * after it — a reverberation chamber has no test distance, no absorber and
     * no quiet zone, so asking this first is what lets the four questions
     * below disappear for anyone who chooses one.
     *
     * Only asked where a reverberation chamber can do the job. It makes no
     * compliant radiated-emission measurement at a distance, so selecting that
     * test settles it, and the question would be a choice between one option
     * and nothing.
     */
    id: "family",
    multi: false,
    when: (a) =>
      isSized(a.dut) && a.tests.includes("ri") && !a.tests.includes("re"),
    kicker: { ko: "챔버 방식", en: "Chamber form" },
    title: {
      ko: "원하시는 챔버 방식이 있으신가요?",
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
    // The first figure a reverberation chamber's catalogue entry gives, and a
    // floor its own volume sets: it separates the RVC e1 from the e2 and the
    // S and M from the L, XL and XXL.
    id: "luf",
    multi: false,
    when: (a) => a.family === "reverberation",
    kicker: { ko: "최저 사용 주파수", en: "Lowest usable frequency" },
    title: {
      ko: "시험은 어느 주파수부터 시작해야 하나요?",
      en: "Where does the test have to start?",
    },
    hint: {
      ko: "잔향실이 통계적으로 균일한 전계를 만들 수 있는 하한입니다. 방의 부피가 정하는 값이라 나중에 낮출 수 없습니다.",
      en: "The floor below which a reverberation chamber can no longer make a statistically uniform field. It is set by the volume of the room, and cannot be lowered afterwards.",
    },
    options: [
      { id: "200", label: { ko: "200 MHz부터", en: "From 200 MHz" },
        note: { ko: "부품·소형 기기 시험의 일반적인 하한", en: "The usual floor for component and small-equipment testing" } },
      { id: "80", label: { ko: "80 MHz부터", en: "From 80 MHz" },
        note: { ko: "더 큰 방이 필요합니다", en: "This needs a larger room" } },
      { id: "unsure", label: { ko: "잘 모르겠습니다", en: "Not sure" },
        note: { ko: "피시험체 크기에 맞춰 제안드립니다", en: "We will size it from the EUT instead" } },
    ],
  },
  {
    // Only at vehicle scale, because that is the only place the catalogue
    // offers a choice: the RVC L, XL and XXL share a working volume and a
    // lowest usable frequency and differ in nothing else. The smaller
    // reverberation chambers all come with a Z-fold paddle.
    id: "stirrer",
    multi: false,
    when: (a) =>
      a.family === "reverberation" && (a.dut === "vehicle" || a.dut === "large-vehicle"),
    kicker: { ko: "전계 교반", en: "Field stirring" },
    title: {
      ko: "스터러(교반기)는 어느 방식으로 하시겠습니까?",
      en: "Which stirrer should the chamber use?",
    },
    hint: {
      ko: "스터러가 경계 조건을 계속 바꾸어 한 바퀴 동안 전계를 통계적으로 균일하게 만듭니다. 디스크가 클수록 서로 무관한 전계 표본이 많아지지만 방도 그만큼 커집니다.",
      en: "The stirrer keeps changing the boundary conditions so that one full turn makes the field statistically uniform. The larger the disc, the more uncorrelated field samples — and the larger the room.",
    },
    options: [
      { id: "zfold", label: { ko: "Z-폴드 스터러", en: "Z-fold stirrer" },
        note: { ko: "수직·수평 2대 · 더 작은 방", en: "Two of them, vertical and horizontal — a smaller room" } },
      { id: "disc", label: { ko: "대형 디스크 스터러", en: "Large-disc stirrer" },
        note: { ko: "ø9.0 m 또는 ø12.0 m · 더 균일한 전계", en: "ø9.0 m or ø12.0 m — a more uniform field" } },
      { id: "unsure", label: { ko: "잘 모르겠습니다", en: "Not sure" },
        note: { ko: "피시험체와 방 크기에 맞춰 제안드립니다", en: "We will choose it from the EUT and the room" } },
    ],
  },
  {
    /*
     * The matrix's own branch — pre-compliance against full compliance — and
     * the measurement distance, in one question.
     *
     * They are one question because for everything except the component
     * chambers they are one answer: "3 m" already says full compliance, and
     * nothing in the catalogue offers a distance for screening. Where the two
     * really do separate is at component level, which is why the UCC and the
     * ACTC are both 1 m chambers and only one of them certifies.
     *
     * Not asked of a reverberation chamber, which has no test distance at all,
     * nor of an E-Drive bench, which is always 1 m component level and goes
     * straight to its load machine.
     */
    id: "level",
    multi: false,
    when: (a) => isSized(a.dut) && a.family !== "reverberation",
    kicker: { ko: "인증 수준", en: "Compliance level" },
    title: {
      ko: "어느 수준까지 측정하셔야 하나요?",
      en: "How far do the measurements have to go?",
    },
    hint: {
      ko: "정식 인증은 규격이 정한 안테나–피시험체 거리를 지켜야 합니다. 그 거리가 정온 영역과 챔버 크기를 결정합니다.",
      en: "Full compliance means holding the antenna-to-EUT distance the standard prescribes, and that distance sets the quiet zone — and with it the chamber.",
    },
    options: [
      { id: "pre", label: { ko: "사전 인증 (개발 단계 스크리닝)", en: "Pre-compliance — development screening" },
        note: { ko: "컴팩트 챔버로 인증 전 확인", en: "A compact chamber, ahead of certification" } },
      { id: "pre-1ghz", label: { ko: "사전 인증 + 1 GHz 이상 정식 인증 방출", en: "Pre-compliance, plus certified emission above 1 GHz" },
        note: { ko: "레이더·무선 대역은 인증, 그 아래는 스크리닝", en: "Certify the radar and radio bands, screen below them" } },
      { id: "1m", label: { ko: "정식 인증 — 1 m 부품 시험", en: "Full compliance — 1 m component level" },
        note: { ko: "CISPR 25, MIL-STD-461", en: "CISPR 25, MIL-STD-461" } },
      { id: "3m", label: { ko: "정식 인증 — 3 m", en: "Full compliance — 3 m" },
        note: { ko: "가장 널리 쓰이는 시험장 거리", en: "The most common test-site distance" } },
      { id: "5m", label: { ko: "정식 인증 — 5 m", en: "Full compliance — 5 m" },
        note: { ko: "3 m와 5 m를 함께 쓰는 구성", en: "Chambers covering 3 m and 5 m together" } },
      { id: "10m", label: { ko: "정식 인증 — 10 m", en: "Full compliance — 10 m" },
        note: { ko: "완성차, 대형 피시험체, CISPR 16-1-4", en: "Whole vehicles, large EUTs, CISPR 16-1-4" } },
      { id: "unsure", label: { ko: "아직 정하지 못했습니다", en: "Not decided yet" },
        note: { ko: "규격에서 역산해 제안드립니다", en: "We will derive it from the standards instead" } },
    ],
  },
  {
    // Only at 3 m, because that is the only distance a fully anechoic chamber
    // is built at, and only for the commercial range, which is where they all
    // live. It is the one answer that can ask for the Transformer.
    id: "ground",
    multi: false,
    when: (a) => wantsAnechoic(a) && a.level === "3m" && a.segments.includes("commercial"),
    kicker: { ko: "바닥 조건", en: "The floor" },
    title: {
      ko: "바닥은 반사면이어야 하나요, 흡수면이어야 하나요?",
      en: "Does the floor reflect, or absorb?",
    },
    hint: {
      ko: "시험장 규격 대부분은 반사하는 접지면을 요구합니다(반무향). 자유공간 조건을 요구하는 규격은 바닥까지 흡수체를 깐 완전무향실을 요구합니다.",
      en: "Most test-site standards call for a reflecting ground plane — that is a semi-anechoic chamber. A standard written for free space calls for absorbers on the floor as well.",
    },
    options: [
      { id: "sac", label: { ko: "반무향 (접지면 있음, SAC)", en: "Semi-anechoic — with a ground plane" },
        note: { ko: "CISPR 16-1-4, ANSI C63.4", en: "CISPR 16-1-4, ANSI C63.4" } },
      { id: "fac", label: { ko: "완전무향 (자유공간, FAC)", en: "Fully anechoic — free space" },
        note: { ko: "IEC/EN 61000-4-22", en: "IEC / EN 61000-4-22" } },
      { id: "both", label: { ko: "두 조건이 모두 필요합니다", en: "Both, in one chamber" },
        note: { ko: "바닥 흡수체를 넣고 빼며 전환", en: "Converted by adding or removing the floor absorbers" } },
      { id: "unsure", label: { ko: "잘 모르겠습니다", en: "Not sure" },
        note: { ko: "규격에서 역산해 제안드립니다", en: "We will derive it from the standards instead" } },
    ],
  },
  {
    /*
     * The matrix splits on the lining at every 10 m branch and through the
     * whole military segment — SAC-10/H against SAC-10/P, MIL CHC against MIL
     * CPC, MIL-STD Advanced Hybrid against Pyramid. Nowhere else: the 3 m and
     * 5 m chambers come one way, and asking would imply a choice that is not
     * offered.
     */
    id: "absorber",
    multi: false,
    when: (a) =>
      wantsAnechoic(a) && (a.level === "10m" || a.segments.includes("military")),
    kicker: { ko: "흡수체", en: "Absorber lining" },
    title: {
      ko: "흡수체 방식은 어느 쪽을 고려하고 계신가요?",
      en: "Which absorber lining are you considering?",
    },
    hint: {
      ko: "성능은 동등합니다. 하이브리드는 같은 정온 영역을 더 작은 방에서 얻고, 장피라미드는 라이닝이 저렴하고 시작 주파수가 더 낮습니다.",
      en: "The performance is equivalent. Hybrid reaches the same quiet zone in a smaller room; long pyramid is a cheaper lining and starts lower in frequency.",
    },
    options: [
      { id: "hybrid", label: { ko: "하이브리드 (페라이트 + Frankosorb®)", en: "Hybrid — ferrite with Frankosorb®" },
        note: { ko: "건물 면적을 아낄 때 · 30 MHz~40 GHz", en: "When floor area is the constraint — 30 MHz to 40 GHz" } },
      { id: "pyramid", label: { ko: "피라미드 (Frankosorb® 단독)", en: "Pyramid — Frankosorb® alone" },
        note: { ko: "라이닝 비용을 아낄 때 · 26 MHz~40 GHz", en: "When lining cost is the constraint — 26 MHz to 40 GHz" } },
      { id: "unsure", label: { ko: "잘 모르겠습니다", en: "Not sure" },
        note: { ko: "두 방식을 함께 제안드립니다", en: "We will show both" } },
    ],
  },
  {
    /*
     * Asked at every test-site distance, not only at 10 m: it is what picks
     * the dome shell from the square one at 3 m and 5 m, exactly as it picks
     * the SAC-10 size at 10 m.
     *
     * Not at 1 m — a component chamber is specified by its test distance and
     * its table, and the catalogue gives no quiet zone for one. The sizes on
     * offer follow the distance, so no list runs past five entries.
     */
    id: "qz",
    multi: false,
    when: (a) => wantsAnechoic(a) && isDistance(a.level) && a.level !== "1m",
    kicker: { ko: "정온 영역", en: "Quiet zone" },
    title: {
      ko: "필요한 정온 영역(QZ)은 어느 정도인가요?",
      en: "How large a quiet zone do you need?",
    },
    hint: {
      ko: "피시험체와 그 주변에서 반사가 규격 이내로 억제되는 원기둥 영역의 지름입니다. 챔버 외형 치수를 직접 결정합니다.",
      en: "The diameter of the cylinder around the EUT in which reflections stay inside the standard's limit. It sets the outer dimensions of the chamber directly.",
    },
    options: [
      { id: "1.2m", label: { ko: "ø1.2 m", en: "ø1.2 m" },
        note: { ko: "테이블탑 피시험체", en: "Table-top EUTs" },
        when: (a) => a.level === "3m" },
      { id: "1.5m", label: { ko: "ø1.5 m", en: "ø1.5 m" },
        when: (a) => a.level === "3m" },
      { id: "2m", label: { ko: "ø2.0 m", en: "ø2.0 m" },
        note: { ko: "거치형 기기 · 가장 흔한 치수", en: "Floor-standing equipment — the common size" },
        when: (a) => a.level === "3m" || a.level === "5m" },
      { id: "3m", label: { ko: "ø3.0 m", en: "ø3.0 m" },
        note: { ko: "승용차 · 대형 기기", en: "Passenger cars, large equipment" } },
      { id: "4m", label: { ko: "ø4.0 m", en: "ø4.0 m" },
        when: (a) => a.level === "5m" || a.level === "10m" },
      { id: "5m", label: { ko: "ø5.0 m", en: "ø5.0 m" },
        when: (a) => a.level === "10m" },
      { id: "6m", label: { ko: "ø6.0 m", en: "ø6.0 m" },
        note: { ko: "대형 차량 · 다중 피시험체", en: "Large vehicles, multiple EUTs" },
        when: (a) => a.level === "10m" },
      { id: "custom", label: { ko: "그 외 · 맞춤", en: "Something else — custom" } },
      { id: "unsure", label: { ko: "아직 정하지 못했습니다", en: "Not decided yet" } },
    ],
  },
  {
    // The one distance where the catalogue offers three ways to build the same
    // chamber, and the only question that can ask for either of the two the
    // matrix files under "Special". A customer chooses here on floor area and
    // on throughput — neither of which is a figure in the specification.
    id: "shell",
    multi: false,
    // Not once the quiet zone has already settled it: both of the shells the
    // matrix calls Special are fixed at ø3.0 m, so above that there is only
    // one way left to build the chamber and the question would be a formality.
    when: (a) =>
      wantsAnechoic(a) &&
      a.level === "10m" &&
      a.segments.includes("commercial") &&
      (!decided(a.qz) || a.qz === "3m"),
    kicker: { ko: "10 m 챔버 구성", en: "10 m configuration" },
    title: {
      ko: "10 m 챔버는 어떤 구성으로 지으시겠습니까?",
      en: "How should the 10 m chamber be built?",
    },
    hint: {
      ko: "같은 10 m 측정 거리를 세 가지 방식으로 짓습니다. 필요한 정온 영역에 맞춰 크기를 정하거나, 건물 면적을 최소로 줄이거나, 한 껍데기 안에 시험 축을 여러 개 두어 처리량을 올립니다.",
      en: "The same 10 m measurement distance, built three ways: sized to the quiet zone you need, squeezed into the smallest possible floor area, or given several test axes in one shell to raise throughput.",
    },
    options: [
      { id: "sized", label: { ko: "필요한 정온 영역에 맞춘 표준 구성", en: "Sized to the quiet zone" },
        note: { ko: "ø3.0~6.0 m 중 필요한 크기로", en: "Built to whichever of ø3.0 to ø6.0 m you need" } },
      { id: "compact", label: { ko: "건물 면적 최소 · 단일 축", en: "Smallest floor area, single axis" },
        note: { ko: "다각형 셸, 정온 영역 ø3.0 m 고정", en: "The polygonal shell, quiet zone fixed at ø3.0 m" } },
      { id: "multi", label: { ko: "처리량 우선 · 3축 병행", en: "Throughput first — three axes" },
        note: { ko: "10 m 축 1개와 3 m 축 2개를 한 셸에", en: "One 10 m axis and two 3 m axes in one shell" } },
      { id: "unsure", label: { ko: "아직 정하지 못했습니다", en: "Not decided yet" } },
    ],
  },
  {
    // The matrix's third level under E-Drive.
    id: "drive",
    multi: false,
    when: (a) => a.dut === "edrive",
    kicker: { ko: "부하기 구성", en: "Load machine" },
    title: {
      ko: "구동계 시험은 어떤 부하 구성인가요?",
      en: "Which load setup does the drivetrain test use?",
    },
    hint: {
      ko: "E-Drive 챔버는 부하기(dyno) 구성으로 나뉩니다. 이 답 하나로 EDTC 세 모델이 갈립니다.",
      en: "The E-Drive chambers differ by their dynamometer — this one answer separates the three EDTC models.",
    },
    options: [
      { id: "single", label: { ko: "고정 단축 부하기 (Fixed single dyno)", en: "Fixed single dyno" },
        note: { ko: "외부 부하기 1대 · 예: 250 kW", en: "One external load machine, e.g. 250 kW" } },
      { id: "eaxle", label: { ko: "고정 2축 부하기 (Fixed axis dyno)", en: "Fixed axis dyno" },
        note: { ko: "e-axle 시험 · 외부 부하기 2대", en: "E-axle testing — two external load machines" } },
      { id: "bluebox", label: { ko: "이동식 부하기 (Mobile dyno)", en: "Mobile dyno" },
        note: { ko: "EMC-BlueBox · 최대 120 kW", en: "The EMC-BlueBox, up to 120 kW" } },
      { id: "unsure", label: { ko: "아직 정하지 못했습니다", en: "Not decided yet" },
        note: { ko: "세 구성을 함께 제안드립니다", en: "We will show all three" } },
    ],
  },
  // The standards are no longer asked about. They used to be a last, optional
  // step pre-ticked from everything above, and confirming a list of regulation
  // numbers is not a question a reader of this flow is in a position to answer
  // better than the flow can answer it for them. `suggestStandards` still
  // derives the list from the segment and the test kinds, and the engine still
  // scores against it — nothing about the recommendation changed, only who is
  // asked. The Special track collects standards in its own questionnaire.
];

/** The questions this set of answers actually asks. Recomputed on every
 *  change, so unticking the last radiated-emission box removes the steps that
 *  depended on it rather than leaving a dead answer behind. */
export const visibleQuestions = (a: Answers): readonly Question[] =>
  questions.filter((q) => !q.when || q.when(a));

/** The options a question offers given the answers so far. */
export const visibleOptions = (q: Question, a: Answers): readonly Option[] =>
  q.options.filter((o) => !o.when || o.when(a));

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
  let out = a;
  // Two passes, because a question's visibility can depend on an answer the
  // first pass has just cleared — the quiet zone hangs off the level, which
  // hangs off the family, which hangs off the tests.
  for (let pass = 0; pass < 2; pass += 1) {
    const asked = new Set(visibleQuestions(out).map((q) => q.id));
    const dutQuestion = questions.find((q) => q.id === "dut")!;
    out = {
      ...out,
      specialUse: asked.has("specialUse") ? out.specialUse : undefined,
      // E-Drive is an option rather than a question, so it needs the same
      // treatment: deselecting Automotive takes it away. The whole question
      // closes on the Special track, and its answer goes with it.
      dut: !asked.has("dut")
        || (out.dut && !visibleOptions(dutQuestion, out).some((o) => o.id === out.dut))
        ? undefined
        : out.dut,
      tests: asked.has("tests") ? out.tests : [],
      family: asked.has("family") ? out.family : undefined,
      luf: asked.has("luf") ? out.luf : undefined,
      stirrer: asked.has("stirrer") ? out.stirrer : undefined,
      level: asked.has("level") ? out.level : undefined,
      ground: asked.has("ground") ? out.ground : undefined,
      absorber: asked.has("absorber") ? out.absorber : undefined,
      qz: asked.has("qz") ? out.qz : undefined,
      shell: asked.has("shell") ? out.shell : undefined,
      drive: asked.has("drive") ? out.drive : undefined,
    };
  }
  return out;
};

/* ------------------------------------------------------------------ *
 * The catalogue index
 * ------------------------------------------------------------------ */

/**
 * A configuration of a model that the questions can actually pin down.
 *
 * Only the discriminators the matrix branches on are carried — the absorber
 * and the quiet zone. A model whose variants differ in something nobody is
 * asked about (the ACTC and ACTC L, the three AVTC sizes) has none here: a
 * designation the answers cannot select is a designation the result would be
 * guessing at, and the model page lists them all anyway.
 *
 * Figures are the specification tables in chamber-sections.ts, verbatim.
 */
export type Variant = {
  name: string;
  absorber?: Absorber;
  qz?: QzSize;
  size: string;
  note: Record<Lang, string>;
};

/**
 * What the engine knows about a model beyond its catalogue entry.
 *
 * `full` and `pre` are kept apart on purpose. The CHC measures emission only
 * pre-compliantly while its immunity is fully compliant, and a recommendation
 * that folded those together would tell a reader they can certify in a chamber
 * they can only screen in.
 *
 * `branch` is a different thing again: what the model is *for*, which is not
 * always one thing. The CHC screens for emission and certifies for immunity in
 * the same room; the CHC Plus certifies above 1 GHz and screens below it. A
 * single filing would lose half of what each of them does, so this is a set
 * and most models simply take the default.
 */
export type Fit = {
  family: Family;
  /** What the model is for. Defaults to a test site — only the compact
   *  chambers name anything else. */
  branch?: readonly ("pre" | "full")[];
  /** Certifies emission from 1 GHz up while screening below it. */
  ghzEmission?: true;
  /** EUT scales the chamber takes. Empty for the E-Drive benches, which are
   *  selected by `edrive` instead. */
  dut: readonly DutSize[];
  /** An E-Drive bench — only ever recommended to that answer, and always. */
  edrive?: true;
  /** Tests it performs to full compliance. */
  full: readonly TestKind[];
  /** Tests it performs pre-compliantly only. */
  pre: readonly TestKind[];
  /** Measurement distances the catalogue specifies it at. Empty for the
   *  reverberation chambers, which have no distance concept at all. */
  distances: readonly Distance[];
  /** The lining, where the model comes only one way. Models offered in both
   *  carry it on their variants instead. */
  absorber?: Absorber;
  /** Quiet zones offered. Absent means the catalogue states none. */
  qz?: readonly QzSize[];
  /** Reverberation chambers only. */
  luf?: Luf;
  /** Reverberation chambers only. */
  stirrer?: Stirrer;
  /** Absent means semi-anechoic, which all but three of these are. */
  ground?: Ground;
  /** 10 m chambers only, and only where the catalogue offers a choice. */
  shell?: Shell;
  /** Filed by the matrix under "Special" — a real product, but not the answer
   *  to the ordinary form of the question. */
  special?: true;
  standards: readonly StandardId[];
  /** Industries beyond the model's own tag that the catalogue text names. */
  alsoIndustries?: readonly ChamberIndustry[];
  drive?: Drive;
  variants?: readonly Variant[];
  /**
   * The one thing this model does that the models around it do not — printed
   * as a reason for it rather than a note about it.
   *
   * Only where the rest of the row cannot say it. The SAC-3 Plus needs no
   * `edge`: being the 3 m chamber at the 3 m answer is the whole argument. The
   * CTC does, because what makes it worth its price is that five standards
   * live in one room, and no single answer asks for that.
   */
  edge?: Record<Lang, string>;
  /** Where the model's compliance is narrower than the row above would
   *  suggest. Printed on the result card, verbatim. */
  caveat?: Record<Lang, string>;
};

/** A test site unless the model says otherwise. */
const branchOf = (fit: Fit): readonly ("pre" | "full")[] => fit.branch ?? ["full"];

const ALL: readonly TestKind[] = testKinds;
const QZ_ALL: readonly QzSize[] = ["3m", "4m", "5m", "6m"];

/**
 * One entry per model in `chamberModels`. Coverage is checked where the
 * catalogue and this index are joined (mychamber-catalogue.ts), so adding a
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
    family: "anechoic", branch: ["pre"], dut: ["component"], full: ["ci", "ri"], pre: ["ce", "re"], distances: ["1m"],
    standards: ["cispr25", "iso11452"], alsoIndustries: ["powertrain"],
    edge: {
      ko: "GTEM 셀을 대체하는 가장 작은 CISPR 25 사전 인증 챔버입니다",
      en: "The smallest CISPR 25 pre-compliance chamber there is — the alternative to a GTEM cell",
    },
    caveat: {
      ko: "GTEM 셀을 대체하는 초소형 사전 인증 챔버입니다. 방출 측정은 사전 인증 범위입니다.",
      en: "An ultra-compact pre-compliance chamber, the alternative to a GTEM cell. Emission measurement is pre-compliant.",
    },
  },
  "SAC-10V": {
    family: "anechoic", dut: ["vehicle", "large-vehicle"], full: ALL, pre: [], distances: ["10m"],
    qz: ["6m"], standards: ["ecer10", "cispr12", "iso11451", "cispr16"],
    variants: [
      { name: "SAC-10V-6/H", absorber: "hybrid", qz: "6m", size: "22,580 × 15,680 × 8,700 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø6.0 m (H = 3.0 m)", en: "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10V-6/P", absorber: "pyramid", qz: "6m", size: "26,480 × 20,180 × 9,000 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø6.0 m (H = 3.0 m)", en: "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)" } },
    ],
    caveat: {
      ko: "다이나모미터가 통합된 구성으로, 구동 상태의 완성차 시험을 전제로 합니다. 12 m·18 m 대형 차량용 SL12·SL18 구성과, 5.0 m로 시작해 10.0 m 대응을 준비해 두는 SAC-10VC 구성이 있습니다.",
      en: "Built around an integrated dynamometer, for whole vehicles tested under load. SL12 and SL18 take 12 m and 18 m vehicles, and the SAC-10VC starts at 5.0 m while prepared for a 10.0 m test distance.",
    },
  },
  AVTC: {
    family: "anechoic", dut: ["component", "equipment", "vehicle"], full: ALL, pre: [], distances: ["3m"],
    qz: ["3m"], standards: ["ecer10", "cispr12", "iso11451", "cispr25"],
  },

  /* Military */
  "MIL CHC": {
    family: "anechoic", dut: ["component"], full: ALL, pre: [], distances: ["1m"],
    standards: ["mil461", "do160"],
    variants: [
      { name: "MIL CHC", absorber: "hybrid", size: "4,880 × 4,880 × 3,000 mm",
        note: { ko: "9 kHz / 30 MHz~40 GHz, 하이브리드 흡수체", en: "9 kHz / 30 MHz to 40 GHz, hybrid absorber lining" } },
      { name: "MIL CPC", absorber: "pyramid", size: "6,080 × 5,380 × 3,750 mm",
        note: { ko: "9 kHz / 80 MHz~40 GHz, 단피라미드 흡수체", en: "9 kHz / 80 MHz to 40 GHz, short-pyramid lining" } },
    ],
  },
  "MIL-STD Chamber": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [],
    distances: ["1m", "3m"], absorber: "pyramid", qz: ["custom"], standards: ["mil461", "do160"],
    caveat: {
      ko: "단피라미드(P600) 라이닝으로 80 MHz부터 대응합니다. 26/30 MHz까지 필요하시면 Advanced 쪽입니다.",
      en: "A short-pyramid (P600) lining, from 80 MHz up. If the range has to start at 26 or 30 MHz, that is the Advanced.",
    },
  },
  "MIL-STD Chamber Advanced": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [],
    distances: ["1m", "3m", "10m"], qz: ["custom"],
    standards: ["mil461", "do160", "cispr12", "ecer10", "cispr32", "cispr16"],
    alsoIndustries: ["automotive", "commercial"],
    variants: [
      { name: "MIL-STD Advanced Hybrid", absorber: "hybrid", size: "Custom size",
        note: { ko: "9 kHz / 30 MHz~40 GHz, 하이브리드 흡수체", en: "9 kHz / 30 MHz to 40 GHz, hybrid absorber lining" } },
      { name: "MIL-STD Advanced Pyramid", absorber: "pyramid", size: "Custom size",
        note: { ko: "9 kHz / 26 MHz~40 GHz, 장피라미드(P2400) 흡수체", en: "9 kHz / 26 MHz to 40 GHz, long-pyramid (P2400) absorbers" } },
    ],
  },

  /* Commercial — semi-anechoic */
  "SAC-3 Plus": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    qz: ["1.2m", "1.5m", "2m"], standards: ["cispr32", "cispr16", "iec61000_4_3"],
  },
  "SAC-3 Square": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    qz: ["2m", "3m"], standards: ["cispr32", "cispr16", "iec61000_4_3"],
    edge: {
      ko: "전통적인 사각 셸이라 ø3.0 m 정온 영역과 대형 턴테이블·이동식 다이나모미터를 받아들입니다",
      en: "The traditional square shell — room for a ø3.0 m quiet zone and a large turntable or mobile dynamometer",
    },
  },
  "SAC-5 Plus": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m", "5m"],
    qz: ["2m", "3m"], standards: ["cispr32", "cispr16", "iec61000_4_3"],
  },
  "SAC-5 Square": {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m", "5m"],
    qz: ["2m", "3m", "4m"], standards: ["cispr32", "cispr16", "iec61000_4_3"],
    edge: {
      ko: "5.0 m에서 ø4.0 m 정온 영역까지 넓히고 대형 턴테이블·이동식 다이나모미터를 받아들이는 사각 셸입니다",
      en: "The square shell that stretches to a ø4.0 m quiet zone at 5.0 m, ready for a larger turntable or a mobile dynamometer",
    },
  },
  "SAC-10 Plus": {
    family: "anechoic", dut: ["equipment", "vehicle"], full: ALL, pre: [], distances: ["10m"],
    qz: ["3m"], shell: "compact", special: true, standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"],
    alsoIndustries: ["automotive"],
    edge: {
      ko: "같은 Triton 쉘을 단일 축으로 쓰는 가장 저렴한 10 m 구성입니다",
      en: "The same Triton shell on a single axis — the least expensive way to a 10 m chamber",
    },
    caveat: {
      ko: "Triton 쉘의 단일 축 구성입니다. 정온 영역은 ø3.0 m 고정이며, 더 큰 QZ가 필요하시면 SAC-10/H 또는 SAC-10/P 쪽입니다.",
      en: "The single-axis configuration of the Triton shell. The quiet zone is fixed at ø3.0 m — for anything larger the answer is the SAC-10/H or SAC-10/P.",
    },
  },
  "SAC-10 Plus Triton": {
    family: "anechoic", dut: ["equipment", "vehicle"], full: ALL, pre: [], distances: ["3m", "10m"],
    qz: ["3m"], shell: "multi", special: true, standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"],
    alsoIndustries: ["automotive"],
    caveat: {
      ko: "하나의 다각형 쉘 안에 10 m 축 1개와 3 m 축 2개를 두어, 안테나와 바닥 흡수체를 옮기지 않고 세 시험을 병행합니다. 한 건물에서 처리량을 최대로 끌어올려야 할 때의 답입니다.",
      en: "One 10 m axis and two 3 m axes in a single polygonal shell — three tests in parallel, with the antennas and floor absorbers staying in place. The answer when throughput in one building is the constraint.",
    },
  },
  "SAC-10/H Hybrid": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [],
    distances: ["10m"], absorber: "hybrid", qz: QZ_ALL, shell: "sized",
    standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"], alsoIndustries: ["automotive"],
    variants: [
      { name: "SAC-10-3/H", absorber: "hybrid", qz: "3m", size: "18,380 × 12,830 × 8,550 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø3.0 m (H = 3.0 m)", en: "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10-4/H", absorber: "hybrid", qz: "4m", size: "19,280 × 13,280 × 8,550 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø4.0 m (H = 3.0 m)", en: "QZ ø4.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10-5/H", absorber: "hybrid", qz: "5m", size: "21,080 × 15,080 × 8,700 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø5.0 m (H = 3.0 m)", en: "QZ ø5.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10-6/H", absorber: "hybrid", qz: "6m", size: "21,680 × 15,680 × 8,700 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø6.0 m (H = 3.0 m)", en: "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)" } },
    ],
  },
  "SAC-10/P Pyramid": {
    family: "anechoic", dut: ["equipment", "vehicle", "large-vehicle"], full: ALL, pre: [],
    distances: ["10m"], absorber: "pyramid", qz: QZ_ALL, shell: "sized",
    standards: ["cispr32", "cispr16", "cispr12", "iec61000_4_3"], alsoIndustries: ["automotive"],
    variants: [
      { name: "SAC-10-3/P", absorber: "pyramid", qz: "3m", size: "21,680 × 13,730 × 8,550 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø3.0 m (H = 3.0 m)", en: "QZ ø3.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10-4/P", absorber: "pyramid", qz: "4m", size: "21,680 × 13,730 × 8,550 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø4.0 m (H = 3.0 m)", en: "QZ ø4.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10-5/P", absorber: "pyramid", qz: "5m", size: "23,480 × 16,580 × 9,000 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø5.0 m (H = 3.0 m)", en: "QZ ø5.0 m at 10.0 m test distance (H = 3.0 m)" } },
      { name: "SAC-10-6/P", absorber: "pyramid", qz: "6m", size: "24,980 × 17,180 × 9,000 mm",
        note: { ko: "10.0 m 측정 거리에서 QZ ø6.0 m (H = 3.0 m)", en: "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)" } },
    ],
  },

  /* Commercial — fully anechoic */
  "FAC-3": {
    family: "anechoic", ground: "fac", dut: ["component"], full: ALL, pre: [], distances: ["3m"],
    qz: ["1.5m"], standards: ["cispr32", "iec61000_4_3", "iec61000_4_22"],
    caveat: {
      ko: "접지면이 없는 자유공간 조건입니다. 접지면을 요구하는 시험장 규격에는 반무향(SAC) 계열이 필요합니다.",
      en: "Free-space conditions, with no ground plane. A test-site standard that requires one needs a semi-anechoic chamber instead.",
    },
  },
  "FAC-3 L": {
    family: "anechoic", ground: "fac", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    qz: ["1.5m"], standards: ["cispr32", "iec61000_4_3", "iec61000_4_22"],
    caveat: {
      ko: "접지면이 없는 자유공간 조건입니다. 높이 스캔으로 거치형 피시험체까지 대응합니다.",
      en: "Free-space conditions, with a height scan that extends it to floor-standing EUTs.",
    },
  },
  "SAC-3 / FAC-3 Transformer": {
    family: "anechoic", ground: "both", dut: ["component", "equipment"], full: ALL, pre: [], distances: ["3m"],
    qz: ["1.5m", "2m"], standards: ["cispr32", "cispr16", "iec61000_4_3", "iec61000_4_22"],
    caveat: {
      ko: "바닥 흡수체를 넣고 빼는 것으로 반무향과 완전무향을 오갑니다. 두 조건이 모두 필요할 때의 답입니다.",
      en: "Converts between semi-anechoic and fully anechoic by adding or removing the floor absorbers — the answer when both conditions are needed.",
    },
  },

  /* Commercial — compact and component */
  /*
   * The three compact chambers, and the one place the head office matrix and
   * the model pages do not line up.
   *
   * The matrix files CHC and CTC under Commercial pre-compliance and leaves
   * CHC Plus out altogether. The model pages say more than that: the CHC is
   * full compliant for immunity at 3.0 m and pre-compliant only for emission,
   * the CHC Plus adds compliant emission from 1 GHz to 18 GHz, and the CTC is
   * a full compliant chamber at two distances that covers five standards at
   * once. So `branch` carries both where a chamber really serves both, rather
   * than filing each one in a single place and losing half of what it does.
   */
  CHC: {
    family: "anechoic", branch: ["pre", "full"], dut: ["component", "equipment"],
    full: ["ci", "ri", "ce"], pre: ["re"],
    distances: ["3m"], absorber: "hybrid", qz: ["1.2m"], standards: ["iec61000_4_3", "cispr32"],
    edge: {
      ko: "정식 인증 내성과 사전 인증 방출을 한 방에서 해결하는 가장 작은 3 m 챔버입니다",
      en: "The smallest 3 m chamber that puts full compliant immunity and pre-compliance emission in one room",
    },
    caveat: {
      ko: "내성은 3 m 정식 인증, 방사 방출은 사전 인증 범위입니다. 정온 영역은 ø1.2 m입니다.",
      en: "Full compliant immunity at 3 m; radiated emission is pre-compliant. The quiet zone is ø1.2 m.",
    },
  },
  "CHC Plus": {
    family: "anechoic", branch: ["pre", "full"], dut: ["component", "equipment"], full: ALL, pre: [],
    distances: ["3m"], absorber: "hybrid", ghzEmission: true, qz: ["1.2m"],
    standards: ["iec61000_4_3", "cispr32", "cispr16"],
    edge: {
      ko: "1 GHz~18 GHz 구간을 정식 인증 수준으로 측정합니다 — 컴팩트 챔버에서 레이더·무선 대역을 인증할 수 있는 구성입니다",
      en: "Measures 1 GHz to 18 GHz to full compliance — the compact chamber that can certify the radar and radio bands",
    },
    caveat: {
      ko: "적합 방사 방출 측정 구간은 1 GHz~18 GHz입니다. 30 MHz~1 GHz 구간은 사전 인증 범위이고, 정온 영역은 ø1.2 m입니다.",
      en: "Compliant emission measurement runs from 1 GHz to 18 GHz. From 30 MHz to 1 GHz it is pre-compliant, and the quiet zone is ø1.2 m.",
    },
  },
  CTC: {
    family: "anechoic", dut: ["component", "equipment"], full: ALL, pre: [],
    distances: ["1m", "3m"], absorber: "hybrid",
    standards: ["iec61000_4_3", "cispr25", "iso11452", "mil461", "do160"],
    alsoIndustries: ["automotive", "military", "powertrain"],
    edge: {
      ko: "CISPR 25 · ISO 11452 · MIL-STD 461 · DO-160 · IEC 61000-4-3을 한 챔버에서 정식 인증합니다",
      en: "Certifies CISPR 25, ISO 11452, MIL-STD 461, DO-160 and IEC 61000-4-3 in one chamber",
    },
    caveat: {
      ko: "내성 시험을 중심에 둔 부품 챔버입니다. CISPR 25 · ISO 11452 · MIL-STD 461 · DO-160은 1.0 m, IEC 61000-4-3은 3.0 m 측정 거리에서 정식 인증됩니다. 테이블 배치와 거치형 배치를 모두 지원하며 적재 하중은 2,000 kg입니다.",
      en: "A component chamber built around immunity testing. CISPR 25, ISO 11452, MIL-STD 461 and DO-160 are certified at 1.0 m and IEC 61000-4-3 at 3.0 m. It takes both a table setup and floor-standing EUTs, up to 2,000 kg.",
    },
  },

  /* Powertrain — E-Drive */
  "EDTC-SA": {
    family: "anechoic", dut: [], edrive: true, full: ALL, pre: [], distances: ["1m"],
    drive: "single", standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },
  "EDTC-AX": {
    family: "anechoic", dut: [], edrive: true, full: ALL, pre: [], distances: ["1m"],
    drive: "eaxle", standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },
  "EDTC-BB": {
    family: "anechoic", dut: [], edrive: true, full: ALL, pre: [], distances: ["1m"],
    drive: "bluebox", standards: ["cispr25", "iso11452", "iec61000_4_3"], alsoIndustries: ["automotive"],
  },

  /* Reverberation */
  "RVC e1": {
    family: "reverberation", stirrer: "zfold", luf: 200, dut: ["component", "equipment"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21"],
  },
  "RVC e2": {
    family: "reverberation", stirrer: "zfold", luf: 80, dut: ["component", "equipment"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21"],
  },
  "RVC S": {
    family: "reverberation", stirrer: "zfold", luf: 200, dut: ["component"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso1145211", "mil461"], alsoIndustries: ["military", "powertrain"],
  },
  "RVC M": {
    family: "reverberation", stirrer: "zfold", luf: 200, dut: ["component", "equipment"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso1145211", "mil461"], alsoIndustries: ["military", "powertrain"],
  },
  "RVC L": {
    family: "reverberation", stirrer: "zfold", luf: 80, dut: ["vehicle"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso11451", "mil461"], alsoIndustries: ["military"],
  },
  "RVC XL": {
    family: "reverberation", stirrer: "disc", luf: 80, dut: ["vehicle"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso11451", "mil461"], alsoIndustries: ["military"],
  },
  "RVC XXL": {
    family: "reverberation", stirrer: "disc", luf: 80, dut: ["vehicle", "large-vehicle"], full: ["ri"], pre: ["re"], distances: [],
    standards: ["iec61000_4_21", "iso11451", "mil461"], alsoIndustries: ["military"],
  },

  /* Shielding */
  "Shielded Room": {
    family: "shielded", dut: ["component", "equipment", "vehicle", "large-vehicle"],
    full: [], pre: [], distances: [], standards: ["en50147"],
    alsoIndustries: ["automotive", "military", "commercial", "powertrain"],
  },
};

/* ------------------------------------------------------------------ *
 * The engine
 * ------------------------------------------------------------------ */

/** What the wizard needs about a model in the browser. Built on the server
 *  from `chamberModels` so the questionnaire does not pull the whole chamber
 *  content module — with its two locales of model prose — into the client
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
  /** Why this model, in the reader's language — at most five lines. */
  reasons: string[];
  /** The exact configuration, where the answers pinned one down. */
  variant?: { name: string; size: string; note: string };
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
    edrive: "부하기를 갖춘 구동계 전용 챔버입니다",
    distance: (d: string) => `${d} 측정 거리 규격에 적합합니다`,
    pre: "사전 인증 스크리닝을 전제로 설계된 챔버입니다",
    ghz: "1 GHz 이상은 정식 인증, 그 아래는 사전 인증으로 측정합니다",
    absorber: (label: string) => `${label} 라이닝으로 구성됩니다`,
    qz: (label: string) => `정온 영역 ${label} 구성이 있습니다`,
    rvc: "같은 증폭기로 더 높은 전계를 만드는 잔향실 방식입니다",
    luf: (mhz: number) => `${mhz} MHz부터 사용할 수 있는 크기입니다`,
    stirrer: (label: string) => `${label} 구성입니다`,
    ground: (label: string) => `${label} 조건으로 측정합니다`,
    groundBoth: "바닥 흡수체를 넣고 빼며 반무향과 완전무향을 오갑니다",
    shell: (label: string) => `${label} 구성입니다`,
    shielding: "EMC 시험장이 아니라 차폐 자체를 위한 제품입니다",
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
    edrive: "A drivetrain chamber, built around a load machine",
    distance: (d: string) => `Compliant at the ${d} measurement distance`,
    pre: "Designed as a pre-compliance screening chamber",
    ghz: "Certified above 1 GHz, pre-compliant below it",
    absorber: (label: string) => `Lined with ${label}`,
    qz: (label: string) => `Available with a ${label} quiet zone`,
    rvc: "A reverberation chamber — higher field strength from the same amplifier",
    luf: (mhz: number) => `Large enough to be usable from ${mhz} MHz`,
    stirrer: (label: string) => `Stirred by ${label}`,
    ground: (label: string) => `Measures under ${label} conditions`,
    groundBoth: "Converts between semi-anechoic and fully anechoic by adding or removing the floor absorbers",
    shell: (label: string) => `Built ${label}`,
    shielding: "Built for the shielding itself, not as a test site",
    drive: (label: string) => `Built for the ${label} load setup`,
    standards: (list: string) => `Covers ${list}`,
  },
} as const;

/** Short forms of the EUT options — the option labels themselves carry a size
 *  in brackets, which reads as an aside in a sentence. */
const dutLabel: Record<Lang, Record<DutSize, string>> = {
  ko: {
    component: "부품·모듈",
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

const absorberLabel: Record<Lang, Record<Absorber, string>> = {
  ko: { hybrid: "하이브리드", pyramid: "장피라미드" },
  en: { hybrid: "hybrid absorbers", pyramid: "long-pyramid absorbers" },
};

const qzLabel: Record<Lang, Record<QzSize, string>> = {
  ko: {
    "1.2m": "ø1.2 m", "1.5m": "ø1.5 m", "2m": "ø2.0 m", "3m": "ø3.0 m",
    "4m": "ø4.0 m", "5m": "ø5.0 m", "6m": "ø6.0 m", custom: "맞춤 치수",
  },
  en: {
    "1.2m": "ø1.2 m", "1.5m": "ø1.5 m", "2m": "ø2.0 m", "3m": "ø3.0 m",
    "4m": "ø4.0 m", "5m": "ø5.0 m", "6m": "ø6.0 m", custom: "custom-sized",
  },
};

const stirrerLabel: Record<Lang, Record<Stirrer, string>> = {
  ko: { zfold: "Z-폴드 스터러", disc: "대형 디스크 스터러" },
  en: { zfold: "a Z-fold paddle", disc: "large discs" },
};

const groundLabel: Record<Lang, Record<Exclude<Ground, "both">, string>> = {
  ko: { sac: "접지면이 있는 반무향", fac: "접지면이 없는 완전무향 자유공간" },
  en: { sac: "semi-anechoic, with a ground plane", fac: "fully anechoic free-space" },
};

const shellLabel: Record<Lang, Record<Shell, string>> = {
  ko: {
    sized: "필요한 정온 영역에 맞춘 표준",
    compact: "건물 면적을 최소로 줄인 단일 축",
    multi: "한 셸에 10 m 축 1개와 3 m 축 2개를 둔 3축 병행",
  },
  en: {
    sized: "to the quiet zone you asked for",
    compact: "for the smallest possible floor area, on a single axis",
    multi: "with one 10 m axis and two 3 m axes in a single shell",
  },
};

const driveLabel: Record<Lang, Record<Drive, string>> = {
  ko: { single: "고정 단축", eaxle: "고정 2축(e-axle)", bluebox: "이동식 EMC-BlueBox" },
  en: { single: "fixed single dyno", eaxle: "fixed axis dyno", bluebox: "mobile EMC-BlueBox" },
};

/** The segment names, read off the first question rather than kept as a
 *  second copy — they are the labels the reader just chose from. */
const segmentName = (s: Segment, lang: Lang) =>
  questions
    .find((q) => q.id === "segments")!
    .options.find((o) => o.id === s)?.label[lang] ?? s;

/** True where the reader actually chose, rather than skipping. */
const decided = <T extends string>(v: T | "unsure" | undefined): v is T =>
  Boolean(v) && v !== "unsure";

/**
 * The configuration the answers pin down, if they pin one down.
 *
 * Returns nothing when the reader answered neither discriminator: naming
 * "SAC-10-3/H" to somebody who never said which quiet zone they need would be
 * the result inventing a specification, which is the one thing this file may
 * not do.
 */
export const pickVariant = (fit: Fit, a: Answers): Variant | undefined => {
  if (!fit.variants) return undefined;

  // A discriminator only discriminates where the model actually offers a
  // choice on it. Every SAC-10/P configuration is pyramid-lined, so a reader
  // who asked for hybrid has not ruled the model's own quiet-zone sizes out —
  // they have ranked the model lower, which the scoring below already did. The
  // quiet zone still picks which SAC-10-x/P is meant.
  const choices = (key: "absorber" | "qz") =>
    new Set(fit.variants!.map((v) => v[key]).filter(Boolean)).size > 1;
  const byAbsorber = choices("absorber") && decided(a.absorber);
  const byQz = choices("qz") && decided(a.qz);
  if (!byAbsorber && !byQz) return undefined;

  return fit.variants.find(
    (v) =>
      (!byAbsorber || v.absorber === a.absorber) && (!byQz || v.qz === a.qz),
  );
};

/**
 * Rank the catalogue against a set of answers and return the shortlist.
 *
 * Empty is a real answer, not a failure: a 5 m compliant measurement of a bus
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
   * the military vehicle chambers technically clear every filter. Printing
   * those under "Alternative" would present a defence chamber as a runner-up
   * to a powertrain one, which is not what the ranking means.
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

  // Shielding and testing are different purchases. A shielded room performs no
  // EMC test, so it is never the answer to "which chamber runs this test" —
  // and equally, a reader who asked for shielding alone is not served by a
  // list of test chambers.
  if (a.dut === "shielding") {
    if (fit.family !== "shielded") return null;
    return {
      entry,
      score: 100,
      reasons: [t.shielding, ...(fit.edge ? [fit.edge[lang]] : [])],
      caveat: fit.caveat?.[lang],
    };
  }
  if (fit.family === "shielded") return null;

  // An explicit form preference is a filter, not a nudge: a reader who picked
  // "reverberation" is not served by a list of anechoic chambers.
  if (a.family === "anechoic" && fit.family !== "anechoic") return null;
  if (a.family === "reverberation" && fit.family !== "reverberation") return null;

  // A reverberation chamber cannot make a compliant radiated-emission
  // measurement at a defined distance — the field in it is deliberately
  // stirred, which is the whole point of the method.
  if (a.tests.includes("re") && fit.family !== "anechoic") return null;

  // The E-Drive benches and everything else are mutually exclusive: those
  // chambers are built around a load machine and do nothing without one.
  if (a.dut === "edrive") {
    if (!fit.edrive) return null;
    score += 22;
    reasons.push(t.edrive);
  } else {
    if (fit.edrive) return null;
    // Too small for the EUT.
    const want = a.dut ? dutSizes.indexOf(a.dut) : -1;
    const covers = fit.dut.map((d) => dutSizes.indexOf(d));
    if (want >= 0) {
      if (covers.includes(want)) {
        score += 20;
        reasons.push(t.dut(dutLabel[lang][a.dut as DutSize]));
      } else if (Math.max(...covers) > want) {
        score += 7;
        reasons.push(t.dutOver(dutLabel[lang][a.dut as DutSize]));
      } else {
        return null;
      }
    }
  }

  // Screening against certifying, and the distance that goes with it. A 3 m
  // chamber does not become a 10 m chamber, so that one is a filter; a
  // screening chamber offered to somebody certifying stays in the list at a
  // penalty, because a compact chamber next to a test site is a real choice.
  const branch = branchOf(fit);
  if (a.level === "pre") {
    if (branch.includes("pre")) {
      score += 24;
      reasons.push(t.pre);
      // Plain screening was asked for, and the certified band above 1 GHz is
      // an upgrade with a price on it. The reader who wants it has an answer
      // of their own one line down.
      if (fit.ghzEmission) score -= 18;
    } else {
      score -= 14;
    }
  } else if (a.level === "pre-1ghz") {
    if (fit.ghzEmission) {
      score += 30;
      reasons.push(t.ghz);
    } else if (branch.includes("pre")) {
      // Screens, but stops where the certified band begins.
      score += 6;
    } else {
      score -= 14;
    }
  } else if (isDistance(a.level)) {
    // A reverberation chamber has no test distance to compare against. It is
    // neither credited nor filtered here, so a reader who named a distance
    // while leaving the form open still sees one beside the test sites.
    if (fit.distances.length > 0) {
      if (!fit.distances.includes(a.level)) return null;
      score += 24;
      reasons.push(t.distance(a.level.replace("m", " m")));
      if (!branch.includes("full")) score -= 8;
    }
  }

  // An E-Drive chamber is built around one load machine. Offering the e-axle
  // chamber to somebody who has one motor is offering the wrong building.
  if (decided(a.drive)) {
    if (fit.drive === a.drive) {
      score += 26;
      reasons.push(t.drive(driveLabel[lang][a.drive]));
    } else if (fit.drive) {
      return null;
    }
  }

  /* --- weighted scoring -------------------------------------------- */

  /*
   * The model's own filing, against the segments the reader chose.
   *
   * The comparison runs on the catalogue's industries rather than on the three
   * segments, because that is what a model carries — and it is why the E-Drive
   * benches, which the catalogue tags Powertrain, score as full members of the
   * Automotive segment the matrix files them under rather than as cross-segment
   * strangers. The reason line still prints the model's own label, because
   * "Powertrain line-up" is what the catalogue and the quotation will say.
   */
  const covered = coveredIndustries(a.segments);
  if (covered.includes(entry.industry)) {
    score += 30;
    reasons.unshift(t.industry(entry.industryLabel));
  } else {
    const also = fit.alsoIndustries?.find((i) => covered.includes(i));
    if (also) {
      score += 20;
      reasons.unshift(t.alsoIndustry(entry.industryLabel, segmentName(segmentOf(also), lang)));
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

  // The lining. Decisive rather than advisory: it is the only thing separating
  // the SAC-10/H from the SAC-10/P, and the matrix treats it as a branch.
  const linings = fit.variants?.map((v) => v.absorber).filter(Boolean) ?? [];
  const offers = fit.absorber ? [fit.absorber, ...linings] : linings;
  if (decided(a.absorber) && offers.length > 0) {
    if (offers.includes(a.absorber)) {
      score += 18;
      reasons.push(t.absorber(absorberLabel[lang][a.absorber]));
    } else {
      score -= 22;
    }
  }

  // The lowest usable frequency is a floor the room's volume sets, so a
  // chamber that cannot reach it is out rather than merely behind. Asking for
  // 200 MHz and being offered an 80 MHz room is the opposite case: it works,
  // and it is a bigger building than the answer needed.
  if (decided(a.luf) && fit.luf) {
    const want = Number(a.luf) as Luf;
    if (fit.luf > want) return null;
    score += fit.luf === want ? 20 : 6;
    reasons.push(t.luf(fit.luf));
  }

  // The stirrer, at vehicle scale. Decisive rather than advisory: it is the
  // only thing separating the RVC L from the XL and the XXL.
  if (decided(a.stirrer) && fit.stirrer) {
    if (fit.stirrer === a.stirrer) {
      score += 20;
      reasons.push(t.stirrer(stirrerLabel[lang][a.stirrer]));
    } else {
      score -= 22;
    }
  }

  // The floor. A chamber built one way cannot be used the other way, so a
  // mismatch is a heavy penalty; the Transformer answers "both" and nothing
  // else does. It also answers "sac" and "fac" — it converts, after all — but
  // behind the chambers built for exactly that floor: a reader who needs one
  // condition should not be steered to the convertible room first, and the
  // matrix keeps the Transformer a leaf of its own for the same reason.
  const ground = fit.ground ?? "sac";
  if (decided(a.ground)) {
    if (a.ground === "both") {
      score += ground === "both" ? 30 : -20;
      if (ground === "both") reasons.push(t.groundBoth);
    } else if (ground === a.ground) {
      score += 20;
      reasons.push(t.ground(groundLabel[lang][a.ground]));
    } else if (ground === "both") {
      score += 8;
      reasons.push(t.groundBoth);
    } else {
      score -= 22;
    }
  }

  // How the 10 m chamber is built. When the reader has said, the "Special"
  // penalty below no longer applies — they asked for it by name.
  if (decided(a.shell) && fit.shell) {
    if (fit.shell === a.shell) {
      score += 26;
      reasons.push(t.shell(shellLabel[lang][a.shell]));
    } else {
      score -= 18;
    }
  }

  // The quiet zone. `custom` matches anything dimensioned to order.
  if (decided(a.qz) && fit.qz) {
    if (fit.qz.includes(a.qz) || fit.qz.includes("custom")) {
      score += 14;
      reasons.push(t.qz(qzLabel[lang][a.qz]));
    } else {
      score -= 16;
    }
  }

  // No stated preference: a reverberation chamber earns a small edge where it
  // is genuinely the better instrument — radiated immunity with no emission
  // measurement to satisfy.
  if (!decided(a.family) && fit.family === "reverberation") {
    score += 8;
    reasons.push(t.rvc);
  }

  const wanted = effectiveStandards(a);
  const hits = wanted.filter((s) => fit.standards.includes(s));
  score += hits.length * 7;
  if (wanted.length > 0 && hits.length === 0) score -= 8;
  if (hits.length > 0) reasons.push(t.standards(hits.map(standardName).join(", ")));

  // Filed under "Special" by the matrix. A real product, and a good one where
  // its own trick is what the reader needs — but not the ordinary answer, so
  // it sits behind the models the matrix puts on the main branch.
  if (fit.special && !decided(a.shell)) score -= 10;

  // Last line, and no score attached: what the model does that its neighbours
  // do not is a reason to read on, not a reason it placed where it did. It
  // takes the last of the five slots rather than competing for one, because a
  // card that drops this line is a card that no longer says why this model.
  const shown = reasons.slice(0, fit.edge ? 4 : 5);
  if (fit.edge) shown.push(fit.edge[lang]);

  const variant = pickVariant(fit, a);

  return {
    entry,
    score,
    // Five lines is what a card can carry before it stops being read.
    reasons: shown,
    variant: variant && { name: variant.name, size: variant.size, note: variant.note[lang] },
    caveat: fit.caveat?.[lang],
  };
}
