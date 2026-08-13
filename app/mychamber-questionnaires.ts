import { standards, type SegmentChoice } from "./mychamber-advisor";
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

export type QuestionnaireId = "A" | "B" | "C" | "D" | "X";

type L = Record<Lang, string>;

export type QChoiceOption = { id: string; label: L; note?: L };

export type QField =
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
  | { kind: "textarea"; id: string; label: L; optional?: true; placeholder?: L };

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
      standardsField(["automotive", "powertrain"]),
      freqField,
      requirementField({
        ko: "표준 모델로 풀리지 않는 지점을 적어 주세요 — 피시험체 치수, 특수한 시험 구성, 여러 시험의 병행 등.",
        en: "Say what the standard models did not solve — EUT dimensions, an unusual test setup, several tests in one room.",
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
      standardsField(["commercial"]),
      freqField,
      requirementField({
        ko: "표준 모델로 풀리지 않는 지점을 적어 주세요 — 정온 영역, 건물 제약, 처리량, 특수한 바닥 조건 등.",
        en: "Say what the standard models did not solve — quiet zone, building constraints, throughput, an unusual floor condition.",
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
      requirementField({
        ko: "표준 모델로 풀리지 않는 지점을 적어 주세요 — 플랫폼 치수, 보안 요건, 특수한 시험 구성 등.",
        en: "Say what the standard models did not solve — platform dimensions, security requirements, an unusual test setup.",
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
      requirementField({
        ko: "무엇을 시험·측정하려는지, 어떤 제약이 있는지 자유롭게 적어 주세요.",
        en: "What you want to test or measure, and the constraints around it — in your own words.",
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
 * The questionnaire a set of segment answers points at.
 *
 * The Special track always means Ⓓ. One model segment means its own letter.
 * Anything else — none chosen yet, or several at once — is ⓧ, because a
 * questionnaire addressed to two segments is addressed to neither.
 */
export const questionnaireFor = (segs: readonly SegmentChoice[]): QuestionnaireId => {
  if (segs.includes("special")) return "D";
  if (segs.length === 1) {
    if (segs[0] === "automotive") return "A";
    if (segs[0] === "commercial") return "B";
    if (segs[0] === "military") return "C";
  }
  return "X";
};
