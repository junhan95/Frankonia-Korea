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
  modelBody,
  modelMeta,
  modelPath,
  modelsByIndustry,
  modelsBySlug,
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
  type ModelBody,
  type TopicBody,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import { CheckColumn, Groups, Lead, Tables } from "./page-parts";
import PageShell, { type HeadShot } from "./page-shell";
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
  /** One model, by `ChamberModel.slug` — a string rather than a union because
   *  the slugs are derived from the model list, not declared beside it. */
  | { kind: "model"; slug: string }
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
    /**
     * Over the tables. Three things a reader needs at this point, in the order
     * they need them: these are standard sizes and yours will probably differ,
     * the figures are the outside of the chamber and not the room they get,
     * and here is what to do next.
     *
     * The second line is the one that was missing. `External dimension` is the
     * column head, and a reader planning a hall has to know whether to subtract
     * the lining before it means anything — so the note says it in words rather
     * than leaving the header to carry it.
     *
     * Where the figures came from is not on the page: that belongs in
     * docs/source/chambers-models.md, not in front of someone sizing a room.
     */
    specsNote: "Frankonia 표준 구성입니다. 치수는 외형 기준으로, 챔버 자체의 크기이며 내부 유효 공간이 아닙니다. 설치 공간과 적용 규격에 맞춰 치수와 구성을 조정할 수 있으며, 상세 도면과 견적은 문의해 주시면 안내해 드립니다.",
    overview: "한눈에",
    standardsKicker: "적용 규격",
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
      "Frankonia standard configurations. The dimensions are external — the size of the chamber itself, not the usable volume inside it. Both size and layout can be adapted to your site and to the standards you test against; contact us for a drawing and a quotation.",
    overview: "At a glance",
    standardsKicker: "Standards",
    stubTitle: "Documents on request",
    stubBody:
      "Tell us which specification, drawing or standard you need for this, and an engineer will go through it and come back to you.",
    stubCta: "Request documents",
    subject: (label: string) => `[Document request] ${label}`,
  },
} as const;

/* The head band of the chambers index, which is where the Anechoic Chambers
   menu opens.
   The SAC-10 Hybrid panorama from Kösching: a 4:1 frame of one room from wall
   to wall, which is the shape a band this shallow wants — a photograph framed
   for a page loses most of its height here. It also answers the question the
   index asks, which is what all twenty-seven of these are. Framed above centre:
   the absorber ceiling and the far corner, not the floor. */
const overviewShot: HeadShot = {
  src: "/chambers/images/pano-sac-10-hybrid.webp", w: 2000, h: 500, at: "50% 38%",
};

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
  // The summary strip sits directly under the lead: it is what a reader checks
  // before deciding whether the rest of the page is about their problem.
  if (body && "overview" in body && body.overview) {
    bands.push({ key: "overview", node: <Overview lang={lang} items={body.overview} /> });
  }
  // A model page does not list itself. The RVC page is the exception the
  // condition is written for — seven models under one slug, and the reader
  // arriving from "RVC XL" needs to see which row is theirs.
  if (models.length > 1 || view.kind !== "model") {
    if (models.length > 0) {
      bands.push({
        key: "models",
        node: <Models lang={lang} models={models} here={view.kind === "model" ? view.slug : undefined} />,
      });
    }
  }
  if (body?.tables?.length) {
    bands.push({
      key: "tables",
      node: <Tables tables={body.tables} kicker={t.specs} title={t.specsTitle} note={t.specsNote} />,
    });
  }
  if (body && "standards" in body && body.standards) {
    bands.push({ key: "standards", node: <Standards lang={lang} groups={body.standards} /> });
  }
  if (body && body.groups.length > 0) bands.push({ key: "groups", node: <Groups body={body} /> });
  // `in` rather than `?.`: the two body shapes add different optional bands to
  // `PageBody`, so the union has neither property in common — narrowing is what
  // says "this one is a topic body" without a cast.
  if (body && "panoramas" in body && body.panoramas) {
    bands.push({ key: "panoramas", node: <Panoramas panoramas={body.panoramas} /> });
  }
  if (body && "references" in body && body.references) {
    bands.push({ key: "references", node: <References lang={lang} references={body.references} /> });
  }
  if (!body) bands.push({ key: "stub", node: <Stub lang={lang} label={label} /> });

  return (
    <>
      <StructuredData lang={lang} page="path" path={path} trail={trail} description={description} />
      <PageShell
        lang={lang}
        eyebrow={view.kind === "downloads" ? t.eyebrowDownloads : t.eyebrow}
        title={title}
        intro={description}
        /* The index only. Every page below it — a type, an industry, a model —
           opens its own subject with a plate a few hundred pixels down, and a
           photograph in the head as well would be two chambers before a
           sentence. */
        shot={view.kind === "overview" ? overviewShot : undefined}
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

function Models({
  lang,
  models,
  here,
}: {
  lang: Lang;
  models: readonly ChamberModel[];
  here?: string;
}) {
  const t = copy[lang];
  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.models}</span>
        <h2>{t.modelsTitle(models.length)}</h2>
      </div>
      <ModelList lang={lang} models={models} here={here} />
    </>
  );
}

/** The head office's Overview strip. Badges rather than a table: four to six
 *  pairs summarising the page, not measurements to compare row by row. The
 *  four-up variant already exists for the landing page's figures. */
function Overview({ lang, items }: { lang: Lang; items: NonNullable<ModelBody["overview"]> }) {
  return (
    <>
      <div className="sec-head">
        <h2>{copy[lang].overview}</h2>
      </div>
      {/* `.badges` carries the grid; `-four` and `-wide` only override its
          column count. Without the base class the strip fell back to block and
          printed six full-width rows. */}
      <div className={`badges badges-compact ${items.length === 4 ? "badges-four" : "badges-wide"}`}>
        {items.map((item) => (
          <div className="bd" key={item.label}>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/** Typical Product and Verification Standards, in the head office's own
 *  pairing: emission on the left, immunity on the right. */
function Standards({ lang, groups }: { lang: Lang; groups: NonNullable<ModelBody["standards"]> }) {
  return (
    <>
      {groups.map((group, i) => (
        <div key={group.title} style={i > 0 ? { marginTop: "56px" } : undefined}>
          <div className="sec-head">
            {i === 0 && <span className="kicker">{copy[lang].standardsKicker}</span>}
            <h2>{group.title}</h2>
          </div>
          <div className="check-cols">
            {group.columns.map((column) => (
              <CheckColumn key={column.head} head={column.head} items={column.items} />
            ))}
          </div>
        </div>
      ))}
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

/**
 * Model names stay in the head office's spelling — see the note on
 * ChamberModel.
 *
 * Each row links to its model page. `lang` is threaded down for that: the row
 * is the only place on an index page where a reader can get from a designation
 * to the figures behind it, and until the model pages existed it went nowhere.
 * The seven reverberation chambers all point at the same page, which is where
 * both sources tabulate them together.
 *
 * `here` is the slug of the page the list is on, and its rows render as plain
 * `div`s. Only the RVC page has any — seven models under one slug — and seven
 * links back to the page you are reading is worse than no link at all.
 */
function ModelList({
  lang,
  models,
  here,
}: {
  lang: Lang;
  models: readonly ChamberModel[];
  here?: string;
}) {
  return (
    <div className="hairline-list">
      {models.map((model, i) => {
        const Row = model.slug === here ? "div" : "a";
        return (
        <Row
          className="hl-row"
          key={model.name}
          href={model.slug === here ? undefined : localeRoute(lang, modelPath(model.slug))}
        >
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
        </Row>
        );
      })}
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
  /** A union rather than a common supertype: the two shapes add different
   *  optional bands to `PageBody`, and the band list narrows with `in` before
   *  it reads either. */
  body?: TopicBody | ModelBody;
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
    case "model": {
      const { label, description } = modelMeta[lang][view.slug];
      const path = modelPath(view.slug);
      const models = modelsBySlug(view.slug);
      // Three steps, not two: the model's own chamber type is the way back to
      // its siblings, and a reader who arrived from a search result has no
      // other route to them. Every model under one slug shares a type, so the
      // first is as good as any.
      //
      // Except where the type index leads nowhere but here — the shielded room
      // is the only model of its form, and the seven reverberation chambers
      // share this one page. There the step is not a step: the breadcrumb read
      // "Shielded Room › Shielded Room".
      const type = models[0].type;
      const typeIsThisPage = modelsByType(type).every((m) => m.slug === view.slug);
      return {
        label,
        title: label,
        description,
        path,
        trail: typeIsThisPage
          ? [root, { name: label, path }]
          : [root, { name: typeMeta[lang][type].label, path: typePath(type) }, { name: label, path }],
        models,
        body: modelBody[lang][view.slug],
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
