import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import ContactBand from "./contact-band";
import { headerCopy } from "./landing";
import type { Lang } from "./site-config";

/**
 * Chrome for every page that is not the landing page: header, a compact dark
 * page head (the landing hero's ink band at a third of the height, so a
 * sub-page reads as the same site without competing with it), the content,
 * then the shared contact band and footer.
 */
export default function PageShell({
  lang,
  eyebrow,
  title,
  intro,
  bandActions,
  children,
}: {
  lang: Lang;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  /** Replaces the closing band's two buttons. Only the contact page needs it. */
  bandActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const t = headerCopy(lang);

  return (
    <>
      <SiteHeader lang={lang} t={t} />

      <main id="main">
        <div className="page-head">
          <div className="wrap">
            <span className="tag">{eyebrow}</span>
            <h1>{title}</h1>
            {intro && <p>{intro}</p>}
          </div>
        </div>

        {children}

        <ContactBand lang={lang} t={t} actions={bandActions} />
      </main>

      <SiteFooter lang={lang} t={t} />
    </>
  );
}
