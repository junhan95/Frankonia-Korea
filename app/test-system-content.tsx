import type { ReactNode } from "react";
import { industryLabel, industries } from "./industries";
import { Groups, Lead, Tables } from "./page-parts";
import PageShell from "./page-shell";
import StructuredData, { type TrailStep } from "./structured-data";
import { contactEmail, localeRoute, type Lang } from "./site-config";
import { chambersPath, industryPath as chamberIndustryPath,
  isChamberIndustry } from "./chamber-sections";
import {
  categoryBody,
  modelGroups,
  modelsByProduct,
  overviewBody,
  productBody,
  productsOfCategory,
  standardsByIndustry,
  testCategories,
  testCategoryMeta,
  testCategoryPath,
  testModels,
  testProductMeta,
  testProductPath,
  testProducts,
  testStandards,
  testStandardsMeta,
  testStandardsPath,
  testSystemsOverviewMeta,
  testSystemsPath,
  type TestCategory,
  type TestModel,
  type TestProduct,
} from "./test-system-sections";
import type { PageBody } from "./page-body";

/**
 * Every page in the EMC Test Systems branch.
 *
 * Same construction as chamber-content: the page is a list of bands in reading
 * order, and the alternating `.alt` fill is counted here rather than written
 * into each band — whether a band has a neighbour above it is not knowable
 * where the band is declared, and which bands exist varies by page.
 *
 * The document-request band is the one that appears on every page rather than
 * only on the empty ones. It is not an under-construction notice: the head
 * office puts a datasheet PDF under each of these products and this site does
 * not carry those files, so the band is how a reader gets one.
 */

export type TestSystemView =
  | { kind: "overview" }
  | { kind: "test"; slug: TestCategory }
  | { kind: "product"; slug: TestProduct }
  | { kind: "standards" };

const copy = {
  ko: {
    eyebrow: "EMC TEST SYSTEMS",
    browse: "찾아보기",
    byTest: "시험 항목별",
    byProduct: "제품군별",
    standardsKicker: "STANDARDS",
    equipmentKicker: "EQUIPMENT",
    equipmentTitle: "시험 구성 장비",
    modelsKicker: "MODELS",
    modelsTitle: (n: number) => `해당 모델 ${n}종`,
    count: (n: number) => `${n}종`,
    /** Kept for a family whose models are not listed yet: "0종" would read as
     *  an error. The label points at the way to get the specification instead. */
    countPending: "모델 문의",
    specsKicker: "SPECIFICATIONS",
    specsTitle: "사양",
    specsNote: "본사 제품 페이지와 카탈로그의 표를 그대로 옮긴 것입니다. 수치와 규격 표기는 번역하지 않습니다 — 도면·견적서와 대조할 값이기 때문입니다.",
    chamberCross: "같은 산업군의 챔버 보기",
    stubTitle: "자료를 보내 드립니다",
    stubBody:
      "이 항목의 상세 자료는 요청하시면 바로 보내 드립니다. 필요한 사양·도면·적용 규격을 알려 주시면 담당 엔지니어가 검토해 회신드립니다.",
    stubCta: "자료 요청 · 기술 문의",
    subject: (label: string) => `[자료 요청] ${label}`,
  },
  en: {
    eyebrow: "EMC TEST SYSTEMS",
    browse: "Browse",
    byTest: "By Test",
    byProduct: "By Product",
    standardsKicker: "STANDARDS",
    equipmentKicker: "EQUIPMENT",
    equipmentTitle: "What the setup is built from",
    modelsKicker: "MODELS",
    modelsTitle: (n: number) => `${n} models in this family`,
    count: (n: number) => `${n} models`,
    countPending: "models on request",
    specsKicker: "SPECIFICATIONS",
    specsTitle: "Specifications",
    specsNote:
      "Reproduced from the tables on the head office's own product pages and catalogues. Figures and standard designations are not translated — they are what a reader matches against a drawing and a quotation.",
    chamberCross: "Chambers for the same industry",
    stubTitle: "Documents on request",
    stubBody:
      "Tell us which specification, drawing or standard you need for this, and an engineer will go through it and come back to you.",
    stubCta: "Request documents",
    subject: (label: string) => `[Document request] ${label}`,
  },
} as const;

export default function TestSystemPage({ lang, view }: { lang: Lang; view: TestSystemView }) {
  const t = copy[lang];
  const { label, title, description, path, trail, body } = resolve(lang, view);

  const bands: { key: string; node: ReactNode }[] = [];

  if (body) bands.push({ key: "lead", node: <Lead body={body} /> });
  if (view.kind === "overview") bands.push({ key: "axes", node: <Axes lang={lang} /> });
  if (view.kind === "test") bands.push({ key: "equipment", node: <Equipment lang={lang} slug={view.slug} /> });
  if (view.kind === "product") bands.push({ key: "models", node: <Models lang={lang} slug={view.slug} /> });
  if (view.kind === "standards") bands.push({ key: "standards", node: <Standards lang={lang} /> });
  if (body?.tables?.length) {
    bands.push({
      key: "tables",
      node: <Tables tables={body.tables} kicker={t.specsKicker} title={t.specsTitle} note={t.specsNote} />,
    });
  }
  if (body && body.groups.length > 0) bands.push({ key: "groups", node: <Groups body={body} /> });
  bands.push({ key: "documents", node: <Documents lang={lang} label={label} /> });

  return (
    <>
      <StructuredData lang={lang} page="path" path={path} trail={trail} description={description} />
      <PageShell lang={lang} eyebrow={t.eyebrow} title={title} intro={description}>
        {bands.map((band, i) => (
          <section key={band.key} className={i % 2 === 1 ? "alt" : undefined}>
            <div className="wrap">{band.node}</div>
          </section>
        ))}
      </PageShell>
    </>
  );
}

const modelCount = (t: (typeof copy)[Lang], n: number) =>
  n > 0 ? t.count(n) : t.countPending;

/** The overview's two ways in, in the order the dropdown lists them. */
function Axes({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.browse}</span>
        <h2>{t.byTest}</h2>
      </div>
      <div className="hairline-list">
        {testCategories.map((category, i) => (
          <a className="hl-row" key={category} href={localeRoute(lang, testCategoryPath(category))}>
            <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
            <b>{testCategoryMeta[lang][category].label}</b>
            <span className="hl-desc">{testCategoryMeta[lang][category].note}</span>
          </a>
        ))}
      </div>

      <div className="sec-head" style={{ marginTop: "72px" }}>
        <h2>{t.byProduct}</h2>
      </div>
      <div className="hairline-list">
        {testProducts.map((product, i) => (
          <a className="hl-row" key={product} href={localeRoute(lang, testProductPath(product))}>
            <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
            <b>{testProductMeta[lang][product].label}</b>
            <span className="hl-desc">{modelCount(t, modelsByProduct(product).length)}</span>
          </a>
        ))}
      </div>
    </>
  );
}

/** A test page is a setup, not a category: it names the product families the
 *  setup is built from. */
function Equipment({ lang, slug }: { lang: Lang; slug: TestCategory }) {
  const t = copy[lang];
  const products = productsOfCategory(slug);

  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.equipmentKicker}</span>
        <h2>{t.equipmentTitle}</h2>
      </div>
      <div className="hairline-list">
        {products.map((product, i) => (
          <a className="hl-row" key={product} href={localeRoute(lang, testProductPath(product))}>
            <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
            <b>{testProductMeta[lang][product].label}</b>
            <span className="hl-desc">{modelCount(t, modelsByProduct(product).length)}</span>
          </a>
        ))}
      </div>
    </>
  );
}

/**
 * A product family's models, under the source's own headings.
 *
 * The amplifier page is why this is grouped. Seventy rows each repeating their
 * band — "10 kHz – 300 MHz" seventeen times over — is a list that has to be
 * read to be scanned. The head office prints the band once as a heading and the
 * model names under it, and so does this.
 *
 * The numbering restarts inside each group for the same reason: a reader
 * counting the models in a band wants that band's count, not a running total
 * across eleven bands.
 */
function Models({ lang, slug }: { lang: Lang; slug: TestProduct }) {
  const t = copy[lang];
  const groups = modelGroups(slug);
  const total = modelsByProduct(slug).length;
  if (total === 0) return null;

  return (
    <>
      <div className="sec-head">
        <span className="kicker">{t.modelsKicker}</span>
        <h2>{t.modelsTitle(total)}</h2>
      </div>
      {groups.map((group, i) => (
        <div key={group.title ?? "ungrouped"}>
          {group.title && (
            <h3 className="sub-head" style={i > 0 ? { marginTop: "40px" } : undefined}>
              {group.title}
            </h3>
          )}
          <ModelList models={group.models} />
        </div>
      ))}
    </>
  );
}

/**
 * The head office's 24 "Select standard" entries, re-sorted by industry.
 *
 * This is the only page in the branch that reads the industry axis, and since
 * the industry pages went it is also the only place that axis is stated. The
 * rows are not links: a standard has no page of its own here, and a row that
 * led back to a heading a reader can already see was the whole reason the
 * industry pages read as a second door into one room.
 *
 * Powertrain is filtered out rather than headed "0 standards" — electric
 * drivetrains are tested to the automotive standards, so it has none of its own
 * and an empty heading would read as missing data instead of as the fact.
 */
function Standards({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <>
      {industries
        .filter((industry) => standardsByIndustry(industry).length > 0)
        .map((industry, group) => (
          <div key={industry} style={group > 0 ? { marginTop: "72px" } : undefined}>
            <div className="sec-head">
              {group === 0 && <span className="kicker">{t.standardsKicker}</span>}
              <h2>{industryLabel[lang][industry]}</h2>
            </div>
            <div className="hairline-list">
              {standardsByIndustry(industry).map((standard, i) => (
                <div className="hl-row" key={standard.name}>
                  <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                  <b>{standard.name}</b>
                  <span className="hl-desc">{standard[lang]}</span>
                </div>
              ))}
            </div>

            {/* The bridge to the chamber branch, which used to hang off the
                industry page. The two branches share one industry list, but
                the sharing is of slugs, not of categories: the chamber branch
                has no `others` page — its reverberation chambers are filed by
                what they test and its shielded room sits with the commercial
                range — while test standards under `others` exist. Hence the
                guard rather than a link to a 404. */}
            {isChamberIndustry(industry) && (
              <p style={{ marginTop: "40px" }}>
                <a
                  className="hl-action"
                  style={{ marginLeft: 0 }}
                  href={localeRoute(lang, chamberIndustryPath(industry))}
                >
                  {t.chamberCross} →
                </a>
              </p>
            )}
          </div>
        ))}
    </>
  );
}

function Documents({ lang, label }: { lang: Lang; label: string }) {
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

/** Model names stay in the head office's spelling. Not links: the model pages
 *  do not exist yet. A row with no description is not an omission — the head
 *  office's amplifier matrix publishes the band and the name and nothing else.
 *  See the note on `TestModel.desc`. */
function ModelList({ models }: { models: readonly TestModel[] }) {
  return (
    <div className="hairline-list">
      {models.map((model, i) => (
        <div className="hl-row" key={model.name}>
          <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
          <b>{model.name}</b>
          {model.desc && <span className="hl-desc">{model.desc}</span>}
        </div>
      ))}
    </div>
  );
}

function resolve(lang: Lang, view: TestSystemView): {
  label: string;
  title: string;
  description: string;
  path: string;
  trail: TrailStep[];
  body?: PageBody;
} {
  const overview = testSystemsOverviewMeta[lang];
  const root: TrailStep = { name: overview.label, path: testSystemsPath };

  switch (view.kind) {
    case "overview":
      return {
        label: overview.label,
        title: overview.title,
        description: overview.description,
        path: testSystemsPath,
        trail: [root],
        body: overviewBody[lang],
      };
    case "test": {
      const { label, description } = testCategoryMeta[lang][view.slug];
      const path = testCategoryPath(view.slug);
      return {
        label,
        title: label,
        description,
        path,
        trail: [root, { name: label, path }],
        body: categoryBody[lang][view.slug],
      };
    }
    case "product": {
      const { label, description } = testProductMeta[lang][view.slug];
      const path = testProductPath(view.slug);
      return {
        label,
        title: label,
        description,
        path,
        trail: [root, { name: label, path }],
        body: productBody[lang][view.slug],
      };
    }
    case "standards": {
      const { label, description } = testStandardsMeta[lang];
      return {
        label,
        title: label,
        description,
        path: testStandardsPath,
        trail: [root, { name: label, path: testStandardsPath }],
      };
    }
  }
}

export { testModels, testStandards, chambersPath };
