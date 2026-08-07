import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { stagingEnv } from "../scripts/staging-env.mjs";

/**
 * Assertions against the real static export, because every regression this
 * suite covers shipped at least once: /cybershield escaped the staging
 * noindex, /en declared `lang="ko"`, link previews had no image, and the
 * German routes had to be proven gone. `npm test` builds first, so these run
 * on the same bytes GitHub Pages serves.
 */

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
const BASE = stagingEnv.NEXT_PUBLIC_BASE_PATH;
const ORIGIN = stagingEnv.NEXT_PUBLIC_SITE_ORIGIN;

/** Routes Next generates for its own machinery, not pages of the site. */
const INTERNAL = new Set(["/_not-found/", "/404/"]);

async function collectPages(dir = OUT, route = "/") {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      pages.push(...(await collectPages(path.join(dir, entry.name), `${route}${entry.name}/`)));
    } else if (entry.name === "index.html" && !INTERNAL.has(route)) {
      pages.push({ route, html: await readFile(path.join(dir, entry.name), "utf8") });
    }
  }
  return pages;
}

const pages = await collectPages();
const url = (route) => `${ORIGIN}${BASE}${route}`;
const localeOf = (route) => (route.startsWith("/en/") || route === "/en/" ? "en" : "ko");

const exists = async (file) => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

test("the export contains the pages the site map defines", () => {
  assert.deepEqual(
    pages.map((p) => p.route).sort(),
    [
      "/",
      "/company/career/",
      "/company/events/",
      "/company/history/",
      "/company/philosophy/",
      "/company/publications/",
      "/en/",
      "/en/company/career/",
      "/en/company/events/",
      "/en/company/history/",
      "/en/company/philosophy/",
      "/en/company/publications/",
    ],
  );
});

test("CyberShield hands over to the product site, in the same window", () => {
  const expected = { ko: "https://www.frankonia-cybershield.com/ko/", en: "https://www.frankonia-cybershield.com/" };

  for (const { route, html } of pages) {
    assert.ok(
      html.includes(`href="${expected[localeOf(route)]}"`),
      `${route} does not link to the CyberShield site`,
    );
    assert.ok(!html.includes("/cybershield/index.html"), `${route} still links to the retired page`);
  }

  // Same window: the renewal brief asked for it explicitly, and a stray
  // target="_blank" here would be invisible in review.
  const links = [...pages[0].html.matchAll(/<a[^>]*frankonia-cybershield\.com[^>]*>/g)].map((m) => m[0]);
  assert.ok(links.length > 0);
  for (const link of links) assert.ok(!link.includes("target="), `opens in a new tab: ${link}`);
});

test("every page is held out of the index on the staging URL", () => {
  for (const { route, html } of pages) {
    assert.match(
      html,
      /<meta name="robots" content="noindex[^"]*"\/>/,
      `${route} is missing the staging noindex`,
    );
  }
});

test("the document language matches the locale of the route", () => {
  for (const { route, html } of pages) {
    assert.match(
      html,
      new RegExp(`<html lang="${localeOf(route)}"`),
      `${route} declares the wrong language`,
    );
  }
});

test("each page is canonical to its own URL", () => {
  for (const { route, html } of pages) {
    assert.ok(
      html.includes(`<link rel="canonical" href="${url(route)}"/>`),
      `${route} has no canonical, or points somewhere else`,
    );
  }
});

test("both locales and an x-default are offered on every page", () => {
  for (const { route, html } of pages) {
    const counterpart = localeOf(route) === "en" ? route.replace("/en/", "/") : `/en${route}`;
    const ko = localeOf(route) === "ko" ? route : counterpart;
    const en = localeOf(route) === "en" ? route : counterpart;

    assert.ok(html.includes(`hrefLang="ko" href="${url(ko)}"`), `${route}: ko alternate`);
    assert.ok(html.includes(`hrefLang="en" href="${url(en)}"`), `${route}: en alternate`);
    assert.ok(html.includes(`hrefLang="x-default" href="${url(ko)}"`), `${route}: x-default`);
    assert.ok(!html.includes('hrefLang="de"'), `${route} still offers German`);
  }
});

test("the share card is absolute and carries the base path", () => {
  for (const { route, html } of pages) {
    assert.ok(
      html.includes(`property="og:image" content="${ORIGIN}${BASE}/og.png?v=1"`),
      `${route} has no usable og:image`,
    );
  }
  assert.match(pages[0].html, /name="twitter:card" content="summary_large_image"/);
});

test("the brand lockup is in the export and carries the base path", async () => {
  // A raw <img> does not get Next's basePath rewriting, so the logo is the one
  // asset that can silently 404 on GitHub Pages while every link still works.
  for (const { route, html } of pages) {
    assert.ok(
      html.includes(`src="${BASE}/frankonia-logo.svg"`),
      `${route}: logo missing, or not prefixed with the base path`,
    );
  }
  assert.ok(await exists(path.join(OUT, "frankonia-logo.svg")));
});

test("the favicon set is declared and shipped", async () => {
  for (const file of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"]) {
    assert.ok(pages[0].html.includes(`${BASE}/${file}`), `${file} is not declared`);
    assert.ok(await exists(path.join(OUT, file)), `${file} is not in the export`);
  }
});

test("the structured data parses and names the organisation", () => {
  for (const { route, html } of pages) {
    const match = html.match(
      /<script type="application\/ld\+json">(.*?)<\/script>/s,
    );
    assert.ok(match, `${route} emits no JSON-LD`);

    const graph = JSON.parse(match[1])["@graph"];
    const types = graph.map((node) => node["@type"]);
    assert.ok(types.includes("Organization"), `${route}: no Organization`);
    assert.ok(types.includes("WebPage"), `${route}: no WebPage`);

    const org = graph.find((node) => node["@id"]?.endsWith("#organization"));
    assert.equal(org.name, "Frankonia Korea");
    assert.equal(org.parentOrganization["@id"], `${ORIGIN}${BASE}/#group`);
  }
});

test("the sitemap lists every page and nothing else", async () => {
  const xml = await readFile(path.join(OUT, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
  assert.deepEqual(locs, pages.map((p) => url(p.route)).sort());
});

test("robots.txt keeps crawlers off the staging build", async () => {
  const robots = await readFile(path.join(OUT, "robots.txt"), "utf8");
  assert.match(robots, /Disallow: \//);
});

test("every internal link resolves to a file in the export", async () => {
  const broken = [];
  for (const { route, html } of pages) {
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      const target = href.split("#")[0].split("?")[0];
      if (!target) continue;
      assert.ok(target.startsWith(`${BASE}/`), `${route} links outside the base path: ${href}`);

      const relative = target.slice(BASE.length + 1);
      const file = path.join(OUT, relative.endsWith("/") || relative === "" ? `${relative}index.html` : relative);
      if (!(await exists(file))) broken.push(`${route} -> ${href}`);
    }
  }
  assert.deepEqual(broken, []);
});

test("German is gone from the export", async () => {
  assert.equal(await exists(path.join(OUT, "de")), false);
  assert.equal(await exists(path.join(OUT, "en", "de")), false);
});
