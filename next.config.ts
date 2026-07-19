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
    ];
  },
};

export default nextConfig;
