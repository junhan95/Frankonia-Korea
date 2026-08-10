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
  type TopicBody,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import { Groups, Lead, Tables } from "./page-parts";
import PageShell from "./page-shell";
import StructuredData, { type TrailStep } from "./structured-data";
import { asset, contactEmail, localeRoute, plural, type Lang } from "./site-config";

/**
 * Every page in the Anechoic Chambers branch, plus the downloads hub.
 *
 * The overview, the four industry indexes, the six chamber-type indexes and the
 * five technology topics all carry their copy from the 2026 catalogue. Only the
 * downloads hub still does not: it states what it is, from the same meta the
 * navigation and the search snippet read, and then offers the documents by
 * email rather than letting the page read as broken.
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
    /** Over the tables: these are the standard sizes, and the reader's own
     *  requirement is rarely exactly one of them — so the note ends on the
     *  next step rather than on where the numbers came from. */
    specsNote: "Frankonia 표준 사양 기준입니다. 설치 공간과 적용 규격에 따라 치수와 구성은 조정할 수 있으며, 상세 도면과 견적은 문의해 주시면 안내해 드립니다.",
    stubTitle: "자료를 보내 드립니다",
    stubBody:
      "이 항목의 상세 자료는 요청하시면 바로 보내 드립니다. 필요한 사양·도면·적용 규격을 알려 주시면 담당 엔지니어가 검토해 회신드립니다.",
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
      "Frankonia standard configurations. Dimensions and layout can be adapted to your site and to the standards you test against — contact us for a drawing and a quotation.",
    stubTitle: "Documents on request",
    stubBody:
      "Tell us which specification, drawing or standard you need for this, and an engineer will go through it and come back to you.",
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
  if (body?.tables?.length) {
    bands.push({
      key: "tables",
      node: <Tables tables={body.tables} kicker={t.specs} title={t.specsTitle} note={t.specsNote} />,
    });
  }
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
