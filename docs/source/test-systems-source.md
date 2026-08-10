# EMC Test Systems — 원본 원장

채록 **2026-08-10**, 출처 <https://frankonia-solutions.com/>.
에셋은 [test-systems-assets.md](test-systems-assets.md)에 따로 있다.

이 문서는 `/test-systems/**` 12개 페이지의 본문이 **어디서 왔는지**를 기록한다.
영문은 본사 원문 그대로이고, 한국어는 그 번역이다. 원본에 없는 문장은 넣지 않았다.

---

## 1. 원본 페이지 구조

본사의 EMC Test Systems 메뉴는 세 축(Emission/Immunity · Search products ·
Select standard)이 네 단계로 겹쳐 있다. 실제 **본문이 있는** 페이지는 다음뿐이다.

| 본사 URL | 내용 | 우리 라우트 |
|---|---|---|
| `/test-systems/` | 리드 2문단 + "지난 25년간 개발한 제품군" 11개 목록 | `/test-systems` |
| `/test-systems/emission-measurements/` | 카드 3장(EMI-Receiver / Antennas / Accessories), 본문 없음 | — |
| `/test-systems/emission-measurements/antennas/` | **모델 9종 + 산문 + 사양표 9개** | `product/antenna` |
| `…/emission-measurements-2/pre-amplifier-for-emission-measurements/` | FPA 산문 2문단 + 사양표 4개 | `product/preamp` |
| `/test-systems/immunity-test-systems/` | 카드만, 본문 없음 | — |
| `…/immunity-test-systems-2/conducted-immunity/` | 카드만, 본문 없음 | `test/conducted` (카드 대신 장비 목록) |
| `…/immunity-test-systems-2/radiated-immunity/` | 카드만, 본문 없음 | `test/radiated` |
| `…/conducted-immunity/amplifiers/` · `…/radiated-immunity/amplifiers/` | **표 17개, 산문 0** — 대역별 모델 행렬 | `product/amplifier` |
| `…/conducted-immunity/compact-immunity-test-system/` | CIT-100 산문 + Features + 사양표 9개 | `product/system`, `test/conducted` |
| `…/conducted-immunity/power-signal-generator/` | PSG-300 산문 + 용도·특징 목록 + 사양표 2개 | `product/system`, `test/conducted` |
| `…/radiated-immunity/efs/` | EFS 산문 4문단 + Features + 사양표 2개 | `product/efs` |
| `/electrical-field-strength-meters/` | 위와 같은 본문 + **EFS-Laser** 산문·사양표 2개 | `product/efs` |
| `/rf-power-meter/` | PMS 1084 산문 1문단 + 사양표 2개 | `product/meter` |
| `/rf-relay-switching-unit/` | RSU 산문 3문단 + 사양표 1개 | `product/meter` |
| `…/radiated-immunity/magnetic-field-test-system/` | **MTS-800 산문 3문단 + Features 8 + 용도 3 + 사양표 10개** | `test/magnetic`, `product/system` |
| `/select-standard/` | 규격 24건 목록, 각 항목마다 전용 페이지 | `standards` |
| `/mil-std-461-test-system/` | **빈 페이지** (본문 0) | — |
| `/test-systems/product-list/` | **빈 페이지** — 메뉴 껍데기뿐 | 우리 개요가 대체 |

### 다운로드 영역 PDF 9종

`/test-systems/download-area_test-systems/`. 저장소 밖 `D:\FRANKONIA\Frankona-Korea\source\`
에 내려받아 두었다(합계 40.5 MB). **사이트에는 사본을 두지 않는다** — 본사가 개정하면
사본만 낡기 때문이다(채용 공고와 같은 판단).

| 파일 | 크기 | 이 작업에서 쓴 부분 |
|---|---|---|
| `200824_Antennas_Druck.pdf` (2024-09) | 12.7 MB | 미사용 — 웹페이지가 같은 9종을 더 정확히 싣고 있다 |
| `Emission-Measuring-Systems-1.pdf` (2019-03) | 11.3 MB | 미사용 |
| `amplifiers_web.pdf` (2019-09) | 7.3 MB | 미사용 — 웹페이지의 대역별 행렬과 같은 목록 |
| `Wideband-Amplifiers_web.pdf` (2020-03) | 1.6 MB | **p.4–8 → WBA 34종 전부** |
| `conducted_immunity_test_systems.pdf` (2019-03) | 3.0 MB | 미사용 |
| `GTEM.pdf` (2017-10) | 2.1 MB | 미사용 |
| `Radiated_Immunity_Test_Systems.pdf` (2016-12) | 1.7 MB | 미사용 |
| `MTS.pdf` (2019-03) | 0.4 MB | 미사용 — 웹페이지가 같은 내용 |
| `PSG.pdf` (2019-03) | 0.4 MB | 미사용 |

---

## 2. 원문 verbatim

### 2.1 개요 — `/test-systems/`

> Our Test System division offers a wide range of EMC Test Systems for emission
> and immunity testing as well as the planning, delivery and installation of
> turn-key EMC-Laboratories acc. to industrial, automotive and military standards.

> Next to the complete systems we offer also single instruments/components, like
> RF-Power-Amplifiers, Antennas, Signal Generators, RF-Power-Meters, E-Field
> Sensors, GTEM-Cells, EMI-Receiver and many other accessories for EMC-testing.

> During the last 25 years, the following product lines were developed:
>
> - Compact Immunity Test System for immunity testing acc. to IEC/EN 61000-4-6 with integrated signal generator, RF-power-amplifier, directional coupler and 3-channel RF-power-meter
> - Compact Immunity Test System for immunity testing acc. to IEC/EN 61000-4-16
> - Radiated immunity test systems acc. to IEC/EN 61000-4-3, ISO 11452-2, MIL-STD 461, RS 103
> - Full-compliant EMI-Receiver with FFT for emission measurements from 9kHz to 6GHz
> - Control software for automated emission and immunity testing
> - Complete range of antennas for emission and immunity testing in the frequency range from 9kHz to 40GHz
> - Wide range of RF-Power-Amplifiers from DC to 18GHz and output power up to 12.000W
> - EMC Control-Unit "ECU 3/6" with integrated signal-generator, relay-witching-unit, directional couplers, RF-power-meters, EUT-monitoring
> - GTEM-Cells
> - E-field-sensors, battery-, or laser-powered
> - Low-frequency- / Magnetic-field-test-system for emission and immunity tests, for example magnetic-field-testing up to 1000A/m, MIL-STD 461 testing, parts CE101, CS101, CS109, RE101, RS101

### 2.2 안테나 — `/test-systems/emission-measurements/antennas/`

원본이 다섯 그룹으로 나눠 놓았다: Broadband / Stacked Log.-periodic /
Broadband Horn / Active Rod / Active Loop.

> **Broadband Antenna** — The ALX-4000E is an especially optimized version for
> emission measurements. It offers lower antenna factors and improved VSWR.
> Additionally it can be used for immunity tests which require an input power of
> less than 100 W cw (200W intermitt.).
> The ALX-8000E has an extended frequency range up to 8 GHz. All antennas are
> supplied with antenna factors for 3.0 m and 10.0 m measuring distance (1.0 m on
> request).

> **Stacked Log.-periodic Antenna** — Stacked logarithmic-periodic broadband
> antenna for radiated immunity tests and emission measurements in the microwave
> frequency range. The antenna structure is made of laser-cut brass.
> For protection of the fine antenna structure against damage the antenna is
> equipped with a low loss plastic protection cover. The MAX-9 is especially
> suitable for immunity testing acc. to IEC 61000-4-3 because of its good field
> uniformity. Further outstanding characteristics of the MAX-9 are the wide
> bandwidth, the nearly constant high gain, very good impedance matching as well
> as equal beamwidth in E- and H-plane.

> **Broadband Horn Antenna** — The horn antennas HAX offer a very low SWR in
> their nominal frequency range and a very broad bandwidth. The gain increases
> with frequency up to approx. 18 dBi. The increasing gain with frequency helps
> to compensate cable losses.
> The HAX series is suitable for both, transmission and receiving applications.
> The maximum allowed input power is only limited by the female N-connector. The
> detailed manual of the calibrated test antennas includes gain, antenna factor,
> SWR and directional patterns. The antenna is mounted with the 22 mm tube,
> equipped with a index ring for quick changes of polarization without using tools.

> **Active Rod Antenna** — The active monopole antenna SAX-10 consists of a
> vertical rod and an impedance matching amplifier. The rod has a standard length
> of 1m (other rod length on request) and can be considered as short compared to
> the wave length in the frequency range 9 kHz-30MHz. The conversion factor is
> independent of the frequency because of the extremely high impedance of the
> matching amplifier. […] For very high field strength, an optional plug-in
> attenuator reduces the amplification by 20 dB.
> In order to avoid absolutely any influence by the mains, power supply, voltage
> regulator a. o., the SAX-10 has built-in NiMH rechargeable batteries. The
> typical operation time is at least 50 hours.

> **Active Loop Antenna** — Active, shielded loop antenna with nearly constant
> antenna factor over the entire frequency range, battery driven to minimize
> disturbance influence from power line. Combined with a CISPR-16 EMI-receiver a
> convenient field strength measuring system with low noise and pulse measuring
> capabilities is composed. […] The active loop antenna LAX-10 can be used for the
> frequency selective measurement of magnetic fields in the long wave, mid wave
> and short wave frequency ranges. It can be used for testing according to CISPR,
> MIL, FCC, EN, ISO, ANSI, ETSI and many other standards.

**모델 9종과 대역** (사양표 9개에서):

| 모델 | 대역 | 그룹 |
|---|---|---|
| ALX-4000E | 25 MHz – 4 GHz | Broadband |
| ALX-8000E | 25 MHz – 8 GHz | Broadband |
| MAX-9 | 600 MHz – 10.5 GHz | Stacked log.-periodic |
| MAX-9-7/16 | 0.6 – 7.5 GHz, 950 W @1 GHz | 〃 (MAX-9의 고출력 변형) |
| MAX-18 | 700 MHz – 20 GHz | 〃 |
| HAX-6 | 500 MHz – 6 GHz | Horn |
| HAX-18 | 800 MHz – 18 GHz | 〃 |
| HAX-40 | 14 – 40 GHz | 〃 |
| SAX-10 | 9 kHz – 30 MHz | Active rod |
| LAX-10 | 9 kHz – 30 MHz | Active loop |

### 2.3 프리앰프 — `…/pre-amplifier-for-emission-measurements/`

> The FPA-x is a general purpose broadband pre-amplifier with high gain and low
> internal noise. The wide frequency range up to 2/6 GHz allows measurements acc.
> CISPR 22. Due to the high gain and the low noise figure the system noise is
> nearly independent of the other components including cable and receiver. These
> features make the FPA-x very useful for the measurement of very low limits, as
> required for CISPR 25. In this case it will be connected directly to the antenna.

> It must be noted that the use of pre-amplifier is generally not recommended for
> the measurement of impulsive signals. Such broadband noise is typical for many
> EMC measurements. This means that any broadband pre-amplifier is not suitable
> for EMC measurement of a broadband pulse spectrum.

ESD 주의 문단도 원본에 있다 — FPA-2와 FPA-6A는 ESD 보호가 되어 있고 FPA-6B는
기술적 이유로 불가하다는 내용.

### 2.4 전계강도계 — `…/radiated-immunity/efs/`, `/electrical-field-strength-meters/`

> The Frankonia EFS field strength meters especially have been designed for field
> strength measurements / field homogeneity measurements during radiated immunity
> tests according to IEC/EN 61000-4-3 / -20. But it could also be used to measure
> the radiation exposure of the environment, for example at workplaces or flats.

> The EFS is an isotropic miniature E-field sensor to ensure that the E-field will
> not be influenced by the size of the sensor itself. It even does not need any
> metering unit (which could also influence the field strength), because of its
> direct fibre optic output which allows direct connection of the sensor to the
> USB-interface of the control PC or laptop.

> **EFS-Laser** — The EFS-Laser cover the frequency-range from 10 KHz – 6 GHz. The
> utilized linearization technology provides a dynamic range up to 100 dB. […]
> Noise reduction and temperature compensation allow accurate measurments down to
> 0.1 V/m. The probe is laser-powered to allow continuous, galvanically isolated
> operation without recharging or battery replacement.

**원본 안에서 값이 충돌한다.** 두 페이지가 EFS-300의 동적 범위를 다르게 적는다:

| | `/…/radiated-immunity/efs/` | `/electrical-field-strength-meters/` |
|---|---|---|
| EFS-300 | 1.5 – 1500 V/m (60 dB) | 0.17 – 170 V/m (60 dB) |
| 배터리 동작 시간 | 100 시간 | 80 시간 |

전용 제품 페이지(`/…/efs/`)를 따랐다. 두 값 모두 본사 것이므로 어느 쪽도
지어낸 것이 아니지만, **본사에 확인이 필요한 사안**이다.

### 2.5 파워미터·스위칭 — `/rf-power-meter/`, `/rf-relay-switching-unit/`

> The PMS 1084 is in the standard version a 2-channel RF-Power Meter for the
> frequency range from 100 kHz up to 6 GHz or from 10 kHz to 500 MHz (PMS 1084 B).
> The measuring range reaches from –60 dBm to +20 dBm. It is possible to upgrade
> the PMS 1084 up to max. 4 measuring channels at any time. […] Hence the PMS 1084
> is very good suitable for the automated measurement of forward and reverse power
> in immunity test systems acc. to IEC/EN 61000-4-3 / -6.

> The RSU RF-Relay Switching Unit is applicable for all fields of RF- and EMC
> measurements to switch (manual or remote controlled) from one input to 2 or 3
> outputs. Typical applications in measuring systems are changeover switching
> between different amplifiers, antennas or power meters. This does also prevent
> circuit faults due to wrong cabling.

### 2.6 CIT-100 — `…/conducted-immunity/compact-immunity-test-system/`

> The CIT-100 is a complete test system for conducted RF-immunity testing and
> BCI-testing acc. to IEC/EN 61000-4-6, ISO 11452-4, MIL-STD 461, CS114 and
> similar standards.

> As a "stand-alone" test system the CIT-100 is convincing by its easy and
> comfortable handling and the excellent cost-performance ratio. We also offer the
> full range of coupling/decoupling networks (CDN's), EM-coupling clamp, BCI- and
> current clamps.

Features 목록(원문):

> - Conducted RF immunity tests acc. to IEC/EN61000-4-6 and BCI tests acc. to ISO 11452-4 and MIL-STD 461 CS 114
> - Signalgenerator, RF-power amplifier, RF-power meter and directional coupler in one 19"-case
> - All built in instruments can also be used separately, via existing input / output connector.
> - Stand-alone operation possible with optional available netbook
> - Control-software included
> - Most important parameters are shown on an integrated display
> - Automatic EUT-monitoring
> - Complete range of CDNs available

### 2.7 PSG-300 — `…/conducted-immunity/power-signal-generator/`

> The PSG-300 contains a linear precision power amplifier with a wide bandwidth
> (DC-300 kHz), suitable for all applications concerning fast alternating signals
> at high output power. The built in generator provides sine, square and triangle
> waves. […] The application software is suited for general power generator
> applications and for immunity tests according to IEC/EN 61000-4-16 as well as to
> IEC/EN 61543.

용도(원문): Simulation of DC / AC supply lines · Control of piezo actors ·
Generation of magnetic fields with Helmholtz or similar coils · Immunity testing
according to IEC/EN 61000-4-16, IEC/EN 61000-4-19 AND IEC/EN 61543 ·
Calibration devices etc.

### 2.8 MTS-800 — `…/radiated-immunity/magnetic-field-test-system/`

> The MTS-800 is a compact test system for broadband generation and measurement of
> magnetic fields. Its internal components allow automatic EMC tests according to
> automotive standards where high field strength need to be generated or measured.

> In combination with our triaxial Helmholtz coils full automated susceptibility
> tests are possible at magnetic field strength up to 1000 A/m for frequencies from
> DC to 1 kHz. Lower field strength can be generated for frequencies up to 250 kHz.
> Due to the triaxial setup of our Helmholtz coil major improvement in device
> handling is achieved because there is no need to turn an EUT during tests.

> Full compliance with several immunity test as ISO 11452-8, MIL-STD-461 RS101,
> CS101, CS109, IEC/EN 55103-2, IEC/EN 61000-4-8, SAE J1113-2, SAE J1113-22, Ford
> ES-XW7T-1A278-AC, GM W3097, PSA B21 7110, Renault 36-00-808, DC-11224, DC 10614
> and similar standards. Furthermore the MTS-800 allows emission measurements
> according to MIL-STD-461E/F RE101, CE101 and IEC/EN 55103-1.

MIL-STD-461 방법 정의(원본 표):
CE101 Conducted Emission, Power Leads, 30 Hz to 10 kHz ·
CS101 Conducted Susceptibility, Power Lead, 30 Hz to 150 kHz ·
CS109 Conducted Susceptibility, Structure Current, 60 Hz to 100 kHz ·
RE101 Radiated Emission, Magnetic Field, 30 Hz to 100 kHz ·
RS101 Radiated Susceptibility, Magnetic Field, 30 Hz to 100 kHz

### 2.9 광대역 앰프 WBA — `Wideband-Amplifiers_web.pdf` p.4–8

표지: **RF-WIDEBAND AMPLIFIERS 500 MHz – 40 GHz**,
각주 "For the frequency-range from 10kHz to 6GHz please see our separate catalog".

34종. 대역별로 이렇게 나뉜다(모델 — Pout — Gain):

| 대역 | 모델 |
|---|---|
| 500 MHz – 18 GHz | WBA-0,5/18 – 10 (10 W, 43 dB) · – 20 (10–20 W, 43) · – 50 (50 W, 47) |
| 1 – 20 GHz | WBA-1/20 – 4 (4 W, 36) · – 20 (20 W, 43) |
| 2 – 18 GHz | WBA-2/18 – 5 (5 W, 37) · – 10 (10 W, 40) |
| 2 – 20 GHz | WBA-2/20 – 5 (5 W, 37) · – 20 (20 W, 43) |
| 6 – 10 GHz | WBA-6/10 – 50 (50 W, 47) · – 100 (100 W, 50) |
| 6 – 12 GHz | WBA-6/12 – 20 (20 W, 43) · – 50 (50 W, 47) |
| 6 – 18 GHz | WBA-6/18 – 10 (40) · – 20 (43) · – 40 (46) · – 50 (47) · – 60 (47) · – 100 (50) · – 150 (52) · – 200 (53) · – 300 (55) |
| 6 – 26.5 GHz | WBA-6/26.5 – 20 (20 W, 43) |
| 18 – 26.5 GHz | WBA-18/26.5 – 5 (37) · – 10 (40) · – 20 (43) · – 25 (44) · – 40 (46) · – 80 (49) |
| 18 – 40 GHz | WBA-18/40 – 10 (8–10 W, 40) |
| 26.5 – 40 GHz | WBA-26.5/40 – 5 (37) · – 10 (40) · – 40 (46) · – 80 (49) |

모델명은 카탈로그 표기 그대로다 — 소수점 쉼표(`0,5`)와 하이픈 간격까지.

---

## 3. 대응 관계 — 원본 → 이 사이트

| 원본 요소 | 이 사이트 |
|---|---|
| 리드 문단 | `TopicBody.lead` → `.prose` |
| Features / 용도 불릿 | `TopicBody.groups` → `.check-list` |
| Technical specifications 표 | `TopicBody.tables` → `.spec-table` |
| 제품 사진 | `TopicBody.figure` / `figureRow` → `.figure` |
| 대역별 모델 행렬(앰프) | `bandGroups` → `SubHead` + `.hairline-list` |
| Select standard 24건 | `testStandards` → `standards` 페이지, 산업군별 묶음 |

---

## 4. 옮기지 않은 것과 그 이유

- **EMI-Receiver 제품군.** 개요 문단이 "Full-compliant EMI-Receiver with FFT,
  9kHz–6GHz"를 들지만 전용 페이지(`/test-systems/emission-measurements/`)는
  카드뿐이고 모델명도 사양도 없다. 제품군을 새로 만들 근거가 없어 두지 않았다.
- **ECU 3/6 EMC Control-Unit.** 개요 목록에만 있고 페이지가 없다. 같은 이유.
- **ProveEMC 소프트웨어.** 원본이 "Software is coming soon."이라고 적어 두었다.
- **`/mil-std-461-test-system/`.** 본문이 비어 있다. MIL-STD-461 관련 내용은
  MTS-800 페이지의 CE101/CS101/CS109/RE101/RS101 표에서 가져왔다.
- **주파수 특성 그래프 이미지**(gain, VSWR, antenna factor, generated field
  strength). 축 눈금이 작아 웹에서 판독이 어렵고, 값 자체는 사양표에 있다.
- **각 안테나의 Datasheet PDF 링크.** 본사 원본에 링크만 있다.
- **CIT-100 페이지의 "CIT-10" 표기.** 같은 문단 안에서 CIT-100과 CIT-10을
  섞어 쓰는데, 제품명은 CIT-100이다. 오타로 보고 옮기지 않았다.

## 5. 이 페이지 범위 밖이라 보류한 자료

- `Emission-Measuring-Systems-1.pdf`(11.3 MB) — 방출 측정 시스템 전체. EMI-Receiver
  제품군을 열게 되면 여기가 출처가 된다.
- `GTEM.pdf` — GTEM 셀. 지금은 `testModels`에 이름만 있다.
- `200824_Antennas_Druck.pdf`(2024-09) — 안테나 마스트·턴테이블이 함께 들어 있다.
  액세서리 제품군을 만들 때 쓸 수 있다.
- `conducted_immunity_test_systems.pdf` — CDN·커플링 클램프 목록.
