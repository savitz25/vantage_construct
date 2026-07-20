/**
 * Land Opportunities inventory — prototype directory of lots ≥ 0.5 acre
 * in Vantage’s core North Jersey towns.
 *
 * Maintain here until a real MLS / CRM feed is wired. Prices and acreages
 * are illustrative market-style figures for UX and sales demos — not live MLS.
 */

export const landOpportunityTowns = [
  "Warren",
  "Watchung",
  "Basking Ridge",
  "Millburn-Short Hills",
  "Westfield",
] as const;

export type LandOpportunityTown = (typeof landOpportunityTowns)[number];

export type LandOpportunityStatus = "available" | "under-review" | "coming-soon";

export type LandOpportunityFeature =
  | "wooded"
  | "cleared"
  | "public-utilities"
  | "septic-well"
  | "level"
  | "sloped"
  | "cul-de-sac"
  | "corner"
  | "view"
  | "walk-to-town";

export type LandOpportunity = {
  id: string;
  slug: string;
  title: string;
  town: LandOpportunityTown;
  county: string;
  /** Marketing location — not necessarily a full public street address */
  locationLabel: string;
  acres: number;
  price: number | null;
  priceLabel: string;
  status: LandOpportunityStatus;
  highlights: string[];
  features: LandOpportunityFeature[];
  description: string;
  image: string;
  imageAlt: string;
  lat: number;
  lng: number;
  /** ISO date for “Newest” sort */
  listedAt: string;
  /** Optional external / MLS research note for staff */
  sourceNote?: string;
};

export const landOpportunityFeatureLabels: Record<LandOpportunityFeature, string> = {
  wooded: "Wooded",
  cleared: "Mostly cleared",
  "public-utilities": "Public utilities nearby",
  "septic-well": "Septic / well likely",
  level: "Level build pad",
  sloped: "Rolling topography",
  "cul-de-sac": "Quiet cul-de-sac",
  corner: "Corner exposure",
  view: "Elevated views",
  "walk-to-town": "Near village core",
};

export const landOpportunities: LandOpportunity[] = [
  {
    id: "warren-ridge-acre",
    slug: "warren-ridge-acre-homesite",
    title: "Wooded Ridge Homesite",
    town: "Warren",
    county: "Somerset",
    locationLabel: "Mountain corridor · Warren Township",
    acres: 1.12,
    price: 895000,
    priceLabel: "$895,000",
    status: "available",
    highlights: ["1.12 acres", "Mature canopy", "Custom-home scale"],
    features: ["wooded", "sloped", "public-utilities", "cul-de-sac"],
    description:
      "A private, tree-framed parcel sized for a true custom footprint. Rolling grade rewards thoughtful site planning — terrace the main level, protect specimen trees, and open light where the canopy allows.",
    image: "/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp",
    imageAlt: "Aerial of a wooded North Jersey homesite",
    lat: 40.6342,
    lng: -74.5015,
    listedAt: "2026-06-12",
    sourceNote: "Prototype listing for directory UX",
  },
  {
    id: "warren-meadow-lot",
    slug: "warren-open-meadow-lot",
    title: "Open Meadow Build Site",
    town: "Warren",
    county: "Somerset",
    locationLabel: "South Warren · near Saddlemount corridor",
    acres: 0.78,
    price: 675000,
    priceLabel: "$675,000",
    status: "available",
    highlights: ["0.78 acres", "Mostly cleared", "Straightforward pad"],
    features: ["cleared", "level", "public-utilities"],
    description:
      "A cleaner canvas for owners who want less tree work and a faster path to foundation. Ideal for a refined two-story plan with rear outdoor living.",
    image: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
    imageAlt: "Open residential land with room for a custom home",
    lat: 40.6288,
    lng: -74.5122,
    listedAt: "2026-07-01",
  },
  {
    id: "watchung-view-parcel",
    slug: "watchung-elevated-view-parcel",
    title: "Elevated Watchung Parcel",
    town: "Watchung",
    county: "Somerset",
    locationLabel: "Watchung hills · elevated setting",
    acres: 1.45,
    price: 1125000,
    priceLabel: "$1,125,000",
    status: "available",
    highlights: ["1.45 acres", "Elevation advantage", "Privacy buffer"],
    features: ["wooded", "view", "sloped", "septic-well"],
    description:
      "Watchung’s topography is the asset: long views, natural privacy, and a homesite that wants architecture with presence. Site engineering and driveway geometry matter — we evaluate that early.",
    image: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
    imageAlt: "Elevated wooded lot suitable for a luxury custom home",
    lat: 40.6378,
    lng: -74.4508,
    listedAt: "2026-05-28",
  },
  {
    id: "watchung-half-plus",
    slug: "watchung-half-acre-plus",
    title: "Half-Acre-Plus Village Edge",
    town: "Watchung",
    county: "Somerset",
    locationLabel: "Near Watchung village amenities",
    acres: 0.62,
    price: 589000,
    priceLabel: "$589,000",
    status: "under-review",
    highlights: ["0.62 acres", "Village adjacency", "Efficient footprint"],
    features: ["cleared", "level", "public-utilities", "walk-to-town"],
    description:
      "Right-sized for a polished custom or rebuild program without excess acreage to maintain. Strong fit for buyers who want Watchung character and a shorter commute to daily life.",
    image: "/media/plans/792df6b1-ridgeview-hires12-768x515.webp",
    imageAlt: "Residential lot near a North Jersey village setting",
    lat: 40.6412,
    lng: -74.4431,
    listedAt: "2026-06-20",
  },
  {
    id: "basking-estate-lot",
    slug: "basking-ridge-estate-acreage",
    title: "Basking Ridge Estate Acreage",
    town: "Basking Ridge",
    county: "Somerset",
    locationLabel: "Bernards Township · estate corridor",
    acres: 2.3,
    price: 1450000,
    priceLabel: "$1,450,000",
    status: "available",
    highlights: ["2.3 acres", "Estate scale", "Long driveway potential"],
    features: ["wooded", "sloped", "view", "septic-well"],
    description:
      "Room for a significant residence, guest program, and landscape that feels intentional rather than leftover. Best approached with a full site strategy — not a floor plan forced onto the land.",
    image: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    imageAlt: "Luxury estate setting representing premium Basking Ridge land",
    lat: 40.7062,
    lng: -74.5494,
    listedAt: "2026-04-18",
  },
  {
    id: "basking-level-acre",
    slug: "basking-ridge-level-acre",
    title: "Level Acre in Basking Ridge",
    town: "Basking Ridge",
    county: "Somerset",
    locationLabel: "Quiet residential lane · Basking Ridge",
    acres: 1.0,
    price: 925000,
    priceLabel: "$925,000",
    status: "coming-soon",
    highlights: ["1.0 acre", "Level pad", "Coming soon"],
    features: ["level", "cleared", "public-utilities", "cul-de-sac"],
    description:
      "A full acre with a more cooperative grade for owners who want scale without extreme site work. Early inquiry recommended — estate-area inventory moves quietly.",
    image: "/media/plans/b642cae9-wellington-exterior-02-768x576.webp",
    imageAlt: "Level residential acreage for a custom North Jersey home",
    lat: 40.7124,
    lng: -74.5411,
    listedAt: "2026-07-10",
  },
  {
    id: "millburn-short-hills-lot",
    slug: "short-hills-wooded-homesite",
    title: "Short Hills Wooded Homesite",
    town: "Millburn-Short Hills",
    county: "Essex",
    locationLabel: "Short Hills · established residential pocket",
    acres: 0.85,
    price: 1675000,
    priceLabel: "$1,675,000",
    status: "available",
    highlights: ["0.85 acres", "Tree canopy", "Premium school corridor"],
    features: ["wooded", "public-utilities", "cul-de-sac"],
    description:
      "Land in the Millburn–Short Hills market is scarce at true custom-home scale. This canopy-forward lot rewards a design that preserves character while delivering modern light and indoor-outdoor flow.",
    image: "/media/plans/654cb646-wellington-exterior-04-768x576.webp",
    imageAlt: "Wooded premium residential lot character in Essex County",
    lat: 40.7478,
    lng: -74.3256,
    listedAt: "2026-05-05",
  },
  {
    id: "millburn-corner-parcel",
    slug: "millburn-corner-opportunity",
    title: "Millburn Corner Opportunity",
    town: "Millburn-Short Hills",
    county: "Essex",
    locationLabel: "Millburn edge · corner exposure",
    acres: 0.55,
    price: 1195000,
    priceLabel: "$1,195,000",
    status: "under-review",
    highlights: ["0.55 acres", "Corner lot", "Compact luxury program"],
    features: ["corner", "cleared", "public-utilities", "level"],
    description:
      "Just over the half-acre threshold with corner presence — strong for a vertical, design-forward home when setbacks and coverage are modeled early.",
    image: "/media/plans/070731ee-willowbrook_front_day-768x432.webp",
    imageAlt: "Corner residential property opportunity in Millburn area",
    lat: 40.7256,
    lng: -74.3089,
    listedAt: "2026-06-28",
  },
  {
    id: "westfield-family-lot",
    slug: "westfield-family-scale-lot",
    title: "Westfield Family-Scale Lot",
    town: "Westfield",
    county: "Union",
    locationLabel: "Westfield · near downtown amenities",
    acres: 0.68,
    price: 985000,
    priceLabel: "$985,000",
    status: "available",
    highlights: ["0.68 acres", "Walkable lifestyle", "Family program"],
    features: ["cleared", "level", "public-utilities", "walk-to-town"],
    description:
      "Westfield buyers often prioritize schools, downtown energy, and a yard that still feels like a true homesite. This lot balances town convenience with room for a substantial rebuild or new custom.",
    image: "/media/plans/9cef4b62-willowbrook_front_day2-768x432.webp",
    imageAlt: "Residential lot suited to a Westfield custom or rebuild",
    lat: 40.659,
    lng: -74.3474,
    listedAt: "2026-07-08",
  },
  {
    id: "westfield-private-acre",
    slug: "westfield-private-nearly-acre",
    title: "Private Nearly-Acre Westfield Site",
    town: "Westfield",
    county: "Union",
    locationLabel: "South Westfield · quieter residential lane",
    acres: 0.94,
    price: 1285000,
    priceLabel: "$1,285,000",
    status: "available",
    highlights: ["0.94 acres", "Privacy screen", "Outdoor living depth"],
    features: ["wooded", "level", "public-utilities", "cul-de-sac"],
    description:
      "Rare depth for Westfield: enough land for a rear landscape program, pool potential (subject to coverage), and a home that doesn’t feel squeezed to the setbacks.",
    image: "/media/plans/92236cf8-willowbrook_front_dusk2-768x432.webp",
    imageAlt: "Private nearly-acre residential land in Union County",
    lat: 40.6482,
    lng: -74.3518,
    listedAt: "2026-03-22",
  },
];

export type LandOpportunitySort = "newest" | "price-asc" | "price-desc" | "acres-desc" | "acres-asc";

export function formatAcres(acres: number): string {
  const rounded = Math.round(acres * 100) / 100;
  return `${rounded} ac`;
}

export function formatLandPrice(listing: Pick<LandOpportunity, "price" | "priceLabel">): string {
  if (listing.priceLabel) return listing.priceLabel;
  if (listing.price == null) return "Price on request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(listing.price);
}

export function getLandOpportunityBySlug(slug: string): LandOpportunity | undefined {
  return landOpportunities.find((l) => l.slug === slug);
}

export function filterLandOpportunities(input: {
  town?: string | "all";
  minAcres?: number;
  maxPrice?: number | null;
  query?: string;
  feature?: LandOpportunityFeature | "all";
  status?: LandOpportunityStatus | "all";
  sort?: LandOpportunitySort;
}): LandOpportunity[] {
  const town = input.town && input.town !== "all" ? input.town : null;
  const minAcres = input.minAcres ?? 0.5;
  const maxPrice = input.maxPrice ?? null;
  const q = (input.query ?? "").trim().toLowerCase();
  const feature = input.feature && input.feature !== "all" ? input.feature : null;
  const status = input.status && input.status !== "all" ? input.status : null;
  const sort = input.sort ?? "newest";

  let rows = landOpportunities.filter((l) => {
    if (l.acres < minAcres) return false;
    if (town && l.town !== town) return false;
    if (maxPrice != null && l.price != null && l.price > maxPrice) return false;
    if (feature && !l.features.includes(feature)) return false;
    if (status && l.status !== status) return false;
    if (q) {
      const hay = [
        l.title,
        l.town,
        l.locationLabel,
        l.description,
        ...l.highlights,
        ...l.features.map((f) => landOpportunityFeatureLabels[f]),
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  rows = [...rows].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY);
      case "price-desc":
        return (b.price ?? 0) - (a.price ?? 0);
      case "acres-desc":
        return b.acres - a.acres;
      case "acres-asc":
        return a.acres - b.acres;
      case "newest":
      default:
        return b.listedAt.localeCompare(a.listedAt);
    }
  });

  return rows;
}

export const landOpportunityStatusLabel: Record<LandOpportunityStatus, string> = {
  available: "Available",
  "under-review": "Under review",
  "coming-soon": "Coming soon",
};

export const landOpportunityFaqs = [
  {
    q: "Are these live MLS listings?",
    a: "This directory is a curated Vantage prototype of lot-style opportunities in our core towns. Inventory can include off-market and builder-network parcels. Always verify current availability, pricing, and title with a licensed realtor and your attorney — we partner on buildability and design.",
  },
  {
    q: "Why only lots over half an acre?",
    a: "Half an acre and above is where many true custom-home programs become realistic in our markets — setbacks, coverage, outdoor living, and privacy all improve. Smaller lots can still work for rebuilds; ask us if you have one in mind.",
  },
  {
    q: "Can Vantage evaluate a lot that isn’t listed here?",
    a: "Yes. Use Land Evaluation or Request a Custom Land Search. We review zoning envelope, topography, utilities, and site risk so you know whether to pursue, redesign, or walk away.",
  },
  {
    q: "Do you help buy the land and build the home?",
    a: "We are a luxury custom builder (N.J. Registered Builder #029289), not a real-estate brokerage. We collaborate with your realtor on due diligence, then design and build when the land supports your vision.",
  },
] as const;
