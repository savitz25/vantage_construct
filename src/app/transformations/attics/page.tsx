import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Attic Conversions",
  description:
    "Turn underutilized attic space into valuable living space with Vantage Construction attic conversions in Central & Northern New Jersey.",
  path: "/transformations/attics",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Attics"
      title="A private sanctuary under the roof"
      description="Convert underutilized attic volume into bedrooms, offices, studios, or retreat spaces — carefully planned for structure, comfort, and code."
      points={[
        "Bedroom and suite conversions",
        "Offices and creative studios",
        "Structural and insulation considerations",
        "Stair and access planning",
        "Natural light strategies",
        "Seamless integration with existing architecture",
      ]}
    />
  );
}
