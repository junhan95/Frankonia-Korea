import type { ReactNode } from "react";
import {
  chamberIndustries,
  chamberModels,
  chamberPanoramas,
  chamberTypes,
  chamberIndustryMeta,
  chambersOverviewMeta,
  chambersPath,
  downloadsMeta,
  downloadsPath,
  industryBody,
  industryPath,
  modelsByIndustry,
  modelsByType,
  overviewBody,
  panoramaSize,
  referenceCountryLabel,
  referenceGroups,
  referenceTotals,
  topicBody,
  topicMeta,
  topicPath,
  typeBody,
  typeMeta,
  typePath,
  type ChamberIndustry,
  type ChamberModel,
  type ChamberTopic,
  type ChamberType,
  type Plate,
  type SpecTable,
  type TopicBody,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import PageShell from "./page-shell";
import StructuredData, { type TrailStep } from "./structured-data";
import { asset, contactEmail, localeRoute, plural, type Lang } from "./site-config";

/**
 * Every page in the Anechoic Chambers branch, plus the downloads hub.
 *
 * The overview, the four industry indexes, the six chamber-type indexes and the
 * five technology topics all carry their copy from the 2026 catalogue. Only the
 * downloads hub still does not: it states what it is, from the same meta the
 * navigation and the search snippet read, and then says outright that the
 * contents are being prepared rather than letting the page read as broken.
 */

export type ChamberView =
  | { kind: "overview" }
  | { kind: "industry"; slug: ChamberIndustry }
  | { kind: "type"; slug: ChamberType }
  | { kind: "topic"; slug: ChamberTopic }
  | { kind: "downloads" };

const copy = {
  ko: {
    eyebrow: "ANECHOIC CHAMBERS",
    eyebrowDownloads: "DOWNLOADS",
    byIndustry: "산업군별",
    byType: "챔버 형식별",
    browse: "찾아보기",
    models: "모델",
    specs: "사양",
    specsTitle: "구성과 치수",
    modelCount: (n: number) => `${n}종`,
    modelsTitle: (n: number) => `해당 모델 ${n}종`,
    /** Counted from `referenceGroups`, not written down — see `referenceTotals`. */
    referenceCount: (entries: number, countries: number) => `${entries}건 · ${countries}개국`,
    /** Over the tables: the catalogue is the source, and a reader comparing a
     *  quotation against this page should know which edition it came from. */
    specsNote: "Frankonia Anechoic Chambers 2026 카탈로그의 표를 그대로 옮긴 것입니다. 치수와 규격 표기는 번역하지 않습니다 — 도면·견적서와 대조할 값이기 때문입니다.",
    stubTitle: "콘텐츠 준비 중입니다",
    stubBody:
      "구조와 경로를 먼저 열어 둔 페이지입니다. 독일 본사 원본 자료를 정리해 순차적으로 채웁니다. 지금 필요한 사양이나 자료가 있으시면 바로 보내 드립니다.",
    stubCta: "자료 요청 · 기술 문의",
    subject: (label: string) => `[자료 요청] ${label}`,
  },
  en: {
    eyebrow: "ANECHOIC CHAMBERS",
    eyebrowDownloads: "DOWNLOADS",
    byIndustry: "By Industry",
    byType: "By Chamber Type",
    browse: "Browse",
    models: "Models",
    specs: "Specifications",
    specsTitle: "Configurations and dimensions",
    modelCount: (n: number) => plural(n, "model"),
    modelsTitle: (n: number) => `${plural(n, "model")} in this category`,
    referenceCount: (entries: number, countries: number) =>
      `${plural(entries, "entry", "entries")} · ${plural(countries, "country", "countries")}`,
    specsNote:
      "Reproduced from the tables in the Frankonia Anechoic Chambers 2026 catalogue. Dimensions and standard designations are not translated — they are what a reader matches against a drawing and a quotation.",
    stubTitle: "Content in preparation",
    stubBody:
      "The route and the structure are in place; the copy is being prepared from the head office's own material. If you need a specification or a document now, we will send it straight over.",
    stubCta: "Request documents",
    subject: (label: string) => `[Document request] ${label}`,
  },
} as const;

export default function ChamberPage({ lang, view }: { lang: Lang; view: ChamberView }) {
  const t = copy[lang];
  const { label, title, description, path, trail, models, body } = resolve(lang, view);

  /**
   * The bands of the page, in reading order.
   *
   * Which ones exist varies by page — an index has a model list and no
   * panoramas, References has panoramas and no tables, downloads has neither —
   * so the alternating `.alt` fill is counted here rather than written into
   * each band. That is the one thing a hand-written class cannot get right:
   * whether a band has a neighbour above it is not knowable where the band is
   * declared.
   */
  const bands: { key: string; node: ReactNode }[] = [];

  if (body) bands.push({ key: "lead", node: <Lead body={body} /> });
  if (view.kind === "overview") bands.push({ key: "axes", node: <Axes lang={lang} /> });
  if (models.length > 0) bands.push({ key: "models", node: <Models lang={lang} models={models} /> });
  if (body?.tables?.length) bands.push({ key: "tables", node: <Tables lang={lang} tables={body.tables} /> });
  if (body && body.groups.length > 0) bands.push({ key: "groups", node: <Groups body={body} /> });
  if (body?.panoramas) bands.push({ key: "panoramas", node: <Panoramas panoramas={body.panoramas} /> });
  if (body?.references) bands.push({ key: "references", node: <References lang={lang} references={body.references} /> });
  if (!body) bands.push({ key: "stub", node: <Stub lang={lang} label={label} /> });

  return (
    <>
      <StructuredData lang={lang} page="path" path={path} trail={trail} description={description} />
      <PageShell
        lang={lang}
        eyebrow={view.kind === "downloads" ? t.eyebrowDownloads : t.eyebrow}
        title={title}
        intro={description}
      >
        {bands.map((band, i) => (
          <section key={band.key} className={i % 2 === 1 ? "alt" : undefined}>
            <div className="wrap">{band.node}</div>
          </section>
        ))}
      </PageShell>
    </>
  );
}

/** The catalogue's opening paragraphs for the page, and the plates under them.
 *  On an index this is everything above the model list; on a topic page, where
 *  there is no list, the next band follows straight on. */
function Lead({ body }: { body: TopicBody }) {
  return (
    <>
      <div className="prose">
        {body.lead.map((p) => <p key={p}>{p}</p>)}
      </div>
      {body.figure && <Figure plate={body.figure} wide />}
      {body.figureRow && (
        <div className="figure-row">
          {body.figureRow.map((plate) => <Figure key={plate.src} plate={plate} />)}
        </div>
      )}
    </>
  );
}

/**
 * A plate.
 *
 * A wide plate is capped at its own natural width rather than the 1000px
 * `.figure-wide` allows: the military plate is 744px across in the catalogue,
 * and stretching it to fill the band would print a soft image at a size the
 * source cannot support. Enlarging a source is the one thing the asset ledger
 * rules out (`withoutEnlargement`), and the rule holds at render time too.
 */
function Figure({ plate, wide = false }: { plate: Plate; wide?: boolean }) {
  return (
    <figure
      className={wide ? "figure figure-wide" : "figure"}
      style={wide ? { maxWidth: Math.min(plate.w, 1000) } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(plate.src)}
        alt={plate.alt ?? ""}
        width={plate.w}
        height={plate.h}
        loading="lazy"
        decoding="async"
      />
      {plate.caption && <figcaption>{plate.caption}</figcaption>}
    </figure>
  );
}

/** The overview's two ways in, side by side — the same pairing the dropdown
 *  makes, so a reader who arrived without using the menu still sees both. */
function Axes({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.browse}</span>
        <h2>{t.byIndustry}</h2>
      </div>
      <div className="hairline-list">
        {chamberIndustries.map((industry, i) => (
          <a className="hl-row" key={industry} href={localeRoute(lang, industryPath(industry))}>
            <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
            <b>{industryLabel[lang][industry]}</b>
            <span className="hl-desc">{t.modelCount(modelsByIndustry(industry).length)}</span>
          </a>
        ))}
      </div>

      <div className="sec-head" style={{ marginTop: "72px" }}>
        <h2>{t.byType}</h2>
      </div>
      <div className="hairline-list">
        {chamberTypes.map((type, i) => (
          <a className="hl-row" key={type} href={localeRoute(lang, typePath(type))}>
            <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
            <b>{typeMeta[lang][type].label}</b>
            <span className="hl-desc">{t.modelCount(modelsByType(type).length)}</span>
          </a>
        ))}
      </div>
    </>
  );
}

function Models({ lang, models }: { lang: Lang; models: readonly ChamberModel[] }) {
  const t = copy[lang];
  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.models}</span>
        <h2>{t.modelsTitle(models.length)}</h2>
      </div>
      <ModelList models={models} />
    </>
  );
}

/**
 * The catalogue's configuration tables for the page.
 *
 * These carry what the model list above cannot: the sizes a model is built in.
 * `chamberModels` holds one entry per product, because that is what the head
 * office publishes as a product — but the catalogue prints four of the SAC-3
 * Plus, seven of the SAC-10V and two of every compact chamber, and the size a
 * laboratory needs is the reason it reads this page at all.
 */
function Tables({ lang, tables }: { lang: Lang; tables: readonly SpecTable[] }) {
  const t = copy[lang];
  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.specs}</span>
        <h2>{t.specsTitle}</h2>
        <p>{t.specsNote}</p>
      </div>
      {tables.map((table, i) => (
        <div key={table.title}>
          {/* Every table keeps its own title, including the first: the band
              heading names the band, and a page can carry four tables under
              it. */}
          <h3 className="sub-head" style={i > 0 ? { marginTop: "56px" } : undefined}>{table.title}</h3>
          <div className="spec-wrap">
            <table className="spec-table">
              <thead>
                <tr>
                  {table.head.map((h, c) => (
                    /* An empty heading is a row-label column, which has no name
                       of its own — the load machine tables read down, not
                       across. It still needs a cell for the column to exist. */
                    <th key={h || `c${c}`} scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, c) => <td key={`${row[0]}-${c}`}><Cell text={cell} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.note && <p className="spec-note">{table.note}</p>}
        </div>
      ))}
    </>
  );
}

/** A cell splits on a newline: the figure first, then the lines the catalogue
 *  sets under it in smaller type. Written as one string in the data because
 *  that is how the catalogue reads — a dimension and its qualifier are one
 *  statement, not two columns. */
function Cell({ text }: { text: string }) {
  const [main, ...sub] = text.split("\n");
  return (
    <>
      {main}
      {sub.map((line) => <small key={line}>{line}</small>)}
    </>
  );
}

/** The catalogue's own titled groups as check lists, then its closing line. */
function Groups({ body }: { body: TopicBody }) {
  return (
    <>
      {body.groups.map((group, i) => (
        <div key={group.title} style={i > 0 ? { marginTop: "56px" } : undefined}>
          <div className="sec-head">
            <h2>{group.title}</h2>
          </div>
          <ul className="check-list">
            {group.items.map((item) => (
              <li key={item}>
                <svg className="chk" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {body.close && <p className="callout">{body.close}</p>}
    </>
  );
}

function Panoramas({ panoramas }: { panoramas: NonNullable<TopicBody["panoramas"]> }) {
  return (
    <>
      <div className="sec-head">
        <h2>{panoramas.title}</h2>
        {/* How to use the strip belongs with the heading over all three, not
            repeated under each one. */}
        <p>{panoramas.hint}</p>
      </div>
      {chamberPanoramas.map((pano, i) => {
        const shot = panoramas.shots[pano.key];
        const label = `${pano.model} – ${pano.place}`;
        return (
          <div key={pano.key} style={i > 0 ? { marginTop: "56px" } : undefined}>
            <h3 className="sub-head">
              <b>{pano.model}</b>
              {` – ${pano.place}`}
            </h3>
            <figure className="figure pano">
              {/* The scroller takes the focus and the label: it is the element
                  the arrow keys pan, so it has to be reachable without a
                  pointer. */}
              <div className="pano-scroll" tabIndex={0} role="group" aria-label={label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(pano.src)}
                  alt={shot.alt}
                  width={panoramaSize.w}
                  height={panoramaSize.h}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          </div>
        );
      })}
    </>
  );
}

function References({ lang, references }: { lang: Lang; references: NonNullable<TopicBody["references"]> }) {
  const t = copy[lang];
  return (
    <>
      <div className="sec-head">
        <span className="kicker">
          {t.referenceCount(referenceTotals.entries, referenceTotals.countries)}
        </span>
        <h2>{references.title}</h2>
      </div>
      {/* `EntryList`, not `.hairline-list`: a country's customers run to a dozen
          names and have to wrap, which is exactly the case the entry list
          exists for. */}
      <div className="entry-list">
        {referenceGroups.map((group, i) => (
          <div className="entry" key={group.country}>
            <span className="entry-idx">{String(i + 1).padStart(2, "0")}</span>
            <h4>{referenceCountryLabel[lang][group.country]}</h4>
            <p>{group.customers.join(" · ")}</p>
          </div>
        ))}
      </div>
      <p className="cs-note">{references.note}</p>
    </>
  );
}

function Stub({ lang, label }: { lang: Lang; label: string }) {
  const t = copy[lang];
  return (
    <div className="empty">
      <h4>{t.stubTitle}</h4>
      <p>{t.stubBody}</p>
      <a
        className="btn btn-red"
        href={`mailto:${contactEmail}?subject=${encodeURIComponent(t.subject(label))}`}
      >
        {t.stubCta}
      </a>
    </div>
  );
}

/** Model names stay in the head office's spelling — see the note on
 *  ChamberModel. Not links: the model pages do not exist yet. */
function ModelList({ models }: { models: readonly ChamberModel[] }) {
  return (
    <div className="hairline-list">
      {models.map((model, i) => (
        <div className="hl-row" key={model.name}>
          <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
          <b>{model.name}</b>
          <span className="hl-desc">
            {model.desc}
            {/* Catalogue figures, on their own line under the descriptor. The
                size and the frequency range are deliberately not translated:
                they are measurements and a standard designation, and both have
                to match the quotation and the drawings a reader compares them
                against. Rows without a spec render exactly as before — the
                data arrives model by model, and a page shows what it has. */}
            {model.spec && (
              <span className="hl-spec">
                <span>{model.spec.size}</span>
                {model.spec.note && <span>{model.spec.note}</span>}
                {model.spec.range && <span>{model.spec.range}</span>}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function resolve(lang: Lang, view: ChamberView): {
  label: string;
  title: string;
  description: string;
  path: string;
  trail: TrailStep[];
  models: readonly ChamberModel[];
  body?: TopicBody;
} {
  const chambers = chambersOverviewMeta[lang];
  const root: TrailStep = { name: chambers.label, path: chambersPath };

  switch (view.kind) {
    case "overview":
      return {
        label: chambers.label,
        title: chambers.title,
        description: chambers.description,
        path: chambersPath,
        trail: [root],
        models: [],
        body: overviewBody[lang],
      };
    case "industry": {
      const label = industryLabel[lang][view.slug];
      const { description } = chamberIndustryMeta[lang][view.slug];
      const path = industryPath(view.slug);
      return {
        label,
        title: label,
        description,
        path,
        trail: [root, { name: label, path }],
        models: modelsByIndustry(view.slug),
        body: industryBody[lang][view.slug],
      };
    }
    case "type": {
      const { label, description } = typeMeta[lang][view.slug];
      const path = typePath(view.slug);
      return {
        label,
        title: label,
        description,
        path,
        trail: [root, { name: label, path }],
        models: modelsByType(view.slug),
        body: typeBody[lang][view.slug],
      };
    }
    case "topic": {
      const { label, description } = topicMeta[lang][view.slug];
      const path = topicPath(view.slug);
      return {
        label,
        title: label,
        description,
        path,
        trail: [root, { name: label, path }],
        models: [],
        body: topicBody[lang][view.slug],
      };
    }
    case "downloads": {
      const { label, description } = downloadsMeta[lang];
      return {
        label,
        title: label,
        description,
        path: downloadsPath,
        trail: [{ name: label, path: downloadsPath }],
        models: [],
      };
    }
  }
}

/** Re-exported so the routes can build their metadata without importing the
 *  whole meta surface. */
export { chamberModels };
