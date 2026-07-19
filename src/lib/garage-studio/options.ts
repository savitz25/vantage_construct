import type {
  AmenityId,
  BaySizeId,
  BathId,
  DoorStyleId,
  ExteriorId,
  FinishTier,
  LivingAboveId,
} from "./types";

/** Priority 2 — Size & configuration */
export const baySizes: {
  id: BaySizeId;
  label: string;
  blurb: string;
  cost: number;
  /** Visual door count */
  doorCount: number;
  wide: boolean;
  deep: boolean;
  asymmetric: boolean;
}[] = [
  {
    id: "two-car",
    label: "2-car",
    blurb: "Standard double-wide",
    cost: 0,
    doorCount: 2,
    wide: false,
    deep: false,
    asymmetric: false,
  },
  {
    id: "three-car",
    label: "3-car",
    blurb: "Noticeably wider building",
    cost: 35000,
    doorCount: 3,
    wide: false,
    deep: false,
    asymmetric: false,
  },
  {
    id: "four-oversized",
    label: "4-car / oversized",
    blurb: "Much wider, more imposing",
    cost: 85000,
    doorCount: 4,
    wide: true,
    deep: false,
    asymmetric: false,
  },
  {
    id: "single-workshop",
    label: "Single bay + workshop",
    blurb: "Asymmetric work + park composition",
    cost: 28000,
    doorCount: 1,
    wide: false,
    deep: false,
    asymmetric: true,
  },
  {
    id: "deep-rv",
    label: "Deep bay / RV-capable",
    blurb: "Longer footprint for boat or RV",
    cost: 72000,
    doorCount: 2,
    wide: false,
    deep: true,
    asymmetric: false,
  },
];

/** Priority 3 — Garage door style (high visual impact) */
export const doorStyles: {
  id: DoorStyleId;
  label: string;
  blurb: string;
  cost: number;
  color: string;
}[] = [
  {
    id: "carriage",
    label: "Traditional carriage",
    blurb: "Classic divided doors, warmer look",
    cost: 8000,
    color: "#6b5344",
  },
  {
    id: "full-view",
    label: "Modern full-view / glass",
    blurb: "Contemporary, transparent presence",
    cost: 18000,
    color: "#a8b8c8",
  },
  {
    id: "solid-modern",
    label: "Solid modern panel",
    blurb: "Clean, minimal luxury",
    cost: 10000,
    color: "#3a3a3a",
  },
  {
    id: "wood-clad",
    label: "Wood / wood-look",
    blurb: "Rich traditional or modern farmhouse",
    cost: 14000,
    color: "#8b6914",
  },
  {
    id: "mixed-glass-solid",
    label: "Mixed glass + solid",
    blurb: "Balanced, interesting composition",
    cost: 15000,
    color: "#5c6570",
  },
];

/** Priority 4 — Exterior style & materials */
export const exteriors: {
  id: ExteriorId;
  label: string;
  blurb: string;
  cost: number;
  body: string;
  trim: string;
  stoneBase: boolean;
  fullStone: boolean;
  craftsman: boolean;
}[] = [
  {
    id: "match-main",
    label: "Match main house",
    blurb: "Same siding, trim, and color language",
    cost: 0,
    body: "#d4cfc7",
    trim: "#f5f0e8",
    stoneBase: false,
    fullStone: false,
    craftsman: false,
  },
  {
    id: "modern-farmhouse",
    label: "Modern farmhouse",
    blurb: "Board & batten, contrasting trim",
    cost: 6000,
    body: "#e8e2d6",
    trim: "#2a2a2a",
    stoneBase: false,
    fullStone: false,
    craftsman: false,
  },
  {
    id: "contemporary",
    label: "Contemporary",
    blurb: "Clean lines, darker or mixed materials",
    cost: 10000,
    body: "#4a4a4a",
    trim: "#1a1a1a",
    stoneBase: false,
    fullStone: false,
    craftsman: false,
  },
  {
    id: "craftsman",
    label: "Craftsman / traditional",
    blurb: "Heavier trim, brackets, warmer details",
    cost: 12000,
    body: "#c9b898",
    trim: "#f0ebe4",
    stoneBase: false,
    fullStone: false,
    craftsman: true,
  },
  {
    id: "stone-accent",
    label: "Stone or brick accents",
    blurb: "Texture and weight on base or corners",
    cost: 22000,
    body: "#d8d0c4",
    trim: "#f5f0e8",
    stoneBase: true,
    fullStone: false,
    craftsman: false,
  },
  {
    id: "full-stone",
    label: "Full stone / premium cladding",
    blurb: "Substantial, high-end presence",
    cost: 48000,
    body: "#8a8278",
    trim: "#e8e2d8",
    stoneBase: true,
    fullStone: true,
    craftsman: false,
  },
];

/** Priority 5 — Living space above (major driver) */
export const livingAbove: {
  id: LivingAboveId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  {
    id: "none",
    label: "None (single story)",
    blurb: "Standard garage proportions",
    cost: 0,
  },
  {
    id: "storage-loft",
    label: "Storage loft only",
    blurb: "Higher roof, minimal upper windows",
    cost: 28000,
  },
  {
    id: "full-living",
    label: "Full living / ADU",
    blurb: "Clear second story, residential windows",
    cost: 95000,
  },
  {
    id: "large-suite",
    label: "Large living suite",
    blurb: "Substantial second floor, residential character",
    cost: 145000,
  },
];

/** Priority 6 — Bathrooms */
export const baths: { id: BathId; label: string; blurb: string; cost: number }[] = [
  { id: "none", label: "No bath", blurb: "Dry building", cost: 0 },
  { id: "half", label: "Half bath / powder", blurb: "Smaller residential cue", cost: 14000 },
  { id: "full", label: "Full bathroom", blurb: "Residential window + plumbing", cost: 32000 },
];

/** Priority 6 — Key amenities (multi-select) */
export const amenities: {
  id: AmenityId;
  label: string;
  blurb: string;
  cost: number;
  group: "function" | "systems" | "exterior";
}[] = [
  {
    id: "workshop",
    label: "Workshop area",
    blurb: "Work windows + side door",
    cost: 18000,
    group: "function",
  },
  {
    id: "storage-cabinets",
    label: "Built-in storage",
    blurb: "Cabinetry package cue",
    cost: 8500,
    group: "function",
  },
  {
    id: "climate-control",
    label: "Climate control package",
    blurb: "Insulation + conditioned space",
    cost: 16000,
    group: "systems",
  },
  {
    id: "ev-ready",
    label: "EV charging ready",
    blurb: "Wall unit / electrical prep",
    cost: 3500,
    group: "systems",
  },
  {
    id: "exterior-lighting",
    label: "Exterior lighting package",
    blurb: "Sconces & architectural light",
    cost: 4500,
    group: "exterior",
  },
  {
    id: "covered-entry",
    label: "Covered entry / porch",
    blurb: "Roofed entry presence",
    cost: 12000,
    group: "exterior",
  },
];

/** Priority 7 — Finish level (global multiplier) */
export const finishTiers: {
  id: FinishTier;
  label: string;
  blurb: string;
  mult: number;
}[] = [
  { id: "premium", label: "Premium", blurb: "Good quality materials · base", mult: 1 },
  {
    id: "luxury",
    label: "Luxury",
    blurb: "Richer materials & detailing · +15–25%",
    mult: 1.2,
  },
  {
    id: "estate",
    label: "Estate",
    blurb: "Highest-end materials & presence · +30–50%+",
    mult: 1.4,
  },
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
export function getLiving(id: LivingAboveId) {
  return livingAbove.find((l) => l.id === id) ?? livingAbove[0];
}
export function getBath(id: BathId) {
  return baths.find((b) => b.id === id) ?? baths[0];
}
export function getAmenity(id: AmenityId) {
  return amenities.find((a) => a.id === id)!;
}
export function getFinish(id: FinishTier) {
  return finishTiers.find((f) => f.id === id) ?? finishTiers[0];
}
