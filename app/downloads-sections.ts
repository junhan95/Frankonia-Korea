import type { Lang } from "./site-config";

/**
 * The downloads hub — what is on it, and where each file actually lives.
 *
 * The head office keeps two download areas, one per product branch:
 *
 *   /anechoic-chambers/download-area_anechoic-chambers/
 *   /test-systems/download-area_test-systems/
 *
 * This site has one hub, because the Contact menu offers one entry and a
 * reader looking for "the catalogue" does not yet know which branch theirs is
 * in. The head office's own headings are kept as the group headings, and its
 * order is kept inside each group, so the two pages can still be read against
 * each other. Collected 2026-08-22 — see docs/source/downloads.md.
 *
 * The one thing that is *not* the head office's is where two of the files are
 * served from. Its own page lists "Anechoic Chambers (PDF)" and
 * "Photobook (PDF)" through a flip-book widget that was never given a file, so
 * both links are dead there. Those two PDFs are served from this site instead.
 */

export const downloadsPath = "/downloads";

export const downloadsMeta = {
  ko: {
    label: "자료실",
    description:
      "Frankonia 챔버 카탈로그, 포토북, 서비스 포트폴리오, ISO 9001 인증서, 그리고 EMC 시험 시스템 제품 카탈로그를 PDF로 내려받으실 수 있습니다.",
  },
  en: {
    label: "Downloads",
    description:
      "Frankonia chamber catalogue, photobook, service portfolio and ISO 9001 certificate, together with the EMC test-system product catalogues — all as PDF.",
  },
} as const satisfies Record<Lang, { label: string; description: string }>;

/**
 * One file on the hub.
 *
 * `title` is never translated. These are the head office's own document
 * titles, and a reader who arrives here from its site — or who is looking for
 * a file a colleague named — has to be able to match them. `blurb` is the
 * translated half and lives in `downloadCopy` below.
 *
 * `href` says which of the two kinds of file this is without a second field:
 * an absolute URL is the head office's copy and stays there, a site-relative
 * one is served from `public/`. `asset()` is applied to the second kind at
 * render time, and must not be applied to the first.
 */
export type DownloadFile = {
  key: string;
  title: string;
  /** Only where the same document exists in two languages, which is where a
   *  reader has to choose. A lone document carries no badge. */
  docLang?: "EN" | "DE";
  /** Rendered from page 1 of the file itself, so the thumbnail on the card is
   *  the cover of the document behind it and cannot drift from it. */
  cover: { src: string; w: number; h: number };
  href: string;
  /** Pages in the PDF, and its size in bytes — both read off the file. See the
   *  note on `fileSize`, and on the two spread-set documents in the ledger. */
  pages: number;
  bytes: number;
};

export type DownloadGroup = {
  key: string;
  files: readonly DownloadFile[];
};

/** A band of the page: one head-office download area, split into the groups
 *  that area's own headings make. */
export type DownloadSet = {
  key: string;
  groups: readonly DownloadGroup[];
};

const COVER = (name: string, w: number, h: number) => ({
  src: `/downloads/covers/${name}.webp`,
  w,
  h,
});

/** The head office's own uploads directory. Written once so a moved file is
 *  one edit, and so it is obvious at a glance which files are not ours. */
const HQ = "https://frankonia-solutions.com/wp-content/uploads";

export const downloadSets = [
  {
    key: "chambers",
    groups: [
      {
        key: "catalogues",
        files: [
          {
            key: "catalogue-2026",
            title: "Anechoic Chambers 2026",
            cover: COVER("catalogue-2026", 560, 792),
            href: "/downloads/Frankonia-Anechoic-Chambers-2026.pdf",
            pages: 35,
            bytes: 17_136_055,
          },
          {
            key: "photobook-2026",
            title: "Photobook 2026",
            cover: COVER("photobook-2026", 560, 560),
            href: "/downloads/Frankonia-Photobook-2026.pdf",
            pages: 27,
            bytes: 15_159_281,
          },
        ],
      },
      {
        key: "service",
        files: [
          {
            key: "service-portfolio-en",
            title: "Frankonia Service",
            docLang: "EN",
            cover: COVER("service-portfolio-en", 560, 571),
            href: `${HQ}/2025/11/Service-Broschure_EN_PDF.pdf`,
            pages: 4,
            bytes: 5_084_125,
          },
          {
            key: "service-portfolio-de",
            title: "Frankonia Service",
            docLang: "DE",
            cover: COVER("service-portfolio-de", 560, 571),
            href: `${HQ}/2025/11/Service-Broschure_DE_PDF.pdf`,
            pages: 4,
            bytes: 5_025_744,
          },
        ],
      },
      {
        key: "iso",
        files: [
          {
            key: "iso-9001-en",
            title: "Frankonia ISO 9001",
            docLang: "EN",
            cover: COVER("iso-9001-en", 560, 792),
            href: `${HQ}/2022/07/Zertifikat-ISO-9001_2015-engl.pdf`,
            pages: 2,
            bytes: 413_664,
          },
          {
            key: "iso-9001-de",
            title: "Frankonia ISO 9001",
            docLang: "DE",
            cover: COVER("iso-9001-de", 560, 792),
            href: `${HQ}/2022/07/Zertifikat-ISO-9001_2015.pdf`,
            pages: 2,
            bytes: 413_524,
          },
        ],
      },
    ],
  },
  {
    key: "test-systems",
    groups: [
      {
        key: "catalogues",
        files: [
          {
            key: "radiated-immunity",
            title: "Radiated Immunity Test Systems",
            cover: COVER("radiated-immunity", 560, 792),
            href: `${HQ}/2016/12/Radiated_Immunity_Test_Systems.pdf`,
            pages: 24,
            bytes: 1_737_088,
          },
          {
            key: "wideband-amplifiers",
            title: "RF-wideband Amplifiers",
            cover: COVER("wideband-amplifiers", 560, 792),
            href: `${HQ}/2020/03/Wideband-Amplifiers_web.pdf`,
            pages: 9,
            bytes: 1_572_889,
          },
          {
            key: "emission-measuring",
            title: "Measuring Systems for Conducted and Radiated Emission testing",
            cover: COVER("emission-measuring", 560, 786),
            href: `${HQ}/2019/03/Emission-Measuring-Systems-1.pdf`,
            pages: 20,
            bytes: 11_294_514,
          },
          {
            key: "gtem-cells",
            title: "GTEM-Cells",
            cover: COVER("gtem-cells", 560, 792),
            href: `${HQ}/2017/10/GTEM.pdf`,
            pages: 10,
            bytes: 2_071_227,
          },
          {
            key: "conducted-immunity",
            title: "Conducted Immunity Test Systems",
            cover: COVER("conducted-immunity", 560, 792),
            href: `${HQ}/2019/03/conducted_immunity_test_systems.pdf`,
            pages: 32,
            bytes: 3_008_519,
          },
          {
            key: "amplifier-selection",
            title: "Amplifier Selection Book",
            cover: COVER("amplifier-selection", 560, 792),
            href: `${HQ}/2019/09/amplifiers_web.pdf`,
            pages: 109,
            bytes: 7_261_946,
          },
          {
            key: "antennas",
            title: "Antennas, Antenna Masts & Pre-Amplifier",
            cover: COVER("antennas", 560, 786),
            href: `${HQ}/2024/09/200824_Antennas_Druck.pdf`,
            pages: 28,
            bytes: 12_672_521,
          },
          {
            key: "magnetic-field",
            title: "Magnetic-Field / Low-Frequency Test System",
            cover: COVER("magnetic-field", 560, 792),
            href: `${HQ}/2019/03/MTS.pdf`,
            pages: 8,
            bytes: 409_573,
          },
          {
            key: "psg-immunity",
            title: "Immunity test to conducted common- and differential mode disturbances",
            cover: COVER("psg-immunity", 560, 792),
            href: `${HQ}/2019/03/PSG.pdf`,
            pages: 8,
            bytes: 445_312,
          },
        ],
      },
    ],
  },
] as const satisfies readonly DownloadSet[];

/** Every file's key, read off the table above rather than listed a second
 *  time — so a file added without its blurb is a type error, not a blank line
 *  on a card. */
export type DownloadKey =
  (typeof downloadSets)[number]["groups"][number]["files"][number]["key"];

/**
 * The English blurbs are the head office's own lines from its two download
 * areas, kept as written. Three departures, all recorded in the ledger:
 *
 *  - `wideband-amplifiers` — "widerange" set to "wide-range".
 *  - `conducted-immunity` — "D0-160" set to "DO-160" (a zero for the letter),
 *    and "IEC/EN61000-4-19" given its missing space under `psg-immunity`.
 *  - `emission-measuring` — the head office's line there only repeats the
 *    title, so this is the document's own contents page instead.
 *
 * The chamber-area files carry no blurb on the head office's page at all: it
 * prints six thumbnails under three headings and nothing else. These say what
 * each document is, from the document.
 */
export const downloadCopy = {
  ko: {
    setTitle: {
      chambers: "챔버 카탈로그와 인증서",
      "test-systems": "시험 시스템 카탈로그",
    },
    setKicker: {
      chambers: "ANECHOIC CHAMBERS",
      "test-systems": "EMC TEST SYSTEMS",
    },
    groupTitle: {
      "chambers/catalogues": "무향 챔버 · 차폐룸 · 액세서리",
      "chambers/service": "서비스 포트폴리오",
      "chambers/iso": "ISO 인증",
      "test-systems/catalogues": "제품 카탈로그",
    },
    blurb: {
      "catalogue-2026":
        "2026년 제품 카탈로그. 챔버 형식별 스프레드에 설명·주요 사양·치수표·적용 규격과 도판이 함께 실려 있습니다.",
      "photobook-2026":
        "IMPRESSIONS — Anechoic Chambers. 챔버 내부, Frankosorb® 흡수체, 제어실, 차량 챔버를 담은 사진집입니다.",
      "service-portfolio-en":
        "유지보수·기술지원, 문서화, 수리·업그레이드, EMC 측정, 그리고 전 세계 현장 서비스 체계를 정리한 서비스 안내서입니다.",
      "service-portfolio-de":
        "유지보수·기술지원, 문서화, 수리·업그레이드, EMC 측정, 그리고 전 세계 현장 서비스 체계를 정리한 서비스 안내서입니다.",
      "iso-9001-en":
        "DEKRA Certification GmbH가 발급한 Frankonia Germany EMC Solutions GmbH의 ISO 9001:2015 인증서. 유효기간 2024-06-24 ~ 2027-06-23, 부속서에 인증 사업장이 포함되어 있습니다.",
      "iso-9001-de":
        "DEKRA Certification GmbH가 발급한 Frankonia Germany EMC Solutions GmbH의 ISO 9001:2015 인증서. 유효기간 2024-06-24 ~ 2027-06-23, 부속서에 인증 사업장이 포함되어 있습니다.",
      "radiated-immunity":
        "요구 전계강도, 주파수 범위, 측정 거리를 기준으로 시스템을 선택하실 수 있도록 구성했습니다.",
      "wideband-amplifiers":
        "0.5 GHz ~ 40 GHz 광대역 RF 전력 증폭기 라인업입니다.",
      "emission-measuring":
        "EMI 시험 수신기 ERX-6·ERC-6, LISN, 근접 전계 프로브 세트 NFS-100, 대형 루프 안테나 LVVL, 흡수 클램프 ACF-01B.",
      "gtem-cells":
        "GTEM 셀은 상한 주파수를 GHz 대역까지 확장한 TEM 도파관입니다. 방사 방출과 내성 측정 모두에 쓸 수 있는 저비용 대체 설비입니다.",
      "conducted-immunity":
        "IEC/EN 61000-4-6, NAMUR 전도성 RF 내성 시험, 그리고 ISO 11452-4, MIL-STD 461 CS 114, DO-160 BCI 시험용 시스템입니다.",
      "amplifier-selection":
        "9 kHz ~ 6 (18) GHz, RF 내성 시험에 맞춰 구성한 RF 전력 증폭기 전 라인업입니다.",
      antennas:
        "초광대역 안테나, 더블 스택 로그 페리오딕 안테나, 방출·내성 시험용 혼 안테나.",
      "magnetic-field":
        "자동차·군용 규격에 따른 자기장 / 저주파 시험 시스템과 장비입니다.",
      "psg-immunity":
        "IEC/EN 61000-4-16 공통 모드, IEC/EN 61000-4-19 차동 모드 전도성 방해 내성 시험.",
    },
  },
  en: {
    setTitle: {
      chambers: "Catalogues and certificates",
      "test-systems": "Product catalogues",
    },
    setKicker: {
      chambers: "ANECHOIC CHAMBERS",
      "test-systems": "EMC TEST SYSTEMS",
    },
    groupTitle: {
      "chambers/catalogues": "Anechoic Chambers — Shielded Rooms & Accessories",
      "chambers/service": "Service Portfolio",
      "chambers/iso": "ISO Certification",
      "test-systems/catalogues": "Product catalogues",
    },
    blurb: {
      "catalogue-2026":
        "The 2026 product catalogue. A spread per chamber type, each with the description, the key figures, the dimension table, the standards it is built to and the plates.",
      "photobook-2026":
        "IMPRESSIONS — Anechoic Chambers. Chamber interiors, Frankosorb® absorbers, control rooms and vehicle chambers.",
      "service-portfolio-en":
        "Maintenance and technical support, documentation, repairs and upgrades, EMC measurements, and the worldwide on-site service organisation behind them.",
      "service-portfolio-de":
        "Maintenance and technical support, documentation, repairs and upgrades, EMC measurements, and the worldwide on-site service organisation behind them.",
      "iso-9001-en":
        "ISO 9001:2015 for Frankonia Germany EMC Solutions GmbH, issued by DEKRA Certification GmbH. Valid 2024-06-24 to 2027-06-23; the certified sites are in the annex.",
      "iso-9001-de":
        "ISO 9001:2015 for Frankonia Germany EMC Solutions GmbH, issued by DEKRA Certification GmbH. Valid 2024-06-24 to 2027-06-23; the certified sites are in the annex.",
      "radiated-immunity":
        "Select your system, based on required field-strength, frequency range and measuring distance.",
      "wideband-amplifiers":
        "Discover our wide-range RF-power amplifiers from 0.5 GHz to 40 GHz.",
      "emission-measuring":
        "EMI test receivers ERX-6 and ERC-6, LISNs, the NFS-100 near-field probe set, the LVVL large loop antenna and the ACF-01B absorbing clamp.",
      "gtem-cells":
        "The GTEM-cell is a TEM waveguide with the upper frequency limit extended to the GHz range. It is a low-cost alternative measurement facility for both radiated emission and immunity measurements.",
      "conducted-immunity":
        "Conducted RF immunity test systems acc. to IEC/EN 61000-4-6, NAMUR, and BCI testing acc. to ISO 11452-4, MIL-STD 461 CS 114, DO-160.",
      "amplifier-selection":
        "Discover our broad range of RF-power amplifiers, especially tailored for RF immunity testing from 9 kHz to 6 (18) GHz.",
      antennas:
        "Ultra-broadband antennas, Double-Stacked Log.-Periodic antennas, Horn-antennas for emission and immunity testing.",
      "magnetic-field":
        "Magnetic-field / low-frequency test system and equipment acc. to automotive and military standards.",
      "psg-immunity":
        "Immunity test to conducted common mode disturbances acc. to IEC/EN 61000-4-16 and conducted differential mode disturbances acc. to IEC/EN 61000-4-19.",
    },
  },
} as const satisfies Record<
  Lang,
  {
    setTitle: Record<(typeof downloadSets)[number]["key"], string>;
    setKicker: Record<(typeof downloadSets)[number]["key"], string>;
    groupTitle: Record<string, string>;
    blurb: Record<DownloadKey, string>;
  }
>;

/**
 * A file's size, as a reader on a metered connection needs it.
 *
 * Binary units under a decimal name, which is what Windows, macOS and every
 * other file listing this reader has seen print — the point of the figure is
 * that it matches what they will see land in their downloads folder, not that
 * it agrees with SI. Under a megabyte it switches to whole kilobytes: "0.4 MB"
 * beside "16.3 MB" reads as rounding noise rather than as a small file.
 */
export const fileSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/** Whether this file is served by the head office rather than from here. The
 *  card says so, and the link opens in its own tab because of it. */
export const isOffsite = (file: DownloadFile) => !file.href.startsWith("/");
