export type LotPath = "own-lot" | "looking" | "knockdown" | null;
export type FinishTier = "premium" | "luxury" | "estate" | null;
export type StyleId =
  | "modern-farmhouse"
  | "craftsman"
  | "contemporary"
  | "traditional"
  | "barndominium"
  | null;
export type Stories = 1 | 1.5 | 2 | null;
export type BasementId = "none" | "unfinished" | "finished" | "walkout" | null;
export type RoofId = "shingle" | "standing-seam" | "slate" | null;
export type GarageId = "two" | "three" | "collector" | null;

export type AddonId =
  | "outdoor-living"
  | "pool"
  | "porch"
  | "sunroom"
  | "adu"
  | "wine-cellar"
  | "smart-home"
  | "generator";

export type CostStep =
  | "lot"
  | "size"
  | "style"
  | "finish"
  | "features"
  | "summary";

export type CostSelections = {
  lotPath: LotPath;
  sqft: number;
  style: StyleId;
  finish: FinishTier;
  stories: Stories;
  basement: BasementId;
  roof: RoofId;
  garage: GarageId;
  addons: AddonId[];
};

export type CostLineItem = {
  id: string;
  label: string;
  amount: number;
  category: "structure" | "foundation" | "exterior" | "garage" | "addons" | "site-path";
};

export type CostEstimate = {
  low: number;
  high: number;
  mid: number;
  basePerSqft: number;
  effectivePerSqft: number;
  lines: CostLineItem[];
  constructionOnly: true;
};

export type CostStudioState = {
  version: 1;
  step: CostStep;
  selections: CostSelections;
  unlocked: boolean;
  contact: { firstName: string; lastName: string; email: string; phone: string };
  configId: string | null;
};

export const COST_STEPS: CostStep[] = [
  "lot",
  "size",
  "style",
  "finish",
  "features",
  "summary",
];

export const COST_STEP_LABELS: Record<CostStep, string> = {
  lot: "Lot",
  size: "Size",
  style: "Style",
  finish: "Finish",
  features: "Features",
  summary: "Estimate",
};

export function createEmptyCostSelections(): CostSelections {
  return {
    lotPath: null,
    sqft: 3200,
    style: null,
    finish: null,
    stories: 2,
    basement: "unfinished",
    roof: "shingle",
    garage: "two",
    addons: [],
  };
}

export function createInitialCostState(): CostStudioState {
  return {
    version: 1,
    step: "lot",
    selections: createEmptyCostSelections(),
    unlocked: false,
    contact: { firstName: "", lastName: "", email: "", phone: "" },
    configId: null,
  };
}

export function generateCostConfigId() {
  const p = () => Math.random().toString(36).slice(2, 7).toUpperCase();
  return `VC-${p()}-${p()}`;
}
