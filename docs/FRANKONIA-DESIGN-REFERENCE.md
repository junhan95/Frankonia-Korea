---
version: "2.0"
name: Frankonia-Korea-design-system
description: The design system for Frankonia Korea — German-engineering B2B posture built on the CyberShield / Vodafone design lineage. Dark ink hero bands with heavy uppercase display headlines, calm white content bands, a single scarlet red for every conversion target, pill-shaped CTAs, hairline dividers, and a trilingual (KO/EN/DE) type system on Inter + Noto Sans KR.

colors:
  primary: "#e60000"
  primary-dark: "#bd0000"
  on-primary: "#ffffff"
  ink: "#25282b"
  steel: "#3a3e42"
  body: "#7e7e7e"
  body-dark: "#4a4d50"
  mute: "#bebebe"
  line: "#d9d9d9"
  canvas: "#ffffff"
  canvas-soft: "#f2f2f2"
  on-dark: "#ffffff"
  on-dark-sub: "#c9c9c9"

typography:
  display-hero:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 66px
    fontWeight: 800
    lineHeight: 69px
    letterSpacing: -1px
    textTransform: uppercase
  display-hero-ko:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 52px
    fontWeight: 800
    lineHeight: 58px
    letterSpacing: -0.5px
    textTransform: uppercase
    wordBreak: keep-all
  display-lg:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 48px
    fontWeight: 300
    lineHeight: 53px
  display-md:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 40px
    fontWeight: 300
    lineHeight: 44px
  display-sm:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 30px
  display-xs:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 26px
  eyebrow-uppercase:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 13px
    fontWeight: 700
    lineHeight: 20px
    letterSpacing: 2px
    textTransform: uppercase
  body-lg:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 27px
  body-md:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md-strong:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
  body-sm:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
  body-sm-strong:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 14px
    fontWeight: 700
    lineHeight: 21px
  caption:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 17px
  caption-uppercase:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.5px
    textTransform: uppercase
  button-md:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  button-lg:
    fontFamily: Inter, Noto Sans KR, Helvetica Neue, Arial, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px

rounded:
  none: 0px
  sm: 6px
  card: 6px
  pill-md: 32px
  pill-lg: 60px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  section: 120px
  container: 1200px
  hairline: 0.8px

components:
  nav-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    height: 68px
    position: sticky
  nav-link:
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    hoverIndicator: "{colors.primary}"
  lang-switcher:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "{colors.on-dark-sub}"
    activeBackground: "{colors.primary}"
    activeText: "{colors.on-primary}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.sm}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    hoverBackground: "{colors.primary-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill-lg}"
    padding: "{spacing.md} {spacing.2xl}"
  button-ghost-on-dark:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    borderColor: "rgba(255,255,255,0.45)"
    borderWidth: "{spacing.hairline}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill-lg}"
    padding: "{spacing.md} {spacing.2xl}"
  button-white-on-red:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill-lg}"
    padding: "{spacing.md} {spacing.2xl}"
  button-outline-red:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill-lg}"
    padding: "{spacing.md} {spacing.2xl}"
  eyebrow:
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow-uppercase}"
  hero-band-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-hero}"
    padding: "110px 0 120px"
  stat-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    dividerColor: "rgba(255,255,255,0.08)"
    numberTypography: "{typography.display-sm}"
    labelTypography: "{typography.caption}"
  content-band-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: "{spacing.section} 0"
  content-band-soft:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: "{spacing.section} 0"
  contact-band-red:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-md}"
    padding: "100px {spacing.2xl}"
  solution-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.mute}"
    borderWidth: "{spacing.hairline}"
    rounded: "{rounded.card}"
    thumbBackground: "{colors.ink}"
  lineup-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.mute}"
    borderWidth: "{spacing.hairline}"
    rounded: "{rounded.card}"
    padding: "28px {spacing.2xl}"
    iconTileBackground: "{colors.ink}"
  numbered-columns:
    numberColor: "{colors.primary}"
    numberTypography: "{typography.caption-uppercase}"
    titleTypography: "{typography.display-xs}"
    bodyTypography: "{typography.body-md}"
    topBorder: "{colors.line}"
  callout-box:
    backgroundColor: "{colors.canvas-soft}"
    accentBorder: "{colors.primary}"
    accentSide: left
    titleTypography: "{typography.display-md}"
    bodyTypography: "{typography.body-md}"
  hairline-list:
    rowBorder: "{colors.line}"
    rowBorderWidth: "{spacing.hairline}"
    indexColor: "{colors.mute}"
    labelTypography: "{typography.body-md}"
  spec-table:
    headerTypography: "{typography.caption-uppercase}"
    headerColor: "{colors.body}"
    bodyTypography: "{typography.body-sm}"
    bodyColor: "{colors.body}"
    rowBorder: "{colors.line}"
    rowBorderWidth: "{spacing.hairline}"
  badge-ext:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body}"
    borderColor: "{colors.line}"
    typography: "{typography.caption}"
    rounded: "4px"
  number-marker:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    borderColor: "rgba(255,255,255,0.9)"
    borderWidth: 1.6px
    rounded: "{rounded.full}"
    typography: "{typography.caption-uppercase}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md} {spacing.lg}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "#9a9a9a"
    headingColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    dividerColor: "rgba(255,255,255,0.12)"
    padding: "52px 0 40px"

  # ─── Examples (illustrative) — Frankonia Korea 확장 화면용 파생 서피스 ───
  ex-quote-form-card:
    description: "Contact 페이지 견적 문의 폼 카드. text-input 프리미티브 + 개인정보 동의 체크 + button-primary 제출."
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.mute}"
    rounded: "{rounded.card}"
    padding: "{spacing.3xl}"
  ex-model-detail-hero:
    description: "챔버/장비 모델 상세 페이지 히어로 — 제품명 display-lg + 대표 렌더 이미지, ink 배경."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
  ex-product-grid-card:
    description: "Chambers/Test Systems 개요의 제품 카드 — 16:9 제품 렌더 + 모델명 display-xs + 한 줄 설명."
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.mute}"
    rounded: "{rounded.card}"
    padding: "{spacing.lg}"
  ex-category-tabs:
    description: "챔버 카테고리 필터 탭 — 순서 고정(Automotive→Military→Commercial→Powertrain→RVC→Others). 활성 탭은 primary 필."
    activeBackground: "{colors.primary}"
    activeText: "{colors.on-primary}"
    inactiveText: "{colors.body}"
    rounded: "{rounded.pill-md}"
  ex-download-row:
    description: "카탈로그 다운로드 행 — hairline-list 행 + 파일 타입 badge-chip + 우측 ↓ 글리프."
    rowBorder: "{colors.line}"
    typography: "{typography.body-md}"
  ex-timeline-row:
    description: "Company 연혁 타임라인 — 좌측 연도 caption-uppercase(red) + 우측 본문, hairline 행 구분."
    yearColor: "{colors.primary}"
    rowBorder: "{colors.line}"
  ex-standards-badge-row:
    description: "적용 규격 배지 줄 (CISPR 25, MIL-STD-461 등) — badge-chip 반복."
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body-dark}"
    rounded: "{rounded.pill-md}"
    padding: "{spacing.xs} {spacing.md}"
  ex-career-posting-row:
    description: "Career 채용 공고 행 — hairline-list + 우측 button-outline-red '지원하기'."
    rowBorder: "{colors.line}"
    typography: "{typography.body-md-strong}"
  ex-related-products:
    description: "관련 제품 추천 밴드 — canvas-soft 배경 위 product-grid-card 3-up."
    backgroundColor: "{colors.canvas-soft}"
    padding: "{spacing.section} 0"
  ex-notice-toast:
    description: "폼 제출 완료/오류 토스트 — card 셰이프, 성공에도 별도 색 없이 ink 텍스트 + primary 포인트만."
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.mute}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md} {spacing.lg}"

---

## Overview

> **우선순위 안내 (2026-08-07).** 렌더링 포맷의 최종 기준은 저장소 루트의 **`디자인.md`** 이며, 그 원천은 실제 CyberShield 페이지(`/en/cybershield`, `app/cybershield/cybershield.css`)의 실측값이다. 이 문서는 토큰 사전과 브랜드 배경 자료로 계속 유효하지만, 두 문서가 어긋나는 항목은 `디자인.md`가 이긴다.
>
> 이 문서에서 이미 갱신된(= `디자인.md`를 따를) 항목: **컨테이너 1200px → `max(4vw, (100%-1400px)/2)`** · **헤어라인 0.8px → 1px** · **호버 리프트의 box-shadow → 그림자 없음(테두리 primary + 리프트)** · **nav-bar 68px → 76px 불투명 ink** · **섹션 제목 가운데 정렬 → 좌측 정렬** · **CyberShield 외부 링크 → 내부 페이지(디자인 기준 페이지)** · **브레이크포인트 → 1240/1100/700**.

Frankonia Korea는 독일 Frankonia의 EMC 챔버·시험 시스템을 공급하는 B2B 엔지니어링 브랜드다. 웹 서피스는 [frankonia-cybershield.com](https://www.frankonia-cybershield.com/) 실측에서 출발했고, 그 뿌리는 Vodafone 디자인 언어다 — 다크 잉크(`{colors.ink}`) 히어로 밴드 위에 얹히는 초중량 대문자 디스플레이 헤드라인, 그 뒤로 이어지는 차분한 화이트 콘텐츠 밴드, 그리고 페이지 전체에서 단 하나의 액센트로 작동하는 스칼렛 레드(`{colors.primary}`).

페이지는 캠페인 포스터처럼 시작해(외침: weight 800 대문자), 엔지니어링 문서처럼 이어진다(정돈: weight 300 섹션 제목, 헤어라인 구분선, 미니멀 사양 표). 이 "외침 → 정돈"의 리듬이 브랜드의 목소리다. 장식은 사진과 3D 렌더(웜그레이 톤의 설비 컷어웨이, 실사 시설 항공샷)가 전담하고, 일러스트·그라데이션·소프트 섀도우는 쓰지 않는다.

**Key Characteristics:**
- 단 하나의 액센트 `{colors.primary}` (`#e60000`). 모든 CTA 필, 아이브로우 라벨, 번호 마커, 그리고 Contact 밴드의 풀배경. 제2의 액센트 컬러는 존재하지 않는다.
- Weight 800 대문자 히어로(`{typography.display-hero}`) vs weight 300 섹션 제목(`{typography.display-lg}`) — 이 굵기 대비가 타이포그래피의 전부다.
- 모든 인터랙티브 요소는 필(pill) 지오메트리: CTA `{rounded.pill-lg}` 60px, 배지 `{rounded.pill-md}` 32px. 카드는 `{rounded.card}` 6px로 차분하게.
- 깊이는 그림자가 아닌 표면 대비로 — `{colors.ink}` 다크 밴드 ↔ `{colors.canvas}` 라이트 밴드의 극성 반전(polarity flip)이 엘리베이션 시스템이다.
- 0.8px 헤어라인(`{colors.line}`)이 리스트·표·컬럼을 가르는 유일한 구획 장치.
- 3개 언어(KO/EN/DE)가 하나의 타입 시스템을 공유한다: Inter + Noto Sans KR.
- **Frankonia Korea 고유 규칙**: 챔버 6개 카테고리 노출 순서 고정(Automotive → Military → Commercial → Powertrain → RVC → Others), CyberShield는 외부 링크(새 창), 마지막 문의 섹션만 레드 풀배경.

## Colors

### Brand & Accent
- **Frankonia Red** (`{colors.primary}` — `#e60000`): 유일한 브랜드 액센트. 모든 primary CTA 필, 아이브로우, 히어로 헤드라인의 강조 구절, 인터랙티브 번호 마커, Contact 밴드 풀배경. 채도를 낮추거나 변형하지 않는다.
- **Red Dark** (`{colors.primary-dark}` — `#bd0000`): 레드의 호버/눌림 상태 전용. 정적 표면에는 쓰지 않는다.

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): 기본 라이트 콘텐츠 배경.
- **Canvas Soft** (`{colors.canvas-soft}` — `#f2f2f2`): 소프트 그레이 밴드(비교표·프로세스·회사소개 섹션)와 콜아웃 박스 배경.
- **Ink** (`{colors.ink}` — `#25282b`): 다크 차콜 — 헤더, 히어로 밴드, 감쇠성능 등 데이터 밴드, 푸터. 라이트 표면에서는 제목 텍스트 색을 겸한다.
- **Steel** (`{colors.steel}` — `#3a3e42`): 잉크의 보조 톤 — 다크 카드 썸네일의 변주용.

### Text
- **Ink** (`{colors.ink}`): 라이트 표면의 모든 제목.
- **Body Dark** (`{colors.body-dark}` — `#4a4d50`): canvas-soft 위 본문 (canvas-soft 위 `{colors.body}`는 대비 3.6:1로 부족 — 이 경우 body-dark 사용).
- **Body** (`{colors.body}` — `#7e7e7e`): 라이트 표면의 기본 본문·설명·표 데이터. 낮은 대비를 유지해 제목과 CTA를 도드라지게 한다.
- **Mute** (`{colors.mute}` — `#bebebe`): 최하위 텍스트 — 플레이스홀더, 모델명 인덱스. 카드 테두리 색을 겸한다.
- **On Dark** (`{colors.on-dark}` — `#ffffff`) / **On Dark Sub** (`{colors.on-dark-sub}` — `#c9c9c9`): 잉크·레드 표면 위 텍스트 (제목/본문).

### Semantic
별도의 시맨틱 팔레트를 두지 않는다. 성공·오류 등 상태 표시도 레드 + 잉크 + 그레이스케일 안에서 해결한다 (폼 오류: primary 텍스트 + hairline 강조).

### Section Band Rhythm
다크 → 화이트가 교차하고 마지막 문의 밴드만 레드로 마무리한다. CyberShield 실측 순서를 규범으로 삼는다:

```
hero(ink) → 콘텐츠(canvas) → 강조 데이터(ink) → 콘텐츠(canvas) → 비교/프로세스(canvas-soft)
→ … → FAQ(canvas) → Contact(#e60000) → footer(ink)
```

연속으로 같은 표면을 3개 밴드 이상 반복하지 않는다. canvas-soft는 "중간 톤"이 아니라 표·프로세스 같은 정보 밀도 높은 밴드 전용이다.

## Typography

### Font Family
단일 스택이 3개 언어를 모두 감당한다: **Inter**(라틴) + **Noto Sans KR**(한글) + Helvetica Neue/Arial 폴백. 세리프·모노 계열은 시스템에 존재하지 않는다. 웨이트는 300 / 400 / 600 / 700 / 800을 사용한다.

원 레퍼런스(Vodafone)의 전용 서체는 사용할 수 없으므로 Inter 800이 히어로 스케일의 대체다 — Vodafone 분석 문서의 폰트 대체 권고와 동일하다.

### Hierarchy

| Token | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.display-hero}` | 66px | 800 | 1.04 | -1px | 영문 히어로 헤드라인 — 대문자, 핵심 구절만 primary 레드. |
| `{typography.display-hero-ko}` | 52px | 800 | 1.12 | -0.5px | **한국어 히어로** — 한글 자형 특성상 크기·행간·자간을 완화. `word-break: keep-all` 필수. |
| `{typography.display-lg}` | 48px | 300 | 1.1 | 0 | 섹션 제목의 기본 스케일. 문장형(대소문자 유지). |
| `{typography.display-md}` | 40px | 300 | 1.1 | 0 | 서브 섹션·Contact 밴드 제목. |
| `{typography.display-sm}` | 24px | 700 | 1.25 | 0 | 통계 숫자, 배지 숫자. |
| `{typography.display-xs}` | 20px | 700 | 1.3 | 0 | 카드 제목(솔루션·제품 카드). |
| `{typography.eyebrow-uppercase}` | 13px | 700 | — | +2px | 모든 섹션 제목 위 레드 대문자 라벨. |
| `{typography.body-lg}` | 17px | 400 | 1.6 | 0 | 히어로 서브카피, 리드 문단. |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | 기본 본문. 색은 `{colors.body}`. |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | 카드 설명, 표 데이터. |
| `{typography.caption}` | 12.5px | 400 | — | 0 | 통계 라벨, 모델명 인덱스. |
| `{typography.caption-uppercase}` | 12px | 600 | — | +0.5px | 표 헤더(th), 번호 라벨(01/02/03), 푸터 아이브로우. |
| `{typography.button-md}` | 16px | 400 | 1.5 | 0 | 기본 버튼 라벨 — **굵지 않게(400)**. |
| `{typography.button-lg}` | 18px | 400 | 1.55 | 0 | 히어로의 대형 CTA. |

### Principles
- **Weight 800 + 대문자 = 히어로의 목소리.** 페이지당 한 번, 히어로에서만 외친다.
- **Weight 300 = 섹션의 목소리.** 40–48px 디스플레이 전용. 24px 아래로 내리지 않는다.
- **버튼 라벨은 400.** 필 셰이프가 이미 시선을 끌므로 라벨 굵기로 소리치지 않는다 — CyberShield 실측에서 확인된 규칙.
- **본문은 중간 회색.** `{colors.body}`의 낮은 대비가 제목·CTA의 상대적 위계를 만든다.
- **강조는 색으로만.** 문장 중 강조는 레드 텍스트. 밑줄·이탤릭·형광펜 배경 금지.
- **CTA 글리프 관례**: 외부 이동 `↗`, 스크롤 유도 `↓`, 내부 이동 `→` — 아이콘 폰트가 아닌 텍스트 글리프로 라벨 끝에 붙인다.

### Korean Adaptations (한국어 조판 규칙)
- 히어로는 `{typography.display-hero-ko}` 사용: 52px / 행간 1.12 / 자간 -0.5px. 66px/-1px을 한글에 그대로 적용하면 자형이 붕괴된다.
- 모든 제목·본문에 `word-break: keep-all` — 단어 중간 줄바꿈 금지.
- 한글에는 uppercase 개념이 없으므로, 아이브로우·통계 라벨 등 "대문자 역할"은 영문 병기로 처리한다 (예: 아이브로우는 영문 유지 — `OUR SOLUTIONS`).
- 국·영 혼용 시 숫자와 단위는 라틴 자형(Inter)이 자동 적용된다 — 별도 처리 불필요.

## Layout

### Spacing System
- **Base unit**: 4px. 토큰: `{spacing.xxs}` 2 · `{spacing.xs}` 4 · `{spacing.sm}` 8 · `{spacing.md}` 12 · `{spacing.lg}` 16 · `{spacing.xl}` 20 · `{spacing.2xl}` 24 · `{spacing.3xl}` 32.
- **Section padding**: `{spacing.section}` **상하 120px** — CyberShield 실측값. 여백이 아깝다고 줄이지 않는다; 이 과감한 수직 여백이 하이엔드 B2B의 호흡이다. (히어로는 110/120, Contact 밴드는 100.)
- **카드 내부**: 라인업 카드 28px/24px, 솔루션 카드 바디 26px.
- **버튼 행 간격**: 14px (`{spacing.md}`+2).

### Grid & Container
- 콘텐츠 컨테이너 `{spacing.container}` **1200px** (좌우 24px 거터).
- 솔루션 카드 3-up / 챔버 라인업 3×2 / 장비 3-up. 데스크톱 3-up → 태블릿 2-up → 모바일 1-up.
- 번호형 컬럼(01/02/03)은 3~4-up, 컬럼 상단에 헤어라인.
- 히어로 텍스트 블록은 좌측 정렬, 최대 820px.

### Whitespace Philosophy
히어로 헤드라인이 상단을 독점하고, 섹션 사이 120px이 밴드 전환의 숨을 만든다. 카드 내부에서는 제목과 본문이 붙고(8–10px), 카드 사이는 20–24px. 푸터는 다크하고 밀도 있게.

### Responsive Strategy

#### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 600px | 히어로 34px(KO)/40px(EN); 카드 그리드 1-up; 통계 밴드 2×2; 푸터 1컬럼. |
| Tablet | 600–960px | 카드 그리드 2-up; GNB는 햄버거로 수납(다크 풀스크린 드로어). |
| Desktop | 960–1400px | 풀 GNB 6메뉴 + 언어 스위처 + CTA; 그리드 3-up. |
| Ultra-wide | ≥ 1400px | 컨테이너 1200px 고정; 밴드 배경색만 엣지-투-엣지. |

#### Touch Targets
primary 필은 약 50px 높이(패딩 13px + 행간 24px)로 모든 브레이크포인트에서 WCAG 터치 타깃을 충족한다.

#### Collapsing Strategy
- **GNB**: 데스크톱 풀 링크 행(회사소개 · 챔버 · EMC 시험장비 · CyberShield · 문의 · 채용) → 960px 아래에서 햄버거. 드로어 안에서도 언어 스위처와 견적 CTA는 유지.
- **히어로**: 헤드라인 유동 축소, KO는 keep-all 줄바꿈이 자연스러운 지점에서 개행.
- **챔버 라인업**: 3×2 → 2×3 → 1×6. **순서는 어떤 브레이크포인트에서도 재배열하지 않는다.**

#### Image Behavior
- **히어로**: 챔버 설치 렌더/실사 풀블리드, 또는 잉크 단색. 이미지 위 텍스트는 반드시 on-dark.
- **제품 렌더**: 흰 배경 렌더를 16:9로 `{rounded.card}` 프레임 안에.
- **다크 밴드 다이어그램**: 컷어웨이 렌더 + `number-marker` 오버레이 패턴(CyberShield의 21포인트 다이어그램 참조).

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | 그림자·테두리 없음. | 밴드, 히어로, 푸터 — 표면 대비가 깊이를 만든다. |
| Level 1 — Hairline | 0.8px solid `{colors.mute}` 또는 `{colors.line}`. | 카드 테두리, 리스트 행, 표 행, 폼 인풋. |
| Level 2 — Hover Lift | translateY(-3~4px) + 0 12px 30px rgba(37,40,43,.10). | **호버 시에만** 허용되는 유일한 그림자. 정지 상태 그림자 금지. |
| Level 3 — Border on Dark | 0.8px solid rgba(255,255,255,.45). | 다크 밴드 위 고스트 버튼, 언어 스위처. |

### Decorative Depth
- **3D 산업 렌더와 실사 사진**이 유일한 분위기 장치다. 일러스트·패턴·그라데이션 배경은 쓰지 않는다 (예외: 솔루션 카드 썸네일의 ink→red-dark 그라데이션 1종 — CyberShield 카드 변주).
- **번호 마커**(`number-marker`)가 다이어그램 위의 유일한 포컬 포인트 장치 — 레드 원형 + 흰 숫자 + 흰 테두리 1.6px.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | 풀블리드 밴드, 히어로, 푸터. |
| `{rounded.sm}` / `{rounded.card}` | 6px | 카드, 이미지 프레임, 인풋, 아이콘 타일(8px 허용). |
| `{rounded.pill-md}` | 32px | 배지·칩·카테고리 탭. |
| `{rounded.pill-lg}` | 60px | **모든 CTA 버튼** — 사각 버튼은 존재하지 않는다. |
| `{rounded.full}` | 9999px | 번호 마커, 원형 아이콘 컨테이너. |

### Geometry Rules
- 곡선은 필 버튼과 원형 마커에만 존재한다. 나머지는 직선과 0.8px 헤어라인.
- 사진·렌더 프레임: 16:9 기본, 6px 라운드.
- 히어로 사진은 프레임 없이 엣지-투-엣지.

## Components

### Buttons

**`button-primary`** — 레드 필 CTA. 모든 전환 목표(견적 문의, 솔루션 보기).
- 배경 `{colors.primary}`, 텍스트 `{colors.on-primary}`, 라벨 `{typography.button-md}`(400), 패딩 13px 30px, 셰이프 60px 필. 호버 `{colors.primary-dark}`.

**`button-ghost-on-dark`** — 다크/레드 밴드 위 보조 필.
- 투명 배경 + 0.8px `rgba(255,255,255,.45)` 테두리, 흰 텍스트. 호버 시 테두리 흰색 + 배경 8% 흰색.

**`button-white-on-red`** — 레드 밴드(Contact) 위 primary 역할.
- 흰 배경 + 레드 텍스트. 레드 밴드 위에서 red-on-red 버튼 금지.

**`button-outline-red`** — 라이트 표면의 보조 필 (다운로드, 지원하기).
- 흰 배경 + 레드 텍스트 + 레드 테두리.

### Cards & Containers

**`solution-card`** — 홈의 3대 솔루션 카드.
- 다크 썸네일(잉크/스틸/잉크→레드 그라데이션) + 라인 아이콘 → 바디: `{typography.display-xs}` 제목 + 회색 부제 + 본문 + `›` 불릿의 대시드 헤어라인 리스트 + 레드 텍스트 링크.

**`lineup-card`** — 챔버/장비 라인업 카드.
- 0.8px `{colors.mute}` 테두리, 6px 라운드, 46px 잉크 아이콘 타일, 제목 + 본문 + `{colors.mute}` 모델명 인덱스. 호버 시 Level 2 리프트.

**`callout-box`** — 좌측 레드 세로 보더 + `{colors.canvas-soft}` 배경의 핵심 메시지 요약. 좌: weight 300 제목 / 우: 본문 2컬럼.

### Inputs & Forms

**`text-input`** — 흰 배경, 잉크 텍스트, 잉크 1px 테두리, 6px 라운드. 포커스 시 테두리 `{colors.primary}`. 라벨은 `{typography.body-sm-strong}`.

### Navigation

**`nav-bar`** — sticky 다크 헤더, 높이 68px, 배경 `{colors.ink}` 97% + blur.
- 좌: 로고(FRANKONIA 화이트 + KOREA 레드) / 중: GNB 6메뉴 / 우: `lang-switcher`(KO·EN·DE) + `button-primary` 소형.
- GNB 순서 고정: **Company · Anechoic Chambers · EMC Test Systems · CyberShield(외부 ↗) · Contact · Career.**

**`footer`** — `{colors.ink}` 3컬럼(회사정보 / 솔루션 / 링크) + 0.8px 12% 흰색 헤어라인 위 카피라이트.

### Signature Components

**`hero-band-dark`** — 잉크 히어로 밴드. 레드 아이브로우 → 대문자 800 헤드라인(핵심 구절 레드) → 서브카피(on-dark-sub) → CTA 2개(primary + ghost). 하단에 `stat-band`.

**`stat-band`** — 히어로 하단 수치 밴드 — 1987 / 80+ / 35+ / 3. 8% 흰색 헤어라인으로 4등분.

**`contact-band-red`** — **페이지당 단 한 번**, 마지막 문의 섹션의 레드 풀배경. weight 300 제목 + `button-white-on-red`. 레드 풀배경을 다른 용도로 복제하지 않는다.

**`numbered-columns`** — 레드 번호(01/02/03) + 볼드 소제목 + 회색 본문의 컬럼 패턴, 상단 헤어라인. 프로세스·특징 나열의 기본형.

**`hairline-list`** — 행마다 0.8px 하단 라인 + 좌측 회색 인덱스. 연혁·부품·채용 공고·다운로드에 재사용.

**`spec-table`** — 테두리 없는 미니멀 표: th 12px 600 대문자 회색, td 14–15px 회색, 행 구분 0.8px만. 배경색·격자선 금지.

**`number-marker`** — 다이어그램 위 레드 원형 번호 마커. 인터랙티브 제품 다이어그램(컷어웨이) 전용.

**`badge-ext`** — "외부 링크" 표시 칩. CyberShield처럼 외부로 나가는 카드에 부착.

### Frankonia Korea Structural Rules (사이트 고유 규칙)
1. **챔버 카테고리 순서 고정**: Automotive → Military → Commercial → Powertrain → RVC → Others. 메뉴·탭·카드·푸터 모든 노출 지점에서 동일. 데이터의 `order` 필드로 강제하고 마크업에 하드코딩하지 않는다.
2. **CyberShield는 외부 링크**: 내부 페이지를 만들지 않는다. `https://www.frankonia-cybershield.com/` 새 창(`rel="noopener"`) + `badge-ext` + `↗` 글리프.
3. **언어 스위처**: 헤더 우측 KO·EN·DE — 활성 언어만 레드 필. 로케일은 URL로 분리(/, /en/, /de/).
4. **신뢰 요소 표기**: "Since 1987 · 80+ 개국 · 독일 본사 공식 파트너"를 통계·배지 패턴으로 반복 노출한다.

## Do's and Don'ts

### Do
- `{colors.primary}` 레드는 CTA·아이브로우·강조 구절·번호 마커·Contact 밴드에만. 모든 전환 목표는 레드 필이다.
- 히어로는 weight 800 대문자 + 타이트 트래킹(-1px, 한글 -0.5px), 섹션 제목은 weight 300 — 이 대비를 항상 유지한다.
- 모든 CTA에 `{rounded.pill-lg}` 60px 필. 버튼 라벨은 weight 400.
- 페이지 표면은 ink 히어로 → canvas 콘텐츠 → (canvas-soft 데이터 밴드) → red 문의 → ink 푸터로 순환시킨다.
- 구획은 0.8px 헤어라인으로. 리스트·표·컬럼 어디든.
- 한국어 텍스트에는 항상 `word-break: keep-all`, 히어로는 `display-hero-ko` 스케일.
- CTA 라벨 끝의 `↗ ↓ →` 글리프 관례를 지킨다.
- 챔버 카테고리는 어떤 화면에서도 고정 순서로 노출한다.

### Don't
- 제2의 액센트 컬러를 도입하지 않는다. 네이비·블루·그린 계열 금지 — 레드 + 잉크 + 그레이스케일이 전부다.
- 히어로 헤드라인을 66px 스케일 그대로 한글에 적용하지 않는다 (`display-hero-ko`로 완화).
- 사각 모서리 CTA를 만들지 않는다. 60px 필은 협상 불가.
- 정지 상태 카드에 그림자를 얹지 않는다. 그림자는 호버 리프트에만.
- 레드 풀배경을 Contact 밴드 외의 섹션에 복제하지 않는다.
- 버튼 라벨을 700/800으로 굵게 만들지 않는다.
- 본문을 잉크 색으로 올리지 않는다 — 본문은 `{colors.body}` 회색이 규범이다 (canvas-soft 위에서만 body-dark).
- CyberShield의 내부 상세 페이지를 만들지 않는다 — 항상 외부 링크.

---

*v2.0 · 2026-08-07 · 원본: frankonia-cybershield.com 실측(v1) + Vodafone 디자인 분석 포맷 이식·고도화. 토큰 값은 실측값 기준이며 임의 변경 금지.*
