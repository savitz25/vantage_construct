import type { GarageSelections } from "./types";
import { getPurpose } from "./purposes";
import { calculateGarageEstimate, formatRange } from "./pricing";

/**
 * Curated starter packages — full selection bundles users can apply in one click.
 * Each is a complete GarageSelections (purpose + size + doors + living + amenities).
 */
export type GaragePreset = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  /** Short list of highlights shown under the card */
  highlights: string[];
  heroImage: string;
  selections: GarageSelections;
};

export const garagePresets: GaragePreset[] = [
  {
    id: "classic-private-garage",
    name: "Classic Private Garage",
    badge: "Most popular",
    tagline: "Refined 3-car garage that matches the main house",
    highlights: ["3-car", "Carriage doors", "Match main house", "Luxury finish"],
    heroImage: "/media/garages/luxury-garage.jpg",
    selections: {
      purposeId: "luxury-garage",
      bays: "three-car",
      door: "carriage",
      exterior: "match-main",
      livingAbove: "none",
      bath: "none",
      amenities: ["exterior-lighting"],
      finish: "luxury",
    },
  },
  {
    id: "collectors-garage",
    name: "Collector’s Garage",
    badge: "Enthusiast",
    tagline: "Oversized bays, full-view doors, climate + detailing",
    highlights: ["4-car / oversized", "Full-view glass", "Climate control", "Estate finish"],
    heroImage: "/media/garages/collectors-garage.jpg",
    selections: {
      purposeId: "collectors-garage",
      bays: "four-oversized",
      door: "full-view",
      exterior: "contemporary",
      livingAbove: "none",
      bath: "half",
      amenities: ["workshop", "climate-control", "ev-ready", "exterior-lighting"],
      finish: "estate",
    },
  },
  {
    id: "carriage-house-adu",
    name: "Carriage House ADU",
    badge: "Living above",
    tagline: "Garage below, full living suite above — estate classic",
    highlights: ["2-car", "Full living above", "Full bath", "Stone accents"],
    heroImage: "/media/garages/carriage-house.jpg",
    selections: {
      purposeId: "carriage-house",
      bays: "two-car",
      door: "carriage",
      exterior: "stone-accent",
      livingAbove: "full-living",
      bath: "full",
      amenities: ["exterior-lighting", "covered-entry", "climate-control"],
      finish: "luxury",
    },
  },
  {
    id: "workshop-studio",
    name: "Workshop Studio",
    badge: "Maker",
    tagline: "Park + work bay with loft storage and power",
    highlights: ["Single bay + workshop", "Storage loft", "Half bath", "Board & batten"],
    heroImage: "/media/garages/workshop-garage.jpg",
    selections: {
      purposeId: "workshop-garage",
      bays: "single-workshop",
      door: "solid-modern",
      exterior: "modern-farmhouse",
      livingAbove: "storage-loft",
      bath: "half",
      amenities: ["workshop", "storage-cabinets", "ev-ready"],
      finish: "premium",
    },
  },
  {
    id: "guest-cottage-adu",
    name: "Guest Cottage ADU",
    badge: "Multi-gen",
    tagline: "Residential accessory living with estate manners",
    highlights: ["Large suite", "Full bath", "Craftsman exterior", "Covered entry"],
    heroImage: "/media/garages/guest-adu.jpg",
    selections: {
      purposeId: "guest-adu",
      bays: "two-car",
      door: "wood-clad",
      exterior: "craftsman",
      livingAbove: "large-suite",
      bath: "full",
      amenities: ["climate-control", "covered-entry", "exterior-lighting"],
      finish: "luxury",
    },
  },
  {
    id: "poolside-pavilion",
    name: "Poolside Pavilion",
    badge: "Lifestyle",
    tagline: "Entertainment-ready pool house with glass and resort energy",
    highlights: ["Full-view doors", "Full bath", "Stone accents", "Estate finish"],
    heroImage: "/media/garages/pool-pavilion.jpg",
    selections: {
      purposeId: "pool-pavilion",
      bays: "two-car",
      door: "full-view",
      exterior: "stone-accent",
      livingAbove: "none",
      bath: "full",
      amenities: ["covered-entry", "exterior-lighting", "climate-control"],
      finish: "estate",
    },
  },
];

export function getPreset(id: string): GaragePreset | undefined {
  return garagePresets.find((p) => p.id === id);
}

/** Planning range label for a preset (for cards). */
export function presetRangeLabel(preset: GaragePreset): string {
  const est = calculateGarageEstimate(preset.selections);
  return formatRange(est.low, est.high);
}

export function purposeImage(purposeId: GarageSelections["purposeId"]): string {
  return getPurpose(purposeId).heroImage;
}
