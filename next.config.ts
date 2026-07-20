import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vantageconstruct.com",
      },
      {
        protocol: "https",
        hostname: "vantagecustombuilds.com",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy WordPress / marketing URLs → new architecture
      { source: "/schedule", destination: "/start", permanent: true },
      { source: "/schedule/", destination: "/start", permanent: true },
      { source: "/available", destination: "/available-homes", permanent: true },
      { source: "/available/", destination: "/available-homes", permanent: true },
      { source: "/process", destination: "/custom-homes/process", permanent: true },
      { source: "/process/", destination: "/custom-homes/process", permanent: true },
      { source: "/process-existing", destination: "/transformations/process", permanent: true },
      { source: "/process-existing/", destination: "/transformations/process", permanent: true },
      { source: "/realtors", destination: "/partners/realtors", permanent: true },
      { source: "/realtors/", destination: "/partners/realtors", permanent: true },
      { source: "/investors", destination: "/partners/investors", permanent: true },
      { source: "/investors/", destination: "/partners/investors", permanent: true },
      { source: "/photos", destination: "/available-homes", permanent: true },
      { source: "/photos/", destination: "/available-homes", permanent: true },
      { source: "/portfolio", destination: "/available-homes", permanent: true },
      { source: "/portfolio/", destination: "/available-homes", permanent: true },
      { source: "/faq", destination: "/insights/faq", permanent: true },
      { source: "/faq/", destination: "/insights/faq", permanent: true },
      { source: "/contact", destination: "/start", permanent: true },
      { source: "/contact/", destination: "/start", permanent: true },
      { source: "/basements", destination: "/transformations/basements", permanent: true },
      { source: "/basements/", destination: "/transformations/basements", permanent: true },
      { source: "/additions", destination: "/transformations/additions", permanent: true },
      { source: "/additions/", destination: "/transformations/additions", permanent: true },
      { source: "/kitchens", destination: "/transformations/kitchens", permanent: true },
      { source: "/kitchens/", destination: "/transformations/kitchens", permanent: true },
      { source: "/remodeling", destination: "/transformations/remodeling", permanent: true },
      { source: "/remodeling/", destination: "/transformations/remodeling", permanent: true },
      {
        source: "/design-your-vantage-vision",
        destination: "/design-studio",
        permanent: true,
      },
      {
        source: "/design-your-vantage-vision/",
        destination: "/design-studio",
        permanent: true,
      },
      {
        source: "/cost-to-build-a-house-calculator-north-jersey",
        destination: "/cost-to-build-a-house-nj",
        permanent: true,
      },
      {
        source: "/cost-to-build-a-house-calculator-north-jersey/",
        destination: "/cost-to-build-a-house-nj",
        permanent: true,
      },
      {
        source: "/cost-to-build-a-house-calculator",
        destination: "/cost-to-build-a-house-nj",
        permanent: true,
      },
      {
        source: "/cost-to-build-a-house-calculator/",
        destination: "/cost-to-build-a-house-nj",
        permanent: true,
      },
      // WordPress land paths → Next land IA (when hit on primary domain)
      { source: "/land-evaluation", destination: "/land/evaluation", permanent: true },
      { source: "/land-evaluation/", destination: "/land/evaluation", permanent: true },
      { source: "/land-development", destination: "/land", permanent: true },
      { source: "/land-development/", destination: "/land", permanent: true },
      { source: "/sell-land", destination: "/land/evaluation", permanent: true },
      { source: "/sell-land/", destination: "/land/evaluation", permanent: true },
      { source: "/multi-lot-use", destination: "/land/multi-lot", permanent: true },
      { source: "/multi-lot-use/", destination: "/land/multi-lot", permanent: true },
      { source: "/spec-home-building", destination: "/land/spec-homes", permanent: true },
      { source: "/spec-home-building/", destination: "/land/spec-homes", permanent: true },
      // Insights article slug aliases
      {
        source: "/insights/renovate-or-rebuild-north-jersey-homeowners-2026",
        destination: "/insights/renovate-or-rebuild-north-jersey-2026",
        permanent: true,
      },
      {
        source: "/insights/what-makes-a-lot-buildable-warren-watchung-basking-ridge",
        destination: "/insights/what-makes-a-lot-buildable-north-jersey",
        permanent: true,
      },
      {
        source: "/insights/finished-lower-level-smartest-luxury-upgrade",
        destination: "/insights/finished-lower-level-luxury-upgrade-north-jersey",
        permanent: true,
      },
      {
        source: "/insights/rise-of-luxury-accessory-building-what-it-costs",
        destination: "/insights/luxury-accessory-buildings-north-jersey",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
