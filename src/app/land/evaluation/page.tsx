import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Land Evaluation",
  description:
    "Professional land evaluation and lot maximization for custom homes in Warren, Watchung, Basking Ridge, Millburn-Short Hills, and surrounding NJ communities.",
  path: "/land/evaluation",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Land evaluation"
      title="Know what your lot can become"
      description="Professional evaluation of your land — or help finding the right home site — with feasibility analysis grounded in local zoning and build realities."
      points={[
        "Site feasibility for your desired design",
        "Local zoning and setback considerations",
        "Utility, topography, and access factors",
        "Budget realism before major commitments",
        "Guidance for knockdown vs. new lot decisions",
        "Path into Design & Discovery when ready",
      ]}
      related={[
        { href: "/custom-homes/process", label: "Build process" },
        { href: "/land", label: "All land services" },
      ]}
    />
  );
}
