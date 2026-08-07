"use client";

import { useState } from "react";
import type { GroupId } from "./cutaway";
import { groups, hotspots } from "./cutaway";
import type { Lang } from "./site-config";
import { asset } from "./site-config";

/**
 * The cutaway render with the original callouts turned into hotspots.
 *
 * The render holds the left column and stays pinned while the part list scrolls
 * beside it on the right, so the highlighted marker and the words describing it
 * are on screen together. The caption pins to the top of that column for the
 * same reason. Below 1240px the two columns stack back up.
 *
 * Pointing at a part previews it; clicking locks it, and it stays until the
 * next click, so a description can be read without the pointer having to sit
 * still on the row. Hovering elsewhere while locked leaves the text alone.
 * Clicking the same part again, or pressing Escape, releases the lock.
 */
export function CutawayMap({ lang, alt, hint }: { lang: Lang; alt: string; hint: string }) {
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [group, setGroup] = useState<GroupId | null>(null);

  // A lock wins over the pointer; without one, hovering previews.
  const active = pinned ?? hovered;
  const current = hotspots.find((spot) => spot.id === active) ?? null;

  const bindSpot = (id: string) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered((previous) => (previous === id ? null : previous)),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered((previous) => (previous === id ? null : previous)),
    onClick: () => setPinned((previous) => (previous === id ? null : id)),
  });

  const bindGroup = (id: GroupId) => ({
    onMouseEnter: () => setGroup(id),
    onFocus: () => setGroup(id),
    onMouseLeave: () => setGroup(null),
    onBlur: () => setGroup(null),
  });

  const dimmed = (spot: (typeof hotspots)[number]) =>
    (active !== null && spot.id !== active) || (group !== null && spot.group !== group);

  return (
    <div
      className={active || group ? "cutaway is-active" : "cutaway"}
      onKeyDown={(event) => {
        if (event.key === "Escape" && pinned) {
          setPinned(null);
        }
      }}
    >
      <div className="cutaway-view">
        <figure className="cutaway-stage" onMouseLeave={() => setHovered(null)}>
          <img src={asset("/images/cutaway.webp")} width={1800} height={1009} alt={alt} />

          {/* Dims everything but a circle around the selected part. */}
          <span
            className="cutaway-spot"
            aria-hidden="true"
            style={
              current
                ? {
                    opacity: 1,
                    background: `radial-gradient(circle 160px at ${current.x}% ${current.y}%, rgba(18,20,22,0) 0, rgba(18,20,22,0) 76px, rgba(18,20,22,.82) 160px)`,
                  }
                : undefined
            }
          />

          {hotspots.map((spot, index) => (
            <button
              key={spot.id}
              type="button"
              className={`cutaway-pin${spot.id === active ? " is-on" : ""}${spot.id === pinned ? " is-pinned" : ""}${dimmed(spot) ? " is-off" : ""}`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              aria-label={spot.title[lang]}
              aria-pressed={spot.id === pinned}
              {...bindSpot(spot.id)}
            >
              {index + 1}
            </button>
          ))}
        </figure>

        {/* Caption rides with the render, not with the list: its height changes
            per part, and above the list that would shove rows under the cursor. */}
        <p className={current ? "cutaway-caption is-on" : "cutaway-caption"} aria-live="polite">
          {current ? (
            <>
              <strong>{current.title[lang]}</strong>
              <span>{current.detail[lang]}</span>
            </>
          ) : (
            <span className="cutaway-hint">{hint}</span>
          )}
        </p>
      </div>

      <div className="cutaway-groups">
        {groups.map((entry) => {
          const members = hotspots.filter((spot) => spot.group === entry.id);
          return (
            <section
              key={entry.id}
              className={group === entry.id ? "cutaway-group is-on" : "cutaway-group"}
              {...bindGroup(entry.id)}
            >
              <h3>
                {entry.label[lang]}
                <b>{members.length}</b>
              </h3>
              <ul>
                {members.map((spot) => (
                  <li key={spot.id}>
                    <button
                      type="button"
                      className={`${spot.id === active ? "is-on" : ""}${spot.id === pinned ? " is-pinned" : ""}`.trim() || undefined}
                      aria-pressed={spot.id === pinned}
                      {...bindSpot(spot.id)}
                    >
                      <b>{String(hotspots.indexOf(spot) + 1).padStart(2, "0")}</b>
                      {spot.title[lang]}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
