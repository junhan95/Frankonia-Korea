"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  effectiveStandards,
  emptyAnswers,
  prune,
  recommend,
  visibleQuestions,
  type Answers,
  type CatalogueEntry,
  type Question,
  type QuestionId,
  type Recommendation,
} from "./mychamber-advisor";
import { contactEmail, type Lang } from "./site-config";

/**
 * The MyChamber questionnaire, and the result it hands to the quotation
 * enquiry.
 *
 * The only client component on this site besides the navigation drawer and the
 * language switch, and it earns it: the questions branch on the answers, so
 * the flow cannot be pre-rendered as a set of pages. Everything it reasons
 * about arrives as props — see the note in mychamber-content.tsx.
 *
 * Nothing here is submitted anywhere. The site is a static export with no
 * back end, and a form that posted to a third party would put a customer's
 * project details somewhere neither they nor Frankonia chose. The enquiry is
 * assembled into a `mailto:` instead: the reader's own mail client opens with
 * the body already written, and they read it before they send it.
 */

type Form = { company: string; person: string; email: string; phone: string; note: string };

const emptyForm: Form = { company: "", person: "", email: "", phone: "", note: "" };

const copy = {
  ko: {
    stepOf: (i: number, n: number) => `질문 ${i} / ${n}`,
    multi: "복수 선택 가능",
    single: "하나만 선택",
    back: "이전",
    next: "다음",
    toResult: "결과 보기",
    backToResult: "결과로 돌아가기",
    restart: "처음부터 다시",
    needAnswer: "하나 이상 선택해 주세요.",

    resultKicker: "추천 결과",
    resultH: "요구사항에 맞는 챔버",
    resultP: (n: number, total: number) =>
      `선택하신 조건으로 ${total}종 가운데 ${n}종을 추렸습니다. 첫 번째가 적합도가 가장 높은 모델입니다.`,
    rankTop: "추천",
    rankAlt: (n: number) => `대안 ${n}`,
    why: "이 챔버인 이유",
    specSize: "외형 치수",
    specNote: "측정 조건",
    specRange: "주파수 범위",
    shotNote: "챔버 카테고리 대표 사진입니다. 모델별 사진이 아닙니다.",
    seeType: "같은 형식의 모델 전체 보기",
    pick: "이 챔버로 문의",
    picked: "문의 대상으로 선택됨",
    caveat: "확인해 주세요",

    noneH: "표준 모델로는 맞는 것이 없습니다",
    noneP:
      "선택하신 조건은 맞춤 설계 구간입니다. Frankonia는 표준 치수를 벗어나는 챔버를 실제로 제작해 왔습니다 — 조건을 그대로 보내 주시면 설계팀이 검토해 회신드립니다.",
    noneCta: "맞춤 설계 문의",
    noneSubject: "[MyChamber] 맞춤 설계 문의",

    summaryKicker: "선택 내용",
    summaryH: "입력하신 내용",
    summaryP: "각 항목은 언제든 수정하실 수 있습니다. 수정하면 추천 결과가 다시 계산됩니다.",
    edit: "수정",
    none: "—",

    quoteKicker: "견적 문의",
    quoteH: "선택 내용을 그대로 담아 보내기",
    quoteP:
      "아래를 채우시면 추천 챔버와 선택하신 조건이 메일 본문에 자동으로 들어갑니다. 메일 프로그램이 열리고, 보내기 전에 내용을 확인하실 수 있습니다. 이 페이지는 어떤 정보도 저장하거나 전송하지 않습니다.",
    fCompany: "회사명",
    fPerson: "담당자",
    fEmail: "이메일",
    fPhone: "전화 (선택)",
    fNote: "추가 요청사항 (선택)",
    fNotePlaceholder: "설치 예정 시기, 건물 조건, 예산 범위 등 알려 주실 내용이 있으면 적어 주세요.",
    required: "필수",
    send: "메일 작성하기",
    fillFirst: "회사명 · 담당자 · 이메일을 입력하시면 메일 작성이 열립니다.",
    copyBody: "본문 복사",
    copied: "복사했습니다",
    to: (address: string) => `수신 ${address}`,

    mailSubject: (model: string, company: string) => `[MyChamber] ${model} 견적 문의 — ${company}`,
    mailTitle: "Frankonia MyChamber 추천 결과",
    mailPick: "추천 챔버",
    mailAnswers: "선택 내용",
    mailAlts: "함께 검토한 대안",
    mailFrom: "문의자",
    // The form marks these two "(선택)" because the button does not wait for
    // them; in the message they are just a phone number and a note.
    mailPhone: "전화",
    mailNote: "추가 요청사항",
    mailFoot: "이 메일은 Frankonia MyChamber에서 선택 내용을 바탕으로 자동 작성되었습니다.",
  },
  en: {
    stepOf: (i: number, n: number) => `Question ${i} of ${n}`,
    multi: "Select all that apply",
    single: "Select one",
    back: "Back",
    next: "Next",
    toResult: "See the result",
    backToResult: "Back to the result",
    restart: "Start again",
    needAnswer: "Choose at least one option.",

    resultKicker: "Result",
    resultH: "The chambers that match",
    resultP: (n: number, total: number) =>
      `${n} of the ${total} chambers match what you described. The first is the closest fit.`,
    rankTop: "Recommended",
    rankAlt: (n: number) => `Alternative ${n}`,
    why: "Why this chamber",
    specSize: "External dimension",
    specNote: "Test conditions",
    specRange: "Frequency range",
    shotNote: "A photograph of the chamber category, not of this model.",
    seeType: "See every model of this form",
    pick: "Enquire about this one",
    picked: "Selected for the enquiry",
    caveat: "Worth knowing",

    noneH: "No standard model matches",
    noneP:
      "What you described is in the custom range. Frankonia builds chambers beyond the standard sizes as a matter of course — send the requirement as it stands and the engineering team will come back on it.",
    noneCta: "Ask about a custom design",
    noneSubject: "[MyChamber] Custom design enquiry",

    summaryKicker: "Your answers",
    summaryH: "What you told us",
    summaryP: "Change any of it at any time — the recommendation is recalculated from scratch.",
    edit: "Change",
    none: "—",

    quoteKicker: "Enquiry",
    quoteH: "Send it with your answers attached",
    quoteP:
      "Fill this in and the recommended chamber and every answer you gave go into the body of the message. Your mail client opens with it written; you read it before it is sent. This page stores and transmits nothing.",
    fCompany: "Company",
    fPerson: "Contact name",
    fEmail: "Email",
    fPhone: "Phone (optional)",
    fNote: "Anything else (optional)",
    fNotePlaceholder: "Timing, building constraints, budget range — whatever helps us answer properly.",
    required: "required",
    send: "Write the email",
    fillFirst: "Company, contact name and email open the message.",
    copyBody: "Copy the text",
    copied: "Copied",
    to: (address: string) => `To ${address}`,

    mailSubject: (model: string, company: string) => `[MyChamber] ${model} — quotation request from ${company}`,
    mailTitle: "Frankonia MyChamber result",
    mailPick: "Recommended chamber",
    mailAnswers: "Answers given",
    mailAlts: "Alternatives shown",
    mailFrom: "Enquirer",
    mailPhone: "Phone",
    mailNote: "Notes",
    mailFoot: "Written automatically by Frankonia MyChamber from the answers above.",
  },
} as const;

export default function MyChamberWizard({
  lang,
  catalogue,
}: {
  lang: Lang;
  catalogue: readonly CatalogueEntry[];
}) {
  const t = copy[lang];

  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  /** Set when a step was opened from the result summary, so finishing it goes
   *  back where the reader came from rather than walking the rest of the flow. */
  const [editing, setEditing] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [copied, setCopied] = useState(false);

  const steps = useMemo(() => visibleQuestions(answers), [answers]);
  // A question can disappear under the cursor — unticking radiated emission
  // removes the distance step — so the index is clamped rather than trusted.
  const index = Math.min(step, steps.length - 1);
  const question = steps[index];

  const results = useMemo(
    () => (done ? recommend(catalogue, answers, lang) : []),
    [done, catalogue, answers, lang],
  );
  const pick = results.find((r) => r.entry.name === chosen) ?? results[0];

  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    // Moving between steps replaces the whole panel, so a keyboard or screen
    // reader user would otherwise be left at the top of the document with no
    // announcement that anything changed. Not on first render — that would
    // scroll the page away from the heading the reader arrived at.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [index, done]);

  const chose = (id: QuestionId, value: string) =>
    setAnswers((prev) => prune(apply(prev, id, value)));

  const answered = question ? selectedIds(answers, question).length > 0 : true;
  const canAdvance = answered || Boolean(question?.optional);
  const last = index === steps.length - 1;

  if (done) {
    return (
      <>
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.resultKicker}</span>
              <h2 ref={headingRef} tabIndex={-1}>{t.resultH}</h2>
              {results.length > 0 && <p>{t.resultP(results.length, catalogue.length)}</p>}
            </div>

            {results.length === 0 ? (
              <div className="empty">
                <h4>{t.noneH}</h4>
                <p>{t.noneP}</p>
                <a
                  className="btn btn-red"
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent(t.noneSubject)}&body=${encodeURIComponent(
                    mailBody(lang, answers, null, [], form),
                  )}`}
                >
                  {t.noneCta}
                </a>
              </div>
            ) : (
              <div className="mc-results">
                {results.map((r, i) => (
                  <ResultCard
                    key={r.entry.name}
                    lang={lang}
                    rank={i}
                    result={r}
                    selected={pick?.entry.name === r.entry.name}
                    onSelect={() => setChosen(r.entry.name)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <div className="sec-head">
              <span className="kicker">{t.summaryKicker}</span>
              <h2>{t.summaryH}</h2>
              <p>{t.summaryP}</p>
            </div>
            <div className="hairline-list">
              {steps.map((q, i) => (
                <div className="hl-row" key={q.id}>
                  <span className="hl-idx">{String(i + 1).padStart(2, "0")}</span>
                  <b>{q.kicker[lang]}</b>
                  <span className="hl-desc">
                    {summarise(answers, q, lang) || t.none}
                    <button
                      type="button"
                      className="hl-action"
                      onClick={() => {
                        setDone(false);
                        setEditing(true);
                        setStep(i);
                      }}
                    >
                      {t.edit}
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <div className="btns mc-actions">
              <button
                type="button"
                className="go"
                onClick={() => {
                  setAnswers(emptyAnswers);
                  setStep(0);
                  setDone(false);
                  setEditing(false);
                  setChosen(null);
                }}
              >
                {t.restart}<span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        <QuoteForm
          lang={lang}
          answers={answers}
          pick={pick ?? null}
          alternatives={results.filter((r) => r.entry.name !== pick?.entry.name)}
          form={form}
          setForm={setForm}
          copied={copied}
          setCopied={setCopied}
        />
      </>
    );
  }

  if (!question) return null;

  return (
    <section>
      <div className="wrap">
        <div className="mc-progress">
          <span className="mc-count">{t.stepOf(index + 1, steps.length)}</span>
          <span className="mc-track" aria-hidden="true">
            <span className="mc-fill" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
          </span>
        </div>

        <div className="sec-head mc-head">
          <span className="kicker">{question.kicker[lang]}</span>
          <h2 id={`mc-q-${question.id}`} ref={headingRef} tabIndex={-1}>
            {question.title[lang]}
          </h2>
          {question.hint && <p>{question.hint[lang]}</p>}
        </div>

        <div className="mc-opts" role="group" aria-labelledby={`mc-q-${question.id}`}>
          <p className="mc-mode">{question.multi ? t.multi : t.single}</p>
          <div className="mc-opt-grid">
            {question.options.map((option) => {
              const on = selectedIds(answers, question).includes(option.id);
              return (
                <label className={on ? "mc-opt on" : "mc-opt"} key={option.id}>
                  <input
                    type={question.multi ? "checkbox" : "radio"}
                    name={`mc-${question.id}`}
                    checked={on}
                    onChange={() => chose(question.id, option.id)}
                  />
                  <span className="mc-opt-body">
                    <b>{option.label[lang]}</b>
                    {option.note && <span>{option.note[lang]}</span>}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="btns mc-actions">
          {index > 0 && (
            <button type="button" className="btn btn-outline" onClick={() => setStep(index - 1)}>
              {t.back}
            </button>
          )}
          <button
            type="button"
            className="btn btn-red"
            disabled={!canAdvance}
            onClick={() => {
              if (editing || last) {
                setEditing(false);
                setDone(true);
              } else {
                setStep(index + 1);
              }
            }}
          >
            {editing ? t.backToResult : last ? t.toResult : t.next}
          </button>
          {!canAdvance && <span className="mc-need">{t.needAnswer}</span>}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Result card
 * ------------------------------------------------------------------ */

function ResultCard({
  lang,
  rank,
  result,
  selected,
  onSelect,
}: {
  lang: Lang;
  rank: number;
  result: Recommendation;
  selected: boolean;
  onSelect: () => void;
}) {
  const t = copy[lang];
  const { entry } = result;

  return (
    <article className={rank === 0 ? "mc-card mc-card--top" : "mc-card"}>
      <figure className="mc-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.shot.src} alt="" width={entry.shot.w} height={entry.shot.h} loading="lazy" decoding="async" />
        <figcaption>{t.shotNote}</figcaption>
      </figure>

      <div className="mc-card-body">
        <span className="mc-rank">{rank === 0 ? t.rankTop : t.rankAlt(rank)}</span>
        {/* Model designations are never translated — they are what a reader
            matches against the catalogue, the drawings and the quotation. */}
        <h3>{entry.name}</h3>
        <p className="mc-desc">{entry.desc}</p>

        {entry.spec && (
          <dl className="mc-spec">
            <div>
              <dt>{t.specSize}</dt>
              <dd>{entry.spec.size}</dd>
            </div>
            {entry.spec.note && (
              <div>
                <dt>{t.specNote}</dt>
                <dd>{entry.spec.note}</dd>
              </div>
            )}
            {entry.spec.range && (
              <div>
                <dt>{t.specRange}</dt>
                <dd>{entry.spec.range}</dd>
              </div>
            )}
          </dl>
        )}

        {result.reasons.length > 0 && (
          <div className="mc-why">
            <h4>{t.why}</h4>
            <ul className="check-list">
              {result.reasons.map((reason) => (
                <li key={reason}>
                  <svg className="chk" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" /></svg>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.caveat && (
          <p className="mc-caveat">
            <b>{t.caveat}</b>
            {result.caveat}
          </p>
        )}

        <div className="mc-card-foot">
          <label className={selected ? "mc-choose on" : "mc-choose"}>
            <input type="radio" name="mc-pick" checked={selected} onChange={onSelect} />
            <span>{selected ? t.picked : t.pick}</span>
          </label>
          <a className="go" href={entry.href}>
            {t.seeType}<span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Quotation enquiry
 * ------------------------------------------------------------------ */

function QuoteForm({
  lang,
  answers,
  pick,
  alternatives,
  form,
  setForm,
  copied,
  setCopied,
}: {
  lang: Lang;
  answers: Answers;
  pick: Recommendation | null;
  alternatives: readonly Recommendation[];
  form: Form;
  setForm: (f: Form) => void;
  copied: boolean;
  setCopied: (v: boolean) => void;
}) {
  const t = copy[lang];
  const ready = Boolean(form.company.trim() && form.person.trim() && form.email.trim());
  const body = mailBody(lang, answers, pick, alternatives, form);
  const subject = t.mailSubject(pick?.entry.name ?? "—", form.company.trim() || "—");
  const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const set = (key: keyof Form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [key]: event.target.value });
    setCopied(false);
  };

  return (
    <section>
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">{t.quoteKicker}</span>
          <h2>{t.quoteH}</h2>
          <p>{t.quoteP}</p>
        </div>

        {/* No action and no method: nothing is posted anywhere. The button
            below is a mailto link, and the fields exist to write it. */}
        <form className="mc-form" onSubmit={(event) => event.preventDefault()}>
          <div className="mc-fields">
            <Field id="mc-company" label={t.fCompany} mark={t.required} value={form.company} onChange={set("company")} autoComplete="organization" />
            <Field id="mc-person" label={t.fPerson} mark={t.required} value={form.person} onChange={set("person")} autoComplete="name" />
            <Field id="mc-email" label={t.fEmail} mark={t.required} value={form.email} onChange={set("email")} type="email" autoComplete="email" />
            <Field id="mc-phone" label={t.fPhone} value={form.phone} onChange={set("phone")} type="tel" autoComplete="tel" />
          </div>

          <div className="mc-field mc-field--wide">
            <label htmlFor="mc-note">{t.fNote}</label>
            <textarea id="mc-note" rows={4} value={form.note} onChange={set("note")} placeholder={t.fNotePlaceholder} />
          </div>

          <div className="btns mc-actions">
            {ready ? (
              <a className="btn btn-red" href={href}>{t.send}</a>
            ) : (
              <button type="button" className="btn btn-red" disabled>{t.send}</button>
            )}
            <button
              type="button"
              className="btn btn-outline"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(body);
                  setCopied(true);
                } catch {
                  // No clipboard permission — the reader can still select the
                  // text, and pretending it worked would be worse.
                  setCopied(false);
                }
              }}
            >
              {copied ? t.copied : t.copyBody}
            </button>
          </div>
          <p className="mc-note">{ready ? t.to(contactEmail) : t.fillFirst}</p>
        </form>
      </div>
    </section>
  );
}

/** `mark`, not `required`: the HTML attribute of that name is a boolean and
 *  belongs to the input, and this is the word printed beside the label. */
function Field({
  id,
  label,
  mark,
  ...input
}: {
  id: string;
  label: string;
  mark?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mc-field">
      <label htmlFor={id}>
        {label}
        {mark && <em>{mark}</em>}
      </label>
      <input id={id} {...input} />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Answers → text
 * ------------------------------------------------------------------ */

const selectedIds = (a: Answers, q: Question): readonly string[] => {
  switch (q.id) {
    case "industries": return a.industries;
    case "tests": return a.tests;
    case "standards": return effectiveStandards(a);
    case "dut": return a.dut ? [a.dut] : [];
    case "distance": return a.distance ? [a.distance] : [];
    case "family": return a.family ? [a.family] : [];
    case "drive": return a.drive ? [a.drive] : [];
  }
};

const toggle = (list: readonly string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

/** Option ids are the domain values themselves, which is what makes this a
 *  table rather than a switch full of parsing. */
function apply(a: Answers, id: QuestionId, value: string): Answers {
  switch (id) {
    case "industries": return { ...a, industries: toggle(a.industries, value) as Answers["industries"] };
    case "tests": return { ...a, tests: toggle(a.tests, value) as Answers["tests"] };
    // The first tick turns the suggestion into an explicit list — see the note
    // on `Answers.standards`.
    case "standards": return { ...a, standards: toggle(effectiveStandards(a), value) as Answers["standards"] };
    case "dut": return { ...a, dut: value as Answers["dut"] };
    case "distance": return { ...a, distance: value as Answers["distance"] };
    case "family": return { ...a, family: value as Answers["family"] };
    case "drive": return { ...a, drive: value as Answers["drive"] };
  }
}

/** An answer as the reader wrote it, in their language. */
const summarise = (a: Answers, q: Question, lang: Lang) =>
  selectedIds(a, q)
    .map((id) => q.options.find((o) => o.id === id)?.label[lang] ?? id)
    .join(" · ");

/**
 * The enquiry, as plain text.
 *
 * Written for a person to read in an inbox, not parsed by anything: headings
 * in brackets, one fact per line, and the answers in the order they were
 * asked. Kept compact because a `mailto:` body has to survive being a URL —
 * every value here is a label from this site or a line the reader typed.
 */
function mailBody(
  lang: Lang,
  answers: Answers,
  pick: Recommendation | null,
  alternatives: readonly Recommendation[],
  form: Form,
): string {
  const t = copy[lang];
  const lines: string[] = [t.mailTitle, ""];

  if (pick) {
    lines.push(`[${t.mailPick}]`, `${pick.entry.name} — ${pick.entry.desc}`);
    if (pick.entry.spec) {
      lines.push(`${t.specSize}: ${pick.entry.spec.size}`);
      if (pick.entry.spec.note) lines.push(`${t.specNote}: ${pick.entry.spec.note}`);
      if (pick.entry.spec.range) lines.push(`${t.specRange}: ${pick.entry.spec.range}`);
    }
    lines.push("");
  }

  lines.push(`[${t.mailAnswers}]`);
  for (const q of visibleQuestions(answers)) {
    lines.push(`${q.kicker[lang]}: ${summarise(answers, q, lang) || t.none}`);
  }
  lines.push("");

  if (alternatives.length > 0) {
    lines.push(`[${t.mailAlts}]`, alternatives.map((r) => r.entry.name).join(", "), "");
  }

  lines.push(
    `[${t.mailFrom}]`,
    `${t.fCompany}: ${form.company || t.none}`,
    `${t.fPerson}: ${form.person || t.none}`,
    `${t.fEmail}: ${form.email || t.none}`,
    `${t.mailPhone}: ${form.phone || t.none}`,
  );
  if (form.note.trim()) lines.push(`${t.mailNote}: ${form.note.trim()}`);

  lines.push("", "--", t.mailFoot);
  return lines.join("\r\n");
}
