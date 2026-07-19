export type KitchenStyleId =
  | "modern-farmhouse"
  | "warm-organic"
  | "classic-transitional"
  | "sleek-european"
  | "traditional-luxury"
  | "coastal-hamptons"
  | "forest-moody"
  | "industrial-loft"
  | "japandi"
  | "white-brass"
  | "dark-dramatic"
  | "scandinavian";

export type CounterId =
  | "quartz-calacatta"
  | "marble-carrara"
  | "soapstone"
  | "porcelain-slab"
  | "walnut-butcher"
  | "quartzite";

export type BacksplashId = "full-slab" | "subway" | "zellige" | "painted" | "herringbone";

export type IslandId = "standard" | "oversized-seating" | "waterfall" | "none";

export type HardwareId = "brass" | "matte-black" | "chrome" | "polished-nickel" | "bronze";

export type CabinetToneId = "style-default" | "painted-white" | "warm-oak" | "walnut" | "deep-green" | "charcoal";

export type KitchenSelections = {
  styleId: KitchenStyleId;
  counter: CounterId;
  backsplash: BacksplashId;
  island: IslandId;
  hardware: HardwareId;
  cabinetTone: CabinetToneId;
};

export type EstimateBreakdown = {
  label: string;
  amount: number;
};

export type KitchenEstimate = {
  low: number;
  mid: number;
  high: number;
  monthly: number;
  breakdown: EstimateBreakdown[];
};
