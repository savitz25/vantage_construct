import type {
  BacksplashId,
  CabinetToneId,
  CounterId,
  HardwareId,
  IslandId,
} from "./types";

export const countertops: {
  id: CounterId;
  label: string;
  swatch: string;
  /** Secondary veining / grain */
  pattern?: string;
  cost: number;
}[] = [
  {
    id: "quartz-calacatta",
    label: "Calacatta Quartz",
    swatch: "#f5f2ec",
    pattern: "#d8d0c4",
    cost: 0,
  },
  {
    id: "marble-carrara",
    label: "Carrara Marble",
    swatch: "#ececea",
    pattern: "#c8c8c4",
    cost: 4500,
  },
  {
    id: "soapstone",
    label: "Soapstone",
    swatch: "#4a5254",
    pattern: "#3a4244",
    cost: 3500,
  },
  {
    id: "porcelain-slab",
    label: "Porcelain Slab",
    swatch: "#e8e4de",
    pattern: "#d0cbc3",
    cost: 5500,
  },
  {
    id: "walnut-butcher",
    label: "Walnut Butcher Block",
    swatch: "#6b4423",
    pattern: "#5a381c",
    cost: -2000,
  },
  {
    id: "quartzite",
    label: "Natural Quartzite",
    swatch: "#e6e2da",
    pattern: "#b8b0a4",
    cost: 7000,
  },
];

export const backsplashes: {
  id: BacksplashId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "full-slab", label: "Full-height slab", blurb: "Counter material continues to cabinets", cost: 8000 },
  { id: "subway", label: "Classic subway", blurb: "Timeless ceramic grid", cost: 0 },
  { id: "zellige", label: "Zellige tile", blurb: "Handmade glaze variation", cost: 4500 },
  { id: "painted", label: "Painted wall", blurb: "Clean and architectural", cost: -2500 },
  { id: "herringbone", label: "Herringbone marble", blurb: "Elevated tile geometry", cost: 5500 },
];

export const islands: {
  id: IslandId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "standard", label: "Standard island", blurb: "Prep-focused island", cost: 0 },
  {
    id: "oversized-seating",
    label: "Oversized + seating",
    blurb: "Entertaining overhang & stools",
    cost: 12000,
  },
  {
    id: "waterfall",
    label: "Waterfall edges",
    blurb: "Stone drops on both ends",
    cost: 9000,
  },
  { id: "none", label: "No island", blurb: "Galley or perimeter-only plan", cost: -18000 },
];

export const hardwareFinishes: {
  id: HardwareId;
  label: string;
  metal: string;
  cost: number;
}[] = [
  { id: "brass", label: "Unlacquered brass", metal: "#b8893d", cost: 0 },
  { id: "matte-black", label: "Matte black", metal: "#1a1a1a", cost: 0 },
  { id: "chrome", label: "Polished chrome", metal: "#c0c0c0", cost: 0 },
  { id: "polished-nickel", label: "Polished nickel", metal: "#d4d0c8", cost: 800 },
  { id: "bronze", label: "Oil-rubbed bronze", metal: "#5c4033", cost: 600 },
];

export const cabinetTones: {
  id: CabinetToneId;
  label: string;
  color: string | null;
  cost: number;
}[] = [
  { id: "style-default", label: "Style default", color: null, cost: 0 },
  { id: "painted-white", label: "Painted white", color: "#f7f4ef", cost: 0 },
  { id: "warm-oak", label: "Warm white oak", color: "#c9a882", cost: 4000 },
  { id: "walnut", label: "Walnut", color: "#5c4033", cost: 6500 },
  { id: "deep-green", label: "Deep forest green", color: "#2f4a3a", cost: 3500 },
  { id: "charcoal", label: "Charcoal", color: "#2a2a2a", cost: 2500 },
];

export function getCounter(id: CounterId) {
  return countertops.find((c) => c.id === id) ?? countertops[0];
}
export function getBacksplash(id: BacksplashId) {
  return backsplashes.find((b) => b.id === id) ?? backsplashes[0];
}
export function getIsland(id: IslandId) {
  return islands.find((i) => i.id === id) ?? islands[0];
}
export function getHardware(id: HardwareId) {
  return hardwareFinishes.find((h) => h.id === id) ?? hardwareFinishes[0];
}
export function getCabinetTone(id: CabinetToneId) {
  return cabinetTones.find((c) => c.id === id) ?? cabinetTones[0];
}
