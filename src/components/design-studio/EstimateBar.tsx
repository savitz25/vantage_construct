"use client";

import { studioEstimateDisclaimer } from "@/lib/design-studio/options";
import { estimateLabelParts } from "@/lib/design-studio/pricing";
import type { DesignSelections } from "@/lib/design-studio/types";

export function EstimateBar({ selections }: { selections: DesignSelections }) {
  const { label, hasCore } = estimateLabelParts(selections);

  return (
    <div className="sticky top-[4.5rem] z-30 border-b border-border bg-[rgba(251,249,246,0.94)] backdrop-blur-xl">
      <div className="container-wide flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            Estimated investment range
          </p>
          <p className="font-display text-2xl text-ivory sm:text-3xl">
            {hasCore ? label : "—"}
            <span className="ml-1 text-base text-text-dim">*</span>
          </p>
        </div>
        <p className="max-w-2xl text-[0.7rem] leading-relaxed text-text-dim sm:text-right">
          *{studioEstimateDisclaimer}
        </p>
      </div>
    </div>
  );
}
