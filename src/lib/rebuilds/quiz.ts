/**
 * Renovate vs Rebuild decision logic.
 * Honest scoring: one outcome routes to major renovation when appropriate.
 */

export type HomeAge = "pre-1960" | "1960-1989" | "1990-2009" | "2010-plus";
export type SizeJump = "similar" | "moderate" | "major" | "double-plus";
export type IssueId =
  | "layout"
  | "ceilings"
  | "systems"
  | "structure"
  | "moisture"
  | "addition-limits";
export type NeighborhoodBond = "must-stay" | "prefer-stay" | "flexible";
export type BudgetBand = "under-800k" | "800k-1.5m" | "1.5m-2.5m" | "2.5m-plus";
export type LotFit = "tight" | "typical" | "generous" | "unknown";

export type QuizAnswers = {
  age: HomeAge | null;
  sizeJump: SizeJump | null;
  issues: IssueId[];
  neighborhood: NeighborhoodBond | null;
  budget: BudgetBand | null;
  lot: LotFit | null;
};

export type VerdictId = "strong-rebuild" | "lean-rebuild" | "major-renovation";

export type QuizVerdict = {
  id: VerdictId;
  title: string;
  summary: string;
  score: number;
  bullets: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tone: "rebuild" | "lean" | "renovate";
};

export const quizSteps = [
  { id: "age", title: "How old is your current home?" },
  { id: "sizeJump", title: "How much more space do you want?" },
  { id: "issues", title: "What is frustrating you most? (pick all that apply)" },
  { id: "neighborhood", title: "How attached are you to this street / schools?" },
  { id: "budget", title: "Rough construction budget comfort (building only)?" },
  { id: "lot", title: "How would you describe the lot?" },
] as const;

export const ageOptions: { id: HomeAge; label: string; hint: string }[] = [
  { id: "pre-1960", label: "Before 1960", hint: "Often systems, layout, and structure stack against a gut reno" },
  { id: "1960-1989", label: "1960–1989", hint: "Classic North Jersey rebuild window" },
  { id: "1990-2009", label: "1990–2009", hint: "Sometimes renovable — depends on layout & goals" },
  { id: "2010-plus", label: "2010 or newer", hint: "Major renovation often wins unless size jump is huge" },
];

export const sizeOptions: { id: SizeJump; label: string; hint: string }[] = [
  { id: "similar", label: "About the same size", hint: "Improve layout & quality, not necessarily footprint" },
  { id: "moderate", label: "+20–40% more space", hint: "Addition or rebuild can both work" },
  { id: "major", label: "+40–80% more space", hint: "Rebuild economics often improve" },
  { id: "double-plus", label: "Nearly double or more", hint: "Strong rebuild signal on most lots" },
];

export const issueOptions: { id: IssueId; label: string }[] = [
  { id: "layout", label: "Chopped-up layout / no flow" },
  { id: "ceilings", label: "Low ceilings" },
  { id: "systems", label: "Aging electrical, plumbing, HVAC" },
  { id: "structure", label: "Structural or foundation concerns" },
  { id: "moisture", label: "Moisture, mold, or drainage history" },
  { id: "addition-limits", label: "Already maxed out with past additions" },
];

export const neighborhoodOptions: { id: NeighborhoodBond; label: string; hint: string }[] = [
  { id: "must-stay", label: "We will not leave this neighborhood", hint: "Rebuild or renovate in place" },
  { id: "prefer-stay", label: "Strongly prefer to stay", hint: "Stay-and-improve is the starting point" },
  { id: "flexible", label: "Open to moving if math is better", hint: "Also see Move or Improve calculator" },
];

export const budgetOptions: { id: BudgetBand; label: string }[] = [
  { id: "under-800k", label: "Under $800k" },
  { id: "800k-1.5m", label: "$800k – $1.5M" },
  { id: "1.5m-2.5m", label: "$1.5M – $2.5M" },
  { id: "2.5m-plus", label: "$2.5M+" },
];

export const lotOptions: { id: LotFit; label: string; hint: string }[] = [
  { id: "tight", label: "Tight / constrained", hint: "Setbacks & neighbors matter — evaluation first" },
  { id: "typical", label: "Typical suburban lot", hint: "Common rebuild canvas in our towns" },
  { id: "generous", label: "Generous / private", hint: "Often excellent rebuild potential" },
  { id: "unknown", label: "Not sure yet", hint: "We’ll map it in Land Evaluation" },
];

export const emptyAnswers: QuizAnswers = {
  age: null,
  sizeJump: null,
  issues: [],
  neighborhood: null,
  budget: null,
  lot: null,
};

/** Higher score → rebuild more likely. Renovation when score is low. */
export function scoreQuiz(a: QuizAnswers): number {
  let score = 0;

  switch (a.age) {
    case "pre-1960":
      score += 28;
      break;
    case "1960-1989":
      score += 22;
      break;
    case "1990-2009":
      score += 10;
      break;
    case "2010-plus":
      score += 0;
      break;
  }

  switch (a.sizeJump) {
    case "similar":
      score += 4;
      break;
    case "moderate":
      score += 12;
      break;
    case "major":
      score += 22;
      break;
    case "double-plus":
      score += 30;
      break;
  }

  const issueWeights: Record<IssueId, number> = {
    layout: 8,
    ceilings: 10,
    systems: 10,
    structure: 16,
    moisture: 12,
    "addition-limits": 14,
  };
  for (const id of a.issues) score += issueWeights[id] ?? 0;

  // Attachment to place supports either path; slight rebuild tilt only when issues/size already high
  if (a.neighborhood === "must-stay") score += 4;
  if (a.neighborhood === "prefer-stay") score += 2;
  if (a.neighborhood === "flexible") score -= 2;

  // Budget: very low budgets with huge jumps → still score but verdict copy steers carefully
  if (a.budget === "under-800k" && (a.sizeJump === "major" || a.sizeJump === "double-plus")) {
    score -= 8;
  }
  if (a.budget === "2.5m-plus") score += 4;
  if (a.budget === "1.5m-2.5m") score += 2;

  if (a.lot === "generous") score += 4;
  if (a.lot === "tight") score -= 2;

  return Math.max(0, Math.min(100, score));
}

export function verdictFromScore(score: number, a: QuizAnswers): QuizVerdict {
  // Honest renovation path when the home is newer and goals are modest
  const forceRenovate =
    a.age === "2010-plus" &&
    (a.sizeJump === "similar" || a.sizeJump === "moderate") &&
    !a.issues.includes("structure") &&
    score < 55;

  if (forceRenovate || score < 38) {
    return {
      id: "major-renovation",
      title: "A major renovation may be smarter",
      summary:
        "Based on what you shared, keeping the structure and investing in a high-quality renovation or addition may deliver more value than a full teardown — at least until we walk the property.",
      score,
      bullets: [
        "You may not need to pay for demolition, full utility rebuilds, and a from-scratch shell.",
        "Targeted additions (primary suite, kitchen, lower level) can solve lifestyle gaps.",
        "If renovation quotes later climb past ~50–60% of rebuild cost, we re-open the rebuild math.",
      ],
      primaryCta: { label: "Explore Transformations", href: "/transformations" },
      secondaryCta: { label: "Move or Improve calculator", href: "/move-or-improve-calculator-nj" },
      tone: "renovate",
    };
  }

  if (score < 58) {
    return {
      id: "lean-rebuild",
      title: "You lean toward a rebuild — with a careful evaluation",
      summary:
        "Several signals point to rebuild economics, but lot constraints, structure, and budget still need a real site diagnostic before anyone picks up a wrecking bar.",
      score,
      bullets: [
        "Size jump and/or system/layout issues often make “perfect renovation” more expensive than it looks.",
        "Land Evaluation maps setbacks, grading, and what footprint is actually legal.",
        "We’ll still price a serious renovation path so the comparison is honest.",
      ],
      primaryCta: { label: "Request rebuild feasibility report", href: "#feasibility" },
      secondaryCta: { label: "Land evaluation", href: "/land/evaluation" },
      tone: "lean",
    };
  }

  return {
    id: "strong-rebuild",
    title: "Strong rebuild candidate",
    summary:
      "Your goals and home profile look like a classic North Jersey knockdown opportunity — keep the street and schools, replace the house that no longer fits.",
    score,
    bullets: [
      "Significant program change + aging structure usually favors a clean new build.",
      "Modern foundation, systems, ceilings, and layout without fighting 50-year compromises.",
      "Next step is feasibility: lot capacity, timeline, and a transparent construction range.",
    ],
    primaryCta: { label: "Request rebuild feasibility report", href: "#feasibility" },
    secondaryCta: { label: "Cost to build studio", href: "/cost-to-build-a-house-nj" },
    tone: "rebuild",
  };
}

export function evaluateQuiz(a: QuizAnswers): QuizVerdict {
  return verdictFromScore(scoreQuiz(a), a);
}

export function isQuizComplete(a: QuizAnswers): boolean {
  return Boolean(
    a.age && a.sizeJump && a.neighborhood && a.budget && a.lot && a.issues.length > 0,
  );
}
