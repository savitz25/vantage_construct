import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { AduPaybackTool } from "@/components/transformations/AduPaybackTool";
import { aduFaqs } from "@/lib/transformations/adu-payback";
import { rentDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "ADU Cost & Payback Calculator NJ | Accessory Dwelling Units",
  description:
    "Estimate ADU build cost, rental payback, and 10-year cash flow in Somerset, Morris, Union, and Essex counties. Includes town zoning status notes for North Jersey.",
  path: "/adu-cost-calculator-nj",
});

export default function AduCalculatorPage() {
  return (
    <ToolLanderShell
      toolId="adu-payback"
      path="/adu-cost-calculator-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Custom Homes", href: "/custom-homes" },
        { label: "ADUs", href: "/custom-homes/adus" },
        { label: "ADU Payback Calculator" },
      ]}
      eyebrow="Interactive tool · ADU cost & payback NJ"
      title="ADU cost & payback calculator"
      description="Turn an accessory dwelling unit from a construction line item into an income and multi-gen story — with rent presets by county and a simple town status lookup for North Jersey."
      disclaimer={rentDisclaimer}
      serviceHref="/custom-homes/adus"
      serviceCtaLabel="Learn how we build ADUs"
      secondaryLinks={[
        { href: "/land/evaluation", label: "Land evaluation" },
        { href: "/transformations/garages", label: "Garages & accessory buildings" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="From payback math to a permitted, livable unit"
      educationIntro="The calculator models cost and cash flow. Building an ADU well means zoning, structure, utilities, and design that feels like Vantage craftsmanship — not a backyard shed with a bed."
      education={[
        {
          title: "Zoning & lot reality first",
          body: "Setbacks, coverage, and municipal rules decide what’s possible. We verify feasibility early so design dollars aren’t wasted.",
        },
        {
          title: "Type matches lifestyle",
          body: "Detached cottage, garage conversion, basement suite, or above-garage — each has different cost, privacy, and rental dynamics.",
        },
        {
          title: "Income or multi-gen",
          body: "Rental payback is one story. Privacy for parents or adult children is another. Design follows the real use.",
        },
        {
          title: "Same standards as the main house",
          body: "Finishes, structure, and systems built with the same no-surprises process as our custom homes.",
        },
      ]}
      faqs={aduFaqs}
      faqHeading="ADU FAQs"
      consultHeading="Ready to evaluate your property for an ADU?"
      consultBody="Bring your calculator scenario to a complimentary consultation. We’ll discuss zoning, type, budget, and whether an ADU fits your lot and goals."
    >
      <AduPaybackTool />
    </ToolLanderShell>
  );
}
