import type {
  BathLayoutId,
  BathSurfaceId,
  BedWallId,
  CeilingId,
  ClosetConfigId,
  ClosetIslandId,
  ClosetMillworkId,
  FinishTier,
  OutdoorAccessId,
  ShowerId,
  SittingAreaId,
  SuiteAmenityId,
  TubId,
  VanityId,
} from "./types";

export const bedWalls: { id: BedWallId; label: string; blurb: string; cost: number }[] = [
  { id: "simple", label: "Simple elegant", blurb: "Calm wall plane", cost: 0 },
  { id: "upholstered", label: "Upholstered bed wall", blurb: "Soft, hotel energy", cost: 6500 },
  { id: "paneled", label: "Paneled wall", blurb: "Architectural millwork", cost: 9000 },
  { id: "fireplace-wall", label: "Fireplace feature wall", blurb: "Warm focal point", cost: 18000 },
];

export const sittingAreas: { id: SittingAreaId; label: string; blurb: string; cost: number }[] = [
  { id: "none", label: "No sitting area", blurb: "Bedroom focus", cost: 0 },
  { id: "sitting-nook", label: "Sitting nook", blurb: "Chairs + window light", cost: 4500 },
  { id: "fireplace-lounge", label: "Fireplace lounge", blurb: "True retreat zone", cost: 12000 },
];

export const ceilings: { id: CeilingId; label: string; blurb: string; cost: number }[] = [
  { id: "flat", label: "Flat ceiling", blurb: "Clean and quiet", cost: 0 },
  { id: "tray", label: "Tray ceiling", blurb: "Soft volume", cost: 5500 },
  { id: "coffered", label: "Coffered detail", blurb: "Classic luxury", cost: 11000 },
  { id: "beams", label: "Beams", blurb: "Warm organic character", cost: 8000 },
];

export const outdoorAccess: {
  id: OutdoorAccessId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "No outdoor access", blurb: "Interior suite only", cost: 0 },
  { id: "balcony", label: "Private balcony", blurb: "Morning coffee outside", cost: 22000 },
  { id: "terrace", label: "Private terrace", blurb: "True outdoor extension", cost: 45000 },
];

export const bathLayouts: { id: BathLayoutId; label: string; blurb: string; cost: number }[] = [
  {
    id: "freestanding-center",
    label: "Central freestanding tub",
    blurb: "Spa hero moment",
    cost: 8000,
  },
  { id: "wet-room", label: "Wet room", blurb: "Open shower + tub zone", cost: 14000 },
  {
    id: "separate-tub-shower",
    label: "Separate shower + tub",
    blurb: "Classic dual wet zones",
    cost: 10000,
  },
  { id: "shower-only", label: "Large shower only", blurb: "Streamlined luxury", cost: 0 },
];

export const tubs: { id: TubId; label: string; blurb: string; cost: number }[] = [
  { id: "none", label: "No tub", blurb: "Shower-focused", cost: 0 },
  { id: "freestanding", label: "Freestanding tub", blurb: "High emotional impact", cost: 6500 },
  { id: "built-in", label: "Built-in tub", blurb: "Classic surround", cost: 4000 },
];

export const showers: { id: ShowerId; label: string; blurb: string; cost: number }[] = [
  { id: "walk-in", label: "Large walk-in", blurb: "Spacious glass shower", cost: 0 },
  { id: "steam", label: "Steam shower", blurb: "True spa performance", cost: 12000 },
  { id: "wet-room", label: "Wet-room shower", blurb: "Open, curbless energy", cost: 5500 },
  {
    id: "rainfall-body",
    label: "Rainfall + body sprays",
    blurb: "Statement water experience",
    cost: 7500,
  },
];

export const vanities: { id: VanityId; label: string; blurb: string; cost: number }[] = [
  { id: "double-floating", label: "Double floating", blurb: "Modern, airy", cost: 0 },
  { id: "double-furniture", label: "Double furniture-style", blurb: "Classic luxury", cost: 4500 },
  { id: "double-makeup", label: "Double + makeup vanity", blurb: "Dressing convenience", cost: 8000 },
  { id: "single-luxe", label: "Single oversized luxe", blurb: "Statement single", cost: 2000 },
];

export const bathSurfaces: {
  id: BathSurfaceId;
  label: string;
  blurb: string;
  cost: number;
  color: string;
}[] = [
  { id: "marble", label: "Marble", blurb: "Timeless spa stone", cost: 9000, color: "#ececea" },
  { id: "quartz", label: "Quartz", blurb: "Refined & durable", cost: 0, color: "#f0ebe4" },
  { id: "porcelain", label: "Porcelain slab", blurb: "Large-format modern", cost: 5500, color: "#e0dcd6" },
  {
    id: "natural-stone",
    label: "Natural stone",
    blurb: "Organic texture",
    cost: 7000,
    color: "#c4b8a8",
  },
];

export const closets: { id: ClosetConfigId; label: string; blurb: string; cost: number }[] = [
  { id: "standard", label: "Standard walk-in", blurb: "Organized luxury", cost: 0 },
  { id: "large-dressing", label: "Large dressing room", blurb: "Boutique energy", cost: 18000 },
  { id: "his-hers", label: "His & hers", blurb: "Dual dressing zones", cost: 28000 },
];

export const closetIslands: {
  id: ClosetIslandId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "none", label: "No island", blurb: "Perimeter storage only", cost: 0 },
  { id: "center-island", label: "Center island", blurb: "Dressing + drawers", cost: 9500 },
];

export const closetMillwork: {
  id: ClosetMillworkId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "premium", label: "Premium systems", blurb: "High-quality organizers", cost: 0 },
  { id: "fully-custom", label: "Fully custom millwork", blurb: "Estate-level cabinetry", cost: 22000 },
];

export const suiteAmenities: {
  id: SuiteAmenityId;
  label: string;
  blurb: string;
  cost: number;
}[] = [
  { id: "heated-floors", label: "Heated floors", blurb: "Bath comfort essential", cost: 6500 },
  {
    id: "statement-lighting",
    label: "Statement lighting",
    blurb: "Chandelier / sculptural pendants",
    cost: 4500,
  },
  { id: "steam-package", label: "Steam package upgrade", blurb: "Full spa performance", cost: 8500 },
  {
    id: "curbless-shower",
    label: "Curbless shower",
    blurb: "Seamless wet-zone floor",
    cost: 4000,
  },
  {
    id: "closet-vanity",
    label: "Closet dressing table",
    blurb: "Vanity in dressing room",
    cost: 3500,
  },
  { id: "smart-shades", label: "Smart shades", blurb: "Privacy + morning light", cost: 5500 },
];

export const finishTiers: {
  id: FinishTier;
  label: string;
  blurb: string;
  mult: number;
}[] = [
  { id: "premium", label: "Premium", blurb: "Refined everyday luxury", mult: 1 },
  { id: "luxury", label: "Luxury", blurb: "Richer materials · +20%", mult: 1.2 },
  { id: "estate", label: "Estate", blurb: "Highest-end suite · +40%", mult: 1.4 },
];

export function getBedWall(id: BedWallId) {
  return bedWalls.find((b) => b.id === id) ?? bedWalls[0];
}
export function getSitting(id: SittingAreaId) {
  return sittingAreas.find((s) => s.id === id) ?? sittingAreas[0];
}
export function getCeiling(id: CeilingId) {
  return ceilings.find((c) => c.id === id) ?? ceilings[0];
}
export function getOutdoor(id: OutdoorAccessId) {
  return outdoorAccess.find((o) => o.id === id) ?? outdoorAccess[0];
}
export function getBathLayout(id: BathLayoutId) {
  return bathLayouts.find((b) => b.id === id) ?? bathLayouts[0];
}
export function getTub(id: TubId) {
  return tubs.find((t) => t.id === id) ?? tubs[0];
}
export function getShower(id: ShowerId) {
  return showers.find((s) => s.id === id) ?? showers[0];
}
export function getVanity(id: VanityId) {
  return vanities.find((v) => v.id === id) ?? vanities[0];
}
export function getBathSurface(id: BathSurfaceId) {
  return bathSurfaces.find((b) => b.id === id) ?? bathSurfaces[0];
}
export function getCloset(id: ClosetConfigId) {
  return closets.find((c) => c.id === id) ?? closets[0];
}
export function getClosetIsland(id: ClosetIslandId) {
  return closetIslands.find((c) => c.id === id) ?? closetIslands[0];
}
export function getClosetMillwork(id: ClosetMillworkId) {
  return closetMillwork.find((c) => c.id === id) ?? closetMillwork[0];
}
export function getAmenity(id: SuiteAmenityId) {
  return suiteAmenities.find((a) => a.id === id)!;
}
export function getFinish(id: FinishTier) {
  return finishTiers.find((f) => f.id === id) ?? finishTiers[0];
}
