"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { companySections, sectionMeta, sectionPath } from "./company-sections";
import { asset, langPath, languages, localeRoute, type Lang } from "./site-config";

/** Fixed category order — do not reorder (site map rule). */
const chamberCategories = ["Automotive", "Military", "Commercial", "Powertrain", "RVC", "Others"];
const equipmentCategories = ["EMI-Receiver", "Antennas", "Accessories"];

/**
 * Shared sticky header. The only client component on the site: the mobile
 * drawer needs state, and below 960px the desktop nav is hidden, so without it
 * the whole GNB simply disappeared on phones.
 *
 * `home` anchors resolve against the locale's landing page so the nav works
 * from any route. Dropdown targets map 1:1 to the routes planned in
 * docs/FRANKONIA-WEB-PLAN.md (§2) once those pages exist.
 */
export default function SiteHeader({ lang, t }: { lang: Lang; t: HeaderCopy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = localeRoute(lang);
  const close = () => setMenuOpen(false);

  // Switching language keeps the reader on the page they are reading —
  // /cybershield/ ↔ /en/cybershield/ — instead of dropping them back on the
  // home page. `usePathname` already has the base path stripped off, and the
  // English locale is the only one carrying a prefix, so taking that off
  // leaves the path both locales share.
  const enPrefix = langPath("en");
  const pathname = usePathname();
  const shared = pathname.startsWith(`${enPrefix}/`) || pathname === enPrefix
    ? pathname.slice(enPrefix.length)
    : pathname;
  // localeRoute puts the trailing slash back; carrying it here would double it.
  const samePage = shared.replace(/\/$/, "");

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const company = companySections.map(
    (s) => [sectionMeta[lang][s].label, localeRoute(lang, sectionPath(s))] as const,
  );

  const sections: NavSection[] = [
    // The parent leads to the first child: Company has no overview page of
    // its own, and a dead parent link is worse than a predictable one.
    { label: t.nav.company, href: company[0][1], items: company },
    { label: t.nav.chamber, href: `${home}#chambers`, items: chamberCategories.map((c) => [c, `${home}#chambers`] as const) },
    { label: t.nav.equip, href: `${home}#equipment`, items: equipmentCategories.map((c) => [c, `${home}#equipment`] as const) },
    // Internal page: the product site cannot be framed, so the CyberShield
    // content is rendered inside this chrome instead. See cybershield-content.
    { label: t.nav.cyber, href: localeRoute(lang, "/cybershield"), items: [] as (readonly [string, string])[] },
    {
      label: t.nav.contact,
      href: `${home}#contact`,
      items: [
        [t.navSubs.contact.quote, `${home}#contact`],
        // Catalogues live on the Publications page now, not on the landing.
        [t.navSubs.contact.catalog, localeRoute(lang, sectionPath("publications"))],
      ] as const,
    },
    { label: t.nav.career, href: localeRoute(lang, sectionPath("career")), items: [] as (readonly [string, string])[] },
  ];

  return (
    <header>
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <div className="wrap nav">
        {/* The official stacked lockup, on its own. Raw <img> does not get
            Next's basePath rewriting, so the src goes through asset(). The alt
            is the site name rather than the artwork's wording, because this is
            the link home. */}
        <a className="brand" href={home}>
          {/* next/image cannot optimise an SVG, and the static export runs with
              images.unoptimized anyway — it would emit this same tag with more
              machinery around it. */}
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
          {sections.map(({ label, href, items }) => (
            <div className="mi" key={label}>
              <a href={href}>
                {label}
                {items.length > 0 && <span className="caret" aria-hidden="true">▼</span>}
              </a>
              {items.length > 0 && (
                <div className="dropdown">
                  <div className="dd-panel">
                    {items.map(([itemLabel, itemHref]) => (
                      <a key={itemLabel} href={itemHref}>{itemLabel}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="lang">
          {languages.map(([code, label]) => (
            <a
              key={code}
              href={localeRoute(code, samePage)}
              className={code === lang ? "on" : undefined}
              aria-current={code === lang ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </div>

        <a className="cta-top" href={`${home}#contact`}>{t.nav.cta}</a>

        <button
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.a11y.menuClose : t.a11y.menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? "burger-bars open" : "burger-bars"} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>
      </div>

      {/* Kept mounted so the panel can transition, hidden from assistive tech
          and from tab order while closed. */}
      <nav
        id="mobile-menu"
        className={menuOpen ? "mobile-menu open" : "mobile-menu"}
        aria-label={t.a11y.mobileNav}
        hidden={!menuOpen}
      >
        <div className="wrap">
          {sections.map(({ label, href, items }) => (
            <div className="mm-group" key={label}>
              <a className="mm-top" href={href} onClick={close}>{label}</a>
              {items.length > 0 && (
                <div className="mm-subs">
                  {items.map(([itemLabel, itemHref]) => (
                    <a key={itemLabel} href={itemHref} onClick={close}>{itemLabel}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a className="btn btn-red mm-cta" href={`${home}#contact`} onClick={close}>{t.nav.cta}</a>
        </div>
      </nav>
    </header>
  );
}

type NavSection = {
  label: string;
  href: string;
  items: readonly (readonly [string, string])[];
};

export type HeaderCopy = {
  nav: { company: string; chamber: string; equip: string; cyber: string; contact: string; career: string; cta: string };
  /** Company's submenu comes from company-sections.ts, not from here. */
  navSubs: { contact: { quote: string; catalog: string } };
  a11y: { skip: string; primaryNav: string; mobileNav: string; menuOpen: string; menuClose: string };
};
