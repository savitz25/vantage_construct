import type { OutdoorSelections } from "./types";
import { calculateOutdoorEstimate, formatRange } from "./pricing";

export type OutdoorPreset = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  highlights: string[];
  heroImage: string;
  selections: OutdoorSelections;
};

export const outdoorPresets: OutdoorPreset[] = [
  {
    id: "entertainers-kitchen",
    name: "Entertainer’s Kitchen",
    badge: "Most popular",
    tagline: "Full outdoor kitchen under a pergola with bar seating",
    highlights: ["Full linear kitchen", "Entertainer appliances", "Pergola", "Bar seating"],
    heroImage: "/media/outdoor/outdoor-kitchen.jpg",
    selections: {
      visionId: "outdoor-kitchen",
      kitchen: "full-linear",
      appliances: "entertainer",
      counter: "granite",
      cover: "pergola",
      fire: "none",
      style: "modern-farmhouse",
      flooring: "porcelain-pavers",
      lighting: "layered",
      amenities: ["bar-seating", "dining-zone"],
      finish: "luxury",
    },
  },
  {
    id: "fireside-lounge",
    name: "Fireside Lounge",
    badge: "Evenings",
    tagline: "Fire + seating as the magnet for after-dark gatherings",
    highlights: ["Fire + seating", "Lounge zone", "Subtle lighting", "Privacy"],
    heroImage: "/media/outdoor/fire-conversation.jpg",
    selections: {
      visionId: "fire-conversation",
      kitchen: "none",
      appliances: "essential-grill",
      counter: "concrete",
      cover: "open-patio",
      fire: "fire-seating",
      style: "contemporary",
      flooring: "natural-stone",
      lighting: "subtle",
      amenities: ["lounge-seating", "privacy-screen"],
      finish: "premium",
    },
  },
  {
    id: "resort-backyard",
    name: "Private Resort Backyard",
    badge: "Estate",
    tagline: "Kitchen, pavilion, fireplace, and dramatic evening light",
    highlights: ["L-shape kitchen", "Chef suite", "Pavilion", "Fireplace"],
    heroImage: "/media/outdoor/full-resort.jpg",
    selections: {
      visionId: "full-resort",
      kitchen: "l-shape",
      appliances: "chef-suite",
      counter: "porcelain",
      cover: "pavilion",
      fire: "traditional-fireplace",
      style: "resort-modern",
      flooring: "porcelain-pavers",
      lighting: "dramatic",
      amenities: ["lounge-seating", "dining-zone", "bar-seating", "heaters", "audio", "ceiling-fans"],
      finish: "estate",
    },
  },
  {
    id: "poolside-escape",
    name: "Poolside Escape",
    badge: "Pool",
    tagline: "Covered lounge energy steps from the water",
    highlights: ["Compact kitchen", "Pergola", "Fire pit", "Pool connection"],
    heroImage: "/media/outdoor/poolside.jpg",
    selections: {
      visionId: "poolside",
      kitchen: "compact",
      appliances: "entertainer",
      counter: "porcelain",
      cover: "pergola",
      fire: "fire-pit",
      style: "resort-modern",
      flooring: "travertine",
      lighting: "layered",
      amenities: ["lounge-seating", "pool-connection", "ceiling-fans"],
      finish: "luxury",
    },
  },
  {
    id: "pavilion-party",
    name: "Pavilion Party Room",
    badge: "Hosting",
    tagline: "Island kitchen under full cover with bar and audio",
    highlights: ["Island kitchen", "Pavilion", "Linear fire", "Built-in audio"],
    heroImage: "/media/outdoor/entertainment-pavilion.jpg",
    selections: {
      visionId: "entertainment-pavilion",
      kitchen: "island",
      appliances: "chef-suite",
      counter: "quartz",
      cover: "pavilion",
      fire: "linear-modern",
      style: "contemporary",
      flooring: "porcelain-pavers",
      lighting: "dramatic",
      amenities: ["bar-seating", "lounge-seating", "audio", "heaters"],
      finish: "estate",
    },
  },
];

export function presetRangeLabel(preset: OutdoorPreset): string {
  const est = calculateOutdoorEstimate(preset.selections);
  return formatRange(est.low, est.high);
}
