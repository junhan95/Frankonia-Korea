import { standards, type QuestionnaireId, type SegmentChoice } from "./mychamber-advisor";
import type { ChamberIndustry } from "./chamber-sections";
import type { Lang } from "./site-config";

/**
 * The five questionnaires of the Chamber Matrix extension (12 August 2026).
 *
 * The extension hangs a circled questionnaire under every segment — Ⓐ
 * Automotive, Ⓑ Commercial Industrial, Ⓒ Military, Ⓓ Special Chambers — and
 * draws a free-standing ⓧ Custom Request beside the tree. The matrix names
 * them and nothing more, so what each one asks is decided here, on one rule:
 * a field exists because the engineering team needs its answer to reply
 * usefully, and its options state nothing about the products that the
 * catalogue does not.
 *
 * Ⓐ–Ⓒ are the escape hatch of a segment whose tree did not fit — reached from
 * the wizard when the standard flow has no answer, or when the reader says so
 * themselves. Ⓓ is not an escape hatch: the Special Chambers segment has no
 * catalogue models, so its whole branch *is* the questionnaire. ⓧ is for the
 * reader who cannot place themselves in a segment at all.
 *
 * Like the wizard, nothing here is posted anywhere: the answers are assembled
 * into a `mailto:` the reader sends themselves — see mychamber-questionnaire.tsx.
 */

export type { QuestionnaireId };

type L = Record<Lang, string>;

export type QChoiceOption = { id: string; label: L; note?: L };

/** What the form holds: one entry per field, a string for everything but the
 *  multi-choice fields. Declared here rather than in the component because
 *  `when` below is written against it. */
export type QValues = Readonly<Record<string, string | readonly string[]>>;

/**
 * A field only asked of some readers.
 *
 * The E-Drive fields are the case that needed it: the load machine's rating is
 * the number a drivetrain bench is quoted from and means nothing to anybody
 * testing a component, so it appears when the reader says E-Drive and not
 * before. A hidden field is neither required nor written into the message —
 * see `visibleFields`.
 */
type QWhen = { when?: (values: QValues) => boolean };

export type QField = QWhen &
  (
    | {
        kind: "choice";
        id: string;
        label: L;
        /** Checkboxes when true, radio buttons when false. */
        multi?: true;
        optional?: true;
        options: readonly QChoiceOption[];
      }
    | { kind: "text"; id: string; label: L; optional?: true; placeholder?: L }
    | { kind: "textarea"; id: string; label: L; optional?: true; placeholder?: L }
  );

export type Questionnaire = {
  id: QuestionnaireId;
  /** The matrix node the questionnaire hangs under. `custom` is ⓧ. */
  segment: SegmentChoice | "custom";
  /** The circled letter, spelled the way the matrix writes it. */
  name: L;
  title: L;
  intro: L;
  fields: readonly QField[];
};

/* ------------------------------------------------------------------ *
 * Shared fields
 * ------------------------------------------------------------------ */

/** The standards the questionnaire's segment implies, as tick boxes. Reused
 *  from the advisor's own list so a designation is never spelled twice. */
const standardOptions = (industries: readonly ChamberIndustry[]): readonly QChoiceOption[] =>
  standards
    .filter((s) => s.industries.some((i) => industries.includes(i)))
    .map((s) => ({ id: s.id, label: { ko: s.name, en: s.name }, note: s.hint }));

const standardsField = (industries: readonly ChamberIndustry[]): QField => ({
  kind: "choice",
  id: "standards",
  multi: true,
  optional: true,
  label: { ko: "적용해야 하는 규격", en: "Standards to satisfy" },
  options: standardOptions(industries),
});

const freqField: QField = {
  kind: "text",
  id: "freq",
  optional: true,
  label: { ko: "주파수 범위", en: "Frequency range" },
  placeholder: { ko: "예: 30 MHz – 18 GHz", en: "e.g. 30 MHz – 18 GHz" },
};

/**
 * The first number a chamber is sized from.
 *
 * Free text rather than a set of brackets: a reader knows their own EUT's
 * dimensions, and rounding them into ranges here would lose the one figure the
 * engineering team starts from. Required everywhere a segment is known,
 * because without it nothing downstream can be answered — and optional in ⓧ,
 * which is where a reader who cannot yet place their problem ends up.
 */
const eutSizeLabel: L = { ko: "피시험체 치수 · 중량", en: "EUT dimensions and weight" };
const eutSizePlaceholder: L = {
  ko: "가장 큰 피시험체 기준으로 적어 주세요 — 예: 4,800 × 1,900 × 1,500 mm, 2,100 kg",
  en: "For the largest EUT you will test — e.g. 4,800 × 1,900 × 1,500 mm, 2,100 kg",
};

const eutSizeField: QField = {
  kind: "text",
  id: "eutSize",
  label: eutSizeLabel,
  placeholder: eutSizePlaceholder,
};

const eutSizeOptionalField: QField = {
  kind: "text",
  id: "eutSize",
  optional: true,
  label: eutSizeLabel,
  placeholder: eutSizePlaceholder,
};

/**
 * Quiet zone, and the reason it is here.
 *
 * The 10 m branch of the tree offers ø3.0 to ø6.0 m and a "Custom" that lands
 * in this questionnaire — so this is the field that reader came to fill in.
 * Optional because the other three branches into Ⓑ have no quiet zone to
 * state, and a required field they cannot answer would stop them sending.
 */
const qzField: QField = {
  kind: "text",
  id: "qz",
  optional: true,
  label: { ko: "정온 영역 (QZ)", en: "Quiet zone" },
  placeholder: {
    ko: "예: ø4.5 m — 아직 정하지 않으셨으면 비워 두세요",
    en: "e.g. ø4.5 m — leave it blank if it is not decided",
  },
};

const requirementField = (placeholder: L): QField => ({
  kind: "textarea",
  id: "requirement",
  label: { ko: "요구사항", en: "The requirement" },
  placeholder,
});

const timelineField: QField = {
  kind: "choice",
  id: "timeline",
  optional: true,
  label: { ko: "도입 예정 시기", en: "Timeframe" },
  options: [
    { id: "6m", label: { ko: "6개월 이내", en: "Within six months" } },
    { id: "1y", label: { ko: "1년 이내", en: "Within a year" } },
    { id: "later", label: { ko: "1년 이후", en: "Beyond a year" } },
    { id: "exploring", label: { ko: "검토 단계", en: "Still exploring" } },
  ],
};

/* ---- E-Drive, asked only of a drivetrain bench --------------------- *
 *
 * The three EDTC chambers differ in one thing — the dynamometer — and a
 * quotation for one starts from its rating. Both fields hang off the EUT
 * answer, so a reader testing a component never sees them. The setup ids match
 * the tree's own E-Drive branch, which is what lets that branch carry an
 * answer straight in.
 */
const onEdrive = (values: QValues) => values.eut === "edrive";

const driveSetupField: QField = {
  kind: "choice",
  id: "driveSetup",
  optional: true,
  when: onEdrive,
  label: { ko: "부하기 구성", en: "Load machine" },
  options: [
    { id: "single", label: { ko: "고정 단축 부하기", en: "Fixed single dyno" } },
    { id: "eaxle", label: { ko: "고정 2축 부하기 (e-axle)", en: "Fixed axis dyno (e-axle)" } },
    { id: "bluebox", label: { ko: "이동식 부하기 (EMC-BlueBox)", en: "Mobile dyno (EMC-BlueBox)" } },
    { id: "undecided", label: { ko: "미정", en: "Not decided" } },
  ],
};

const drivePowerField: QField = {
  kind: "text",
  id: "drivePower",
  optional: true,
  when: onEdrive,
  label: { ko: "부하기 출력 · 최대 회전수", en: "Load machine rating" },
  placeholder: { ko: "예: 250 kW, 20,000 rpm", en: "e.g. 250 kW, 20,000 rpm" },
};

const siteField: QField = {
  kind: "textarea",
  id: "site",
  optional: true,
  label: { ko: "설치 환경", en: "The building" },
  placeholder: {
    ko: "건물 조건, 가용 면적·층고, 기존 설비 등 설계에 영향을 주는 조건이 있으면 적어 주세요.",
    en: "Anything about the building that shapes the design — floor area, height, existing installations.",
  },
};

/* ------------------------------------------------------------------ *
 * The five questionnaires
 * ------------------------------------------------------------------ */

export const questionnaires: readonly Questionnaire[] = [
  {
    id: "A",
    segment: "automotive",
    name: { ko: "맞춤 설문 Ⓐ — Automotive", en: "Questionnaire Ⓐ — Automotive" },
    title: {
      ko: "Automotive 맞춤 요구사항",
      en: "A custom automotive requirement",
    },
    intro: {
      ko: "표준 모델의 분기로 담기지 않는 요구사항을 받는 설문입니다. 아래 내용은 그대로 설계팀 검토용 메일이 됩니다.",
      en: "For the requirement the standard branches could not carry. What you write here becomes the message the engineering team reviews.",
    },
    fields: [
      {
        kind: "choice",
        id: "eut",
        label: { ko: "피시험체", en: "What is tested" },
        options: [
          { id: "component", label: { ko: "부품 · 모듈", en: "Components and modules" } },
          { id: "vehicle", label: { ko: "완성차 · 차량 규모", en: "Whole vehicles" } },
          { id: "edrive", label: { ko: "전기 구동계 (E-Drive)", en: "Electric drivetrains (E-Drive)" } },
          { id: "other", label: { ko: "그 외", en: "Something else" } },
        ],
      },
      eutSizeField,
      driveSetupField,
      drivePowerField,
      standardsField(["automotive", "powertrain"]),
      freqField,
      requirementField({
        ko: "표준 모델로 풀리지 않는 지점을 적어 주세요 — 특수한 시험 구성, 여러 시험의 병행, 다이나모미터 통합 등.",
        en: "Say what the standard models did not solve — an unusual test setup, several tests in one room, an integrated dynamometer.",
      }),
      timelineField,
      siteField,
    ],
  },
  {
    id: "B",
    segment: "commercial",
    name: { ko: "맞춤 설문 Ⓑ — Commercial · Industrial", en: "Questionnaire Ⓑ — Commercial · Industrial" },
    title: {
      ko: "Commercial · Industrial 맞춤 요구사항",
      en: "A custom commercial / industrial requirement",
    },
    intro: {
      ko: "표준 모델의 분기로 담기지 않는 요구사항을 받는 설문입니다. 아래 내용은 그대로 설계팀 검토용 메일이 됩니다.",
      en: "For the requirement the standard branches could not carry. What you write here becomes the message the engineering team reviews.",
    },
    fields: [
      {
        kind: "choice",
        id: "eut",
        label: { ko: "피시험체", en: "What is tested" },
        options: [
          { id: "component", label: { ko: "부품 · 소형 기기", en: "Components and small equipment" } },
          { id: "equipment", label: { ko: "거치형 · 대형 기기", en: "Floor-standing equipment" } },
          { id: "vehicle", label: { ko: "차량 규모 이상", en: "Vehicle scale and beyond" } },
          { id: "other", label: { ko: "그 외", en: "Something else" } },
        ],
      },
      eutSizeField,
      {
        kind: "choice",
        id: "distance",
        optional: true,
        label: { ko: "측정 거리", en: "Measurement distance" },
        options: [
          { id: "3m", label: { ko: "3 m", en: "3 m" } },
          { id: "5m", label: { ko: "5 m", en: "5 m" } },
          { id: "10m", label: { ko: "10 m", en: "10 m" } },
          { id: "undecided", label: { ko: "미정", en: "Not decided" } },
        ],
      },
      qzField,
      standardsField(["commercial"]),
      freqField,
      requirementField({
        ko: "표준 모델로 풀리지 않는 지점을 적어 주세요 — 건물 제약, 처리량, 특수한 바닥 조건, 시험 축 구성 등.",
        en: "Say what the standard models did not solve — building constraints, throughput, an unusual floor condition, the arrangement of the test axes.",
      }),
      timelineField,
      siteField,
    ],
  },
  {
    id: "C",
    segment: "military",
    name: { ko: "맞춤 설문 Ⓒ — Military", en: "Questionnaire Ⓒ — Military" },
    title: {
      ko: "Military 맞춤 요구사항",
      en: "A custom military requirement",
    },
    intro: {
      ko: "표준 모델의 분기로 담기지 않는 요구사항을 받는 설문입니다. 아래 내용은 그대로 설계팀 검토용 메일이 됩니다.",
      en: "For the requirement the standard branches could not carry. What you write here becomes the message the engineering team reviews.",
    },
    fields: [
      {
        kind: "choice",
        id: "eut",
        label: { ko: "피시험체", en: "What is tested" },
        options: [
          { id: "component", label: { ko: "부품 · 장비", en: "Components and equipment" } },
          { id: "vehicle", label: { ko: "차량 · 플랫폼", en: "Vehicles and platforms" } },
          { id: "other", label: { ko: "그 외", en: "Something else" } },
        ],
      },
      eutSizeField,
      standardsField(["military"]),
      {
        // The military branch splits on where the range starts — it is what
        // separates the P600 lining from the P2400 and the hybrid, so the
        // engineering team needs it before anything can be sized.
        kind: "choice",
        id: "startFreq",
        optional: true,
        label: { ko: "시험 시작 주파수", en: "Where the test range starts" },
        options: [
          { id: "80", label: { ko: "80 MHz면 충분", en: "80 MHz is enough" } },
          { id: "30", label: { ko: "30 MHz까지", en: "Down to 30 MHz" } },
          { id: "26", label: { ko: "26 MHz까지", en: "Down to 26 MHz" } },
          { id: "undecided", label: { ko: "미정", en: "Not decided" } },
        ],
      },
      freqField,
      requirementField({
        ko: "표준 모델로 풀리지 않는 지점을 적어 주세요 — 보안 요건, 차폐 감쇠량, 특수한 시험 구성 등.",
        en: "Say what the standard models did not solve — security requirements, shielding attenuation, an unusual test setup.",
      }),
      timelineField,
      siteField,
    ],
  },
  {
    id: "D",
    segment: "special",
    name: { ko: "설문 Ⓓ — Special Chambers", en: "Questionnaire Ⓓ — Special chambers" },
    title: {
      ko: "특수 챔버 요구사항",
      en: "A special-chamber requirement",
    },
    intro: {
      ko: "특수 챔버는 표준 모델이 아니라 측정 과제에 맞춰 설계됩니다. 아래 내용은 그대로 설계팀 검토용 메일이 됩니다.",
      en: "A special chamber is designed to the measurement task rather than picked from the standard range. What you write here becomes the message the engineering team reviews.",
    },
    fields: [
      {
        // Option ids match `specialUses` in the advisor, so the wizard's
        // answer carries straight in as a pre-selection.
        kind: "choice",
        id: "use",
        label: { ko: "측정 과제", en: "The measurement" },
        options: [
          { id: "sat", label: { ko: "위성 시험 (SAT chamber)", en: "Satellite testing — SAT chamber" } },
          { id: "ota", label: { ko: "안테나 부품 · OTA", en: "Antenna components — OTA" } },
          { id: "antenna-vehicle", label: { ko: "차량 안테나 측정", en: "Vehicle antenna measurement" } },
          { id: "rcs", label: { ko: "RCS 측정", en: "RCS measurement" } },
        ],
      },
      {
        kind: "text",
        id: "object",
        label: { ko: "측정 대상", en: "The object measured" },
        placeholder: {
          ko: "무엇을 측정하는지, 대략의 크기와 함께 적어 주세요.",
          en: "What is measured, with its approximate size.",
        },
      },
      freqField,
      requirementField({
        ko: "측정 과제를 아는 만큼 적어 주세요 — 요구 정확도, 적용 규격·측정법, 기존 설비와의 관계 등.",
        en: "Describe the task as far as you know it — required accuracy, applicable standards or methods, how it relates to existing installations.",
      }),
      timelineField,
      siteField,
    ],
  },
  {
    id: "X",
    segment: "custom",
    name: { ko: "맞춤 요청 ⓧ — Custom Request", en: "Custom Request ⓧ" },
    title: {
      ko: "맞춤 요청",
      en: "A custom request",
    },
    intro: {
      ko: "어느 분야의 트리에도 담기지 않는 요구사항을 받는 설문입니다. 아는 만큼만 적어 주셔도 됩니다 — 아래 내용은 그대로 설계팀 검토용 메일이 됩니다.",
      en: "For the requirement that fits none of the segments. Write as much as you know — it becomes the message the engineering team reviews.",
    },
    fields: [
      {
        kind: "choice",
        id: "field",
        optional: true,
        label: { ko: "가장 가까운 분야", en: "The nearest field" },
        options: [
          { id: "automotive", label: { ko: "Automotive", en: "Automotive" } },
          { id: "commercial", label: { ko: "Commercial · Industrial", en: "Commercial · Industrial" } },
          { id: "military", label: { ko: "Military", en: "Military" } },
          { id: "special", label: { ko: "특수 측정", en: "Special measurement" } },
          { id: "unsure", label: { ko: "잘 모르겠습니다", en: "Not sure" } },
        ],
      },
      // Optional here, unlike Ⓐ–Ⓒ: ⓧ is where a reader who cannot yet place
      // their problem in a segment ends up, and some of them do not have an
      // EUT to measure at all.
      eutSizeOptionalField,
      requirementField({
        ko: "무엇을 시험·측정하려는지, 어떤 제약이 있는지 자유롭게 적어 주세요. 차폐룸처럼 시험장이 아닌 요구사항도 이곳으로 보내 주시면 됩니다.",
        en: "What you want to test or measure, and the constraints around it — in your own words. A requirement that is not a test site at all, a shielded room for instance, belongs here too.",
      }),
      freqField,
      timelineField,
      siteField,
    ],
  },
];

export const questionnaire = (id: QuestionnaireId): Questionnaire =>
  questionnaires.find((q) => q.id === id)!;

/**
 * The fields a questionnaire actually asks, given what has been answered so
 * far.
 *
 * Every reader of the form goes through here — the rendering, the check that
 * decides whether the message can be written, and the message itself. A field
 * that is not on screen is therefore never required and never sent, which is
 * what keeps a stale answer from riding along: a reader who says E-Drive,
 * states the load machine, then changes to a component keeps the typing (it
 * comes back if they change their mind again) but the enquiry does not carry
 * a dynamometer they are not buying.
 */
export const visibleFields = (q: Questionnaire, values: QValues): readonly QField[] =>
  q.fields.filter((f) => !f.when || f.when(values));

/**
 * The questionnaire a segment points at.
 *
 * The matrix hangs one circled letter under each of its four boxes, and the
 * segment question is a single choice, so this is a straight lookup. ⓧ is for
 * the reader who has not reached a segment yet — the free-standing Custom
 * Request box the matrix draws beside the tree.
 */
const letters: Record<SegmentChoice, QuestionnaireId> = {
  automotive: "A",
  commercial: "B",
  military: "C",
  special: "D",
};

export const questionnaireFor = (segment: SegmentChoice | undefined): QuestionnaireId =>
  segment ? letters[segment] : "X";
