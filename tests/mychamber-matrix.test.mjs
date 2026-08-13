import assert from "node:assert/strict";
import test from "node:test";
import { buildCatalogue } from "../app/mychamber-catalogue.ts";
import {
  emptyAnswers,
  modelFit,
  prune,
  questions,
  recommend,
  segments,
  specialUses,
  visibleOptions,
  visibleQuestions,
} from "../app/mychamber-advisor.ts";
import {
  questionnaireFor,
  questionnaires,
} from "../app/mychamber-questionnaires.ts";

/**
 * The head office's Chamber Matrix (11 August 2026, extended 12 August 2026),
 * as assertions.
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
    answers: { segments: ["automotive"], dut: "component", tests: ["ce", "re"], level: "pre" },
    expect: "UCC" },
  { path: "Automotive · components · full compliance",
    answers: { segments: ["automotive"], dut: "component", tests: ["ce", "re"], level: "1m" },
    expect: "ACTC" },
  { path: "Automotive · components · reverberation",
    answers: { segments: ["automotive"], dut: "component", tests: ["ri"], family: "reverberation" },
    among: ["RVC S", "RVC M"] },
  { path: "Automotive · vehicle · 3 m",
    answers: { segments: ["automotive"], dut: "vehicle", tests: ["ce", "re"], level: "3m" },
    expect: "AVTC" },
  { path: "Automotive · vehicle · 10 m · hybrid",
    answers: { segments: ["automotive"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "hybrid" },
    expect: "SAC-10V", variant: "SAC-10V-6/H" },
  { path: "Automotive · vehicle · 10 m · pyramid",
    answers: { segments: ["automotive"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "pyramid" },
    expect: "SAC-10V", variant: "SAC-10V-6/P" },
  { path: "Automotive · reverberation · vehicle",
    answers: { segments: ["automotive"], dut: "vehicle", tests: ["ri"], family: "reverberation" },
    among: ["RVC L", "RVC XL", "RVC XXL"] },
  { path: "Automotive · E-Drive · mobile dyno",
    answers: { segments: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "bluebox" },
    expect: "EDTC-BB" },
  { path: "Automotive · E-Drive · fixed single dyno",
    answers: { segments: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "single" },
    expect: "EDTC-SA" },
  { path: "Automotive · E-Drive · fixed axis dyno",
    answers: { segments: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "eaxle" },
    expect: "EDTC-AX" },

  /* ---- Commercial ------------------------------------------------- */
  { path: "Commercial · reverberation",
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ri"], family: "reverberation" },
    among: ["RVC e1", "RVC e2"] },
  { path: "Commercial · pre-compliance",
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "pre" },
    expect: "CHC" },
  { path: "Commercial · full compliance SAC · 3 m",
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ce", "re"], level: "3m" },
    among: ["SAC-3 Plus", "SAC-3 Square"] },
  { path: "Commercial · full compliance SAC · 5 m",
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ce", "re"], level: "5m" },
    among: ["SAC-5 Plus", "SAC-5 Square"] },
  { path: "Commercial · full compliance SAC · 10 m · hybrid · QZ ø4.0 m",
    answers: { segments: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "hybrid", qz: "4m" },
    expect: "SAC-10/H Hybrid", variant: "SAC-10-4/H" },
  { path: "Commercial · full compliance SAC · 10 m · pyramid · QZ ø6.0 m",
    answers: { segments: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", absorber: "pyramid", qz: "6m" },
    expect: "SAC-10/P Pyramid", variant: "SAC-10-6/P" },
  { path: "Commercial · full compliance FAC · table-top",
    answers: { segments: ["commercial"], dut: "component", tests: ["ri", "re"], level: "3m", family: undefined },
    among: ["SAC-3 Plus", "SAC-3 Square", "FAC-3"] },
  // The FAC branch asked for by name — the floor answer is what reaches it.
  // The 2026 catalogue confirms the three leaves: FAC-3 for table-top EUTs,
  // FAC-3 L with the height scan for floor-standing ones, and the Transformer
  // where one room has to serve both floor conditions.
  { path: "Commercial · full compliance FAC · free space, table-top",
    answers: { segments: ["commercial"], dut: "component", tests: ["ri", "re"], level: "3m", ground: "fac" },
    among: ["FAC-3", "FAC-3 L"] },
  { path: "Commercial · full compliance FAC · free space, floor-standing",
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "3m", ground: "fac" },
    expect: "FAC-3 L" },
  { path: "Commercial · SAC-3/FAC-3 Transformer · both floor conditions",
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "3m", ground: "both" },
    expect: "SAC-3 / FAC-3 Transformer" },
  // The matrix's "Special" leaf, confirmed by the catalogue as the SAC-10
  // Plus and its Triton configuration — one polygonal shell, wired for a
  // single axis or for three. The shell answer is what asks for each.
  { path: "Commercial · full compliance SAC · 10 m · Special · single axis",
    answers: { segments: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", qz: "3m", shell: "compact" },
    expect: "SAC-10 Plus" },
  { path: "Commercial · full compliance SAC · 10 m · Special · three axes",
    answers: { segments: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m", qz: "3m", shell: "multi" },
    expect: "SAC-10 Plus Triton" },

  /* ---- Military --------------------------------------------------- */
  { path: "Military · components · hybrid",
    answers: { segments: ["military"], dut: "component", tests: ["ci", "ri", "ce", "re"], level: "1m", absorber: "hybrid" },
    expect: "MIL CHC", variant: "MIL CHC" },
  { path: "Military · components · pyramid",
    answers: { segments: ["military"], dut: "component", tests: ["ci", "ri", "ce", "re"], level: "1m", absorber: "pyramid" },
    expect: "MIL CHC", variant: "MIL CPC" },
  { path: "Military · vehicle · pyramid (80 MHz, P600)",
    answers: { segments: ["military"], dut: "vehicle", tests: ["ci", "ri", "ce", "re"], level: "3m", absorber: "pyramid" },
    among: ["MIL-STD Chamber", "MIL-STD Chamber Advanced"] },
  { path: "Military · vehicle · hybrid",
    answers: { segments: ["military"], dut: "vehicle", tests: ["ci", "ri", "ce", "re"], level: "3m", absorber: "hybrid" },
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
    answers: { segments: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "pre-1ghz" },
    expect: "CHC Plus" },
  { path: "CHC Plus · pre-compliance with radiated emission that has to hold up",
    answers: { segments: ["commercial"], dut: "component", tests: ["re"], level: "pre-1ghz" },
    expect: "CHC Plus" },
  { path: "CTC · one component chamber for automotive and military standards",
    answers: {
      segments: ["automotive", "military"], dut: "component",
      tests: ["ci", "ri", "ce", "re"], level: "1m", absorber: "unsure",
    },
    expect: "CTC" },
  { path: "CTC · industrial component immunity at 3 m",
    answers: {
      segments: ["commercial", "automotive"], dut: "component", tests: ["ci", "ri"], level: "3m",
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
  const segmentSets = [["automotive"], ["commercial"], ["military"], ["automotive", "military"], ["commercial", "automotive"]];
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

  for (const segments of segmentSets) {
    for (const dut of duts) {
      for (const tests of testSets) {
        for (const level of levels) {
          for (const extra of extras) {
            const results = recommend(catalogue, ask({ segments, dut, tests, level, ...extra }), "en");
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
    segments: ["commercial"], dut: "vehicle", tests: ["ce", "re"], level: "10m",
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
        ask({ segments: ["automotive", "commercial", "military"], dut, tests: ["re"], level }),
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
   * Eight is the ceiling, and only the deepest branch reaches it — a
   * commercial 10 m chamber where the reader also picks a lining, a quiet zone
   * and a shell. Everything else is shorter, and the paths a reader is most
   * likely to take are much shorter, which is what the second half holds to
   * the exact number.
   *
   * It was nine until the standards step came out of the flow: that one was
   * asked on every path but the Special track, so every count below is one
   * lower than it was.
   */
  let longest = 0;
  let worst = "";
  const segmentSets = [["automotive"], ["commercial"], ["military"], ["automotive", "commercial", "military"]];
  const duts = ["component", "equipment", "vehicle", "large-vehicle", "edrive", "shielding"];
  const testSets = [["ci"], ["ri"], ["re"], ["ci", "ri", "ce", "re"]];
  const levels = ["pre", "pre-1ghz", "1m", "3m", "5m", "10m", "unsure"];

  for (const segments of segmentSets) {
    for (const dut of duts) {
      for (const tests of testSets) {
        for (const level of levels) {
          const a = ask({
            segments, dut, tests, level,
            family: "anechoic", absorber: "hybrid", qz: "3m", ground: "sac",
            shell: "sized", stirrer: "zfold", drive: "single",
          });
          const steps = visibleQuestions(a).length;
          if (steps > longest) {
            longest = steps;
            worst = `${segments.join("+")} / ${dut} / ${tests.join("+")} / ${level}`;
          }
        }
      }
    }
  }
  assert.ok(longest <= 8, `the longest path asks ${longest} questions (${worst})`);

  const common = [
    ["shielding only", { segments: ["commercial"], dut: "shielding" }, 2],
    ["an E-Drive bench", { segments: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive: "eaxle" }, 4],
    ["a 1 m component chamber", { segments: ["automotive"], dut: "component", tests: ["ce", "re"], level: "1m" }, 4],
    ["pre-compliance screening", { segments: ["commercial"], dut: "equipment", tests: ["ri", "re"], level: "pre" }, 4],
    ["a 3 m test site", { segments: ["commercial"], dut: "equipment", tests: ["ce", "re"], level: "3m", ground: "sac", qz: "2m" }, 6],
  ];
  for (const [name, answers, expected] of common) {
    const steps = visibleQuestions(ask(answers)).length;
    assert.equal(steps, expected, `${name} should take ${expected} questions, not ${steps}`);
  }
});

test("the first question is the matrix's segments, in its order", () => {
  /*
   * The top of the tree, held to the head office's own count.
   *
   * The matrix has three model segments, files E-Drive *inside* Automotive,
   * and — since the 12 August extension — draws Special Chambers as a fourth
   * segment of its own. A different fourth option here (Powertrain, which the
   * catalogue's industry axis does have) would pull the drivetrain branch out
   * of the one the head office put it on. That is a divergence from the answer
   * key, so it fails here rather than in a reader's shortlist.
   */
  const first = questions[0];
  assert.equal(first.id, "segments", "the questionnaire no longer opens on the segment");
  assert.deepEqual(
    first.options.map((o) => o.id),
    ["automotive", "commercial", "military", "special"],
    "the segment question is not the matrix's four, in the matrix's order",
  );
  // The scoring segments stay the three with catalogue models behind them —
  // Special has none, and ends in questionnaire D instead.
  assert.deepEqual([...segments], ["automotive", "commercial", "military"]);
});

test("the Special track is two questions and ends in questionnaire D", () => {
  // The extension's fourth segment has no catalogue models: its branch is the
  // four measurement tasks and then questionnaire Ⓓ. So the standard
  // questions must all close — a Special reader asked for a test distance
  // would be answering for a shortlist that cannot exist.
  const special = prune({ ...emptyAnswers, segments: ["special"] });
  assert.deepEqual(
    visibleQuestions(special).map((q) => q.id),
    ["segments", "specialUse"],
    "the Special track should ask exactly the segment and the measurement task",
  );

  // The one question offers the matrix's four entries, in the drawing's order.
  const useQuestion = questions.find((q) => q.id === "specialUse");
  assert.deepEqual(
    useQuestion.options.map((o) => o.id),
    [...specialUses],
    "the Special question is not the matrix's four tasks",
  );

  // Answers given on the standard track do not survive crossing over — they
  // would filter a flow the reader can no longer see.
  const crossed = prune({
    ...emptyAnswers,
    segments: ["special"], dut: "component", tests: ["re"], level: "3m",
  });
  assert.equal(crossed.dut, undefined, "the EUT answer outlived its question");
  assert.deepEqual([...crossed.tests], [], "the tests answer outlived its question");
  assert.equal(crossed.level, undefined, "the level answer outlived its question");

  // And the measurement task does not survive leaving the Special track.
  const left = prune({ ...emptyAnswers, segments: ["automotive"], specialUse: "sat" });
  assert.equal(left.specialUse, undefined, "the task answer outlived its question");
});

test("every segment answer points at its own questionnaire", () => {
  /*
   * The extension's questionnaires, held to the matrix: Ⓐ Automotive,
   * Ⓑ Commercial Industrial, Ⓒ Military, Ⓓ Special Chambers, and ⓧ for the
   * reader no single segment claims — none chosen, or several at once.
   */
  assert.equal(questionnaireFor(["automotive"]), "A");
  assert.equal(questionnaireFor(["commercial"]), "B");
  assert.equal(questionnaireFor(["military"]), "C");
  assert.equal(questionnaireFor(["special"]), "D");
  assert.equal(questionnaireFor([]), "X");
  assert.equal(questionnaireFor(["automotive", "military"]), "X");

  assert.deepEqual(
    questionnaires.map((q) => q.id),
    ["A", "B", "C", "D", "X"],
    "the matrix names five questionnaires",
  );

  for (const q of questionnaires) {
    // Every questionnaire ends in an enquiry the engineering team can act on,
    // so every one has to ask for the requirement in the reader's own words.
    const requirement = q.fields.find((f) => f.id === "requirement");
    assert.ok(requirement, `questionnaire ${q.id} never asks for the requirement`);
    assert.ok(!requirement.optional, `questionnaire ${q.id} treats the requirement as optional`);
  }

  // Questionnaire D's task options are the advisor's own list, so the wizard's
  // answer carries straight in as a pre-selection.
  const d = questionnaires.find((q) => q.id === "D");
  const use = d.fields.find((f) => f.id === "use");
  assert.deepEqual(
    use.options.map((o) => o.id),
    [...specialUses],
    "questionnaire D's tasks drifted from the advisor's",
  );
});

test("E-Drive is offered under Automotive and nowhere else", () => {
  const dutQuestion = questions.find((q) => q.id === "dut");
  const offers = (segs) =>
    visibleOptions(dutQuestion, { ...emptyAnswers, segments: segs }).some((o) => o.id === "edrive");

  assert.ok(offers(["automotive"]), "Automotive should offer E-Drive — the matrix files it there");
  assert.ok(!offers(["commercial"]), "Commercial should not offer E-Drive");
  assert.ok(!offers(["military"]), "Military should not offer E-Drive");

  // And an answer of E-Drive does not survive deselecting the segment that
  // offered it — otherwise the reader is filtered on a step they cannot see.
  const stale = prune({ ...emptyAnswers, segments: ["commercial"], dut: "edrive" });
  assert.equal(stale.dut, undefined, "E-Drive survived losing the segment that offers it");
});

test("an Automotive answer reaches the drivetrain chambers the catalogue tags Powertrain", () => {
  // The join the three-segment question rests on: the EDTC benches are filed
  // under the Powertrain industry, and Automotive is the only segment that can
  // ask for them. If the expansion in `coveredIndustries` were lost they would
  // still be reachable — but as cross-segment strangers, scored below every
  // chamber that merely shares the tag.
  for (const [drive, expected] of [["single", "EDTC-SA"], ["eaxle", "EDTC-AX"], ["bluebox", "EDTC-BB"]]) {
    const results = recommend(
      catalogue,
      ask({ segments: ["automotive"], dut: "edrive", tests: ["ce", "re"], drive }),
      "en",
    );
    assert.equal(results[0]?.entry.name, expected, `${drive}: got ${results[0]?.entry.name ?? "nothing"}`);
  }
});

test("answers to steps that closed are dropped", () => {
  // Select 10 m, answer the absorber and quiet zone, then go back and choose
  // pre-compliance: the two 10 m answers must not keep filtering invisibly.
  const answered = ask({
    segments: ["commercial"], dut: "vehicle", tests: ["ce", "re"],
    level: "10m", absorber: "pyramid", qz: "6m",
  });
  assert.equal(answered.absorber, "pyramid");
  assert.equal(answered.qz, "6m");

  const reconsidered = prune({ ...answered, level: "pre" });
  assert.equal(reconsidered.absorber, undefined, "the absorber answer outlived its question");
  assert.equal(reconsidered.qz, undefined, "the quiet-zone answer outlived its question");
});
