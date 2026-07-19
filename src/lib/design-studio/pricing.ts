import { plans } from "@/lib/plans";
import type { DesignSelections, EstimateRange } from "./types";

const sizeBase: Record<
  NonNullable<DesignSelections["sizeBand"]>,
  EstimateRange
> = {
  "under-2000": { low: 275000, high: 650000 },
  "2000-3000": { low: 600000, high: 950000 },
  "over-3000": { low: 850000, high: 2000000 },
};

const finishMods: Record<
  NonNullable<DesignSelections["finishLevel"]>,
  { low: number; high: number }
> = {
  premium: { low: 0, high: 0 },
  luxury: { low: 40000, high: 120000 },
  estate: { low: 100000, high: 350000 },
};

const lifestyleMods: Record<string, { low: number; high: number }> = {
  "finished-basement": { low: 45000, high: 150000 },
  "outdoor-living": { low: 35000, high: 125000 },
  deck: { low: 15000, high: 60000 },
  adu: { low: 150000, high: 400000 },
  "garage-workshop": { low: 40000, high: 140000 },
  sunroom: { low: 25000, high: 90000 },
  other: { low: 0, high: 0 },
};

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatEstimateRange(range: EstimateRange) {
  return `${formatUsd(range.low)} – ${formatUsd(range.high)}`;
}

export function calculateEstimate(selections: DesignSelections): EstimateRange {
  let low = 0;
  let high = 0;

  if (selections.planSlug) {
    const plan = plans.find((p) => p.slug === selections.planSlug);
    if (plan) {
      // Base from plan starting price with a transparent range band
      low = plan.priceFrom;
      high = Math.round(plan.priceFrom * 1.35);
    }
  } else if (selections.sizeBand) {
    const base = sizeBase[selections.sizeBand];
    low = base.low;
    high = base.high;
  } else {
    return { low: 275000, high: 2000000 };
  }

  if (selections.finishLevel) {
    const mod = finishMods[selections.finishLevel];
    low += mod.low;
    high += mod.high;
  }

  for (const item of selections.lifestyle) {
    const mod = lifestyleMods[item];
    if (!mod) continue;
    low += mod.low;
    high += mod.high;
  }

  // Soft style/exterior character nudge — never a false precision anchor
  if (selections.style === "barndominium" || selections.style === "contemporary") {
    high = Math.round(high * 1.03);
  }
  if (selections.roof === "standing-seam" || selections.roof === "slate-inspired") {
    low += 8000;
    high += 35000;
  }
  if (selections.exteriorPalette === "stone-accents") {
    low += 10000;
    high += 45000;
  }

  // Estate ceilings already high; keep ordering sensible
  if (high < low) high = low;

  return {
    low: Math.round(low / 1000) * 1000,
    high: Math.round(high / 1000) * 1000,
  };
}

export function estimateLabelParts(selections: DesignSelections) {
  const range = calculateEstimate(selections);
  const hasCore = Boolean(selections.sizeBand || selections.planSlug);
  return {
    range,
    label: hasCore ? formatEstimateRange(range) : "Select size to seed range",
    hasCore,
  };
}
