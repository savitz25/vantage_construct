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
    q: "How much does a finished basement cost in New Jersey?",
    a: "Most planning ranges fall from the mid–five figures into the mid–six figures depending on size, wet rooms, finish tier, and suite scope. The Basement Builder above gives an instant personalized range — then we refine after a site walkthrough.",
  },
  {
    q: "What if my basement ceilings are low?",
    a: "Many NJ basements finish beautifully at existing height with smart lighting and layout. If height is genuinely tight, we’ll discuss dig-out options honestly — including when it is (and isn’t) worth the investment. The tool’s low-ceiling flag keeps expectations clear.",
  },
  {
    q: "Do I need permits to finish a basement in NJ?",
    a: "Yes. Framing, electrical, plumbing, and HVAC typically require municipal permits and inspections. Unpermitted work can create problems at resale and with insurance. Vantage manages the permitting process.",
  },
  {
    q: "Can you add a bathroom or bedroom below grade?",
    a: "Yes — full baths are among our most-requested features. Sleeping areas require code-compliant egress (window or walkout), which we design in from day one.",
  },
  {
    q: "What if my basement has had water issues?",
    a: "Tell us everything, then let us evaluate. We address causes — grading, drainage, systems — before finishing, and we build with moisture-appropriate detailing. We won’t finish over a known problem.",
  },
  {
    q: "How long does a basement remodel take?",
    a: "Often several weeks to a few months of construction once permits are in hand, depending on scope. You’ll get a written timeline before work begins.",
  },
  {
    q: "Does a finished basement add value?",
    a: "In North Jersey luxury markets, buyers increasingly expect finished lower levels. Industry studies show meaningful recoup at resale — and it’s some of the most efficient square footage you can add because the structure already exists.",
  },
  {
    q: "Is the Basement Builder estimate a quote?",
    a: "No — it’s a planning tool for education and budgeting. Final pricing follows site evaluation, moisture review, and Design & Discovery. Use it to shape your vision, then book a consultation to get project-specific numbers.",
  },
] as const;
