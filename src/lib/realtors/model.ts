/**
 * Commission model mirrors the published Vantage example:
 * - Land-only at landCommissionRate (default 5%)
 * - Package fee at packageCommissionRate (default 3%) of (land + build)
 * Payment narrative: land at closing, build at framing (not CO).
 */

export type CommissionInputs = {
  landPrice: number;
  buildCost: number;
  landRate?: number;
  packageRate?: number;
  yearlyPackages?: number;
};

export type CommissionResult = {
  landCommission: number;
  packageCommission: number;
  total: number;
  uplift: number;
  upliftMultiple: number;
  packageTotal: number;
  yearlyAtTwo: number;
  yearlyAtThree: number;
  yearlyCustom: number;
};

export const defaultRates = {
  landRate: 0.05,
  packageRate: 0.03,
} as const;

export function calculateCommission(input: CommissionInputs): CommissionResult {
  const landRate = input.landRate ?? defaultRates.landRate;
  const packageRate = input.packageRate ?? defaultRates.packageRate;
  const landPrice = Math.max(0, input.landPrice);
  const buildCost = Math.max(0, input.buildCost);
  const packageTotal = landPrice + buildCost;
  const landCommission = landPrice * landRate;
  const packageCommission = packageTotal * packageRate;
  const total = packageCommission; // package path supersedes land-only in the original example framing
  // For double-dip narrative: agents often still conceptualize land + build components.
  // We show land-only vs package total as the primary "triple" story (matching existing site).
  const uplift = packageCommission - landCommission;
  const upliftMultiple = landCommission > 0 ? packageCommission / landCommission : 0;
  const yearlyPackages = Math.max(1, Math.min(10, input.yearlyPackages ?? 2));

  return {
    landCommission: Math.round(landCommission),
    packageCommission: Math.round(packageCommission),
    total: Math.round(packageCommission),
    uplift: Math.round(uplift),
    upliftMultiple: Math.round(upliftMultiple * 10) / 10,
    packageTotal: Math.round(packageTotal),
    yearlyAtTwo: Math.round(packageCommission * 2),
    yearlyAtThree: Math.round(packageCommission * 3),
    yearlyCustom: Math.round(packageCommission * yearlyPackages),
  };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function scoreListing(answers: {
  town: string;
  lot: string;
  utilities: string;
}): { score: "strong" | "talk" | "low"; message: string } {
  let pts = 0;
  if (answers.town === "yes") pts += 3;
  if (answers.town === "maybe") pts += 2;
  if (answers.lot === "empty" || answers.lot === "teardown") pts += 2;
  if (answers.utilities === "available") pts += 2;
  if (answers.utilities === "unknown") pts += 1;

  if (pts >= 6) {
    return {
      score: "strong",
      message:
        "Strong package candidate — submit this listing. We’ll evaluate packaging and co-branded marketing options quickly.",
    };
  }
  if (pts >= 3) {
    return {
      score: "talk",
      message:
        "Promising — let’s talk. Site conditions may still support a knockdown or custom package with the right client.",
    };
  }
  return {
    score: "low",
    message:
      "This may sit outside our usual footprint, but exceptional sites still get a conversation. Submit details and we’ll advise honestly.",
  };
}
