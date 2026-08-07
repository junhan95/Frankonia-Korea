"use client";

import { useEffect, useState } from "react";
import { languages, localeRoute, type Lang } from "./site-config";

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
  const cs = localeRoute(lang, "/cybershield");
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const sections = [
    { label: t.nav.company, href: `${home}#company`, items: t.navSubs.company.map((l) => [l, `${home}#company`] as const) },
    { label: t.nav.chamber, href: `${home}#chambers`, items: chamberCategories.map((c) => [c, `${home}#chambers`] as const) },
    { label: t.nav.equip, href: `${home}#equipment`, items: equipmentCategories.map((c) => [c, `${home}#equipment`] as const) },
    { label: t.nav.cyber, href: cs, items: [] as (readonly [string, string])[] },
    { label: t.nav.contact, href: `${home}#contact`, items: t.navSubs.contact.map((l) => [l, `${home}#contact`] as const) },
    { label: t.nav.career, href: `${home}#career`, items: [] as (readonly [string, string])[] },
  ];

  return (
    <header>
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <div className="wrap nav">
        <a className="logo" href={home}>
          FRANKONIA<span className="fk">KOREA</span> <small>{t.tagline}</small>
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
              href={localeRoute(code)}
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

export type HeaderCopy = {
  tagline: string;
  nav: { company: string; chamber: string; equip: string; cyber: string; contact: string; career: string; cta: string };
  navSubs: { company: readonly string[]; contact: readonly string[] };
  a11y: { skip: string; primaryNav: string; mobileNav: string; menuOpen: string; menuClose: string };
};
