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
    id: "essential-grill-station",
    name: "Essential Grill Station",
    badge: "Simple",
    tagline: "Premium built-in grill under a pergola — clean and focused",
    highlights: ["Essential package", "36–42\" grill", "Pergola", "Dining zone"],
    heroImage: "/media/outdoor/outdoor-kitchen.webp",
    selections: {
      visionId: "outdoor-kitchen",
      kitchenLevel: "essential-grill",
      grillType: "premium-36-42",
      kitchenUpgrades: [],
      counter: "granite",
      cover: "pergola",
      fire: "none",
      style: "modern-farmhouse",
      flooring: "porcelain-pavers",
      lighting: "subtle",
      amenities: ["dining-zone"],
      finish: "premium",
    },
  },
  {
    id: "entertainers-kitchen",
    name: "Entertainer’s Kitchen",
    badge: "Most popular",
    tagline: "Full kitchen with fridge, sink, and bar seating",
    highlights: ["Entertainer package", "Refrigerator", "Sink", "Bar seating"],
    heroImage: "/media/outdoor/outdoor-kitchen.webp",
    selections: {
      visionId: "outdoor-kitchen",
      kitchenLevel: "entertainer",
      grillType: "premium-36-42",
      kitchenUpgrades: ["side-burners", "ice-maker"],
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
    id: "chefs-resort",
    name: "Chef’s Resort Kitchen",
    badge: "Wow",
    tagline: "Island-scale suite with pizza oven and beverage center",
    highlights: ["Chef’s package", "48\"+ grill", "Pizza oven", "Beverage center"],
    heroImage: "/media/outdoor/entertainment-pavilion.jpg",
    selections: {
      visionId: "entertainment-pavilion",
      kitchenLevel: "chef-resort",
      grillType: "large-48",
      kitchenUpgrades: ["pizza-oven", "beverage-center", "power-burner"],
      counter: "porcelain",
      cover: "pavilion",
      fire: "linear-modern",
      style: "resort-modern",
      flooring: "porcelain-pavers",
      lighting: "dramatic",
      amenities: ["bar-seating", "lounge-seating", "audio"],
      finish: "estate",
    },
  },
  {
    id: "fireside-lounge",
    name: "Fireside Lounge",
    badge: "Evenings",
    tagline: "Fire + seating as the magnet for after-dark gatherings",
    highlights: ["Fire + seating", "Lounge zone", "Subtle lighting", "Privacy"],
    heroImage: "/media/outdoor/fire-conversation.webp",
    selections: {
      visionId: "fire-conversation",
      kitchenLevel: "none",
      grillType: "premium-36-42",
      kitchenUpgrades: [],
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
    tagline: "Chef kitchen, pavilion, fireplace, dramatic light",
    highlights: ["Chef’s kitchen", "Dual grill", "Pavilion", "Fireplace"],
    heroImage: "/media/outdoor/full-resort.webp",
    selections: {
      visionId: "full-resort",
      kitchenLevel: "chef-resort",
      grillType: "dual-grill",
      kitchenUpgrades: ["pizza-oven", "beverage-center", "ice-maker", "kegerator"],
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
    tagline: "Entertainer kitchen by the water with ice maker",
    highlights: ["Entertainer kitchen", "Ice maker", "Pergola", "Pool link"],
    heroImage: "/media/outdoor/poolside.jpg",
    selections: {
      visionId: "poolside",
      kitchenLevel: "entertainer",
      grillType: "flattop",
      kitchenUpgrades: ["ice-maker", "beverage-center"],
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
];

export function presetRangeLabel(preset: OutdoorPreset): string {
  const est = calculateOutdoorEstimate(preset.selections);
  return formatRange(est.low, est.high);
}
