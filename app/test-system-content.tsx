import { industryLabel, industries, type Industry } from "./industries";
import PageShell from "./page-shell";
import StructuredData, { type TrailStep } from "./structured-data";
import { contactEmail, localeRoute, type Lang } from "./site-config";
import { chambersPath, industryPath as chamberIndustryPath } from "./chamber-sections";
import {
  modelsByProduct,
  productsOfCategory,
  standardsByIndustry,
  testCategories,
  testCategoryMeta,
  testCategoryPath,
  testIndustryMeta,
  testIndustryPath,
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

/**
 * Every page in the EMC Test Systems branch. Same shape as chamber-content:
 * the routes and the navigation are in place, the prose is not, and each page
 * states what it is and shows whatever the data can already answer rather than
 * rendering blank.
 */

export type TestSystemView =
  | { kind: "overview" }
  | { kind: "industry"; slug: Industry }
  | { kind: "test"; slug: TestCategory }
  | { kind: "product"; slug: TestProduct }
  | { kind: "standards" };

const copy = {
  ko: {
    eyebrow: "EMC TEST SYSTEMS",
    browse: "찾아보기",
    byIndustry: "산업군별",
    byTest: "시험 항목별",
    byProduct: "제품군별",
    standardsKicker: "STANDARDS",
    standardsTitle: (n: number) => `대응 규격 ${n}건`,
    /** Powertrain would otherwise be headed "대응 규격 0건". */
    standardsTitleShared: "대응 규격",
    equipmentKicker: "EQUIPMENT",
    equipmentTitle: "시험 구성 장비",
    modelsKicker: "MODELS",
    modelsTitle: (n: number) => `해당 모델 ${n}종`,
    count: (n: number) => `${n}종`,
    /** Antennas: the head office lists no model, so "0종" would read as an
     *  error rather than as work still to do. */
    countPending: "모델 정리 중",
    /** Powertrain is the one industry with no standards of its own. */
    sharedStandards: "고유 규격 없이 자동차 규격(CISPR 25 · ISO 11452)을 e-drive 조건에서 적용합니다.",
    sharedLink: "자동차 규격 보기",
    chamberCross: "같은 산업군의 챔버 보기",
    stubTitle: "콘텐츠 준비 중입니다",
    stubBody:
      "구조와 경로를 먼저 열어 둔 페이지입니다. 독일 본사 원본 자료를 정리해 순차적으로 채웁니다. 지금 필요한 사양이나 자료가 있으시면 바로 보내 드립니다.",
    stubCta: "자료 요청 · 기술 문의",
    subject: (label: string) => `[자료 요청] ${label}`,
  },
  en: {
    eyebrow: "EMC TEST SYSTEMS",
    browse: "Browse",
    byIndustry: "By Industry",
    byTest: "By Test",
    byProduct: "By Product",
    standardsKicker: "STANDARDS",
    standardsTitle: (n: number) => `${n} standards covered`,
    standardsTitleShared: "Standards covered",
    equipmentKicker: "EQUIPMENT",
    equipmentTitle: "What the setup is built from",
    modelsKicker: "MODELS",
    modelsTitle: (n: number) => `${n} models in this family`,
    count: (n: number) => `${n} models`,
    countPending: "models to be listed",
    sharedStandards:
      "No standards of its own: electric drivetrains are tested to the automotive standards — CISPR 25, ISO 11452 — under different conditions.",
    sharedLink: "See the automotive standards",
    chamberCross: "Chambers for the same industry",
    stubTitle: "Content in preparation",
    stubBody:
      "The route and the structure are in place; the copy is being prepared from the head office's own material. If you need a specification or a document now, we will send it straight over.",
    stubCta: "Request documents",
    subject: (label: string) => `[Document request] ${label}`,
  },
} as const;

export default function TestSystemPage({ lang, view }: { lang: Lang; view: TestSystemView }) {
  const t = copy[lang];
  const { label, title, description, path, trail } = resolve(lang, view);

  return (
    <>
      <StructuredData lang={lang} page="path" path={path} trail={trail} description={description} />
      <PageShell lang={lang} eyebrow={t.eyebrow} title={title} intro={description}>
        {view.kind === "overview" && <Axes lang={lang} />}
        {view.kind === "industry" && <IndustryBody lang={lang} slug={view.slug} />}
        {view.kind === "test" && <CategoryBody lang={lang} slug={view.slug} />}
        {view.kind === "product" && <ProductBody lang={lang} slug={view.slug} />}
        {view.kind === "standards" && <StandardsBody lang={lang} />}

        <section className="alt">
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
      </PageShell>
    </>
  );
}

const modelCount = (t: (typeof copy)[Lang], n: number) =>
  n > 0 ? t.count(n) : t.countPending;

/** The overview's three ways in, in the order the dropdown lists them. */
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
          {industries.map((industry, i) => (
            <a className="hl-row" key={industry} href={localeRoute(lang, testIndustryPath(industry))}>
              <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
              <b>{industryLabel[lang][industry]}</b>
              <span className="hl-desc">{testIndustryMeta[lang][industry].note}</span>
            </a>
          ))}
        </div>

        <div className="sec-head" style={{ marginTop: "72px" }}>
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
      </div>
    </section>
  );
}

/** An industry page answers "which standards, and where are the chambers".
 *  Powertrain has no standards of its own and says so. */
function IndustryBody({ lang, slug }: { lang: Lang; slug: Industry }) {
  const t = copy[lang];
  const standards = standardsByIndustry(slug);

  return (
    <section>
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">{t.standardsKicker}</span>
          <h2>{standards.length > 0 ? t.standardsTitle(standards.length) : t.standardsTitleShared}</h2>
        </div>

        {standards.length > 0 ? (
          <div className="hairline-list">
            {standards.map((standard, i) => (
              <div className="hl-row" key={standard.name}>
                <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                <b>{standard.name}</b>
                <span className="hl-desc">{standard[lang]}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="callout">
            {t.sharedStandards}{" "}
            <a className="hl-action" href={localeRoute(lang, testIndustryPath("automotive"))}>
              {t.sharedLink} →
            </a>
          </p>
        )}

        {/* The reason the two branches share one industry list. */}
        <p style={{ marginTop: "40px" }}>
          <a className="hl-action" style={{ marginLeft: 0 }} href={localeRoute(lang, chamberIndustryPath(slug))}>
            {t.chamberCross} →
          </a>
        </p>
      </div>
    </section>
  );
}

/** A test page is a setup, not a category: it names the product families the
 *  setup is built from. */
function CategoryBody({ lang, slug }: { lang: Lang; slug: TestCategory }) {
  const t = copy[lang];
  const products = productsOfCategory(slug);

  return (
    <section>
      <div className="wrap">
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
      </div>
    </section>
  );
}

function ProductBody({ lang, slug }: { lang: Lang; slug: TestProduct }) {
  const t = copy[lang];
  const models = modelsByProduct(slug);
  if (models.length === 0) return null;

  return (
    <section>
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">{t.modelsKicker}</span>
          <h2>{t.modelsTitle(models.length)}</h2>
        </div>
        <ModelList models={models} />
      </div>
    </section>
  );
}

/** The head office's 24 "Select standard" entries, re-sorted by industry. */
function StandardsBody({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section>
      <div className="wrap">
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
                  <a
                    className="hl-row"
                    key={standard.name}
                    href={localeRoute(lang, testIndustryPath(industry))}
                  >
                    <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                    <b>{standard.name}</b>
                    <span className="hl-desc">{standard[lang]}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

/** Model names stay in the head office's spelling. Not links: the model pages
 *  do not exist yet. */
function ModelList({ models }: { models: readonly TestModel[] }) {
  return (
    <div className="hairline-list">
      {models.map((model, i) => (
        <div className="hl-row" key={model.name}>
          <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
          <b>{model.name}</b>
          <span className="hl-desc">{model.desc}</span>
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
      };
    case "industry": {
      const label = industryLabel[lang][view.slug];
      const { description } = testIndustryMeta[lang][view.slug];
      const path = testIndustryPath(view.slug);
      return { label, title: label, description, path, trail: [root, { name: label, path }] };
    }
    case "test": {
      const { label, description } = testCategoryMeta[lang][view.slug];
      const path = testCategoryPath(view.slug);
      return { label, title: label, description, path, trail: [root, { name: label, path }] };
    }
    case "product": {
      const { label, description } = testProductMeta[lang][view.slug];
      const path = testProductPath(view.slug);
      return { label, title: label, description, path, trail: [root, { name: label, path }] };
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
