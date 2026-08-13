import {
  chamberModels,
  typeMeta,
  typePath,
  type ChamberModel,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import { modelFit, type CatalogueEntry } from "./mychamber-advisor";
import { asset, localeRoute, type Lang } from "./site-config";

/**
 * The join between the catalogue (chamber-sections.ts) and the advisor's index
 * of it (mychamber-advisor.ts).
 *
 * It lives in its own module for two reasons. It has to run on the server:
 * chamber-sections.ts carries both locales of every model page's prose, tens of
 * kilobytes of it, and importing that from a client module would ship all of it
 * to the browser to read four fields off each model — what crosses the boundary
 * is the 32 rows below and nothing else. And it has to be importable without
 * JSX, so the matrix conformance test can build the same catalogue the page
 * builds and score against it.
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
  rvcZfold: { src: "/chambers/images/stirrer-zfold.webp", w: 1600, h: 1200 },
} as const;

/**
 * Reverberation chambers split by how they stir the field, and the photograph
 * has to follow. `type-rvc-reverberation.webp` shows the large disc stirrer
 * turning in the ceiling, which only the XL and XXL sizes have — every other
 * RVC stirs with a Z-fold standing against the wall, so those get the Z-fold
 * photograph instead. Read off `spec.note`, the one place the catalogue states
 * which stirrer a model carries; the note is locale-independent English.
 */
const shotFor = (model: ChamberModel) => {
  if (model.type !== "rvc") return shots[model.industry];
  return model.spec?.note?.includes("disc stirrer") ? shots.rvc : shots.rvcZfold;
};

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

export const buildCatalogue = (lang: Lang): CatalogueEntry[] =>
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
