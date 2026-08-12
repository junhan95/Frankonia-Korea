import { buildCatalogue } from "./mychamber-catalogue";
import { mychamberMeta, mychamberPath } from "./mychamber-sections";
import MyChamberWizard from "./mychamber-wizard";
import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import type { Lang } from "./site-config";

/**
 * The MyChamber page. A server component: the catalogue is built here and
 * handed to the wizard as data, so chamber-sections.ts stays out of the client
 * bundle — see the note in mychamber-catalogue.ts.
 */
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
        <MyChamberWizard lang={lang} catalogue={buildCatalogue(lang)} />
      </PageShell>
    </>
  );
}
