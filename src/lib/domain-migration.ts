/**
 * Priority 0 — Domain migration configuration
 *
 * PRIMARY DOMAIN (canonical, indexable): https://vantagecustombuilds.com
 * SECONDARY DOMAIN (must only 301):     https://vantageconstruct.com
 *
 * Decision (July 2026): Keep the new Next.js production site as the winner.
 * Brand/email (VantageConstruct.com) can remain on the old domain for mail;
 * web equity should consolidate via 301s into custombuilds.
 *
 * When vantageconstruct.com DNS points at this Vercel project, middleware
 * uses these maps. Until then, apply the same map on WordPress / hosting.
 */

export const PRIMARY_HOST = "vantagecustombuilds.com";
export const PRIMARY_ORIGIN = `https://${PRIMARY_HOST}`;

export const SECONDARY_HOSTS = [
  "vantageconstruct.com",
  "www.vantageconstruct.com",
  "www.vantagecustombuilds.com", // www → apex on primary
] as const;

/**
 * Exact path map: old WordPress / legacy path → new App Router path.
 * Paths without a map fall back to same-path on primary (or / if unknown).
 */
export const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  "/": "/",
  "/schedule": "/start",
  "/schedule/": "/start",
  "/contact": "/start",
  "/contact/": "/start",
  "/contact-us": "/start",
  "/contact-us/": "/start",
  "/available": "/available-homes",
  "/available/": "/available-homes",
  "/available-homes": "/available-homes",
  "/photos": "/available-homes",
  "/photos/": "/available-homes",
  "/portfolio": "/available-homes",
  "/portfolio/": "/available-homes",
  "/gallery": "/available-homes",
  "/gallery/": "/available-homes",
  "/process": "/custom-homes/process",
  "/process/": "/custom-homes/process",
  "/our-process": "/custom-homes/process",
  "/our-process/": "/custom-homes/process",
  "/process-existing": "/transformations/process",
  "/process-existing/": "/transformations/process",
  "/custom-homes": "/custom-homes",
  "/custom-homes/": "/custom-homes",
  "/rebuilds": "/custom-homes/rebuilds",
  "/rebuilds/": "/custom-homes/rebuilds",
  "/knockdowns": "/custom-homes/rebuilds",
  "/knockdowns/": "/custom-homes/rebuilds",
  "/knockdown": "/custom-homes/rebuilds",
  "/knockdown/": "/custom-homes/rebuilds",
  "/adus": "/custom-homes/adus",
  "/adus/": "/custom-homes/adus",
  "/accessory-buildings": "/custom-homes/accessory-buildings",
  "/accessory-buildings/": "/custom-homes/accessory-buildings",
  "/realtors": "/partners/realtors",
  "/realtors/": "/partners/realtors",
  "/investors": "/partners/investors",
  "/investors/": "/partners/investors",
  "/partners": "/partners",
  "/partners/": "/partners",
  "/faq": "/insights/faq",
  "/faq/": "/insights/faq",
  "/faqs": "/insights/faq",
  "/faqs/": "/insights/faq",
  "/blog": "/insights/blog",
  "/blog/": "/insights/blog",
  "/insights": "/insights",
  "/insights/": "/insights",
  "/about": "/about",
  "/about/": "/about",
  "/about-us": "/about",
  "/about-us/": "/about",
  "/careers": "/about/careers",
  "/careers/": "/about/careers",
  "/land": "/land",
  "/land/": "/land",
  // WordPress land IA → Next land IA
  "/land-evaluation": "/land/evaluation",
  "/land-evaluation/": "/land/evaluation",
  "/land_evaluation": "/land/evaluation",
  "/land_evaluation/": "/land/evaluation",
  "/land-development": "/land",
  "/land-development/": "/land",
  "/sell-land": "/land/evaluation",
  "/sell-land/": "/land/evaluation",
  "/sell-us-your-land": "/land/evaluation",
  "/sell-us-your-land/": "/land/evaluation",
  "/multi-lot-use": "/land/multi-lot",
  "/multi-lot-use/": "/land/multi-lot",
  "/multi-lot": "/land/multi-lot",
  "/multi-lot/": "/land/multi-lot",
  "/spec-home-building": "/land/spec-homes",
  "/spec-home-building/": "/land/spec-homes",
  "/spec-homes": "/land/spec-homes",
  "/spec-homes/": "/land/spec-homes",
  "/signature-builds": "/land/spec-homes",
  "/signature-builds/": "/land/spec-homes",
  "/commercial": "/commercial",
  "/commercial/": "/commercial",
  "/basements": "/transformations/basements",
  "/basements/": "/transformations/basements",
  "/finished-basements": "/transformations/basements",
  "/finished-basements/": "/transformations/basements",
  "/additions": "/transformations/additions",
  "/additions/": "/transformations/additions",
  "/kitchens": "/transformations/kitchens",
  "/kitchens/": "/transformations/kitchens",
  "/kitchen-remodeling": "/transformations/kitchens",
  "/kitchen-remodeling/": "/transformations/kitchens",
  "/remodeling": "/transformations/remodeling",
  "/remodeling/": "/transformations/remodeling",
  "/renovations": "/transformations/remodeling",
  "/renovations/": "/transformations/remodeling",
  "/attics": "/transformations/attics",
  "/attics/": "/transformations/attics",
  "/garages": "/transformations/garages",
  "/garages/": "/transformations/garages",
  "/outdoor-living": "/transformations/outdoor-living",
  "/outdoor-living/": "/transformations/outdoor-living",
  "/primary-suite": "/transformations/primary-suite",
  "/primary-suite/": "/transformations/primary-suite",
  "/transformations": "/transformations",
  "/transformations/": "/transformations",
  "/design-studio": "/design-studio",
  "/design-studio/": "/design-studio",
  "/design-your-vantage-vision": "/design-studio",
  "/design-your-vantage-vision/": "/design-studio",
  "/cost-to-build-a-house-calculator-north-jersey": "/cost-to-build-a-house-nj",
  "/cost-to-build-a-house-calculator-north-jersey/": "/cost-to-build-a-house-nj",
  "/cost-to-build-a-house-calculator": "/cost-to-build-a-house-nj",
  "/cost-to-build-a-house-calculator/": "/cost-to-build-a-house-nj",
  "/cost-to-build": "/cost-to-build-a-house-nj",
  "/cost-to-build/": "/cost-to-build-a-house-nj",
  "/privacy": "/privacy",
  "/privacy/": "/privacy",
  "/privacy-policy": "/privacy",
  "/privacy-policy/": "/privacy",
  "/terms": "/terms",
  "/terms/": "/terms",
  "/terms-and-conditions": "/terms",
  "/terms-and-conditions/": "/terms",
  "/locations": "/locations",
  "/locations/": "/locations",
  "/warren": "/locations/warren-nj",
  "/warren/": "/locations/warren-nj",
  "/watchung": "/locations/watchung-nj",
  "/watchung/": "/locations/watchung-nj",
  "/basking-ridge": "/locations/basking-ridge-nj",
  "/basking-ridge/": "/locations/basking-ridge-nj",
  "/short-hills": "/locations/millburn-short-hills-nj",
  "/short-hills/": "/locations/millburn-short-hills-nj",
  "/millburn": "/locations/millburn-short-hills-nj",
  "/millburn/": "/locations/millburn-short-hills-nj",
  "/westfield": "/locations/westfield-nj",
  "/westfield/": "/locations/westfield-nj",
  // WP media should eventually move off secondary host — no HTML page map
};

/** Prefix rules: any path starting with key → destination (query preserved by middleware) */
export const LEGACY_PREFIX_REDIRECTS: { prefix: string; destination: string }[] = [
  { prefix: "/category/", destination: "/insights/blog" },
  { prefix: "/tag/", destination: "/insights/blog" },
  { prefix: "/author/", destination: "/about" },
  { prefix: "/wp-admin", destination: "/" },
  { prefix: "/wp-login", destination: "/" },
];

/**
 * Resolve secondary-domain pathname → primary pathname.
 * Returns null only if path should not redirect (rare); normally always maps.
 */
export function mapLegacyPath(pathname: string): string {
  const raw = pathname || "/";
  // Normalize trailing-slash variants for lookup
  const candidates = [raw];
  if (raw !== "/" && raw.endsWith("/")) {
    candidates.push(raw.slice(0, -1));
  } else if (raw !== "/") {
    candidates.push(`${raw}/`);
  }

  for (const c of candidates) {
    if (LEGACY_PATH_REDIRECTS[c]) return LEGACY_PATH_REDIRECTS[c];
  }

  for (const rule of LEGACY_PREFIX_REDIRECTS) {
    if (raw.startsWith(rule.prefix) || raw.startsWith(rule.prefix.replace(/\/$/, ""))) {
      return rule.destination;
    }
  }

  // Same-path migration for paths that already match the new IA
  // (e.g. /custom-homes already exists on both mental models)
  return raw === "" ? "/" : raw;
}

export function isSecondaryHost(host: string): boolean {
  const h = host.toLowerCase().split(":")[0] ?? "";
  return (SECONDARY_HOSTS as readonly string[]).includes(h);
}

export function buildPrimaryUrl(pathname: string, search = ""): string {
  const path = mapLegacyPath(pathname);
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Apex primary: no trailing slash except root
  const clean =
    normalized !== "/" && normalized.endsWith("/")
      ? normalized.slice(0, -1)
      : normalized;
  return `${PRIMARY_ORIGIN}${clean === "/" ? "" : clean}${search}`;
}
