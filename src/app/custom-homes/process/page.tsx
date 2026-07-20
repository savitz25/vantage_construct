import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PlanningPathways } from "@/components/PlanningPathways";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { createMetadata, howToJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Home Building Process NJ | 7-Step No-Surprises Path",
  description:
    "Discover Vantage Construction’s proven 7-step custom home building process in Central New Jersey — from vision to celebration with no surprises.",
  path: "/custom-homes/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={howToJsonLd()} />
      <PageHero
        eyebrow="No surprises"
        title="Your 7-step expert-guided journey"
        description="Clear guidance and support from your first meeting to our collaborative celebration. Building your dream home should be exciting, organized, and transparent."
      >
        <Link href="/transformations/process" className="btn btn-secondary">
          Existing home customization process
        </Link>
      </PageHero>

      <section className="section pt-0">
        <div className="container-v">
          <ProcessTimeline />
          <div className="card mt-10 p-8">
            <h2 className="font-display text-3xl text-ivory">
              Free guide: 7 Steps To Your Successful Build
            </h2>
            <p className="mt-3 text-text-muted">
              Your free guide to a no-surprises construction experience — covering vision, design
              investment, deposits, permits, build communication (including optional job-site
              camera), certificate of occupancy, and housewarming celebration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/insights#featured" className="btn btn-primary">
                Get the guide
              </Link>
              <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary">
                Open Cost Studio
              </Link>
              <Link href="/design-studio" className="btn btn-secondary">
                Design Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PlanningPathways
        title="After you understand the process"
        body="Model a range, test a lot, explore a rebuild, or open a Studio — then schedule a conversation when you are ready."
      />

      <CtaBanner />
    </>
  );
}
