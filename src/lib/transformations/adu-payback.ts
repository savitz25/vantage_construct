import { plans } from "@/lib/plans";

export type AduType = "detached" | "garage" | "basement" | "above-garage";
export type AduUse = "rental" | "multigen" | "guest";
export type CountyId = "somerset" | "morris" | "union" | "essex";

export const aduTypes: {
  id: AduType;
  label: string;
  baseCost: number;
  defaultSqft: number;
  blurb: string;
}[] = [
  {
    id: "detached",
    label: "Detached cottage",
    baseCost: 275000, // Cozy Craftsman anchor
    defaultSqft: 872,
    blurb: "Standalone ADU — e.g. Cozy Craftsman Cottage class",
  },
  {
    id: "garage",
    label: "Garage conversion",
    baseCost: 145000,
    defaultSqft: 450,
    blurb: "Convert existing garage volume into living space",
  },
  {
    id: "basement",
    label: "Basement suite",
    baseCost: 125000,
    defaultSqft: 600,
    blurb: "Private suite within existing basement footprint",
  },
  {
    id: "above-garage",
    label: "Above-garage suite",
    baseCost: 195000,
    defaultSqft: 550,
    blurb: "New living level over garage structure",
  },
];

/** Illustrative monthly rent presets by county for 1BR accessory units */
export const countyRents: Record<CountyId, { label: string; rent: number }> = {
  somerset: { label: "Somerset", rent: 2200 },
  morris: { label: "Morris", rent: 2300 },
  union: { label: "Union", rent: 2100 },
  essex: { label: "Essex", rent: 2400 },
};

export type AduInputs = {
  type: AduType;
  use: AduUse;
  county: CountyId;
  rentOverride?: number;
  sqft?: number;
};

export type AduResult = {
  buildCost: number;
  monthlyRent: number;
  monthlyOpEx: number;
  monthlyNet: number;
  annualNet: number;
  breakEvenYears: number;
  cashFlow10: number[];
  valueAdd: number;
  planSlug?: string;
};

export function calculateAduPayback(input: AduInputs): AduResult {
  const t = aduTypes.find((x) => x.id === input.type) ?? aduTypes[0];
  const cozy = plans.find((p) => p.slug === "cozy-craftsman-cottage");
  const buildCost =
    input.type === "detached" && cozy
      ? cozy.priceFrom
      : Math.round(t.baseCost * (input.sqft ? input.sqft / t.defaultSqft : 1));

  const baseRent = countyRents[input.county].rent;
  const monthlyRent =
    input.use === "rental"
      ? input.rentOverride ?? baseRent
      : input.use === "multigen"
        ? Math.round(baseRent * 0.35) // imputed value / avoided housing cost
        : 0;

  const monthlyOpEx = input.use === "rental" ? Math.round(monthlyRent * 0.2) : 0;
  const monthlyNet = monthlyRent - monthlyOpEx;
  const annualNet = monthlyNet * 12;
  const breakEvenYears =
    annualNet > 0 ? Math.round((buildCost / annualNet) * 10) / 10 : 99;

  const cashFlow10: number[] = [];
  let cum = -buildCost;
  for (let y = 1; y <= 10; y++) {
    cum += annualNet;
    cashFlow10.push(Math.round(cum));
  }

  const valueAdd = Math.round(buildCost * (input.use === "rental" ? 0.7 : 0.6));

  return {
    buildCost,
    monthlyRent,
    monthlyOpEx,
    monthlyNet,
    annualNet,
    breakEvenYears,
    cashFlow10,
    valueAdd,
    planSlug: input.type === "detached" ? "cozy-craftsman-cottage" : undefined,
  };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Simplified ordinance status — maintain as CMS later */
export const townAduStatus: Record<
  string,
  { status: "permitted" | "conditional" | "restricted" | "check"; note: string }
> = {
  Warren: {
    status: "conditional",
    note: "Often possible with conditions — confirm with township before design.",
  },
  Watchung: {
    status: "conditional",
    note: "Site-specific review typical — Vantage can evaluate feasibility.",
  },
  "Basking Ridge": {
    status: "check",
    note: "Bernards Township rules apply — verify current ordinance.",
  },
  "Millburn–Short Hills": {
    status: "check",
    note: "Local review required — let’s evaluate your lot.",
  },
  Summit: { status: "conditional", note: "Conditional use patterns vary by lot." },
  Chatham: { status: "check", note: "Confirm current municipal standards." },
  Westfield: { status: "conditional", note: "Often feasible with proper approvals." },
};

export const aduFaqs = [
  {
    q: "How much does an ADU cost in New Jersey?",
    a: "Detached cottage-class ADUs can start in the mid–high $200ks depending on size and finishes (e.g., plans like the Cozy Craftsman). Garage or basement conversions are often lower. Always site-specific — use the calculator for a planning range.",
  },
  {
    q: "Can I build an ADU in my town?",
    a: "Rules vary by municipality. Use the town lookup as a starting point, then confirm with local code officials. Vantage Land Evaluation can help assess feasibility before design investment.",
  },
  {
    q: "How long until an ADU pays for itself?",
    a: "If rented at market rates, simple break-even often falls in a multi-year range depending on build cost and rent. The calculator shows an illustrative timeline — not a guarantee of returns.",
  },
  {
    q: "What types of ADUs do you build?",
    a: "Detached cottages, garage conversions, basement suites, and above-garage units — subject to zoning, structure, and access on your property.",
  },
  {
    q: "Do ADUs need separate utilities and permits?",
    a: "Most require building permits; utility and zoning requirements vary. We coordinate approvals and systems as part of the project.",
  },
  {
    q: "Is the ADU calculator a formal quote?",
    a: "No — it’s an educational payback and cost planning tool. Final pricing follows site evaluation, zoning review, and Design & Discovery.",
  },
  {
    q: "Can an ADU work for multi-generational living instead of rental?",
    a: "Yes. Many clients prioritize privacy for parents or adult children. The calculator can model guest/multi-gen use without rental income assumptions.",
  },
] as const;
