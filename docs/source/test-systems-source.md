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

**2026-08-13 갱신.** 아홉 종을 전수 검토했다. "미사용"이던 다섯 종이 이제 본문의
출처다 — 아래 표와 §2.10~§2.13을 보라.

| 파일 | 크기 | 이 작업에서 쓴 부분 |
|---|---|---|
| `200824_Antennas_Druck.pdf` (2024-09) | 12.7 MB | **신규 모델 13종** — AXL-80·80S·80ES·80-6G·200, ALX-4000, HAX-6-KFZ, SAM-6·18, 마스트 FSM/FAM/FBM, FPD-01 |
| `Emission-Measuring-Systems-1.pdf` (2021-04) | 11.3 MB | **`product/emission` 전체** — ERX-6, ERC-6, LISN 4종, NFS-100, LVVL, ACF-01B |
| `amplifiers_web.pdf` (2019-09) | 7.3 MB | **모델 105종의 대역·출력** (§2.10). 웹 매트릭스가 1 GHz에서 멈추는 69종은 여기가 유일한 출처 |
| `Wideband-Amplifiers_web.pdf` (2020-03) | 1.6 MB | p.4–8 → WBA 34종 전부 |
| `conducted_immunity_test_systems.pdf` (2019-03) | 3.0 MB | **`product/coupling` 전체**와 CIT-1000 (§2.11) |
| `GTEM.pdf` (2017-10) | 2.1 MB | 미사용 — 본문 텍스트가 없는 이미지 PDF다(10쪽에서 추출되는 문자 777자). 페이지를 눈으로 옮겨야 하는데 GTEM은 지금 이름 한 줄이라 이번 범위 밖으로 두었다 |
| `Radiated_Immunity_Test_Systems.pdf` (2016-12) | 1.7 MB | **ECU-3 / ECU-6** (§2.12) |
| `MTS.pdf` (2019-03) | 0.4 MB | 미사용 — 웹페이지가 같은 내용 |
| `PSG.pdf` (2019-03) | 0.4 MB | 미사용 — 웹페이지가 같은 내용 |

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

### 2.10 앰프 모델별 대역·출력 — 두 출처 (추가 2026-08-13)

**출처가 둘이고, 어느 모델이 존재하는지는 웹사이트가 정한다.**

- **1 GHz까지의 네 대역(36종)** — 본사 웹 매트릭스
  `…/conducted-immunity/amplifiers/`. 이 페이지는 모델당 사양표를 통째로 싣는다.
  저장소에는 대역 헤딩과 품번만 옮겨져 있었는데, 이번에 각 모델의 **주파수 범위와
  정격 출력**을 표에서 그대로 가져왔다. 이득도 표에 있지만 싣지 않았다 —
  나머지 69종에는 이득이 없어 열이 비게 된다.
- **그 위 아홉 대역(69종)** — `amplifiers_web.pdf` (2019 Amplifier Selection Book).
  웹 매트릭스는 1 GHz에서 끝나므로 이 69종은 이 책에만 있다.

책의 5쪽 Product Range 도표가 사이트의 "Solid-state range" 표(대역 → 출력 범위)의
출처이며, 이번에 읽은 모델별 값과 서로 맞는다.

**텍스트 추출이 아니라 페이지를 이미지로 읽었다.** 표를 인쇄한 서브셋 폰트
(`FagoCoTf-Identity-H`)에 ToUnicode CMap이 없어 `pdftotext`가 숫자를 통째로
떨어뜨린다 — 주파수 행이 `kHz-MHz`처럼 단위만 남는다. 51개 표 페이지를 130 dpi로
렌더해 상단 세 줄(Part Number / Frequency range / Output Power typ.)만 잘라
판독했다. 그래서 옮긴 값은 모델당 **두 개**다.

읽으면서 나온 것들:

- **VLC-600 대 VLC-1100.** 책은 10 kHz–400 MHz 그룹에 VLC-600(600 W)을, 웹사이트는
  같은 자리에 VLC-1100(1100 W)을 싣는다. 둘 다 본사 표기이고 오타로 보이지 않는다
  — 2019년과 현재의 라인업이 다른 것으로 본다. **현행인 웹사이트를 따랐고
  VLC-600은 싣지 않았다.** EFS-300 때와 같은 판단이다(§2.4).
- **FLG-15F는 20 W.** 품번은 15 W를 가리키는데 표의 정격은 20 W다. 수치에 맞춰
  품번을 고치는 것은 우리가 할 일이 아니라 그대로 두고 데이터에 주석을 달았다.
- **FLG-100A는 120 W**, 같은 이유로 그대로 두었다.
- 책의 Product Range 도표는 `10 kHz – 400 MHz`를 `75 W – 2000 W`로 적지만 그
  그룹의 최소 모델은 VLC-60(60 W)이다. 책 안의 불일치라 도표 값을 그대로 둔다.

### 2.11 CIT-1000과 결합·분리 액세서리 — `conducted_immunity_test_systems.pdf`

> The CIT-1000 is a complete test system for conducted RF-immunity tests acc. to
> IEC/EN 61000-4-6 and BCI-testing acc. to ISO 11452-4, MIL-STD 461 CS 114 […]
> In addition to the CIT-10 it offers […] frequency extension of the signal
> generator, directional coupler and RF-Voltmeter up to 1.2 GHz […] stand-alone
> operation via integrated touch-screen PC […] frequency extension for MIL-STD
> 461 testing down to 4 kHz, by means of the external device "CIT-4K", with a
> 250 W power-amplifier.

> According to IEC/EN 61000-4-6 the preferred coupling and decoupling devices are
> the CDNs, for reasons of test reproducibility and protection of the AE.
> However, if they are not suitable or available, clamp injection should be used.

> The EM clamp establishes both capacitive and inductive coupling to the cable
> connected to the EUT. The EM clamp (in contrast to the conventional current
> injection clamp) has a directivity ≥ 10 dB, above 10 MHz, so that a defined
> impedance between the common-mode point of the AE and the ground reference
> plane is no longer required.

CDN은 **타입 계열 단위로** 실었다. 본사는 M 계열만 해도 주문 변형을 여든 가지
가까이 인쇄하는데(커넥터·전류·전압 등급·대역 하한의 조합), 그것을 전부 옮기면
제품 페이지가 아니라 부품표가 된다. 변형을 만드는 네 가지 축은 페이지의
"타입에서 주문 코드로" 목록에 적었다.

**BCI 프로브의 사양표는 옮기지 않았다.** 추출된 표에서 라벨 열과 값 열이 어긋나
`Inner diameter 120 mm / Outer Diameter 40 mm`처럼 안지름이 바깥지름보다 큰
조합이 나온다. 어긋난 정도가 행마다 일정하지 않아 확정할 수 없었다. 산문에서
확실한 두 값(4 kHz–400 MHz, 하니스 40 mm)만 실었다. **본사 확인이 필요하다.**

### 2.12 ECU-3 / ECU-6 — `Radiated_Immunity_Test_Systems.pdf` p.11–12

개요 목록이 "EMC Control-Unit ECU 3/6"을 들면서도 전용 페이지가 없어 §4에서
보류했던 제품이다. 이 카탈로그에 두 쪽짜리 본문과 사양표가 있다.

> The ECU-3/-6 is a central EMC test and control unit, which combines in just one
> compact box many major test components like signal generator, power meter,
> directional couplers and relay switching unit, which are needed for EMC tests.
> That reduces the cabling work and possible cabling mistakes to a minimum.

발생기는 ECU-3이 9 kHz–3 GHz, ECU-6이 9 kHz–6.5 GHz다.

### 2.13 방출 계측 시스템 — `Emission-Measuring-Systems-1.pdf` (2021-04)

§4에서 "제품군을 새로 만들 근거가 없어 두지 않았다"고 적었던 EMI 리시버 제품군의
출처다. §5가 예고한 대로 이 파일이 들어오면서 `product/emission`을 열었다.

> The ERX-6 combines the advantages of a traditional EMI-receiver with the
> ultra-fast FFT-technology (time domain). Further more it offers the full
> functionality of a realtime Spectrum Analyzer […]

> Although the "ERC-6" is the less expensive little brother of our flagship
> "ERX-6", it is more than worth to have an intensive look on it. With the ERC-6
> only properties, that are not required for full-compliance EMI measurements
> according to CISPR 16-1, have been reduced or omitted.

싣은 모델 9종: ERX-6, ERC-6, C2-16, C4-32, LISN-KFZ, LISN-MIL, NFS-100, LVVL,
ACF-01B.

**LISN-KFZ와 LISN-MIL은 표가 아니라 문장으로 실었다.** 이 두 표도 라벨 열과 값
열이 어긋나 있다(`Frequency range 100 A`, `Max. cont. current 500 V` …). 옆
설명문은 어긋남이 없으므로 거기서 읽히는 값만 옮겼다.

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
| 사양표의 **모델별 열** | `testModelBody` → 모델 행을 열면 나오는 "한눈에" 수치 |
| 모델을 지목한 문장 | 〃 → 같은 패널의 리드 한 문단 |
| 모델별 제품 사진 | `test-system-gallery.ts` → 같은 패널의 사진 |

### 모델 행 아코디언 (추가 2026-08-13)

챔버 브랜치와 같은 구성으로 맞췄다. 모델 행을 누르면 그 모델의 사진, 본사가
그 모델을 지목해 쓴 문장, 사양표에서 그 모델의 열만 뽑은 수치 4~6개, 그리고
모델명이 이미 적힌 견적 메일 버튼이 열린다. 챔버 쪽에 있는 "모델 상세 보기"
버튼은 없다 — 이 장비들은 제품군 페이지가 곧 자기 페이지라 갈 곳이 없다.

**새로 쓴 문장은 없다.** 리드는 §2의 verbatim 원문이고, 수치는 전부 이 파일이
근거인 사양표의 셀이다. 긴 셀은 앞머리 수치로 줄였고(`−60 dBm to +20 dBm
(10 kHz ≤ f ≤ 4 GHz)` → `−60 … +20 dBm`) 다시 쓰지는 않았다. 전체 행은 같은
페이지 사양 밴드에 그대로 있다.

리드를 붙이는 기준은 하나다 — **본사가 그 모델을 이름으로 지목해 쓴 경우에만**.
혼 안테나 3종, EFS 프로브 4종, FPA-18/26/40은 계열 전체를 설명하는 문단밖에
없고 그 문단은 이미 같은 페이지 맨 위 리드다. 세 행에 같은 글을 세 번 더 찍는
대신 수치만 연다.

패널이 아예 없는 행:

- **앰프 70종** — 본사가 대역과 품번만 인쇄한다(§4, 아래 추가 참조).
- **GTEM** — 이름과 데이터시트 PDF뿐. 수치가 하나도 없다.

---

## 4. 옮기지 않은 것과 그 이유

- ~~**EMI-Receiver 제품군.**~~ → **2026-08-13 해제.** 본사 웹페이지에는 여전히
  카드뿐이지만 `Emission-Measuring-Systems-1.pdf`(2021-04)가 들어와 근거가
  생겼다. `product/emission` 신설, §2.13 참조.
- ~~**ECU 3/6 EMC Control-Unit.**~~ → **2026-08-13 해제.**
  `Radiated_Immunity_Test_Systems.pdf` p.11–12에 본문과 사양표가 있다.
  `product/system`에 ECU-3·ECU-6으로 실었다. §2.12 참조.
- **ProveEMC 소프트웨어.** 원본이 "Software is coming soon."이라고 적어 두었다.
- **`/mil-std-461-test-system/`.** 본문이 비어 있다. MIL-STD-461 관련 내용은
  MTS-800 페이지의 CE101/CS101/CS109/RE101/RS101 표에서 가져왔다.
- **주파수 특성 그래프 이미지**(gain, VSWR, antenna factor, generated field
  strength). 축 눈금이 작아 웹에서 판독이 어렵고, 값 자체는 사양표에 있다.
- **각 안테나의 Datasheet PDF 링크.** 본사 원본에 링크만 있다.
- **CIT-100 페이지의 "CIT-10" 표기.** 같은 문단 안에서 CIT-100과 CIT-10을
  섞어 쓰는데, 제품명은 CIT-100이다. 오타로 보고 옮기지 않았다.
- **앰프 36종의 모델별 주파수 범위·출력** (추가 2026-08-13). `TestModel` 주석이
  "2019 Amplifier Selection Book에 있고 아직 옮기지 않았다"고 적어 둔 값이다.
  모델 패널을 만들면서 다시 시도했고, **옮길 수 없다는 결론**을 내렸다:

  `pdftotext -layout amplifiers_web.pdf`로 뽑으면 표의 굵은 글꼴 서브셋이
  ROT-31로 인코딩되어 있고(`E#N` → `dBm`, `L)[` → `kHz`) **숫자 글리프가 통째로
  빠진다.** 주파수 범위 행은 전부 `kHz-MHz`처럼 단위만 남는다. 게다가 라벨 열과
  값 열이 한 행씩 어긋나게 추출된다 — 위 예에서 `25 W 25 W 75 W`는 바로 위
  `Frequency range` 행이 아니라 `Output Power typ.` 행의 값이다.

  페이지를 이미지로 렌더해 눈으로 옮기는 방법은 남아 있지만, 36종 × 15행을
  손으로 받아 적는 일이라 **견적서와 대조할 값을 오탈자 위험에 놓는다.** 그래서
  앰프는 지금도 대역 헤딩 + 품번만 싣는다. 본사에서 원본 표를 텍스트나 스프레드
  시트로 받는 편이 옳다 — 확인이 필요한 사안이다.

## 5. 아직 남은 것

2026-08-13 기준. 위 네 종은 §2.10~§2.13으로 들어갔고, 남은 것은 이것뿐이다.

- **`GTEM.pdf`** — 10쪽짜리 이미지 PDF다. 추출되는 문자가 777자뿐이라 본문이
  텍스트로 들어 있지 않고, 페이지를 이미지로 렌더해 눈으로 옮겨야 한다.
  GTEM은 지금 `testModels`에 이름 한 줄과 "GTEM cell"이라는 설명만 있는 상태이고,
  `product/system`에서 유일하게 패널이 열리지 않는 행이다. 여는 순간 여기가
  출처가 된다.
- **`amplifiers_web.pdf`의 나머지 13행.** 모델당 대역과 출력만 옮겼다(§2.10).
  이득·평탄도·IP3·VSWR·치수·무게·냉각·회로보호가 표에 남아 있다. 웹 매트릭스에
  실리는 36종은 웹에서 기계적으로 가져올 수 있지만, 나머지 69종은 눈으로
  옮겨야 하고 값이 900개 가까이 된다. **본사에서 원본 표를 텍스트나 스프레드시트로
  받는 편이 옳다.**
- **본사 확인이 필요한 세 가지** — VLC-600 대 VLC-1100(§2.10), BCI 프로브
  사양표의 열 어긋남(§2.11), LISN-KFZ·LISN-MIL 표의 열 어긋남(§2.13).

---

## 6. 2026년 데이터시트 (2026-08-22 추가)

본사가 2026-08 메일로 **홍보할 제품군**을 지정하고 데이터시트 12종을 첨부했다.
저장소 밖 `D:\FRANKONIA\FRF\Datasheet\`에 있다. 사이트에는 사본을 두지 않는다 —
§1의 다운로드 PDF와 같은 판단이다.

메일이 지목한 제품:

| 제품 | 용도 (본사 표현) | 이 사이트 |
|---|---|---|
| CIT-100 / CIT-1000 | IEC 61000-4-6 · ISO 11452-4 · CS114 · IEC 61000-4-39 | `product/system` — 이미 있음, 2026 수치로 갱신 |
| ECU-6 | 방사 내성 — IEC 61000-4-3 · ISO 11452-2 · RS103 | `product/system` — **복원** |
| ERX-7 | 방출 | **보류** — 아래 참조 |
| MTS-800 | MIL-STD-461 (CE101 · CS101 · RE101 · RS101 · CS109) | `product/system` — **복원** (`test/magnetic` 페이지는 그대로) |
| PSG-300 | IEC 61000-4-16 · IEC 61000-4-19 | `product/system` — **복원** |
| RSU | 릴레이 스위치 | `product/meter` — 이미 있음 |
| PMS | 파워미터 | `product/meter` — 이미 있음 |
| EFS | 전계 프로브 | `product/efs` — 이미 있음, **EFS-18 추가** |

### 6.1 2026 데이터시트가 바꾼 수치

옛 웹페이지 값을 데이터시트 값으로 덮었다. 견적서와 대조할 값이므로 어느 쪽을
따랐는지 남긴다.

| 항목 | 옛 웹페이지 | 2026 데이터시트 | 파일 |
|---|---|---|---|
| CIT 내장 앰프 | 25 / 75 W, CIT-1000은 180 W | **25 / 75 / 200 W** (양쪽 모두) | `cit-100_datasheet_2026_05_digital.pdf`, `cit-1000_2026_digital.pdf` |
| CIT-100 RF 전압계 2·3 | −40 … +30 dBm | **−40 … +33 dBm** | 위와 같음 |
| ECU 발생기 | ECU-6 9 kHz – 6.5 GHz | **8 kHz – 6.2 GHz**, −65 … +13 dBm | `_ecu6g_2026_digital.pdf` |
| PSG-300 출력 | 250 W / 14 kg | **260 W / 약 24 kg** | `psg300_2026_digital.pdf` |
| PSG-300A 출력 전류 | ± 23 Apeak / 30 kg | **± 24 Apeak / 약 32 kg** | 위와 같음 |
| MTS-800 AD 변환기 | 16 bit, 1.25 MSPS | **16 bit, 1.0 MSPS** | `_mts800_2026_digital.pdf` |

### 6.2 데이터시트 안에서 서로 어긋나는 값

- **CIT-100 앰프 출력.** 사양표는 CIT-100/25, /75 MIL, /75, /200 네 가지를 싣는데
  바로 옆 본문은 "highest output power can be 75 W"라고 적는다. 표를 따르고
  `productBody`의 CIT-100 표에 `note`로 남겼다.
- **ECU 품번.** 표지와 본문은 **ECU-6.2**, 부품표는 **ECU-6**, 후면 패널 사진의
  명판은 **ECU-6G**다. 본사 메일이 쓰는 대로 `ECU-6`으로 실었고 표에 `note`를
  달았다.
- **BCI 프로브.** 표지는 ISO 11452-4를, 본문은 ISO 11452-5:2005를 든다.
  `product/coupling`의 기존 행은 그대로 두었다 — 2019 카탈로그와 값이 같다.

### 6.3 ERX-7 — 보류

메일은 "ERX-7 (we have new version coming up)"이라고만 적었고, 첨부된 리시버
데이터시트는 **ERX-6**(`_erx-6_webversion_neu_2026_digital.pdf`, 2026 웹버전)이다.
ERX-7의 수치는 어디에도 없다. 그래서 `product/emission`은 현행 기종인 **ERX-6 한 대**로
두었다(§6.4). 페이지의 리드·특징·사양표도 2026 ERX-6 데이터시트에서 다시 옮겼고,
같은 데이터시트 1쪽의 제품 사진을 `emission-erx-6.webp`로 넣어 2021 카탈로그의
LISN 사진을 대체했다 — LISN은 이제 싣지 않는 제품이다.

**본사에 ERX-7 데이터시트를 요청해야 한다** — 받는 즉시 `testModels`의 `emission`
그룹 "EMI test receivers"에 한 행, `modelFacts`와 `modelLead`에 한 항목씩 들어간다.

### 6.4 표시 범위 — 메일에 실린 것만 (전수 검사 2026-08-22)

**전체 복구가 아니다.** EMC Test Systems 브랜치의 서브페이지와 아이템 리스트를
전수 검사해, 본사 메일이 지목한 제품만 화면에 올렸다. 결정은 두 곳에 있다.

- `shownTestProducts` — 어느 **제품군**을 그릴지. 인덱스·헤더 드롭다운·사이트맵이
  이 목록 하나를 읽는다.
- `hiddenTestModels` — 올린 제품군 **안에서** 어느 모델을 뺄지. `modelsByProduct`
  한 곳에서 걸러지므로 행·개수·드롭다운 캡션·MyCart가 모두 따라온다.

#### 검사 결과 — 표면별

| 자리 | 올린 것 | 내린 것 |
|---|---|---|
| `/test-systems/` 인덱스 By Product | 제품군 4개 — Integrated Systems · Emission · Field Strength Meters · Meters & Switching | 앰프 · 안테나 · 프리앰프 · 결합장치 |
| `/test-systems/` 인덱스 By Test · By Standard | — | 두 축 모두 |
| `/test-systems/` 리드 2문단 | 신호발생기 · RF 파워미터 · 전계 센서 · EMI 리시버 | RF 파워앰프 · 안테나 · GTEM 셀 |
| `/test-systems/` "지난 25년간 개발한 제품군" 11줄 | 7줄 | 안테나 · RF 파워앰프 · GTEM 셀 · "ECU 3/6"(→ ECU-6 한 줄로) |
| 헤더 드롭다운 | 위 제품군 4개 (한 칸 목록) | 두 칸 메가패널 전체 |
| 랜딩 `#equipment` 카드 | EFS · Meters & Switching · Integrated Systems | 앰프 · 안테나 · 프리앰프 (Emission은 이 줄에 카드가 원래 없다) |
| 랜딩 EMC 시험장비 밴드 카피 | EMI 리시버 · 전계 센서 · RF 파워미터 | 앰프 · 안테나 · 프리앰프 |
| `product/emission` 모델 행 | ERX-6 | ERC-6 · C2-16 · C4-32 · LISN-KFZ · LISN-MIL · NFS-100 · LVVL · ACF-01B |
| `product/emission` 본문·사양표 | ERX-6 리드 2문단 · 주요 특징 · 사양표 1개 | ERC-6 특징, 자동차·군용 LISN 문단, LISN 표, 프로브·루프·클램프 표 |
| `product/system` · `efs` · `meter` 모델 행 | 전부 (메일 항목) | — |
| 사이트맵 | 인덱스 + 제품군 4개 | 제품군 4개 · `test/*` 4개 · `standards` |

#### ERC-6 — 한 번 더 볼 항목

`hiddenTestModels`에서 유일하게 판단이 갈리는 항목이다. ERX-6의 저가형이고 같은
"EMI test receivers" 그룹에 있어, 메일의 "ERX-7 … as system for emission"이 이것까지
덮는다고 읽을 수도 있다. 메일이 적은 것은 ERX이고 ERC는 다른 품번이라 일단 내렸다.
그 읽기가 틀렸다면 `hiddenTestModels`에서 이름 한 줄을 빼면 된다.

#### 내린 것은 지운 것이 아니다

라우트·모델 데이터·본문·사진·`modelFacts`·`modelLead` 전부 그대로 남아 있고 URL도
계속 응답한다. 다만 **사이트 안에서 그 페이지로 가는 링크가 하나도 없고 사이트맵에도
없다** — 링크 없는 페이지를 사이트맵에 남기면 검색 결과로 들어오게 되므로, "안 보이게
한다"는 말이 성립하지 않는다. `tests/rendered-html.test.mjs`의 `UNLISTED`와
"nothing on show links into a held-back page" 테스트가 이 두 조건을 함께 지킨다.

되돌리는 법: `shownTestProducts`에 제품군을 더하거나, `hiddenTestModels`에서 모델
이름을 빼거나, `showTestAxis`·`showStandardsAxis`(test-system-content.tsx)를 `true`로
바꾼다. 사이트맵과 헤더는 같은 목록을 읽으므로 따로 손댈 곳이 없고, 테스트의
`UNLISTED`만 함께 줄이면 된다.

### 6.5 아직 복원하지 않은 것

- **ECU-3.** 본사 홍보 목록에 없고 2026 데이터시트도 없다. 실을 수 있는 값이
  ECU-6.2 데이터시트가 이미 갈아치운 2016 카탈로그 수치뿐이라 두었다.
- **GTEM 셀.** §5와 같은 이유다. 수치가 하나도 없다.
