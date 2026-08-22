import type { ChamberModel } from "./chamber-sections";
import type { Plate } from "./page-body";
import type { Lang } from "./site-config";

/**
 * The extra plates a model row opens onto, beyond the one its own page leads
 * with.
 *
 * Where they came from — the head office's own model pages, re-collected the
 * way docs/source/chambers-model-assets.md §1 describes — and how the two per
 * model were chosen is in that ledger, §6. The short version: the catalogue and
 * photobook PDFs were checked again and are still the wrong source (§4), the
 * web originals run 2,500 px on the long side against the catalogue's 150 ppi,
 * and they arrive already sorted by model because each model has a page.
 *
 * The shape is split in two on purpose. `frames` carries what is true of the
 * file — where it is and how big — and is written once; `alt` carries what a
 * reader is told, and is written per locale. A single per-locale table would
 * have meant two copies of every width and height, and the pair that drifts
 * apart is the pair that puts a page into layout shift.
 *
 * Four models have one extra rather than two: MIL CHC, MIL-STD Chamber, EDTC-AX
 * and EDTC-BB. The head office publishes three photographs of each, one of
 * which is the plate their page already leads with and one of which is the
 * dark backdrop that appears on all twenty-six pages. A gallery of two is what
 * the source supports, and inventing a third would mean showing a chamber that
 * is not this one.
 *
 * Keyed by our model slug, not the head office's — `sac-10-plus-triton`,
 * `edtc-sa` and `rvc` differ. See the note on `ChamberModel.slug`.
 */

type Frame = Pick<Plate, "src" | "w" | "h">;

const p = (file: string, w: number, h: number): Frame =>
  ({ src: `/chambers/models/${file}`, w, h });

const frames: Record<string, readonly Frame[]> = {
  actc: [p("actc-0.webp", 1400, 1400), p("actc-2.webp", 1400, 934)],
  ucc: [p("ucc-0.webp", 1400, 1400), p("ucc-1.webp", 1400, 1050)],
  ctc: [p("ctc-2.webp", 1050, 700), p("ctc-3.webp", 1400, 1050)],
  chc: [p("chc-0.webp", 1400, 1400), p("chc-1.webp", 1400, 933)],
  "chc-plus": [p("chc-plus-0.webp", 1400, 1050), p("chc-plus-1.webp", 1400, 933)],
  avtc: [p("avtc-3.webp", 1400, 933), p("avtc-5.webp", 1400, 933)],
  "sac-10-v": [p("sac-10-v-6.webp", 1400, 933), p("sac-10-v-1.webp", 1400, 778)],
  "edtc-sa": [p("edtc-1.webp", 1400, 788), p("edtc-4.webp", 1400, 933)],
  "edtc-ax": [p("edtc-ax-1.webp", 1400, 1167)],
  "edtc-bb": [p("edtc-bb-1.webp", 1400, 933)],
  "mil-chc": [p("mil-chc-0.webp", 1400, 1400)],
  "mil-std-chamber": [p("mil-std-chamber-1.webp", 1024, 500)],
  "mil-std-chamber-advanced": [
    p("mil-std-chamber-advanced-2.webp", 1400, 1050),
    p("mil-std-chamber-advanced-4.webp", 1400, 1050),
  ],
  "sac-3-plus": [p("sac-3-plus-0.webp", 1400, 1120), p("sac-3-plus-2.webp", 1400, 933)],
  "sac-3-square": [p("sac-3-square-0.webp", 1400, 1050), p("sac-3-square-2.webp", 933, 622)],
  "sac-5-plus": [p("sac-5-plus-0.webp", 1400, 1120), p("sac-5-plus-2.webp", 1400, 933)],
  "sac-5-square": [p("sac-5-square-0.webp", 1400, 875), p("sac-5-square-2.webp", 1400, 933)],
  "sac-10-plus": [p("sac-10-plus-0.webp", 1400, 1400), p("sac-10-plus-2.webp", 1400, 933)],
  "sac-10-plus-triton": [p("triton-4.webp", 1400, 933), p("triton-3.webp", 1400, 933)],
  "sac-10-h-hybrid": [p("sac-10-h-hybrid-0.webp", 1400, 1400), p("sac-10-h-hybrid-3.webp", 1400, 933)],
  "sac-10-p-pyramid": [p("sac-10-p-pyramid-0.webp", 1400, 1400), p("sac-10-p-pyramid-1.webp", 1024, 500)],
  "fac-3": [p("fac-3-0.webp", 1400, 1000), p("fac-3-1.webp", 1400, 933)],
  "fac-3-l": [p("fac-3-l-0.webp", 1400, 1050), p("fac-3-l-1.webp", 1400, 933)],
  "sac-3-fac-3-transformer": [
    p("sac-3-fac-3-transformer-0.webp", 1400, 1050),
    p("sac-3-fac-3-transformer-2.webp", 1400, 930),
  ],
  rvc: [p("reverberation-solutions-1.webp", 656, 437), p("reverberation-solutions-2.webp", 656, 437)],
  "shielded-room": [p("shielded-room-6.webp", 846, 564), p("shielded-room-2.webp", 1400, 933)],
};

/**
 * What is in each frame, in order, per locale.
 *
 * These say what is visible and nothing else — the ledger's rule for every alt
 * on the site. Where a picture is a sectioned render rather than a photograph
 * it says so, because a reader who cannot see it would otherwise be told the
 * room has no fourth wall.
 */
const alt: Record<Lang, Record<string, readonly string[]>> = {
  ko: {
    actc: [
      "ACTC 절개 렌더. 상자형 챔버 안쪽이 하이브리드 흡수체로 덮여 있고, 접지면 위에 안테나 거치대와 시험대가 놓여 있습니다. 지붕에는 붉은 강재 보가 지나갑니다.",
      "붉은 거치대에 실린 로그페리어딕 안테나가 접지면 위 시험대를 향해 있습니다. 뒤쪽 벽은 검은 페라이트 면이고 옆면은 흰 흡수체입니다.",
    ],
    ucc: [
      "UCC 절개 렌더. 캐비닛 크기의 챔버로 문이 열려 있고, 안쪽 벽은 검은 페라이트 타일과 흰 흡수체로 나뉘어 있습니다. 접지면 위에 붉은 안테나 거치대가 있습니다.",
      "구리 접지판을 가까이서 본 모습. 나사로 고정된 구리 판이 이어져 있고 그 위로 흰 시험대 프레임이 지나갑니다. 뒤쪽은 흡수체 벽입니다.",
    ],
    ctc: [
      "챔버를 위에서 내려다본 모습. 나무 시험대 위로 혼 안테나가 놓여 있고, 바닥은 접지면이며 벽과 천장은 흰 흡수체입니다.",
      "천장과 벽이 만나는 모서리. 흰 흡수체 사이에 조명이 끼워져 있고 그 뒤로 검은 페라이트 면이 드러나 있습니다.",
    ],
    chc: [
      "CHC 절개 렌더. 컴팩트한 상자형 챔버로 차폐문이 열려 있고, 안쪽은 검은 페라이트와 흰 흡수체를 함께 쓴 하이브리드 라이닝입니다.",
      "챔버 안에서 본 차폐문. 흡수체 사이로 어두운 강판 문 두 짝이 드러나 있고, 옆 패널에 Frankonia 마크가 찍혀 있습니다.",
    ],
    "chc-plus": [
      "CHC Plus 절개 렌더. 붉은 지붕 보 아래로 흡수체를 두른 실내가 보이고, 바닥에도 흡수체가 깔린 채 안테나 거치대가 서 있습니다.",
      "삼각대에 올린 붉은 혼 안테나가 챔버 안쪽을 향해 있습니다. 바닥에는 흰 흡수체가 깔려 있고 케이블이 뒤로 이어집니다.",
    ],
    avtc: [
      "붉은 SUV가 턴테이블 위에 올라 있고 왼쪽에 안테나 마스트가 서 있습니다. 벽은 흰 흡수체, 바닥은 도장 접지면입니다.",
      "챔버 밖 제어실. 계측기 랙과 모니터가 늘어선 책상이 있고, 오른쪽에 흰 차폐문이 닫혀 있습니다.",
    ],
    "sac-10-v": [
      "노란 굴착기 한 대가 챔버 안 접지면 위에 서 있습니다. 오른쪽에 안테나 마스트가 있고 벽과 천장은 흰 흡수체입니다.",
      "챔버가 들어간 건물 전체를 잘라 본 렌더. 아래층에 차량 시험실과 다이나모미터가, 위층에 제어실과 통로가 놓여 있습니다.",
    ],
    "edtc-sa": [
      "EDTC 절개 렌더. 챔버 안에는 안테나 거치대와 시험대가 있고, 벽 너머 바깥의 붉은 부하기와 기어박스가 축으로 이어져 있습니다.",
      "챔버 밖 기기실. 회색 캐비닛과 이동식 변환기가 놓여 있고, 벽 아래로 굵은 케이블 덕트 세 개가 챔버 쪽으로 들어갑니다.",
    ],
    "edtc-ax": [
      "EDTC-AX 절개 렌더. 구리 접지판을 얹은 시험대 위에 붉은 부하기 두 대가 마주 놓여 있고, 바닥에는 바이코니컬 안테나가 서 있습니다.",
    ],
    "edtc-bb": [
      "챔버 안에 안테나 마스트가 서 있고, 가운데 턴테이블 위에 파란 EMC-BlueBox 부하기와 시험체가 올라가 있습니다.",
    ],
    "mil-chc": [
      "MIL CHC 절개 렌더. 차폐문이 열린 컴팩트 챔버로, 안쪽에 붉은 안테나 거치대와 시험대가 놓여 있습니다.",
    ],
    "mil-std-chamber": [
      "군용 트럭 한 대가 챔버 안에 서 있고, 그 앞에서 한 사람이 이동식 안테나 마스트를 조정하고 있습니다. 벽은 숏피라미드 흡수체입니다.",
    ],
    "mil-std-chamber-advanced": [
      "붉은 프레임의 대형 차폐 게이트가 열려 있고 그 너머 챔버 안에 차량 한 대가 보입니다. 흡수체는 게이트 안쪽까지 이어집니다.",
      "검은 장갑 차량이 챔버 안에 있고, 앞쪽 바닥에는 붉은 롱피라미드 흡수체와 배기 덕트가 놓여 있습니다.",
    ],
    "sac-3-plus": [
      "SAC-3 Plus 절개 렌더. 굽은 돔 지붕 아래로 흡수체를 두른 실내가 보이고, 접지면 위에 안테나 마스트가 서 있습니다.",
      "돔 지붕 아래에서 본 시험실. 뒷벽에 DEKRA 현수막이 걸려 있고, 접지면에는 턴테이블과 노란 표시선이 그려져 있습니다.",
    ],
    "sac-3-square": [
      "SAC-3 Square 절개 렌더. 붉은 강재 프레임을 두른 정방형 챔버로, 접지면 위에 턴테이블과 안테나 거치대가 놓여 있습니다.",
      "정방형 챔버의 모서리를 세로로 담은 사진. 벽은 흰 피라미드 흡수체이고 바닥 접지면에는 턴테이블 원과 노란 표시가 있습니다.",
    ],
    "sac-5-plus": [
      "SAC-5 Plus 절개 렌더. 붉은 아치형 리브가 지나가는 돔 지붕 아래로 흡수체 벽이 이어지고, 접지면 위에 안테나 마스트가 있습니다.",
      "돔 천장을 올려다본 모습. 흰 흡수체가 굽은 곡선을 따라가고 그 너머로 검은 페라이트 면이 드러나 있습니다.",
    ],
    "sac-5-square": [
      "SAC-5 Square 절개 렌더. 붉은 프레임의 정방형 챔버로, 접지면에 턴테이블 원이 그려져 있고 안테나 거치대가 서 있습니다.",
      "벽면 피라미드 흡수체를 따라 턴테이블 쪽을 바라본 사진. 흡수체가 원근을 따라 좁아지고 바닥은 매끈한 접지면입니다.",
    ],
    "sac-10-plus": [
      "SAC-10 Plus 절개 렌더. 붉은 강재 프레임이 감싼 다각형 셸 안에 흡수체를 두른 시험실이 있고, 바닥에 시험 축 하나가 표시되어 있습니다.",
      "천장을 올려다본 모습. 긴 피라미드 흡수체가 줄지어 매달려 있고 그 사이로 조명이 켜져 있습니다.",
    ],
    "sac-10-plus-triton": [
      "한 사람이 챔버 바닥을 가로질러 걷고 있습니다. 뒤쪽 벽면에는 흡수체가 붙어 있고 바닥에는 이동식 흡수체가 세워져 있습니다.",
      "안테나가 벽 앞 거치대에 실려 있고, 그 아래 바닥에는 흡수체 블록이 줄지어 세워져 있습니다.",
    ],
    "sac-10-h-hybrid": [
      "SAC-10/H Hybrid 절개 렌더. 붉은 프레임 안에 하이브리드 라이닝의 시험실이 있고 옆으로 2층 부속 건물이 붙어 있습니다.",
      "이동식 대차에 실린 안테나 마스트가 챔버 가운데 서 있고 바닥에는 붉은 레이저 선이 그어져 있습니다. 벽은 아래쪽이 페라이트, 위쪽이 흡수체입니다.",
    ],
    "sac-10-p-pyramid": [
      "SAC-10/P Pyramid 절개 렌더. 붉은 프레임 안 시험실이 롱피라미드 흡수체로만 덮여 있고 가운데에 시험체가 놓여 있습니다.",
      "롱피라미드 흡수체를 가까이서 본 모습. 뾰족한 피라미드가 벽을 빼곡히 덮고 있고 그 사이에 조명 두 개가 끼워져 있습니다.",
    ],
    "fac-3": [
      "FAC-3 절개 렌더. 벽과 천장뿐 아니라 바닥까지 흡수체로 덮인 완전무향 구성이고 가운데에 안테나 마스트가 서 있습니다.",
      "삼각대에 올린 안테나와 그 뒤의 붉은 안테나가 바닥 흡수체 위에 놓여 있습니다. 접지면 없이 바닥까지 흡수체가 깔려 있습니다.",
    ],
    "fac-3-l": [
      "FAC-3 L 절개 렌더. 바닥까지 흡수체로 덮인 확장형 완전무향실로, 안테나 마스트와 출입 계단이 함께 그려져 있습니다.",
      "붉은 증폭기와 혼 안테나가 챔버 안쪽을 향해 놓여 있고 바닥에는 흡수체와 나무 시험대가 있습니다.",
    ],
    "sac-3-fac-3-transformer": [
      "SAC-3 / FAC-3 Transformer 절개 렌더. 접지면 위에 바닥 흡수체를 깔아 완전무향으로 바꾼 구성이고, 가운데에 안테나 마스트가 있습니다.",
      "붉은 거치대에 실린 로그페리어딕 안테나가 흡수체 벽을 향해 있습니다. 벽은 위쪽이 흡수체, 아래쪽이 검은 페라이트입니다.",
    ],
    rvc: [
      "금속 벽으로만 둘러싸인 방 안에 Z자로 접힌 스터러가 세로로 서 있습니다. 흡수체는 어디에도 없고 바닥에 노란 표시선이 있습니다.",
      "위에서 내려오는 조명을 받는 Z자 스터러. 오른쪽에 작은 안테나가 매달려 있고 벽과 천장은 모두 금속면입니다.",
    ],
    "shielded-room": [
      "차폐룸의 환기구를 가까이서 본 모습. 촘촘한 금속 벌집 패널이 벽면에 끼워져 있습니다.",
      "공장 홀 안에 나란히 선 차폐룸 두 개. 문이 열려 있어 안쪽 책상과 계측기가 보이고 위로는 건물 배관과 덕트가 지나갑니다.",
    ],
  },
  en: {
    actc: [
      "Cutaway render of the ACTC: a box chamber lined with hybrid absorbers, an antenna mount and a bench on the ground plane, and red steel beams across the roof.",
      "A log-periodic antenna on a red mount, aimed along the ground-plane bench. The wall behind it is bare ferrite, the one beside it white absorbers.",
    ],
    ucc: [
      "Cutaway render of the UCC: a cabinet-sized chamber with the door open, the inner walls split between black ferrite tiles and white absorbers, and a red antenna mount on the ground plane.",
      "The copper ground plane close up — bolted copper sheets running under the white bench frame, absorbers on the wall behind.",
    ],
    ctc: [
      "Looking down into the chamber: a horn antenna set over a wooden bench, the ground plane below, absorbers on the walls and ceiling.",
      "The corner where ceiling meets wall — lights set between the white absorbers, bare ferrite showing behind them.",
    ],
    chc: [
      "Cutaway render of the CHC: a compact box chamber with the shielded door open, lined with black ferrite and white absorbers together.",
      "The shielded door seen from inside: two dark steel leaves between the absorbers, with the Frankonia mark stamped into the panel beside them.",
    ],
    "chc-plus": [
      "Cutaway render of the CHC Plus: absorbers all round under red roof beams, with floor absorbers laid down and an antenna stand on them.",
      "A red horn antenna on a tripod, aimed down the chamber over white floor absorbers, its cable running back behind it.",
    ],
    avtc: [
      "A red SUV on the turntable with an antenna mast to the left, absorber walls all round and a painted ground plane underfoot.",
      "The control room outside the chamber: instrument racks and a desk of monitors, with the white shielded door closed at the right.",
    ],
    "sac-10-v": [
      "A yellow excavator standing on the ground plane inside the chamber, an antenna mast to the right, absorbers over the walls and ceiling.",
      "A cutaway render of the whole building: the vehicle chamber and its dynamometer on the lower floor, control rooms and a walkway above.",
    ],
    "edtc-sa": [
      "Cutaway render of the EDTC: mount and bench inside the chamber, the red load machine and gearbox outside the wall, joined through it by the shaft.",
      "The plant room outside the chamber: grey cabinets and a wheeled converter, with three thick cable ducts running into the wall.",
    ],
    "edtc-ax": [
      "Cutaway render of the EDTC-AX: two red load machines facing each other on a copper-topped bench, with a biconical antenna standing on the floor.",
    ],
    "edtc-bb": [
      "An antenna mast in the chamber, with the blue EMC-BlueBox load machine and its test piece on the turntable in the middle.",
    ],
    "mil-chc": [
      "Cutaway render of the MIL CHC: a compact chamber with the shielded door open, a red antenna mount and a bench inside.",
    ],
    "mil-std-chamber": [
      "A military truck inside the chamber, with someone adjusting a mobile antenna mast in front of it. The walls are lined with short-pyramid absorbers.",
    ],
    "mil-std-chamber-advanced": [
      "A large shielded gate in a red frame, standing open on a vehicle inside the chamber. The absorbers carry on across the gate itself.",
      "A black armoured vehicle in the chamber, with red long-pyramid floor absorbers and an exhaust duct laid out in front of it.",
    ],
    "sac-3-plus": [
      "Cutaway render of the SAC-3 Plus: the curved dome roof over an absorber-lined room, with an antenna mast on the ground plane.",
      "The test room under the dome roof: a DEKRA banner on the far wall, a turntable and yellow floor markings on the ground plane.",
    ],
    "sac-3-square": [
      "Cutaway render of the SAC-3 Square: a square chamber inside a red steel frame, with a turntable and antenna mount on the ground plane.",
      "A corner of the square chamber, seen upright: pyramid absorbers on the walls, and the turntable circle and yellow markings on the ground plane.",
    ],
    "sac-5-plus": [
      "Cutaway render of the SAC-5 Plus: absorber walls under a dome roof carried on red arched ribs, an antenna mast on the ground plane.",
      "Looking up into the dome: the white absorbers following the curve, and the bare ferrite ceiling showing beyond them.",
    ],
    "sac-5-square": [
      "Cutaway render of the SAC-5 Square: a square chamber in a red frame, the turntable circle marked on the ground plane and an antenna stand beside it.",
      "Along the wall pyramids toward the turntable, the absorbers running away in perspective over a smooth ground plane.",
    ],
    "sac-10-plus": [
      "Cutaway render of the SAC-10 Plus: an absorber-lined room inside the polygonal shell and its red steel frame, with a single test axis marked on the floor.",
      "Looking up at the ceiling: rows of long-pyramid absorbers with the lights set between them.",
    ],
    "sac-10-plus-triton": [
      "Someone walking across the chamber floor, with absorbers on the far wall and movable floor absorbers standing to one side.",
      "An antenna on its mount in front of the wall, with a row of floor-absorber blocks standing below it.",
    ],
    "sac-10-h-hybrid": [
      "Cutaway render of the SAC-10/H Hybrid: the hybrid-lined test room inside its red frame, with a two-storey annex alongside.",
      "A wheeled antenna mast standing in the chamber, a red laser line on the floor beside it, ferrite low on the wall and absorbers above.",
    ],
    "sac-10-p-pyramid": [
      "Cutaway render of the SAC-10/P Pyramid: the room inside the red frame lined in long-pyramid absorbers throughout, an EUT in the middle.",
      "Long-pyramid absorbers close up, covering the wall end to end with two light fittings set between them.",
    ],
    "fac-3": [
      "Cutaway render of the FAC-3: absorbers on the floor as well as the walls and ceiling — the fully anechoic setup — with an antenna mast in the middle.",
      "An antenna on a tripod and a red one behind it, standing over floor absorbers. There is no ground plane; the floor is lined too.",
    ],
    "fac-3-l": [
      "Cutaway render of the FAC-3 L: the extended fully anechoic room with absorbers on the floor too, an antenna mast and the entrance steps drawn in.",
      "A red amplifier and a horn antenna aimed into the chamber, with floor absorbers and a wooden bench below.",
    ],
    "sac-3-fac-3-transformer": [
      "Cutaway render of the SAC-3 / FAC-3 Transformer, drawn in the fully anechoic setup — floor absorbers laid over the ground plane, an antenna mast in the middle.",
      "A log-periodic antenna on a red mount facing the absorber wall, absorbers above and bare ferrite below.",
    ],
    rvc: [
      "A Z-fold stirrer standing upright in a room walled entirely in bare metal — no absorbers anywhere, and yellow markings on the floor.",
      "The Z-fold stirrer lit from above, a small antenna hanging to the right, walls and ceiling all bare metal.",
    ],
    "shielded-room": [
      "A shielded room's ventilation opening close up: a fine metal honeycomb panel set into the wall.",
      "Two shielded rooms standing side by side in a hall, doors open on the desks and instruments inside, the building's pipework and ducting overhead.",
    ],
  },
};

/** The extra plates for one model, in gallery order, already carrying the
 *  locale's alt. Empty for a slug with none, so a caller can spread it. */
export const modelGallery = (lang: Lang, slug: string): readonly Plate[] =>
  (frames[slug] ?? []).map((frame, i) => ({ ...frame, alt: alt[lang][slug]?.[i] }));

/** The two reverberation chambers built around a large disc under the ceiling.
 *  Named rather than derived: the stirrer is written into the model tables as
 *  prose, and matching on that prose would break the first time it is reworded. */
const largeDiscStirrer = new Set(["RVC XL", "RVC XXL"]);

/**
 * The plates one model row opens onto: the model page's own lead plate first,
 * then the gallery extras.
 *
 * The reverberation chambers are the exception, and they split in two. Seven of
 * them share a slug, so they share a page and would share all three plates —
 * but the three are two different chambers. The lead plate is a large-disc
 * stirrer turning under the ceiling, which is how the XL and the XXL are built;
 * both gallery frames are a Z-fold stirrer standing upright, which is how the
 * other five are. So each row keeps only the plates of its own stirrer: XL and
 * XXL the lead alone, e1, e2, S, M and L the two Z-folds. A thumbnail is a
 * claim about the model beside it, and neither group can be shown as the other.
 */
export const modelShots = (
  lang: Lang,
  model: ChamberModel,
  figure: Plate,
): readonly Plate[] => {
  const extras = modelGallery(lang, model.slug);
  if (model.type !== "rvc") return [figure, ...extras];
  return largeDiscStirrer.has(model.name) ? [figure] : extras;
};

/** Every file the gallery names, for the ledger check in the test suite. */
export const galleryFiles: readonly string[] =
  Object.values(frames).flat().map((f) => f.src);
