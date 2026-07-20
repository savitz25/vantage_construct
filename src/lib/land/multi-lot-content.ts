/** Multi-lot development page content — advisory tone, heavy disclaimers */

export const multiLotDisclaimer =
  "Conceptual illustration only — not an appraisal, survey, engineering study, entitlement guarantee, or offer. Lot yield, values, timelines, and feasibility vary by zoning, topography, environment, utilities, market, and township process. Final conclusions require professional evaluation. Past communities do not guarantee future results.";

export const multiLotPaths = [
  {
    id: "sell-as-is",
    title: "Sell as-is",
    tagline: "Simplest path · often leaves value on the table",
    body: "Market the parcel in its current condition. Faster and cleaner for some owners — but buyers price in their risk, so raw or under-entitled land often sells at a discount to developed potential.",
    pros: ["Fewer decisions", "Shorter personal timeline", "Lower complexity for the owner"],
    cons: ["Buyer discounts for entitlement risk", "You may capture less of the upside", "Less control over what happens next"],
    bestFor: "Owners who want a clean exit without process involvement.",
  },
  {
    id: "partner-develop",
    title: "Partner to entitle & develop",
    tagline: "Unlock more value · longer timeline · shared expertise",
    body: "Work with an experienced builder-developer to explore highest and best use, navigate approvals, and create premium lots or homes. Structures vary — land contribution, joint venture, or phased partnership — always in writing after underwriting.",
    pros: ["Potential for meaningfully higher realized value", "Professional navigation of township process", "Aligned craftsmanship if homes are built"],
    cons: ["Months to years depending on approvals", "Capital, risk, and roles must be clear", "Not every parcel pencils"],
    bestFor: "Owners open to a thoughtful process in exchange for upside.",
  },
  {
    id: "strategic-sale",
    title: "Strategic sale to a developer",
    tagline: "Market the opportunity, not just the acreage",
    body: "Position the land with a clear story of what it could support. Sometimes the right move is a sale informed by feasibility — so you negotiate from knowledge rather than guesswork.",
    pros: ["Informed pricing conversation", "Can still exit without building", "Uses evaluation as leverage"],
    cons: ["Still depends on buyer appetite", "Entitlement work may remain for the buyer", "Timing is market-dependent"],
    bestFor: "Owners who want an exit but refuse to sell blind.",
  },
] as const;

export const multiLotProcess = [
  {
    step: "01",
    title: "Confidential conversation",
    body: "Share acreage, location, goals, and constraints. We listen before we model.",
  },
  {
    step: "02",
    title: "Highest & best use lens",
    body: "Zoning density, topography, utilities, access, and market demand — honest screening for what is realistic.",
  },
  {
    step: "03",
    title: "Path recommendation",
    body: "Sell as-is, partner to develop, or strategic sale — with clear reasons and rough order-of-magnitude economics.",
  },
  {
    step: "04",
    title: "If we proceed",
    body: "Written roles, timeline expectations, and next technical steps (survey, engineering, applications) only after mutual fit.",
  },
] as const;

export const multiLotTrackRecord = [
  {
    name: "Hidden Hollow Estates",
    note: "Multi-lot luxury community execution with disciplined siting and finish standards.",
  },
  {
    name: "Prospect Hill Estates",
    note: "Premium North Jersey setting — land strategy paired with custom and Signature-quality homes.",
  },
  {
    name: "Winding Ridge Estates",
    note: "Thoughtful lot layout and access planning for lasting neighborhood character.",
  },
] as const;

export const multiLotFaqs = [
  {
    q: "What is multi-lot development?",
    a: "Creating more than one buildable homesite from a larger parcel through planning, approvals, and infrastructure — rather than selling or building on the land as a single lot only. Not every property supports this path.",
  },
  {
    q: "How many lots can I get from my acreage?",
    a: "It depends on zoning density, setbacks, road frontage, topography, wetlands, septic vs sewer, and township standards. The interactive tool on this page is conceptual only. A confidential assessment is how we get closer to a real range.",
  },
  {
    q: "How long does a subdivision take in New Jersey?",
    a: "Often many months to multiple years depending on complexity, environmental review, and municipal process. Anyone promising speed without caveats is not being careful with your expectations.",
  },
  {
    q: "Do I have to put up all the capital?",
    a: "Structures vary. Some owners contribute land while partners bring development expertise and capital; others sell after feasibility clarifies value. Terms are deal-specific and documented only in written agreements.",
  },
  {
    q: "Is this an investment solicitation?",
    a: "No. This page is educational for landowners exploring options. Investor partnership discussions, when appropriate, are separate and subject to formal documentation and legal review.",
  },
  {
    q: "What does a confidential land assessment include?",
    a: "A discreet conversation and high-level feasibility read: realistic lot potential order of magnitude, major red flags, and which of the three paths (sell as-is, partner, strategic sale) appears most rational — not a formal appraisal or engineering report.",
  },
  {
    q: "What if my land is not a good multi-lot candidate?",
    a: "We will say so. That honesty is the point. Sometimes single-lot custom, a Signature Build path, or a clean as-is sale is the smarter outcome.",
  },
] as const;

/** Rough conceptual density for luxury North Jersey (illustrative, not zoning) */
export function estimateLotPotential(acres: number, utilities: "full" | "partial" | "none") {
  const a = Math.max(0.5, Math.min(40, acres));
  // Luxury density is lower than production housing
  let basePerAcre = 0.7;
  if (utilities === "partial") basePerAcre *= 0.75;
  if (utilities === "none") basePerAcre *= 0.55;
  const raw = a * basePerAcre;
  const low = Math.max(1, Math.floor(raw * 0.65));
  const high = Math.max(low, Math.ceil(raw * 1.15));
  // Cap silly numbers for small parcels
  if (a < 1.5) return { low: 1, high: Math.min(2, high) };
  if (a < 3) return { low: Math.min(low, 2), high: Math.min(high, 4) };
  return { low, high: Math.min(high, Math.floor(a * 1.5)) };
}

/** Highly illustrative residual value band for discussion only */
export function estimateValueBand(
  lotsLow: number,
  lotsHigh: number,
  condition: "vacant" | "improved",
) {
  // Per finished lot residual conceptual range (land value share, not home price)
  const perLotLow = condition === "vacant" ? 280000 : 220000;
  const perLotHigh = condition === "vacant" ? 550000 : 480000;
  return {
    low: lotsLow * perLotLow,
    high: lotsHigh * perLotHigh,
  };
}

export function formatUsdShort(n: number) {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `$${m >= 10 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${Math.round(n / 1000)}k`;
}
