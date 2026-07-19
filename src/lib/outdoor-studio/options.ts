import type {
  CounterMaterialId,
  CoverStructureId,
  FinishTier,
  FireFeatureId,
  FlooringId,
  GrillTypeId,
  KitchenLevelId,
  KitchenUpgradeId,
  LightingId,
  OutdoorAmenityId,
  StyleId,
} from "./types";

/** Primary kitchen level — keeps UX manageable */
export const kitchenLevels: {
  id: KitchenLevelId;
  label: string;
  blurb: string;
  cost: number;
  /** Default upgrades baked into this package (shown as included) */
  includes: string[];
  /** Layout hint for scene */
  layout: "none" | "compact" | "linear" | "l-shape" | "island";
}[] = [
  {
    id: "none",
    label: "No outdoor kitchen",
    blurb: "Lounge / fire focus only",
    cost: 0,
    includes: [],
    layout: "none",
  },
  {
    id: "essential-grill",
    label: "Essential Grill Station",
    blurb: "Premium built-in grill + basic cabinetry",
    cost: 22000,
    includes: ["36–42\" gas grill", "Basic base cabinets"],
    layout: "compact",
  },
  {
    id: "full-kitchen",
    label: "Full Outdoor Kitchen",
    blurb: "Linear cooking run with prep space",
    cost: 48000,
    includes: ["Premium grill", "Side burners", "Prep counter", "Cabinetry"],
    layout: "linear",
  },
  {
    id: "entertainer",
    label: "Entertainer’s Kitchen",
    blurb: "Host-ready with cold storage & sink",
    cost: 72000,
    includes: ["Premium grill", "Side burners", "Refrigerator", "Sink", "Bar-friendly layout"],
    layout: "l-shape",
  },
  {
    id: "chef-resort",
    label: "Chef’s Resort Kitchen",
    blurb: "Island or full suite for serious cooking",
    cost: 110000,
    includes: ["Large-format grill energy", "Power burner", "Fridge + ice", "Sink", "Island option"],
    layout: "island",
  },
];

/** Grill size / type — only when kitchen is present */
export const grillTypes: {
  id: GrillTypeId;
  label: string;
  blurb: string;
  cost: number;
  visual: "standard" | "large" | "dual" | "flattop" | "kamado" | "infrared";
}[] = [
  {
    id: "premium-36-42",
    label: "Premium grill 36–42\"",
    blurb: "Core of most outdoor kitchens",
    cost: 0,
    visual: "standard",
  },
  {
    id: "large-48",
    label: "Large format 48\"+",
    blurb: "Statement cooking surface",
    cost: 6500,
    visual: "large",
  },
  {
    id: "dual-grill",
    label: "Dual grill setup",
    blurb: "For serious entertainers",
    cost: 14000,
    visual: "dual",
  },
  {
    id: "flattop",
    label: "Flat-top / griddle focus",
    blurb: "Very popular for gatherings",
    cost: 4500,
    visual: "flattop",
  },
  {
    id: "kamado",
    label: "Kamado / ceramic integration",
    blurb: "Lifestyle statement cooker",
    cost: 5500,
    visual: "kamado",
  },
  {
    id: "infrared-hybrid",
    label: "Infrared / hybrid grill",
    blurb: "Performance-focused searing",
    cost: 5000,
    visual: "infrared",
  },
];

/** Individual upgrades — multi-select */
export const kitchenUpgrades: {
  id: KitchenUpgradeId;
  label: string;
  blurb: string;
  cost: number;
  category: "cooking" | "cold" | "prep" | "specialty";
  visualImpact: "low" | "medium" | "high" | "very-high";
}[] = [
  // Cooking add-ons
  {
    id: "side-burners",
    label: "Side burners",
    blurb: "Single or double functional add-on",
    cost: 2500,
    category: "cooking",
    visualImpact: "medium",
  },
  {
    id: "power-burner",
    label: "Power burner (high BTU)",
    blurb: "Wok / large-pot power",
    cost: 3500,
    category: "cooking",
    visualImpact: "medium",
  },
  {
    id: "griddle",
    label: "Add griddle / flat-top module",
    blurb: "Breakfast & smash-burger ready",
    cost: 4000,
    category: "cooking",
    visualImpact: "high",
  },
  // Cold storage
  {
    id: "refrigerator",
    label: "Outdoor refrigerator",
    blurb: "Essential for full kitchens",
    cost: 4500,
    category: "cold",
    visualImpact: "medium",
  },
  {
    id: "beverage-center",
    label: "Dual-zone beverage / wine",
    blurb: "Strong luxury signal",
    cost: 6500,
    category: "cold",
    visualImpact: "high",
  },
  {
    id: "freezer-drawer",
    label: "Outdoor freezer drawer",
    blurb: "Clean undercounter look",
    cost: 4000,
    category: "cold",
    visualImpact: "medium",
  },
  {
    id: "ice-maker",
    label: "Ice maker",
    blurb: "Highly desired for entertaining",
    cost: 3800,
    category: "cold",
    visualImpact: "medium",
  },
  {
    id: "kegerator",
    label: "Undercounter kegerator",
    blurb: "For serious hosts",
    cost: 5500,
    category: "cold",
    visualImpact: "medium",
  },
  // Prep
  {
    id: "sink",
    label: "Sink + faucet",
    blurb: "Makes it a real kitchen",
    cost: 3200,
    category: "prep",
    visualImpact: "medium",
  },
  {
    id: "prep-sink",
    label: "Secondary prep sink",
    blurb: "Larger layouts",
    cost: 2200,
    category: "prep",
    visualImpact: "medium",
  },
  {
    id: "warming-drawer",
    label: "Warming drawer",
    blurb: "Nice luxury touch",
    cost: 2800,
    category: "prep",
    visualImpact: "medium",
  },
  // Specialty wow
  {
    id: "pizza-oven",
    label: "Built-in pizza oven",
    blurb: "Top “wow” request",
    cost: 12000,
    category: "specialty",
    visualImpact: "very-high",
  },
  {
    id: "coffee-station",
    label: "Coffee / espresso station",
    blurb: "Fun luxury option",
    cost: 4500,
    category: "specialty",
    visualImpact: "high",
  },
];

export const counters: {
  id: CounterMaterialId;
  label: string;
  blurb: string;
  cost: number;
  color: string;
}[] = [
  { id: "granite", label: "Granite", blurb: "Classic outdoor stone", cost: 0, color: "#6b6560" },
  {
    id: "quartz",
    label: "Outdoor quartz",
    blurb: "Refined, consistent surface",
    cost: 3500,
    color: "#e8e4de",
  },
  { id: "concrete", label: "Concrete", blurb: "Modern, monolithic", cost: 2000, color: "#9a9590" },
  {
    id: "porcelain",
    label: "Porcelain slab",
    blurb: "Ultra-durable luxury",
    cost: 5500,
    color: "#d8d0c4",
  },
];

export const covers: {
  id: CoverStructureId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "open-patio", label: "Open patio", blurb: "No roof structure", cost: 0 },
  { id: "pergola", label: "Pergola", blurb: "Filtered shade & structure", cost: 22000 },
  { id: "pavilion", label: "Pavilion / full cover", blurb: "True outdoor room", cost: 55000 },
  { id: "screened", label: "Screened pavilion", blurb: "Cover + insect protection", cost: 68000 },
];

export const fireFeatures: {
  id: FireFeatureId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "No fire feature", blurb: "Daytime / kitchen focus", cost: 0 },
  { id: "linear-modern", label: "Linear modern fire", blurb: "Sleek gas ribbon", cost: 12000 },
  {
    id: "traditional-fireplace",
    label: "Traditional fireplace",
    blurb: "Masonry fireplace wall",
    cost: 28000,
  },
  { id: "fire-pit", label: "Fire pit", blurb: "Gas or wood circle", cost: 8000 },
  {
    id: "fire-seating",
    label: "Fire + seating combo",
    blurb: "Pit integrated with lounge",
    cost: 16000,
  },
];

export const styles: { id: StyleId; label: string; blurb: string; cost: number }[] = [
  { id: "modern-farmhouse", label: "Modern farmhouse", blurb: "Warm, welcoming", cost: 0 },
  { id: "contemporary", label: "Contemporary", blurb: "Clean, architectural", cost: 4000 },
  { id: "resort-modern", label: "Resort modern", blurb: "Vacation-at-home energy", cost: 6000 },
  { id: "transitional", label: "Transitional", blurb: "Timeless balance", cost: 2000 },
  { id: "mediterranean", label: "Mediterranean-inspired", blurb: "Texture & warmth", cost: 5000 },
];

export const floorings: {
  id: FlooringId;
  label: string;
  blurb: string;
  cost: number;
  color: string;
}[] = [
  {
    id: "porcelain-pavers",
    label: "Porcelain pavers",
    blurb: "Durable, refined",
    cost: 0,
    color: "#c4b8a8",
  },
  {
    id: "natural-stone",
    label: "Natural stone",
    blurb: "Organic texture",
    cost: 8000,
    color: "#a89880",
  },
  {
    id: "wood-look",
    label: "Wood-look decking",
    blurb: "Warm underfoot",
    cost: 6000,
    color: "#8b6914",
  },
  {
    id: "travertine",
    label: "Travertine",
    blurb: "Classic resort stone",
    cost: 10000,
    color: "#d8c8a8",
  },
];

export const lighting: {
  id: LightingId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "subtle", label: "Subtle", blurb: "Soft path & accents", cost: 0 },
  { id: "layered", label: "Layered", blurb: "Sconces, pendants, under-counter", cost: 5500 },
  { id: "dramatic", label: "Dramatic", blurb: "Evening architecture", cost: 12000 },
];

export const outdoorAmenities: {
  id: OutdoorAmenityId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "dining-zone", label: "Dining area", blurb: "Table seating zone", cost: 4000 },
  { id: "lounge-seating", label: "Lounge seating", blurb: "Soft conversation grouping", cost: 6000 },
  { id: "bar-seating", label: "Bar / counter seating", blurb: "Stools at the kitchen", cost: 3500 },
  { id: "heaters", label: "Outdoor heaters", blurb: "Shoulder-season comfort", cost: 4500 },
  { id: "ceiling-fans", label: "Ceiling fans", blurb: "Air under cover", cost: 2500 },
  { id: "audio", label: "Built-in audio", blurb: "Hidden speakers package", cost: 5500 },
  { id: "privacy-screen", label: "Privacy screening", blurb: "Screens / planting cues", cost: 7000 },
  {
    id: "pool-connection",
    label: "Pool connection",
    blurb: "Visual link to pool edge",
    cost: 3000,
  },
];

export const finishTiers: {
  id: FinishTier;
  label: string;
  blurb: string;
  mult: number;
}[] = [
  {
    id: "premium",
    label: "Premium",
    blurb: "Quality cabinetry & counters",
    mult: 1,
  },
  {
    id: "luxury",
    label: "Luxury",
    blurb: "Richer cabinetry & surfaces · +20%",
    mult: 1.2,
  },
  {
    id: "estate",
    label: "Estate",
    blurb: "Highest-end kitchen finishes · +40%",
    mult: 1.4,
  },
];

export function getKitchenLevel(id: KitchenLevelId) {
  return kitchenLevels.find((k) => k.id === id) ?? kitchenLevels[0];
}
export function getGrillType(id: GrillTypeId) {
  return grillTypes.find((g) => g.id === id) ?? grillTypes[0];
}
export function getKitchenUpgrade(id: KitchenUpgradeId) {
  return kitchenUpgrades.find((u) => u.id === id)!;
}
export function getCounter(id: CounterMaterialId) {
  return counters.find((c) => c.id === id) ?? counters[0];
}
export function getCover(id: CoverStructureId) {
  return covers.find((c) => c.id === id) ?? covers[0];
}
export function getFire(id: FireFeatureId) {
  return fireFeatures.find((f) => f.id === id) ?? fireFeatures[0];
}
export function getStyle(id: StyleId) {
  return styles.find((s) => s.id === id) ?? styles[0];
}
export function getFlooring(id: FlooringId) {
  return floorings.find((f) => f.id === id) ?? floorings[0];
}
export function getLighting(id: LightingId) {
  return lighting.find((l) => l.id === id) ?? lighting[0];
}
export function getAmenity(id: OutdoorAmenityId) {
  return outdoorAmenities.find((a) => a.id === id)!;
}
export function getFinish(id: FinishTier) {
  return finishTiers.find((f) => f.id === id) ?? finishTiers[0];
}

/** Package already implies some upgrades — avoid double-charging if selected */
export const packageImpliedUpgrades: Record<KitchenLevelId, KitchenUpgradeId[]> = {
  none: [],
  "essential-grill": [],
  "full-kitchen": ["side-burners"],
  entertainer: ["side-burners", "refrigerator", "sink"],
  "chef-resort": ["side-burners", "power-burner", "refrigerator", "ice-maker", "sink"],
};
