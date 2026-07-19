import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Knockdown Rebuild NJ | Teardown & Custom Home Rebuild",
  description:
    "Transform your existing property into a luxury custom home with Vantage Construction’s knockdown and rebuild expertise across Central & Northern New Jersey.",
  path: "/custom-homes/rebuilds",
});

export default function RebuildsPage() {
  return (
    <>
      <PageHero
        eyebrow="Knockdowns & rebuilds"
        title="Build your dream home where you already live"
        description="Transform your property into the home you actually want. We guide you through every step — evaluation, design, permitting, demolition coordination, and construction — with no surprises."
      />
      <section className="section pt-0">
        <div className="container-v prose-v space-y-6">
          <div className="card p-8">
            <h2 className="font-display text-3xl text-ivory">Why rebuild in place?</h2>
            <ul className="mt-6 space-y-3 text-text-muted">
              <li>Keep the location, schools, and neighborhood you love</li>
              <li>Replace outdated layouts with modern luxury living</li>
              <li>Maximize lot potential with expert land evaluation</li>
              <li>Leverage our full custom home process from vision to celebration</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/custom-homes/process" className="btn btn-primary">
                See the build process
              </Link>
              <Link href="/land/evaluation" className="btn btn-secondary">
                Land evaluation
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner title="Evaluate your rebuild opportunity" />
    </>
  );
}
