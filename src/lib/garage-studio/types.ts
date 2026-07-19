export type GaragePurposeId =
  | "luxury-garage"
  | "collectors-garage"
  | "workshop-garage"
  | "creative-studio"
  | "carriage-house"
  | "guest-adu"
  | "pool-pavilion"
  | "mixed-use";

export type BaySizeId = "two-car" | "three-car" | "four-car" | "oversized";
export type DoorStyleId = "carriage" | "modern-glass" | "full-view" | "wood-clad";
export type ExteriorId = "match-main" | "stone-accent" | "board-batten" | "modern-stucco";
export type RoofStyleId = "gable" | "hip" | "shed-modern";
export type LivingAboveId = "none" | "loft-storage" | "full-suite";
export type BathId = "none" | "half" | "full";
export type WorkshopId = "none" | "bay-workshop" | "detailing-bay";
export type FinishTier = "premium" | "luxury" | "estate";

export type GarageSelections = {
  purposeId: GaragePurposeId;
  bays: BaySizeId;
  door: DoorStyleId;
  exterior: ExteriorId;
  roof: RoofStyleId;
  livingAbove: LivingAboveId;
  bath: BathId;
  workshop: WorkshopId;
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
