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

### 채운 것 (32개 모델 전부)

| 브랜치 | 모델 | 인쇄 p. |
|---|---|---|
| Military | MIL CHC · MIL-STD Chamber · MIL-STD Chamber Advanced | 54–55 |
| Automotive | ACTC · UCC · SAC-10V · AVTC | 40–45 |
| Powertrain | EDTC-SA · EDTC-AX · EDTC-BB | 48–49 |
| RVC (7종) | RVC e1 · e2 (Commercial) · RVC S · M · L · XL · XXL (Automotive) | 50–51 |
| Commercial — Shielded Room | Shielded Room | 10–11 |
| Commercial — CHC·CTC·FAC | CHC · CHC Plus · CTC · FAC-3 · FAC-3 L | 12–13, 16–17 |
| Commercial — SAC | SAC-3 Plus · SAC-5 Plus · SAC-3 Square · SAC-5 Square · SAC-3/FAC-3 Transformer · SAC-10 Plus · SAC-10 Plus Triton · SAC-10/H Hybrid · SAC-10/P Pyramid | 18–37 |

**Reverberation Tent는 제품 목록에서 제거했다** (2026-08-10, 사용자 결정). 2026
카탈로그에 없었고, 카탈로그를 기준으로 삼기로 한 이상 목록에 남길 근거가 없다. 본사
웹사이트에는 `/portfolio/reverberation-tent/`가 아직 살아 있으므로, 본사가 웹을 정리할
때 다시 확인할 사항으로 남는다.

제거에 따라 함께 고친 것: `others` 산업 3종→2종, `rvc` 형식 2종→1종, 두 카테고리의
설명문(한/영)에서 텐트 언급 삭제, 랜딩 Others 카드의 모델 표기. 전체 모델 27→26.

**Shielded Room은 카탈로그를 따라 Commercial로 옮겼다.** 앞서 `others`에 두고 카탈로그와
다르다고 적어 두었던 항목이다. RVC 재분류로 Others 자체가 없어지면서 함께 해소됐다.

### RVC를 7종으로 펼치고 산업군을 나눴다 (2026-08-10, 사용자 지시)

카탈로그는 RVC를 **Commercial & Industrial**(e1·e2)과 **Automotive**(S·M·L·XL·XXL)
두 표로 나눠 준다. 앞서 한 항목에 범위로 압축해 두었던 것을 카탈로그의 구분대로 7종으로
펼치고, 표 제목이 곧 산업군이므로 그대로 배정했다. 각 모델은 치수 · 작업 체적 · 스터러
구성 · LUF를 개별로 갖는다.

RVC S·M의 "Products" 줄은 *Military or Automotive*라고 적지만 표 제목이 Automotive이므로
그쪽에 넣고, 설명문이 군수·자동차 부품 양쪽을 말하게 했다.

**이로써 Others 산업군이 비었다.** 잔향실은 시험 대상별로, 차폐룸은 카탈로그가 넣은
Commercial로 갔다. `chamberIndustries`를 공유 목록에서 분리해 4종으로 줄였다 —
`industries` 자체는 시험 시스템 브랜치가 아직 `others`를 쓰므로 5종 그대로다. 슬러그를
공유하는 이유는 두 브랜치가 서로를 가리키기 위해서이지 같은 카테고리를 가져야 해서가
아니다.

타입 체커가 이 변경에서 세 곳을 잡았다: 산업 라우트 가드가 `others`를 통과시키고 있었고,
시험 시스템 → 챔버 교차 링크가 없어질 페이지를 가리키고 있었다. 후자는 조건부로 바꿨다.

### 치수 범위로 적은 모델

한 항목이 카탈로그의 여러 구성을 대표하는 경우, 최소~최대를 범위로 적었다.

| 모델 | 적은 값 |
|---|---|
| SAC-10/H Hybrid | ø3.0m(18,380×12,830×8,550) ~ ø6.0m(21,680×15,680×8,700) |
| SAC-10/P Pyramid | ø3.0m(21,680×13,730×8,550) ~ ø6.0m(24,980×17,180×9,000) |

### 산문 이관 — 구조와 첫 페이지

`ChamberTopic`에 `topicBody`를 추가했다: 리드 문단 · 제목이 붙은 체크리스트 그룹 ·
마무리 문장 · 장식용 이미지. **본문이 있는 페이지는 "콘텐츠 준비 중" 밴드를 스스로
내린다** — `spec`과 같은 규칙이고, 페이지 단위로 들어와도 나머지가 그대로 동작한다.

새 컴포넌트는 만들지 않았다. Company 페이지가 이미 세운 `.prose` · `.check-list` ·
`.figure-wide`를 그대로 쓴다.

| 토픽 | 인쇄 p. | 상태 |
|---|---|---|
| Frankosorb® | 58–59 | ✅ 426단어 · 5그룹 20항목 |
| Shielding & Gates | 62–63 | ✅ 339단어 · 6그룹 26항목 |
| Automation | 64–65 | ✅ 204단어 · 2그룹 11항목 |
| Extended Services | 6–7 | ✅ 249단어 · 3그룹 14항목 |
| References | — | **카탈로그에 대응 스프레드 없음** — 본사 웹 References 페이지에서 가져와야 한다 (이미지 3장은 이미 확보) |

Shielding과 Automation은 확보해 둔 이미지를, Extended Services는 카탈로그 인쇄 p.7의
굴착기 사진을 새로 추출해 본문 밴드로 썼다. 카탈로그의 오타 하나는 교정했다 —
Automation 스프레드의 "compliant wiht CISPR 16-1-4".

**기술 토픽 5개 중 4개 완료.** 남은 References는 카탈로그에 스프레드가 없어 본사 웹에서
가져와야 하고, 그 페이지 이미지 3장 중 2장은 아직 열어 보지 않았다(위 §1 표 참조).

흡수체 명칭(P600, H1300 Turbine), 규격 번호와 그 옆의 수치는 번역하지 않는다 — 도면과
견적서에 맞춰 볼 값이다.

**메타 설명의 연수를 카탈로그에 맞춰 고쳤다.** 기존 설명은 "30년간 자체 개발"이라고
적혀 있었는데 카탈로그는 "35년 이상 무결함 가동"이라고 말한다. 같은 페이지의 본문과
검색 스니펫이 서로 다른 연수를 말하고 있었다.

