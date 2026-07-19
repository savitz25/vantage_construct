export type OutdoorVisionId =
  | "outdoor-kitchen"
  | "covered-lounge"
  | "fire-conversation"
  | "full-resort"
  | "poolside"
  | "courtyard-dining"
  | "entertainment-pavilion";

export type KitchenConfigId = "none" | "compact" | "full-linear" | "l-shape" | "island";
export type AppliancePackageId = "essential-grill" | "entertainer" | "chef-suite";
export type CounterMaterialId = "granite" | "quartz" | "concrete" | "porcelain";
export type CoverStructureId = "open-patio" | "pergola" | "pavilion" | "screened";
export type FireFeatureId = "none" | "linear-modern" | "traditional-fireplace" | "fire-pit" | "fire-seating";
export type StyleId =
  | "modern-farmhouse"
  | "contemporary"
  | "resort-modern"
  | "transitional"
  | "mediterranean";
export type FlooringId = "porcelain-pavers" | "natural-stone" | "wood-look" | "travertine";
export type LightingId = "subtle" | "layered" | "dramatic";
export type FinishTier = "premium" | "luxury" | "estate";

export type OutdoorAmenityId =
  | "dining-zone"
  | "lounge-seating"
  | "bar-seating"
  | "heaters"
  | "ceiling-fans"
  | "audio"
  | "privacy-screen"
  | "pool-connection";

export type OutdoorSelections = {
  visionId: OutdoorVisionId;
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

export type EstimateBreakdown = { label: string; amount: number };

export type OutdoorEstimate = {
  low: number;
  mid: number;
  high: number;
  monthly: number;
  breakdown: EstimateBreakdown[];
};
