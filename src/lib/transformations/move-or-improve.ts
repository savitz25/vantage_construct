/**
 * Move vs Improve model for North / Central NJ.
 * Tax tiers are simplified from publicly described NJ structures for education.
 * Must be labeled estimates — not tax advice.
 */

export type MissingNeed =
  | "primary-suite"
  | "bedrooms"
  | "kitchen"
  | "office"
  | "basement"
  | "outdoor";

export type MoveImproveInputs = {
  currentValue: number;
  targetBuyPrice: number;
  mortgageBalance?: number;
  currentRate?: number;
  marketRate?: number;
  missing: MissingNeed[];
  additionBudgetOverride?: number;
  commissionRate?: number; // default 5%
};

export type MoveImproveResult = {
  move: {
    commission: number;
    baseRtf: number;
    gpf: number;
    movingCosts: number;
    buySideClosing: number;
    rateDeltaAnnual: number;
    totalCashOutlay: number;
  };
  improve: {
    additionBudget: number;
    recoupPct: number;
    valueAdded: number;
    netEffectiveCost: number;
    monthlyPaymentIllustrative: number;
    scopeLabel: string;
  };
  savingsVsMove: number;
  favorsImprove: boolean;
};

const MOVING_DEFAULT = 15000;
const BUY_SIDE_PCT = 0.02;
const ILLUSTRATIVE_LOAN_RATE = 0.069; // display only

/** Simplified NJ base Realty Transfer Fee estimate (seller side planning figure). */
export function estimateBaseRtf(salePrice: number): number {
  // Rough planning estimate ~$3–6 per $500 depending on band; use blended ~$5/$500 above $350k
  if (salePrice <= 0) return 0;
  if (salePrice <= 150000) return Math.round((salePrice / 500) * 2.0);
  if (salePrice <= 350000) return Math.round((salePrice / 500) * 3.5);
  return Math.round((salePrice / 500) * 5.5);
}

/** Graduated Percent Fee estimate for sales over $1M (planning table). */
export function estimateGpf(salePrice: number): number {
  if (salePrice <= 1_000_000) return 0;
  if (salePrice <= 2_000_000) return Math.round(salePrice * 0.01);
  if (salePrice <= 2_500_000) return Math.round(salePrice * 0.02);
  if (salePrice <= 3_000_000) return Math.round(salePrice * 0.025);
  if (salePrice <= 3_500_000) return Math.round(salePrice * 0.03);
  return Math.round(salePrice * 0.035);
}

const needToBudget: Record<MissingNeed, { label: string; budget: number; recoup: number }> = {
  "primary-suite": { label: "Primary suite addition", budget: 220000, recoup: 0.7 },
  bedrooms: { label: "Bedroom expansion", budget: 180000, recoup: 0.62 },
  kitchen: { label: "Kitchen transformation", budget: 150000, recoup: 0.6 },
  office: { label: "Home office suite", budget: 95000, recoup: 0.55 },
  basement: { label: "Finished basement living", budget: 140000, recoup: 0.65 },
  outdoor: { label: "Outdoor living upgrade", budget: 110000, recoup: 0.55 },
};

export function deriveAdditionFromNeeds(missing: MissingNeed[]) {
  if (!missing.length) {
    return { budget: 250000, recoup: 0.65, scopeLabel: "Right-size addition package" };
  }
  // Stack needs with diminishing overlap (not pure sum)
  let budget = 0;
  let recoupSum = 0;
  const labels: string[] = [];
  missing.forEach((m, i) => {
    const item = needToBudget[m];
    budget += item.budget * (i === 0 ? 1 : 0.75);
    recoupSum += item.recoup;
    labels.push(item.label);
  });
  const recoup = recoupSum / missing.length;
  return {
    budget: Math.round(budget),
    recoup,
    scopeLabel: labels.slice(0, 3).join(" + "),
  };
}

export function calculateMoveOrImprove(input: MoveImproveInputs): MoveImproveResult {
  const commissionRate = input.commissionRate ?? 0.05;
  const commission = input.currentValue * commissionRate;
  const baseRtf = estimateBaseRtf(input.currentValue);
  const gpf = estimateGpf(input.currentValue);
  const movingCosts = MOVING_DEFAULT;
  const buySideClosing = input.targetBuyPrice * BUY_SIDE_PCT;

  // Optional rate delta on difference in financed amount (simplified)
  const bal = input.mortgageBalance ?? 0;
  const curRate = (input.currentRate ?? 3.5) / 100;
  const mktRate = (input.marketRate ?? 6.9) / 100;
  const newLoan = Math.max(0, input.targetBuyPrice * 0.8);
  const rateDeltaAnnual =
    bal > 0
      ? Math.round(newLoan * mktRate - bal * curRate)
      : Math.round(newLoan * (mktRate - 0.045));

  const totalCashOutlay = Math.round(
    commission + baseRtf + gpf + movingCosts + buySideClosing + Math.max(0, rateDeltaAnnual) * 5,
  );

  const derived = deriveAdditionFromNeeds(input.missing);
  const additionBudget = input.additionBudgetOverride ?? derived.budget;
  const valueAdded = Math.round(additionBudget * derived.recoup);
  const netEffectiveCost = Math.max(0, additionBudget - valueAdded);
  const monthlyPaymentIllustrative = Math.round(
    (additionBudget * ILLUSTRATIVE_LOAN_RATE) / 12,
  );

  const savingsVsMove = totalCashOutlay - netEffectiveCost;

  return {
    move: {
      commission: Math.round(commission),
      baseRtf,
      gpf,
      movingCosts,
      buySideClosing: Math.round(buySideClosing),
      rateDeltaAnnual: Math.max(0, rateDeltaAnnual),
      totalCashOutlay,
    },
    improve: {
      additionBudget: Math.round(additionBudget),
      recoupPct: Math.round(derived.recoup * 100),
      valueAdded,
      netEffectiveCost: Math.round(netEffectiveCost),
      monthlyPaymentIllustrative,
      scopeLabel: derived.scopeLabel,
    },
    savingsVsMove: Math.round(savingsVsMove),
    favorsImprove: savingsVsMove > 0,
  };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export const needChips: { id: MissingNeed; label: string }[] = [
  { id: "primary-suite", label: "Primary suite" },
  { id: "bedrooms", label: "More bedrooms" },
  { id: "kitchen", label: "Kitchen" },
  { id: "office", label: "Home office" },
  { id: "basement", label: "Basement living" },
  { id: "outdoor", label: "Outdoor space" },
];

export const moveImproveFaqs = [
  {
    q: "Is it cheaper to renovate or move in New Jersey?",
    a: "Often improving is dramatically cheaper once you include realtor commissions, NJ transfer fees (including Graduated Percent Fee tiers on higher-value homes), moving costs, and buy-side closing costs. Use the calculator for a personalized planning estimate — not a formal quote.",
  },
  {
    q: "What is New Jersey’s Graduated Percent Fee?",
    a: "For higher-value residential sales, NJ assesses a Graduated Percent Fee on top of the base Realty Transfer Fee. Tiers and rules can change — always verify with the NJ Division of Taxation and your closing professionals.",
  },
  {
    q: "Does the improve estimate include permits and site work?",
    a: "The improve figure is a conceptual construction budget for scope planning. Final pricing after site evaluation may include structure-specific, permit, and site factors.",
  },
  {
    q: "What kinds of improvements does Vantage build?",
    a: "Home additions, primary suites, kitchen expansions, lower levels, outdoor living, and more — see our Transformations pages. The calculator helps frame cost versus relocating.",
  },
  {
    q: "Should I always improve instead of moving?",
    a: "Not always. Sometimes the lot, structure, or lifestyle gap makes a move smarter. The tool surfaces financial friction so you can decide with clearer eyes.",
  },
  {
    q: "Is this tax or legal advice?",
    a: "No. Transfer fee math is educational and illustrative. Confirm current rates and your situation with licensed professionals before any transaction.",
  },
] as const;
