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
  industryPath,
  modelsByIndustry,
  modelsByType,
  panoramaSize,
  referenceCountryLabel,
  referenceGroups,
  referenceTotals,
  topicBody,
  topicMeta,
  topicPath,
  typeMeta,
  typePath,
  type ChamberIndustry,
  type ChamberModel,
  type ChamberTopic,
  type ChamberType,
  type TopicBody,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import PageShell from "./page-shell";
import StructuredData, { type TrailStep } from "./structured-data";
import { asset, contactEmail, localeRoute, plural, type Lang } from "./site-config";

/**
 * Every page in the Anechoic Chambers branch, plus the downloads hub.
 *
 * All five technology topics now carry their copy. The index pages — by
 * industry, by chamber type — and the downloads hub still do not: each states
 * what it is (from the same meta the navigation and the search snippet read)
 * and, where the answer is already in the data, lists the models it covers,
 * then says outright that the prose is still being prepared rather than letting
 * the page read as broken.
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
    modelCount: (n: number) => `${n}종`,
    modelsTitle: (n: number) => `해당 모델 ${n}종`,
    /** Counted from `referenceGroups`, not written down — see `referenceTotals`. */
    referenceCount: (entries: number, countries: number) => `${entries}건 · ${countries}개국`,
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
    modelCount: (n: number) => plural(n, "model"),
    modelsTitle: (n: number) => `${plural(n, "model")} in this category`,
    referenceCount: (entries: number, countries: number) =>
      `${plural(entries, "entry", "entries")} · ${plural(countries, "country", "countries")}`,
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

  return (
    <>
      <StructuredData lang={lang} page="path" path={path} trail={trail} description={description} />
      <PageShell
        lang={lang}
        eyebrow={view.kind === "downloads" ? t.eyebrowDownloads : t.eyebrow}
        title={title}
        intro={description}
      >
        {view.kind === "overview" && <Axes lang={lang} />}

        {body && <TopicBodyView lang={lang} body={body} />}

        {models.length > 0 && (
          <section>
            <div className="wrap">
              <div className="sec-head">
                <span className="kicker">{t.models}</span>
                <h2>{t.modelsTitle(models.length)}</h2>
              </div>
              <ModelList models={models} />
            </div>
          </section>
        )}

        {!body && (
        <section className={models.length > 0 || view.kind === "overview" ? "alt" : undefined}>
          <div className="wrap">
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
          </div>
        </section>
        )}
      </PageShell>
    </>
  );
}

/** The overview's two ways in, side by side — the same pairing the dropdown
 *  makes, so a reader who arrived without using the menu still sees both. */
function Axes({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section>
      <div className="wrap">
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
      </div>
    </section>
  );
}

/** A technology topic's page copy: lead paragraphs, then the catalogue's own
 *  titled groups as check lists, then its closing line. Nothing here is a
 *  component this site did not already have — the company pages established
 *  `.prose`, `.check-list` and `.figure-wide`.
 *
 *  References is the exception. It has no check-list groups at all; its source
 *  page is the two lead paragraphs, a set of 360° panoramas and a customer
 *  list, so those arrive as the two blocks after the groups band. Which bands
 *  render is driven by what the body carries, and each band that appears is
 *  still in the source's own order. */
function TopicBodyView({ lang, body }: { lang: Lang; body: TopicBody }) {
  const t = copy[lang];
  const { panoramas, references } = body;

  return (
    <>
      <section>
        <div className="wrap">
          <div className="prose">
            {body.lead.map((p) => <p key={p}>{p}</p>)}
          </div>
          {body.figure && (
            <figure className="figure figure-wide" style={{ marginTop: "44px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(body.figure.src)} alt="" width={body.figure.w} height={body.figure.h} loading="lazy" decoding="async" />
            </figure>
          )}
        </div>
      </section>

      {body.groups.length > 0 && (
        <section className="alt">
          <div className="wrap">
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
          </div>
        </section>
      )}

      {panoramas && (
        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <h2>{panoramas.title}</h2>
              {/* How to use the strip belongs with the heading over all three,
                  not repeated under each one. */}
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
                    {/* The scroller takes the focus and the label: it is the
                        element the arrow keys pan, so it has to be reachable
                        without a pointer. */}
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
          </div>
        </section>
      )}

      {references && (
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">
                {t.referenceCount(referenceTotals.entries, referenceTotals.countries)}
              </span>
              <h2>{references.title}</h2>
            </div>
            {/* `EntryList`, not `.hairline-list`: a country's customers run to a
                dozen names and have to wrap, which is exactly the case the
                entry list exists for. */}
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
          </div>
        </section>
      )}
    </>
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
