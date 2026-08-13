"use client";

import { useEffect, useState } from "react";
import CartAdd from "./cart-add";
import type { CartSeed } from "./cart-store";
import { asset, type Lang } from "./site-config";
import SiteLink from "./site-link";

/**
 * The model list, with a panel under each row.
 *
 * The rows are the `.hairline-list` the chamber and test-system indexes have
 * always drawn — index, designation, descriptor, catalogue figures. What is new
 * is that a row opens: the photograph from the model page, its opening
 * paragraph and its figures slide out underneath, and the reader decides from
 * there whether to open the model page itself.
 *
 * The figures are set as text on hairlines rather than in the bordered tiles the
 * model page uses. Six boxes inside a panel that is itself inside a list of
 * bordered rows was three frames deep, and the innermost one was carrying the
 * shortest strings on the page.
 *
 * Three things this file is careful about, because they are the ones an
 * accordion usually gets wrong:
 *
 * - **The link to the model page is optional, and off.** The row used to be the
 *   only way there; then the panel carried it, as the one control inside it
 *   that was not "close". Neither branch asks for it today — see `more` — so
 *   the panel's controls are the enquiry and the basket, and the model pages
 *   are reached from a MyCart line or from the sitemap.
 * - **The panel is in the exported HTML.** It is collapsed by CSS, not dropped
 *   from the tree, so the figures are in the file a crawler reads and the
 *   rendered-HTML tests can see them. `inert` keeps the closed panel out of the
 *   tab order and the accessibility tree, which is what `display: none` would
 *   otherwise have been doing for us.
 * - **The photographs are not.** Twelve plates behind a collapsed panel are
 *   twelve downloads for a reader who opens one of them — and `loading` cannot
 *   help, because a clipped element is still on screen as far as the browser is
 *   concerned. So a frame is mounted when it is first shown and stays mounted:
 *   opening a row costs one image, and the second and third arrive only if the
 *   reader asks for them. The figure holds the first frame's aspect ratio
 *   throughout, so neither the fold nor a step through the gallery moves the
 *   page under the reader.
 */

export type AccordionRow = {
  /** Unique within one list, and used to build the `id`s the row and its panel
   *  point at. The caller builds it — a slug is not enough on the RVC page,
   *  where seven models share one. */
  id: string;
  name: string;
  desc: string;
  /** The catalogue figures under the descriptor, one line each — the same
   *  `.hl-spec` block the plain list draws. */
  spec?: readonly string[];
  /** The plate the model page leads with, then the gallery extras behind it.
   *  Two or three; four models have two, because two is what the head office
   *  publishes of them. */
  shots?: readonly { src: string; w: number; h: number; alt?: string }[];
  /** The model page's opening paragraph — what the row's one-line descriptor
   *  leaves out, in the two or three sentences the catalogue opens with. */
  lead?: string;
  /** The model page's "at a glance" pairs. */
  facts?: readonly { label: string; value: string }[];
  /** The model page. Read by the plain-row fallback below, and by the panel's
   *  link when `more` is given — which it is not today. Absent on the page that
   *  is already there: the RVC index lists itself, and a row linking to the
   *  page you are reading is worse than a row that does not. */
  href?: string;
  /** The enquiry, already addressed to this model. A reader who has opened one
   *  row out of twelve has made the choice the contact page would otherwise ask
   *  them to type out again. */
  quoteHref?: string;
  /** This model as MyCart holds it. The enquiry above asks about one model
   *  now; this puts it aside for the reader who is specifying a laboratory and
   *  will ask about six at once. Assembled by the caller, which is the side of
   *  the boundary that has the catalogue. */
  cart?: CartSeed;
};

export default function ModelAccordion({
  lang,
  rows,
  more,
  quote,
  gallery,
}: {
  /** Only the basket button needs it — every other label on this component is
   *  handed in already translated. */
  lang: Lang;
  rows: readonly AccordionRow[];
  /** Label on the panel's link to the model page, and the switch that draws it:
   *  no label, no button, even on a row that has an `href`. Optional in the
   *  first place because a branch can have no model pages to link to — every
   *  instrument in EMC Test Systems is described on its family's page and
   *  nowhere else. The chamber branch has such pages and deliberately omits the
   *  label anyway; see the call in `chamber-content`. */
  more?: string;
  /** Label on the panel's enquiry button. */
  quote: string;
  /** Names for the gallery's three controls. `frame` labels the picture
   *  itself, which is a button — a control with no text of its own needs one,
   *  and "picture 2 of 3, press for the next" is what it does. A pattern with
   *  `{at}` and `{of}` rather than a function, because this crosses the
   *  server/client boundary and a function cannot. */
  gallery: { prev: string; next: string; frame: string };
}) {
  const [open, setOpen] = useState<string | null>(null);
  /** Which frame each opened row is showing, by row id. Absent means the
   *  first — a row that has never been stepped through does not need an
   *  entry, and closing a row deliberately does not reset it. */
  const [at, setAt] = useState<Record<string, number>>({});
  /** Every frame that has been on screen, as `rowId:index`. Mounting is
   *  one-way: a frame stepped past stays in the document so stepping back is
   *  instant. See the note on the plates above. */
  const [mounted, setMounted] = useState<readonly string[]>([]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const mount = (id: string, i: number) =>
    setMounted((current) =>
      current.includes(`${id}:${i}`) ? current : [...current, `${id}:${i}`]);

  const toggle = (id: string) => {
    setOpen((current) => (current === id ? null : id));
    mount(id, at[id] ?? 0);
  };

  /** Step `by` frames, wrapping. Wrapping rather than stopping at the ends
   *  because the picture itself is one of the controls: a reader clicking
   *  through a gallery of three should not have to notice when they have
   *  reached the last one. */
  const step = (id: string, count: number, by: number) => {
    const next = (((at[id] ?? 0) + by) % count + count) % count;
    setAt((current) => ({ ...current, [id]: next }));
    mount(id, next);
  };

  return (
    <div className="hairline-list">
      {rows.map((row, i) => {
        const idx = String(i + 1).padStart(2, "0");
        const desc = (
          <span className="hl-desc">
            {row.desc}
            {row.spec && (
              <span className="hl-spec">
                {row.spec.map((line) => <span key={line}>{line}</span>)}
              </span>
            )}
          </span>
        );

        // A row with nothing to show stays what it was. No model is in this
        // state today; the branch is here so that a model added to the list
        // before its page exists degrades to a link rather than to a control
        // that opens an empty box.
        if (!row.shots?.length && !row.facts) {
          const Row = row.href ? "a" : "div";
          return (
            <Row className="hl-row" key={row.id} href={row.href}>
              <span className="hl-idx">{idx}</span>
              <b>{row.name}</b>
              {desc}
            </Row>
          );
        }

        const isOpen = open === row.id;
        const panelId = `panel-${row.id}`;
        const buttonId = `row-${row.id}`;

        return (
          <div className="hl-item" key={row.id}>
            <button
              type="button"
              className="hl-row hl-row--toggle"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(row.id)}
            >
              <span className="hl-idx">{idx}</span>
              <b>{row.name}</b>
              {desc}
              <svg className="hl-caret" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 6L8 10.5 12.5 6" />
              </svg>
            </button>
            <div className={isOpen ? "hl-panel is-open" : "hl-panel"} id={panelId}>
              {/* The clipping row of the 0fr/1fr grid. `inert` rather than
                  `hidden`, so the height can animate and the contents still
                  leave the tab order while they are folded away. */}
              <div className="hl-panel-clip" inert={!isOpen}>
                {/* Clicking the panel closes it, which is what the reader asked
                    the row for in the first place — except on the link, which
                    has somewhere else to be. `role="group"` and not a heading:
                    the row above is the label, and it is a button, so the panel
                    is named by it rather than by a title of its own. */}
                <div
                  className="hl-panel-body"
                  role="group"
                  aria-labelledby={buttonId}
                  onClick={(event) => {
                    // The gallery's controls are buttons and the two calls to
                    // action are links; everything else in the panel is panel,
                    // and clicking panel closes it.
                    if ((event.target as HTMLElement).closest("a, button")) return;
                    setOpen(null);
                  }}
                >
                  {row.shots?.length ? (
                    <figure
                      className="hl-shot"
                      /* The first frame's ratio, held for all of them. The
                         frames are 3:2 photographs and 1:1 renders together,
                         and a box that resized between them would move the
                         buttons out from under the reader's pointer. */
                      style={{ aspectRatio: `${row.shots[0].w} / ${row.shots[0].h}` }}
                    >
                      {/* A single frame is a picture, not a control. The head
                          office photographs an instrument once, so every row in
                          the EMC Test Systems branch is in this case — and a
                          button that steps from frame 1 of 1 to frame 1 of 1 is
                          a promise the picture cannot keep. `div`, and the
                          gallery's labels are not read. */}
                      {row.shots.length === 1 ? (
                        <div className="hl-frame">
                          {mounted.includes(`${row.id}:0`) && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={asset(row.shots[0].src)}
                              alt={row.shots[0].alt ?? ""}
                              width={row.shots[0].w}
                              height={row.shots[0].h}
                              decoding="async"
                            />
                          )}
                        </div>
                      ) : (
                      <button
                        type="button"
                        className="hl-frame"
                        aria-label={gallery.frame
                          .replace("{at}", String((at[row.id] ?? 0) + 1))
                          .replace("{of}", String(row.shots.length))}
                        onClick={() => step(row.id, row.shots!.length, 1)}
                      >
                        {row.shots.map((shot, s) =>
                          mounted.includes(`${row.id}:${s}`) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={shot.src}
                              src={asset(shot.src)}
                              alt={shot.alt ?? ""}
                              width={shot.w}
                              height={shot.h}
                              decoding="async"
                              hidden={s !== (at[row.id] ?? 0)}
                            />
                          ) : null,
                        )}
                      </button>
                      )}
                      {row.shots.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="hl-step hl-step--prev"
                            aria-label={gallery.prev}
                            onClick={() => step(row.id, row.shots!.length, -1)}
                          >
                            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
                          </button>
                          <button
                            type="button"
                            className="hl-step hl-step--next"
                            aria-label={gallery.next}
                            onClick={() => step(row.id, row.shots!.length, 1)}
                          >
                            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
                          </button>
                          {/* The count is the one part of the gallery a reader
                              needs without operating it. `aria-hidden` because
                              the frame button already says it. */}
                          <span className="hl-count" aria-hidden="true">
                            {(at[row.id] ?? 0) + 1} / {row.shots.length}
                          </span>
                        </>
                      )}
                    </figure>
                  ) : null}
                  <div className="hl-facts">
                    {row.lead && <p className="hl-lead">{row.lead}</p>}
                    {row.facts && (
                      <dl className="hl-figures">
                        {row.facts.map((fact) => (
                          <div key={fact.label}>
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {/* The enquiry takes the red fill: it is what the page
                        exists for. The model page would come before it if a
                        caller asked for it, which none does today. */}
                    <div className="btns hl-actions">
                      {row.href && more && (
                        <SiteLink className="btn btn-outline" href={row.href}>
                          {more}
                          <span aria-hidden="true">→</span>
                        </SiteLink>
                      )}
                      {row.quoteHref && (
                        <a className="btn btn-red" href={row.quoteHref}>
                          {quote}
                          <span aria-hidden="true">→</span>
                        </a>
                      )}
                      {/* Last of the three, and the quietest: the enquiry
                          beside it is what this page is for, and the basket is
                          what a reader reaches for when they are not ready to
                          send one yet. */}
                      {row.cart && (
                        <CartAdd lang={lang} item={row.cart} className="btn btn-outline" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
