# 원본 자료 — CyberShield (요약본)

수집일: 2026-08-11 · 갱신: 2026-08-12 (제품 사이트 5막 개편 반영)
출처: CyberShield 제품 사이트 https://www.frankonia-cybershield.com/ (EN) ·
https://www.frankonia-cybershield.com/ko/ (KO)
로컬 원본: `D:\FRANKONIA\CyberShield\landing-page\app\landing.tsx` (`copy.en` / `copy.ko`) ·
서사 기준 문서 `D:\FRANKONIA\CyberShield\CyberShield-Narrative-5Acts.md`

이 문서는 `app/cybershield-content.tsx`의 **출처 원장**입니다. 이 페이지의 문구는
전부 제품 사이트에서 압축해 옮긴 것이며, 원문에 없는 주장은 넣지 않습니다.

---

## 0. 이 페이지가 요약본인 이유

2026-08-11 본사 요청으로 이 라우트를 **요약본 + 제품 사이트 링크**로 바꿨다.

그 전까지는 제품 페이지 전문을 `app/cybershield/`에 포팅해(랜딩 1,842줄 + 단면도
데이터 + 63KB 스코프 스타일시트) 이 사이트의 헤더·푸터 안에서 렌더했다. 제품
사이트가 `X-Frame-Options: SAMEORIGIN` / `frame-ancestors 'self'`를 보내고 CORS
헤더가 없어 iframe도 fetch도 불가능했기 때문이다.

포팅본을 걷어낸 이유는 임베드 가능 여부가 아니라 **소유권**이다. 수치·규격·가격
성격의 문장은 제품팀이 소유하고 수정한다. 그 사본을 이 저장소에 두면 저쪽이 한 줄
고치는 순간 이쪽이 조용히 낡은 문장을 서빙한다. 요약본은 인용을 아래 표만큼으로
묶어 두고, 나머지는 링크로 넘긴다.

## 0-1. 왜 순서가 이 순서인가 (2026-08-12)

본사 요청: **"원본 페이지의 이야기 흐름을 따른다."**

제품 사이트는 2026-08-11 개편으로 골든서클(WHY→HOW→WHAT) + 리버스 포지셔닝을
결합한 **5막 구조**가 되었다. 기준 문서는 `CyberShield-Narrative-5Acts.md`.
요약본도 같은 순서를 따른다. 주제를 짧게 나열한 목록이 아니라 **논증**이기
때문에, 밴드를 재배열하면 요약본이 아니라 다른 글이 된다.

| 막 | 하는 일 | 이 페이지의 밴드 |
|---|---|---|
| — | 정체 + 긴장의 씨앗 | page-head (h1 · 도입) + 신뢰 밴드 |
| **1** | **관행을 부정한다** — 용접·고정·영구성이라는 업계의 신뢰 상징을 걷어낸다 | belief |
| **2** | **격차를 연다** — `0 dB` 진술 → 네 갈래 경로 | why → threat (사이 audience로 자기 식별) |
| **3** | **답할 수 없는 질문** — 공포가 아니라 무지를 드러낸다 | audit |
| **4** | **역전을 전개한다** — 짧은 답 먼저, 그다음 방 | answer → system(+단면도) |
| **5** | **빚을 갚는다** — 걷어낸 영구성의 자리를 측정치로 대체 | verify(+표준·감쇠) |

지켜야 할 두 가지:

1. **verify는 ecosystem보다 앞에 온다.** 뒤로 밀면 독자가 *"볼트가 용접보다 약한
   것 아닌가"* 하는 1막의 의심을 품은 채 여섯 제품군을 읽는다. 그러면 제품군 상세가
   근거 여섯 개가 아니라 의심할 지점 여섯 개가 된다.
2. **audit과 answer는 붙어 있어야 한다.** answer 본문의 마지막 문장("마지막에 남는
   것은 약속이 아니라 측정값입니다")이 audit의 질문을 그대로 받는 대구다.

`dB` 척추: `0 dB`(2막) → `2.5 ns`(위협 카드) → `≥ 90/100/120 dB`(5막).
같은 단위로 열고 닫으므로 페이지가 "격차가 크다"고 주장할 필요가 없다.
셋 중 하나를 빼면 나머지 둘이 근거 없는 숫자가 된다.

## 1. 밴드별 대응 — 어디를 압축했는가

| # | 이 페이지의 밴드 | 제품 사이트 원본 | 압축 방식 |
|---|---|---|---|
| — | page-head (h1 · 도입) | 히어로 (`heroTitle` + `heroAccent`, `heroBody`) | 두 줄 헤드라인을 한 문장으로 합침. 배경 영상·3D 렌더는 가져오지 않음 |
| 0 | 버튼 2 | 히어로 CTA | 원본의 신뢰 밴드(`proof` 4종)는 **가져오지 않는다** — 아래 참조 |
| 1 | belief (Act 1) | `beliefEyebrow` / `beliefTitle` / `beliefLabels` / `beliefStatusQuo` / `beliefBelief` | 원문 그대로. 좌우 2단 + 좌 회색 룰 / 우 빨간 룰까지 원본의 레이아웃 논지를 유지 |
| 2 | audience 3 | `audienceEyebrow` / `audienceTitle` / `audience` 3 | 원문 그대로 |
| 3 | why + `0 dB` + 자산 3 (Act 2) | `whyEyebrow` / `whyTitle` / `whyBody` / `whyMetric` / `whyMetricLabel` / `assetCards` 3 | 원문 그대로. 원본은 자산 카드가 별도 그리드, 여기서는 같은 밴드 하단에 붙임 |
| 4 | threat 4 | `threatEyebrow` / `threatTitle` / `threatBody` / `threats` 4 + `impactLabel` | 원문 그대로. 카드의 "잠재 영향"을 `.num` 슬롯으로 올림. **2.5 ns 포함** |
| 5 | audit (Act 3) | `auditTitle` / `auditBody` / `auditLink` | 원문 그대로. 링크 목적지만 제품 사이트 대신 이 페이지의 verify 밴드(`#verify`) |
| 6 | answer (Act 4) | `whyValueLabel` / `whyValueTitle` / `whyValueBody` + `metrics` 3 | 원문 그대로. 지표 3개를 badges로 |
| 7 | 모듈형 PAN | `systemEyebrow` / `systemTitle` / `systemBody` / `features` 4 + `cutawayBody` | 02번 항목의 부연("양면 사용이 가능한 모듈로")만 한 절 줄임. 인터랙티브 단면도는 정지 이미지 + 캡션으로 |
| 8 | verify · 표준 (Act 5) | `verifyEyebrow` / `verifyTitle` / `verifyBody` + `attenuationBody` + `standards` 6 + `attenuationNote` | 검증 본문 3문장 중 마지막(상세 데이터 제공 안내) 삭제, 차폐 성능 본문과 한 단락으로 합침. 원본은 verify / attenuation 두 밴드, 여기서는 하나 |
| 9 | 제품군 6 | `ecosystemEyebrow` / `ecosystemTitle` / `ecosystemBody` / `ecosystemCards` 6 | 카드마다 **1행 설명만** 사용. 2행(상세 규격)은 버리고, 대신 랜딩 밴드가 쓰는 도표 라인(`2.0 mm DX 52 D+Z · 75 mm bolt pitch` 등)을 붙임 |
| 10 | 적용 분야 4 | `applicationsEyebrow` / `applicationsTitle` / `applications` 4 | 원문 그대로 |
| 11 | 전용 사이트로 | (없음 — 이 사이트가 쓴 문장) | 제품 사이트에만 있는 것 6가지를 나열. 아래 §3 참조 |

밴드 배경은 흰색/`.alt` 교대다. 원본의 검정 밴드(threat, cutaway, attenuation)는
가져오지 않았다 — 이 사이트에는 어두운 섹션 유틸리티가 없고, 서브페이지에 도입하면
랜딩 히어로와 경쟁한다.

**신뢰 밴드는 되돌리지 말 것** (2026-08-12 본사). 히어로 바로 아래에 `proof` 4종
("1987년부터 축적한 엔지니어링" 등)을 배지 네 칸으로 깔았다가 뺐다. 이유는 두 가지다 —
같은 자격 문구가 회사 소개 페이지와 푸터에 이미 있고, 히어로와 1막 사이에 네 개의
상자가 들어가면 논증이 시작되기 전에 한 스크롤을 쓴다. 0번 밴드는 나가는 버튼
두 개만 남기고 위쪽 여백을 120 → 56px로 줄였다(버튼 둘이 196px 공백 안에 뜨지
않도록). `.bd-plain`도 함께 삭제했다 — 이 배지가 유일한 사용처였다.

## 2. 인용한 수치 — 재동기화 시 대조할 항목

제품 사이트가 개편되면 아래 항목만 대조하면 된다. 이 목록이 이 페이지가 지고 있는
낡음 위험의 전부다.

| 항목 | 이 페이지가 말하는 값 | 원본 위치 |
|---|---|---|
| 소프트웨어 보안의 감쇠량 | 0 dB | `whyMetric` / `whyMetricLabel` |
| E1 HEMP 상승 시간 | 2.5 ns | `threats[2]` |
| 의도적 간섭 시험 규격 | IEC 61000-4-36 | `assetCards[2]` |
| 인터커넥트 | 400G · 800G, 밀리볼트 잡음 여유 | `assetCards[1]` |
| 차폐 성능 (10 kHz) | ≥ 90 dB | `ecosystemCards[4]` CyberShield Validation |
| 차폐 성능 (100–400 MHz) | ≥ 120 dB | 동일 |
| 차폐 성능 (40 GHz까지) | ≥ 100 dB | 동일 |
| 측정 규격 | EN 50147-1 / IEEE 299, 인도 시점 현장 측정 | `verifyBody`, `whyValueBody` |
| 적용 표준 6종 | EN 50147-1 · IEEE 299 · BSI TL-03305/03306 · NATO SDIP-27 Level A · MIL-STD-188-125-1/-2 · ISO/IEC 27001 | `standards` |
| 패널 사양 | 2.0 mm 아연도금 강판, 75 mm 간격 볼팅, DIN 17162 / EN 10142 DX 52 D+Z | `ecosystemCards[0]` |
| 도어 | 3중 접점, MTBF 20,000회 개폐, 문턱 150 mm | `ecosystemCards[1]` (요약본은 도표 라인만 인용) |
| 흡음 | ISO 354, αw = 0.65 (MH) | `ecosystemCards[3]` |
| 관통부 | DN200까지 | `ecosystemCards[2]` |
| 단면도 솔루션 수 | 21가지 | `cutawayBody` |

**가격·납기는 인용하지 않는다.** 원문의 FAQ가 "규모와 통합 범위에 따라 다르다"고만
말하므로 요약본도 말하지 않는다.

원본의 **콘텐츠 가드레일**도 그대로 적용된다(5막 문서 참조): 공격 방법을 재현
가능한 수준으로 묘사하지 않고, 사고 사례를 인용하지 않으며, 지정학적 공포에 기대지
않고, 근거 문헌 목록에 없는 숫자를 새로 만들지 않으며, 경쟁사를 지칭하지 않는다.
status quo는 **업계 관행**으로만 서술한다.

## 3. 가져오지 않은 것 — 제품 사이트에만 있는 것

11번 밴드의 체크리스트가 곧 이 목록이다. 요약본이 무엇을 뺐는지 독자에게 말하지
않으면 링크를 따라갈 이유가 생기지 않는다.

1. 인터랙티브 단면도 (21개 항목 클릭 설명) — `cutaway.ts` / `CutawayMap`
2. 10 kHz–40 GHz 차폐 성능 막대 그래프와 근거 자료 6건 (IEC 61000-2-9 등)
3. 일반 차폐 방식과의 5개 항목 비교표 (`compareRows` — 1막의 논지를 닫는 밴드)
4. 6단계 도입 절차
5. 공급 범위표(핵심/서비스/파트너/고객 9행), 프로젝트 사례 3건, FAQ 5문항,
   회사 소개 밴드(*"차폐 기술은 새롭지 않습니다. 적용 대상이 새로울 뿐입니다."*)
6. 문의 양식 (`mailto:` 조립 — 서버 전송 없음)

## 4. 에셋

이미지는 포팅 시점에 받아 둔 것을 그대로 쓴다. `public/cybershield/` 아래에 있고,
요약본이 쓰는 것은 아래 7개다. 나머지(`hero-render-loop.mp4`,
`hero-render-poster.webp`, `facility-aerial.webp`, `technician-verification.webp`,
`engineer-inspection.webp`, `frankonia-campus.webp`)는 랜딩 페이지가 쓰거나 남아
있다. `facility-aerial.webp`는 이 페이지의 시스템 절 도판으로 **계속 쓰지만**, 랜딩
솔루션 카드는 2026-08-13에 손을 뗐다 — 렌더 대신 실사를 쓰기로 하고 같은 폴더에
`images/shielding-boundary.webp`(본사 웹사이트 사진 폴더 `RN_0459_052-1.jpg`,
1600×847)를 새로 넣었다. 경위는 `chambers-assets.md` §11.

| 파일 | 크기 | 쓰이는 곳 |
|---|---|---|
| `images/cutaway.webp` | 1800×1009 | 7번 밴드 도판 |
| `images/ecosystem/structure.webp` | 1000×667 | 9번 밴드 카드 |
| `images/ecosystem/access.webp` | 1000×667 | 〃 |
| `images/ecosystem/connectivity.webp` | 1000×667 | 〃 |
| `images/ecosystem/air.webp` | 1000×667 | 〃 |
| `images/ecosystem/validation.webp` | 1000×667 | 〃 |
| `images/ecosystem/lifecycle.webp` | 1000×667 | 〃 |

## 5. 링크 규칙

- 나가는 링크는 전부 `cyberShieldUrl(lang)` (`app/site-config.ts`)을 거친다.
  EN → `https://www.frankonia-cybershield.com/`, KO → `.../ko/`.
- **새 탭에서 연다** (2026-08-11 본사 요청). 네 군데 전부
  `target="_blank" rel="noopener"`를 달고, 화살표는 사이트 관례대로 `↗`
  (법적고지 페이지의 본사 링크와 동일). `noreferrer`는 **붙이지 않는다** — 제품
  사이트가 이 페이지에서 넘어온 트래픽을 확인할 수 있어야 한다.
- 이 규칙은 리뉴얼 기획서 원문("새 창에서 열리는 것이 아닌 현재 창에서")을 뒤집은
  것이다. 그 문장은 이 라우트가 **제품 페이지 자체**였을 때 쓰였고, 그때는 창을
  넘겨도 뒤에 남는 것이 없었다. 지금은 돌아올 요약본이 있다.
- **페이지 내부 앵커는 `#verify` 하나뿐이다.** audit 밴드(3막)가 던진 질문의 답이
  verify 밴드에 있고, 답으로 가는 길이 없는 질문은 수사에 그친다. 5막 밴드의
  `id="verify"`를 지우면 그 링크가 조용히 죽는다 — `section[id]`에는
  `scroll-margin-top: 96px`이 걸려 있어 고정 헤더 아래로 들어가지 않는다.
- `tests/rendered-html.test.mjs`의 "CyberShield summarises, and hands the reader
  to the product site"가 로케일·`target`·`rel` 세 가지를 모두 잡는다.
- 상단 내비게이션과 푸터는 제품 사이트가 아니라 **이 요약 페이지**를 가리킨다.
  메뉴 바에서 예고 없이 사이트 밖으로 내보내지 않기 위해서다.
