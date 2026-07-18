import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Finished Basements",
  description:
    "Custom finished basements — home theaters, guest suites, game rooms, and more — by Vantage Construction in New Jersey.",
  path: "/transformations/basements",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Basements"
      title="Convert unused space into a custom retreat"
      description="Home theaters, game rooms, guest suites, offices, gyms — finished basements that feel intentional, comfortable, and well-built."
      points={[
        "Guest suites and multi-use living",
        "Home theaters and entertainment spaces",
        "Offices, gyms, and play areas",
        "Moisture-aware detailing and comfort",
        "Lighting and egress planning",
        "Finishes that feel like the main home",
      ]}
    />
  );
}
