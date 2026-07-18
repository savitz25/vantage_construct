import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Remodeling & Renovations",
  description:
    "High-end remodeling and renovations by Vantage Construction — kitchens, baths, whole-home updates across Warren, Watchung, Basking Ridge, and Millburn-Short Hills.",
  path: "/transformations/remodeling",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Remodeling"
      title="Transform outdated spaces into beautiful, functional rooms"
      description="From kitchen and bath renovations to whole-home remodels, we elevate how your home looks and lives — without losing the integrity of quality construction."
      points={[
        "Kitchen & bath renovations",
        "Whole-home remodeling",
        "Layout improvements for modern living",
        "Material and finish guidance",
        "Transparent sequencing and communication",
        "Lasting craftsmanship over trend-chasing",
      ]}
      related={[{ href: "/transformations/additions", label: "Additions" }]}
    />
  );
}
