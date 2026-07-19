export type GaragePurposeId =
  | "luxury-garage"
  | "collectors-garage"
  | "workshop-garage"
  | "creative-studio"
  | "carriage-house"
  | "guest-adu"
  | "pool-pavilion"
  | "mixed-use";

/** Size & footprint configuration */
export type BaySizeId =
  | "two-car"
  | "three-car"
  | "four-oversized"
  | "single-workshop"
  | "deep-rv";

export type DoorStyleId =
  | "carriage"
  | "full-view"
  | "solid-modern"
  | "wood-clad"
  | "mixed-glass-solid";

export type ExteriorId =
  | "match-main"
  | "modern-farmhouse"
  | "contemporary"
  | "craftsman"
  | "stone-accent"
  | "full-stone";

export type LivingAboveId = "none" | "storage-loft" | "full-living" | "large-suite";

export type BathId = "none" | "half" | "full";

export type FinishTier = "premium" | "luxury" | "estate";

/** Secondary amenity flags */
export type AmenityId =
  | "workshop"
  | "storage-cabinets"
  | "climate-control"
  | "ev-ready"
  | "exterior-lighting"
  | "covered-entry";

export type GarageSelections = {
  purposeId: GaragePurposeId;
  bays: BaySizeId;
  door: DoorStyleId;
  exterior: ExteriorId;
  livingAbove: LivingAboveId;
  bath: BathId;
  amenities: AmenityId[];
  finish: FinishTier;
};

export type EstimateBreakdown = { label: string; amount: number };

export type GarageEstimate = {
  low: number;
  mid: number;
  high: number;
  monthly: number;
  breakdown: EstimateBreakdown[];
};
