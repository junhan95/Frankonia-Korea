import { cartMeta, cartPath } from "./cart-sections";
import CartView from "./cart-view";
import { chambersPath } from "./chamber-sections";
import { mychamberPath } from "./mychamber-sections";
import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import { testSystemsPath } from "./test-system-sections";
import { localeRoute, type Lang } from "./site-config";

/**
 * The MyCart page. A server component that renders the chrome and hands the
 * basket view the three routes its empty state offers — the route tables stay
 * on this side of the boundary, as they do for MyChamber.
 *
 * No head photograph. Every other first page of a branch carries one; this is
 * not a branch of the catalogue but a reader's own working list, and a
 * panorama of somebody else's chamber above it would be decoration in front of
 * the one page on the site whose content the reader wrote.
 */
export default function MyCartPage({ lang }: { lang: Lang }) {
  const meta = cartMeta[lang];

  return (
    <>
      <StructuredData
        lang={lang}
        page="path"
        path={cartPath}
        trail={[{ name: meta.label, path: cartPath }]}
        description={meta.description}
      />
      <PageShell lang={lang} eyebrow="MYCART" title={meta.title} intro={meta.description}>
        <CartView
          lang={lang}
          links={{
            mychamber: localeRoute(lang, mychamberPath),
            chambers: localeRoute(lang, chambersPath),
            systems: localeRoute(lang, testSystemsPath),
          }}
        />
      </PageShell>
    </>
  );
}
