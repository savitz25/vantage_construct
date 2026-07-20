/**
 * Showcase photography for Studios & Transformations hubs.
 * Prefer lifestyle images already used on service/tool pages for consistency.
 */

export type StudioVisual = {
  href: string;
  image: string;
  alt: string;
};

/** Tool landers keyed by href */
export const studioToolVisuals: Record<string, StudioVisual> = {
  "/kitchen-remodel-cost-nj": {
    href: "/kitchen-remodel-cost-nj",
    image: "/media/kitchens/spaces/entertainer-open.jpg",
    alt: "Luxury open entertainer kitchen — Vantage Kitchen Studio",
  },
  "/attic-conversion-cost-nj": {
    href: "/attic-conversion-cost-nj",
    image: "/media/attics/primary-suite.jpg",
    alt: "Luxury attic primary suite — Vantage Attic Studio",
  },
  "/accessory-building-cost-nj": {
    href: "/accessory-building-cost-nj",
    image: "/media/garages/luxury-garage.jpg",
    alt: "Luxury custom garage — Vantage Garage Studio",
  },
  "/outdoor-kitchen-cost-nj": {
    href: "/outdoor-kitchen-cost-nj",
    image: "/media/outdoor/outdoor-kitchen.jpg",
    alt: "Luxury outdoor kitchen — Vantage Outdoor Living Studio",
  },
  "/primary-suite-cost-nj": {
    href: "/primary-suite-cost-nj",
    image: "/media/primary-suite/spa-retreat.jpg",
    alt: "Luxury spa primary suite — Vantage Primary Suite Studio",
  },
  "/finished-basement-cost-nj": {
    href: "/finished-basement-cost-nj",
    image: "/media/basements/home-theater.jpg",
    alt: "Luxury finished basement home theater — Basement Builder",
  },
  "/move-or-improve-calculator-nj": {
    href: "/move-or-improve-calculator-nj",
    image: "/media/additions/kitchen-gathering.jpg",
    alt: "Home addition and gathering space — Move or Improve calculator",
  },
  "/adu-cost-calculator-nj": {
    href: "/adu-cost-calculator-nj",
    image: "/media/garages/guest-adu.jpg",
    alt: "Accessory dwelling guest suite — ADU Payback calculator",
  },
  "/design-studio": {
    href: "/design-studio",
    image: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    alt: "Luxury custom home exterior — Design Studio",
  },
  "/cost-to-build-a-house-nj": {
    href: "/cost-to-build-a-house-nj",
    image: "/media/plans/dfd9c703-3349farmr1-1-768x512.webp",
    alt: "Custom farmhouse exterior — Cost Studio",
  },
};

/** Service pathway cards on /transformations */
export const transformServiceVisuals: Record<string, StudioVisual> = {
  "/transformations/basements": {
    href: "/transformations/basements",
    image: "/media/basements/home-theater.jpg",
    alt: "Finished basement home theater by Vantage Construction",
  },
  "/transformations/kitchens": {
    href: "/transformations/kitchens",
    image: "/media/kitchens/spaces/entertainer-open.jpg",
    alt: "Luxury kitchen remodeling by Vantage Construction",
  },
  "/transformations/primary-suite": {
    href: "/transformations/primary-suite",
    image: "/media/primary-suite/spa-retreat.jpg",
    alt: "Luxury primary suite remodel by Vantage Construction",
  },
  "/transformations/additions": {
    href: "/transformations/additions",
    image: "/media/additions/great-room.jpg",
    alt: "Luxury home addition great room by Vantage Construction",
  },
  "/transformations/garages": {
    href: "/transformations/garages",
    image: "/media/garages/collectors-garage.jpg",
    alt: "Custom garage and accessory building by Vantage Construction",
  },
  "/transformations/outdoor-living": {
    href: "/transformations/outdoor-living",
    image: "/media/outdoor/full-resort.jpg",
    alt: "Luxury outdoor living estate by Vantage Construction",
  },
  "/transformations/attics": {
    href: "/transformations/attics",
    image: "/media/attics/primary-suite.jpg",
    alt: "Attic conversion suite by Vantage Construction",
  },
};

export function visualForTool(href: string): StudioVisual | undefined {
  return studioToolVisuals[href];
}

export function visualForService(href: string): StudioVisual | undefined {
  return transformServiceVisuals[href];
}
