/**
 * Planning & cost calculators — distinct from visual Studios.
 * Used by /calculators hub and nav.
 */

export type CalculatorBadge = "Most Popular" | "New" | "Feasibility" | "Decision";

export type CalculatorItem = {
  id: string;
  href: string;
  title: string;
  body: string;
  category: "Cost" | "Decision" | "Land" | "Investment";
  badge?: CalculatorBadge;
  image: string;
  imageAlt: string;
  cta?: string;
};

export const calculators: CalculatorItem[] = [
  {
    id: "cost-studio",
    href: "/cost-to-build-a-house-nj",
    title: "Cost Studio",
    body: "Live North Jersey construction ranges with an interactive house model — size, style, and finishes that move the number.",
    category: "Cost",
    badge: "Most Popular",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Custom home construction — Cost Studio planning tool",
    cta: "Open Cost Studio",
  },
  {
    id: "move-or-improve",
    href: "/move-or-improve-calculator-nj",
    title: "Move or Improve Calculator",
    body: "Compare true NJ selling costs against the addition or renovation that solves the same problem — before you list or expand.",
    category: "Decision",
    badge: "Decision",
    image: "/media/additions/kitchen-gathering.jpg",
    imageAlt: "Home addition gathering space — Move or Improve calculator",
    cta: "Open calculator",
  },
  {
    id: "adu-payback",
    href: "/adu-cost-calculator-nj",
    title: "ADU Payback Calculator",
    body: "Model build cost, rent presets, break-even, and illustrative cash flow for an accessory dwelling on your property.",
    category: "Investment",
    image: "/media/garages/guest-adu.webp",
    imageAlt: "Guest suite ADU — payback calculator",
    cta: "Open ADU calculator",
  },
  {
    id: "rebuild-assessment",
    href: "/custom-homes/rebuilds#assessment",
    title: "Renovate vs Rebuild Assessment",
    body: "A guided quiz for homeowners on a good street with a tired house — renovate, rebuild, or walk-away clarity.",
    category: "Decision",
    badge: "Decision",
    image: "/media/rebuilds/before-ranch-nj.webp",
    imageAlt: "Knockdown rebuild assessment for North Jersey homes",
    cta: "Take the assessment",
  },
  {
    id: "land-evaluation",
    href: "/land/evaluation#feasibility-tool",
    title: "Lot Feasibility & Setback Tool",
    body: "See how setbacks shrink the buildable envelope and flag hidden site costs before you over-commit to a lot.",
    category: "Land",
    badge: "Feasibility",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Aerial lot — land evaluation feasibility tool",
    cta: "Open feasibility tool",
  },
  {
    id: "multi-lot-hbu",
    href: "/land/multi-lot#highest-best-use",
    title: "Multi-Lot Highest & Best Use",
    body: "Conceptual acreage → lot yield and value band for landowners exploring subdivision or partnership paths.",
    category: "Land",
    badge: "New",
    image: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
    imageAlt: "Multi-lot community potential — highest and best use tool",
    cta: "Open HBU tool",
  },
  {
    id: "accessory-config",
    href: "/custom-homes/accessory-buildings#configurator",
    title: "Accessory Building Estimator",
    body: "Pool house, collector garage, guest suite, or workshop — purpose, scale, finish, and a live conceptual range.",
    category: "Cost",
    badge: "New",
    image: "/media/garages/pool-pavilion.jpg",
    imageAlt: "Pool house accessory building cost estimator",
    cta: "Open estimator",
  },
] as const;

/** Visual design studios only (not pure calculators) */
export const designStudios = [
  {
    href: "/design-studio",
    eyebrow: "New construction",
    title: "Design Studio",
    body: "Shape size, style, exterior, finishes, and lifestyle — unlock a Vision Summary.",
  },
  {
    href: "/kitchen-remodel-cost-nj",
    eyebrow: "Transformations",
    title: "Kitchen Studio",
    body: "12 high-end styles with live counter, island, backsplash, and hardware swaps — plus planning cost.",
    serviceHref: "/transformations/kitchens",
    serviceLabel: "Learn how we build kitchens",
  },
  {
    href: "/attic-conversion-cost-nj",
    eyebrow: "Transformations",
    title: "Attic Studio",
    body: "Upper-level suites, offices, and lofts — dormers, baths, skylights, live structure preview + estimate.",
    serviceHref: "/transformations/attics",
    serviceLabel: "Learn how we build upper levels",
  },
  {
    href: "/accessory-building-cost-nj",
    eyebrow: "Transformations",
    title: "Garage Studio",
    body: "Custom garages, carriage houses, workshops — bays, doors, living space above, live design.",
    serviceHref: "/transformations/garages",
    serviceLabel: "Learn how we build them",
  },
  {
    href: "/outdoor-kitchen-cost-nj",
    eyebrow: "Transformations",
    title: "Outdoor Living Studio",
    body: "Outdoor kitchens, covered lounges, fire features, resort yards — live design + planning estimate.",
    serviceHref: "/transformations/outdoor-living",
    serviceLabel: "Learn how we build outdoor living",
  },
  {
    href: "/primary-suite-cost-nj",
    eyebrow: "Transformations",
    title: "Primary Suite Studio",
    body: "Private retreats — bedroom, spa bath, walk-in closet — zone design + live planning estimate.",
    serviceHref: "/transformations/primary-suite",
    serviceLabel: "Learn how we build primary suites",
  },
  {
    href: "/finished-basement-cost-nj",
    eyebrow: "Transformations",
    title: "Basement Builder",
    body: "Visual zone builder for theaters, suites, gyms, bars — live finished basement estimate.",
    serviceHref: "/transformations/basements",
    serviceLabel: "Learn how we build them",
  },
] as const;
