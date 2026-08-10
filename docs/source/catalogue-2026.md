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
