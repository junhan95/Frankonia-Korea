"use client";

import { useState } from "react";
import {
  questionnaire,
  visibleFields,
  type QField,
  type QuestionnaireId,
  type QValues,
} from "./mychamber-questionnaires";
import { contactEmail, type Lang } from "./site-config";

/**
 * One questionnaire of the Chamber Matrix extension, as a form.
 *
 * The same contract as the wizard's enquiry: nothing is posted anywhere. The
 * answers are assembled into a `mailto:` and the reader's own mail client
 * opens with the body written — they read it before they send it.
 *
 * The definitions live in mychamber-questionnaires.ts; this component renders
 * whichever one it is handed. `prefill` carries an answer in from the wizard —
 * the Special track's use question — as a pre-selection, still editable here.
 * The caller keys the component on the questionnaire and the prefill, so a
 * changed prefill arrives as a fresh mount rather than a stale state.
 */

type Values = QValues;
type Contact = { company: string; person: string; email: string; phone: string };

const emptyContact: Contact = { company: "", person: "", email: "", phone: "" };

const copy = {
  ko: {
    multi: "복수 선택 가능",
    single: "하나만 선택",
    required: "필수",
    contactKicker: "연락처",
    contactH: "회신받으실 연락처",
    fCompany: "회사명",
    fPerson: "담당자",
    fEmail: "이메일",
    fPhone: "전화 (선택)",
    send: "메일 작성하기",
    fillFirst: "필수 항목과 회사명 · 담당자 · 이메일을 입력하시면 메일 작성이 열립니다.",
    copyBody: "본문 복사",
    copied: "복사했습니다",
    to: (address: string) => `수신 ${address}`,
    mailSubject: (id: QuestionnaireId, company: string) => `[My Chamber] 맞춤 설문 ${id} — ${company}`,
    mailAnswers: "설문 내용",
    mailFrom: "문의자",
    mailPhone: "전화",
    none: "—",
    mailFoot: "이 메일은 Frankonia My Chamber 맞춤 설문에서 자동 작성되었습니다.",
  },
  en: {
    multi: "Select all that apply",
    single: "Select one",
    required: "required",
    contactKicker: "Contact",
    contactH: "Where the reply should go",
    fCompany: "Company",
    fPerson: "Contact name",
    fEmail: "Email",
    fPhone: "Phone (optional)",
    send: "Write the email",
    fillFirst: "The required answers plus company, contact name and email open the message.",
    copyBody: "Copy the text",
    copied: "Copied",
    to: (address: string) => `To ${address}`,
    mailSubject: (id: QuestionnaireId, company: string) => `[My Chamber] Questionnaire ${id} — ${company}`,
    mailAnswers: "Questionnaire answers",
    mailFrom: "Enquirer",
    mailPhone: "Phone",
    none: "—",
    mailFoot: "Written automatically by the Frankonia My Chamber questionnaire.",
  },
} as const;

const selected = (values: Values, field: QField): readonly string[] => {
  const v = values[field.id];
  if (v === undefined) return [];
  return typeof v === "string" ? (v.trim() ? [v] : []) : v;
};

/** A field's answer as text for the message — option labels for choices, the
 *  reader's own words for the rest. */
const summarise = (values: Values, field: QField, lang: Lang): string => {
  const ids = selected(values, field);
  if (field.kind !== "choice") return ids.join(" ");
  return ids
    .map((id) => field.options.find((o) => o.id === id)?.label[lang] ?? id)
    .join(" · ");
};

export default function QuestionnairePanel({
  lang,
  qid,
  prefill,
}: {
  lang: Lang;
  qid: QuestionnaireId;
  prefill?: Readonly<Record<string, string>>;
}) {
  const t = copy[lang];
  const q = questionnaire(qid);

  const [values, setValues] = useState<Values>(prefill ?? {});
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [copied, setCopied] = useState(false);

  const set = (id: string, value: string | readonly string[]) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setCopied(false);
  };

  // Recomputed on every answer: a field can appear and disappear as the reader
  // changes an earlier one, and the required check has to follow it.
  const fields = visibleFields(q, values);

  const answered = (field: QField) => selected(values, field).length > 0;
  const ready =
    fields.every((f) => f.optional || answered(f)) &&
    Boolean(contact.company.trim() && contact.person.trim() && contact.email.trim());

  const body = mailBody(lang, qid, values, contact);
  const subject = t.mailSubject(qid, contact.company.trim() || t.none);
  const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const setC = (key: keyof Contact) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [key]: event.target.value });
    setCopied(false);
  };

  return (
    <>
      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{q.name[lang]}</span>
            <h2>{q.title[lang]}</h2>
            <p>{q.intro[lang]}</p>
          </div>

          {/* No action and no method, like the wizard's enquiry: the fields
              exist to write the mailto below. */}
          <form className="mc-form" onSubmit={(event) => event.preventDefault()}>
            {fields.map((field) =>
              field.kind === "choice" ? (
                <div className="mc-opts mc-q-field" key={field.id} role="group" aria-labelledby={`mcq-${field.id}`}>
                  {/* Like the wizard's contact fields, only the required mark
                      is printed — an unmarked field is optional. */}
                  <p className="mc-q-label" id={`mcq-${field.id}`}>
                    {field.label[lang]}
                    {!field.optional && <em>{t.required}</em>}
                  </p>
                  <p className="mc-mode">{field.multi ? t.multi : t.single}</p>
                  <div className="mc-opt-grid">
                    {field.options.map((option) => {
                      const picked = selected(values, field);
                      const on = picked.includes(option.id);
                      return (
                        <label className={on ? "mc-opt on" : "mc-opt"} key={option.id}>
                          <input
                            type={field.multi ? "checkbox" : "radio"}
                            name={`mcq-${field.id}`}
                            checked={on}
                            onChange={() =>
                              set(
                                field.id,
                                field.multi
                                  ? on
                                    ? picked.filter((x) => x !== option.id)
                                    : [...picked, option.id]
                                  : option.id,
                              )
                            }
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
              ) : (
                <div className="mc-field mc-field--wide mc-q-field" key={field.id}>
                  <label htmlFor={`mcq-${field.id}`}>
                    {field.label[lang]}
                    {!field.optional && <em>{t.required}</em>}
                  </label>
                  {field.kind === "textarea" ? (
                    <textarea
                      id={`mcq-${field.id}`}
                      rows={4}
                      value={(values[field.id] as string) ?? ""}
                      onChange={(e) => set(field.id, e.target.value)}
                      placeholder={field.placeholder?.[lang]}
                    />
                  ) : (
                    <input
                      id={`mcq-${field.id}`}
                      value={(values[field.id] as string) ?? ""}
                      onChange={(e) => set(field.id, e.target.value)}
                      placeholder={field.placeholder?.[lang]}
                    />
                  )}
                </div>
              ),
            )}
          </form>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">{t.contactKicker}</span>
            <h2>{t.contactH}</h2>
          </div>

          <form className="mc-form" onSubmit={(event) => event.preventDefault()}>
            <div className="mc-fields">
              <div className="mc-field">
                <label htmlFor="mcq-company">{t.fCompany}<em>{t.required}</em></label>
                <input id="mcq-company" value={contact.company} onChange={setC("company")} autoComplete="organization" />
              </div>
              <div className="mc-field">
                <label htmlFor="mcq-person">{t.fPerson}<em>{t.required}</em></label>
                <input id="mcq-person" value={contact.person} onChange={setC("person")} autoComplete="name" />
              </div>
              <div className="mc-field">
                <label htmlFor="mcq-email">{t.fEmail}<em>{t.required}</em></label>
                <input id="mcq-email" type="email" value={contact.email} onChange={setC("email")} autoComplete="email" />
              </div>
              <div className="mc-field">
                <label htmlFor="mcq-phone">{t.fPhone}</label>
                <input id="mcq-phone" type="tel" value={contact.phone} onChange={setC("phone")} autoComplete="tel" />
              </div>
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
                    // No clipboard permission — the reader can still select
                    // the text, and pretending it worked would be worse.
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
    </>
  );
}

/** The enquiry as plain text — same grammar as the wizard's: headings in
 *  brackets, one fact per line, compact enough to survive being a URL. */
function mailBody(lang: Lang, qid: QuestionnaireId, values: Values, contact: Contact): string {
  const t = copy[lang];
  const q = questionnaire(qid);
  const lines: string[] = [q.name[lang], ""];

  lines.push(`[${t.mailAnswers}]`);
  for (const field of visibleFields(q, values)) {
    lines.push(`${field.label[lang]}: ${summarise(values, field, lang) || t.none}`);
  }
  lines.push("");

  lines.push(
    `[${t.mailFrom}]`,
    `${t.fCompany}: ${contact.company || t.none}`,
    `${t.fPerson}: ${contact.person || t.none}`,
    `${t.fEmail}: ${contact.email || t.none}`,
    `${t.mailPhone}: ${contact.phone || t.none}`,
  );

  lines.push("", "--", t.mailFoot);
  return lines.join("\r\n");
}
