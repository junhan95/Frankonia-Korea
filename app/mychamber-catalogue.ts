import {
  chamberModels,
  typeMeta,
  typePath,
  type ChamberModel,
} from "./chamber-sections";
import { industryLabel } from "./industries";
import { treeModels, type CatalogueEntry } from "./mychamber-advisor";
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
 * Every designation the decision tree ends in has to be a chamber the site
 * actually carries. A leaf naming a model that is not in `chamberModels` would
 * render as an empty result — the kind of omission nobody notices — so it stops
 * the build instead.
 *
 * The reverse is not an error. The Chamber Matrix does not place the Shielded
 * Room: it is the shell the range is built on rather than an EMC test site, and
 * MyChamber leaves it to its own product page. Which catalogue models the tree
 * reaches, and which it deliberately does not, is pinned in
 * tests/mychamber-matrix.test.mjs.
 */
const missing = treeModels().filter((name) => !chamberModels.some((m) => m.name === name));
if (missing.length > 0) {
  throw new Error(
    `mychamber-advisor: the decision tree ends in ${missing.join(", ")}, which is not in chamberModels.`,
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
