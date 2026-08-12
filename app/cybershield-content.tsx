import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import { CheckList } from "./page-parts";
import { contactPath } from "./contact-sections";
import { pageDescription } from "./site-metadata";
import { asset, cyberShieldUrl, localeRoute, type Lang } from "./site-config";

/* CyberShield, summarised.
 *
 * The head office asks this site for a short CyberShield page that hands the
 * reader over to the product site — www.frankonia-cybershield.com — rather
 * than for the product page itself. This route used to carry a full port of
 * that page (app/cybershield/, ~3,200 lines and its own stylesheet), which
 * kept a second copy of copy the product team owns and edits: every figure,
 * standard and price-shaped claim on it went stale the moment the product site
 * moved. The port is gone; what stays is a summary written in this site's own
 * bands, and a link out of every band that makes a claim the full site backs
 * up.
 *
 * The copy below is condensed from that product page rather than written
 * fresh, so the two read as one voice — the six product lines keep their
 * headings and their order, the attenuation figures and the standards list are
 * quoted as the product site states them, and nothing here says more than the
 * page it summarises. Which band condenses which section, and the figures that
 * have to be checked against the product site when it changes, are in
 * docs/source/cybershield.md — read the ledger before editing any copy here.
 *
 * The band order is the product site's argument, not a shorter list of its
 * topics (2026-08-12, head office: 원본 페이지의 이야기 흐름을 따른다). That
 * page is built as five acts, and the acts only work in sequence:
 *
 *   1  belief    — the practice we reject: shielding that is welded, fixed and
 *                  permanent. This spends the industry's own symbol of trust,
 *                  and has to be paid back in act 5.
 *   2  why       — the gap, stated in the reader's own terms (`0 dB` against a
 *      threat       signal that never enters the network), then the four routes
 *                   the exposure actually arrives by.
 *   3  audit     — one question the reader usually cannot answer: what is your
 *                  shielding effectiveness today, in decibels?
 *   4  answer    — the short answer first, then the room, then what is in it.
 *      system
 *   5  verify    — the measurement that replaces the permanence act 1 removed.
 *
 * Ecosystem and applications follow, because they are what a reader who has
 * been persuaded reads next; the hand-over band closes. Moving `verify` behind
 * `ecosystem` would leave a reader working through component detail while
 * still wondering whether bolts hold as well as welds, which is the objection
 * act 1 opened — the order is load-bearing, so keep it.
 *
 * Every outbound link goes through `cyberShieldUrl`, which carries the reader's
 * locale — the product site serves English from its root and Korean from /ko/.
 *
 * They open in a new tab (2026-08-11, head office). The earlier renewal brief
 * asked for the opposite ("새 창에서 열리는 것이 아닌 현재 창에서"), which was
 * written when this route was the product page itself and leaving it meant
 * leaving nothing behind; now the reader has a summary worth coming back to, so
 * the summary stays open. `rel="noopener"` and no `noreferrer`, as on the
 * footer's head-office link and the two on the legal pages: the referrer is how
 * the product site sees that this page sends it traffic.
 * tests/rendered-html.test.mjs holds both halves.
 */

const copy = {
  ko: {
    eyebrow: "CYBERSHIELD",
    title: "AI 데이터센터를 보호하고, 신호를 경계 안에 가두십시오.",
    intro:
      "차폐실은 언제나 건물에서 고정된 부분이었습니다. CyberShield는 다릅니다. 시설에 맞춰 구성되고, 운영 중에 조립되며, 현장 측정으로 성능이 입증되는 전자기 보안 경계입니다.",

    openSite: "CyberShield 사이트 열기",
    talk: "상담 문의",

    beliefKicker: "차폐를 바라보는 우리의 관점",
    beliefTitle: "지금까지는 건물이 차폐실에 맞춰야 했습니다.",
    beliefLabels: ["기존의 방식", "우리의 관점"],
    beliefStatusQuo:
      "차폐실이 존재해온 내내, 시설이 차폐에 맞춰야 했습니다. 기존 차폐는 용접으로 고정되고, 설계 단계에서 확정되며, 완공된 날부터 바뀌지 않습니다. 건물은 그 방을 중심으로 계획되고, 공사는 그 방 때문에 멈춥니다. 그리고 랙 구성이 바뀌거나 전력 밀도가 올라가거나 시설이 한계에 이르렀을 때, 그 방은 따라가지 못합니다. 가장 빠르게 변하는 인프라 안에서 보호 설비만 가장 움직이지 않는 부분으로 남습니다.",
    beliefBelief:
      "우리는 반대여야 한다고 생각합니다. 시설이 방에 맞추는 것이 아니라, 방이 시설에 맞춰야 합니다. 그래서 CyberShield는 표준 출입문을 통과하는 사전 제작 강판 모듈로 만들어집니다. 내부에서 조립하고, 기존 벽에 가깝게 세우며, 볼트로 체결합니다. 용접도 접착도, 되돌릴 수 없는 작업도 없습니다. 확장하고, 다시 구성하고, 다른 현장으로 통째로 옮긴 뒤 다시 측정할 수 있습니다. 성능은 그대로 두고, 영구 고정만 걷어냈습니다.",

    audienceKicker: "CYBERSHIELD가 지키는 현장",
    audienceTitle: "차폐 경계가 반드시 유지되어야 하는 세 가지 환경.",
    audience: [
      ["하이퍼스케일 클라우드 · AI 데이터센터", "AI 연산 클러스터, 양자 하드웨어, 핵심 가용 영역을 RF 조작과 고출력 전자기 위협으로부터 차폐합니다."],
      ["코로케이션 · 엔터프라이즈 데이터센터", "엄격한 거버넌스 요건을 가진 기업 고객에게 인증된 차폐 구역을 측정 가능한 프리미엄 보안 등급으로 제공합니다."],
      ["국방 · 정부 · 금융기관", "소버린 클라우드, 지휘통제 센터, 고빈도 거래 플랫폼처럼 기밀성을 가정에 맡길 수 없는 환경을 지원합니다."],
    ],

    whyKicker: "소프트웨어를 넘어선 보안",
    whyTitle: "AI 데이터센터의 보안은 이제 소프트웨어에서 끝나지 않습니다.",
    whyBody:
      "방화벽과 암호화, 제로 트러스트는 네트워크를 통해 들어오는 위협을 막습니다. 그러나 AI 데이터센터가 품는 자산의 가치가 커지면서, 네트워크를 거치지 않고 물리 공간과 전자기 결합으로 접근하는 경로까지 검토 대상이 되었습니다. 이제 소프트웨어 보안과 물리적 보안은 함께 설계되어야 합니다.",
    whyMetric: "0 dB",
    whyMetricLabel: "네트워크를 거치지 않는 신호에 대해 방화벽과 암호화, 제로 트러스트가 제공하는 감쇠량.",
    assets: [
      ["국가적 전략자산", "AI 컴퓨팅 역량은 이미 국가 경쟁력의 기반으로 다뤄집니다. 모델 가중치와 학습 데이터, 소버린 워크로드는 기업 자산인 동시에 국가적 보호 대상이며, 바로 그 점이 표적이 되는 이유이기도 합니다."],
      ["EMC·EMP에 취약한 구조", "고밀도 GPU 랙은 수십 킬로와트를 스위칭 전자장비로 공급받고, 400G·800G 인터커넥트는 밀리볼트 단위의 잡음 여유로 동작합니다. 전력 밀도가 올라갈수록 방사는 강해지고 내성 여유는 줄어듭니다. 일반 전산실 기준으로 설계된 보호로는 이 조건을 감당하지 못합니다."],
      ["외부 전파 방호", "데이터센터는 대개 산업 지역과 송신 시설, 교통 인프라 인근에 세워집니다. 주변 전파 환경은 통제할 수 없고 갈수록 혼잡해집니다. 의도적 전자기 간섭 장비는 상용 부품으로도 구성할 수 있어, IEC 61000-4-36이 별도의 시험 규격으로 존재합니다."],
    ],

    threatKicker: "노출이 도달하는 경로",
    threatTitle: "같은 자산에 이르는 네 갈래 경로. 어느 것도 방화벽을 지나지 않습니다.",
    threatBody:
      "모두 물리 공간이나 전자기 결합을 통해 연산 하드웨어에 도달합니다. 그리고 모두 시설 경계에서 차단됩니다.",
    impactLabel: "잠재 영향",
    threats: [
      ["전자기 정보 방사", "네트워크에 접촉하지 않고도 비의도적 전자기 신호를 통해 민감한 처리 활동이 노출될 수 있습니다.", "기밀성 노출"],
      ["의도적 전자기 간섭", "국소 고출력 RF 또는 전자기 에너지는 전자장비, 제어 및 통신을 교란할 수 있습니다.", "서비스 중단"],
      ["EMP / HEMP 노출", "방사 및 전도성 펄스 영향은 중요 시스템과 업무 연속성 체계를 위협할 수 있습니다. E1 펄스는 2.5 ns 만에 상승합니다 — 낙뢰 기준 서지 보호기가 반응하기 전입니다.", "업무 연속성 위험"],
      ["경계 구성요소 취약점", "도어, 환기, 전원, 데이터, 냉각 및 설비 관통부가 차폐 경계의 가장 약한 경로가 될 수 있습니다.", "보호 성능 저하"],
    ],

    auditTitle: "지금 이 시설의 차폐 성능은 몇 dB입니까?",
    auditBody:
      "그 답이 측정값이 아니라 사양서 수치라면, 그 숫자는 검증된 것이 아닙니다. 차폐 경계의 성능은 가장 취약한 관통부가 결정하고, 취약한 관통부는 문제가 드러나는 날까지 보이지 않습니다.",
    auditLink: "CyberShield의 측정 방식 보기",

    answerKicker: "짧은 답",
    answerTitle: "설계부터 시공, 측정까지 하나의 책임으로 묶인 단일 경계.",
    answerBody:
      "차폐 구조와 도어, 필터, 환기 도파관, 모든 관통부를 하나의 연속된 경계로 설계하고, 운영을 멈추지 않는 무용접 방식으로 시공한 뒤, EN 50147-1 / IEEE 299에 따라 현장에서 측정해 문서로 인도합니다. 마지막에 남는 것은 약속이 아니라 측정값입니다.",
    metrics: [
      ["현장 측정 검증", "설치 후 차폐 성능을 현장에서 측정합니다 — 추정이 아닌 증거"],
      ["무용접 모듈 조립", "화기 작업 없는 볼트 체결 — 운영 중인 시설과 병행 시공"],
      ["확장·이전 가능", "손상 없이 해체해 확장·변경·이전에 재사용"],
    ],

    systemKicker: "모듈형 PAN 차폐 시스템",
    systemTitle: "시설의 실제 조건에 맞춰 설계하는 보안 공간.",
    systemBody:
      "사전 제작된 PAN 모듈은 표준 건물 출입문으로 반입할 수 있고 내부에서 조립되며 기존 벽에 근접 설치할 수 있습니다. 접착제와 용접 없이 확장과 이전이 가능합니다.",
    features: [
      ["01", "정밀 조립", "패널을 75 mm 간격으로 규정 토크로 체결하고, 전도성 메시 개스킷으로 접합부를 밀봉합니다."],
      ["02", "건축 통합", "평탄한 내부 마감면을 확보하고, 이중바닥·랙·소방·조명·냉각·출입통제를 함께 설계에 반영합니다."],
      ["03", "확장 가능한 구조", "손상 없이 해체해 확장, 변경 또는 전체 이전에 재사용할 수 있습니다."],
      ["04", "완전한 보호 경계", "차폐 구조, 도어, 필터, 허니콤 및 도파관을 하나의 시스템으로 구성합니다."],
    ],
    cutawayAlt: "구조, 도어, 필터, 덕트, 전력실을 포함한 CyberShield 차폐 데이터홀 단면도",
    cutawayCaption:
      "차폐 경계를 이루는 21가지 솔루션. CyberShield 사이트에서 항목을 선택하면 각각의 역할과 필요성을 확인할 수 있습니다.",

    verifyKicker: "추정이 아닌 검증",
    verifyTitle: "약속이 아니라 측정으로 증명합니다.",
    verifyBody: [
      "모든 CyberShield 프로젝트는 측정된 증거로 완료됩니다. 차폐 성능은 국제 표준에 따라 설치 후 현장에서 시험하고, 문서화된 인수 결과를 공간과 함께 인도합니다.",
      "업계 기준을 선도하는 PAN 타입 모듈 시스템의 성능을 10 kHz에서 40 GHz까지 검증하며, 경계를 구성하는 모든 도어와 필터, 허니콤 환기구, 관통부에 동일한 차폐 성능을 설계 반영합니다.",
    ],
    attenuation: [
      ["≥ 90 dB", "10 kHz 자계"],
      ["≥ 120 dB", "100–400 MHz 최대 성능"],
      ["≥ 100 dB", "40 GHz까지 전 대역"],
      ["EN 50147-1", "인도 시점 현장 측정"],
    ],
    standardsTitle: "적용 표준",
    standards: [
      ["EN 50147-1", "차폐효과 측정 표준"],
      ["IEEE 299", "프로젝트 옵션으로 제공"],
      ["BSI TL-03305 / 03306", "도청 방지실 및 IT 차폐실 규격"],
      ["NATO SDIP-27 Level A", "TEMPEST 설계·승인, NSA 94-106 정합"],
      ["MIL-STD-188-125-1 / -2", "HEMP·IEMI 방호, 프로젝트별 검증"],
      ["ISO/IEC 27001", "물리적·환경적 보안 통제 항목 지원"],
    ],
    attenuationNote:
      "표준 PAN 타입 시스템의 보증 성능 범위입니다. 프로젝트에 적용되는 범위는 사양서와 현장 인수 시험을 통해 확정됩니다.",

    ecoKicker: "하나의 연속된 차폐 경계",
    ecoTitle: "여섯 개의 제품군, 누설 없는 하나의 차폐 경계.",
    ecoBody:
      "모든 구성요소를 동일한 차폐 외피의 일부로 설계합니다. 접합부, 도어, 관통부에서 성능이 손실되지 않습니다.",
    eco: [
      "벽체·천장·바닥을 구성하는 2.0 mm 아연도금 강판 PAN 모듈 시스템.",
      "고하중 슬라이딩·힌지 RF 도어, 고차폐 RF 윈도우 및 출입 모니터링 연동.",
      "고성능 전원 라인 필터, 광케이블 도파관 관통부 및 RF 신호 억제 장치.",
      "허니콤 환기 패널, 흡음 패널(ISO 354), 액체냉각·설비용 차폐 도파관.",
      "EN 50147-1 / IEEE 299 차폐 성능 측정, 누설 탐지, SE 시험 및 규격 문서화.",
      "예방 정비, 재교정 및 주기적 재인증 서비스.",
    ],
    ecoGo: "CyberShield 사이트에서 제품군 전체 보기",

    appKicker: "차폐실 구성 방식",
    appTitle: "하나의 플랫폼, 네 가지 미션 프로파일.",
    applications: [
      ["Sovereign Compute Vault", "정부·소버린 클라우드", "기밀 또는 국가 중요 워크로드를 위한 통제된 처리 구역을 구축합니다."],
      ["AI & HPC Shielded Zone", "AI 연구소·하이퍼스케일", "고가치 모델, 학습 데이터 및 가속 컴퓨팅 인프라를 보호합니다."],
      ["Colocation Shielded Vault", "코로케이션 사업자", "규제 산업 고객을 위한 측정 가능한 프리미엄 보안 등급을 제공합니다."],
      ["Mission Continuity Suite", "국방·금융·통신", "전자기 교란 위험에 노출된 중요 업무의 연속성 아키텍처를 지원합니다."],
    ],

    fullKicker: "CYBERSHIELD 전용 사이트",
    fullTitle: "이 페이지는 요약본입니다. 전체 내용은 전용 사이트에서 이어집니다.",
    fullBody:
      "CyberShield는 별도의 제품 사이트를 두고 있습니다. 아래 링크는 새 탭에서, 현재 보고 계신 언어로 열립니다. 이 요약 페이지는 그대로 남습니다.",
    fullList: [
      "차폐실 단면도 — 경계를 이루는 21가지 솔루션을 항목별로 설명",
      "10 kHz–40 GHz 측정 차폐 성능 곡선과 인용한 근거 자료",
      "일반적인 차폐 방식과의 항목별 비교",
      "초기 상담부터 검증 인도까지 6단계 도입 절차",
      "공급 범위 구분, 프로젝트 사례, 자주 묻는 질문",
      "동일한 담당자에게 전달되는 프로젝트 문의 양식",
    ],
  },
  en: {
    eyebrow: "CYBERSHIELD",
    title: "Protect the AI data centre. Contain the signal.",
    intro:
      "Shielded rooms have always been the fixed part of a building. CyberShield is not — a measurable electromagnetic boundary that adapts to your facility, assembles alongside live operations and is proven by measurement on site.",

    openSite: "Open the CyberShield site",
    talk: "Talk to a specialist",

    beliefKicker: "HOW WE THINK ABOUT SHIELDING",
    beliefTitle: "For decades, the building has had to serve the shield.",
    beliefLabels: ["The status quo", "What we believe"],
    beliefStatusQuo:
      "For as long as shielded rooms have existed, the facility has had to accommodate the shield. Conventional shielding is welded into place, fixed at design stage and permanent from the day it is finished. The building is planned around it. Construction stops for it. And when racks change, power density rises or the site outgrows itself, the room cannot follow. Protection ends up being the least flexible part of the fastest-moving infrastructure there is.",
    beliefBelief:
      "We believe it should be the other way around: the room adapts to the facility, not the facility to the room. So we build ours from prefabricated steel modules that pass through a standard building door, assemble from the inside, sit close to existing walls and bolt together — no welding, no glue, nothing irreversible. The room can be extended, reconfigured or relocated entirely, then measured again. Full protection, none of the permanence.",

    audienceKicker: "WHO CYBERSHIELD IS BUILT FOR",
    audienceTitle: "Three environments where the boundary has to hold.",
    audience: [
      ["Hyperscale cloud & AI centres", "Core AI compute clusters, quantum hardware and critical availability zones, shielded against RF tampering and high-power electromagnetic threats."],
      ["Colocation & enterprise data centres", "A certified shielded vault offered as a premium, measurable security tier for enterprise customers under strict governance requirements."],
      ["Defence, government & financial institutions", "Sovereign cloud deployments, command centres and high-frequency trading platforms where confidentiality cannot be left to assumption."],
    ],

    whyKicker: "SECURITY BEYOND SOFTWARE",
    whyTitle: "AI data centre security no longer ends at the software layer.",
    whyBody:
      "Firewalls, encryption and zero trust stop what arrives over the network. As the value held inside an AI data centre grows, the paths that never touch the network — through physical space and through electromagnetic coupling — have become a real part of the assessment. Software security and physical security now have to be designed together.",
    whyMetric: "0 dB",
    whyMetricLabel: "The attenuation firewalls, encryption and zero trust provide against a signal that never enters the network.",
    assets: [
      ["A national strategic asset", "AI compute is already treated as national capability. Model weights, training data and sovereign workloads are corporate property and a matter of state interest at once — which is exactly what makes them worth targeting."],
      ["EMC and EMP exposed by design", "Dense GPU racks take tens of kilowatts through switching electronics, and 400G/800G interconnects work to noise budgets measured in millivolts. As power density rises, emission goes up and immunity headroom comes down. Protection sized for a conventional server room does not cover this."],
      ["Protection from what is outside", "Data centres sit near industry, transmitters and transport infrastructure. The ambient RF environment is not yours to control and only gets busier. Intentional interference can be assembled from commercially available parts — which is why IEC 61000-4-36 exists as a test standard in its own right."],
    ],

    threatKicker: "HOW THE EXPOSURE ARRIVES",
    threatTitle: "Four routes to the same asset — none of them across a firewall.",
    threatBody:
      "Each one reaches processing hardware through physical space or through electromagnetic coupling. Each one is closed at the facility boundary.",
    impactLabel: "Potential impact",
    threats: [
      ["Compromising emanations", "Sensitive processing activity can be exposed through unintended electromagnetic signals — without touching the network.", "Confidentiality exposed"],
      ["Intentional interference", "Localized high-power RF or electromagnetic energy can disrupt electronics, controls and communications.", "Service interruption"],
      ["EMP / HEMP exposure", "Radiated and conducted pulse effects can challenge critical systems and continuity architectures. The E1 pulse rises in 2.5 ns — before surge protection rated for lightning has reacted.", "Mission continuity risk"],
      ["Boundary vulnerabilities", "Doors, ventilation, power, data, cooling and utility penetrations can become the weakest path through the shield.", "Protection degraded"],
    ],

    auditTitle: "What is the shielding effectiveness of your facility — today, in decibels?",
    auditBody:
      "If the answer is a specification rather than a measurement, the number is unverified. A boundary is only as good as its weakest penetration, and a weak penetration stays invisible until the day it matters.",
    auditLink: "See how CyberShield rooms are measured",

    answerKicker: "THE SHORT ANSWER",
    answerTitle: "One boundary — designed, built and measured under a single responsibility.",
    answerBody:
      "Shielding structure, doors, filters, ventilation waveguides and every penetration are engineered as one continuous boundary, assembled weld-free alongside live operations, then measured on site to EN 50147-1 / IEEE 299 and handed over as documented evidence. What you keep at the end is a measurement, not an assurance.",
    metrics: [
      ["Verified on site", "Shielding performance is measured after installation — not assumed"],
      ["Weld-free assembly", "Bolted modules installed alongside live operations, no hot work"],
      ["Built to change", "Dismount, expand or relocate the room without damage"],
    ],

    systemKicker: "MODULAR PAN SHIELDING SYSTEM",
    systemTitle: "A secure room engineered around the reality of your facility.",
    systemBody:
      "Prefabricated PAN modules pass through standard building doors, assemble from the inside and can be installed close to existing walls. No glue. No welding. No irreversible commitment.",
    features: [
      ["01", "Precision assembly", "Panels are bolted every 75 mm with predefined torque and conductive mesh gaskets."],
      ["02", "Architectural integration", "Flat interior surfaces for finishing, designed around raised floors, fire systems, lighting, cooling and access control."],
      ["03", "Adaptable by design", "Dismountable without damage for expansion, modification or complete relocation."],
      ["04", "Complete boundary", "Shielding structure, doors, filters, honeycombs and waveguides are treated as one system."],
    ],
    cutawayAlt: "Cutaway view of a CyberShield shielded data hall with its structure, doors, filters, ducts and power room",
    cutawayCaption:
      "Twenty-one engineered solutions make up the shielding boundary. Pick any one on the CyberShield site to see what it does and why it is there.",

    verifyKicker: "VERIFIED, NOT ASSUMED",
    verifyTitle: "Performance you don't have to take on faith.",
    verifyBody: [
      "Every CyberShield project ends with measured evidence. Shielding effectiveness is tested on site according to international standards, and documented acceptance results are handed over with the room.",
      "The standard-setting PAN type module system is verified from 10 kHz to 40 GHz, and the same attenuation is engineered into every door, filter, honeycomb vent and feed-through in the boundary.",
    ],
    attenuation: [
      ["≥ 90 dB", "Magnetic field at 10 kHz"],
      ["≥ 120 dB", "Peak, 100–400 MHz"],
      ["≥ 100 dB", "Held to 40 GHz"],
      ["EN 50147-1", "Measured on site at handover"],
    ],
    standardsTitle: "Measured and validated against",
    standards: [
      ["EN 50147-1", "Shielding effectiveness measurement"],
      ["IEEE 299", "Available as a project option"],
      ["BSI TL-03305 / 03306", "Eavesdropping-protected rooms & IT enclosures"],
      ["NATO SDIP-27 Level A", "TEMPEST design & approval, aligned with NSA 94-106"],
      ["MIL-STD-188-125-1 / -2", "HEMP and IEMI protection, project-specific validation"],
      ["ISO/IEC 27001", "Supports the physical and environmental security controls"],
    ],
    attenuationNote:
      "Values describe the guaranteed performance envelope of the standard PAN type system. The scope that applies to your project is confirmed in the specification and by on-site acceptance testing.",

    ecoKicker: "ONE CONTINUOUS BARRIER",
    ecoTitle: "Six product lines. One zero-leak boundary.",
    ecoBody:
      "Every component is engineered as part of the same shielding envelope, so performance is not lost at the joints, the doors or the penetrations.",
    eco: [
      "Prefabricated 2.0 mm galvanized steel PAN module system for walls, ceilings and floors.",
      "Heavy-duty sliding and hinged RF doors, high-attenuation RF windows and integrated access monitoring.",
      "High-performance power line filters, fibre-optic waveguide penetrations and RF signal suppressors.",
      "Honeycomb ventilation panels, acoustic panels (ISO 354) and shielded waveguides for liquid cooling and utilities.",
      "EN 50147-1 / IEEE 299 shielding measurement, leak detection, SE testing and compliance documentation.",
      "Preventive maintenance, recalibration and periodic re-certification services.",
    ],
    ecoGo: "See every product line on the CyberShield site",

    appKicker: "HOW THE ROOM IS CONFIGURED",
    appTitle: "One platform. Four mission profiles.",
    applications: [
      ["Sovereign Compute Vault", "Government & sovereign cloud", "Create a controlled processing zone for classified or nationally sensitive workloads."],
      ["AI & HPC Shielded Zone", "AI labs & hyperscale operators", "Protect high-value models, training data and accelerated compute infrastructure."],
      ["Colocation Shielded Vault", "Colocation providers", "Offer a measurable premium security tier for regulated enterprise customers."],
      ["Mission Continuity Suite", "Defense, finance & communications", "Support continuity architectures exposed to electromagnetic disruption risks."],
    ],

    fullKicker: "THE COMPLETE CYBERSHIELD SITE",
    fullTitle: "This page is a summary. The full account continues on the product site.",
    fullBody:
      "CyberShield keeps a site of its own. The link below opens in a new tab, in the language you are reading now — this summary stays where it is.",
    fullList: [
      "The room in cutaway — twenty-one engineered solutions, each explained where it sits",
      "The measured attenuation curve from 10 kHz to 40 GHz, with the publications behind it",
      "How CyberShield compares with conventional shielding, criterion by criterion",
      "The six steps from first consultation to verified handover",
      "Scope of supply, project scenarios and the questions every project starts with",
      "A project enquiry form addressed to the same specialists",
    ],
  },
} as const;

/**
 * The six product lines, in the order the product site introduces them.
 *
 * `spec` is the same figure-and-standard line the landing page's CyberShield
 * band carries, so a reader meets the identical six headings and figures on the
 * way in; it reads the same in both locales and stays out of the copy table.
 * `shot` names the photograph the product site uses for that line.
 */
const lines = [
  { name: "Structure", spec: "2.0 mm DX 52 D+Z · 75 mm bolt pitch", shot: "structure" },
  { name: "Access", spec: "Sliding · Hinged · RF Window", shot: "access" },
  { name: "Connectivity", spec: "Power · Signal · Data · DN200", shot: "connectivity" },
  { name: "Air & Waveguides", spec: "Honeycomb · ISO 354 αw 0.65", shot: "air" },
  { name: "Validation", spec: "EN 50147-1 · IEEE 299", shot: "validation" },
  { name: "Lifecycle", spec: "Maintenance · Re-certification", shot: "lifecycle" },
] as const;

/** What every link to the product site carries, so all five sites of it agree.
 *  Spread rather than repeated: a card row that opened in this window while the
 *  button above it opened a tab would be the kind of inconsistency nobody
 *  notices in review. */
const outbound = { target: "_blank", rel: "noopener" } as const;

/** The band the audit question sends the reader to, and the only in-page anchor
 *  on this route. Act 3 asks for a number; this is where the page answers with
 *  one, and a question with no way to the answer is just a rhetorical jab. */
const verifyAnchor = "verify";

export default function CyberShieldPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  /* One value, read in five places below: the locale-aware product site URL. */
  const site = cyberShieldUrl(lang);

  return (
    <>
      <StructuredData lang={lang} page="cybershield" description={pageDescription(lang, "cybershield")} />

      <PageShell lang={lang} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        {/* The way out to the product site, above everything a reader would
            have to scroll past to find it.
            The product site's four-credential proof strip used to sit under
            these buttons; taken out on 2026-08-12 (head office). The credits
            are on the company pages and in the footer, and four boxes between
            the head and the argument delayed act 1 without adding to it.
            Buttons only now, so the band takes a shorter top padding than the
            120px every argument band below it keeps — otherwise two buttons
            sit in 196px of air under the head. */}
        <section style={{ paddingTop: "56px" }}>
          <div className="wrap">
            <div className="btns">
              <a className="btn btn-red" href={site} {...outbound}>
                {t.openSite}<span aria-hidden="true">↗</span>
              </a>
              <a className="btn btn-outline" href={localeRoute(lang, contactPath)}>
                {t.talk}<span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Act 1. The layout is the argument: the practice we reject on the
            left under a grey rule, what we build instead on the right under a
            primary one. Nothing here explains that it is a reversal — it is
            read rather than announced. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.beliefKicker}</span>
              <h2>{t.beliefTitle}</h2>
            </div>
            <div className="belief">
              <div>
                <h3>{t.beliefLabels[0]}</h3>
                <p>{t.beliefStatusQuo}</p>
              </div>
              <div>
                <h3>{t.beliefLabels[1]}</h3>
                <p>{t.beliefBelief}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Self-identification, between the reversal and the gap: a reader who
            has not placed themselves in one of these three reads the next two
            bands as somebody else's problem. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.audienceKicker}</span>
              <h2>{t.audienceTitle}</h2>
            </div>
            <div className="line-grid three">
              {t.audience.map(([name, body], i) => (
                <div className="num-col" key={name}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Act 2, first half — the gap, stated in the reader's own terms. The
            `0 dB` badge is the spine of the whole page: it opens in the same
            unit the verify band closes in, so the reader works out the size of
            the gap themselves and the page never has to call it large. */}
        <section className="alt">
          <div className="wrap trust">
            <div>
              <span className="kicker">{t.whyKicker}</span>
              <h2>{t.whyTitle}</h2>
              <p>{t.whyBody}</p>
            </div>
            <div className="badges badges-one">
              <div className="bd">
                <b>{t.whyMetric}</b>
                <span>{t.whyMetricLabel}</span>
              </div>
            </div>
          </div>
          <div className="wrap" style={{ marginTop: "72px" }}>
            <div className="line-grid three">
              {t.assets.map(([name, body], i) => (
                <div className="num-col" key={name}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Act 2, second half — the four routes. The red index slot carries the
            impact rather than a number: which of four exposures a card
            describes is the useful thing to read there, and the cards have no
            order. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.threatKicker}</span>
              <h2>{t.threatTitle}</h2>
              <p>{t.threatBody}</p>
            </div>
            <div className="line-grid">
              {t.threats.map(([name, body, impact]) => (
                <div className="num-col" key={name}>
                  <span className="num">{t.impactLabel} · {impact}</span>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Act 3 — one question, and then the page gets out of the way. No
            kicker and no card grid: the empty band is the point, and the only
            thing on it besides the question is the way to the answer. */}
        <section className="alt">
          <div className="wrap">
            <div className="statement">
              <p>{t.auditTitle}</p>
            </div>
            <div className="prose" style={{ marginTop: "34px" }}>
              <p>{t.auditBody}</p>
            </div>
            <a className="go sec-go" href={`#${verifyAnchor}`}>
              {t.auditLink}<span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Act 4 — the answer, once and short, before anything expands on it.
            Its last sentence takes the question above head-on, so the two bands
            have to stay adjacent. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.answerKicker}</span>
              <h2>{t.answerTitle}</h2>
              <p>{t.answerBody}</p>
            </div>
            <div className="badges badges-wide">
              {t.metrics.map(([b, s]) => (
                <div className="bd" key={b}>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is built. The cutaway is the product site's own render; the
            interactive version of it is one of the reasons to follow the link,
            so the caption says where it lives rather than leaving a picture
            that looks clickable and is not. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.systemKicker}</span>
              <h2>{t.systemTitle}</h2>
              <p>{t.systemBody}</p>
            </div>
            <div className="line-grid">
              {t.features.map(([no, name, body]) => (
                <div className="num-col" key={no}>
                  <span className="num">{no}</span>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <figure className="figure figure-wide" style={{ maxWidth: 1000 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/cybershield/images/cutaway.webp")}
                alt={t.cutawayAlt}
                width={1800}
                height={1009}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{t.cutawayCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* Act 5 — the measurement, and the standards it is taken against.
            This is what act 1 promised to pay back, so it comes before the
            component detail below: a reader still wondering whether bolts hold
            as well as welds reads six product lines as six places to doubt. */}
        <section id={verifyAnchor}>
          <div className="wrap trust">
            <div>
              <span className="kicker">{t.verifyKicker}</span>
              <h2>{t.verifyTitle}</h2>
              {t.verifyBody.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="badges badges-compact">
              {t.attenuation.map(([b, s]) => (
                <div className="bd" key={b}>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: "72px" }}>
            <h3 className="sub-head"><b>{t.standardsTitle}</b></h3>
            <div className="hairline-list">
              {/* `--name`: these are document designations with slashes and
                  hyphens in them, far longer than the short labels the row's
                  nowrap default is written for. */}
              {t.standards.map(([name, note]) => (
                <div className="hl-row hl-row--name" key={name}>
                  <b>{name}</b>
                  <span className="hl-desc">{note}</span>
                </div>
              ))}
            </div>
            <p className="cs-note">{t.attenuationNote}</p>
          </div>
        </section>

        {/* The six lines. Cards, and links — the landing page's CyberShield
            band is built the same way and lands here; these carry on to the
            product site, where each line has its own section. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.ecoKicker}</span>
              <h2>{t.ecoTitle}</h2>
              <p>{t.ecoBody}</p>
            </div>
            <div className="line-grid three">
              {lines.map((line, i) => (
                <a className="lc" key={line.name} href={site} {...outbound}>
                  <div className="lc-shot lc-shot--photo">
                    {/* Decorative, as on the landing's card rows: the heading
                        beside it names the line, and the product site
                        describes the same photograph for a screen reader. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(`/cybershield/images/ecosystem/${line.shot}.webp`)}
                      alt=""
                      width={1000}
                      height={667}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4>{line.name}</h4>
                  <p>{t.eco[i]}</p>
                  <div className="models">{line.spec}</div>
                </a>
              ))}
            </div>
            <a className="go sec-go" href={site} {...outbound}>
              {t.ecoGo}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* How the same platform is configured for four kinds of project. */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.appKicker}</span>
              <h2>{t.appTitle}</h2>
            </div>
            <div className="hairline-list">
              {t.applications.map(([name, segment, body], i) => (
                <div className="hl-row hl-row--name" key={name}>
                  <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                  <b>{name}</b>
                  <span className="hl-desc">{segment} — {body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The hand-over. A summary that does not say what it left out asks the
            reader to guess whether following the link is worth it. */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.fullKicker}</span>
              <h2>{t.fullTitle}</h2>
              <p>{t.fullBody}</p>
            </div>
            <CheckList items={t.fullList} />
            <div className="btns" style={{ marginTop: "44px" }}>
              <a className="btn btn-red" href={site} {...outbound}>
                {t.openSite}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
