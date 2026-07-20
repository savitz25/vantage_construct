/**
 * Project / case study portfolio — indexable SEO & trust assets.
 *
 * Replace titles/details with client-approved real project names when available.
 * Photography uses representative Vantage media until dedicated project galleries ship.
 */

export type ProjectType =
  | "custom-home"
  | "rebuild"
  | "renovation"
  | "addition"
  | "accessory"
  | "outdoor";

export type CaseStudy = {
  slug: string;
  title: string;
  locationName: string;
  locationSlug: string;
  county: string;
  type: ProjectType;
  typeLabel: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  scope: string[];
  timelineNote: string;
  features: string[];
  heroImage: string;
  heroAlt: string;
  gallery: { src: string; alt: string }[];
  relatedServices: { href: string; label: string }[];
  relatedTools: { href: string; label: string }[];
  relatedInsights?: { href: string; label: string }[];
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "warren-family-compound-rebuild",
    title: "Warren Family Compound Rebuild",
    locationName: "Warren",
    locationSlug: "warren-nj",
    county: "Somerset",
    type: "rebuild",
    typeLabel: "Knockdown rebuild",
    seoTitle: "Warren NJ Knockdown Rebuild Case Study | Custom Home",
    seoDescription:
      "Case study: a Warren Township knockdown rebuild for a family that loved the street, not the house — lot-first design, modern systems, and No Surprises delivery from Vantage Construction.",
    summary:
      "A mature Warren lot with the right neighborhood — and a house that no longer matched how the family lived. Rebuild economics and a new plan delivered modern flow without leaving town.",
    challenge:
      "The owners had outgrown a 1980s ranch: low ceilings, fragmented kitchen, and systems near end of life. They wanted to stay for schools and community, but renovation quotes approached a large share of rebuild cost while still fighting the original structure.",
    solution:
      "We ran a structured renovate-vs-rebuild assessment, confirmed setbacks and site conditions early, and designed a new custom home sized to the lot — open living, true primary suite, and a lower level planned as finished living space. Design & Discovery locked ranges before full drawings.",
    outcome:
      "A new home on the same street with modern systems, better light, and outdoor connection — without the disruption of selling and buying in a competitive market.",
    scope: [
      "Demolition & site prep",
      "New custom home construction",
      "Finished lower level",
      "Outdoor living connection",
    ],
    timelineNote:
      "Typical full rebuild path measured in many months across design, approvals, and construction — set explicitly in Design & Discovery.",
    features: [
      "Open kitchen and family living",
      "Owner’s suite with spa bath",
      "Finished lower-level recreation",
      "Energy-efficient envelope & systems",
    ],
    heroImage: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
    heroAlt: "Luxury custom home exterior representing a Warren NJ rebuild outcome",
    gallery: [
      {
        src: "/media/rebuilds/before-ranch-nj.webp",
        alt: "Existing ranch-style home before knockdown rebuild evaluation",
      },
      {
        src: "/media/plans/d973d32e-ridgeview-hires17-768x512.webp",
        alt: "Completed custom home exterior craftsmanship",
      },
      {
        src: "/media/basements/home-theater.jpg",
        alt: "Finished lower level living space in a luxury custom home",
      },
    ],
    relatedServices: [
      { href: "/custom-homes/rebuilds", label: "Knockdowns & rebuilds" },
      { href: "/custom-homes", label: "Custom homes" },
      { href: "/locations/warren-nj", label: "Warren town guide" },
    ],
    relatedTools: [
      { href: "/custom-homes/rebuilds#assessment", label: "Renovate vs rebuild assessment" },
      { href: "/cost-to-build-a-house-nj", label: "Cost Studio" },
      { href: "/land/evaluation", label: "Lot evaluation" },
    ],
    relatedInsights: [
      {
        href: "/insights/renovate-or-rebuild-north-jersey-2026",
        label: "Renovate or rebuild decision guide",
      },
    ],
    featured: true,
  },
  {
    slug: "watchung-hillside-outdoor-living",
    title: "Watchung Hillside Outdoor Living",
    locationName: "Watchung",
    locationSlug: "watchung-nj",
    county: "Somerset",
    type: "outdoor",
    typeLabel: "Outdoor living",
    seoTitle: "Watchung NJ Outdoor Kitchen & Terrace Case Study",
    seoDescription:
      "Case study: grade-aware outdoor kitchen and terrace living on a Watchung hillside lot — structure, drainage, and entertaining flow by Vantage Construction.",
    summary:
      "A Watchung property with strong views needed outdoor rooms that respected grade, drainage, and the architecture of the main house.",
    challenge:
      "The existing patio was flat, underused, and disconnected from the kitchen. Steep edges limited safe entertaining space, and the owners wanted a true outdoor kitchen without creating water or structural issues.",
    solution:
      "We designed a terraced outdoor program with covered lounge, cooking zone, and circulation back to the main kitchen — engineering grade and utilities first so the lifestyle features would last.",
    outcome:
      "A multi-season outdoor suite that feels like an extension of the home, with lighting, cooking, and seating planned as one system.",
    scope: [
      "Site grading & drainage coordination",
      "Outdoor kitchen structure",
      "Covered lounge / terrace",
      "Lighting & finish coordination",
    ],
    timelineNote:
      "Outdoor packages vary widely by structure and utilities; ranges start in Outdoor Living Studio, then site validation.",
    features: [
      "Outdoor kitchen with durable finishes",
      "Covered entertaining zone",
      "Grade-aware terracing",
      "Integrated lighting",
    ],
    heroImage: "/media/outdoor/outdoor-kitchen.webp",
    heroAlt: "Luxury outdoor kitchen pavilion in a North Jersey hillside setting",
    gallery: [
      {
        src: "/media/outdoor/outdoor-kitchen.webp",
        alt: "Outdoor kitchen with premium appliances and finishes",
      },
      {
        src: "/media/outdoor/covered-lounge.webp",
        alt: "Covered outdoor lounge terrace",
      },
      {
        src: "/media/outdoor/fire-conversation.webp",
        alt: "Outdoor fire conversation area",
      },
    ],
    relatedServices: [
      { href: "/transformations/outdoor-living", label: "Outdoor living" },
      { href: "/locations/watchung-nj", label: "Watchung town guide" },
      { href: "/custom-homes/accessory-buildings", label: "Accessory buildings" },
    ],
    relatedTools: [
      { href: "/outdoor-kitchen-cost-nj", label: "Outdoor Living Studio" },
      { href: "/accessory-building-cost-nj", label: "Garage Studio" },
    ],
    relatedInsights: [
      {
        href: "/insights/luxury-accessory-buildings-north-jersey",
        label: "Luxury accessory buildings guide",
      },
    ],
    featured: true,
  },
  {
    slug: "basking-ridge-primary-suite-addition",
    title: "Basking Ridge Primary Suite Addition",
    locationName: "Basking Ridge",
    locationSlug: "basking-ridge-nj",
    county: "Somerset",
    type: "addition",
    typeLabel: "Home addition",
    seoTitle: "Basking Ridge Primary Suite Addition Case Study | NJ",
    seoDescription:
      "Case study: a primary suite addition in Basking Ridge that fixed daily life without forcing a move — structure, privacy, and spa-level finishes by Vantage Construction.",
    summary:
      "A strong Basking Ridge location and solid main house — missing a true owner’s suite. An addition delivered privacy and modern baths while protecting neighborhood character.",
    challenge:
      "The family loved the street and schools, but the existing primary bedroom was small, shared a bath, and lacked closet capacity. Moving meant transfer costs and starting over on a new street.",
    solution:
      "We compared move-or-improve economics, then designed a primary suite wing with bedroom, spa bath, and dressing room — matching exterior style and integrating structure carefully so the addition felt original.",
    outcome:
      "A calmer morning routine and a suite that supports long-term stay — without selling into a competitive market.",
    scope: [
      "Structural addition",
      "Primary bedroom & spa bath",
      "Dressing / closet program",
      "Exterior matching & detailing",
    ],
    timelineNote:
      "Additions require design, structural coordination, and permits; living-in-place planning is set early.",
    features: [
      "Private owner’s suite",
      "Spa-style bath",
      "Custom closet system",
      "Seamless exterior blend",
    ],
    heroImage: "/media/primary-suite/traditional-luxury.webp",
    heroAlt: "Luxury primary suite bedroom renovation and addition inspiration",
    gallery: [
      {
        src: "/media/primary-suite/traditional-luxury.webp",
        alt: "Primary suite bedroom with refined finishes",
      },
      {
        src: "/media/additions/great-room.webp",
        alt: "Expanded living volume connected to an addition program",
      },
    ],
    relatedServices: [
      { href: "/transformations/primary-suite", label: "Primary suite" },
      { href: "/transformations/additions", label: "Home additions" },
      { href: "/locations/basking-ridge-nj", label: "Basking Ridge guide" },
    ],
    relatedTools: [
      { href: "/primary-suite-cost-nj", label: "Primary Suite Studio" },
      { href: "/move-or-improve-calculator-nj", label: "Move or Improve calculator" },
    ],
    featured: true,
  },
  {
    slug: "short-hills-kitchen-transformation",
    title: "Short Hills Kitchen Transformation",
    locationName: "Millburn–Short Hills",
    locationSlug: "millburn-short-hills-nj",
    county: "Essex",
    type: "renovation",
    typeLabel: "Kitchen renovation",
    seoTitle: "Short Hills Kitchen Remodel Case Study | Luxury NJ",
    seoDescription:
      "Case study: a Short Hills kitchen renovation built for hosting and daily life — island flow, millwork, and lighting standards expected in Millburn–Short Hills.",
    summary:
      "A classic Short Hills home with a closed-off kitchen became a light-filled hosting hub — without losing the home’s architectural dignity.",
    challenge:
      "The existing kitchen was dark, short on storage, and isolated from living spaces. The owners entertained often and needed flow, quiet appliances, and finishes that would still look intentional a decade later.",
    solution:
      "Working from Kitchen Studio exploration into detailed design, we opened sightlines, added a substantial island, upgraded millwork and lighting, and coordinated mechanicals so the room felt calm and premium.",
    outcome:
      "A kitchen that functions as the social center of the house — aligned with Short Hills finish expectations and daily family life.",
    scope: [
      "Full kitchen renovation",
      "Custom millwork & island",
      "Lighting redesign",
      "Appliance & mechanical coordination",
    ],
    timelineNote:
      "Kitchen programs vary by structural openings and finishes; Kitchen Studio provides early ranges.",
    features: [
      "Large island for hosting",
      "Custom cabinetry",
      "Layered lighting",
      "Quiet, high-end appliances",
    ],
    heroImage: "/media/kitchens/industrial-loft.webp",
    heroAlt: "Luxury kitchen remodel with island and refined finishes",
    gallery: [
      {
        src: "/media/kitchens/industrial-loft.webp",
        alt: "Luxury kitchen with island seating and modern finishes",
      },
    ],
    relatedServices: [
      { href: "/transformations/kitchens", label: "Kitchen remodeling" },
      { href: "/locations/millburn-short-hills-nj", label: "Millburn–Short Hills guide" },
      { href: "/transformations/remodeling", label: "Whole-home remodeling" },
    ],
    relatedTools: [
      { href: "/kitchen-remodel-cost-nj", label: "Kitchen Studio" },
      { href: "/studios", label: "All Studios" },
    ],
    featured: true,
  },
  {
    slug: "westfield-stay-and-improve-expansion",
    title: "Westfield Stay-and-Improve Expansion",
    locationName: "Westfield",
    locationSlug: "westfield-nj",
    county: "Union",
    type: "addition",
    typeLabel: "Addition + renovation",
    seoTitle: "Westfield NJ Addition Case Study | Stay & Improve",
    seoDescription:
      "Case study: a Westfield family expanded in place with an addition and lower-level improvements — comparing move costs against a targeted renovation path with Vantage Construction.",
    summary:
      "Downtown-adjacent Westfield living was the priority. An addition and finished lower level solved space needs without leaving the community.",
    challenge:
      "The family needed more bedrooms and better entertaining space. Buying “the right house” meant higher price, transfer costs, and leaving a walkable location they valued.",
    solution:
      "Move-or-Improve framing showed the cash friction of selling. We planned a rear expansion for living and bedrooms plus a finished lower level for recreation — sequenced for living-in-place where possible.",
    outcome:
      "More usable square footage on the same street, with a kitchen-living connection that matches how the family actually hosts.",
    scope: [
      "Rear addition",
      "Kitchen / living connection",
      "Finished lower level",
      "Living-in-place sequencing",
    ],
    timelineNote:
      "Combined addition + renovation programs require careful phase planning; expectations set in Design & Discovery.",
    features: [
      "Expanded first-floor living",
      "Additional bedroom capacity",
      "Finished basement recreation",
      "Market-aware detailing",
    ],
    heroImage: "/media/additions/great-room.webp",
    heroAlt: "Expanded great room addition for a Westfield-style stay-and-improve project",
    gallery: [
      {
        src: "/media/additions/great-room.webp",
        alt: "Bright expanded living room addition",
      },
      {
        src: "/media/basements/home-theater.jpg",
        alt: "Finished basement entertainment space",
      },
    ],
    relatedServices: [
      { href: "/transformations/additions", label: "Home additions" },
      { href: "/transformations/basements", label: "Finished basements" },
      { href: "/locations/westfield-nj", label: "Westfield town guide" },
    ],
    relatedTools: [
      { href: "/move-or-improve-calculator-nj", label: "Move or Improve calculator" },
      { href: "/finished-basement-cost-nj", label: "Basement Builder" },
    ],
    featured: true,
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}

export function getAllCaseStudySlugs() {
  return caseStudies.map((p) => p.slug);
}

export function getFeaturedCaseStudies(limit = 3) {
  return caseStudies.filter((p) => p.featured).slice(0, limit);
}

export function getCaseStudiesForTown(locationSlug: string) {
  return caseStudies.filter((p) => p.locationSlug === locationSlug);
}

export function getCaseStudiesByType(type: ProjectType) {
  return caseStudies.filter((p) => p.type === type);
}
