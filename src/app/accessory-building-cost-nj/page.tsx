import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { GarageStudio } from "@/components/garage-studio/GarageStudio";
import { garageStudioFaqs } from "@/lib/garage-studio/faqs";
import { garagePurposes } from "@/lib/garage-studio/purposes";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Garage Cost NJ | Carriage House & Accessory Building Studio",
  description:
    "Design a luxury custom garage, carriage house, workshop, or ADU accessory building in North Jersey. Live planning cost estimate from Vantage Construction.",
  path: "/accessory-building-cost-nj",
});

export default function AccessoryBuildingCostPage() {
  return (
    <ToolLanderShell
      toolId="garage-studio"
      path="/accessory-building-cost-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Garages & Accessory Buildings", href: "/transformations/garages" },
        { label: "Garage Studio" },
      ]}
      eyebrow="Interactive tool · Custom garage & accessory building cost NJ"
      title="Garage + Accessory Building Studio"
      description={`Design a private garage, carriage house, workshop, studio, or accessory living structure. ${garagePurposes.length} building types with live configuration and a North Jersey planning estimate.`}
      disclaimer={estimateDisclaimer}
      serviceHref="/transformations/garages"
      serviceCtaLabel="Learn how we build them"
      secondaryLinks={[
        { href: "/custom-homes/accessory-buildings", label: "New-build accessory buildings" },
        { href: "/adu-cost-calculator-nj", label: "ADU Payback calculator" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="What a luxury accessory building really involves"
      educationIntro="The Studio shapes type and budget. Craftsmanship is foundation, structure, utilities, and architecture that belongs on your property — not a kit shed next to a luxury home."
      education={[
        {
          title: "Site & zoning first",
          body: "Setbacks, coverage, and municipal rules checked before design investment so the building is buildable.",
        },
        {
          title: "Structure & envelope",
          body: "Foundations, framing, and weatherproofing sized for cars, shop equipment, climate control, or living space above.",
        },
        {
          title: "Living space / ADU programs",
          body: "Stairs, egress, baths, and zoning for carriage suites or freestanding guest dwellings — evaluated honestly.",
        },
        {
          title: "Architectural continuity",
          body: "Materials and massing that read as part of the estate language — continuous with the main house.",
        },
      ]}
      faqs={garageStudioFaqs}
      faqHeading="Garage & accessory building FAQs"
      consultHeading="Ready to place the right building on your property?"
      consultBody="Bring your Garage Studio vision to a complimentary consultation. We’ll review the site, zoning, utilities, and what belongs architecturally next to your home."
    >
      <GarageStudio />
    </ToolLanderShell>
  );
}
