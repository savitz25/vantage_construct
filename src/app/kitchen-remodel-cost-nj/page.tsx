import { ToolLanderShell } from "@/components/transformations/ToolLanderShell";
import { KitchenStudio } from "@/components/kitchen-studio/KitchenStudio";
import { kitchenStudioFaqs } from "@/lib/kitchen-studio/faqs";
import { kitchenStyles } from "@/lib/kitchen-studio/styles";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Kitchen Remodel Cost NJ | Kitchen Design Studio",
  description:
    "Design a luxury kitchen remodel in North Jersey. Explore 12 high-end styles, swap counters, islands, and hardware live — with a planning cost estimate from Vantage Construction.",
  path: "/kitchen-remodel-cost-nj",
});

export default function KitchenRemodelCostPage() {
  return (
    <ToolLanderShell
      toolId="kitchen-studio"
      path="/kitchen-remodel-cost-nj"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
        { label: "Kitchen Remodeling", href: "/transformations/kitchens" },
        { label: "Kitchen Studio" },
      ]}
      eyebrow="Interactive tool · Kitchen remodel cost NJ"
      title="Kitchen Design Studio"
      description={`Design a luxury kitchen in minutes. Choose from ${kitchenStyles.length} curated styles — then swap countertops, backsplash, island, and hardware while a North Jersey planning estimate updates live.`}
      disclaimer={estimateDisclaimer}
      serviceHref="/transformations/kitchens"
      serviceCtaLabel="Learn how we build kitchens"
      secondaryLinks={[
        { href: "/transformations", label: "All home transformations" },
        { href: "/studios", label: "All Vantage Studios" },
        { href: "/finished-basement-cost-nj", label: "Basement Builder" },
      ]}
      educationHeading="What a true luxury kitchen remodel involves"
      educationIntro="The Studio shapes look and budget. Craftsmanship is how Vantage delivers a kitchen that cooks, hosts, and still looks intentional a decade later."
      education={[
        {
          title: "Layout before millwork",
          body: "Traffic, islands, appliance clearances, and storage strategy locked before cabinetry is ordered — not after a pretty render.",
        },
        {
          title: "Systems & ventilation",
          body: "Gas, electric, water, and range hood exhaust planned for real cooking. Luxury fails when the hood is an afterthought.",
        },
        {
          title: "Living-in-place realism",
          body: "Clear sequencing and temporary kitchen planning so your household can function during the remodel.",
        },
        {
          title: "Honest timeline & lead times",
          body: "Custom cabinetry and appliances drive the calendar. You’ll get a written timeline before construction begins.",
        },
      ]}
      faqs={kitchenStudioFaqs}
      faqHeading="Kitchen remodel FAQs"
      consultHeading="Ready to turn this vision into a real kitchen?"
      consultBody="Bring your Kitchen Studio selections to a complimentary consultation. We’ll walk the existing space, talk structure and appliances, and outline a clear path from concept to craftsmanship."
    >
      <KitchenStudio />
    </ToolLanderShell>
  );
}
