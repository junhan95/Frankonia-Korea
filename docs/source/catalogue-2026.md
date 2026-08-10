# Anechoic Chambers 2026 · Photobook 2026 — 원장

수령일 **2026-08-10**, 사용자 제공. 저장소 밖에 있다:

```
D:\FRANKONIA\Frankona-Korea\Frankonia Anechoic Chambers 2026.pdf   35p · 16.3MB
D:\FRANKONIA\Frankona-Korea\Frankonia Photobook 2026.pdf           27p · 14.5MB
```

**아직 어느 것도 사이트에 반영하지 않았다.** 이 문서는 무엇이 들어 있고 무엇에 쓸 수
있는지를 기록한 것이다.

## 1. 카탈로그가 담고 있는 것

스프레드 레이아웃(PDF 1p = 인쇄 2p). 모델별로 **설명 산문 + Features 불릿 + 치수표 +
주파수 범위 + Performance & Compliance + 사진/렌더**가 한 세트로 들어 있다. 지금
"콘텐츠 준비 중"으로 비어 있는 32페이지의 본문이 정확히 이 형식이다.

| 인쇄 p. | 내용 | 대응 라우트 |
|---|---|---|
| 6 · 7 | Solution Portfolio / Extended Services | `/chambers/services` |
| 10 | Shielded Room (PAN Type) | `/chambers/type/shielded-room` |
| 12 | CHC & CTC | `/chambers/type/chc` |
| 16 | FAC-3 & FAC-3 L | `/chambers/type/fac` |
| 18 · 20 | SAC-3 Plus · SAC-5 Plus | `/chambers/type/sac` |
| 24 · 26 | SAC-3/5 Square · SAC-3/FAC-3 Transformer | `/chambers/type/sac` |
| 30 · 34 · 36 | SAC-10 Plus Triton · SAC-10/H Hybrid · SAC-10/P Pyramid | `/chambers/type/sac` |
| 40 · 42 · 44 · 48 | ACTC & UCC · AVTC · SAC-10V · EDTC & BlueBox | `/chambers/industry/automotive`, `/powertrain` |
| 50 | Reverberation Chambers | `/chambers/type/rvc` |
| 54 | MIL CHC & MIL CPC · MIL-STD & MIL-STD Advanced | `/chambers/industry/military` |
| 58 · 62 · 64 | Frankosorb® · Shielding & Accessories · Automation | `/chambers/frankosorb`, `/shielding-gates`, `/automation` |
| 66 | Advantages & Benefits | — |

예시로 확보한 실제 수치 (인쇄 p.54–55, 군용):

| 구성 | 치수 (L×W×H) | 주파수 |
|---|---|---|
| MIL-STD Chamber | 맞춤 | 9kHz / 80MHz–40GHz, short-pyramid |
| MIL-STD Advanced Pyramid | 맞춤 | 9kHz / 26MHz–40GHz, long-pyramid |
| MIL-STD Advanced Hybrid | 맞춤 | 9kHz / 30MHz–40GHz, hybrid |
| MIL CHC | 4,880 × 4,880 × 3,000 | 9kHz / 30MHz–40GHz, hybrid |
| MIL CHC / DO-160 | 5,330 × 4,880 × 3,000 | 9kHz / 30MHz–40GHz, hybrid |
| MIL CPC | 6,080 × 5,380 × 3,750 | 9kHz / 80MHz–40GHz, short-pyramid |

## 2. 카탈로그가 본사 웹사이트보다 **앞서 있다**

카탈로그 목차는 군용 제품으로 **MIL CHC · MIL CPC · MIL-STD · MIL-STD Advanced** 넷을
든다. 그런데 본사 웹사이트의 군용 포트폴리오 페이지는 셋뿐이다:

```
/portfolio/mil-chc/   /portfolio/mil-std-chamber/   /portfolio/mil-std-chamber-advanced/
/portfolio/mil-cpc/ → 404
```

우리 `chamberModels`의 군용 3종은 **웹사이트를 정확히 반영한 것이고 틀리지 않았다.**
차이는 카탈로그가 더 최신이라는 데 있다.

**그래서 MIL CPC를 임의로 추가하지 않았다.** 추가하면 본사가 웹에 공개하지 않은 제품을
이 사이트가 먼저 싣게 되고, `source` 슬러그(본사 포트폴리오 대응)도 비게 된다. 본사
확인이 필요한 사안이다.

같은 이유로 카탈로그에만 있는 다른 항목(MIL CHC / DO-160, MIL-STD Advanced의
Pyramid·Hybrid 구분)도 보류했다. 이들은 제품이 아니라 기존 제품의 구성·치수 변형으로
읽히므로, 반영한다면 모델 목록이 아니라 **모델 상세 페이지의 사양표**에 들어가야 한다.

## 3. 포토북

"IMPRESSIONS — Anechoic Chambers". 순수 사진집이고 텍스트가 거의 없다. 챔버 내부
광각, Frankosorb 흡수체 클로즈업, 제어실, 차량 챔버, 설비 외부 등 고품질 사진 다수.

`public/chambers/images/`에 지금 5장뿐인 것을 생각하면 **가장 큰 이미지 공급원**이다.
특히 `docs/source/chambers-assets.md`에 적어 둔 **Others 카테고리 이미지 부재**를 여기서
해결할 수 있는지 확인할 가치가 있다.

추출 시 주의: PDF 내장 이미지는 CMYK JPEG일 수 있어 웹용 sRGB 변환이 필요하고, 인쇄
해상도라 웹 크기로 줄여야 한다. 기존 규약(webp q82, `withoutEnlargement`)을 따른다.

## 4. Downloads 페이지 — 지금 바로 채울 수 있는 것

Downloads는 "카탈로그 · 포토북 · 서비스 포트폴리오 · ISO 9001 인증서"를 약속하고 비어
있다. 본사가 **이미 공개 호스팅 중인** 파일을 확인했다:

```
ISO 9001 (EN)  /wp-content/uploads/2022/07/Zertifikat-ISO-9001_2015-engl.pdf
ISO 9001 (DE)  /wp-content/uploads/2022/07/Zertifikat-ISO-9001_2015.pdf
Service (EN)   /wp-content/uploads/2025/11/Service-Broschure_EN_PDF.pdf
Service (DE)   /wp-content/uploads/2025/11/Service-Broschure_DE_PDF.pdf
```

약속한 넷 중 **둘(서비스 포트폴리오·ISO 9001)은 링크만 걸면 지금 채워진다.**

**나머지 둘(카탈로그·포토북)은 본사가 공개 호스팅하지 않는다.** Download Area에 없다.
사용자가 준 이 두 PDF를 우리가 공개 저장소에 올리면 본사가 공개하지 않기로 한 자료를
대신 공개하는 셈이 된다. 게다가 합계 31MB로 git 히스토리에 영구히 남는다. **본사 승인
없이 올리지 않는다.**

---

## 5. 본문 이관 — 진행 상황

`ChamberModel`에 선택적 `spec { size, range }`를 추가했다. 카탈로그가 모델마다
**치수와 "주파수 범위 + 흡수체 라이닝"을 항상 함께** 제시하므로 그 짝을 그대로 옮긴다
(하나만으로는 의미가 없기 때문에 카탈로그가 그렇게 쓴 것이다). 값은 번역하지 않는다 —
측정값과 규격 표기이고, 독자가 견적서·도면과 대조할 대상이다.

`spec`이 없는 모델은 이전과 똑같이 렌더된다. 데이터는 모델 단위로 들어오고, 페이지는
가진 것만 보여준다.

### ⚠ 카탈로그의 단위 오기

치수표의 단위가 **전부 `m`으로 적혀 있는데 미터일 수 없다.** 군용 MIL CHC는
`4,880 x 4,880 x 3,000 m`(4.88km짜리 챔버), Automotive ACTC는 `6,380 x 5,480 x 3,750 m`,
SAC-10V는 `22,580 x 15,680 x 8,700 m`이다. 전부 밀리미터가 맞다. 사이트에는 `mm`로
적었다 — 카탈로그 표기를 그대로 옮기면 명백한 오류를 게시하는 것이 되기 때문이다.
**한 페이지의 오타가 아니라 표 전체에 걸친 문제이므로 본사에 알려야 한다.**

### 채운 것 (27개 모델 중 17개)

| 브랜치 | 모델 | 인쇄 p. |
|---|---|---|
| Military | MIL CHC · MIL-STD Chamber · MIL-STD Chamber Advanced | 54–55 |
| Automotive | ACTC · UCC · SAC-10V · AVTC | 40–45 |
| Powertrain | EDTC-SA · EDTC-AX · EDTC-BB | 48–49 |
| RVC | Reverberation Chamber | 50–51 |
| Commercial — Shielded Room | Shielded Room | 10–11 |
| Commercial — CHC·CTC·FAC | CHC · CHC Plus · CTC · FAC-3 · FAC-3 L | 12–13, 16–17 |

MIL-STD Advanced는 카탈로그가 Pyramid·Hybrid 두 행으로 나눠 적는다. 별도 제품이 아니라
같은 제품의 흡수체 구성이므로 한 항목에 둘 다 적었다.

### 크기 변형은 목록에 넣지 않는다

카탈로그는 모델마다 크기 변형을 함께 표로 준다 — ACTC L, AVTC L·XL, SAC-10V의
`-6/H`·`-6/P`·SL12·SL18, MIL CHC / DO-160. **목록에는 기본 구성 하나만 싣고** 변형은
넣지 않았다. 별도 제품이 아니라 같은 제품의 치수 옵션이고, 목록에 다 넣으면 카테고리
개수가 제품 수가 아니라 구성 수가 된다. 변형은 **모델 상세 페이지의 사양표** 자리다.

목록에 실은 기본 구성: ACTC(6,380×5,480×3,750), UCC(4,580×3,080×2,550),
AVTC(11,480×9,380×6,000), SAC-10V-6/H(22,580×15,680×8,700), CHC(7,355×3,755×3,300),
CHC Plus(7,355×3,755×3,300), FAC-3(8,705×4,655×3,750).
빠뜨린 변형: ACTC L, AVTC L·XL, SAC-10V 4구성, MIL CHC/DO-160, **CHC L**, **CHC Plus L**.

### `spec.note`

Automotive 표는 **치수 행마다 시험거리·정숙구역(QZ) 주석**을 달고 주파수 범위는 제품당
한 행으로 따로 준다. Military 표는 그 둘을 한 칸에 합쳐 쓴다. 그래서 `note`는 선택
필드다 — 카탈로그가 나눠 쓴 곳에서만 나눠 싣는다.

### E-Drive 표에는 주파수가 없다

EDTC 스프레드는 치수와 부하기(load machine) 구성만 준다. 주파수 범위 행이 아예 없고,
적합성은 Features의 "Fully compliant with CISPR 25 and ISO 11452"로만 진술된다. 이
챔버들은 주파수가 아니라 **어떤 부하기를 중심으로 지어졌는지로 규정되기 때문**이다.
그래서 `spec.range`를 선택 필드로 바꿨다 — 빈칸을 채우려고 만든 수치는 카탈로그가 주지
않은 수치다.

### RVC는 단일 치수가 없다

카탈로그는 RVC를 상용·산업(e1·e2)과 Automotive(S·M·L·XL·XXL) 두 계열, 총 7개 구성으로
준다. 우리 목록의 `Reverberation Chamber` 한 항목이 그 전체를 대표하므로 **범위로
적었다** — 최소(S)부터 최대(XXL)까지, 작업 체적도 같은 방식. LUF는 200MHz(S·M·e1)와
80MHz(L·XL·XXL·e2)로 갈리므로 "200MHz, 큰 챔버는 80MHz"로 적었다. 요약이지 축약이
아니다.

### 카탈로그와 웹사이트가 서로 없는 것을 갖고 있다

| 항목 | 카탈로그 | 웹사이트 |
|---|---|---|
| MIL CPC | ✅ | ❌ 404 |
| EDTC-HY (유압 부하기) | ✅ | ❌ 404 |
| Reverberation Tent | ❌ | ✅ `/portfolio/reverberation-tent/` |

앞의 둘은 앞서 정한 대로 추가하지 않았다. 세 번째는 **반대 방향**이다 — 웹사이트에는
있는데 2026 카탈로그에서 빠졌다. 단종인지 카탈로그 누락인지 알 수 없어 목록에 남겨
두되 `spec` 없이 두었다. **본사 확인 사항.**

27개 모델 전체의 `source` 슬러그를 본사 포트폴리오에 대조했다 — **전부 200, 끊어진
포인터 없음.**

### 남은 브랜치 (10개 모델)

| 브랜치 | 모델 | 카탈로그 인쇄 p. |
|---|---|---|
| Commercial — SAC | SAC-3 Plus/Square, SAC-5 Plus/Square, SAC-10 Plus/Triton, SAC-10/H, SAC-10/P, Transformer | 18–37 |
| RVC | Reverberation Tent (카탈로그에 없음 — 위 참조) | — |
| 기술 토픽 | Frankosorb, Shielding & Gates, Automation, Services | 58, 62, 64, 6–7 |

각 브랜치는 해당 스프레드를 전문으로 읽고 `spec`을 채운 뒤 산문을 옮기는 순서로
진행한다. 산문까지 들어가면 "콘텐츠 준비 중" 밴드를 그 페이지에서 걷어낸다.
