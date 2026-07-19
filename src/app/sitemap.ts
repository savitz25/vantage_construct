import type { MetadataRoute } from "next";
import { locationHubs } from "@/lib/content";
import { plans } from "@/lib/plans";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantageconstruct.com";

const staticRoutes = [
  "/",
  "/custom-homes",
  "/custom-homes/process",
  "/custom-homes/rebuilds",
  "/custom-homes/adus",
  "/custom-homes/accessory-buildings",
  "/available-homes",
  "/design-studio",
  "/cost-to-build-a-house-nj",
  "/studios",
  "/move-or-improve-calculator-nj",
  "/adu-cost-calculator-nj",
  "/finished-basement-cost-nj",
  "/transformations",
  "/transformations/process",
  "/transformations/basements",
  "/transformations/kitchens",
  "/transformations/additions",
  "/transformations/garages",
  "/transformations/outdoor-living",
  "/transformations/attics",
  "/transformations/remodeling",
  "/land",
  "/land/evaluation",
  "/land/spec-homes",
  "/land/multi-lot",
  "/partners",
  "/partners/realtors",
  "/partners/investors",
  "/about",
  "/about/careers",
  "/commercial",
  "/insights",
  "/insights/faq",
  "/insights/blog",
  "/start",
  "/privacy",
  "/terms",
  "/locations",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const planEntries = plans.map((plan) => ({
    url: `${siteUrl}/available-homes/${plan.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const locationEntries = locationHubs.map((loc) => ({
    url: `${siteUrl}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...planEntries, ...locationEntries];
}
