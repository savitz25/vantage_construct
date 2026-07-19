export type AtticVisionId =
  | "primary-suite"
  | "guest-suite"
  | "home-office"
  | "teen-retreat"
  | "playroom-flex"
  | "reading-loft";

export type DormerOption = "none" | "single" | "paired" | "shed";
export type BathOption = "none" | "half" | "full";
export type StorageOption = "basic" | "kneewall" | "window-seats" | "full-built-ins";
export type SkylightOption = "none" | "single" | "paired";
export type CeilingOption = "finished-drywall" | "tray" | "exposed-beams";
export type FinishTier = "premium" | "luxury" | "estate";

export type AtticSelections = {
  visionId: AtticVisionId;
  dormer: DormerOption;
  bath: BathOption;
  storage: StorageOption;
  skylights: SkylightOption;
  ceiling: CeilingOption;
  finish: FinishTier;
};

export type EstimateBreakdown = {
  label: string;
  amount: number;
};

export type AtticEstimate = {
  low: number;
  mid: number;
  high: number;
  monthly: number;
  breakdown: EstimateBreakdown[];
};
