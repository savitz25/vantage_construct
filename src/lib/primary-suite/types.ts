export type SuiteVisionId =
  | "spa-retreat"
  | "modern-minimal"
  | "classic-elegant"
  | "warm-organic"
  | "dramatic-moody"
  | "light-resort"
  | "traditional-luxury";

export type BedWallId = "simple" | "upholstered" | "paneled" | "fireplace-wall";
export type SittingAreaId = "none" | "sitting-nook" | "fireplace-lounge";
export type CeilingId = "flat" | "tray" | "coffered" | "beams";
export type OutdoorAccessId = "none" | "balcony" | "terrace";

export type BathLayoutId =
  | "freestanding-center"
  | "wet-room"
  | "separate-tub-shower"
  | "shower-only";
export type TubId = "none" | "freestanding" | "built-in";
export type ShowerId = "walk-in" | "steam" | "wet-room" | "rainfall-body";
export type VanityId = "double-floating" | "double-furniture" | "double-makeup" | "single-luxe";
export type BathSurfaceId = "marble" | "quartz" | "porcelain" | "natural-stone";

export type ClosetConfigId = "standard" | "large-dressing" | "his-hers";
export type ClosetIslandId = "none" | "center-island";
export type ClosetMillworkId = "premium" | "fully-custom";

export type FinishTier = "premium" | "luxury" | "estate";

export type SuiteAmenityId =
  | "heated-floors"
  | "statement-lighting"
  | "steam-package"
  | "curbless-shower"
  | "closet-vanity"
  | "smart-shades";

export type SuiteSelections = {
  visionId: SuiteVisionId;
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

export type EstimateBreakdown = { label: string; amount: number };

export type SuiteEstimate = {
  low: number;
  mid: number;
  high: number;
  monthly: number;
  breakdown: EstimateBreakdown[];
};
