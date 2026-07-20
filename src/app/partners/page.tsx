import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Realtor & Investor Partners NJ | Vantage Construction",
  description:
    "Partner with Vantage Construction: realtor land-to-home packages and referral support, plus investor loan, equity, and hybrid structures across Central & Northern New Jersey.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Partners", path: "/partners" },
        ]}
        eyebrow="Partnerships · Central & Northern NJ"
        title="A builder partner who protects your reputation"
        description={`Whether you represent discerning buyers, list land, or invest in New Jersey real estate — Vantage is a hands-on partner with ${company.yearsExperience} years of local execution and a No Surprises standard.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/partners/realtors" className="btn btn-primary">
            For realtors
          </Link>
          <Link href="/partners/investors" className="btn btn-secondary">
            For investors
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-b border-border bg-bg-elevated">
        <div className="container-wide grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow">Why partner here</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Collaboration designed for long relationships
            </h2>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              Strong partnerships in this market are built on responsiveness, realistic numbers, and
              a builder who does not put agents or capital partners in awkward positions with clients.
            </p>
            <p>
              We work most often across {company.focusTowns.join(", ")} and the surrounding{" "}
              {company.counties.join(", ")} counties — where local knowledge and trade quality matter
              as much as the marketing story.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          <Link href="/partners/realtors" className="card card-hover flex flex-col p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Agents & brokers
            </p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">For realtors</h2>
            <p className="mt-4 flex-1 text-text-muted leading-relaxed">
              Convert land listings into home packages, support knockdown conversations, and refer
              premium buyers — with collaboration designed to protect your client relationships and
              commission path.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-text-muted">
              <li>· Land-to-home packaging support</li>
              <li>· Buyer education tools (Cost Studio, rebuilds, lot evaluation)</li>
              <li>· Clear communication standards</li>
            </ul>
            <span className="mt-6 text-sm font-semibold text-gold-deep">
              Explore realtor program →
            </span>
          </Link>

          <Link href="/partners/investors" className="card card-hover flex flex-col p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Capital partners
            </p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">For investors</h2>
            <p className="mt-4 flex-1 text-text-muted leading-relaxed">
              Loan, equity, and hybrid structures on select opportunities — with a builder who
              understands both construction risk and North Jersey market reality. Conversations stay
              discreet and educational.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-text-muted">
              <li>· Select local opportunities</li>
              <li>· Structures matched to risk preference</li>
              <li>· Hands-on execution track record since {company.founded}</li>
            </ul>
            <span className="mt-6 text-sm font-semibold text-gold-deep">
              Explore investor overview →
            </span>
          </Link>
        </div>
      </section>

      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Related tools
              </p>
              <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
                Share planning tools with clients
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Cost Studio, land evaluation, and rebuild assessment help clients self-educate before
                a listing appointment or capital conversation.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary min-h-11">
                Cost Studio
              </Link>
              <Link href="/land/evaluation" className="btn btn-secondary min-h-11">
                Lot evaluation
              </Link>
              <Link href="/calculators" className="btn btn-primary min-h-11">
                All calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LocationsStrip
        compact
        heading="Markets we know with partners"
        body="Share town guides when clients are choosing between streets — or when land listings need a credible builder story."
      />

      <CtaBanner title="Start a partnership conversation" />
    </>
  );
}
