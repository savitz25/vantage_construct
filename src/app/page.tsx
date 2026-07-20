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

      {/* Condensed mobile hero — path selector is the real first decision */}
      <section className="hero-grid grain relative overflow-hidden pt-[4.75rem] pb-8 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24">
        <div className="container-wide relative">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <p className="eyebrow">Luxury custom homes · Central & Northern NJ</p>
              <h1 className="mt-3 font-display text-[2.15rem] leading-[1.12] text-ivory sm:mt-5 sm:text-6xl lg:text-7xl">
                Bringing your dream home to life — with no surprises
              </h1>
              <p className="mt-3 max-w-xl text-base text-text-muted sm:mt-6 sm:text-lg">
                {company.description} Led hands-on by Master Builder {company.founder} since{" "}
                {company.founded}.
              </p>

              {/* Mobile: three primary actions only; desktop keeps full set */}
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link href="/cost-to-build-a-house-nj" className="btn btn-primary min-h-12 w-full sm:w-auto">
                  Open Cost Studio
                </Link>
                <Link href="/design-studio" className="btn btn-secondary min-h-12 w-full sm:w-auto">
                  Design my home
                </Link>
                <Link
                  href="/available-homes"
                  className="btn btn-secondary min-h-12 w-full sm:w-auto"
                >
                  See available homes
                </Link>
              </div>

              <dl className="mt-6 grid max-w-xl grid-cols-3 gap-3 border-t border-border pt-5 sm:mt-10 sm:gap-4 sm:pt-8">
                {[
                  { label: "Years of craft", value: "35+" },
                  { label: "Founded", value: "1990" },
                  { label: "Focus towns", value: "4+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-text-dim sm:text-xs sm:tracking-[0.16em]">
                      {stat.label}
                    </dt>
                    <dd className="mt-0.5 font-display text-2xl text-gold sm:mt-1 sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Desktop-only brand card — frees first screen on mobile */}
            <div className="card relative hidden overflow-hidden p-8 lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,160,78,0.16),transparent_50%)]" />
              <div className="relative">
                <p className="text-sm uppercase tracking-[0.2em] text-gold-deep">
                  The Vantage Difference
                </p>
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

      {/* Path selector — first decision surface; elevated on mobile */}
      <section
        id="start-here"
        className="border-y border-border bg-bg-elevated py-8 sm:section-sm sm:py-14"
      >
        <div className="container-wide">
          <div className="mb-5 max-w-2xl sm:mb-10">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:mt-3 sm:text-4xl lg:text-5xl">
              What brings you to Vantage?
            </h2>
            <p className="mt-2 text-sm text-text-muted sm:mt-4 sm:text-base">
              Tap a path — we&apos;ll guide you with clear process, transparent ranges, and
              hands-on leadership from Victor.
            </p>
          </div>
          <IntentSelector />
        </div>
      </section>

      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <p className="text-center text-xs uppercase tracking-[0.16em] text-text-dim sm:text-sm sm:tracking-[0.2em]">
            Proudly serving {company.focusTowns.join(" · ")} · {company.counties.join(", ")}{" "}
            Counties
          </p>
        </div>
      </section>

      {/* Flagship tools — outcome-focused CTAs */}
      <section className="section-sm">
        <div className="container-wide grid gap-4 lg:grid-cols-2">
          <Link
            href="/design-studio"
            className="card card-hover relative block overflow-hidden p-6 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(201,160,78,0.16),transparent_50%)]" />
            <div className="relative">
              <p className="eyebrow">Flagship experience</p>
              <h2 className="mt-2 font-display text-2xl text-ivory sm:mt-3 sm:text-4xl">
                Design Your Vantage Vision
              </h2>
              <p className="mt-3 text-sm text-text-muted sm:mt-4 sm:text-base">
                Interactive design studio — size, style, finishes, lifestyle — ending in a Vision
                Summary for a no-surprises consultation.
              </p>
              <span className="btn btn-primary mt-5 min-h-12 sm:mt-6">Open Design Studio →</span>
            </div>
          </Link>
          <Link
            href="/cost-to-build-a-house-nj#calculator"
            className="card card-hover relative block overflow-hidden p-6 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(107,143,154,0.18),transparent_50%)]" />
            <div className="relative">
              <p className="eyebrow">Cost clarity</p>
              <h2 className="mt-2 font-display text-2xl text-ivory sm:mt-3 sm:text-4xl">
                Vision Cost Studio
              </h2>
              <p className="mt-3 text-sm text-text-muted sm:mt-4 sm:text-base">
                Live North Jersey construction ranges with an interactive house model — free
                instant estimate, detailed breakdown when you&apos;re ready.
              </p>
              <span className="btn btn-primary mt-5 min-h-12 sm:mt-6">Open Cost Studio →</span>
            </div>
          </Link>
          <Link
            href="/move-or-improve-calculator-nj"
            className="card card-hover relative block overflow-hidden p-6 sm:p-10 lg:col-span-2"
          >
            <div className="relative md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <p className="eyebrow">Transformations</p>
                <h2 className="mt-2 font-display text-2xl text-ivory sm:mt-3 sm:text-4xl">
                  Move or improve?
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-text-muted sm:mt-4 sm:text-base">
                  Compare true NJ selling costs vs the addition that solves the same problem —
                  plus ADU payback and basement tools in Vantage Studios.
                </p>
              </div>
              <span className="btn btn-primary mt-5 min-h-12 md:mt-0">Compare my options →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="mb-6 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Available designs</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:mt-3 sm:text-4xl lg:text-5xl">
                Interactive plan explorer
              </h2>
              <p className="mt-3 text-sm text-text-muted sm:mt-4 sm:text-base">
                Fully customizable plans with transparent base pricing. Land, sitework, permits,
                and utilities are separate — we&apos;ll estimate for your lot.
              </p>
            </div>
            <Link href="/available-homes" className="btn btn-secondary min-h-12 w-full sm:w-auto">
              See all {plans.length} designs
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredPlans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="eyebrow">Proven process</p>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:mt-3 sm:text-4xl lg:text-5xl">
              Your 7-step expert-guided journey
            </h2>
            <p className="mt-3 text-sm text-text-muted sm:mt-4 sm:text-base">
              Clear guidance from first meeting to collaborative celebration — designed so
              building feels exciting, organized, and free of surprises.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link href="/custom-homes/process" className="btn btn-primary min-h-12">
                New home process
              </Link>
              <Link href="/transformations/process" className="btn btn-secondary min-h-12">
                Existing home process
              </Link>
            </div>
          </div>
          {/* compact = closed by default → scannable on mobile */}
          <ProcessTimeline compact />
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">New construction</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:mt-3 sm:text-4xl">
                Custom home possibilities
              </h2>
              <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
                {customHomeServices.map((s) => (
                  <Link key={s.href} href={s.href} className="card card-hover p-5 min-h-[4.5rem]">
                    <h3 className="font-display text-xl text-ivory sm:text-2xl">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-text-muted">{s.body}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Existing homes</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:mt-3 sm:text-4xl">
                Transformations
              </h2>
              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {transformationServices.map((s) => (
                  <Link
                    key={s.href + s.title}
                    href={s.href}
                    className="card card-hover p-5 min-h-[4.5rem]"
                  >
                    <h3 className="font-display text-xl text-ivory">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-text-muted">{s.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-bg-elevated !pt-0 sm:!pt-0">
        <div className="container-wide grid gap-4 sm:gap-6 lg:grid-cols-3">
          <div className="card p-6 sm:p-8 lg:col-span-1">
            <p className="eyebrow">Master builder</p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:mt-3 sm:text-3xl">
              Meet Victor Lobozzo
            </h2>
            <p className="mt-3 line-clamp-5 text-sm text-text-muted sm:mt-4 sm:line-clamp-6">
              {company.founderBio}
            </p>
            <Link href="/about" className="btn btn-ghost mt-5 min-h-11 px-0 sm:mt-6">
              Our story →
            </Link>
          </div>
          <div className="card p-6 sm:p-8">
            <p className="eyebrow">Land & development</p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:mt-3 sm:text-3xl">
              Unlock your land&apos;s potential
            </h2>
            <p className="mt-3 text-sm text-text-muted sm:mt-4">
              Single-lot maximization, multi-lot subdivisions, and best-use analysis — including
              projects like {landDevelopments.join(", ")}.
            </p>
            <Link href="/land" className="btn btn-secondary mt-5 min-h-12 sm:mt-6">
              Evaluate land services
            </Link>
          </div>
          <div className="card p-6 sm:p-8">
            <p className="eyebrow">Partners</p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:mt-3 sm:text-3xl">
              Realtors & investors
            </h2>
            <p className="mt-3 text-sm text-text-muted sm:mt-4">
              Triple commission potential on land-to-home packages. Investor structures spanning
              loan, equity, and hybrid models.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link href="/partners/realtors" className="btn btn-secondary min-h-12">
                For realtors
              </Link>
              <Link href="/partners/investors" className="btn btn-secondary min-h-12">
                For investors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
