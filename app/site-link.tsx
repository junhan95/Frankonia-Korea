import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { basePath } from "./site-config";

/**
 * Every link on the site, internal or not.
 *
 * The site is 139 static pages that share a header, a footer and a stylesheet,
 * and until now every one of the ~30 links in that header was a plain `<a>`.
 * A plain `<a>` throws all of that away on each click: the browser tears the
 * document down, re-parses 110 KB of HTML, re-runs 640 KB of framework script
 * and re-mounts a header that is byte-for-byte the one it just destroyed —
 * with a blank frame in the middle where the reader watches it happen.
 *
 * `next/link` keeps the document. It fetches the new route's RSC payload —
 * ~8 KB gzipped, already on disk beside the HTML because `output: export`
 * writes both — and swaps only the part of the tree that differs. The header,
 * the footer, the stylesheet and the typefaces are never touched. And because
 * the router prefetches a link once it is on screen, the payload for anywhere
 * a reader can see is usually already in memory when they click: the page
 * changes in the next frame.
 *
 * This wrapper exists so that is the default rather than a decision made 69
 * times. An off-site href, a `mailto:`, a `tel:` or a same-page `#anchor` has
 * nothing for the router to do, and falls through to the `<a>` it always was.
 *
 * The one deliberate exception is `lang-switch.tsx`: the two locales have
 * separate root layouts, so crossing between them is a document load however
 * it is written.
 */
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Passed through to `next/link`. `false` turns off prefetching for a link
   *  that is on screen but rarely followed. */
  prefetch?: boolean;
};

export default function SiteLink({ href, prefetch = true, ...rest }: Props) {
  if (!isRoute(href)) {
    return <a href={href} {...rest} />;
  }

  return <Link href={unbase(href)} prefetch={prefetch} {...rest} />;
}

/**
 * Whether this href is a route on this site.
 *
 * A route starts with a single slash. That excludes `//host/path`, every
 * absolute URL, `mailto:`/`tel:`, and the `#anchor` links the landing page and
 * the CyberShield page use to move within themselves — none of which the
 * router handles, and all of which an `<a>` handles correctly.
 *
 * Files served from `public/` also start with a slash, and the router would be
 * wrong about those: `/frankonia-catalogue.pdf` is a download, not a page. The
 * extension test catches them. Every real route on this site ends in `/`
 * (`trailingSlash: true`), so there is nothing to mistake in the other
 * direction.
 */
const isRoute = (href: string) =>
  href.startsWith("/") && !href.startsWith("//") && !/\.[a-z0-9]+$/i.test(href);

/**
 * Take the base path back off.
 *
 * `route()` in site-config prepends it because raw `<a href>` and `<img src>`
 * do not get Next's rewriting — and `next/link` is the one thing that does, so
 * handing it a prefixed href would produce `/Frankonia-Korea/Frankonia-Korea/`
 * on the GitHub Pages build. Stripping here rather than asking every caller to
 * pass a different href keeps one form of an internal route in the codebase:
 * the prefixed one, which is also what the canonical URLs and the sitemap
 * need. In production the base path is empty and this does nothing.
 */
const unbase = (href: string) =>
  basePath && href.startsWith(basePath) ? href.slice(basePath.length) || "/" : href;
