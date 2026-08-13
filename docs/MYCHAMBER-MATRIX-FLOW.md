# MyChamber 질문 과정 — Chamber Matrix 원본 정리

원본: `MyChamber/Chamber Matrix-extention.pdf` (2026-08-12, 본사 손글씨 확장판).
초판 `MyChamber question Matrix.pdf` (2026-08-11)와의 차이는 ① 세그먼트별 설문
Ⓐ~Ⓓ·ⓧ 추가, ② 네 번째 세그먼트 **Special Chambers** 추가, ③ "Commercial" →
**"Commercial Industrial"** 개명 세 가지뿐이다.

이 문서는 매트릭스를 **질문 순서와 그 끝에 나오는 모델**로 옮겨 적은 것이다.
MyChamber 위저드의 질문은 이 문서를 따른다 — 여기 없는 질문은 묻지 않고,
여기 있는 질문은 이 순서대로 묻는다.

---

## 0. 최상위 — 질문 1 「분야」

매트릭스는 네 개의 상자를 그리고 각각을 독립된 트랙으로 둔다. 겹치는 선이 없으므로
**단일 선택**이다.

| 선택 | 트랙 | 끝 |
| --- | --- | --- |
| Automotive | §1 | 모델 |
| Commercial · Industrial | §2 | 모델 |
| Military | §3 | 모델 |
| Special Chambers | §4 | 설문 Ⓓ (모델 없음) |

네 상자와 별개로 **ⓧ Custom Request**가 트리 옆에 따로 그려져 있다 — 최상위 레벨의
독립 상자.

### custom 노드 — 매트릭스가 그린 위상

매트릭스는 각 세그먼트 상자에 `custom` 원을 하나씩 달아 설문 Ⓐ/Ⓑ/Ⓒ/Ⓓ로 보낸다.
상자에서 직접 나온 선이므로 **모델로 끝나는 가지들과 형제**다. 따라서 각 세그먼트의
2번 질문 **마지막 선택지**로 구현한다 — 자기 자리를 찾을 수 있는 독자는 찾도록,
맨 뒤에 둔다.

| 노드 | 위치 | 결과 |
| --- | --- | --- |
| Automotive `custom` | 질문 2 마지막 선택지 | 설문 Ⓐ |
| Commercial `custom` | 질문 2 마지막 선택지 | 설문 Ⓑ |
| Military `custom` | 질문 2 마지막 선택지 | 설문 Ⓒ |
| Special `custom` (Ⓓ) | 질문 2 마지막 선택지 «그 외 특수 측정» | 설문 Ⓓ |
| **ⓧ Custom Request** | 질문 1에는 두지 않음 | 각 질문 하단 링크 → 설문 ⓧ |

ⓧ는 매트릭스상 최상위 상자지만 질문 1의 다섯 번째 선택지로 두지 않는다. 첫 화면은
분야 선택에만 집중시키고, 세그먼트를 아직 못 고른 독자는 하단 링크로 ⓧ에 닿는다.

### 탈출구 규칙

매트릭스는 3번 질문 이하에 custom을 그리지 않았지만, 10 m 정온 영역까지 내려온
독자가 2번 질문으로 되돌아가야 빠져나갈 수 있는 것은 실제로 나쁘다. 규칙:

> **현재 질문이 이미 설문으로 가는 선택지를 갖고 있으면 하단 링크를 숨긴다.**

세그먼트 2번 질문과 10 m 정온 영역 질문(«그 외 · 맞춤 치수»)은 선택지로, 나머지
모든 질문은 하단 링크로 탈출구를 가진다. 한 화면에 문이 두 개 그려지는 일은 없다.

### 지금까지의 답을 설문으로 가져간다 (carry)

각 가지에 `carry`를 달아 경로를 따라 누적하고, 설문을 열 때 초기값으로 넘긴다.
설문의 필드 id·선택지 id와 같은 어휘를 쓰며, 두 파일을 묶어 주는 것은
`tests/mychamber-matrix.test.mjs`의 «what a branch carries» 테스트다.

| 경로 | 설문에 실리는 값 |
| --- | --- |
| Automotive → 부품 / 완성차 / E-Drive | Ⓐ `eut` |
| Automotive → 잔향실 → 부품 / 완성차 | Ⓐ `eut` |
| Automotive → E-Drive → 부하기 3종 | Ⓐ `driveSetup` |
| Commercial → SAC → 3 m / 5 m / 10 m | Ⓑ `distance` |
| Commercial → FAC | Ⓑ `distance` = 3 m |
| Military → 부품 / 차량 | Ⓒ `eut` |
| Military → 차량 → 하이브리드 / 80 MHz / 26 MHz | Ⓒ `startFreq` |
| Special → 네 과제 | Ⓓ `use` |

---

## 1. Automotive — 설문 Ⓐ

### 질문 2 「무엇을 시험하십니까」

| 선택 | 다음 |
| --- | --- |
| Components | 질문 3-A |
| Vehicle | 질문 3-B |
| Reverberation | 질문 3-C |
| E-Drive | 질문 3-D |
| 이 가운데 없습니다 (`custom`) | 설문 Ⓐ |

### 질문 3-A — Components 「시험 수준」

| 선택 | 결과 |
| --- | --- |
| Reverberation | **RVC S / RVC M** |
| Pre-compliance | **UCC** |
| Full compliance | **ACTC** |

### 질문 3-B — Vehicle 「측정 거리」

| 선택 | 결과 / 다음 |
| --- | --- |
| 3 m | **AVTC** |
| 10 m | 질문 4-B |

### 질문 4-B — Vehicle 10 m 「구성」

| 선택 | 결과 / 다음 |
| --- | --- |
| SAC-10V | 질문 5-B (흡수체) |
| SAC-10VC | **SAC-10V** — 5.0 m로 시작해 10.0 m 대응을 준비해 두는 VC 구성 |

### 질문 5-B — SAC-10V 「흡수체」

| 선택 | 결과 |
| --- | --- |
| Hybrid | **SAC-10V** — SAC-10V-6/H |
| Pyramid | **SAC-10V** — SAC-10V-6/P |

### 질문 3-C — Reverberation 「피시험체」

| 선택 | 결과 / 다음 |
| --- | --- |
| Components | **RVC S / RVC M** |
| Vehicle | 질문 4-C |

### 질문 4-C — 잔향실 차량용 「스터러」

매트릭스에 `RVC L / XL / XXL ← (with stirrer details)`라고 적힌 그 질문이다.

| 선택 | 결과 |
| --- | --- |
| Z-폴드 스터러 | **RVC L** |
| 대형 디스크 ø9.0 m | **RVC XL** |
| 대형 디스크 ø12.0 m (대형 차량) | **RVC XXL** |

### 질문 3-D — E-Drive 「부하기」

| 선택 | 결과 |
| --- | --- |
| Mobile Dyno | **EDTC-BB** (EMC-BlueBox 포함) |
| Fixed Single Dyno | **EDTC-SA** |
| Fixed Axis Dyno | **EDTC-AX** |

> 매트릭스의 `EDTC`는 카탈로그 정식 명칭 **EDTC-SA**다.

---

## 2. Commercial · Industrial — 설문 Ⓑ

### 질문 2 「시험 방식과 인증 수준」

| 선택 | 결과 / 다음 |
| --- | --- |
| Reverberation | **RVC e1 / RVC e2** |
| Pre-compliance | **CHC / CTC** |
| Full compliance SAC | 질문 3-B |
| Full compliance FAC | 질문 3-C |
| 이 가운데 없습니다 (`custom`) | 설문 Ⓑ |

### 질문 3-B — SAC 「측정 거리」

| 선택 | 결과 / 다음 |
| --- | --- |
| 3 m | **SAC-3 Plus / SAC-3 Square** |
| 5 m | **SAC-5 Plus / SAC-5 Square** |
| 10 m | 질문 4-B |

### 질문 4-B — 10 m 「라이닝 · 구성」

| 선택 | 결과 / 다음 |
| --- | --- |
| Hybrid | 질문 5-B → **SAC-10/H** |
| Pyramid | 질문 5-B → **SAC-10/P** |
| Special | **SAC-10 Plus / SAC-10 Plus Triton** |

### 질문 5-B — 10 m 「정온 영역(QZ)」

매트릭스가 `Q2: 3m/4m/5m/6m/Custom`이라고 두 번(하이브리드·피라미드) 적어 둔 질문.

| 선택 | Hybrid | Pyramid |
| --- | --- | --- |
| ø3.0 m | SAC-10-3/H | SAC-10-3/P |
| ø4.0 m | SAC-10-4/H | SAC-10-4/P |
| ø5.0 m | SAC-10-5/H | SAC-10-5/P |
| ø6.0 m | SAC-10-6/H | SAC-10-6/P |
| Custom | 맞춤 설계 → 설문 Ⓑ | 맞춤 설계 → 설문 Ⓑ |

### 질문 3-C — FAC 「구성」

| 선택 | 결과 |
| --- | --- |
| 테이블탑 피시험체 | **FAC-3** |
| 거치형까지 (높이 스캔) | **FAC-3 L** |
| 반무향·완전무향 모두 | **SAC-3 / FAC-3 Transformer** |

---

## 3. Military — 설문 Ⓒ

### 질문 2 「피시험체」

| 선택 | 다음 |
| --- | --- |
| Components | 질문 3-A |
| Vehicle | 질문 3-B |
| 이 가운데 없습니다 (`custom`) | 설문 Ⓒ |

### 질문 3-A — Components 「흡수체」

| 선택 | 결과 |
| --- | --- |
| Hybrid | **MIL CHC** |
| Pyramid | **MIL CPC** (MIL CHC 모델 페이지의 피라미드 구성) |

> 매트릭스의 `MIL CPL`은 판독 확정치 **MIL CPC**.

### 질문 3-B — Vehicle 「흡수체」

| 선택 | 결과 / 다음 |
| --- | --- |
| Hybrid | **MIL-STD Chamber Advanced** — Advanced Hybrid (30 MHz~40 GHz) |
| Pyramid | 질문 4-B |

### 질문 4-B — 피라미드 「시작 주파수」

매트릭스의 `MIL STD 80 (P600)` / `MIL STD 30 (P2400)`. 두 숫자는 모델명이 아니라
흡수체가 대응하는 시작 주파수다.

| 선택 | 결과 |
| --- | --- |
| 80 MHz부터 — 쇼트 피라미드 P600 | **MIL-STD Chamber** |
| 26 / 30 MHz부터 — 장피라미드 P2400 | **MIL-STD Chamber Advanced** — Advanced Pyramid |

---

## 4. Special Chambers — 설문 Ⓓ

### 질문 2 「측정 과제」

| 선택 | 결과 |
| --- | --- |
| SAT chamber | 설문 Ⓓ |
| Antenna Components (OTA) | 설문 Ⓓ |
| Antenna Vehicle | 설문 Ⓓ |
| RCS chamber | 설문 Ⓓ |
| 그 외 특수 측정 (`custom`) | 설문 Ⓓ |

카탈로그 모델이 없는 트랙이다. 네 과제 모두 설계팀 검토로 직행하며, 선택한 과제는
설문 Ⓓ의 「측정 과제」에 미리 채워진 채로 열린다. 다섯 번째 선택지는 매트릭스가
Special 상자에 달아 둔 `custom` 원 — 네 과제 어디에도 없는 측정이다.

---

## 5. 매트릭스가 다루지 않는 것

| 항목 | 처리 |
| --- | --- |
| **CHC Plus** | 매트릭스에 없다. 카탈로그상 CHC의 상위 구성(1~18 GHz 정식 인증)이므로 Commercial 사전 인증 결과에 CHC·CTC와 함께 세 번째 카드로 제시한다. |
| **Shielded Room** | 매트릭스에 없다. EMC 시험장이 아니라 전 제품군의 바탕이 되는 차폐 구조물이므로 MyChamber에서 제외하고 `/chambers/` 아래 자체 제품 페이지에 맡긴다. 카탈로그 32종 중 위저드가 도달하지 않는 유일한 모델이며, 이 사실은 `tests/mychamber-matrix.test.mjs`가 고정한다. |
| **시험 종류(CI/RI/CE/RE)·규격** | 매트릭스는 묻지 않는다. 위저드 흐름에서 빼고, 각 세그먼트 설문 Ⓐ~Ⓓ·ⓧ에서 받는다. |
| **SAC-10VC** | 별도 카탈로그 모델이 아니라 SAC-10V의 구성이다. Automotive 10 m 분기의 선택지로 두고 결과 카드는 SAC-10V로 낸다. |

---

## 6. 질문 수

| 경로 | 질문 수 |
| --- | --- |
| 어느 세그먼트든 · `custom` → 설문 Ⓐ/Ⓑ/Ⓒ/Ⓓ | 2 |
| Automotive · 부품 · 정식 인증 → ACTC | 3 |
| Automotive · E-Drive · 2축 → EDTC-AX | 3 |
| Automotive · 차량 · 10 m · 하이브리드 → SAC-10V-6/H | 5 |
| Commercial · 사전 인증 → CHC / CHC Plus / CTC | 2 |
| Commercial · SAC · 3 m → SAC-3 Plus / Square | 3 |
| Commercial · SAC · 10 m · 피라미드 · ø5.0 m → SAC-10-5/P | 5 |
| Military · 차량 · 피라미드 · 80 MHz → MIL-STD Chamber | 4 |
| Special · OTA → 설문 Ⓓ | 2 |

최대 5문항. 기존 스코어링 흐름의 최대 8문항에서 줄어든다.

---

## 7. 설문 Ⓐ~ⓧ의 필드

매트릭스는 원 안에 이름만 적어 두었으므로 필드 구성은 우리가 설계한 것이다. 본사가
필드를 지정해 오면 `app/mychamber-questionnaires.ts` 하나만 고치면 된다.

● 필수 · ○ 선택 · ◐ 조건부

| | Ⓐ Automotive | Ⓑ Commercial | Ⓒ Military | Ⓓ Special | ⓧ Custom |
| --- | --- | --- | --- | --- | --- |
| 피시험체 / 측정 과제 | ● `eut` | ● `eut` | ● `eut` | ● `use` | ○ `field` |
| 측정 대상 서술 | — | — | — | ● `object` | — |
| **피시험체 치수 · 중량** | ● `eutSize` | ● `eutSize` | ● `eutSize` | — | ○ `eutSize` |
| 부하기 구성 · 출력 | ◐ `driveSetup` `drivePower` | — | — | — | — |
| 측정 거리 | — | ○ `distance` | — | — | — |
| **정온 영역 (QZ)** | — | ○ `qz` | — | — | — |
| 시작 주파수 | — | — | ○ `startFreq` | — | — |
| 주파수 범위 | ○ `freq` | ○ `freq` | **○ `freq`** | ○ `freq` | ○ `freq` |
| 규격 체크박스 | ○ | ○ | ○ | — | — |
| 요구사항 | ● | ● | ● | ● | ● |
| 도입 시기 · 설치 환경 | ○ ○ | ○ ○ | ○ ○ | ○ ○ | ○ ○ |

굵게 표시한 셋이 2026-08-13에 더한 것이다.

- **피시험체 치수 · 중량** — 챔버 크기를 정하는 첫 숫자인데 자유 서술에만 의존하고
  있었다. 세그먼트를 아는 Ⓐ~Ⓒ에서는 필수, ⓧ에서는 선택.
- **정온 영역** — 10 m 분기의 «Custom»이 Ⓑ로 오는데 정작 QZ를 적을 칸이 없었다.
  다른 세 분기에서 온 독자는 적을 값이 없으므로 선택 항목.
- **Ⓒ 주파수 범위** — 시작 주파수(하한)만 묻고 있었다. MIL-STD-461·DO-160은
  상한 18 GHz / 40 GHz가 흡수체와 페라이트 사양을 가른다.
- **부하기 구성 · 출력**(◐)은 `eut = edrive`일 때만 나타난다. `QField.when`으로
  구현했고, 숨은 필드는 필수가 되지도 메일에 실리지도 않는다.

Ⓓ·ⓧ에 규격 체크박스를 두지 않은 것은 의도적이다. OTA·RCS 측정법 규격(CTIA,
3GPP, IEEE 149 등)이 카탈로그의 `standards` 목록에 없어, 목록을 새로 지어내는 대신
자유 서술로 받는다.
