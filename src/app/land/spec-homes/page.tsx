import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Spec Home Building Program",
  description:
    "Strategic luxury spec homes from $850k to $2M+ across Somerset, Morris, Union, and Essex counties by Vantage Construction.",
  path: "/land/spec-homes",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Spec homes"
      title="Strategic luxury homes for premium markets"
      description="From single-lot opportunities to planned developments, we create distinctive luxury homes that blend old-world craftsmanship with modern innovation."
      points={[
        "High-end finishes from $850k to $2M+ range",
        "Premium locations throughout Somerset, Morris, Union, and Essex counties",
        "Distinctive designs combining traditional elegance with modern amenities",
        "Customized build approach for every project",
        "Expert guidance throughout the entire process",
        "No-surprises building experience",
      ]}
      related={[
        { href: "/partners/investors", label: "Investor partnerships" },
        { href: "/available-homes", label: "Browse designs" },
      ]}
    />
  );
}
