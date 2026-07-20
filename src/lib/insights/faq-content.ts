/** FAQ Answers & Planning Hub — categorized, journey-based */

export type FaqCategoryId =
  | "all"
  | "custom-home"
  | "remodel"
  | "land"
  | "rebuild"
  | "budget"
  | "process"
  | "realtors"
  | "investors";

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  categories: FaqCategoryId[];
  mostAsked?: boolean;
  links?: { href: string; label: string; badge?: string }[];
};

export const faqCategories: { id: FaqCategoryId; label: string }[] = [
  { id: "all", label: "All answers" },
  { id: "custom-home", label: "Building a custom home" },
  { id: "remodel", label: "Remodeling / renovating" },
  { id: "land", label: "Land & lots" },
  { id: "rebuild", label: "Rebuild vs renovate" },
  { id: "budget", label: "Budget & costs" },
  { id: "process", label: "Process & timeline" },
  { id: "realtors", label: "For realtors" },
  { id: "investors", label: "For investors" },
];

export const faqItems: FaqItem[] = [
  {
    id: "cost-custom",
    q: "What does a custom home cost in North Jersey?",
    a: "True custom homes with high-quality finishes in our market typically fall in directional ranges from roughly $350–$500+ per square foot for selective custom, $500–$700+ for high-end luxury, and higher for estate-level complexity. These figures are for the home itself — not land, major site work, or soft costs. National calculators rarely reflect Warren, Watchung, Basking Ridge, or Short Hills realities. The useful approach is ranges first, then Design & Discovery against your lot and program.",
    categories: ["budget", "custom-home"],
    mostAsked: true,
    links: [
      { href: "/cost-to-build-a-house-nj", label: "Open Cost Studio", badge: "Calculator" },
      {
        href: "/insights/what-it-really-costs-to-build-a-custom-home-in-north-jersey",
        label: "Read the cost guide",
        badge: "Insight",
      },
    ],
  },
  {
    id: "renovate-rebuild",
    q: "Should I renovate or rebuild?",
    a: "Renovation often wins when the structure is sound, the layout can improve without fighting the house, and costs stay meaningfully below replacement. Rebuild becomes smarter when ceilings, flow, and systems are compromised throughout, when renovation quotes approach a large share of rebuild cost, or when you want a fundamentally different home on a street you love. The right answer is the one that still feels smart five and ten years from now.",
    categories: ["rebuild", "remodel", "custom-home"],
    mostAsked: true,
    links: [
      { href: "/custom-homes/rebuilds#assessment", label: "Renovate vs rebuild assessment", badge: "Tool" },
      {
        href: "/insights/renovate-or-rebuild-north-jersey-2026",
        label: "2026 decision guide",
        badge: "Insight",
      },
    ],
  },
  {
    id: "lot-buildable",
    q: "Can I build on my lot?",
    a: "Buildability depends on more than acreage or a pretty listing photo. Zoning and setbacks, topography, soil and rock, utilities (sewer vs septic), and environmental constraints decide what you can actually place on the land. The most expensive mistake is falling in love with a property before understanding the envelope. A land evaluation protects the rest of the investment.",
    categories: ["land", "custom-home"],
    mostAsked: true,
    links: [
      { href: "/land/evaluation#feasibility-tool", label: "Lot feasibility tool", badge: "Tool" },
      {
        href: "/insights/what-makes-a-lot-buildable-north-jersey",
        label: "What makes a lot buildable",
        badge: "Insight",
      },
    ],
  },
  {
    id: "timeline",
    q: "How long does the process take?",
    a: "Timeline depends on scope: renovations and accessory structures can move faster; full custom homes and knockdown rebuilds involve design, approvals, and construction measured in many months. Multi-lot entitlements in New Jersey can take many months to multiple years. We set expectations early rather than promising speed without caveats. Design & Discovery is where we establish a realistic path for your project.",
    categories: ["process", "custom-home", "rebuild"],
    mostAsked: true,
    links: [
      { href: "/custom-homes/process", label: "7-step building process", badge: "Guide" },
      { href: "/start", label: "Start a conversation" },
    ],
  },
  {
    id: "architect-first",
    q: "Do I need an architect first?",
    a: "Not necessarily before a first conversation with us. Many clients start with feasibility, budget ranges, and lot reality — then architecture is coordinated as part of a structured process. If you already have an architect or plans, we collaborate and adapt. The goal is design that fits the lot, budget, and how you live — not drawings that ignore those constraints.",
    categories: ["process", "custom-home"],
    mostAsked: true,
    links: [
      { href: "/design-studio", label: "Design Studio", badge: "Studio" },
      { href: "/custom-homes/process", label: "How process works" },
    ],
  },
  {
    id: "service-area",
    q: "What areas do you serve?",
    a: "We specialize in Central & Northern New Jersey with a strong focus on Warren, Watchung, Basking Ridge, and Millburn–Short Hills, serving Somerset, Morris, Union, and Essex counties.",
    categories: ["process", "custom-home"],
    mostAsked: true,
    links: [{ href: "/locations", label: "Town guides" }],
  },
  {
    id: "no-surprises",
    q: "What does “No Surprises” mean?",
    a: "We discuss everything upfront, anticipate challenges, keep you informed every step of the way, and provide clear communication so you always know where the project stands. It is a philosophy of transparency — not a promise that construction is free of decisions, only that those decisions are surfaced early and honestly.",
    categories: ["process"],
    mostAsked: true,
    links: [{ href: "/about", label: "About Vantage" }],
  },
  {
    id: "design-discovery",
    q: "What is the Design & Discovery investment?",
    a: "Typical investment is $500–$2,500 based on project scope and complexity. This phase covers feasibility, preliminary design, and thorough cost analysis before construction commitment — so you gain clarity before larger deposits and full drawings.",
    categories: ["process", "budget", "custom-home"],
    links: [
      { href: "/custom-homes/process", label: "Process overview" },
      { href: "/start", label: "Request a consultation" },
    ],
  },
  {
    id: "deposit",
    q: "What deposit is required for construction?",
    a: "Deposits typically range from $5,000 to $30,000 depending on project scope, covering construction drawings, permitting fees, and site plan work when needed. Exact amounts are project-specific and discussed before commitment.",
    categories: ["budget", "process", "custom-home"],
  },
  {
    id: "online-plans",
    q: "Can you customize plans I found online?",
    a: "Yes. Already have plans or found inspiration elsewhere? We’ll adapt any design to create your ideal home while maintaining your vision — always checked against lot constraints and budget reality.",
    categories: ["custom-home", "process"],
    links: [
      { href: "/available-homes", label: "Browse available designs" },
      { href: "/design-studio", label: "Design Studio", badge: "Studio" },
    ],
  },
  {
    id: "cameras",
    q: "Do you offer job-site cameras?",
    a: "Yes — optional job-site camera for 24/7 remote viewing is available at approximately $50/month, ideal for out-of-state clients or anyone who wants visual peace of mind during construction.",
    categories: ["process"],
  },
  {
    id: "plan-pricing",
    q: "Are plan prices all-inclusive?",
    a: "Base plan pricing excludes land, sitework, permits, and utility connections. Selections and finishes also affect final pricing. We provide tailored estimates for your location rather than one national package price.",
    categories: ["budget", "custom-home"],
    links: [{ href: "/cost-to-build-a-house-nj", label: "Cost Studio", badge: "Calculator" }],
  },
  {
    id: "basement",
    q: "Is a finished lower level worth it?",
    a: "In luxury markets, a well-executed lower level is often one of the smartest upgrades: specialized spaces (theater, suite, gym, bar) without leaving the street, and efficient use of square footage you already own. Success depends on moisture management, height, light, HVAC, and finishes that match the main house — not furniture alone.",
    categories: ["remodel", "budget"],
    links: [
      { href: "/finished-basement-cost-nj", label: "Basement Builder", badge: "Studio" },
      {
        href: "/insights/finished-lower-level-luxury-upgrade-north-jersey",
        label: "Lower level guide",
        badge: "Insight",
      },
    ],
  },
  {
    id: "accessory",
    q: "What do pool houses and accessory buildings really cost?",
    a: "A finished accessory building is not a shed. Quality pool houses, collector garages, and guest suites typically require foundation, structure, electrical, often plumbing and HVAC, and exteriors that match the main home — frequently landing in the mid-six figures and beyond depending on size and finish. Zoning and whether a program becomes an ADU also matter.",
    categories: ["budget", "custom-home", "land"],
    links: [
      { href: "/custom-homes/accessory-buildings", label: "Accessory buildings", badge: "Guide" },
      { href: "/accessory-building-cost-nj", label: "Garage Studio", badge: "Studio" },
    ],
  },
  {
    id: "move-improve",
    q: "Should I move or improve my current home?",
    a: "Compare the true cost of selling and buying against the renovation or addition that solves the same problem. Selling costs, temporary living, and lifestyle disruption are easy to underestimate. Our Move or Improve calculator frames the tradeoff for North Jersey homeowners.",
    categories: ["remodel", "budget"],
    links: [
      { href: "/move-or-improve-calculator-nj", label: "Move or Improve calculator", badge: "Calculator" },
    ],
  },
  {
    id: "multi-lot",
    q: "What if I own larger acreage — multi-lot potential?",
    a: "Larger parcels may support sell as-is, entitle & sell, or partnership paths. Lot yield depends on zoning, topography, utilities, and municipal process. Conceptual tools help frame the conversation; a confidential assessment is how we get closer to a real range.",
    categories: ["land", "investors"],
    links: [
      { href: "/land/multi-lot", label: "Multi-lot development", badge: "Guide" },
      { href: "/land/multi-lot#highest-best-use", label: "HBU tool", badge: "Tool" },
    ],
  },
  {
    id: "realtors",
    q: "Do you work with realtors?",
    a: "Yes. We partner with realtors on land-to-home packages, buyer referrals, knockdowns, and listings that need a credible builder story. Collaboration is designed to protect your client relationships and reputation.",
    categories: ["realtors", "process"],
    links: [{ href: "/partners/realtors", label: "Realtor partners" }],
  },
  {
    id: "investors",
    q: "Do you work with investors?",
    a: "Yes. We engage with capital partners on loan, equity, and hybrid structures on select opportunities across Central and Northern New Jersey. Conversations are discreet and educational — not a public solicitation. Request an investor overview to start.",
    categories: ["investors", "process"],
    links: [{ href: "/partners/investors", label: "Investor overview" }],
  },
  {
    id: "kitchen",
    q: "Can I design a kitchen or other room before we meet?",
    a: "Yes. Our Studios let you explore kitchens, basements, garages, outdoor living, attics, and primary suites with live planning ranges. They are educational tools — then we refine on your home and budget in a real conversation.",
    categories: ["remodel", "budget"],
    links: [
      { href: "/studios", label: "All Studios", badge: "Studio" },
      { href: "/kitchen-remodel-cost-nj", label: "Kitchen Studio", badge: "Studio" },
    ],
  },
  {
    id: "adu",
    q: "Do you build ADUs?",
    a: "Yes. Accessory dwellings can support multi-gen living, guests, or long-term flexibility when the lot and ordinance allow. Feasibility, cost, and payback are project-specific — use the ADU calculator for orientation, then evaluate the site.",
    categories: ["custom-home", "land", "budget"],
    links: [
      { href: "/custom-homes/adus", label: "ADUs" },
      { href: "/adu-cost-calculator-nj", label: "ADU Payback calculator", badge: "Calculator" },
    ],
  },
];

export function faqsForJsonLd() {
  return faqItems.map((f) => ({ q: f.q, a: f.a }));
}

export function getMostAsked() {
  return faqItems.filter((f) => f.mostAsked);
}
