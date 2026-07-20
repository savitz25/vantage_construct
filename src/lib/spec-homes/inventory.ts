/**
 * Signature Builds / Spec Homes inventory.
 * Phases drive the customization window messaging.
 */

export type ConstructionPhase = 1 | 2 | 3 | 4;

export type SpecHomeStatus = "available" | "reserved" | "sold" | "upcoming";

export type SpecHome = {
  slug: string;
  name: string;
  /** Marketing location (town-level; not necessarily a public street address) */
  town: string;
  county: string;
  phase: ConstructionPhase;
  status: SpecHomeStatus;
  beds: number;
  baths: number;
  sqft: number;
  priceFrom: number;
  priceLabel?: string;
  style: string;
  summary: string;
  heroImage: string;
  gallery: string[];
  /** Material / finish lookbook images for early phases */
  lookbook: { label: string; image: string }[];
  customizationOpen: string[];
  customizationClosed: string[];
  features: string[];
  /** Linked design plan slug when applicable */
  planSlug?: string;
  estCompletion?: string;
};

export const phaseMeta: Record<
  ConstructionPhase,
  { label: string; short: string; badge: string; customizationLevel: string; color: string }
> = {
  1: {
    label: "Phase 1 · Concept / Permitting",
    short: "Phase 1",
    badge: "Maximum customization",
    customizationLevel: "Structure, plan tweaks, kitchen, baths, exterior, and finishes largely open.",
    color: "bg-emerald-700/90",
  },
  2: {
    label: "Phase 2 · Framing",
    short: "Phase 2",
    badge: "Major finishes open",
    customizationLevel: "Kitchen, baths, flooring, millwork, and paint still selectable within program.",
    color: "bg-sky-800/90",
  },
  3: {
    label: "Phase 3 · Interior Finishes",
    short: "Phase 3",
    badge: "Limited selections",
    customizationLevel: "Hardware, fixtures, and remaining surface choices — structural options closed.",
    color: "bg-amber-800/90",
  },
  4: {
    label: "Phase 4 · Move-In Ready",
    short: "Phase 4",
    badge: "Turn-key",
    customizationLevel: "Fully finished — reserve for occupancy; design window complete.",
    color: "bg-stone-700/90",
  },
};

export const customizationStages = [
  {
    phase: 1 as ConstructionPhase,
    title: "Concept & permitting",
    canStill: [
      "Floor plan adjustments within zoning",
      "Exterior style & materials",
      "Kitchen & bath layouts",
      "Full finish package direction",
    ],
    closed: ["Lot selection (already fixed)", "Fundamental site constraints"],
  },
  {
    phase: 2 as ConstructionPhase,
    title: "Framing",
    canStill: [
      "Kitchen cabinetry & counters",
      "Bath tile & fixtures (most)",
      "Flooring & paint",
      "Lighting packages",
    ],
    closed: ["Major structural moves", "Foundation / envelope changes"],
  },
  {
    phase: 3 as ConstructionPhase,
    title: "Interior finishes",
    canStill: [
      "Hardware & plumbing trim",
      "Select lighting fixtures",
      "Final paint accents",
      "Closet systems (often)",
    ],
    closed: ["Cabinetry orders already placed", "Most tile and floor selections"],
  },
  {
    phase: 4 as ConstructionPhase,
    title: "Move-in ready",
    canStill: ["Furniture & décor (your own)", "Landscape upgrades (optional)"],
    closed: ["Construction customization window"],
  },
] as const;

/** Active + upcoming inventory (marketing; update phases as builds progress) */
export const signatureBuilds: SpecHome[] = [
  {
    slug: "watchung-ridge-signature",
    name: "Watchung Ridge Signature",
    town: "Watchung",
    county: "Somerset",
    phase: 1,
    status: "upcoming",
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    priceFrom: 1850000,
    priceLabel: "From the mid-$1Ms",
    style: "Modern Farmhouse",
    summary:
      "Hilltop Signature Build with walk-out lower level potential. Earliest buyers shape exterior, kitchen, baths, and finish direction before permits lock.",
    heroImage: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    gallery: [
      "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
      "/media/plans/e2b59397-ridgeview-hires11-768x518.webp",
      "/media/plans/792df6b1-ridgeview-hires12-768x515.webp",
      "/media/kitchens/spaces/entertainer-open.jpg",
      "/media/primary-suite/spa-retreat.jpg",
    ],
    lookbook: [
      { label: "Kitchen direction", image: "/media/kitchens/spaces/entertainer-open.jpg" },
      { label: "Primary suite mood", image: "/media/primary-suite/spa-retreat.jpg" },
      { label: "Exterior language", image: "/media/plans/e2b59397-ridgeview-hires11-768x518.webp" },
    ],
    customizationOpen: [
      "Floor plan refinements",
      "Exterior materials",
      "Full kitchen package",
      "Bath layouts & tile",
      "Flooring & millwork",
    ],
    customizationClosed: ["Lot & orientation (set)"],
    features: ["5 bedrooms", "Walk-out opportunity", "3-car garage intent", "Designer finishes"],
    planSlug: "ridgeview-haven",
    estCompletion: "Est. 12–16 months from reservation",
  },
  {
    slug: "warren-meadow-signature",
    name: "Warren Meadow Signature",
    town: "Warren",
    county: "Somerset",
    phase: 2,
    status: "available",
    beds: 4,
    baths: 3.5,
    sqft: 3400,
    priceFrom: 1650000,
    priceLabel: "From ~$1.65M+",
    style: "Transitional Luxury",
    summary:
      "Framing underway on a Signature Build in Vantage’s home market. Kitchen, baths, and major finishes remain open for the next reservation.",
    heroImage: "/media/plans/99f05b2d-cl-20-009-front-1-small-768x432.webp",
    gallery: [
      "/media/plans/99f05b2d-cl-20-009-front-1-small-768x432.webp",
      "/media/plans/72e55ab4-cl-20-009-front-2-small-768x432.webp",
      "/media/kitchens/spaces/classic-transitional.jpg",
      "/media/basements/home-theater.jpg",
    ],
    lookbook: [
      { label: "Kitchen palette", image: "/media/kitchens/spaces/classic-transitional.jpg" },
      { label: "Lower level option", image: "/media/basements/home-theater.jpg" },
      { label: "Bath inspiration", image: "/media/primary-suite/classic-elegant.jpg" },
    ],
    customizationOpen: [
      "Kitchen cabinets & counters",
      "Bath tile & fixtures",
      "Flooring & paint",
      "Lighting package",
    ],
    customizationClosed: ["Structure & framing path", "Major plan reconfiguration"],
    features: ["4 bedrooms", "Open great room", "Designer kitchen window", "Finished lower level option"],
    planSlug: "emerald-cottage",
    estCompletion: "Est. 6–9 months",
  },
  {
    slug: "basking-ridge-estate-signature",
    name: "Basking Ridge Estate Signature",
    town: "Basking Ridge",
    county: "Somerset",
    phase: 3,
    status: "available",
    beds: 5,
    baths: 4.5,
    sqft: 4800,
    priceFrom: 2250000,
    priceLabel: "From ~$2.25M+",
    style: "Modern Estate",
    summary:
      "Interior finishes in progress. Limited customization remains — ideal for buyers who want near-new construction with a faster path to keys.",
    heroImage: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    gallery: [
      "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
      "/media/plans/a1678151-wellington-interior-01-768x576.webp",
      "/media/plans/2a7bb949-wellington-interior-02-768x576.webp",
      "/media/kitchens/spaces/chef-ready.jpg",
    ],
    lookbook: [
      { label: "Interior language", image: "/media/plans/a1678151-wellington-interior-01-768x576.webp" },
      { label: "Kitchen intent", image: "/media/kitchens/spaces/chef-ready.jpg" },
      { label: "Living spaces", image: "/media/plans/2a7bb949-wellington-interior-02-768x576.webp" },
    ],
    customizationOpen: [
      "Hardware & plumbing trim",
      "Select light fixtures",
      "Final paint accents",
    ],
    customizationClosed: ["Cabinetry", "Flooring", "Tile packages", "Structure"],
    features: ["5–6 bedroom program", "Estate scale", "Premium millwork", "Near completion"],
    planSlug: "grand-alpine",
    estCompletion: "Est. 3–5 months",
  },
  {
    slug: "short-hills-ready-signature",
    name: "Short Hills Ready Signature",
    town: "Millburn–Short Hills",
    county: "Essex",
    phase: 4,
    status: "available",
    beds: 4,
    baths: 3.5,
    sqft: 3600,
    priceFrom: 2450000,
    priceLabel: "Price upon inquiry",
    style: "Classic Luxury",
    summary:
      "Move-in ready Signature Build — turn-key luxury for buyers prioritizing timeline over remaining design decisions.",
    heroImage: "/media/plans/dfd9c703-3349farmr1-1-768x512.webp",
    gallery: [
      "/media/plans/dfd9c703-3349farmr1-1-768x512.webp",
      "/media/plans/5be48b39-3349farmr3-1-768x512.webp",
      "/media/kitchens/spaces/entertainer-open.jpg",
      "/media/outdoor/full-resort.jpg",
    ],
    lookbook: [
      { label: "Completed exterior", image: "/media/plans/dfd9c703-3349farmr1-1-768x512.webp" },
      { label: "Kitchen", image: "/media/kitchens/spaces/entertainer-open.jpg" },
      { label: "Outdoor living", image: "/media/outdoor/full-resort.jpg" },
    ],
    customizationOpen: ["Landscape upgrades (optional)", "Furniture & décor (buyer)"],
    customizationClosed: ["Construction customization window complete"],
    features: ["4 bedrooms", "Turn-key", "Premium finishes", "Immediate path to occupancy"],
    planSlug: "meadowbrook-estate",
    estCompletion: "Available now",
  },
];

/** Completed / sold examples for social proof when inventory is thin */
export const pastSignatureBuilds: {
  name: string;
  town: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  note: string;
}[] = [
  {
    name: "Warren Farmhouse Signature (Sold)",
    town: "Warren",
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    image: "/media/plans/25827d7e-1479-front-rendering-768x512.webp",
    note: "Reserved during framing — buyers designed the kitchen and primary suite.",
  },
  {
    name: "Watchung Hillside Signature (Sold)",
    town: "Watchung",
    beds: 5,
    baths: 4,
    sqft: 4100,
    image: "/media/plans/b642cae9-wellington-exterior-02-768x576.webp",
    note: "Moved during construction; walk-out lower level finished to buyer program.",
  },
  {
    name: "Basking Ridge Transitional (Sold)",
    town: "Basking Ridge",
    beds: 4,
    baths: 3.5,
    sqft: 3500,
    image: "/media/plans/654cb646-wellington-exterior-04-768x576.webp",
    note: "Early Access list notified first — never broadly listed.",
  },
];

export const comparisonRows = [
  {
    path: "Fully Custom",
    control: "Maximum",
    timeline: "Longest",
    bestFor: "Unique program, patient buyers",
  },
  {
    path: "Signature Build (Spec + window)",
    control: "High during early phases",
    timeline: "Faster than ground-up custom",
    bestFor: "Speed + meaningful personalization",
  },
  {
    path: "Existing Resale",
    control: "Cosmetic only",
    timeline: "Fastest",
    bestFor: "Immediate occupancy, compromises OK",
  },
] as const;

export const specFaqs = [
  {
    q: "What is a Signature Build (spec home)?",
    a: "A Vantage-built luxury home started on a curated lot with a design program already in motion. Buyers who reserve early gain a customization window — often more personalization than resale, with a faster path than fully bespoke custom from a blank lot.",
  },
  {
    q: "How much can I still customize?",
    a: "It depends on construction phase. Phase 1 offers the widest choices; Phase 2 keeps kitchen and baths largely open; Phase 3 is limited finishes; Phase 4 is turn-key. Each home card states what is still open.",
  },
  {
    q: "Is pricing fixed?",
    a: "Starting ranges are published as guides. Final investment depends on remaining selections, site conditions already accounted for in the Signature program, and any upgrades. We provide transparent numbers before deposit.",
  },
  {
    q: "What is the Early Access list?",
    a: "A private list for buyers who want first look at new lots and Signature Builds — often before public marketing. Share towns, budget, and timeline so we can notify you when something matches.",
  },
  {
    q: "How does deposit and reservation work?",
    a: "Typically a reservation deposit secures the home and locks the current customization window. Details are confirmed in writing for each property — no surprises.",
  },
  {
    q: "Can I still do a fully custom home instead?",
    a: "Yes. Signature Builds are one path. Fully custom, knockdown rebuilds, and land evaluation remain available when the program needs a blank slate.",
  },
  {
    q: "Where are Signature Builds located?",
    a: "Primarily across Somerset, Morris, Union, and Essex counties — towns such as Warren, Watchung, Basking Ridge, and Millburn–Short Hills — with inventory varying by year.",
  },
] as const;

export function getSpecHome(slug: string) {
  return signatureBuilds.find((h) => h.slug === slug);
}

export function activeInventory() {
  return signatureBuilds.filter((h) => h.status === "available" || h.status === "upcoming");
}

export function formatPrice(n: number) {
  if (n >= 1000000) {
    const m = n / 1000000;
    return `From $${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2)}M`;
  }
  return `From $${Math.round(n / 1000)}k`;
}
