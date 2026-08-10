# Anechoic Chambers 모델 상세 페이지 — 구현 계획

작성 2026-08-10. 대상은 `chamberModels` 32종의 **모델별 상세 페이지**
(`/chambers/model/*`). 본사 원본은 `frankonia-solutions.com/portfolio/<슬러그>/` 26개다.

예) [SAC-5 Square](https://frankonia-solutions.com/portfolio/sac-5-square/)

챔버 브랜치는 개요·산업군·형식·기술 16페이지가 이미 카탈로그 본문으로 차 있다.
없는 것은 **모델 한 종을 펼쳐 보는 자리**뿐이고, 이 문서는 그것을 여는 계획이다.

> **2026-08-11 실행 완료 — Phase A.** 원장 두 건
> ([chambers-models.md](source/chambers-models.md) · [chambers-model-assets.md](source/chambers-model-assets.md)),
> 사진 98장(`public/chambers/models/`, 14 MB), `ChamberModel.slug` 26종.
> **본문의 기준은 2026 카탈로그**로 정해졌다(사용자 결정) — §4 Phase A가 "본사 웹
> verbatim"으로 적혀 있던 것이 카탈로그 우선 + 웹 보충으로 바뀌었다.
>
> 계획과 달라진 점 네 가지:
> ① 치수 라벨은 **External dimension**으로 확정하고 기존 페이지까지 고쳤다(§3④ 해소).
> ② SAC-3 Plus의 9,680은 오류가 아니었다 — 카탈로그에 네 번째 구성으로 실려 있고
> 웹이 셋만 싣는 것이다. 대신 **카탈로그와 웹이 어긋나는 곳 13군데**가 새로 나왔다.
> ③ 사진은 본사 웹만으로 충분했다. 카탈로그·포토북 추출은 승인받았으나 하지 않았다.
> ④ RVC는 대표 페이지 1개를 만들기로 했다(§8 결정 1 → 24 + 1 = 25 라우트).

---

## 1. 지금 상태 — 무엇이 있고 무엇이 없나

### 있는 것

| 항목 | 위치 | 규모 |
|---|---|---|
| 라우트 | `app/(en)/chambers/**`, `app/(ko)/ko/chambers/**` | 16 × 2 = 32 |
| 모델 데이터 | [chamber-sections.ts:124](../app/chamber-sections.ts#L124) `chamberModels` | 32종 (name · desc · industry · type · **source** · spec) |
| 렌더 | [chamber-content.tsx](../app/chamber-content.tsx) | 5개 뷰 (overview / industry / type / topic / downloads) |
| 공용 본문 타입·렌더 | [page-body.ts](../app/page-body.ts) · [page-parts.tsx](../app/page-parts.tsx) | `PageBody` / `SpecTable` / `Plate`, `Lead` `Figure` `Tables` `Groups` |
| 사진 | `public/chambers/images/` | 28장 · 3.3MB |
| 원장 | `docs/source/chambers-assets.md` · `chambers-references.md` · `catalogue-2026.md` | 3건 |

**`source` 필드는 이미 이 계획을 위해 들어가 있다.** 주석이 그렇게 적혀 있다 —
"Head office portfolio slug … Kept so the content pass can find each original
without searching for it again"([chamber-sections.ts:83](../app/chamber-sections.ts#L83)).

### 없는 것

1. **모델 페이지가 없다.** `ModelList`는 링크가 아니라 `<div>`다. 코드가 이유를
   적어 놓았다 — "Not links: the model pages do not exist yet"
   ([chamber-content.tsx:288](../app/chamber-content.tsx#L288)).
   32종 전부가 목록의 한 행에서 끝난다.
2. **MyChamber 추천이 모델로 가지 않는다.** 결과 카드의 `href`는 모델이 아니라
   **형식 인덱스**를 가리킨다([mychamber-content.tsx:78](../app/mychamber-content.tsx#L78)).
   질문 일곱 개에 답해 "SAC-5 Square"를 받은 독자가 그것을 누르면 SAC 12종 목록이 나온다.
   상담 도구의 마지막 한 걸음이 비어 있다.
3. **모델별 사진이 0장이다.** 지금 28장은 전부 카테고리·기술 페이지용이다.
   MyChamber 카드가 "이 사진은 이 모델이 아니라 이 카테고리의 사진"이라는 주석을
   달고 있는 이유가 그것이다([mychamber-content.tsx:31](../app/mychamber-content.tsx#L31)).
4. **본사 모델 페이지의 값이 하나도 들어와 있지 않다.** 보증 편차, 하중, 변형별 치수,
   적용 규격 목록 — §3③ 참조.
5. 에셋 원장이 **이미 예약해 두었다.** `chambers-assets.md` §2의 12개 항목이
   "모델별 이미지. **모델 상세 페이지를 만들 때 여기서 가져오면 된다**"로 남아 있다.

---

## 2. 원본 실사 (2026-08-10, frankonia-solutions.com)

### 2.1 32 모델 → 본사 페이지 26개, 전부 200 OK

`source` 슬러그 26개를 전부 조회했다. 404는 없다. 32 → 26인 이유는 RVC 7종이
한 페이지를 공유하기 때문이다(§3①).

| 슬러그 | 표 | 이미지 | 본문 어수 | 슬러그 | 표 | 이미지 | 본문 어수 |
|---|--:|--:|--:|---|--:|--:|--:|
| `sac-3-plus` | 3 | 2 | 471 | `actc` | 3 | 2 | 341 |
| `sac-3-square` | 3 | 2 | 447 | `ucc` | 3 | 2 | 303 |
| `sac-5-plus` | 3 | 2 | 493 | `sac-10-v` | 3 | 3 | 636 |
| `sac-5-square` | 4 | 2 | 532 | `avtc` | 3 | 2 | 603 |
| `sac-10-plus` | 3 | 2 | 502 | `mil-chc` | 3 | 2 | 328 |
| `triton` | 3 | 2 | 658 | `mil-std-chamber` | 3 | 2 | 361 |
| `sac-10-h-hybrid` | 3 | 2 | 539 | `mil-std-chamber-advanced` | 3 | 2 | 525 |
| `sac-10-p-pyramid` | 3 | 2 | 547 | `edtc` | 3 | 2 | 582 |
| `fac-3` | 3 | 2 | 431 | `edtc-ax` | 1 | 1 | 391 |
| `fac-3-l` | 3 | 2 | 456 | `edtc-bb` | 5 | 2 | 522 |
| `sac-3-fac-3-transformer` | 3 | 2 | 575 | `ctc` | 2 | 2 | 379 |
| `chc` | 3 | 2 | 398 | `reverberation-solutions` | 2 | 3 | 451 |
| `chc-plus` | 3 | 2 | 440 | `shielded-room` | 2 | 1 | 409 |

합계 **약 12,200 어 · 표 74개 · 이미지 52장(중복 포함)**. 한 페이지의 밀도는
300~660어로 고르다 — 얇아서 못 만드는 페이지도, 혼자 튀는 페이지도 없다.

### 2.2 한 페이지의 구조 (SAC-5 Square 해부)

| # | 원본 블록 | 내용 | 우리 쪽 대응 |
|---|---|---|---|
| 1 | 제목 + 부제 | "SAC-5 Square" / "Semi-anechoic 5,0 m EMC chamber with traditional square design" | `PageShell` `title` + `intro` |
| 2 | 리드 | 1문단 | `PageBody.lead` |
| 3 | **Overview** | EMI · EMS · Test distance · Volume · Special 5행 | `.badges` 또는 행-레이블 `SpecTable` (§8 결정 3) |
| 4 | **Features** | 불릿 11 | `PageBody.groups[0]` → `.check-list` |
| 5 | **Absorbers** | 불릿 3 (F006 / H600 / H1000, DIN EN 13501-1 A2-s1d0) | `groups[1]` |
| 6 | **Typical Product Standards** | Emission 7 · Immunity 4, 2단 | `.check-cols` + `CheckColumn` |
| 7 | **Typical Verification Standards** | Emission 2 · Immunity 1 | 〃 |
| 8 | **Typical Specifications** | 표 2개 (Chamber Type / External dimension / Quiet Zone / Measuring distances / Load capacity / Frequency range) | `SpecTable` — 행 레이블 열은 이미 지원된다([page-parts.tsx:104](../app/page-parts.tsx#L104)) |
| 9 | **Performance & Compliance** | NSA ±3,5 dB · SVSWR +5,5 dB · FU 0/+6 dB, 전부 "guaranteed" | `groups[n]` + `close` |
| 10 | 사진 2~3장 | 카드 렌더 1 + 내부 사진 2 | `figure` + `figureRow` |
| 11 | 링크 3개 | Back to Chambers · Request a quote · **Download Brochure** | 앞 둘은 `PageShell`이 이미 한다. 브로슈어는 §8 결정 5 |
| 12 | 사이드바 | 산업군별 전체 포트폴리오 목록 | 우리 메가 드롭다운이 이미 한다 |

**새 데이터 구조가 거의 필요 없다.** `PageBody`(lead / groups / close / figure /
figureRow / tables)가 1·2·4·5·9·10을 그대로 받는다. 새로 정할 것은 3번(Overview)과
6·7번(규격 2단)뿐이고, 둘 다 §8에서 결정한다.

---

## 3. 실사에서 드러난 다섯 가지 (전제부터 의심한 결과)

### ① RVC 7종의 원본은 한 페이지다 — 그리고 e1·e2가 거기 없다

`reverberation-solutions` 한 페이지가 **RVC S · M · L · XL · XXL** 다섯을 표 두 개로
싣는다. 우리 데이터의 **RVC e1 · e2는 본사 웹에 없다** — 카탈로그(p.50)에서 온 것이다.

7개 상세 페이지를 만들면 **같은 본문이 일곱 번 색인된다.** 그리고 그 본문은 이미
`/chambers/type/rvc`에 들어가 있다. → **RVC는 모델 페이지를 만들지 않는다.**
형식 인덱스가 이 제품군의 상세 페이지다.

### ② Shielded Room도 마찬가지다

`shielded-room` 형식에 모델이 하나뿐이다. `/chambers/type/shielded-room`과
`/chambers/model/shielded-room`은 같은 제목·같은 사진·같은 표를 두 번 내는 페이지가 된다.
→ **제외.** 32 − 7 − 1 = **24개 모델 페이지**가 실제 범위다.

### ③ 본사 모델 페이지에만 있는 값이 있다 — 그래서 중복이 아니다

형식 인덱스는 카탈로그 이식본이고, 카탈로그에 없는 것이 모델 페이지에 있다:

| 값 | 예 | 형식 인덱스에 있나 |
|---|---|---|
| 보증 편차 | NSA ±3,5 dB (30 MHz–1 GHz) · SVSWR +5,5 dB (1–18 GHz) · FU 0/+6 dB, 12/16 test points — 전부 **guaranteed** | 없음 |
| 하중 | up to 10.000 kg; special turntable systems possible | 없음 |
| 변형별 외형 치수 | SAC-5 Square **L / L(ø3,0) / XL** 세 줄 | 없음 (한 줄만) |
| 적용 규격 목록 | CISPR 11·12·14·15·25·32, MIL-STD 461 / IEC 61000-4-3, ISO 11451·11452 | 없음 |
| Quiet Zone 상한 | ø2,0 → **ø4,0 m**까지 | 없음 |

모델 페이지는 형식 인덱스를 반복하는 페이지가 아니라, **견적 직전에 필요한 값**을
처음으로 싣는 페이지다.

### ④ 치수 라벨이 어긋난다 — 옮기기 전에 확인해야 한다

우리 `spec.size`의 주석은 "**inner** dimensions L × W × H"이고, 형식 인덱스 표의 머리도
"Inner dimensions (L × W × H)"다. 그런데 본사 모델 페이지는 **같은 숫자**를
"**External** dimension (LxWxH)"으로 인쇄한다:

| 모델 | 우리 (`spec.size`, "inner") | 본사 ("External dimension") |
|---|---|---|
| FAC-3 | 8,705 × 4,655 × 3,750 | 8.705 x 4.655 x 3.750 — **동일** |
| CHC | 7,355 × 3,755 × 3,300 | 7.355 x 3.755 x 3.300 — **동일** |
| SAC-5 Square | 12,680 × 7,730 × 6,000 | 12.680 x 7.730 x 6.000 — **동일** |
| SAC-3 Plus | 9,680 × 6,530 × 6,000 | 8.480 / 8.780 / **9.230** x 6.530 x 6.000 — **9,680이 없다** |

둘 중 하나는 라벨이 틀렸고, SAC-3 Plus는 숫자 자체가 본사 표에 없다(카탈로그가
XL을 더 싣고 있을 가능성). **Phase A에서 카탈로그 PDF와 대조해 결론을 내기 전에는
모델 페이지의 표를 쓰지 않는다.** 지금 사이트에 나가 있는 값에도 영향이 있는 사안이라,
결론은 형식 인덱스 표에도 함께 반영한다.

### ⑤ 이미지는 지연 로딩이라 HTTP로는 절반만 잡힌다

`curl` + 정규식으로 세면 SAC-5 Square가 2장인데, 브라우저에서 실제로 세면 3장이다
(카드 렌더 `SAC-5-Square-2` + 내부 사진 `SAC-5-Sq-1` · `SAC-5-Sq-2`, 둘 다 1800×1024).
**에셋 스캔은 반드시 브라우저에서** — `frankonia-subpage` 스킬 §1의 배경이미지·srcset
포함 스캔 스니펫을 쓴다.

---

## 4. 구현 계획

### Phase A — 자료·에셋·검증 (본문 쓰기 전 토대)

| # | 작업 | 산출물 |
|---|---|---|
| A1 | 본사 모델 페이지 24개 verbatim 채록 (`get_page_text` + `main` 마크업 + 표 셀 그대로) | `docs/source/chambers-models.md` **신규** |
| A2 | **치수 라벨 확정** (§3④). 카탈로그 PDF와 대조해 inner / external을 정하고, 어긋나면 형식 인덱스 표 머리와 `spec.size` 주석을 함께 고친다 | 원장 §"바로잡은 것" |
| A3 | 이미지 수집 — 브라우저 스캔(§3⑤), 접미사 없는 원본, webp q82~84, `withoutEnlargement` | `public/chambers/models/*.webp` |
| A4 | 에셋 원장 갱신 (원본 URL / 크기 / 경로 / 무엇이 찍혔나 / 미사용 사유) | `chambers-assets.md` §5 추가 |
| A5 | 모델별 슬러그 확정 — `ChamberModel`에 `slug` 추가 (기본값은 `source`, `edtc` → `edtc-sa`처럼 이름과 어긋나는 것만 예외) | `chamber-sections.ts` |

A3의 예상 규모: 원본 52장에서 카드 렌더 중복과 이미 받아 둔 것을 빼면 **40~48장,
3~5MB**. 정확한 수는 A3에서 세고 원장에 적는다 — 지금은 추정이다.

### Phase B — 라우트와 렌더

B1. **라우트 신설.** `app/(en)/chambers/model/[model]/page.tsx` + `(ko)` 대칭.
`chambers/type/[type]`가 `chambers/[topic]`와 이미 공존하므로 세그먼트 충돌은 없다.
파일 내용은 `type/[type]/page.tsx`와 같은 형태 — `generateStaticParams` ·
`generateMetadata` · `dynamicParams = false`.

B2. **`ChamberView`에 `{ kind: "model"; slug: ModelSlug }` 추가.**
`resolve()`에 케이스 하나를 더한다. 브레드크럼은 **개요 → 형식 인덱스 → 모델** 세 단계로
잡는다 — 독자가 옆 모델로 건너갈 경로가 그 중간 단계다.

B3. **밴드 구성.** 기존 `bands[]` + `i % 2 === 1 ? "alt"` 패턴 그대로.
모델 페이지의 밴드는 lead(+사진) → overview → 규격 2단 → tables → groups.
`models.length > 0` 밴드는 모델 페이지에서 나오지 않는다(자기 자신을 나열하지 않는다).

B4. **`CheckColumn`을 `page-parts.tsx`로 옮긴다.** 지금
[company-content.tsx:571](../app/company-content.tsx#L571)에 있고, 규격 2단(§2.2 6·7)이
그것을 쓴다. 회사 페이지는 import만 바뀌고 렌더 결과는 같아야 한다 — `npm test`가 지킨다.

B5. **본문 데이터.** `chamber-sections.ts`에 `modelBody: Record<Lang,
Partial<Record<ModelSlug, ModelBody>>>`. `ModelBody = PageBody & { … }`는
`TopicBody`가 panoramas·references를 붙인 것과 같은 방식이다.

영문은 본사 원문 그대로(타이포 교정만), 한국어는 그 번역.
**번역하지 않는 것**: 모델명 · 치수 · 주파수 · 규격 번호(CISPR 16-1-4, IEC/EN 61000-4-3,
ISO 11451/11452, MIL-STD 461, DIN EN 13501-1) · 흡수체 designation(F006 · H600 ·
H1000 · P2400) · 편차 수치(±3,5 dB, +5,5 dB, 0/+6 dB) · Frankosorb®.

작업 순서는 **데이터가 가장 확실한 쪽부터**: SAC 12 → FAC 3 → CHC 2 → component 6 → 나머지.

### Phase C — 연결 (여기서 사이트가 달라진다)

| # | 작업 | 파일 |
|---|---|---|
| C1 | `ModelList` 행을 링크로 바꾼다 (`<div className="hl-row">` → `<a>`). 상세가 없는 RVC·Shielded Room 행은 `<div>`로 남긴다 — 죽은 링크를 만들지 않는다 | `chamber-content.tsx` |
| C2 | **MyChamber 결과 카드의 `href`를 모델 페이지로.** `CatalogueEntry.href`와 그 주석을 함께 고친다. 상세가 없는 모델은 지금처럼 형식 인덱스로 | `mychamber-content.tsx` · `mychamber-advisor.ts` |
| C3 | MyChamber 카드 사진을 그 모델의 사진으로. `shots`/`shotFor`와 "이 사진은 카테고리 사진"이라는 주석·캡션이 함께 없어진다 (사진이 있는 모델만) | `mychamber-content.tsx` |
| C4 | `sitemap.ts`에 모델 라우트 추가 (priority 0.6 — 형식 인덱스 0.7 아래) | `sitemap.ts` |
| C5 | 테스트의 라우트 목록 갱신 | `tests/rendered-html.test.mjs` |

C2가 이 계획의 실질적인 목적이다. MyChamber는 "모델 이름을 모르는 독자"를 위해 만든
도구인데([site-header.tsx:165](../app/site-header.tsx#L165)), 지금은 이름을 알려 주고
그 이름의 페이지가 없어서 목록으로 되돌린다.

### Phase D — 브로슈어 (선택, 별도 승인)

모델마다 `Download Brochure`(예: `/download/15979/`)가 걸려 있다. 사본을 두지 않고
본사에 링크한다 — 채용 공고·시험 시스템 PDF와 같은 판단이다(개정판이 나오면 사본만 낡는다).
`Downloads` 허브가 아직 비어 있으므로, 24개 브로슈어 링크는 그 페이지를 처음으로
채우는 재료이기도 하다. **원본이 로그인·양식을 요구하는지 먼저 확인한다.**

---

## 5. 파일별 변경 요약

| 파일 | 변경 |
|---|---|
| `app/(en)/chambers/model/[model]/page.tsx` · `(ko)/…` | **신규** — 라우트 2개 |
| `app/chamber-sections.ts` | `slug` 필드 · `modelSlugs` · `isChamberModel` · `modelPath` · `modelMeta` · `ModelBody` · `modelBody` |
| `app/chamber-content.tsx` | `ChamberView`에 `model` 추가, `resolve()` 케이스, 밴드, `ModelList` 링크화 |
| `app/page-parts.tsx` | `CheckColumn` 이관 (+ Overview 렌더, §8 결정 3에 따라) |
| `app/company-content.tsx` | `CheckColumn` import로 교체 (동작 불변) |
| `app/mychamber-content.tsx` · `mychamber-advisor.ts` | 결과 카드 `href`·사진 |
| `app/sitemap.ts` | 모델 라우트 |
| `tests/rendered-html.test.mjs` | 라우트 목록 |
| `public/chambers/models/` | **신규** — webp 40~48장 |
| `docs/source/chambers-models.md` | **신규** 원장 |
| `docs/source/chambers-assets.md` | §5 추가, §2의 "모델 페이지를 만들 때" 항목 정리 |

**새 CSS 컴포넌트는 예상하지 않는다.** 필요한 것이 `globals.css`에 전부 있다 —
`.spec-table` · `.check-list` · `.check-cols` · `.badges`/`.bd` · `.figure-wide` ·
`.figure-row` · `.sub-head` · `.prose` · `.callout` · `.hairline-list`.
그래도 만들게 되면 토큰만 쓰고, 그림자 없이, 브레이크포인트 1240 / 1100 / 700에만 붙인다.

---

## 6. 라우트 수

| | 지금 | 이후 |
|---|--:|--:|
| 챔버 브랜치 (로케일당) | 16 | 40 |
| 사이트 전체 (양 로케일) | **78** | **126** |

24 × 2 = 48 라우트 증가. 정적 export이므로 빌드 시간과 `out/` 크기가 함께 늘어난다 —
Phase B 첫 다섯 페이지에서 실측하고, 눈에 띄게 느려지면 §8 결정 2로 되돌아간다.

---

## 7. 검증

```bash
cd landing-page && npm run lint
```

```bash
cd landing-page && npm test
```

`npm test`는 정적 export를 새로 빌드한 뒤 라우트·canonical·hreflang·내부 링크·JSON-LD를
검사한다. **통과하지 않으면 배포하지 않는다.** 라우트를 48개 추가하므로 테스트 목록
갱신(C5)을 빼먹으면 여기서 걸린다 — 의도된 안전장치다.

브라우저 확인은 정적 export를 직접 서빙한다 (다른 세션이 3000번을 쓰고 있을 수 있다):

```bash
cd landing-page && node ../.claude/skills/frankonia-subpage/serve-out.mjs 4399
```

페이지마다: 두 로케일 한글 깨짐 없음 · 콘솔 에러 0 · 가로 스크롤 0
(`scrollWidth - clientWidth === 0`) · 사진 업스케일 없음 · `alt !== figcaption` ·
표가 375px에서 가로로 스크롤되는지(`.spec-wrap`) · 375 / 1024 / 1280 세 폭.

추가로 이 계획에만 있는 확인:

- `ModelList`의 모든 `<a>`가 200인지 (죽은 링크 = RVC·Shielded Room을 링크해 버린 경우)
- MyChamber 위저드를 실제로 돌려 결과 카드가 모델 페이지로 가는지
- 브레드크럼 JSON-LD가 개요 → 형식 → 모델 세 단계인지

배포는 로컬 → GitHub 레포 → GitHub Pages(스테이징) 확인 뒤에 실도메인 반영 여부를 묻는다.

---

## 8. 결정이 필요한 것

| # | 질문 | 결정 (2026-08-11, 사용자) |
|---|---|---|
| 1 | RVC 7종·Shielded Room에 상세 페이지를 만들까 | **RVC는 대표 1개, Shielded Room은 만든다.** → 24 + 1 + 1 = **26 라우트**. Shielded Room은 카탈로그 스프레드·본사 웹페이지를 따로 갖고, 보증 차폐량표가 형식 인덱스에 없다 |
| 2 | 24개를 한 번에 열까, 나눠 열까 | **26개 전부.** |
| 3 | Overview 5행을 무엇으로 그릴까 | **`.badges`.** 이 다섯 줄은 표가 아니라 "한눈에"다. `PageBody`가 아니라 챔버 전용 `ModelBody`에 `overview` 필드를 둔다 (`TopicBody`가 panoramas를 붙인 방식) |
| 4 | 치수 라벨 (§3④) | **External dimension으로 확정.** Phase A에서 기존 페이지까지 고쳤다 |
| 5 | 브로슈어 PDF | **링크하지 않는다.** 실사 결과 `/download/<id>/`는 PDF가 아니라 Download Area 페이지로 리다이렉트될 뿐이다 — 모델별 브로슈어는 실재하지 않는다 |
| 6 | RVC e1 · e2 | **그대로 둔다.** 카탈로그 근거가 있다. 원장에 "본사 웹에는 없음"을 적었다 |
| 7 | 카탈로그 ↔ 웹 충돌 13건 | **카탈로그를 반영하고 본사에 질의한다.** 질의 목록은 [원장 §8](source/chambers-models.md) |
| 8 | 사진 출처 | **본사 웹만.** 카탈로그·포토북 추출은 승인받았으나 웹 원본(최대 3680×2456)으로 충분했다 |

원본에 없는 수치·성능·규격은 만들어 넣지 않는다. 본사가 "guaranteed"라고 쓴 것만
보증으로 옮기고, 쓰지 않은 것은 옮기지 않는다.
