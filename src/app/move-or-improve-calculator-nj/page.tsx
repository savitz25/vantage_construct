import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { MoveOrImproveTool } from "@/components/transformations/MoveOrImproveTool";
import { company } from "@/lib/company";
import { taxDisclaimer } from "@/lib/transformations/disclaimers";
import { moveImproveFaqs } from "@/lib/transformations/move-or-improve";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Move or Improve Calculator NJ | Selling Costs vs Renovation",
  description:
    "Should you move or renovate in North Jersey? Factor commissions plus NJ Graduated Percent Fee / transfer costs vs a home addition. Free Move or Improve calculator for Warren, Basking Ridge, Westfield & beyond.",
  path: "/move-or-improve-calculator-nj",
});

export default function MoveOrImprovePage() {
  return (
    <ToolLanderShell
      toolId="move-or-improve"
      path="/move-or-improve-calculator-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Home Additions", href: "/transformations/additions" },
        { label: "Move or Improve Calculator" },
      ]}
      eyebrow="Interactive tool · Move or improve"
      title="Move or Improve calculator"
      description={`Selling in ${company.focusTowns.join(", ")} and nearby markets layers commissions and NJ transfer costs. Compare that friction against the addition that solves the same problem — then decide with clearer math.`}
      disclaimer={taxDisclaimer}
      serviceHref="/transformations/additions"
      serviceCtaLabel="Learn how we build additions"
      secondaryLinks={[
        { href: "/transformations", label: "All home transformations" },
        { href: "/custom-homes/rebuilds", label: "Knockdowns & rebuilds" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="NJ transfer fees changed the move-vs-improve math"
      educationIntro="Seller-paid transfer costs and commissions can erase the “just sell and upgrade” advantage. The calculator surfaces that friction; Vantage turns “improve” into architecture — additions, kitchens, and lifestyle expansions with living-in-place planning."
      education={[
        {
          title: "True cost of selling in New Jersey",
          body: "Commissions plus NJ transfer / Graduated Percent Fee tiers on higher-value homes, moving, and buy-side friction stack quickly — often more than a targeted addition that fixes the real problem.",
        },
        {
          title: "Keep the rate, keep the neighborhood",
          body: "Improving preserves schools, friends, and financing you’ve already earned — when the lot and structure can support the vision in towns like Warren, Basking Ridge, and Westfield.",
        },
        {
          title: "Scope that solves the real problem",
          body: "Primary suite, kitchen expansion, multi-room wing — we design the addition that actually closes the lifestyle gap, then price it with Studio tools and Design & Discovery.",
        },
        {
          title: "Honest “move might be better” moments",
          body: "Sometimes the lot, structure, or program says relocate. We’ll tell you — no sales theater. Rebuilds and new custom homes remain options when improve is the wrong path.",
        },
      ]}
      faqs={moveImproveFaqs}
      faqHeading="Move or improve FAQs"
      consultHeading="Ready to walk your home and lot?"
      consultBody="Bring your calculator results to a complimentary consultation. We’ll discuss what’s buildable, what it might cost, and whether improving or moving fits your family."
    >
      <MoveOrImproveTool />
    </ToolLanderShell>
  );
}
