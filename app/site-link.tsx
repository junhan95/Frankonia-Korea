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
 * already on disk beside the HTML because `output: export` writes both — and
 * swaps only the part of the tree that differs. The header, the footer, the
 * stylesheet and the typefaces are never touched. The payload is fetched when
 * the link is clicked rather than before, which is not how this was written
 * first: see the note above the default `prefetch` below.
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
  /** Passed through to `next/link`. See the note on the default below before
   *  turning this back on for any link. */
  prefetch?: boolean;
  href: string;
};

/**
 * Prefetching is off, and this is not a tuning decision.
 *
 * On Next 16.2.6 with `output: export`, a link the pointer has hovered stops
 * navigating. The click reaches the anchor and `next/link` calls
 * preventDefault on it, so the browser does not follow the href either — and
 * then nothing happens: no request, no history entry, no error in the console.
 * The reader is left on the page they were on. Every subsequent attempt at
 * that link fails the same way, keyboard included.
 *
 * It is the hover that breaks it, not the click: `onMouseEnter` calls
 * `onNavigationIntent`, which reschedules the link's prefetch task at Intent
 * priority (next/dist/client/components/links.js), and against a static export
 * that task leaves the router waiting on it forever. A click with no real
 * pointer over the link — synthetic, or Enter on a focused anchor — still
 * navigates in ~50 ms, which is why this survived every check made from a
 * script and was caught by a reader using a mouse.
 *
 * `prefetch={false}` is the only lever the public API offers here: it is what
 * `mountLinkInstance` reads to skip the prefetchable instance entirely, and
 * with no instance registered `onNavigationIntent` returns before it can
 * schedule anything. There is no way to keep viewport prefetching and drop the
 * hover intent.
 *
 * What it costs: the payload is fetched on click instead of before it — 103 ms
 * to first paint of the new page over GitHub Pages, 120 ms locally, against
 * ~50 ms warm. The document, the header, the stylesheet and the typefaces are
 * still kept; this is still a client navigation and not the full reload the
 * plain `<a>` did. Worth re-testing on a later Next: the fix upstream would
 * let the default go back to `true`.
 */
export default function SiteLink({ href, prefetch = false, ...rest }: Props) {
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
