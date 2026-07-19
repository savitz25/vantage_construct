export type BasementZoneId =
  | "theater"
  | "gym"
  | "bar"
  | "guest"
  | "office"
  | "play"
  | "wine"
  | "bath";

export type FinishTier = "premium" | "luxury" | "estate";

export const basementZones: {
  id: BasementZoneId;
  label: string;
  sqft: number;
  cost: Record<FinishTier, number>;
  color: string;
}[] = [
  {
    id: "theater",
    label: "Home theater",
    sqft: 220,
    cost: { premium: 42000, luxury: 58000, estate: 78000 },
    color: "#6b4c9a",
  },
  {
    id: "gym",
    label: "Gym / wellness",
    sqft: 180,
    cost: { premium: 28000, luxury: 38000, estate: 52000 },
    color: "#3d7a5a",
  },
  {
    id: "bar",
    label: "Wet bar",
    sqft: 120,
    cost: { premium: 32000, luxury: 48000, estate: 72000 },
    color: "#b8893d",
  },
  {
    id: "guest",
    label: "Guest suite",
    sqft: 280,
    cost: { premium: 55000, luxury: 78000, estate: 110000 },
    color: "#6b8f9a",
  },
  {
    id: "office",
    label: "Office",
    sqft: 140,
    cost: { premium: 22000, luxury: 32000, estate: 45000 },
    color: "#5c6b8a",
  },
  {
    id: "play",
    label: "Play / flex",
    sqft: 200,
    cost: { premium: 24000, luxury: 34000, estate: 48000 },
    color: "#c47a5a",
  },
  {
    id: "wine",
    label: "Wine room",
    sqft: 80,
    cost: { premium: 28000, luxury: 45000, estate: 70000 },
    color: "#8a3d4a",
  },
  {
    id: "bath",
    label: "Full bath",
    sqft: 60,
    cost: { premium: 25000, luxury: 38000, estate: 55000 },
    color: "#4a7a8a",
  },
];

export type BasementInputs = {
  footprint: number;
  lowCeiling: boolean;
  zones: BasementZoneId[];
  finish: FinishTier;
};

export type BasementResult = {
  usedSqft: number;
  remainingSqft: number;
  overCapacity: boolean;
  estimate: number;
  digOutNote: boolean;
  monthlyPayment: number;
  valueAdd: number;
  zoneBreakdown: { id: BasementZoneId; label: string; cost: number; sqft: number; color: string }[];
};

export function calculateBasement(input: BasementInputs): BasementResult {
  const shell = Math.round(input.footprint * (input.finish === "estate" ? 95 : input.finish === "luxury" ? 75 : 55));
  const zoneBreakdown = input.zones.map((id) => {
    const z = basementZones.find((x) => x.id === id)!;
    return {
      id,
      label: z.label,
      cost: z.cost[input.finish],
      sqft: z.sqft,
      color: z.color,
    };
  });
  const zonesCost = zoneBreakdown.reduce((s, z) => s + z.cost, 0);
  const usedSqft = zoneBreakdown.reduce((s, z) => s + z.sqft, 0);
  const estimate = shell + zonesCost + (input.lowCeiling ? 35000 : 0);
  const remainingSqft = input.footprint - usedSqft;

  return {
    usedSqft,
    remainingSqft,
    overCapacity: remainingSqft < 0,
    estimate,
    digOutNote: input.lowCeiling,
    monthlyPayment: Math.round((estimate * 0.069) / 12),
    valueAdd: Math.round(estimate * 0.65),
    zoneBreakdown,
  };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export const basementFaqs = [
  {
    q: "How much does a finished basement cost in NJ?",
    a: "Budgets vary widely by footprint, ceiling height, wet rooms, and finish tier. Use the builder for a planning range, then refine after a site walkthrough.",
  },
  {
    q: "What if my basement ceilings are low?",
    a: "Low ceilings may require a dig-out conversation. The tool flags this so expectations stay clear — a Vantage hallmark.",
  },
] as const;
