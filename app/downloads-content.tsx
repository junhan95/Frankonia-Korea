import {
  downloadCopy,
  downloadSets,
  downloadsMeta,
  downloadsPath,
  fileSize,
  isOffsite,
  type DownloadFile,
  type DownloadGroup,
  type DownloadSet,
} from "./downloads-sections";
import StructuredData from "./structured-data";
import PageShell from "./page-shell";
import { asset, type Lang } from "./site-config";

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
 * start a 16 MB transfer, and eight of these fifteen files are over 2 MB.
 *
 * Which files, where they come from, and what was changed on the way is in
 * docs/source/downloads.md.
 */

const copy = {
  ko: {
    eyebrow: "DOWNLOADS",
    lead: [
      "Frankonia의 제품 카탈로그와 인증서를 PDF로 제공합니다. 챔버 카탈로그와 포토북은 이 사이트에서 직접, 서비스 포트폴리오·ISO 9001 인증서와 시험 시스템 카탈로그는 본사 서버에서 내려받습니다.",
      "필요한 자료가 목록에 없거나 특정 모델의 사양서·도면이 필요하시면 문의해 주십시오. 담당 엔지니어가 확인해 회신드립니다.",
    ],
    /** Under the thumbnail, in the meta line. */
    pages: (n: number) => `${n}쪽`,
    offsite: "본사 서버",
    /** Read by a screen reader in place of the bare title, so the link says
     *  what pressing it does. */
    label: (title: string, size: string) => `${title} — PDF ${size} 내려받기`,
  },
  en: {
    eyebrow: "DOWNLOADS",
    lead: [
      "Frankonia's product catalogues and certificates, as PDF. The chamber catalogue and the photobook are served from this site; the service portfolio, the ISO 9001 certificate and the test-system catalogues come from the head office's own server.",
      "If what you need is not here — a specification, a drawing, a standard for one particular model — tell us and an engineer will go through it and come back to you.",
    ],
    pages: (n: number) => (n === 1 ? "1 page" : `${n} pages`),
    offsite: "Head office",
    label: (title: string, size: string) => `${title} — download PDF, ${size}`,
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
            </div>
          </div>
        </section>

        {/* The two head-office download areas, in its own order. `.alt` on the
            first because the lead band above it is plain — the same alternation
            every other page here runs, counted rather than written down. */}
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
 * The sub-head is dropped where a set has only one group: the test-systems
 * area is nine catalogues under no heading of its own, and "Product
 * catalogues" printed twice, once as the band's `h2` and once as a `.sub-head`
 * two lines below it, is a heading repeating itself.
 */
function Group({ lang, set, group }: { lang: Lang; set: DownloadSet; group: DownloadGroup }) {
  const c = downloadCopy[lang];
  const only = set.groups.length === 1;
  const groupKey = `${set.key}/${group.key}` as keyof typeof c.groupTitle;

  return (
    <div className="list-group">
      {!only && <h3 className="sub-head">{c.groupTitle[groupKey]}</h3>}
      <div className="dl-grid">
        {group.files.map((file) => <Card key={file.key} lang={lang} file={file} />)}
      </div>
    </div>
  );
}

/**
 * One file.
 *
 * The whole card is the anchor, as the chamber and test-system rows are: a
 * thumbnail that lifts on hover and a heading that turns red is a promise of a
 * click, and on this page every part of it keeps that promise.
 *
 * `target="_blank"` on all fifteen, not only the off-site ones. A PDF followed
 * in the same tab replaces the site with a viewer the reader then has to back
 * out of — and the two served from here are 16 MB and 15 MB, which is a long
 * blank tab if it is the one they were reading. `rel="noopener"` and no
 * `noreferrer` on the off-site ones, as on the footer's head-office link.
 */
function Card({ lang, file }: { lang: Lang; file: DownloadFile }) {
  const t = copy[lang];
  const c = downloadCopy[lang];
  const size = fileSize(file.bytes);
  const offsite = isOffsite(file);

  return (
    <a
      className="dl"
      href={offsite ? file.href : asset(file.href)}
      target="_blank"
      rel="noopener"
      aria-label={t.label(file.title, size)}
    >
      <div className="dl-shot">
        {/* Decorative: it is the cover of the document the heading names, so a
            description of it would be the heading read twice. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(file.cover.src)}
          alt=""
          width={file.cover.w}
          height={file.cover.h}
          loading="lazy"
          decoding="async"
        />
        {file.docLang && <span className="dl-lang">{file.docLang}</span>}
      </div>
      <div className="dl-body">
        <h4>{file.title}</h4>
        <p>{c.blurb[file.key as keyof typeof c.blurb]}</p>
        <div className="dl-meta">
          <span>PDF</span>
          <span>{t.pages(file.pages)}</span>
          <span>{size}</span>
          {offsite && <span className="dl-offsite">{t.offsite}</span>}
        </div>
      </div>
    </a>
  );
}
