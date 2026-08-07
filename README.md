<div align="center">

# Frankonia

**EMC 무향 챔버 · 시험 시스템 · CyberShield — Frankonia 웹사이트 리뉴얼 시안.**

[frankonia-solutions.com](https://frankonia-solutions.com/) 의 콘텐츠를 기준으로
정보 구조와 디자인을 다시 짠 **본사 사이트 리뉴얼 제안**이다.
한국어 · English 두 개 로케일, 로케일당 42페이지를 정적 HTML로 프리렌더한다.

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Static export](https://img.shields.io/badge/output-static%20export-2ea44f)
![Pages](https://img.shields.io/badge/pages-84-25282B)

### [한국어](https://junhan95.github.io/Frankonia-Korea/) · [English](https://junhan95.github.io/Frankonia-Korea/en/)

</div>

---

## What this is

리뉴얼 시안의 소스와 기획 문서를 담은 레포지토리. 별도의 한국 지사 사이트가 아니라
**본사 웹사이트를 다시 만든 것**이므로, 카피·섹션·구조는 모두 본사 기준의 글로벌
브랜드 내러티브를 따른다. 빌드 결과는 정적 HTML이라 서버가 필요 없고, 현재는
GitHub Pages(스테이징)에서 서빙되며 검토가 끝나면 정식 도메인으로 이전한다.

## The site

여섯 개 GNB — Company · Anechoic Chambers · EMC Test Systems · CyberShield ·
Contact · Career. 로케일당 42페이지, 합계 84페이지.

| Branch | Pages | 무엇이 있는가 | 상태 |
|---|---|---|---|
| Landing | 1 | 히어로, 세 개 제품 축 요약, 레퍼런스, 컨택 밴드 | 완성 |
| Company | 5 | Philosophy · History · Publications · Events · Career | 완성 |
| Anechoic Chambers | 15 | 개요 + 산업 5 + 챔버 형태 6 + 기술 4 (FrankoSorb · 차폐 게이트 · 자동화 · 서비스) + References | 골격 |
| EMC Test Systems | 17 | 개요 + 산업 5 + 시험 종류 4 + 제품군 6 + 규격 인덱스 | 골격 |
| CyberShield | 1 | 제품 페이지 전문을 이 사이트의 헤더·푸터 안에서 렌더 | 완성 |
| Downloads | 1 | 카탈로그·포토북·인증서 허브 | 골격 |

**"골격"이 뜻하는 것.** 라우트 · 분류 축 · 메타데이터 · 브레드크럼 · 모델 목록은
실제 데이터다 — 챔버 27종과 시험 시스템 36개 제품은 이름과 한 줄 설명까지, 24개
규격은 산업군별로 묶여 각자의 산업 페이지로 이어진다. 없는 것은 **그 위에 올라갈
본문·사양표·사진**이고, 해당 페이지들은 "콘텐츠 준비 중입니다" 밴드와 자료 요청
링크를 달아 그 사실을 읽는 사람에게 그대로 말한다. 본사 원본을 정리하는 대로 이
밴드가 있는 자리를 채우면 된다.

## Highlights

**Two indexes over one list, not two lists.** 챔버 27개 모델과 시험 시스템 36개
제품·24개 규격은 각각 `chamber-sections.ts` / `test-system-sections.ts`의 배열
하나에 들어 있고, 산업별·형태별·시험별·제품군별 인덱스 페이지는 전부 그 배열을
거른 결과다. 모델을 하나 추가하는 일은 항목 하나를 넣는 일이지 페이지를 만드는
일이 아니다. 두 branch의 산업 축은 같은 다섯 개로 맞췄다 — 자동차 고객은 양쪽에서
사는데, 그러려고 분류 체계를 두 번 배울 이유가 없다.

**Bilingual from one component.** 모든 문구는 로케일 키로 정리된 `copy` 객체에
있고 KO / EN 페이지가 하나의 트리에서 렌더된다. 로케일별 `<html lang>`을 서버
HTML에 그대로 담기 위해 `(ko)` / `(en)` 라우트 그룹이 각자의 루트 레이아웃을
갖는다 — 그룹은 URL에 나타나지 않으므로 경로는 `/`, `/en/` 그대로다. 독일어는
개발 속도를 위해 제외했고, `copy`에 `de` 키를 다시 추가하면 복구된다.

**Nothing is fetched off this origin.** Inter와 Noto Sans KR은 빌드 시점에 받아
export에 함께 실린다([`app/fonts.ts`](app/fonts.ts)). 방문자 IP가 Google로 가지
않으므로 독일에서 운영하는 사이트가 감수할 이유가 없는 GDPR 논쟁이 사라지고,
`@import`가 만들던 왕복 한 번도 없어진다. 두 폰트 모두 가변 폰트라 유니코드 범위당
파일 하나가 300~800 굵기를 전부 담당하며, 브라우저는 그 페이지에 실제로 쓰인 범위만
받는다 — 랜딩 267KB, CyberShield 340KB.

**Design tokens, measured not guessed.** 색·타이포·간격·버튼 규격은
[`docs/FRANKONIA-DESIGN-REFERENCE.md`](docs/FRANKONIA-DESIGN-REFERENCE.md)에
실측해 기록한 토큰을 그대로 쓴다 — 브랜드 레드 `#E60000`, 잉크 `#25282B`,
필(pill) 버튼, ExtraBold 대문자 헤드라인과 Light 섹션 제목의 굵기 대비.

**A nav wide enough for the catalogue.** Chambers 한 갈래만 15개 링크다. 216px
단일 컬럼 패널에 넣으면 아무도 읽지 않는 목록이 되므로, 두 branch는 축마다 제목이
붙은 3단 패널과 그 아래 유틸리티 행(전체 모델·References·Downloads)을 쓴다.
모바일에서는 같은 컬럼이 네이티브 `<details>`로 접힌다 — 하이드레이션 전에도
동작하고 키보드도 알아서 받는다.

**CyberShield keeps the chrome.** 제품 사이트는 `X-Frame-Options: SAMEORIGIN`과
`frame-ancestors 'self'`를 보내고 CORS 헤더가 없어 다른 오리진에서 iframe도 fetch도
불가능하다. 그래서 제품 페이지를 `app/cybershield/`에 포팅해 이 사이트의 헤더·푸터
안에서 직접 렌더하고, 전체 사양과 룸 구성기만
[frankonia-cybershield.com](https://www.frankonia-cybershield.com/)으로 이어진다
(현재 창, 로케일 매칭 — KO는 `/ko/`).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Runtime | React 19 · TypeScript 5.9 |
| Styling | 손으로 쓴 CSS (`app/globals.css`), 디자인 레퍼런스 토큰 |
| Hosting | GitHub Pages (staging, static export) → 정식 도메인 (launch) |

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

GitHub Pages가 필요로 하는 `/Frankonia-Korea` base path까지 포함해 프로덕션
빌드를 그대로 재현하려면:

```bash
npm run build:static
```

결과는 `out/`에 떨어진다. 빌드 변수는
[`scripts/staging-env.mjs`](scripts/staging-env.mjs)에 있고 Node에서 주입되므로
Windows와 Linux에서 같은 명령이 동작한다.

```bash
npm run lint
npm test
```

`npm test`는 정적 export를 먼저 만든 뒤 **실제로 생성된 HTML에** 15개 항목을
검사한다 — 84페이지 전수로 스테이징 `noindex`가 붙어 있는지, `<html lang>`이
경로의 로케일과 맞는지, canonical · hreflang · `og:image`가 맞는지, sitemap이
디스크 위의 페이지 목록과 정확히 일치하는지, 그리고 export에 없는 파일을 가리키는
내부 링크가 하나도 없는지. 검사 항목은 전부 한 번씩 실제로 깨졌던 것들이다.

## Layout

```
app/
  (ko)/              # /  ·  /chambers/*  ·  /test-systems/*  ·  /company/*   <html lang="ko">
  (en)/en/           # 같은 트리, /en 아래                                     <html lang="en">
  root-shell.tsx     # 두 루트 레이아웃이 공유하는 <html>/<body> 셸
  landing.tsx        # 랜딩 페이지 전체와 로케일별 카피
  chamber-sections.ts     # 챔버 27개 모델 · 산업/형태/기술 축 · 라우트 표
  chamber-content.tsx     # Chambers branch 15페이지 + Downloads 허브
  test-system-sections.ts # 제품 36개 · 규격 24개 · 산업/시험/제품군 축
  test-system-content.tsx # Test Systems branch 17페이지
  industries.ts           # 두 branch가 공유하는 산업 분류
  company-sections.ts     # slug 순서, 내비 라벨, meta description — 단일 출처
  company-content.tsx     # Company 5페이지
  cybershield/            # 제품 사이트에서 포팅한 랜딩 + 스코프된 스타일시트
  cybershield-content.tsx # 그 포팅본을 이 사이트의 크롬 안에 넣는 래퍼
  site-header.tsx    # 스티키 GNB + 메가 패널 + 모바일 드로어 (유일한 클라이언트 컴포넌트)
  site-footer.tsx
  page-shell.tsx     # 랜딩이 아닌 모든 페이지의 크롬
  structured-data.tsx  # JSON-LD: Organization, WebSite, WebPage, Product, BreadcrumbList
  site-config.ts     # base path, 로케일 표, asset/route/localeRoute 헬퍼
  site-metadata.ts   # title, description, robots, hreflang, OG — 모든 페이지
  sitemap.ts robots.ts
  globals.css        # 디자인 토큰 + 전체 스타일
deploy/
  deploy.py          # 빌드 + 업로드를 한 번에
  upload.py          # out/ SFTP 푸시, 오래된 파일 정리 포함
  htaccess           # 정규 호스트, 보안 헤더, 캐시 정책
scripts/             # 스테이징 빌드 변수(테스트와 공유), CyberShield CSS 스코핑
tests/               # 렌더된 HTML에 대한 검사
docs/
  Frankonia-Korea-웹사이트-리뉴얼-기획서.docx   # 리뉴얼 기획서 v2
  FRANKONIA-WEB-PLAN.md                        # 라우팅·페이지·컴포넌트 상세 기획
  FRANKONIA-DESIGN-REFERENCE.md                # 디자인 토큰 단일 기준 문서
  source/                                      # 본사 원문 발췌 (페이지별 출처 기록)
mockup/
  frankonia-korea-landing.html                 # 단일 파일 HTML 시안 (v3)
```

## Deployment

세 단계다: 로컬 확인 → GitHub Pages 스테이징 → 정식 도메인.

**Staging.** `main`에 푸시하면 [`deploy-pages.yml`](.github/workflows/deploy-pages.yml)이
lint → 정적 빌드 → 렌더된 HTML 테스트를 거쳐 `out/`을 GitHub Pages에 배포한다. 테스트가
깨지면 배포되지 않는다. 수동 단계는 없다.

**Production.** `.env.example`을 `.env`로 복사해 SFTP 자격증명을 채우고, 접속할
서버의 호스트 키를 한 번 기록한 뒤:

```bash
ssh-keyscan -p 22 <SFTP_HOST> >> deploy/known_hosts
```

```bash
pip install paramiko
python deploy/deploy.py
```

업로드는 **호스트 키가 확인되지 않으면 아무것도 보내지 않고 중단한다** — 기록된 키와
다르면 서버 재구축인지 중간자인지 확인하기 전에는 진행하지 않는다. `known_hosts`를
둘 수 없는 환경(CI)에서는 `SFTP_HOST_FINGERPRINT`에 지문을 고정하면 된다. 어느
쪽이든 지문은 호스팅 사업자가 공표한 값과 대조해야 한다 — 검증하려는 그 연결에서
읽어낸 값은 아무것도 증명하지 못한다. 자격증명은 키(`SFTP_KEY`)를 권장하고,
비밀번호(`SFTP_PASS`)는 그것만 허용하는 호스트를 위해 남겨 두었다.

빌드(base path 없음, `NEXT_PUBLIC_INDEXABLE=1`)와 업로드를 한 번에 수행하며, 빌드가
실패하면 업로드하지 않는다. 업로드는 스테이징용 빌드가 섞여 들어가는 것을 막고
(`/Frankonia-Korea/_next/` 또는 `noindex`가 보이면 중단), 사이트 파일을 먼저 올린 뒤
[`deploy/htaccess`](deploy/htaccess)를 마지막에 올린다 — 정규 호스트 301, CSP · HSTS ·
`X-Content-Type-Options` 등 보안 헤더, 자산별 캐시 정책이 여기 들어 있다. GitHub Pages는
헤더를 설정할 수 없으므로 이 파일은 정식 도메인에서만 효력이 있다.

## Open items

정식 오픈 전에 반드시 처리해야 하는 것들. 순서는 대략 급한 순이다.

- **법적 고지 페이지가 없다.** 독일 법인이 운영하는 사이트에는 Impressum(TMG §5)과
  개인정보처리방침이 필요하다. 현재 두 페이지 모두 없다.
- **HSTS `includeSubDomains`가 2년으로 걸려 있다.** [`deploy/htaccess`](deploy/htaccess).
  HTTP로만 서비스되는 서브도메인이 하나라도 있으면 배포 즉시 끊기고, 브라우저에
  캐시되므로 되돌릴 수 없다. 정식 도메인 배포 전 서브도메인을 전수 확인해야 한다.
- **Chambers · Test Systems 32페이지의 본문이 비어 있다.** 위 표의 "골격" — 분류와
  모델 목록은 서 있고 사양·설명·사진이 아직 없다. `docs/source/`에 Company를 정리한
  것과 같은 방식으로 본사 원본을 페이지별로 옮기는 작업이 남았다.
- **Downloads에 파일이 없다.** 내비게이션 세 곳이 이 페이지를 가리킨다.
- **Contact가 페이지가 아니라 앵커다.** 기획서 §3.7의 견적·기술 문의 폼은 아직 없고,
  랜딩의 `#contact` 밴드에서 `mailto:`로 연결된다.
- **모델 상세 페이지가 없다.** 27 + 36개 모델은 인덱스에 이름과 사양 요약까지만
  나오고, 각자의 페이지는 아직 없다 (기획서 §3.5).
- **페이지당 JS 186KB(gzip)는 거의 전부 프레임워크다.** 헤더에서 딸려 오던 내비
  데이터는 걷어냈지만(650 → 622KB, gzip 194 → 186KB), 남은 것은 react-dom 222KB와
  App Router 런타임이다. 사실상 정적인 사이트가 이만큼을 싣는 것은 Next의 하이드
  레이션 모델을 쓰는 대가이고, 여기서 더 줄이려면 프레임워크를 바꿔야 한다 —
  리팩터링으로 해결되는 항목이 아니라는 뜻이다.
- **CyberShield 페이지만 100KB를 더 싣는다.** 이식해 온
  [`app/cybershield/landing.tsx`](app/cybershield/landing.tsx)가 `useEffect` 3개와
  문의 폼 상태 때문에 통째로 클라이언트 컴포넌트다. 헤더에 한 것과 같은 방식으로
  섹션을 서버로 내리고 인터랙션만 남기면 줄어들지만, 이 파일은 제품 사이트에서
  재동기화할 수 있게 원본 구조를 유지하는 것이 설계 의도라 그 편익과 맞바꿔야 한다.

## Notes

- 제품 정보는 [frankonia-solutions.com](https://frankonia-solutions.com/)의 공개 자료를
  기반으로 하며, 사양·인증 범위는 프로젝트 구성에 따라 달라진다. 페이지별 원문 출처는
  `docs/source/`에 기록되어 있다.
- 스테이징(깃허브 페이지) 단계에서는 검색엔진 인덱싱을 막아 두었다
  (`NEXT_PUBLIC_INDEXABLE`, `app/site-config.ts` 참조). 정식 도메인 오픈 시 해제한다.
  `noindex`는 접근 제어가 아니다 — 스테이징 URL 자체는 공개되어 있다.

---

<div align="center">
<sub>© 2026 Frankonia · Reference: <a href="https://github.com/junhan95/CyberShield">junhan95/CyberShield</a></sub>
</div>
