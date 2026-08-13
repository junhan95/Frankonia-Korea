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
| `amplifier-rack.webp` | `amplifiers_web.pdf` p.18 (2019 Amplifier Selection Book) | 1592×2230 | 900×600 q80 | 86 KB | 랜딩 TEST SYSTEMS 카드 |
| `antenna-max-18.webp` | `2017/07/MAX-18.png` | 1024×768 | 1024×768 q84 | 27 KB | `product/antenna` MAX-18 패널 |
| `antenna-lax-10.webp` | `2017/07/LAX-10.png` | 859×1021 | 859×1021 q84 | 37 KB | 〃 LAX-10 패널 |
| `preamp-fpa-18.webp` | `2017/07/FPA-18.png` | 850×567 | 850×567 q84 | 32 KB | `product/preamp` FPA-18 패널 |
| `preamp-fpa-40.webp` | `2017/07/FPA-40.png` | 1006×249 | 1006×249 q84 | 18 KB | 〃 FPA-40 패널 |

17장, 합계 **약 1.1 MB** (챔버 브랜치는 28장 3.3 MB).

### 넉 장을 나중에 더 받은 이유 (추가 2026-08-13)

모델 행이 아코디언으로 바뀌면서(`ModelAccordion`) 사진이 실릴 자리가 하나 더
생겼다. 기존 열세 장은 `.figure` / `.figure-row` 자리를 놓고 경쟁하느라
"다섯 장째부터는 사양표를 밀어낸다"는 이유로 걷어냈던 것인데, 패널 사진은
클릭해야 열리고 열려야 내려받으므로 그 제약이 없다. 그래서 그때 미사용으로
남겼던 `MAX-18` · `LAX-10` · `FPA-18` · `FPA-40`을 다시 받아 넣었다.

원본이 1200px 이하라 확대하지 않았다(`withoutEnlargement: true`). 패널의
`.hl-shot` 칸은 데스크톱에서 410px, 모바일에서 331px이므로 원본 그대로도
2배 밀도를 넘는다.

### 앰프 사진만 웹이 아니라 PDF에서 나온 이유 (추가 2026-08-11)

본사는 앰프 제품군을 **대역 × 모델명 매트릭스**로만 인쇄한다 — 표 17개가 전부고
사진이 한 장도 없다 ([test-systems-source.md](test-systems-source.md) §앰프 참고).
그래서 70종짜리 최대 제품군이 사이트 전체에서 유일하게 그림이 없는 제품군이었고,
랜딩의 제품군 카드 여섯 장 중 한 장만 아이콘으로 남는 상황이 됐다.

Amplifier Selection Book 18쪽에 랙 전면 사진이 한 장 있다 (CMYK JPX, 192 ppi).
ECU 컨트롤 유닛 아래로 FLG-50F(2–6 GHz) · FLG-50A(0.8–2 GHz) · FLH-500B1
(80 MHz–1 GHz)이 쌓인 컷이다. 3:2 카드 비율에 맞춰 두 장의 앰프 전면이 온전히
들어오도록 잘랐다 (`extract` 0,812 → 1265×843 → 900×600).

읽히는 것만 캡션·alt의 근거로 삼는 이 원장의 규칙대로, 사진에서 판독되는 것은
모델명 세 개와 각 패널에 인쇄된 대역뿐이다. 랙 구성이나 출력은 사진에서 알 수 없고
적지 않았다. FLH-500B1은 `testModels`에 없는 모델이다 — 사진 설명에 쓰지 않았으므로
데이터에 넣을 이유도 없다.

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
| `SAX-10.png` (806×2855) | **모델 패널에 넣으려다 걷어냈다.** `.hl-shot`이 첫 프레임의 종횡비를 그대로 잡으므로 1:3.5 세로 사진은 패널을 2,000px 넘게 늘린다. 세로로 자르면 "1 m 로드"라는 이 안테나의 요점이 사라진다. SAX-10 행은 사진 없이 수치만으로 열린다 |
| `MTS-800_01…05.png` | 받아서 열어 보니 다섯 장 모두 **2008년경 Windows 소프트웨어 스크린샷**이다(측정 화면·자기장 발생 화면). 제품 사진이 아니고, 지금 화면에 올리면 실제보다 낡아 보인다 |
| `coupling-transformer.png` | CT-50A/C 결합 트랜스포머. `testModels`에 없는 액세서리다 — 사진에서 판독되는 모델명만으로 데이터에 새 항목을 만들지 않는다(`FLH-500B1`과 같은 판단) |
| `RSU_diagramm.png` | 사진이 아니라 결선도. RSU 행에는 이미 후면 패널 사진이 있다 |
| **카탈로그 PDF에서 뽑은 나머지 전부** (2026-08-13) | 아래 절 참조 |
| `MAX-18.png`, `LAX-10.png`, `FPA-18.png`, `FPA-40.png` | ~~미사용~~ → 2026-08-13 모델 패널에 실었다. 위 표 참조 |
| gain / VSWR / antenna-factor / generated-field-strength 그래프 (수십 장) | 축 눈금이 웹 크기에서 판독되지 않는다. 값은 사양표에 있다 |
| `header_emctest.jpg` | 마크업에 이름만 있고 `wp-content/uploads` 경로가 404다 |
| 본사 로고 래스터 | `public/frankonia-logo.svg`가 이미 있다 |

## 카탈로그 PDF 9종에서 이미지를 한 장만 가져온 이유 (추가 2026-08-13)

`D:\FRANKONIA\Frankona-Korea\EMC Test Systems\`의 PDF 아홉 종에는 삽입 이미지가
1,500장 넘게 들어 있다. 400×300 이상만 추려도 100장이 넘는다. 전부 열어 본 결과
**제품 사진은 거의 없었다.**

| 무엇이 들어 있었나 | 판단 |
|---|---|
| ERX-6 페이지의 큰 이미지 5장 | 전부 **측정 소프트웨어 스크린샷**(주파수 스캔, 트랜스듀서 목록, 스펙트럼). 제품 사진이 아니다 |
| ERC-6 페이지의 사진 | 전면 패널 한 장을 레이아웃이 **좌우 두 조각으로 잘라** 심어 두었다. 두 조각을 다시 붙이면 이음매가 맞는지 확인할 방법이 없어 쓰지 않았다 |
| LISN 페이지 | **등가회로 도면**과 **실물 사진 두 장**. 사진 한 장을 실었다(아래) |
| NFS-100 · LVVL 페이지 | 루프 트랜스듀서 **배선 개념도**. 제품 사진이 아니다 |
| ACF-01B 페이지의 최대 이미지 | 챔버 내부 사진이다. 흡수 클램프가 아니다 |
| CIT-1000 · ECU 페이지 | 번호를 붙인 **후면 패널 콜아웃 도면** |
| 앰프 선정집 | 모델별 **출력 특성 그래프**. 축 눈금이 웹 크기에서 판독되지 않는다는 기존 판단과 같다 |
| 안테나 카탈로그 | 3D 렌더가 대부분이고, 실물 컷아웃은 웹사이트 쪽이 더 크고 깨끗하다 |

그래서 이번에 실은 것은 한 장이다.

| 프로젝트 경로 | 원본 | 출력 | 용량 | 쓰인 곳 |
|---|---|---|---|---|
| `emission-lisn.webp` | `Emission-Measuring-Systems-1.pdf` p.15 삽입 이미지 | 723×802 q84 | 40 KB | `product/emission` 와이드 |

명판에서 읽히는 것만 alt에 적었다 — `0.1 MHz - 150 MHz, 400 A, 5 µH`, `Measure`,
`Output`, `50 Ohm Termination`, `GND`, `EuT`, `L (DC / AC)`. **어느 모델인지는
적지 않았다.** 명판의 대역(100 kHz–150 MHz)은 LISN-KFZ와 맞지만 전류(400 A)는
카탈로그 본문의 70 A / 100 A와 맞지 않는다. 사진에서 판독되지 않는 것을
캡션으로 옮기지 않는다는 이 원장의 규칙대로, 모델명은 비워 두었다.

`product/coupling`에는 그림이 없다. 이 제품군의 원본에 쓸 만한 제품 사진이
없기 때문이고, 없는 것을 다른 제품군에서 빌려다 쓰지 않는다.

## alt와 caption 규칙

같은 문장을 쓰지 않는다 — 스크린리더가 두 번 읽는다. alt는 **사진에 무엇이 찍혀
있는지**, caption은 **그것이 무슨 의미인지**를 말한다. 둘 다 사진에서 실제로
판독되는 것만 적었다: 명판의 모델명, 랙 전면의 레이블, 안테나 형태.
파일명이나 EXIF에 있는 정보는 캡션으로 옮기지 않았다.
