"use client";

/* The CyberShield landing page, ported from the product site.
 *
 * The product site cannot be embedded — it answers with X-Frame-Options:
 * SAMEORIGIN and frame-ancestors 'self' — so the page is rendered natively
 * here instead, from the same source it is built from
 * (D:/FRANKONIA/CyberShield/landing-page/app/landing.tsx).
 *
 * The port is deliberately close to that file so upstream changes stay easy to
 * carry over. What was dropped: its own header, mobile menu and footer, since
 * this site's chrome wraps the page instead (see cybershield-content.tsx), and
 * with them the language switcher — the locale comes from this site's own
 * language menu — plus the effects that drove the removed header. What was
 * added: the `.cs` wrapper the ported stylesheet is scoped to, and a ref so
 * the reveal-on-scroll effect only ever looks inside it.
 */

import { FormEvent, useEffect, useRef, useState } from "react";
import { CutawayMap } from "./cutaway-map";
import { asset } from "./site-config";
import type { Lang } from "./site-config";

type Inquiry = "consultation" | "quote";

const copy = {
  en: {
    nav: {
      threats: "Why CyberShield",
      solution: "Solution",
      ecosystem: "Ecosystem",
      verification: "Verification",
      applications: "Applications",
      process: "Process",
      contact: "Contact",
    },
    langLabel: "Select language",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    alt: {
      facility: "Aerial view of a data-centre facility campus",
      technician: "Technician verifying systems inside the data hall",
      engineer: "Engineer inspecting racks inside a protected server aisle",
    },
    ecosystemAlt: [
      "Modular PAN shielding panels forming the wall of a shielded room, carried on a self-supporting steel structure",
      "Double-leaf RF shielded doors set into the facade of a shielded room",
      "Filter cabinets beside an opened power line filter bank at the shielding boundary",
      "Honeycomb ventilation waveguide panel mounted into a shielded wall",
      "Measurement instruments on a control desk used for shielding effectiveness testing",
      "A hall of installed shielded rooms with access platform and stairs",
    ],
    consultation: "Book a consultation",
    quote: "Request a quote",
    eyebrow: "PHYSICAL & ELECTROMAGNETIC SECURITY FOR AI DATA CENTRE BUILDS",
    heroTitle: "Protect the AI data centre.",
    heroAccent: "Contain the signal.",
    heroBody:
      "CyberShield creates a measurable electromagnetic security boundary around mission-critical data infrastructure—engineered, integrated and verified as one complete system.",
    explore: "Explore the system",
    metrics: [
      ["Verified on site", "Shielding performance is measured after installation—not assumed"],
      ["Weld-free assembly", "Bolted modules installed alongside live operations, no hot work"],
      ["Built to change", "Dismount, expand or relocate the room without damage"],
    ],
    proof: ["Engineering heritage since 1987", "5 global locations", "Presence in 80+ countries", "Turnkey delivery"],
    audienceEyebrow: "WHO CYBERSHIELD IS BUILT FOR",
    audienceTitle: "Three environments where the boundary has to hold.",
    audience: [
      [
        "Hyperscale cloud & AI centres",
        "Core AI compute clusters, quantum hardware and critical availability zones, shielded against RF tampering and high-power electromagnetic threats.",
      ],
      [
        "Colocation & enterprise data centres",
        "A certified shielded vault offered as a premium, measurable security tier for enterprise customers under strict governance requirements.",
      ],
      [
        "Defence, government & financial institutions",
        "Sovereign cloud deployments, command centres and high-frequency trading platforms where confidentiality cannot be left to assumption.",
      ],
    ],
    whyEyebrow: "SECURITY BEYOND SOFTWARE",
    whyTitle: "AI data centre security no longer ends at the software layer.",
    whyBody:
      "Firewalls, encryption and zero trust stop what arrives over the network. As the value held inside an AI data centre grows, the paths that never touch the network—through physical space and through electromagnetic coupling—have become a real part of the assessment. Software security and physical security now have to be designed together.",
    whyMetric: "2.5 ns",
    whyMetricLabel: "Rise time of the E1 HEMP pulse — over before surge protection rated for lightning has reacted",
    whyValueLabel: "WHAT CYBERSHIELD ADDS",
    whyValueTitle: "One boundary — designed, built and measured under a single responsibility.",
    whyValueBody:
      "Shielding structure, doors, filters, ventilation waveguides and every penetration are engineered as one continuous boundary, assembled weld-free alongside live operations, then measured on site to EN 50147-1 / IEEE 299 and handed over as documented evidence. What you keep at the end is a measurement, not an assurance.",
    assetCards: [
      ["A national strategic asset", "AI compute is already treated as national capability. Model weights, training data and sovereign workloads are corporate property and a matter of state interest at once — which is exactly what makes them worth targeting."],
      ["EMC and EMP exposed by design", "Dense GPU racks take tens of kilowatts through switching electronics, and 400G/800G interconnects work to noise budgets measured in millivolts. As power density rises, emission goes up and immunity headroom comes down. Protection sized for a conventional server room does not cover this."],
      ["Protection from what is outside", "Data centres sit near industry, transmitters and transport infrastructure. The ambient RF environment is not yours to control and only gets busier. Intentional interference can be assembled from commercially available parts — which is why IEC 61000-4-36 exists as a test standard in its own right."],
    ],
    threatEyebrow: "THE SECURITY LAYER SOFTWARE CANNOT PROVIDE",
    threatTitle: "Not every threat enters through the network.",
    threatBody:
      "Encryption and zero-trust protect the digital domain. CyberShield addresses physical and electromagnetic exposure at the facility boundary.",
    threats: [
      ["Compromising emanations", "Sensitive processing activity can be exposed through unintended electromagnetic signals—without touching the network.", "Confidentiality exposed"],
      ["Intentional interference", "Localized high-power RF or electromagnetic energy can disrupt electronics, controls and communications.", "Service interruption"],
      ["EMP / HEMP exposure", "Radiated and conducted pulse effects can challenge critical systems and continuity architectures.", "Mission continuity risk"],
      ["Boundary vulnerabilities", "Doors, ventilation, power, data, cooling and utility penetrations can become the weakest path through the shield.", "Protection degraded"],
    ],
    impactLabel: "Potential impact",
    systemEyebrow: "MODULAR PAN SHIELDING SYSTEM",
    systemTitle: "A secure room engineered around the reality of your facility.",
    systemBody:
      "Prefabricated PAN modules pass through standard building doors, assemble from the inside and can be installed close to existing walls. No glue. No welding. No irreversible commitment.",
    features: [
      ["01", "Precision assembly", "Panels are bolted every 75 mm with predefined torque and conductive mesh gaskets."],
      ["02", "Architectural integration", "Reversible modules leave flat interior surfaces for finishing walls, ceilings and racks, designed around raised floors, fire systems, lighting, cooling and access control."],
      ["03", "Adaptable by design", "Dismountable without damage for expansion, modification or complete relocation."],
      ["04", "Complete boundary", "Shielding structure, doors, filters, honeycombs and waveguides are treated as one system."],
    ],
    cutawayEyebrow: "EXPLORE THE ROOM",
    cutawayTitle: "See for yourself what CyberShield builds into a shielded room.",
    cutawayBody:
      "Twenty-one engineered solutions make up the shielding boundary — structure, penetrations, building services and power. Pick any one to see what it does and why it is there.",
    cutawayAlt: "Cutaway view of a CyberShield shielded data hall with its structure, doors, filters, ducts and power room",
    cutawayHint: "Choose a number on the render, or any part in the list.",
    compareEyebrow: "ENGINEERED BEYOND THE INDUSTRY BASELINE",
    compareTitle: "Where standard shielding stops, the engineering starts.",
    compareBody:
      "How CyberShield compares with conventional shielding approaches across the criteria that decide long-term performance.",
    compareHead: ["Performance criterion", "Conventional shielding", "Frankonia CyberShield"],
    compareRows: [
      [
        "RF attenuation spectrum",
        "60–80 dB across a narrow frequency band",
        "Peak ≥ 120 dB (100–400 MHz) and ≥ 100 dB from 10 kHz to 40 GHz",
      ],
      [
        "Shielding panel engineering",
        "Thin sheet metal or welded steel construction",
        "2.0 mm galvanized steel PAN modules bolted every 75 mm to defined torque",
      ],
      [
        "Joinery & sealing technology",
        "Conductive adhesive or continuous welding",
        "High-conductivity mesh gasket — no glue, no welding, 100 % reusable",
      ],
      [
        "Airflow & acoustic efficiency",
        "Basic cut-outs with thermal loss and RF leakage paths",
        "Honeycomb waveguide ventilation and ISO 354 sound absorption (α = 0.65)",
      ],
      [
        "Building integration",
        "High static loads within a permanent structure",
        "Self-supporting or seismic steel structure, dismountable without damage",
      ],
    ],
    ecosystemEyebrow: "ONE CONTINUOUS BARRIER",
    ecosystemTitle: "Six product lines. One zero-leak boundary.",
    ecosystemBody:
      "Every component is engineered as part of the same shielding envelope, so performance is not lost at the joints, the doors or the penetrations.",
    ecosystemCards: [
      [
        "CyberShield Structure",
        "Prefabricated 2.0 mm galvanized steel PAN module system for walls, ceilings and floors.",
        "Sheet steel to DIN 17162 / EN 10142 DX 52 D+Z, 275 g/m² galvanising, bolted every 75 mm onto a self-supporting steel structure.",
      ],
      [
        "CyberShield Access",
        "Heavy-duty sliding and hinged RF doors, high-attenuation RF windows and integrated access monitoring.",
        "Circumferential triple contact system with conductive springs, 20,000 opening cycles MTBF, 150 mm standard threshold.",
      ],
      [
        "CyberShield Connectivity",
        "High-performance power line filters, fibre-optic waveguide penetrations and RF signal suppressors.",
        "Power, data and signal feed-throughs filtered to the same attenuation as the wall they cross — up to DN200 media penetrations.",
      ],
      [
        "CyberShield Air & Waveguides",
        "Honeycomb ventilation panels, acoustic panels (ISO 354) and shielded waveguides for liquid cooling and utilities.",
        "Below-cut-off honeycomb waveguides pass air without passing RF; acoustic inlay panels absorb to ISO 354, αw = 0.65 (MH).",
      ],
      [
        "CyberShield Validation",
        "EN 50147-1 / IEEE 299 shielding measurement, leak detection, SE testing and compliance documentation.",
        "Guaranteed shielding effectiveness of ≥ 90 dB at 10 kHz rising to ≥ 120 dB at 100–400 MHz and holding ≥ 100 dB to 40 GHz.",
      ],
      [
        "CyberShield Lifecycle",
        "Preventive maintenance, recalibration and periodic re-certification services.",
        "Nothing glued or welded, so the room can be dismounted without damage — modified, extended or relocated, then re-measured.",
      ],
    ],
    ecosystemNote: "The same shielding effectiveness applies across every product line — see the measured envelope",
    verifyEyebrow: "VERIFIED, NOT ASSUMED",
    verifyTitle: "Performance you don't have to take on faith.",
    verifyBody:
      "Every CyberShield project ends with measured evidence. Shielding effectiveness is tested on site according to international standards, and documented acceptance results are handed over with the room. Detailed performance data is available for your engineering team.",
    standardsIntro: "Measured and validated against",
    standards: [
      ["EN 50147-1", "Shielding effectiveness measurement"],
      ["IEEE 299", "Available as a project option"],
      ["BSI TL-03305 / 03306", "Eavesdropping-protected rooms & IT enclosures"],
      ["NATO SDIP-27 Level A", "TEMPEST design & approval, aligned with NSA 94-106"],
      ["MIL-STD-188-125-1 / -2", "HEMP and IEMI protection, project-specific validation"],
      ["ISO/IEC 27001", "Supports the physical and environmental security controls"],
    ],
    evidenceTitle: "Evidence base",
    evidenceNote:
      "Figures, terminology and threat definitions on this page are read from the publications below. Each entry names the issuing body, the document and the clause the statement comes from.",
    evidenceUsedFor: [
      "Cited for: the E1 HEMP waveform and the 2.5 ns rise time quoted on this page",
      "Cited for: intentional electromagnetic interference treated as its own test discipline",
      "Cited for: the definition and scope of compromising emanations",
      "Cited for: information leakage as a physical and environmental protection control",
      "Cited for: power resilience practice in critical facilities",
      "Cited for: data centre facility and infrastructure terminology",
    ],
    sourceNote: "Source: IEC 61000-2-9, HEMP waveform definition",
    attenuationEyebrow: "GUARANTEED ATTENUATION PERFORMANCE",
    attenuationTitle: "One shielding envelope, verified from 10 kHz to 40 GHz.",
    attenuationBody:
      "Standard-setting PAN type module engineering, measured in accordance with EN 50147-1 and IEEE 299. The same attenuation is engineered into every door, filter, honeycomb vent and feed-through in the boundary.",
    fieldTypes: { magnetic: "Magnetic field", plane: "Plane wave", microwave: "Microwave" },
    attenuationNote:
      "Values describe the guaranteed performance envelope of the standard PAN type system. The scope that applies to your project is confirmed in the specification and by on-site acceptance testing.",
    applicationsEyebrow: "HOW THE ROOM IS CONFIGURED",
    applicationsTitle: "One platform. Four mission profiles.",
    applications: [
      ["Sovereign Compute Vault", "Government & sovereign cloud", "Create a controlled processing zone for classified or nationally sensitive workloads."],
      ["AI & HPC Shielded Zone", "AI labs & hyperscale operators", "Protect high-value models, training data and accelerated compute infrastructure."],
      ["Colocation Shielded Vault", "Colocation providers", "Offer a measurable premium security tier for regulated enterprise customers."],
      ["Mission Continuity Suite", "Defense, finance & communications", "Support continuity architectures exposed to electromagnetic disruption risks."],
    ],
    scenarioEyebrow: "HOW CYBERSHIELD IS USED",
    scenarioTitle: "Three situations we see again and again.",
    scenarioLabels: { challenge: "Challenge", approach: "Approach", outcome: "Outcome" },
    scenarios: [
      [
        "Government & sovereign cloud",
        "A classified zone inside a live facility",
        "A government cloud programme required a secure processing zone for classified workloads inside an existing data centre.",
        "The shielded vault was engineered around live operations, installed without welding and verified on site.",
        "A high-security zone delivered and acceptance-tested without interrupting the surrounding facility.",
      ],
      [
        "AI lab",
        "A measurable boundary around model assets",
        "An AI company needed to protect model weights and training clusters against emanation and interference risks.",
        "A dedicated shielded hall integrated cooling, power and monitoring for high-density racks.",
        "A measured, documented security boundary around the company's most valuable IP.",
      ],
      [
        "Colocation",
        "A premium security tier without rebuilding",
        "A colocation operator wanted a premium tier for regulated customers—without rebuilding the site.",
        "A modular vault was added inside existing white space and packaged as a verified product.",
        "A new revenue stream from a security tier competitors cannot easily match.",
      ],
    ],
    scenarioNote: "Representative scenarios based on typical project profiles.",
    scenarioLink: "See Frankonia project references",
    processEyebrow: "WHAT HAPPENS WHEN YOU REACH OUT",
    processTitle: "From first conversation to verified protection.",
    processSteps: [
      ["01", "Initial consultation", "A specialist reviews your goals, site and constraints. No documentation is required to start."],
      ["02", "Risk & site assessment", "Assets, threat scenarios, ambient RF conditions and facility constraints are assessed; protection requirements are defined together."],
      ["03", "Concept & 3D engineering", "You receive a concept design, CAD/BIM architectural integration and a transparent quotation."],
      ["04", "Precision manufacturing", "PAN modules, RF doors, power and data filters and honeycomb vents are produced in Frankonia's own facilities."],
      ["05", "Installation & verification", "Certified teams assemble the modules without welding; shielding effectiveness and leak detection are measured and documented at handover."],
      ["06", "Operation & support", "Preventive maintenance, periodic re-testing and security re-certification keep the boundary effective over time."],
    ],
    scopeEyebrow: "CLEAR SCOPE FROM DAY ONE",
    scopeTitle: "What Frankonia delivers, and where partners take over.",
    scopeBody:
      "A transparent split of responsibility across the protected room, so nothing inside the boundary is left to assumption.",
    scopeHead: ["Category", "Importance", "Scope & expertise"],
    scopeRows: [
      ["HF shielding performance", "Core", "In-house manufacturing with guaranteed performance"],
      ["Doors & access solutions", "Core", "Precision RF hinged and sliding doors"],
      ["Filtered penetrations", "Core", "Power, data and signal RF filters"],
      ["Ventilation waveguides", "Core", "Precision honeycomb airflow systems"],
      ["EMC testing & certification", "Core", "On-site validation and leak detection"],
      ["Maintenance & service", "Service", "Annual audits and lifecycle support"],
      ["Building security systems", "Partner", "Interface integration with facility security"],
      ["Intrusion alarm systems", "Partner", "Interface integration with room alarm systems"],
      ["Organizational procedures", "Customer", "Best-practice advisory provided by Frankonia"],
    ],
    companyEyebrow: "FRANKONIA AT A GLANCE",
    companyTitle: "The shielding is not new. The application is.",
    companyBody:
      "The Frankonia Group was founded in 1987 as a solution provider for EMC and antenna test laboratories, and is today a specialised technology corporation for anechoic chambers and test systems in the automotive, military and industrial sectors. CyberShield applies that same shielding engineering to data infrastructure. In-house project management, engineering and production — with Frankonia's own installation and service teams — mean the boundary, the doors, the filters and the acceptance measurement all come from one source.",
    companyImageAlt: "Aerial view of the Frankonia Group headquarters and production site in Germany",
    companyGlanceTitle: "Frankonia stands for",
    companyGlance: [
      ["Global presence", "A well-structured network of production, representation and service units, active worldwide."],
      ["Complete solution provider", "Fundamental knowledge across every discipline a shielded facility touches."],
      ["Innovation as method", "Technologies adopted to raise efficiency, outcome and quality alongside customer needs."],
      ["Preferred partner", "Customised, state-of-the-art solutions rather than catalogue products."],
    ],
    companyColumns: [
      [
        "Product advantages",
        [
          ["Modular and self-supporting", "The shielding carries itself, so the parent building takes no additional structural load."],
          ["Identical performance throughout", "The same shielding effectiveness across panels, doors, filters and waveguides — no weak link at the joints."],
          ["Bolted, never glued or welded", "Every joint is a screwed connection with a conductive mesh gasket, so the room stays serviceable for decades."],
          ["Produced in-house", "Prefabricated standard components manufactured by Frankonia rather than sourced and assembled."],
        ],
      ],
      [
        "Customer benefits",
        [
          ["Proven for more than 35 years", "Technologies in service in EMC test laboratories worldwide since 1987."],
          ["Few demands on the building", "The design adapts to existing electricity, statics and building conditions rather than the other way round."],
          ["Relocate, modify, re-sell", "The modular setup can be dismounted and rebuilt elsewhere without damage."],
          ["Simple building interfaces", "Electricity, ventilation, exhaust, data and gas detection cross the boundary through defined, filtered interfaces."],
        ],
      ],
      [
        "Why customers select Frankonia",
        [
          ["One partner, start to finish", "Consultation, manufacturing, installation, acceptance testing and recertification under a single responsibility."],
          ["Building design support", "Frankonia works with architects and contractors early, while shielding decisions are still inexpensive to make."],
          ["No compromise on safety", "Non-combustible, recyclable materials — no carbon, no polyethylene, no glue."],
          ["Project management that finishes", "Experienced teams carry both the detail and the schedule through to handover."],
        ],
      ],
    ],
    faqEyebrow: "COMMON QUESTIONS",
    faqTitle: "The questions every project starts with.",
    faqs: [
      [
        "Can CyberShield be installed in an existing, operating facility?",
        "Yes. Modules pass through standard doors and are bolted together from the inside—no welding or hot work—so installation alongside live operations is a common project profile.",
      ],
      [
        "How long does a project take?",
        "It depends on size and integration scope. As a rough guide, room assembly itself takes weeks, and the full cycle from assessment to verified handover typically runs several months. A concrete schedule is part of the concept proposal.",
      ],
      [
        "What determines the cost?",
        "Size, performance requirements, the number of penetrations (doors, power, data, cooling) and integration complexity. Basic project parameters are enough for a first consultation and estimate.",
      ],
      [
        "Does the shield interfere with cooling, fire safety or daily operations?",
        "No. Airflow, raised floors, fire suppression, lighting and access control are engineered into the boundary from the start.",
      ],
      [
        "What if we need to expand or relocate later?",
        "The system is dismountable without damage. Rooms can be extended, reconfigured or reassembled at a new site—protecting the original investment.",
      ],
    ],
    heroVideoLabel: "3D render of a CyberShield modular shielded data hall being assembled",
    contactEyebrow: "START WITH YOUR RISK PROFILE",
    contactTitle: "Let’s define the right protection boundary.",
    contactBody:
      "Tell us what you need to protect. A Frankonia specialist will review your project and respond by email.",
    contactPhoneLabel: "",
    contactPhone: "",
    labels: {
      type: "Request type",
      name: "Name",
      company: "Company",
      email: "Business email",
      country: "Country / region",
      project: "Project type",
      stage: "Project stage",
      message: "Project requirements",
      consent: "I agree that Frankonia may use this information to respond to my request.",
      submitConsultation: "Prepare consultation email",
      submitQuote: "Prepare quote request email",
    },
    options: {
      newBuild: "New build",
      retrofit: "Retrofit / expansion",
      confidential: "Confidential / to be discussed",
      concept: "Concept / feasibility",
      planning: "Design / specification",
      procurement: "Procurement / tender",
      urgent: "Active project / urgent",
    },
    emailNote:
      "Submitting opens your email application with the project details pre-filled. No form data is stored on this website.",
    footer:
      "CyberShield is a high-assurance engineering solution. Performance, standards and certification scope depend on the agreed project configuration and final validation.",
  },
  de: {
    nav: {
      threats: "Warum CyberShield",
      solution: "Lösung",
      ecosystem: "Produktwelt",
      verification: "Nachweis",
      applications: "Anwendungen",
      process: "Ablauf",
      contact: "Kontakt",
    },
    langLabel: "Sprache wählen",
    menuOpenLabel: "Menü öffnen",
    menuCloseLabel: "Menü schließen",
    alt: {
      facility: "Luftaufnahme eines Rechenzentrums-Campus",
      technician: "Prüfung der Systeme in der Datenhalle",
      engineer: "Inspektion der Racks in einem geschützten Servergang",
    },
    ecosystemAlt: [
      "Modulare PAN-Schirmpaneele als Wand eines Schirmraums, getragen von einer selbsttragenden Stahlkonstruktion",
      "Zweiflügelige HF-Schirmtüren in der Fassade eines Schirmraums",
      "Filterschränke neben einer geöffneten Netzfilterbank an der Schirmgrenze",
      "In eine Schirmwand eingebauter Wabenkamin als Hohlleiter für die Lüftung",
      "Messgeräte auf einem Steuerpult für die Schirmdämpfungsmessung",
      "Halle mit installierten Schirmräumen, Zugangspodest und Treppe",
    ],
    consultation: "Beratung vereinbaren",
    quote: "Angebot anfordern",
    eyebrow: "PHYSISCHE UND ELEKTROMAGNETISCHE SICHERHEIT BEIM BAU VON KI-RECHENZENTREN",
    heroTitle: "KI-Rechenzentren schützen.",
    heroAccent: "Signale einschließen.",
    heroBody:
      "CyberShield schafft eine messbare elektromagnetische Sicherheitsgrenze um geschäftskritische Dateninfrastruktur – geplant, integriert und nachgewiesen als ein durchgängiges System.",
    explore: "System kennenlernen",
    metrics: [
      ["Vor Ort nachgewiesen", "Die Schirmdämpfung wird nach der Montage gemessen – nicht angenommen"],
      ["Schweißfreie Montage", "Verschraubte Module, Montage im laufenden Betrieb ohne Heißarbeiten"],
      ["Auf Veränderung ausgelegt", "Rückbau, Erweiterung oder Umzug des Raums ohne Beschädigung"],
    ],
    proof: ["Engineering-Erfahrung seit 1987", "5 Standorte weltweit", "Präsenz in über 80 Ländern", "Schlüsselfertige Umsetzung"],
    audienceEyebrow: "FÜR WEN CYBERSHIELD GEBAUT WIRD",
    audienceTitle: "Drei Umgebungen, in denen die Schirmgrenze halten muss.",
    audience: [
      [
        "Hyperscale-Cloud- und KI-Rechenzentren",
        "KI-Rechencluster, Quantenhardware und kritische Availability Zones — geschirmt gegen HF-Manipulation und hochenergetische elektromagnetische Bedrohungen.",
      ],
      [
        "Colocation- und Enterprise-Rechenzentren",
        "Ein zertifizierter Schirmtresor als messbare Premium-Sicherheitsstufe für Enterprise-Kunden mit strengen Governance-Anforderungen.",
      ],
      [
        "Verteidigung, Behörden und Finanzinstitute",
        "Souveräne Cloud-Umgebungen, Führungszentralen und Hochfrequenzhandelsplattformen, deren Vertraulichkeit nicht auf Annahmen beruhen darf.",
      ],
    ],
    whyEyebrow: "SICHERHEIT ÜBER SOFTWARE HINAUS",
    whyTitle: "Die Sicherheit eines KI-Rechenzentrums endet nicht mehr auf der Softwareebene.",
    whyBody:
      "Firewalls, Verschlüsselung und Zero Trust halten auf, was über das Netzwerk kommt. Je größer der Wert wird, der in einem KI-Rechenzentrum liegt, desto ernsthafter gehören auch die Wege in die Betrachtung, die das Netzwerk nie berühren – über den physischen Raum und über elektromagnetische Kopplung. Software- und physische Sicherheit müssen heute gemeinsam geplant werden.",
    whyMetric: "2,5 ns",
    whyMetricLabel: "Anstiegszeit des E1-NEMP-Impulses — vorbei, bevor blitzschutzgerechte Ableiter reagiert haben",
    whyValueLabel: "WAS CYBERSHIELD BEITRÄGT",
    whyValueTitle: "Eine Grenze – geplant, gebaut und gemessen aus einer Hand.",
    whyValueBody:
      "Schirmkonstruktion, Türen, Filter, Lüftungs-Hohlleiter und jede Durchführung entstehen als eine durchgängige Grenze, werden schweißfrei im laufenden Betrieb montiert und anschließend vor Ort nach EN 50147-1 / IEEE 299 gemessen und dokumentiert übergeben. Am Ende steht ein Messwert, keine Zusicherung.",
    assetCards: [
      ["Nationales strategisches Gut", "KI-Rechenleistung gilt längst als nationale Fähigkeit. Modellgewichte, Trainingsdaten und souveräne Workloads sind Unternehmenseigentum und staatliches Interesse zugleich – und genau das macht sie zum lohnenden Ziel."],
      ["Bauartbedingt EMV- und NEMP-exponiert", "Dichte GPU-Racks beziehen Dutzende Kilowatt über Schaltelektronik, 400G- und 800G-Interconnects arbeiten mit Störabständen im Millivoltbereich. Mit der Leistungsdichte steigt die Abstrahlung und sinkt die Störfestigkeitsreserve. Schutz, der für einen klassischen Serverraum ausgelegt ist, deckt das nicht ab."],
      ["Schutz vor dem, was draußen ist", "Rechenzentren stehen nahe an Industrie, Sendeanlagen und Verkehrsinfrastruktur. Die HF-Umgebung lässt sich nicht kontrollieren und wird dichter. Vorsätzliche Störbeeinflussung lässt sich aus handelsüblichen Komponenten aufbauen – deshalb gibt es IEC 61000-4-36 als eigene Prüfnorm."],
    ],
    threatEyebrow: "DIE SICHERHEITSEBENE, DIE SOFTWARE NICHT LIEFERN KANN",
    threatTitle: "Nicht jede Bedrohung kommt über das Netzwerk.",
    threatBody:
      "Verschlüsselung und Zero Trust schützen die digitale Ebene. CyberShield adressiert die physische und elektromagnetische Exposition an der Gebäudehülle.",
    threats: [
      ["Kompromittierende Abstrahlung", "Sensible Verarbeitungsvorgänge können über unbeabsichtigte elektromagnetische Signale offengelegt werden – ohne Zugriff auf das Netzwerk.", "Vertraulichkeit gefährdet"],
      ["Vorsätzliche Störbeeinflussung", "Lokale HF- oder elektromagnetische Energie hoher Leistung kann Elektronik, Steuerungen und Kommunikation stören.", "Betriebsunterbrechung"],
      ["EMP-/HEMP-Exposition", "Gestrahlte und geleitete Impulseinwirkungen können kritische Systeme und Kontinuitätsarchitekturen beeinträchtigen.", "Risiko für die Betriebskontinuität"],
      ["Schwachstellen der Schirmgrenze", "Türen, Lüftung sowie Strom-, Daten-, Kühl- und Versorgungsdurchführungen können zum schwächsten Punkt der Abschirmung werden.", "Schutzwirkung reduziert"],
    ],
    impactLabel: "Mögliche Auswirkung",
    systemEyebrow: "MODULARES PAN-SCHIRMSYSTEM",
    systemTitle: "Ein Sicherheitsraum, geplant für die Gegebenheiten Ihres Gebäudes.",
    systemBody:
      "Vorgefertigte PAN-Module passen durch Standardtüren, werden von innen montiert und lassen sich nah an bestehende Wände setzen. Ohne Kleber. Ohne Schweißen. Ohne unumkehrbare Festlegung.",
    features: [
      ["01", "Präzise Montage", "Die Paneele werden alle 75 mm mit definiertem Drehmoment und hochleitfähiger Geflechtdichtung verschraubt."],
      ["02", "Bauliche Integration", "Wendbare Module ergeben glatte Innenflächen für Ausbauwände, Decken und Racks – abgestimmt auf Doppelboden, Brandschutz, Beleuchtung, Kühlung und Zutrittskontrolle."],
      ["03", "Anpassungsfähig ausgelegt", "Beschädigungsfrei demontierbar für Erweiterung, Umbau oder den vollständigen Umzug."],
      ["04", "Durchgängige Schirmgrenze", "Schirmkonstruktion, Türen, Filter, Wabenkamine und Hohlleiter werden als ein System ausgelegt."],
    ],
    verifyEyebrow: "NACHGEWIESEN, NICHT ANGENOMMEN",
    verifyTitle: "Nachgewiesen statt behauptet.",
    verifyBody:
      "Jedes CyberShield-Projekt endet mit einem Messnachweis. Die Schirmdämpfung wird vor Ort nach internationalen Normen geprüft, die dokumentierten Abnahmeergebnisse werden mit dem Raum übergeben. Detaillierte Messdaten stehen Ihrem Engineering-Team zur Verfügung.",
    standardsIntro: "Gemessen und validiert nach",
    standards: [
      ["EN 50147-1", "Messung der Schirmdämpfung"],
      ["IEEE 299", "Als Projektoption verfügbar"],
      ["BSI TL-03305 / 03306", "Abhörsichere Räume und IT-Schirmkabinen"],
      ["NATO SDIP-27 Level A", "TEMPEST-Auslegung und -Zulassung, abgestimmt auf NSA 94-106"],
      ["MIL-STD-188-125-1 / -2", "HEMP- und IEMI-Schutz, projektspezifische Validierung"],
      ["ISO/IEC 27001", "Unterstützt die physischen und umgebungsbezogenen Sicherheitsmaßnahmen"],
    ],
    evidenceTitle: "Quellen und Nachweise",
    evidenceNote:
      "Kennwerte, Begriffe und Bedrohungsdefinitionen dieser Seite stammen aus den unten genannten Veröffentlichungen. Jeder Eintrag nennt die herausgebende Stelle, das Dokument und die Stelle, auf die sich die Aussage stützt.",
    evidenceUsedFor: [
      "Belegt: die E1-NEMP-Wellenform und die auf dieser Seite genannte Anstiegszeit von 2,5 ns",
      "Belegt: absichtliche elektromagnetische Störungen als eigene Prüfdisziplin",
      "Belegt: Definition und Umfang kompromittierender Abstrahlung",
      "Belegt: Informationsabfluss als Maßnahme des physischen und umgebungsbezogenen Schutzes",
      "Belegt: Praxis der Stromversorgungsresilienz in kritischen Anlagen",
      "Belegt: Begriffe zu Rechenzentrumsgebäuden und -infrastruktur",
    ],
    sourceNote: "Quelle: IEC 61000-2-9, Definition der NEMP-Wellenform",
    attenuationEyebrow: "GARANTIERTE SCHIRMDÄMPFUNG",
    attenuationTitle: "Eine Schirmhülle, nachgewiesen von 10 kHz bis 40 GHz.",
    attenuationBody:
      "PAN-Modultechnik, die den Maßstab setzt – gemessen nach EN 50147-1 und IEEE 299. Dieselbe Dämpfung ist in jede Tür, jeden Filter, jeden Wabenkamin und jede Durchführung der Schirmgrenze eingeplant.",
    fieldTypes: { magnetic: "Magnetfeld", plane: "Ebene Welle", microwave: "Mikrowelle" },
    attenuationNote:
      "Die Werte beschreiben den garantierten Leistungsbereich des Standard-PAN-Systems. Der für Ihr Projekt geltende Umfang wird in der Spezifikation und durch die Abnahmemessung vor Ort bestätigt.",
    cutawayEyebrow: "DEN SCHIRMRAUM ERKUNDEN",
    cutawayTitle: "Sehen Sie selbst, was CyberShield in einen Schirmraum einbaut.",
    cutawayBody:
      "Einundzwanzig durchdachte Lösungen bilden die Schirmgrenze — Konstruktion, Durchführungen, Gebäudetechnik und Stromversorgung. Wählen Sie eine aus, um zu sehen, was sie leistet und warum sie dort sitzt.",
    cutawayAlt: "Schnittansicht einer geschirmten CyberShield-Datenhalle mit Konstruktion, Türen, Filtern, Kanälen und Stromversorgungsraum",
    cutawayHint: "Wählen Sie eine Nummer im Schnitt oder ein Bauteil aus der Liste.",
    compareEyebrow: "ENGINEERING JENSEITS DES BRANCHENSTANDARDS",
    compareTitle: "Wo übliche Abschirmung endet, beginnt das Engineering.",
    compareBody:
      "Wie CyberShield gegenüber konventionellen Schirmlösungen in genau den Kriterien abschneidet, die die Langzeitleistung bestimmen.",
    compareHead: ["Leistungskriterium", "Konventionelle Abschirmung", "Frankonia CyberShield"],
    compareRows: [
      [
        "HF-Dämpfungsspektrum",
        "60–80 dB in einem schmalen Frequenzbereich",
        "Spitzenwert ≥ 120 dB (100–400 MHz) und ≥ 100 dB von 10 kHz bis 40 GHz",
      ],
      [
        "Paneelkonstruktion",
        "Dünnes Blech oder geschweißte Stahlkonstruktion",
        "PAN-Module aus 2,0 mm verzinktem Stahlblech, alle 75 mm mit definiertem Drehmoment verschraubt",
      ],
      [
        "Fügetechnik und Abdichtung",
        "Leitfähiger Kleber oder durchgehende Schweißnaht",
        "Hochleitfähige Geflechtdichtung – ohne Kleber, ohne Schweißen, zu 100 % wiederverwendbar",
      ],
      [
        "Luftführung und Akustik",
        "Einfache Ausschnitte mit Wärmeverlust und HF-Leckpfaden",
        "Wabenkamine als Hohlleiter und Schallabsorption nach ISO 354 (α = 0,65)",
      ],
      [
        "Gebäudeintegration",
        "Hohe statische Lasten in einer dauerhaften Struktur",
        "Selbsttragende oder erdbebensichere Stahlkonstruktion, beschädigungsfrei rückbaubar",
      ],
    ],
    ecosystemEyebrow: "EINE DURCHGÄNGIGE SCHIRMGRENZE",
    ecosystemTitle: "Sechs Produktlinien. Eine lückenlose Schirmhülle.",
    ecosystemBody:
      "Jede Komponente wird als Teil derselben Schirmhülle ausgelegt – so geht an Fugen, Türen und Durchführungen keine Leistung verloren.",
    ecosystemCards: [
      [
        "CyberShield Structure",
        "Vorgefertigtes PAN-Modulsystem aus 2,0 mm verzinktem Stahlblech für Wände, Decken und Böden.",
        "Stahlblech nach DIN 17162 / EN 10142 DX 52 D+Z, Verzinkung 275 g/m², alle 75 mm verschraubt auf selbsttragender Stahlkonstruktion.",
      ],
      [
        "CyberShield Access",
        "Schwerlast-Schiebe- und -Drehtüren in HF-Ausführung, hochdämpfende HF-Fenster und integrierte Zutrittsüberwachung.",
        "Umlaufendes Dreifach-Kontaktsystem mit leitfähigen Kontaktfedern, MTBF 20.000 Öffnungen, Schwelle 150 mm im Standard.",
      ],
      [
        "CyberShield Connectivity",
        "Leistungsstarke Netzfilter, Lichtwellenleiter-Durchführungen als Hohlleiter und HF-Signalsperren.",
        "Strom-, Daten- und Signaldurchführungen werden auf dieselbe Dämpfung gefiltert wie die Wand, die sie queren — Medien bis DN200.",
      ],
      [
        "CyberShield Air & Waveguides",
        "Wabenkamine, Akustikpaneele (ISO 354) und geschirmte Hohlleiter für Flüssigkühlung und Medienversorgung.",
        "Wabenkamine unterhalb der Grenzfrequenz lassen Luft durch, aber keine HF; Akustikeinlagen dämpfen nach ISO 354, αw = 0,65 (MH).",
      ],
      [
        "CyberShield Validation",
        "Schirmdämpfungsmessung nach EN 50147-1 / IEEE 299, Lecksuche, SE-Prüfung und Konformitätsdokumentation.",
        "Garantierte Schirmdämpfung von ≥ 90 dB bei 10 kHz über ≥ 120 dB bei 100–400 MHz bis ≥ 100 dB bei 40 GHz.",
      ],
      [
        "CyberShield Lifecycle",
        "Vorbeugende Wartung, Nachkalibrierung und periodische Rezertifizierung.",
        "Nichts ist geklebt oder geschweißt: Der Raum lässt sich beschädigungsfrei demontieren, ändern, erweitern oder versetzen — und neu vermessen.",
      ],
    ],
    ecosystemNote: "Dieselbe Schirmdämpfung gilt für jede Produktlinie — zur gemessenen Kurve",
    applicationsEyebrow: "WIE DER RAUM KONFIGURIERT WIRD",
    applicationsTitle: "Eine Plattform. Vier Einsatzprofile.",
    applications: [
      ["Sovereign Compute Vault", "Behörden und souveräne Cloud", "Schafft eine kontrollierte Verarbeitungszone für Verschlusssachen und national sensible Workloads."],
      ["AI & HPC Shielded Zone", "KI-Labore und Hyperscale-Betreiber", "Schützt hochwertige Modelle, Trainingsdaten und beschleunigte Recheninfrastruktur."],
      ["Colocation Shielded Vault", "Colocation-Anbieter", "Bietet regulierten Unternehmenskunden eine messbare Premium-Sicherheitsstufe."],
      ["Mission Continuity Suite", "Verteidigung, Finanzwesen und Kommunikation", "Unterstützt Kontinuitätsarchitekturen mit Risiko elektromagnetischer Störungen."],
    ],
    scenarioEyebrow: "SO WIRD CYBERSHIELD EINGESETZT",
    scenarioTitle: "Drei Situationen, die uns immer wieder begegnen.",
    scenarioLabels: { challenge: "Ausgangslage", approach: "Vorgehen", outcome: "Ergebnis" },
    scenarios: [
      [
        "Behörden und souveräne Cloud",
        "Eine Verschlusssachenzone im laufenden Betrieb",
        "Ein staatliches Cloud-Programm benötigte eine sichere Verarbeitungszone für eingestufte Workloads in einem bestehenden Rechenzentrum.",
        "Der Schirmraum wurde um den laufenden Betrieb herum geplant, schweißfrei montiert und vor Ort nachgewiesen.",
        "Eine Hochsicherheitszone, übergeben und abgenommen ohne Unterbrechung des umgebenden Betriebs.",
      ],
      [
        "KI-Labor",
        "Eine messbare Grenze um die Modell-Assets",
        "Ein KI-Unternehmen musste Modellgewichte und Trainingscluster gegen Abstrahlung und Störbeeinflussung schützen.",
        "Eine dedizierte Schirmhalle integrierte Kühlung, Stromversorgung und Monitoring für hochdichte Racks.",
        "Eine gemessene, dokumentierte Sicherheitsgrenze um das wertvollste geistige Eigentum des Unternehmens.",
      ],
      [
        "Colocation",
        "Eine Premium-Sicherheitsstufe ohne Neubau",
        "Ein Colocation-Betreiber wollte eine Premiumstufe für regulierte Kunden – ohne den Standort umzubauen.",
        "Ein modularer Schirmraum wurde in bestehender Weißfläche ergänzt und als nachgewiesenes Produkt paketiert.",
        "Eine neue Erlösquelle durch eine Sicherheitsstufe, die Wettbewerber nicht ohne Weiteres nachbilden können.",
      ],
    ],
    scenarioNote: "Repräsentative Szenarien auf Basis typischer Projektprofile.",
    scenarioLink: "Frankonia Projektreferenzen ansehen",
    processEyebrow: "WAS NACH IHRER ANFRAGE PASSIERT",
    processTitle: "Vom ersten Gespräch zum nachgewiesenen Schutz.",
    processSteps: [
      ["01", "Erstberatung", "Ein Spezialist prüft Ihre Ziele, den Standort und die Randbedingungen. Für den Start sind keine Unterlagen erforderlich."],
      ["02", "Risiko- und Standortanalyse", "Schutzgüter, Bedrohungsszenarien, die HF-Umgebung und die baulichen Randbedingungen werden bewertet; die Schutzanforderungen definieren wir gemeinsam."],
      ["03", "Konzept und 3D-Engineering", "Sie erhalten ein Konzeptdesign, die bauliche Integration in CAD/BIM und ein transparentes Angebot."],
      ["04", "Präzisionsfertigung", "PAN-Module, HF-Türen, Netz- und Datenfilter sowie Wabenkamine entstehen in den eigenen Fertigungsstätten von Frankonia."],
      ["05", "Montage und Nachweis", "Zertifizierte Teams montieren die Module schweißfrei; Schirmdämpfung und Lecksuche werden gemessen und zur Übergabe dokumentiert."],
      ["06", "Betrieb und Support", "Vorbeugende Wartung, wiederkehrende Messungen und Rezertifizierung erhalten die Schutzwirkung dauerhaft."],
    ],
    scopeEyebrow: "KLARER LEISTUNGSUMFANG VON ANFANG AN",
    scopeTitle: "Was Frankonia liefert – und wo Partner übernehmen.",
    scopeBody:
      "Eine transparente Aufteilung der Verantwortung im gesamten Schutzraum, damit innerhalb der Schirmgrenze nichts dem Zufall überlassen bleibt.",
    scopeHead: ["Kategorie", "Bedeutung", "Umfang und Kompetenz"],
    scopeRows: [
      ["HF-Schirmdämpfung", "Kern", "Eigenfertigung mit garantierter Leistung"],
      ["Türen und Zutrittslösungen", "Kern", "Präzise HF-Dreh- und -Schiebetüren"],
      ["Gefilterte Durchführungen", "Kern", "HF-Filter für Strom, Daten und Signale"],
      ["Lüftungs-Hohlleiter", "Kern", "Präzise Wabenkamin-Luftführung"],
      ["EMV-Prüfung und Zertifizierung", "Kern", "Nachweis vor Ort und Lecksuche"],
      ["Wartung und Service", "Service", "Jährliche Audits und Lifecycle-Support"],
      ["Gebäudesicherheitstechnik", "Partner", "Schnittstellenintegration zur Gebäudesicherheit"],
      ["Einbruchmeldeanlagen", "Partner", "Schnittstellenintegration zu Raummeldeanlagen"],
      ["Organisatorische Verfahren", "Kunde", "Beratung zu Best Practices durch Frankonia"],
    ],
    companyEyebrow: "FRANKONIA AUF EINEN BLICK",
    companyTitle: "Die Abschirmung ist nicht neu. Die Anwendung schon.",
    companyBody:
      "Die Frankonia Group wurde 1987 als Lösungsanbieter für EMV- und Antennenmesslabore gegründet und ist heute ein spezialisiertes Technologieunternehmen für Absorberhallen und Prüfsysteme in der Automobil-, Wehr- und Industrietechnik. CyberShield überträgt dieselbe Schirmtechnik auf Dateninfrastruktur. Projektmanagement, Engineering und Fertigung im eigenen Haus — dazu eigene Montage- und Serviceteams — sorgen dafür, dass Schirmgrenze, Türen, Filter und Abnahmemessung aus einer Hand kommen.",
    companyImageAlt: "Luftaufnahme des Stammsitzes und Produktionsstandorts der Frankonia Group in Deutschland",
    companyGlanceTitle: "Wofür Frankonia steht",
    companyGlance: [
      ["Weltweite Präsenz", "Ein gut strukturiertes Netz aus Produktions-, Vertriebs- und Serviceeinheiten, weltweit tätig."],
      ["Kompletter Lösungsanbieter", "Grundlagenwissen in jeder Disziplin, die eine geschirmte Anlage berührt."],
      ["Innovation als Methode", "Technologien, die Effizienz, Ergebnis und Qualität entlang der Kundenanforderungen steigern."],
      ["Bevorzugter Partner", "Maßgeschneiderte Lösungen auf dem Stand der Technik statt Katalogware."],
    ],
    companyColumns: [
      [
        "Produktvorteile",
        [
          ["Modular und selbsttragend", "Die Abschirmung trägt sich selbst, das Bestandsgebäude nimmt keine zusätzlichen Lasten auf."],
          ["Durchgängig gleiche Leistung", "Dieselbe Schirmdämpfung über Paneele, Türen, Filter und Hohlleiter hinweg — keine Schwachstelle an den Übergängen."],
          ["Geschraubt, nie geklebt oder geschweißt", "Jede Fuge ist eine Schraubverbindung mit leitfähiger Netzdichtung, der Raum bleibt jahrzehntelang wartbar."],
          ["Fertigung im eigenen Haus", "Vorgefertigte Standardkomponenten aus Frankonia-Produktion statt zugekaufter und montierter Teile."],
        ],
      ],
      [
        "Kundennutzen",
        [
          ["Seit mehr als 35 Jahren bewährt", "Technologien, die seit 1987 in EMV-Prüflaboren weltweit im Einsatz sind."],
          ["Geringe Anforderungen an das Gebäude", "Die Planung richtet sich nach vorhandener Elektrik, Statik und Bausituation — nicht umgekehrt."],
          ["Versetzen, ändern, weiterverkaufen", "Der modulare Aufbau lässt sich beschädigungsfrei demontieren und andernorts wieder aufbauen."],
          ["Einfache Gebäudeschnittstellen", "Strom, Lüftung, Abluft, Daten und Gaswarnung queren die Grenze über definierte, gefilterte Schnittstellen."],
        ],
      ],
      [
        "Warum Kunden Frankonia wählen",
        [
          ["Ein Partner von Anfang bis Ende", "Beratung, Fertigung, Montage, Abnahmemessung und Rezertifizierung in einer Verantwortung."],
          ["Unterstützung bei der Gebäudeplanung", "Frankonia arbeitet früh mit Architekten und Fachplanern, solange Schirmentscheidungen noch günstig sind."],
          ["Keine Kompromisse bei der Sicherheit", "Nicht brennbare, recycelbare Materialien — kein Kohlenstoff, kein Polyethylen, kein Kleber."],
          ["Projektmanagement, das zu Ende führt", "Erfahrene Teams tragen Detail und Termin bis zur Übergabe."],
        ],
      ],
    ],
    faqEyebrow: "HÄUFIGE FRAGEN",
    faqTitle: "Die Fragen, mit denen jedes Projekt beginnt.",
    faqs: [
      [
        "Lässt sich CyberShield in einem bestehenden, laufenden Rechenzentrum installieren?",
        "Ja. Die Module passen durch Standardtüren und werden von innen verschraubt – ohne Schweißen, ohne Heißarbeiten. Die Montage parallel zum laufenden Betrieb ist ein typisches Projektprofil.",
      ],
      [
        "Wie lange dauert ein Projekt?",
        "Das hängt von Größe und Integrationsumfang ab. Als Orientierung: Die Raummontage selbst dauert Wochen, der gesamte Ablauf von der Analyse bis zur nachgewiesenen Übergabe in der Regel mehrere Monate. Ein konkreter Terminplan ist Teil des Konzeptangebots.",
      ],
      [
        "Wovon hängen die Kosten ab?",
        "Von Größe, Leistungsanforderung, Anzahl der Durchführungen (Türen, Strom, Daten, Kühlung) und der Integrationskomplexität. Für ein erstes Gespräch und eine Ersteinschätzung genügen die grundlegenden Projektparameter.",
      ],
      [
        "Beeinträchtigt die Abschirmung Kühlung, Brandschutz oder den täglichen Betrieb?",
        "Nein. Luftführung, Doppelboden, Brandbekämpfung, Beleuchtung und Zutrittskontrolle werden von Beginn an in die Schirmgrenze eingeplant.",
      ],
      [
        "Was passiert, wenn wir später erweitern oder umziehen?",
        "Das System ist beschädigungsfrei demontierbar. Räume lassen sich erweitern, umkonfigurieren oder an einem neuen Standort wieder aufbauen – die ursprüngliche Investition bleibt geschützt.",
      ],
    ],
    heroVideoLabel: "3D-Rendering einer modularen CyberShield-Schirmhalle während der Montage",
    contactEyebrow: "BEGINNEN SIE MIT IHREM RISIKOPROFIL",
    contactTitle: "Definieren wir die passende Schutzgrenze.",
    contactBody:
      "Sagen Sie uns, was Sie schützen müssen. Ein Frankonia-Spezialist prüft Ihr Projekt und antwortet per E-Mail.",
    contactPhoneLabel: "Direkt aus Heideck",
    contactPhone: "+49 9177 98-500",
    labels: {
      type: "Art der Anfrage",
      name: "Name",
      company: "Unternehmen",
      email: "Geschäftliche E-Mail",
      country: "Land / Region",
      project: "Projektart",
      stage: "Projektphase",
      message: "Projektanforderungen",
      consent: "Ich bin damit einverstanden, dass Frankonia diese Angaben zur Beantwortung meiner Anfrage verwendet.",
      submitConsultation: "Beratungs-E-Mail vorbereiten",
      submitQuote: "Angebots-E-Mail vorbereiten",
    },
    options: {
      newBuild: "Neubau",
      retrofit: "Nachrüstung / Erweiterung",
      confidential: "Vertraulich / noch zu besprechen",
      concept: "Konzept / Machbarkeit",
      planning: "Planung / Spezifikation",
      procurement: "Beschaffung / Ausschreibung",
      urgent: "Laufendes Projekt / dringend",
    },
    emailNote:
      "Beim Absenden öffnet sich Ihr E-Mail-Programm mit den vorausgefüllten Projektangaben. Auf dieser Website werden keine Formulardaten gespeichert.",
    footer:
      "CyberShield ist eine Engineering-Lösung mit hohem Sicherheitsanspruch. Leistung, Normenbezug und Zertifizierungsumfang richten sich nach der vereinbarten Projektkonfiguration und der abschließenden Validierung.",
  },
  ko: {
    nav: {
      threats: "필요성",
      solution: "솔루션",
      ecosystem: "제품 구성",
      verification: "검증",
      applications: "적용 분야",
      process: "도입 절차",
      contact: "문의",
    },
    langLabel: "언어 선택",
    menuOpenLabel: "메뉴 열기",
    menuCloseLabel: "메뉴 닫기",
    alt: {
      facility: "데이터센터 시설 단지의 항공 전경",
      technician: "데이터홀 내부에서 시스템을 검증하는 기술자",
      engineer: "보호 구역 서버 통로에서 랙을 점검하는 엔지니어",
    },
    ecosystemAlt: [
      "자립형 강구조에 지지된 차폐실 벽체의 모듈형 PAN 차폐 패널",
      "차폐실 외벽에 설치된 양문형 RF 차폐 도어",
      "차폐 경계에 설치된 필터 캐비닛과 개방된 전원 라인 필터 뱅크",
      "차폐 벽체에 설치된 허니콤 환기 도파관 패널",
      "차폐 성능 측정에 사용되는 제어 데스크의 계측 장비",
      "출입 플랫폼과 계단을 갖춘 차폐실 설치 현장 전경",
    ],
    consultation: "상담 예약",
    quote: "견적 요청",
    eyebrow: "AI 데이터센터 구축을 위한 물리·전자기 보안",
    heroTitle: "AI 데이터센터를 보호하고,",
    heroAccent: "신호를 경계 안에 가두십시오.",
    heroBody:
      "CyberShield는 미션 크리티컬 데이터 인프라 주변에 측정 가능한 전자기 보안 경계를 구축합니다. 설계부터 통합, 현장 검증까지 하나의 완전한 시스템으로 제공합니다.",
    explore: "시스템 살펴보기",
    metrics: [
      ["현장 측정 검증", "설치 후 차폐 성능을 현장에서 측정합니다 — 추정이 아닌 증거"],
      ["무용접 모듈 조립", "화기 작업 없는 볼트 체결 — 운영 중인 시설과 병행 시공"],
      ["확장·이전 가능", "손상 없이 해체해 확장·변경·이전에 재사용"],
    ],
    proof: ["1987년부터 축적한 엔지니어링", "글로벌 5개 거점", "80개국 이상 공급 네트워크", "턴키 제공"],
    audienceEyebrow: "CYBERSHIELD가 지키는 현장",
    audienceTitle: "차폐 경계가 반드시 유지되어야 하는 세 가지 환경.",
    audience: [
      [
        "하이퍼스케일 클라우드 · AI 데이터센터",
        "AI 연산 클러스터, 양자 하드웨어, 핵심 가용 영역을 RF 조작과 고출력 전자기 위협으로부터 차폐합니다.",
      ],
      [
        "코로케이션 · 엔터프라이즈 데이터센터",
        "엄격한 거버넌스 요건을 가진 기업 고객에게 인증된 차폐 구역을 측정 가능한 프리미엄 보안 등급으로 제공합니다.",
      ],
      [
        "국방 · 정부 · 금융기관",
        "소버린 클라우드, 지휘통제 센터, 고빈도 거래 플랫폼처럼 기밀성을 가정에 맡길 수 없는 환경을 지원합니다.",
      ],
    ],
    whyEyebrow: "소프트웨어를 넘어선 보안",
    whyTitle: "AI 데이터센터의 보안은 이제 소프트웨어에서 끝나지 않습니다.",
    whyBody:
      "방화벽과 암호화, 제로 트러스트는 네트워크를 통해 들어오는 위협을 막습니다. 그러나 AI 데이터센터가 품는 자산의 가치가 커지면서, 네트워크를 거치지 않고 물리 공간과 전자기 결합으로 접근하는 경로까지 검토 대상이 되었습니다. 이제 소프트웨어 보안과 물리적 보안은 함께 설계되어야 합니다.",
    whyMetric: "2.5 ns",
    whyMetricLabel: "E1 HEMP 펄스 상승 시간 — 낙뢰 기준 서지 보호기가 반응하기 전에 끝납니다",
    whyValueLabel: "CYBERSHIELD의 핵심 가치",
    whyValueTitle: "설계부터 시공, 측정까지 하나의 책임으로 묶인 단일 경계.",
    whyValueBody:
      "차폐 구조와 도어, 필터, 환기 도파관, 모든 관통부를 하나의 연속된 경계로 설계하고, 운영을 멈추지 않는 무용접 방식으로 시공한 뒤, EN 50147-1 / IEEE 299에 따라 현장에서 측정해 문서로 인도합니다. 마지막에 남는 것은 약속이 아니라 측정값입니다.",
    assetCards: [
      ["국가적 전략자산", "AI 컴퓨팅 역량은 이미 국가 경쟁력의 기반으로 다뤄집니다. 모델 가중치와 학습 데이터, 소버린 워크로드는 기업 자산인 동시에 국가적 보호 대상이며, 바로 그 점이 표적이 되는 이유이기도 합니다."],
      ["EMC·EMP에 취약한 구조", "고밀도 GPU 랙은 수십 킬로와트를 스위칭 전자장비로 공급받고, 400G·800G 인터커넥트는 밀리볼트 단위의 잡음 여유로 동작합니다. 전력 밀도가 올라갈수록 방사는 강해지고 내성 여유는 줄어듭니다. 일반 전산실 기준으로 설계된 보호로는 이 조건을 감당하지 못합니다."],
      ["외부 전파 방호", "데이터센터는 대개 산업 지역과 송신 시설, 교통 인프라 인근에 세워집니다. 주변 전파 환경은 통제할 수 없고 갈수록 혼잡해집니다. 의도적 전자기 간섭 장비는 상용 부품으로도 구성할 수 있어, IEC 61000-4-36이 별도의 시험 규격으로 존재합니다."],
    ],
    threatEyebrow: "소프트웨어만으로 제공할 수 없는 보안 계층",
    threatTitle: "모든 위협이 네트워크를 통해 들어오지는 않습니다.",
    threatBody:
      "암호화와 제로 트러스트는 디지털 영역을 보호합니다. CyberShield는 시설 경계에서 발생하는 물리적·전자기적 노출을 통제합니다.",
    threats: [
      ["전자기 정보 방사", "네트워크에 접촉하지 않고도 비의도적 전자기 신호를 통해 민감한 처리 활동이 노출될 수 있습니다.", "기밀성 노출"],
      ["의도적 전자기 간섭", "국소 고출력 RF 또는 전자기 에너지는 전자장비, 제어 및 통신을 교란할 수 있습니다.", "서비스 중단"],
      ["EMP / HEMP 노출", "방사 및 전도성 펄스 영향은 중요 시스템과 업무 연속성 체계를 위협할 수 있습니다.", "업무 연속성 위험"],
      ["경계 구성요소 취약점", "도어, 환기, 전원, 데이터, 냉각 및 설비 관통부가 차폐 경계의 가장 약한 경로가 될 수 있습니다.", "보호 성능 저하"],
    ],
    impactLabel: "잠재 영향",
    systemEyebrow: "모듈형 PAN 차폐 시스템",
    systemTitle: "시설의 실제 조건에 맞춰 설계하는 보안 공간.",
    systemBody:
      "사전 제작된 PAN 모듈은 표준 건물 출입문으로 반입할 수 있고 내부에서 조립되며 기존 벽에 근접 설치할 수 있습니다. 접착제와 용접 없이 확장과 이전이 가능합니다.",
    features: [
      ["01", "정밀 조립", "패널을 75 mm 간격으로 규정 토크로 체결하고, 전도성 메시 개스킷으로 접합부를 밀봉합니다."],
      ["02", "건축 통합", "양면 사용이 가능한 모듈로 평탄한 내부 마감면을 확보하고, 이중바닥·랙·소방·조명·냉각·출입통제를 함께 설계에 반영합니다."],
      ["03", "확장 가능한 구조", "손상 없이 해체해 확장, 변경 또는 전체 이전에 재사용할 수 있습니다."],
      ["04", "완전한 보호 경계", "차폐 구조, 도어, 필터, 허니콤 및 도파관을 하나의 시스템으로 구성합니다."],
    ],
    cutawayEyebrow: "차폐실 구석구석 살펴보기",
    cutawayTitle: "CyberShield가 제공하는 다양한 솔루션을 직접 확인할 수 있습니다.",
    cutawayBody:
      "구조, 관통부, 건축설비, 전력까지 차폐 경계를 이루는 21가지 솔루션을 도면에서 바로 살펴보세요. 궁금한 항목을 선택하면 어떤 역할을 하고 왜 필요한지 설명해 드립니다.",
    cutawayAlt: "구조, 도어, 필터, 덕트, 전력실을 포함한 CyberShield 차폐 데이터홀 단면도",
    cutawayHint: "도면의 번호 또는 목록에서 궁금한 항목을 선택해 보세요.",
    compareEyebrow: "업계 기준을 넘어서는 엔지니어링",
    compareTitle: "일반적인 차폐가 멈추는 지점에서 엔지니어링이 시작됩니다.",
    compareBody:
      "장기 성능을 좌우하는 기술 항목에서 CyberShield가 일반적인 차폐 방식과 어떻게 다른지 비교했습니다.",
    compareHead: ["성능 항목", "일반적인 차폐 방식", "Frankonia CyberShield"],
    compareRows: [
      [
        "RF 차폐 스펙트럼",
        "좁은 주파수 대역에서 60~80 dB",
        "100~400 MHz 최대 120 dB 이상, 10 kHz~40 GHz 전 대역 100 dB 이상",
      ],
      [
        "차폐 패널 엔지니어링",
        "얇은 강판 또는 용접 강구조",
        "2.0 mm 아연도금 강판 PAN 모듈, 75 mm 간격 규정 토크 체결",
      ],
      [
        "접합·실링 기술",
        "전도성 접착제 또는 연속 용접",
        "고전도성 메시 개스킷 — 접착제·용접 없이 100 % 재사용",
      ],
      [
        "공조·음향 효율",
        "단순 개구부로 인한 열손실과 RF 누설 경로",
        "허니콤 도파관 환기 및 ISO 354 흡음 성능 (α = 0.65)",
      ],
      [
        "건축 통합",
        "큰 고정하중을 갖는 영구 구조물",
        "자립형 또는 내진 강구조, 손상 없이 해체 가능",
      ],
    ],
    ecosystemEyebrow: "하나의 연속된 차폐 경계",
    ecosystemTitle: "여섯 개의 제품군, 누설 없는 하나의 차폐 경계.",
    ecosystemBody:
      "모든 구성요소를 동일한 차폐 외피의 일부로 설계합니다. 접합부, 도어, 관통부에서 성능이 손실되지 않습니다.",
    ecosystemCards: [
      [
        "CyberShield Structure",
        "벽체·천장·바닥을 구성하는 2.0 mm 아연도금 강판 PAN 모듈 시스템.",
        "DIN 17162 / EN 10142 DX 52 D+Z 강판에 275 g/m² 아연도금, 자립형 강구조에 75 mm 간격 볼팅 체결.",
      ],
      [
        "CyberShield Access",
        "고하중 슬라이딩·힌지 RF 도어, 고차폐 RF 윈도우 및 출입 모니터링 연동.",
        "전주형 3중 접점 구조에 전도성 스프링 적용, MTBF 20,000회 개폐, 표준 문턱 높이 150 mm.",
      ],
      [
        "CyberShield Connectivity",
        "고성능 전원 라인 필터, 광케이블 도파관 관통부 및 RF 신호 억제 장치.",
        "전원·데이터·신호 관통부를 통과하는 벽체와 동일한 차폐 수준으로 필터링하며, 매체 관통부는 DN200까지 지원합니다.",
      ],
      [
        "CyberShield Air & Waveguides",
        "허니콤 환기 패널, 흡음 패널(ISO 354), 액체냉각·설비용 차폐 도파관.",
        "차단 주파수 이하 허니콤 도파관이 공기는 통과시키고 RF는 차단하며, 흡음 인레이는 ISO 354 기준 αw = 0.65 (MH)입니다.",
      ],
      [
        "CyberShield Validation",
        "EN 50147-1 / IEEE 299 차폐 성능 측정, 누설 탐지, SE 시험 및 규격 문서화.",
        "10 kHz에서 90 dB 이상, 100–400 MHz에서 120 dB 이상, 40 GHz까지 100 dB 이상의 차폐 성능을 보장합니다.",
      ],
      [
        "CyberShield Lifecycle",
        "예방 정비, 재교정 및 주기적 재인증 서비스.",
        "접착도 용접도 없어 손상 없이 해체할 수 있습니다. 변경·확장·이전 후 다시 측정해 성능을 확인합니다.",
      ],
    ],
    ecosystemNote: "모든 제품군에 동일한 차폐 성능이 적용됩니다 — 측정된 성능 곡선 보기",
    verifyEyebrow: "추정이 아닌 검증",
    verifyTitle: "약속이 아니라 측정으로 증명합니다.",
    verifyBody:
      "모든 CyberShield 프로젝트는 측정된 증거로 완료됩니다. 차폐 성능은 국제 표준에 따라 설치 후 현장에서 시험하고, 문서화된 인수 결과를 공간과 함께 인도합니다. 상세 성능 데이터는 고객사 엔지니어링 팀에 제공합니다.",
    standardsIntro: "적용 표준",
    standards: [
      ["EN 50147-1", "차폐효과 측정 표준"],
      ["IEEE 299", "프로젝트 옵션으로 제공"],
      ["BSI TL-03305 / 03306", "도청 방지실 및 IT 차폐실 규격"],
      ["NATO SDIP-27 Level A", "TEMPEST 설계·승인, NSA 94-106 정합"],
      ["MIL-STD-188-125-1 / -2", "HEMP·IEMI 방호, 프로젝트별 검증"],
      ["ISO/IEC 27001", "물리적·환경적 보안 통제 항목 지원"],
    ],
    evidenceTitle: "근거 자료",
    evidenceNote:
      "이 페이지의 수치, 용어, 위협 정의는 아래 자료에서 인용했습니다. 각 항목에 발행 기관, 문서, 해당 내용을 인용한 조항을 표기했습니다.",
    evidenceUsedFor: [
      "인용 근거: 이 페이지에 표기된 E1 HEMP 파형과 2.5 ns 상승 시간",
      "인용 근거: 의도적 전자기 방해(IEMI)를 독립된 시험 분야로 규정",
      "인용 근거: 정보 누설 방사(compromising emanations)의 정의와 범위",
      "인용 근거: 물리적·환경적 보호 통제 항목으로서의 정보 누설",
      "인용 근거: 중요 시설의 전력 복원력 확보 방안",
      "인용 근거: 데이터센터 시설 및 인프라 관련 용어",
    ],
    sourceNote: "출처: IEC 61000-2-9, HEMP 파형 정의",
    attenuationEyebrow: "보증 차폐 성능",
    attenuationTitle: "하나의 차폐 외피, 10 kHz에서 40 GHz까지 검증합니다.",
    attenuationBody:
      "업계 기준을 선도하는 PAN 타입 모듈 시스템의 차폐 성능을 EN 50147-1 및 IEEE 299에 따라 측정합니다. 경계를 구성하는 모든 도어, 필터, 허니콤 환기구, 관통부에 동일한 차폐 성능을 설계 반영합니다.",
    fieldTypes: { magnetic: "자계", plane: "평면파", microwave: "마이크로파" },
    attenuationNote:
      "표준 PAN 타입 시스템의 보증 성능 범위입니다. 프로젝트에 적용되는 범위는 사양서와 현장 인수 시험을 통해 확정됩니다.",
    applicationsEyebrow: "차폐실 구성 방식",
    applicationsTitle: "하나의 플랫폼, 네 가지 미션 프로파일.",
    applications: [
      ["Sovereign Compute Vault", "정부·소버린 클라우드", "기밀 또는 국가 중요 워크로드를 위한 통제된 처리 구역을 구축합니다."],
      ["AI & HPC Shielded Zone", "AI 연구소·하이퍼스케일", "고가치 모델, 학습 데이터 및 가속 컴퓨팅 인프라를 보호합니다."],
      ["Colocation Shielded Vault", "코로케이션 사업자", "규제 산업 고객을 위한 측정 가능한 프리미엄 보안 등급을 제공합니다."],
      ["Mission Continuity Suite", "국방·금융·통신", "전자기 교란 위험에 노출된 중요 업무의 연속성 아키텍처를 지원합니다."],
    ],
    scenarioEyebrow: "CyberShield 활용 방식",
    scenarioTitle: "반복해서 마주하는 세 가지 상황.",
    scenarioLabels: { challenge: "과제", approach: "접근", outcome: "결과" },
    scenarios: [
      [
        "정부·소버린 클라우드",
        "운영 중인 시설 안의 기밀 처리 구역",
        "정부 클라우드 프로그램이 기존 데이터센터 내부에 기밀 워크로드용 보안 구역을 요구했습니다.",
        "운영을 유지한 채 무용접 방식으로 차폐 볼트를 설계·시공하고 현장에서 성능을 검증했습니다.",
        "주변 시설 중단 없이 고보안 구역을 구축하고 인수 시험까지 완료했습니다.",
      ],
      [
        "AI 연구소",
        "모델 자산을 둘러싼 측정 가능한 경계",
        "AI 기업이 모델 가중치와 학습 클러스터를 정보 방사와 간섭 위험으로부터 보호해야 했습니다.",
        "고밀도 랙을 위한 냉각·전원·모니터링을 통합한 전용 차폐 홀을 구축했습니다.",
        "기업의 가장 가치 있는 IP 주변에 측정되고 문서화된 보안 경계를 확보했습니다.",
      ],
      [
        "코로케이션",
        "재건축 없이 만든 프리미엄 보안 등급",
        "코로케이션 사업자가 시설 재구축 없이 규제 산업 고객용 프리미엄 등급을 원했습니다.",
        "기존 상면 내부에 모듈형 볼트를 증설하고 검증된 상품으로 패키지화했습니다.",
        "경쟁사가 따라오기 어려운 보안 등급으로 신규 매출원을 확보했습니다.",
      ],
    ],
    scenarioNote: "일반적인 프로젝트 유형을 바탕으로 구성한 예시입니다.",
    scenarioLink: "Frankonia 프로젝트 레퍼런스 보기",
    processEyebrow: "문의하시면 이렇게 진행됩니다",
    processTitle: "첫 상담부터 검증된 보호까지.",
    processSteps: [
      ["01", "초기 상담", "전문가가 목표, 현장 조건, 제약을 함께 검토합니다. 준비 서류 없이 시작할 수 있습니다."],
      ["02", "위험·현장 진단", "자산, 위협 시나리오, 주변 RF 환경, 시설 조건을 평가하고 보호 요구사항을 함께 정의합니다."],
      ["03", "개념 설계·3D 엔지니어링", "개념 설계안, CAD/BIM 기반 건축 통합 계획, 투명한 견적을 제공합니다."],
      ["04", "정밀 제작", "PAN 모듈, RF 도어, 전원·데이터 필터, 허니콤 환기구를 Frankonia 자체 생산 시설에서 제작합니다."],
      ["05", "시공·검증", "인증된 시공팀이 무용접 방식으로 조립하고, 인도 시점에 차폐 성능과 누설 여부를 측정해 문서화합니다."],
      ["06", "운영·유지보수", "예방 정비, 주기적 재시험, 보안 재인증으로 보호 성능을 지속 유지합니다."],
    ],
    scopeEyebrow: "처음부터 명확한 업무 범위",
    scopeTitle: "Frankonia가 직접 수행하는 범위와 파트너 범위.",
    scopeBody:
      "보호 구역 전반의 책임 범위를 투명하게 구분합니다. 차폐 경계 안에서 불확실하게 남겨두는 항목은 없습니다.",
    scopeHead: ["구분", "중요도", "수행 범위와 전문성"],
    scopeRows: [
      ["고주파 차폐 성능", "핵심", "자체 생산 및 성능 보증"],
      ["도어·출입 솔루션", "핵심", "정밀 RF 힌지·슬라이딩 도어"],
      ["필터 관통부", "핵심", "전원·데이터·신호 RF 필터"],
      ["환기 도파관", "핵심", "정밀 허니콤 공조 시스템"],
      ["EMC 시험·인증", "핵심", "현장 검증 및 누설 탐지"],
      ["유지보수·서비스", "서비스", "연간 점검 및 라이프사이클 지원"],
      ["건물 보안 시스템", "파트너", "시설 보안 시스템과의 인터페이스 연동"],
      ["침입 경보 시스템", "파트너", "실내 경보 시스템과의 인터페이스 연동"],
      ["운영 절차·규정", "고객", "Frankonia가 모범 사례 자문 제공"],
    ],
    companyEyebrow: "FRANKONIA 한눈에 보기",
    companyTitle: "차폐 기술은 새롭지 않습니다. 적용 대상이 새로울 뿐입니다.",
    companyBody:
      "Frankonia Group은 1987년 EMC·안테나 시험 실험실을 위한 솔루션 제공사로 설립되어, 현재는 자동차·방산·산업 분야의 무반사실과 시험 시스템을 다루는 전문 기술 기업입니다. CyberShield는 그 차폐 기술을 데이터 인프라에 적용한 것입니다. 프로젝트 관리, 엔지니어링, 생산을 자체 수행하고 설치·서비스 팀까지 직접 운영하기 때문에 차폐 경계와 도어, 필터, 인수 측정 성적서가 모두 한 곳에서 나옵니다.",
    companyImageAlt: "독일에 위치한 Frankonia Group 본사 및 생산 시설 항공 전경",
    companyGlanceTitle: "Frankonia가 지향하는 것",
    companyGlance: [
      ["글로벌 네트워크", "생산·영업·서비스 거점이 체계적으로 연결되어 전 세계에서 활동합니다."],
      ["완결형 솔루션 제공사", "차폐 시설이 맞닿는 모든 분야에 대한 기본 역량을 보유합니다."],
      ["방법으로서의 혁신", "고객 요구에 맞춰 효율과 결과, 품질을 함께 끌어올리는 기술을 도입합니다."],
      ["우선 선택되는 파트너", "규격품이 아니라 최신 기술 기반의 맞춤 솔루션을 제공합니다."],
    ],
    companyColumns: [
      [
        "제품 강점",
        [
          ["모듈형 자립 구조", "차폐 구조가 하중을 스스로 지지하므로 기존 건물에 추가 구조 부담이 없습니다."],
          ["전 구간 동일한 성능", "패널, 도어, 필터, 도파관까지 동일한 차폐 성능을 유지해 접합부에 취약점이 생기지 않습니다."],
          ["접착·용접 없는 볼팅 체결", "모든 접합부를 전도성 메시 개스킷과 함께 체결해 수십 년간 유지보수가 가능합니다."],
          ["자체 생산", "외부에서 조달해 조립하는 방식이 아니라 Frankonia가 직접 제조한 사전 제작 표준 부품을 사용합니다."],
        ],
      ],
      [
        "고객 혜택",
        [
          ["35년 이상 검증", "1987년부터 전 세계 EMC 시험 실험실에서 운용되어 온 기술입니다."],
          ["건물 조건 부담 최소화", "기존 전기, 구조, 건축 조건에 설계를 맞춥니다. 그 반대가 아닙니다."],
          ["이전 · 변경 · 재매각 가능", "모듈 구조라 손상 없이 해체해 다른 장소에 다시 설치할 수 있습니다."],
          ["단순한 건물 인터페이스", "전원, 급배기, 데이터, 가스 감지가 정의된 필터 인터페이스를 통해 경계를 통과합니다."],
        ],
      ],
      [
        "Frankonia를 선택하는 이유",
        [
          ["처음부터 끝까지 한 파트너", "상담, 제조, 시공, 인수 측정, 재인증을 단일 책임으로 수행합니다."],
          ["건축 설계 단계 지원", "차폐 관련 의사결정 비용이 아직 낮은 초기 단계부터 건축사·시공사와 협업합니다."],
          ["안전에 대한 무타협", "불연·재활용 가능 소재만 사용하며 카본, 폴리에틸렌, 접착제를 쓰지 않습니다."],
          ["끝까지 책임지는 프로젝트 관리", "숙련된 팀이 세부 사항과 일정을 인계 시점까지 함께 관리합니다."],
        ],
      ],
    ],
    faqEyebrow: "자주 묻는 질문",
    faqTitle: "도입 검토가 시작되는 질문들.",
    faqs: [
      [
        "운영 중인 기존 시설에도 설치할 수 있나요?",
        "가능합니다. 모듈이 표준 출입문으로 반입되고 내부에서 볼트로 조립되므로 용접·화기 작업이 없습니다. 운영 중인 시설과 병행하는 시공은 일반적인 프로젝트 유형입니다.",
      ],
      [
        "프로젝트 기간은 얼마나 걸리나요?",
        "규모와 통합 범위에 따라 다릅니다. 차폐실 조립 자체는 주 단위, 진단부터 검증 인도까지 전체 주기는 통상 수개월입니다. 개념 설계 제안과 함께 구체적인 일정을 받아보실 수 있습니다.",
      ],
      [
        "비용은 무엇으로 결정되나요?",
        "크기, 요구 성능, 관통부 수량(도어·전원·데이터·냉각), 통합 복잡도가 주요 변수입니다. 기본적인 프로젝트 조건만으로도 초기 상담과 개략 견적이 가능합니다.",
      ],
      [
        "차폐 구조가 냉각·소방·일상 운영에 지장을 주지 않나요?",
        "지장 없습니다. 공조, 이중바닥, 소방, 조명, 출입통제를 처음부터 경계 설계에 통합합니다.",
      ],
      [
        "나중에 확장하거나 이전해야 하면 어떻게 되나요?",
        "손상 없이 해체할 수 있는 시스템입니다. 확장·재구성하거나 새로운 부지에 재조립할 수 있어 초기 투자가 보호됩니다.",
      ],
    ],
    heroVideoLabel: "CyberShield 모듈형 차폐 데이터홀이 조립되는 3D 렌더링",
    contactEyebrow: "위험 프로파일에서 시작하십시오",
    contactTitle: "필요한 보호 경계를 함께 정의하겠습니다.",
    contactBody:
      "보호해야 할 자산과 프로젝트 정보를 알려주십시오. Frankonia 전문가가 검토한 후 이메일로 연락드립니다.",
    contactPhoneLabel: "",
    contactPhone: "",
    labels: {
      type: "문의 유형",
      name: "이름",
      company: "회사",
      email: "업무용 이메일",
      country: "국가 / 지역",
      project: "프로젝트 유형",
      stage: "프로젝트 단계",
      message: "프로젝트 요구사항",
      consent: "Frankonia가 문의 회신을 위해 이 정보를 사용하는 데 동의합니다.",
      submitConsultation: "상담 이메일 작성",
      submitQuote: "견적요청 이메일 작성",
    },
    options: {
      newBuild: "신규 시설",
      retrofit: "기존 시설 개조 / 확장",
      confidential: "기밀 프로젝트 / 추후 협의",
      concept: "개념 / 타당성 검토",
      planning: "설계 / 사양 작성",
      procurement: "조달 / 입찰",
      urgent: "진행 중 / 긴급",
    },
    emailNote:
      "제출하면 입력한 프로젝트 정보가 포함된 이메일 작성 화면이 열립니다. 이 웹사이트에는 양식 데이터가 저장되지 않습니다.",
    footer:
      "CyberShield는 높은 수준의 보증이 요구되는 엔지니어링 솔루션입니다. 성능, 적용 규격 및 인증 범위는 합의된 프로젝트 구성과 최종 검증 결과에 따라 결정됩니다.",
  },
} as const;

const threatIcons = [
  <svg key="emanation" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <rect x="8" y="36" width="12" height="12" fill="currentColor" stroke="none" />
    <path d="M14 28 A14 14 0 0 1 28 42" />
    <path d="M14 20 A22 22 0 0 1 36 42" />
    <path d="M14 12 A30 30 0 0 1 44 42" />
  </svg>,
  <svg key="interference" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M8 44 V32" />
    <path d="M16 44 V24" />
    <path d="M24 44 V16" />
    <path d="M44 6 L32 26 H39 L28 50 L42 30 H35 Z" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="emp" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="28" cy="28" r="4" fill="currentColor" stroke="none" />
    <circle cx="28" cy="28" r="11" />
    <path d="M28 4 v8 M28 44 v8 M4 28 h8 M44 28 h8 M11 11 l6 6 M39 39 l6 6 M45 11 l-6 6 M11 45 l6 -6" />
  </svg>,
  <svg key="boundary" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M28 8 H8 V48 H48 V8 H44" />
    <path d="M36 2 V24" />
    <path d="M30 18 l6 6 6 -6" />
  </svg>,
];

// Guaranteed attenuation per EN 50147-1 / IEEE 299. Frequency labels and the
// decibel figures are language-independent; only the field type is translated.
// The bar maps 80–125 dB onto the column height so the curve stays readable.
const attenuationRows = [
  ["10 kHz", 90, "magnetic"],
  ["100 kHz", 100, "magnetic"],
  ["1 MHz", 110, "magnetic"],
  ["100 MHz", 120, "plane"],
  ["400 MHz", 120, "plane"],
  ["1 GHz", 110, "plane"],
  ["18 GHz", 100, "microwave"],
  ["40 GHz", 100, "microwave"],
] as const;

const barHeight = (db: number) => `${Math.round(((db - 80) / 45) * 100)}%`;

// Citations, never links — the page does not send visitors to external sites.
// Each entry carries the issuing body, the document reference and the clause it
// was read from, so a reader can find the source without being handed a URL.
// Document titles are proper nouns and stay in English; what each one supports
// on this page is translated per locale as `evidenceUsedFor`.
const evidenceSources = [
  ["IEC 61000-2-9", "Electromagnetic compatibility — Part 2-9: Description of HEMP environment, radiated disturbance"],
  ["IEC 61000-4-36", "Electromagnetic compatibility — Part 4-36: IEMI immunity test methods for equipment and systems"],
  ["NCSC", "TEMPEST and electromagnetic security guidance"],
  ["NIST SP 800-53", "Security and Privacy Controls for Information Systems and Organizations — control PE-19, Information Leakage"],
  ["CISA", "Resilient Power Best Practices for Critical Facilities and Sites"],
  ["EN 50600", "Information technology — Data centre facilities and infrastructures"],
] as const;

// Importance rating and responsibility tone, aligned with the scope rows above.
const scopeMeta = [
  [5, "core"], [5, "core"], [5, "core"], [5, "core"], [5, "core"],
  [4, "service"], [2, "partner"], [2, "partner"], [2, "customer"],
] as const;

const revealSelector = [
  ".asset-grid article",
  ".audience-grid article",
  ".company-glance li",
  ".company-column",
  ".threat-grid article",
  ".feature-list article",
  ".step-list article",
  ".application-grid article",
  ".scenario-grid article",
  ".compare-row",
  ".ecosystem-grid article",
  ".scope-list tbody tr",
  ".standards-row div",
  ".faq-list details",
  ".why-metric",
  ".system-image",
  ".verify-visual",
  ".lifecycle-visual",
].join(",");

// Photography for the six product lines, in the order the cards are listed.
const ecosystemImages = ["structure", "access", "connectivity", "air", "validation", "lifecycle"];

export function Landing({ lang }: { lang: Lang }) {
  const [inquiry, setInquiry] = useState<Inquiry>("consultation");
  const rootRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const metricRef = useRef<HTMLElement>(null);
  const t = copy[lang];

  // The hero render ping-pongs: 8 s forward, 2 s hold, 8 s reverse, 2 s hold.
  // That cycle is baked into hero-render-loop.mp4 and played natively with
  // `loop` — reversing in the browser means seeking backwards frame by frame,
  // which decodes far too slowly on a 1080p source to look smooth.
  // Autoplay stays in script so a reduced-motion preference keeps the poster.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The clip is 3.5 MB, so it is only fetched once it is actually on screen —
    // eager preloading competed with the hero for bandwidth on first paint.
    const start = () => {
      video.preload = "auto";
      video.play().catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        start();
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Reveal cards as they scroll into view; anything already on screen stays visible.
  // Cards start hidden, so every path here must end with them shown.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Scoped to the ported page: this site's own chrome shares some of these
    // class names and must not be swept into the reveal.
    const targets = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(revealSelector) ?? []);
    if (!targets.length) return;

    const pending = new Set(targets);
    const reveal = (el: Element) => {
      el.classList.add("is-in");
      pending.delete(el as HTMLElement);
    };

    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
      el.classList.add("reveal");
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));

    // Fallback: if the observer never delivers, scrolling still uncovers the cards.
    const onScroll = () => {
      if (!pending.size) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          observer.unobserve(el);
          reveal(el);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [lang]);

  // Count the headline statistic up once it is on screen.
  useEffect(() => {
    const el = metricRef.current;
    if (!el) return;
    // The figure may be decimal, and German writes it with a comma, so the
    // number is pulled out of the string rather than assumed to lead it.
    const found = t.whyMetric.match(/[\d.,]+/);
    if (!found) return;
    const numeric = found[0];
    const comma = numeric.includes(",");
    const target = parseFloat(comma ? numeric.replace(",", ".") : numeric);
    if (Number.isNaN(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const decimals = (numeric.split(/[.,]/)[1] ?? "").length;
    const prefix = t.whyMetric.slice(0, found.index);
    const suffix = t.whyMetric.slice((found.index ?? 0) + numeric.length);
    const render = (value: number) => {
      const shown = value.toFixed(decimals);
      return prefix + (comma ? shown.replace(".", ",") : shown) + suffix;
    };

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - started) / 1000);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = render(target * eased);
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [t.whyMetric]);

  // The scroll progress bar and the active-section highlight both drove the
  // product site's own header, which this port does not render.

  const goContact = (type: Inquiry) => {
    setInquiry(type);
    rootRef.current?.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject =
      inquiry === "quote"
        ? "[CyberShield] Quote request"
        : "[CyberShield] Consultation request";
    const body = [
      `Request: ${inquiry}`,
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      `Country / region: ${data.get("country")}`,
      `Project type: ${data.get("project")}`,
      `Project stage: ${data.get("stage")}`,
      "",
      "Requirements:",
      String(data.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:sales@frankoniagroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="cs" ref={rootRef}>
      {/* `cs-hero`, not `hero`: globals.css already claims that class name and
          its `.hero h1` / `.hero p` rules would otherwise reach in here. */}
      <section className="cs-hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><span>{t.heroAccent}</span></h1>
            <p className="hero-body">{t.heroBody}</p>
            <div className="hero-actions">
              <button className="button" onClick={() => goContact("consultation")}>{t.consultation}<span>↗</span></button>
              <a className="text-link" href="#solution">{t.explore}<span>↓</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-ring" />
            <video
              ref={heroVideoRef}
              src={asset("/hero-render-loop.mp4")}
              poster={asset("/images/hero-render-poster.webp")}
              width={1920}
              height={1080}
              muted
              loop
              playsInline
              preload="none"
              aria-label={t.heroVideoLabel}
            />
          </div>
        </div>
        <div className="metrics">
          {t.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <div className="proof-strip">
        {t.proof.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </div>

      {/* Who the room is for, answered before the argument for building one. */}
      <section className="audience-section" id="audience" aria-labelledby="audience-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.audienceEyebrow}</p>
          <h2 id="audience-title">{t.audienceTitle}</h2>
        </div>
        <div className="audience-grid">
          {t.audience.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-intro">
          <div>
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2>{t.whyTitle}</h2>
            <p className="lead">{t.whyBody}</p>
          </div>
          <aside className="why-metric" aria-label={t.whyMetricLabel}>
            <strong ref={metricRef}>{t.whyMetric}</strong>
            <span>{t.whyMetricLabel}</span>
            <small>{t.sourceNote}</small>
          </aside>
        </div>
        <div className="asset-grid">
          {t.assetCards.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="why-value">
          <div>
            <p className="eyebrow">{t.whyValueLabel}</p>
            <h3>{t.whyValueTitle}</h3>
          </div>
          <p>{t.whyValueBody}</p>
        </div>
      </section>

      <section className="threat-section section-dark" aria-labelledby="threat-title">
        <div className="section-heading">
          <p className="eyebrow">{t.threatEyebrow}</p>
          <h2 id="threat-title">{t.threatTitle}</h2>
          <p>{t.threatBody}</p>
        </div>
        <div className="threat-grid">
          {t.threats.map(([title, body, impact], index) => (
            <article key={title}>
              <span className="threat-number">0{index + 1}</span>
              <div className="threat-icon" aria-hidden="true">{threatIcons[index]}</div>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="impact-tag"><span>{t.impactLabel}</span><strong>{impact}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="system-section" id="solution">
        <div className="system-image">
          <img
            src={asset("/images/facility-aerial.webp")}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            alt={t.alt.facility}
          />
        </div>
        <div className="system-content">
          <p className="eyebrow">{t.systemEyebrow}</p>
          <h2>{t.systemTitle}</h2>
          <p className="lead">{t.systemBody}</p>
          <div className="feature-list">
            {t.features.map(([num, title, body]) => (
              <article key={num}>
                <span>{num}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cutaway-section" aria-labelledby="cutaway-title">
        <div className="section-heading">
          <p className="eyebrow">{t.cutawayEyebrow}</p>
          <h2 id="cutaway-title">{t.cutawayTitle}</h2>
          <p>{t.cutawayBody}</p>
        </div>
        <CutawayMap lang={lang} alt={t.cutawayAlt} hint={t.cutawayHint} />
      </section>

      <section className="compare-section" aria-labelledby="compare-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.compareEyebrow}</p>
          <h2 id="compare-title">{t.compareTitle}</h2>
          <p>{t.compareBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.compareTitle}>
          <table className="compare-table">
            <caption className="visually-hidden">{t.compareBody}</caption>
            <thead>
              <tr>{t.compareHead.map((label) => <th key={label} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              {t.compareRows.map(([criterion, standard, advantage]) => (
                <tr className="compare-row" key={criterion}>
                  <th scope="row">{criterion}</th>
                  <td className="standard">{standard}</td>
                  <td className="advantage">{advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ecosystem-section" id="ecosystem">
        <div className="section-heading light">
          <p className="eyebrow">{t.ecosystemEyebrow}</p>
          <h2>{t.ecosystemTitle}</h2>
          <p>{t.ecosystemBody}</p>
        </div>
        <div className="ecosystem-grid">
          {t.ecosystemCards.map(([title, body, spec], index) => (
            <article key={title}>
              <img
                src={asset(`/images/ecosystem/${ecosystemImages[index]}.webp`)}
                width={1000}
                height={667}
                loading="lazy"
                decoding="async"
                alt={t.ecosystemAlt[index]}
              />
              <div className="ecosystem-body">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <p className="ecosystem-spec">{spec}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="ecosystem-note">
          <a href="#attenuation">{t.ecosystemNote}<b>↓</b></a>
        </p>
      </section>

      <section className="verify-section" id="verification">
        <div className="verify-content">
          <p className="eyebrow">{t.verifyEyebrow}</p>
          <h2>{t.verifyTitle}</h2>
          <p className="lead">{t.verifyBody}</p>
          <p className="standards-intro">{t.standardsIntro}</p>
          <div className="standards-row">
            {t.standards.map(([name, note]) => (
              <div key={name}><strong>{name}</strong><span>{note}</span></div>
            ))}
          </div>
          <div className="evidence-row">
            <strong>{t.evidenceTitle}</strong>
            <p className="evidence-note">{t.evidenceNote}</p>
            <ul className="evidence-list">
              {evidenceSources.map(([reference, title], index) => (
                <li key={reference}>
                  <strong>{reference}</strong>
                  <span>{title}</span>
                  <em>{t.evidenceUsedFor[index]}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="verify-visual">
          <img
            src={asset("/images/technician-verification.webp")}
            width={768}
            height={1376}
            loading="lazy"
            decoding="async"
            alt={t.alt.technician}
          />
        </div>
      </section>

      <section className="attenuation-section section-dark" id="attenuation" aria-labelledby="attenuation-title">
        <div className="section-heading">
          <p className="eyebrow">{t.attenuationEyebrow}</p>
          <h2 id="attenuation-title">{t.attenuationTitle}</h2>
          <p>{t.attenuationBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.attenuationTitle}>
          <table className="attenuation-chart">
            <caption className="visually-hidden">{t.attenuationTitle}</caption>
            <thead>
              <tr>
                {attenuationRows.map(([frequency]) => <th key={frequency} scope="col">{frequency}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="attenuation-bars" aria-hidden="true">
                {attenuationRows.map(([frequency, db]) => (
                  <td key={frequency}>
                    <span className="attenuation-bar"><i style={{ height: barHeight(db) }} /></span>
                  </td>
                ))}
              </tr>
              <tr className="attenuation-values">
                {attenuationRows.map(([frequency, db]) => <td key={frequency}>&ge; {db} dB</td>)}
              </tr>
              <tr className="attenuation-fields">
                {attenuationRows.map(([frequency, , field]) => <td key={frequency}>{t.fieldTypes[field]}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="attenuation-note">{t.attenuationNote}</p>
      </section>

      <section className="applications-section" id="applications">
        <div className="section-heading light">
          <p className="eyebrow">{t.applicationsEyebrow}</p>
          <h2>{t.applicationsTitle}</h2>
        </div>
        <div className="application-grid">
          {t.applications.map(([title, audience, body], index) => (
            <article key={title}>
              <div className="application-top"><span>0{index + 1}</span><b>↗</b></div>
              <p className="audience">{audience}</p>
              <h3>{title}</h3>
              <p>{body}</p>
              <button onClick={() => goContact("consultation")}>{t.consultation}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="scenario-section">
        <div className="section-heading light">
          <p className="eyebrow">{t.scenarioEyebrow}</p>
          <h2>{t.scenarioTitle}</h2>
        </div>
        <div className="scenario-grid">
          {t.scenarios.map(([tag, title, challenge, approach, outcome]) => (
            <article key={title}>
              <p className="scenario-tag">{tag}</p>
              <h3>{title}</h3>
              <div><span>{t.scenarioLabels.challenge}</span><p>{challenge}</p></div>
              <div><span>{t.scenarioLabels.approach}</span><p>{approach}</p></div>
              <div className="scenario-outcome"><span>{t.scenarioLabels.outcome}</span><p>{outcome}</p></div>
            </article>
          ))}
        </div>
        <p className="scenario-note">
          {t.scenarioNote}
          <a
            className="outbound"
            href="https://frankonia-solutions.com/anechoic-chambers/references_anechoic-chambers/"
            target="_blank"
            rel="noreferrer"
          >
            {t.scenarioLink}<span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>

      <section className="lifecycle-section" id="process">
        <div className="lifecycle-visual">
          <img
            src={asset("/images/engineer-inspection.webp")}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            alt={t.alt.engineer}
          />
        </div>
        <div className="lifecycle-content">
          <p className="eyebrow">{t.processEyebrow}</p>
          <h2>{t.processTitle}</h2>
          <div className="step-list">
            {t.processSteps.map(([num, title, body]) => (
              <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="scope-section" aria-labelledby="scope-title">
        <div className="section-heading light">
          <p className="eyebrow">{t.scopeEyebrow}</p>
          <h2 id="scope-title">{t.scopeTitle}</h2>
          <p>{t.scopeBody}</p>
        </div>
        <div className="table-scroll" role="region" tabIndex={0} aria-label={t.scopeTitle}>
          <table className="scope-list">
            <caption className="visually-hidden">{t.scopeBody}</caption>
            <thead>
              <tr>{t.scopeHead.map((label) => <th key={label} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              {t.scopeRows.map(([category, tag, detail], index) => {
                const [rating, tone] = scopeMeta[index];
                return (
                  <tr key={category}>
                    <th scope="row">{category}</th>
                    <td>
                      <span className="scope-rating" aria-label={`${rating} / 5`}>
                        {[1, 2, 3, 4, 5].map((dot) => <i key={dot} className={dot <= rating ? "on" : ""} />)}
                      </span>
                    </td>
                    <td><span className={`scope-tag ${tone}`}>{tag}</span>{detail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Who is behind the room, placed where the reader is deciding whether to
          trust the supplier rather than the specification. */}
      <section className="company-section" id="company" aria-labelledby="company-title">
        <div className="company-intro">
          <div className="section-heading light">
            <p className="eyebrow">{t.companyEyebrow}</p>
            <h2 id="company-title">{t.companyTitle}</h2>
            <p>{t.companyBody}</p>
          </div>
          <img
            className="company-banner"
            src={asset("/images/frankonia-campus.webp")}
            width={983}
            height={553}
            loading="lazy"
            decoding="async"
            alt={t.companyImageAlt}
          />
        </div>
        <div className="company-glance">
          <h3>{t.companyGlanceTitle}</h3>
          <ul>
            {t.companyGlance.map(([label, note]) => (
              <li key={label}><strong>{label}</strong><span>{note}</span></li>
            ))}
          </ul>
        </div>
        <div className="company-grid">
          {t.companyColumns.map(([heading, items]) => (
            <section key={heading} className="company-column">
              <h3>{heading}</h3>
              <ul>
                {items.map(([label, note]) => (
                  <li key={label}><strong>{label}</strong><span>{note}</span></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
          <div className="faq-list">
            {t.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <a href="mailto:sales@frankoniagroup.com">sales@frankoniagroup.com</a>
          {t.contactPhone && (
            <a className="contact-phone" href={`tel:${t.contactPhone.replace(/[^+\d]/g, "")}`}>
              <small>{t.contactPhoneLabel}</small>
              {t.contactPhone}
            </a>
          )}
        </div>
        <form onSubmit={submit}>
          <fieldset className="request-toggle">
            <legend>{t.labels.type}</legend>
            <label className={inquiry === "consultation" ? "selected" : ""}>
              <input type="radio" name="request" value="consultation" checked={inquiry === "consultation"} onChange={() => setInquiry("consultation")} />
              {t.consultation}
            </label>
            <label className={inquiry === "quote" ? "selected" : ""}>
              <input type="radio" name="request" value="quote" checked={inquiry === "quote"} onChange={() => setInquiry("quote")} />
              {t.quote}
            </label>
          </fieldset>
          <div className="form-grid">
            <label>{t.labels.name}<input required name="name" autoComplete="name" /></label>
            <label>{t.labels.company}<input required name="company" autoComplete="organization" /></label>
            <label>{t.labels.email}<input required type="email" name="email" autoComplete="email" /></label>
            <label>{t.labels.country}<input required name="country" autoComplete="country-name" /></label>
            <label>{t.labels.project}
              <select name="project" required defaultValue="">
                <option value="" disabled>—</option>
                <option>{t.options.newBuild}</option><option>{t.options.retrofit}</option><option>{t.options.confidential}</option>
              </select>
            </label>
            <label>{t.labels.stage}
              <select name="stage" required defaultValue="">
                <option value="" disabled>—</option>
                <option>{t.options.concept}</option><option>{t.options.planning}</option><option>{t.options.procurement}</option><option>{t.options.urgent}</option>
              </select>
            </label>
            <label className="full">{t.labels.message}<textarea required name="message" rows={5} /></label>
          </div>
          <label className="consent"><input type="checkbox" required /> <span>{t.labels.consent}</span></label>
          <button className="button submit" type="submit">
            {inquiry === "quote" ? t.labels.submitQuote : t.labels.submitConsultation}<span>↗</span>
          </button>
          <p className="email-note">{t.emailNote}</p>
        </form>
      </section>

      {/* The product site's footer stops here: this site's own footer closes
          the page instead. */}
    </div>
  );
}
