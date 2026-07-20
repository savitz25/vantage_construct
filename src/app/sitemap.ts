import type { MetadataRoute } from "next";
import { locationHubs } from "@/lib/content";
import { plans } from "@/lib/plans";
import { signatureBuilds } from "@/lib/spec-homes/inventory";
import { SITE_URL } from "@/lib/site";

/** All indexable routes — only canonical paths on the production domain */
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/custom-homes", priority: 0.9, changeFrequency: "weekly" },
  { path: "/custom-homes/process", priority: 0.75, changeFrequency: "monthly" },
  { path: "/custom-homes/rebuilds", priority: 0.8, changeFrequency: "monthly" },
  { path: "/custom-homes/adus", priority: 0.8, changeFrequency: "monthly" },
  { path: "/custom-homes/accessory-buildings", priority: 0.75, changeFrequency: "monthly" },
  { path: "/available-homes", priority: 0.85, changeFrequency: "weekly" },
  { path: "/design-studio", priority: 0.85, changeFrequency: "weekly" },
  { path: "/cost-to-build-a-house-nj", priority: 0.95, changeFrequency: "weekly" },
  { path: "/studios", priority: 0.85, changeFrequency: "weekly" },
  { path: "/calculators", priority: 0.9, changeFrequency: "weekly" },
  { path: "/move-or-improve-calculator-nj", priority: 0.9, changeFrequency: "weekly" },
  { path: "/adu-cost-calculator-nj", priority: 0.85, changeFrequency: "weekly" },
  { path: "/finished-basement-cost-nj", priority: 0.9, changeFrequency: "weekly" },
  { path: "/kitchen-remodel-cost-nj", priority: 0.9, changeFrequency: "weekly" },
  { path: "/attic-conversion-cost-nj", priority: 0.85, changeFrequency: "weekly" },
  { path: "/accessory-building-cost-nj", priority: 0.85, changeFrequency: "weekly" },
  { path: "/outdoor-kitchen-cost-nj", priority: 0.9, changeFrequency: "weekly" },
  { path: "/primary-suite-cost-nj", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations/basements", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations/kitchens", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations/additions", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations/primary-suite", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations/garages", priority: 0.8, changeFrequency: "weekly" },
  { path: "/transformations/outdoor-living", priority: 0.85, changeFrequency: "weekly" },
  { path: "/transformations/attics", priority: 0.8, changeFrequency: "weekly" },
  { path: "/transformations/remodeling", priority: 0.75, changeFrequency: "monthly" },
  { path: "/transformations/process", priority: 0.7, changeFrequency: "monthly" },
  { path: "/land", priority: 0.85, changeFrequency: "weekly" },
  { path: "/land/evaluation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/land/spec-homes", priority: 0.85, changeFrequency: "weekly" },
  { path: "/land/multi-lot", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partners/realtors", priority: 0.75, changeFrequency: "monthly" },
  { path: "/partners/investors", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/commercial", priority: 0.6, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/insights/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/insights/blog", priority: 0.65, changeFrequency: "weekly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/start", priority: 0.85, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const planEntries = plans.map((plan) => ({
    url: `${SITE_URL}/available-homes/${plan.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const locationEntries = locationHubs.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const specHomeEntries = signatureBuilds.map((h) => ({
    url: `${SITE_URL}/land/spec-homes/${h.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...planEntries, ...locationEntries, ...specHomeEntries];
}
