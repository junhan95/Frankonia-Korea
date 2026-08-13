# 원본 자료 — Company › Philosophy

수집일: 2026-08-07
출처: https://frankonia-solutions.com/company/philosophy/ (본사 원본)
보조 출처: https://frankonia-solutions.com/company/ (사실 확인용)

이 문서는 서브페이지 카피의 **출처 원장**입니다. 페이지 문구를 고칠 때는 먼저
여기에 원문이 있는지 확인하고, 원문에 없는 주장은 넣지 않습니다.

> **렌더링 위치 변경(2026-08-13).** 이 원장의 카피는 이제 `/company/philosophy`가
> 아니라 **`/company/about`** 에 실립니다. Philosophy와 History를 About 한 페이지로
> 합쳤기 때문입니다 — [[company-history]] 원장 머리말 참조. 본사 원본은 여전히 두
> 페이지로 나뉘어 있으므로, 자료를 다시 대조할 때는 위 출처 URL을 그대로 씁니다.
> 카피 자체는 한 글자도 고치지 않았습니다.

---

## 1. 원본 페이지 구조

| # | 섹션 | 원본 마크업 | 내용 |
|---|------|------------|------|
| 1 | 타이틀 | `h2.w-iconbox-title` | "Philosophy" |
| 2 | 도입 (2단) | `vc_col-sm-6` × 2 | 좌: 본문 4문단 / 우: 이미지 `wabe_zuschnitt.jpg` |
| 3 | 체크리스트 (2단, `color_alternate`) | `w-iconbox` × 13 | "Frankonia **stands for**" 7항목 / "Frankonia **provides**" 6항목 |
| 4 | 클로징 | 로고 + `strong` | "The unique and trustworthy partner for EMC solutions worldwide." |
| 5 | CTA (`color_primary`) | — | "ANY QUESTIONS? REQUEST MORE INFORMATION. / PLEASE CONTACT US" |

## 2. 원문 (verbatim)

### 2.1 도입 본문

> Frankonia is recognized as a highly specialized technology corporation for EMC
> anechoic chambers and test system within the automotive and industrial sector
> for testing of electromagnetic compatibility.

> With our expertise, flexibility, quality and a high degree of technology, we
> generate future-proof solutions on a global scale.

> Frankonia is the preferred supplier for complete solutions when it comes to the
> implementation of EMC test facilities. We plan, coordinate, and define
> customized solutions with and for our customers that meet today's and future
> standards. Because of our commitment to provide holistic EMC lab solutions we
> offer outstanding expertise in every phase of a project.

> Frankonia's project business convinces with its own project management,
> engineering and production, a trend-setting research, as well as an own
> installation and service team. So, we make sure to provide a high level of
> technology and quality.

### 2.2 Frankonia stands for

1. Customized anechoic chambers
2. Individual EMC test systems
3. Highest quality
4. Latest technology
5. Reliability
6. Unique absorbers
7. Future-proof solutions

### 2.3 Frankonia provides

1. Anechoic Chambers and Test Systems
2. Turnkey solutions
3. Expertise in every stage of a project
4. Everything from one source
5. Own engineering and manufacturing
6. Global presence and worldwide activity

### 2.4 클로징

> The unique and trustworthy partner for EMC solutions worldwide.

## 3. 에셋

| 원본 URL | 원본 크기 | 프로젝트 경로 | 비고 |
|---|---|---|---|
| `/wp-content/uploads/2017/06/wabe_zuschnitt.jpg` | 720×480 JPEG | `public/company/images/frankosorb-absorber.webp` (720×480, 11KB) | Frankonia 로고가 각인된 피라미드형 흡수체 근접 촬영. 원본이 제공하는 최대 해상도가 720px이라 업스케일 없이 원본 크기 유지 |
| `/wp-content/uploads/2016/12/frankonia_logo_transparent-*.png` | 1024×628 PNG | 미사용 | 프로젝트에 이미 `public/frankonia-logo.svg`(벡터)가 있어 래스터 로고는 가져오지 않음 |
| `/wp-content/uploads/2016/12/footer02.jpg` | 1800×1200 JPEG | 미사용 | 원본 푸터 밴드 배경. 의도적으로 흐린 사진이라 이 사이트의 "그림자 없이 면 대비로만 깊이" 규칙과 맞지 않아 제외 |

원본 페이지에 표(table)·수치 데이터·다운로드 파일은 없습니다.

## 4. 대응 관계 — 원본 → 이 사이트

| 원본 섹션 | 이 사이트 구현 | 컴포넌트 |
|---|---|---|
| 타이틀 | `PageShell` eyebrow + h1 + intro | `page-head` |
| 도입 2단 | 본문 좌 / 이미지 우 | `.trust` + `.figure` |
| 체크리스트 2단 | 체크 항목 2단 (alt 배경) | `.check-cols` + `.check-list` |
| 클로징 문장 | 좌측 정렬 대형 진술문 | `.statement` |
| CTA 밴드 | `PageShell`이 이미 렌더 | `.band` |

## 5. 옮기지 않은 것

- 원본 로고 이미지 반복 노출 — 헤더·푸터에 이미 브랜드 락업이 있음
- 원본 5번 CTA 문구 — `PageShell`의 공통 문의 밴드가 같은 역할을 함

## 6. 이 페이지에 쓰지 않고 보류한 인접 자료

`https://frankonia-solutions.com/company/` 에는 Philosophy와 성격이 가까운
자료가 더 있습니다. Philosophy 페이지의 범위를 넘어서므로 옮기지 않았고,
Company 개요 페이지를 만들 때 쓸 수 있습니다.

- **Frankonia at a Glance** — 4문장
- **Core Values of Frankonia** — Ingenuity / Energy / Community / Fairness, 각 4개 문장
- **Product Advantages / Customer Benefits / Why customers select Frankonia** — 각 5~13개 항목
- **본사 정보** — Heideck, Bavaria 소재, 1987년 설립, 창업자 Wolfgang Opitz,
  Frankosorb® 비연소성 흡수체 A2 acc. EN13501-1
- **거점** — Germany / Test Systems / Poland / China / India

홈(`https://frankonia-solutions.com/`)의 카운터 위젯에 본사가 직접 내건 수치가
있습니다. DOM의 `data-final` 속성에서 확정값을 읽었습니다(화면에서는 0부터
애니메이션되므로 텍스트만으로는 안 보입니다). History 페이지의 근거로 쓸 수
있습니다.

| 값 | 항목 |
|---|---|
| 5 | Locations |
| 80+ | Countries |
| 100% | Turnkey solutions |
| 37 | Years of experience |

이 사이트의 `history` 섹션이 이미 쓰고 있는 "80+ 공급 국가"는 여기서 나온
수치가 맞습니다. 다만 같은 섹션의 "35+ 표준 챔버 라인업"은 위 목록에 없으므로,
History 페이지를 만들 때 원본에서 근거를 다시 확인해야 합니다.
