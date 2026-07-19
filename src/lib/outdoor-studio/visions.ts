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
  OutdoorVisionId,
  StyleId,
} from "./types";

export type OutdoorVision = {
  id: OutdoorVisionId;
  name: string;
  lifestyleName: string;
  tagline: string;
  description: string;
  heroImage: string;
  sky: string;
  ground: string;
  accent: string;
  baseBias: number;
  defaults: {
    kitchen: KitchenConfigId;
    appliances: AppliancePackageId;
    counter: CounterMaterialId;
    cover: CoverStructureId;
    fire: FireFeatureId;
    style: StyleId;
    flooring: FlooringId;
    lighting: LightingId;
    amenities: OutdoorAmenityId[];
    finish: FinishTier;
  };
};

export const outdoorVisions: OutdoorVision[] = [
  {
    id: "outdoor-kitchen",
    name: "Outdoor Kitchen Focused",
    lifestyleName: "Culinary Courtyard",
    tagline: "Grill, prep, and host without leaving the backyard",
    description:
      "A serious outdoor kitchen as the hero — with seating, cover options, and finishes that feel like a true extension of the home.",
    heroImage: "/media/outdoor/outdoor-kitchen.jpg",
    sky: "#f0c9a0",
    ground: "#8b7355",
    accent: "#b8893d",
    baseBias: 12000,
    defaults: {
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
    id: "covered-lounge",
    name: "Covered Living & Lounge",
    lifestyleName: "Pavilion Lounge",
    tagline: "Shade, soft seating, and evenings that last longer",
    description:
      "A covered outdoor living room with lounge furniture energy, ceiling fans, and light that makes the space feel intentional after dark.",
    heroImage: "/media/outdoor/covered-lounge.jpg",
    sky: "#e8d4b8",
    ground: "#9a8570",
    accent: "#6b5344",
    baseBias: 8000,
    defaults: {
      kitchen: "compact",
      appliances: "essential-grill",
      counter: "quartz",
      cover: "pavilion",
      fire: "linear-modern",
      style: "transitional",
      flooring: "wood-look",
      lighting: "layered",
      amenities: ["lounge-seating", "ceiling-fans", "heaters"],
      finish: "luxury",
    },
  },
  {
    id: "fire-conversation",
    name: "Fire & Conversation",
    lifestyleName: "Fireside Circle",
    tagline: "The magnet that holds every gathering after dark",
    description:
      "Fire as the centerpiece — pit or fireplace — with conversation seating and soft landscape lighting.",
    heroImage: "/media/outdoor/fire-conversation.jpg",
    sky: "#c4a88a",
    ground: "#6b5344",
    accent: "#c45c4a",
    baseBias: 0,
    defaults: {
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
    id: "full-resort",
    name: "Full Resort-Style Backyard",
    lifestyleName: "Private Resort",
    tagline: "Kitchen, cover, fire, and lounge — the complete outdoor estate",
    description:
      "The full program: outdoor kitchen, covered living, fire, and layered lighting for true resort evenings at home.",
    heroImage: "/media/outdoor/full-resort.jpg",
    sky: "#f2c9a0",
    ground: "#8b7355",
    accent: "#b8893d",
    baseBias: 35000,
    defaults: {
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
    id: "poolside",
    name: "Poolside Living",
    lifestyleName: "Poolside Room",
    tagline: "Shade, seating, and entertaining steps from the water",
    description:
      "Pool-adjacent living with covered lounge energy, optional kitchen, and materials that handle wet feet and sun.",
    heroImage: "/media/outdoor/poolside.jpg",
    sky: "#b8d4e8",
    ground: "#c4b49a",
    accent: "#3d7a9a",
    baseBias: 10000,
    defaults: {
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
    id: "courtyard-dining",
    name: "Intimate Courtyard / Dining",
    lifestyleName: "Courtyard Table",
    tagline: "Dinner under the stars — or under a soft pergola",
    description:
      "A dining-first outdoor room with intimate scale, privacy, and just enough kitchen support for real meals outdoors.",
    heroImage: "/media/outdoor/courtyard-dining.jpg",
    sky: "#e8c8a8",
    ground: "#9a8068",
    accent: "#8f6a28",
    baseBias: -2000,
    defaults: {
      kitchen: "compact",
      appliances: "essential-grill",
      counter: "granite",
      cover: "pergola",
      fire: "none",
      style: "mediterranean",
      flooring: "natural-stone",
      lighting: "subtle",
      amenities: ["dining-zone", "privacy-screen"],
      finish: "premium",
    },
  },
  {
    id: "entertainment-pavilion",
    name: "Entertainment Pavilion",
    lifestyleName: "Entertainment Pavilion",
    tagline: "Fully covered hosting with kitchen and bar energy",
    description:
      "A true outdoor pavilion — covered structure, kitchen or bar, fire optional, and lighting built for parties.",
    heroImage: "/media/outdoor/entertainment-pavilion.jpg",
    sky: "#d4b898",
    ground: "#7a6550",
    accent: "#b8893d",
    baseBias: 18000,
    defaults: {
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

export function getVision(id: OutdoorVisionId): OutdoorVision {
  return outdoorVisions.find((v) => v.id === id) ?? outdoorVisions[0];
}
