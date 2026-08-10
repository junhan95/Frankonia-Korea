# EMC Test Systems — 에셋 원장

수집·변환 **2026-08-10**. 본문 원장은 [test-systems-source.md](test-systems-source.md).

원본은 전부 `https://frankonia-solutions.com/wp-content/uploads/…` 아래에 있다.
WordPress가 `-1024x572` 같은 축소본을 마크업에 심어 두므로 **접미사를 뗀 원본 URL**을
받았다. 업스케일은 하지 않았다 — `withoutEnlargement: true`.

투명도는 살렸다. 제품 컷아웃이라 배경이 비어 있고, `.figure`가 자기 배경
(`--canvas-soft`, `.alt` 안에서는 `--canvas`)을 그대로 비추는 편이 낫다.

## 실은 것

| 프로젝트 경로 | 원본 파일 | 원본 크기 | 출력 | 용량 | 쓰인 곳 |
|---|---|---|---|---|---|
| `antenna-alx-4000.webp` | `2017/07/ALX-4000.png` | 1600×1200 | 1600×1200 q84 | 73 KB | `product/antenna` 와이드 |
| `antenna-max-9.webp` | `2017/07/MAX-9.png` | 994×686 | 1200×900 q84 | 34 KB | `product/antenna` 3열 |
| `antenna-hax-18.webp` | `2017/07/HAX-18.png` | 1377×1110 | 1200×900 q84 | 52 KB | 〃 |
| `antenna-hax-40.webp` | `2017/07/HAX-40.png` | 1600×1200 | 1200×900 q84 | 60 KB | 〃 |
| `antenna-hax-6.webp` | `2017/07/HAX-6.png` | 1600×1200 | 1600×1200 q84 | 43 KB | `test/radiated` 와이드 |
| `preamp-fpa.webp` | `2017/07/FPA-4_01.png` | 1701×1304 | 1200×920 q74 | 235 KB | `product/preamp`, `test/emission` |
| `efs-probe.webp` | `2017/08/EFS.png` | 360×595 | 360×595 q84 | 18 KB | `product/efs` |
| `meter-pms-1084.webp` | `2017/08/PMS.png` | 2551×397 | 1600×249 q84 | 46 KB | `product/meter` |
| `meter-rsu.webp` | `2017/08/RSU.png` | 2438×1020 | 1600×669 q84 | 85 KB | `product/system` 3열 |
| `system-cit-100.webp` | `2020/05/CIT-100-Proto-Perspektivisch-scaled.jpg` | 2560×975 | 1600×609 q84 | 62 KB | `product/system`, `test/conducted` |
| `system-mts-800.webp` | `2017/08/MTS800.png` | 2438×1361 | 1400×782 q80 | 101 KB | `test/magnetic` 와이드, `product/system` 3열 |
| `system-psg-300.webp` | `2017/08/PSG300.png` | 2438×964 | 1400×554 q80 | 94 KB | `product/system` 3열 |

12장, 합계 **약 0.9 MB** (챔버 브랜치는 28장 3.3 MB).

### 세 장을 한 상자에 넣은 이유

`.figure-row`는 `repeat(3, 1fr)` 그리드다. 세 장의 종횡비가 다르면 캡션이 세 높이에
걸린다. `antenna-max-9` / `-hax-18` / `-hax-40`은 4:3(1200×900) 한 상자에 `contain`으로
넣었다 — `cover`로 자르면 안테나 끝이 잘려 나가기 때문이다. 여백은 투명이라
프레임 배경이 그대로 보인다.

### 두 장을 다시 인코딩한 이유

- `preamp-fpa` — 각인된 명판을 찍은 근접 사진이다. q84·1600px에서 452 KB까지 튀었다.
  1200px q74로 다시 넣어 235 KB. 명판 글자는 여전히 읽힌다.
- `system-mts-800` · `system-psg-300` — 전면 패널의 미세한 그러데이션 때문에
  1600px q84가 130 KB대였다. 1400px q80으로 낮췄다.

## 받았지만 쓰지 않은 것

| 원본 | 왜 안 썼나 |
|---|---|
| `MTS_800_vier.png` (Helmholtz 코일·루프 센서 4종) | 변환까지 했다가 걷어냈다. `.figure-row`가 `repeat(3, 1fr)` 고정이라 한 장짜리 행은 3분의 1 폭에 걸리고, 자기장 페이지에는 이미 MTS-800 와이드 플레이트가 있다. 액세서리를 실으려면 석 장이 필요하다 |
| `MAX-18.png`, `SAX-10.png`, `LAX-10.png` | 안테나 페이지에 이미 넉 장이 실린다. 다섯 장째부터는 사양표를 밀어낸다 |
| `FPA-18.png`, `FPA-40.png` | 같은 형태의 금속 상자 근접 사진이라 한 장 이상 실을 이유가 없다 |
| `MTS-800_01…05.png`, `coupling-transformer.png` | 액세서리 개별 컷. `MTS_800_vier`가 넷을 한 장에 담고 있다 |
| gain / VSWR / antenna-factor / generated-field-strength 그래프 (수십 장) | 축 눈금이 웹 크기에서 판독되지 않는다. 값은 사양표에 있다 |
| `header_emctest.jpg` | 마크업에 이름만 있고 `wp-content/uploads` 경로가 404다 |
| 본사 로고 래스터 | `public/frankonia-logo.svg`가 이미 있다 |

## alt와 caption 규칙

같은 문장을 쓰지 않는다 — 스크린리더가 두 번 읽는다. alt는 **사진에 무엇이 찍혀
있는지**, caption은 **그것이 무슨 의미인지**를 말한다. 둘 다 사진에서 실제로
판독되는 것만 적었다: 명판의 모델명, 랙 전면의 레이블, 안테나 형태.
파일명이나 EXIF에 있는 정보는 캡션으로 옮기지 않았다.
