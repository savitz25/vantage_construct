/** CRM / webhook labels for Studio leads */

export const STUDIO_LEAD_LABELS: Record<string, string> = {
  "kitchen-studio": "Kitchen Studio Lead",
  "basement-builder": "Basement / Lower Level Studio Lead",
  "attic-studio": "Attic Studio Lead",
  "garage-studio": "Garage Studio Lead",
  "outdoor-studio": "Outdoor Living Studio Lead",
  "primary-suite-studio": "Primary Suite Studio Lead",
  "cost-studio": "Cost Studio Lead",
  "design-studio": "Design Studio Lead",
  "move-or-improve": "Move or Improve Lead",
  "adu-payback": "ADU Calculator Lead",
  "rebuild-feasibility": "Rebuild Feasibility Lead",
  "land-evaluation": "Land Evaluation / Pre-Purchase Lot Audit Lead",
};

export function studioLeadLabel(tool: string): string {
  return STUDIO_LEAD_LABELS[tool] ?? `Studio Lead — ${tool}`;
}

export type StudioLeadPayload = {
  studio: string;
  leadType: string;
  pipeline: "studios";
  estimate?: {
    low?: number;
    mid?: number;
    high?: number;
    label?: string;
  };
  selections: Record<string, unknown>;
  summaryLines?: string[];
  pagePath?: string;
  configId?: string;
};
