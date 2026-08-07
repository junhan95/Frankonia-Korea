<div align="center">

# Frankonia Korea

**EMC 챔버 · 시험 시스템 · CyberShield — 독일 Frankonia의 한국 공식 파트너 사이트.**

[www.frankonia-korea.com](https://www.frankonia-korea.com) 리뉴얼 프로젝트 —
챔버(Anechoic Chambers), EMC 시험 시스템, CyberShield 세 개의 축으로
한국·글로벌 고객을 위한 2개 언어(한국어·English) 사이트를 구축한다.

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Static export](https://img.shields.io/badge/output-static%20export-2ea44f)

### [한국어](https://junhan95.github.io/Frankonia-Korea/) · [English](https://junhan95.github.io/Frankonia-Korea/en/)

</div>

---

## What this is

Frankonia Korea 리뉴얼 사이트의 소스와 기획 문서를 담은 레포지토리.
랜딩 페이지는 정적 HTML로 프리렌더되어 GitHub Pages(스테이징)에서 서빙되며,
정식 오픈 시 www.frankonia-korea.com 도메인으로 이전한다.

| Route | Locale | Page |
|---|---|---|
| [`/`](https://junhan95.github.io/Frankonia-Korea/) | 한국어 | Landing |
| [`/en/`](https://junhan95.github.io/Frankonia-Korea/en/) | English | Landing |

## Highlights

**Bilingual from one component.** 모든 문구는 `app/landing.tsx`의 `copy` 객체에
로케일 키로 정리되어 있어 KO / EN 페이지가 하나의 트리에서 렌더된다
([CyberShield](https://github.com/junhan95/CyberShield) 레포와 같은 패턴).
독일어는 개발 속도를 위해 제외했고, `copy`에 `de` 키를 다시 추가하면 복구된다.
로케일별 `<html lang>`을 서버 HTML에 그대로 담기 위해 `(ko)` / `(en)` 라우트 그룹이
각자의 루트 레이아웃을 갖는다 — 그룹은 URL에 나타나지 않으므로 경로는 `/`, `/en/` 그대로다.

**Design tokens, measured not guessed.** 색·타이포·간격·버튼 규격은 frankonia-cybershield.com을
실측해 문서화한 [`docs/FRANKONIA-DESIGN-REFERENCE.md`](docs/FRANKONIA-DESIGN-REFERENCE.md)의
토큰을 그대로 사용한다 — 브랜드 레드 `#E60000`, 잉크 `#25282B`, 필(pill) 버튼,
ExtraBold 대문자 헤드라인 + Light 섹션 제목의 굵기 대비.

**Chamber order is data, not markup.** 챔버 6개 카테고리(Automotive → Military →
Commercial → Powertrain → RVC → Others)는 사이트맵에서 순서가 고정되어 있고,
카드 배열이 그 순서를 그대로 렌더한다.

**CyberShield links out.** CyberShield는 내부 페이지 없이 GNB·카드·푸터에서
[frankonia-cybershield.com](https://www.frankonia-cybershield.com/)으로 새 창 연결된다.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Runtime | React 19 · TypeScript 5.9 |
| Styling | Hand-written CSS in `app/globals.css` (디자인 레퍼런스 토큰) |
| Hosting | GitHub Pages (staging, static export) → www.frankonia-korea.com (launch) |

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

To reproduce the production build exactly — including the `/Frankonia-Korea` base path
that GitHub Pages needs baked in at build time:

```bash
npm run build:static
```

Output lands in `out/`.

> **On Windows, run that from PowerShell rather than Git Bash.** Git Bash rewrites
> `/Frankonia-Korea` into a Windows path and the build fails with an invalid `basePath`.

## Layout

```
app/
  (ko)/              # /  ·  /cybershield/        <html lang="ko">
  (en)/en/           # /en/  ·  /en/cybershield/  <html lang="en">
  root-shell.tsx     # the <html>/<body> shell both root layouts render
  landing.tsx        # the whole landing page, and all copy keyed by locale
  cybershield-content.tsx
  site-header.tsx    # sticky nav + mobile drawer (the only client component)
  site-footer.tsx
  site-config.ts     # base path, locale table, asset/route/localeRoute helpers
  site-metadata.ts   # title, description, robots, hreflang, OG — every page
  sitemap.ts robots.ts
  globals.css        # design tokens + all styles
docs/
  Frankonia-Korea-웹사이트-리뉴얼-기획서.docx   # 리뉴얼 기획서 v2
  FRANKONIA-WEB-PLAN.md                        # 라우팅·페이지·컴포넌트 상세 기획
  FRANKONIA-DESIGN-REFERENCE.md                # 디자인 토큰 단일 기준 문서
mockup/
  frankonia-korea-landing.html                 # 단일 파일 HTML 시안 (v3)
```

## Roadmap

`docs/FRANKONIA-WEB-PLAN.md`의 8주 마일스톤을 따른다. 현재 단계는 **랜딩 페이지 이식
완료** — 다음은 Chambers 개요·카테고리 6페이지와 Test Systems 3페이지 (템플릿 재사용),
Company / Contact(폼) / Career, 그리고 모델 상세 페이지 순.

## Deployment

Pushing to `main` triggers [`deploy-pages.yml`](.github/workflows/deploy-pages.yml), which
runs the static export and publishes `out/` to GitHub Pages. There is no manual step.

## Notes

- 제품 정보는 [frankonia-solutions.com](https://frankonia-solutions.com/)의 공개 자료를
  기반으로 하며, 사양·인증 범위는 프로젝트 구성에 따라 달라진다.
- 스테이징(깃허브 페이지) 단계에서는 검색엔진 인덱싱을 막아 두었다
  (`NEXT_PUBLIC_INDEXABLE`, `app/site-config.ts` 참조). 정식 도메인 오픈 시 해제한다.

---

<div align="center">
<sub>© 2026 Frankonia Korea · Reference: <a href="https://github.com/junhan95/CyberShield">junhan95/CyberShield</a></sub>
</div>
