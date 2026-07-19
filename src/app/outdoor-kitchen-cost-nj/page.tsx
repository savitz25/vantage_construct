import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { OutdoorStudio } from "@/components/outdoor-studio/OutdoorStudio";
import { outdoorStudioFaqs } from "@/lib/outdoor-studio/faqs";
import { outdoorVisions } from "@/lib/outdoor-studio/visions";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Outdoor Kitchen Cost NJ | Outdoor Living Studio",
  description:
    "Design a luxury outdoor kitchen, covered lounge, fire feature, or resort-style backyard in North Jersey. Live planning estimate from Vantage Construction.",
  path: "/outdoor-kitchen-cost-nj",
});

export default function OutdoorKitchenCostPage() {
  return (
    <ToolLanderShell
      toolId="outdoor-studio"
      path="/outdoor-kitchen-cost-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Outdoor Living", href: "/transformations/outdoor-living" },
        { label: "Outdoor Living Studio" },
      ]}
      eyebrow="Interactive tool · Outdoor kitchen & living cost NJ"
      title="Outdoor Living Studio"
      description={`Design resort-style outdoor kitchens, covered lounges, fire features, and entertainment pavilions. ${outdoorVisions.length} visions with live configuration and a North Jersey planning estimate.`}
      disclaimer={estimateDisclaimer}
      serviceHref="/transformations/outdoor-living"
      serviceCtaLabel="Learn how we build outdoor living"
      secondaryLinks={[
        { href: "/kitchen-remodel-cost-nj", label: "Kitchen Studio" },
        { href: "/transformations", label: "All transformations" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="What luxury outdoor living really involves"
      educationIntro="The Studio shapes vision and budget. Craftsmanship is structure, drainage, utilities, and materials that survive New Jersey weather — not catalog furniture on a slab."
      education={[
        {
          title: "Structure & attachments",
          body: "Footings, ledgers, and covered structures engineered for safety and longevity — not temporary kits.",
        },
        {
          title: "Utilities for real cooking",
          body: "Gas, electric, water, and drainage planned for outdoor kitchens that actually get used.",
        },
        {
          title: "Weather & materials",
          body: "Surfaces and assemblies chosen for freeze-thaw, sun, and moisture — outdoor-rated by design.",
        },
        {
          title: "Architecture continuous with the house",
          body: "Pavilions and porches that look original to the estate language, not bolted on.",
        },
      ]}
      faqs={outdoorStudioFaqs}
      faqHeading="Outdoor living FAQs"
      consultHeading="Ready to turn the backyard into the favorite room?"
      consultBody="Bring your Outdoor Living Studio vision to a complimentary consultation. We’ll walk the property, utilities, and what belongs architecturally with your home."
    >
      <OutdoorStudio />
    </ToolLanderShell>
  );
}
