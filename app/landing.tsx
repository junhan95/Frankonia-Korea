import { chambersPath, industryPath, typePath } from "./chamber-sections";
import { sectionPath } from "./company-sections";
import {
  testProductPath,
  testSystemsPath,
} from "./test-system-sections";
import {
  asset,
  contactEmail,
  contactPhoneHref,
  localeRoute,
  type Lang,
} from "./site-config";
import SiteHeader, { type HeaderCopy } from "./site-header";
import SiteFooter, { type FooterCopy } from "./site-footer";
import StructuredData from "./structured-data";

/* All copy lives here, keyed by locale — the KO / EN pages render from the
   same tree. Chamber category order is fixed by the site map:
   Automotive → Military → Commercial → Powertrain → RVC → Shielded Room.

   The navigation labels are localised like everything else. Korean labels are
   far shorter than the English ones ("챔버" against "Anechoic Chambers"), so
   the bar is laid out to keep the same design in both: see the `.nav` rules in
   globals.css, which anchor the mark and the controls and centre the menu in
   whatever space is left rather than letting label width move them. */
const copy = {
  ko: {
    nav: { company: "회사소개", chamber: "챔버", equip: "EMC 시험장비", cyber: "CyberShield", contact: "문의", cta: "견적 문의" },
    navSubs: {
      contact: { quote: "견적·기술 문의", catalog: "카탈로그 다운로드" },
    },
    a11y: {
      skip: "본문 바로가기",
      primaryNav: "주 메뉴",
      mobileNav: "모바일 메뉴",
      menuOpen: "메뉴 열기",
      menuClose: "메뉴 닫기",
    },
    heroTag: "EMC TEST SOLUTIONS · ENGINEERED IN GERMANY SINCE 1987",
    heroH1a: "EMC 시험의 모든 것,",
    heroH1b: "Frankonia",
    heroH1c: "가 함께합니다",
    heroP: "1987년 이래 전 세계 80여 개국에 EMC 무향 챔버와 시험 시스템을 공급해 왔습니다. 컨설팅과 설계부터 제작·구축·검증·사후지원까지, 하나의 팀이 프로젝트 전 과정을 책임집니다.",
    heroB1: "솔루션 보기",
    heroB2: "견적·기술 상담",
    stats: [["1987", "Frankonia 설립"], ["80+", "공급 국가"], ["35+", "챔버 라인업"], ["3", "핵심 솔루션 영역"]],
    solK: "OUR SOLUTIONS",
    solH: "챔버, 장비, 그리고 차폐",
    solP: "시험실을 이루는 세 가지를 한 회사가 설계하고 만듭니다. 챔버와 그 안에 들어가는 계측 장비가 같은 엔지니어링 팀에서 나오고, 같은 차폐 기술이 EMC 실험실 밖 데이터센터까지 이어집니다.",
    c1h: "챔버",
    c1sub: "Anechoic Chambers",
    c1p: "차폐룸과 사전 인증용 컴팩트 챔버부터 3·5·10m 반무향·완전무향 계열, 부품·구동계 챔버, 잔향실까지 — 개별 제품의 목록이 아니라 하나의 시스템입니다.",
    c1list: [
      "Frankosorb® 흡수체 — 35년 이상 무결함 가동",
      "용접·접착 없는 75mm 볼트 체결 — 개조·증설·이전 가능",
      "ECE R10 · CISPR 25 · ISO 11452 · MIL-STD-461",
    ],
    c2h: "EMC 시험장비",
    c2sub: "EMC Test Systems",
    c2p: "방출·내성 시험에 필요한 장비를 여섯 개 제품군으로 공급합니다 — 앰프, 안테나, 전계 센서, 프리앰프, 파워미터, 그리고 사진의 CIT-100처럼 시험 체인 전체를 한 케이스에 담은 완성 시스템.",
    c2list: [
      "EMI 리시버 9 kHz~6 GHz — CISPR 16-1-1 풀컴플라이언트",
      "안테나 9 kHz~40 GHz · RF 파워앰프 DC~18 GHz, 최대 12 kW",
      "IEC/EN 61000-4-6 · ISO 11452-4 · MIL-STD-461 CS114",
    ],
    c3sub: "전자파 보안·차폐",
    c3p: "EMC 실험실을 짓는 것과 같은 차폐 기술을 AI 데이터센터와 보안 시설의 경계에 적용합니다. 설계부터 통합, 설치 후 현장 측정까지 하나의 시스템으로 제공합니다.",
    c3list: [
      "무용접 볼트 체결 — 운영 중인 시설과 병행 시공",
      "손상 없이 해체해 증설·이전에 재사용",
      "설치 후 차폐 성능 현장 측정 — 추정이 아닌 증거",
    ],
    c3go: "CyberShield 자세히 보기",
    more: "자세히 보기",
    chH: "부품 하나에서 차량 한 대까지, 챔버 32종",
    chP: "어느 챔버가 필요한지는 두 값에서 정해집니다 — 규격이 요구하는 측정 거리, 그리고 피시험체가 들어가야 할 Quiet Zone의 크기. 1.0m 부품 챔버부터 ø6.0m Quiet Zone의 10m 차량 챔버까지, 산업군별과 챔버 형식별 양쪽으로 정리해 두었습니다.",
    chambers: [
      "부품이 차량에 실리기까지의 경로를 그대로 따라갑니다. 1.0m 거리의 ACTC와 초소형 UCC, 3·5m의 AVTC, 다이나모미터를 내장한 10m SAC-10V — ECE R10 · CISPR 25 · ISO 11452, 최대 18m 차량용 중하중 시험 구역까지.",
      "MIL-STD 461·DO-160 대응 3종. 차량과 대형 피시험체를 위한 MIL-STD Chamber, 상용·자동차 시험장 요구까지 겸하는 Advanced, 부품 단위의 컴팩트 MIL CHC — 30/80MHz~40GHz.",
      "네 산업군 중 가장 넓은 17종. 차폐룸 한 칸에서 ø6.0m Quiet Zone의 10m 반무향 챔버까지 — 3·5·10m SAC, 자유공간 FAC, 사전 인증용 CHC. CISPR 16-1-4·IEC 61000-4-3 전 규격 적합.",
      "구동계 부품과 하이브리드·전기·연료전지 시스템 전용 시험장. 고정축 외부 부하기 1대의 EDTC-SA, e-axle용 2대의 EDTC-AX, 4사분면 이동식 부하기를 챔버 안에 들이는 EDTC-BB — 최대 2 × 250kW, CISPR 25·ISO 11452 완전 적합.",
      "흡수체 없이 벽이 반사하고, 스터러가 전계를 통계적으로 균일하게 만듭니다. 증폭기 출력을 크게 올리지 않고도 높은 전계 강도를 얻습니다 — 부품용 S부터 대형 차량용 XXL, ISM·멀티미디어용 e1·e2까지 7종. IEC/EN 61000-4-21·ISO 11452-11, LUF 80MHz부터.",
      "라인업 전체가 출발하는 지점. 2.0mm 아연도금 강판 PAN 모듈을 메시 개스킷 위로 75mm 간격 볼트 체결해 어떤 크기로도 구현합니다 — EN 50147-1 기준 10kHz 90dB, 100~400MHz 120dB. 같은 패널이 Frankosorb® 흡수체의 바탕이므로 나중에 무향실로 바꿀 수 있습니다.",
    ],
    eqH: "EMC 시험장비",
    eqP: "여섯 개 제품군 99종. 방출 측정부터 전도·방사 내성, 자기장 시험까지 IEC 61000-4 · CISPR · ISO 11452 · MIL-STD-461 구성에 그대로 들어갑니다.",
    eq: [
      "10kHz~1GHz 고체소자 앰프 36종(최대 12kW)과 500MHz~40GHz 광대역 WBA 34종.",
      "광대역 ALX, 스택 로그페리오딕 MAX, 혼 HAX, 로드 SAX와 루프 LAX — 9kHz~40GHz.",
      "광파이버로 읽어 내는 전계강도계. 10kHz~26.5GHz, 0.14~1500 V/m.",
      "방출 측정용 광대역 프리앰프. 9kHz~40GHz, 이득 28~35dB, 잡음지수 2dB부터.",
      "RF 파워미터와 릴레이 스위칭 유닛. DC~12.4GHz, 18/40GHz까지 확장.",
      "시험 체인을 한 케이스에 담은 완성 시스템 — 전도 내성, 파워 신호, 자기장, GTEM.",
    ],
    csK: "CYBERSHIELD",
    csH: "여섯 개의 제품군, 누설 없는 하나의 차폐 경계",
    csP: "차폐 성능은 가장 약한 지점에서 결정됩니다. 벽체와 도어, 전원·신호 관통부, 환기 개구부를 하나의 차폐 외피로 함께 설계해 접합부에서 성능이 새지 않게 하고, 시공 후 현장에서 측정해 확인합니다.",
    cs: [
      "벽체·천장·바닥을 이루는 2.0 mm 아연도금 강판 PAN 모듈. 자립형 강구조에 75 mm 간격으로 볼트 체결해, 화기 작업 없이 운영 중인 시설과 병행 시공합니다.",
      "사람과 장비가 경계를 통과하는 지점의 슬라이딩·힌지식 RF 도어와 고차폐 윈도우. 전주형 3중 접점 구조로 20,000회 개폐까지 성능을 유지합니다.",
      "전원·신호·데이터 라인이 경계를 지나는 지점의 필터와 광케이블 도파관. 관통부를 그 벽체와 동일한 차폐 수준으로 맞추고, 매체 관통부는 DN200까지 지원합니다.",
      "환기와 액체냉각 배관이 지나는 개구부의 허니콤 도파관. 공기와 냉각수는 통과시키고 RF는 차단하며, 흡음 인레이 패널이 ISO 354 기준으로 소음까지 잡습니다.",
      "EN 50147-1 / IEEE 299에 따른 현장 차폐 성능 측정과 누설 탐지. 10 kHz에서 90 dB, 100–400 MHz에서 120 dB, 40 GHz까지 100 dB 이상을 보장합니다.",
      "예방 정비, 재교정, 주기적 재인증. 접착도 용접도 없어 손상 없이 해체할 수 있고, 증설·이전 후 다시 측정해 성능을 확인합니다.",
    ],
    csGo: "CyberShield 자세히 보기",
    trK: "WHY FRANKONIA",
    trH1: "직접 만들기에",
    trH2: "끝까지 책임집니다",
    trH3: "",
    trP1: "차폐 패널과 도어, Frankosorb® 흡수체, 그 안에 들어가는 시험 장비까지 — 모듈형 조립식 공법으로 만드는 부품과 제품의 약 95%를 Frankonia가 직접 설계하고 생산합니다. 외부에서 조달해 조립하는 방식이 아니므로 품질이 하나의 기준에서 관리되고, 사양 변경은 공급망이 아니라 도면에서 끝납니다.",
    trP2: "요구사항 정의와 사전 검토부터 엔지니어링, 생산, 설치, 인수 시험, 교정과 유지보수까지 한 팀이 담당합니다. 확인할 일이 생겼을 때 연락할 곳도 한 곳입니다.",
    trP3: "Frankosorb® 흡수체는 쾰른 대학, TU Braunschweig EMC 연구소와 함께 개발한 비연소성 박막 기술입니다. 1991년 1세대 이후 지금까지 무결함으로 가동되고 있습니다.",
    trGo: "회사 소개",
    trShotAlt: "독일 하이데크의 Frankonia 본사와 생산 시설 항공 전경. 붉은 테두리의 흰 건물 여러 동과 지붕을 덮은 태양광 패널, 뒤편으로 마을과 들판이 보인다",
    trShotCap: "독일 하이데크 본사. 1987년 이곳에서 시작해, 지금도 설계와 생산이 같은 부지에 있습니다.",
    badges: [["95%", "부품·제품 자체 설계·생산"], ["5", "글로벌 거점"], ["1991", "Frankosorb® 1세대 이후 무결함"], ["100%", "턴키 — 설계에서 인수 시험까지"]],
    ctH: "견적 및 기술 상담",
    ctP: "프로젝트 요구사항을 알려주시면 최적의 솔루션을 제안해 드립니다.",
    ctB1: "이메일 문의",
    ctB2: "전화 상담",
    ftDesc: "EMC 무향 챔버 · 시험 시스템 · 차폐 솔루션 — 1987년부터 전 세계 80여 개국",
    // 본사 주소. frankonia-solutions.com 연락처와 CyberShield 임프린트가 일치하는 값.
    ftAddr: "Frankonia Germany EMC Solutions GmbH · Industriestraße 16, 91180 Heideck, Germany · T +49 9177 98-500",
    ftCompany: "회사소개",
    ftSol: "솔루션",
    ftL1: "챔버",
    ftL2: "EMC 시험장비",
    ftLink: "링크",
    ftHq: "Frankonia Group",
    ftContact: "견적·기술 문의",
    ftImprint: "법적 고지",
    ftPriv: "개인정보처리방침",
  },
  en: {
    nav: { company: "Company", chamber: "Anechoic Chambers", equip: "EMC Test Systems", cyber: "CyberShield", contact: "Contact", cta: "Get a Quote" },
    navSubs: {
      contact: { quote: "Quote & Technical Support", catalog: "Catalog Downloads" },
    },
    a11y: {
      skip: "Skip to content",
      primaryNav: "Primary navigation",
      mobileNav: "Mobile navigation",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    heroTag: "EMC TEST SOLUTIONS · ENGINEERED IN GERMANY SINCE 1987",
    heroH1a: "Everything for EMC testing,",
    heroH1b: "Frankonia",
    heroH1c: " at your side",
    heroP: "Since 1987 we have supplied EMC anechoic chambers and test systems to more than 80 countries. One team carries the project from consulting and design through manufacturing, installation, verification and after-sales service.",
    heroB1: "Explore Solutions",
    heroB2: "Request a Quote",
    stats: [["1987", "Frankonia founded"], ["80+", "Countries supplied"], ["35+", "Chamber models"], ["3", "Core solution areas"]],
    solK: "OUR SOLUTIONS",
    solH: "The room, the instruments, and the shielding",
    solP: "One company designs and builds all three. The chamber and the measurement equipment that goes inside it come from the same engineering team, and the same shielding technology carries beyond the EMC laboratory to the data centre.",
    c1h: "Chambers",
    c1sub: "Anechoic Chambers",
    c1p: "From shielded rooms and compact pre-compliance chambers to the 3, 5 and 10 metre semi- and fully-anechoic families, component and e-drive chambers, and reverberation chambers — one system rather than a catalogue of separate products.",
    c1list: [
      "Frankosorb® absorber — 35+ years in service without a defect",
      "Bolted every 75 mm, never welded or glued — modify, extend, relocate",
      "ECE R10 · CISPR 25 · ISO 11452 · MIL-STD-461",
    ],
    c2h: "Test Systems",
    c2sub: "EMC Test Systems",
    c2p: "Six product families covering emission and immunity testing — amplifiers, antennas, field sensors, pre-amplifiers, power meters, and complete systems such as the CIT-100 pictured here, which carries a whole test chain in one case.",
    c2list: [
      "EMI receivers 9 kHz–6 GHz — fully CISPR 16-1-1 compliant",
      "Antennas 9 kHz–40 GHz · RF amplifiers DC–18 GHz, up to 12 kW",
      "IEC/EN 61000-4-6 · ISO 11452-4 · MIL-STD-461 CS114",
    ],
    c3sub: "Electromagnetic Security",
    c3p: "The same shielding technology that builds an EMC laboratory, applied to the boundary of AI data centres and secure facilities — engineered, integrated and measured on site as one system.",
    c3list: [
      "Bolted, no hot work — installed alongside live operations",
      "Dismantled without damage, reused when the room is extended or moved",
      "Shielding effectiveness measured on site after installation",
    ],
    c3go: "Explore CyberShield",
    more: "Learn more",
    chH: "Thirty-two chambers, from a single component to a whole vehicle",
    chP: "Which chamber you need comes down to two figures — the measurement distance the standard asks for, and the quiet zone the EUT has to sit in. From 1.0 m component chambers to a 10 m vehicle chamber with a ø6.0 m quiet zone, indexed by industry and by chamber form alike.",
    chambers: [
      "Follows a part from the bench into the vehicle: the ACTC at 1.0 m, the ultra-compact UCC, the AVTC at 3 and 5 m, and the SAC-10V with an integrated dynamometer at 10 m — ECE R10, CISPR 25 and ISO 11452, up to a heavy-load zone for 18 m vehicles.",
      "Three chambers to MIL-STD 461 and DO-160 — the MIL-STD Chamber for vehicles and large EUTs, the Advanced version that also meets commercial and automotive test site requirements, and the compact MIL CHC at component level. 30/80 MHz to 40 GHz.",
      "The widest of the four at seventeen chambers, from a single shielded room to a 10 m semi-anechoic with a ø6.0 m quiet zone — SAC at 3, 5 and 10 m, free-space FAC, pre-compliance CHC. Fully compliant to CISPR 16-1-4 and IEC/EN 61000-4-3.",
      "Dedicated test sites for drivetrain components and hybrid, electric and fuel-cell systems. EDTC-SA for one external load machine on a fixed shaft, EDTC-AX for two in an e-axle setup, EDTC-BB bringing a four-quadrant mobile load machine inside — up to 2 × 250 kW, fully compliant to CISPR 25 and ISO 11452.",
      "No absorbers: the walls reflect and a stirrer keeps changing the boundary conditions until the field is statistically uniform — high field strength without a large amplifier, and no argument about antenna alignment. Seven chambers, S to XXL and the e1 and e2, to IEC/EN 61000-4-21 and ISO 11452-11, from 80 MHz LUF.",
      "Where the whole line-up starts. 2.0 mm galvanized steel PAN modules bolted every 75 mm onto a mesh gasket, at any size the room has to be — 90 dB at 10 kHz and 120 dB at 100–400 MHz to EN 50147-1. The same panel carries Frankosorb® absorbers, so a shielded room can become an anechoic chamber later.",
    ],
    eqH: "EMC Test Systems",
    eqP: "Six product families, ninety-nine models — from emission measurement to conducted, radiated and magnetic field immunity, built into IEC 61000-4, CISPR, ISO 11452 and MIL-STD-461 setups.",
    eq: [
      "Thirty-six solid-state amplifiers from 10 kHz to 1 GHz, up to 12 kW, and thirty-four WBA wideband models to 40 GHz.",
      "The broadband ALX, the stacked log-periodic MAX, the HAX horns, the SAX rod and the LAX loop — 9 kHz to 40 GHz.",
      "Field strength read back over a fibre optic link. 10 kHz to 26.5 GHz, 0.14 to 1500 V/m.",
      "Broadband pre-amplifiers for emission measurement. 9 kHz to 40 GHz, 28 to 35 dB gain, noise figure from 2 dB.",
      "RF power meters and the relay switching unit. DC to 12.4 GHz, extendable to 18 or 40 GHz.",
      "A whole test chain in one case — conducted immunity, power signal, magnetic field, GTEM.",
    ],
    csK: "CYBERSHIELD",
    csH: "Six product lines, one zero-leak boundary",
    csP: "A shielded room is only as good as its weakest point. Walls, doors, cable penetrations and ventilation openings are engineered as one envelope, so nothing is lost at the joints — then measured on site to prove it.",
    cs: [
      "2.0 mm galvanized steel PAN modules for walls, ceilings and floors, bolted every 75 mm onto a self-supporting steel structure. No hot work, so the room goes up beside live operations.",
      "Sliding and hinged RF doors and high-attenuation windows where people and equipment cross the boundary. A circumferential triple contact system holds performance for 20,000 opening cycles.",
      "Power line filters, RF signal suppressors and fibre-optic waveguides where cabling crosses the wall — filtered to the same attenuation as the wall itself, up to DN200 media penetrations.",
      "Honeycomb waveguides at ventilation and liquid-cooling penetrations: air and coolant pass, RF does not. Acoustic inlay panels absorb to ISO 354, αw = 0.65.",
      "Shielding effectiveness measured on site to EN 50147-1 / IEEE 299, with leak detection and documentation — ≥ 90 dB at 10 kHz, ≥ 120 dB at 100–400 MHz, ≥ 100 dB to 40 GHz.",
      "Preventive maintenance, recalibration and periodic re-certification. Nothing is glued or welded, so the room can be dismantled, extended or relocated, then measured again.",
    ],
    csGo: "Explore CyberShield",
    trK: "WHY FRANKONIA",
    trH1: "We make it,",
    trH2: "so we stand behind it",
    trH3: "",
    trP1: "Shielding panels and doors, Frankosorb® absorbers, and the instruments that go inside the room — around 95% of the components and products in a Frankonia project are designed and built in-house, in modular prefabricated construction. Nothing is bought in and assembled here, so quality is held to a single standard and a change to the specification ends at the drawing rather than in the supply chain.",
    trP2: "One team carries the project from requirements and pre-study through engineering, production, installation, acceptance testing, calibration and maintenance. When there is something to answer for, there is one place to call.",
    trP3: "Frankosorb® is a non-combustible thin-film absorber developed with the University of Cologne and the EMC institute at TU Braunschweig. Since the first generation in 1991 it has run without a defect.",
    trGo: "About Frankonia",
    trShotAlt: "Aerial view of the Frankonia head office and production site in Heideck, Germany — white buildings with red trim, solar panels across the roofs, the village and open fields behind",
    trShotCap: "The head office in Heideck, Germany. The company started here in 1987, and design and production still share the site.",
    badges: [["95%", "Components and products built in-house"], ["5", "Sites worldwide"], ["1991", "First Frankosorb® generation — no defect since"], ["100%", "Turnkey — design through acceptance testing"]],
    ctH: "Quotation & Technical Consulting",
    ctP: "Tell us your project requirements and we will propose the optimal solution.",
    ctB1: "Email Us",
    ctB2: "Call Us",
    ftDesc: "EMC anechoic chambers, test systems and shielding solutions — more than 80 countries since 1987",
    ftAddr: "Frankonia Germany EMC Solutions GmbH · Industriestraße 16, 91180 Heideck, Germany · T +49 9177 98-500",
    ftCompany: "Company",
    ftSol: "Solutions",
    ftL1: "Chambers",
    ftL2: "EMC Test Systems",
    ftLink: "Links",
    ftHq: "Frankonia Group",
    ftContact: "Quote & Technical Support",
    ftImprint: "Imprint",
    ftPriv: "Privacy Policy",
  },
} as const;

/* The picture at the head of each solution card. These were three line icons
   on flat colour tiles — a drawn chamber, a drawn instrument, a drawn shield.
   The chamber and test-system rows further down this page had already made the
   opposite argument: a photograph of the thing is a stronger claim than a
   drawing of it. These three now follow.

   Each is the branch's own lead image, so the card and the page it opens show
   the same thing: the chambers overview's figure, the CIT-100 that heads the
   integrated-systems family, and the data-centre campus the CyberShield page
   opens its system section on. `kind` picks the fitting rule, as it does on the
   chamber cards — the two photographs fill the band, and the CIT-100 is a
   product render on white that has to be fitted whole. Cropping it to the
   band's ratio would cut through the front panel that is the only reason to
   show it.

   The third card carried the PAN panel wall until the CyberShield band below
   took the product page's six lines and their six photographs with it; that
   wall is the Structure card's picture now, and one photograph twice on one
   page reads as an oversight. The campus is the better card image anyway — the
   two beside it are both laboratory interiors, and this branch's argument is
   that the shielding leaves the laboratory. */
const solutionShots = [
  { src: "/chambers/images/overview-lineup.webp", w: 1600, h: 989, kind: "photo" },
  { src: "/test-systems/images/system-cit-100.webp", w: 1600, h: 609, kind: "render" },
  { src: "/cybershield/images/facility-aerial.webp", w: 1024, h: 1024, kind: "photo" },
] as const;

/* The six cards the site map fixes the order of, each pointing at the page that
   carries its models. Four are industries and two are chamber forms — that is
   the mix the site map asks for, and the chamber branch indexes both axes, so
   each card can reach its own list without flattening the two into one. The
   cards already lifted and turned their heading red on hover; they were simply
   not links, which is a promise a page should not make twice.

   The sixth slot was Others — special-purpose and custom chambers — and it had
   no page and no photograph, so the row ran five cards against a three-column
   grid and left a hole. Shielded Room takes it: it is the product the whole
   range is built on (every chamber on these pages is a shielded room with an
   absorber lining), it has a type page of its own, and the head office
   photographs it. Custom sizing is not lost with Others — it is what the
   shielded room's own copy says.

   `shot` is the card's picture. Every one is a photograph of a real chamber,
   taken from the 2026 catalogue and photobook — Automotive, Military and
   Commercial were cutaway renders until those arrived, and a drawing of a
   chamber is a weaker argument than the chamber. `kind` stays because the
   fitting rule differs: photographs fill the frame, renders would have to be
   fitted whole against white, and the site may take renders again for a model
   that has no photograph.

   `models` is model names and standards, which read the same in both locales —
   Commercial carried "SAC 시리즈 · FAC 시리즈" until now, and that Korean ran
   untranslated through the English page. */
const chamberCards = [
  { name: "Automotive", models: "ACTC · UCC · AVTC · SAC-10V", path: industryPath("automotive"),
    shot: { src: "/chambers/images/industry-automotive.webp", w: 900, h: 578, kind: "photo" } },
  { name: "Military", models: "MIL-STD Chamber · Advanced · MIL CHC", path: industryPath("military"),
    shot: { src: "/chambers/images/industry-military.webp", w: 744, h: 591, kind: "photo" } },
  { name: "Commercial", models: "SAC · FAC · CHC · CTC", path: industryPath("commercial"),
    shot: { src: "/chambers/images/industry-commercial.webp", w: 900, h: 636, kind: "photo" } },
  { name: "Powertrain", models: "EDTC-SA · EDTC-AX · EDTC-BB", path: industryPath("powertrain"),
    shot: { src: "/chambers/images/industry-powertrain-edtc.webp", w: 900, h: 600, kind: "photo" } },
  { name: "RVC", models: "RVC e1 · e2 · S · M · L · XL · XXL", path: typePath("rvc"),
    shot: { src: "/chambers/images/type-rvc-reverberation.webp", w: 900, h: 600, kind: "photo" } },
  { name: "Shielded Room", models: "PAN Module · EN 50147-1 / IEEE 299", path: typePath("shielded-room"),
    shot: { src: "/chambers/images/type-shielded-room-pan.webp", w: 1122, h: 591, kind: "photo" } },
] as const;

/* The row is now the branch's own six product families, in the order the
   dropdown and the overview list them. The three cards it replaces predated the
   branch and did not line up with it: the branch carries no EMI receiver at
   all, so "ERX-6 · ERC-6" named two models this site has no page for, and
   "Accessories" was one tile standing in for four families. Every card here
   reaches the family page that holds its models, and the model line names
   models that page actually prints.

   `shot` is the card's picture, in place of the line icons the row used to
   carry. Five come from the branch's own asset ledger — the same photographs
   that head those family pages, so the card and the page it opens show the
   same instrument. Amplifiers had no picture anywhere on the site (the head
   office publishes that family as a matrix of band against model name and
   nothing else), so the rack shot was cut from p.18 of the 2019 Amplifier
   Selection Book; see the asset ledger.

   `kind` picks the fitting rule, as on the chamber cards. Everything except
   the amplifier rack is a product cut-out on white with its own margins, and
   cropping one to 3:2 would take the horn off an antenna or the connector off
   a probe — those are fitted whole. The rack is a photograph and fills its
   band. */
const equipCards = [
  { name: "RF Power Amplifiers", models: "FLL · VLL · VLC · FLH · WBA", path: testProductPath("amplifier"),
    shot: { src: "/test-systems/images/amplifier-rack.webp", w: 900, h: 600, kind: "photo" } },
  /* The HAX horn rather than the ALX that heads the antenna page: the ALX is
     thin silver rod against a transparent ground and all but disappears at
     card size, while the horn holds its shape. */
  { name: "Antennas", models: "ALX · MAX · HAX · SAX-10 · LAX-10", path: testProductPath("antenna"),
    shot: { src: "/test-systems/images/antenna-hax-18.webp", w: 1200, h: 900, kind: "plate" } },
  { name: "Field Strength Meters", models: "EFS-10 · 100 · 300 · 500 · Laser", path: testProductPath("efs"),
    shot: { src: "/test-systems/images/efs-probe.webp", w: 360, h: 595, kind: "plate" } },
  { name: "Pre-Amplifiers", models: "FPA-2 · 6A · 6B · 18 · 26 · 40", path: testProductPath("preamp"),
    shot: { src: "/test-systems/images/preamp-fpa.webp", w: 1200, h: 920, kind: "plate" } },
  { name: "Meters & Switching", models: "PMS 1084 · 1084 B · RSU", path: testProductPath("meter"),
    shot: { src: "/test-systems/images/meter-rsu.webp", w: 1600, h: 669, kind: "plate" } },
  { name: "Integrated Systems", models: "CIT-100 · PSG-300 · MTS-800 · GTEM", path: testProductPath("system"),
    shot: { src: "/test-systems/images/system-mts-800.webp", w: 1400, h: 782, kind: "plate" } },
] as const;

/* CyberShield gets its own band below the test-system line-up: it is a
   shielding solution, not measurement equipment, so it does not belong in the
   EMC Test Systems grid. The band closes with the link into /cybershield,
   where the full page lives.

   The cards are the product page's own six lines — Structure, Access,
   Connectivity, Air & Waveguides, Validation, Lifecycle — rather than the four
   this band used to name (panels, doors, filters, waveguides). Those four were
   a re-cut of the same catalogue that dropped the two the rest of the site
   leans on hardest: the measurement that turns the shielding claim into
   evidence, and the fact that a bolted room can be taken apart and moved. A
   visitor who follows the link now meets the same six headings in the same
   order instead of having to re-map four onto six.

   `shot` is each line's own photograph from the CyberShield ecosystem grid, so
   the card and the section it opens show the same thing — the argument the
   chamber and solution cards above already make, that a photograph of the
   thing beats a drawing of it. All six are photographs, so unlike the chamber
   row none needs the `kind` split or the icon fallback. `models` stays in
   figures and standards, which read the same in both locales. */
const cyberCards = [
  { name: "Structure", models: "2.0 mm DX 52 D+Z · 75 mm bolt pitch", shot: "structure" },
  { name: "Access", models: "Sliding · Hinged · RF Window", shot: "access" },
  { name: "Connectivity", models: "Power · Signal · Data · DN200", shot: "connectivity" },
  { name: "Air & Waveguides", models: "Honeycomb · ISO 354 αw 0.65", shot: "air" },
  { name: "Validation", models: "EN 50147-1 · IEEE 299", shot: "validation" },
  { name: "Lifecycle", models: "Maintenance · Re-certification", shot: "lifecycle" },
] as const;

/** Strings the contact band needs, wherever it is reused. */
export type BandCopy = { ctH: string; ctP: string; ctB1: string; ctB2: string; heroB1: string };

/** The chrome slice of the copy object, shared with every other page, so the
 *  header, footer and contact band read the same strings as the landing. */
export const headerCopy = (lang: Lang): HeaderCopy & FooterCopy & BandCopy =>
  copy[lang];

/** The hero backdrop, in the order it plays.
 *
 *  The first frame is the one the band has always opened on and stays the LCP
 *  image — it loads at high priority and is what a visitor sees at t=0. The
 *  three behind it are already in the repository (they carry the chamber
 *  pages) and were picked so each is a different room at a different
 *  exposure: an empty chamber, a powertrain rig under test, a domed SAC, a
 *  fully anechoic room. The cut between them then reads as a change of scene
 *  rather than a change of crop.
 *
 *  Subject placement decided the shortlist as much as subject did. The scrim
 *  is opaque ink to 42% of the band and only clears past 78%, so a frame is
 *  only worth adding if what it shows sits right of centre. The automotive
 *  shot from `/chambers/industry/automotive` is the better photograph and was
 *  cut for exactly this: its car lands at 40% of the frame, under the ink. */
const heroSlides = [
  { src: "/chambers/images/hero-anechoic-chamber.webp", w: 2000, h: 1415 },
  { src: "/chambers/images/ind-powertrain-edtc.webp", w: 1600, h: 1095 },
  { src: "/chambers/images/type-sac-dome.webp", w: 1600, h: 1095 },
  { src: "/chambers/images/type-fac-freespace.webp", w: 1600, h: 1095 },
];

export default function Landing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const cs = localeRoute(lang, "/cybershield");
  return (
    <>
      {/* Standards below are the ones the chamber and equipment cards name
          further down this page — the markup restates them, it does not add
          claims. */}
      <StructuredData
        lang={lang}
        page="landing"
        description={t.heroP}
        productLines={[
          {
            id: "anechoic-chambers",
            name: "Frankonia Anechoic Chambers",
            description: t.c1p,
            standards: [
              "ECE R10", "CISPR 25", "ISO 11452", "MIL-STD-461", "DO-160",
              "CISPR 16-1-4", "IEC/EN 61000-4-3", "IEC/EN 61000-4-21", "EN 50147-1",
            ],
          },
          {
            id: "emc-test-systems",
            name: "Frankonia EMC Test Systems",
            description: t.c2p,
            standards: ["CISPR 16-1-1", "IEC/EN 61000-4-6", "ISO 11452-4", "MIL-STD-461"],
          },
        ]}
      />
      <SiteHeader lang={lang} t={t} />

      <main id="main">
      <div className="hero" id="top">
        {/* The chambers behind the headline. Decorative — the h1 says what the
            company does and these say what that looks like; naming them in alt
            would only put a caption in front of the sentence they illustrate.
            <img> rather than CSS backgrounds so the first frame is in the HTML
            the browser parses first: it is the largest thing on the page and
            wants to start downloading before the stylesheet resolves. The
            other three are marked low so they queue behind it rather than
            competing with it for the same connection.

            The wrapper is what keeps the scrim on top. The slides carry
            z-index to order the cross-dissolve (see `.hero-media` in
            globals.css); without a stacking context of their own they would
            also climb over `.hero::after`, and the headline would lose the
            contrast that overlay exists to guarantee. */}
        <div className="hero-media">
          {heroSlides.map((slide, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={slide.src}
              className="hero-shot"
              src={asset(slide.src)}
              alt=""
              width={slide.w}
              height={slide.h}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
            />
          ))}
        </div>
        <div className="wrap hero-in">
          <span className="tag">{t.heroTag}</span>
          <h1>
            {t.heroH1a}
            <br />
            <em>{t.heroH1b}</em>
            {t.heroH1c}
          </h1>
          <p>{t.heroP}</p>
          <div className="btns">
            <a className="btn btn-red" href="#solutions">{t.heroB1}</a>
            <a className="btn btn-ghost" href="#contact">{t.heroB2}</a>
          </div>
        </div>
        <div className="wrap hero-stats">
          {t.stats.map(([num, label]) => (
            <div className="st" key={label}>
              <b>{num}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="solutions">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.solK}</span>
            <h2>{t.solH}</h2>
            <p>{t.solP}</p>
          </div>
          <div className="sol-grid">
            <div className="sol">
              {/* Decorative, on the same reasoning as the chamber cards' band:
                  the h3 under it names the category, and a screen reader
                  reading a description of the chamber before the word "챔버"
                  puts a caption in front of the sentence it illustrates. The
                  pictures are described where they carry their own page. */}
              <div className={`thumb thumb--${solutionShots[0].kind}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(solutionShots[0].src)} alt="" width={solutionShots[0].w} height={solutionShots[0].h} loading="lazy" decoding="async" />
              </div>
              <div className="body">
                <h3>{t.c1h} <span className="sub-label">{t.c1sub}</span></h3>
                <p>{t.c1p}</p>
                <ul>{t.c1list.map((li) => <li key={li}>{li}</li>)}</ul>
                {/* The trailing glyph is its own element so it can lean out of
                    the link on hover, as it does on the reference page. */}
                {/* The branch overview, not this page's own summary band. The
                    band below is a preview of the branch; "read more" should
                    leave the landing page, not scroll it. */}
                {/* `go--card` stretches this link's hit area over the whole
                    card (see globals.css). The card was already promising a
                    click — it lifts and turns its heading red on hover — but
                    only these two words took one. The label names the
                    destination because the link is now the card: "자세히 보기"
                    on its own tells a screen-reader user nothing about which
                    of the three cards they are on. */}
                <a className="go go--card" href={localeRoute(lang, chambersPath)} aria-label={`${t.c1h} — ${t.more}`}>{t.more}<span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="sol">
              <div className={`thumb thumb--${solutionShots[1].kind}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(solutionShots[1].src)} alt="" width={solutionShots[1].w} height={solutionShots[1].h} loading="lazy" decoding="async" />
              </div>
              <div className="body">
                <h3>{t.c2h} <span className="sub-label">{t.c2sub}</span></h3>
                <p>{t.c2p}</p>
                <ul>{t.c2list.map((li) => <li key={li}>{li}</li>)}</ul>
                <a className="go go--card" href={localeRoute(lang, testSystemsPath)} aria-label={`${t.c2h} — ${t.more}`}>{t.more}<span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="sol" id="cybershield">
              <div className={`thumb thumb--${solutionShots[2].kind}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(solutionShots[2].src)} alt="" width={solutionShots[2].w} height={solutionShots[2].h} loading="lazy" decoding="async" />
              </div>
              <div className="body">
                <h3>CyberShield <span className="sub-label">{t.c3sub}</span></h3>
                <p>{t.c3p}</p>
                <ul>{t.c3list.map((li) => <li key={li}>{li}</li>)}</ul>
                {/* This one already names its destination, so it needs no
                    label of its own. */}
                <a className="go go--card" href={cs}>{t.c3go}<span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt" id="chambers">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">CHAMBERS</span>
            <h2>{t.chH}</h2>
            <p>{t.chP}</p>
          </div>
          <div className="line-grid three">
            {chamberCards.map((c, i) => (
              <a className="lc" key={c.name} href={localeRoute(lang, c.path)}>
                <div className={`lc-shot lc-shot--${c.shot.kind}`}>
                  {/* Decorative: the heading beside it already names the
                      category, and a screen reader repeating "cutaway of an
                      automotive chamber" under the word Automotive is noise.
                      The pictures are described in the asset ledger. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(c.shot.src)} alt="" width={c.shot.w} height={c.shot.h} loading="lazy" decoding="async" />
                </div>
                <h4>{c.name}</h4>
                <p>{t.chambers[i]}</p>
                <div className="models">{c.models}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">TEST SYSTEMS</span>
            <h2>{t.eqH}</h2>
            <p>{t.eqP}</p>
          </div>
          <div className="line-grid three">
            {equipCards.map((c, i) => (
              <a className="lc" key={c.name} href={localeRoute(lang, c.path)}>
                {/* Decorative, as on the chamber row above: the h4 under the
                    band names the family, and a screen reader reading "a horn
                    antenna on a mounting tube" before the word Antennas puts a
                    caption in front of the sentence it illustrates. The
                    instruments are described where they carry their own page,
                    and in the asset ledger. */}
                <div className={`lc-shot lc-shot--${c.shot.kind}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(c.shot.src)} alt="" width={c.shot.w} height={c.shot.h} loading="lazy" decoding="async" />
                </div>
                <h4>{c.name}</h4>
                <p>{t.eq[i]}</p>
                <div className="models">{c.models}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="cybershield-solutions">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.csK}</span>
            <h2>{t.csH}</h2>
            <p>{t.csP}</p>
          </div>
          {/* Three across, so six cards make two full rows — four across would
              leave the last two stranded in a half-empty one. */}
          <div className="line-grid three">
            {cyberCards.map((c, i) => (
              /* Every card lifted and turned its heading red on hover while
                 being a plain <div>, which is a promise this page should not
                 make twice; they are links now, like the chamber cards.

                 To /cybershield, not to its `#ecosystem` grid, tempting as the
                 deeper target is. A cold load of that page at a fragment past
                 the first screen lands on blank canvas — `#audience` near the
                 top arrives correctly, `#solution` and `#ecosystem` do not —
                 and the six headings are the first thing the page shows on the
                 way down anyway. */
              <a className="lc" key={c.name} href={cs}>
                <div className="lc-shot lc-shot--photo">
                  {/* Decorative, as on the chamber cards: the heading beside it
                      names the line, and the product page describes the same
                      photograph for a screen reader. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(`/cybershield/images/ecosystem/${c.shot}.webp`)} alt="" width={1000} height={667} loading="lazy" decoding="async" />
                </div>
                <h4>{c.name}</h4>
                <p>{t.cs[i]}</p>
                <div className="models">{c.models}</div>
              </a>
            ))}
          </div>
          <a className="go sec-go" href={cs}>{t.csGo}<span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section id="why">
        <div className="wrap">
          <div className="trust">
            <div>
              <span className="kicker">{t.trK}</span>
              <h2>
                {t.trH1}
                <br />
                <em>{t.trH2}</em>
                {t.trH3}
              </h2>
              <p>{t.trP1}</p>
              <p>{t.trP2}</p>
              <p>{t.trP3}</p>
              {/* The band makes a claim about the company and then left the
                  reader with nowhere to check it. Philosophy is where the
                  Company section opens. */}
              <a className="go" href={localeRoute(lang, sectionPath("philosophy"))}>
                {t.trGo}<span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="badges">
              {t.badges.map(([b, s]) => (
                <div className="bd" key={s}>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
          {/* The band claims the work is done in one place and then showed no
              place. The head office aerial from the 2026 catalogue (print p.3)
              is that place — 1513×553, so it sits across the full frame under
              the two columns rather than inside either of them. Unlike the
              decorative card pictures further up, this one carries the claim,
              so it is described for a screen reader and captioned. */}
          <figure className="figure trust-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/company/images/hq-aerial.webp")} alt={t.trShotAlt} width={1513} height={553} loading="lazy" decoding="async" />
            <figcaption>{t.trShotCap}</figcaption>
          </figure>
        </div>
      </section>

      <div className="band" id="contact">
        <h2>{t.ctH}</h2>
        <p>{t.ctP}</p>
        <div className="btns">
          <a className="btn btn-red" href={`mailto:${contactEmail}`}>{t.ctB1}</a>
          <a className="btn btn-ghost" href={contactPhoneHref}>{t.ctB2}</a>
        </div>
      </div>
      </main>

      <SiteFooter lang={lang} t={t} />
    </>
  );
}
