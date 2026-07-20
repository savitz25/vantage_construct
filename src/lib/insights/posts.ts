/**
 * Full editorial Insights articles — magazine-quality longform.
 * Body blocks support prose, lists, pull quotes, and CTAs.
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
  relatedHrefs?: string[];
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
          "Finish level — Stone, millwork, tile, lighting, and appliances are where luxury compounds. “Same square footage” can mean very different homes.",
          "Systems — HVAC design, insulation strategy, smart-home infrastructure, and generators are quiet line items that show up late if you ignore them early.",
          "Timeline and decisions — Indecision and midstream changes are expensive. Clear process protects the budget as much as material choices do.",
        ],
      },
      { type: "h2", text: "What most online calculators miss" },
      {
        type: "p",
        text: "Generic tools often underweight North Jersey site prep, municipal requirements, and the finish expectations of this market. They also rarely separate hard construction cost from soft costs — design, engineering, permits, temporary living, and furniture.",
      },
      {
        type: "callout",
        title: "A better way to plan",
        text: "Use a local planning range first, then refine with your actual program and lot. Vantage’s Cost Studio is built for that conversation — illustrative ranges that update as you change size, style, and finishes.",
      },
      {
        type: "cta",
        label: "Open the Cost Studio",
        href: "/cost-to-build-a-house-nj",
        body: "Model a North Jersey construction range in minutes — then talk through the real drivers on your project.",
      },
      { type: "h2", text: "How Vantage approaches pricing" },
      {
        type: "p",
        text: "Our philosophy is No Surprises — not “the lowest number on day one.” We would rather frame an honest band early, flag site and program risks, and walk you through tradeoffs than win a conversation with a figure that won’t survive first contact with the ground.",
      },
      {
        type: "p",
        text: "That means pairing conceptual tools with professional evaluation: lot feasibility when land is involved, Design & Discovery when the program is real, and clear milestones once construction begins.",
      },
      { type: "h2", text: "A practical next step" },
      {
        type: "ol",
        items: [
          "Establish a directional range with Cost Studio or a consultation.",
          "If you already have land, evaluate setbacks and site risk before falling in love with a floor plan.",
          "Align architecture and finish intent with budget early — not after drawings are emotionally “done.”",
          "Move into a structured process only when the path is clear enough to protect both quality and timeline.",
        ],
      },
      {
        type: "p",
        text: "Custom building in North Jersey is a significant investment. Clarity is the most valuable early deliverable we can offer.",
      },
    ],
    closingCta: {
      label: "Explore the Cost Studio",
      href: "/cost-to-build-a-house-nj",
      body: "See a live planning range for your size and finish intent — then schedule a conversation when you’re ready.",
    },
  },
  {
    slug: "renovate-or-rebuild-north-jersey-homeowners-2026",
    title: "Renovate or Rebuild? How North Jersey Homeowners Are Deciding in 2026",
    metaDescription:
      "How North Jersey homeowners are choosing between major renovation and knockdown rebuild in 2026 — with a practical framework and interactive assessment.",
    excerpt:
      "When the street is right but the house is wrong, the decision isn’t emotional alone. Here’s how serious homeowners are weighing renovate vs rebuild this year.",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "8 min",
    author: "Victor Lobozzo",
    datePublished: "2026-04-02",
    image: "/media/rebuilds/before-ranch-nj.jpg",
    imageAlt: "North Jersey ranch home before rebuild consideration",
    includesTool: true,
    toolLabel: "Includes assessment",
    body: [
      {
        type: "p",
        text: "In 2026, more North Jersey families are facing a familiar tension: they love their town, schools, and street — but the house no longer fits the life they want.",
      },
      {
        type: "p",
        text: "The default advice used to be “just renovate.” That still wins often. But when ceilings are low, systems are at end of life, and the layout fights every modern request, a knockdown rebuild on the same lot can be the clearer long-term path.",
      },
      {
        type: "pull",
        text: "The smartest decision isn’t the one that preserves the most drywall. It’s the one that delivers the home you actually want — at a cost and timeline you can stand behind.",
      },
      { type: "h2", text: "When renovation still wins" },
      {
        type: "ul",
        items: [
          "The bones are sound and room heights already work.",
          "Your goals are localized — kitchen, primary suite, lower level — not a whole-house reinvention.",
          "You want to stay in place with less disruption than a full rebuild.",
          "Zoning and coverage make a larger new footprint difficult or impossible.",
        ],
      },
      {
        type: "p",
        text: "Major renovation can still be luxury-grade. It simply needs honesty about what you can and cannot fix without starting over.",
      },
      { type: "h2", text: "When rebuild becomes the rational path" },
      {
        type: "ul",
        items: [
          "You’re fighting the structure on every wall — layout, light, and ceiling height all lose.",
          "Mechanical, roof, windows, and insulation would all need replacement in a “renovation.”",
          "The addition you want creates a patchwork of old and new that never quite feels whole.",
          "Long-term ownership favors a new envelope, systems, and plan over compounding compromise.",
        ],
      },
      {
        type: "callout",
        title: "Taxes, timeline, and temporary living",
        text: "Rebuilds carry real-life costs beyond construction: temporary housing, municipal process, and tax reassessment conversations. We surface those early — not as scare tactics, but as part of an adult decision framework.",
      },
      { type: "h2", text: "A simple decision framework" },
      {
        type: "ol",
        items: [
          "Define the non-negotiables (light, flow, outdoor living, multi-gen, storage).",
          "Price a serious renovation that actually hits those goals — not a cosmetic refresh.",
          "Compare against a rebuild massing that fits the lot honestly.",
          "Choose the path with the better life outcome per dollar of risk — not the smaller brochure number.",
        ],
      },
      {
        type: "cta",
        label: "Take the renovate vs rebuild assessment",
        href: "/custom-homes/rebuilds#assessment",
        body: "A guided interactive tool for North Jersey homeowners weighing stay-and-renovate against rebuild.",
      },
      { type: "h2", text: "How we help without forcing the answer" },
      {
        type: "p",
        text: "Vantage builds both paths. That matters. When a renovation is smarter, we say so. When a rebuild unlocks the home the family is describing, we show why — with process, timeline, and budget framed in No Surprises language.",
      },
      {
        type: "p",
        text: "If you’re on a street you refuse to leave, start with assessment, not a demolition dumpster.",
      },
    ],
    closingCta: {
      label: "Explore knockdowns & rebuilds",
      href: "/custom-homes/rebuilds",
      body: "See the framework, assessment, and next steps for renovate vs rebuild on your lot.",
    },
  },
  {
    slug: "what-makes-a-lot-buildable-warren-watchung-basking-ridge",
    title: "What Actually Makes a Lot Buildable in Warren, Watchung & Basking Ridge",
    metaDescription:
      "What makes a residential lot truly buildable in Warren, Watchung, and Basking Ridge — setbacks, site costs, utilities, and when to walk away.",
    excerpt:
      "Pretty land is not the same as buildable land. Here’s what sophisticated buyers evaluate before they commit in our core towns.",
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
        text: "A listing photo of trees and a wide lawn can hide the real story. In Warren, Watchung, and Basking Ridge, “buildable” means the program you want can fit the ordinance, the topography, and the budget — not merely that a house once stood nearby.",
      },
      {
        type: "pull",
        text: "The most expensive lot is the one that forces you into a house you never wanted — or a variance fight you never budgeted.",
      },
      { type: "h2", text: "The seven things that decide buildability" },
      {
        type: "ol",
        items: [
          "Zoning envelope — Setbacks, height, coverage, and floor area rules that silently shrink the dream plan.",
          "Topography & drainage — Slope can enable walk-outs or destroy access and stormwater plans.",
          "Soil & rock — Ledge and poor soils move foundation and prep cost faster than finishes ever will.",
          "Utilities — Sewer vs septic, water, electric, gas — and how far they have to run.",
          "Environmental constraints — Wetlands buffers, flood zones, and tree ordinances.",
          "Access & easements — Driveway geometry, shared roads, and rights that limit siting.",
          "Neighborhood fit — What the street expects architecturally and practically.",
        ],
      },
      { type: "h2", text: "Town flavor (always verify)" },
      {
        type: "p",
        text: "Warren often mixes mature lots with tree and grading sensitivity. Watchung rewards careful hillside thinking — views and walk-outs, but also retaining and drainage. Basking Ridge frequently pairs strong stay-and-improve energy with renovate-vs-rebuild decisions when the street is right and the house is not.",
      },
      {
        type: "callout",
        title: "Orientation, not a permit",
        text: "Every parcel is unique. Municipal rules change. Treat local notes as orientation — then confirm with official sources and professional review.",
      },
      { type: "h2", text: "See the envelope before you fall in love" },
      {
        type: "p",
        text: "A simple interactive setback visualizer won’t replace a survey — but it instantly teaches why professional land evaluation matters. Move the yards. Watch the buildable area change. Then flag site-cost conditions that show up again and again in North Jersey.",
      },
      {
        type: "cta",
        label: "Open the lot feasibility tool",
        href: "/land/evaluation#feasibility-tool",
        body: "Interactive setbacks and hidden site-cost flags — then request a Pre-Purchase Lot Audit.",
      },
      { type: "h2", text: "When walking away is the win" },
      {
        type: "p",
        text: "Sometimes the smartest land evaluation ends with “don’t buy this.” Wetlands, access constraints, or a program that will never fit the envelope can save years of frustration. We would rather lose a project conversation than help a family overpay for unbuildable hope.",
      },
    ],
    closingCta: {
      label: "Start a land evaluation",
      href: "/land/evaluation",
      body: "Know what your lot can become — before you spend a dollar more.",
    },
  },
  {
    slug: "finished-lower-level-smartest-luxury-upgrade",
    title: "Why a Finished Lower Level Is One of the Smartest Luxury Upgrades",
    metaDescription:
      "Why a finished lower level is one of the highest-ROI luxury upgrades for North Jersey homes — use cases, cost drivers, and how to design it well.",
    excerpt:
      "You already own the square footage. Done well, a lower level becomes the most-used rooms in the house — without giving up the neighborhood.",
    topic: "renovation",
    topicLabel: "Renovation",
    readTime: "7 min",
    author: "Victor Lobozzo",
    datePublished: "2026-05-06",
    image: "/media/basements/home-theater.jpg",
    imageAlt: "Luxury finished basement home theater",
    includesTool: true,
    toolLabel: "Includes Basement Builder",
    body: [
      {
        type: "p",
        text: "In luxury markets, the smartest upgrades often aren’t the ones that shout from the curb. They’re the ones that change daily life. A finished lower level — theater, suite, gym, bar, play — does exactly that.",
      },
      {
        type: "pull",
        text: "You’re not “finishing a basement.” You’re claiming square footage you already own and making it feel like the rest of the house.",
      },
      { type: "h2", text: "Why it wins on lifestyle and value" },
      {
        type: "ul",
        items: [
          "More living space without leaving the street or school district.",
          "Program flexibility — guests, teens, wellness, work, entertainment.",
          "Often stronger dollars-per-delight than adding a new wing when the lot is tight.",
          "When done with real ceilings, light, and finishes, it reads as architecture — not afterthought.",
        ],
      },
      { type: "h2", text: "What separates luxury from “done cheap”" },
      {
        type: "p",
        text: "Moisture management, ceiling height strategy, lighting, flooring transitions, and HVAC are the quiet details. A lower level that smells like a basement will never feel like a primary living space — no matter how nice the sofa is.",
      },
      {
        type: "callout",
        title: "Design the zones, not just the square footage",
        text: "The best lower levels are programmed: media, hospitality, recovery, sleep. Our Basement Builder lets you place those zones visually and see a planning range update live.",
      },
      {
        type: "cta",
        label: "Open the Basement Builder",
        href: "/finished-basement-cost-nj",
        body: "Compose theaters, suites, gyms, and bars — with a conceptual investment range for North Jersey.",
      },
      { type: "h2", text: "Cost reality (directional)" },
      {
        type: "p",
        text: "Finished luxury lower levels vary widely with wet bars, full baths, kitchens, egress, and structural work. Treat online averages as a starting conversation — then model your actual program. Site conditions and ceiling height constraints matter as much as tile selection.",
      },
      { type: "h2", text: "When a lower level is the wrong move" },
      {
        type: "p",
        text: "Chronic water issues, insufficient height that can’t be solved, or a family that truly needs main-level expansion may point elsewhere — addition, attic, or rebuild. Honest sequencing protects the investment.",
      },
    ],
    closingCta: {
      label: "Explore lower level transformations",
      href: "/transformations/basements",
      body: "See how Vantage approaches finished basements — then design yours in the Basement Builder.",
    },
  },
  {
    slug: "rise-of-luxury-accessory-building-what-it-costs",
    title: "The Rise of the Luxury Accessory Building (and What It Really Costs)",
    metaDescription:
      "Why luxury accessory buildings are rising in North Jersey — pool houses, collector garages, guest suites — and what they really cost beyond a shed.",
    excerpt:
      "Pool houses, collector garages, and guest pavilions are becoming the most exciting rooms on the property. They’re also real construction — with real numbers.",
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
        text: "Homeowners don’t wake up wanting an “accessory building.” They want a pool house that completes summer, a garage worthy of a collection, a guest suite for parents, or a quiet studio steps from the main house.",
      },
      {
        type: "p",
        text: "That demand is rising — and so is the sophistication of the architecture. These structures are no longer kit sheds beside luxury homes. They’re estate buildings with foundations, systems, and finishes that must match the residence.",
      },
      {
        type: "pull",
        text: "A finished pool house or carriage house is not an inexpensive outbuilding. It is a small custom project — and it should be planned like one.",
      },
      { type: "h2", text: "What’s driving the trend" },
      {
        type: "ul",
        items: [
          "Work-from-home and multi-gen living that needs separation without leaving the property.",
          "Collector culture and serious vehicle storage.",
          "Outdoor entertaining that wants real plumbing, power, and shelter — not just a patio set.",
          "A desire to expand lifestyle without always expanding the main house footprint.",
        ],
      },
      { type: "h2", text: "Cost reality (directional bands)" },
      {
        type: "ul",
        items: [
          "Finished pool house / pavilion: often mid–high six figures depending on glass, wet rooms, and site work",
          "Luxury multi-bay garage: high five figures into mid–six figures for refined architecture",
          "Collector / oversized programs: climb with height, climate, and detailing space",
          "Carriage house / guest suite: frequently among the highest bands once living systems and finishes arrive",
        ],
      },
      {
        type: "callout",
        title: "What drives the number",
        text: "Size and structure, plumbing, HVAC, finish level, site work, and whether the program crosses into ADU territory. Zoning — setbacks, coverage, height — decides feasibility as much as budget.",
      },
      {
        type: "cta",
        label: "Design your structure",
        href: "/custom-homes/accessory-buildings#configurator",
        body: "Purpose, scale, and finish with a live conceptual range — then go deeper in Garage Studio.",
      },
      { type: "h2", text: "Accessory building vs ADU" },
      {
        type: "p",
        text: "A garage, workshop, or pool house may stay an accessory structure. Full kitchens and permanent dwelling use can reclassify the project as an ADU — with different rules, parking, and reviews. We clarify that line early so drawings don’t race ahead of ordinance.",
      },
      { type: "h2", text: "How to start well" },
      {
        type: "ol",
        items: [
          "Define the lifestyle job: entertain, store, host, work, train.",
          "Check the lot honestly — setbacks, coverage, utilities.",
          "Set a planning range before you fall in love with a Pinterest plan.",
          "Match architecture to the main house so the estate reads as one composition.",
        ],
      },
      {
        type: "p",
        text: "Done right, the accessory building becomes the most delightful place on the property. Done casually, it becomes an expensive compromise. The difference is process.",
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
  return insightPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return insightPosts.slice(0, limit);
  const sameTopic = insightPosts.filter(
    (p) => p.slug !== slug && p.topic === current.topic,
  );
  const others = insightPosts.filter(
    (p) => p.slug !== slug && p.topic !== current.topic,
  );
  return [...sameTopic, ...others].slice(0, limit);
}

export function getAllPostSlugs() {
  return insightPosts.map((p) => p.slug);
}
