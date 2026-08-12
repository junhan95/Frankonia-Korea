import assert from "node:assert/strict";
import test from "node:test";
import { buildCatalogue } from "../app/mychamber-catalogue.ts";
import {
  emptyAnswers,
  modelFit,
  prune,
  questions,
  recommend,
  visibleOptions,
  visibleQuestions,
} from "../app/mychamber-advisor.ts";

/**
 * The head office's Chamber Matrix (11 August 2026), as assertions.
 *
 * Every case below is one leaf of that hand-drawn tree: a path through the
 * segments and levels, and the model the head office puts at the end of it.
 * The engine is scoring rather than a tree (see the note in
 * mychamber-advisor.ts), which is what lets it answer questions the tree
 * cannot — and is also exactly why it needs pinning to the tree wherever the
 * tree does have an answer. A weight changed for one branch can quietly move
 * another; this is what notices.
 *
 * `expect` is the model that must come first. `among` is for the leaves where
 * the matrix names a pair with nothing to choose between them (SAC-3 Plus and
 * SAC-3 Square are the same chamber in two shells), and `variant` is the exact
 * configuration the absorber and quiet-zone answers should pin down.
 */

const catalogue = buildCatalogue("en");

/** The answers a reader would give walking that path. */
const ask = (a) => prune({ ...emptyAnswers, ...a });

const CASES = [
  /* ---- Automotive ------------------------------------------------- */
  { path: "Automotive · components · pre-compliance",
    answers: { industries: ["automotive"], dut: "component", tests: ["ce", "re"], level: "pre" },
    expect: "UCC" },
  { path: "Automotive · components · full compliance",
    answers: { industries: ["automotive"], dut: "component", tests: ["ce", "re"], level: "1m" },
    expect: "ACTC" },
  { path: "Automotive · components · reverberation",
    answers: { industries: ["automotive"], dut: "component", tests: ["ri"], family: "reverberation" },
    among: ["RVC S", "RVC M"] },
  { path: "Automotive · vehicle · 3 m",
    answers: { industries: ["automotive"], dut: "vehicle", tests: ["ce", "re"], level: "3m" },
    expect: "AVTC" },
  { path: "Automotive · vehicle · 10 m · hybrid",
    answers: { industries: ["automotive"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "hybrid" },
    expect: "SAC-10V", variant: "SAC-10V-6/H" },
  { path: "Automotive · vehicle · 10 m · pyramid",
    answers: { industries: ["automotive"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "pyramid" },
    expect: "SAC-10V", variant: "SAC-10V-6/P" },
  { path: "Automotive · reverberation · vehicle",
    answers: { industries: ["automotive"], dut: "vehicle", tests: ["ri"], family: "reverberation" },
    among: ["RVC L", "RVC XL", "RVC XXL"] },
  { path: "Automotive · E-Drive · mobile dyno",
    answers: { industries: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "bluebox" },
    expect: "EDTC-BB" },
  { path: "Automotive · E-Drive · fixed single dyno",
    answers: { industries: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "single" },
    expect: "EDTC-SA" },
  { path: "Automotive · E-Drive · fixed axis dyno",
    answers: { industries: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "eaxle" },
    expect: "EDTC-AX" },

  /* ---- Commercial ------------------------------------------------- */
  { path: "Commercial · reverberation",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ri"], family: "reverberation" },
    among: ["RVC e1", "RVC e2"] },
  { path: "Commercial · pre-compliance",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "pre" },
    expect: "CHC" },
  { path: "Commercial · full compliance SAC · 3 m",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ce", "re"], level: "3m" },
    among: ["SAC-3 Plus", "SAC-3 Square"] },
  { path: "Commercial · full compliance SAC · 5 m",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ce", "re"], level: "5m" },
    among: ["SAC-5 Plus", "SAC-5 Square"] },
  { path: "Commercial · full compliance SAC · 10 m · hybrid · QZ ø4.0 m",
    answers: { industries: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "hybrid", qz: "4m" },
    expect: "SAC-10/H Hybrid", variant: "SAC-10-4/H" },
  { path: "Commercial · full compliance SAC · 10 m · pyramid · QZ ø6.0 m",
    answers: { industries: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "pyramid", qz: "6m" },
    expect: "SAC-10/P Pyramid", variant: "SAC-10-6/P" },
  { path: "Commercial · full compliance FAC · table-top",
    answers: { industries: ["commercial"], dut: "component", tests: ["ri", "re"], level: "3m", family: undefined },
    among: ["SAC-3 Plus", "SAC-3 Square", "FAC-3"] },
  // The FAC branch asked for by name — the floor answer is what reaches it.
  // The 2026 catalogue confirms the three leaves: FAC-3 for table-top EUTs,
  // FAC-3 L with the height scan for floor-standing ones, and the Transformer
  // where one room has to serve both floor conditions.
  { path: "Commercial · full compliance FAC · free space, table-top",
    answers: { industries: ["commercial"], dut: "component", tests: ["ri", "re"], level: "3m", ground: "fac" },
    among: ["FAC-3", "FAC-3 L"] },
  { path: "Commercial · full compliance FAC · free space, floor-standing",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "3m", ground: "fac" },
    expect: "FAC-3 L" },
  { path: "Commercial · SAC-3/FAC-3 Transformer · both floor conditions",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "3m", ground: "both" },
    expect: "SAC-3 / FAC-3 Transformer" },
  // The matrix's "Special" leaf, confirmed by the catalogue as the SAC-10
  // Plus and its Triton configuration — one polygonal shell, wired for a
  // single axis or for three. The shell answer is what asks for each.
  { path: "Commercial · full compliance SAC · 10 m · Special · single axis",
    answers: { industries: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", qz: "3m", shell: "compact" },
    expect: "SAC-10 Plus" },
  { path: "Commercial · full compliance SAC · 10 m · Special · three axes",
    answers: { industries: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", qz: "3m", shell: "multi" },
    expect: "SAC-10 Plus Triton" },

  /* ---- Military --------------------------------------------------- */
  { path: "Military · components · hybrid",
    answers: { industries: ["military"], dut: "component", tests: ["ci", "ri", "ce", "re"], level: "1m", absorber: "hybrid" },
    expect: "MIL CHC", variant: "MIL CHC" },
  { path: "Military · components · pyramid",
    answers: { industries: ["military"], dut: "component", tests: ["ci", "ri", "ce", "re"], level: "1m", absorber: "pyramid" },
    expect: "MIL CHC", variant: "MIL CPC" },
  { path: "Military · vehicle · pyramid (80 MHz, P600)",
    answers: { industries: ["military"], dut: "vehicle", tests: ["ci", "ri", "ce", "re"], level: "3m", absorber: "pyramid" },
    among: ["MIL-STD Chamber", "MIL-STD Chamber Advanced"] },
  { path: "Military · vehicle · hybrid",
    answers: { industries: ["military"], dut: "vehicle", tests: ["ci", "ri", "ce", "re"], level: "3m", absorber: "hybrid" },
    expect: "MIL-STD Chamber Advanced", variant: "MIL-STD Advanced Hybrid" },
];

test("every leaf of the head office matrix comes back first", () => {
  for (const { path, answers, expect, among, variant } of CASES) {
    const results = recommend(catalogue, ask(answers), "en");
    assert.ok(results.length > 0, `${path}: no recommendation at all`);

    const top = results[0];
    if (expect) {
      assert.equal(top.entry.name, expect, `${path}: expected ${expect}, got ${top.entry.name}`);
    } else {
      assert.ok(
        among.includes(top.entry.name),
        `${path}: expected one of ${among.join(" / ")}, got ${top.entry.name}`,
      );
    }

    if (variant) {
      assert.equal(
        top.variant?.name,
        variant,
        `${path}: expected the ${variant} configuration, got ${top.variant?.name ?? "none"}`,
      );
    }
  }
});

/**
 * The two chambers the matrix does not place, and the paths that reach them.
 *
 * The hand-drawn matrix leaves the CHC Plus out entirely and files the CTC
 * with the screening chambers; the model pages say otherwise, and the head
 * office confirmed the model pages. Both are full products and both have to be
 * reachable — as the *first* result, not as an also-ran — so their paths are
 * pinned here the same way the matrix leaves are.
 */
const OFF_MATRIX = [
  { path: "CHC Plus · certified emission above 1 GHz",
    answers: { industries: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "pre-1ghz" },
    expect: "CHC Plus" },
  { path: "CHC Plus · pre-compliance with radiated emission that has to hold up",
    answers: { industries: ["commercial"], dut: "component", tests: ["re"], level: "pre-1ghz" },
    expect: "CHC Plus" },
  { path: "CTC · one component chamber for automotive and military standards",
    answers: {
      industries: ["automotive", "military"], dut: "component",
      tests: ["ci", "ri", "ce", "re"], level: "1m", absorber: "unsure",
    },
    expect: "CTC" },
  { path: "CTC · industrial component immunity at 3 m",
    answers: {
      industries: ["commercial", "automotive"], dut: "component", tests: ["ci", "ri"], level: "3m",
      standards: ["iec61000_4_3", "cispr25", "iso11452"],
    },
    expect: "CTC" },
];

test("the chambers the matrix leaves out are still reachable, and win where they should", () => {
  for (const { path, answers, expect } of OFF_MATRIX) {
    const results = recommend(catalogue, ask(answers), "en");
    assert.ok(results.length > 0, `${path}: no recommendation at all`);
    assert.equal(
      results[0].entry.name,
      expect,
      `${path}: expected ${expect}, got ${results.map((r) => r.entry.name).join(" > ")}`,
    );
  }
});

test("every chamber in the catalogue can be recommended by some answer", () => {
  /*
   * The completeness guarantee, and the reason several of the later questions
   * exist at all.
   *
   * A model nobody can reach is a model that is not really on the site. This
   * sweeps the answer space and collects which names ever come back *first* —
   * not merely somewhere in a shortlist, which is a much weaker thing to
   * promise. Every one of the catalogue's chambers has to win somewhere.
   *
   * There are no exceptions. If this fails, the fix is a question that can ask
   * for whatever the missing chamber does, not an entry on an excuse list.
   */
  const winners = new Set();
  const industrySets = [["automotive"], ["military"], ["commercial"], ["powertrain"], ["automotive", "military"], ["commercial", "automotive"]];
  const duts = ["component", "equipment", "vehicle", "large-vehicle", "edrive", "shielding"];
  const testSets = [["ci"], ["ri"], ["ce"], ["re"], ["ri", "re"], ["ci", "ri", "ce", "re"]];
  const levels = ["pre", "pre-1ghz", "1m", "3m", "5m", "10m", "unsure"];
  const extras = [
    {},
    { family: "reverberation" },
    { family: "reverberation", luf: "80" }, { family: "reverberation", luf: "200" },
    { family: "reverberation", luf: "80", stirrer: "zfold" },
    { family: "reverberation", luf: "80", stirrer: "disc" },
    { qz: "1.2m" }, { qz: "1.5m" }, { qz: "2m" }, { qz: "3m" }, { qz: "4m" },
    { ground: "sac" }, { ground: "fac" }, { ground: "both" },
    { ground: "fac", qz: "1.5m" }, { ground: "both", qz: "2m" },
    { absorber: "hybrid" }, { absorber: "pyramid" },
    { absorber: "hybrid", qz: "3m" }, { absorber: "hybrid", qz: "6m" },
    { absorber: "pyramid", qz: "4m" },
    { absorber: "hybrid", qz: "3m", shell: "sized" },
    { absorber: "hybrid", qz: "3m", shell: "compact" },
    { absorber: "hybrid", qz: "3m", shell: "multi" },
    { drive: "single" }, { drive: "eaxle" }, { drive: "bluebox" },
  ];

  for (const industries of industrySets) {
    for (const dut of duts) {
      for (const tests of testSets) {
        for (const level of levels) {
          for (const extra of extras) {
            const results = recommend(catalogue, ask({ industries, dut, tests, level, ...extra }), "en");
            if (results.length > 0) winners.add(results[0].entry.name);
          }
        }
      }
    }
  }

  const unreachable = Object.keys(modelFit).filter((name) => !winners.has(name));
  assert.deepEqual(unreachable, [], `no answer reaches: ${unreachable.join(", ")}`);
});

test("the Special chambers stay behind the main branch, and stay reachable", () => {
  // The matrix files SAC-10 Plus and Triton under "Special": real products,
  // but not the ordinary answer to "a 10 m commercial chamber". They must not
  // outrank the SAC-10/H — and must not vanish either, because the Triton's
  // three axes are a real reason to choose it.
  const tenMetre = {
    industries: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m",
  };
  const hybrid = recommend(catalogue, ask({ ...tenMetre, absorber: "hybrid", qz: "3m" }), "en", 8);
  const names = hybrid.map((r) => r.entry.name);

  assert.equal(names[0], "SAC-10/H Hybrid", `the main branch lost its place: ${names.join(" > ")}`);
  assert.ok(
    names.includes("SAC-10 Plus") || names.includes("SAC-10 Plus Triton"),
    `the Special chambers dropped out entirely at ø3.0 m: ${names.join(" > ")}`,
  );
});

test("a reverberation chamber is never offered for compliant radiated emission", () => {
  // The field in it is deliberately stirred, so there is no defined distance
  // to measure at. This is the one recommendation that would be wrong rather
  // than merely suboptimal.
  for (const level of ["1m", "3m", "5m", "10m"]) {
    for (const dut of ["component", "equipment", "vehicle", "large-vehicle"]) {
      const results = recommend(
        catalogue,
        ask({ industries: ["automotive", "commercial", "military"], dut, tests: ["re"], level }),
        "en",
        32,
      );
      const rvc = results.filter((r) => r.entry.name.startsWith("RVC"));
      assert.deepEqual(rvc, [], `${dut} at ${level} offered ${rvc.map((r) => r.entry.name).join(", ")}`);
    }
  }
});

test("the questionnaire stays short on the paths most readers take", () => {
  /*
   * Completeness costs questions, and this is where the bill is checked.
   *
   * Nine is the ceiling, and only the deepest branch reaches it — a commercial
   * 10 m chamber where the reader also picks a lining, a quiet zone and a
   * shell. Everything else is shorter, and the paths a reader is most likely
   * to take are much shorter, which is what the second half holds to the
   * exact number.
   */
  let longest = 0;
  let worst = "";
  const industrySets = [["automotive"], ["military"], ["commercial"], ["powertrain"], ["automotive", "commercial", "military", "powertrain"]];
  const duts = ["component", "equipment", "vehicle", "large-vehicle", "edrive", "shielding"];
  const testSets = [["ci"], ["ri"], ["re"], ["ci", "ri", "ce", "re"]];
  const levels = ["pre", "pre-1ghz", "1m", "3m", "5m", "10m", "unsure"];

  for (const industries of industrySets) {
    for (const dut of duts) {
      for (const tests of testSets) {
        for (const level of levels) {
          const a = ask({
            industries, dut, tests, level,
            family: "anechoic", absorber: "hybrid", qz: "3m", ground: "sac",
            shell: "sized", stirrer: "zfold", drive: "single",
          });
          const steps = visibleQuestions(a).length;
          if (steps > longest) {
            longest = steps;
            worst = `${industries.join("+")} / ${dut} / ${tests.join("+")} / ${level}`;
          }
        }
      }
    }
  }
  assert.ok(longest <= 9, `the longest path asks ${longest} questions (${worst})`);

  const common = [
    ["shielding only", { industries: ["commercial"], dut: "shielding" }, 3],
    ["an E-Drive bench", { industries: ["powertrain"], dut: "edrive", tests: ["ce", "re"], drive: "eaxle" }, 5],
    ["a 1 m component chamber", { industries: ["automotive"], dut: "component", tests: ["ce", "re"], level: "1m" }, 5],
    ["pre-compliance screening", { industries: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "pre" }, 5],
    ["a 3 m test site", { industries: ["commercial"], dut: "equipment", tests: ["ce", "re"], level: "3m", ground: "sac", qz: "2m" }, 7],
  ];
  for (const [name, answers, expected] of common) {
    const steps = visibleQuestions(ask(answers)).length;
    assert.equal(steps, expected, `${name} should take ${expected} questions, not ${steps}`);
  }
});

test("E-Drive is only offered to the industries that have one", () => {
  const dutQuestion = questions.find((q) => q.id === "dut");
  const offers = (industries) =>
    visibleOptions(dutQuestion, { ...emptyAnswers, industries }).some((o) => o.id === "edrive");

  assert.ok(offers(["automotive"]), "Automotive should offer E-Drive — the matrix files it there");
  assert.ok(offers(["powertrain"]), "Powertrain should offer E-Drive");
  assert.ok(!offers(["commercial"]), "Commercial should not offer E-Drive");
  assert.ok(!offers(["military"]), "Military should not offer E-Drive");

  // And an answer of E-Drive does not survive deselecting the industry that
  // offered it — otherwise the reader is filtered on a step they cannot see.
  const stale = prune({ ...emptyAnswers, industries: ["commercial"], dut: "edrive" });
  assert.equal(stale.dut, undefined, "E-Drive survived losing the industry that offers it");
});

test("answers to steps that closed are dropped", () => {
  // Select 10 m, answer the absorber and quiet zone, then go back and choose
  // pre-compliance: the two 10 m answers must not keep filtering invisibly.
  const answered = ask({
    industries: ["commercial"], dut: "vehicle", tests: ["ce", "re"],
    level: "10m", absorber: "pyramid", qz: "6m",
  });
  assert.equal(answered.absorber, "pyramid");
  assert.equal(answered.qz, "6m");

  const reconsidered = prune({ ...answered, level: "pre" });
  assert.equal(reconsidered.absorber, undefined, "the absorber answer outlived its question");
  assert.equal(reconsidered.qz, undefined, "the quiet-zone answer outlived its question");
});
