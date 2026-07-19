import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { IntentSelector } from "@/components/IntentSelector";
import { JsonLd } from "@/components/JsonLd";
import { PlanCard } from "@/components/PlanCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { company } from "@/lib/company";
import {
  customHomeServices,
  landDevelopments,
  transformationServices,
} from "@/lib/content";
import { plans } from "@/lib/plans";
import { howToJsonLd } from "@/lib/seo";

export default function HomePage() {
  const featuredPlans = plans.filter((p) =>
    ["cypress-hollow-farmhouse", "emerald-cottage", "grand-alpine", "cozy-craftsman-cottage"].includes(
      p.slug,
    ),
  );

  return (
    <>
      <JsonLd data={howToJsonLd()} />

      <section className="hero-grid grain relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
        <div className="container-wide relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="eyebrow">Luxury custom homes · Central & Northern NJ</p>
              <h1 className="mt-5 font-display text-5xl text-ivory sm:text-6xl lg:text-7xl">
                Bringing your dream home to life — with no surprises
              </h1>
              <p className="mt-6 max-w-xl text-lg text-text-muted">
                {company.description} Led hands-on by Master Builder {company.founder} since{" "}
                {company.founded}.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/design-studio" className="btn btn-primary">
                  Design Your Vantage Vision
                </Link>
                <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary">
                  Cost calculator
                </Link>
                <Link href="/available-homes" className="btn btn-secondary">
                  Explore available designs
                </Link>
              </div>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { label: "Years of craft", value: "35+" },
                  { label: "Founded", value: "1990" },
                  { label: "Focus towns", value: "4+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs uppercase tracking-[0.16em] text-text-dim">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-display text-3xl text-gold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card relative overflow-hidden p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,160,78,0.16),transparent_50%)]" />
              <div className="relative">
                <p className="text-sm uppercase tracking-[0.2em] text-gold-deep">The Vantage Difference</p>
                <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                  Homes that still delight clients 15+ years later
                </h2>
                <ul className="mt-6 space-y-4">
                  {company.differentiators.slice(0, 4).map((item) => (
                    <li key={item.title} className="border-l border-gold/50 pl-4">
                      <p className="font-medium text-ivory">{item.title}</p>
                      <p className="mt-1 text-sm text-text-muted">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <p className="text-center text-sm uppercase tracking-[0.2em] text-text-dim">
            Proudly serving {company.focusTowns.join(" · ")} · {company.counties.join(", ")} Counties
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container-wide grid gap-4 lg:grid-cols-2">
          <Link
            href="/design-studio"
            className="card card-hover relative block overflow-hidden p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(201,160,78,0.16),transparent_50%)]" />
            <div className="relative">
              <p className="eyebrow">Flagship experience</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                Design Your Vantage Vision
              </h2>
              <p className="mt-4 text-text-muted">
                Interactive design studio — size, style, finishes, lifestyle — ending in a Vision
                Summary for a no-surprises consultation.
              </p>
              <span className="btn btn-primary mt-6">Open Design Studio →</span>
            </div>
          </Link>
          <Link
            href="/cost-to-build-a-house-nj#calculator"
            className="card card-hover relative block overflow-hidden p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(107,143,154,0.18),transparent_50%)]" />
            <div className="relative">
              <p className="eyebrow">Cost on steroids</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                Vision Cost Studio
              </h2>
              <p className="mt-4 text-text-muted">
                Live North Jersey construction ranges with an interactive house model — free instant
                estimate, detailed breakdown when you&apos;re ready.
              </p>
              <span className="btn btn-primary mt-6">Open cost calculator →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
              What brings you to Vantage?
            </h2>
            <p className="mt-4 text-text-muted">
              Choose your path — we&apos;ll guide you with clear process, transparent pricing
              conversations, and hands-on leadership from Victor.
            </p>
          </div>
          <IntentSelector />
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Available designs</p>
              <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
                Interactive plan explorer
              </h2>
              <p className="mt-4 text-text-muted">
                Fully customizable plans with transparent base pricing. Land, sitework, permits, and
                utilities are separate — we&apos;ll estimate for your lot.
              </p>
            </div>
            <Link href="/available-homes" className="btn btn-secondary">
              View all {plans.length} plans
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredPlans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Proven process</p>
            <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
              Your 7-step expert-guided journey
            </h2>
            <p className="mt-4 text-text-muted">
              Clear guidance from first meeting to collaborative celebration — designed so building
              feels exciting, organized, and free of surprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/custom-homes/process" className="btn btn-primary">
                New home process
              </Link>
              <Link href="/transformations/process" className="btn btn-secondary">
                Existing home process
              </Link>
            </div>
          </div>
          <ProcessTimeline compact />
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">New construction</p>
              <h2 className="mt-3 font-display text-4xl text-ivory">Custom home possibilities</h2>
              <div className="mt-6 grid gap-4">
                {customHomeServices.map((s) => (
                  <Link key={s.href} href={s.href} className="card card-hover p-5">
                    <h3 className="font-display text-2xl text-ivory">{s.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{s.body}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Existing homes</p>
              <h2 className="mt-3 font-display text-4xl text-ivory">Transformations</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {transformationServices.map((s) => (
                  <Link key={s.href + s.title} href={s.href} className="card card-hover p-5">
                    <h3 className="font-display text-xl text-ivory">{s.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{s.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-wide grid gap-10 lg:grid-cols-3">
          <div className="card p-8 lg:col-span-1">
            <p className="eyebrow">Master builder</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Meet Victor Lobozzo</h2>
            <p className="mt-4 text-sm text-text-muted line-clamp-6">{company.founderBio}</p>
            <Link href="/about" className="btn btn-ghost mt-6 px-0">
              Our story →
            </Link>
          </div>
          <div className="card p-8">
            <p className="eyebrow">Land & development</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Unlock your land&apos;s potential</h2>
            <p className="mt-4 text-sm text-text-muted">
              Single-lot maximization, multi-lot subdivisions, and best-use analysis — including
              projects like {landDevelopments.join(", ")}.
            </p>
            <Link href="/land" className="btn btn-secondary mt-6">
              Explore land services
            </Link>
          </div>
          <div className="card p-8">
            <p className="eyebrow">Partners</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Realtors & investors</h2>
            <p className="mt-4 text-sm text-text-muted">
              Triple commission potential on land-to-home packages. Investor structures spanning
              loan, equity, and hybrid models.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/partners/realtors" className="btn btn-secondary">
                Realtors
              </Link>
              <Link href="/partners/investors" className="btn btn-secondary">
                Investors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
