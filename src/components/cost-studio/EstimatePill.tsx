"use client";

import { costDisclaimer, formatRange } from "@/lib/cost-studio/model";
import type { CostEstimate } from "@/lib/cost-studio/types";

export function EstimatePill({
  estimate,
  sticky = true,
}: {
  estimate: CostEstimate;
  sticky?: boolean;
}) {
  return (
    <div
      className={`${
        sticky ? "sticky top-[4.5rem] z-30" : ""
      } border-b border-border bg-[rgba(251,249,246,0.95)] backdrop-blur-xl`}
    >
      <div className="container-wide flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            Live construction investment range
          </p>
          <p className="font-display text-2xl text-ivory sm:text-3xl">
            {formatRange(estimate.low, estimate.high)}
            <span className="ml-1 text-base text-text-dim">*</span>
          </p>
          <p className="text-xs text-text-dim">
            ~{estimate.effectivePerSqft}/sf effective mid · base curve ~{estimate.basePerSqft}/sf at
            Premium before upgrades
          </p>
        </div>
        <p className="max-w-xl text-[0.68rem] leading-relaxed text-text-dim sm:text-right">
          *{costDisclaimer}
        </p>
      </div>
    </div>
  );
}
