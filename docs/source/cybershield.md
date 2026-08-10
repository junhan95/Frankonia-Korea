# 원본 자료 — CyberShield (요약본)

수집일: 2026-08-11
출처: CyberShield 제품 사이트 https://www.frankonia-cybershield.com/ (EN) ·
https://www.frankonia-cybershield.com/ko/ (KO)

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

## 1. 밴드별 대응 — 어디를 압축했는가

| # | 이 페이지의 밴드 | 제품 사이트 원본 | 압축 방식 |
|---|---|---|---|
| — | page-head (h1 · 도입) | 히어로 (`heroTitle` + `heroAccent`, `heroBody`) | 두 줄 헤드라인을 한 문장으로 합침. 배경 영상·3D 렌더는 가져오지 않음 |
| 1 | WHAT CYBERSHIELD ADDS | `whyValueLabel` / `whyValueTitle` / `whyValueBody` + `metrics` 3 | 원문 그대로. 히어로 아래 지표 3개를 badges로 |
| 2 | 위협 4 | `threatEyebrow` / `threatTitle` / `threatBody` / `threats` 4 + `impactLabel` | 원문 그대로. 카드의 "잠재 영향"을 `.num` 슬롯으로 올림 |
| 3 | 모듈형 PAN | `systemEyebrow` / `systemTitle` / `systemBody` / `features` 4 | 02번 항목의 부연("양면 사용이 가능한 모듈로")만 한 절 줄임 |
| 4 | 제품군 6 | `ecosystemEyebrow` / `ecosystemTitle` / `ecosystemBody` / `ecosystemCards` 6 | 카드마다 **1행 설명만** 사용. 2행(상세 규격)은 버리고, 대신 랜딩 밴드가 쓰는 도표 라인(`2.0 mm DX 52 D+Z · 75 mm bolt pitch` 등)을 붙임 |
| 5 | 검증 · 표준 | `verifyEyebrow` / `verifyTitle` / `verifyBody` + `attenuationBody` + `standards` 6 + `attenuationNote` | 검증 본문 3문장 중 마지막(상세 데이터 제공 안내) 삭제, 차폐 성능 본문과 한 단락으로 합침 |
| 6 | 적용 분야 4 | `applicationsEyebrow` / `applicationsTitle` / `applications` 4 | 원문 그대로 |
| 7 | 전용 사이트로 | (없음 — 이 사이트가 쓴 문장) | 제품 사이트에만 있는 것 6가지를 나열. 아래 §3 참조 |

## 2. 인용한 수치 — 재동기화 시 대조할 항목

제품 사이트가 개편되면 아래 항목만 대조하면 된다. 이 목록이 이 페이지가 지고 있는
낡음 위험의 전부다.

| 항목 | 이 페이지가 말하는 값 | 원본 위치 |
|---|---|---|
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

## 3. 가져오지 않은 것 — 제품 사이트에만 있는 것

7번 밴드의 체크리스트가 곧 이 목록이다. 요약본이 무엇을 뺐는지 독자에게 말하지
않으면 링크를 따라갈 이유가 생기지 않는다.

1. 인터랙티브 단면도 (21개 항목 클릭 설명) — `cutaway.ts` / `CutawayMap`
2. 10 kHz–40 GHz 차폐 성능 막대 그래프와 근거 자료 6건 (IEC 61000-2-9 등)
3. 일반 차폐 방식과의 5개 항목 비교표
4. 6단계 도입 절차
5. 공급 범위표(핵심/서비스/파트너/고객 9행), 프로젝트 사례 3건, FAQ 5문항
6. 문의 양식 (`mailto:` 조립 — 서버 전송 없음)

## 4. 에셋

이미지는 포팅 시점에 받아 둔 것을 그대로 쓴다. `public/cybershield/` 아래에 있고,
요약본이 쓰는 것은 아래 7개다. 나머지(`hero-render-loop.mp4`,
`hero-render-poster.webp`, `facility-aerial.webp`, `technician-verification.webp`,
`engineer-inspection.webp`, `frankonia-campus.webp`)는 랜딩 페이지가 쓰거나 남아
있다.

| 파일 | 크기 | 쓰이는 곳 |
|---|---|---|
| `images/cutaway.webp` | 1800×1009 | 3번 밴드 도판 |
| `images/ecosystem/structure.webp` | 1000×667 | 4번 밴드 카드 |
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
- `tests/rendered-html.test.mjs`의 "CyberShield summarises, and hands the reader
  to the product site"가 로케일·`target`·`rel` 세 가지를 모두 잡는다.
- 상단 내비게이션과 푸터는 제품 사이트가 아니라 **이 요약 페이지**를 가리킨다.
  메뉴 바에서 예고 없이 사이트 밖으로 내보내지 않기 위해서다.
