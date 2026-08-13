"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  emptyAnswers,
  isSpecialTrack,
  prune,
  recommend,
  visibleOptions,
  visibleQuestions,
  type Answers,
  type CatalogueEntry,
  type Question,
  type QuestionId,
  type Recommendation,
} from "./mychamber-advisor";
import QuestionnairePanel from "./mychamber-questionnaire";
import { questionnaireFor } from "./mychamber-questionnaires";
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
    stepAll: (n: number) => `질문 ${n}개 모두 완료`,
    progressLabel: "진행 상황과 선택 내용",
    jumpHint: "각 항목을 누르시면 그 질문으로 돌아가 수정하실 수 있습니다. 수정하면 추천 결과가 다시 계산됩니다.",
    jumpTo: (kicker: string) => `${kicker} 질문으로 이동`,
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
    variant: "선택하신 조건에 맞는 구성",
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
      "선택하신 조건은 맞춤 설계 구간입니다. Frankonia는 표준 치수를 벗어나는 챔버를 실제로 제작해 왔습니다 — 맞춤 설문으로 조건을 보내 주시면 설계팀이 검토해 회신드립니다.",
    noneCta: "맞춤 설문으로 문의",

    customLink: "표준 선택지에 없는 요구사항이라면 — 맞춤 설문으로 문의",
    customFromResult: "표준 모델로 부족하다면 — 맞춤 설문으로 문의",
    customBackFlow: "질문으로 돌아가기",
    customBackResult: "결과로 돌아가기",
    toQuestionnaire: "요구사항 작성하기",

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
    stepAll: (n: number) => `All ${n} questions answered`,
    progressLabel: "Progress and answers so far",
    jumpHint: "Select any of them to go back to that question — the recommendation is recalculated from scratch.",
    jumpTo: (kicker: string) => `Go to the question about ${kicker}`,
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
    variant: "The configuration your answers point at",
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
      "What you described is in the custom range. Frankonia builds chambers beyond the standard sizes as a matter of course — send the requirement through the questionnaire and the engineering team will come back on it.",
    noneCta: "Open the questionnaire",

    customLink: "A requirement the options do not carry? Open the questionnaire",
    customFromResult: "If no standard model quite fits — open the questionnaire",
    customBackFlow: "Back to the questions",
    customBackResult: "Back to the result",
    toQuestionnaire: "Describe the requirement",

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
  /** The furthest step the reader has opened. The progress strip lets them go
   *  back to anything behind this line, and no further: a question they have
   *  not reached yet is not something to skip ahead into, because the ones
   *  before it decide whether it is asked at all. */
  const [reached, setReached] = useState(0);
  const [done, setDone] = useState(false);
  /** Set when a step was opened from the result summary, so finishing it goes
   *  back where the reader came from rather than walking the rest of the flow. */
  const [editing, setEditing] = useState(false);
  /** The questionnaire view — the matrix extension's Ⓐ/Ⓑ/Ⓒ/ⓧ escape hatch,
   *  opened from any step or from the result. Ⓓ is not opened this way: the
   *  Special track ends in it. */
  const [custom, setCustom] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [copied, setCopied] = useState(false);

  const steps = useMemo(() => visibleQuestions(answers), [answers]);
  // A question can disappear under the cursor — unticking radiated emission
  // removes the distance step — so the index is clamped rather than trusted.
  const index = Math.min(step, steps.length - 1);
  const question = steps[index];

  const special = isSpecialTrack(answers);
  const results = useMemo(
    () => (done && !special ? recommend(catalogue, answers, lang) : []),
    [done, special, catalogue, answers, lang],
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

  const goto = (i: number) => {
    setStep(i);
    setReached((far) => Math.max(far, i));
  };

  /** Opening a step from the progress strip while the result is on screen is
   *  an edit, not a walk back through the flow — finishing it returns to the
   *  result rather than stepping through everything after it. */
  const jump = (i: number) => {
    if (done) {
      setDone(false);
      setEditing(true);
    }
    goto(i);
  };

  const restart = () => {
    setAnswers(emptyAnswers);
    setStep(0);
    setReached(0);
    setDone(false);
    setEditing(false);
    setChosen(null);
  };

  const answered = question ? selectedIds(answers, question).length > 0 : true;
  const canAdvance = answered || Boolean(question?.optional);
  const last = index === steps.length - 1;

  // The escape hatch — questionnaire Ⓐ, Ⓑ, Ⓒ or ⓧ, from wherever the reader
  // opened it. Keyed on the questionnaire so switching segments and reopening
  // starts the right form fresh rather than carrying another form's state.
  if (custom) {
    const qid = questionnaireFor(answers.segments);
    return (
      <>
        <section>
          <div className="wrap">
            <button type="button" className="go" onClick={() => setCustom(false)}>
              {done ? t.customBackResult : t.customBackFlow}<span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
        <QuestionnairePanel key={qid} lang={lang} qid={qid} />
      </>
    );
  }

  // The Special Chambers track. There is no model shortlist to show — the
  // matrix gives the segment four measurement tasks and questionnaire Ⓓ, so
  // the flow ends in the questionnaire with the chosen task carried in.
  if (done && special) {
    return (
      <>
        <section>
          <div className="wrap">
            <div className="btns">
              <button type="button" className="go" onClick={() => setDone(false)}>
                {t.back}<span aria-hidden="true">→</span>
              </button>
              <button type="button" className="go" onClick={restart}>
                {t.restart}<span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
        <QuestionnairePanel
          key={`D-${answers.specialUse ?? ""}`}
          lang={lang}
          qid="D"
          prefill={answers.specialUse ? { use: answers.specialUse } : undefined}
        />
      </>
    );
  }

  if (done) {
    return (
      <>
        <section>
          <div className="wrap">
            {/* The answers, where they have been all along: the progress strip.
                A reader who wants to change one goes back to the question
                itself rather than to a second copy of it further down. */}
            <StepStrip
              lang={lang}
              steps={steps}
              answers={answers}
              index={steps.length - 1}
              reached={steps.length - 1}
              done
              onJump={jump}
            />

            <div className="sec-head">
              <span className="kicker">{t.resultKicker}</span>
              <h2 ref={headingRef} tabIndex={-1}>{t.resultH}</h2>
              {results.length > 0 && <p>{t.resultP(results.length, catalogue.length)}</p>}
            </div>

            {results.length === 0 ? (
              <div className="empty">
                <h4>{t.noneH}</h4>
                <p>{t.noneP}</p>
                <button type="button" className="btn btn-red" onClick={() => setCustom(true)}>
                  {t.noneCta}
                </button>
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

            <div className="btns mc-actions">
              {/* The matrix extension's custom node under this segment — the
                  reader whose requirement the shortlist does not carry. The
                  empty state carries the same link in its own box. */}
              {results.length > 0 && (
                <button type="button" className="go" onClick={() => setCustom(true)}>
                  {t.customFromResult}<span aria-hidden="true">→</span>
                </button>
              )}
              <button type="button" className="go" onClick={restart}>
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
        <StepStrip
          lang={lang}
          steps={steps}
          answers={answers}
          index={index}
          reached={reached}
          done={false}
          onJump={jump}
        />

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
            {visibleOptions(question, answers).map((option) => {
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
            <button type="button" className="btn btn-outline" onClick={() => goto(index - 1)}>
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
                goto(index + 1);
              }
            }}
          >
            {editing ? t.backToResult : last ? (special ? t.toQuestionnaire : t.toResult) : t.next}
          </button>
          {!canAdvance && <span className="mc-need">{t.needAnswer}</span>}
        </div>

        {/* The matrix extension's escape hatch, on every standard step: the
            reader whose requirement the options do not carry goes to the
            segment's questionnaire instead of guessing. The Special track has
            no link — its whole flow already ends in questionnaire Ⓓ. */}
        {!special && (
          <p className="mc-note">
            <button type="button" className="go" onClick={() => setCustom(true)}>
              {t.customLink}<span aria-hidden="true">→</span>
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Progress strip
 * ------------------------------------------------------------------ */

/**
 * Where the reader is, what they have chosen, and the way back to any of it.
 *
 * One element does all three because they are one thing: a question already
 * answered is a segment of the bar that is filled, and the answer is written
 * under it. There is no separate summary further down the page — a second
 * copy of the answers would only be a second place to keep in step.
 *
 * The total moves as the answers branch, so the strip is drawn from
 * `visibleQuestions` on every render rather than from a fixed list of steps.
 */
function StepStrip({
  lang,
  steps,
  answers,
  index,
  reached,
  done,
  onJump,
}: {
  lang: Lang;
  steps: readonly Question[];
  answers: Answers;
  index: number;
  reached: number;
  done: boolean;
  onJump: (i: number) => void;
}) {
  const t = copy[lang];
  const far = Math.max(index, reached);

  return (
    <nav className="mc-progress" aria-label={t.progressLabel}>
      <span className="mc-count">{done ? t.stepAll(steps.length) : t.stepOf(index + 1, steps.length)}</span>

      <ol className="mc-steps">
        {steps.map((q, i) => {
          const value = summarise(answers, q, lang);
          const now = !done && i === index;
          // Answered counts as behind the reader even when it is ahead of the
          // cursor: going back to question 3 from the result must not make
          // questions 4 to 6 look like they were never answered.
          const past = done || i < index || value.length > 0;
          const open = done || i <= far;
          const kicker = q.kicker[lang];
          return (
            <li
              className={`mc-step ${now ? "is-now" : past ? "is-done" : "is-todo"}${open ? "" : " is-locked"}`}
              key={q.id}
            >
              <button
                type="button"
                className="mc-step-btn"
                disabled={!open}
                aria-current={now ? "step" : undefined}
                aria-label={`${kicker} — ${value || t.none}. ${t.jumpTo(kicker)}`}
                title={value || undefined}
                onClick={() => onJump(i)}
              >
                {/* The node. A tick once the question is behind the reader, a
                    filled ring where they are, the number until they get
                    there — the connector to either side is drawn by the row. */}
                <span className="mc-step-dot" aria-hidden="true">
                  {past ? (
                    <svg className="mc-step-chk" viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 5" /></svg>
                  ) : now ? null : (
                    <b>{i + 1}</b>
                  )}
                </span>
                {/* The kicker sits in a span of its own because the pill
                    carries the caret up to the node as a corner of itself,
                    and the ellipsis that trims a long kicker would clip it. */}
                <span className="mc-step-pill"><span>{kicker}</span></span>
                <span className="mc-step-val">{value || t.none}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="mc-step-hint">{t.jumpHint}</p>
    </nav>
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

        {/* The exact configuration, where the absorber and quiet-zone answers
            pinned one down. It comes before the model's own specification
            because it is the more specific answer of the two — and the two are
            not in conflict: the row below describes the model, this describes
            the build of it a quotation would be written for. */}
        {result.variant && (
          <div className="mc-variant">
            <span className="mc-variant-label">{t.variant}</span>
            <b>{result.variant.name}</b>
            <span>{result.variant.size}</span>
            <span>{result.variant.note}</span>
          </div>
        )}

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
    case "segments": return a.segments;
    case "specialUse": return a.specialUse ? [a.specialUse] : [];
    case "tests": return a.tests;
    case "dut": return a.dut ? [a.dut] : [];
    case "level": return a.level ? [a.level] : [];
    case "family": return a.family ? [a.family] : [];
    case "luf": return a.luf ? [a.luf] : [];
    case "stirrer": return a.stirrer ? [a.stirrer] : [];
    case "ground": return a.ground ? [a.ground] : [];
    case "shell": return a.shell ? [a.shell] : [];
    case "absorber": return a.absorber ? [a.absorber] : [];
    case "qz": return a.qz ? [a.qz] : [];
    case "drive": return a.drive ? [a.drive] : [];
  }
};

const toggle = (list: readonly string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

/** Option ids are the domain values themselves, which is what makes this a
 *  table rather than a switch full of parsing. */
function apply(a: Answers, id: QuestionId, value: string): Answers {
  switch (id) {
    // The Special Chambers segment is exclusive — the matrix draws it as a
    // track of its own, not a fourth thing to tick alongside Automotive. So
    // choosing it clears the model segments, and choosing one of them clears it.
    case "segments": {
      const next = toggle(a.segments, value) as Answers["segments"];
      if (value === "special") {
        return { ...a, segments: next.includes("special") ? ["special"] : next };
      }
      return { ...a, segments: next.filter((s) => s !== "special") as Answers["segments"] };
    }
    case "specialUse": return { ...a, specialUse: value as Answers["specialUse"] };
    case "tests": return { ...a, tests: toggle(a.tests, value) as Answers["tests"] };
    case "dut": return { ...a, dut: value as Answers["dut"] };
    case "level": return { ...a, level: value as Answers["level"] };
    case "family": return { ...a, family: value as Answers["family"] };
    case "luf": return { ...a, luf: value as Answers["luf"] };
    case "stirrer": return { ...a, stirrer: value as Answers["stirrer"] };
    case "ground": return { ...a, ground: value as Answers["ground"] };
    case "shell": return { ...a, shell: value as Answers["shell"] };
    case "absorber": return { ...a, absorber: value as Answers["absorber"] };
    case "qz": return { ...a, qz: value as Answers["qz"] };
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
    if (pick.variant) {
      lines.push(`${t.variant}: ${pick.variant.name} — ${pick.variant.size} · ${pick.variant.note}`);
    }
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
