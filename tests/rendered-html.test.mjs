import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { stagingEnv } from "../scripts/staging-env.mjs";
import { galleryFiles } from "../app/chamber-gallery.ts";

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
      "/chambers/model/actc/",
      "/chambers/model/avtc/",
      "/chambers/model/chc-plus/",
      "/chambers/model/chc/",
      "/chambers/model/ctc/",
      "/chambers/model/edtc-ax/",
      "/chambers/model/edtc-bb/",
      "/chambers/model/edtc-sa/",
      "/chambers/model/fac-3-l/",
      "/chambers/model/fac-3/",
      "/chambers/model/mil-chc/",
      "/chambers/model/mil-std-chamber-advanced/",
      "/chambers/model/mil-std-chamber/",
      "/chambers/model/rvc/",
      "/chambers/model/sac-10-h-hybrid/",
      "/chambers/model/sac-10-p-pyramid/",
      "/chambers/model/sac-10-plus-triton/",
      "/chambers/model/sac-10-plus/",
      "/chambers/model/sac-10-v/",
      "/chambers/model/sac-3-fac-3-transformer/",
      "/chambers/model/sac-3-plus/",
      "/chambers/model/sac-3-square/",
      "/chambers/model/sac-5-plus/",
      "/chambers/model/sac-5-square/",
      "/chambers/model/shielded-room/",
      "/chambers/model/ucc/",
      "/chambers/references/",
      "/chambers/services/",
      "/chambers/shielding-gates/",
      "/chambers/type/chc/",
      "/chambers/type/component/",
      "/chambers/type/fac/",
      "/chambers/type/rvc/",
      "/chambers/type/sac/",
      "/chambers/type/shielded-room/",
      "/company/about/",
      "/company/career/",
      "/company/events/",
      "/company/publications/",
      "/contact/",
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
      "/ko/chambers/model/actc/",
      "/ko/chambers/model/avtc/",
      "/ko/chambers/model/chc-plus/",
      "/ko/chambers/model/chc/",
      "/ko/chambers/model/ctc/",
      "/ko/chambers/model/edtc-ax/",
      "/ko/chambers/model/edtc-bb/",
      "/ko/chambers/model/edtc-sa/",
      "/ko/chambers/model/fac-3-l/",
      "/ko/chambers/model/fac-3/",
      "/ko/chambers/model/mil-chc/",
      "/ko/chambers/model/mil-std-chamber-advanced/",
      "/ko/chambers/model/mil-std-chamber/",
      "/ko/chambers/model/rvc/",
      "/ko/chambers/model/sac-10-h-hybrid/",
      "/ko/chambers/model/sac-10-p-pyramid/",
      "/ko/chambers/model/sac-10-plus-triton/",
      "/ko/chambers/model/sac-10-plus/",
      "/ko/chambers/model/sac-10-v/",
      "/ko/chambers/model/sac-3-fac-3-transformer/",
      "/ko/chambers/model/sac-3-plus/",
      "/ko/chambers/model/sac-3-square/",
      "/ko/chambers/model/sac-5-plus/",
      "/ko/chambers/model/sac-5-square/",
      "/ko/chambers/model/shielded-room/",
      "/ko/chambers/model/ucc/",
      "/ko/chambers/references/",
      "/ko/chambers/services/",
      "/ko/chambers/shielding-gates/",
      "/ko/chambers/type/chc/",
      "/ko/chambers/type/component/",
      "/ko/chambers/type/fac/",
      "/ko/chambers/type/rvc/",
      "/ko/chambers/type/sac/",
      "/ko/chambers/type/shielded-room/",
      "/ko/company/about/",
      "/ko/company/career/",
      "/ko/company/events/",
      "/ko/company/publications/",
      "/ko/contact/",
      "/ko/cybershield/",
      "/ko/downloads/",
      "/ko/imprint/",
      "/ko/mychamber/",
      "/ko/privacy/",
      "/ko/test-systems/",
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

test("CyberShield summarises, and hands the reader to the product site", () => {
  // The navigation points at this site's own summary page — not straight out
  // to the product site, which would take a reader out of the site from the
  // menu bar without warning.
  for (const { route, html } of pages) {
    const internal = localeOf(route) === "ko" ? `${BASE}/ko/cybershield/` : `${BASE}/cybershield/`;
    assert.ok(
      html.includes(`<a href="${internal}">CyberShield`),
      `${route}: the navigation does not point at the internal CyberShield page`,
    );
  }

  for (const { route, html } of pages.filter((p) => p.route.endsWith("/cybershield/"))) {
    assert.ok(html.includes("<header>"), `${route}: rendered without the site header`);
    assert.ok(html.includes("<footer>"), `${route}: rendered without the site footer`);

    // A summary in this site's own bands, not the port of the product page
    // that used to live here: that carried its own stylesheet and ~3,200 lines
    // of copy the product team owns, and went stale the moment they edited it.
    assert.ok(
      !html.includes('class="cs-hero"') && !html.includes('class="cs '),
      `${route}: the ported product page is back`,
    );
    // The class, not the whole attribute: the head band takes a `--photo`
    // modifier on the first page of each nav branch, and this one is such a
    // page. What the assertion is for is that the summary is built on the
    // shared head rather than carrying a hero of its own.
    assert.ok(
      /class="page-head(?: |")/.test(html),
      `${route}: not built on the shared page head`,
    );

    // The link out is the point of the page, so it has to be on it — and it
    // has to carry the reader's locale, because the product site serves
    // English from its root and Korean from /ko/.
    const product =
      localeOf(route) === "ko"
        ? "https://www.frankonia-cybershield.com/ko/"
        : "https://www.frankonia-cybershield.com/";
    const outbound = [...html.matchAll(/<a[^>]*href="(https:\/\/www\.frankonia-cybershield\.com[^"]*)"/g)];
    assert.ok(outbound.length >= 2, `${route}: the product site is linked ${outbound.length} time(s)`);
    for (const [, href] of outbound) {
      assert.equal(href, product, `${route}: an outbound link drops the reader's locale`);
    }
  }

  // A new tab, so the summary the reader is standing on stays open — asked for
  // on 2026-08-11, and it reverses the earlier brief, so it is worth a test
  // rather than a comment. `rel="noopener"` comes with it; `noreferrer` does
  // not, because the referrer is how the product site sees this page send it
  // traffic.
  for (const { route, html } of pages) {
    for (const [link] of html.matchAll(/<a[^>]*frankonia-cybershield\.com[^>]*>/g)) {
      assert.ok(link.includes('target="_blank"'), `${route}: the product site opens in this window: ${link}`);
      assert.ok(link.includes('rel="noopener"'), `${route}: an outbound link is missing rel="noopener": ${link}`);
      assert.ok(!link.includes("noreferrer"), `${route}: an outbound link strips the referrer: ${link}`);
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
    // Every option of it, too — the answer set is the page. Three, which is
    // what the head office matrix has: E-Drive is a branch under Automotive,
    // not a segment beside it.
    for (const option of ["Automotive", "Commercial", "Military"]) {
      assert.ok(page.html.includes(option), `${route}: the ${option} option is missing`);
    }
  }
});

test("a model row opens onto its figures, and still leads to the model page", () => {
  // The row used to be a link and is now a button, which is the change that
  // could quietly strand the model pages: nothing else on an index reaches
  // them. It could also have taken the panel out of the export — collapsed is a
  // CSS state here, not an absent element, and both a crawler and a reader
  // whose bundle has not landed have to find the figures in the file.
  const withRows = pages.filter((p) => p.html.includes('aria-controls="panel-'));
  // Eleven per locale, all of them on the chamber branch — the four industry
  // indexes, the six chamber-type indexes and the RVC page, which lists its
  // seven siblings. The EMC Test Systems branch still prints plain rows.
  assert.equal(withRows.length, 22, `${withRows.length} pages carry an opening model list, expected 22`);

  for (const { route, html } of withRows) {
    const panels = [...html.matchAll(/aria-controls="(panel-[^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(panels).size, panels.length, `${route}: two rows control one panel`);
    for (const id of panels) {
      assert.ok(html.includes(`id="${id}"`), `${route}: ${id} is controlled but not in the export`);
    }
    // Every row ships closed. An accordion that ships open is twelve plates.
    assert.doesNotMatch(
      html,
      /hl-row--toggle[^>]*aria-expanded="true"/,
      `${route}: a model row is open before anyone clicked it`,
    );
    // `inert` is what keeps a folded panel out of the tab order, now that
    // `display: none` no longer does it.
    assert.match(html, /class="hl-panel-clip" inert=""/, `${route}: a folded panel is still focusable`);
    assert.ok(html.includes('class="hl-figures"'), `${route}: no summary figures in any panel`);
    assert.ok(html.includes('class="hl-lead"'), `${route}: no panel says what the model is`);
    const ko = localeOf(route) === "ko";
    // A chamber has a page of its own and the panel is the only way an index
    // reaches it, which is the link this test exists to protect.
    assert.ok(
      html.includes(ko ? "모델 상세 보기" : "View the model page"),
      `${route}: no panel offers the model page`,
    );
    // The enquiry arrives naming the chamber it is about. A quote button that
    // opens an empty mail is the failure this checks for.
    assert.ok(
      html.includes(ko ? "견적 문의" : "Request a quote"),
      `${route}: no panel offers a quotation`,
    );
    assert.match(
      html,
      new RegExp(`href="mailto:[^"]+\\?subject=${encodeURIComponent(ko ? "[견적 문의] " : "[Quote request] ")}`),
      `${route}: the quote button does not name a model`,
    );
  }

  // The list in the screenshot this was built from: twelve semi-anechoic
  // chambers, each still one click from its own page.
  const sac = pages.find((p) => p.route === "/chambers/type/sac/");
  assert.equal(
    [...sac.html.matchAll(/aria-controls="panel-/g)].length,
    12,
    "/chambers/type/sac/: the model count changed",
  );
  for (const slug of ["sac-10-v", "avtc", "mil-std-chamber", "sac-3-plus", "sac-10-plus-triton"]) {
    assert.ok(
      sac.html.includes(`href="${BASE}/chambers/model/${slug}/"`),
      `/chambers/type/sac/: ${slug} lost its link to the model page`,
    );
  }
});

test("every gallery plate the panels name is actually shipped", async () => {
  // The gallery table is written by hand against files converted out of band.
  // A typo in a filename is invisible until someone opens the row and gets a
  // broken frame — the export is the only place that can say whether the file
  // is there.
  assert.ok(galleryFiles.length >= 48, `only ${galleryFiles.length} gallery plates are declared`);
  for (const src of new Set(galleryFiles)) {
    assert.ok(
      await exists(path.join(OUT, src.replace(/^\//, ""))),
      `${src} is in the gallery table but not in the export`,
    );
  }
});

test("a model row with more than one plate carries the gallery controls", () => {
  // The picture is a button and the two chevrons beside it are buttons. If the
  // markup ships without them the panel still shows a photograph, which is why
  // this is worth asserting rather than trusting to the eye.
  for (const route of ["/chambers/type/sac/", "/ko/chambers/type/sac/"]) {
    const { html } = pages.find((p) => p.route === route);
    for (const cls of ["hl-frame", "hl-step hl-step--prev", "hl-step hl-step--next", "hl-count"]) {
      assert.ok(html.includes(`class="${cls}"`), `${route}: the gallery is missing ${cls}`);
    }
    // Twelve rows, each opening on its own first plate — and only the first,
    // because the rest are mounted when a reader steps to them.
    const frames = [...html.matchAll(/class="hl-frame"/g)].length;
    assert.equal(frames, 12, `${route}: ${frames} galleries, expected one per model`);
  }
});

test("a gallery frame that is hidden is actually hidden", async () => {
  // This one shipped. `.hl-shot img { display: block }` outweighs the user
  // agent's `[hidden] { display: none }` — one class beats none — so every
  // frame rendered at once, stacked, and `overflow: hidden` cropped the pile
  // to the first. The counter stepped and the picture did not, which no
  // assertion about the markup could have caught: the `hidden` attribute was
  // there the whole time. So the assertion is about the stylesheet.
  // Wherever the build decides to put them — Next has moved stylesheets
  // between `static/css` and `static/chunks` across versions, and a test that
  // pins the folder fails for a reason that has nothing to do with the rule.
  const sheets = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".css")) sheets.push(full);
    }
  };
  await walk(path.join(OUT, "_next"));
  assert.ok(sheets.length > 0, "the export ships no stylesheet at all");
  const css = (await Promise.all(sheets.map((f) => readFile(f, "utf8")))).join("");
  assert.match(
    css,
    /\.hl-shot img\[hidden\]\s*\{\s*display:\s*none\s*\}/,
    "the gallery's [hidden] override is not in the built stylesheet",
  );
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
