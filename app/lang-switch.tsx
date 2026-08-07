"use client";

import { usePathname } from "next/navigation";
import { langPath, languages, localeRoute, type Lang } from "./site-config";

/**
 * The language switcher, which has to know where the reader currently is.
 *
 * Switching language keeps them on the page they are reading —
 * /cybershield/ ↔ /en/cybershield/ — instead of dropping them back on the home
 * page. That was worth a client component when the whole header was one
 * already; now that the header is not, this is deliberately the smallest thing
 * that can still answer the question, and site-config is all it imports.
 *
 * The alternative was threading the current path down from every page into
 * PageShell and on into the header. That is more code in more files, and each
 * of those files would then be able to get it wrong — a page that passed the
 * wrong path would render a switcher pointing somewhere else, and nothing
 * would catch it. `usePathname` cannot be wrong about where it is.
 */
export default function LangSwitch({ lang }: { lang: Lang }) {
  // `usePathname` already has the base path stripped off, and the English
  // locale is the only one carrying a prefix, so taking that off leaves the
  // path both locales share.
  const enPrefix = langPath("en");
  const pathname = usePathname();
  const shared =
    pathname.startsWith(`${enPrefix}/`) || pathname === enPrefix
      ? pathname.slice(enPrefix.length)
      : pathname;
  // localeRoute puts the trailing slash back; carrying it here would double it.
  const samePage = shared.replace(/\/$/, "");

  return (
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
  );
}
