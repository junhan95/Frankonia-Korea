# Chambers › References — 원장

수집일 **2026-08-10**. 출처는 본사 원본
[frankonia-solutions.com/anechoic-chambers/references_anechoic-chambers/](https://frankonia-solutions.com/anechoic-chambers/references_anechoic-chambers/).

Anechoic Chambers 브랜치의 기술 토픽 5개 중 마지막. 앞의 4개(Frankosorb / Shielding & Gates /
Automation / Extended Services)는 2026 카탈로그를 원본으로 썼지만, **References는 카탈로그에
대응 스프레드가 없어** 본사 웹 페이지가 유일한 원본이다([catalogue-2026.md](catalogue-2026.md) 참조).

---

## 1. 원본 페이지 구조

| 순서 | 원본 마크업 | 내용 |
|---|---|---|
| 1 | `w-slider count_6` (royalSlider, 전부 `alt=""`) | 헤더 이미지 슬라이더 6장 — `References-1`~`References-6.jpg`, 모두 1280×533 |
| 2 | `wpb_text_column` | 도입 문단 2개 |
| 3 | `w-separator with_line` | 구분선 |
| 4 | `h2` (`color: #e30b18`) | **360° Panoramas** |
| 5 | `h3` ×3 + `wp-block-panorama-image-360` ×7 | 설치 3곳, 각 h3 아래 Pannellum 2.5.6 뷰어. FAC-3 2개 / SAC-5 Plus 2개 / SAC-10 Hybrid 3개 |
| 6 | `h2` | **Some of our references:** |
| 7 | `vc_col-sm-6` ×2, 각 `w-iconbox` ×53 | 고객사 목록 106건 (2단, `fas fa-angle-right` 셰브런) |
| 8 | `Contact us ▸` | CTA — `PageShell`이 이미 렌더하므로 옮기지 않음 |

360° 뷰어는 이미지 URL을 마크업에 담지 않는다. 네트워크 요청을 다시 기록해서
`2023/02/` 아래 7장(`P1`, `P2`, `P1-1`, `P2-1`, `Grosse-Testhalle_01`,
`Grosse-Testhalle_02`, `Kleine-Testhalle`)임을 확인했고, DOM 순서로 h3에 대응시켰다.

## 2. 원문 verbatim

> Frankonia is recognized as a highly specialized technology corporation for EMC
> anechoic chambers and test system within the automotive and industrial sector
> for testing of electromagnetic compatibility.

> Our EMC anechoic chambers and test systems are proven and tested in the
> development departments of well-known manufacturers, in the areas of research
> by universities and colleges, as well as in labs of leading EMC service
> providers. Our customers benefit from our extensive experience and our
> multi-layered knowledge.

> 360° Panoramas
> FAC-3 – Marktheidenfeld
> SAC-5 Plus – Heideck
> SAC-10 Hybrid – Kösching

> Some of our references:

문법이 어색한 곳(`chambers and test system within the … sector`)도 그대로 두었다.
카탈로그 p.53에는 같은 문장의 다른 판본(`chambers and test systems within the
automotive, military and industrial sectors`)이 있지만, 이 페이지의 원본은 웹 쪽이다.

### 고객사 목록 106건 (본사 표기 그대로, 원본 순서)

**1단 (53건)** Adam Opel AG – Germany · AKKA EMC – Germany · Alcatel Lucent – France ·
Ametek – Singapore · ARAI – India · Arcelik – Turkey · Aselsan – Turkey ·
ATERMES – France · Audi AG – Germany · AUSTEST Labs – Australia · BDS Technik – Germany ·
BEL – India · BMW AG – Germany · Bosch – Germany · Bosch – India · BTK – Turkey ·
CAME – Italy · CATARC – China · CETIEV – Morocco · CMC – Italy · Continental – Germany ·
CPRI – India · Daikin – Thailand · Daimler AG – Germany · EDF – France · EETI – China ·
Elbit – Israel · Electrolux – USA · ELSA – Australia · EMC Test NRW – Dortmund ·
EMITEL – Germany · EQDC – India · ETU – Turkey · Eurofins – Germany ·
Fuijan-Daimler – China · Harmann-Becker – Germany · Heidelberger Druck – Germany ·
HID Corp Ltd – China · IABG – Germany · IBEC – Brasil · Continental (International) ·
AT4 Wireless (DEKRA) – USA · AT4 Wireless (DEKRA) – Spain · Ubiquiti Networks – USA ·
Atom Medical – Japan · HiPhysics – India · Azista – India · Standard Institute – Israel ·
Siemens – Germany · TÜV Süd – Germany · Eaton – India · Airbus/Ariane Group – France ·
Garmin – USA

**2단 (53건)** IMC Linetest – Russia · JAC Motors – China · Keysight – Malaysia ·
LENOR – Argentina · Linetest – Russia · MBtech EMC – Germany · MECTRONIC – Germany ·
Mellanox – Israel · Messtechnik Nord – Germany · Miele – Germany · NCMS – Saudi Arabia ·
NMEI – China · Nokia Alcatel Lucent – France · NRIST – China · NSTDA – Thailand ·
PCB – Poland · PKM electronic GmbH – Germany · Quinel – Switzerland · RADA – Israel ·
RCI – India · Rheinmetall Kassel – Germany · RI.SE – Sweden · Rishabh – India ·
RSI – France · SAGEM – France · SDQI – China · SELTEQ – Ukraine · SQI – China ·
Stanley – Japan · Suranaree – Thailand · Speedy – Singapur · Thales – France ·
TKC – Belarus · TMUC – Thailand · VDE Offenbach – Germany · TÜV Austria – Austria ·
TÜV Rheinland India – India · TÜV Rheinland – USA · Uni Brüssel – Belgium ·
TÜV Rheinland – Malaysia · Uni Magdeburg – Germany · A123 – USA · Willtest – Russia ·
Gentherm – USA · Wuhan Long An 6907 – China · ZDP-Duisburg – Germany ·
Viessmann – Germany · WIPRO – India · PT Qualis – Indonesia · Daimler – Germany ·
DEKRA – Germany · Prodrives – Netherlands · Rheinmetall – Australia

원본 순서는 앞쪽 40건이 알파벳순이고 그 뒤로는 추가된 순서다. 중복에 가까운 항목이
그대로 있다 — `Daimler AG` / `Daimler`, `Alcatel Lucent` / `Nokia Alcatel Lucent`,
`Linetest` / `IMC Linetest`, `Continental` / `Continental (International)`,
`TÜV Rheinland` 3건(India · USA · Malaysia), `AT4 Wireless (DEKRA)` 2건 + `DEKRA`.
**합치지 않았다.** 같은 조직인지 다른 법인·다른 사업장인지는 본사만 안다.

## 3. 국가 정규화 — 무엇을 고쳤고 무엇을 그대로 뒀나

이 사이트는 목록을 국가별로 묶어 보여준다(원본은 2단 나열). 묶으려면 국가 토큰을
정규화해야 했고, 세 건에 손을 댔다:

| 원본 토큰 | 이 사이트 | 근거 |
|---|---|---|
| `Singapur` (Speedy) | Singapore | 같은 목록 안에 `Singapore`(Ametek)가 이미 있다. 독일어 표기이며 그대로 두면 싱가포르가 두 그룹으로 갈린다 |
| `Brasil` (IBEC) | Brazil | 철자 수준 교정 |
| `Dortmund` (EMC Test NRW) | Germany | 국가가 아니라 도시다. NRW = 노르트라인베스트팔렌 |
| (없음) `Continental (International)` | International | 원본이 국가 대신 쓴 그 단어를 그대로 그룹명으로 썼다 |

**고객사 이름은 한 글자도 고치지 않았다** — `Fuijan-Daimler`, `Harmann-Becker`,
`Arcelik`, `RI.SE`, `Uni Brüssel`처럼 오타·독일어 표기로 보이는 것도 그대로다.
인용과 같은 성격이라 본사 표기로 찾을 수 있어야 한다. 한국어 페이지에서도 같은 표기를
쓰고, 국가명만 번역한다.

정규화 결과 **106건 / 28개국 + International 1건**. 국가별 건수는
`referenceGroups`(`app/chamber-sections.ts`)의 순서와 같다: Germany 28 · India 12 ·
China 10 · France 8 · USA 7 · Israel 4 · Thailand 4 · Turkey 4 · Australia 3 ·
Russia 3 · Italy 2 · Japan 2 · Malaysia 2 · Singapore 2, 그리고 1건씩 15개.

## 4. 에셋

경로는 모두 `public/chambers/images/`. "무엇이 찍혔나"는 **파일을 직접 열어 보고** 적었다.

### 360° 파노라마 (신규)

원본은 2:1 정방형 등거리 원통도법(equirectangular) 전천구 이미지다. `-scaled` 접미사가
붙은 2560×1280은 WordPress 축소본이므로 **접미사 없는 원본**을 받았다.

| 프로젝트 경로 | 원본 | 원본 크기 | 변환 후 | 무엇이 찍혔나 |
|---|---|---|---|---|
| `pano-fac-3.webp` | `2023/02/P1.jpg` | 5000×2500 · 7.2MB | 2000×500 · 103KB | 완전 무향실. 벽·천장·**바닥까지** 흰 장피라미드 흡수체. 좌측에 비상구 표시등 아래 회색 단문형 차폐문과 그 옆 관통 패널, 우측 어두운 패널 벽 앞에 노랑·흰 마스트에 얹힌 소형 안테나 |
| `pano-sac-5-plus.webp` | `2023/02/P2-1.jpg` | 5000×2500 · 5.1MB | 2000×500 · 87KB | 반무향실. 돔형 천장과 벽면은 피라미드 흡수체, 바닥은 반사면. 매립 턴테이블 원, 붉은 선과 노랑·검정 표시로 구획된 시험 구역 |
| `pano-sac-10-hybrid.webp` | `2023/02/Grosse-Testhalle_02.jpg` | 7304×3652 · 12.3MB | 2000×500 · 121KB | 대형 차량 챔버. 턴테이블 원 위에 흰색 2인승 스포츠카, 배기구에 연결된 주름 덕트가 바닥 배기함으로 이어진다. 천장은 단피라미드, 우측 벽은 장피라미드 흡수체, 상부 벽면은 검정. 차 뒤에 안테나 마스트 |

**중앙 밴드만 잘라 썼다.** 전천구 이미지를 그대로 펼치면 천정점·저점이 뭉개진다.
높이의 가운데 절반(고도 ±45°)을 잘라내면 원통 파노라마가 되고, 가로축은 요(yaw)에
선형으로 대응하므로 **가로 스크롤이 그대로 팬(pan)이 된다** — 뷰어 라이브러리 없이
360° 전체를 둘러볼 수 있다. 3장 합계 311KB, 전부 지연 로딩.

### 헤더 슬라이더 이미지

| 프로젝트 경로 | 원본 | 크기 | 무엇이 찍혔나 | 사용 |
|---|---|---|---|---|
| `reference-3.webp` | `2019/07/References-5.jpg` | 1280×533 · 124KB | 무향실 내부. 롤러 시험대 위에 검정·연두 전기자전거, **DEKRA 로고가 박힌 작업복**을 입은 엔지니어 뒷모습, 우상단 붐에 청·흰 로그페리오딕 안테나 | **페이지 도입 도판** |
| `reference-1.webp` | `2019/07/References-1.jpg` | 1280×533 · 116KB | 차량 챔버. 턴테이블 위 진회색 아우디 세단(미등 점등), 붐 마스트의 로그페리오딕 안테나 | 미사용 — 삭제 |
| `reference-2.webp` | `2019/07/References-3.jpg` | 1280×533 · 96KB | 무향실 내부. 좌측 수직 마스트의 붉은 함체와 검은 혼 안테나, 중앙에 바퀴 달린 목재 시험대(FGT), 흰 유전체 지주 여러 개, 우측 삼각대 위 붉은 계측기 | 미사용 — 삭제 |

**미확인이었던 2장을 이번에 열어 보았다.** [chambers-assets.md](chambers-assets.md) 4절이
`reference-2`/`reference-3`을 "캡션·alt를 쓰기 전에 반드시 확인할 것"으로 남겨 두었던
항목이다. 확인 결과 `reference-3`(=`References-5.jpg`)에 **DEKRA 브랜드가 또렷하다.**
DEKRA는 이 페이지의 고객사 목록에 3번 올라 있으므로(`DEKRA – Germany`,
`AT4 Wireless (DEKRA)` USA·Spain) 페이지 내용과 어긋나지 않는다 — 앞서 정리한
타사 브랜드 노출(메르세데스·아우디·우니모크·Liebherr)과 같은 성격이고, 본사가 자기
사이트에 공개한 사진이다.

`reference-1`·`reference-2`는 도판 한 장이면 되는 자리에 남아 저장소와 정적 export에만
실려 있었으므로 **파일을 지웠다.** 원본 URL이 위 표에 있으니 필요하면 다시 받으면 된다.
`References-2` · `References-4` · `References-6`(각 1280×533)도 슬라이더에 있지만
받지 않았다 — `References-4`는 롤러 위 자전거 근접, `References-6`은 좌측에 청색 SUV,
우측에 `Huygens / Reverb-Halle` 명판이 붙은 흰 차폐벽이다.

### 쓰지 않은 파노라마 4장

| 원본 | 이유 |
|---|---|
| `2023/02/P2.jpg` | FAC-3 두 번째 시점. 같은 챔버이고 `P1`이 바닥 흡수체를 더 분명히 보여준다 |
| `2023/02/P1-1.jpg` | SAC-5 Plus 첫 시점. 우측에 예비 흡수체가 쌓여 있어 `P2-1`이 낫다 |
| `2023/02/Grosse-Testhalle_01.jpg` | SAC-10 Hybrid, 차량이 턴테이블 밖에 있다 |
| `2023/02/Kleine-Testhalle.jpg` | 원본이 `SAC-10 Hybrid – Kösching` 제목 아래 셋째로 걸어 둔 것. 벽 한 면만 흡수체이고 나머지는 차폐 패널인 별개의 방 |

설치 1곳당 파노라마 1장으로 정했다. 파일명이 `Grosse`(대형)·`Kleine`(소형)
테스트홀을 구분하지만 **원본 페이지는 그 구분을 표기하지 않으므로 옮기지 않았다** —
파일명을 캡션으로 옮기지 않는다는 규칙 그대로다.

## 5. 대응 관계

| 원본 | 이 사이트 |
|---|---|
| 슬라이더 6장 | `.figure-wide` 도판 1장 (`reference-3.webp`), 원본처럼 `alt=""` |
| 도입 문단 2개 | `Prose` (`.prose`) |
| `h2` 360° Panoramas + h3 ×3 + 뷰어 7개 | `.alt` 밴드 · `SubHead` ×3 + **신규 `.pano`** ×3 |
| `h2` Some of our references: + 2단 106건 | `EntryList` (`.entry-list`), 국가별 29그룹 |
| `Contact us ▸` | 옮기지 않음 — `PageShell`의 문의 밴드 |

`topicMeta.references.description`(네브·검색 스니펫·SEO)도 함께 갱신했다.

### 신규 CSS: `.pano`

`.figure`에 얹어 쓰는 변형이다. `.figure`에서 테두리·라운드·`.alt` 배경·`figcaption`을
그대로 받고, 내부 스크롤러만 새로 만든다. 그림자 없음, 토큰만 사용, 브레이크포인트는
기존 1100 / 700에만 붙였다(높이 460 → 400 → 280px). 스크롤러가 `tabindex="0"`을 갖는다 —
키보드만 쓰는 독자도 좌우 화살표로 팬할 수 있어야 한다.

## 6. 이전 버전에서 걷어낸 것

**`topicMeta.references.description`의 "전 세계 120여 개 고객사" / "more than 120
customers worldwide".** 근거가 없다. 본사 목록은 106건이고, 2026 카탈로그·포토북 전문을
검색해도 고객 수·설치 수를 말하는 숫자는 없다(`more than 35 years`만 반복된다).
실측치인 **106건 / 28개국**으로 바꿨다. 두 숫자는 렌더 시점에 `referenceGroups`에서
세므로 목록을 고치면 따라 움직인다 — 다만 `description`은 정적 문자열이라 손으로
맞춰야 한다.

## 7. 이 페이지 범위 밖이라 보류한 것

- **모델 상세 페이지**: 27개 모델의 `source` 슬러그가 `app/chamber-sections.ts`에 있고,
  본사 개별 이미지는 [chambers-assets.md](chambers-assets.md) 2절에 목록이 있다.
- **Test Systems 브랜치**: 같은 구조의 References 페이지가 따로 있는지 확인하지 않았다.
- **본사 슬라이더 나머지 3장**(`References-2/4/6`): 위 표에 URL과 내용을 적어 두었다.
- **Pannellum 수준의 진짜 360° 뷰어**: 지금은 원통 밴드를 가로로 끄는 방식이다. 천장·바닥까지
  보여주려면 클라이언트 JS가 필요하고, 이 사이트는 정적 export에 네브 드로어 외에는
  스크립트를 두지 않는다는 전제가 있다.
