import { langPath, languages, route, type Lang } from "./site-config";

/** Shared sticky header. `home` anchors resolve against the locale's landing
 *  page so the nav works from any route. Dropdown targets map 1:1 to the
 *  routes planned in docs/FRANKONIA-WEB-PLAN.md (§2) once those pages exist. */
export default function SiteHeader({ lang, t }: { lang: Lang; t: HeaderCopy }) {
  const home = route(langPath(lang));
  const cs = route(lang === "ko" ? "/cybershield" : `/${lang}/cybershield`);
  return (
    <header>
      <div className="wrap nav">
        <a className="logo" href={home}>
          FRANKONIA<span className="fk">KOREA</span> <small>{t.tagline}</small>
        </a>
        <nav className="menu">
          <div className="mi">
            <a href={`${home}#company`}>{t.nav.company} <span className="caret">▼</span></a>
            <div className="dropdown"><div className="dd-panel">
              {t.navSubs.company.map((label) => (
                <a key={label} href={`${home}#company`}>{label}</a>
              ))}
            </div></div>
          </div>
          <div className="mi">
            <a href={`${home}#chambers`}>{t.nav.chamber} <span className="caret">▼</span></a>
            <div className="dropdown"><div className="dd-panel">
              {/* Fixed category order — do not reorder (site map rule) */}
              {["Automotive", "Military", "Commercial", "Powertrain", "RVC", "Others"].map((c) => (
                <a key={c} href={`${home}#chambers`}>{c}</a>
              ))}
            </div></div>
          </div>
          <div className="mi">
            <a href={`${home}#equipment`}>{t.nav.equip} <span className="caret">▼</span></a>
            <div className="dropdown"><div className="dd-panel">
              {["EMI-Receiver", "Antennas", "Accessories"].map((c) => (
                <a key={c} href={`${home}#equipment`}>{c}</a>
              ))}
            </div></div>
          </div>
          <div className="mi">
            {/* Internal CyberShield page — renders inside the site (no new window) */}
            <a href={cs}>{t.nav.cyber}</a>
          </div>
          <div className="mi">
            <a href={`${home}#contact`}>{t.nav.contact} <span className="caret">▼</span></a>
            <div className="dropdown"><div className="dd-panel">
              {t.navSubs.contact.map((label) => (
                <a key={label} href={`${home}#contact`}>{label}</a>
              ))}
            </div></div>
          </div>
          <div className="mi">
            <a href={`${home}#career`}>{t.nav.career}</a>
          </div>
        </nav>
        <div className="lang">
          {languages.map(([code, label]) => (
            <a key={code} href={route(langPath(code))} className={code === lang ? "on" : undefined}>
              {label}
            </a>
          ))}
        </div>
        <a className="cta-top" href={`${home}#contact`}>{t.nav.cta}</a>
      </div>
    </header>
  );
}

export type HeaderCopy = {
  tagline: string;
  nav: { company: string; chamber: string; equip: string; cyber: string; contact: string; career: string; cta: string };
  navSubs: { company: readonly string[]; contact: readonly string[] };
};
