export type HomePlan = {
  slug: string;
  name: string;
  sqft: number;
  priceFrom: number;
  beds: number;
  baths: number;
  style: string;
  sizeBand: "under-2000" | "2000-3000" | "over-3000";
  summary: string;
  features: string[];
  pdfUrl?: string;
  aduCandidate?: boolean;
};

export const pricingDisclaimer =
  "Pricing varies based on your chosen selections and finishes. Land, sitework, permit fees, and utility connections are not included and will vary depending on location. Our team can provide tailored estimates based on your preferred location and needs.";

export const plans: HomePlan[] = [
  {
    slug: "cypress-hollow-farmhouse",
    name: "The Cypress Hollow Farmhouse",
    sqft: 1479,
    priceFrom: 515000,
    beds: 3,
    baths: 2,
    style: "Modern Farmhouse",
    sizeBand: "under-2000",
    summary:
      "Modern elegance meets timeless farmhouse charm in 1,479 sq ft — inviting front porch, open-concept living, and meticulous attention to detail.",
    features: [
      "3 bedrooms, 2 full bathrooms",
      "Spacious 2-car front-entry garage",
      "Open-concept living with 10′ ceilings",
      "L-shaped kitchen with island and eating bar",
      "Primary bedroom on main floor",
      "Covered front and rear porches",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-4367.pdf",
  },
  {
    slug: "cozy-craftsman-cottage",
    name: "The Cozy Craftsman Cottage",
    sqft: 872,
    priceFrom: 275000,
    beds: 1,
    baths: 1.5,
    style: "Craftsman Cottage",
    sizeBand: "under-2000",
    summary:
      "Compact 872 sq ft Craftsman cottage — ideal as a vacation retreat, starter home, or accessory dwelling unit.",
    features: [
      "1 bedroom, 1.5 bathrooms",
      "L-shaped kitchen with walk-in pantry",
      "Fireplace for cozy ambiance",
      "Covered front and rear porches",
      "Open-concept floor plan",
      "No garage (optional add-on)",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-8855.pdf",
    aduCandidate: true,
  },
  {
    slug: "modern-homestead",
    name: "The Modern Homestead",
    sqft: 1448,
    priceFrom: 465000,
    beds: 2,
    baths: 2,
    style: "Modern Farmhouse",
    sizeBand: "under-2000",
    summary:
      "1,448 sq ft modern farmhouse blending country charm with contemporary living and versatile bonus areas.",
    features: [
      "2 bedrooms, 2 bathrooms",
      "One-car side-entry garage with workshop",
      "Open floor plan with 10′ ceilings",
      "Bonus room access on 2nd floor",
      "Mud room and laundry area",
      "Covered front and rear porches",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-6741.pdf",
  },
  {
    slug: "classic-bungalow-retreat",
    name: "The Classic Bungalow Retreat",
    sqft: 1671,
    priceFrom: 570000,
    beds: 3,
    baths: 2,
    style: "Craftsman",
    sizeBand: "under-2000",
    summary:
      "1,671 sq ft single-level Craftsman bungalow with vaulted living areas and timeless architectural details.",
    features: [
      "3 bedrooms, 2 bathrooms",
      "Front-entry 2-car garage",
      "Vaulted ceilings in living areas and primary suite",
      "All rooms on a single level",
      "Mud room with laundry",
      "Multiple covered porches",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-9081.pdf",
  },
  {
    slug: "willow-haven",
    name: "The Willow Haven",
    sqft: 1800,
    priceFrom: 615000,
    beds: 3,
    baths: 2,
    style: "Modern Farmhouse",
    sizeBand: "under-2000",
    summary:
      "One-story 1,800 sq ft modern farmhouse with split-bedroom layout, vaulted great room, and covered porches.",
    features: [
      "3 bedrooms, 2 bathrooms",
      "2-car side carport with storage",
      "Country kitchen with island",
      "Library/media room",
      "Split bedroom design",
      "Covered front and rear porches",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-7266.pdf",
  },
  {
    slug: "ridgeview-haven",
    name: "The Ridgeview Haven",
    sqft: 1849,
    priceFrom: 600000,
    beds: 3,
    baths: 2.5,
    style: "Modern Farmhouse",
    sizeBand: "under-2000",
    summary:
      "1,849 sq ft modern farmhouse with vaulted ceilings, wraparound porches, and spa-like primary suite.",
    features: [
      "3 bedrooms, 2.5 bathrooms",
      "Vaulted great room",
      "L-shaped kitchen with island",
      "Primary suite on main floor",
      "Multiple covered porches (971 sq ft outdoor living)",
      "Detached garage or carport options",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-7623_web.pdf",
  },
  {
    slug: "whispering-pine",
    name: "The Whispering Pine",
    sqft: 1998,
    priceFrom: 640000,
    beds: 4,
    baths: 2,
    style: "Modern Farmhouse",
    sizeBand: "under-2000",
    summary:
      "1,998 sq ft family-friendly farmhouse with vaulted entry, gourmet kitchen, and dual outdoor porches.",
    features: [
      "4 bedrooms, 2 bathrooms",
      "Two-car front-entry garage",
      "Open-concept great room",
      "First-floor primary suite",
      "Home office space",
      "Mud room and breakfast nook",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-7229_web.pdf",
  },
  {
    slug: "magnolia-retreat",
    name: "The Magnolia Retreat",
    sqft: 2192,
    priceFrom: 725000,
    beds: 4,
    baths: 3,
    style: "Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,192 sq ft farmhouse with flexible study/guest suite, spa-inspired primary, and bonus room above garage.",
    features: [
      "4 bedrooms, 3 bathrooms",
      "Side-entry 2-car garage",
      "Study/guest room with full bath",
      "Gourmet kitchen with island",
      "Formal dining and family room with fireplace",
      "Bonus room above garage",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-7465.pdf",
  },
  {
    slug: "westbrook-estate",
    name: "The Westbrook Estate",
    sqft: 2340,
    priceFrom: 745000,
    beds: 3,
    baths: 2.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,340 sq ft design with dramatic 12-foot vaulted great room, gourmet kitchen, and bonus space above garage.",
    features: [
      "3 bedrooms, 2.5 bathrooms",
      "12-foot great room ceiling",
      "Home office/den",
      "Primary suite on main floor",
      "In-law suite potential",
      "Bonus room above garage",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-6935_web.pdf",
  },
  {
    slug: "silverleaf-manor",
    name: "The Silverleaf Manor",
    sqft: 2364,
    priceFrom: 775000,
    beds: 3,
    baths: 2.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,364 sq ft farmhouse-cottage hybrid with spa primary suite, dual walk-in closets, and flexible garage options.",
    features: [
      "3 bedrooms, 2.5 bathrooms",
      "Three-car garage options",
      "Vaulted great room",
      "Mud room with lockers",
      "His and hers walk-in closets",
      "Bonus room above garage",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-4641_web.pdf",
  },
  {
    slug: "fairview-ranch",
    name: "The Fairview Ranch",
    sqft: 2407,
    priceFrom: 765000,
    beds: 3,
    baths: 2.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,407 sq ft single-story ranch with vaulted beams, 11′ ceilings, wraparound porches, and dedicated office.",
    features: [
      "3 bedrooms, 2.5 bathrooms",
      "Rear-entry 2-car garage",
      "Vaulted great room with decorative beams",
      "11′ main floor ceilings",
      "Dedicated home office",
      "Wraparound porch system",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-9417.pdf",
  },
  {
    slug: "silo-house",
    name: "The Silo House",
    sqft: 2425,
    priceFrom: 825000,
    beds: 3,
    baths: 2.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,425 sq ft modern farmhouse with open-concept living and spa-inspired primary suite on the first floor.",
    features: [
      "3 bedrooms, 2.5 bathrooms",
      "Kitchen with island and walk-in pantry",
      "Open concept family, dining, and kitchen",
      "Primary suite on first floor with spa bath",
      "Double vanity sinks",
      "Separate tub and shower",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2025/01/THD-7807_web.pdf",
  },
  {
    slug: "laurelwood",
    name: "The Laurelwood",
    sqft: 2482,
    priceFrom: 800000,
    beds: 4,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,482 sq ft modern farmhouse designed for family living with refined finishes and flexible spaces.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Open-concept living",
      "Gourmet kitchen",
      "Primary suite amenities",
      "Flexible secondary spaces",
      "Covered outdoor living",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2025/01/THD-5252_web.pdf",
  },
  {
    slug: "grand-vista",
    name: "The Grand Vista",
    sqft: 2570,
    priceFrom: 770000,
    beds: 3,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,570 sq ft luxury farmhouse with pool-ready outdoor living, three-car garage, loft, and bonus spaces.",
    features: [
      "3 bedrooms, 3.5 bathrooms",
      "Three-car rear garage",
      "Gourmet kitchen with 8′ island",
      "First-floor primary suite",
      "Second-floor loft and recreation room",
      "Wraparound porches",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-7375_web.pdf",
  },
  {
    slug: "alderwood-barndominium",
    name: "The Alderwood (Cypress Hollow Barndominium)",
    sqft: 2577,
    priceFrom: 825000,
    beds: 3,
    baths: 2.5,
    style: "Barndominium",
    sizeBand: "2000-3000",
    summary:
      "2,577 sq ft barndominium with dramatic two-story great room (27′3″ ceiling) and expansive three-car garage.",
    features: [
      "3 bedrooms, 2.5 bathrooms",
      "3-car front-entry garage",
      "Two-story great room with 27′3″ ceiling",
      "Primary bedroom on main floor",
      "Wraparound porch",
      "Bonus room potential / expandable second floor",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-10060.pdf",
  },
  {
    slug: "meadowbrook-estate",
    name: "The Meadowbrook Estate",
    sqft: 2841,
    priceFrom: 990000,
    beds: 4,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,841 sq ft refined farmhouse with vaulted family room, grand rear porch, media room, and three-car garage options.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Three-car garage options",
      "Vaulted great room",
      "Gourmet island kitchen",
      "Primary suite with cathedral ceiling",
      "Home office and mud room",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-1062_web.pdf",
  },
  {
    slug: "millbrook-manor",
    name: "The Millbrook Manor",
    sqft: 2862,
    priceFrom: 975000,
    beds: 4,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,862 sq ft two-story farmhouse with dramatic great room, dual walk-in closets, loft overlook, and wraparound porch.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Two-car side-entry garage",
      "Wraparound covered porch",
      "First-floor primary suite",
      "Home office and library/media room",
      "Second-floor loft",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-7867_web.pdf",
  },
  {
    slug: "emerald-cottage",
    name: "The Emerald Cottage",
    sqft: 2889,
    priceFrom: 860000,
    beds: 4,
    baths: 3.5,
    style: "Cottage Farmhouse",
    sizeBand: "2000-3000",
    summary:
      "2,889 sq ft Craftsman farmhouse with gourmet kitchen, main-floor primary suite, bonus space, and covered porches.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Kitchen island and walk-in pantry",
      "Primary bedroom on main floor",
      "2-car or 3-car garage options",
      "First-floor laundry",
      "Open floor plan with versatile bonus space",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-8812.pdf",
  },
  {
    slug: "lakeside-loft",
    name: "The Lakeside Loft",
    sqft: 2992,
    priceFrom: 805000,
    beds: 4,
    baths: 3.5,
    style: "Barndominium",
    sizeBand: "2000-3000",
    summary:
      "2,992 sq ft barndominium with soaring 20′4″ great room ceilings, expansive kitchen island, and loft overlook.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Dramatic 20′4″ great room ceiling",
      "Large island kitchen",
      "Main floor primary suite",
      "Second-floor loft overlook",
      "Covered front and rear porches",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-4387_web.pdf",
  },
  {
    slug: "willow-ridge-farmhouse",
    name: "The Willow Ridge Farmhouse",
    sqft: 3146,
    priceFrom: 920000,
    beds: 4,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "over-3000",
    summary:
      "3,146 sq ft modern farmhouse for elevated family living with refined layouts and outdoor connection.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Open-concept great room",
      "Gourmet kitchen",
      "Primary suite amenities",
      "Flexible secondary bedrooms",
      "Covered outdoor living",
    ],
    pdfUrl: "https://vantageconstruct.com/wp-content/uploads/2024/11/THD-8815.pdf",
  },
  {
    slug: "highland-manor",
    name: "The Highland Manor",
    sqft: 3262,
    priceFrom: 950000,
    beds: 4,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "over-3000",
    summary:
      "3,262 sq ft two-story design with side-entry 3-car garage, upstairs master retreat, and walkout basement potential.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Side-entry 3-car garage",
      "Gourmet U-shaped kitchen",
      "Upstairs master retreat",
      "Home office / library options",
      "Second-floor laundry",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-4328_web.pdf",
  },
  {
    slug: "chateau-royale",
    name: "The Chateau Royale",
    sqft: 3349,
    priceFrom: 1085000,
    beds: 4,
    baths: 4,
    style: "Modern Farmhouse",
    sizeBand: "over-3000",
    summary:
      "3,349 sq ft luxury plan with butler’s pantry, wine cellar, guest suite, and main-floor primary retreat.",
    features: [
      "4 bedrooms, 4 bathrooms",
      "Butler’s pantry, walk-in pantry, and kitchen island",
      "Primary suite on main floor",
      "Guest suite",
      "Library/media room",
      "Wine cellar",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2025/01/THD-8712_web.pdf",
  },
  {
    slug: "bridgewater-manor",
    name: "The Bridgewater Manor",
    sqft: 3686,
    priceFrom: 935000,
    beds: 4,
    baths: 3.5,
    style: "Modern Farmhouse",
    sizeBand: "over-3000",
    summary:
      "3,686 sq ft estate-scale farmhouse with vaulted great room, gourmet kitchen, and three-car garage options.",
    features: [
      "4 bedrooms, 3.5 bathrooms",
      "Three-car garage options",
      "Vaulted great room",
      "Gourmet island kitchen",
      "Primary suite with cathedral ceiling",
      "Home office and family room",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2024/12/THD-5910_web.pdf",
  },
  {
    slug: "grand-alpine",
    name: "The Grand Alpine",
    sqft: 4954,
    priceFrom: 1195000,
    beds: 6,
    baths: 4.5,
    style: "Modern Farmhouse",
    sizeBand: "over-3000",
    summary:
      "4,954 sq ft grand residence with six bedrooms, gourmet kitchen with butler’s pantry, and expansive living spaces.",
    features: [
      "6 bedrooms, 4.5 bathrooms",
      "L-shaped gourmet kitchen with island and butler’s pantry",
      "Peninsula/eating bar",
      "Expansive family living areas",
      "Multiple secondary suites",
      "Designed for elevated entertaining",
    ],
    pdfUrl:
      "https://vantageconstruct.com/wp-content/uploads/2025/01/THD-9699_web.pdf",
  },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getPlanBySlug(slug: string) {
  return plans.find((p) => p.slug === slug);
}

export function plansByBand(band: HomePlan["sizeBand"]) {
  return plans.filter((p) => p.sizeBand === band);
}
