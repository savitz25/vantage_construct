/**
 * North Jersey luxury construction cost model.
 *
 * Calibrated against published Vantage Available Homes base prices:
 * - Cypress Hollow 1,479 sf @ $515k ≈ $348/sf
 * - Emerald Cottage 2,889 sf @ $860k ≈ $298/sf
 * - Grand Alpine 4,954 sf @ $1,195k ≈ $241/sf
 *
 * Curve: base $/sf declines as size rises, then finish tiers + NJ adders layer on.
 * Scope: construction only — land, sitework, permits, utilities, design fees excluded.
 */

import type {
  AddonId,
  BasementId,
  CostEstimate,
  CostLineItem,
  CostSelections,
  FinishTier,
  GarageId,
  LotPath,
  RoofId,
  Stories,
  StyleId,
} from "./types";

export const costDisclaimer =
  "Conceptual construction range for Central & Northern New Jersey, calibrated to Vantage plan anchors and North Jersey luxury market rates. Excludes land, site work, permits, utility connections, and design fees. Final investment is determined during Design & Discovery after evaluating your lot, detailed plans, and current material & labor costs. Typical early ranges can land within roughly 10–15% of final construction costs when scope is comparable — we believe in complete transparency, no surprises.";

/** Premium finish base curve (construction shell + finishes at Premium tier). */
export function premiumBasePerSqft(sqft: number): number {
  const s = Math.max(1200, Math.min(10000, sqft));
  // Anchors: ~348 @ 1479, ~298 @ 2889, ~241 @ 4954
  // Smooth declining curve: a + b/s + c*s
  const a = 210;
  const b = 210000;
  const c = -0.004;
  return Math.max(220, a + b / s + c * s);
}

const finishMultiplier: Record<NonNullable<FinishTier>, number> = {
  premium: 1.0,
  luxury: 1.28,
  estate: 1.55,
};

const styleComplexity: Record<NonNullable<StyleId>, number> = {
  "modern-farmhouse": 1.04,
  craftsman: 1.06,
  contemporary: 1.08,
  traditional: 1.05,
  barndominium: 1.03,
};

const storiesAdj: Record<NonNullable<Stories>, number> = {
  1: 1.04, // more foundation/roof per sf
  1.5: 1.02,
  2: 1.0,
};

const basementCost: Record<NonNullable<BasementId>, (sqft: number) => number> = {
  none: () => 0,
  unfinished: (sqft) => Math.round(sqft * 0.45 * 55), // partial basement allowance
  finished: (sqft) => Math.round(sqft * 0.55 * 95),
  walkout: (sqft) => Math.round(sqft * 0.6 * 125),
};

const roofAdders: Record<NonNullable<RoofId>, number> = {
  shingle: 0,
  "standing-seam": 38000,
  slate: 95000,
};

const garageAdders: Record<NonNullable<GarageId>, number> = {
  two: 0, // included in base
  three: 45000,
  collector: 110000,
};

const lotPathAdders: Record<NonNullable<LotPath>, number> = {
  "own-lot": 0,
  looking: 0,
  knockdown: 65000, // demo/rebuild complexity premium (construction-side only)
};

export const addonCatalog: {
  id: AddonId;
  label: string;
  description: string;
  low: number;
  high: number;
  modelLayer: string;
}[] = [
  {
    id: "outdoor-living",
    label: "Outdoor living suite",
    description: "Covered entertaining, outdoor kitchen, fireplace.",
    low: 55000,
    high: 145000,
    modelLayer: "outdoor",
  },
  {
    id: "pool",
    label: "Resort-style pool",
    description: "Pool package with terrace connection.",
    low: 95000,
    high: 220000,
    modelLayer: "pool",
  },
  {
    id: "porch",
    label: "Expanded porch / wraparound",
    description: "Architectural porch living for four-season curb appeal.",
    low: 28000,
    high: 75000,
    modelLayer: "porch",
  },
  {
    id: "sunroom",
    label: "Sunroom",
    description: "Light-filled year-round room.",
    low: 45000,
    high: 110000,
    modelLayer: "sunroom",
  },
  {
    id: "adu",
    label: "ADU / guest suite",
    description: "Private guest or multi-gen living space.",
    low: 175000,
    high: 420000,
    modelLayer: "adu",
  },
  {
    id: "wine-cellar",
    label: "Wine cellar",
    description: "Climate-ready cellar detailing.",
    low: 35000,
    high: 90000,
    modelLayer: "cellar",
  },
  {
    id: "smart-home",
    label: "Smart home package",
    description: "Whole-home automation backbone.",
    low: 18000,
    high: 55000,
    modelLayer: "smart",
  },
  {
    id: "generator",
    label: "Whole-home generator",
    description: "North Jersey storm-readiness.",
    low: 14000,
    high: 32000,
    modelLayer: "generator",
  },
];

function addonRange(ids: AddonId[]) {
  let low = 0;
  let high = 0;
  for (const id of ids) {
    const a = addonCatalog.find((x) => x.id === id);
    if (!a) continue;
    low += a.low;
    high += a.high;
  }
  return { low, high };
}

export function calculateCostEstimate(s: CostSelections): CostEstimate {
  const sqft = s.sqft || 3200;
  const finish = s.finish ?? "premium";
  const style = s.style ?? "modern-farmhouse";
  const stories = s.stories ?? 2;
  const basement = s.basement ?? "unfinished";
  const roof = s.roof ?? "shingle";
  const garage = s.garage ?? "two";
  const lot = s.lotPath ?? "own-lot";

  const basePsf = premiumBasePerSqft(sqft);
  const mult =
    finishMultiplier[finish] * styleComplexity[style] * storiesAdj[stories];
  const structureMid = Math.round(sqft * basePsf * mult);
  // Band ±12% around structure for conceptual range
  const structureLow = Math.round(structureMid * 0.9);
  const structureHigh = Math.round(structureMid * 1.12);

  const bas = basementCost[basement](sqft);
  const basLow = Math.round(bas * 0.88);
  const basHigh = Math.round(bas * 1.15);

  const roofAmt = roofAdders[roof];
  const garageAmt = garageAdders[garage];
  const lotAmt = lotPathAdders[lot];
  const adds = addonRange(s.addons);

  const lines: CostLineItem[] = [
    {
      id: "structure",
      label: "Structure, systems & finishes",
      amount: structureMid,
      category: "structure",
    },
  ];
  if (bas > 0) {
    lines.push({
      id: "basement",
      label:
        basement === "walkout"
          ? "Walk-out basement package"
          : basement === "finished"
            ? "Finished basement"
            : "Basement foundation allowance",
      amount: bas,
      category: "foundation",
    });
  }
  if (roofAmt > 0) {
    lines.push({
      id: "roof",
      label: roof === "slate" ? "Slate-inspired roof package" : "Standing seam metal roof",
      amount: roofAmt,
      category: "exterior",
    });
  }
  if (garageAmt > 0) {
    lines.push({
      id: "garage",
      label: garage === "collector" ? "Collector / oversized garage" : "3-car garage upgrade",
      amount: garageAmt,
      category: "garage",
    });
  }
  if (lotAmt > 0) {
    lines.push({
      id: "knockdown",
      label: "Knockdown-rebuild complexity premium",
      amount: lotAmt,
      category: "site-path",
    });
  }
  for (const id of s.addons) {
    const a = addonCatalog.find((x) => x.id === id);
    if (!a) continue;
    lines.push({
      id: a.id,
      label: a.label,
      amount: Math.round((a.low + a.high) / 2),
      category: "addons",
    });
  }

  const low =
    structureLow +
    basLow +
    Math.round(roofAmt * 0.9) +
    Math.round(garageAmt * 0.9) +
    lotAmt +
    adds.low;
  const high =
    structureHigh +
    basHigh +
    Math.round(roofAmt * 1.15) +
    Math.round(garageAmt * 1.15) +
    lotAmt +
    adds.high;
  const mid = Math.round((low + high) / 2);

  return {
    low: roundTo(low, 1000),
    high: roundTo(high, 1000),
    mid: roundTo(mid, 1000),
    basePerSqft: Math.round(basePsf),
    effectivePerSqft: Math.round(mid / sqft),
    lines,
    constructionOnly: true,
  };
}

function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatRange(low: number, high: number) {
  return `${formatUsd(low)} – ${formatUsd(high)}`;
}

export const finishOptions = [
  {
    id: "premium" as const,
    label: "Premium",
    psfHint: "From ~$320–$400/sf band",
    description:
      "Elevated North Jersey standard — quality millwork, designer fixtures, hardwood living areas, refined baths.",
  },
  {
    id: "luxury" as const,
    label: "Luxury",
    psfHint: "From ~$400–$550/sf band",
    description:
      "Bespoke millwork accents, premium stone, spa baths, statement lighting, elevated appliance packages.",
  },
  {
    id: "estate" as const,
    label: "Estate",
    psfHint: "From ~$550–$750+/sf band",
    description:
      "Ultra-premium surfaces, architectural lighting, steel spans, fully customized luxury expression.",
  },
];

export const styleOptions = [
  {
    id: "modern-farmhouse" as const,
    label: "Modern Farmhouse",
    blurb: "Board-and-batten, porches, bright open living.",
  },
  {
    id: "craftsman" as const,
    label: "Craftsman",
    blurb: "Timber details, stone accents, handcrafted character.",
  },
  {
    id: "contemporary" as const,
    label: "Contemporary",
    blurb: "Clean lines, glass, indoor-outdoor flow.",
  },
  {
    id: "traditional" as const,
    label: "Traditional / Colonial",
    blurb: "Timeless proportions and classic North Jersey curb appeal.",
  },
  {
    id: "barndominium" as const,
    label: "Barndominium",
    blurb: "Modern barn volumes with flexible living.",
  },
];

export const lotOptions = [
  {
    id: "own-lot" as const,
    label: "I own a lot",
    blurb: "We'll design around your site realities.",
  },
  {
    id: "looking" as const,
    label: "I'm looking for land",
    blurb: "We can help evaluate North Jersey sites.",
  },
  {
    id: "knockdown" as const,
    label: "Knockdown & rebuild",
    blurb: "Replace an existing home on your property — a Vantage specialty.",
  },
];

export const basementOptions = [
  { id: "none" as const, label: "Slab / minimal", blurb: "Limited foundation program." },
  { id: "unfinished" as const, label: "Unfinished basement", blurb: "Standard NJ full basement shell." },
  { id: "finished" as const, label: "Finished basement", blurb: "Living, media, gym, guest suite ready." },
  {
    id: "walkout" as const,
    label: "Walk-out finished",
    blurb: "Walk-out with entertainment-grade finishes.",
  },
];

export const roofOptions = [
  { id: "shingle" as const, label: "Architectural shingle" },
  { id: "standing-seam" as const, label: "Standing seam metal" },
  { id: "slate" as const, label: "Slate-inspired" },
];

export const garageOptions = [
  { id: "two" as const, label: "2-car" },
  { id: "three" as const, label: "3-car" },
  { id: "collector" as const, label: "Collector / oversized" },
];

export const costFaqs = [
  {
    q: "What does it cost per square foot to build a custom home in North Jersey?",
    a: "Luxury custom construction in Central & Northern New Jersey often ranges from roughly the mid-$200s to $600+/sq ft depending on size, finish tier, and complexity. Vantage’s published plan anchors currently imply base construction starting near ~$241–$348/sq ft before site-specific upgrades — finish level, basement program, and lifestyle packages can raise totals meaningfully.",
  },
  {
    q: "What does it cost to build a house in New Jersey in 2026?",
    a: "For quality custom construction (not production tract homes), many North Jersey projects land in multi-hundreds of dollars per square foot for the building alone. A mid-size luxury home might start near high-six to low-seven figures for construction before land — estate programs go higher. Use this Cost Studio for a personalized range, then validate with Design & Discovery.",
  },
  {
    q: "Does this calculator include land?",
    a: "No. Like every transparent builder tool, this estimate is construction-focused. Land, sitework, permits, utilities, and design fees are separate and vary by municipality and lot conditions.",
  },
  {
    q: "How accurate is the estimate?",
    a: "It is a conceptual range calibrated to Vantage plan pricing and North Jersey market structure. When scope is comparable, early ranges often land within about 10–15% of final construction costs. Your final number comes from Design & Discovery after lot evaluation and detailed specifications.",
  },
  {
    q: "Why is New Jersey more expensive than national calculators?",
    a: "Labor, codes, basement norms, snow-load design, finishes expectations, and dense North Jersey municipalities all raise cost relative to many Sun Belt markets. A Texas or national average will understate a Warren, Basking Ridge, or Millburn–Short Hills custom build.",
  },
  {
    q: "Can I use this for a knockdown rebuild?",
    a: "Yes. Choose the knockdown path to include a construction-side complexity premium. Demolition logistics and site restoration still require lot-specific evaluation.",
  },
  {
    q: "Is the Cost Studio free?",
    a: "Yes. You can generate an instant construction range without paying. Sharing contact details unlocks a fuller itemized breakdown and lets our team follow up if you want help interpreting the numbers.",
  },
  {
    q: "Who is behind these numbers?",
    a: "Vantage Construction Inc — a family-owned luxury builder led by Victor Lobozzo (N.J. Registered Builder #029289) with 35+ years across Central & Northern New Jersey. Anchors come from our published plan pricing, not anonymous online averages.",
  },
] as const;
