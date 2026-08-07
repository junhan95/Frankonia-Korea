# 원본 자료 — Company › Events

수집일: 2026-08-07
출처: https://frankonia-solutions.com/company/events/

---

## 1. 원본 페이지 구조

| # | 섹션 | 내용 |
|---|------|------|
| 0–1 | 타이틀 | "Events" |
| 2 | 안내문 | 본문 2문단 |
| 3 | 일정 목록 | The Events Calendar 위젯 — **현재 비어 있음** |
| 4 | CTA | "ANY QUESTIONS? …" |

## 2. 원문 (verbatim)

> To introduce you our products and solutions, and to improve the relationship
> with our customers and future customers all over the world, we regularly
> participate on events like exhibitions and seminars.

> If you are interested in our solutions and want to learn more about
> Frankonia's, please visit us at one of the following events:

두 번째 문단은 원문이 `about Frankonia's,` 로 끝난다(뒤 명사가 빠져 있다).
의미를 바꾸지 않기 위해 영문은 그대로 두고, 한국어는 "Frankonia에 대해"로 옮겼다.

### 2.1 일정 목록 — 비어 있음

위젯이 출력하는 문구:

> Es sind keine anstehenden Veranstaltungen vorhanden.
> ("예정된 행사가 없습니다." — 위젯 기본 문구가 독일어로 나온다)

**2026-08-07 현재 본사가 공개한 예정 행사가 없다.** 지어내지 않는다.
이 사이트는 `EmptyState`로 비워 두되, 안내문(§2)은 본사 원문으로 채운다.
지난 행사 아카이브도 원본에 없다.

## 3. 에셋

| 원본 URL | 원본 크기 | 프로젝트 경로 | 찍힌 것 |
|---|---|---|---|
| `/2019/05/Messe-Stuttgart-3.jpg` | 4032×3024 JPEG | `public/company/images/events-trade-fair-booth.webp` (1600×1200, 163KB) | 전시장 안 Frankonia 부스. 붉은 아치 게이트와 로고 월, 흰 전시대 위 EMC 계측기, 부스 번호 C2-315 |

파일명이 `Messe-Stuttgart`이고 EXIF 촬영일이 2019-03-19이지만, **사진 자체에서
읽히는 것은 부스 번호뿐이다.** 캡션에 전시회 이름과 연도를 쓰지 않았다 —
파일명은 근거로 삼기에 약하다.

## 4. 대응 관계 — 원본 → 이 사이트

| 원본 섹션 | 이 사이트 구현 | 컴포넌트 |
|---|---|---|
| 타이틀 + 안내문 | `PageShell` eyebrow + h1 + intro | `page-head` |
| 안내문 2문단 | 본문 좌 / 부스 사진 우 | `.trust` + `.figure` |
| 빈 일정 목록 | "예정된 행사 없음" + 문의 CTA | `EmptyState` |
| CTA 밴드 | `PageShell`이 이미 렌더 | `.band` |

`entries` 배열은 비어 있는 채로 남겨 둔다. 본사가 일정을 올리면 배열에 행만
채우면 되고 레이아웃은 그대로다.

## 5. 옮기지 않은 것

- 없음.

## 6. 이전 버전에서 걷어낸 것

- "Frankonia는 전 세계 EMC·자동차 전장 분야 전시회에 참가합니다" — 취지는
  맞지만 원본에 없는 창작 문구였다. §2의 본사 원문으로 교체했다.
