import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { BasementBuilderTool } from "@/components/transformations/BasementBuilderTool";
import { basementFaqs } from "@/lib/transformations/basement";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Finished Basement Cost NJ | Basement Builder Calculator",
  description:
    "Finished basement cost calculator for North Jersey. Design theaters, gyms, bars, and guest suites in 60 seconds — live planning estimate from Vantage Construction.",
  path: "/finished-basement-cost-nj",
});

export default function BasementCostPage() {
  return (
    <ToolLanderShell
      toolId="basement-builder"
      path="/finished-basement-cost-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Finished Basements", href: "/transformations/basements" },
        { label: "Basement Builder" },
      ]}
      eyebrow="Interactive tool · Finished basement cost NJ"
      title="Basement Builder"
      description="Design your lower level in 60 seconds. Pick theater, gym, bar, guest suite, and more — watch a live planning estimate for North Jersey update in real time."
      disclaimer={estimateDisclaimer}
      serviceHref="/transformations/basements"
      serviceCtaLabel="Learn how we build them"
      secondaryLinks={[
        { href: "/transformations", label: "All home transformations" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="What turns a planning range into a lower level you love"
      educationIntro="The Basement Builder shapes budget and layout. Craftsmanship is how Vantage makes the space dry, legal, comfortable, and indistinguishable from the rest of your home."
      education={[
        {
          title: "Moisture comes first",
          body: "Before finishes, we evaluate drainage, grading, and any history of dampness. A beautiful lower level that smells like a basement isn’t finished — it’s covered up.",
        },
        {
          title: "Egress & code, designed in",
          body: "Sleeping areas below grade need code-compliant egress. We plan windows or walkouts from day one and manage municipal permits so resale never surprises you.",
        },
        {
          title: "Comfort like the main floor",
          body: "HVAC extensions, dehumidification, and lighting so the space feels intentional — not an afterthought under the stairs.",
        },
        {
          title: "Honest ceiling conversations",
          body: "Most NJ basements finish beautifully at existing height. If yours is tight, we’ll say so — and when a dig-out is (or isn’t) worth it.",
        },
      ]}
      faqs={basementFaqs}
      faqHeading="Finished basement FAQs"
      consultHeading="Ready for real numbers on your home?"
      consultBody="Bring your Basement Builder vision to a complimentary consultation. We’ll talk moisture, egress, ceiling height, and what’s actually possible under your house — phone, Zoom, or on site."
    >
      <BasementBuilderTool />
    </ToolLanderShell>
  );
}
