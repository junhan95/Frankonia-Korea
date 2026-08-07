# Frankonia Korea 웹 기획서 (Web Plan)

> **프로젝트**: www.frankonia-korea.com 리뉴얼
> **프레임워크**: Next.js 16 (2026-08 기준 최신 16.3, App Router)
> **관련 문서**:
> - `Frankonia-Korea-웹사이트-리뉴얼-기획서.docx` — 전체 리뉴얼 플랜 (v2)
> - `FRANKONIA-DESIGN-REFERENCE.md` — **모든 디자인 요소의 단일 기준** (CyberShield 사이트 실측 토큰)
>
> 본 문서는 화면·라우팅·컴포넌트 단위의 개발 착수용 상세 기획이다. 디자인 값(색·타이포·간격·버튼 등)은 본 문서에 중복 기재하지 않고 전부 디자인 레퍼런스를 따른다.

---

## 1. 기술 스택

| 항목 | 선정 | 비고 |
|---|---|---|
| 프레임워크 | **Next.js 16.x** (App Router, RSC, Turbopack) | 정적 생성(SSG) 중심, 제품 페이지 `generateStaticParams` |
| 언어 | TypeScript (strict) | |
| 스타일링 | Tailwind CSS v4 | `@theme`에 디자인 레퍼런스 6장 토큰 등록 |
| 다국어 | next-intl | `/ko` `/en` `/de` 하위 경로, 미들웨어 로케일 감지 |
| 콘텐츠 | 1단계: 타입 정의된 JSON/MDX (레포 내) | 2단계: 헤드리스 CMS(Sanity) 검토 |
| 폼 | Server Actions + Resend(메일 발송) + Cloudflare Turnstile | 문의 폼 스팸 방지 |
| 애니메이션 | CSS + IntersectionObserver 기반 `reveal` 패턴 | 레퍼런스 4.4항과 동일한 절제된 페이드 인 |
| 분석 | GA4 + 네이버 애널리틱스 | |
| 호스팅 | Vercel (권장) | SSL 자동 갱신 — 현 인증서 사고 재발 방지 |
| 코드 품질 | ESLint + Prettier, Playwright(E2E 스모크) | |

---

## 2. 정보 구조 & 라우팅 맵

GNB 6개(확정): **Company / Anechoic Chambers / EMC Test Systems / CyberShield / Contact / Career**

```
app/
└── [locale]/                       # ko(기본) · en · de
    ├── page.tsx                    # ① Home (랜딩)
    ├── company/
    │   └── page.tsx                # ② Company (인사말·연혁·Frankonia Group·오시는 길)
    ├── chambers/
    │   ├── page.tsx                # ③ Anechoic Chambers 개요 (카테고리 필터 그리드)
    │   ├── automotive/page.tsx     #   ③-1 Automotive      ← 순서 고정 1
    │   ├── military/page.tsx       #   ③-2 Military        ← 순서 고정 2
    │   ├── commercial/page.tsx     #   ③-3 Commercial      ← 순서 고정 3
    │   ├── powertrain/page.tsx     #   ③-4 Powertrain      ← 순서 고정 4
    │   ├── rvc/page.tsx            #   ③-5 RVC             ← 순서 고정 5
    │   ├── others/page.tsx         #   ③-6 Others          ← 순서 고정 6
    │   └── [category]/[model]/page.tsx   # 챔버 모델 상세 (예: /chambers/automotive/actc)
    ├── test-systems/
    │   ├── page.tsx                # ④ EMC Test Systems 개요
    │   ├── emi-receiver/page.tsx   #   ④-1 EMI-Receiver
    │   ├── antennas/page.tsx       #   ④-2 Antennas
    │   ├── accessories/page.tsx    #   ④-3 Accessories
    │   └── [category]/[model]/page.tsx   # 장비 모델 상세
    ├── contact/
    │   └── page.tsx                # ⑤ Contact (견적·기술 문의 폼 + 다운로드)
    ├── career/
    │   └── page.tsx                # ⑥ Career (인재상·채용 공고)
    ├── privacy/page.tsx            # 개인정보처리방침
    ├── sitemap.ts / robots.ts      # 자동 생성
    └── not-found.tsx
```

- **CyberShield는 사이트 내부 페이지(`/cybershield`)로 제공** — 제품 사이트가 `X-Frame-Options: SAMEORIGIN` · `frame-ancestors 'self'`를 보내고 CORS 헤더가 없어 iframe·fetch 모두 불가능하므로, 프랑코니아 코리아 네브바를 유지한 채 콘텐츠만 자체 렌더한다. 전체 사양·룸 구성기는 해당 페이지 내 CTA로 `https://www.frankonia-cybershield.com/`에 연결(**현재 창**, KO는 `/ko/`).
- **챔버 카테고리 순서는 모든 노출 지점(GNB 드롭다운, 개요 필터 탭, 랜딩 카드, 푸터)에서 Automotive → Military → Commercial → Powertrain → RVC → Others 고정.** 데이터 파일에 `order` 필드로 강제한다.

### URL 규칙

- 소문자-케밥케이스, 언어 프리픽스 필수: `/ko/chambers/automotive`, `/en/test-systems/antennas`
- 기본 로케일 `ko`도 프리픽스 유지(`localePrefix: 'always'`) — hreflang 매핑 단순화
- 구 사이트 URL이 살아있다면 `next.config.ts`의 `redirects()`로 301 이전

---

## 3. 페이지별 상세 기획

### 3.1 Home (랜딩) — `/`

시안 `frankonia-korea-landing.html`(v2)이 구현 기준. 섹션 순서:

| # | 섹션 | 컴포넌트 | 내용 |
|---|---|---|---|
| 1 | Header | `<SiteHeader>` | 로고 / GNB 6개 / 언어 스위처(KO·EN·DE) / 견적 CTA(필 버튼) |
| 2 | Hero | `<Hero>` | 다크(#25282B) 배경, 대문자 H1(핵심 구절 레드), 서브카피, CTA 2개. 추후 본사 챔버 렌더/영상 배경 교체 |
| 3 | Stats | `<StatBand>` | 1987 / 80+ / 35+ / 3 — 헤어라인 구분 4컬럼 |
| 4 | 3대 솔루션 | `<SolutionCards>` | Anechoic Chambers / EMC Test Systems / CyberShield(외부 ↗) |
| 5 | 챔버 라인업 | `<ChamberLineup>` | **6카드 고정 순서**: Automotive·Military·Commercial·Powertrain·RVC·Others |
| 6 | 시험장비 라인업 | `<EquipmentLineup>` | EMI-Receiver / Antennas / Accessories |
| 7 | 신뢰 밴드 | `<TrustSection>` | 독일 본사 소개 + 공식 파트너 배지 4개 |
| 8 | Contact 밴드 | `<ContactBand>` | **레드(#E60000) 풀배경** + 흰 CTA |
| 9 | Footer | `<SiteFooter>` | #25282B, 3컬럼(회사정보/솔루션/링크) + 카피라이트 |

### 3.2 Company — `/company`

아이브로우 "WHO WE ARE" → Light 대형 제목 패턴(디자인 레퍼런스 4.2-1).
섹션: 인사말(대표 메시지) → 회사소개·연혁(타임라인: 헤어라인 리스트 패턴) → Frankonia Group 소개(1987·5개 거점·80+개국, 본사 캠퍼스 이미지) → 오시는 길(지도 임베드 + 주소·연락처).

### 3.3 Anechoic Chambers 개요 — `/chambers`

- 도입: 아이브로우 + 제목 + 설명 (Frankosorb® 흡수체, 모듈형 설계, 턴키)
- **카테고리 필터 탭**: All / Automotive / Military / Commercial / Powertrain / RVC / Others (순서 고정, URL 쿼리가 아닌 앵커/탭 상태)
- 제품 카드 그리드: 이미지 + 모델명 + 한 줄 설명 (본사 사이트 포트폴리오 패턴)
- 하단: 다운로드 CTA + 견적 문의 밴드

### 3.4 챔버 카테고리 페이지 — `/chambers/{category}` ×6

공통 템플릿 `<ChamberCategoryPage>`:
도입(카테고리 설명 + 적용 규격 배지: CISPR 25, MIL-STD-461 등) → 모델 카드 리스트 → 대표 스펙 요약 표(미니멀 표 패턴) → 관련 카테고리 추천 → 견적 CTA.

| 카테고리 | 주요 모델(초기 콘텐츠) | 적용 규격 표기 |
|---|---|---|
| Automotive | ACTC, UCC, AVTC, SAC-10V | ECE R10, CISPR 25, ISO 11452-2 |
| Military | MIL-STD Chamber, Advanced, MIL CHC | MIL-STD-461 |
| Commercial | SAC 시리즈, FAC 시리즈, CHC, Shielded Room | EN/CISPR, IEC 61000-4-3 |
| Powertrain | EDTC-SA, EDTC-AX, EDTC-BB(EMC-BlueBox) | CISPR 25, ISO 11452 |
| RVC | Reverberation Chamber | IEC 61000-4-21 |
| Others | CTC, Reverberation Tent | 프로젝트별 |

### 3.5 모델 상세 — `/chambers/{category}/{model}`

`generateStaticParams`로 정적 생성. 구성: 히어로(제품명 + 대표 이미지) → 핵심 사양 표 → 특징 리스트(번호형 컬럼 패턴) → 카탈로그 다운로드 → 관련 모델 → 견적 CTA.
초기 오픈 시 콘텐츠가 없는 모델은 카테고리 페이지까지만 운영하고 상세는 단계적 추가.

### 3.6 EMC Test Systems — `/test-systems` + 하위 3개

챔버와 동일 템플릿 재사용. 카테고리: EMI-Receiver(ERX-6, ERC-6 / CISPR 16-1-1, 9kHz~6GHz) / Antennas(9kHz~40GHz) / Accessories(앰프 최대 12kW, GTEM, E-field 센서, 파워미터).

### 3.7 Contact — `/contact`

- 좌: 문의 폼(이름·회사·이메일·연락처·문의 유형 셀렉트[챔버/시험장비/CyberShield/기타]·내용·개인정보 동의 체크)
- 우: 직통 연락처, 오시는 길 요약, 카탈로그 다운로드 리스트
- 처리: Server Action → 검증(zod) → Turnstile 확인 → Resend로 담당자 메일 발송 → 완료 토스트
- 페이지 상단은 레드 밴드 패턴(디자인 레퍼런스 §1.3 Contact 규칙)

### 3.8 Career — `/career`

인재상 소개 + 채용 공고 리스트(헤어라인 리스트 패턴, 공고 없을 때 "상시 지원" 안내 + 이메일 링크).

---

## 4. 공통 컴포넌트 명세

| 컴포넌트 | 설명 | 디자인 근거(레퍼런스 §) |
|---|---|---|
| `SiteHeader` | sticky, #25282B, 로고+GNB+언어+CTA. 모바일: 햄버거 → 풀스크린 드로어 | §4.1 |
| `LangSwitcher` | 필 아웃라인 드롭다운 (KO/EN/DE) | §3.3 |
| `PillButton` | variant: primary(레드)/ghost(아웃라인)/white(레드 배경 위) + `↗ ↓ →` 글리프 prop | §3.1 |
| `Eyebrow` | 레드 대문자 섹션 라벨 | §2.2 |
| `SectionHead` | Eyebrow + Light 제목 + 설명 | §4.2-1 |
| `NumberedColumns` | 01/02/03 번호형 컬럼 (상단 헤어라인) | §4.2-2 |
| `CalloutBox` | 좌측 레드 보더 + #F2F2F2 요약 박스 | §4.2-3 |
| `HairlineList` | 행별 0.8px 라인 리스트 (연혁·부품·공고) | §4.2-5 |
| `SpecTable` | 미니멀 사양 표 (th 대문자 12px) | §4.2-6 |
| `ProductCard` | 이미지+모델명+설명, radius 6px, 0.8px 보더 | §4.1 |
| `CategoryTabs` | 챔버 필터 탭 — **순서 고정 배열 사용** | §4.2 |
| `StatBand` | 수치 밴드 (다크 배경) | 시안 v2 |
| `ContactBand` | 레드 풀배경 CTA 밴드 | §1.3 |
| `SiteFooter` | #25282B 3컬럼 푸터 | §4.1 |
| `Reveal` | 스크롤 진입 페이드 인 래퍼 | §4.4 |

---

## 5. 데이터 구조 (콘텐츠 모델)

```ts
// content/chambers.ts
type ChamberCategory = {
  slug: 'automotive' | 'military' | 'commercial' | 'powertrain' | 'rvc' | 'others';
  order: 1 | 2 | 3 | 4 | 5 | 6;          // ← 노출 순서 강제
  standards: string[];                     // "CISPR 25" 등
  models: ChamberModel[];
};
type ChamberModel = {
  slug: string;            // 'actc'
  name: string;            // 'ACTC'
  summary: LocalizedText;  // { ko, en, de }
  specs?: { label: LocalizedText; value: string }[];
  images: string[];
  catalogUrl?: string;
};
```

- 다국어 텍스트는 `{ ko, en, de }` 필드로 콘텐츠와 함께 관리, UI 문자열은 next-intl `messages/{locale}.json`
- 모든 리스트 렌더링은 `order` 기준 정렬 — 하드코딩 순서 금지

---

## 6. 다국어 설계

| 항목 | 내용 |
|---|---|
| 로케일 | **1단계 확정: `ko`(기본) / `en` 2개 언어.** `de`는 개발 속도를 위해 보류 — 코드는 `copy` 객체에 `de` 키를 추가하면 복구되는 구조로 유지 |
| 라우팅 | next-intl 미들웨어, `localePrefix: 'always'` |
| 메타데이터 | `generateMetadata`에서 언어별 title/description + `alternates.languages`(hreflang) 자동 출력 |
| 번역 범위 1단계 | 전 페이지 KO·EN 완역 (DE 보류) |
| 폴백 | DE 복구 시 미번역 페이지는 EN 콘텐츠 노출 + 상단 안내 배지 |
| 폰트 | `next/font`로 Inter + Noto Sans KR 서브셋 로드 (디자인 레퍼런스 §2.1) |

---

## 7. SEO · 성능 · 접근성

- 전 페이지 SSG(빌드 타임 생성), 이미지는 `next/image`(WebP/AVIF 자동)
- `sitemap.ts`·`robots.ts` 자동 생성, 언어별 canonical + hreflang
- 구조화 데이터: `Organization`, 제품 페이지 `Product` JSON-LD
- Core Web Vitals 목표: LCP < 2.5s, CLS < 0.1 (히어로 이미지 `priority` 지정)
- 오픈 후 Google Search Console + 네이버 서치어드바이저 등록
- 접근성: 시맨틱 랜드마크, 키보드 내비게이션, 레드 위 흰 텍스트 대비 확보(#E60000/#FFF = 4.6:1)

---

## 8. 배포 · 운영

1. **도메인/SSL**: frankonia-korea.com을 Vercel 프로젝트에 연결 → 인증서 자동 발급·갱신 (현 SSL 사고 유형 원천 차단). 기존 호스팅의 DNS 관리권 확보가 선행 과제.
2. **환경**: `main` 브랜치 → 프로덕션 / PR → 프리뷰 배포(디자인 검수용 URL 자동 생성)
3. **오픈 전 체크**: 3개 언어 전 페이지 스모크 테스트(Playwright), 폼 수신 테스트, 리다이렉트 검증, OG 이미지
4. **운영**: 콘텐츠 수정은 레포 커밋으로 관리(1단계), 접수 메일 미수신 모니터링

---

## 9. 개발 마일스톤 (기획서 9장 로드맵과 연동)

| 주차 | 작업 |
|---|---|
| 1주차 | 프로젝트 셋업(Next.js 16 + Tailwind v4 + next-intl), 디자인 토큰 등록, 공통 컴포넌트(§4) 구축 |
| 2주차 | Home + Header/Footer 완성 (시안 v2 → React 이식), KO 콘텐츠 |
| 3~4주차 | Chambers 개요 + 카테고리 6페이지, Test Systems 3페이지 (템플릿 재사용) |
| 5주차 | Company / Contact(폼) / Career / Privacy |
| 6주차 | EN·DE 번역 적용, hreflang·SEO 마감 |
| 7주차 | 모델 상세 페이지(콘텐츠 확보분), 전수 QA·성능 튜닝 |
| 8주차 | 도메인 연결·리다이렉트·오픈, 검색엔진 등록 |

---

*작성: 2026-08-07 · 사이트맵 확정(GNB 6개, 챔버 6카테고리 순서 고정)·Next.js 16 확정 반영*
