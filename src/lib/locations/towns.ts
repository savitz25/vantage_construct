/**
 * Substantial town / location hub content for local SEO.
 * One deep page beats ten thin doorways — each town needs unique local knowledge.
 */

export type TownHub = {
  slug: string;
  name: string;
  county: string;
  blurb: string;
  /** SEO title segment before brand */
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string[];
  localKnowledge: { title: string; body: string }[];
  projectAngles: { title: string; body: string }[];
  services: { href: string; label: string; note: string }[];
  faqs: { q: string; a: string }[];
  nearby: string[];
};

export const townHubs: TownHub[] = [
  {
    slug: "warren-nj",
    name: "Warren",
    county: "Somerset",
    blurb:
      "Our home base. Family-owned luxury custom homes, renovations, and land work rooted in deep local knowledge of Warren Township.",
    seoTitle: "Custom Home Builder Warren NJ | Luxury Homes & Renovations",
    seoDescription:
      "Vantage Construction builds luxury custom homes, knockdowns, and renovations in Warren Township, NJ. Local knowledge, transparent process, NJ builder #029289.",
    headline: "Luxury custom homes in Warren Township, NJ",
    intro: [
      "Warren is home base for Vantage Construction. From our Saddlemount Avenue roots, we have spent decades helping families build, rebuild, and transform homes across Warren Township — with the same standard we apply to every North Jersey community we serve.",
      "Whether you are evaluating a knockdown on a mature lot, finishing a lower level, or designing a full custom home, Warren projects reward builders who understand local lot patterns, HOA and township expectations, and how to sequence work without disrupting the neighborhood fabric.",
      "Led by Master Builder Victor Lobozzo (N.J. Registered Builder #029289), every Warren conversation starts with clarity: what is buildable, what it may cost, and how the 7-step process protects you from surprises.",
    ],
    localKnowledge: [
      {
        title: "Lot & neighborhood patterns",
        body: "Warren mixes established wooded lots with newer subdivisions. Side-yard setbacks, tree preservation, and septic vs. sewer conditions can swing feasibility as much as the floor plan. We evaluate early so design stays honest.",
      },
      {
        title: "Knockdowns & rebuilds",
        body: "Many Warren owners hold land they love more than the house on it. A well-planned teardown-rebuild can deliver a modern plan while keeping schools, commute, and community — when the lot, soils, and budget align.",
      },
      {
        title: "Permitting reality",
        body: "Township review, engineering, and utility coordination are part of every serious project. We manage permits as a core step in our process so construction does not start on hope.",
      },
    ],
    projectAngles: [
      {
        title: "New custom homes",
        body: "From plan-based designs with transparent base pricing to fully bespoke estates — built for Warren winters, basements, and finish expectations.",
      },
      {
        title: "Home transformations",
        body: "Finished basements, kitchens, primary suites, garages, and outdoor living — often the highest-ROI moves when the bones and location already work.",
      },
      {
        title: "Land & multi-lot",
        body: "When opportunity includes surplus land or a development path, we evaluate use, yield, and construction sequencing with investor or family-office partners as needed.",
      },
    ],
    services: [
      { href: "/custom-homes", label: "Custom homes", note: "New construction & design" },
      { href: "/custom-homes/rebuilds", label: "Knockdowns", note: "Teardown & rebuild path" },
      { href: "/transformations/basements", label: "Finished basements", note: "Lower-level living" },
      { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "NJ cost calculator" },
      { href: "/transformations", label: "Renovations", note: "All transformations" },
      { href: "/start", label: "Consultation", note: "Talk with the team" },
    ],
    faqs: [
      {
        q: "Do you build custom homes in Warren, NJ?",
        a: "Yes. Warren Township is our home market. We build luxury custom homes, knockdowns, renovations, ADUs, and accessory buildings with local project experience and a Warren-based office.",
      },
      {
        q: "What does it cost to build in Warren Township?",
        a: "Construction-only ranges for quality custom work often start near roughly $240–$350+/sq ft depending on size and finish, before land and sitework. Use our Cost Studio for an interactive range, then refine in Design & Discovery.",
      },
      {
        q: "Can you help with a Warren knockdown rebuild?",
        a: "Yes. We evaluate lot constraints, demolition logistics, and the new program so you know whether rebuild economics beat a major renovation or a move.",
      },
      {
        q: "Are you licensed in New Jersey?",
        a: "Yes. Vantage Construction Inc — N.J. Registered Builder #029289 and Home Improvement Contractor #13VH02047100.",
      },
    ],
    nearby: ["Watchung", "Basking Ridge", "Bridgewater", "Berkeley Heights"],
  },
  {
    slug: "watchung-nj",
    name: "Watchung",
    county: "Somerset",
    blurb:
      "Distinctive custom residences and property transformations in one of Central New Jersey’s most desirable hilltop communities.",
    seoTitle: "Custom Home Builder Watchung NJ | Hilltop Luxury Homes",
    seoDescription:
      "Luxury custom homes and renovations in Watchung, NJ. Hilltop lots, knockdowns, outdoor living, and transparent construction with Vantage Construction.",
    headline: "Custom homes & renovations in Watchung, NJ",
    intro: [
      "Watchung’s hilltop character, wooded privacy, and proximity to major corridors make it a premier place to invest in architecture that lasts. Vantage brings luxury custom construction and high-end renovations tuned to how Watchung properties actually live.",
      "Steep grades, mature trees, and view-oriented siting often define the project as much as the floor plan. We design for drainage, access, outdoor rooms, and elevations that feel intentional — not forced onto the hillside.",
      "From full custom builds to primary suite additions and outdoor living, our No Surprises process keeps Watchung homeowners informed from first conversation through certificate of occupancy.",
    ],
    localKnowledge: [
      {
        title: "Topography & outdoor living",
        body: "Watchung lots frequently reward terraces, walkouts, and multi-level outdoor programs. Outdoor kitchens and covered entertaining spaces perform best when grading and structure are planned together.",
      },
      {
        title: "Architectural character",
        body: "Homes range from traditional and colonial expressions to contemporary glass-and-stone statements. We match craftsmanship level to neighborhood context without defaulting to a one-style template.",
      },
      {
        title: "Access & construction logistics",
        body: "Hillside deliveries, staging, and neighbor consideration matter. Experienced sequencing protects the schedule and the street.",
      },
    ],
    projectAngles: [
      {
        title: "View-driven custom homes",
        body: "Plans that capture light and elevation while handling snow, basements, and North Jersey codes.",
      },
      {
        title: "Outdoor living suites",
        body: "Pavilions, outdoor kitchens, and grade-aware terraces that extend the season.",
      },
      {
        title: "Whole-home renovations",
        body: "Kitchen, primary suite, and circulation upgrades that modernize without losing the site’s strengths.",
      },
    ],
    services: [
      { href: "/custom-homes", label: "Custom homes", note: "New construction" },
      { href: "/outdoor-kitchen-cost-nj", label: "Outdoor Living Studio", note: "Kitchens & terraces" },
      { href: "/transformations/kitchens", label: "Kitchen remodeling", note: "Luxury kitchens" },
      { href: "/custom-homes/rebuilds", label: "Knockdowns", note: "Rebuild on your lot" },
      { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "Build cost ranges" },
      { href: "/start", label: "Consultation", note: "Start a conversation" },
    ],
    faqs: [
      {
        q: "Is Vantage a custom home builder in Watchung?",
        a: "Yes. We serve Watchung with custom homes, renovations, outdoor living, and knockdown rebuilds — backed by 35+ years across Central & Northern NJ.",
      },
      {
        q: "Can you build on a steep Watchung lot?",
        a: "Often yes, with the right engineering, drainage, and access plan. We assess constraints early so the design and budget stay grounded.",
      },
      {
        q: "Do you handle outdoor kitchens in Watchung?",
        a: "Yes. Outdoor living is a frequent Watchung ask. Explore the Outdoor Living Studio for packages and ranges, then refine on site.",
      },
    ],
    nearby: ["Warren", "Mountainside", "Scotch Plains", "Berkeley Heights"],
  },
  {
    slug: "basking-ridge-nj",
    name: "Basking Ridge",
    county: "Somerset",
    blurb:
      "Luxury custom builds, knockdowns, and renovations tailored to Basking Ridge’s character and lifestyle.",
    seoTitle: "Custom Home Builder Basking Ridge NJ | Luxury Builds",
    seoDescription:
      "Custom homes, knockdowns, and renovations in Basking Ridge, NJ. School-district lifestyle, estate lots, and transparent Vantage construction process.",
    headline: "Luxury custom homes in Basking Ridge, NJ",
    intro: [
      "Basking Ridge combines strong schools, established neighborhoods, and a lifestyle that rewards thoughtful architecture. Families often stay for the community — then need more space, better flow, or a fully modern home on the lot they already love.",
      "Vantage helps Basking Ridge homeowners decide among renovation, addition, and knockdown rebuild with clear math and design discipline. We build for how people actually live: kitchens that host, primary suites that retreat, and lower levels that earn their square footage.",
      "Our Cost Studio and Move-or-Improve tools are especially useful here, where selling costs and “right house, wrong layout” scenarios are common.",
    ],
    localKnowledge: [
      {
        title: "Stay-and-improve vs. move",
        body: "Many Basking Ridge owners face the classic North Jersey choice: sell into a competitive market or expand. NJ transfer fees and commissions make the comparison non-obvious — our Move or Improve calculator frames the decision.",
      },
      {
        title: "Estate & neighborhood mix",
        body: "From tree-lined classic streets to larger private lots, scale and style expectations vary. We design to the street and the owner, not a generic luxury package.",
      },
      {
        title: "Multi-gen & flexible programs",
        body: "Guest suites, ADUs where allowed, and finished lower levels support multi-generational living without forcing a move.",
      },
    ],
    projectAngles: [
      {
        title: "Primary suite & kitchen expansions",
        body: "High-impact renovations that fix daily life without a full rebuild.",
      },
      {
        title: "Knockdown rebuilds",
        body: "When the lot is right and the house is not — a new custom home in the community you chose.",
      },
      {
        title: "Finished basements",
        body: "Media, wellness, and guest programs that make the lower level feel like main-floor quality.",
      },
    ],
    services: [
      { href: "/move-or-improve-calculator-nj", label: "Move or Improve", note: "Sell vs renovate math" },
      { href: "/custom-homes/rebuilds", label: "Knockdowns", note: "Rebuild on your lot" },
      { href: "/transformations/additions", label: "Home additions", note: "Expand in place" },
      { href: "/finished-basement-cost-nj", label: "Basement Builder", note: "Lower level design" },
      { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "Custom home ranges" },
      { href: "/start", label: "Consultation", note: "Meet the team" },
    ],
    faqs: [
      {
        q: "Do you build in Basking Ridge, NJ?",
        a: "Yes. Basking Ridge is a core Somerset County market for Vantage custom homes, renovations, additions, and knockdowns.",
      },
      {
        q: "Should I renovate or rebuild in Basking Ridge?",
        a: "It depends on structure, lot, and program. We compare renovation vs. knockdown vs. moving with transparent ranges — often starting with Move-or-Improve and Cost Studio tools.",
      },
      {
        q: "Can you add a primary suite in Basking Ridge?",
        a: "Yes. Primary suite additions and remodel programs are common when the rest of the home still works. See the Primary Suite Studio for early design ranges.",
      },
    ],
    nearby: ["Bernardsville", "Warren", "Liberty Corner", "Far Hills"],
  },
  {
    slug: "millburn-short-hills-nj",
    name: "Millburn–Short Hills",
    county: "Essex",
    blurb:
      "High-end custom homes and renovations in Millburn and Short Hills, built to the exacting standards these communities expect.",
    seoTitle: "Custom Home Builder Short Hills & Millburn NJ",
    seoDescription:
      "Luxury custom homes and high-end renovations in Millburn and Short Hills, NJ. Detail-driven craftsmanship from Vantage Construction.",
    headline: "Custom homes in Millburn & Short Hills, NJ",
    intro: [
      "Millburn and Short Hills set a high bar for architecture, finishes, and neighborhood fit. Vantage delivers luxury custom construction and renovations that meet that bar — with the process discipline these projects demand.",
      "Whether you are restoring flow in a classic home, executing a meticulous kitchen and bath program, or rebuilding for a modern plan, quality of detailing and trade coordination separate lasting work from cosmetic updates.",
      "We serve Millburn–Short Hills as part of our Essex County practice, bringing the same No Surprises philosophy and 35+ year craftsmanship standard used across our Somerset and Morris projects.",
    ],
    localKnowledge: [
      {
        title: "Finish & detail expectations",
        body: "These communities reward precise millwork, quiet mechanicals, and materials that age well. We specify and build for longevity — not showroom-only appeal.",
      },
      {
        title: "Renovation vs. rebuild",
        body: "Many homes have excellent locations but outdated systems and layouts. A structured evaluation prevents under-scoping a renovation that should have been a rebuild — or the reverse.",
      },
      {
        title: "Commuter lifestyle programs",
        body: "Mudrooms, offices, primary suites, and lower-level wellness spaces often define success for busy households more than raw square footage.",
      },
    ],
    projectAngles: [
      {
        title: "Luxury kitchen renovations",
        body: "The emotional and social center of the home — designed for hosting and daily life.",
      },
      {
        title: "Whole-home renovations",
        body: "Coordinated multi-room work with one accountable builder.",
      },
      {
        title: "Custom new construction",
        body: "When the lot justifies a full custom program with transparent base pricing tools.",
      },
    ],
    services: [
      { href: "/kitchen-remodel-cost-nj", label: "Kitchen Studio", note: "Design & cost ranges" },
      { href: "/transformations/remodeling", label: "Whole-home remodel", note: "Multi-room programs" },
      { href: "/custom-homes", label: "Custom homes", note: "New construction" },
      { href: "/primary-suite-cost-nj", label: "Primary Suite Studio", note: "Owner’s suite design" },
      { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "Build cost calculator" },
      { href: "/start", label: "Consultation", note: "Schedule a visit" },
    ],
    faqs: [
      {
        q: "Do you build custom homes in Short Hills and Millburn?",
        a: "Yes. We provide luxury custom homes and high-end renovations in Millburn and Short Hills with full project management and licensed New Jersey credentials.",
      },
      {
        q: "Can you renovate a classic Short Hills home?",
        a: "Yes. We regularly modernize kitchens, baths, primary suites, and whole-home programs while respecting structure and neighborhood character.",
      },
      {
        q: "How do projects start?",
        a: "With a complimentary consultation, then Design & Discovery. Tools like Cost Studio and Kitchen Studio help frame early ranges before detailed specifications.",
      },
    ],
    nearby: ["Springfield", "Summit", "Livingston", "Maplewood"],
  },
  {
    slug: "westfield-nj",
    name: "Westfield",
    county: "Union",
    blurb:
      "Custom homes, additions, and renovations for Westfield families who want to stay, expand, and elevate without leaving the downtown lifestyle.",
    seoTitle: "Custom Home Builder Westfield NJ | Renovations & Additions",
    seoDescription:
      "Luxury renovations, additions, and custom homes in Westfield, NJ. Move-or-improve guidance and transparent construction from Vantage Construction.",
    headline: "Custom homes & renovations in Westfield, NJ",
    intro: [
      "Westfield’s walkable downtown, schools, and strong housing demand make “improve vs. move” a frequent conversation. Vantage helps Westfield homeowners expand and elevate homes they already love — or rebuild when the lot deserves a new plan.",
      "Additions, kitchen remodels, primary suites, and finished lower levels are common high-value paths. We bring clear budgeting, living-in-place planning, and craftsmanship that matches Westfield’s competitive market.",
      "As part of our Union County service area, we pair interactive Studios (Move or Improve, Kitchen, Basement, Cost) with the same 7-step process used across Warren and Basking Ridge.",
    ],
    localKnowledge: [
      {
        title: "Downtown-adjacent living",
        body: "Proximity to downtown often means tighter lots and neighbor-sensitive construction. Good logistics and respectful sequencing are part of quality delivery.",
      },
      {
        title: "Expanding in place",
        body: "Many Westfield homes need better kitchens, more bedrooms, or a true primary suite. The right addition can outperform a move once selling friction is counted.",
      },
      {
        title: "Market-aware design",
        body: "Even if you are building for yourself, resale quality matters in Westfield. We design for daily life and long-term value.",
      },
    ],
    projectAngles: [
      {
        title: "Home additions",
        body: "Second-story, rear, and primary suite expansions planned for structure and lifestyle.",
      },
      {
        title: "Kitchen renovations",
        body: "Open, host-ready kitchens that redefine the first floor.",
      },
      {
        title: "Move-or-improve analysis",
        body: "Transparent comparison of selling costs vs. the renovation that solves the gap.",
      },
    ],
    services: [
      { href: "/move-or-improve-calculator-nj", label: "Move or Improve", note: "Stay vs sell math" },
      { href: "/transformations/additions", label: "Additions", note: "Expand your home" },
      { href: "/kitchen-remodel-cost-nj", label: "Kitchen Studio", note: "Remodel ranges" },
      { href: "/transformations/basements", label: "Basements", note: "Lower level living" },
      { href: "/custom-homes/rebuilds", label: "Knockdowns", note: "When rebuild wins" },
      { href: "/start", label: "Consultation", note: "Talk with Victor’s team" },
    ],
    faqs: [
      {
        q: "Do you renovate homes in Westfield, NJ?",
        a: "Yes. Westfield is in our Union County service area for renovations, additions, custom homes, and rebuilds.",
      },
      {
        q: "Is it better to move or improve in Westfield?",
        a: "It depends on lot, structure, and goals. Use the Move or Improve calculator to frame commissions and NJ transfer costs against a targeted addition — then we validate buildability on site.",
      },
      {
        q: "Can you build a second-story addition?",
        a: "Often yes, subject to structure, zoning, and design. We evaluate early so the budget and lifestyle goals stay aligned.",
      },
    ],
    nearby: ["Cranford", "Scotch Plains", "Mountainside", "Garwood"],
  },
];

export function getTownBySlug(slug: string) {
  return townHubs.find((t) => t.slug === slug);
}
