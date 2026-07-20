/** Rebuilds page content — FAQs, timeline, proof, case study */

export const rebuildFaqs = [
  {
    q: "What does it cost to knock down and rebuild a house in New Jersey?",
    a: "Construction-only costs for quality custom homes in Central & Northern NJ often run roughly the mid-$200s to $600+/sq ft depending on size and finish, plus demolition, utility disconnects/reconnects, sitework, permits, and temporary living. Demolition alone is usually a relatively small line item versus the new home. Use our Cost Studio for a construction range, then refine with a feasibility consult for your lot.",
  },
  {
    q: "How long does a knockdown rebuild take?",
    a: "A typical door-to-door timeline is about 12–18 months depending on design complexity, township reviews, and weather. Feasibility and design/permits often take several months before demolition week; construction then runs roughly 8–12+ months for a luxury custom program.",
  },
  {
    q: "Will rebuilding explode my property taxes?",
    a: "In New Jersey, significant improvements and new construction can trigger reassessment and higher taxes — that is real, and builders who dodge the topic are not doing you a favor. The impact varies by town, assessed value, and exemptions. We walk clients through a realistic conversation for their municipality as part of planning, not after the house is framed.",
  },
  {
    q: "Can I live in the home during a rebuild?",
    a: "No — a full teardown means the house is gone. Families typically rent nearby, stay with family, or sequence a short-term housing plan. We help you map the calendar so you know when keys leave and when keys return.",
  },
  {
    q: "Do I need to own the lot outright?",
    a: "You need clear authority to demolish and rebuild — usually fee-simple ownership. Existing mortgages, HELOCs, and construction financing must be coordinated early. We partner with lenders familiar with custom rebuild programs.",
  },
  {
    q: "Can any of the existing foundation be reused?",
    a: "Sometimes partial reuse is discussed, but many luxury rebuilds pour a new foundation for modern waterproofing, ceiling heights, layout freedom, and code performance. We evaluate case by case — honesty over wishful thinking.",
  },
  {
    q: "When is renovation smarter than rebuilding?",
    a: "When the structure is sound, systems are workable, ceilings and layout can be fixed without fighting the bones, and the size jump is modest. If renovation quotes approach 50–60% of rebuild cost for a compromised result, rebuild often wins. Our Renovate vs Rebuild assessment is designed to surface that honestly.",
  },
  {
    q: "What about asbestos, lead, or environmental surveys?",
    a: "Older North Jersey homes frequently need pre-demo surveys and specialized abatement. That is planned into the schedule and budget — not a last-minute surprise if we evaluate properly.",
  },
  {
    q: "How does permitting work for a rebuild?",
    a: "We handle design coordination and permit navigation as part of the process — zoning, setbacks, engineering, and township reviews. Feasibility comes first so we do not design a house the lot cannot legally hold.",
  },
  {
    q: "Can I build larger than my existing home?",
    a: "Often yes, within zoning: setbacks, height, coverage, and any HOA rules. Land Evaluation is step one — map what the lot can legally support before you fall in love with a floor plan.",
  },
] as const;

export const rebuildTimeline = [
  {
    id: "feasibility",
    phase: "Month 1",
    title: "Feasibility & land evaluation",
    duration: "2–4 weeks",
    summary: "Before anyone demos anything, we diagnose the lot.",
    details: [
      "Map setbacks, coverage, height, and what footprint is legal",
      "Discuss grading, walk-outs, drainage, and access",
      "Frame renovate-vs-rebuild economics with honest ranges",
      "Identify surveys, HOA, or flood/historic considerations early",
    ],
    homeowner: "You share goals, constraints, and how attached you are to staying.",
  },
  {
    id: "design",
    phase: "Months 2–4",
    title: "Architecture, design & permitting",
    duration: "8–14 weeks typical",
    summary: "We design from the ground up while navigating township process.",
    details: [
      "Custom plan or adapted Vantage design for your lot",
      "Finish direction and budget alignment (No Surprises)",
      "Permit packages, engineering, and municipal reviews",
      "Construction agreement and financing coordination",
    ],
    homeowner: "You choose how the home lives — we manage the bureaucracy.",
  },
  {
    id: "demo",
    phase: "Month 5",
    title: "Demolition & site prep",
    duration: "Often under a week for the structure",
    summary: "The old house comes down safely; the lot is prepared for the future.",
    details: [
      "Utility disconnects and required environmental clearances",
      "Controlled demolition with recycling where practical",
      "Site protection for neighbors and mature trees when possible",
      "Ready the pad for a modern foundation",
    ],
    homeowner: "You are already in temporary housing — we handle the chaos on site.",
  },
  {
    id: "foundation",
    phase: "Months 5–6",
    title: "Foundation & structure start",
    duration: "Several weeks",
    summary: "New waterproofing standards, ceiling heights, and structural freedom.",
    details: [
      "Modern foundation detailing for North Jersey conditions",
      "Basement / walk-out opportunities if the lot allows",
      "Framing begins the home you actually designed for",
    ],
    homeowner: "Weekly updates begin to feel real — photos of progress, not promises.",
  },
  {
    id: "build",
    phase: "Months 6–12+",
    title: "Build, systems & finishes",
    duration: "Majority of the calendar",
    summary: "From framing to final paint with elite trade partners.",
    details: [
      "MEP rough-in, insulation, drywall, millwork, finishes",
      "Kitchen, baths, primary suite, outdoor connections",
      "Inspections and quality checkpoints throughout",
    ],
    homeowner: "Selections are already locked — execution is disciplined and visible.",
  },
  {
    id: "movein",
    phase: "Months 12–18",
    title: "Certificate of occupancy & celebration",
    duration: "Closing the journey",
    summary: "Keys, walkthrough, and the housewarming you stayed in the neighborhood for.",
    details: [
      "Final inspections and C.O.",
      "Walkthrough and punch coordination",
      "Celebrate Beginnings — including how we ask for reviews",
    ],
    homeowner: "You move into the home that fits the life you already built on this street.",
  },
] as const;

export const rebuildProofTowns = [
  {
    town: "Warren",
    href: "/locations/warren-nj",
    note: "Home base — custom homes, rebuilds, and renovations rooted in township knowledge.",
  },
  {
    town: "Watchung",
    href: "/locations/watchung-nj",
    note: "Hilltop lots where grade, views, and outdoor living define the rebuild.",
  },
  {
    town: "Basking Ridge",
    href: "/locations/basking-ridge-nj",
    note: "Stay-for-schools families who outgrew the house, not the neighborhood.",
  },
  {
    town: "Millburn–Short Hills",
    href: "/locations/millburn-short-hills-nj",
    note: "Detail-driven rebuilds and luxury renovations to community standards.",
  },
  {
    town: "Westfield",
    href: "/locations/westfield-nj",
    note: "Move-or-improve decisions with strong downtown lifestyle gravity.",
  },
] as const;

export const rebuildCaseStudy = {
  title: "The street they refused to leave",
  town: "Somerset County, NJ",
  original: "Aging multi-level home · cramped kitchen · low ceilings · outdated systems",
  result: "Custom luxury rebuild on the same lot · open main level · true primary suite · modern systems",
  story: [
    "They loved the schools, the neighbors, and the trees. They did not love fighting a layout designed for a different century of living.",
    "A serious renovation quote fixed some rooms — and left others compromised. When renovation cost crossed the threshold of a clean rebuild, the decision flipped from scary to obvious.",
    "Demolition week was emotional. Move-in day was not. Same street. Same roots. A house that finally matches the life they built there.",
  ],
  metrics: [
    { label: "Decision driver", value: "Stay for schools" },
    { label: "Path", value: "Full knockdown rebuild" },
    { label: "Typical timeline", value: "12–18 months" },
  ],
};

export type TransformationPair = {
  id: string;
  town: string;
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
  caption: string;
  note?: string;
};

/**
 * Visual pairs for the slider. Until project-true before photos are archived,
 * we use conceptual pairs (dated home → luxury Vantage-style exterior) clearly labeled.
 */
export const transformationPairs: TransformationPair[] = [
  {
    id: "ranch-to-farmhouse",
    town: "North Jersey lot concept",
    beforeLabel: "Dated ranch",
    afterLabel: "Modern farmhouse rebuild",
    beforeSrc: "/media/rebuilds/before-ranch-nj.webp",
    afterSrc: "/media/plans/dfd9c703-3349farmr1-1-768x512.webp",
    caption: "Same mature trees. Same street. Entirely different home.",
    note: "Conceptual transformation for illustration — real Vantage project before/after photography will replace these as archive grows.",
  },
  {
    id: "cape-to-estate",
    town: "Central NJ lot concept",
    beforeLabel: "Tired cape / colonial",
    afterLabel: "Custom estate exterior",
    beforeSrc: "/media/rebuilds/before-cape-nj.webp",
    afterSrc: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    caption: "Outgrown house, irreplaceable lot — the classic rebuild story.",
    note: "Conceptual transformation for illustration.",
  },
  {
    id: "gray-to-color",
    town: "Design language",
    beforeLabel: "Massing study",
    afterLabel: "Finished luxury exterior",
    beforeSrc: "/media/plans/fc4d8e5e-1479-grayscale-model-front-768x512.webp",
    afterSrc: "/media/plans/25827d7e-1479-front-rendering-768x512.webp",
    caption: "From massing to finished architecture — how a lot earns a new silhouette.",
  },
];

export const costDrivers = [
  {
    title: "Size & massing",
    body: "Square footage still matters — but so do stories, roof complexity, and whether you want walk-out lower levels.",
  },
  {
    title: "Finish tier",
    body: "Premium, luxury, and estate finishes move totals as much as floor area. We publish plan anchors so the conversation stays real.",
  },
  {
    title: "Demolition & site",
    body: "Demo is rarely the scary line item. Site conditions, drainage, utilities, and abatement on older homes are where surprises hide — unless you plan them.",
  },
  {
    title: "Township & engineering",
    body: "Permits, reviews, and engineered solutions are part of North Jersey building. Feasibility first prevents designing an illegal dream.",
  },
];
