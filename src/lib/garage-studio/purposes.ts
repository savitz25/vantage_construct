import type {
  BaySizeId,
  BathId,
  DoorStyleId,
  ExteriorId,
  FinishTier,
  GaragePurposeId,
  LivingAboveId,
  RoofStyleId,
  WorkshopId,
} from "./types";

export type GaragePurpose = {
  id: GaragePurposeId;
  name: string;
  lifestyleName: string;
  tagline: string;
  description: string;
  heroImage: string;
  wall: string;
  body: string;
  roof: string;
  baseBias: number;
  defaults: {
    bays: BaySizeId;
    door: DoorStyleId;
    exterior: ExteriorId;
    roof: RoofStyleId;
    livingAbove: LivingAboveId;
    bath: BathId;
    workshop: WorkshopId;
    finish: FinishTier;
  };
};

export const garagePurposes: GaragePurpose[] = [
  {
    id: "luxury-garage",
    name: "Luxury Garage",
    lifestyleName: "Private Garage",
    tagline: "Refined storage that belongs on the estate",
    description:
      "A purpose-built multi-bay garage with architectural detailing, lighting, and finishes worthy of the main house.",
    heroImage: "/media/garages/luxury-garage.jpg",
    wall: "#e8e2d8",
    body: "#d4cfc7",
    roof: "#4a4540",
    baseBias: 0,
    defaults: {
      bays: "three-car",
      door: "carriage",
      exterior: "match-main",
      roof: "gable",
      livingAbove: "none",
      bath: "none",
      workshop: "none",
      finish: "luxury",
    },
  },
  {
    id: "collectors-garage",
    name: "Collector’s Garage",
    lifestyleName: "Collector’s Pavilion",
    tagline: "Oversized bays for the cars that matter",
    description:
      "Climate-aware volume, full-view doors, and detailing space for a serious collection — still elegant from the curb.",
    heroImage: "/media/garages/collectors-garage.jpg",
    wall: "#e0dcd6",
    body: "#3a3a3a",
    roof: "#2a2a2a",
    baseBias: 22000,
    defaults: {
      bays: "oversized",
      door: "full-view",
      exterior: "modern-stucco",
      roof: "hip",
      livingAbove: "none",
      bath: "half",
      workshop: "detailing-bay",
      finish: "estate",
    },
  },
  {
    id: "workshop-garage",
    name: "Workshop + Garage",
    lifestyleName: "Maker’s Garage",
    tagline: "Power, storage, and a proper work bay",
    description:
      "Cars plus craft — durable floors, serious electrical, and a workshop zone that doesn’t look like a shed.",
    heroImage: "/media/garages/workshop-garage.jpg",
    wall: "#ebe5db",
    body: "#8b7355",
    roof: "#5c5348",
    baseBias: 8000,
    defaults: {
      bays: "three-car",
      door: "carriage",
      exterior: "board-batten",
      roof: "gable",
      livingAbove: "loft-storage",
      bath: "half",
      workshop: "bay-workshop",
      finish: "premium",
    },
  },
  {
    id: "creative-studio",
    name: "Studio / Creative Space",
    lifestyleName: "Creative Outbuilding",
    tagline: "Daylight, quiet, and room to make",
    description:
      "Art, music, or craft — an intentional studio building with light, insulation, and architecture that elevates the property.",
    heroImage: "/media/garages/creative-studio.jpg",
    wall: "#f0ebe3",
    body: "#c9b898",
    roof: "#6b5344",
    baseBias: 5000,
    defaults: {
      bays: "two-car",
      door: "modern-glass",
      exterior: "board-batten",
      roof: "shed-modern",
      livingAbove: "none",
      bath: "half",
      workshop: "none",
      finish: "luxury",
    },
  },
  {
    id: "carriage-house",
    name: "Carriage House",
    lifestyleName: "Carriage House",
    tagline: "Garage below, living above — estate classic",
    description:
      "The ultimate accessory structure: refined vehicle storage with a full upper living program when zoning allows.",
    heroImage: "/media/garages/carriage-house.jpg",
    wall: "#e8e2d8",
    body: "#d8cfc4",
    roof: "#4a4540",
    baseBias: 45000,
    defaults: {
      bays: "two-car",
      door: "carriage",
      exterior: "stone-accent",
      roof: "gable",
      livingAbove: "full-suite",
      bath: "full",
      workshop: "none",
      finish: "luxury",
    },
  },
  {
    id: "guest-adu",
    name: "Guest Suite / ADU",
    lifestyleName: "Accessory Living",
    tagline: "Independent living with estate manners",
    description:
      "A freestanding guest suite or accessory dwelling — multi-gen, rental potential, or private hospitality.",
    heroImage: "/media/garages/guest-adu.jpg",
    wall: "#f2ebe0",
    body: "#e8dfd0",
    roof: "#5c5348",
    baseBias: 55000,
    defaults: {
      bays: "two-car",
      door: "wood-clad",
      exterior: "match-main",
      roof: "gable",
      livingAbove: "full-suite",
      bath: "full",
      workshop: "none",
      finish: "luxury",
    },
  },
  {
    id: "pool-pavilion",
    name: "Pool House / Pavilion",
    lifestyleName: "Entertainment Pavilion",
    tagline: "Resort energy steps from the water",
    description:
      "Changing rooms, wet bar potential, outdoor entertaining support — architecture that completes the outdoor estate.",
    heroImage: "/media/garages/pool-pavilion.jpg",
    wall: "#e8f0f4",
    body: "#f8fafb",
    roof: "#6b8f9a",
    baseBias: 15000,
    defaults: {
      bays: "two-car",
      door: "modern-glass",
      exterior: "stone-accent",
      roof: "hip",
      livingAbove: "none",
      bath: "full",
      workshop: "none",
      finish: "estate",
    },
  },
  {
    id: "mixed-use",
    name: "Mixed-Use Accessory",
    lifestyleName: "Mixed-Use Outbuilding",
    tagline: "Garage, work, and life in one structure",
    description:
      "Combine vehicle storage, workshop, and living or loft space into one intentional building on the property.",
    heroImage: "/media/garages/mixed-use.jpg",
    wall: "#ebe6dc",
    body: "#c4b49a",
    roof: "#4a4540",
    baseBias: 28000,
    defaults: {
      bays: "three-car",
      door: "carriage",
      exterior: "match-main",
      roof: "gable",
      livingAbove: "loft-storage",
      bath: "half",
      workshop: "bay-workshop",
      finish: "luxury",
    },
  },
];

export function getPurpose(id: GaragePurposeId): GaragePurpose {
  return garagePurposes.find((p) => p.id === id) ?? garagePurposes[0];
}
