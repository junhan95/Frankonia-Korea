"use client";

import { useEffect, useState } from "react";

/**
 * The burger button and the drawer it opens — the only part of the header that
 * needs state, and now the only part of it that reaches the browser.
 *
 * The header used to be a client component in its entirety, which meant every
 * module it imported to build the navigation came with it: the chamber and
 * test-system route tables, both locales of every label and caption, the
 * industry list. All of that is markup by the time it matters, and markup is
 * what the drawer receives here — `bar` for the row inside the header, and
 * `children` for the drawer's contents. Both arrive already rendered on the
 * server, so this file's own dependencies are all that ship.
 */
export default function NavDrawer({
  labels,
  bar,
  children,
}: {
  labels: { open: string; close: string; nav: string };
  bar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="wrap nav">
        {bar}
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels.close : labels.open}
          onClick={() => setOpen((was) => !was)}
        >
          <span className={open ? "burger-bars open" : "burger-bars"} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>
      </div>

      {/* Kept mounted so the panel can transition, hidden from assistive tech
          and from tab order while closed. */}
      <nav
        id="mobile-menu"
        className={open ? "mobile-menu open" : "mobile-menu"}
        aria-label={labels.nav}
        hidden={!open}
        // The links inside are server-rendered and cannot carry an onClick of
        // their own, so the close is delegated. A link to another page unmounts
        // the drawer by navigating and would not need this; it stays for the
        // same-page anchors, which would otherwise leave the panel covering
        // whatever it just scrolled to. Contact was the last anchor in this
        // list and is a page now, but the guard costs one line and the next
        // anchor added here would silently need it.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {children}
      </nav>
    </>
  );
}
