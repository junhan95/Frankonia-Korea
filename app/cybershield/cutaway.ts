import type { Lang } from "./site-config";

/**
 * Interactive hotspots over the CyberShield cutaway render.
 *
 * Coordinates are percentages of the image and were taken from the leader-line
 * endpoints in the source artwork (Frankonia-CyberShield-Content.pdf), so each
 * point sits exactly where the original callout pointed.
 */
export type GroupId = "structure" | "penetration" | "services" | "power";

export type Hotspot = {
  id: string;
  group: GroupId;
  x: number;
  y: number;
  title: Record<Lang, string>;
  detail: Record<Lang, string>;
};

export const hotspots: Hotspot[] = [
  {
    id: "pan", group: "structure", x: 48.5, y: 23.06,
    title: {
      en: "Modular prefabricated PAN construction",
      de: "Modulare, vorgefertigte PAN-Konstruktion",
      ko: "모듈형 사전제작 PAN 구조",
    },
    detail: {
      en: "2.0 mm galvanised steel panels bolted every 75 mm, above 100 dB from 10 kHz to 40 GHz.",
      de: "2,0 mm verzinkte Stahlpaneele, alle 75 mm verschraubt, über 100 dB von 10 kHz bis 40 GHz.",
      ko: "2.0 mm 아연도금 강판을 75 mm 간격으로 체결. 10 kHz~40 GHz에서 100 dB 이상.",
    },
  },
  {
    id: "fixation", group: "structure", x: 23.91, y: 35.23,
    title: {
      en: "Isolated wall and ceiling fixation",
      de: "Entkoppelte Wand- und Deckenbefestigung",
      ko: "절연 벽체·천장 고정",
    },
    detail: {
      en: "Decoupled from the parent structure — or built self-supporting where the building cannot carry it.",
      de: "Vom Baukörper entkoppelt – oder selbsttragend ausgeführt, wo das Gebäude die Last nicht trägt.",
      ko: "기존 구조체와 분리해 고정하며, 건물이 하중을 감당하지 못하면 자립 구조로 시공합니다.",
    },
  },
  {
    id: "gfrp", group: "structure", x: 35.91, y: 77.61,
    title: {
      en: "GFRP isolation grid",
      de: "GFK-Isolationsgitter",
      ko: "GFRP 절연 그리드",
    },
    detail: {
      en: "Glass-fibre grid isolating the floor build-up from the shielding envelope.",
      de: "Glasfasergitter, das den Bodenaufbau von der Schirmhülle trennt.",
      ko: "유리섬유 그리드로 바닥 구조와 차폐 외피를 절연합니다.",
    },
  },
  {
    id: "raised-floor", group: "structure", x: 40.07, y: 67.96,
    title: {
      en: "Modular raised floor to 5 t",
      de: "Modularer Doppelboden bis 5 t",
      ko: "모듈형 이중바닥 (5톤)",
    },
    detail: {
      en: "Optional fire class A1-s1 d0 per EN 13986.",
      de: "Optional Brandklasse A1-s1 d0 nach EN 13986.",
      ko: "EN 13986 기준 A1-s1 d0 난연 등급 선택 가능.",
    },
  },
  {
    id: "acoustic", group: "structure", x: 69.19, y: 48.13,
    title: {
      en: "Integrated acoustic panels",
      de: "Integrierte Akustikpaneele",
      ko: "흡음 패널 일체화",
    },
    detail: {
      en: "F.DJ-T panels to ISO 354, αw = 0.65 (MH).",
      de: "F.DJ-T-Paneele nach ISO 354, αw = 0,65 (MH).",
      ko: "F.DJ-T 패널, ISO 354 기준 αw = 0.65 (MH).",
    },
  },
  {
    id: "room-in-room", group: "structure", x: 67.05, y: 23.06,
    title: {
      en: "Fire prevention, room-in-room",
      de: "Brandschutz im Raum-in-Raum-Aufbau",
      ko: "룸인룸 소방 통합",
    },
    detail: {
      en: "Suppression designed into the room-in-room build rather than added around it.",
      de: "Löschtechnik ist Teil des Raum-in-Raum-Aufbaus, nicht nachträglich ergänzt.",
      ko: "소화 설비를 룸인룸 구조 안에 처음부터 통합해 설계합니다.",
    },
  },
  {
    id: "sluice", group: "penetration", x: 43.3, y: 20.02,
    title: {
      en: "Sluice system with HF doors",
      de: "Schleusensystem mit HF-Türen",
      ko: "HF 도어 슬루스 시스템",
    },
    detail: {
      en: "Access lock with master control, above 100 dB from 10 kHz to 40 GHz, CE compliant.",
      de: "Zutrittsschleuse mit Master-Steuerung, über 100 dB von 10 kHz bis 40 GHz, CE-konform.",
      ko: "마스터 제어가 포함된 출입 에어록. 10 kHz~40 GHz에서 100 dB 이상, CE 적합.",
    },
  },
  {
    id: "honeycomb", group: "penetration", x: 16.64, y: 41.63,
    title: {
      en: "Ventilation honeycombs",
      de: "Wabenkamine für die Lüftung",
      ko: "허니콤 환기 인터페이스",
    },
    detail: {
      en: "Waveguide-below-cutoff vents that pass air while holding above 100 dB up to 40 GHz.",
      de: "Hohlleiter unterhalb der Grenzfrequenz: Luft strömt durch, die Dämpfung bleibt über 100 dB bis 40 GHz.",
      ko: "차단 주파수 이하 도파관 구조로 공기는 통과시키고, 40 GHz까지 100 dB 이상 차폐를 유지합니다.",
    },
  },
  {
    id: "hatches", group: "penetration", x: 18.25, y: 63.36,
    title: {
      en: "Custom access hatches",
      de: "Individuelle Zugangsluken",
      ko: "맞춤형 점검 해치",
    },
    detail: {
      en: "For structure-borne sound sensors and other specialist access.",
      de: "Für Körperschallsensoren und andere Sonderzugänge.",
      ko: "고체 전달음 센서 등 특수 목적 접근을 위한 개구부입니다.",
    },
  },
  {
    id: "media-interfaces", group: "penetration", x: 25.8, y: 81.78,
    title: {
      en: "Shielded media interfaces to DN200",
      de: "Geschirmte Medien-Schnittstellen bis DN200",
      ko: "DN200까지 차폐 배관 인터페이스",
    },
    detail: {
      en: "Pipework and media crossings up to DN200 with no loss of attenuation.",
      de: "Rohr- und Medienübergänge bis DN200 ohne Dämpfungsverlust.",
      ko: "DN200 규격까지 배관·매체 관통부에서 차폐 성능 손실이 없습니다.",
    },
  },
  {
    id: "emp-ducting", group: "penetration", x: 71.27, y: 57.03,
    title: {
      en: "EMP ducting between rooms",
      de: "EMP-Durchführungen zwischen Räumen",
      ko: "실간 EMP 도파관",
    },
    detail: {
      en: "Shielded transitions where two protected rooms have to connect.",
      de: "Geschirmte Übergänge, wo zwei geschützte Räume verbunden werden müssen.",
      ko: "두 보호 구역을 연결해야 하는 지점의 차폐 통과 구조입니다.",
    },
  },
  {
    id: "fire-feeds", group: "penetration", x: 40.9, y: 30.47,
    title: {
      en: "Fire-prevention water and gas feeds",
      de: "Wasser- und Gaszuführung für den Brandschutz",
      ko: "소방용 급수·가스 배관",
    },
    detail: {
      en: "Sprinkler and suppression media enter through shielded penetrations.",
      de: "Sprinkler- und Löschmedien treten über geschirmte Durchführungen ein.",
      ko: "스프링클러와 소화 약제가 차폐 관통부를 통해 유입됩니다.",
    },
  },
  {
    id: "ac-ducting", group: "penetration", x: 28.69, y: 29.61,
    title: {
      en: "AC fluid feeds and ducting",
      de: "Kältemittelzuführung und Luftkanäle",
      ko: "공조 배관·덕트",
    },
    detail: {
      en: "Cooling media and air routed across the boundary without breaking it.",
      de: "Kühlmedien und Luft queren die Schirmgrenze, ohne sie zu unterbrechen.",
      ko: "냉각 매체와 공기가 차폐 경계를 훼손하지 않고 통과하도록 설계합니다.",
    },
  },
  {
    id: "access-control", group: "services", x: 35.65, y: 31.64,
    title: {
      en: "Access control and signalling",
      de: "Zutrittskontrolle und Meldetechnik",
      ko: "출입통제·신호 전송",
    },
    detail: {
      en: "Door status, interlocks and alarms carried across the shield on filtered lines.",
      de: "Türstatus, Verriegelung und Alarme laufen über gefilterte Leitungen durch die Schirmung.",
      ko: "도어 상태, 인터록, 경보 신호를 필터를 거친 회선으로 차폐를 통과시킵니다.",
    },
  },
  {
    id: "led", group: "services", x: 42.79, y: 52.61,
    title: {
      en: "Emission-free LED lighting",
      de: "Emissionsfreie LED-Beleuchtung",
      ko: "무방사 LED 조명",
    },
    detail: {
      en: "Room and emergency lighting that does not radiate into the protected volume.",
      de: "Raum- und Notbeleuchtung, die nicht in das geschützte Volumen abstrahlt.",
      ko: "보호 구역 내부로 방사하지 않는 실내·비상 조명입니다.",
    },
  },
  {
    id: "electrical", group: "services", x: 67.52, y: 42.43,
    title: {
      en: "Internal electrical installation",
      de: "Innenliegende Elektroinstallation",
      ko: "내부 전기 설비",
    },
    detail: {
      en: "Power, data and fibre optics installed inside the shielded envelope.",
      de: "Strom, Daten und Lichtwellenleiter werden innerhalb der Schirmhülle verlegt.",
      ko: "전원·데이터·광케이블을 차폐 외피 안쪽에 설치합니다.",
    },
  },
  {
    id: "ducts", group: "services", x: 31.81, y: 77.61,
    title: {
      en: "Integrated cable and media ducts",
      de: "Integrierte Kabel- und Medienkanäle",
      ko: "케이블·매체 덕트 일체화",
    },
    detail: {
      en: "Routing designed into the boundary instead of cut through it later.",
      de: "Trassen sind Teil der Grenze, statt später hindurchgeschnitten zu werden.",
      ko: "경로를 경계 설계에 포함시켜, 나중에 뚫지 않습니다.",
    },
  },
  {
    id: "motors", group: "services", x: 80.29, y: 44.08,
    title: {
      en: "EMP-hardened motor units",
      de: "EMP-gehärtete Motoreinheiten",
      ko: "EMP 내성 구동부",
    },
    detail: {
      en: "A/C, pumps and extractors hardened so they can sit outside the shielded volume.",
      de: "Klima, Pumpen und Absaugung gehärtet, damit sie außerhalb des geschirmten Volumens stehen können.",
      ko: "공조·펌프·배기 장비를 내성 강화해 차폐 구역 밖에 배치할 수 있습니다.",
    },
  },
  {
    id: "power-room", group: "power", x: 76.46, y: 27.19,
    title: {
      en: "Self-sustaining power room",
      de: "Autarker Stromversorgungsraum",
      ko: "자립형 전력실",
    },
    detail: {
      en: "Gas exhaust, diesel feeds and active ventilation, each crossing the shield on its own terms.",
      de: "Abgasführung, Dieselzuleitung und aktive Belüftung, jeweils eigens geschirmt geführt.",
      ko: "배기, 디젤 연료 공급, 강제 환기를 각각 차폐 방식에 맞춰 관통시킵니다.",
    },
  },
  {
    id: "filters", group: "power", x: 21.84, y: 71.69,
    title: {
      en: "AC/DC power, EMP and HEMP filters",
      de: "AC/DC-Netz-, EMP- und NEMP-Filter",
      ko: "AC/DC 전원·EMP·HEMP 필터",
    },
    detail: {
      en: "Every conductor entering the room is filtered to the same level the wall achieves.",
      de: "Jeder eintretende Leiter wird auf das Niveau gefiltert, das auch die Wand erreicht.",
      ko: "실내로 들어가는 모든 도체를 벽체와 동일한 수준으로 필터링합니다.",
    },
  },
  {
    id: "earthing", group: "power", x: 24.18, y: 79.24,
    title: {
      en: "Advanced earthing",
      de: "Erdungskonzept",
      ko: "정밀 접지 설계",
    },
    detail: {
      en: "Single-point earthing designed together with the shield, not bolted on afterwards.",
      de: "Zentrale Erdung, gemeinsam mit der Schirmung geplant statt nachträglich angesetzt.",
      ko: "차폐 구조와 함께 설계하는 단일점 접지. 사후에 덧붙이지 않습니다.",
    },
  },
];

export const groups: {
  id: GroupId;
  label: Record<Lang, string>;
}[] = [
  {
    id: "structure",
    label: { en: "Structure", de: "Konstruktion", ko: "구조" },
  },
  {
    id: "penetration",
    label: { en: "Penetrations", de: "Durchführungen", ko: "관통부" },
  },
  {
    id: "services",
    label: { en: "Building services", de: "Gebäudetechnik", ko: "설비" },
  },
  {
    id: "power",
    label: { en: "Power and earthing", de: "Strom und Erdung", ko: "전력·접지" },
  },
];
