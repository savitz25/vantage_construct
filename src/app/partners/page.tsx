import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Partner With Vantage",
  description:
    "Realtor and investor partnership opportunities with Vantage Construction — land packages, referrals, and development structures in Central & Northern New Jersey.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="We love to team up"
        description="Whether you represent discerning buyers, list land, or invest in New Jersey real estate — Vantage is a hands-on partner with 35+ years of local execution."
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          <Link href="/partners/realtors" className="card card-hover p-10">
            <h2 className="font-display text-4xl text-ivory">For Realtors</h2>
            <p className="mt-3 text-text-muted">
              Convert land listings into home packages and refer premium buyers — with commission
              structures that can more than triple land-only earnings.
            </p>
            <span className="mt-6 inline-block text-gold">Explore realtor program →</span>
          </Link>
          <Link href="/partners/investors" className="card card-hover p-10">
            <h2 className="font-display text-4xl text-ivory">For Investors</h2>
            <p className="mt-3 text-text-muted">
              Loan, equity, and hybrid partnership structures backed by a proven development and
              custom home track record since 1990.
            </p>
            <span className="mt-6 inline-block text-gold">Explore investor options →</span>
          </Link>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
