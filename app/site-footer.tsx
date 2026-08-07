import { companySections, sectionMeta, sectionPath } from "./company-sections";
import { localeRoute, type Lang } from "./site-config";

/** Shared dark footer. Anchors resolve against the locale's landing page. */
export default function SiteFooter({ lang, t }: { lang: Lang; t: FooterCopy }) {
  const home = localeRoute(lang);
  const cs = localeRoute(lang, "/cybershield");
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <h5>FRANKONIA KOREA</h5>
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
              <li><a href={`${home}#chambers`}>{t.ftL1}</a></li>
              <li><a href={`${home}#equipment`}>{t.ftL2}</a></li>
              <li><a href={cs}>CyberShield</a></li>
            </ul>
          </div>
          <div>
            <h5>{t.ftLink}</h5>
            <ul>
              <li><a href="https://frankonia-solutions.com/" target="_blank" rel="noopener">{t.ftHq}</a></li>
              <li><a href={`${home}#contact`}>{t.ftContact}</a></li>
              <li><a href="#">{t.ftPriv}</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>© 2026 Frankonia Korea. All rights reserved.</span>
          <span>www.frankonia-korea.com</span>
        </div>
      </div>
    </footer>
  );
}

export type FooterCopy = {
  ftDesc: string; ftAddr: string; ftCompany: string; ftSol: string;
  ftL1: string; ftL2: string; ftLink: string; ftHq: string;
  ftContact: string; ftPriv: string;
};
