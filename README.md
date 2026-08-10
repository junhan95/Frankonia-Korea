<div align="center">

# Frankonia

**EMC 무향 챔버 · 시험 시스템 · CyberShield — Frankonia 웹사이트 리뉴얼 시안.**

[frankonia-solutions.com](https://frankonia-solutions.com/) 의 콘텐츠를 기준으로
정보 구조와 디자인을 다시 짠 **본사 사이트 리뉴얼 제안**이다.
English · 한국어 두 개 로케일, 로케일당 44페이지를 정적 HTML로 프리렌더한다.

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Static export](https://img.shields.io/badge/output-static%20export-2ea44f)
![Pages](https://img.shields.io/badge/pages-88-25282B)

### [English](https://junhan95.github.io/Frankonia-Korea/) · [한국어](https://junhan95.github.io/Frankonia-Korea/ko/)

</div>

---

## What this is

리뉴얼 시안의 소스와 기획 문서를 담은 레포지토리. 별도의 한국 지사 사이트가 아니라
**본사 웹사이트를 다시 만든 것**이므로, 카피·섹션·구조는 모두 본사 기준의 글로벌
브랜드 내러티브를 따른다. 빌드 결과는 정적 HTML이라 서버가 필요 없고, 현재는
GitHub Pages(스테이징)에서 서빙되며 검토가 끝나면 정식 도메인으로 이전한다.

## The site

여섯 개 GNB — Company · Anechoic Chambers · EMC Test Systems · CyberShield ·
Contact · **MyChamber**. 로케일당 45페이지, 합계 90페이지.

Career는 GNB에서 내려 Company 드롭다운으로 돌아갔다. 그 자리는 챔버를 사러 온
사람에게 더 값이 나가는 자리이고, 이 사이트가 할 일은 사양을 견적으로 옮기는
것이다. 페이지 자체는 그대로 있고 Company 메뉴와 푸터에서 이어진다.

| Branch | Pages | 무엇이 있는가 | 상태 |
|---|---|---|---|
| Landing | 1 | 히어로, 세 개 제품 축 요약, 레퍼런스, 컨택 밴드 | 완성 |
| MyChamber | 1 | 질문 4~6개로 챔버 32종을 좁히고, 결과를 그대로 견적 메일로 | 완성 |
| Company | 5 | Philosophy · History · Publications · Events · Career | 완성 |
| Anechoic Chambers | 15 | 개요 + 산업 5 + 챔버 형태 6 + 기술 4 (FrankoSorb · 차폐 게이트 · 자동화 · 서비스) + References | 골격 |
| EMC Test Systems | 17 | 개요 + 산업 5 + 시험 종류 4 + 제품군 6 + 규격 인덱스 | 골격 |
| CyberShield | 1 | 요약 — 위협·PAN 시스템·제품군 6·측정과 표준·적용 분야, 그리고 제품 사이트로 넘기는 링크 | 완성 |
| Contact | 1 | 사업장 5곳(독일 2 · 중국 · 인도 · 한국)의 주소·메일·전화 + 문의에 담을 세 가지 | 완성(폼 없음) |
| Downloads | 1 | 카탈로그·포토북·인증서 허브 | 골격 |
| Legal | 2 | Imprint(TMG §5) · Privacy Policy(GDPR 제13조) | 완성 |

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

**MyChamber — 하드 필터 뒤에 가중치 채점.** 32종을 고르는 일을 결정 트리로 짜면
산업 × 시험 × 크기 × 거리 × 규격의 조합마다 가지가 하나씩 필요한데, 카탈로그가
그렇게 갈라지지 않는다 (MIL-STD Chamber Advanced는 군용이면서 상용·자동차
시험장 요건을 만족하고, CTC는 Commercial에 걸려 있으면서 자동차·군용 부품용이다).
그래서 `mychamber-advisor.ts`는 두 단계로 나눈다 — **물리적으로 불가능한 것**
(피시험체보다 작은 챔버, 정식 방사 방출을 요구받은 잔향실, 3m 챔버에 10m 측정,
부하기 구성이 다른 E-Drive 챔버)은 하드 필터로 아예 빼고, 남은 것에 가중치를
매겨 순위와 **그 순위의 이유**를 함께 낸다. 1위 점수의 절반에 못 미치는 결과는
"대안" 자리를 채우려고 끼워 넣지 않는다. 표준 모델로 답이 안 나오면 빈 목록이
정답이고, 페이지는 맞춤 설계 문의로 넘긴다.

질문은 다섯 가지 사실만 묻는다 — 산업, 시험, 피시험체 크기, 측정 거리, 부하기
구성. 앞의 셋은 모두에게, 뒤의 둘은 해당되는 사람에게만 (측정 거리는 **방사
방출**을 고른 뒤에야, 부하기는 Powertrain을 고른 뒤에야 나타난다). 규격은
마지막에 앞선 답에서 역산해 미리 체크해 두고, 건너뛸 수 있게 두었다. 최단 4문항,
최장 6문항.

**전송하지 않는 견적 문의.** 정적 배포라 백엔드가 없고, 외부 폼 서비스로 보내면
고객의 프로젝트 내용이 고객도 Frankonia도 고르지 않은 곳에 남는다. 그래서 답변과
추천 결과를 `mailto:` 본문으로 조립한다 — 읽는 사람의 메일 앱이 본문이 다 쓰인
채로 열리고, 보내기 전에 본인이 읽는다. 이 페이지는 아무것도 저장하지 않는다.

**Bilingual from one component.** 모든 문구는 로케일 키로 정리된 `copy` 객체에
있고 KO / EN 페이지가 하나의 트리에서 렌더된다. 로케일별 `<html lang>`을 서버
HTML에 그대로 담기 위해 `(en)` / `(ko)` 라우트 그룹이 각자의 루트 레이아웃을
갖는다 — 그룹은 URL에 나타나지 않으므로 경로는 `/`, `/ko/` 그대로다. **영어가
루트를 갖고 한국어가 `/ko`에 붙는다**: 본사 사이트이고 도메인만 치고 들어온
방문자는 영어로 받는 것이 맞다. 어느 로케일이 루트를 갖는지는
`app/site-config.ts`의 `languages` 표 네 번째 필드 하나가 정하며, 그 밖에
하드코딩된 곳은 없다. 독일어는 개발 속도를 위해 제외했고, `copy`에 `de` 키를
다시 추가하면 복구된다.

**Nothing is fetched off this origin.** Inter와 Noto Sans KR은 빌드 시점에 받아
export에 함께 실린다([`app/fonts.ts`](app/fonts.ts)). 방문자 IP가 Google로 가지
않으므로 독일에서 운영하는 사이트가 감수할 이유가 없는 GDPR 논쟁이 사라지고,
`@import`가 만들던 왕복 한 번도 없어진다. 두 폰트 모두 가변 폰트라 유니코드 범위당
파일 하나가 300~800 굵기를 전부 담당하며, 브라우저는 그 페이지에 실제로 쓰인 범위만
받는다 — 랜딩 267KB. (함께 적어 두었던 CyberShield 340KB는 걷어낸 포팅본을 잰
값이라 삭제했다. 요약본 수치는 다시 재야 한다.)

**Design tokens, measured not guessed.** 색·타이포·간격·버튼 규격은
[`docs/FRANKONIA-DESIGN-REFERENCE.md`](docs/FRANKONIA-DESIGN-REFERENCE.md)에
실측해 기록한 토큰을 그대로 쓴다 — 브랜드 레드 `#E60000`, 잉크 `#25282B`,
필(pill) 버튼, ExtraBold 대문자 헤드라인과 Light 섹션 제목의 굵기 대비.

**A nav wide enough for the catalogue.** Chambers 한 갈래만 15개 링크다. 216px
단일 컬럼 패널에 넣으면 아무도 읽지 않는 목록이 되므로, 두 branch는 축마다 제목이
붙은 3단 패널과 그 아래 유틸리티 행(전체 모델·References·Downloads)을 쓴다.
모바일에서는 같은 컬럼이 네이티브 `<details>`로 접힌다 — 하이드레이션 전에도
동작하고 키보드도 알아서 받는다.

**CyberShield summarises and hands over.** 이 라우트는 한동안 제품 페이지 전문을
포팅해 렌더했다(`app/cybershield/`, 약 3,200줄 + 전용 스타일시트). 본사 요청에 따라
요약본으로 바꾸고 포팅본은 걷어냈다 — 제품팀이 소유·수정하는 수치와 규격의 사본을
이쪽에 두면 제품 사이트가 바뀌는 순간 전부 낡은 문장이 된다. 지금은 이 사이트의
밴드로 쓴 요약 한 장이 남고, 주장을 하는 밴드마다
[frankonia-cybershield.com](https://www.frankonia-cybershield.com/)으로 나가는 링크가
붙는다 (새 탭, 로케일 매칭 — KO는 `/ko/`). 새 탭은 2026-08-11 본사 요청으로 기획서
원문("현재 창에서")을 뒤집은 것이다 — 그 문장은 이 라우트가 제품 페이지 자체였을 때
쓰였고, 지금은 뒤에 돌아올 요약본이 남는다.

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

`npm test`는 정적 export를 먼저 만든 뒤 **실제로 생성된 HTML에** 16개 항목을
검사한다 — 88페이지 전수로 스테이징 `noindex`가 붙어 있는지, 루트가 영어이고
한국어가 `/ko` 아래에 있는지, `<html lang>`이 경로의 로케일과 맞는지, canonical · hreflang · `og:image`가 맞는지, sitemap이
디스크 위의 페이지 목록과 정확히 일치하는지, 그리고 export에 없는 파일을 가리키는
내부 링크가 하나도 없는지. 검사 항목은 전부 한 번씩 실제로 깨졌던 것들이다.

## Layout

```
app/
  (en)/              # /  ·  /chambers/*  ·  /test-systems/*  ·  /company/*   <html lang="en">
  (ko)/ko/           # 같은 트리, /ko 아래                                     <html lang="ko">
  root-shell.tsx     # 두 루트 레이아웃이 공유하는 <html>/<body> 셸
  landing.tsx        # 랜딩 페이지 전체와 로케일별 카피
  chamber-sections.ts     # 챔버 27개 모델 · 산업/형태/기술 축 · 라우트 표
  chamber-content.tsx     # Chambers branch 15페이지 + Downloads 허브
  test-system-sections.ts # 제품 36개 · 규격 24개 · 산업/시험/제품군 축
  test-system-content.tsx # Test Systems branch 17페이지
  mychamber-sections.ts   # MyChamber 라우트 + 라벨 (헤더가 읽는 것은 이것뿐)
  mychamber-advisor.ts    # 질문지 · 32종 적합도 인덱스 · 추천 엔진
  mychamber-wizard.tsx    # 질문 UI와 견적 메일 조립 — 클라이언트
  mychamber-content.tsx   # 카탈로그와 적합도 인덱스를 조인해 위저드에 넘긴다
  industries.ts           # 두 branch가 공유하는 산업 분류
  company-sections.ts     # slug 순서, 내비 라벨, meta description — 단일 출처
  company-content.tsx     # Company 5페이지
  cybershield-content.tsx # CyberShield 요약 1페이지 + 제품 사이트로 나가는 링크
  site-header.tsx    # 스티키 GNB + 메가 패널 (서버 컴포넌트)
  nav-drawer.tsx     # 모바일 드로어의 상태 — 클라이언트, 마크업은 서버에서 받는다
  lang-switch.tsx    # 언어 스위처 — 현재 경로를 알아야 해서 클라이언트
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
scripts/             # 스테이징 빌드 변수(테스트와 공유), 정적 빌드 러너
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

- **법적 고지 두 페이지가 법률 검토를 받지 않았다.** `/imprint`와 `/privacy`는 있다 —
  임프린트는 본사 원문을 그대로 옮겼고(19개 항목 기계 대조, 불일치 0), 개인정보처리방침은
  본사 문안을 복사하는 대신 **이 사이트가 실제로 하는 일을 측정해서** 썼다(본사 방침은
  쿠키·분석·뉴스레터·서버 폼을 전제하는데 이 사이트엔 넷 다 없다 — 그대로 옮기면 허위
  기재가 된다). 다만 법률 자문을 받은 문서는 아니므로 정식 도메인 이전 전 본사 법무
  확인이 필요하고, **서버 로그 보존 기간**과 **호스팅 수탁자 표기**는 아직 비어 있다.
  경위는 [`docs/source/legal.md`](docs/source/legal.md).
- **HSTS `includeSubDomains`가 2년으로 걸려 있다.** [`deploy/htaccess`](deploy/htaccess).
  HTTP로만 서비스되는 서브도메인이 하나라도 있으면 배포 즉시 끊기고, 브라우저에
  캐시되므로 되돌릴 수 없다. 정식 도메인 배포 전 서브도메인을 전수 확인해야 한다.
- **Chambers · Test Systems 32페이지의 본문이 비어 있다.** 위 표의 "골격" — 분류와
  모델 목록은 서 있고 사양·설명·사진이 아직 없다. `docs/source/`에 Company를 정리한
  것과 같은 방식으로 본사 원본을 페이지별로 옮기는 작업이 남았다.
- **Others 카테고리 카드에 쓸 이미지가 본사에 없다.** 지금은 아이콘 타일로 두었다.
  본사에서 CTC나 Reverberation Tent 사진을 받으면 그 자리에 넣으면 된다 —
  자세한 사정은 [`docs/source/chambers-assets.md`](docs/source/chambers-assets.md).
- ~~**랜딩의 시험장비 3카드가 Test Systems 분류와 어긋난다.**~~ 2026-08-11 해소.
  카드를 본사의 6개 제품군(앰프·안테나·전계강도계·프리앰프·파워미터·통합시스템)
  그대로로 바꾸고, 페이지가 없는 `ERX-6 · ERC-6`을 걷어냈다. 각 카드는 자기 제품군
  페이지로 가고, 모델 줄은 그 페이지가 실제로 인쇄하는 모델만 댄다. 아이콘 자리에는
  제품 사진이 들어갔다 — 앰프 사진만 본사 웹에 없어 2019 Selection Book 18쪽에서
  잘라 왔고, 경위는 [`docs/source/test-systems-assets.md`](docs/source/test-systems-assets.md).
- **Downloads에 파일이 없다.** 내비게이션 세 곳이 이 페이지를 가리킨다.
- ~~**Contact가 페이지가 아니라 앵커다.**~~ 2026-08-11 절반 해소. `/contact`가 생겼고
  헤더·모바일 드로어·푸터·상단 CTA·히어로·전 페이지 마감 밴드가 전부 이 페이지를
  가리킨다. 본사가 자기 Contact 페이지에 싣는 4개 법인에 **한국 사업장(Frankonia Korea
  EMC Solutions)** 을 더한 다섯 곳의 주소·메일·전화가 한 목록에 있다. 남은 것은
  **기획서 §3.7의 서버 폼** — 정적 export라 Server Action·Resend·Turnstile을 쓸 수
  없으므로, 폼을 넣으려면 외부 폼 엔드포인트를 붙이거나 호스팅을 옮겨야 한다.
  현재는 전부 `mailto:`/`tel:` 링크다.
- **한국 사업장 주소가 없다.** `/contact`의 한국 행은 메일과 전화만 싣고 주소 자리에는
  "주소 준비 중"을 인쇄한다 (`app/contact-sections.ts`의 `address: null`). 주소가 확정되면
  그 한 필드만 채우면 된다.
- **모델 상세 페이지가 없다.** 27 + 36개 모델은 인덱스에 이름과 사양 요약까지만
  나오고, 각자의 페이지는 아직 없다 (기획서 §3.5).
- **페이지당 JS 186KB(gzip)는 거의 전부 프레임워크다.** 헤더에서 딸려 오던 내비
  데이터는 걷어냈지만(650 → 622KB, gzip 194 → 186KB), 남은 것은 react-dom 222KB와
  App Router 런타임이다. 사실상 정적인 사이트가 이만큼을 싣는 것은 Next의 하이드
  레이션 모델을 쓰는 대가이고, 여기서 더 줄이려면 프레임워크를 바꿔야 한다 —
  리팩터링으로 해결되는 항목이 아니라는 뜻이다.
- **CyberShield 요약본은 제품 사이트를 따라가지 않는다.** 수치와 규격은 제품
  페이지에서 옮겨 적은 것이라, 저쪽이 바뀌면 이쪽은 자동으로 낡는다. 요약본이
  인용하는 항목(차폐 성능 4개, 적용 표준 6개, 제품군 6개)은 제품 사이트 개편 때마다
  한 번씩 대조해야 한다 — 그래서 인용을 그만큼으로 묶어 두었다.

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
