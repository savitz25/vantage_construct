/**
 * Full editorial Insights articles — official Vantage longform copy.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "pull"; text: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "cta"; label: string; href: string; body?: string };

export type InsightPost = {
  slug: string;
  /** Previous slugs for redirects / aliases */
  aliases?: string[];
  title: string;
  metaDescription: string;
  excerpt: string;
  topic: "costs" | "process" | "land" | "renovation" | "towns" | "partners";
  topicLabel: string;
  readTime: string;
  author: string;
  datePublished: string;
  image: string;
  imageAlt: string;
  includesTool?: boolean;
  toolLabel?: string;
  body: PostBlock[];
  closingCta: { label: string; href: string; body: string };
};

export const insightPosts: InsightPost[] = [
  {
    slug: "what-it-really-costs-to-build-a-custom-home-in-north-jersey",
    title: "What It Really Costs to Build a Custom Home in North Jersey",
    metaDescription:
      "Real cost ranges for luxury custom homes in North Jersey, including what most online calculators miss and how Vantage approaches transparent pricing.",
    excerpt:
      "National averages don’t apply to Warren, Watchung, or Short Hills. Here’s a clearer picture of what high-quality custom construction actually costs — and what moves the number.",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "9 min",
    author: "Victor Lobozzo",
    datePublished: "2026-03-12",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Aerial view of a luxury custom home site in North Jersey",
    includesTool: true,
    toolLabel: "Includes Cost Studio",
    body: [
      {
        type: "p",
        text: "In North Jersey, the question we hear more than almost any other is simple: “What does it actually cost to build?”",
      },
      {
        type: "p",
        text: "The problem is that most answers online are either too vague or based on national averages that have little to do with Warren, Watchung, Basking Ridge, Millburn, or Short Hills. Building here is a different market — with different labor costs, different site conditions, different expectations, and different finishing standards.",
      },
      {
        type: "p",
        text: "Here’s a clearer picture based on real projects.",
      },
      { type: "h2", text: "The realistic range" },
      {
        type: "p",
        text: "For a true custom home with high-quality finishes in our market, most projects currently fall in a broad but meaningful range:",
      },
      {
        type: "ul",
        items: [
          "Selective custom / elevated finishes: roughly $350–$500+ per square foot",
          "High-end luxury: $500–$700+ per square foot",
          "Estate-level detailing and complexity: $700–$900+ per square foot in some cases",
        ],
      },
      {
        type: "p",
        text: "These numbers are for the home itself. They do not include land, major site work, permits, or soft costs.",
      },
      {
        type: "pull",
        text: "A simple national “cost per square foot” calculator is almost useless here. A 4,500 square foot home can land in very different places depending on the lot, the architecture, and the level of finish.",
      },
      { type: "h2", text: "What actually drives cost" },
      {
        type: "p",
        text: "Several factors move the number more than people expect:",
      },
      {
        type: "ul",
        items: [
          "Site conditions — Rock, slope, drainage, long driveways, and retaining walls can add significant cost before the foundation is even poured.",
          "Architectural complexity — Multiple roof lines, heavy exterior detailing, and large spans increase both material and labor.",
          "Finish level — Cabinetry, stone, millwork, windows, and mechanical systems create the biggest swings in the budget.",
          "Lower levels and outdoor living — Finished basements, covered outdoor kitchens, and accessory structures add real value but also real cost.",
        ],
      },
      { type: "h2", text: "The honest way to budget" },
      {
        type: "p",
        text: "The most useful approach is not to chase a single magic number. It is to work in ranges and decision stages:",
      },
      {
        type: "ol",
        items: [
          "Establish a realistic all-in budget (including land and site work if applicable).",
          "Determine the size and quality level that budget can support.",
          "Design to that target instead of designing first and pricing later.",
        ],
      },
      {
        type: "callout",
        title: "Clarity early — not surprises later",
        text: "This is the philosophy behind our Cost Studio and the way we run Design & Discovery. The goal is clarity early — not surprises later.",
      },
      {
        type: "cta",
        label: "Open the Cost Studio",
        href: "/cost-to-build-a-house-nj",
        body: "Model a North Jersey construction range as size, style, and finish change — then talk through the real drivers on your project.",
      },
      { type: "h2", text: "Final thought" },
      {
        type: "p",
        text: "A custom home in North Jersey is one of the largest investments most families will ever make. The builders who serve this market best are the ones willing to talk about cost with precision and honesty from the beginning.",
      },
      {
        type: "p",
        text: "If you’d like a clearer sense of where your project might land, the best next step is a conversation grounded in your actual lot, goals, and priorities — not a generic online average.",
      },
    ],
    closingCta: {
      label: "Explore the Cost Studio",
      href: "/cost-to-build-a-house-nj",
      body: "See a live planning range for your size and finish intent — then schedule a conversation when you’re ready.",
    },
  },
  {
    slug: "renovate-or-rebuild-north-jersey-2026",
    aliases: ["renovate-or-rebuild-north-jersey-homeowners-2026"],
    title: "Renovate or Rebuild? How North Jersey Homeowners Are Deciding in 2026",
    metaDescription:
      "A practical look at when a major renovation still makes sense — and when a knockdown rebuild is the smarter long-term decision in North Jersey.",
    excerpt:
      "One of the most important conversations in Warren, Watchung, and Basking Ridge right now isn’t about style. It’s renovate what you have — or start over.",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "8 min",
    author: "Victor Lobozzo",
    datePublished: "2026-04-02",
    image: "/media/rebuilds/before-ranch-nj.webp",
    imageAlt: "North Jersey home before renovate-or-rebuild decision",
    includesTool: true,
    toolLabel: "Includes assessment",
    body: [
      {
        type: "p",
        text: "One of the most important conversations happening in towns like Warren, Watchung, and Basking Ridge right now is not about style or square footage. It’s about the fundamental decision:",
      },
      {
        type: "p",
        text: "Should we renovate what we have, or start over?",
      },
      {
        type: "p",
        text: "There is no universal answer. But there is a clearer way to think about it.",
      },
      { type: "h2", text: "When renovation still wins" },
      {
        type: "p",
        text: "A major renovation is often the better path when:",
      },
      {
        type: "ul",
        items: [
          "The existing structure is sound and well-positioned on the lot",
          "The current layout can be improved without fighting the original house",
          "The homeowner loves the neighborhood and the basic footprint",
          "The cost of fixing the house remains meaningfully lower than replacement",
        ],
      },
      {
        type: "p",
        text: "In these cases, a thoughtful renovation can deliver an excellent result with less disruption.",
      },
      { type: "h2", text: "When rebuild becomes the smarter move" },
      {
        type: "p",
        text: "Rebuild starts to make more sense when several of these are true:",
      },
      {
        type: "ul",
        items: [
          "The existing home has low ceilings, poor flow, or outdated systems throughout",
          "The layout fights modern living no matter how much money is spent",
          "Structural or moisture issues keep appearing",
          "The homeowner wants a meaningfully larger or completely different home",
          "Renovation quotes start approaching 50–60% (or more) of rebuild cost",
        ],
      },
      {
        type: "pull",
        text: "At a certain point, you are no longer “saving the house.” You are paying a premium to keep its limitations.",
      },
      { type: "h2", text: "The hidden cost of partial measures" },
      {
        type: "p",
        text: "One of the most common frustrations we see is the homeowner who spends heavily on a first-floor renovation, only to realize a few years later that the second floor, systems, and overall structure still feel compromised. The result is a house that has absorbed a great deal of money without ever becoming what the family actually wanted.",
      },
      {
        type: "p",
        text: "A full rebuild, while more expensive up front, often delivers a cleaner outcome: modern systems, better light, better proportions, and a home designed for how the family actually lives.",
      },
      { type: "h2", text: "A better decision framework" },
      {
        type: "p",
        text: "Instead of starting with emotion or a single contractor’s opinion, evaluate:",
      },
      {
        type: "ol",
        items: [
          "What is truly wrong with the current house?",
          "How much of the existing structure can honestly be reused?",
          "What would a comprehensive renovation cost versus a new home on the same lot?",
          "How long does the family intend to stay?",
        ],
      },
      {
        type: "callout",
        title: "Think five and ten years out",
        text: "The right answer is the one that still feels smart five and ten years from now — not only on the day the bid arrives.",
      },
      {
        type: "cta",
        label: "Take the renovate vs rebuild assessment",
        href: "/custom-homes/rebuilds#assessment",
        body: "A guided tool for North Jersey homeowners weighing stay-and-renovate against rebuild on the same lot.",
      },
    ],
    closingCta: {
      label: "Explore knockdowns & rebuilds",
      href: "/custom-homes/rebuilds",
      body: "See the framework, interactive assessment, and next steps for renovate vs rebuild.",
    },
  },
  {
    slug: "what-makes-a-lot-buildable-north-jersey",
    aliases: ["what-makes-a-lot-buildable-warren-watchung-basking-ridge"],
    title: "What Actually Makes a Lot Buildable in Warren, Watchung & Basking Ridge",
    metaDescription:
      "The real factors that determine whether a lot in North Jersey can support the home you want — beyond just acreage and price.",
    excerpt:
      "Not every beautiful lot is a good building lot. Here’s what actually decides buildability in our core towns.",
    topic: "land",
    topicLabel: "Land & lots",
    readTime: "8 min",
    author: "Victor Lobozzo",
    datePublished: "2026-04-18",
    image: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
    imageAlt: "Wooded residential lot landscape in North Jersey",
    includesTool: true,
    toolLabel: "Includes setback tool",
    body: [
      {
        type: "p",
        text: "Not every beautiful lot is a good building lot. And not every challenging lot is a bad one.",
      },
      {
        type: "p",
        text: "In North Jersey, the difference often comes down to a handful of practical realities that are easy to miss when you’re standing on the property for the first time.",
      },
      { type: "h2", text: "The factors that matter most" },
      { type: "h3", text: "1. Zoning and setbacks" },
      {
        type: "p",
        text: "Every town has rules about how close you can build to property lines, how much of the lot you can cover, and what height is allowed. These rules quietly determine the real size and shape of the home you can create.",
      },
      { type: "h3", text: "2. Topography" },
      {
        type: "p",
        text: "Slope is not automatically a problem. In many cases, it becomes an opportunity for a walk-out lower level. But steep grades, poor drainage, or the need for extensive retaining walls can change the budget quickly.",
      },
      { type: "h3", text: "3. Soil and rock" },
      {
        type: "p",
        text: "Rock close to the surface, poor-bearing soils, or high water tables can add significant cost before the foundation is even complete.",
      },
      { type: "h3", text: "4. Utilities" },
      {
        type: "p",
        text: "Public sewer versus septic, public water versus well, and the distance to connect services all influence both feasibility and cost.",
      },
      { type: "h3", text: "5. Environmental constraints" },
      {
        type: "p",
        text: "Wetlands, buffers, flood zones, and conservation easements can dramatically reduce the usable area of a property — or stop a project entirely.",
      },
      {
        type: "pull",
        text: "The most expensive lot is the one that forces you into a house you never wanted — or a variance fight you never budgeted.",
      },
      { type: "h2", text: "The most expensive mistake" },
      {
        type: "p",
        text: "The most costly error we see is falling in love with a property before understanding what can actually be built on it. By the time the limitations surface, the buyer is often already under contract or emotionally committed.",
      },
      {
        type: "callout",
        title: "Land evaluation is not a formality",
        text: "A proper land evaluation protects the rest of the investment. It is the step that keeps design, budget, and lot in the same conversation.",
      },
      {
        type: "cta",
        label: "Open the lot feasibility tool",
        href: "/land/evaluation#feasibility-tool",
        body: "See how setbacks shrink the buildable envelope — then request a Pre-Purchase Lot Audit for your address.",
      },
      { type: "h2", text: "The right sequence" },
      {
        type: "ol",
        items: [
          "Identify a property that seems promising.",
          "Evaluate it honestly before making a final commitment.",
          "Design the home to the realities of that specific lot.",
        ],
      },
      {
        type: "p",
        text: "When those steps happen in the right order, the project starts on solid ground — literally and figuratively.",
      },
    ],
    closingCta: {
      label: "Start a land evaluation",
      href: "/land/evaluation",
      body: "Know what your lot can become — before you spend a dollar more.",
    },
  },
  {
    slug: "finished-lower-level-luxury-upgrade-north-jersey",
    aliases: ["finished-lower-level-smartest-luxury-upgrade"],
    title: "Why a Finished Lower Level Is One of the Smartest Luxury Upgrades",
    metaDescription:
      "Why more luxury homeowners in North Jersey are treating the lower level as valuable living space — and how to do it well.",
    excerpt:
      "For years the basement was an afterthought. Today it is often one of the most used — and most appreciated — levels of the house.",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "7 min",
    author: "Victor Lobozzo",
    datePublished: "2026-05-06",
    image: "/media/basements/home-theater.jpg",
    imageAlt: "Luxury finished basement home theater in North Jersey",
    includesTool: true,
    toolLabel: "Includes Basement Builder",
    body: [
      {
        type: "p",
        text: "For years, the basement was an afterthought. Today, in many of the homes we build and renovate, it has become one of the most used and most appreciated levels of the house.",
      },
      { type: "h2", text: "Why the shift?" },
      {
        type: "p",
        text: "Several things have changed:",
      },
      {
        type: "ul",
        items: [
          "Families want more specialized spaces (theater, gym, guest suite, office, bar)",
          "People are staying in their homes longer",
          "The cost of adding above-grade square footage continues to rise",
          "When done properly, a lower level can feel as finished and comfortable as the main floor",
        ],
      },
      {
        type: "pull",
        text: "A well-executed lower level is not “extra storage.” It is an extension of the home’s living experience.",
      },
      { type: "h2", text: "What separates a great lower level from a mediocre one" },
      {
        type: "p",
        text: "The difference is almost never the furniture. It is the fundamentals:",
      },
      {
        type: "ul",
        items: [
          "Moisture management done correctly from the start",
          "Proper ceiling height and lighting design",
          "Thoughtful HVAC and dehumidification",
          "Code-compliant egress where required",
          "Finishes that match the quality of the rest of the house",
        ],
      },
      {
        type: "p",
        text: "When these elements are handled well, the space feels intentional. When they are not, it still feels like a basement.",
      },
      { type: "h2", text: "Common high-value uses" },
      {
        type: "ul",
        items: [
          "Private guest suite",
          "Home theater or media room",
          "Gym and wellness space",
          "Bar and entertaining area",
          "Home office or learning space",
          "Playroom that can evolve over time",
        ],
      },
      {
        type: "callout",
        title: "Design around real life",
        text: "The best lower levels are designed around how the family actually lives, not around a generic recreation-room template. Our Basement Builder lets you compose zones visually and see a planning range update live.",
      },
      {
        type: "cta",
        label: "Open the Basement Builder",
        href: "/finished-basement-cost-nj",
        body: "Place theaters, suites, gyms, and bars — with a conceptual investment range for North Jersey.",
      },
      { type: "h2", text: "Final thought" },
      {
        type: "p",
        text: "In a market where every square foot carries significant cost, the lower level is often the most efficient place to add highly usable space. The key is treating it with the same seriousness as the rest of the home.",
      },
    ],
    closingCta: {
      label: "Explore lower level transformations",
      href: "/transformations/basements",
      body: "See how Vantage approaches finished basements — then design yours in the Basement Builder.",
    },
  },
  {
    slug: "luxury-accessory-buildings-north-jersey",
    aliases: ["rise-of-luxury-accessory-building-what-it-costs"],
    title: "The Rise of the Luxury Accessory Building (and What It Really Costs)",
    metaDescription:
      "Why pool houses, collector garages, guest suites, and workshops are becoming some of the most popular projects in North Jersey — and what drives their cost.",
    excerpt:
      "Often the most exciting space on a property is no longer inside the main house. Here’s why — and what these buildings really cost.",
    topic: "costs",
    topicLabel: "Costs & budgets",
    readTime: "8 min",
    author: "Victor Lobozzo",
    datePublished: "2026-05-20",
    image: "/media/garages/pool-pavilion.jpg",
    imageAlt: "Luxury pool house and entertainment pavilion",
    includesTool: true,
    toolLabel: "Includes estimator",
    body: [
      {
        type: "p",
        text: "One of the most interesting shifts in the luxury market is how often the most exciting space on a property is no longer inside the main house.",
      },
      {
        type: "p",
        text: "Pool houses, collector garages, guest suites, workshops, and entertainment pavilions have moved from occasional add-ons to central parts of the property vision.",
      },
      { type: "h2", text: "Why demand is rising" },
      {
        type: "ul",
        items: [
          "Homeowners want specialized spaces that don’t compete with daily living areas",
          "Multi-generational needs are increasing",
          "Car collectors and hobbyists want environments worthy of what they own",
          "Outdoor living has become a year-round expectation, not a seasonal luxury",
        ],
      },
      {
        type: "p",
        text: "In short, people are designing properties, not just houses.",
      },
      { type: "h2", text: "The cost reality" },
      {
        type: "p",
        text: "This is where many homeowners are surprised.",
      },
      {
        type: "p",
        text: "A finished accessory building is not a shed. It typically requires:",
      },
      {
        type: "ul",
        items: [
          "Its own foundation",
          "Proper structure",
          "Electrical, and often plumbing and HVAC",
          "Exterior materials that match or complement the main home",
          "Thoughtful connection to the landscape",
        ],
      },
      {
        type: "pull",
        text: "Quality pool houses, carriage houses, and guest suites frequently land in the mid-six figures and beyond, depending on size and finish level.",
      },
      {
        type: "p",
        text: "The homeowners who are happiest with these projects are usually the ones who understand that reality early.",
      },
      {
        type: "cta",
        label: "Design your structure",
        href: "/custom-homes/accessory-buildings#configurator",
        body: "Purpose, scale, and finish with a live conceptual range — then go deeper in Garage Studio.",
      },
      { type: "h2", text: "The projects that work best" },
      {
        type: "p",
        text: "The strongest accessory buildings share a few traits:",
      },
      {
        type: "ul",
        items: [
          "They have a clear primary purpose",
          "They are designed in architectural harmony with the main house",
          "The site work and utilities are planned carefully",
          "The finish level is intentional rather than compromised",
        ],
      },
      {
        type: "callout",
        title: "Zoning matters",
        text: "Setbacks, lot coverage, height, and whether a program becomes an ADU can decide feasibility. Pair design ambition with an honest site read — Land Evaluation when the lot itself is the question.",
      },
      {
        type: "p",
        text: "When those pieces come together, the structure feels like a natural extension of the estate rather than an afterthought.",
      },
    ],
    closingCta: {
      label: "Explore accessory buildings",
      href: "/custom-homes/accessory-buildings",
      body: "Lifestyle gallery, cost reality, zoning notes, and concept review — all in one place.",
    },
  },
];

export function getPostBySlug(slug: string) {
  return (
    insightPosts.find((p) => p.slug === slug) ||
    insightPosts.find((p) => p.aliases?.includes(slug))
  );
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return insightPosts.slice(0, limit);
  const sameTopic = insightPosts.filter(
    (p) => p.slug !== current.slug && p.topic === current.topic,
  );
  const others = insightPosts.filter(
    (p) => p.slug !== current.slug && p.topic !== current.topic,
  );
  return [...sameTopic, ...others].slice(0, limit);
}

export function getAllPostSlugs() {
  return insightPosts.map((p) => p.slug);
}

/** Newest first — for blog index and listings */
export function getPostsByDate(): InsightPost[] {
  return [...insightPosts].sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

/** Canonical slug if request used an alias */
export function resolveCanonicalSlug(slug: string): string | null {
  const post = getPostBySlug(slug);
  return post?.slug ?? null;
}
