import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for ${company.name} website use.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Website information is provided for general guidance and does not constitute a construction contract."
      />
      <section className="section pt-0">
        <div className="container-v prose-v card space-y-4 p-8">
          <p>
            Plan pricing shown on this site is base pricing and excludes land, sitework, permits,
            utilities, and finish upgrades unless otherwise stated. Final pricing is determined
            through design, specifications, and written agreement.
          </p>
          <p>
            Project examples, timelines, and investment ranges are illustrative and may vary by
            scope, location, and market conditions.
          </p>
          <p>
            For project-specific terms, refer to your signed construction documents with{" "}
            {company.name}.
          </p>
        </div>
      </section>
    </>
  );
}
