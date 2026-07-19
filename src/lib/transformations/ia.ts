/**
 * Transformations information architecture — single source of truth for
 * hub cards, nav children, and cross-links between service pages and tools.
 */

export type TransformServiceLink = {
  label: string;
  href: string;
  /** Short nav label when different from card title */
  navLabel?: string;
  body: string;
  /** Optional elevated lifestyle title for hub cards */
  title?: string;
};

export type TransformToolLink = {
  label: string;
  href: string;
  body: string;
  badge?: string;
  featured?: boolean;
};

/** Primary services shown in nav + hub (order matters). */
export const transformServices: TransformServiceLink[] = [
  {
    label: "Finished Basements",
    title: "Lower Level Living",
    href: "/transformations/basements",
    body: "Private cinemas, wellness suites, speakeasies, and guest quarters — the best square footage you already own.",
  },
  {
    label: "Kitchen Remodeling",
    title: "Kitchens That Gather",
    href: "/transformations/kitchens",
    body: "The heart of the home reimagined — islands, light, storage, and entertaining flow built for how you actually live.",
  },
  {
    label: "Home Additions",
    title: "Home Additions",
    href: "/transformations/additions",
    body: "Primary suites, great rooms, and expansions that match your architecture without giving up your neighborhood.",
  },
  {
    label: "Garages & Accessory Buildings",
    title: "Garages & Accessory Buildings",
    href: "/transformations/garages",
    navLabel: "Garages & Accessory Buildings",
    body: "Collector garages, workshops, studios, and carriage-style buildings that feel as intentional as the main house.",
  },
  {
    label: "Outdoor Living",
    title: "Outdoor Living Estate",
    href: "/transformations/outdoor-living",
    body: "Porches, sunrooms, decks, outdoor kitchens, and fireplaces for resort-level evenings at home.",
  },
  {
    label: "Attic Conversions",
    title: "Attic Sanctuaries",
    href: "/transformations/attics",
    body: "Upper-level suites, studios, and offices reclaimed from volume under the roof.",
  },
];

/** Secondary / process links (nav optional, hub footer). */
export const transformSecondaryLinks = [
  { label: "Transformations Overview", href: "/transformations" },
  { label: "Existing Home Process", href: "/transformations/process" },
  { label: "Whole-Home Remodeling", href: "/transformations/remodeling" },
] as const;

/** Interactive tool landers tied to transformations. */
export const transformTools: TransformToolLink[] = [
  {
    label: "Basement Builder",
    href: "/finished-basement-cost-nj",
    body: "Design your lower level in 60 seconds — theater, gym, bar, guest suite — with a live planning estimate.",
    badge: "Most popular",
    featured: true,
  },
  {
    label: "Move or Improve?",
    href: "/move-or-improve-calculator-nj",
    body: "Compare true North Jersey selling costs against the addition that solves the same problem.",
    badge: "Additions",
  },
  {
    label: "ADU Payback",
    href: "/adu-cost-calculator-nj",
    body: "Build cost, rent potential, and break-even timeline for accessory dwellings by county.",
    badge: "ADUs",
  },
];

/** Desktop/mobile nav children under Transformations. */
export const transformNavChildren = [
  { label: "Overview", href: "/transformations" },
  { label: "Finished Basements", href: "/transformations/basements" },
  { label: "Kitchen Remodeling", href: "/transformations/kitchens" },
  { label: "Home Additions", href: "/transformations/additions" },
  { label: "Garages & Accessory Buildings", href: "/transformations/garages" },
  { label: "Outdoor Living", href: "/transformations/outdoor-living" },
  { label: "Attic Conversions", href: "/transformations/attics" },
  { label: "Renovation Process", href: "/transformations/process" },
] as const;

export const transformServicePaths = [
  "/transformations",
  "/transformations/process",
  "/transformations/basements",
  "/transformations/kitchens",
  "/transformations/additions",
  "/transformations/garages",
  "/transformations/outdoor-living",
  "/transformations/attics",
  "/transformations/remodeling",
  "/finished-basement-cost-nj",
  "/move-or-improve-calculator-nj",
  "/adu-cost-calculator-nj",
] as const;

/**
 * Canonical service ↔ tool pairs for interlinking and SEO.
 * Anchor text convention:
 * - Service → tool: "Open the {Tool Name}"
 * - Tool → service: "Learn how we build them" / "Learn how we build {noun}"
 */
export const serviceToolPairs = [
  {
    servicePath: "/transformations/basements",
    serviceLabel: "Finished Basements",
    toolPath: "/finished-basement-cost-nj",
    toolLabel: "Basement Builder",
    openCta: "Open the Basement Builder",
    learnCta: "Learn how we build them",
  },
  {
    servicePath: "/transformations/additions",
    serviceLabel: "Home Additions",
    toolPath: "/move-or-improve-calculator-nj",
    toolLabel: "Move or Improve",
    openCta: "Open the Move or Improve calculator",
    learnCta: "Learn how we build additions",
  },
  {
    servicePath: "/custom-homes/adus",
    serviceLabel: "ADUs",
    toolPath: "/adu-cost-calculator-nj",
    toolLabel: "ADU Payback",
    openCta: "Open the ADU Payback calculator",
    learnCta: "Learn how we build ADUs",
  },
] as const;
