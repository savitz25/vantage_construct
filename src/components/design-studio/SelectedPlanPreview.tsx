"use client";

import Image from "next/image";
import { useState } from "react";
import type { HomePlan } from "@/lib/plans";
import { formatPrice } from "@/lib/plans";
import { getPlanMedia, planImageAlt } from "@/lib/plan-media";

export function SelectedPlanPreview({
  plan,
  onOpenDetails,
}: {
  plan: HomePlan;
  onOpenDetails: () => void;
}) {
  const media = getPlanMedia(plan.slug);
  const [showFloor, setShowFloor] = useState(false);
  const src =
    showFloor && media?.floorPlan
      ? media.floorPlan
      : media?.hero || media?.gallery?.[0];

  if (!src) return null;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Selected plan preview</p>
          <h3 className="font-display text-2xl text-ivory sm:text-3xl">{plan.name}</h3>
          <p className="text-sm text-text-muted">
            {plan.sqft.toLocaleString()} sq ft · from {formatPrice(plan.priceFrom)} · {plan.style}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
              !showFloor ? "border-gold bg-gold/10 text-gold-deep" : "border-border text-text-muted"
            }`}
            onClick={() => setShowFloor(false)}
          >
            Exterior
          </button>
          {media?.floorPlan ? (
            <button
              type="button"
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
                showFloor ? "border-gold bg-gold/10 text-gold-deep" : "border-border text-text-muted"
              }`}
              onClick={() => setShowFloor(true)}
            >
              Floor plan
            </button>
          ) : null}
          <button type="button" className="btn btn-secondary !px-4 !py-2 text-xs" onClick={onOpenDetails}>
            Full design details
          </button>
        </div>
      </div>
      <div className="relative aspect-[21/9] min-h-[220px] bg-bg-elevated">
        <Image
          src={src}
          alt={planImageAlt(
            plan.name,
            plan.sqft,
            plan.style,
            showFloor ? "Floor plan" : "Exterior elevation",
          )}
          fill
          sizes="100vw"
          className={showFloor ? "object-contain bg-white p-4" : "object-cover"}
          priority
        />
      </div>
    </div>
  );
}
