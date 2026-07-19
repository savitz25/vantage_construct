import type {
  ArchStyle,
  ExteriorPalette,
  FinishLevel,
  LifestyleAddon,
  LotStatus,
  Priority,
  RoofType,
  SizeBand,
  Timeline,
} from "./types";

export const lotOptions: {
  id: NonNullable<LotStatus>;
  label: string;
  description: string;
}[] = [
  {
    id: "owns",
    label: "Yes — I own a lot",
    description: "We'll factor land evaluation and site realities into Design & Discovery.",
  },
  {
    id: "looking",
    label: "I'm actively looking",
    description: "We can help evaluate sites across Central & Northern New Jersey.",
  },
  {
    id: "not-yet",
    label: "Not yet",
    description: "Perfect — design first, then we'll discuss land strategy together.",
  },
];

export const timelineOptions: {
  id: NonNullable<Timeline>;
  label: string;
}[] = [
  { id: "0-6", label: "Within 6 months" },
  { id: "6-12", label: "6–12 months" },
  { id: "12-plus", label: "12+ months" },
  { id: "exploring", label: "Just exploring" },
];

export const sizeOptions: {
  id: NonNullable<SizeBand>;
  label: string;
  rangeLabel: string;
  anchor: string;
  description: string;
  examplePlans: string[];
}[] = [
  {
    id: "under-2000",
    label: "Under 2,000 sq ft",
    rangeLabel: "From ~$275k – $650k*",
    anchor: "Cozy cottages to efficient family homes",
    description: "Ideal for ADUs, lock-and-leave living, or refined smaller footprints.",
    examplePlans: ["cozy-craftsman-cottage", "cypress-hollow-farmhouse", "modern-homestead"],
  },
  {
    id: "2000-3000",
    label: "2,000 – 3,000 sq ft",
    rangeLabel: "From ~$600k – $950k+*",
    anchor: "Most popular family custom range",
    description: "Open living, main-floor primary options, and flexible bonus spaces.",
    examplePlans: ["emerald-cottage", "millbrook-manor", "grand-vista"],
  },
  {
    id: "over-3000",
    label: "Over 3,000 sq ft / Estate",
    rangeLabel: "From ~$850k – $2M+*",
    anchor: "Estate-scale luxury living",
    description: "Grand entertaining, multi-suite layouts, and elevated outdoor living.",
    examplePlans: ["bridgewater-manor", "chateau-royale", "grand-alpine"],
  },
];

export const styleOptions: {
  id: NonNullable<ArchStyle>;
  label: string;
  lifestyle: string;
  gradient: string;
}[] = [
  {
    id: "modern-farmhouse",
    label: "Modern Farmhouse",
    lifestyle: "Board-and-batten charm, covered porches, and bright open interiors.",
    gradient: "from-[#e8dcc6] via-[#d9c7a8] to-[#c4ad88]",
  },
  {
    id: "craftsman",
    label: "Craftsman",
    lifestyle: "Timber details, welcoming porches, and handcrafted character.",
    gradient: "from-[#d7c4a8] via-[#c4ab88] to-[#a88b66]",
  },
  {
    id: "contemporary",
    label: "Contemporary / Modern Homestead",
    lifestyle: "Clean lines, generous glass, and effortless indoor-outdoor flow.",
    gradient: "from-[#d8dde3] via-[#c5ccd4] to-[#a8b0ba]",
  },
  {
    id: "traditional",
    label: "Traditional / Classic",
    lifestyle: "Timeless proportions, elegant elevations, and enduring curb appeal.",
    gradient: "from-[#e6ddd2] via-[#d2c4b4] to-[#b8a48e]",
  },
  {
    id: "barndominium",
    label: "Barndominium-inspired",
    lifestyle: "Dramatic volumes, flexible living, and distinctive barn aesthetics.",
    gradient: "from-[#cfc6b8] via-[#b5a894] to-[#8f816c]",
  },
];

export const roofOptions: {
  id: NonNullable<RoofType>;
  label: string;
  description: string;
}[] = [
  {
    id: "architectural-shingle",
    label: "Architectural shingle",
    description: "Dimensional shingles for classic luxury curb appeal.",
  },
  {
    id: "standing-seam",
    label: "Standing seam metal",
    description: "Crisp modern lines with lasting performance.",
  },
  {
    id: "slate-inspired",
    label: "Slate-inspired",
    description: "Estate presence with refined texture and depth.",
  },
];

export const exteriorPalettes: {
  id: NonNullable<ExteriorPalette>;
  label: string;
  description: string;
  swatches: string[];
}[] = [
  {
    id: "warm-neutrals",
    label: "Warm Neutrals",
    description: "Soft greige, ivory, and natural wood accents.",
    swatches: ["#f5efe6", "#d8cbb8", "#b5a18a", "#8c7660"],
  },
  {
    id: "charcoal-ivory",
    label: "Bold Contrast",
    description: "Charcoal body with ivory trim and gold-warm lighting.",
    swatches: ["#2b2b2b", "#f7f2ea", "#6b6b6b", "#c9a04e"],
  },
  {
    id: "earth-tones",
    label: "Earth Tones",
    description: "Clay, sage, and stone-inspired warmth.",
    swatches: ["#c4a484", "#8a9a7b", "#6f5b4a", "#e7d7c3"],
  },
  {
    id: "classic-bw",
    label: "Classic Black & White",
    description: "Crisp monochrome with architectural clarity.",
    swatches: ["#111111", "#f8f6f2", "#d0d0d0", "#4a4a4a"],
  },
  {
    id: "stone-accents",
    label: "Stone Accents",
    description: "Natural stone bases with refined siding above.",
    swatches: ["#9a8f84", "#d9d0c4", "#6e645a", "#efe8dc"],
  },
];

export const finishLevels: {
  id: NonNullable<FinishLevel>;
  label: string;
  description: string;
  includes: string[];
}[] = [
  {
    id: "premium",
    label: "Premium",
    description: "Elevated standard finishes with quality materials throughout.",
    includes: ["Solid surface counters", "Designer fixtures", "Hardwood living areas", "Refined tile baths"],
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Higher-end materials and feature details for daily indulgence.",
    includes: ["Quartz or premium stone", "Spa-inspired baths", "Statement lighting", "Custom millwork accents"],
  },
  {
    id: "estate",
    label: "Estate",
    description: "Top-tier selections for fully bespoke luxury expression.",
    includes: ["Ultra-premium surfaces", "Bespoke cabinetry", "Architectural lighting", "Concierge-level details"],
  },
];

export const priorityOptions: {
  id: Priority;
  label: string;
}[] = [
  { id: "main-floor-primary", label: "Main-floor primary suite" },
  { id: "open-concept", label: "Open-concept living" },
  { id: "high-ceilings", label: "High / vaulted ceilings" },
  { id: "chefs-kitchen", label: "Chef’s kitchen emphasis" },
  { id: "home-office", label: "Dedicated home office" },
  { id: "multi-gen", label: "Multi-generational flexibility" },
];

export const lifestyleOptions: {
  id: LifestyleAddon;
  label: string;
  description: string;
}[] = [
  {
    id: "finished-basement",
    label: "Finished basement",
    description: "Theater, guest suite, gym, or entertainment level.",
  },
  {
    id: "outdoor-living",
    label: "Outdoor living / kitchen",
    description: "Outdoor kitchen, fireplace, and resort-style entertaining.",
  },
  {
    id: "deck",
    label: "Deck / multi-level outdoor",
    description: "Custom decks and layered outdoor living spaces.",
  },
  {
    id: "adu",
    label: "ADU or guest suite",
    description: "Private quarters for guests, family, or flexibility.",
  },
  {
    id: "garage-workshop",
    label: "3-car+ garage / workshop",
    description: "Expanded garage capacity and workshop potential.",
  },
  {
    id: "sunroom",
    label: "Sunroom / expanded porch",
    description: "Year-round light-filled outdoor-connected rooms.",
  },
  {
    id: "other",
    label: "Other",
    description: "Tell us what else belongs in your vision.",
  },
];

export const studioEstimateDisclaimer =
  "Conceptual starting range based on current plans and selections. Final investment is determined during Design & Discovery after evaluating your specific lot, detailed plans, and current material & labor costs. We believe in complete transparency — no surprises.";

export const studioFaqs = [
  {
    q: "Is this a final quote?",
    a: "No. The Design Studio produces a conceptual starting range only. Your final investment is determined during Design & Discovery after evaluating your lot, detailed plans, selections, and current material and labor costs.",
  },
  {
    q: "Does the estimate include land?",
    a: "No. Land, sitework, permits, and utility connections are separate and vary by location. We discuss those transparently in consultation.",
  },
  {
    q: "Can I change my mind later?",
    a: "Absolutely. This tool helps organize preferences. Your complimentary consultation and the full 7-step process refine every decision with no surprises.",
  },
  {
    q: "How does this connect to building with Vantage?",
    a: "Your Vision Summary becomes the starting brief for Victor and the team — so your first conversation is informed, efficient, and aligned with your goals.",
  },
] as const;
