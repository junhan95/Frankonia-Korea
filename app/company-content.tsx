import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import { sectionMeta, type CompanySection } from "./company-sections";
import { asset, contactEmail, headOfficeUrl, jobsEmail, type Lang } from "./site-config";

/* Every section here is carried over from the head office site section by
   section: the English is its own wording, the Korean a translation of it.
   The original text and the asset provenance are recorded per page in
   docs/source/company-*.md — read the ledger before editing any copy below.

   Nothing is invented to fill a gap. Where the head office publishes no data
   — the events calendar is empty today — the page says so through
   `EmptyState`, and the list fills in without a layout change. */
const copy = {
  ko: {
    philosophy: {
      eyebrow: "PHILOSOPHY",
      title: "전 세계를 무대로, 미래에도 유효한 솔루션",
      intro:
        "Frankonia는 자동차 및 산업 분야의 전자파 적합성(EMC) 시험을 위한 무향 챔버와 시험 시스템 분야에서 고도로 전문화된 기술 기업으로 인정받고 있습니다.",
      approachKicker: "COMPLETE SOLUTIONS",
      approachTitle: "프로젝트의 모든 단계에 전문성을",
      approachBody: [
        "전문성과 유연성, 품질, 그리고 높은 기술 수준을 바탕으로 전 세계를 무대로 미래에도 유효한 솔루션을 만듭니다.",
        "EMC 시험 설비 구축에 있어 Frankonia는 완결형 솔루션의 우선 공급자입니다. 오늘의 규격은 물론 앞으로의 규격까지 충족하는 맞춤 솔루션을 고객과 함께 기획하고 조율하며 정의합니다. EMC 랩을 전체로서 해결한다는 방침에 따라 프로젝트의 모든 단계에서 탁월한 전문성을 제공합니다.",
        "Frankonia의 프로젝트 사업은 자체 프로젝트 관리와 엔지니어링·생산, 선도적인 연구, 그리고 자체 설치·서비스 팀으로 완성됩니다. 그래서 높은 수준의 기술과 품질을 보증할 수 있습니다.",
      ],
      figureAlt: "Frankonia 마크가 각인된 Frankosorb® 피라미드형 흡수체 근접 사진",
      figureCaption: "Frankosorb® — 자체 엔지니어링과 생산으로 만드는 흡수체 기술.",
      commitKicker: "OUR COMMITMENT",
      commitTitle: "모든 것을 한 곳에서",
      standsFor: {
        head: ["Frankonia가 ", "추구하는 것"],
        items: [
          "맞춤 설계 무향 챔버",
          "개별 설계 EMC 시험 시스템",
          "최고 수준의 품질",
          "최신 기술",
          "신뢰성",
          "독자적인 흡수체",
          "미래 대응 솔루션",
        ],
      },
      provides: {
        head: ["Frankonia가 ", "제공하는 것"],
        items: [
          "무향 챔버와 시험 시스템",
          "턴키 솔루션",
          "프로젝트 전 단계의 전문성",
          "단일 공급원에서 제공하는 모든 것",
          "자체 엔지니어링과 생산",
          "글로벌 네트워크와 전 세계 활동",
        ],
      },
      statement: "전 세계 EMC 솔루션의 유일하고 신뢰할 수 있는 파트너.",
    },
    history: {
      eyebrow: "HISTORY",
      title: "1987 … 성공 스토리의 시작",
      intro:
        "Frankonia는 'Made in Germany'로 분류되는 품질과 기술, 그리고 끊임없는 연구개발에 성과를 돌립니다.",
      // 원문 8문단. 6번째(95%)는 callout으로, 나머지는 순서 그대로.
      storyLead: [
        "Frankonia는 원래 여러 산업을 위한 화학·전기화학 제품의 생산과 거래를 위해 설립되었습니다. 처음부터 Wolfgang Opitz의 지휘 아래 자체 연구소와 집중적인 연구가 회사의 본질적인 일부였습니다. 이른 단계에서 제품 범위는 EMP 방호실과 벙커로 빠르게 확장되었고, 이것이 오늘날 무향 챔버와 차폐실을 위한 전자기 차폐의 근본 기준이 되었습니다.",
        "이른 시기에, 쾰른 대학의 Nimtz 교수가 흡수 특성을 가진 대체 표면에 관한 연구로 독자적인 Frankosorb® 흡수체 기술 개발의 단초를 제공했습니다. 하이데크에 별도로 개발한 시험 설비를 두고 1년 넘게 연구한 끝에, Nimtz 교수와 Enders 교수(TU Braunschweig EMC 연구소)는 Frankonia의 1세대 Frankosorb® 피라미드 흡수체를 개발해 냈습니다. 산업과 과학의 협력이 독자적인 나노 박막 기술을 이용한 비연소성 흡수체의 산업적 생산을 실현했습니다.",
        "그때 시장에 나온 완전히 새로운 흡수체 기술은 오늘날까지도 탁월하고 독보적인 특성을 제공합니다.",
      ],
      storyRest: [
        "1990년대 중반 EMC 시험소 검증에 관한 규격 변화는 Frankonia의 생산 자원과 Frankosorb® 흡수체의 성능, 그리고 비연소성이라는 특별한 특성에 전반적으로 유리하게 작용했습니다. 이처럼 흡수체에 대한 Frankonia의 연구개발은 회사의 성공에 본질적으로 기여해 왔습니다.",
        "생산 능력 확대를 위해 1990년 폴란드 지에르조니우프에 Frankonia Poland Sp. z o.o.를 설립했습니다. 무향 챔버 사업에 더해 1992년에는 EMC 시험 시스템으로 제품 포트폴리오를 넓혔고, 현재 독일 포르히하임 소재 Frankonia EMC Test-Systems GmbH의 주주입니다. 1990년대 후반 아시아 시장 점유율이 커지면서 생산 능력을 늘리기 위해 2003년 상하이 인근 자산에 Jiashan Frankonia EMC Co., Ltd.를 설립했습니다.",
      ],
      storyClose: [
        "복잡한 전자기 세계 속 EMC 시험소에서 Frankonia의 미래는 개별 제품과 완결형 솔루션의 최적화와 사용 편의성에 초점을 둡니다. 자체 연구소에서 기존 소재를 연구개발하는 일은 여전히 Frankonia의 핵심입니다. 나아가 개별 전자기 측정에 대한 고객의 구체적인 요구와, 차량 전동화나 IoT 같은 최신·미래 기술은 안전하고 규격에 맞는 구현을 요구합니다. 그래서 제품과 시험 시스템, 그리고 시험소 전체를 다분야 요구에 맞춰 적응시키는 일은 반가운 도전입니다. 우리 전문가 팀과 함께 그 일을 기꺼이 기다립니다.",
        "Frankonia는 'Made in Germany'로 분류되는 품질과 기술, 그리고 끊임없는 연구개발에 그 성과를 돌립니다. 지난 수십 년 동안 맞춤 솔루션을 제공해 온 Frankonia의 여정에서 짚어 둘 만한 이정표들이 있습니다.",
      ],
      callout:
        "오늘날 Frankonia 그룹은 자체 생산 역량을 이용해 모듈형 조립식 공법으로 전체 부품과 제품의 약 95%를 직접 설계·생산합니다. 이로써 일관된 품질과 최대한의 유연성을, 과학과 기술의 최신 수준에 대한 지속적인 적응과 함께 보장합니다.",
      earlyFigureAlt:
        "초기 차폐 구조물을 촬영한 자료 사진 — 통로와 피라미드 흡수체가 보인다",
      earlyFigureCaption: "초기 차폐 구조물. 인쇄된 자료 사진을 다시 촬영한 것입니다.",
      archFigureAlt:
        "안테나 챔버 내부 — 아치형 포지셔너 아래 청색·흑색 피라미드 흡수체",
      archFigureCaption: "현재 세대 안테나 챔버. 아치형 포지셔너와 Frankosorb® 흡수체.",
      groupKicker: "FRANKONIA GROUP",
      groupTitle: "법인 연혁",
      groupFacts: [
        ["1987", "설립"],
        ["5", "거점"],
        ["80+", "공급 국가"],
        ["100%", "턴키 솔루션"],
      ],
      groupEntries: [
        ["1987", "독일 하이데크에 본사를 둔 Frankonia GmbH 설립"],
        ["1990", "Frankonia Poland Sp. z o.o. 설립 (폴란드)"],
        ["1992", "독일 포르히하임에 Frankonia EMC Test-Systems GmbH 설립"],
        ["1998", "SIDT Europe 인수"],
        ["2003", "Jiashan Frankonia EMC Co. Ltd. 설립 (중국)"],
        ["2009", "Frankonia Group International로 전환"],
        ["2013", "Frankonia Thailand 영업 법인 설립 (중앙아시아)"],
        ["2015", "Frankonia Huize 영업 법인 설립 (중국)"],
        ["2017", "Frankonia India EMC Solutions Pvt. Ltd. 설립 (인도)"],
        ["2017", "Frankonia Germany EMC Solution GmbH 30주년 및 Frankonia EMC Test-Systems GmbH 25주년"],
      ],
      milestonesKicker: "MILESTONES",
      milestonesTitle: "제품·기술 마일스톤",
      milestones: [
        ["1991", "PAN-TYPE 모듈형 조립식 EMC 차폐"],
        ["1991", "최초의 박막 흡수체 기술"],
        ["1992", "EMC 시험 시스템으로 제품 범위 확대"],
        ["1993", "최초의 비연소성 Frankosorb® 흡수체 프로젝트"],
        ["1995", "EMC 시험 장비를 포함한 솔루션 공급자로의 첫걸음"],
        ["1998", "롱피라미드 흡수체와 하이브리드 흡수체를 적용한 10m 챔버 신세대"],
        ["2003", "신형 포지셔닝 장치 (예: 턴테이블)"],
        ["2003", "중국 생산·영업 거점 구축"],
        ["2007", "돔형 천장 설계를 적용한 신세대 챔버 SAC-3 Plus"],
        ["2007", "A2 등급 Frankosorb® 하이브리드 흡수체"],
        ["2011", "차폐문과 플랫폼 신세대"],
        ["2012", "신세대 챔버 FAC-3"],
        ["2012", "MIL 흡수체 업데이트"],
        ["2014", "파워트레인 부품용 신규 시험 솔루션 — E-Drive Testing Chamber (EDTC)"],
        ["2014", "턴테이블·컨트롤러·구동부 신세대"],
        ["2015", "다축 시험이 가능한 신세대 EMC 챔버 SAC-10 Plus Triton"],
        ["2015", "도어 시스템과 램프 업데이트"],
        ["2016", "SAC-5 Plus — 익숙한 돔형 천장 설계의 확장 솔루션"],
        ["2016", "BlueBox 이동형 부하 장치"],
        ["2016", "신형 포지셔닝 장치 (예: 보어사이트 안테나 마스트, 이동형 턴테이블)"],
        ["2016", "EMI/EMS 시험용 바닥 흡수체 보드"],
        ["2017", "A2 등급 하이브리드 Frankosorb® 흡수체 신세대"],
        ["2018", "E-Drive 유압식 부하 장치"],
        ["2020", "안테나 챔버용 신규 흡수체 — A2 등급 P1400HF-A2 Frankosorb® 흡수체"],
        ["2021", "신규 하이브리드 흡수체 시리즈 출시 — A2 등급 Frankosorb® H1300 Turbine 흡수체"],
      ],
    },
    career: {
      eyebrow: "CAREER",
      title: "국제 EMC 시장에서 함께 성장할 분을 찾습니다",
      intro:
        "Frankonia에서 일하는 데 관심이 있으시면 지원 서류를 jobs@frankoniagroup.com 으로 보내주세요.",
      aboutKicker: "CAREER WITH FRANKONIA",
      aboutTitle: "여러분의 EMC 교육에 투자합니다",
      about: [
        "Frankonia 그룹은 EMC 분야의 국제적인 선도 전문가 가운데 하나로, 무향 챔버와 시험 시스템을 아우르는 완결형 EMC 시험소 솔루션의 기획·생산·공급에 전문성을 두고 있습니다.",
        "이 복잡하고 고도로 기술적인 EMC 시험 환경에서 우리 고객은 전자 산업을 비롯해 자동차·철도·항공 등 전 세계 여러 산업에서 옵니다.",
        "우리의 성공은 프리미엄 고객 및 대리점과 국제적으로 함께 일하는, 의욕 있고 역동적인 팀에 기반합니다.",
      ],
      aboutCallout:
        "Frankonia는 개별 제품과 완결형 솔루션에서 여러 독보적인 특성을 제공하며, 그래서 전 세계에서 검증된 우선 파트너입니다. 우리의 가치와 목표에 따라 EMC라는 복잡한 주제 안에서 여러분의 교육에 투자하고, 구성원과의 장기적인 관계를 중시하며, 매력적인 조건을 제공합니다.",
      openingsKicker: "OPEN POSITIONS",
      openingsTitle: "채용 공고",
      groupLabels: {
        hq: ["하이데크 ", "본사"],
        field: ["국내·해외 ", "현장"],
      },
      detailLabel: "공고 상세 (PDF)",
      applyLabel: "지원하기",
      openingsNote:
        "공고는 본사가 직접 관리합니다. 상세와 지원 절차는 본사 사이트에서 열립니다. 공고 제목은 게시된 언어 그대로 표기했습니다.",
      initiativeKicker: "INITIATIVE APPLICATION",
      initiativeTitle: "상시 지원",
      initiative: [
        "국제적인 사업 안에서 이 놀랍고 다양한 분야에 관심이 있으시면 언제든 상시 지원서를 보내주세요. 우리는 여러 산업과 다양한 배경의 인재를 늘 찾고 있습니다.",
        "하이데크 Frankonia 본사에 지금 바로 지원하세요.",
      ],
      fields: [
        "기계 엔지니어링",
        "플랜트 엔지니어링",
        "프로젝트 관리",
        "전기 엔지니어링",
        "설치",
        "서비스",
      ],
      initiativeCta: "상시 지원하기",
      valuesKicker: "CORE VALUES",
      valuesTitle: "Frankonia의 핵심 가치",
      values: [
        ["01", "독창성", ["우리는 앞으로 나아가기를 멈추지 않는다", "우리는 모든 것에서 이점을 찾는다", "우리는 창의적으로 과제를 다룬다", "우리는 단순함을 추구한다"]],
        ["02", "에너지", ["우리는 하는 모든 일에 에너지를 쏟는다", "우리는 갈망을 잃지 않고 우리가 하는 일을 믿는다", "우리는 도전에 열려 있고 기회를 껴안는다", "우리는 하는 일에 대한 열정을 나눈다"]],
        ["03", "공동체", ["우리는 공정하고 존중하며 행동한다", "우리는 소매를 걷어붙이고 일을 끝낸다", "우리는 함께 미래를 만든다", "우리는 팀으로 이긴다"]],
        ["04", "공정함", ["우리는 열린 마음으로 호기심을 갖는다", "우리는 우리 행동에 책임을 진다", "우리는 명료하고 정직하게 소통한다", "우리는 실패를 인정하고 배우고 개선한다"]],
      ],
    },
    publications: {
      eyebrow: "PUBLICATIONS",
      title: "흡수체와 무향 챔버에 관한 발표 논문",
      intro:
        "Frankonia의 연구진과 협력 대학이 발표한 논문과 기고문입니다. 제목과 서지사항은 인용을 찾을 수 있도록 원문 그대로 싣습니다.",
      listKicker: "BIBLIOGRAPHY",
      listTitle: "논문 목록",
      printKicker: "IN PRINT",
      printTitle: "지면에 실린 Frankonia",
      printAlts: [
        "신문 지면을 촬영한 사진 — 무향 챔버 안에 차량이 놓인 사진이 함께 실려 있다",
        "논문 별쇄본 두 부를 촬영한 사진",
        "업계지 지면을 촬영한 사진 — Frankonia 광고",
      ],
      printCaptions: [
        "지역 신문 지면 — “Mit Pyramiden auf Strahlen…”, 하이데크의 Frankonia가 흡수체 홀을 짓는다는 기사.",
        "논문 별쇄본 두 부 — 위 목록의 2번과 8번.",
        "일본 업계지 지면에 실린 Frankonia 광고.",
      ],
    },
    events: {
      eyebrow: "EVENTS",
      title: "전시회와 세미나에서 만납니다",
      intro:
        "제품과 솔루션을 소개하고 전 세계 고객 및 미래 고객과의 관계를 넓히기 위해, Frankonia는 전시회와 세미나 같은 행사에 정기적으로 참가합니다.",
      meetKicker: "MEET US",
      meetTitle: "행사에서 Frankonia를 만나보세요",
      meetBody:
        "우리 솔루션에 관심이 있고 Frankonia에 대해 더 알고 싶으시다면, 아래 일정 가운데 한 곳에서 만나 뵙기를 바랍니다.",
      figureAlt: "전시장 안 Frankonia 부스 — 붉은 아치 게이트와 로고 월, 흰 전시대 위의 EMC 계측기",
      figureCaption: "전시장의 Frankonia 부스.",
      listKicker: "SCHEDULE",
      listTitle: "예정된 일정",
      entries: [] as readonly (readonly [string, string])[],
      pendingTitle: "현재 공개된 예정 행사가 없습니다",
      pendingBody:
        "본사가 다음 일정을 확정하면 이 페이지에 게시합니다. 그 전에 참가 예정을 확인하고 싶으시면 이메일로 문의해 주세요.",
      cta: "일정 문의하기",
    },
  },
  en: {
    philosophy: {
      eyebrow: "PHILOSOPHY",
      title: "Future-proof solutions on a global scale",
      intro:
        "Frankonia is recognized as a highly specialized technology corporation for EMC anechoic chambers and test systems within the automotive and industrial sector for testing of electromagnetic compatibility.",
      approachKicker: "COMPLETE SOLUTIONS",
      approachTitle: "Expertise in every phase of a project",
      approachBody: [
        "With our expertise, flexibility, quality and a high degree of technology, we generate future-proof solutions on a global scale.",
        "Frankonia is the preferred supplier for complete solutions when it comes to the implementation of EMC test facilities. We plan, coordinate, and define customized solutions with and for our customers that meet today’s and future standards. Because of our commitment to provide holistic EMC lab solutions we offer outstanding expertise in every phase of a project.",
        "Frankonia’s project business convinces with its own project management, engineering and production, a trend-setting research, as well as an own installation and service team. So, we make sure to provide a high level of technology and quality.",
      ],
      figureAlt: "Close-up of a Frankosorb® pyramidal absorber, embossed with the Frankonia mark",
      figureCaption: "Frankosorb® — absorber technology engineered and produced in-house.",
      commitKicker: "OUR COMMITMENT",
      commitTitle: "Everything from one source",
      standsFor: {
        head: ["Frankonia ", "stands for"],
        items: [
          "Customized anechoic chambers",
          "Individual EMC test systems",
          "Highest quality",
          "Latest technology",
          "Reliability",
          "Unique absorbers",
          "Future-proof solutions",
        ],
      },
      provides: {
        head: ["Frankonia ", "provides"],
        items: [
          "Anechoic Chambers and Test Systems",
          "Turnkey solutions",
          "Expertise in every stage of a project",
          "Everything from one source",
          "Own engineering and manufacturing",
          "Global presence and worldwide activity",
        ],
      },
      statement: "The unique and trustworthy partner for EMC solutions worldwide.",
    },
    history: {
      eyebrow: "HISTORY",
      title: "1987 … the start of a success story",
      intro:
        "Frankonia contributes its success to quality and technology along the classification of ‘Made in Germany’, paired with a continuously research and development.",
      // The source's eight paragraphs. The sixth (the 95% figure) is lifted
      // into the callout; the rest keep their order. Wording is the head
      // office's own, including `In the late early,` and `a continuously
      // research` — see docs/source/company-history.md §2.1.
      storyLead: [
        "Originally, the company Frankonia has been established for the production and trading with chemical and electrochemical products for different industries. From the beginning and under the guidance of Wolfgang Opitz, an own laboratory and the intensive research has been an inherent part of Frankonia. In an early stage, the product range quickly expanded for EMP protected rooms and bunkers, which is the fundamental standard of today’s electromagnetic shielding for anechoic chambers and shielded rooms.",
        "In the late early, Prof. Nimtz from the University of Cologne with his research on alternative surfaces with absorbent characteristics gave the initial idea to develop the unique Frankosorb® absorber technology. Having a special developed test facility in Heideck to research for more than one year, Prof. Nimtz and Prof. Enders (Institute for EMC at TU Braunschweig) made it possible to develop the first generation of Frankonia’s Frankosorb® pyramid absorbers. The cooperation of industry with science successfully realized an industrial manufacturing of non-combustible absorbers using the unique nano-thinfilm technology.",
        "At that time, a completely new absorber technology has been brought to the market that offers still today outstanding and unique attributes.",
      ],
      storyRest: [
        "Normative changes for the verification of EMC laboratories in the mid-nineties led to considerable advantages that overall benefited Frankonia’s resources in manufacturing, the performance of Frankosorb® absorbers, and the special non-combustible characteristic. Thus, Frankonia’s research and development on absorbers has essentially contributed to the success of the company.",
        "To expand the manufacturing capacities, the Frankonia Poland Sp. z o.o. located in Dzierżoniów (Poland) has been established in 1990. In addition to the anechoic chamber business, Frankonia expanded in 1992 its product portfolio with EMC test systems and is today shareholder of the Frankonia EMC Test-Systems GmbH located in Forchheim (Germany). With the growing market share in Asia in the late nineties and to increase manufacturing capacities, Frankonia established in 2003 the Jiashan Frankonia EMC Co., Ltd. located in Jiashan near Shanghai (China).",
      ],
      storyClose: [
        "The future of Frankonia in the complex electromagnetic world of EMC test laboratories focuses on the optimization and easier usability of individual products as well as complete solutions. The research and development of existing materials in the own laboratory remains intense part of Frankonia. Furthermore, specific requirements of our customers for their individual electromagnetic measurements, as well as latest and future technologies, for instance, the electrification of vehicles or IoT, require a safe and compliant implementation. So, the adaptation of products, test systems, and complete laboratories to multidisciplinary requirements is a welcome challenge. With our professional team, we gladly look forward to that.",
        "Frankonia contributes its success to quality and technology along the classification of ‘Made in Germany’, paired with a continuously research and development. Over the past decades, Frankonia’s ambitions to provide customized solutions, some milestones are worth mentioning.",
      ],
      callout:
        "Today, the Frankonia Group engineers and manufactures approximately 95% of all components and products in a modular and prefabricated construction technique using its own manufacturing capabilities. Herewith, Frankonia guarantees consistent quality, maximum flexibility paired with a continuous adaptation to the current state-of-the-art of science and technology.",
      earlyFigureAlt:
        "Archive photograph of an early shielded structure, with a walkway and pyramidal absorbers",
      earlyFigureCaption: "An early shielded structure, photographed from a print.",
      archFigureAlt:
        "Inside an antenna chamber — blue and black pyramidal absorbers under an arch positioner",
      archFigureCaption:
        "A current-generation antenna chamber, with an arch positioner and Frankosorb® absorbers.",
      groupKicker: "FRANKONIA GROUP",
      groupTitle: "Company timeline",
      groupFacts: [
        ["1987", "Founded"],
        ["5", "Locations"],
        ["80+", "Countries"],
        ["100%", "Turnkey solutions"],
      ],
      groupEntries: [
        ["1987", "Company foundation of Frankonia GmbH headquartered in Heideck (GERMANY)"],
        ["1990", "Company foundation of Frankonia Poland Sp. z o.o. (POLAND)"],
        ["1992", "Company foundation of Frankonia EMC Test-Systems GmbH in Forchheim (GERMANY)"],
        ["1998", "Acquisition of SIDT Europe"],
        ["2003", "Company foundation of Jiashan Frankonia EMC Co. Ltd. (CHINA)"],
        ["2009", "Transformation into Frankonia Group International"],
        ["2013", "Company foundation of Frankonia Thailand – Sales Unit (CENTRAL ASIA)"],
        ["2015", "Company foundation of Frankonia Huize – Sales Unit (CHINA)"],
        ["2017", "Company foundation of Frankonia India EMC Solutions Pvt. Ltd. (INDIA)"],
        ["2017", "30-Year Anniversary of Frankonia Germany EMC Solution GmbH & 25-Year Anniversary of Frankonia EMC Test-Systems GmbH"],
      ],
      milestonesKicker: "MILESTONES",
      milestonesTitle: "Product and technology milestones",
      milestones: [
        ["1991", "PAN-TYPE modular and prefabricated EMC shielding"],
        ["1991", "First thin-film absorber technology"],
        ["1992", "Enlarge product scope with EMC test systems"],
        ["1993", "First non-combustible Frankosorb® absorber project"],
        ["1995", "First step as solution provider including EMC testing equipment"],
        ["1998", "New generation of 10m chambers with long-pyramid absorbers and hybrid absorbers"],
        ["2003", "New positioning devices (e.g. turntables)"],
        ["2003", "Setup Frankonia manufacturing and sales in China"],
        ["2007", "New chamber generation SAC-3 Plus with dome shape roof design"],
        ["2007", "Frankosorb® hybrid absorbers in A2"],
        ["2011", "New generation of shielded doors and platforms"],
        ["2012", "New chamber generation FAC-3"],
        ["2012", "Update on MIL absorbers"],
        ["2014", "New testing solutions for powertrain components – E-Drive Testing Chamber (EDTC)"],
        ["2014", "New generation of turntables, controller and drive units"],
        ["2015", "New generation of EMC chamber: SAC-10 Plus Triton with multiple test axes"],
        ["2015", "Update door systems and ramps"],
        ["2016", "SAC-5 Plus – extended solution of the well-known dome shape roof design"],
        ["2016", "BlueBox Mobile Load Machine"],
        ["2016", "New positioning devices (e.g. Boresight antenna mast, mobile turntables)"],
        ["2016", "Floor-absorberboard for EMI/EMS testing"],
        ["2017", "New generation of hybrid Frankosorb® absorbers in A2"],
        ["2018", "E-Drive Hydraulic Load Machine"],
        ["2020", "New absorbers for Antenna Chambers, the P1400HF-A2 Frankosorb® absorber in A2"],
        ["2021", "New hybrid absorbers series launched, the Frankosorb® H1300 Turbine absorber in A2"],
      ],
    },
    career: {
      eyebrow: "CAREER",
      title: "We are always looking for motivated people to join our team",
      intro:
        "If you are interested to work at Frankonia, submit your application to jobs@frankoniagroup.com.",
      aboutKicker: "CAREER WITH FRANKONIA",
      aboutTitle: "We invest in your education within EMC",
      about: [
        "The Frankonia Group is one of the international leading experts in EMC and has its expertise in the planning, production and delivery of complete EMC laboratory solutions that encompass Anechoic Chambers and Test Systems.",
        "Within this complex and high-tech EMC testing environment, our customers come from the electronic industries and industries as automotive, railway, avionics, etc. from all around the world.",
        "Our success is based on our motivated and dynamic team, working internationally with our premium customers and representatives.",
      ],
      aboutCallout:
        "Frankonia offers various unique attributes in single products and complete solutions and is herewith the proven and preferred partner around the globe. Along with our values and goals, we invest in your education within the complex subject of EMC, rely on a long-term relationship with our staff and provides attractive conditions.",
      openingsKicker: "OPEN POSITIONS",
      openingsTitle: "Frankonia Vacancies",
      groupLabels: {
        hq: ["Jobs, ", "Headquarters Heideck"],
        field: ["Jobs, ", "national und international"],
      },
      detailLabel: "Job description (PDF)",
      applyLabel: "Apply here",
      openingsNote:
        "Vacancies are maintained by the head office. The description and the application form open on the head office site. Titles are shown in the language each posting is written in.",
      initiativeKicker: "INITIATIVE APPLICATION",
      initiativeTitle: "Frankonia Initiative Application",
      initiative: [
        "If you are interested in working within this amazing and varied sector in our international business, feel free to send you initiative application. We always look for talents from several industries and with different backgrounds.",
        "Apply now proactive for Frankonia headquarters in Heideck!",
      ],
      fields: [
        "Mechanical Engineering",
        "Plant Engineering",
        "Project Management",
        "Electrical Engineering",
        "Installation",
        "Service",
      ],
      initiativeCta: "Send an initiative application",
      valuesKicker: "CORE VALUES",
      valuesTitle: "Core Values of Frankonia",
      values: [
        ["01", "Ingenuity", ["We never stop pushing forward", "We look for advantage in everything", "We handle challenges with creativity", "We strive for simplicity"]],
        ["02", "Energy", ["We bring energy to everything we do", "We stay hungry and believe in what we do", "We are open to challenges and embrace opportunities", "We share the passion for what we do"]],
        ["03", "Community", ["We act fair and respectful", "We roll up our sleeves to get the job done", "We shape the future together", "We win as a team"]],
        ["04", "Fairness", ["We are open minded and curious", "We take responsibility for our actions", "We communicate with clarity and honesty", "We admit failures, learn and improve"]],
      ],
    },
    publications: {
      eyebrow: "PUBLICATIONS",
      title: "Published research on absorbers and anechoic chambers",
      intro:
        "Papers and articles published by Frankonia’s researchers and their university partners. Titles and citations are given as published, so they stay findable.",
      listKicker: "BIBLIOGRAPHY",
      listTitle: "Papers and articles",
      printKicker: "IN PRINT",
      printTitle: "Frankonia in print",
      printAlts: [
        "A photograph of a newspaper page, carrying a picture of a vehicle inside an anechoic chamber",
        "A photograph of two paper offprints",
        "A photograph of a trade magazine page carrying a Frankonia advertisement",
      ],
      printCaptions: [
        "A local newspaper page — “Mit Pyramiden auf Strahlen…”, on Frankonia of Heideck building absorber halls.",
        "Two offprints — papers 2 and 8 in the list above.",
        "A Frankonia advertisement in a Japanese trade magazine.",
      ],
    },
    events: {
      eyebrow: "EVENTS",
      title: "We regularly take part in exhibitions and seminars",
      intro:
        "To introduce you our products and solutions, and to improve the relationship with our customers and future customers all over the world, we regularly participate on events like exhibitions and seminars.",
      meetKicker: "MEET US",
      meetTitle: "Visit us at one of our events",
      meetBody:
        "If you are interested in our solutions and want to learn more about Frankonia’s, please visit us at one of the following events.",
      figureAlt:
        "A Frankonia stand at a trade fair — a red arch gate and logo wall, EMC instruments on white plinths",
      figureCaption: "The Frankonia stand at a trade fair.",
      listKicker: "SCHEDULE",
      listTitle: "Upcoming",
      entries: [] as readonly (readonly [string, string])[],
      pendingTitle: "No events are currently announced",
      pendingBody:
        "Dates are published here once the head office confirms them. In the meantime, ask by email if you want to know where we will be.",
      cta: "Ask about dates",
    },
  },
} as const;

/**
 * The bibliography from the head office's Publications page. Not part of
 * `copy`, because it is not translated: a citation has to stay findable, so
 * both locales show the title and the reference exactly as published — the
 * German quotation marks included.
 */
const citations = [
  ["„Elektromagnetische Absorber aus mesoskopischen Metallschichten”", "G. Nimtz und A. Enders, Physik in unserer Zeit, 27, 1996, pp. 38 – 40"],
  ["„Real Performance of Semi-Anechoic Chambers Depending on Absorber Technology”", "A. Enders, Transactions/Journal: 1996 IEEE Int’l Symposium on Electromagnetic Compatibility Santa Clara, CA, August 19-23, 1996, Vol. 1 Issue:1, pp. 146 – 150"],
  ["„Advancements in Anechoic Chambers”", "A. Enders, ITEM 1996, The International Journal of EMC (by Robar Industries, Inc.; R&B Enterprise Division), pp. 154 – 158 and 244 – 248"],
  ["„Freespace-Korrelation im Frequenzbereich 1-18 GHz”", "R. Schaller, U. Panten, K. Ruffing, EMC Kompendium 1998, pp. 178 – 180"],
  ["„Reproduzierbarkeiten bei gestrahlten EMV-Messungen”", "A. Enders, J. Leopold, U. Panten, Elektromagnetische Verträglichkeit/EMV 98, 6. Int. Fachmesse und Kongreß für Elektromagnetische Verträglichkeit, Düsseldorf; Hrsg. A. Schwab, vde-Verlag, 1998, pp. 681-686"],
  ["„Correlation of free space attenuation in anechoic chambers at 1-18GHz”", "R. Schaller, U. Panten, K. Ruffing, EMC Engineering Europe June/July 1999, pp. 9 – 13"],
  ["„Störstrahlung verlässlich bestimmen”", "C. Römer, E&E September 2008, pp. 62 – 64"],
  ["„Broad band electromagnetic wave absorbers designed with nano-metal films”", "G. Nimtz and U. Panten, Ann. Physik (Berlin) Vol. 19, 2010, pp. 53 – 59"],
  ["„Novel broad band electromagnetic wave absorber designed with nano-metal films”", "G. Nimtz and U. Panten, Conference Proceedings, INCEMIC 2010, Bangalore, India, pp. 181 – 184"],
  ["„Effective Lösungen für moderne Absorberhallen”", "U. Panten, E&E, Kompendium 2011, pp. 266 – 268"],
  ["„Novel broad band electromagnetic wave absorber designed with nano-metal films”", "G. Nimtz and U. Panten, Electronic Environment #1.2011, Sweden, pp. 20 – 22"],
] as const;

/**
 * Open positions as the head office listed them on 2026-08-07. Titles are not
 * translated — they are the postings' own wording, mostly German.
 *
 * The description PDF and the application form stay on the head office site
 * rather than being copied here: vacancies are live data the head office
 * maintains, and a copy would outlive the posting it came from. Re-check
 * against the source before editing this page — see
 * docs/source/company-career.md §2.2.
 */
const vacancyGroups = [
  {
    key: "hq",
    jobs: [
      { title: "Technischer Zeichner oder Techniker (m/w/d)", pdf: "/wp-content/uploads/2025/11/2025-Technischer-Zeichner-Techniker.pdf", apply: "/career-techniker/" },
      { title: "Sales Manager im technischen Vertrieb (m/w/d)", pdf: "/wp-content/uploads/2026/02/2026-Sales-Manager.pdf", apply: "/career-sales-manager/" },
    ],
  },
  {
    key: "field",
    jobs: [
      { title: "Obermonteur E-Technik (m/w/d)", pdf: "/wp-content/uploads/2025/11/2025-Obermonteur-E-Technik.pdf", apply: "/career-monteure/" },
      { title: "Obermonteur (m/w/d)", pdf: "/wp-content/uploads/2025/11/2025-Obermonteur.pdf", apply: "/career-monteure/" },
      { title: "Service Technician – EMC Chambers in India (m/w/d)", pdf: "/wp-content/uploads/2026/03/career-servicetechnician-india.pdf", apply: "/career-service-technician-india/" },
    ],
  },
] as const satisfies readonly { key: "hq" | "field"; jobs: readonly { title: string; pdf: string; apply: string }[] }[];

/** Section head: red eyebrow over a Light heading (design reference §4.2-1). */
function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="sec-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}

/** A run of body paragraphs where the source gives no other structure. */
function Prose({ paras }: { paras: readonly string[] }) {
  return (
    <div className="prose">
      {paras.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** A photograph carried over from the head office site, with its caption. */
function Figure({
  src,
  alt,
  caption,
  width,
  height,
  className = "figure",
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* Raw <img>, as everywhere else on the site: the static export runs with
          images.unoptimized, so next/image would emit this same tag with more
          machinery around it — and a raw tag does not get basePath rewriting,
          hence asset(). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(src)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Index, heading, and an optional meta line — a year and its milestone, or a
 *  citation, or a vacancy with its two links. */
function EntryList({
  entries,
}: {
  entries: readonly (readonly [string, string])[];
}) {
  return (
    <div className="entry-list">
      {entries.map(([index, text], i) => (
        <div className="entry" key={`${index}-${i}`}>
          <span className="entry-idx">{index}</span>
          <h4>{text}</h4>
        </div>
      ))}
    </div>
  );
}

/** A checked list without the paired-column framing `CheckColumn` adds. */
function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <svg className="chk" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 8.6l4 4 8-9.2" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** One "Frankonia stands for" / "Frankonia provides" column. The head is split
 *  so the predicate carries the weight, as it does on the source page. */
function CheckColumn({
  head: [lead, emphasis],
  items,
}: {
  head: readonly [string, string];
  items: readonly string[];
}) {
  return (
    <div className="check-col">
      <h3>
        {lead}
        <b>{emphasis}</b>
      </h3>
      <CheckList items={items} />
    </div>
  );
}

/** A group heading inside a band that already carries a `.sec-head`, split the
 *  way the source splits it. */
function SubHead({ head: [lead, emphasis] }: { head: readonly [string, string] }) {
  return (
    <h3 className="sub-head">
      {lead}
      <b>{emphasis}</b>
    </h3>
  );
}

/** Shown wherever a list is real but not yet populated, so the page reads as
 *  deliberately empty rather than broken. */
function EmptyState({
  title,
  body,
  cta,
  subject,
}: {
  title: string;
  body: string;
  cta: string;
  subject: string;
}) {
  return (
    <div className="empty">
      <h4>{title}</h4>
      <p>{body}</p>
      <a className="btn btn-red" href={`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`}>
        {cta}
      </a>
    </div>
  );
}

export default function CompanyPage({
  lang,
  section,
}: {
  lang: Lang;
  section: CompanySection;
}) {
  return (
    <>
      <StructuredData
        lang={lang}
        page="company"
        section={section}
        description={sectionMeta[lang][section].description}
      />
      <CompanyBody lang={lang} section={section} />
    </>
  );
}

function CompanyBody({ lang, section }: { lang: Lang; section: CompanySection }) {
  const t = copy[lang];

  if (section === "philosophy") {
    const p = t.philosophy;
    return (
      <PageShell lang={lang} eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        {/* Copy left, photograph right — the source page's own two-column
            opening, on this site's existing `.trust` split. */}
        <section>
          <div className="wrap trust">
            <div>
              <span className="kicker">{p.approachKicker}</span>
              <h2>{p.approachTitle}</h2>
              {p.approachBody.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <Figure
              src="/company/images/frankosorb-absorber.webp"
              alt={p.figureAlt}
              caption={p.figureCaption}
              width={720}
              height={480}
            />
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={p.commitKicker} title={p.commitTitle} />
            <div className="check-cols">
              <CheckColumn head={p.standsFor.head} items={p.standsFor.items} />
              <CheckColumn head={p.provides.head} items={p.provides.items} />
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="statement">
              <p>{p.statement}</p>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (section === "history") {
    const h = t.history;
    return (
      <PageShell lang={lang} eyebrow={h.eyebrow} title={h.title} intro={h.intro}>
        {/* The source's narrative, in its own order, with the two photographs
            where they sit on that page: the archive print beside the opening,
            the current chamber after the 95% figure. */}
        <section>
          <div className="wrap">
            <div className="trust">
              <Prose paras={h.storyLead} />
              <Figure
                src="/company/images/history-early-shielded-line.webp"
                alt={h.earlyFigureAlt}
                caption={h.earlyFigureCaption}
                width={1200}
                height={808}
              />
            </div>
            <Prose paras={h.storyRest} />
            <div className="callout">{h.callout}</div>
            <Figure
              src="/company/images/history-antenna-chamber-arch.webp"
              alt={h.archFigureAlt}
              caption={h.archFigureCaption}
              width={1600}
              height={991}
              className="figure figure-wide"
            />
            <Prose paras={h.storyClose} />
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={h.groupKicker} title={h.groupTitle} />
            <div className="badges badges-four">
              {h.groupFacts.map(([value, label]) => (
                <div className="bd" key={label}>
                  <b>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="sec-go">
              <EntryList entries={h.groupEntries} />
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <SectionHead kicker={h.milestonesKicker} title={h.milestonesTitle} />
            <EntryList entries={h.milestones} />
          </div>
        </section>
      </PageShell>
    );
  }

  if (section === "career") {
    const c = t.career;
    return (
      <PageShell lang={lang} eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
        <section>
          <div className="wrap">
            <SectionHead kicker={c.aboutKicker} title={c.aboutTitle} />
            <Prose paras={c.about} />
            <div className="callout">{c.aboutCallout}</div>
          </div>
        </section>

        {/* The vacancies themselves stay on the head office site — see
            `vacancyGroups`. Each row links to the posting's own PDF and to its
            application form there. */}
        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={c.openingsKicker} title={c.openingsTitle} />
            {vacancyGroups.map((group) => (
              <div className="list-group" key={group.key}>
                <SubHead head={c.groupLabels[group.key]} />
                <div className="entry-list">
                  {group.jobs.map((job, i) => (
                    <div className="entry" key={job.title}>
                      <span className="entry-idx">{String(i + 1).padStart(2, "0")}</span>
                      <h4>{job.title}</h4>
                      <div className="entry-links">
                        <a href={`${headOfficeUrl}${job.pdf}`}>{c.detailLabel} ↗</a>
                        <a href={`${headOfficeUrl}${job.apply}`}>{c.applyLabel} ↗</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="callout">{c.openingsNote}</div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <SectionHead kicker={c.initiativeKicker} title={c.initiativeTitle} />
            <Prose paras={c.initiative} />
            <div className="check-cols">
              <div className="check-col">
                <CheckList items={c.fields.slice(0, 3)} />
              </div>
              <div className="check-col">
                <CheckList items={c.fields.slice(3)} />
              </div>
            </div>
            <div className="btns sec-go">
              <a
                className="btn btn-red"
                href={`mailto:${jobsEmail}?subject=${encodeURIComponent("[Frankonia] Initiative application")}`}
              >
                {c.initiativeCta}
              </a>
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={c.valuesKicker} title={c.valuesTitle} />
            <div className="value-grid">
              {c.values.map(([no, name, statements]) => (
                <div className="num-col" key={no}>
                  <span className="num">{no}</span>
                  <h4>{name}</h4>
                  <ul>
                    {statements.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (section === "publications") {
    const p = t.publications;
    return (
      <PageShell lang={lang} eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <section>
          <div className="wrap">
            <SectionHead kicker={p.listKicker} title={p.listTitle} />
            <div className="entry-list">
              {citations.map(([title, reference], i) => (
                <div className="entry" key={`${title}-${i}`}>
                  <span className="entry-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h4>{title}</h4>
                  <p>{reference}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <SectionHead kicker={p.printKicker} title={p.printTitle} />
            <div className="figure-row">
              {[
                "/company/images/publications-press-clipping.webp",
                "/company/images/publications-papers.webp",
                "/company/images/publications-trade-magazine.webp",
              ].map((src, i) => (
                <Figure
                  key={src}
                  src={src}
                  /* Alt says what the photograph is; the caption says what it
                     means. Both describe only what is legible — the source
                     gives no captions, and the mastheads and dates cannot be
                     read off these scans. */
                  alt={p.printAlts[i]}
                  caption={p.printCaptions[i]}
                  width={500}
                  height={289}
                />
              ))}
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  const e = t.events;
  return (
    <PageShell lang={lang} eyebrow={e.eyebrow} title={e.title} intro={e.intro}>
      <section>
        <div className="wrap trust">
          <div>
            <span className="kicker">{e.meetKicker}</span>
            <h2>{e.meetTitle}</h2>
            <p>{e.meetBody}</p>
          </div>
          <Figure
            src="/company/images/events-trade-fair-booth.webp"
            alt={e.figureAlt}
            caption={e.figureCaption}
            width={1600}
            height={1200}
          />
        </div>
      </section>

      {/* The head office announces no dates at the moment, so the list is
          deliberately empty rather than filled with invented ones. `entries`
          takes rows without a layout change once there are any. */}
      <section className="alt">
        <div className="wrap">
          <SectionHead kicker={e.listKicker} title={e.listTitle} />
          {e.entries.length > 0 ? (
            <EntryList entries={e.entries} />
          ) : (
            <EmptyState
              title={e.pendingTitle}
              body={e.pendingBody}
              cta={e.cta}
              subject="[Frankonia] Event schedule"
            />
          )}
        </div>
      </section>
    </PageShell>
  );
}
