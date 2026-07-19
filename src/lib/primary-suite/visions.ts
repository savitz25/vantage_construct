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
  SuiteVisionId,
  TubId,
  VanityId,
} from "./types";

export type SuiteVision = {
  id: SuiteVisionId;
  name: string;
  lifestyleName: string;
  tagline: string;
  description: string;
  heroImage: string;
  wall: string;
  floor: string;
  accent: string;
  baseBias: number;
  defaults: {
    bedWall: BedWallId;
    sitting: SittingAreaId;
    ceiling: CeilingId;
    outdoorAccess: OutdoorAccessId;
    bathLayout: BathLayoutId;
    tub: TubId;
    shower: ShowerId;
    vanity: VanityId;
    bathSurface: BathSurfaceId;
    closet: ClosetConfigId;
    closetIsland: ClosetIslandId;
    closetMillwork: ClosetMillworkId;
    amenities: SuiteAmenityId[];
    finish: FinishTier;
  };
};

export const suiteVisions: SuiteVision[] = [
  {
    id: "spa-retreat",
    name: "Spa Retreat",
    lifestyleName: "Private Spa Sanctuary",
    tagline: "Steam, freestanding tub, and calm materials",
    description:
      "A spa-forward suite where the bathroom is the emotional centerpiece — freestanding tub, steam shower, heated floors.",
    heroImage: "/media/primary-suite/spa-retreat.jpg",
    wall: "#f0ebe4",
    floor: "#d8cfc4",
    accent: "#8f6a28",
    baseBias: 15000,
    defaults: {
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
    id: "modern-minimal",
    name: "Modern Minimalist Sanctuary",
    lifestyleName: "Quiet Modern Suite",
    tagline: "Clean lines, large shower, uncluttered calm",
    description:
      "Restraint as luxury — large walk-in shower, floating vanities, and a serene bedroom plane.",
    heroImage: "/media/primary-suite/modern-minimal.jpg",
    wall: "#e8e6e3",
    floor: "#c4c0b8",
    accent: "#4a4a4a",
    baseBias: 5000,
    defaults: {
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
    id: "classic-elegant",
    name: "Classic Elegant Suite",
    lifestyleName: "Timeless Owner’s Suite",
    tagline: "Paneled walls, furniture vanity, refined proportions",
    description:
      "Enduring elegance — paneled bed wall, separate tub and shower, furniture-style vanity.",
    heroImage: "/media/primary-suite/classic-elegant.jpg",
    wall: "#f5f0e8",
    floor: "#b8956c",
    accent: "#b8893d",
    baseBias: 10000,
    defaults: {
      bedWall: "paneled",
      sitting: "sitting-nook",
      ceiling: "coffered",
      outdoorAccess: "none",
      bathLayout: "separate-tub-shower",
      tub: "freestanding",
      shower: "walk-in",
      vanity: "double-furniture",
      bathSurface: "marble",
      closet: "large-dressing",
      closetIsland: "center-island",
      closetMillwork: "fully-custom",
      amenities: ["statement-lighting", "heated-floors"],
      finish: "estate",
    },
  },
  {
    id: "warm-organic",
    name: "Warm Organic / Natural",
    lifestyleName: "Natural Retreat",
    tagline: "Wood tones, soft light, tactile calm",
    description:
      "Warm materials and quiet volume — beams, natural stone, and a soft spa bath.",
    heroImage: "/media/primary-suite/warm-organic.jpg",
    wall: "#ebe4d6",
    floor: "#a67c52",
    accent: "#8b6914",
    baseBias: 8000,
    defaults: {
      bedWall: "simple",
      sitting: "sitting-nook",
      ceiling: "beams",
      outdoorAccess: "terrace",
      bathLayout: "wet-room",
      tub: "freestanding",
      shower: "wet-room",
      vanity: "double-floating",
      bathSurface: "natural-stone",
      closet: "standard",
      closetIsland: "none",
      closetMillwork: "premium",
      amenities: ["heated-floors", "curbless-shower"],
      finish: "luxury",
    },
  },
  {
    id: "dramatic-moody",
    name: "Dramatic & Moody",
    lifestyleName: "Moody Private Suite",
    tagline: "Deep tones, fireplace, evening glamour",
    description:
      "A jewel-box suite — fireplace feature wall, dark calm materials, and a statement bath.",
    heroImage: "/media/primary-suite/dramatic-moody.jpg",
    wall: "#d8d4cf",
    floor: "#5c5348",
    accent: "#2a2a2a",
    baseBias: 12000,
    defaults: {
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
      amenities: ["statement-lighting", "heated-floors", "smart-shades"],
      finish: "estate",
    },
  },
  {
    id: "light-resort",
    name: "Light & Airy Resort-Style",
    lifestyleName: "Resort Primary",
    tagline: "Bright spa bath, terrace access, easy luxury",
    description:
      "Vacation-at-home energy — light materials, balcony or terrace, and a spa-level wet zone.",
    heroImage: "/media/primary-suite/light-resort.jpg",
    wall: "#f7f4ef",
    floor: "#d4c4a8",
    accent: "#c9a04e",
    baseBias: 14000,
    defaults: {
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
    id: "traditional-luxury",
    name: "Traditional Luxury",
    lifestyleName: "Heirloom Suite",
    tagline: "Furniture vanity, paneled detail, enduring craft",
    description:
      "Old-world craftsmanship — furniture-style vanity, separate wet zones, and fully custom dressing.",
    heroImage: "/media/primary-suite/traditional-luxury.jpg",
    wall: "#f2ebe0",
    floor: "#8b6914",
    accent: "#b8893d",
    baseBias: 18000,
    defaults: {
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

export function getVision(id: SuiteVisionId): SuiteVision {
  return suiteVisions.find((v) => v.id === id) ?? suiteVisions[0];
}
