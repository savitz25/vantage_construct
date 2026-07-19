import type {
  AppliancePackageId,
  CounterMaterialId,
  CoverStructureId,
  FinishTier,
  FireFeatureId,
  FlooringId,
  KitchenConfigId,
  LightingId,
  OutdoorAmenityId,
  StyleId,
} from "./types";

export const kitchenConfigs: {
  id: KitchenConfigId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "No outdoor kitchen", blurb: "Lounge / fire focus", cost: 0 },
  { id: "compact", label: "Compact kitchen", blurb: "Grill + essential prep", cost: 18000 },
  { id: "full-linear", label: "Full linear run", blurb: "Long cooking wall", cost: 42000 },
  { id: "l-shape", label: "L-shape kitchen", blurb: "Corner cooking + bar", cost: 58000 },
  { id: "island", label: "Island-style kitchen", blurb: "Social cooking center", cost: 72000 },
];

export const appliancePackages: {
  id: AppliancePackageId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "essential-grill", label: "Essential grill", blurb: "Quality grill package", cost: 0 },
  {
    id: "entertainer",
    label: "Entertainer package",
    blurb: "Grill + side burners + fridge",
    cost: 12000,
  },
  {
    id: "chef-suite",
    label: "Chef suite",
    blurb: "Premium grill, pizza oven energy, full support",
    cost: 28000,
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
  { id: "quartz", label: "Outdoor quartz", blurb: "Refined, consistent surface", cost: 3500, color: "#e8e4de" },
  { id: "concrete", label: "Concrete", blurb: "Modern, monolithic", cost: 2000, color: "#9a9590" },
  { id: "porcelain", label: "Porcelain slab", blurb: "Ultra-durable luxury", cost: 5500, color: "#d8d0c4" },
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
  { id: "premium", label: "Premium", blurb: "Quality outdoor materials", mult: 1 },
  { id: "luxury", label: "Luxury", blurb: "Richer materials & lighting · +20%", mult: 1.2 },
  { id: "estate", label: "Estate", blurb: "Full resort package · +40%", mult: 1.4 },
];

export function getKitchen(id: KitchenConfigId) {
  return kitchenConfigs.find((k) => k.id === id) ?? kitchenConfigs[0];
}
export function getAppliances(id: AppliancePackageId) {
  return appliancePackages.find((a) => a.id === id) ?? appliancePackages[0];
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
