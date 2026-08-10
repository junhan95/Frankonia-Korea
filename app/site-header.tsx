import type { CSSProperties } from "react";
import {
  chamberIndustries,
  chamberIndustryMeta,
  chamberModels,
  chamberNavCopy,
  chamberTopics,
  chamberTypes,
  chambersPath,
  downloadsPath,
  industryPath,
  modelsByType,
  topicMeta,
  topicPath,
  typeMeta,
  typePath,
} from "./chamber-sections";
import { companySections, sectionMeta, sectionPath } from "./company-sections";
import { industryLabel } from "./industries";
import LangSwitch from "./lang-switch";
import { mychamberMeta, mychamberPath } from "./mychamber-sections";
import NavDrawer from "./nav-drawer";
import {
  modelsByProduct,
  testCategories,
  testCategoryMeta,
  testCategoryPath,
  testModels,
  testNavCopy,
  testProductMeta,
  testProductPath,
  testProducts,
  testStandards,
  testStandardsPath,
  testSystemsPath,
} from "./test-system-sections";
import { asset, localeRoute, type Lang } from "./site-config";

/**
 * Shared sticky header. A server component: the route tables and label sets
 * below are large — both locales of every chamber and test-system caption —
 * and none of it is needed after the HTML exists. The two pieces that do need
 * the browser are separate files and import none of this: NavDrawer holds the
 * open/closed state, LangSwitch needs to know the current path.
 *
 * `home` anchors resolve against the locale's landing page so the nav works
 * from any route. Dropdown targets map 1:1 to the routes planned in
 * docs/FRANKONIA-WEB-PLAN.md (§2).
 */
export default function SiteHeader({ lang, t }: { lang: Lang; t: HeaderCopy }) {
  const home = localeRoute(lang);

  const company = companySections.map(
    (s) => ({ label: sectionMeta[lang][s].label, href: localeRoute(lang, sectionPath(s)) }),
  );

  // Chambers is the one branch with two ways in — by industry and by chamber
  // form — over the same 27 products. Both axes are listed side by side rather
  // than nested, so neither is hidden behind a hover and the panel stays two
  // levels deep. The captions differ on purpose: the industry column names
  // representative models, the type column counts them, which is what tells a
  // reader at a glance that the two columns are not the same list twice.
  const cn = chamberNavCopy[lang];
  const chamberGroups: NavGroup[] = [
    {
      title: cn.byIndustry,
      links: chamberIndustries.map((i) => ({
        label: industryLabel[lang][i],
        href: localeRoute(lang, industryPath(i)),
        note: chamberIndustryMeta[lang][i].note,
      })),
    },
    {
      title: cn.byType,
      links: chamberTypes.map((ty) => ({
        label: typeMeta[lang][ty].label,
        href: localeRoute(lang, typePath(ty)),
        note: cn.models(modelsByType(ty).length),
      })),
    },
    {
      title: cn.technology,
      // References sits in the utility row below, not in this column: it is
      // proof, not a product line.
      links: chamberTopics
        .filter((topic) => topic !== "references")
        .map((topic) => ({
          label: topicMeta[lang][topic].label,
          href: localeRoute(lang, topicPath(topic)),
        })),
    },
  ];

  const chamberUtils: NavLink[] = [
    { label: cn.allModels(chamberModels.length), href: localeRoute(lang, chambersPath) },
    // The reader who opened this panel to find out which of twenty-seven
    // models is theirs is exactly the reader MyChamber is for, so the entry
    // is here as well as in the bar.
    { label: mychamberMeta[lang].label, href: localeRoute(lang, mychamberPath) },
    { label: topicMeta[lang].references.label, href: localeRoute(lang, topicPath("references")) },
    { label: t.navSubs.contact.catalog, href: localeRoute(lang, downloadsPath) },
  ];

  // Test Systems takes two columns, not the chamber branch's three. It carried
  // an industry column to begin with, on the reasoning that an automotive
  // customer buys from both branches and should not have to learn a second
  // taxonomy — but an industry page here could only ever list that industry's
  // standards, which is the slice of the standards index that the standards
  // index already prints under the same heading. The axis was a second door
  // into one room. Industry survives as the grouping *inside* that index, and
  // the two axes left are the ones that describe instruments rather than
  // buyers: what the test is, and what the equipment is.
  const tn = testNavCopy[lang];
  const testGroups: NavGroup[] = [
    {
      title: tn.byTest,
      links: testCategories.map((c) => ({
        label: testCategoryMeta[lang][c].label,
        href: localeRoute(lang, testCategoryPath(c)),
        note: testCategoryMeta[lang][c].note,
      })),
    },
    {
      title: tn.byProduct,
      links: testProducts.map((p) => {
        const count = modelsByProduct(p).length;
        return {
          label: testProductMeta[lang][p].label,
          href: localeRoute(lang, testProductPath(p)),
          // Antennas carry no count: the head office's antenna page lists no
          // model, and a "0 models" caption would read as an error.
          note: count > 0 ? tn.models(count) : undefined,
        };
      }),
    },
  ];

  const testUtils: NavLink[] = [
    { label: tn.allProducts(testModels.length), href: localeRoute(lang, testSystemsPath) },
    { label: tn.standards(testStandards.length), href: localeRoute(lang, testStandardsPath) },
    { label: t.navSubs.contact.catalog, href: localeRoute(lang, downloadsPath) },
  ];

  const sections: NavSection[] = [
    // The parent leads to the first child: Company has no overview page of
    // its own, and a dead parent link is worse than a predictable one.
    { label: t.nav.company, href: company[0].href, items: company },
    { label: t.nav.chamber, href: localeRoute(lang, chambersPath), groups: chamberGroups, utils: chamberUtils },
    { label: t.nav.equip, href: localeRoute(lang, testSystemsPath), groups: testGroups, utils: testUtils },
    // Internal page: the product site cannot be framed, so the CyberShield
    // content is rendered inside this chrome instead. See cybershield-content.
    { label: t.nav.cyber, href: localeRoute(lang, "/cybershield") },
    {
      label: t.nav.contact,
      href: `${home}#contact`,
      items: [
        { label: t.navSubs.contact.quote, href: `${home}#contact` },
        // Catalogues live in the downloads hub — not on Publications, which
        // holds the research papers.
        { label: t.navSubs.contact.catalog, href: localeRoute(lang, downloadsPath) },
      ],
    },
    // The one item in the bar that is marked. It is the only entry that does
    // something rather than going somewhere — five questions and a reader who
    // did not know which of thirty-two chambers to ask about has a model name
    // and a quotation. Career held this slot and has gone back into the
    // Company dropdown it belongs to.
    {
      label: mychamberMeta[lang].label,
      href: localeRoute(lang, mychamberPath),
      accent: true,
    },
  ];

  return (
    <header>
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <NavDrawer
        labels={{ open: t.a11y.menuOpen, close: t.a11y.menuClose, nav: t.a11y.mobileNav }}
        bar={
          <>
            {/* The official stacked lockup, on its own. Raw <img> does not get
                Next's basePath rewriting, so the src goes through asset(). The
                alt is the site name rather than the artwork's wording, because
                this is the link home. */}
            <a className="brand" href={home}>
              {/* next/image cannot optimise an SVG, and the static export runs
                  with images.unoptimized anyway — it would emit this same tag
                  with more machinery around it. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="brand-logo"
                src={asset("/frankonia-logo.svg")}
                width={1898}
                height={1029}
                alt="Frankonia"
              />
            </a>

            <nav className="menu" aria-label={t.a11y.primaryNav}>
              {sections.map((section) => (
                <div className={section.accent ? "mi mi--hl" : "mi"} key={section.label}>
                  <a href={section.href}>
                    {section.label}
                    {hasMenu(section) && <span className="caret" aria-hidden="true">▼</span>}
                  </a>
                  {hasMenu(section) && (
                    <div className="dropdown">
                      {section.groups ? (
                        /* The panel sizes itself from the column count rather
                           than from a width per branch — see the note on
                           `--dd-cols` in globals.css. */
                        <div
                          className="dd-panel dd-panel--mega"
                          style={{ "--dd-cols": section.groups.length } as CSSProperties}
                        >
                          <div className="dd-cols">
                            {section.groups.map((group) => (
                              <div className="dd-col" key={group.title}>
                                <h6>{group.title}</h6>
                                {group.links.map((link) => (
                                  <a key={link.label} href={link.href}>
                                    {link.label}
                                    {link.note && <span className="dd-note">{link.note}</span>}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </div>
                          {section.utils && (
                            <div className="dd-utils">
                              {section.utils.map((link) => (
                                <a key={link.label} href={link.href}>{link.label}</a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="dd-panel">
                          {section.items!.map((link) => (
                            <a key={link.label} href={link.href}>{link.label}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <LangSwitch lang={lang} />

            <a className="cta-top" href={`${home}#contact`}>{t.nav.cta}</a>
          </>
        }
      >
        <div className="wrap">
          {sections.map((section) => (
            <div className="mm-group" key={section.label}>
              <a className={section.accent ? "mm-top mm-top--hl" : "mm-top"} href={section.href}>
                {section.label}
              </a>
              {/* Chambers alone carries fifteen links. Flat, they turn the
                  drawer into a scroll; <details> folds them by group with no
                  state of our own and no loss of keyboard access. */}
              {section.groups?.map((group) => (
                <details className="mm-fold" key={group.title}>
                  <summary>{group.title}</summary>
                  <div className="mm-subs">
                    {group.links.map((link) => (
                      <a key={link.label} href={link.href}>{link.label}</a>
                    ))}
                  </div>
                </details>
              ))}
              {section.items && (
                <div className="mm-subs">
                  {section.items.map((link) => (
                    <a key={link.label} href={link.href}>{link.label}</a>
                  ))}
                </div>
              )}
              {section.utils && (
                <div className="mm-subs mm-utils">
                  {section.utils.map((link) => (
                    <a key={link.label} href={link.href}>{link.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a className="btn btn-red mm-cta" href={`${home}#contact`}>{t.nav.cta}</a>
        </div>
      </NavDrawer>
    </header>
  );
}

const hasMenu = (section: NavSection) =>
  Boolean(section.items?.length || section.groups?.length);

type NavLink = { label: string; href: string; note?: string };

/** A titled column inside a mega panel. */
type NavGroup = { title: string; links: NavLink[] };

/** A top-level entry. `items` renders the plain single-column panel; `groups`
 *  renders the wide multi-column one. A section uses one or the other.
 *
 *  `accent` marks the one entry the bar highlights. It is a flag rather than a
 *  hard-coded label check so the styling stays in the stylesheet and the
 *  decision of *which* entry stays in the list above — and so a second marked
 *  entry would be a deliberate line of code rather than an accident of
 *  matching on a string. */
type NavSection = {
  label: string;
  href: string;
  items?: NavLink[];
  groups?: NavGroup[];
  utils?: NavLink[];
  accent?: boolean;
};

export type HeaderCopy = {
  /** MyChamber is not here: its label is the same word in both locales and
   *  lives with its route, in mychamber-sections.ts. */
  nav: { company: string; chamber: string; equip: string; cyber: string; contact: string; cta: string };
  /** Company's submenu comes from company-sections.ts and Chambers' from
   *  chamber-sections.ts, not from here. */
  navSubs: { contact: { quote: string; catalog: string } };
  a11y: { skip: string; primaryNav: string; mobileNav: string; menuOpen: string; menuClose: string };
};
