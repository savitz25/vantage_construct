import Link from "next/link";
import { CommissionCalculator } from "@/components/realtors/CommissionCalculator";
import { QualifyListing } from "@/components/realtors/QualifyListing";
import { RealtorPartnerForm } from "@/components/realtors/RealtorPartnerForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import {
  doubleDipPoints,
  kitBenefits,
  realtorTermsNote,
  reputationPoints,
  vipTiers,
} from "@/lib/realtors/content";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Realtor Partner Program | Double-Dip Commissions North Jersey",
  description:
    "Join the Vantage Preferred Partner Program. Interactive commission calculator, double-dip land + build fees, payment at framing, co-branded marketing kits, and a purpose-built agent form.",
  path: "/partners/realtors",
});

export default function RealtorsPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />

      <PageHero
        eyebrow="For realtors · Preferred Partner Program"
        title="Win more listings. Triple the commission path. Look like a hero."
        description="Convert land and tear-down listings into custom home packages — or refer buyers who want new construction. Vantage handles design, permits, and build. You get paid faster and protect your reputation."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#commission-calculator" className="btn btn-primary">
            Calculate your commission potential
          </a>
          <a href="#realtor-form" className="btn btn-secondary">
            Join the partner network
          </a>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-text-dim">*{realtorTermsNote}</p>
      </PageHero>

      <CommissionCalculator />

      {/* Double dip */}
      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">The double dip</p>
            <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
              Two paydays. One relationship.
            </h2>
            <p className="mt-4 text-text-muted">
              Land commission when the lot closes. Package / build fee when construction begins.
              We manage everything after the introduction.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {doubleDipPoints.map((item, i) => (
              <article key={item.title} className="card p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong font-display text-lg text-gold-deep">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="card mt-8 border-gold/30 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ivory">Payment timing agents love</h3>
            <p className="mt-3 text-text-muted">
              Land commission at closing. Build commission at framing — not Certificate of
              Occupancy. That’s real cash-flow speed versus waiting for CO on a long custom build.
            </p>
            <p className="mt-3 text-xs text-text-dim">*{realtorTermsNote}</p>
          </div>
        </div>
      </section>

      {/* Reputation */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Reputation protection</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              We make you look good — with zero friction
            </h2>
            <p className="mt-4 text-text-muted">
              Agents fear referring a bad builder more than they fear missing a fee. Here’s how we
              protect the relationship you worked hard to earn.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reputationPoints.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing kit */}
      <section className="section bg-bg-elevated">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Win the listing appointment</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Co-branded “to-be-built” marketing kit
            </h2>
            <p className="mt-4 text-text-muted">
              Walk into a land listing appointment with two stories: sell as-is, or market as a
              custom home package with luxury-builder credibility. That’s ammunition, not just
              incentive.
            </p>
            <ul className="mt-6 space-y-3">
              {kitBenefits.map((b) => (
                <li key={b} className="flex gap-2 text-text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <a href="#realtor-form" className="btn btn-primary mt-8">
              Request kit for a listing
            </a>
          </div>
          <div className="card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
              Agent pitch line
            </p>
            <blockquote className="mt-4 font-display text-2xl leading-snug text-ivory sm:text-3xl">
              “I can market your land two ways — as-is, or as a to-be-built package with a 35-year
              luxury builder, which often sells faster and stronger.”
            </blockquote>
            <p className="mt-6 text-sm text-text-dim">
              Vantage produces concept direction and package flyer support after we partner on a
              qualifying listing.
            </p>
          </div>
        </div>
      </section>

      {/* VIP tiers */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">VIP partner framing</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Grow with us — preferred, gold, platinum
            </h2>
            <p className="mt-4 text-text-muted">
              Simple recognition that rewards repeat collaboration. Exact benefits can be refined
              with Victor; the structure signals exclusivity from day one.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {vipTiers.map((tier) => (
              <article key={tier.name} className="card p-7">
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">{tier.when}</p>
                <h3 className="mt-2 font-display text-3xl text-ivory">{tier.name}</h3>
                <ul className="mt-5 space-y-2">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <QualifyListing />

      {/* Form */}
      <section className="section bg-bg-elevated">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Join the network</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Submit a listing or buyer referral
            </h2>
            <p className="mt-4 text-text-muted">
              Purpose-built for agents — name, brokerage, towns, MLS, and opportunity type. Tagged
              as a <strong className="text-ivory">Realtor Lead</strong> (separate from homeowner and
              investor pipelines).
            </p>
            <ul className="mt-6 space-y-2 text-sm text-text-muted">
              <li>· Land listing packages</li>
              <li>· Buyer referrals for custom / rebuild</li>
              <li>· Marketing kit requests</li>
            </ul>
            <p className="mt-6 text-sm text-text-dim">
              Questions? Call{" "}
              <a className="text-gold-deep" href={`tel:${company.phoneTel}`}>
                {company.phone}
              </a>
            </p>
            <Link href="/partners/investors" className="btn btn-ghost mt-4 px-0">
              Looking for capital partnerships instead? →
            </Link>
          </div>
          <RealtorPartnerForm />
        </div>
      </section>

      <section className="section-sm border-t border-border">
        <div className="container-v text-center">
          <p className="text-xs leading-relaxed text-text-dim">*{realtorTermsNote}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#commission-calculator" className="btn btn-secondary">
              Recalculate commissions
            </a>
            <Link href="/available-homes" className="btn btn-secondary">
              Shareable plan catalog
            </Link>
            <Link href="/start" className="btn btn-primary">
              Talk to Victor’s team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
