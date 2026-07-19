/**
 * Investor page content & illustrative model assumptions.
 *
 * LEGAL: All rates, splits, timelines, and outcomes are ILLUSTRATIVE ONLY.
 * This page must be reviewed by a securities attorney before launch.
 * Actual terms are established only in written agreements after underwriting.
 */

export const investorDisclaimer =
  "Illustrative scenario only — not an offer, projection, solicitation, or guarantee. Rates, splits, timelines, and outcomes vary by project and are established solely in written agreements after underwriting. Past performance does not guarantee future results. This is not an offer to sell or a solicitation to buy any security.";

export const investorFooterDisclaimer =
  "Vantage Construction presents partnership structures for educational discussion only. Nothing on this page constitutes an offer to sell or solicitation of an offer to buy securities. Any investment involves risk, including possible loss of principal. All terms are deal-specific and documented in formal agreements. Please consult your own legal, tax, and financial advisors. This page should be reviewed by a securities attorney before public marketing use.";

/** Placeholder assumptions Victor can replace after review. */
export const illustrativeAssumptions = {
  loanAnnualRate: 0.11, // 11% annualized preferred — ILLUSTRATIVE
  equityProfitShare: 0.5, // 50% of residual profit to capital partner — ILLUSTRATIVE
  hybridPreferredRate: 0.08, // 8% preferred — ILLUSTRATIVE
  hybridProfitKicker: 0.3, // 30% of residual after preferred — ILLUSTRATIVE
  defaultProjectCost: 1_400_000,
  defaultHoldMonths: 14,
  defaultInvestment: 400_000,
  minInvestment: 100_000,
  maxInvestment: 2_000_000,
  /** Assumed illustrative gross profit margin on project cost before partner splits */
  illustrativeGrossProfitMargin: 0.14,
} as const;

export const trackRecord = [
  { label: "Building since", value: "1990", detail: "35+ years" },
  { label: "Leadership", value: "Victor Lobozzo", detail: "Master Builder / Developer" },
  { label: "Spec program", value: "$850k–$2M+", detail: "Strategic luxury builds" },
  { label: "Focus markets", value: "North Jersey", detail: "Warren · Watchung · Basking Ridge · Millburn–Short Hills" },
] as const;

export const namedDevelopments = [
  "Hidden Hollow Estates",
  "Prospect Hill Estates",
  "Winding Ridge Estates",
] as const;

export const structures = [
  {
    id: "loan" as const,
    title: "Loan structure",
    tagline: "Fixed return · secured position · first out",
    body: "Capital is advanced under a loan-style partnership with a preferred return profile and defined priority in the capital stack. Exact rate, security package, and repayment timing are deal-specific.",
    highlights: [
      "Illustrative preferred return (not guaranteed)",
      "Priority relative to equity residual",
      "Defined hold and repayment discussion in writing",
    ],
  },
  {
    id: "equity" as const,
    title: "Equity structure",
    tagline: "Pro-rata profit participation",
    body: "Capital participates in residual project economics after costs, loan payoffs (if any), and agreed waterfall terms. Upside and risk are shared per the operating documents.",
    highlights: [
      "Residual profit participation (illustrative splits only)",
      "Aligned with project outcome",
      "Reporting and distribution schedule in the agreement",
    ],
  },
  {
    id: "hybrid" as const,
    title: "Hybrid structure",
    tagline: "Base return + profit kicker",
    body: "Combines a preferred return component with a defined share of residual profits. Designed for partners who want downside-first economics with optional upside participation.",
    highlights: [
      "Illustrative preferred base + kicker",
      "Balanced risk/return discussion",
      "Fully documented per transaction",
    ],
  },
] as const;

export const lifecycle = [
  {
    phase: 1,
    title: "Source & underwrite",
    months: "Months 0–2",
    body: "Opportunity review, market/comps, feasibility, and underwriting discussion. No capital commitment until documents are agreed.",
  },
  {
    phase: 2,
    title: "Structure & close",
    months: "Months 1–3",
    body: "Term sheet → written agreements → funding mechanics. Title, entity, and security positions documented as applicable.",
  },
  {
    phase: 3,
    title: "Permits",
    months: "Months 2–5",
    body: "Approvals, zoning/compliance coordination, and pre-construction readiness. Partners receive milestone updates.",
  },
  {
    phase: 4,
    title: "Build",
    months: "Months 4–14+",
    body: "Construction under Vantage’s no-surprises process: budget/timeline updates, quality checks, optional job-site camera (~$50/mo where used).",
  },
  {
    phase: 5,
    title: "Market & sell",
    months: "Varies by project",
    body: "Listing strategy with local realtor relationships, showings, and contract negotiation. Timing depends on market conditions.",
  },
  {
    phase: 6,
    title: "Distribute",
    months: "Post-closing",
    body: "Waterfall application per agreement: loan payoffs / preferred returns / residual splits as documented. Final accounting shared with partners.",
  },
] as const;

export const investorFaqs = [
  {
    q: "How is capital protected or secured?",
    a: "Security and priority depend on the structure and written agreements for each deal (for example, loan documentation, liens, or entity interests). Protection is never absolute — real estate projects carry risk. Exact collateral and rights are defined only in the transaction documents.",
  },
  {
    q: "What is the minimum investment?",
    a: "Minimums are deal-specific and confirmed during underwriting. The interactive modeler uses illustrative controls for education only and does not set a formal minimum offering size.",
  },
  {
    q: "Who holds title?",
    a: "Title is typically held by a project entity or as specified in the deal documents. Structure varies by loan vs equity participation and is confirmed in writing before funding.",
  },
  {
    q: "What reporting is provided?",
    a: "Partners can expect milestone updates through permits and build, with budget/timeline visibility consistent with Vantage’s no-surprises approach. Frequency and format are specified in the partnership agreement.",
  },
  {
    q: "What happens if the home sells below target?",
    a: "Outcomes follow the contractual waterfall. Equity residual may be reduced or eliminated; loan structures may still face timing or recovery risk depending on security and market conditions. Nothing on this page guarantees a result.",
  },
  {
    q: "Can I invest through an LLC, trust, or self-directed IRA?",
    a: "Often yes, subject to the entity/IRA custodian requirements and the project’s subscription documents. Confirm with your advisors and the deal counsel before funding.",
  },
  {
    q: "Why Warren, Watchung, Basking Ridge, and Millburn–Short Hills?",
    a: "These are core Vantage markets with deep local knowledge, trade networks, and off-market relationship flow across Somerset, Morris, Union, and Essex counties.",
  },
  {
    q: "How do I start?",
    a: "Request the Investor Overview, model an illustrative scenario for discussion, then schedule a conversation with Victor. Formal terms begin only after underwriting and written agreements.",
  },
] as const;

export const investmentRanges = [
  "Exploring / under $250k",
  "$250k – $500k",
  "$500k – $1M",
  "$1M – $2M",
  "$2M+",
] as const;
