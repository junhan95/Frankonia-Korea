import { headerCopy } from "./landing";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import StructuredData from "./structured-data";
import { pageDescription } from "./site-metadata";
import type { Lang } from "./site-config";
import { Landing as CyberShieldLanding } from "./cybershield/landing";
import "./cybershield/cybershield.css";

/* CyberShield, inside the Frankonia chrome.

   The renewal brief asks for the CyberShield landing page itself — not a link
   out to it and not a summary of it — reached in the same window from this
   site's navigation, wearing this site's header and language switcher.

   The product site cannot be embedded to do that: it answers with
   X-Frame-Options: SAMEORIGIN and frame-ancestors 'self', and sends no CORS
   header, so neither an iframe nor a client-side fetch can reach it from this
   origin. So the page is rendered natively instead — ported from the source the
   product site is built from, everything below its own navigation bar, with
   this header and footer closing it in. See app/cybershield/landing.tsx for
   what the port changes and app/cybershield/cybershield.css for how the two
   stylesheets are kept out of each other's way. */

export default function CyberShieldPage({ lang }: { lang: Lang }) {
  const t = headerCopy(lang);

  return (
    <>
      <StructuredData lang={lang} page="cybershield" description={pageDescription(lang, "cybershield")} />
      <SiteHeader lang={lang} t={t} />
      <main id="main">
        <CyberShieldLanding lang={lang} />
      </main>
      <SiteFooter lang={lang} t={t} />
    </>
  );
}
