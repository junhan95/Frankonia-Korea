import type { ChamberIndustry, ChamberType } from "./chamber-sections";
import type { Lang } from "./site-config";

/**
 * The MyChamber decision tree — the head office's Chamber Matrix, as data.
 *
 * ## The source
 *
 * `MyChamber/Chamber Matrix-extention.pdf` (12 August 2026), the extended
 * edition of the hand-drawn matrix of 11 August. It is a tree: four segment
 * boxes, and under each of them the branches that end in a model designation.
 * docs/MYCHAMBER-MATRIX-FLOW.md transcribes it branch by branch and is the
 * specification this file implements; tests/mychamber-matrix.test.mjs holds the
 * two to each other.
 *
 * ## Why a tree
 *
 * This file used to be a weighted scoring engine over answer axes of its own —
 * EUT scale, EMC test kinds, quiet zone, compliance level — with the matrix
 * kept alongside as an answer key. It ranked well and it asked up to eight
 * questions, none of which was a question the matrix asks.
 *
 * The matrix is now the flow itself. Every question below is one of its
 * branch points, in its order, and every leaf is the model designation written
 * at the end of that branch. Nothing is scored, nothing is weighted, and there
 * is no path by which the page can answer something the head office did not.
 * The longest branch is five questions.
 *
 * What a tree cannot do is say that a model belongs in two places at once — the
 * CTC is filed under Commercial pre-compliance and is built for automotive and
 * military components as well. So a leaf may name more than one model, and each
 * leaf carries its own `why` line rather than a generated one: the reason a
 * model is at the end of a branch is a fact about the matrix, not a computation.
 *
 * ## What this file may not do
 *
 * Every designation and figure here comes from `chamberModels` and the model
 * pages in chamber-sections.ts, which are the 2026 catalogue. Nothing invents a
 * specification. Where a model's compliance is narrower than its place in the
 * tree suggests, `caveat` says so on the card.
 */

type L = Record<Lang, string>;

/* ------------------------------------------------------------------ *
 * Segments
 * ------------------------------------------------------------------ */

/**
 * The four boxes at the top of the matrix, in the drawing's order.
 *
 * Four rather than the catalogue's five industries: the matrix files the
 * E-Drive benches *inside* Automotive, as a sibling of "components" and
 * "vehicle", because a drivetrain bench is something an automotive laboratory
 * buys. And the choice is exclusive — the drawing gives each box a track of its
 * own with no line crossing between them.
 */
export const segments = ["automotive", "commercial", "military", "special"] as const;
export type SegmentChoice = (typeof segments)[number];

/** The four measurement tasks the extension files under Special Chambers. */
export const specialUses = ["sat", "ota", "antenna-vehicle", "rcs"] as const;
export type SpecialUse = (typeof specialUses)[number];

/** The circled letters the extension hangs under the segments, plus the
 *  free-standing ⓧ. Declared here rather than in mychamber-questionnaires.ts
 *  because the tree's own leaves name them. */
export type QuestionnaireId = "A" | "B" | "C" | "D" | "X";

/* ------------------------------------------------------------------ *
 * Standards
 * ------------------------------------------------------------------ */

/**
 * The standards the segment questionnaires offer as tick boxes.
 *
 * The matrix does not branch on a standard, so the wizard no longer asks about
 * one — this list exists for questionnaires Ⓐ–Ⓓ and ⓧ, which do, because the
 * engineering team needs it to reply. `industries` is what decides which
 * questionnaire shows which designation.
 *
 * Designations are not translated in either locale. They are what a reader
 * matches against a drawing, a quotation and an accreditation certificate.
 */
export const standards = [
  { id: "cispr25", name: "CISPR 25 / EN 55025", industries: ["automotive", "powertrain"],
    hint: { ko: "차량 전장부품 방출, 1.0 m 부품 시험", en: "Vehicle component emission, 1.0 m component test" } },
  { id: "cispr12", name: "CISPR 12 / EN 55012", industries: ["automotive"],
    hint: { ko: "완성차 방출", en: "Whole-vehicle emission" } },
  { id: "ecer10", name: "ECE R10", industries: ["automotive"],
    hint: { ko: "차량 EMC 형식승인", en: "Vehicle EMC type approval" } },
  { id: "iso11452", name: "ISO 11452-2", industries: ["automotive", "powertrain"],
    hint: { ko: "부품 방사 내성 (무향실)", en: "Component radiated immunity, absorber-lined chamber" } },
  { id: "iso11451", name: "ISO 11451-2", industries: ["automotive"],
    hint: { ko: "완성차 방사 내성", en: "Whole-vehicle radiated immunity" } },
  { id: "iso1145211", name: "ISO 11452-11", industries: ["automotive", "powertrain"],
    hint: { ko: "부품 방사 내성 (잔향실)", en: "Component radiated immunity, reverberation chamber" } },
  { id: "mil461", name: "MIL-STD-461", industries: ["military"],
    hint: { ko: "군수 EMC — RE/RS/CE/CS", en: "Defence EMC — RE / RS / CE / CS" } },
  { id: "do160", name: "RTCA DO-160", industries: ["military"],
    hint: { ko: "항공 탑재 장비", en: "Airborne equipment" } },
  { id: "cispr32", name: "CISPR 32 / EN 55032", industries: ["commercial"],
    hint: { ko: "멀티미디어 기기 방출", en: "Multimedia equipment emission" } },
  { id: "iec61000_4_3", name: "IEC / EN 61000-4-3", industries: ["commercial", "automotive", "powertrain"],
    hint: { ko: "방사 전자기장 내성", en: "Radiated RF field immunity" } },
  { id: "iec61000_4_21", name: "IEC / EN 61000-4-21", industries: ["commercial", "automotive", "military"],
    hint: { ko: "잔향실 시험법", en: "Reverberation chamber test method" } },
  { id: "cispr16", name: "CISPR 16-1-4", industries: ["commercial", "automotive"],
    hint: { ko: "시험장 적합성 검증 (NSA/sVSWR)", en: "Test site validation — NSA / sVSWR" } },
  { id: "iec61000_4_22", name: "IEC / EN 61000-4-22", industries: ["commercial"],
    hint: { ko: "완전무향실(FAR) 시험장 — 접지면 없는 자유공간", en: "Fully anechoic room — free space, no ground plane" } },
  // Shielding attenuation is a property of every chamber here rather than a
  // test anybody chooses one for, so it is offered to all four segments.
  { id: "en50147", name: "EN 50147-1 / IEEE 299", industries: ["automotive", "commercial", "military", "powertrain"],
    hint: { ko: "차폐 감쇠량 측정", en: "Shielding attenuation measurement" } },
] as const satisfies readonly {
  id: string;
  name: string;
  industries: readonly ChamberIndustry[];
  hint: L;
}[];

export type StandardId = (typeof standards)[number]["id"];

/* ------------------------------------------------------------------ *
 * The tree
 * ------------------------------------------------------------------ */

/**
 * One model at the end of a branch.
 *
 * `model` is a designation in `chamberModels` — checked where the two are
 * joined, in mychamber-catalogue.ts, so a typo stops the build rather than
 * quietly emptying a result page.
 *
 * `variant` is the exact configuration the branch pins down, where the matrix
 * branches finely enough to pin one. `why` is the matrix's own reason for
 * putting this model here, written out; it is not generated, because a
 * generated reason would be the page reasoning about the catalogue rather than
 * reporting the head office's decision.
 */
export type Leaf = {
  model: string;
  variant?: { name: string; size: string; note: L };
  why: L;
  caveat?: L;
};

export type AskNode = {
  kind: "ask";
  /** Stable across the whole tree — the progress strip and the enquiry mail
   *  key on it, and the conformance test names branches by it. */
  id: string;
  kicker: L;
  title: L;
  hint?: L;
  options: readonly Branch[];
};

export type ModelsNode = { kind: "models"; leaves: readonly Leaf[] };

/**
 * A branch that ends outside the catalogue.
 *
 * Three kinds reach one. The Special Chambers track, whose four tasks have no
 * catalogue models. The custom quiet zone under a 10.0 m chamber, which is a
 * dimension rather than a designation. And the matrix's own `custom` ovals —
 * the circle it hangs under every segment box, which is the reader saying that
 * none of the branches under their segment is their problem.
 */
export type FormNode = { kind: "form"; qid: QuestionnaireId };

export type Node = AskNode | ModelsNode | FormNode;

export type Branch = {
  id: string;
  label: L;
  note?: L;
  /**
   * What this choice establishes, in the vocabulary of the segment's
   * questionnaire.
   *
   * `carried` below accumulates it down the path and the wizard hands it to
   * the form as a pre-selection, so a reader who leaves the tree — by the
   * custom branch, by the escape link, or because their branch ends in a
   * questionnaire — does not answer the same question twice.
   *
   * Keys are questionnaire field ids and values are its option ids. Nothing in
   * the type system holds those two vocabularies together, so
   * tests/mychamber-matrix.test.mjs checks every one of them against the
   * questionnaire it would land in.
   */
  carry?: Readonly<Record<string, string>>;
  next: Node;
};

/**
 * The matrix's `custom` oval, drawn under every segment box: a branch of the
 * segment, level with the ones that end in models, for the reader whose
 * requirement none of them carries.
 *
 * It is deliberately the last option rather than the first. A reader who can
 * place themselves should place themselves — the questionnaire is the answer
 * when the tree has none, not a way around reading it.
 */
const customBranch = (qid: QuestionnaireId, note: L): Branch => ({
  id: "custom",
  label: { ko: "이 가운데 없습니다 — 맞춤 요구사항", en: "None of these — a custom requirement" },
  note,
  next: { kind: "form", qid },
});

const ask = (
  id: string,
  kicker: L,
  title: L,
  hint: L,
  options: readonly Branch[],
): AskNode => ({ kind: "ask", id, kicker, title, hint, options });

const models = (...leaves: readonly Leaf[]): ModelsNode => ({ kind: "models", leaves });

/* ---- shared question copy ---------------------------------------- */

const absorberKicker: L = { ko: "흡수체", en: "Absorber lining" };
const absorberHint: L = {
  ko: "성능은 동등합니다. 하이브리드는 같은 정온 영역을 더 작은 방에서 얻고, 피라미드는 라이닝이 저렴하고 시작 주파수가 더 낮습니다.",
  en: "The performance is equivalent. Hybrid reaches the same quiet zone in a smaller room; pyramid is a cheaper lining and starts lower in frequency.",
};

/* ---- Automotive --------------------------------------------------- */

const rvcComponentLeaves: readonly Leaf[] = [
  {
    model: "RVC S",
    why: {
      ko: "매트릭스가 Automotive 부품 잔향 시험에 두는 두 크기 중 작은 쪽입니다 — 부품·모듈 단위.",
      en: "The smaller of the two sizes the matrix puts at automotive component reverberation testing — components and modules.",
    },
  },
  {
    model: "RVC M",
    why: {
      ko: "같은 분기의 큰 쪽으로, 대형 군수·차량 부품까지 받습니다.",
      en: "The larger of the same pair, taking large military and automotive components.",
    },
  },
];

const automotive = ask(
  "auto-branch",
  { ko: "시험 대상", en: "What is tested" },
  { ko: "무엇을 시험하십니까?", en: "What do you test?" },
  {
    ko: "매트릭스가 Automotive 아래에 두는 네 갈래입니다. 부품·완성차·잔향실·전기 구동계 순으로 갈립니다.",
    en: "The four branches the matrix draws under Automotive — components, whole vehicles, reverberation, and the electric drivetrain.",
  },
  [
    {
      id: "components",
      label: { ko: "부품 (Components)", en: "Components" },
      note: { ko: "ECU · 센서 · 전장 모듈", en: "ECUs, sensors, electronic modules" },
      carry: { eut: "component" },
      next: ask(
        "auto-component-level",
        { ko: "시험 수준", en: "Test level" },
        { ko: "부품 시험은 어느 수준까지 하십니까?", en: "How far do the component tests have to go?" },
        {
          ko: "매트릭스는 부품 분기를 잔향 · 사전 인증 · 정식 인증 세 갈래로 나눕니다.",
          en: "The matrix splits the component branch three ways — reverberation, pre-compliance, and full compliance.",
        },
        [
          {
            id: "reverberation",
            label: { ko: "잔향 시험 (Reverberation)", en: "Reverberation" },
            note: { ko: "IEC 61000-4-21 · ISO 11452-11", en: "IEC 61000-4-21, ISO 11452-11" },
            next: models(...rvcComponentLeaves),
          },
          {
            id: "pre",
            label: { ko: "사전 인증 (Pre-compliance)", en: "Pre-compliance" },
            note: { ko: "개발 단계 스크리닝", en: "Development screening" },
            next: models({
              model: "UCC",
              why: {
                ko: "매트릭스가 Automotive 부품 사전 인증에 두는 모델입니다. GTEM 셀을 대체하는 가장 작은 CISPR 25 사전 인증 챔버입니다.",
                en: "The model the matrix puts at automotive component pre-compliance — the smallest CISPR 25 pre-compliance chamber there is, the alternative to a GTEM cell.",
              },
              caveat: {
                ko: "방출 측정은 사전 인증 범위입니다. 정식 인증 방출이 필요하시면 ACTC 쪽입니다.",
                en: "Emission measurement is pre-compliant. If the emission figures have to certify, that is the ACTC.",
              },
            }),
          },
          {
            id: "full",
            label: { ko: "정식 인증 (Full compliance)", en: "Full compliance" },
            note: { ko: "CISPR 25 1.0 m 부품 시험", en: "CISPR 25 at the 1.0 m component distance" },
            next: models({
              model: "ACTC",
              why: {
                ko: "매트릭스가 Automotive 부품 정식 인증에 두는 모델입니다 — CISPR 25 부품 시험 챔버.",
                en: "The model the matrix puts at automotive component full compliance — the CISPR 25 component testing chamber.",
              },
            }),
          },
        ],
      ),
    },
    {
      id: "vehicle",
      label: { ko: "완성차 (Vehicle)", en: "Vehicle" },
      note: { ko: "차량 단위 EMC 시험", en: "EMC testing on the whole vehicle" },
      carry: { eut: "vehicle" },
      next: ask(
        "auto-vehicle-distance",
        { ko: "측정 거리", en: "Measurement distance" },
        { ko: "완성차 측정 거리는 어느 쪽입니까?", en: "Which measurement distance?" },
        {
          ko: "규격이 정한 안테나–차량 거리입니다. 매트릭스는 3.0 m와 10.0 m 두 갈래를 둡니다.",
          en: "The antenna-to-vehicle distance the standard prescribes. The matrix draws two — 3.0 m and 10.0 m.",
        },
        [
          {
            id: "3m",
            label: { ko: "3.0 m", en: "3.0 m" },
            note: { ko: "부품과 완성차를 한 방에서", en: "Components and whole vehicles in one room" },
            next: models({
              model: "AVTC",
              why: {
                ko: "매트릭스가 Automotive 완성차 3.0 m에 두는 모델입니다 — 부품 시험과 완성차 시험을 함께 받는 3.0 m 챔버.",
                en: "The model the matrix puts at automotive 3.0 m — the 3.0 m chamber that takes component and full-vehicle tests alike.",
              },
            }),
          },
          {
            id: "10m",
            label: { ko: "10.0 m", en: "10.0 m" },
            note: { ko: "ECE R10 · CISPR 12 형식승인", en: "ECE R10 and CISPR 12 type approval" },
            next: ask(
              "auto-vehicle-10m",
              { ko: "10.0 m 구성", en: "10.0 m configuration" },
              { ko: "10.0 m 챔버는 어떤 구성입니까?", en: "Which 10.0 m configuration?" },
              {
                ko: "매트릭스는 10.0 m 아래에 SAC-10V와 SAC-10VC 두 구성을 둡니다. VC는 5.0 m 측정 거리로 시작하면서 10.0 m 대응을 구조적으로 준비해 두는 구성입니다.",
                en: "The matrix draws two under 10.0 m — the SAC-10V and the SAC-10VC. The VC starts at a 5.0 m test distance while the shell is prepared for 10.0 m.",
              },
              [
                {
                  id: "sac-10v",
                  label: { ko: "SAC-10V — 처음부터 10.0 m", en: "SAC-10V — 10.0 m from the start" },
                  note: { ko: "다이나모미터 통합, 구동 상태 시험", en: "Integrated dynamometer, tested under load" },
                  next: ask(
                    "auto-vehicle-absorber",
                    absorberKicker,
                    { ko: "흡수체는 어느 방식입니까?", en: "Which absorber lining?" },
                    absorberHint,
                    [
                      {
                        id: "hybrid",
                        label: { ko: "하이브리드 (페라이트 + Frankosorb®)", en: "Hybrid — ferrite with Frankosorb®" },
                        note: { ko: "건물 면적을 아낄 때", en: "When floor area is the constraint" },
                        next: models({
                          model: "SAC-10V",
                          variant: {
                            name: "SAC-10V-6/H",
                            size: "22,580 × 15,680 × 8,700 mm",
                            note: { ko: "10.0 m 측정 거리에서 QZ ø6.0 m (H = 3.0 m)", en: "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)" },
                          },
                          why: {
                            ko: "매트릭스가 Automotive 완성차 10.0 m · 하이브리드에 두는 구성입니다.",
                            en: "The configuration the matrix puts at automotive vehicle 10.0 m with a hybrid lining.",
                          },
                          caveat: {
                            ko: "다이나모미터가 통합된 구성으로 구동 상태의 완성차 시험을 전제로 합니다. 12.0 m·18.0 m 대형 차량은 SL12·SL18 구성입니다.",
                            en: "Built around an integrated dynamometer, for whole vehicles tested under load. SL12 and SL18 take 12.0 m and 18.0 m vehicles.",
                          },
                        }),
                      },
                      {
                        id: "pyramid",
                        label: { ko: "피라미드 (Frankosorb® 단독)", en: "Pyramid — Frankosorb® alone" },
                        note: { ko: "라이닝 비용을 아낄 때", en: "When lining cost is the constraint" },
                        next: models({
                          model: "SAC-10V",
                          variant: {
                            name: "SAC-10V-6/P",
                            size: "26,480 × 20,180 × 9,000 mm",
                            note: { ko: "10.0 m 측정 거리에서 QZ ø6.0 m (H = 3.0 m)", en: "QZ ø6.0 m at 10.0 m test distance (H = 3.0 m)" },
                          },
                          why: {
                            ko: "매트릭스가 Automotive 완성차 10.0 m · 피라미드에 두는 구성입니다.",
                            en: "The configuration the matrix puts at automotive vehicle 10.0 m with a pyramid lining.",
                          },
                          caveat: {
                            ko: "다이나모미터가 통합된 구성으로 구동 상태의 완성차 시험을 전제로 합니다. 하이브리드 구성보다 건물 면적이 넓게 필요합니다.",
                            en: "Built around an integrated dynamometer, for whole vehicles tested under load. It needs more floor area than the hybrid build.",
                          },
                        }),
                      },
                    ],
                  ),
                },
                {
                  id: "sac-10vc",
                  label: { ko: "SAC-10VC — 5.0 m로 시작해 10.0 m 준비", en: "SAC-10VC — 5.0 m now, prepared for 10.0 m" },
                  note: { ko: "단계적 투자 구성", en: "The staged-investment build" },
                  next: models({
                    model: "SAC-10V",
                    variant: {
                      name: "SAC-10VC",
                      size: "Custom size",
                      note: {
                        ko: "5.0 m 측정 거리로 시작하고 10.0 m 대응을 준비해 두는 구성",
                        en: "Starts at a 5.0 m test distance, with the shell prepared for 10.0 m",
                      },
                    },
                    why: {
                      ko: "매트릭스가 Automotive 완성차 10.0 m 아래에 SAC-10V와 나란히 두는 구성입니다. 카탈로그에서는 SAC-10V 모델 페이지의 VC 구성으로 다룹니다.",
                      en: "The build the matrix draws beside the SAC-10V under automotive vehicle 10.0 m. In the catalogue it is the VC configuration of the SAC-10V.",
                    },
                    caveat: {
                      ko: "지금은 5.0 m 측정 거리로 운용하고, 이후 10.0 m로 확장할 수 있도록 셸과 설비를 준비해 두는 구성입니다. 정확한 치수는 준비 범위에 따라 달라집니다.",
                      en: "Operated at 5.0 m today, with the shell and services prepared for a later extension to 10.0 m. The exact dimensions follow how far that preparation goes.",
                    },
                  }),
                },
              ],
            ),
          },
        ],
      ),
    },
    {
      id: "reverberation",
      label: { ko: "잔향실 (Reverberation)", en: "Reverberation" },
      note: { ko: "통계적 고전계 시험 · IEC 61000-4-21", en: "Statistical high-field testing — IEC 61000-4-21" },
      next: ask(
        "auto-rvc-eut",
        { ko: "피시험체", en: "What goes in it" },
        { ko: "잔향실에는 무엇이 들어갑니까?", en: "What goes into the reverberation chamber?" },
        {
          ko: "매트릭스는 잔향 분기를 부품용과 차량용으로 나눕니다. 방의 부피가 최저 사용 주파수를 정하기 때문에 나중에 바꿀 수 없는 선택입니다.",
          en: "The matrix splits the reverberation branch into components and vehicles. The volume of the room sets its lowest usable frequency, so this is not a choice that can be changed later.",
        },
        [
          {
            id: "components",
            label: { ko: "부품 (Components)", en: "Components" },
            carry: { eut: "component" },
            next: models(...rvcComponentLeaves),
          },
          {
            id: "vehicle",
            label: { ko: "완성차 (Vehicle)", en: "Vehicle" },
            carry: { eut: "vehicle" },
            next: ask(
              "auto-rvc-stirrer",
              { ko: "스터러", en: "Stirrer" },
              { ko: "전계 교반은 어느 방식입니까?", en: "How should the field be stirred?" },
              {
                ko: "매트릭스가 차량용 잔향실에 «with stirrer details»라고 적어 둔 질문입니다. 스터러가 경계 조건을 계속 바꾸어 한 바퀴 동안 전계를 통계적으로 균일하게 만듭니다 — 디스크가 클수록 서로 무관한 전계 표본이 많아지고, 방도 그만큼 커집니다.",
                en: "The question the matrix writes as “with stirrer details”. The stirrer keeps changing the boundary conditions so that one full turn makes the field statistically uniform — the larger the disc, the more uncorrelated field samples, and the larger the room.",
              },
              [
                {
                  id: "zfold",
                  label: { ko: "Z-폴드 스터러", en: "Z-fold stirrer" },
                  note: { ko: "수직·수평 2대 · 더 작은 방", en: "Two of them, vertical and horizontal — a smaller room" },
                  next: models({
                    model: "RVC L",
                    why: {
                      ko: "매트릭스의 RVC L / XL / XXL 가운데 Z-폴드 스터러 구성입니다 — 차량용 잔향실의 표준 크기.",
                      en: "The Z-fold build among the matrix's RVC L / XL / XXL — the standard size of a vehicle reverberation chamber.",
                    },
                  }),
                },
                {
                  id: "disc9",
                  label: { ko: "대형 디스크 스터러 ø9.0 m", en: "Large-disc stirrer, ø9.0 m" },
                  note: { ko: "더 균일한 전계", en: "A more uniform field" },
                  next: models({
                    model: "RVC XL",
                    why: {
                      ko: "RVC L과 작업 부피·최저 사용 주파수가 같고 ø9.0 m 디스크 스터러로 갈리는 구성입니다.",
                      en: "Shares the working volume and lowest usable frequency of the RVC L, and is separated from it by the ø9.0 m disc stirrer.",
                    },
                  }),
                },
                {
                  id: "disc12",
                  label: { ko: "대형 디스크 스터러 ø12.0 m", en: "Large-disc stirrer, ø12.0 m" },
                  note: { ko: "대형 차량 · 가장 큰 방", en: "Large vehicles — the largest room" },
                  next: models({
                    model: "RVC XXL",
                    why: {
                      ko: "매트릭스의 RVC L / XL / XXL 가운데 가장 큰 구성으로, 대형 차량까지 받습니다.",
                      en: "The largest of the matrix's RVC L / XL / XXL, sized for large vehicles.",
                    },
                  }),
                },
              ],
            ),
          },
        ],
      ),
    },
    {
      id: "edrive",
      label: { ko: "전기 구동계 (E-Drive)", en: "Electric drivetrain (E-Drive)" },
      note: { ko: "부하기를 갖춘 구동계 시험대", en: "A drivetrain bench with a load machine" },
      // Questionnaire Ⓐ opens its two E-Drive fields on this answer, so
      // leaving the tree here asks about the load machine rather than about
      // an EUT the reader does not have.
      carry: { eut: "edrive" },
      next: ask(
        "auto-edrive-dyno",
        { ko: "부하기", en: "Load machine" },
        { ko: "부하기(다이나모미터) 구성은 어느 쪽입니까?", en: "Which dynamometer setup?" },
        {
          ko: "매트릭스의 E-Drive 분기는 부하기 구성 하나로 갈립니다. 이 답이 EDTC 세 모델을 결정합니다.",
          en: "The matrix's E-Drive branch splits on the dynamometer alone — this one answer settles which of the three EDTC chambers it is.",
        },
        [
          {
            id: "mobile",
            label: { ko: "이동식 부하기 (Mobile dyno)", en: "Mobile dyno" },
            note: { ko: "EMC-BlueBox · 최대 120 kW", en: "The EMC-BlueBox, up to 120 kW" },
            carry: { driveSetup: "bluebox" },
            next: models({
              model: "EDTC-BB",
              why: {
                ko: "매트릭스가 Mobile Dyno에 두는 «EDTC-BB with Blue Box» — EMC-BlueBox 이동식 부하기를 포함하는 구성입니다.",
                en: "The matrix's “EDTC-BB with Blue Box” at Mobile Dyno — the build that includes the EMC-BlueBox mobile load machine.",
              },
            }),
          },
          {
            id: "single",
            label: { ko: "고정 단축 부하기 (Fixed single dyno)", en: "Fixed single dyno" },
            note: { ko: "외부 부하기 1대 · 고정 샤프트", en: "One external load machine, fixed shaft" },
            carry: { driveSetup: "single" },
            next: models({
              model: "EDTC-SA",
              why: {
                ko: "매트릭스가 Fixed Single Dyno에 두는 «EDTC»입니다 — 카탈로그 정식 명칭은 EDTC-SA.",
                en: "The matrix's “EDTC” at Fixed Single Dyno — EDTC-SA in the catalogue.",
              },
            }),
          },
          {
            id: "axis",
            label: { ko: "고정 2축 부하기 (Fixed axis dyno)", en: "Fixed axis dyno" },
            note: { ko: "e-axle 시험 · 외부 부하기 2대", en: "E-axle testing — two external load machines" },
            carry: { driveSetup: "eaxle" },
            next: models({
              model: "EDTC-AX",
              why: {
                ko: "매트릭스가 Fixed Axis Dyno에 두는 모델입니다 — e-axle 시험용 2축 구성.",
                en: "The model the matrix puts at Fixed Axis Dyno — the two-machine build for e-axle testing.",
              },
            }),
          },
        ],
      ),
    },
    customBranch("A", {
      ko: "네 갈래 어디에도 해당하지 않는 차량·전장 요구사항",
      en: "An automotive requirement none of the four branches carries",
    }),
  ],
);

/* ---- Commercial · Industrial -------------------------------------- */

/** The four quiet zones the matrix tabulates twice under the 10.0 m branch —
 *  once for the hybrid lining and once for the pyramid — plus its "Custom",
 *  which leaves the catalogue and goes to questionnaire Ⓑ. */
const tenMetreQz = (
  absorber: "hybrid" | "pyramid",
  model: string,
  sizes: Readonly<Record<"3m" | "4m" | "5m" | "6m", { name: string; size: string }>>,
): AskNode =>
  ask(
    `comm-10.0 m-qz-${absorber}`,
    { ko: "정온 영역", en: "Quiet zone" },
    { ko: "필요한 정온 영역(QZ)은 어느 정도입니까?", en: "How large a quiet zone do you need?" },
    {
      ko: "피시험체 주변에서 반사가 규격 이내로 억제되는 원기둥 영역의 지름입니다. 챔버 외형 치수를 직접 결정합니다 — 매트릭스가 «3.0 m / 4.0 m / 5.0 m / 6.0 m / Custom»이라고 적어 둔 질문입니다.",
      en: "The diameter of the cylinder around the EUT in which reflections stay inside the standard's limit. It sets the outer dimensions of the chamber directly — the question the matrix writes as “3.0 m / 4.0 m / 5.0 m / 6.0 m / Custom”.",
    },
    [
      ...(["3m", "4m", "5m", "6m"] as const).map((qz) => ({
        id: qz,
        label: { ko: `ø${qz.replace("m", ".0 m")}`, en: `ø${qz.replace("m", ".0 m")}` },
        next: models({
          model,
          variant: {
            name: sizes[qz].name,
            size: sizes[qz].size,
            note: {
              ko: `10.0 m 측정 거리에서 QZ ø${qz.replace("m", ".0 m")} (H = 3.0 m)`,
              en: `QZ ø${qz.replace("m", ".0 m")} at 10.0 m test distance (H = 3.0 m)`,
            },
          },
          why:
            absorber === "hybrid"
              ? {
                  ko: "매트릭스가 Commercial 정식 인증 SAC · 10.0 m · 하이브리드에 두는 모델이고, 정온 영역이 그 안의 구성을 정합니다.",
                  en: "The model the matrix puts at commercial full compliance SAC, 10.0 m, hybrid — and the quiet zone picks the build within it.",
                }
              : {
                  ko: "매트릭스가 Commercial 정식 인증 SAC · 10.0 m · 피라미드에 두는 모델이고, 정온 영역이 그 안의 구성을 정합니다.",
                  en: "The model the matrix puts at commercial full compliance SAC, 10.0 m, pyramid — and the quiet zone picks the build within it.",
                },
        }),
      })),
      {
        id: "custom",
        label: { ko: "그 외 · 맞춤 치수", en: "Something else — a custom size" },
        note: { ko: "설계팀 검토로 이어집니다", en: "Goes to the engineering team" },
        next: { kind: "form", qid: "B" } satisfies FormNode,
      },
    ],
  );

const commercial = ask(
  "comm-branch",
  { ko: "시험 방식과 인증 수준", en: "Method and compliance level" },
  { ko: "어떤 시험을 어느 수준까지 하십니까?", en: "Which testing, and to what level?" },
  {
    ko: "매트릭스가 Commercial · Industrial 아래에 두는 네 갈래입니다. 정식 인증은 접지면이 있는 반무향(SAC)과 접지면이 없는 완전무향(FAC)으로 다시 갈립니다.",
    en: "The four branches the matrix draws under Commercial · Industrial. Full compliance splits again — semi-anechoic with a ground plane, or fully anechoic without one.",
  },
  [
    {
      id: "reverberation",
      label: { ko: "잔향 시험 (Reverberation)", en: "Reverberation" },
      note: { ko: "IEC 61000-4-21 · 고전계 방사 내성", en: "IEC 61000-4-21 — high-field radiated immunity" },
      next: models(
        {
          model: "RVC e1",
          why: {
            ko: "매트릭스가 Commercial 잔향 분기에 두는 «RVC e1/e2» 중 작은 쪽 — 중소형 ISM·멀티미디어 제품용입니다.",
            en: "The smaller of the matrix's “RVC e1/e2” at the commercial reverberation branch — for small and medium ISM and multimedia products.",
          },
        },
        {
          model: "RVC e2",
          why: {
            ko: "같은 분기의 큰 쪽으로, 대형 ISM·멀티미디어 제품과 더 낮은 시작 주파수를 받습니다.",
            en: "The larger of the same pair, for large ISM and multimedia products and a lower starting frequency.",
          },
        },
      ),
    },
    {
      id: "pre",
      label: { ko: "사전 인증 (Pre-compliance)", en: "Pre-compliance" },
      note: { ko: "컴팩트 챔버 · 개발 단계", en: "A compact chamber, during development" },
      next: models(
        {
          model: "CHC",
          why: {
            ko: "매트릭스가 Commercial 사전 인증에 두는 «CHC»입니다 — 정식 인증 내성과 사전 인증 방출을 한 방에서 해결하는 가장 작은 3.0 m 챔버.",
            en: "The matrix's “CHC” at commercial pre-compliance — the smallest 3.0 m chamber that puts full compliant immunity and pre-compliance emission in one room.",
          },
          caveat: {
            ko: "내성은 3.0 m 정식 인증, 방사 방출은 사전 인증 범위입니다. 정온 영역은 ø1.2 m입니다.",
            en: "Full compliant immunity at 3.0 m; radiated emission is pre-compliant. The quiet zone is ø1.2 m.",
          },
        },
        {
          model: "CHC Plus",
          why: {
            ko: "CHC의 상위 구성으로, 1 GHz~18 GHz 구간을 정식 인증 수준으로 측정합니다 — 레이더·무선 대역까지 인증해야 할 때의 답입니다.",
            en: "The advanced setup of the CHC, measuring 1 GHz to 18 GHz to full compliance — the answer when the radar and radio bands have to certify.",
          },
          caveat: {
            ko: "매트릭스에는 없고 카탈로그에 있는 구성입니다. 적합 방사 방출 측정 구간은 1 GHz~18 GHz이고, 30 MHz~1 GHz는 사전 인증 범위입니다.",
            en: "A configuration the catalogue carries and the matrix does not draw. Compliant emission measurement runs from 1 GHz to 18 GHz; from 30 MHz to 1 GHz it is pre-compliant.",
          },
        },
        {
          model: "CTC",
          why: {
            ko: "매트릭스가 CHC와 나란히 두는 «CTC»입니다 — CISPR 25 · ISO 11452 · MIL-STD 461 · DO-160 · IEC 61000-4-3을 한 챔버에서 정식 인증합니다.",
            en: "The matrix's “CTC”, drawn beside the CHC — it certifies CISPR 25, ISO 11452, MIL-STD 461, DO-160 and IEC 61000-4-3 in one chamber.",
          },
          caveat: {
            ko: "내성 시험을 중심에 둔 부품 챔버입니다. CISPR 25 · ISO 11452 · MIL-STD 461 · DO-160은 1.0 m, IEC 61000-4-3은 3.0 m 측정 거리에서 정식 인증됩니다.",
            en: "A component chamber built around immunity testing. CISPR 25, ISO 11452, MIL-STD 461 and DO-160 are certified at 1.0 m and IEC 61000-4-3 at 3.0 m.",
          },
        },
      ),
    },
    {
      id: "sac",
      label: { ko: "정식 인증 — 반무향 SAC", en: "Full compliance — semi-anechoic (SAC)" },
      note: { ko: "접지면 있음 · CISPR 16-1-4, ANSI C63.4", en: "With a ground plane — CISPR 16-1-4, ANSI C63.4" },
      next: ask(
        "comm-sac-distance",
        { ko: "측정 거리", en: "Measurement distance" },
        { ko: "측정 거리는 어느 쪽입니까?", en: "Which measurement distance?" },
        {
          ko: "규격이 정한 안테나–피시험체 거리입니다. 매트릭스는 SAC 분기 아래에 3.0 m · 5.0 m · 10.0 m를 둡니다.",
          en: "The antenna-to-EUT distance the standard prescribes. The matrix draws 3.0 m, 5.0 m and 10.0 m under the SAC branch.",
        },
        [
          {
            id: "3m",
            label: { ko: "3.0 m", en: "3.0 m" },
            note: { ko: "가장 널리 쓰이는 시험장 거리", en: "The most common test-site distance" },
            carry: { distance: "3m" },
            next: models(
              {
                model: "SAC-3 Plus",
                why: {
                  ko: "매트릭스가 Commercial SAC 3.0 m에 두는 두 모델 중 돔형입니다 — 이 등급에서 가장 많이 선택되는 챔버.",
                  en: "The dome shell of the two the matrix puts at commercial SAC 3.0 m — the most selected chamber in its class.",
                },
                caveat: {
                  ko: "정온 영역은 ø1.2~2.0 m입니다. ø2.0 m를 넘어야 하면 Square 쪽입니다.",
                  en: "The quiet zone runs ø1.2 m to ø2.0 m. Beyond ø2.0 m the answer is the Square.",
                },
              },
              {
                model: "SAC-3 Square",
                why: {
                  ko: "같은 분기의 사각형 셸입니다 — ø3.0 m 정온 영역과 대형 턴테이블·이동식 다이나모미터를 받아들입니다.",
                  en: "The square shell of the same pair — room for a ø3.0 m quiet zone and a large turntable or mobile dynamometer.",
                },
              },
            ),
          },
          {
            id: "5m",
            label: { ko: "5.0 m", en: "5.0 m" },
            note: { ko: "3.0 m와 5.0 m를 함께 쓰는 구성", en: "Chambers covering 3.0 m and 5.0 m together" },
            carry: { distance: "5m" },
            next: models(
              {
                model: "SAC-5 Plus",
                why: {
                  ko: "매트릭스가 Commercial SAC 5.0 m에 두는 두 모델 중 돔형입니다 — 3.0 m와 5.0 m 측정 거리를 함께 씁니다.",
                  en: "The dome shell of the two the matrix puts at commercial SAC 5.0 m, covering both the 3.0 m and 5.0 m test distances.",
                },
              },
              {
                model: "SAC-5 Square",
                why: {
                  ko: "같은 분기의 사각형 셸로, 5.0 m에서 ø4.0 m 정온 영역까지 넓힙니다.",
                  en: "The square shell of the same pair, stretching to a ø4.0 m quiet zone at 5.0 m.",
                },
              },
            ),
          },
          {
            id: "10m",
            label: { ko: "10.0 m", en: "10.0 m" },
            note: { ko: "완성차 · 대형 피시험체 · CISPR 16-1-4", en: "Whole vehicles, large EUTs, CISPR 16-1-4" },
            // The custom quiet zone two questions below lands in Ⓑ, and this
            // is what stops it arriving without the distance it belongs to.
            carry: { distance: "10m" },
            next: ask(
              "comm-10m-build",
              { ko: "10.0 m 구성", en: "10.0 m configuration" },
              { ko: "10.0 m 챔버는 어떤 구성으로 지으시겠습니까?", en: "How should the 10.0 m chamber be built?" },
              {
                ko: "매트릭스는 10.0 m 아래에 하이브리드 · 피라미드 · Special 세 갈래를 둡니다. 앞의 둘은 라이닝 방식이고, Special은 같은 측정 거리를 다각형 셸로 짓는 두 구성입니다.",
                en: "The matrix draws three under 10.0 m — hybrid, pyramid, and Special. The first two are linings; Special is the same measurement distance built into a polygonal shell.",
              },
              [
                {
                  id: "hybrid",
                  label: { ko: "하이브리드 (페라이트 + Frankosorb®)", en: "Hybrid — ferrite with Frankosorb®" },
                  note: { ko: "건물 면적을 아낄 때 · 30 MHz~40 GHz", en: "When floor area is the constraint — 30 MHz to 40 GHz" },
                  next: tenMetreQz("hybrid", "SAC-10/H Hybrid", {
                    "3m": { name: "SAC-10-3/H", size: "18,380 × 12,830 × 8,550 mm" },
                    "4m": { name: "SAC-10-4/H", size: "19,280 × 13,280 × 8,550 mm" },
                    "5m": { name: "SAC-10-5/H", size: "21,080 × 15,080 × 8,700 mm" },
                    "6m": { name: "SAC-10-6/H", size: "21,680 × 15,680 × 8,700 mm" },
                  }),
                },
                {
                  id: "pyramid",
                  label: { ko: "피라미드 (Frankosorb® 단독)", en: "Pyramid — Frankosorb® alone" },
                  note: { ko: "라이닝 비용을 아낄 때 · 26 MHz~40 GHz", en: "When lining cost is the constraint — 26 MHz to 40 GHz" },
                  next: tenMetreQz("pyramid", "SAC-10/P Pyramid", {
                    "3m": { name: "SAC-10-3/P", size: "21,680 × 13,730 × 8,550 mm" },
                    "4m": { name: "SAC-10-4/P", size: "21,680 × 13,730 × 8,550 mm" },
                    "5m": { name: "SAC-10-5/P", size: "23,480 × 16,580 × 9,000 mm" },
                    "6m": { name: "SAC-10-6/P", size: "24,980 × 17,180 × 9,000 mm" },
                  }),
                },
                {
                  id: "special",
                  label: { ko: "Special — 다각형 셸", en: "Special — the polygonal shell" },
                  note: { ko: "건물 면적 최소화 또는 처리량 극대화", en: "Smallest floor area, or highest throughput" },
                  next: models(
                    {
                      model: "SAC-10 Plus",
                      why: {
                        ko: "매트릭스가 10.0 m «Special»에 두는 «SAC-10 Plus»입니다 — 같은 Triton 셸을 단일 축으로 쓰는 가장 저렴한 10.0 m 구성.",
                        en: "The matrix's “SAC-10 Plus” at 10.0 m Special — the same Triton shell on a single axis, the least expensive way to a 10.0 m chamber.",
                      },
                      caveat: {
                        ko: "정온 영역은 ø3.0 m 고정입니다. 더 큰 QZ가 필요하시면 하이브리드 또는 피라미드 분기입니다.",
                        en: "The quiet zone is fixed at ø3.0 m. For anything larger the answer is the hybrid or pyramid branch.",
                      },
                    },
                    {
                      model: "SAC-10 Plus Triton",
                      why: {
                        ko: "매트릭스가 나란히 적어 둔 «Triton»입니다 — 하나의 다각형 셸 안에 10.0 m 축 1개와 3.0 m 축 2개를 두어 세 시험을 병행합니다.",
                        en: "The matrix's “Triton”, written beside it — one 10.0 m axis and two 3.0 m axes in a single polygonal shell, three tests in parallel.",
                      },
                      caveat: {
                        ko: "안테나와 바닥 흡수체를 옮기지 않고 세 시험을 병행합니다. 한 건물에서 처리량을 최대로 끌어올려야 할 때의 답이며, 정온 영역은 ø3.0 m입니다.",
                        en: "Three tests in parallel with the antennas and floor absorbers staying in place — the answer when throughput in one building is the constraint. The quiet zone is ø3.0 m.",
                      },
                    },
                  ),
                },
              ],
            ),
          },
        ],
      ),
    },
    {
      id: "fac",
      label: { ko: "정식 인증 — 완전무향 FAC", en: "Full compliance — fully anechoic (FAC)" },
      note: { ko: "접지면 없는 자유공간 · IEC/EN 61000-4-22", en: "Free space, no ground plane — IEC / EN 61000-4-22" },
      // Every fully anechoic chamber in the range is a 3.0 m one.
      carry: { distance: "3m" },
      next: ask(
        "comm-fac-build",
        { ko: "FAC 구성", en: "FAC configuration" },
        { ko: "완전무향실은 어떤 구성이 필요하십니까?", en: "Which fully anechoic build do you need?" },
        {
          ko: "매트릭스는 FAC 분기 아래에 FAC-3 · FAC-3 L · SAC-3/FAC-3 Transformer 세 갈래를 둡니다.",
          en: "The matrix draws three under the FAC branch — the FAC-3, the FAC-3 L, and the SAC-3 / FAC-3 Transformer.",
        },
        [
          {
            id: "tabletop",
            label: { ko: "테이블탑 피시험체", en: "Table-top EUTs" },
            next: models({
              model: "FAC-3",
              why: {
                ko: "매트릭스가 FAC 분기에 두는 «FAC-3»입니다 — 테이블탑 피시험체의 자유공간 EMC 시험장.",
                en: "The matrix's “FAC-3” at the FAC branch — the free-space EMC test site for table-top EUTs.",
              },
              caveat: {
                ko: "접지면이 없는 자유공간 조건입니다. 접지면을 요구하는 시험장 규격에는 반무향(SAC) 계열이 필요합니다.",
                en: "Free-space conditions, with no ground plane. A test-site standard that requires one needs a semi-anechoic chamber instead.",
              },
            }),
          },
          {
            id: "floor",
            label: { ko: "거치형 피시험체까지 (높이 스캔)", en: "Floor-standing EUTs as well — with height scan" },
            next: models({
              model: "FAC-3 L",
              why: {
                ko: "매트릭스의 «FAC-3 L»입니다 — 높이 스캔으로 거치형 피시험체까지 확장한 구성.",
                en: "The matrix's “FAC-3 L” — the build with a height scan that extends it to floor-standing EUTs.",
              },
              caveat: {
                ko: "접지면이 없는 자유공간 조건입니다.",
                en: "Free-space conditions, with no ground plane.",
              },
            }),
          },
          {
            id: "both",
            label: { ko: "반무향과 완전무향 모두", en: "Both semi-anechoic and fully anechoic" },
            note: { ko: "바닥 흡수체를 넣고 빼며 전환", en: "Converted by adding or removing the floor absorbers" },
            next: models({
              model: "SAC-3 / FAC-3 Transformer",
              why: {
                ko: "매트릭스가 «SAC-3 / FAC-3 Transformer»라고 적어 둔 모델입니다 — 두 바닥 조건이 모두 필요할 때의 답.",
                en: "The model the matrix writes as “SAC-3 / FAC-3 Transformer” — the answer when both floor conditions are needed.",
              },
              caveat: {
                ko: "바닥 흡수체를 넣고 빼는 것으로 반무향과 완전무향을 오갑니다.",
                en: "Converts between semi-anechoic and fully anechoic by adding or removing the floor absorbers.",
              },
            }),
          },
        ],
      ),
    },
    customBranch("B", {
      ko: "네 갈래 어디에도 해당하지 않는 산업·전자기기 요구사항",
      en: "An industrial requirement none of the four branches carries",
    }),
  ],
);

/* ---- Military ------------------------------------------------------ */

const military = ask(
  "mil-branch",
  { ko: "피시험체", en: "What is tested" },
  { ko: "무엇을 시험하십니까?", en: "What do you test?" },
  {
    ko: "매트릭스는 Military를 부품과 차량 두 갈래로 나눕니다. 두 갈래 모두 그 아래에서 흡수체 방식으로 다시 갈립니다.",
    en: "The matrix splits Military two ways — components and vehicles — and both split again on the absorber lining.",
  },
  [
    {
      id: "components",
      label: { ko: "부품 · 장비 (Components)", en: "Components and equipment" },
      note: { ko: "MIL-STD-461 · DO-160 부품 시험", en: "MIL-STD-461 and DO-160 component testing" },
      carry: { eut: "component" },
      next: ask(
        "mil-component-absorber",
        absorberKicker,
        { ko: "흡수체는 어느 방식입니까?", en: "Which absorber lining?" },
        absorberHint,
        [
          {
            id: "hybrid",
            label: { ko: "하이브리드", en: "Hybrid" },
            note: { ko: "9 kHz / 30 MHz~40 GHz", en: "9 kHz / 30 MHz to 40 GHz" },
            next: models({
              model: "MIL CHC",
              variant: {
                name: "MIL CHC",
                size: "4,880 × 4,880 × 3,000 mm",
                note: { ko: "9 kHz / 30 MHz~40 GHz, 하이브리드 흡수체", en: "9 kHz / 30 MHz to 40 GHz, hybrid absorber lining" },
              },
              why: {
                ko: "매트릭스가 Military 부품 · 하이브리드에 두는 «MIL CHC (Hybrid)»입니다.",
                en: "The matrix's “MIL CHC (Hybrid)” at military components with a hybrid lining.",
              },
            }),
          },
          {
            id: "pyramid",
            label: { ko: "피라미드", en: "Pyramid" },
            note: { ko: "9 kHz / 80 MHz~40 GHz · 단피라미드", en: "9 kHz / 80 MHz to 40 GHz — short pyramid" },
            next: models({
              model: "MIL CHC",
              variant: {
                name: "MIL CPC",
                size: "6,080 × 5,380 × 3,750 mm",
                note: { ko: "9 kHz / 80 MHz~40 GHz, 단피라미드 흡수체", en: "9 kHz / 80 MHz to 40 GHz, short-pyramid lining" },
              },
              why: {
                ko: "매트릭스가 Military 부품 · 피라미드에 두는 «MIL CPC (Pyramid)»입니다 — MIL CHC 모델 페이지의 피라미드 구성.",
                en: "The matrix's “MIL CPC (Pyramid)” at military components with a pyramid lining — the pyramid build on the MIL CHC model page.",
              },
            }),
          },
        ],
      ),
    },
    {
      id: "vehicle",
      label: { ko: "차량 · 대형 피시험체 (Vehicle)", en: "Vehicles and large EUTs" },
      note: { ko: "차량·플랫폼 단위 시험", en: "Testing at vehicle and platform scale" },
      carry: { eut: "vehicle" },
      next: ask(
        "mil-vehicle-absorber",
        absorberKicker,
        { ko: "흡수체는 어느 방식입니까?", en: "Which absorber lining?" },
        absorberHint,
        [
          {
            id: "hybrid",
            label: { ko: "하이브리드", en: "Hybrid" },
            note: { ko: "9 kHz / 30 MHz~40 GHz", en: "9 kHz / 30 MHz to 40 GHz" },
            carry: { startFreq: "30" },
            next: models({
              model: "MIL-STD Chamber Advanced",
              variant: {
                name: "MIL-STD Advanced Hybrid",
                size: "Custom size",
                note: { ko: "9 kHz / 30 MHz~40 GHz, 하이브리드 흡수체", en: "9 kHz / 30 MHz to 40 GHz, hybrid absorber lining" },
              },
              why: {
                ko: "매트릭스가 Military 차량 · 하이브리드에 두는 «MIL StD Advanced»의 하이브리드 구성입니다. 상용·차량 시험장 요구사항까지 함께 만족합니다.",
                en: "The hybrid build of the matrix's “MIL StD Advanced” at military vehicles with a hybrid lining. It meets the commercial and automotive test-site requirements as well.",
              },
            }),
          },
          {
            id: "pyramid",
            label: { ko: "피라미드", en: "Pyramid" },
            note: { ko: "시작 주파수로 다시 갈립니다", en: "Splits again on where the range starts" },
            next: ask(
              "mil-vehicle-start",
              { ko: "시작 주파수", en: "Where the range starts" },
              { ko: "시험은 어느 주파수부터 시작해야 합니까?", en: "Where does the test range have to start?" },
              {
                ko: "매트릭스가 «MIL STD 80 (P600)»과 «MIL STD 30 (P2400)»이라고 적어 둔 질문입니다. 두 숫자는 모델명이 아니라 흡수체가 대응하는 시작 주파수이고, P600·P2400은 피라미드 흡수체의 길이입니다.",
                en: "The question the matrix writes as “MIL STD 80 (P600)” and “MIL STD 30 (P2400)”. The two numbers are not model names but the frequency the lining starts at; P600 and P2400 are the lengths of the pyramid absorbers.",
              },
              [
                {
                  id: "80",
                  label: { ko: "80 MHz부터 — 쇼트 피라미드 P600", en: "From 80 MHz — short pyramid, P600" },
                  carry: { startFreq: "80" },
                  next: models({
                    model: "MIL-STD Chamber",
                    why: {
                      ko: "매트릭스의 «MIL STD 80 (P600)»입니다 — 단피라미드 라이닝으로 80 MHz부터 대응하는 차량용 군수 챔버.",
                      en: "The matrix's “MIL STD 80 (P600)” — the military vehicle chamber whose short-pyramid lining works from 80 MHz up.",
                    },
                    caveat: {
                      ko: "80 MHz부터 대응합니다. 26/30 MHz까지 필요하시면 Advanced 쪽입니다.",
                      en: "From 80 MHz up. If the range has to start at 26 or 30 MHz, that is the Advanced.",
                    },
                  }),
                },
                {
                  id: "26",
                  label: { ko: "26 / 30 MHz부터 — 장피라미드 P2400", en: "From 26 / 30 MHz — long pyramid, P2400" },
                  carry: { startFreq: "26" },
                  next: models({
                    model: "MIL-STD Chamber Advanced",
                    variant: {
                      name: "MIL-STD Advanced Pyramid",
                      size: "Custom size",
                      note: { ko: "9 kHz / 26 MHz~40 GHz, 장피라미드(P2400) 흡수체", en: "9 kHz / 26 MHz to 40 GHz, long-pyramid (P2400) absorbers" },
                    },
                    why: {
                      ko: "매트릭스의 «MIL STD Adv. / MIL STD 30 (P2400)»입니다 — 장피라미드 라이닝으로 26 MHz까지 내려가는 구성.",
                      en: "The matrix's “MIL STD Adv. / MIL STD 30 (P2400)” — the long-pyramid build that reaches down to 26 MHz.",
                    },
                  }),
                },
              ],
            ),
          },
        ],
      ),
    },
    customBranch("C", {
      ko: "부품·차량 어느 쪽으로도 담기지 않는 군수 요구사항",
      en: "A defence requirement that is neither of the two branches",
    }),
  ],
);

/* ---- Special Chambers ---------------------------------------------- */

const specialTaskCopy: Record<SpecialUse, { label: L; note: L }> = {
  sat: {
    label: { ko: "위성 시험 (SAT chamber)", en: "Satellite testing — SAT chamber" },
    note: { ko: "위성·탑재체 시험 설비", en: "Satellites and payloads under test" },
  },
  ota: {
    label: { ko: "안테나 부품 · OTA", en: "Antenna components — OTA" },
    note: { ko: "안테나·무선 부품의 방사 특성 측정", en: "Radiated performance of antennas and wireless components" },
  },
  "antenna-vehicle": {
    label: { ko: "차량 안테나 측정", en: "Vehicle antenna measurement" },
    note: { ko: "완성차에 장착된 안테나의 방사 특성", en: "Antenna performance measured on the whole vehicle" },
  },
  rcs: {
    label: { ko: "RCS 측정", en: "RCS measurement" },
    note: { ko: "레이더 반사 단면적 (Radar Cross Section)", en: "Radar cross-section" },
  },
};

const special = ask(
  "special-task",
  { ko: "측정 과제", en: "The measurement" },
  { ko: "어떤 측정을 위한 챔버입니까?", en: "What will the chamber measure?" },
  {
    ko: "매트릭스의 Special Chambers 상자에는 카탈로그 모델이 없습니다. 네 과제 모두 표준 모델이 아니라 측정 과제에 맞춰 설계되므로, 여기서 바로 설계팀 검토로 이어집니다.",
    en: "The Special Chambers box in the matrix has no catalogue models under it. All four are designed to the measurement task rather than picked from the standard range, so this branch goes straight to the engineering team.",
  },
  [
    ...specialUses.map((use) => ({
      id: use,
      label: specialTaskCopy[use].label,
      note: specialTaskCopy[use].note,
      carry: { use },
      next: { kind: "form", qid: "D" } satisfies FormNode,
    })),
    // The matrix draws the Ⓓ circle as this segment's `custom` oval, level
    // with the four tasks rather than under them. Since none of the four has a
    // catalogue model they all end there anyway — so what the oval really adds
    // is a way in for the measurement that is none of the four.
    {
      id: "custom",
      label: { ko: "그 외 특수 측정", en: "Some other special measurement" },
      note: {
        ko: "네 과제 어디에도 해당하지 않는 측정",
        en: "A measurement none of the four tasks describes",
      },
      next: { kind: "form", qid: "D" } satisfies FormNode,
    },
  ],
);

/* ---- The root ------------------------------------------------------ */

/**
 * Question one: the four boxes at the top of the matrix, in the drawing's
 * order and with the extension's renaming of the second one.
 *
 * The Shielded Room is deliberately not here. It appears nowhere in the
 * matrix, and it is not an EMC test site — it is the shell the range is built
 * on, bought on its own. A reader after one is served by its product page, not
 * by a chamber-selection tree.
 */
export const tree: AskNode = ask(
  "segment",
  { ko: "적용 분야", en: "Application" },
  { ko: "어떤 분야의 챔버가 필요하십니까?", en: "Which field is the chamber for?" },
  {
    ko: "본사 Chamber Matrix의 첫 갈래입니다. 이후 질문은 여기서 고르신 분야의 가지를 그대로 따라갑니다 — 가장 긴 경로도 몇 문항이면 끝납니다.",
    en: "The first branch of the head office Chamber Matrix. Everything after this follows the branch of the field you choose, and even the longest path is a handful of questions.",
  },
  [
    {
      id: "automotive",
      label: { ko: "Automotive", en: "Automotive" },
      note: { ko: "차량 · 전장부품 · 전기 구동계(E-Drive)", en: "Vehicles, vehicle components and electric drivetrains" },
      next: automotive,
    },
    {
      id: "commercial",
      label: { ko: "Commercial · Industrial", en: "Commercial · Industrial" },
      note: { ko: "일반 산업 · 전자기기", en: "Industrial and consumer electronics" },
      next: commercial,
    },
    {
      id: "military",
      label: { ko: "Military", en: "Military" },
      note: { ko: "군수 · 방산 · 항공", en: "Defence and aerospace" },
      next: military,
    },
    {
      id: "special",
      label: { ko: "특수 챔버 (Special Chambers)", en: "Special chambers" },
      note: {
        ko: "위성 시험 · 안테나 측정(OTA) · RCS — EMC 시험이 아닌 측정 과제",
        en: "Satellite testing, antenna measurement (OTA), RCS — measurement tasks beyond EMC",
      },
      next: special,
    },
  ],
);

/* ------------------------------------------------------------------ *
 * Walking it
 * ------------------------------------------------------------------ */

/** The reader's answers: one option id per question, in the order asked. */
export type Path = readonly string[];

export type Step = {
  question: AskNode;
  /** Undefined only for the last entry, which is the question being asked. */
  chosen?: Branch;
};

export type Walk = {
  /** Every question the path has reached, answered ones first and the one
   *  being asked last. Drives the progress strip and the enquiry mail. */
  steps: readonly Step[];
  /** Where the path lands: the unanswered question, or the outcome. */
  at: Node;
  /** The path with anything unrecognised trimmed off. Choosing a different
   *  option part-way up invalidates everything under it, and this is where
   *  that happens — there is no separate pruning pass. */
  path: Path;
};

export const walk = (path: Path): Walk => {
  const steps: Step[] = [];
  const kept: string[] = [];
  let node: Node = tree;

  while (node.kind === "ask") {
    // Annotated because `Branch` and `Node` are mutually recursive, and the
    // inference walks in a circle without it.
    const chosen: Branch | undefined = node.options.find((o) => o.id === path[kept.length]);
    steps.push({ question: node, chosen });
    if (!chosen) break;
    kept.push(chosen.id);
    node = chosen.next;
  }

  return { steps, at: node, path: kept };
};

/**
 * Everything the branch has established, in the vocabulary of the segment's
 * questionnaire — see `Branch.carry`.
 *
 * Accumulated in the order asked, so a later branch overrides an earlier one
 * where both speak to the same field. Handed to whichever questionnaire the
 * reader reaches: the one their branch ends in, or the one the escape link
 * opens. A reader who answered "완성차" three questions ago should not be asked
 * again on the way out.
 */
export const carried = (path: Path): Readonly<Record<string, string>> => {
  const out: Record<string, string> = {};
  for (const step of walk(path).steps) Object.assign(out, step.chosen?.carry ?? {});
  return out;
};

/** The segment the path is on, before anything is chosen under it. */
export const segmentOf = (path: Path): SegmentChoice | undefined =>
  (segments as readonly string[]).includes(path[0]) ? (path[0] as SegmentChoice) : undefined;

/** Every model designation any branch of the tree ends in. Used by
 *  mychamber-catalogue.ts to check the tree against the catalogue at build
 *  time, and by the conformance test to check the catalogue against the tree. */
export const treeModels = (): readonly string[] => {
  const found = new Set<string>();
  const visit = (node: Node) => {
    if (node.kind === "models") {
      for (const leaf of node.leaves) found.add(leaf.model);
    } else if (node.kind === "ask") {
      for (const option of node.options) visit(option.next);
    }
  };
  visit(tree);
  return [...found];
};

/* ------------------------------------------------------------------ *
 * The result
 * ------------------------------------------------------------------ */

/** What the wizard needs about a model in the browser. Built on the server
 *  from `chamberModels` so the client bundle does not carry two locales of
 *  every model page's prose — see mychamber-catalogue.ts. */
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
  /** A photograph of the category, not of this model. */
  shot: { src: string; w: number; h: number };
};

export type Recommendation = {
  entry: CatalogueEntry;
  /** Why the matrix puts this model at the end of this branch. */
  why: string;
  /** The exact configuration the branch pins down, where it pins one down. */
  variant?: { name: string; size: string; note: string };
  caveat?: string;
};

/**
 * The models at the end of the branch, joined to the catalogue.
 *
 * In the drawing's order, because that is the head office's own ordering and
 * nothing here re-ranks it. A leaf naming a model the catalogue does not carry
 * is dropped rather than rendered empty — and cannot happen, because
 * mychamber-catalogue.ts fails the build on it.
 */
export const resolve = (
  catalogue: readonly CatalogueEntry[],
  node: ModelsNode,
  lang: Lang,
): Recommendation[] =>
  node.leaves.flatMap((leaf) => {
    const entry = catalogue.find((e) => e.name === leaf.model);
    if (!entry) return [];
    return [{
      entry,
      why: leaf.why[lang],
      variant: leaf.variant && {
        name: leaf.variant.name,
        size: leaf.variant.size,
        note: leaf.variant.note[lang],
      },
      caveat: leaf.caveat?.[lang],
    }];
  });
