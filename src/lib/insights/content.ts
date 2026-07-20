/** Insights Resource Center — editorial catalog (pillar content + tools) */

export type InsightTopic =
  | "all"
  | "costs"
  | "process"
  | "land"
  | "renovation"
  | "towns"
  | "partners";

export type InsightArticle = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  topic: Exclude<InsightTopic, "all">;
  topicLabel: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  supporting?: boolean;
  includesTool?: boolean;
  toolLabel?: string;
  author?: string;
};

export const insightTopics: { id: InsightTopic; label: string }[] = [
  { id: "all", label: "All" },
  { id: "costs", label: "Costs & budgets" },
  { id: "process", label: "Process" },
  { id: "land", label: "Land & lots" },
  { id: "renovation", label: "Renovation" },
  { id: "towns", label: "Towns" },
  { id: "partners", label: "Partners" },
];

export const insightArticles: InsightArticle[] = [
  {
    id: "post-cost",
    title: "What It Really Costs to Build a Custom Home in North Jersey",
    excerpt:
      "Real ranges for luxury custom homes here — what online calculators miss, and how to plan with clarity.",
    href: "/insights/what-it-really-costs-to-build-a-custom-home-in-north-jersey",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "9 min",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Aerial of a custom North Jersey home site",
    featured: true,
    includesTool: true,
    toolLabel: "Includes Cost Studio",
    author: "Victor Lobozzo",
  },
  {
    id: "post-rebuild",
    title: "Renovate or Rebuild? How North Jersey Homeowners Are Deciding in 2026",
    excerpt:
      "When the street is right but the house is wrong — a practical framework for 2026 decisions.",
    href: "/insights/renovate-or-rebuild-north-jersey-2026",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "8 min",
    image: "/media/rebuilds/before-ranch-nj.webp",
    imageAlt: "North Jersey home before knockdown rebuild",
    supporting: true,
    includesTool: true,
    toolLabel: "Includes assessment",
    author: "Victor Lobozzo",
  },
  {
    id: "post-lot",
    title: "What Actually Makes a Lot Buildable in Warren, Watchung & Basking Ridge",
    excerpt:
      "Pretty land isn’t always buildable land. Setbacks, site costs, and when to walk away.",
    href: "/insights/what-makes-a-lot-buildable-north-jersey",
    topic: "land",
    topicLabel: "Land & lots",
    readTime: "8 min",
    image: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
    imageAlt: "Wooded residential lot in North Jersey",
    supporting: true,
    includesTool: true,
    toolLabel: "Includes setback tool",
    author: "Victor Lobozzo",
  },
  {
    id: "post-basement",
    title: "Why a Finished Lower Level Is One of the Smartest Luxury Upgrades",
    excerpt:
      "Claim square footage you already own — theaters, suites, gyms — designed like the main house.",
    href: "/insights/finished-lower-level-luxury-upgrade-north-jersey",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "7 min",
    image: "/media/basements/home-theater.jpg",
    imageAlt: "Luxury finished basement home theater",
    includesTool: true,
    toolLabel: "Includes Basement Builder",
    author: "Victor Lobozzo",
  },
  {
    id: "post-accessory",
    title: "The Rise of the Luxury Accessory Building (and What It Really Costs)",
    excerpt:
      "Pool houses, collector garages, guest suites — real construction with real numbers.",
    href: "/insights/luxury-accessory-buildings-north-jersey",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "8 min",
    image: "/media/garages/pool-pavilion.jpg",
    imageAlt: "Luxury pool house pavilion",
    includesTool: true,
    toolLabel: "Includes estimator",
    author: "Victor Lobozzo",
  },
  {
    id: "seven-steps",
    title: "7 steps to a no-surprises custom build",
    excerpt:
      "From first conversation through celebration — how Vantage structures process so you always know what happens next.",
    href: "/custom-homes/process",
    topic: "process",
    topicLabel: "Process",
    readTime: "6 min",
    image: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
    imageAlt: "Completed luxury custom home exterior",
    author: "Victor Lobozzo",
  },
  {
    id: "land-evaluation",
    title: "Can you build what you want on this lot?",
    excerpt:
      "Setbacks, site costs, and walk-away clarity — before you spend another dollar on land or plans.",
    href: "/land/evaluation",
    topic: "land",
    topicLabel: "Land & lots",
    readTime: "6 min",
    image: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
    imageAlt: "Residential lot and landscape for land evaluation",
    includesTool: true,
    toolLabel: "Includes setback tool",
  },
  {
    id: "multi-lot",
    title: "What could your acreage be worth as multiple lots?",
    excerpt:
      "Sell as-is, entitle & sell, or partner — a calm guide for landowners sitting on larger parcels.",
    href: "/land/multi-lot",
    topic: "land",
    topicLabel: "Land & lots",
    readTime: "7 min",
    image: "/media/plans/e2b59397-ridgeview-hires11-768x518.webp",
    imageAlt: "Multi-lot community setting",
    includesTool: true,
    toolLabel: "Includes HBU tool",
  },
  {
    id: "move-or-improve",
    title: "Move or improve? Running the real numbers",
    excerpt:
      "Selling costs vs the addition that solves the same problem — a calculator for the stay-or-go decision.",
    href: "/move-or-improve-calculator-nj",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "5 min",
    image: "/media/additions/kitchen-gathering.jpg",
    imageAlt: "Home addition gathering kitchen",
    includesTool: true,
    toolLabel: "Includes calculator",
  },
  {
    id: "basement-living",
    title: "Lower-level living that feels like the main house",
    excerpt:
      "Theaters, suites, gyms, and bars — how finished basements unlock square footage you already own.",
    href: "/transformations/basements",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "5 min",
    image: "/media/basements/home-theater.jpg",
    imageAlt: "Luxury finished basement home theater",
    includesTool: true,
    toolLabel: "Includes Basement Builder",
  },
  {
    id: "kitchen-studio",
    title: "Designing a kitchen you’ll still love in fifteen years",
    excerpt:
      "Style, layout, and planning ranges — explore finishes live in Kitchen Studio before you commit.",
    href: "/kitchen-remodel-cost-nj",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "5 min",
    image: "/media/kitchens/spaces/entertainer-open.jpg",
    imageAlt: "Luxury open entertainer kitchen",
    includesTool: true,
    toolLabel: "Includes Kitchen Studio",
  },
  {
    id: "adu-payback",
    title: "ADUs in New Jersey: lifestyle, income, and feasibility",
    excerpt:
      "Multi-gen living, guests, or long-term flexibility — with a payback calculator for the investment conversation.",
    href: "/adu-cost-calculator-nj",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "6 min",
    image: "/media/garages/guest-adu.webp",
    imageAlt: "Guest suite accessory dwelling",
    includesTool: true,
    toolLabel: "Includes ADU calculator",
  },
  {
    id: "towns",
    title: "Building in Warren, Watchung, Basking Ridge & Short Hills",
    excerpt:
      "Local notes on lots, lifestyle, and expectations — orientation for homeowners choosing where to plant roots.",
    href: "/locations",
    topic: "towns",
    topicLabel: "Towns",
    readTime: "4 min",
    image: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    imageAlt: "Luxury home exterior in North Jersey",
  },
  {
    id: "realtors",
    title: "How Vantage partners with realtors on land and rebuilds",
    excerpt:
      "Listing collaboration, knockdowns, and client handoffs that protect your reputation.",
    href: "/partners/realtors",
    topic: "partners",
    topicLabel: "Partners",
    readTime: "4 min",
    image: "/media/plans/d248b1cf-1448-day-render-768x512.webp",
    imageAlt: "Custom home rendering for realtor partners",
  },
  {
    id: "investors",
    title: "Structures for capital partners who care about craft",
    excerpt:
      "Loan, equity, and hybrid models — educational overview for serious investors, not a solicitation.",
    href: "/partners/investors",
    topic: "partners",
    topicLabel: "Partners",
    readTime: "5 min",
    image: "/media/plans/b642cae9-wellington-exterior-02-768x576.webp",
    imageAlt: "Luxury residence exterior for investor overview",
  },
  {
    id: "faq",
    title: "Straight answers before you pick up the phone",
    excerpt:
      "Budgets, deposits, cameras, service areas, and how “No Surprises” shows up in real projects.",
    href: "/insights/faq",
    topic: "process",
    topicLabel: "Process",
    readTime: "4 min",
    image: "/media/plans/fc48a99c-willowbrook_front_dusk1-768x432.webp",
    imageAlt: "Custom home at dusk",
  },
  {
    id: "accessory",
    title: "Pool houses, collector garages, and estate outbuildings",
    excerpt:
      "These are not sheds — cost reality, zoning, and a configurator for freestanding lifestyle structures.",
    href: "/custom-homes/accessory-buildings",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "6 min",
    image: "/media/garages/pool-pavilion.jpg",
    imageAlt: "Luxury pool house pavilion",
    includesTool: true,
    toolLabel: "Includes estimator",
  },
];

export const insightAudiences = [
  {
    id: "homeowners",
    title: "Homeowners",
    body: "Costs, process, renovate vs rebuild, and Studios for kitchens, basements, and outdoor living.",
    href: "/studios",
    cta: "Explore Studios",
  },
  {
    id: "landowners",
    title: "Landowners",
    body: "Lot feasibility, multi-lot value, and how to choose sell as-is vs develop.",
    href: "/land",
    cta: "Land opportunities",
  },
  {
    id: "realtors",
    title: "Realtors",
    body: "Partnership paths, rebuild opportunities, and tools that support your clients.",
    href: "/partners/realtors",
    cta: "Realtor resources",
  },
  {
    id: "investors",
    title: "Investors",
    body: "Capital structures, named communities, and a confidential overview request.",
    href: "/partners/investors",
    cta: "Investor overview",
  },
] as const;

export const gatedResource = {
  title: "7 Steps to Your Successful Build",
  body: "A clear, printable roadmap from first conversation through celebration — the same philosophy behind every Vantage project. Enter your email for the PDF.",
  pdfUrl:
    "https://vantageconstruct.com/wp-content/uploads/2024/12/7-Steps-To-Your-Successful-Build_web-1.pdf",
  eyebrow: "Flagship guide",
} as const;

export function getFeatured() {
  return insightArticles.find((a) => a.featured) ?? insightArticles[0];
}

export function getSupporting() {
  return insightArticles.filter((a) => a.supporting).slice(0, 2);
}

export function getBrowseArticles() {
  const featuredIds = new Set(
    [getFeatured(), ...getSupporting()].map((a) => a.id),
  );
  return insightArticles.filter((a) => !featuredIds.has(a.id));
}
