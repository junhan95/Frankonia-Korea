import type { Plate } from "./page-body";
import type { Lang } from "./site-config";

/**
 * The photograph a model row opens onto, per model.
 *
 * Same split as chamber-gallery, and for the same reason: `frames` carries what
 * is true of the file — where it is and how big — and is written once; `alt`
 * carries what a reader is told, and is written per locale. A single per-locale
 * table would have meant two copies of every width and height, and the pair
 * that drifts apart is the pair that puts a page into layout shift.
 *
 * One frame per model, not two or three. The chamber branch has a page per
 * model and three photographs behind each; the head office photographs an
 * instrument once, against a studio backdrop, and that one cutout is all there
 * is. The gallery's stepper only appears above one frame, so a list of singles
 * renders as a plain plate — which is what these are.
 *
 * Keyed by `TestModel.name`, because that is what the model list is keyed by:
 * these products have no slug, having no page of their own.
 *
 * **A model missing from this table is not an omission.** Most of the
 * instruments here are not photographed by the head office — the four EFS
 * probes share one picture of a probe, the PSG-300A and the PMS 1084 B share
 * their sibling's enclosure, and the seventy amplifiers have no photograph at
 * all (test-systems-assets.md). A row with no frame still opens: its panel is
 * the figures alone, which is the half of the panel the source actually
 * supports.
 */

type Frame = Pick<Plate, "src" | "w" | "h">;

const p = (file: string, w: number, h: number): Frame =>
  ({ src: `/test-systems/images/${file}`, w, h });

const frames: Record<string, readonly Frame[]> = {
  "ALX-4000E": [p("antenna-alx-4000.webp", 1600, 1200)],
  "MAX-9": [p("antenna-max-9.webp", 1200, 900)],
  "MAX-18": [p("antenna-max-18.webp", 1024, 768)],
  "HAX-6": [p("antenna-hax-6.webp", 1600, 1200)],
  "HAX-18": [p("antenna-hax-18.webp", 1200, 900)],
  "HAX-40": [p("antenna-hax-40.webp", 1200, 900)],
  "LAX-10": [p("antenna-lax-10.webp", 859, 1021)],
  "FPA-18": [p("preamp-fpa-18.webp", 850, 567)],
  "FPA-40": [p("preamp-fpa-40.webp", 1006, 249)],
  "PMS 1084": [p("meter-pms-1084.webp", 1600, 249)],
  RSU: [p("meter-rsu.webp", 1600, 669)],
  "CIT-100": [p("system-cit-100.webp", 1600, 609)],
  "CIT-1000": [p("system-cit-1000.webp", 726, 356)],
  "ERX-6": [p("emission-erx-6.webp", 1400, 1003)],
  "ECU-6": [p("system-ecu-6.webp", 1032, 519)],
  "PSG-300": [p("system-psg-300.webp", 1400, 554)],
  "MTS-800": [p("system-mts-800.webp", 1400, 782)],
  "EFS-18": [p("efs-18.webp", 1200, 921)],
};

/**
 * What is in each frame, per locale.
 *
 * These say what is visible and nothing else — the ledger's rule for every alt
 * on the site. Seven of them are the wording the same file already carries as
 * the page's own plate, repeated verbatim rather than paraphrased: it is the
 * same photograph, and a second description of it would only be a second
 * chance to describe it differently.
 *
 * There is no caption rule to worry about here, because the panel prints no
 * captions. The figures under the picture are the caption's job.
 */
const alt: Record<Lang, Record<string, string>> = {
  en: {
    "ALX-4000E":
      "The ALX-4000E on a mast: a bow-tie element at the back and a tapering log-periodic boom of red-tipped elements in front",
    "MAX-9": "The MAX-9 under its red plastic protection cover, mounted on a tube",
    "MAX-18":
      "The MAX-18 under a red plastic protection cover, a flattened triangular wedge on a mounting tube with the feed cable leaving at the back",
    "HAX-6": "The HAX-6 broadband horn antenna on its mast, aperture facing the camera",
    "HAX-18": "The HAX-18, a silver pyramidal horn on a mounting tube",
    "HAX-40": "The HAX-40, a small horn with a waveguide transition and an SMA-compatible connector",
    "LAX-10":
      "The LAX-10: a grey shielded loop with a red marker at the top, standing on a rectangular amplifier box carrying a type plate and two indicator lamps",
    "FPA-18":
      "The FPA-18, a black anodised housing whose type plate reads “Broadband Preamplifier 1-18 GHz, Gain: 33 +/- 2.5 dB typ.”, with black and red banana jacks below it",
    "FPA-40":
      "The FPA-40 seen lengthwise: a slim silver housing lettered “18 - 40 GHz Preamplifier, Gain: 35 dB” beside an electrostatic-sensitive-device warning",
    "PMS 1084": "The PMS 1084 as a 1U rack unit, front panel lettered “RF Power Meter”",
    RSU: "The RSU rear panel with four relay blocks of N-type connectors",
    "CIT-100": "The CIT-100 in a 19-inch case, front panel lettered “Conducted Immunity Test System”",
    "CIT-1000":
      "The CIT-1000 front panel: a red Frankonia nameplate above the RF-IN and RF-OUT connectors, a wide touch screen running the control software, “Conducted Immunity Test System” lettered beneath it, and a red POWER rocker switch beside the CIT-1000 name strip",
    "ERX-6":
      "The ERX-6 in three-quarter view: a grey bench case with a carrying bail, a red side panel lettered ERX-6, and an 8.4-inch touch screen showing a frequency scan with the FREQ. SCAN, TRANSDUCER, LIMIT LINES, CURVES, SETTINGS, MARKER, SAVE SETTINGS and RUN keys down its right edge",
    "ECU-6":
      "The ECU-6 in a 4U rack case, front panel lettered “EMC CONTROL UNIT”, with an interlock button, a yellow OLED readout showing frequency and forward and reverse power, an RF-ON lamp and a power switch",
    "PSG-300": "The PSG-300 front panel, lettered “Power Signal Generator DC … 300 kHz”",
    "MTS-800":
      "The MTS-800 front panel, lettered “Magnetic Test System”, with banana jacks, BNC inputs and a mains switch",
    "EFS-18":
      "The EFS-18 on a small flexible tripod: a white spherical sensor head marked “EFS-18 1MHz – 18GHz E-Field”, with its cable coiled beside the base and ending in a small charging module",
  },
  ko: {
    "ALX-4000E":
      "마스트에 장착된 ALX-4000E — 뒤쪽에 보타이 소자, 앞쪽으로 끝이 빨간 소자들이 점점 짧아지는 로그페리오딕 붐",
    "MAX-9": "빨간 플라스틱 보호 커버를 씌우고 튜브에 장착한 MAX-9",
    "MAX-18":
      "빨간 플라스틱 보호 커버를 씌운 MAX-18 — 마운팅 튜브에 얹힌 납작한 삼각 쐐기 형상, 뒤쪽으로 급전 케이블이 빠져나온다",
    "HAX-6": "마스트에 장착된 HAX-6 광대역 혼 안테나, 개구면이 정면을 향한 모습",
    "HAX-18": "마운팅 튜브에 장착된 은색 피라미드형 혼 HAX-18",
    "HAX-40": "도파관 천이부와 SMA 호환 커넥터가 달린 소형 혼 HAX-40",
    "LAX-10":
      "LAX-10 — 꼭대기에 빨간 표시가 있는 회색 차폐 루프가 명판과 표시등 두 개를 단 직사각형 앰프 상자 위에 서 있다",
    "FPA-18":
      "FPA-18 — 검은 아노다이징 하우징, 명판에 “Broadband Preamplifier 1-18 GHz, Gain: 33 +/- 2.5 dB typ.”이 적혀 있고 그 아래 검정·빨강 바나나 잭이 있다",
    "FPA-40":
      "FPA-40을 옆에서 본 모습 — “18 - 40 GHz Preamplifier, Gain: 35 dB” 표기와 정전기 주의 표시가 나란히 붙은 얇은 은색 하우징",
    "PMS 1084": "1U 랙 유닛 형태의 PMS 1084, 전면 패널에 “RF Power Meter” 표기",
    RSU: "N형 커넥터 릴레이 블록 네 개가 붙은 RSU 후면 패널",
    "CIT-100": "19인치 케이스에 든 CIT-100, 전면 패널에 “Conducted Immunity Test System” 표기",
    "CIT-1000":
      "CIT-1000 전면 패널 — 왼쪽 위 빨간 FRANKONIA 명판 아래로 RF-IN·RF-OUT 커넥터, 가운데에 제어 소프트웨어가 떠 있는 넓은 터치스크린과 그 아래 “Conducted Immunity Test System” 표기, 오른쪽 CIT-1000 이름 띠 옆에 빨간 POWER 로커 스위치",
    "ERX-6":
      "비스듬히 본 ERX-6 — 손잡이 베일이 달린 회색 벤치 케이스, ERX-6이라 적힌 빨간 측면 패널, 주파수 스캔 화면과 오른쪽 가장자리를 따라 늘어선 FREQ. SCAN·TRANSDUCER·LIMIT LINES·CURVES·SETTINGS·MARKER·SAVE SETTINGS·RUN 키가 보이는 8.4인치 터치스크린",
    "ECU-6":
      "4U 랙 케이스에 든 ECU-6 — 전면 패널에 “EMC CONTROL UNIT” 표기, 인터록 버튼과 주파수·진행·반사 전력을 띄운 노란 OLED 표시부, RF-ON 표시등, 전원 스위치",
    "PSG-300": "PSG-300 전면 패널, “Power Signal Generator DC … 300 kHz” 표기",
    "MTS-800":
      "“Magnetic Test System” 표기가 있는 MTS-800 전면 패널 — 바나나 잭, BNC 입력, 전원 스위치",
    "EFS-18":
      "작은 플렉시블 삼각대에 올린 EFS-18 — “EFS-18 1MHz – 18GHz E-Field”라 적힌 흰색 구형 센서 헤드, 받침 옆으로 감아 놓은 케이블 끝에 작은 충전 모듈",
  },
};

/** This model's frames, ready for the accordion. Empty for a model the head
 *  office does not photograph — the caller renders the figures alone. */
export const modelShots = (lang: Lang, name: string): readonly Plate[] =>
  (frames[name] ?? []).map((frame) => ({ ...frame, alt: alt[lang][name] }));
