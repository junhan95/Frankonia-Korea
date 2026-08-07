# 원본 자료 — Company › Career

수집일: 2026-08-07
출처: https://frankonia-solutions.com/company/career/

⚠️ **이 페이지는 시간이 지나면 낡는다.** 채용 공고는 본사가 수시로 갈아 끼운다.
아래 §2.2 목록은 2026-08-07 시점의 스냅샷이다. 페이지를 손볼 일이 생기면
원본을 다시 열어 공고 목록부터 대조할 것.

---

## 1. 원본 페이지 구조

| # | 섹션 | 원본 마크업 | 내용 |
|---|------|------------|------|
| 0 | 공고 | `width_full` | "Frankonia Vacancies" + 안내문 + 두 그룹의 공고 목록 |
| 1–2 | 소개 | `height_small` / `height_auto` | "Career with Frankonia" + 본문 4문단 |
| 3 | CTA | `color_primary` | "INTERESTED TO WORK AT FRANKONIA? GET INFORMATION!" |
| 4 | 상시 지원 | `width_full` | "Frankonia Initiative Application" + 분야 6개 |
| 5 | 핵심 가치 | `height_medium` | "Core Values of Frankonia" — 4개 가치 × 4문장 |

## 2. 원문 (verbatim)

### 2.1 Frankonia Vacancies

> We are always looking for motivated people to join our team to increase our
> success on the international EMC market. If you are interested to work at
> Frankonia, submit your application to: jobs[at]frankoniagroup.com

**채용 문의 주소는 `jobs@frankoniagroup.com`** — 사이트 공통 주소인
`sales@frankoniagroup.com`과 다르다. `app/site-config.ts`의 `jobsEmail`이 이것이다.

### 2.2 공고 목록 (2026-08-07 스냅샷)

원본은 두 그룹으로 나눠 놓았다. 공고 제목은 독일어 원문 그대로다.

**Jobs, Headquarters Heideck**

| 공고 | 상세 PDF | 지원 페이지 |
|---|---|---|
| Technischer Zeichner oder Techniker (m/w/d) | `/wp-content/uploads/2025/11/2025-Technischer-Zeichner-Techniker.pdf` | `/career-techniker/` |
| Sales Manager im technischen Vertrieb (m/w/d) | `/wp-content/uploads/2026/02/2026-Sales-Manager.pdf` | `/career-sales-manager/` |

**Jobs, national und international**

| 공고 | 상세 PDF | 지원 페이지 |
|---|---|---|
| Obermonteur E-Technik (m/w/d) | `/wp-content/uploads/2025/11/2025-Obermonteur-E-Technik.pdf` | `/career-monteure/` |
| Obermonteur (m/w/d) | `/wp-content/uploads/2025/11/2025-Obermonteur.pdf` | `/career-monteure/` |
| Service Technician – EMC Chambers in India (m/w/d) | `/wp-content/uploads/2026/03/career-servicetechnician-india.pdf` | `/career-service-technician-india/` (영문) |

지원 페이지와 PDF는 **원본 사이트에 그대로 링크**한다. 이 사이트로 복사하지
않는 이유: 공고는 본사가 관리하는 살아 있는 데이터이고, 사본을 두면 마감된
공고가 이쪽에만 남는다.

### 2.3 Career with Frankonia

> The Frankonia Group is one of the international leading experts in EMC and has
> its expertise in the planning, production and delivery of complete EMC
> laboratory solutions that encompass Anechoic Chambers and Test Systems.

> Within this complex and high-tech EMC testing environment, our customers come
> from the electronic industries and industries as automotive, railway, avionics,
> etc. from all around the world.

> Our success is based on our motivated and dynamic team, working internationally
> with our premium customers and representatives.

> Frankonia offers various unique attributes in single products and complete
> solutions and is herewith the proven and preferred partner around the globe.
> Along with our values and goals, we invest in your education within the complex
> subject of EMC, rely on a long-term relationship with our staff and provides
> attractive conditions.

### 2.4 Frankonia Initiative Application

> If you are interested in working within this amazing and varied sector in our
> international business, feel free to send you initiative application. We always
> look for talents from several industries and with different backgrounds.

> Apply now proactive for Frankonia headquarters in Heideck!

분야 6개: Mechanical Engineering / Plant Engineering / Project Management /
Electrical Engineering / Installation / Service

> Send us your application to: jobs[at]frankoniagroup.com

### 2.5 Core Values of Frankonia

`/company/` 페이지에도 같은 블록이 있다. 두 곳의 문구는 동일하다.

**Ingenuity**
- We never stop pushing forward
- We look for advantage in everything
- We handle challenges with creativity
- We strive for simplicity

**Energy**
- We bring energy to everything we do
- We stay hungry and believe in what we do
- We are open to challenges and embrace opportunities
- We share the passion for what we do

**Community**
- We act fair and respectful
- We roll up our sleeves to get the job done
- We shape the future together
- We win as a team

**Fairness**
- We are open minded and curious
- We take responsibility for our actions
- We communicate with clarity and honesty
- We admit failures, learn and improve

## 3. 에셋

원본 Career 페이지에 이미지는 **없다**. 표·수치도 없다.

## 4. 대응 관계 — 원본 → 이 사이트

| 원본 섹션 | 이 사이트 구현 | 컴포넌트 |
|---|---|---|
| 타이틀 + 안내문 | `PageShell` eyebrow + h1 + intro | `page-head` |
| Career with Frankonia 4문단 | 본문 + 강조 문단 | `.sec-head` + `.prose` + `.callout` |
| 공고 목록 (그룹 2개) | 그룹 제목 + 행마다 헤어라인, 행 끝에 지원 링크 | `.hairline-list` / `.hl-row` / `.hl-action` |
| Core Values 4개 | 번호 붙은 4열 + 각 4문장 | `.value-grid` (신규) |
| Initiative Application | 분야 6개 체크 목록 + 상시 지원 CTA | `.check-list` + `.callout` |
| CTA 밴드 | `PageShell`이 이미 렌더 | `.band` |

## 5. 옮기지 않은 것

- 공고 상세 PDF 파일 자체 — 원본에 링크만 건다(§2.2 사유)
- 원본 중간의 붉은 CTA 밴드 — 문의 밴드는 페이지당 한 번

## 6. 이전 버전에서 걷어낸 것

이 페이지에는 원본에 없는 창작 문구가 있었다. 전부 삭제했다.

- 인재상 3개 — "정확함을 편드는 사람" / "현장에서 배우는 사람" /
  "언어의 경계를 넘는 사람". 본사의 실제 인재상은 §2.5 Core Values 4개다.
- "현재 공개 채용 공고가 없습니다" — 사실이 아니다. 본사는 지금 5건을 걸어 두고 있다.
