import { ServicePage } from "@/lib/service-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Outdoor Living, Decks, Porches & Sunrooms",
  description:
    "Custom decks, porches, sunrooms, outdoor kitchens, and fireplaces by Vantage Construction — elevate year-round outdoor living in New Jersey.",
  path: "/transformations/outdoor-living",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Outdoor living"
      title="Extend living beyond the walls"
      description="Custom decks, porches, sunrooms, outdoor kitchens, fireplaces, and entertainment areas that make your property a true retreat."
      points={[
        "Custom decks designed for how you entertain",
        "Porches and sunrooms for year-round comfort",
        "Outdoor kitchens and cooking zones",
        "Fireplaces and gathering spaces",
        "Integrated lighting and material selections",
        "Architecture that complements your home",
      ]}
      related={[{ href: "/custom-homes/accessory-buildings", label: "Accessory buildings" }]}
    />
  );
}
