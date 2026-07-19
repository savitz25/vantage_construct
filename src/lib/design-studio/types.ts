export type LotStatus = "owns" | "looking" | "not-yet" | null;
export type Timeline = "0-6" | "6-12" | "12-plus" | "exploring" | null;
export type SizeBand = "under-2000" | "2000-3000" | "over-3000" | null;
export type ArchStyle =
  | "modern-farmhouse"
  | "craftsman"
  | "contemporary"
  | "traditional"
  | "barndominium"
  | null;
export type RoofType = "architectural-shingle" | "standing-seam" | "slate-inspired" | null;
export type ExteriorPalette =
  | "warm-neutrals"
  | "charcoal-ivory"
  | "earth-tones"
  | "classic-bw"
  | "stone-accents"
  | null;
export type FinishLevel = "premium" | "luxury" | "estate" | null;
export type Priority =
  | "main-floor-primary"
  | "open-concept"
  | "high-ceilings"
  | "chefs-kitchen"
  | "home-office"
  | "multi-gen";
export type LifestyleAddon =
  | "finished-basement"
  | "outdoor-living"
  | "deck"
  | "adu"
  | "garage-workshop"
  | "sunroom"
  | "other";

export type StudioStep =
  | "welcome"
  | "size"
  | "style"
  | "exterior"
  | "interior"
  | "lifestyle"
  | "summary";

export type DesignSelections = {
  lotStatus: LotStatus;
  timeline: Timeline;
  sizeBand: SizeBand;
  planSlug: string | null;
  style: ArchStyle;
  roof: RoofType;
  exteriorPalette: ExteriorPalette;
  finishLevel: FinishLevel;
  priorities: Priority[];
  lifestyle: LifestyleAddon[];
  lifestyleOther: string;
};

export type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type EstimateRange = {
  low: number;
  high: number;
};

export type DesignStudioState = {
  version: 1;
  step: StudioStep;
  selections: DesignSelections;
  contact: ContactInfo;
  unlocked: boolean;
  configId: string | null;
  startedAt: string | null;
  completedAt: string | null;
};

export const STEPS: StudioStep[] = [
  "welcome",
  "size",
  "style",
  "exterior",
  "interior",
  "lifestyle",
  "summary",
];

export const STEP_LABELS: Record<StudioStep, string> = {
  welcome: "Vision",
  size: "Structure",
  style: "Character",
  exterior: "Exterior",
  interior: "Details",
  lifestyle: "Lifestyle",
  summary: "Complete",
};

export function createEmptySelections(): DesignSelections {
  return {
    lotStatus: null,
    timeline: null,
    sizeBand: null,
    planSlug: null,
    style: null,
    roof: null,
    exteriorPalette: null,
    finishLevel: null,
    priorities: [],
    lifestyle: [],
    lifestyleOther: "",
  };
}

export function createInitialState(): DesignStudioState {
  return {
    version: 1,
    step: "welcome",
    selections: createEmptySelections(),
    contact: { firstName: "", lastName: "", email: "", phone: "" },
    unlocked: false,
    configId: null,
    startedAt: null,
    completedAt: null,
  };
}

export function generateConfigId() {
  const part = () => Math.random().toString(36).slice(2, 8).toUpperCase();
  return `VV-${part()}-${part()}`;
}
