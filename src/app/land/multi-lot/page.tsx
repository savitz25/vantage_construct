import { ServicePage } from "@/lib/service-page";
import { landDevelopments } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Multi-Lot & Land Use Development",
  description:
    "Multi-lot subdivisions and land use development in Northern & Central New Jersey — Hidden Hollow Estates, Prospect Hill Estates, Winding Ridge Estates, and more.",
  path: "/land/multi-lot",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Multi-lot development"
      title="From raw land to premium opportunity"
      description={`Small subdivisions, entitlements, and strategic partnerships with luxury builders. Track record includes ${landDevelopments.join(", ")}.`}
      points={[
        "Subdivision and land-use strategy",
        "Entitlements and approvals navigation",
        "Best-use analysis for maximum return",
        "Partnerships with builders, developers, and realtors",
        "Local market expertise since 1990",
        "Transparent process with no surprises",
      ]}
      related={[
        { href: "/partners/investors", label: "Invest with us" },
        { href: "/land/evaluation", label: "Single-lot evaluation" },
      ]}
    />
  );
}
