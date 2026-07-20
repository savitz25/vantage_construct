/** Multi-lot development page — advisory tone, heavy disclaimers */

export const multiLotDisclaimer =
  "Conceptual illustration only — not an appraisal, survey, engineering study, entitlement guarantee, or offer. Lot yield, values, timelines, and feasibility vary by zoning, topography, environment, utilities, market, and township process. Final conclusions require professional evaluation. Named communities illustrate capability; past results do not guarantee future outcomes on your parcel. Project scale details discussed confidentially.";

/**
 * Three paths framed by involvement & risk — Vantage as guide, not pressure.
 * Order: lowest involvement → highest partnership.
 */
export const multiLotPaths = [
  {
    id: "sell-as-is",
    title: "Sell as-is",
    tagline: "Fastest · simplest · usually lowest value",
    involvement: "Low",
    risk: "Low process risk · higher opportunity cost",
    body: "Market the parcel in its current condition. Cleanest exit for some owners — but sophisticated buyers discount for entitlement, infrastructure, and development risk, so raw or under-entitled land often trades below developed potential.",
    pros: ["Fewer decisions", "Shorter personal timeline", "Minimal process involvement"],
    cons: ["Buyer prices in their risk", "You may leave meaningful upside on the table", "Less control over what the land becomes"],
    bestFor: "Owners who want a clean exit without township process.",
    vantageRole: "We can still run a quick highest-and-best-use read so you negotiate from knowledge — even if you choose a simple sale.",
  },
  {
    id: "entitle-and-sell",
    title: "Entitle & sell",
    tagline: "Add value through approvals, then exit",
    involvement: "Medium",
    risk: "Process risk · often higher realized value",
    body: "Advance concept planning, applications, and key approvals so the land is sold as a clearer multi-lot opportunity — not just raw acreage. You capture more of the entitlement premium without necessarily building homes yourself.",
    pros: ["Can unlock substantial value vs as-is", "Exit remains available after milestones", "Buyers compete for de-risked opportunity"],
    cons: ["Months to years of process", "Soft costs and carrying costs", "Approvals are never guaranteed"],
    bestFor: "Owners willing to invest time (and selective capital) to improve sale terms.",
    vantageRole: "We guide feasibility, consultant coordination, and municipal navigation — then help position the opportunity for a strategic sale.",
  },
  {
    id: "partner-vantage",
    title: "Partner with Vantage",
    tagline: "Develop together — or Vantage leads the process",
    involvement: "Flexible · shared",
    risk: "Shared roles · aligned to the parcel",
    body: "Work with an experienced builder-developer who has delivered multi-lot communities in this market. Structures vary: land contribution, joint venture, phased partnership, or Vantage-led development with defined owner economics — always in writing after underwriting.",
    pros: ["Potential for the highest long-term outcome", "Local entitlement + construction execution", "Craftsmanship standards that protect neighborhood value"],
    cons: ["Longer horizon", "Roles, capital, and risk must be explicit", "Not every parcel pencils as a partnership"],
    bestFor: "Owners open to a thoughtful partnership in exchange for upside and professional execution.",
    vantageRole: "From confidential assessment through entitlement and build-out — we calibrate your involvement so risk matches your goals.",
  },
] as const;

/** Optional side-by-side for quick scanning */
export const sellVsDevelopRows = [
  {
    factor: "Speed to cash",
    sell: "Often fastest",
    develop: "Slower — process-dependent",
  },
  {
    factor: "Complexity for owner",
    sell: "Lowest",
    develop: "Medium to high (unless partner-led)",
  },
  {
    factor: "Value capture",
    sell: "Usually lowest",
    develop: "Often meaningfully higher if feasible",
  },
  {
    factor: "Township / approvals",
    sell: "Buyer inherits risk",
    develop: "You (or partner) navigate process",
  },
  {
    factor: "Best when…",
    sell: "Certainty and simplicity matter most",
    develop: "Land supports multi-lot upside and timeline allows",
  },
] as const;

export const multiLotProcess = [
  {
    step: "01",
    title: "Confidential conversation",
    body: "Share acreage, location, goals, ownership context, and constraints. We listen before we model.",
  },
  {
    step: "02",
    title: "Highest & best use lens",
    body: "Zoning density, topography, utilities, access, and market demand — honest screening for what is realistic.",
  },
  {
    step: "03",
    title: "Path recommendation",
    body: "Sell as-is, entitle & sell, or partner with Vantage — with clear reasons and rough order-of-magnitude economics.",
  },
  {
    step: "04",
    title: "If we proceed",
    body: "Written roles, timeline expectations, and next technical steps (survey, engineering, applications) only after mutual fit.",
  },
] as const;

/**
 * Named multi-lot communities — strongest credibility assets.
 * Metrics use portfolio-accurate framing without inventing unverified lot counts.
 * Replace acreage/lots with exact figures when verified from project files.
 */
export const multiLotProjects = [
  {
    id: "hidden-hollow",
    name: "Hidden Hollow Estates",
    location: "Central / Northern New Jersey",
    originalAcreage: "Multi-acre estate land",
    lotsCreated: "Boutique multi-lot community",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Aerial community setting representing Hidden Hollow Estates scale and character",
    story:
      "A multi-lot luxury community executed with disciplined siting, road and lot logic, and finish standards that hold long after the last certificate of occupancy. Proof that thoughtful layout — not density for density’s sake — creates lasting neighborhood character.",
    highlights: ["Entitlement navigation", "Premium lot layout", "Luxury home execution"],
  },
  {
    id: "prospect-hill",
    name: "Prospect Hill Estates",
    location: "Premium North Jersey setting",
    originalAcreage: "Estate-scale parcel opportunity",
    lotsCreated: "Select multi-homesite development",
    image: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
    imageAlt: "Luxury residential community character at Prospect Hill Estates caliber",
    story:
      "Land strategy paired with custom and Signature-quality homes in a market that rewards restraint and craft. Prospect Hill demonstrates how highest-and-best-use thinking and construction excellence work together — not as separate conversations.",
    highlights: ["Highest & best use", "Custom / Signature quality", "Market-aligned product"],
  },
  {
    id: "winding-ridge",
    name: "Winding Ridge Estates",
    location: "North / Central Jersey",
    originalAcreage: "Contoured multi-acre land",
    lotsCreated: "Thoughtful multi-lot layout",
    image: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
    imageAlt: "Wooded estate homesites illustrating Winding Ridge Estates community setting",
    story:
      "Access planning, lot orientation, and topography-aware design for a community that feels intentional rather than forced. Winding Ridge is the kind of project that only works when land reading and municipal process are treated as craft — not checkboxes.",
    highlights: ["Topography-aware siting", "Access & frontage logic", "Lasting streetscape"],
  },
] as const;

/** NJ entitlement reality — trust through transparency */
export const entitlementSteps = [
  {
    title: "Concept & feasibility",
    body: "Early read of zoning, density, environmental constraints, utilities, and access. This is where many parcels are politely ruled out — saving years of false hope.",
  },
  {
    title: "Concept / sketch plan",
    body: "A professional concept showing possible lotting, roads, and open space. Not an approval — a tool for honest conversation with consultants and the township.",
  },
  {
    title: "Planning board process",
    body: "Applications, notices, hearings, engineer review, and conditions of approval. Cadence and culture vary by municipality; experience with local boards matters.",
  },
  {
    title: "County & environmental reviews",
    body: "Where applicable: county planning, soil conservation, wetlands, stormwater, and related agencies. These tracks often run in parallel and can extend the critical path.",
  },
  {
    title: "Final maps, bonds & infrastructure",
    body: "Recording, performance guarantees, and construction of roads/utilities when required before lots can be sold or built. This is where capital and schedule discipline show.",
  },
] as const;

export const entitlementTimeline = {
  headline: "Typical timeline reality in New Jersey",
  range: "Many months to multiple years",
  detail:
    "Simple minor subdivisions can move faster; major subdivisions with environmental complexity often take far longer. Anyone quoting a fixed short timeline without caveats is not being careful with your expectations.",
};

export const entitlementObstacles = [
  "Zoning density lower than hoped — or bulk standards that kill lot yield",
  "Wetlands, steep slopes, floodplain, or tree ordinances",
  "Septic vs sewer capacity and well constraints",
  "Road frontage, sight distance, and emergency access requirements",
  "Neighbor opposition and hearing dynamics",
  "Stormwater, open space, and COAH / affordable housing conditions where applicable",
  "Carrying costs (taxes, soft costs, interest) during a long process",
] as const;

/** How a Vantage multi-lot partnership typically works */
export const partnershipHowItWorks = [
  {
    step: "01",
    title: "Mutual fit first",
    body: "Confidential assessment of the land and your goals. If the parcel is not a multi-lot candidate, we say so.",
  },
  {
    step: "02",
    title: "Roles & economics",
    body: "Who contributes land, capital, and sweat equity; how returns are shared; who leads municipal process. Documented only after underwriting.",
  },
  {
    step: "03",
    title: "Entitlement leadership",
    body: "Vantage coordinates consultants and process navigation — drawing on repeated North Jersey multi-lot experience.",
  },
  {
    step: "04",
    title: "Build or strategic exit",
    body: "Depending on the structure: develop premium lots and homes, phase sales, or exit after key approvals with value already created.",
  },
] as const;

export const multiLotFaqs = [
  {
    q: "What is multi-lot development?",
    a: "Creating more than one buildable homesite from a larger parcel through planning, approvals, and infrastructure — rather than selling or building on the land as a single lot only. Not every property supports this path.",
  },
  {
    q: "How many lots can I get from my acreage?",
    a: "It depends on zoning density, setbacks, road frontage, topography, wetlands, septic vs sewer, and township standards. The interactive tool on this page is conceptual only. A confidential land assessment is how we get closer to a real range for your specific parcel.",
  },
  {
    q: "How long do approvals take in New Jersey?",
    a: "Often many months to multiple years depending on complexity, environmental review, and municipal process. Minor subdivisions can be faster; major multi-lot projects with environmental constraints take longer. We set expectations early rather than selling speed.",
  },
  {
    q: "What does a partnership with Vantage look like?",
    a: "Structures vary: land contribution with shared development economics, joint venture, phased partnership, or Vantage-led process with defined owner outcomes. Nothing is assumed — roles, capital, and risk are written only after mutual fit and underwriting. This page is not an investment solicitation.",
  },
  {
    q: "Do I have to put up all the capital?",
    a: "Not necessarily. Some owners contribute land while partners bring development expertise and capital; others sell after feasibility or entitlements clarify value. Terms are deal-specific and documented only in written agreements.",
  },
  {
    q: "Sell as-is vs develop — how do I choose?",
    a: "It depends on timeline, risk tolerance, carrying capacity, and whether the land truly supports multi-lot upside. Vantage’s role is to help you choose the right level of involvement — not to push every owner into development.",
  },
  {
    q: "What does a confidential land assessment include?",
    a: "A discreet conversation and high-level feasibility read: realistic lot potential order of magnitude, major red flags, and which path (sell as-is, entitle & sell, or partner) appears most rational — not a formal appraisal or engineering report.",
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
