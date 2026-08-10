# EMC Test Systems — 구현 계획

작성 2026-08-10. 대상은 GNB 세 번째 항목 **EMC Test Systems** 브랜치 전체
(`/test-systems/**`, 로케일당 12 라우트 = 24 페이지).

> **2026-08-10 실행 완료 — Phase A·B.** 12페이지 × 2 로케일에 본문·사양표·사진이
> 들어갔다. 원장은 [docs/source/test-systems-source.md](source/test-systems-source.md)와
> [test-systems-assets.md](source/test-systems-assets.md). 남은 것은 Phase C(규격 축)뿐이고,
> 아래 §7의 결정 4번이 그대로 열려 있다.
>
> 계획과 달라진 점 세 가지는 §3에 적어 두었다.

> **2026-08-10 갱신 — 산업군 축 제거.** 메뉴를 3열에서 2열로 줄이고 By Industry를
> 없앴다. `/test-systems/industry/*` 10개 라우트도 함께 삭제했다. 이유는 그 페이지가
> 할 수 있는 일이 "해당 산업군의 규격 목록"뿐이었고, 그것은 `/test-systems/standards`가
> 이미 같은 제목 아래 인쇄하는 부분집합이었기 때문이다. 산업군은 **규격 인덱스 안의
> 묶음**으로 남았고, 챔버 브랜치로 건너가는 다리도 그쪽으로 옮겼다.
> 이 문서의 페이지 수·라우트·Phase B 범위는 그 결과를 반영한 것이다.

Anechoic Chambers 브랜치는 카탈로그 이식이 끝나 산문·표·사진이 들어가 있고,
Test Systems는 **구조만 서 있는 상태**다. 이 문서는 그 격차를 메우는 계획이다.

---

## 1. 지금 상태 — 무엇이 있고 무엇이 없나

### 있는 것

| 항목 | 위치 | 규모 |
|---|---|---|
| 라우트 | `app/(en)/test-systems/**`, `app/(ko)/ko/test-systems/**` | 12 × 2 = 24 |
| 메가 드롭다운 2열 | [site-header.tsx](../app/site-header.tsx) | 시험 4 · 제품군 6 + 유틸 3 |
| 데이터 | [test-system-sections.ts](../app/test-system-sections.ts) | 모델 55종, 규격 24건 |
| 렌더 | [test-system-content.tsx](../app/test-system-content.tsx) | 4개 뷰 (overview / test / product / standards) |
| 라우트 테스트 | [tests/rendered-html.test.mjs](../tests/rendered-html.test.mjs) | 24개 경로 모두 등재됨 |

모델 55종의 내역: 앰프 36 · EFS 5 · 프리앰프 6 · 파워미터 3 · 통합시스템 5 · **안테나 0**.

### 없는 것

1. **본문이 없다.** 12페이지 전부가 `TestSystemPage`의 마지막 밴드 —
   "콘텐츠 준비 중입니다" `empty` 박스 — 를 달고 나간다
   ([test-system-content.tsx:114](../app/test-system-content.tsx#L114)).
   챔버 쪽은 `body`가 있으면 이 밴드를 떼는데, 여기는 조건 없이 항상 붙는다.
2. **사진이 0장이다.** `public/test-systems/` 디렉터리 자체가 없다
   (`public/chambers/images/`에는 28장이 있다).
3. **표가 없다.** 챔버의 `SpecTable`에 해당하는 것이 이 브랜치엔 아직 없다.
4. **원장이 없다.** `docs/source/`에 company 5건, chambers 3건, legal 1건이 있는데
   test-systems는 한 건도 없다. 지금 데이터의 출처를 추적할 수 있는 문서가 없다.
5. **안테나 제품군이 비어 있다.** 메뉴에는 있는데 모델이 0종이라 "모델 정리 중"으로
   나간다.

---

## 2. 원본 자료 실사 (2026-08-10, frankonia-solutions.com)

### 2.1 본사 페이지 → 이 사이트 라우트

| 본사 원본 | 내용 밀도 | 대응 라우트 |
|---|---|---|
| `/test-systems/` | 허브 | `/test-systems` |
| `/test-systems/emission-measurements/` | 산문 + 표 | `/test-systems/test/emission` |
| `/test-systems/immunity-test-systems/` | 허브 | — |
| `…/conducted-immunity/` | 산문 | `/test-systems/test/conducted` |
| `…/radiated-immunity/` | 산문 | `/test-systems/test/radiated` |
| `…/conducted-immunity/amplifiers/` | **표 17개, 산문 없음** | `/test-systems/product/amplifier` |
| `…/radiated-immunity/amplifiers/` | 표 | 〃 |
| `…/emission-measurements/antennas/`, `/antennas/` | 카탈로그 PDF 링크만 | `/test-systems/product/antenna` |
| `…/radiated-immunity/efs/`, `/electrical-field-strength-meters/` | 산문 + 표 | `/test-systems/product/efs` |
| `…/pre-amplifier-for-emission-measurements/` | 산문 + 표 | `/test-systems/product/preamp` |
| `/rf-power-meter/`, `/rf-relay-switching-unit/` | 산문 + 표 | `/test-systems/product/meter` |
| `…/conducted-immunity/compact-immunity-test-system/` | 산문 + 표 (CIT-100) | `/test-systems/product/system` |
| `…/conducted-immunity/power-signal-generator/` | 산문 + 표 (PSG-300) | 〃 |
| `…/radiated-immunity/magnetic-field-test-system/` | **본문 10.5KB · 표 10 · 사진 11 (MTS-800)** | `/test-systems/test/magnetic`, `product/system` |
| `/mil-std-461-test-system/` | 산문 | 산업군 페이지가 없어졌으므로 해당 시험 항목·제품군 페이지로 나눠 넣는다 |
| `/select-standard/` | 24건 목록, 각 항목마다 전용 페이지 | `/test-systems/standards` |
| 규격 전용 페이지 24개 | 규격별 시험 구성 설명 | (§5 참고) |
| `/test-systems/product-list/` | **빈 페이지** — 메뉴 껍데기뿐 | 우리 개요 페이지가 이미 대체 |

밀도 확인 예시 — MTS-800 페이지는 서술 4문단 + "Special Features" 불릿 7개 +
사양표 10개 + 사진 11장이다. 챔버의 `TopicBody`(lead / groups / tables / figure)에
그대로 대응한다. **새 데이터 구조가 필요 없다.**

### 2.2 다운로드 영역의 PDF 9종 — 실제 본문이 여기 있다

`/test-systems/download-area_test-systems/` (전부 링크 확인, 합계 약 40 MB):

| PDF | 크기 | 담고 있는 것 |
|---|---|---|
| `2024/09/200824_Antennas_Druck.pdf` | 12.7 MB | **안테나 · 안테나 마스트 · 프리앰프** |
| `2019/03/Emission-Measuring-Systems-1.pdf` | 11.3 MB | 전도·방사 방출 측정 시스템 |
| `2019/09/amplifiers_web.pdf` | 7.3 MB | Amplifier Selection Book (9 kHz–6/18 GHz) |
| `2019/03/conducted_immunity_test_systems.pdf` | 3.0 MB | 61000-4-6, NAMUR, BCI (11452-4, CS 114, DO-160) |
| `2017/10/GTEM.pdf` | 2.1 MB | GTEM 셀 |
| `2016/12/Radiated_Immunity_Test_Systems.pdf` | 1.7 MB | 전계강도·주파수·측정거리로 고르는 방사 내성 시스템 |
| `2020/03/Wideband-Amplifiers_web.pdf` | 1.6 MB | **RF 광대역 앰프 0.5–40 GHz** |
| `2019/03/MTS.pdf` | 0.4 MB | 자기장·저주파 시험 시스템 |
| `2019/03/PSG.pdf` | 0.4 MB | 61000-4-16 / -19 |

---

## 3. 실사에서 드러난 세 가지 (전제부터 의심한 결과)

### ① 안테나는 채울 수 있다 — 그리고 PDF도 필요 없었다

계획 단계의 코드 주석은 이렇게 적혀 있었다:

> Antennas are deliberately absent: the head office's antenna page lists no
> model at all, only a 2008 catalogue PDF.

**이 전제는 틀렸다.** `/antennas/`에는 정말로 PDF 링크뿐이지만,
`/test-systems/emission-measurements/antennas/`에는 모델 9종과 **사양표 9개**가
그대로 실려 있다. 2024년 9월판 카탈로그(12.7 MB)를 받아 두긴 했으나 쓸 필요가
없었다 — 웹페이지 쪽이 더 정확하고 최신이다.

실린 것: ALX-4000E · ALX-8000E · MAX-9 · MAX-9-7/16 · MAX-18 · HAX-6 · HAX-18 ·
HAX-40 · SAX-10 · LAX-10, 그리고 각각의 사양표.

### ② 앰프 36종은 절반이다

계획 당시 목록의 상한은 1 GHz(FLH·VLLH 계열)였다. `Wideband-Amplifiers_web.pdf`가
**0.5–40 GHz** 대역을 따로 다루고 있어 마이크로파 라인이 통째로 빠져 있었다.
카탈로그 p.4–8에서 **WBA 34종**을 옮겨 70종이 되었다.

작업 중에 하나 더 나왔다. 웹사이트의 "10 kHz – 300 MHz"는 **그룹 제목**이지 모델별
대역이 아니다 — 같은 그룹 안의 FLL-25A는 Selection Book 기준 10 kHz–230 MHz,
FLL-25는 100 kHz–250 MHz다. 그래서 대역을 행마다 반복하지 않고 헤딩으로 올렸고,
모델별 정확한 대역·출력은 Selection Book(107쪽)에 있으니 아직 옮기지 않았다고
[원장 §4](source/test-systems-source.md)에 남겼다.

### ③ 24개 규격은 각각 페이지를 갖고 있다

`/select-standard/`의 24개 항목은 전부 본사 전용 페이지로 이어진다
(`/en-55011cispr-11-testing/`, `/rs-103-testing/`, `/gmw3097/` …).
지금 우리 `/test-systems/standards`는 이름과 한 줄 설명만 있는 목록이고, 행은 어디로도
가지 않는다. 원본에는 **규격별로 어떤 장비 구성이 필요한지**가 적혀 있다 — 그것이
행에 붙을 내용이자, 행이 제품군으로 이어질 근거다.

---

## 4. 구현 계획

### Phase A — 자료·에셋·데이터 (본문 쓰기 전 토대)

| # | 작업 | 산출물 |
|---|---|---|
| A1 | PDF 9종 수집 및 판독. 저장소 밖(`D:\FRANKONIA\Frankona-Korea\source\`)에 둔다 — 챔버 카탈로그와 같은 방식 | — |
| A2 | 본사 페이지 17개 verbatim 채록 (`get_page_text` + `main` 마크업) | `docs/source/test-systems-source.md` |
| A3 | 사진 수집·변환. 접미사(`-1024x572`) 없는 원본 → webp q84, 업스케일 금지 | `public/test-systems/images/*.webp` |
| A4 | 에셋 원장 (원본 URL / 크기 / 경로 / 미사용 사유) | `docs/source/test-systems-assets.md` |
| A5 | 안테나 모델 추출 (2024 카탈로그) → `testModels`에 `product: "antenna"` 추가 | `test-system-sections.ts` |
| A6 | 마이크로파 앰프 추출 (Wideband PDF) → 앰프 대역 그룹 추가 | 〃 |

A5·A6이 끝나면 드롭다운의 "모델 정리 중"이 사라지고 `allProducts(n)` 카운트가 갱신된다
(카운트는 배열 길이에서 계산되므로 카피 수정은 필요 없다).

### Phase B — 본문 이식 (핵심)

**챔버 브랜치가 쓰는 구조를 그대로 쓴다.** 새 타입도 새 CSS 컴포넌트도 만들지 않는다.

B1. **공용 모듈 추출.** `TopicBody` / `SpecTable` / `Plate` 타입과
`Lead` / `Figure` / `Tables` / `Cell` / `Groups` / `Stub` 렌더러는 지금
`chamber-sections.ts`와 `chamber-content.tsx` 안에 있다. Test Systems가 같은 것을
쓰므로 `app/page-body.ts`(타입) + `app/page-body.tsx`(렌더)로 뺀다.
→ 챔버 쪽은 import만 바뀌고 렌더 결과는 동일해야 한다. `npm test`가 그것을 지킨다.

B2. **`test-system-content.tsx`를 밴드 방식으로 재작성.**
지금은 밴드가 하드코딩이고 stub이 항상 붙는다. 챔버와 같은
`bands[]` + `i % 2 === 1 ? "alt"` 패턴으로 바꾸고, **body가 있으면 stub을 뗀다**
([chamber-content.tsx:117](../app/chamber-content.tsx#L117) 참고).

B3. **본문 데이터 작성** — `test-system-sections.ts`에 4개 레코드:

| 상수 | 페이지 수 | 원본 |
|---|---|---|
| `overviewBody` | 1 | `/test-systems/` |
| `categoryBody` | 4 | emission / conducted / radiated / magnetic 허브 |
| `productBody` | 6 | 제품군별 페이지 + 해당 PDF |
| `standardsBody` | 1 | `/select-standard/` 및 규격 전용 페이지 24개의 리드 문단 |

MIL-STD-461 페이지의 산문처럼 **산업군 단위로 쓰여 있던 원본**은 갈 곳이 없어졌다.
해당 시험 방법(CE 101 → emission, RS 103 → radiated)과 제품군으로 나눠 넣는다.
어느 쪽에도 맞지 않으면 넣지 않는다 — 자리를 만들려고 축을 되살리지 않는다.

영문은 본사 원문 그대로, 한국어는 그 번역. 모델명·대역·규격번호·이득·V/m 수치는
번역하지 않는다.

B4. **앰프 목록을 대역별로 묶는다.** 지금 36행이 각각 대역을 반복해 적는다
("10 kHz – 300 MHz"가 17번). 본사도 대역별 블록으로 나눠 놓았다.
`SubHead`(`.sub-head`)로 4블록(300 MHz / 400 MHz / 1 GHz / 1 MHz–1 GHz, +마이크로파)
으로 나눈다. 새 CSS 없이 기존 컴포넌트로 된다.

B5. **사양표 이식.** MTS-800 · CIT-100 · PSG-300 · EFS · FPA · PMS/RSU의 표를
`SpecTable`로 옮긴다. 셀은 번역하지 않는다 (챔버와 같은 규칙 —
"도면·견적서와 대조할 값").

### Phase C — 규격 축 강화 (선택, 별도 승인)

두 가지 중 하나:

- **C-소:** `/test-systems/standards` 한 페이지 안에서 각 규격 행을 확장한다.
  규격 → 필요 장비 구성 한 줄을 붙이고, 그 장비의 제품군 페이지로 링크한다
  (산업군 페이지가 없어졌으므로 행이 갈 곳은 제품군이다).
  라우트 변경 없음, 테스트 변경 없음.
- **C-대:** `/test-systems/standards/[standard]` 24 라우트를 연다.
  라우트가 24 → 72로 늘고, `tests/rendered-html.test.mjs`의 경로 목록과
  `sitemap.ts`를 함께 갱신해야 한다.

**권장: C-소 먼저.** 24개 규격 페이지는 본사에서도 내용이 짧고 서로 겹친다.
페이지를 24개 만들면 얇은 페이지 24개가 색인된다. 수요가 확인되면 그때 C-대로 간다.

---

## 5. 파일별 변경 요약

| 파일 | 변경 |
|---|---|
| `app/page-body.ts` · `page-body.tsx` | **신규** — 챔버에서 뽑아낸 공용 타입·렌더러 |
| `app/chamber-sections.ts` · `chamber-content.tsx` | 위 항목을 import로 교체 (동작 불변) |
| `app/test-system-sections.ts` | 안테나·마이크로파 앰프 추가, `overviewBody`/`categoryBody`/`productBody`/`standardsBody` 추가 |
| `app/test-system-content.tsx` | 밴드 방식으로 재작성, body 있으면 stub 제거, 앰프 대역 그룹 |
| `public/test-systems/images/` | **신규** — webp |
| `docs/source/test-systems-source.md` · `-assets.md` | **신규** 원장 2건 |
| `tests/rendered-html.test.mjs` | Phase C-대에서만 |
| `app/sitemap.ts` | Phase C-대에서만 |

새 CSS 컴포넌트는 예상하지 않는다. 필요해지면 토큰만 쓰고, 그림자 없이,
브레이크포인트 1240 / 1100 / 700에만 붙인다.

---

## 6. 검증

```bash
cd landing-page && npm run lint
```

```bash
cd landing-page && npm test
```

`npm test`는 정적 export를 새로 빌드한 뒤 라우트·canonical·hreflang·내부 링크·
JSON-LD 18개 검사를 돈다. 통과하지 않으면 배포하지 않는다.

브라우저 확인은 정적 export를 직접 서빙한다 (다른 세션이 3000번을 쓰고 있을 수 있다).
4321번도 다른 세션이 잡고 있을 수 있으니 EADDRINUSE가 나면 포트를 바꾼다:

```bash
cd landing-page && node ../.claude/skills/frankonia-subpage/serve-out.mjs 4399
```

페이지마다 확인할 것: 두 로케일 한글 깨짐 없음 · 콘솔 에러 0 ·
가로 스크롤 0 (`scrollWidth - clientWidth === 0`) · 사진 업스케일 없음 ·
`alt !== figcaption` · 375 / 1024 / 1280 세 폭.

배포는 로컬 → GitHub 레포 → GitHub Pages(스테이징) 확인 뒤에 실도메인 반영 여부를
묻는다.

---

## 7. 결정이 필요한 것

| # | 질문 | 권장 |
|---|---|---|
| 1 | 안테나 모델을 2024 카탈로그에서 추출해 채울까 | **예.** 메뉴에 있는 제품군이 비어 있는 상태가 가장 나쁘다 |
| 2 | 마이크로파 앰프(0.5–40 GHz)를 추가할까 | **예.** 지금 목록은 본사 제품의 절반만 보여 준다 |
| 3 | PDF 9종을 `public/`에 복사할까, 본사에 링크할까 | **링크.** 개정판이 나오면 사본만 낡는다 (채용 공고와 같은 판단) |
| 4 | 규격 축은 C-소 / C-대 어느 쪽 | **C-소** 먼저 |
| 5 | Phase B 착수 순서 | 제품군 6 → 시험 4 → 규격 → 개요. 데이터가 가장 확실한 쪽부터 |

원본에 없는 수치·연혁은 만들어 넣지 않는다. 원본이 비어 있으면 `EmptyState`로
"정리 중"을 남긴다 — 지금 12페이지가 그 상태이고, 이 계획은 그것을 하나씩 줄이는 것이다.
