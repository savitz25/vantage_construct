import type {
  BaySizeId,
  BathId,
  DoorStyleId,
  ExteriorId,
  FinishTier,
  LivingAboveId,
  RoofStyleId,
  WorkshopId,
} from "./types";

export const baySizes: { id: BaySizeId; label: string; blurb: string; cost: number }[] = [
  { id: "two-car", label: "2-car", blurb: "Classic dual bay", cost: 0 },
  { id: "three-car", label: "3-car", blurb: "Family + guest capacity", cost: 35000 },
  { id: "four-car", label: "4-car", blurb: "Expanded estate garage", cost: 70000 },
  { id: "oversized", label: "Oversized bays", blurb: "Collector depth & height", cost: 95000 },
];

export const doorStyles: { id: DoorStyleId; label: string; blurb: string; cost: number; color: string }[] = [
  { id: "carriage", label: "Carriage doors", blurb: "Classic estate look", cost: 0, color: "#6b5344" },
  { id: "modern-glass", label: "Modern glass", blurb: "Contemporary panels", cost: 12000, color: "#8a9aaa" },
  { id: "full-view", label: "Full-view aluminum", blurb: "Show the collection", cost: 18000, color: "#c0c8d0" },
  { id: "wood-clad", label: "Wood-clad", blurb: "Warm architectural face", cost: 14000, color: "#8b6914" },
];

export const exteriors: { id: ExteriorId; label: string; blurb: string; cost: number; body: string }[] = [
  { id: "match-main", label: "Match main house", blurb: "Seamless architecture", cost: 0, body: "#d4cfc7" },
  { id: "stone-accent", label: "Stone accents", blurb: "Masonry base or veneers", cost: 22000, body: "#9a9088" },
  { id: "board-batten", label: "Board & batten", blurb: "Farmhouse / modern rustic", cost: 4000, body: "#c9b898" },
  { id: "modern-stucco", label: "Modern stucco", blurb: "Clean contemporary massing", cost: 6000, body: "#e8e4de" },
];

export const roofStyles: { id: RoofStyleId; label: string; blurb: string; cost: number }[] = [
  { id: "gable", label: "Gable", blurb: "Timeless roof form", cost: 0 },
  { id: "hip", label: "Hip", blurb: "Refined four-sided pitch", cost: 8000 },
  { id: "shed-modern", label: "Modern shed", blurb: "Single-slope contemporary", cost: 5000 },
];

export const livingAbove: { id: LivingAboveId; label: string; blurb: string; cost: number }[] = [
  { id: "none", label: "Single story", blurb: "Garage / studio only", cost: 0 },
  { id: "loft-storage", label: "Loft / storage", blurb: "Upper storage or flex", cost: 28000 },
  { id: "full-suite", label: "Full living above", blurb: "Carriage suite / ADU program", cost: 95000 },
];

export const baths: { id: BathId; label: string; blurb: string; cost: number }[] = [
  { id: "none", label: "No bath", blurb: "Dry building", cost: 0 },
  { id: "half", label: "Half bath", blurb: "Powder for guests & shop", cost: 14000 },
  { id: "full", label: "Full bath", blurb: "Shower for suite / pool house", cost: 32000 },
];

export const workshops: { id: WorkshopId; label: string; blurb: string; cost: number }[] = [
  { id: "none", label: "No workshop", blurb: "Parking / living focus", cost: 0 },
  { id: "bay-workshop", label: "Workshop bay", blurb: "Power + work zone", cost: 18000 },
  { id: "detailing-bay", label: "Detailing bay", blurb: "Collector prep space", cost: 24000 },
];

export const finishTiers: { id: FinishTier; label: string; blurb: string; mult: number }[] = [
  { id: "premium", label: "Premium", blurb: "Refined everyday finishes", mult: 1 },
  { id: "luxury", label: "Luxury", blurb: "Elevated materials & doors", mult: 1.2 },
  { id: "estate", label: "Estate", blurb: "Top-tier architecture package", mult: 1.42 },
];

export function getBay(id: BaySizeId) {
  return baySizes.find((b) => b.id === id) ?? baySizes[0];
}
export function getDoor(id: DoorStyleId) {
  return doorStyles.find((d) => d.id === id) ?? doorStyles[0];
}
export function getExterior(id: ExteriorId) {
  return exteriors.find((e) => e.id === id) ?? exteriors[0];
}
export function getRoof(id: RoofStyleId) {
  return roofStyles.find((r) => r.id === id) ?? roofStyles[0];
}
export function getLiving(id: LivingAboveId) {
  return livingAbove.find((l) => l.id === id) ?? livingAbove[0];
}
export function getBath(id: BathId) {
  return baths.find((b) => b.id === id) ?? baths[0];
}
export function getWorkshop(id: WorkshopId) {
  return workshops.find((w) => w.id === id) ?? workshops[0];
}
export function getFinish(id: FinishTier) {
  return finishTiers.find((f) => f.id === id) ?? finishTiers[0];
}
