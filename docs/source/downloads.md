# 원본 자료 — Downloads

수집일: 2026-08-22
출처: 본사 다운로드 영역 **두 곳**

```
https://frankonia-solutions.com/anechoic-chambers/download-area_anechoic-chambers/
https://frankonia-solutions.com/test-systems/download-area_test-systems/
```

[[company-publications]] §7이 남겨 둔 미결 항목의 답이다. 그 문서는 네브바
Contact 그룹의 "카탈로그 다운로드" 항목이 논문 목록을 열어 주고 있다는 문제를
적으면서 해결안 셋을 남겨 두었다. 실제로 채택된 것은 그중 어느 것도 아닌 넷째다 —
**항목 하나가 사이트 전체의 자료실 하나를 열고, 그 자료실이 본사의 두 영역을 모두
담는다.** 나누지 않은 이유는 §4에 적었다.

---

## 1. 원본 페이지 구조

### 1-A. Anechoic Chambers Download Area

WPBakery `vc_col-sm-4` 3열. 제목(`h6`, CI 레드) 아래 썸네일이 놓이고, 썸네일이
곧 PDF 링크다. 설명문은 **하나도 없다.**

| # | 제목(원문) | 항목 | 상태 |
|---|---|---|---|
| 1 | `ANECHOIC CHAMBERS – SHIELDED ROOMS & ACCESSORIES` | Anechoic Chambers (PDF) · Photobook (PDF) | ⚠ **파일 없음** |
| 2 | `Service Portfolio` | Service Portfolio DE / EN (PDF) | 정상 |
| 3 | `ISO Certification of Frankonia Germany EMC Solutions GmbH` | Frankonia ISO 9001 – DE / EN (PDF) | 정상 |

⚠ 1번 두 항목은 `_3d-flip-book` 위젯인데 `data-pdf=""`, `data-thumbnail=""`로
**둘 다 비어 있다.** 링크도 썸네일도 없이 제목만 떠 있다. 본사가 위젯을 걸어 두고
파일을 지정하지 않은 상태다. [[chambers-models]] §의 관찰("href가 비어 있다")과
같은 사실을 마크업 수준에서 확인한 것이다.

### 1-B. Test Systems Download Area

같은 3열이지만 이쪽은 **설명문 + 썸네일 + 제목 링크**를 모두 갖춘 완성된 구조다.
9건 전부 살아 있다. 이 사이트의 카드 구성(썸네일 → 제목 → 설명 → 메타)은 이
페이지의 구성을 그대로 따른 것이다.

## 2. 파일 목록 — 실측치

`Content-Length`는 2026-08-22 본사 서버 `HEAD` 응답, 쪽수는 `pdfinfo`.

| # | 제목 (본사 표기) | 원본 URL (`/wp-content/uploads/…`) | 쪽 | 크기 | 서빙 |
|---|---|---|---|---|---|
| 1 | Anechoic Chambers 2026 | — (본사 미공개) | 35 | 16.3 MB | **이 사이트** |
| 2 | Photobook 2026 | — (본사 미공개) | 27 | 14.5 MB | **이 사이트** |
| 3 | Service Portfolio EN | `2025/11/Service-Broschure_EN_PDF.pdf` | 4 | 4.8 MB | 본사 |
| 4 | Service Portfolio DE | `2025/11/Service-Broschure_DE_PDF.pdf` | 4 | 4.8 MB | 본사 |
| 5 | Frankonia ISO 9001 – EN | `2022/07/Zertifikat-ISO-9001_2015-engl.pdf` | 2 | 404 KB | 본사 |
| 6 | Frankonia ISO 9001 – DE | `2022/07/Zertifikat-ISO-9001_2015.pdf` | 2 | 404 KB | 본사 |
| 7 | Radiated Immunity Test Systems | `2016/12/Radiated_Immunity_Test_Systems.pdf` | 24 | 1.7 MB | 본사 |
| 8 | RF-wideband Amplifiers | `2020/03/Wideband-Amplifiers_web.pdf` | 9 | 1.5 MB | 본사 |
| 9 | Measuring Systems for Conducted and Radiated Emission testing | `2019/03/Emission-Measuring-Systems-1.pdf` | 20 | 10.8 MB | 본사 |
| 10 | GTEM-Cells | `2017/10/GTEM.pdf` | 10 | 2.0 MB | 본사 |
| 11 | Conducted Immunity Test Systems | `2019/03/conducted_immunity_test_systems.pdf` | 32 | 2.9 MB | 본사 |
| 12 | Amplifier Selection Book | `2019/09/amplifiers_web.pdf` | 109 | 6.9 MB | 본사 |
| 13 | Antennas, Antenna Masts & Pre-Amplifier | `2024/09/200824_Antennas_Druck.pdf` | 28 | 12.1 MB | 본사 |
| 14 | Magnetic-Field / Low-Frequency Test System | `2019/03/MTS.pdf` | 8 | 400 KB | 본사 |
| 15 | Immunity test to conducted common- and differential mode disturbances | `2019/03/PSG.pdf` | 8 | 435 KB | 본사 |

7–15의 9건은 `D:\FRANKONIA\Frankona-Korea\source\`의 사본과 **바이트 단위로
일치**한다(2026-08-22 대조). [[test-systems-source]]가 본문을 뽑아 쓴 그 파일들이다.

### 쪽수 표기 — PDF 쪽이지 인쇄면이 아니다

1·2번은 **스프레드 조판**이다. 카탈로그는 표지(A4) + 스프레드(A3) 33장 + 뒤표지,
포토북은 표지(정사각) + 스프레드 25장 + 뒤표지. 인쇄면으로 세면 각각 68면·52면이
되지만 사이트에는 **PDF 쪽수(35·27)를 적었다.** 파일을 연 독자가 뷰어에서 보는
숫자와 같아야 하기 때문이다.

### 크기 표기 — 이진 단위

`fileSize()`는 1024²를 MB로 부른다. SI와 어긋나지만 Windows·macOS의 파일 목록이
쓰는 표기이고, 이 숫자의 용도는 **독자의 다운로드 폴더에 실제로 들어올 크기와
맞는 것**이지 SI와 맞는 것이 아니다. 1 MB 미만은 KB로 내려간다 — "16.3 MB" 옆의
"0.4 MB"는 작은 파일이 아니라 반올림 오차처럼 읽힌다.

## 3. 에셋 — 썸네일 15장

본사 썸네일을 받아 오지 **않았다.** 본사 것은 두 영역의 제작 시기가 달라 크기와
품질이 제각각이다(ISO는 106×150 PNG, Service Portfolio는 1854px JPG, 시험 시스템
9건은 210~214×300 PNG). 대신 **각 PDF의 1쪽을 직접 렌더**했다. 카드 위의 썸네일이
그 아래 링크가 주는 문서의 표지라는 것이 파일 자체로 보증된다.

```
pdftoppm -f 1 -l 1 -r 110 -png -singlefile <파일> covers/<이름>
sharp(...).resize({width:560, withoutEnlargement:true}).webp({quality:82})
```

| 경로 | 크기 | 용량 |
|---|---|---|
| `public/downloads/covers/catalogue-2026.webp` | 560×792 | 53 KB |
| `photobook-2026.webp` | 560×560 | 35 KB |
| `service-portfolio-en.webp` / `-de.webp` | 560×571 | 각 38 KB |
| `iso-9001-en.webp` / `-de.webp` | 560×792 | 각 85 KB |
| `radiated-immunity.webp` | 560×792 | 44 KB |
| `wideband-amplifiers.webp` | 560×792 | 35 KB |
| `emission-measuring.webp` | 560×786 | 36 KB |
| `gtem-cells.webp` | 560×792 | 31 KB |
| `conducted-immunity.webp` | 560×792 | 42 KB |
| `amplifier-selection.webp` | 560×792 | 37 KB |
| `antennas.webp` | 560×786 | 33 KB |
| `magnetic-field.webp` | 560×792 | 33 KB |
| `psg-immunity.webp` | 560×792 | 32 KB |

**합계 656 KB.** 15장 전부 렌더 결과를 눈으로 확인했다. ISO 인증서 2장은
`pdftoppm`이 `No display font for 'Symbol' / 'ArialUnicode'` 경고를 내지만
본문·서명·유효기간 모두 정상 판독된다.

**alt는 비워 두었다** (`alt=""`). 썸네일 바로 아래가 그 문서의 제목이고, 표지를
설명하면 제목을 두 번 읽게 된다.

## 4. 대응 관계 — 원본 → 이 사이트

| 원본 | 이 사이트 | 컴포넌트 |
|---|---|---|
| 두 Download Area | `/downloads` 한 곳 | `app/downloads-content.tsx` |
| 영역별 페이지 | 밴드 2개 (`.sec-head` 킥커가 어느 영역인지 말한다) | `Set` |
| `h6` 레드 제목 3개 | `.sub-head` (`.list-group`) | `Group` |
| 썸네일 = 링크 | 카드 전체가 `<a>` | `.dl` / `Card` |
| — | 메타 줄 (PDF · 쪽수 · 용량 · 본사 서버) | `.dl-meta` (신규) |

**나누지 않은 이유.** [[company-publications]] §7의 해결안 3("각 제품 섹션 안으로
옮긴다 — 가장 원본에 가깝다")을 택하지 않았다. 본사 구조에 가장 가까운 것은
맞지만, 이 사이트에는 그 항목을 여는 네브바 자리가 **Contact 그룹에 하나뿐**이고,
"카탈로그"를 찾는 독자는 자기 것이 어느 분기인지 아직 모른다. 대신 본사의 제목과
영역 안 순서를 그대로 보존해서 두 페이지를 서로 대조할 수 있게 했다.

### 새로 만든 CSS

`.dl-grid` / `.dl` / `.dl-shot` / `.dl-lang` / `.dl-body` / `.dl-meta` /
`.dl-offsite`. `.lc` 카드의 문법(soft 바탕, 헤어라인 테두리, hover 시 4px 부상 +
제목 레드)을 그대로 쓰고 다른 것은 그림 프레임과 메타 줄뿐이다.

- `.dl-shot`은 **높이 고정 250px + `contain`**. 15장이 A4 세로 · 정사각(포토북) ·
  준정사각(서비스) · 612×859 넷으로 갈리는데, 비율을 고정하면 A4의 제목이 잘리거나
  정사각이 레터박스가 된다. 흰 바탕은 표지가 인쇄된 종이색이다.
- `.dl-lang` (EN/DE 배지)는 같은 문서가 두 언어로 있는 4장에만 붙는다. 그 4장은
  배지 말고는 카드가 완전히 같다.
- `.dl-offsite`는 메타 줄에서 **혼자 한 줄**을 쓴다. 275px 카드에 네 항목이 한 줄로
  안 들어가 어차피 줄바꿈되는데, 줄바꿈된 항목은 `::before` 구분선을 데리고 가서
  둘째 줄 맨 앞에 헤어라인이 남았다.
- 브레이크포인트는 기존 1100(4→2열) / 700(2열 유지 + 프레임 190px)만 썼다.
  700에서 1열로 내리지 않은 이유는 CSS 주석에 적었다.

## 5. 카피 — 무엇이 본사 것이고 무엇이 아닌가

**제목 15개는 전부 본사 표기 그대로, 번역하지 않는다.** 본사 사이트에서 넘어온
독자나 동료가 파일명으로 부른 자료를 찾는 독자가 대조할 수 있어야 한다.
`(PDF)` 접미사만 뗐다 — 메타 줄이 이미 형식을 말한다.

**영문 설명은 본사 원문.** 세 곳만 손댔고 전부 아래에 적는다.

| 항목 | 본사 원문 | 이 사이트 | 이유 |
|---|---|---|---|
| RF-wideband Amplifiers | `widerange` | `wide-range` | 단어가 아니다 |
| Conducted Immunity | `D0-160` | `DO-160` | 영문자 O 자리에 숫자 0 |
| Immunity test to conducted… | `IEC/EN61000-4-19` | `IEC/EN 61000-4-19` | 같은 문장의 앞 규격은 띄어져 있다 |

**`Measuring Systems for Conducted and Radiated Emission testing`의 설명은 본사
것이 아니다.** 본사가 그 자리에 적은 문장이 제목과 같은 문장이어서 카드에 두 번
찍힌다. 대신 **그 PDF 자신의 목차(2쪽)**를 옮겼다 — ERX-6 · ERC-6 · LISN ·
NFS-100 · LVVL · ACF-01B.

**챔버 영역 6건의 설명은 본사에 아예 없다.** 그 페이지는 제목 아래 썸네일만
찍는다. 여섯 줄은 문서 자체를 읽고 썼다:

- 1·2번 — 카탈로그와 포토북의 실제 구성. 포토북의 `IMPRESSIONS — Anechoic
  Chambers`는 2쪽의 표제다.
- 3·4번 — Service Portfolio 본문의 `At a Glance` 여섯 항목을 줄인 것.
- 5·6번 — 인증서 본문. 발급기관(DEKRA Certification GmbH), 대상
  (Frankonia Germany EMC Solutions GmbH), 유효기간 **2024-06-24 ~ 2027-06-23**,
  등록번호 50220158/2, 부속서에 인증 사업장. **유효기간은 2027년에 만료된다 —
  그때 본사가 갱신본을 올리면 이 문장도 함께 고쳐야 한다.**

## 6. 이전 버전에서 걷어낸 것

이 라우트는 `ChamberPage`의 일곱째 뷰(`{kind:"downloads"}`)로 렌더되고 있었고,
`body`가 없어서 챔버 분기의 **`Stub` 밴드**로 떨어졌다 — "자료를 보내 드립니다 /
Documents on request". 페이지 제목도, 검색 스니펫도, 네브바 항목도 파일을
약속하는데 열어 보면 이메일 주소를 주고 있었다. 파일은 존재한다.

정리한 것:

- `ChamberView`에서 `downloads` 제거, `copy.eyebrowDownloads` 제거, `resolve()`의
  `case "downloads"` 제거
- `downloadsMeta` · `downloadsPath`를 `chamber-sections.ts` → `downloads-sections.ts`로
  이동. 자료실은 챔버 분기가 아니다 — 라우트가 그 파일에 적혀 있었을 뿐이다.
  `site-header.tsx` · `sitemap.ts` · `contact-content.tsx`의 import를 옮겼다
- `downloadsMeta.description`을 고쳤다. 기존 문장은 네 항목만 약속했는데
  실제로는 15건이다. **건수는 적지 않는다** — [[frankonia-hq-review-2026-08]]의
  개수 표기 금지가 여기에도 걸린다. 자료실은 본사가 파일을 올리고 내리는 곳이라
  "9종"은 다음 갱신에 틀린 숫자가 된다. 리드 문단도 같은 이유로 숫자를 뺐다

## 7. 본사에 확인할 것

1. ⚠ **Download Area의 flip-book 위젯 두 개가 비어 있다.** 본사 사이트에서
   `Anechoic Chambers (PDF)`와 `Photobook (PDF)`는 제목만 뜨고 아무 데도 가지
   않는다. 본사 쪽 설정 누락이다.
2. ⚠ **이 시안은 그 두 파일을 자체 호스팅한다** (`public/downloads/`, 합계
   31.3 MB). 사용자 지시(2026-08-22)다. 본사가 공개하지 않기로 한 자료가 아니라
   공개하려다 만 자료라는 판단이 근거지만, **본사 확인 대상**이다. 되돌린다면
   `downloadSets`의 `chambers/catalogues` 두 항목만 지우면 된다.
3. `2008_Antennas_web.pdf`(2017)가 챔버 영역에 아직 걸려 있다. 시험 시스템 영역은
   2024년판 `200824_Antennas_Druck.pdf`를 준다. 이 사이트는 신판만 싣는다.
4. 시험 시스템 카탈로그 9건 중 6건이 2016~2019년 파일이다. GTEM은 2018년,
   MTS·PSG는 2019년이 마지막 수정이다.

## 8. 옮기지 않은 것

- 두 영역의 좌측 사이드바(챔버 분기 내부 메뉴, 독일어 미러 링크). 이 사이트의
  네브바가 그 역할을 한다.
- `Contact us ▸` CTA 밴드. `PageShell`이 이미 렌더한다.
