import type {
  BathOption,
  CeilingOption,
  DormerOption,
  FinishTier,
  SkylightOption,
  StorageOption,
} from "./types";

export const dormerOptions: {
  id: DormerOption;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "Existing roof volume", blurb: "Work with current geometry", cost: 0 },
  { id: "single", label: "Single dormer", blurb: "Light + headroom on one side", cost: 28000 },
  { id: "paired", label: "Paired dormers", blurb: "Balanced light and usable space", cost: 52000 },
  { id: "shed", label: "Shed dormer", blurb: "Major usable floor + ceiling lift", cost: 72000 },
];

export const bathOptions: {
  id: BathOption;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "No bath", blurb: "Dry space only", cost: 0 },
  { id: "half", label: "Half bath", blurb: "Powder for guests & teens", cost: 18000 },
  { id: "full", label: "Full spa bath", blurb: "Shower, vanity, tile package", cost: 42000 },
];

export const storageOptions: {
  id: StorageOption;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "basic", label: "Basic closets", blurb: "Simple storage", cost: 0 },
  { id: "kneewall", label: "Kneewall systems", blurb: "Smart use of eaves", cost: 6500 },
  { id: "window-seats", label: "Window seats", blurb: "Seating + storage combined", cost: 9500 },
  { id: "full-built-ins", label: "Full built-ins", blurb: "Library / desk / millwork", cost: 16000 },
];

export const skylightOptions: {
  id: SkylightOption;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "No skylights", blurb: "Windows / dormers only", cost: 0 },
  { id: "single", label: "One skylight", blurb: "Daylight from above", cost: 4500 },
  { id: "paired", label: "Paired skylights", blurb: "Even, gallery-like light", cost: 8500 },
];

export const ceilingOptions: {
  id: CeilingOption;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "finished-drywall", label: "Finished drywall", blurb: "Clean painted planes", cost: 0 },
  { id: "tray", label: "Tray detail", blurb: "Architectural ceiling volume", cost: 5500 },
  { id: "exposed-beams", label: "Exposed beams", blurb: "Structure as character", cost: 8000 },
];

export const finishTiers: {
  id: FinishTier;
  label: string;
  blurb: string;
  mult: number;
}[] = [
  { id: "premium", label: "Premium", blurb: "Refined everyday finishes", mult: 1 },
  { id: "luxury", label: "Luxury", blurb: "Elevated materials & fixtures", mult: 1.18 },
  { id: "estate", label: "Estate", blurb: "Top-tier millwork & baths", mult: 1.38 },
];

export function getDormer(id: DormerOption) {
  return dormerOptions.find((d) => d.id === id) ?? dormerOptions[0];
}
export function getBath(id: BathOption) {
  return bathOptions.find((b) => b.id === id) ?? bathOptions[0];
}
export function getStorage(id: StorageOption) {
  return storageOptions.find((s) => s.id === id) ?? storageOptions[0];
}
export function getSkylight(id: SkylightOption) {
  return skylightOptions.find((s) => s.id === id) ?? skylightOptions[0];
}
export function getCeiling(id: CeilingOption) {
  return ceilingOptions.find((c) => c.id === id) ?? ceilingOptions[0];
}
export function getFinish(id: FinishTier) {
  return finishTiers.find((f) => f.id === id) ?? finishTiers[0];
}
