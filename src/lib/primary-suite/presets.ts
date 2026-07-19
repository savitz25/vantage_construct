import type { SuiteSelections } from "./types";
import { calculateSuiteEstimate, formatRange } from "./pricing";

export type SuitePreset = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  highlights: string[];
  heroImage: string;
  selections: SuiteSelections;
};

export const suitePresets: SuitePreset[] = [
  {
    id: "spa-owners-suite",
    name: "Spa Owner’s Suite",
    badge: "Most popular",
    tagline: "Freestanding tub, steam shower, heated floors, dressing island",
    highlights: ["Steam shower", "Freestanding tub", "Heated floors", "Closet island"],
    heroImage: "/media/primary-suite/spa-retreat.jpg",
    selections: {
      visionId: "spa-retreat",
      bedWall: "upholstered",
      sitting: "sitting-nook",
      ceiling: "tray",
      outdoorAccess: "balcony",
      bathLayout: "freestanding-center",
      tub: "freestanding",
      shower: "steam",
      vanity: "double-floating",
      bathSurface: "marble",
      closet: "large-dressing",
      closetIsland: "center-island",
      closetMillwork: "premium",
      amenities: ["heated-floors", "steam-package", "curbless-shower", "statement-lighting"],
      finish: "luxury",
    },
  },
  {
    id: "minimal-sanctuary",
    name: "Minimal Sanctuary",
    badge: "Calm",
    tagline: "Large walk-in shower, floating vanities, uncluttered bedroom",
    highlights: ["Shower only", "Floating vanities", "Curbless", "Smart shades"],
    heroImage: "/media/primary-suite/modern-minimal.jpg",
    selections: {
      visionId: "modern-minimal",
      bedWall: "simple",
      sitting: "none",
      ceiling: "flat",
      outdoorAccess: "none",
      bathLayout: "shower-only",
      tub: "none",
      shower: "walk-in",
      vanity: "double-floating",
      bathSurface: "porcelain",
      closet: "standard",
      closetIsland: "none",
      closetMillwork: "premium",
      amenities: ["curbless-shower", "smart-shades"],
      finish: "luxury",
    },
  },
  {
    id: "estate-dressing",
    name: "Estate Dressing Suite",
    badge: "Closet",
    tagline: "His & hers dressing with custom millwork and fireplace lounge",
    highlights: ["His & hers", "Custom millwork", "Fireplace wall", "Estate finish"],
    heroImage: "/media/primary-suite/dramatic-moody.jpg",
    selections: {
      visionId: "dramatic-moody",
      bedWall: "fireplace-wall",
      sitting: "fireplace-lounge",
      ceiling: "tray",
      outdoorAccess: "none",
      bathLayout: "freestanding-center",
      tub: "freestanding",
      shower: "rainfall-body",
      vanity: "double-floating",
      bathSurface: "porcelain",
      closet: "his-hers",
      closetIsland: "center-island",
      closetMillwork: "fully-custom",
      amenities: ["statement-lighting", "heated-floors", "closet-vanity"],
      finish: "estate",
    },
  },
  {
    id: "resort-terrace",
    name: "Resort Terrace Suite",
    badge: "Outdoor",
    tagline: "Light spa bath with private terrace access",
    highlights: ["Private terrace", "Makeup vanity", "Freestanding tub", "Dressing island"],
    heroImage: "/media/primary-suite/light-resort.jpg",
    selections: {
      visionId: "light-resort",
      bedWall: "upholstered",
      sitting: "sitting-nook",
      ceiling: "tray",
      outdoorAccess: "terrace",
      bathLayout: "separate-tub-shower",
      tub: "freestanding",
      shower: "walk-in",
      vanity: "double-makeup",
      bathSurface: "quartz",
      closet: "large-dressing",
      closetIsland: "center-island",
      closetMillwork: "premium",
      amenities: ["heated-floors", "statement-lighting", "closet-vanity"],
      finish: "luxury",
    },
  },
  {
    id: "classic-heirloom",
    name: "Classic Heirloom Suite",
    badge: "Traditional",
    tagline: "Paneled walls, furniture vanity, fully custom dressing",
    highlights: ["Paneled bed wall", "Furniture vanity", "Coffered ceiling", "Custom closet"],
    heroImage: "/media/primary-suite/traditional-luxury.jpg",
    selections: {
      visionId: "traditional-luxury",
      bedWall: "paneled",
      sitting: "fireplace-lounge",
      ceiling: "coffered",
      outdoorAccess: "balcony",
      bathLayout: "separate-tub-shower",
      tub: "built-in",
      shower: "walk-in",
      vanity: "double-furniture",
      bathSurface: "marble",
      closet: "his-hers",
      closetIsland: "center-island",
      closetMillwork: "fully-custom",
      amenities: ["heated-floors", "statement-lighting", "closet-vanity", "smart-shades"],
      finish: "estate",
    },
  },
];

export function presetRangeLabel(preset: SuitePreset): string {
  const est = calculateSuiteEstimate(preset.selections);
  return formatRange(est.low, est.high);
}
