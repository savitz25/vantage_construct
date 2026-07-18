import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home Additions",
  description:
    "Seamless luxury home additions in Central & Northern New Jersey by Vantage Construction — designed to match your home’s character and enhance value.",
  path: "/transformations/additions",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Additions"
      title="Expand without compromising character"
      description="Seamless additions that perfectly match your home’s style while expanding how your family lives — kitchens, primary suites, great rooms, and multi-room expansions."
      points={[
        "Architectural integration with existing structure",
        "Clear scope, budget conversations, and timeline",
        "Structural planning and permit coordination",
        "Finish matching or intentional modern contrast",
        "Minimized disruption planning when living in place",
        "Quality craftsmanship consistent with new custom builds",
      ]}
      related={[
        { href: "/transformations/process", label: "Transformation process" },
        { href: "/transformations/remodeling", label: "Remodeling" },
      ]}
    />
  );
}
