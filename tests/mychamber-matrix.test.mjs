import assert from "node:assert/strict";
import test from "node:test";
import { chamberModels } from "../app/chamber-sections.ts";
import { buildCatalogue } from "../app/mychamber-catalogue.ts";
import {
  carried,
  resolve,
  segmentOf,
  segments,
  specialUses,
  tree,
  treeModels,
  walk,
} from "../app/mychamber-advisor.ts";
import {
  questionnaire,
  questionnaireFor,
  questionnaires,
  visibleFields,
} from "../app/mychamber-questionnaires.ts";

/**
 * The head office's Chamber Matrix (11 August 2026, extended 12 August 2026),
 * as assertions.
 *
 * docs/MYCHAMBER-MATRIX-FLOW.md transcribes the drawing branch by branch;
 * app/mychamber-advisor.ts implements it; this file holds the two together.
 * Every case below is one leaf of the hand-drawn tree — the option ids a reader
 * would click walking down to it, and the model designation the head office
 * writes at the end.
 *
 * The flow is now the tree itself rather than a scoring engine pinned to it, so
 * these are equalities and not rankings: a branch either ends in the models the
 * matrix names, in that order, or the transcription is wrong.
 */

const catalogue = buildCatalogue("en");

/** The node a path lands on. */
const land = (path) => walk(path).at;

/** The models at the end of a branch, in the drawing's order. */
const leaves = (path) => {
  const at = land(path);
  assert.equal(at.kind, "models", `${path.join(" · ")}: does not end in models`);
  return at.leaves;
};

const CASES = [
  /* ---- Automotive ------------------------------------------------- */
  { path: ["automotive", "components", "reverberation"], expect: ["RVC S", "RVC M"] },
  { path: ["automotive", "components", "pre"], expect: ["UCC"] },
  { path: ["automotive", "components", "full"], expect: ["ACTC"] },
  { path: ["automotive", "vehicle", "3m"], expect: ["AVTC"] },
  { path: ["automotive", "vehicle", "10m", "sac-10v", "hybrid"], expect: ["SAC-10V"], variants: ["SAC-10V-6/H"] },
  { path: ["automotive", "vehicle", "10m", "sac-10v", "pyramid"], expect: ["SAC-10V"], variants: ["SAC-10V-6/P"] },
  { path: ["automotive", "vehicle", "10m", "sac-10vc"], expect: ["SAC-10V"], variants: ["SAC-10VC"] },
  { path: ["automotive", "reverberation", "components"], expect: ["RVC S", "RVC M"] },
  { path: ["automotive", "reverberation", "vehicle", "zfold"], expect: ["RVC L"] },
  { path: ["automotive", "reverberation", "vehicle", "disc9"], expect: ["RVC XL"] },
  { path: ["automotive", "reverberation", "vehicle", "disc12"], expect: ["RVC XXL"] },
  { path: ["automotive", "edrive", "mobile"], expect: ["EDTC-BB"] },
  { path: ["automotive", "edrive", "single"], expect: ["EDTC-SA"] },
  { path: ["automotive", "edrive", "axis"], expect: ["EDTC-AX"] },

  /* ---- Commercial · Industrial ------------------------------------ */
  { path: ["commercial", "reverberation"], expect: ["RVC e1", "RVC e2"] },
  // The matrix draws CHC and CTC here. CHC Plus is the catalogue's own
  // advanced setup of the CHC, and rides with it rather than being unreachable.
  { path: ["commercial", "pre"], expect: ["CHC", "CHC Plus", "CTC"] },
  { path: ["commercial", "sac", "3m"], expect: ["SAC-3 Plus", "SAC-3 Square"] },
  { path: ["commercial", "sac", "5m"], expect: ["SAC-5 Plus", "SAC-5 Square"] },
  { path: ["commercial", "sac", "10m", "hybrid", "3m"], expect: ["SAC-10/H Hybrid"], variants: ["SAC-10-3/H"] },
  { path: ["commercial", "sac", "10m", "hybrid", "4m"], expect: ["SAC-10/H Hybrid"], variants: ["SAC-10-4/H"] },
  { path: ["commercial", "sac", "10m", "hybrid", "5m"], expect: ["SAC-10/H Hybrid"], variants: ["SAC-10-5/H"] },
  { path: ["commercial", "sac", "10m", "hybrid", "6m"], expect: ["SAC-10/H Hybrid"], variants: ["SAC-10-6/H"] },
  { path: ["commercial", "sac", "10m", "pyramid", "3m"], expect: ["SAC-10/P Pyramid"], variants: ["SAC-10-3/P"] },
  { path: ["commercial", "sac", "10m", "pyramid", "4m"], expect: ["SAC-10/P Pyramid"], variants: ["SAC-10-4/P"] },
  { path: ["commercial", "sac", "10m", "pyramid", "5m"], expect: ["SAC-10/P Pyramid"], variants: ["SAC-10-5/P"] },
  { path: ["commercial", "sac", "10m", "pyramid", "6m"], expect: ["SAC-10/P Pyramid"], variants: ["SAC-10-6/P"] },
  { path: ["commercial", "sac", "10m", "special"], expect: ["SAC-10 Plus", "SAC-10 Plus Triton"] },
  { path: ["commercial", "fac", "tabletop"], expect: ["FAC-3"] },
  { path: ["commercial", "fac", "floor"], expect: ["FAC-3 L"] },
  { path: ["commercial", "fac", "both"], expect: ["SAC-3 / FAC-3 Transformer"] },

  /* ---- Military --------------------------------------------------- */
  { path: ["military", "components", "hybrid"], expect: ["MIL CHC"], variants: ["MIL CHC"] },
  { path: ["military", "components", "pyramid"], expect: ["MIL CHC"], variants: ["MIL CPC"] },
  { path: ["military", "vehicle", "hybrid"], expect: ["MIL-STD Chamber Advanced"], variants: ["MIL-STD Advanced Hybrid"] },
  // "MIL STD 80 (P600)" and "MIL STD 30 (P2400)" — the two numbers are the
  // frequency the lining starts at, not model designations.
  { path: ["military", "vehicle", "pyramid", "80"], expect: ["MIL-STD Chamber"] },
  { path: ["military", "vehicle", "pyramid", "26"], expect: ["MIL-STD Chamber Advanced"], variants: ["MIL-STD Advanced Pyramid"] },
];

test("every leaf of the head office matrix ends in the models it names", () => {
  for (const { path, expect, variants } of CASES) {
    const found = leaves(path);
    assert.deepEqual(
      found.map((l) => l.model),
      expect,
      `${path.join(" · ")}: expected ${expect.join(" / ")}`,
    );
    if (variants) {
      assert.deepEqual(
        found.map((l) => l.variant?.name),
        variants,
        `${path.join(" · ")}: the configuration the branch pins down drifted`,
      );
    }
  }
});

test("the first question is the matrix's four segments, in its order", () => {
  /*
   * The top of the tree, held to the head office's own count and order.
   *
   * Four boxes: three with catalogue models under them, and — since the
   * 12 August extension — Special Chambers, whose branch has none. The
   * catalogue's industry axis has five slugs and Powertrain is one of them; a
   * Powertrain option here would pull the E-Drive branch out of Automotive,
   * where the matrix files it. That is a divergence from the drawing, so it
   * fails here rather than in a reader's result.
   */
  assert.equal(tree.kind, "ask");
  assert.equal(tree.id, "segment");
  assert.deepEqual(
    tree.options.map((o) => o.id),
    ["automotive", "commercial", "military", "special"],
  );
  assert.deepEqual([...segments], ["automotive", "commercial", "military", "special"]);
});

/** Every complete branch of the tree: the ids clicked, and where it lands. */
const branches = () => {
  const out = [];
  const go = (node, path) => {
    if (node.kind !== "ask") {
      out.push({ path, node });
      return;
    }
    for (const option of node.options) go(option.next, [...path, option.id]);
  };
  go(tree, []);
  return out;
};

test("every branch is reachable in five questions or fewer", () => {
  /*
   * The bill for following the drawing exactly.
   *
   * The matrix is at most five levels deep — Automotive vehicle 10 m and
   * Commercial SAC 10 m are the two that reach it — and no question exists
   * that the drawing does not draw. The previous scoring flow asked up to
   * eight, none of which was one of the matrix's own branch points.
   */
  const all = branches();
  const deepest = all.reduce((worst, b) => (b.path.length > worst.path.length ? b : worst));
  assert.ok(
    deepest.path.length <= 5,
    `the longest branch asks ${deepest.path.length} questions (${deepest.path.join(" · ")})`,
  );

  const shortest = all.reduce((best, b) => (b.path.length < best.path.length ? b : best));
  assert.equal(
    shortest.path.length,
    2,
    `the shortest branch should be two questions (${shortest.path.join(" · ")})`,
  );

  for (const [path, expected] of [
    [["commercial", "pre"], 2],
    [["special", "ota"], 2],
    [["automotive", "components", "full"], 3],
    [["automotive", "edrive", "axis"], 3],
    [["military", "vehicle", "pyramid", "80"], 4],
    [["commercial", "sac", "10m", "pyramid", "5m"], 5],
  ]) {
    assert.equal(walk(path).steps.length, expected, `${path.join(" · ")} should be ${expected} questions`);
  }
});

test("every chamber in the catalogue is reachable, except the one the matrix omits", () => {
  /*
   * A model nobody can reach is a model that is not really on the site.
   *
   * There is one deliberate exception and it is named here rather than left to
   * be noticed: the Chamber Matrix does not place the Shielded Room. It is not
   * an EMC test site — it is the shell the whole range is built on, bought on
   * its own for security work or to isolate an instrument — so My Chamber
   * leaves it to its own product page. Every other chamber has to be at the end
   * of some branch.
   */
  const reached = new Set(treeModels());
  const unreachable = chamberModels.map((m) => m.name).filter((name) => !reached.has(name));
  assert.deepEqual(
    unreachable,
    ["Shielded Room"],
    "the set of chambers My Chamber cannot reach changed",
  );

  // And nothing in the tree names a chamber the site does not carry. The build
  // already fails on this (mychamber-catalogue.ts); here it is as a message.
  const phantom = [...reached].filter((name) => !chamberModels.some((m) => m.name === name));
  assert.deepEqual(phantom, [], `the tree ends in chambers that are not in the catalogue: ${phantom.join(", ")}`);
});

test("every branch that ends in models resolves against the catalogue", () => {
  // A leaf carries a designation and a reason; this is where both are checked
  // against the catalogue the page actually builds, in both locales.
  for (const { path, node } of branches()) {
    if (node.kind !== "models") continue;
    assert.ok(node.leaves.length > 0, `${path.join(" · ")}: ends in an empty result`);
    for (const lang of ["ko", "en"]) {
      const results = resolve(buildCatalogue(lang), node, lang);
      assert.equal(
        results.length,
        node.leaves.length,
        `${path.join(" · ")}: a model did not resolve in ${lang}`,
      );
      for (const r of results) {
        assert.ok(r.why.trim().length > 0, `${path.join(" · ")}: ${r.entry.name} has no reason in ${lang}`);
      }
    }
  }
});

test("the Special track is two questions and ends in questionnaire D", () => {
  // The extension's fourth segment has no catalogue models: its branch is the
  // four measurement tasks and then questionnaire Ⓓ, with the task carried in.
  // The fifth option is the segment's own `custom` oval — the measurement that
  // is none of the four — and carries no task, because there is none to carry.
  const task = tree.options.find((o) => o.id === "special").next;
  assert.deepEqual(task.options.map((o) => o.id), [...specialUses, "custom"]);

  for (const use of specialUses) {
    const at = land(["special", use]);
    assert.equal(at.kind, "form", `special · ${use}: should end in a questionnaire`);
    assert.equal(at.qid, "D");
    assert.deepEqual(carried(["special", use]), { use }, `special · ${use}: the task did not carry in`);
  }

  assert.equal(land(["special", "custom"]).qid, "D");
  assert.deepEqual(carried(["special", "custom"]), {});
});

test("every segment carries the matrix's custom oval as a branch of its own", () => {
  /*
   * The drawing hangs a circled questionnaire under each of its four segment
   * boxes — Ⓐ, Ⓑ, Ⓒ, Ⓓ — on a line from the box itself, level with the
   * branches that end in models rather than beneath them. So it is an option
   * on the segment's own question, and it is the last one: a reader who can
   * place themselves should.
   */
  for (const [segment, qid] of [
    ["automotive", "A"],
    ["commercial", "B"],
    ["military", "C"],
    ["special", "D"],
  ]) {
    const branch = tree.options.find((o) => o.id === segment).next;
    const last = branch.options.at(-1);
    assert.equal(last.id, "custom", `${segment}: the custom branch is not the last option`);
    assert.equal(last.next.kind, "form", `${segment}: the custom branch does not end in a questionnaire`);
    assert.equal(last.next.qid, qid, `${segment}: the custom branch points at the wrong questionnaire`);
  }
});

test("what a branch carries is something its questionnaire actually asks", () => {
  /*
   * The one join nothing in the type system holds.
   *
   * `Branch.carry` is written in the vocabulary of the questionnaire the
   * reader would land in — field ids and option ids — and the two files know
   * nothing about each other. A renamed field or option would silently stop
   * pre-filling, which is invisible: the form simply opens blank. So every
   * carry on every branch is checked against the questionnaire its segment
   * points at.
   */
  const visit = (node, path) => {
    if (node.kind !== "ask") return;
    for (const option of node.options) {
      const next = [...path, option.id];
      if (option.carry) {
        const q = questionnaire(questionnaireFor(segmentOf(next)));
        for (const [id, value] of Object.entries(option.carry)) {
          const field = q.fields.find((f) => f.id === id);
          assert.ok(field, `${next.join(" · ")}: questionnaire ${q.id} has no field "${id}"`);
          if (field.kind === "choice") {
            assert.ok(
              field.options.some((o) => o.id === value),
              `${next.join(" · ")}: questionnaire ${q.id} field "${id}" has no option "${value}"`,
            );
          }
        }
      }
      visit(option.next, next);
    }
  };
  visit(tree, []);

  // And the ones that matter most, spelled out — the branch a reader most
  // often bails out of, and what the form should already know when they do.
  assert.deepEqual(carried(["automotive", "edrive", "axis"]), { eut: "edrive", driveSetup: "eaxle" });
  assert.deepEqual(carried(["commercial", "sac", "10m", "pyramid", "custom"]), { distance: "10m" });
  assert.deepEqual(carried(["military", "vehicle", "pyramid", "80"]), { eut: "vehicle", startFreq: "80" });
  assert.deepEqual(carried(["commercial", "fac"]), { distance: "3m" });
  // Nothing is carried before a segment is chosen, which is also the only
  // point at which the questionnaire is ⓧ and the vocabulary a different one.
  assert.deepEqual(carried([]), {});
});

test("the E-Drive fields appear on the E-Drive answer and nowhere else", () => {
  // The conditional-field mechanism, checked where it is used. The load
  // machine is the number an EDTC quotation starts from and means nothing to
  // anybody testing a component, so it must not be on screen — or required,
  // or in the message — until the reader says E-Drive.
  const a = questionnaire("A");
  const ids = (values) => visibleFields(a, values).map((f) => f.id);

  assert.ok(!ids({ eut: "component" }).includes("driveSetup"));
  assert.ok(!ids({ eut: "component" }).includes("drivePower"));
  assert.ok(!ids({}).includes("driveSetup"), "the E-Drive fields show before anything is answered");

  const shown = ids({ eut: "edrive" });
  assert.ok(shown.includes("driveSetup") && shown.includes("drivePower"));

  // Hidden fields are optional by construction — a required one the reader
  // cannot see would disable the send button with nothing to explain it.
  for (const f of a.fields) {
    if (f.when) assert.ok(f.optional, `conditional field "${f.id}" is required`);
  }

  // And the tree's own E-Drive branch carries an answer straight into it.
  assert.deepEqual(carried(["automotive", "edrive"]), { eut: "edrive" });
  assert.ok(ids(carried(["automotive", "edrive", "mobile"])).includes("drivePower"));
});

test("the questionnaires ask for the numbers a chamber is quoted from", () => {
  // Field-level guarantees, so a later edit cannot quietly drop one.
  // The EUT's dimensions are the first figure anything is sized from, and are
  // required wherever the segment is known; ⓧ is where a reader who cannot
  // place their problem lands, so there it is optional.
  for (const id of ["A", "B", "C"]) {
    const size = questionnaire(id).fields.find((f) => f.id === "eutSize");
    assert.ok(size, `questionnaire ${id} does not ask for the EUT dimensions`);
    assert.ok(!size.optional, `questionnaire ${id} treats the EUT dimensions as optional`);
  }
  assert.ok(questionnaire("X").fields.find((f) => f.id === "eutSize")?.optional);

  // Ⓑ is where the 10 m branch's "Custom" quiet zone lands, so it has to be
  // able to receive one.
  assert.ok(questionnaire("B").fields.some((f) => f.id === "qz"), "questionnaire Ⓑ cannot receive a quiet zone");

  // MIL-STD-461 and DO-160 are decided at the top of the range as well as the
  // bottom — 18 GHz against 40 GHz changes the lining.
  assert.ok(questionnaire("C").fields.some((f) => f.id === "freq"), "questionnaire Ⓒ never asks the frequency range");
});

test("a custom quiet zone leaves the catalogue for questionnaire B", () => {
  // The matrix writes "3m / 4m / 5m / 6m / Custom" twice under the 10 m branch.
  // Four of those are catalogue configurations; Custom is not, and saying so
  // out loud is better than rounding it to the nearest standard size.
  for (const absorber of ["hybrid", "pyramid"]) {
    const at = land(["commercial", "sac", "10m", absorber, "custom"]);
    assert.equal(at.kind, "form", `10 m ${absorber} custom: should end in a questionnaire`);
    assert.equal(at.qid, "B");
  }
});

test("changing an answer drops everything chosen under it", () => {
  /*
   * The whole reason the flow is a path rather than a bag of answers.
   *
   * Walk down to a 10 m pyramid chamber with a ø6.0 m quiet zone, then go back
   * and answer 3 m instead: the lining and the quiet zone must not survive,
   * because the 3 m branch never asks for them.
   */
  const deep = ["commercial", "sac", "10m", "pyramid", "6m"];
  assert.equal(walk(deep).path.length, 5);

  const reconsidered = walk([...deep.slice(0, 2), "3m", "pyramid", "6m"]);
  assert.deepEqual(
    [...reconsidered.path],
    ["commercial", "sac", "3m"],
    "answers to questions the new branch never asks outlived it",
  );
  assert.equal(reconsidered.at.kind, "models");

  // And an id that belongs to no option on the question simply stops the walk
  // there, so a hand-edited or stale path cannot land somewhere unasked-for.
  const nonsense = walk(["commercial", "sac", "7m", "hybrid"]);
  assert.deepEqual([...nonsense.path], ["commercial", "sac"]);
  assert.equal(nonsense.at.kind, "ask");
  assert.equal(nonsense.steps.at(-1).chosen, undefined);
});

test("every question is a real branch point with at least two options", () => {
  // A question with one option is a question that cannot change the answer,
  // and the drawing has none. Question ids are unique so the progress strip
  // and the enquiry mail can key on them.
  const seen = new Set();
  const visit = (node) => {
    if (node.kind !== "ask") return;
    assert.ok(!seen.has(node.id), `two questions share the id "${node.id}"`);
    seen.add(node.id);
    assert.ok(node.options.length >= 2, `question "${node.id}" offers ${node.options.length} option(s)`);
    const ids = node.options.map((o) => o.id);
    assert.equal(new Set(ids).size, ids.length, `question "${node.id}" repeats an option id`);
    for (const option of node.options) {
      for (const lang of ["ko", "en"]) {
        assert.ok(node.title[lang]?.trim(), `question "${node.id}" has no ${lang} title`);
        assert.ok(option.label[lang]?.trim(), `option "${node.id}/${option.id}" has no ${lang} label`);
      }
      visit(option.next);
    }
  };
  visit(tree);
});

test("every segment answer points at its own questionnaire", () => {
  /*
   * The extension's questionnaires, held to the matrix: Ⓐ Automotive,
   * Ⓑ Commercial Industrial, Ⓒ Military, Ⓓ Special Chambers, and the
   * free-standing ⓧ for the reader who has not reached a segment yet.
   */
  assert.equal(questionnaireFor(segmentOf(["automotive", "components"])), "A");
  assert.equal(questionnaireFor(segmentOf(["commercial"])), "B");
  assert.equal(questionnaireFor(segmentOf(["military"])), "C");
  assert.equal(questionnaireFor(segmentOf(["special"])), "D");
  assert.equal(questionnaireFor(segmentOf([])), "X");
  assert.equal(questionnaireFor(segmentOf(["nonsense"])), "X");

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

  // Questionnaire D's task options are the tree's own list, so the Special
  // branch's answer carries straight in as a pre-selection.
  const d = questionnaires.find((q) => q.id === "D");
  const use = d.fields.find((f) => f.id === "use");
  assert.deepEqual(
    use.options.map((o) => o.id),
    [...specialUses],
    "questionnaire D's tasks drifted from the tree's",
  );
});

test("the catalogue join carries what a result card prints", () => {
  // The result card shows a designation, a description, a category photograph
  // and a link to the model's type page. All four come from the join, and an
  // empty one would render a card with a hole in it.
  for (const name of treeModels()) {
    const entry = catalogue.find((e) => e.name === name);
    assert.ok(entry, `${name} is not in the built catalogue`);
    assert.ok(entry.desc.trim(), `${name} has no description`);
    assert.ok(entry.href.startsWith("/"), `${name} has no model page link`);
    assert.ok(entry.shot.src.trim(), `${name} has no photograph`);
  }
});
