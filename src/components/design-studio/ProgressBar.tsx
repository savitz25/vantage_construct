"use client";

import { STEP_LABELS, STEPS, type StudioStep } from "@/lib/design-studio/types";

export function ProgressBar({ step }: { step: StudioStep }) {
  const index = STEPS.indexOf(step);
  const pct = ((index + 1) / STEPS.length) * 100;

  return (
    <div className="border-b border-border bg-surface">
      <div className="container-wide py-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-dim">
            Design Studio · Step {index + 1} of {STEPS.length}
          </p>
          <p className="text-xs text-gold-deep">{STEP_LABELS[step]}</p>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-bg-elevated"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Design studio progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-bright to-gold-deep transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ol className="mt-3 hidden gap-1 sm:grid sm:grid-cols-7">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={`text-center text-[0.65rem] uppercase tracking-[0.12em] ${
                i <= index ? "text-gold-deep" : "text-text-dim"
              }`}
            >
              {STEP_LABELS[s]}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
