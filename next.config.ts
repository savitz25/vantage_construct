import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vantageconstruct.com",
      },
    ],
  },
  async redirects() {
    return [
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
      { source: "/photos", destination: "/portfolio", permanent: true },
      { source: "/photos/", destination: "/portfolio", permanent: true },
      { source: "/faq", destination: "/insights/faq", permanent: true },
      { source: "/faq/", destination: "/insights/faq", permanent: true },
      { source: "/contact", destination: "/start", permanent: true },
      { source: "/contact/", destination: "/start", permanent: true },
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
    ];
  },
};

export default nextConfig;
