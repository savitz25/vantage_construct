/** Content for Land Evaluation feasibility experience */

export const evaluationFactors = [
  {
    id: "zoning",
    title: "Zoning & setbacks",
    body: "What the ordinance allows: height, coverage, yards, and accessory structures — and where variances get hard.",
    icon: "01",
  },
  {
    id: "topo",
    title: "Topography & drainage",
    body: "Slope, cut/fill, walk-out potential, and where water wants to go after a North Jersey storm.",
    icon: "02",
  },
  {
    id: "soil",
    title: "Soil & rock",
    body: "Bearing, rock ledge, and what site prep can quietly add six figures before the first foundation pour.",
    icon: "03",
  },
  {
    id: "utilities",
    title: "Utilities, septic & well",
    body: "Sewer vs septic, water, electric, gas — and the cost of bringing service to a raw or underserved site.",
    icon: "04",
  },
  {
    id: "env",
    title: "Wetlands, flood & environment",
    body: "Buffers, flood zones, and environmental constraints that can shrink the dream footprint overnight.",
    icon: "05",
  },
  {
    id: "access",
    title: "Access, driveway & easements",
    body: "Legal access, steep drives, shared roads, and easements that limit where a home can sit.",
    icon: "06",
  },
  {
    id: "siting",
    title: "Sun, views & placement",
    body: "Optimal orientation for light, privacy, and architecture — so the house fits the land, not the reverse.",
    icon: "07",
  },
] as const;

export const evaluationDeliverables = [
  "Clear read on whether your intended program is realistic on this lot",
  "Setback and buildable-envelope thinking in plain language",
  "Flags for high-risk site conditions (rock, drainage, wetlands, utilities)",
  "Honest path: pursue · redesign · or walk away",
  "Next-step roadmap into Design & Discovery, rebuild, or land search",
] as const;

export const evaluationCases = [
  {
    title: "The lot we told them not to buy",
    town: "Somerset County, NJ",
    outcome: "Walk away",
    story:
      "A beautiful wooded parcel with a marketing story of “build your dream home.” Early zoning and environmental review showed wetlands buffers and access constraints that would have forced a tiny, expensive house or a multi-year variance fight. The family bought a cleaner site six weeks later — and thanked us for the save.",
    lesson: "The best evaluation sometimes ends with a no.",
  },
  {
    title: "The slope that became a walk-out estate",
    town: "Watchung / hill country, NJ",
    outcome: "Build smart",
    story:
      "A steep lot looked “impossible” at first glance. Evaluation mapped a rear walk-out lower level, driveway geometry, and drainage that turned topography into architecture. The home sits as if it always belonged — because the land was read before the floor plan was drawn.",
    lesson: "Difficulty is not the enemy. Surprise is.",
  },
] as const;

export const townInsights = [
  {
    town: "Warren",
    href: "/locations/warren-nj",
    notes:
      "Mature lots, tree and grading sensitivity, mix of sewer/septic. Knockdown feasibility often turns on setbacks and coverage more than raw size.",
  },
  {
    town: "Watchung",
    href: "/locations/watchung-nj",
    notes:
      "Hillside topography rewards walk-outs and careful drainage. Access, retaining, and views drive both cost and design opportunity.",
  },
  {
    town: "Basking Ridge",
    href: "/locations/basking-ridge-nj",
    notes:
      "Strong stay-and-improve market. Lot evaluation often pairs with renovate-vs-rebuild decisions when the house is wrong but the street is right.",
  },
  {
    town: "Millburn–Short Hills",
    href: "/locations/millburn-short-hills-nj",
    notes:
      "High finish expectations and tight neighborhood context. Envelope, height, and neighbor-sensitive massing matter as much as square footage.",
  },
  {
    town: "Westfield",
    href: "/locations/westfield-nj",
    notes:
      "Often tighter lots near downtown amenities. Additions and rebuilds need honest setback and coverage math early.",
  },
] as const;

export const evaluationFaqs = [
  {
    q: "What is a land evaluation with Vantage?",
    a: "A professional feasibility review of a property — zoning envelope, topography, utilities, access, and environmental flags — so you know what you can realistically build before you over-commit. It is not a formal survey or engineering report; it is expert builder guidance that tells you when those next steps are required.",
  },
  {
    q: "When should I get a lot evaluation?",
    a: "Ideally before you go under contract on land, or before you fall in love with a floor plan for a lot you already own. Pre-purchase audits prevent expensive surprises. Post-purchase evaluations still save money by locking the right siting and budget early.",
  },
  {
    q: "Can you tell me if a lot is “unbuildable”?",
    a: "We can identify high-risk or high-constraint properties and explain what would be required to make a program work. Final determinations often involve township officials, surveyors, engineers, or environmental consultants — we help you know when those specialists are necessary.",
  },
  {
    q: "How much do hidden site costs usually run in North Jersey?",
    a: "It varies widely. Rock, long utility runs, steep drives, septic systems, and retaining can move totals by tens or hundreds of thousands. The setback visualizer and cost flags on this page are educational — a Vantage evaluation grounds the conversation in your actual property.",
  },
  {
    q: "Do you evaluate knockdown lots?",
    a: "Yes. Many of our best projects start with a house the client no longer wants on land they refuse to leave. Evaluation covers both the teardown path and whether renovation still makes more sense.",
  },
  {
    q: "What do I receive after a Rapid Feasibility Review?",
    a: "A clear conversation (and written notes when appropriate) covering buildability of your intended program, major risk flags, and recommended next steps — pursue, redesign, or walk. When you’re ready, we path into Design & Discovery or land search support.",
  },
  {
    q: "Is every town’s zoning the same?",
    a: "No. Warren, Watchung, Basking Ridge, Millburn–Short Hills, Westfield, and surrounding municipalities each have their own ordinances and practices. The insights on this page are high-level orientation only — every parcel must be verified.",
  },
  {
    q: "How does this connect to Cost Studio and Design Studio?",
    a: "Land evaluation answers “can we build it here?” Cost Studio frames construction ranges. Design Studio explores style and program. Together they prevent designing a house the lot cannot legally or practically hold.",
  },
] as const;

export const siteCostFlags = [
  { id: "slope", label: "Noticeable slope / hill", impactLow: 25000, impactHigh: 120000 },
  { id: "rock", label: "Known rock / ledge risk", impactLow: 40000, impactHigh: 200000 },
  { id: "driveway", label: "Long or steep driveway", impactLow: 15000, impactHigh: 80000 },
  { id: "trees", label: "Heavy tree clearing needed", impactLow: 8000, impactHigh: 45000 },
  { id: "septic", label: "Septic / well (no sewer)", impactLow: 25000, impactHigh: 75000 },
  { id: "retaining", label: "Retaining walls likely", impactLow: 20000, impactHigh: 100000 },
  { id: "wetlands", label: "Wetlands / buffer concern", impactLow: 15000, impactHigh: 90000 },
  { id: "utilities", label: "Long utility runs", impactLow: 12000, impactHigh: 60000 },
] as const;
