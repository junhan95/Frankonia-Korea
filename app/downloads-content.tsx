import DownloadCards from "./download-cards";
import {
  downloadCopy,
  downloadSets,
  downloadsMeta,
  downloadsPath,
  type DownloadGroup,
  type DownloadSet,
} from "./downloads-sections";
import StructuredData from "./structured-data";
import PageShell from "./page-shell";
import SiteLink from "./site-link";
import { localeRoute, type Lang } from "./site-config";
import { testSystemsOverviewMeta, testSystemsPath } from "./test-system-sections";

/**
 * The downloads hub.
 *
 * Until now this route rendered through `ChamberPage` and produced the same
 * "documents on request" stub every unwritten chamber page produced — a page
 * whose own title, whose search snippet and whose entry in the Contact menu
 * all promised files, and which then offered an email address instead. The
 * files exist; the hub now serves them.
 *
 * The shape is the head office's: a thumbnail of the cover, the document's
 * title under it, and the whole thing is the link. What is added here is the
 * line a download page needs and its page does not carry — format, extent and
 * weight — because a reader on a metered connection is deciding whether to
 * start a 16 MB transfer, and most of these files are over 2 MB.
 *
 * The hub is the chamber download area. The head office's other one, the
 * test-system product catalogues, is printed at the foot of the EMC Test
 * Systems index instead, and the lead says so and links there — see the note
 * on `testSystemCatalogues` in downloads-sections.
 *
 * Which files, where they come from, and what was changed on the way is in
 * docs/source/downloads.md.
 */

const copy = {
  ko: {
    eyebrow: "DOWNLOADS",
    lead: [
      "Frankonia의 챔버 카탈로그와 인증서를 PDF로 제공합니다. 챔버 카탈로그와 포토북은 이 사이트에서 직접, 서비스 포트폴리오와 ISO 9001 인증서는 본사 서버에서 내려받습니다.",
      "필요한 자료가 목록에 없거나 특정 모델의 사양서·도면이 필요하시면 문의해 주십시오. 담당 엔지니어가 확인해 회신드립니다.",
    ],
    /** The sentence that says where the other half went, split at the link.
     *  A reader who came here for the amplifier catalogue has to be told, and
     *  told in a line they can press. */
    elsewhere: ["EMC 시험 시스템 제품 카탈로그는 ", " 페이지에 있습니다."],
  },
  en: {
    eyebrow: "DOWNLOADS",
    lead: [
      "Frankonia's chamber catalogues and certificates, as PDF. The chamber catalogue and the photobook are served from this site; the service portfolio and the ISO 9001 certificate come from the head office's own server.",
      "If what you need is not here — a specification, a drawing, a standard for one particular model — tell us and an engineer will go through it and come back to you.",
    ],
    elsewhere: ["The EMC test-system product catalogues are on the ", " page."],
  },
} as const;

export default function DownloadsPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const { label, description } = downloadsMeta[lang];

  return (
    <>
      <StructuredData
        lang={lang}
        page="path"
        path={downloadsPath}
        trail={[{ name: label, path: downloadsPath }]}
        description={description}
      />
      <PageShell lang={lang} eyebrow={t.eyebrow} title={label} intro={description}>
        <section>
          <div className="wrap">
            <div className="prose">
              {t.lead.map((p) => <p key={p}>{p}</p>)}
              <p>
                {t.elsewhere[0]}
                <SiteLink href={localeRoute(lang, testSystemsPath)}>
                  {testSystemsOverviewMeta[lang].label}
                </SiteLink>
                {t.elsewhere[1]}
              </p>
            </div>
          </div>
        </section>

        {/* The head office's download areas that belong here, in its own
            order. `.alt` on the first because the lead band above it is plain —
            the same alternation every other page here runs, counted rather
            than written down. */}
        {downloadSets.map((set, i) => (
          <section key={set.key} className={i % 2 === 0 ? "alt" : undefined}>
            <div className="wrap">
              <Set lang={lang} set={set} />
            </div>
          </section>
        ))}
      </PageShell>
    </>
  );
}

/** One download area: its heading, then its groups. */
function Set({ lang, set }: { lang: Lang; set: DownloadSet }) {
  const c = downloadCopy[lang];
  const setKey = set.key as keyof typeof c.setTitle;

  return (
    <>
      <div className="sec-head">
        <span className="kicker">{c.setKicker[setKey]}</span>
        <h2>{c.setTitle[setKey]}</h2>
      </div>
      {set.groups.map((group) => (
        <Group key={group.key} lang={lang} set={set} group={group} />
      ))}
    </>
  );
}

/**
 * One heading from the head office's page, and the files under it.
 *
 * The sub-head is dropped where a set has only one group: a lone group's
 * heading and the band's own `h2` are the same words two lines apart, which is
 * a heading repeating itself.
 */
function Group({ lang, set, group }: { lang: Lang; set: DownloadSet; group: DownloadGroup }) {
  const c = downloadCopy[lang];
  const only = set.groups.length === 1;
  const groupKey = `${set.key}/${group.key}` as keyof typeof c.groupTitle;

  return (
    <div className="list-group">
      {!only && <h3 className="sub-head">{c.groupTitle[groupKey]}</h3>}
      <DownloadCards lang={lang} files={group.files} />
    </div>
  );
}
