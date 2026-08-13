import { chambersPath } from "./chamber-sections";
import { legalPath } from "./legal-sections";
import { companySections, sectionMeta, sectionPath } from "./company-sections";
import { contactPath } from "./contact-sections";
import { testSystemsPath } from "./test-system-sections";
import SiteLink from "./site-link";
import { localeRoute, type Lang } from "./site-config";

/** Shared dark footer. */
export default function SiteFooter({ lang, t }: { lang: Lang; t: FooterCopy }) {
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
                  <SiteLink href={localeRoute(lang, sectionPath(s))}>{sectionMeta[lang][s].label}</SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t.ftSol}</h5>
            <ul>
              {/* The chamber branch has its own overview now; the landing's
                  #chambers band is a summary of it, not the destination. */}
              <li><SiteLink href={localeRoute(lang, chambersPath)}>{t.ftL1}</SiteLink></li>
              <li><SiteLink href={localeRoute(lang, testSystemsPath)}>{t.ftL2}</SiteLink></li>
              <li><SiteLink href={localeRoute(lang, "/cybershield")}>CyberShield</SiteLink></li>
            </ul>
          </div>
          <div>
            <h5>{t.ftLink}</h5>
            <ul>
              <li><a href="https://frankonia-solutions.com/" target="_blank" rel="noopener">{t.ftHq}</a></li>
              <li><SiteLink href={localeRoute(lang, contactPath)}>{t.ftContact}</SiteLink></li>
              {/* Both were promised by the footer long before they existed —
                  the privacy entry pointed at `#`, which on 84 pages is a link
                  that does nothing. */}
              <li><SiteLink href={localeRoute(lang, legalPath("imprint"))}>{t.ftImprint}</SiteLink></li>
              <li><SiteLink href={localeRoute(lang, legalPath("privacy"))}>{t.ftPriv}</SiteLink></li>
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
