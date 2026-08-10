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
const localeOf = (route) => (route.startsWith("/ko/") || route === "/ko/" ? "ko" : "en");
/** The same page in the other locale. English holds the root, so one
 *  direction strips the /ko prefix and the other adds it. */
const counterpartOf = (route) =>
  localeOf(route) === "ko" ? route.replace("/ko/", "/") : `/ko${route}`;

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
      "/chambers/",
      "/chambers/automation/",
      "/chambers/frankosorb/",
      "/chambers/industry/automotive/",
      "/chambers/industry/commercial/",
      "/chambers/industry/military/",
      "/chambers/industry/powertrain/",
      "/chambers/references/",
      "/chambers/services/",
      "/chambers/shielding-gates/",
      "/chambers/type/chc/",
      "/chambers/type/component/",
      "/chambers/type/fac/",
      "/chambers/type/rvc/",
      "/chambers/type/sac/",
      "/chambers/type/shielded-room/",
      "/company/career/",
      "/company/events/",
      "/company/history/",
      "/company/philosophy/",
      "/company/publications/",
      "/cybershield/",
      "/downloads/",
      "/imprint/",
      "/ko/",
      "/ko/chambers/",
      "/ko/chambers/automation/",
      "/ko/chambers/frankosorb/",
      "/ko/chambers/industry/automotive/",
      "/ko/chambers/industry/commercial/",
      "/ko/chambers/industry/military/",
      "/ko/chambers/industry/powertrain/",
      "/ko/chambers/references/",
      "/ko/chambers/services/",
      "/ko/chambers/shielding-gates/",
      "/ko/chambers/type/chc/",
      "/ko/chambers/type/component/",
      "/ko/chambers/type/fac/",
      "/ko/chambers/type/rvc/",
      "/ko/chambers/type/sac/",
      "/ko/chambers/type/shielded-room/",
      "/ko/company/career/",
      "/ko/company/events/",
      "/ko/company/history/",
      "/ko/company/philosophy/",
      "/ko/company/publications/",
      "/ko/cybershield/",
      "/ko/downloads/",
      "/ko/imprint/",
      "/ko/mychamber/",
      "/ko/privacy/",
      "/ko/test-systems/",
      "/ko/test-systems/industry/automotive/",
      "/ko/test-systems/industry/commercial/",
      "/ko/test-systems/industry/military/",
      "/ko/test-systems/industry/others/",
      "/ko/test-systems/industry/powertrain/",
      "/ko/test-systems/product/amplifier/",
      "/ko/test-systems/product/antenna/",
      "/ko/test-systems/product/efs/",
      "/ko/test-systems/product/meter/",
      "/ko/test-systems/product/preamp/",
      "/ko/test-systems/product/system/",
      "/ko/test-systems/standards/",
      "/ko/test-systems/test/conducted/",
      "/ko/test-systems/test/emission/",
      "/ko/test-systems/test/magnetic/",
      "/ko/test-systems/test/radiated/",
      "/mychamber/",
      "/privacy/",
      "/test-systems/",
      "/test-systems/industry/automotive/",
      "/test-systems/industry/commercial/",
      "/test-systems/industry/military/",
      "/test-systems/industry/others/",
      "/test-systems/industry/powertrain/",
      "/test-systems/product/amplifier/",
      "/test-systems/product/antenna/",
      "/test-systems/product/efs/",
      "/test-systems/product/meter/",
      "/test-systems/product/preamp/",
      "/test-systems/product/system/",
      "/test-systems/standards/",
      "/test-systems/test/conducted/",
      "/test-systems/test/emission/",
      "/test-systems/test/magnetic/",
      "/test-systems/test/radiated/",
    ],
  );
});

test("CyberShield stays inside this site's chrome", () => {
  // The product site answers X-Frame-Options: SAMEORIGIN and sends no CORS
  // header, so it cannot be embedded. The nav therefore points at the internal
  // page, which carries the same header and footer as every other route.
  for (const { route, html } of pages) {
    const internal = localeOf(route) === "ko" ? `${BASE}/ko/cybershield/` : `${BASE}/cybershield/`;
    assert.ok(
      html.includes(`<a href="${internal}">CyberShield`),
      `${route}: the navigation does not point at the internal CyberShield page`,
    );
  }

  for (const { route, html } of pages.filter((p) => p.route.endsWith("/cybershield/"))) {
    assert.ok(html.includes('<header>'), `${route}: rendered without the site header`);
    assert.ok(html.includes('<footer>'), `${route}: rendered without the site footer`);

    // The product page itself, from its hero down — not a summary of it. These
    // are its own section ids, which only the port can put here.
    assert.ok(html.includes('class="cs-hero" id="top"'), `${route}: the product hero is missing`);
    for (const id of ["why", "solution", "ecosystem", "verification", "applications", "process"]) {
      assert.ok(html.includes(`id="${id}"`), `${route}: the ${id} section is missing`);
    }

    // Its navigation bar is the one thing that does not come across: this
    // site's own header is above it, and two nav bars would be one too many.
    assert.ok(
      !html.includes('class="site-header"') && !html.includes("nav-desktop"),
      `${route}: the product site's own header came along with the port`,
    );
  }

  // Same window throughout: the renewal brief asked for it explicitly, and a
  // stray target="_blank" would be invisible in review.
  for (const { route, html } of pages) {
    for (const [link] of html.matchAll(/<a[^>]*frankonia-cybershield\.com[^>]*>/g)) {
      assert.ok(!link.includes("target="), `${route} opens the product site in a new tab: ${link}`);
    }
  }
});

test("MyChamber holds the marked slot in the bar, and Career keeps a home", () => {
  // Career came out of the top-level menu to make room for MyChamber. The
  // failure mode of that swap is not a missing menu item — it is a page nobody
  // can reach any more, which no other test here would notice.
  for (const { route, html } of pages) {
    const ko = localeOf(route) === "ko";
    const mychamber = ko ? `${BASE}/ko/mychamber/` : `${BASE}/mychamber/`;
    const career = ko ? `${BASE}/ko/company/career/` : `${BASE}/company/career/`;

    assert.ok(
      html.includes('class="mi mi--hl"'),
      `${route}: nothing in the navigation bar is marked`,
    );
    assert.ok(
      html.includes(`<a href="${mychamber}">MyChamber`),
      `${route}: the bar does not offer MyChamber`,
    );
    assert.ok(
      html.includes(`href="${career}"`),
      `${route}: the Career page is not reachable from the chrome`,
    );
    assert.ok(
      !html.includes(`<a href="${career}">Career<`) || html.includes('class="dd-panel"'),
      `${route}: Career is back in the bar rather than in the Company panel`,
    );
  }
});

test("the questionnaire is in the exported HTML, not assembled by script", () => {
  // A static export with a client-rendered first step would serve an empty
  // page to a crawler and to anyone whose bundle has not landed yet.
  const first = {
    "/mychamber/": "What kind of product are you testing?",
    "/ko/mychamber/": "어떤 종류의 제품을 시험하시나요?",
  };
  for (const [route, question] of Object.entries(first)) {
    const page = pages.find((p) => p.route === route);
    assert.ok(page, `${route} is not in the export`);
    assert.ok(page.html.includes(question), `${route}: the first question is not in the HTML`);
    // Every option of it, too — the answer set is the page.
    for (const option of ["Automotive", "Military", "Commercial", "Powertrain"]) {
      assert.ok(page.html.includes(option), `${route}: the ${option} option is missing`);
    }
  }
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

test("the root is English and Korean sits under /ko", () => {
  // This is the whole point of the locale layout and the easiest thing to
  // undo by accident: moving a directory or reordering the table in
  // site-config would flip it back with every other test still passing.
  const root = pages.find((p) => p.route === "/");
  assert.ok(root, "there is no page at /");
  assert.match(root.html, /<html lang="en"/, "/ does not open in English");

  const korean = pages.find((p) => p.route === "/ko/");
  assert.ok(korean, "there is no page at /ko/");
  assert.match(korean.html, /<html lang="ko"/, "/ko/ does not open in Korean");

  // No page may be left at the old /en prefix.
  assert.deepEqual(pages.filter((p) => p.route.startsWith("/en/")).map((p) => p.route), []);
});

test("the language switcher stays on the page it is used from", () => {
  // Switching language used to drop the reader on the home page, which the
  // CyberShield page made obvious: the whole product page for a locale change.
  for (const { route, html } of pages) {
    const counterpart = counterpartOf(route);
    const label = localeOf(route) === "ko" ? "EN" : "KO";
    assert.ok(
      html.includes(`href="${BASE}${counterpart}"`) && html.includes(`>${label}</a>`),
      `${route}: the switcher does not offer ${counterpart}`,
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
    const counterpart = counterpartOf(route);
    const ko = localeOf(route) === "ko" ? route : counterpart;
    const en = localeOf(route) === "en" ? route : counterpart;

    assert.ok(html.includes(`hrefLang="ko" href="${url(ko)}"`), `${route}: ko alternate`);
    assert.ok(html.includes(`hrefLang="en" href="${url(en)}"`), `${route}: en alternate`);
    assert.ok(html.includes(`hrefLang="x-default" href="${url(en)}"`), `${route}: x-default`);
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
    assert.equal(org.name, "Frankonia");
    assert.deepEqual(org.sameAs, ["https://frankonia-solutions.com/"]);

    // The address may only claim what the footer of this very page prints, so
    // assert both halves: the shape schema.org expects, and that each part of
    // it is actually on the page a reader sees.
    assert.deepEqual(org.address, {
      "@type": "PostalAddress",
      streetAddress: "Industriestraße 16",
      postalCode: "91180",
      addressLocality: "Heideck",
      addressCountry: "DE",
    });
    assert.equal(org.legalName, "Frankonia Germany EMC Solutions GmbH");
    assert.equal(org.telephone, "+49 9177 98-500");
    assert.equal(org.contactPoint.telephone, org.telephone);

    for (const printed of [
      org.legalName,
      org.address.streetAddress,
      `${org.address.postalCode} ${org.address.addressLocality}`,
      org.telephone,
    ]) {
      assert.ok(html.includes(printed), `${route}: the footer does not print ${printed}`);
    }
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
  assert.equal(await exists(path.join(OUT, "ko", "de")), false);
});
