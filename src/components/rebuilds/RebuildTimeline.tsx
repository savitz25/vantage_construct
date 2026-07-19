"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { rebuildTimeline } from "@/lib/rebuilds/content";

export function RebuildTimeline() {
  const [openId, setOpenId] = useState<string>(rebuildTimeline[0]?.id ?? "");

  return (
    <ol className="relative space-y-3">
      {rebuildTimeline.map((step, i) => {
        const open = openId === step.id;
        return (
          <li key={step.id} className="card overflow-hidden">
            <button
              type="button"
              className="flex w-full items-start gap-4 p-5 text-left sm:items-center sm:p-6"
              onClick={() => {
                setOpenId(open ? "" : step.id);
                trackEvent("rebuild_timeline_click", {
                  event_category: "rebuilds",
                  step: step.id,
                });
              }}
              aria-expanded={open}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg-elevated font-display text-lg text-gold-deep">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.14em] text-gold">{step.phase}</p>
                <h3 className="font-display text-2xl text-ivory">{step.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{step.summary}</p>
              </div>
              <span className={`mt-1 text-gold transition ${open ? "rotate-45" : ""}`}>+</span>
            </button>
            {open ? (
              <div className="border-t border-border px-5 pb-6 pt-4 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-dim">
                  Typical duration · {step.duration}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg bg-bg-elevated p-4 text-sm text-text-muted">
                  <strong className="text-ivory">What you experience: </strong>
                  {step.homeowner}
                </p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
