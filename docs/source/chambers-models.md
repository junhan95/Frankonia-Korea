# Chambers — 모델별 원장

수집일 **2026-08-11**. 모델 상세 페이지(`/chambers/model/*`)의 원본 자료다.

## 0. 원본 두 가지와 우선순위

| 출처 | 무엇 | 위치 |
|---|---|---|
| **A. 2026 카탈로그** (기준) | 모델 스프레드 16면. 리드 산문 · Features · Absorbers · 치수표 · Performance & Compliance | `D:\FRANKONIA\Frankona-Korea\Frankonia Anechoic Chambers 2026.pdf` (저장소 밖) |
| **B. 본사 웹 포트폴리오** (보충) | 26페이지. Overview 요약 · Typical Product/Verification Standards · **Load capacity** · Turntable | `frankonia-solutions.com/portfolio/<슬러그>/` |

**사용자 결정 (2026-08-11): 카탈로그를 기준으로 삼고, 웹에만 있는 항목으로 보충한다.**
같은 값을 두 원본이 다르게 말하면 **카탈로그를 따르고, §3에 충돌로 기록한다.**

추출 방법 — 카탈로그는 `pdftotext -layout`으로 산문을, **치수표는 해당 인쇄면을 렌더해
직접 판독**했다. 표는 2단 레이아웃이라 텍스트 추출이 행과 값을 어긋나게 엮는다
(예: SAC Square 스프레드에서 5개 라벨과 5개 값이 서로 다른 줄로 붙었다). 웹은
`<table>` 셀을 그대로 받았다.

## 1. 스프레드 → 모델 대응

| 인쇄 p. | PDF p. | 스프레드 | 모델 |
|---|---|---|---|
| 10 | 6 | Shielded Room | Shielded Room |
| 12 | 7 | CHC & CTC | CHC · CHC Plus · CTC |
| 16 | 9 | FAC-3 & FAC-3 L | FAC-3 · FAC-3 L |
| 18 | 10 | SAC-3 Plus | SAC-3 Plus |
| 20 | 11 | SAC-5 Plus | SAC-5 Plus |
| 24 | 13 | SAC-3 Square & SAC-5 Square | SAC-3 Square · SAC-5 Square |
| 26 | 14 | SAC-3/FAC-3 Transformer | SAC-3 / FAC-3 Transformer |
| 30 | 16 | SAC-10 Plus Triton | SAC-10 Plus · SAC-10 Plus Triton |
| 34 | 18 | SAC-10/H Hybrid | SAC-10/H Hybrid |
| 36 | 19 | SAC-10/P Pyramid | SAC-10/P Pyramid |
| 40 | 21 | ACTC | ACTC · UCC |
| 42 | 22 | AVTC | AVTC |
| 44 | 23 | SAC-10V | SAC-10V |
| 48 | 25 | EDTC & BlueBox | EDTC-SA · EDTC-AX · EDTC-BB |
| 50 | 26 | Reverberation Chambers | RVC e1 · e2 · S · M · L · XL · XXL |
| 54 | 28 | Military Chamber Solutions | MIL CHC · MIL-STD Chamber · MIL-STD Chamber Advanced |

16면이 32 모델을 덮는다. 웹은 26페이지로 나뉘어 있고 RVC 7종이 한 페이지를 공유한다.

## 2. 치수 라벨 — 결론: **External dimension**

세 출처가 서로 다르게 말하고 있었다:

| 출처 | 표기 |
|---|---|
| 2026 카탈로그 | **라벨 없음.** 숫자와 `(L x W x H)`만 인쇄한다 |
| 본사 웹 | `External dimension (LxWxH)` |
| 지금 우리 사이트 | `Inner dimensions (L × W × H)` — 근거 없음 |

인쇄면을 렌더해 확인했다(인쇄 p.18). 표에는 열 머리가 아예 없고 행 레이블은 구성명
(`SAC-3 Plus S` …)이다. **"내부 치수"는 어느 원본도 하지 않은 말이다.**

**사용자 결정 (2026-08-11): External dimension으로 통일한다.** 라벨을 붙인 유일한
출처가 본사 웹이고, 설치 공간 산정에 쓰는 값도 외형 치수다. 모델 페이지뿐 아니라
**이미 나가 있는 형식·산업군 페이지의 표 머리와 `ChamberModel.spec.size` 주석도 함께
고쳐야 한다** — 지금 "inner dimensions"라고 적혀 있다.

## 3. 카탈로그 ↔ 웹 충돌 13건

**전부 카탈로그를 따랐다.** 본사에 확인을 요청할 목록이기도 하다.

| # | 모델 | 항목 | 카탈로그 (채택) | 웹 |
|---|---|---|---|---|
| 1 | UCC | 치수 | 4,580 × 3,080 × 2,550 | 4.280 × 3.080 × 2.550 |
| 2 | FAC-3 L | 치수 H | 9,380 × 5,780 × **6,000** | 9.380 × 5.780 × **5.550** |
| 3 | CHC Plus | 치수 | **7,355 × 3,755 × 3,300** | **7.880 × 4.880 × 3.450** |
| 4 | CHC Plus L | 치수 | 7,580 × 4,655 × 4,350 | 8.480 × 5.480 × 3.900 |
| 5 | SAC-10V-6/H | 치수 W | 22,580 × **15,680** × 8,700 | 22.580 × **15.980** × 8.700 |
| 6 | RVC M | 치수 W | 7,580 × **5,630** × 4,200 | 7.580 × **6.530** × 4.200 |
| 7 | RVC L | 치수 H | 13,880 × 11,480 × **6,300** | 13.880 × 11.480 × **6.375** |
| 8 | RVC XXL | LUF | **80 MHz** | **30 MHz** |
| 9 | Shielded Room | 차폐 성능 | 10 kHz 90 dB · 100 kHz 100 · 1 MHz 110 · 100 MHz 120 · 400 MHz 120 · 1 GHz 110 · 18 GHz 100 · 40 GHz 100 | ≥80 · ≥100 · ≥100 · ≥110 · ≥110 · ≥110 · ≥90 · ≥90 |
| 10 | ACTC · UCC | 주파수 하한 | **150 kHz / 26 MHz** to 18 GHz | 9 kHz / 150 kHz to 18 GHz |
| 11 | SAC 계열 다수 | 주파수 하한 | 30 MHz | 26 MHz |
| 12 | SAC-5 Square | 구성 이름 | SAC-5 Square / SAC-5 Square **L** / XL | 첫 두 열이 **둘 다 "SAC-5 Square L"** (웹 오기) |
| 13 | 차폐 규격 | 표기 | `EN 50147-1` | `EN 50247-1` (웹 오기로 보임) |

3·4번(CHC Plus)은 숫자가 통째로 다르다. 카탈로그가 CHC와 같은 셸(7,355)을 쓴다고
말하는 반면 웹은 더 큰 셸을 말한다. **치수 차가 가장 큰 항목이라 본사 확인이 필요하다.**

## 4. 카탈로그에만 있는 구성 — 모델 목록에는 넣지 않는다

`chamberModels`는 본사가 **제품으로 공개하는 단위**를 따른다. 아래는 그 제품의 크기
변형이므로 **모델 상세 페이지의 사양표 행**으로만 들어간다. (앞서 형식 인덱스 표에
같은 규칙을 적용했다 — `catalogue-2026.md` §6 참조.)

| 모델 | 카탈로그에만 있는 구성 |
|---|---|
| SAC-3 Plus | S · M · L · (무접미) 네 크기 — 웹은 S·M·L 셋만 |
| SAC-3 Square | SAC-3 Square L |
| SAC-5 Square | SAC-5 Square L · XL |
| SAC-5 Plus | SAC-5 Plus L |
| SAC-10/H | SAC-10-3/H · 4/H · 5/H · 6/H |
| SAC-10/P | SAC-10-3/P · 4/P · 5/P · 6/P |
| CHC | CHC L |
| CHC Plus | CHC Plus L |
| ACTC | ACTC L (11,480 × 6,580 × 4,500 — 차량 시험 가능) |
| AVTC | AVTC L · AVTC XL |
| SAC-10V | SAC-10VC-6/H · SAC-10V-6/H(3종) · SAC-10V-6/P(3종) — 총 7 구성 |
| EDTC | **EDTC-HY** (유압 부하기, 6,380 × 5,480 × 3,750) · EDTC-BB with turntable |
| MIL | **MIL CPC** (6,080 × 5,380 × 3,750) · MIL CHC / DO-160 (5,330 × 4,880 × 3,000) |

**EDTC-HY는 이번에 처음 발견했다.** 웹에도 없고 우리 모델 목록에도 없다.
MIL CPC와 같은 성격(카탈로그가 웹보다 앞서 있음)이므로 같은 판단을 적용한다 —
모델로 올리지 않고 사양표 행으로만 둔다.

EDTC 스프레드는 부하기 자체의 표도 싣는다. 챔버가 아니라 챔버에 들어가는 장비다:

- **외부 부하기** — EDTC-250: 1×250 kW · 3,000 RPM · 3,000 Nm / EDTC-500: 2×250 kW · 3,000 RPM · 3,000 Nm
- **EMC-BlueBox** — 30: 30 kW · 11,000 RPM · 82 Nm / 40: 40 kW · 9,000 RPM · 140 Nm /
  65: 63 kW · 6,500 RPM · 240 Nm / 120: 120 kW · 6,000 RPM · 470 Nm
  (웹은 여기에 중량 1,100~2,500 kg · 적재 800~1,400 kg · 외형 2,0×1,3×1,3 ~ 2,8×1,6×1,3 m를 더한다.
  웹의 BlueBox-40은 **44 kW**로 카탈로그의 40 kW와 다르다 → §3의 연장선)

## 5. 모든 스프레드가 공유하는 블록

카탈로그는 모델마다 같은 문장을 반복한다. **Phase B에서 모듈 상수로 빼고 모델별 차이만
개별로 둔다** — 26페이지에 같은 네 줄을 스물여섯 번 적을 이유가 없다.

### 5.1 Absorbers (하이브리드 계열 공통)

> - Optimized Frankosorb® hybrid absorber lining with Ferrite, **H1000 and H600**
> - High-performance nano thin-film technology with proven long-term stability
> - Non-combustible acc. to EN 13501-1 class A2 - s1 d0
> - Hardly inflammable acc. to EN 13501-1 class B (alternative)

첫 줄의 페라이트 조합만 모델마다 다르다:

| 조합 | 모델 |
|---|---|
| Ferrite, H1000 and H600 | SAC-3 Plus · SAC-5 Plus · SAC-3/5 Square(H450 or H600) · Transformer · FAC-3 · FAC-3 L · AVTC |
| Ferrite, H450 or H600 | CHC · CTC · SAC-10 Plus · Triton |
| Ferrite, H1000, H600, **and H1300 Turbine** | SAC-10/H |
| Ferrite and H450 | ACTC · UCC |
| **P2400 long-pyramid** (하이브리드 아님) | SAC-10/P |
| short-pyramid · long-pyramid · hybrid 중 선택 | 군용 3종 |

> 주의 — SAC-3/5 Square 스프레드의 첫 줄은 `Ferrite, H450 or H600`이지만, 본사 웹의
> 같은 모델 페이지는 `Ferrite F006, H600 and H1000`이라고 적는다. §3에 넣지 않은 이유는
> 흡수체 구성이 치수처럼 단일 값이 아니라 사양 선택지여서다. **카탈로그를 따른다.**

### 5.2 Performance & Compliance (풀 컴플라이언트 SAC 공통)

> - Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI C63.4
>   - Deviation NSA ±3,5 dB (30 MHz to 1 GHz)
>   - Deviation SVSWR +5,5 dB (1 GHz to 18 GHz)
>   - Deviation NSIL ±4,0 dB (9 kHz to 30 MHz)
> - Full compliant immunity (EMS) according to IEC/EN 61000-4-3
>   - Deviation FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)

마지막 괄호가 모델마다 `30/80 MHz` 또는 `26/80 MHz`로 갈린다 —
26 MHz 쪽: SAC-10/H · SAC-10/P · AVTC · 군용. 나머지는 30 MHz.

**NSIL ±4,0 dB (9 kHz to 30 MHz)는 본사 웹에 없다.** 카탈로그에만 있는 세 번째 편차값이고,
9 kHz~30 MHz 대역을 보증하는 유일한 문장이다. 모델 페이지가 형식 인덱스보다 더 말할 수
있는 대표적인 값이다.

예외:

- **FAC-3 / FAC-3 L** — NSA 대신 `FS NSA ±3,5 dB`, NSIL 없음, 그리고
  `Full compliant EMS and EMI according to IEC/EN 61000-4-22 · Deviation SdB c ≤ 1,8 dB` 한 줄이 더 붙는다
- **CHC 계열** — `Pre-compliant emission (EMI) acc. to CISPR 16-1-4 · Deviation NSA ±4,0 dB (30 MHz to 1 GHz) with limited height scan`,
  그리고 `Compliant emission (EMI) · Deviation SVSWR +6,0 dB (1 GHz to 18 GHz)`
  (카탈로그 원문의 `hieght` 오타는 교정해 옮긴다)
- **ACTC / UCC / CTC** — CISPR 25 · ISO 11452 기준이라 NSA/SVSWR을 쓰지 않는다.
  ACTC는 `Uniform field 0,5 × 0,5 m at 1,0 m · FU 0/+6 dB at 100 %`,
  ACTC L은 `Uniform field 1,5 × 1,5 m at 3,0 m · FU 0/+6 dB at 75 % of 16 points`
- **Transformer** — SAC 구성과 FAC 구성의 Performance & Compliance를 **두 벌** 싣는다
- **군용** — `Absorption at normal incidence: 80 MHz to 250 MHz 6 dB / above 250 MHz 10 dB, as per standard requirements`

### 5.3 웹에만 있는 블록

| 블록 | 내용 | 비고 |
|---|---|---|
| Overview | EMI · EMS · Test distance · Volume · Special 4~6행 | 모델 페이지 상단 "한눈에" |
| Typical Product Standards | Emission: CISPR 11 · 12 · 14 · 15 · 25 · 32 · MIL-STD 461 / Immunity: IEC/EN 61000-4-3 · ISO 11451 · ISO 11452 · MIL-STD 461 | 모델마다 부분집합 |
| Typical Verification Standards | Emission: CISPR 16-1-4 and/or ANSI C63.4 / Immunity: IEC/EN 61000-4-3 | |
| **Load capacity** | 2,000 / 5,000 / 10,000 / 30,000 / 80,000 kg | 카탈로그에 전혀 없다 |
| Turntable | ø1,2 ~ ø7,0 m | 일부 모델 |

Load capacity 분포: FAC-3 · FAC-3 L · CHC · CHC Plus · CTC 2,000 kg · SAC-3 Plus ·
SAC-3 Square · SAC-5 Plus · SAC-10 Plus · Triton · Transformer · EDTC 3종 5,000 kg ·
SAC-5 Square · ACTC 10,000 kg · AVTC 30,000 kg · SAC-10V · SAC-10/H · SAC-10/P ·
MIL-STD · MIL-STD Advanced 80,000 kg.

> Typical Product Standards 목록은 **번역하지 않는다.** 규격 번호이고, 독자가 자기 제품에
> 적용되는 규격과 대조하는 값이다.

---

# 6. 모델별 원문

각 항목의 구성: **부제** (웹 · 페이지 제목 아래 한 줄) → **리드** (카탈로그 verbatim) →
**Features** (카탈로그 verbatim) → **치수표** (카탈로그, 렌더 판독) → **웹 보충**.

Absorbers와 Performance & Compliance는 §5의 공통 블록을 쓰고, 모델별 차이만 적는다.
영문은 전부 원문 그대로다 — 오타는 `[sic]`로 표시하고 옮길 때만 교정한다.

## 6.1 SAC — 반무향실

### SAC-3 Plus (인쇄 p.18 · `/portfolio/sac-3-plus/`)

부제 — 카탈로그 `3m Semi Anechoic Chamber in Dome Design` · 웹 `Semi-anechoic 3,0 m EMC chamber with dome-shape design`

> The SAC-3 Plus is Frankonia's most versatile full compliant EMC testing solution at
> **3,0 m** measuring distance with a Quiet Zone (QZ) **up to ø2,0 m**. It is adapted for
> full compliant emission and immunity testing.
>
> The innovatively shaped roof, called dome design, with its optimized Frankosorb®
> absorber layout leads to minimized reflections and offers outstanding performance for
> NSA, SVSWR and FU.
>
> *(닫는 문단)* Since its introduction, the SAC-3 Plus has been the undisputed most
> selected chamber in its class. Through the innovative concept, customization and the
> excellent performance, it represents an efficient and economical solution that fully
> satisfies our customers.

Features — Cost-effective high-performance solution for a 3,0 m measuring distance and QZ
from ø1,2 m of up to ø2,0 m · Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 (ETSI
upgradeable) · Full compliant EMS acc. to IEC/EN 61000-4-3 · Adapted lightweight steel
structure and optimized RF-shielding · Innovative dome-shaped roof design · Upgradeable for
E-Drive (load machine, BlueBox, battery test system) · Outstanding performance with
long-lasting Frankosorb® hybrid absorbers · Usable for automotive and military standard tests

| 구성 | External dimension (L × W × H) | 한정구 |
|---|---|---|
| SAC-3 Plus S | 8,480 × 6,530 × 6,000 mm | QZ ø1,2 m at 3,0 m test distance (H= 2,0 m) |
| SAC-3 Plus M | 8,780 × 6,530 × 6,000 mm | QZ ø1,5 m at 3,0 m test distance (H= 2,0 m) |
| SAC-3 Plus L | 9,230 × 6,530 × 6,000 mm | QZ ø2,0 m at 3,0 m test distance (H= 2,0 m) |
| SAC-3 Plus | 9,680 × 6,530 × 6,000 mm | QZ ø2,0 m at 3,0 m test distance (H= 2,0 m) |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

웹 보충 — Overview: EMI `CISPR 16-1-4 and ANSI C63.4, full compliant` · EMS
`IEC/EN 61000-4-3, full compliant` · Test distance `3,0 m` · Volume `up to ø2,0 m` ·
Special `Performance dome shape design`. Load capacity `up to 5.000 kg; special turntable
systems possible`. 웹 표에는 무접미 `SAC-3 Plus`(9,680) 행이 없다.

### SAC-5 Plus (인쇄 p.20 · `/portfolio/sac-5-plus/`)

부제 — `5m Semi Anechoic Chamber in Dome Design` · 웹 `Semi-anechoic 5,0 m EMC chamber with dome-shape design`

> The SAC-5 Plus is Frankonia's full compliant EMC testing solution at 3,0 m and 5,0 m
> measuring distance with a Quiet Zone (QZ) up to ø3,0 m. It offers an innovative concept
> with its dome shaped roof, customization and performance, and therefore represents an
> efficient and economical solution that fully satisfies our customers.
>
> *(닫는 문단)* Following the success of the SAC-3 Plus, the SAC-5 Plus with its 5,0 m test
> distance is based on the same innovative dome-shape concept. Herewith, it represents as
> well an efficient and economical solution that fully satisfies our customers needs.

Features — Efficient high-performance solution for a 3,0 m and 5,0 m measuring distance and
QZ from ø2,0 m of up to ø3,0 m · Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4
(ETSI upgradeable) · Full compliant EMS acc. to IEC/EN 61000-4-3 · Adapted lightweight steel
structure and optimized RF-shielding · Innovative dome-shaped roof design · Upgradeable for
E-Drive · Outstanding performance with long-lasting Frankosorb® absorbers · Usable for
automotive and military standard tests · Turnkey solution · **Double test axis option**

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-5 Plus | 12,680 × 7,730 × 6,300 mm | QZ ø2,0 m at 3,0 m & 5,0 m test distance (H= 2,5 m) |
| SAC-5 Plus L | 12,680 × 8,180 × 6,300 mm | QZ ø3,0 m at 3,0 m & 5,0 m test distance (H= 2,5 m) |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

웹 보충 — Overview Volume `ø2,0 m or ø3,0 m` · Special `Performance dome shape design` ·
Version `Dome design`. Load capacity `up to 5.000 kg`.

### SAC-3 Square · SAC-5 Square (인쇄 p.24 — 한 스프레드)

부제 — `3m or 5m Semi Anechoic Chamber in Square Design`

> The SAC-3 Square is Frankonia's versatile full compliant EMC testing solution at 3,0 m
> measuring distance.
>
> The SAC-5 Square offers a 3,0 m and 5,0 m measuring distance. Both models are available
> with a Quiet Zone (QZ) of ø2,0 m or ø3,0 m.
>
> The SAC-3 and the SAC-5 in square design offer an innovative concept with its usability,
> customization and performance, and therefore represent efficient and economical solutions.

Features — Traditional square design · High-performance solution for 3,0 m or 5,0 m
measuring distance · QZ from ø2,0 m up to ø4,0 m · Large turntable or mobile dynamometer
integration · Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 (ETSI upgradeable) ·
Full compliant EMS acc. to IEC/EN 61000-4-3 · Immunity floor absorber storage in the chamber
on trolley's · Upgradeable for E-Drive · Outstanding performance with long-lasting
Frankosorb® absorbers · Usable for automotive and military standard tests · Turnkey solution

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-3 Square | 9,680 × 6,530 × 6,000 mm | QZ ø2,0 m at 3,0 m test distance (H= 2,5 m) |
| SAC-3 Square L | 10,880 × 6,980 × 6,000 mm | QZ ø3,0 m at 3,0 m test distance (H= 2,5 m) |
| SAC-5 Square | 12,680 × 7,730 × 6,000 mm | QZ ø2,0 m at 3,0 m & 5,0 m test distance (H= 2,5 m) |
| SAC-5 Square L | 12,680 × 8,180 × 6,000 mm | QZ ø3,0 m at 3,0 m & 5,0 m test distance (H= 2,5 m) |
| SAC-5 Square XL | 13,280 × 9,380 × 6,300 mm | QZ ø4,0 m at 5,0 m test distance (H= 2,5 m) · QZ ø3,0 m at 3,0 m test distance (H= 2,5 m) · Ready for a larger turntable or mobile dynamometer |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

**두 모델이 한 스프레드를 쓰지만 웹은 페이지를 나눈다.** 우리도 나눈다 — 표는 각 페이지가
자기 구성만 싣는다(SAC-3 Square는 위 2행, SAC-5 Square는 아래 3행).

웹 보충 — SAC-3 Square: Volume `up to ø3,0 m` · Load capacity `5.000 kg`.
SAC-5 Square: Volume `up tp ø4,0 m` [sic] · Load capacity `10.000 kg` ·
XL 행에 `(DB 320)` 표기가 붙는다. 웹 표는 첫 두 열을 **둘 다 "SAC-5 Square L"**로
적는다(§3-12).

### SAC-10 Plus · SAC-10 Plus Triton (인쇄 p.30 — 한 스프레드)

부제 — `10m Advanced Semi Anechoic Chamber Solution` · 웹은 각각
`Semi-anechoic 10,0 m EMC chamber in compact shape` / `… with multiple test axes`

> The SAC-10 Plus Triton is Frankonia's full compliant state-of-the-art EMC testing solution
> with multiple test axes with 1x 10,0 m and 2x 3,0 m measuring distances with a Quiet Zone
> (QZ) of ø3,0 m. The innovative polygonal shape along with its optimized Frankosorb®
> absorber layout is a space-saving, cost-saving and efficient solution with a multiple test axes.
>
> *(닫는 문단)* The SAC-10 Plus Triton is the most compact and lightweight 10 m chamber
> existing. It is full compliant for emission tests validated according to CISPR 16-1-4 and
> ANSI C63.4, as well as full compliant for immunity tests according to IEC/EN 61000-4-3,
> CISPR 25 and MIL-STD 461.

Features — Multiple test axes chamber with a Quiet Zone of ø3,0 m · 1x 10,0 m test distance
and 2x 3,0 m test distance in one solution · Full compliant EMI acc. to CISPR 16-1-4 and ANSI
C63.4 · Full compliant acc. to CISPR 25 and MIL-STD 461 · Full compliant EMS acc. to IEC/EN
61000-4-3 · Space-saving and compact chamber design with polygonal shape · Floor absorbers
and antennas remain connected in the chamber · Reproducibility and stable performance ·
Time-saving test setup with improved workflow and efficiency · Ingenious lining with
long-lasting Frankosorb® non-combustible absorbers · Cost-saving and future-proof investment

두 번째 Features 블록 (Triton 전용, 카탈로그가 따로 인쇄한다) — Multiple test axes up to
10,0 m with a Quiet Zone of ø3,0 m · Single test axis up to 10,0 m with a Quiet Zone of ø3,0
m · With the use of three independent test axes dedicated to each EMI and EMS test, all
antennas and floor absorbers remain connected in the chamber. · The Triton works like a
regular SAC-10 chamber without any limitations. · Thanks to the guided floor absorber
arrangement, the test setup preparation time reduces enormously, while reproducibility and
quality of each testing remain stable.

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-10 Plus Triton | 19,205 × 12,080 × 8,325 mm | QZ ø3,0 m with multiple test axes (H= 3,0 m) · 1x 10,0 m test distance (axis 1 = EMI and EMS) · 1x 3,0 m test distance (axis 2 = EMI and EMS) · 1x 3,0 m test distance (axis 3 = EMS) |
| SAC-10 Plus | 19,205 × 12,080 × 8,325 mm | QZ ø3,0 m at 10,0 m test distance (H= 3,0 m) |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

카탈로그의 라벨 — `SAC-10 Plus: Single test axis, cost-saver` / `SAC-10 Plus Triton:
Multiple test axis, advanced solution`. 두 모델의 외형 치수가 같다는 것이 이 스프레드의
논지다: 같은 셸에서 축을 몇 개 쓰느냐의 차이.

웹 보충 — Turntable `ø3,0 m or ø4,0 m` (둘 다) · Load capacity `5.000 kg` (둘 다) ·
Triton의 Measuring distances가 축별로 갈린다: `Test axis 1: 10,0 m, 5,0 m and 3,0 m (for
emission) / Test axis 2: 3,0 m (for emission and immunity) / Test axis 3: 3,0 m (for
immunity)` — **카탈로그와 축 배정이 다르다.** 카탈로그는 axis 1을 EMI·EMS 겸용으로 적는다.

### SAC-10/H Hybrid (인쇄 p.34 · `/portfolio/sac-10-h-hybrid/`)

> The SAC-10/H is Frankonia's full compliant and customizable EMC testing solution at 10,0 m
> measuring distance with a Quiet Zone (QZ) of ø3,0 m up to ø6,0 m and hybrid absorber layout.
>
> Due to the high grade of customization reflecting the demands of our customers, this semi
> anechoic chamber is adaptable in size and offers several configuration possibilities. The
> impressionable Frankosorb® hybrid absorber layout achieves exceptional performance for
> emission measurements and immunity testing.

Features — Optmized [sic] lining with long-lasting and non-combustible Frankosorb® hybrid
absorbers (Frankonia technology) · Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 ·
Full compliant EMS acc. to IEC/EN 61000-4-3 · Full compliant with military and automotive
standards · Highly customizable solution for any kind of EMC testing and limitless
integration of individual applications; as single or double test axis option · Notably
adjustable anechoic chamber size, characteristics and configuration due to different EUT
requirements · Advanced lining with long-lasting and non-combustible Frankosorb® absorbers ·
Specialized for 'out-of-the-range' EMC test environments · Usable for automotive and military
standard tests · Turnkey solutions

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-10-3/H | 18,380 × 12,830 × 8,550 mm | QZ ø3,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10-4/H | 19,280 × 13,280 × 8,550 mm | QZ ø4,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10-5/H | 21,080 × 15,080 × 8,700 mm | QZ ø5,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10-6/H | 21,680 × 15,680 × 8,700 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

Absorbers 첫 줄 — `Ferrite, H1000, H600, and H1300 Turbine absorbers`.
Performance FU 괄호는 `26/80 MHz to 18 GHz`.

웹 보충 — 웹은 5-/H의 H를 `8.550`으로, 카탈로그는 `8,700`으로 적는다(§3의 연장선이나
표기 차가 작아 별항으로 세지 않았다 — 반영 시 카탈로그를 따른다).
Quiet Zone을 3,0 / 5,0 / 10,0 m 세 거리별로 나눠 싣는다. Load capacity `80.000 kg`.

### SAC-10/P Pyramid (인쇄 p.36 · `/portfolio/sac-10-p-pyramid/`)

> The SAC-10/P is Frankonia's full compliant and customizable EMC testing solution at 10,0 m
> measuring distance with a Quiet Zone (QZ) of ø3,0 m up to ø6,0 m and the unique Frankonia
> long-pyramid absorber layout.
>
> Due to the high grade of customization reflecting the demands of our customers, this
> semi-anechoic chamber is adaptable in size and offers several configuration possibilities.
>
> *(닫는 문단)* The innovative long-pyramid absorber technology achieves exceptional
> performance for emissions and immunity testing and offers the highest homogeneity and
> impedance accuracy for the complete frequency range.

Features — Full lining with long-lasting and non-combustible Frankosorb® long-pyramid
absorbers (Frankonia technology) · **Cost-efficient alternative to hybrid absorber lining
without any limitations** · Full compliant EMI acc. to CISPR 16-1-4 and ANSI C63.4 · Full
compliant EMS acc. to IEC/EN 61000-4-3 · Full compliant with military and automotive
standards · Highly customizable … single or double test axis option · Noteably [sic]
adjustable anechoic chamber size … · Specialized for 'out-of-the-range' EMC test
environments · Usable for automotive and military standard tests · **Floor absorbers storage
below the pyramids** · Turnkey solutions

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-10-3/P | 21,680 × 13,730 × 8,550 mm | QZ ø3,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10-4/P | 21,680 × 13,730 × 8,550 mm | QZ ø4,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10-5/P | 23,480 × 16,580 × 9,000 mm | QZ ø5,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10-6/P | 24,980 × 17,180 × 9,000 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

**3/P와 4/P의 치수가 같다.** 인쇄면을 렌더해 확인했다 — 카탈로그가 실제로 그렇게 인쇄하고,
웹 표도 같은 값을 싣는다. Quiet Zone만 ø3,0 m와 ø4,0 m로 다르다. 그대로 옮긴다.

Absorbers — 하이브리드가 아니다: `Frankosorb® long-pyramid absorber lining with P2400`.

## 6.2 FAC — 완전무향실

### FAC-3 · FAC-3 L (인쇄 p.16 — 한 스프레드)

> The FAC-3 is Frankonia's compact fully anechoic chamber at 3,0 m measuring distance for EMC
> tests on table-top positioned EUT's with a Quiet Zone (QZ) of ø1,5 m (H= 1,5 m).
>
> The FAC-3 L is the extended version of Frankonia's fully anechoic chamber at 3,0 m
> measuring distance with a Quiet Zone (QZ) of ø1,5 m (H= 2,0 m) for EMC tests on table-top
> positioned as well as on floor-standing EUT's.
>
> Both are designed for measurements under free-space conditions based on CISPR 16-1-4 as a
> test site without ground plane. With its specific requirements for the test site,
> Frankonia's FAC-3 and FAC-3 L are supremely prepared to meet our customers' demands. The
> FAC-3 L offers in addition a height scan possibility using a FAM or FBM antenna mast.

Features — FAC-3: Test site for table-top EUT's · FAC-3 L: Test site for table-top and
floor-standing EUT's (with height scan) · Full compliant EMI acc. to CISPR 16-1-4, IEC/EN
61000-4-22, and ETSI · Full compliant EMS acc. to IEC/EN 61000-4-3 · Cost-effective solution
for free-space measurements · Compact chamber design with advanced Frankosorb® absorber
lining · Double test axis option

| 구성 | External dimension | 한정구 |
|---|---|---|
| FAC-3 | 8,705 × 4,655 × 3,750 mm | QZ ø1,5 m at 3,0 m test distance (H= 1,5 m) · Table-top products |
| FAC-3 L | 9,380 × 5,780 × 6,000 mm | QZ ø1,5 m at 3,0 m test distance (H= 2,0 m) · Floor-standing & table-top products with height scan |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

Performance & Compliance (§5.2 예외) — `FS NSA ±3,5 dB (30 MHz to 1 GHz)` · `SVSWR +5,5 dB
(1 GHz to 18 GHz)` · `FU 0/+6 dB at 75 % of 16 measuring points (30/80 MHz to 18 GHz)` ·
`Full compliant immunity (EMS) and emission (EMI) according to IEC/EN 61000-4-22 · Deviation
SdB c ≤ 1,8 dB`

웹 보충 — Turntable `ø1,5 m` · Load capacity `2.000 kg` · Overview EMI/EMS 모두
`IEC/EN 61000-4-22` 병기. FAC-3 L 치수 H는 웹이 `5.550`으로 다르다(§3-2).

### SAC-3 / FAC-3 Transformer (인쇄 p.26 · `/portfolio/sac-3-fac-3-transformer/`)

> Frankonia's SAC-3/FAC-3 Transformer is a full compliant EMC solution at 3,0 m measuring
> distance offering semi as well as fully conditions. This special solutions focus on
> conditions with ground plane, as well as FAR conditions for table-top EUT tests with an
> optimized floor absorber modification kit. The SAC-3/FAC-3 Transformer model is adapted to
> full compliant emission and immunity testing with a traditional square design.

Features — Cost-effective and high-performance solution for a 3,0 m test distance · SAC
Setup: QZ of ø2,0 m for floor standing products · FAC Setup: QZ of ø1,5 m for table-top
products · Full compliant EMI acc. to CISPR 16-1-4, ANSI C63.4, IEC/EN 61000-4-22, ETSI ·
Full compliant acc. to CISPR 25 and MIL-STD 461 · Full compliant EMS acc. to IEC/EN
61000-4-3 · Upgradeable for E-Drive · Compact chamber design with advanced absorber lining ·
Outstanding performance with long-lasting Frankosorb® absorbers · Usable for automotive and
military standard tests · Turnkey solution

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-3/FAC-3 Transformer | 9,680 × 6,530 × 6,000 mm | SAC: QZ ø2,0 m at 3,0 m test distance (H= 2,5 m) · FAC: QZ ø1,5 m at 3,0 m test distance (H= 1,5 m) |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

카탈로그 도판 라벨 — `SAC-3: Transformed to a semi chamber with ground plane` /
`FAC-3: Transformed to a fully chamber with floor absorbers`.

Performance & Compliance가 **두 벌**이다 (§5.2). SAC 구성은 공통 블록 그대로, FAC 구성은
`FS NSA ±3,5 dB` + `SVSWR +5,5 dB` + `FU 0 dB/+6 dB …` (NSIL 없음).

웹 보충 — `Quiet Zone IEC/EN 61000-4-22: ø1,5 m; height 1,5 m (30 MHz–1 GHz) / ø1,0 m;
height 1,0 m (1 GHz–6 GHz)` — 카탈로그에 없는 행이다. Load capacity `5.000 kg`.
웹의 SAC QZ 높이는 `1,5 m`인데 카탈로그는 `2,5 m`다.

## 6.3 CHC · CTC — 컴팩트 하이브리드 / 부품 시험

### CHC · CHC Plus · CTC (인쇄 p.12 — 한 스프레드)

> The CHC is Frankonia's compact hybrid chamber solution at 3,0 m measuring distance with a
> Quiet Zone (QZ) of ø1,2 m. It is an optimal solution for both pre-compliance emission tests
> and full compliant immunity tests at 3,0 m measuring distance. The extended version CHC L,
> includes an absorber-lined partition wall that offers the feature to house and store RF
> power amplifiers, antennas, or floor absorbers inside the chamber.
> - Pre-compliant EMI from 30 MHz to 1 GHz acc. to CISPR 16-1-4
> - Full compliant and cost saving solution for EMS acc. to IEC/EN 61000-4-3
>
> The CHC Plus version is the advanced setup that allows compliant emission measurements from
> 1 GHz to 18 GHz.
> - Pre-compliant EMI from 30 MHz to 1 GHz acc. to CISPR 16-1-4 and compliant EMI from 1 GHz to 18/40 GHz
> - Full compliant and cost saving solution for EMS acc. to IEC/EN 61000-4-3
>
> The CTC is Frankonia's full compliant component test chamber that entirely focus to
> immunity testing for industrial products, paired with automotive component EM and EMS, as
> well as military tests.
> - Full compliant and cost saving solution for EMS acc. to IEC/EN 61000-4-3
> - Full compliant with CISPR 25 and ISO 11452
> - Full compliant with MIL-STD 461 and DO-160

| 구성 | External dimension | 한정구 |
|---|---|---|
| CHC | 7,355 × 3,755 × 3,300 mm | QZ ø1,2 m at 3,0 m test distance |
| CHC L | 8,255 × 3,755 × 3,300 mm | QZ ø1,2 m at 3,0 m test distance · Feature: e.g., amplifier can be stored in the chamber |
| CHC Plus | 7,355 × 3,755 × 3,300 mm | QZ ø1,2 m at 3,0 m test distance · Feature: Compliant emission >1 GHz |
| CHC Plus L | 7,580 × 4,655 × 4,350 mm | QZ ø1,2 m at 3,0 m test distance · Feature: Turntable ø2,0, compliant emission >1 GHz |
| CTC | 8,480 × 5,485 × 3,750 mm | Full compliant immunity testing per IEC 61000-4-3 · Feature: Full compliant to CISPR 25 and ISO 11452, MIL-STD 461 and DO-160 |
| Frequency range | 9 kHz / 30 MHz to 18 GHz (option 40 GHz) | |

카탈로그가 스프레드 안에 넣은 비교 라벨 — CHC `Pre-compliant EMI / Full compliant EMS` ·
CHC Plus `Semi-compliant EMI / Full compliant EMS` · CTC `Full compliant EMS / Full
compliant CISPR 25 / Full compliant MIL-STD 461`.

**세 모델이 한 스프레드를 쓰지만 웹은 세 페이지로 나눈다.** 우리도 나눈다.

웹 보충 — CHC Load capacity `2000 kg` · CHC Plus `2.000 kg` + Turntable `ø1,2 m / ø2,0 m` ·
CTC `2.000 kg` + Setup `Table setup, floor standing` + Test distance `1,0 m, 3,0 m` +
Frequency `9 kHz to 18 or 40 GHz`. CTC의 웹 Overview는 EMI `CISPR 25, MIL-STD 461 / DO-160`
· EMS `ISO 11452, MIL-STD 461 / DO-160, IEC EN 61000-4-3`.
**CHC Plus 치수는 웹과 크게 다르다(§3-3).**

## 6.4 Shielded Room (인쇄 p.10 · `/portfolio/shielded-room/`)

부제 — `Modular and Prefabricated PAN Type Shielding`

> Frankonia shielded rooms and anechoic chambers are designed based on a modular construction
> system. Prefabricated high quality shielding panels guarantee a maximum of flexibility
> regarding possible dimensions. All PAN type modules allow an easy handling and entry via
> standard building doors. The standard modules are bolted from inside every 75 mm with high
> conductivity mesh gasket inserted for sealing the joints of the panels. This facilitates an
> installation close to the walls of the parent building. The short screwing distance and the
> precise tightening of the screws with predefined torque guarantee long life shielding
> attenuation characteristics.

Features — PAN Type shielding modules made of 2,0 mm thick galvanized steel · Modular and
prefabricated standard · Self-supporting stability or with static steel structure for any
seismic condition · Mounted from the inside · Reverse installation possible (flat surface
inside) · Interior finishing (walls and ceiling) possible · Raised floor systems, or welded
floor systems · Long life shielding attenuation characteristics · No glue, no welding ·
Dismountable without any damage, easy modifications and maintenance · A complete transfer or
future modification is possibility [sic] · Turnkey solution · Frequency range acc. to EN
50147-1 or IEEE-299 (option) from 10 kHz up to 18 GHz or 40 GHz · Equal performance for any
kind of feed-through components, honeycombs, doors and gates, filters, etc. · Perfectly
adapted for Frankosorb® Absorbers · Any size of shielding is possible · Acoustic panels with
absorption per ISO 354 w=0,65 (MH)

**Guaranteed Performance** (치수표가 없는 유일한 모델 — 대신 이 표가 있다)

| Frequency | Attenuation | Field |
|---|---|---|
| 10 kHz | 90 dB | Magnetic Field |
| 100 kHz | 100 dB | Magnetic Field |
| 1 MHz | 110 dB | Magnetic Field |
| 100 MHz | 120 dB | Plane Wave |
| 400 MHz | 120 dB | Plane Wave |
| 1 GHz | 110 dB | Plane Wave |
| 18 GHz | 100 dB | Microwave |
| 40 GHz | 100 dB | Microwave |

웹 보충 — External dimensions `Any size is possible` · Shielding Effectiveness `EN 50247-1
[sic], optional IEEE Std. 299` · Load capacity `Any loading condition is possible` ·
Walls and Ceiling `Interior finishing in various materials and colors (office look) /
Acoustics insulation / LED ambient lighting` · Floor `Standard raised floor with HPL cover /
Moisture protection below the shielding / Electrical isolation for shielding and steel
structure / TEMPEST option`. **웹의 차폐 성능값이 카탈로그보다 낮다(§3-9).**

## 6.5 Automotive

### ACTC · UCC (인쇄 p.40 — 한 스프레드)

부제 — ACTC `CISPR 25 Automotive Component Testing Chamber` ·
UCC 웹 `Pre-compliance CISPR 25 ultra-compact chamber`

> The ACTC is Frankonia's automotive component testing chamber solution at 1,0 m measuring
> distance. This chamber solution is adapted to full compliant tests of automotive components
> according to CISPR 25 and ISO 11452. A permanent plug-in contact strip is installed between
> the absorbers to ensure the electrical connection of the test table to the shielding, and
> includes the test table as required by CISPR 25.
>
> The UCC is Frankonia's ultra-compact hybrid solution at 1,0 m measuring distance. The
> chamber is designed for pre-compliance radiated emission and immunity tests, conducted
> tests, and pre-compliance tests for automotive components as per the CISPR 25 method. It is
> an alternative solution for the GTEM cell for pre-compliance testing as well as for research
> and scientific purposes in all sectors.

Features — ACTC: Full compliant per CISPR 25 and ISO 11452 for components · ACTC L: Full
compliant per CISPR 25 and ISO 11452 for components and large enough for tests on vehicles ·
UCC: Pre-compliant per CISPR 25 and ISO 11452 (alternative to GTEM cell) · Compact chamber
solution for automotive component testing · Upgradeable for E-Drive (load machine, BlueBox,
battery test system) · Advanced and optiomized [sic] lining with long-lasting Frankosorb®
hybrid absorbers

| 구성 | External dimension | 한정구 |
|---|---|---|
| ACTC | 6,380 × 5,480 × 3,750 mm | CISPR 25 component level at 1,0 m test distance |
| ACTC L | 11,480 × 6,580 × 4,500 mm | CISPR 25 component level & vehicle at 1,0 m test distance |
| UCC | 4,580 × 3,080 × 2,550 mm | Pre-compl. component level at 1,0 m test distance |
| Frequency range | 150 kHz / 26 MHz to 18 GHz (option 40 GHz) | |

Performance & Compliance — 셋이 각각 다르다:

- **ACTC** — Full compliant emission (EMI) according to CISPR 25 · Full compliant immunity
  (EMS) according to ISO 11452 · Compliant immunity (EMS) according to IEC/EN 61000-4-3 ·
  Uniform filed [sic] 0,5 × 0,5 m at 1,0 m measuring distance · Deviation FU 0/+6 dB at 100 %
  (26/80 MHz to 18 GHz)
- **ACTC L** — 위와 같되 IEC/EN 61000-4-3이 `Full compliant` · Uniform field 1,5 × 1,5 m at
  3,0 m measuring distance · Deviation FU 0/+6 dB at 75 % of 16 measuring points
- **UCC** — Pre-compliant emission (EMI) according to CISPR 25 · Pre-compliant immunity (EMS)
  according to ISO 11452

Absorbers 첫 줄 — `Ferrite and H450`.

웹 보충 — ACTC Overview: EMI `CISPR 25` · EMS `ISO 11452` · Test distance `1,0 m` · Volume
`Table setup`. Setup 행 `Table setup` / `Table and vehicle setup`. Load capacity
`up to 10.000 kg`. UCC는 Load capacity 행이 없다. **UCC 치수·주파수가 웹과 다르다(§3-1, §3-10).**

### AVTC (인쇄 p.42 · `/portfolio/avtc/`)

부제 — `3m Automotive Vehicle Testing Chamber` · 카탈로그 도판 라벨 `Compact Vehicle Test Chamber`

> The AVTC is Frankonia's automotive anechoic chamber solution at 3,0 m or 5,0 m measuring
> distance offering a Quiet Zone (QZ) of ø4,0 m for commercial testing combined with a focus
> on automotive component and vehicle tests. It is adapted for radiated emissions on vehicles
> acc. to CISPR 12 and components acc. to CISPR 25 as well as for commercial product tests
> acc. to CISPR 16-1-4 and ANSI C63.4. Furthermore, it is adapted to radiated immunity acc. to
> IEC/EN 61000-4-3, ISO 11451 and ISO 11452.

Features — Advanced Frankosorb® hybrid absorber lining · Automotive component & vehicle and
commercial tests in a single solution · Full compliant EMI acc. to CISPR 16-1-4 and ANSI
C63.4 · Full compliant EMS acc. to IEC/EN 61000-4-3 · Full compliant with CISPR 25, CISPR 12,
ISO 11452 and ISO 11451 · ECE R10 with integrated or mobile dynamometer up to 3,0 m test
distance · Cost-effective and high-performance solution for 3,0 m or 5,0 m test distance ·
Floor absorber board for an efficient and fast modification of the test setup · Upgradeable
with EDTC components (load machine, BlueBox, etc.) · Highly customizable solution for any
kind of EMC testing and limitless integration of individual applications · Usable for
commercial and military standard tests

| 구성 | External dimension | 한정구 |
|---|---|---|
| AVTC | 11,480 × 9,380 × 6,000 mm | QZ ø3,0 m at 3,0 m test distance (H= 2,5 m) · e.g., with turntable up to ø5,0 m |
| AVTC L | 14,780 × 11,480 × 6,300 mm | QZ ø3,0 m at 3,0 m and 5,0 m test distance (H= 2,5 m) · e.g., with turntable up to ø6,0 m |
| AVTC XL | 16,280 × 12,680 × 6,300 mm | QZ ø4,0 m at 3,0 m and 5,0 m test distance (H= 2,5 m) · e.g., with integrated dynamometer ø7,0 m |
| Frequency range | 9 kHz / 150 kHz to 18 GHz (option 40 GHz) | |

Performance & Compliance — 공통 블록(FU 괄호 `26/80 MHz`)에 세 줄이 더 붙는다:
`Full compliant emission (EMI) according to CISPR 25 and CISPR 12` ·
`Full compliant immunity (EMS) according to ISO 11452 and ISO 11451` ·
`ECE R10 at 3,0 m test distance with dynamometer`

웹 보충 — Quiet Zone을 3,0 m / 5,0 m 두 거리로 나눠 싣고, AVTC L에 대해
`ø4,0 m for NSA / ø3,0 m for SVSWR`이라는 구분을 붙인다(카탈로그에 없다).
Turntable `ø5,0 / ø6,0 / ø7,0 m`. Load capacity `up to 30.000 kg`.

### SAC-10V (인쇄 p.44 · `/portfolio/sac-10-v/`)

부제 — `10m Semi Anechoic Chamber for ECE R10 Vehicle Testing` ·
카탈로그 도판 라벨 `Vehicle Test Chamber with Dynamometer`

> The SAC-10V chamber is Frankonia's full compliant and customizable EMC testing solution at
> 10,0 m measuring distance offering various sizes of Quiet Zone (QZ) and are dedicated to
> automotive full vehicle testing with integrated dynamometer. Due to the high grade of
> customization reflecting the demands of our customers, this semi-anechoic chamber is
> adaptable in size and offers several configuration possibilities.

Features — SAC-10V-6/H: Optimized and advanced Frankosorb® hybrid absorber lining ·
SAC-10V-6/P: Full lining with Frankosorb® long-pyramid P2400 absorbers · Full compliant EMI
acc. to CISPR 16-1-4 and ANSI C63.4 · Full compliant EMS acc. to IEC/EN 61000-4-3 · Full
compliant with CISPR 25, CISPR 12, **CISPR 36**, ISO 11452 and ISO 11451 · ECE R10 with
integrated dynamometer at 10,0 m test distance · Highly customizable for any kind of testing,
vehicle sizes and weights, limitless integration of applications · Specialized for
'out-of-the-range' EMC test environments · Usable for commercial and military standard tests

카탈로그는 표를 흡수체 방식으로 두 벌 나눈다.

**Hybrid Absorber Solution**

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-10VC-6/H | 23,030 × 14,480 × 6,300 mm | QZ ø6,0 m at 5,0 m test distance (H= 2,5 m) · Prepared for a 10,0 m test distance for vehicle tests |
| SAC-10V-6/H | 22,580 × 15,680 × 8,700 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10V-6/H (SL12) | 24,380 × 16,580 × 9,000 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) · Heavy load test zone up to 12 m long vehicles |
| SAC-10V-6/H (SL18) | 26,780 × 18,080 × 9,000 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) · Heavy load test zone up to 18 m long vehicles |

**Pyramid Absorber Solution**

| 구성 | External dimension | 한정구 |
|---|---|---|
| SAC-10V-6/P | 26,480 × 20,180 × 9,000 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) |
| SAC-10V-6/P (SL12) | 26,480 × 20,180 × 10,500 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) · Heavy load test zone up to 12 m long vehicles |
| SAC-10V-6/P (SL18) | 30,080 × 20,180 × 10,500 mm | QZ ø6,0 m at 10,0 m test distance (H= 3,0 m) · Heavy load test zone up to 18 m long vehicles |

두 표 모두 `Frequency range 9 kHz / 150 kHz to 18 GHz (option 40 GHz)`.

Performance & Compliance — Full compliant emission (EMI) according to CISPR 16-1-4 and ANSI
C63.4 · Full compliant emission (EMI) according to CISPR 25 and CISPR 12 · Full compliant
immunity (EMS) according to IEC/EN 61000-4-3 · Full compliant immunity (EMS) according to ISO
11452 and ISO 11451 · ECE R10 at 10,0 m test distance with dynamometer.
편차값(NSA/SVSWR/NSIL)은 이 스프레드에 없다.

Absorbers — 첫 줄이 없다(위 Features가 대신한다). 나머지 세 줄은 공통.

웹 보충 — Overview에 `ECE R10.5 :: Full compliant at 10,0 m with dynamometer` 행이 따로
있다. Dynamometer `e.g., ø7,0 m / ø9,0 m`. Load capacity `up to 80.000 kg; special turntable
systems and dynamometer integration possible`. Specials `Highly adjustable to any vehicle
typ [sic], size and weight`. **6/H 폭이 웹과 다르다(§3-5).**

## 6.6 Powertrain — EDTC & BlueBox (인쇄 p.48 — 한 스프레드)

> E-Drive Test Solutions are Frankonia's dedicated test sites for powertrain components and
> facilities related to hybrid, electric, fuel cell and battery drive systems. They offer
> superior conditions for radiation testing according to CISPR 25 and ISO 11452.
>
> The EDTC-SA is the chamber solution that is specifically prepared for a single external load
> machine with fixed shaft. The EDTC-AX is the chamber setup that is defined for e-axle test
> on powertrain units and is prepared for two external load machines with fixed shaft. The
> patneted [sic] system can be used for dynamic drive tests of electrical powertrain units and
> matches with your preferred dynamometer supplier. Frankonia focus to the proper EMC setup
> inside an EMC chamber and provides adapted test tables, grounding conception, and 90° angle
> gear boxes, and is open to any dynamometers.
>
> The EDTC-BB is the adapted chamber solution that includes the EMC-BlueBox mobile load
> machine for dynamic EMC tests of electrical powertrain units in a shielded enclosure. The
> BlueBox works in a four-quadrant operation; any EUT stress situation can be simulated.
> Similar to the external load machine with a fixed shaft, it includes braking, driving,
> direction of rotation (right/left), speed regulation, torque control and a mix out of this range.

Features — Fully compliant with CISPR 25 and ISO 11452 · Optimized Frankosorb® hybrid
absorber lining · Component or system test level · Mobile, flexible and adjustable to any kind
of EUT · 360° view when placed on a turntable (extended testing range) · Combination with
battery tests · Integration kit for existing chambers · Optional EUT e-motor power source and
water cooling system · Easy to use for every EMC expert

추가 Features 블록 — Motor adapter, grounding and connection per CISPR 25 · Vibration-free
and non-interacting solid basement (floating slab) · Extended services in consultancy and
test readiness guidance

| 구성 | External dimension | 한정구 |
|---|---|---|
| EDTC-SA | 7,880 × 5,480 × 3,750 mm | for fixed-shaft version with external load machine · e.g., 1x 250 kW with 3.000 RPM and 3.000 Nm |
| EDTC-AX | 9,080 × 6,080 × 3,750 mm | for fixed-shaft version with external load machines · e.g., 2x 250 kW with 3.000 RPM and 3.000 Nm |
| EDTC-BB | 7,880 × 6,380 × 3,750 mm | for mobile load machine EMC-BlueBox up to 120 kW |
| EDTC-BB with turntable | 10,880 × 6,980 × 3,900 mm | for mobile load machine EMC-BlueBox up to 120 kW with turntable for 360° scan |
| EDTC-HY | 6,380 × 5,480 × 3,750 mm | for hydraulic load machine, e.g., 2x 250 kW |

주파수 행이 이 표에는 없다. 웹이 `9 kHz / 150 kHz to 18 GHz (option 40 GHz)`
(EDTC-SA·AX) / `9 kHz / 30 MHz to 18 or 40 GHz` (EDTC-BB)를 준다.

**부하기 표** (챔버가 아니라 챔버에 들어가는 장비 — §4 참조)

| 외부 부하기 | EDTC-250 | EDTC-500 |
|---|---|---|
| Power | 1x250 kW | 2x250 kW |
| Speed | 3.000 RPM | 3.000 RPM |
| Torque | 3.000 Nm | 3.000 Nm |

| EMC-BlueBox | 30 | 40 | 65 | 120 |
|---|---|---|---|---|
| Power | 30 kW | 40 kW | 63 kW | 120 kW |
| Speed | 11.000 RPM | 9.000 RPM | 6.500 RPM | 6.000 RPM |
| Torque | 82 Nm | 140 Nm | 240 Nm | 470 Nm |
| *(웹)* Weight | 1.100 kg | 1.200 kg | 1.700 kg | 2.500 kg |
| *(웹)* Payload | 800 kg | 800 kg | 1.000 kg | 1.400 kg |
| *(웹)* Dimensions | 2,0 × 1,3 × 1,3 m | 2,2 × 1,3 × 1,3 m | 2,5 × 1,4 × 1,3 m | 2,8 × 1,6 × 1,3 m |

웹의 BlueBox-40 출력은 `44 kW`로 카탈로그의 40 kW와 다르다.

웹 보충 — 세 모델 모두 Overview가 챔버가 아니라 **시스템** 축으로 쓰여 있다:
Compliance `CISPR 25, ISO 11452` · System `External Load Machine (electric or hydraulic)` /
`Mobile Load Machine (electrical driven)` · Volume `Table setup in front of wall` /
`… or on a turntable`. Load capacity `5.000 kg (typical)` (셋 다).
EDTC-AX 웹에 `Power Range :: e.g., 2×250 kW` 행이 있다.

> **명칭 주의.** 본사 웹은 EDTC-SA의 페이지를 `/portfolio/edtc/`에 두고 제목도 그냥
> `EDTC`라고 쓴다. 카탈로그는 `EDTC-SA`다. 우리 모델명은 카탈로그를 따르고 있고 그대로
> 둔다 — 슬러그만 `edtc-sa`로 맞춘다.

## 6.7 Military (인쇄 p.54 — 한 스프레드)

부제 — `Anechoic Chambers for Military Applications` · 도판 라벨
`Military Equipment, Vehicles, Commercial and Automotive · 30 MHz to 40 GHz`

> The MIL-STD Chamber is Frankonia's large chamber solution at 1,0 m measuring distance
> according to MIL-STD 461 adapted for radiated emission and immunity tests for large EUT's or
> vehicles.
> - Full compliant acc. to MIL-STD 461 and DO-160
> - Frequency of absorbers: 80 MHz to 40 GHz
>
> The MIL-STD Advanced Chamber is Frankonia's military chamber solution acc. to MIL-STD 461
> for large EUT's, and is compliant with commercial or automotive test site requirements. Both
> solutions are designed based on MIL-STD 461 and are fully customized according to customers'
> requirements for military testing of large and heavyweight EUT's.
> - Full compliant acc. to MIL-STD 461 and DO-160
> - Full compliant EMI/EMS for commercial and automotive standards
> - Frequency of absorbers: 30 MHz to 40 GHz
>
> The MIL CHC ist [sic] Frankonia's Compact Hybrid Chamber, lined with Frankosorb® Hybrid
> Absorber Layout. The MIL CPC is Frankonia's Compact Parymid [sic] Chamber, lined with
> Frankosorb® Short Pyramid Absorbers. These chamber solutions are adapted for full compliant
> radiated emission and immunity tests of lightweight EUT's acc. to MIL-STD 461 and DO-160 at
> 1,0 m test distance.
> - Full compliant for components acc. to MIL-STD 461 and DO-160

| 구성 | External dimension | 한정구 |
|---|---|---|
| MIL-STD Chamber | Custom size | 9 kHz / 80 MHz to 40 GHz with short-pyramid absorbers · Feature: Military compliance |
| MIL-STD Advanced Pyramid | Custom size | 9 kHz / 26 MHz to 40 GHz with long-pyramid absorbers · Feature: Military, industrial and automotive compliance |
| MIL-STD Advanced Hybrid | Custom size | 9 kHz / 30 MHz to 40 GHz with hybrid absorber lining · Feature: Military, industrial and automotive compliance |
| MIL CHC | 4,880 × 4,880 × 3,000 mm | 9 kHz / 30 MHz to 40 GHz with hybrid absorber lining |
| MIL CHC / DO-160 | 5,330 × 4,880 × 3,000 mm | 9 kHz / 30 MHz to 40 GHz with hybrid absorber lining |
| MIL CPC | 6,080 × 5,380 × 3,750 mm | 9 kHz / 80 MHz to 40 GHz with short-pyramid lining |

Performance & Compliance — Full compliant emission (EMI) & immnunity [sic] (EMS) acc. to
MIL-STD 461 and DO-160, 30 MHz / 80 MHz to 40 GHz · Absorption at normal incidence:
80 MHz to 250 MHz **6 dB**, above 250 MHz **10 dB**, as per standard requirements ·
`Commerical [sic] compliance for MIL-STD Advanced`: 공통 블록(NSA/SVSWR/NSIL/FU, 26/80 MHz)

Absorbers 첫 줄 — `Frankosorb® short-pyramid, long-pyramid or hybrid absorber lining`.

**웹은 이 스프레드를 세 페이지로 나눈다** (`mil-chc` · `mil-std-chamber` ·
`mil-std-chamber-advanced`). MIL CPC와 MIL CHC / DO-160은 웹에 페이지가 없다 —
MIL CHC 페이지의 표에 DO-160 구성만 실려 있다.

웹 보충 — MIL CHC 리드에 카탈로그에 없는 한 줄: `To meet DO-160, the chamber is slightly
longer due to the absorber lining.` MIL-STD / Advanced Load capacity
`up to 80.000 kg; special turntable systems and integrations possible`. Advanced의 Overview는
MIL 항목과 Advanced 항목을 두 벌로 싣는다(`EMI Advanced :: CISPR 16-1-4 and ANSI C63.4` 등).
External dimension `Custom size; to be defined acc. to EUT type and size`.

## 6.8 Reverberation Chambers (인쇄 p.50 · `/portfolio/reverberation-solutions/`)

부제 — `Reverberation Solutions with Frankonia Performance Stirrers`

> The RVC Chambers are designed based on Frankonia's modular construction system.
> Prefabricated high-quality shielding panels (>8 MS/m) guarantee a maximum of flexibility and
> performance. The system offers a high grade of customization reflecting the demands of our
> customers. The shielding panels can be installed reverse (flat surface inside) or as regular
> PAN shielding with mounting from the inside, which allows future upgrades, e.g., absorber lining.
>
> *(닫는 문단)* Frankonia offers various stirrer designs and concepts, and maintains its role
> as a solution provider by adapting our customers stirrer designs, which we implement then in
> new RVC chambers or converting old chambers.

Features & Compliance — Retrofit of a RVC with Frankosorb® hybrid absorbers and regular PAN
shielding or converting old EMC chambers to RVC chamber · Cost-effective and performance
solution for small products up to vehicles · Immunity compliance according to IEC/EN
61000-4-21 and ISO 11452-11 · Immunity and emission compliance according to ISO 11451-5 (fast
stirring) · Full safety integration per Machinery Directive (2006/42/EC)

**Frankonia Stirrers** — Regular Z-Fold Stirrers with up to 30 RPM at e.g. ø1,8 m ·
Performance Z-Fold Stirrers with up to 60 RPM at e.g. ø2,8 m · Disc-style Stirrers with up to
120 RPM at e.g. ø4,0 m · Tube-style Stirrers with up to 240 RPM at e.g. ø2,0 m · Large-disc
Stirrers with up to 10 RPM at e.g. ø12,0 m

**Commercial & Industrial RVC**

| 구성 | External dimension | Working volume · LUF · Stirrer · Products |
|---|---|---|
| RVC e1 | 7,580 × 5,630 × 4,200 mm | 3,3 × 3,5 × 2,6 m · LUF 200 MHz · 1x Z-Fold Stirrer (vertical oriented) · Small or medium size ISM & multimedia |
| RVC e2 | 11,280 × 7,280 × 4,950 mm | 5,5 × 4,0 × 2,6 m · LUF 80 MHz · 2x Z-Fold Stirrer (vertical and horizontal oriented) · Large ISM & multimedia |

**Automotive RVC**

| 구성 | External dimension | Working volume · LUF · Stirrer · Products |
|---|---|---|
| RVC S | 5,330 × 3,380 × 3,300 mm | 2,5 × 1,0 × 1,5 m · LUF 200 MHz · 1x Z-Fold Stirrer (vertical oriented) · Components for Military or Automotive |
| RVC M | 7,580 × 5,630 × 4,200 mm | 3,3 × 3,5 × 2,6 m · LUF 200 MHz · 1x Z-Fold Stirrer (vertical oriented) · Large components for Military or Automotive |
| RVC L | 13,880 × 11,480 × 6,300 mm (custom) | 8,0 × 5,0 × 3,0 m · LUF 80 MHz · 2x Z-Fold Stirrer (vertical and horizontal oriented) · Vehicles |
| RVC XL | 15,530 × 11,480 × 6,600 mm (custom) | 8,0 × 5,0 × 3,0 m · LUF 80 MHz · 1x Large-disc Stirrer ø9,0 m, 2x Disc Stirrer ø4,0 m · Vehicles |
| RVC XXL | 17,480 × 13,580 × 6,600 mm (custom) | 8,0 × 5,0 × 3,0 m · LUF 80 MHz · 1x Large-disc Stirrer ø12,0 m, 2x Disc Stirrer ø4,0 m · Large vehicles |

**RVC는 카탈로그도 웹도 한 페이지다.** 사용자 결정(2026-08-11)에 따라 모델 상세도
`/chambers/model/rvc` 한 페이지로 만들고, 7종을 위 두 표로 구분한다.

웹 보충 — Distance `Working volume to wall, etc. >400mm (λ/4)` · Frequency range
`10 kHz to 18 or 40 GHz` · Standard 행 (`IEC/EN 61000-4-21, ISO 11452-11` / `ISO 11451-5`).
**웹에 e1·e2가 없고, M의 폭·L의 높이·XXL의 LUF가 카탈로그와 다르다(§3-6·7·8).**

---

## 7. 옮기지 않는 것

| 원본에 있는 것 | 왜 옮기지 않나 |
|---|---|
| `◂ Back to Chambers` · `Request a quote ▸` | `PageShell`이 이미 브레드크럼과 문의 밴드를 낸다 |
| 웹 사이드바의 전체 포트폴리오 목록 | 우리 메가 드롭다운이 같은 일을 한다 |
| `Download Brochure` 링크 | `/download/<id>/`가 **Download Area 페이지로 리다이렉트**될 뿐 PDF를 주지 않는다. 모델별 브로슈어는 실재하지 않는다 (2026-08-11 확인) |
| Download Area의 `Anechoic Chambers (PDF)` · `Photobook (PDF)` | **href가 비어 있다.** 본사가 링크만 걸어 두고 파일을 공개하지 않는다 |
| 카탈로그 p.6·66의 Solution Portfolio / Advantages & Benefits | 모델이 아니라 회사 단위 서술. 이미 `/chambers`와 `/chambers/services`에 들어가 있다 |

## 8. 본사에 확인을 요청할 것

1. §3의 충돌 13건 — 특히 **CHC Plus 치수**(3·4번)와 **Shielded Room 차폐 성능**(9번)
2. 치수의 정확한 정의 — External인지 Inner인지 (카탈로그에 라벨이 없다, §2)
3. **MIL CPC · EDTC-HY**를 웹 제품 목록에 올릴 계획이 있는지 (§4)
4. 카탈로그 치수표의 단위 표기 `m` → `mm` (`catalogue-2026.md` §5에 이미 기록된 사안)
5. 카탈로그 오타 — `Optmized`(p.35) · `Noteably`(p.37) · `patneted`(p.49) ·
   `Compact Parymid Chamber`(p.54) · `hieght`(p.13) · `immnunity`·`Commerical`(p.55) ·
   `optiomized`(p.41) · `Uniform filed`(p.41)
6. 웹 오타 — SAC-5 Square 표의 열 이름 중복(§3-12) · `EN 50247-1`(§3-13) ·
   `up tp ø4,0 m` · `vehicle typ`
