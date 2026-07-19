import { illustrativeAssumptions } from "./content";

export type StructureId = "loan" | "equity" | "hybrid";

export type DealInputs = {
  investment: number;
  holdMonths: number;
  projectCost: number;
};

export type StructureOutcome = {
  id: StructureId;
  label: string;
  /** Illustrative dollars returned to partner at end of hold (principal + illustrative earnings) */
  totalReturned: number;
  /** Illustrative earnings only */
  earnings: number;
  /** Simple illustrative annualized % (not IRR; educational) */
  simpleAnnualizedPct: number;
  notes: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Pure educational model. Not a forecast.
 * Uses placeholder rates from illustrativeAssumptions.
 */
export function modelStructures(raw: DealInputs): StructureOutcome[] {
  const a = illustrativeAssumptions;
  const investment = clamp(raw.investment, a.minInvestment, a.maxInvestment);
  const holdMonths = clamp(raw.holdMonths, 6, 36);
  const projectCost = clamp(raw.projectCost, 500_000, 5_000_000);
  const years = holdMonths / 12;

  // Illustrative residual profit pool if project hits assumed margin (NOT a projection)
  const illustrativeProfit = projectCost * a.illustrativeGrossProfitMargin;
  // Capital share of stack for simple equity residual allocation (illustrative)
  const capitalShare = clamp(investment / projectCost, 0.05, 0.8);

  // LOAN: preferred interest-style return, first-out narrative
  const loanEarnings = investment * a.loanAnnualRate * years;
  const loanTotal = investment + loanEarnings;

  // EQUITY: share of residual profit (illustrative), plus return of capital assumption
  const equityEarnings = illustrativeProfit * a.equityProfitShare * capitalShare;
  const equityTotal = investment + equityEarnings;

  // HYBRID: preferred base + kicker on residual after preferred
  const hybridPreferred = investment * a.hybridPreferredRate * years;
  const residualAfterPref = Math.max(0, illustrativeProfit - hybridPreferred);
  const hybridKicker = residualAfterPref * a.hybridProfitKicker * capitalShare;
  const hybridEarnings = hybridPreferred + hybridKicker;
  const hybridTotal = investment + hybridEarnings;

  const annualize = (earnings: number) =>
    years > 0 ? (earnings / investment / years) * 100 : 0;

  return [
    {
      id: "loan",
      label: "Loan",
      totalReturned: Math.round(loanTotal),
      earnings: Math.round(loanEarnings),
      simpleAnnualizedPct: Math.round(annualize(loanEarnings) * 10) / 10,
      notes: [
        `Illustrative preferred ~${(a.loanAnnualRate * 100).toFixed(0)}% annualized`,
        "Priority / first-out narrative (deal-specific)",
        "Not secured or guaranteed by this webpage",
      ],
    },
    {
      id: "equity",
      label: "Equity",
      totalReturned: Math.round(equityTotal),
      earnings: Math.round(equityEarnings),
      simpleAnnualizedPct: Math.round(annualize(equityEarnings) * 10) / 10,
      notes: [
        `Illustrative residual share after costs`,
        `Assumes illustrative project margin ${(a.illustrativeGrossProfitMargin * 100).toFixed(0)}% — not a forecast`,
        "Upside and risk both vary by outcome",
      ],
    },
    {
      id: "hybrid",
      label: "Hybrid",
      totalReturned: Math.round(hybridTotal),
      earnings: Math.round(hybridEarnings),
      simpleAnnualizedPct: Math.round(annualize(hybridEarnings) * 10) / 10,
      notes: [
        `Illustrative preferred ~${(a.hybridPreferredRate * 100).toFixed(0)}% + profit kicker`,
        "Base + residual participation (deal-specific)",
        "Figures are educational placeholders only",
      ],
    },
  ];
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
