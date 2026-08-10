import { chambersPath } from "./chamber-sections";
import { legalPath } from "./legal-sections";
import { companySections, sectionMeta, sectionPath } from "./company-sections";
import { testSystemsPath } from "./test-system-sections";
import { localeRoute, type Lang } from "./site-config";

/** Shared dark footer. Anchors resolve against the locale's landing page. */
export default function SiteFooter({ lang, t }: { lang: Lang; t: FooterCopy }) {
  const home = localeRoute(lang);
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <h5>FRANKONIA</h5>
            <p className="foot-desc">{t.ftDesc}</p>
            <p className="foot-addr">{t.ftAddr}</p>
          </div>
          <div>
            <h5>{t.ftCompany}</h5>
            <ul>
              {companySections.map((s) => (
                <li key={s}>
                  <a href={localeRoute(lang, sectionPath(s))}>{sectionMeta[lang][s].label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t.ftSol}</h5>
            <ul>
              {/* The chamber branch has its own overview now; the landing's
                  #chambers band is a summary of it, not the destination. */}
              <li><a href={localeRoute(lang, chambersPath)}>{t.ftL1}</a></li>
              <li><a href={localeRoute(lang, testSystemsPath)}>{t.ftL2}</a></li>
              <li><a href={localeRoute(lang, "/cybershield")}>CyberShield</a></li>
            </ul>
          </div>
          <div>
            <h5>{t.ftLink}</h5>
            <ul>
              <li><a href="https://frankonia-solutions.com/" target="_blank" rel="noopener">{t.ftHq}</a></li>
              <li><a href={`${home}#contact`}>{t.ftContact}</a></li>
              {/* Both were promised by the footer long before they existed —
                  the privacy entry pointed at `#`, which on 84 pages is a link
                  that does nothing. */}
              <li><a href={localeRoute(lang, legalPath("imprint"))}>{t.ftImprint}</a></li>
              <li><a href={localeRoute(lang, legalPath("privacy"))}>{t.ftPriv}</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          {/* 1987 — the founding year, matching the product site's own footer
              ("© 1987 Frankonia Group") rather than the current year. */}
          <span>© 1987 Frankonia. All rights reserved.</span>
          <span>www.frankonia-korea.com</span>
        </div>
      </div>
    </footer>
  );
}

export type FooterCopy = {
  ftDesc: string; ftAddr: string; ftCompany: string; ftSol: string;
  ftL1: string; ftL2: string; ftLink: string; ftHq: string;
  ftContact: string; ftImprint: string; ftPriv: string;
};
