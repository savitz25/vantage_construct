import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { PrimarySuiteStudio } from "@/components/primary-suite/PrimarySuiteStudio";
import { primarySuiteFaqs } from "@/lib/primary-suite/faqs";
import { suiteVisions } from "@/lib/primary-suite/visions";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Primary Suite Cost NJ | Primary Suite Studio",
  description:
    "Design a luxury primary suite in North Jersey — bedroom, spa bath, walk-in closet, and private outdoor access. Live planning estimate from Vantage Construction.",
  path: "/primary-suite-cost-nj",
});

export default function PrimarySuiteCostPage() {
  return (
    <ToolLanderShell
      toolId="primary-suite-studio"
      path="/primary-suite-cost-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Primary Suite", href: "/transformations/primary-suite" },
        { label: "Primary Suite Studio" },
      ]}
      eyebrow="Interactive tool · Primary suite cost NJ"
      title="Primary Suite Studio"
      description={`Design your private retreat — bedroom, spa bath, and dressing room. ${suiteVisions.length} visions with zone-based configuration and a North Jersey planning estimate.`}
      disclaimer={estimateDisclaimer}
      serviceHref="/transformations/primary-suite"
      serviceCtaLabel="Learn how we build primary suites"
      secondaryLinks={[
        { href: "/transformations/additions", label: "Home additions" },
        { href: "/move-or-improve-calculator-nj", label: "Move or Improve calculator" },
        { href: "/studios", label: "All Vantage Studios" },
      ]}
      educationHeading="What a true primary suite remodel involves"
      educationIntro="The Studio shapes the dream. Craftsmanship is structure, wet-zone detailing, millwork, and privacy — so the suite feels like a hotel retreat every morning."
      education={[
        {
          title: "Bathroom is the emotional centerpiece",
          body: "Freestanding tubs, steam, curbless showers, and double vanities drive both lifestyle and investment — designed for water, waterproofing, and light.",
        },
        {
          title: "Closet as dressing architecture",
          body: "From premium organizers to fully custom millwork and islands — storage that feels intentional, not afterthought.",
        },
        {
          title: "Bedroom as quiet architecture",
          body: "Feature walls, ceilings, fireplaces, and private outdoor access that set the mood for rest.",
        },
        {
          title: "Addition or renovation",
          body: "Many suites expand the footprint. We plan structure, roof ties, and living-in-place honestly before design investment.",
        },
      ]}
      faqs={primarySuiteFaqs}
      faqHeading="Primary suite FAQs"
      consultHeading="Ready to design your private retreat?"
      consultBody="Bring your Primary Suite Studio vision to a complimentary consultation. We’ll walk the home, discuss addition vs remodel, and outline a clear path from concept to craftsmanship."
    >
      <PrimarySuiteStudio />
    </ToolLanderShell>
  );
}
