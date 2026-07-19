import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { AtticStudio } from "@/components/attic-studio/AtticStudio";
import { atticStudioFaqs } from "@/lib/attic-studio/faqs";
import { atticVisions } from "@/lib/attic-studio/visions";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Attic Conversion Cost NJ | Finish Attic into Bedroom | Attic Studio",
  description:
    "Attic conversion cost calculator for North Jersey — finish an attic into a bedroom, suite, or office. Dormers, baths, skylights, and live planning estimates for Warren, Basking Ridge, and nearby towns.",
  path: "/attic-conversion-cost-nj",
});

export default function AtticConversionCostPage() {
  return (
    <ToolLanderShell
      toolId="attic-studio"
      path="/attic-conversion-cost-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Attic Conversions", href: "/transformations/attics" },
        { label: "Attic Studio" },
      ]}
      eyebrow="Interactive tool · Attic conversion cost NJ"
      title="Attic Studio"
      description={`Design your private upper level in minutes. Choose from ${atticVisions.length} visions — primary suite, guest quarters, office, teen retreat — then shape dormers, baths, skylights, and finishes with a North Jersey planning estimate.`}
      disclaimer={estimateDisclaimer}
      serviceHref="/transformations/attics"
      serviceCtaLabel="Learn how we build upper levels"
      secondaryLinks={[
        { href: "/transformations", label: "All home transformations" },
        { href: "/kitchen-remodel-cost-nj", label: "Kitchen Studio" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="What a real attic conversion requires"
      educationIntro="The Studio shapes vision and budget. Craftsmanship is structure, stairs, light, and comfort — so the space feels like a planned floor of the house, not leftover volume under the roof."
      education={[
        {
          title: "Structural honesty first",
          body: "Load capacity, collar ties, and floor systems evaluated before we promise a suite. No wishful thinking on joists.",
        },
        {
          title: "Stairs & access as architecture",
          body: "Comfortable, code-smart access that feels intentional — not a pull-down ladder afterthought.",
        },
        {
          title: "Light, egress & resale",
          body: "Dormers, windows, and egress planned for safety, brightness, and appraisal conversations.",
        },
        {
          title: "Comfort envelope",
          body: "Insulation, ventilation, and HVAC so summer heat and winter chill don’t define the room.",
        },
      ]}
      faqs={atticStudioFaqs}
      faqHeading="Attic conversion FAQs"
      consultHeading="Ready for a real feasibility look at your roof?"
      consultBody="Bring your Attic Studio vision to a complimentary consultation. We’ll talk structure, headroom, stairs, and what’s actually possible under your roof — phone, Zoom, or on site."
    >
      <AtticStudio />
    </ToolLanderShell>
  );
}
