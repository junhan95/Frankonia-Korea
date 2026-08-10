import {
  chamberModels,
  typeMeta,
  typePath,
  type ChamberModel,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import { modelFit, type CatalogueEntry } from "./mychamber-advisor";
import { mychamberMeta, mychamberPath } from "./mychamber-sections";
import MyChamberWizard from "./mychamber-wizard";
import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import { asset, localeRoute, type Lang } from "./site-config";

/**
 * The MyChamber page. A server component: it does the join between the
 * catalogue (chamber-sections.ts) and the advisor's index of it
 * (mychamber-advisor.ts), and hands the wizard the flat result.
 *
 * That join is here rather than inside the wizard for the same reason the
 * navigation's route tables are not inside NavDrawer: chamber-sections.ts
 * carries both locales of every technology topic's prose, tens of kilobytes of
 * it, and importing it from a client module would ship all of that to the
 * browser to read four fields off each model. What crosses the boundary is the
 * 32 rows below and nothing else.
 */

/**
 * Category photographs, and the reason a result card shows one.
 *
 * There is no photograph of an individual model in this repository — the head
 * office publishes per-category imagery and cutaway renders, which is what the
 * asset ledger (docs/source/chambers-assets.md) records. A card therefore shows
 * the photograph of the category the model belongs to, and says so underneath.
 * A picture captioned as the model itself would be the one claim on this page
 * the catalogue does not support.
 */
const shots = {
  automotive: { src: "/chambers/images/industry-automotive.webp", w: 900, h: 578 },
  military: { src: "/chambers/images/industry-military.webp", w: 744, h: 591 },
  commercial: { src: "/chambers/images/industry-commercial.webp", w: 900, h: 636 },
  powertrain: { src: "/chambers/images/industry-powertrain-edtc.webp", w: 900, h: 600 },
  rvc: { src: "/chambers/images/type-rvc-reverberation.webp", w: 900, h: 600 },
} as const;

const shotFor = (model: ChamberModel) =>
  model.type === "rvc" ? shots.rvc : shots[model.industry];

/**
 * Every model must be indexed. A chamber added to the catalogue without a
 * `modelFit` entry would silently never be recommended — which is the kind of
 * omission nobody notices, so it stops the build instead.
 */
const unindexed = chamberModels.filter((m) => !modelFit[m.name]).map((m) => m.name);
if (unindexed.length > 0) {
  throw new Error(
    `mychamber-advisor: no modelFit entry for ${unindexed.join(", ")} — every chamber in chamberModels needs one.`,
  );
}
const unknown = Object.keys(modelFit).filter(
  (name) => !chamberModels.some((m) => m.name === name),
);
if (unknown.length > 0) {
  throw new Error(
    `mychamber-advisor: modelFit names ${unknown.join(", ")}, which is not in chamberModels.`,
  );
}

const catalogue = (lang: Lang): CatalogueEntry[] =>
  chamberModels.map((model) => ({
    name: model.name,
    desc: model.desc,
    industry: model.industry,
    industryLabel: industryLabel[lang][model.industry],
    type: model.type,
    typeLabel: typeMeta[lang][model.type].label,
    spec: model.spec,
    href: localeRoute(lang, typePath(model.type)),
    shot: { ...shotFor(model), src: asset(shotFor(model).src) },
  }));

export default function MyChamberPage({ lang }: { lang: Lang }) {
  const meta = mychamberMeta[lang];

  return (
    <>
      <StructuredData
        lang={lang}
        page="path"
        path={mychamberPath}
        trail={[{ name: meta.label, path: mychamberPath }]}
        description={meta.description}
      />
      <PageShell lang={lang} eyebrow="MYCHAMBER" title={meta.title} intro={meta.description}>
        <MyChamberWizard lang={lang} catalogue={catalogue(lang)} />
      </PageShell>
    </>
  );
}
