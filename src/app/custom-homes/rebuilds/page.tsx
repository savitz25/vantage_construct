import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BeforeAfterCompare } from "@/components/rebuilds/BeforeAfterSlider";
import { RebuildFeasibilityForm } from "@/components/rebuilds/RebuildFeasibilityForm";
import { RebuildTimeline } from "@/components/rebuilds/RebuildTimeline";
import { RenovateVsRebuildQuiz } from "@/components/rebuilds/RenovateVsRebuildQuiz";
import { company } from "@/lib/company";
import {
  costDrivers,
  rebuildCaseStudy,
  rebuildFaqs,
  rebuildProofTowns,
  transformationPairs,
} from "@/lib/rebuilds/content";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Knockdown Rebuild NJ | Teardown & Custom Home Rebuild",
  description:
    "Should you renovate or rebuild on your North Jersey lot? Interactive assessment, before/after lot transformations, honest tax & timeline guidance, and rebuild feasibility from Vantage Construction.",
  path: "/custom-homes/rebuilds",
});

export default function RebuildsPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(rebuildFaqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: "Knockdown Rebuild & Custom Home Teardown Construction",
          description:
            "Full-service knockdown and rebuild of luxury custom homes on existing lots across Central & Northern New Jersey.",
          path: "/custom-homes/rebuilds",
          serviceType: "Knockdown rebuild / custom home reconstruction",
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Custom Homes", href: "/custom-homes" },
          { label: "Knockdowns & Rebuilds" },
        ]}
      />

      <PageHero
        eyebrow="Knockdowns & rebuilds · North Jersey"
        title="Build your dream home on the street you already love"
        description="Tearing down a house feels destructive — until the math, the lot, and the life you want make it the clearest path forward. Vantage replaces anxiety with feasibility, timeline clarity, and a No Surprises rebuild process."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#assessment" className="btn btn-primary">
            Take the renovate vs rebuild assessment
          </a>
          <a href="#transformations" className="btn btn-secondary">
            View before & after
          </a>
        </div>
      </PageHero>

      {/* Why rebuild — short empathy */}
      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Keep the neighborhood",
              b: "Schools, friends, commute, trees — the hard things to replace. Rebuild the house, not your life.",
            },
            {
              t: "Stop fighting the bones",
              b: "Low ceilings, chopped layouts, and 40-year systems make “perfect renovations” cost more than they look.",
            },
            {
              t: "Honest either way",
              b: "Sometimes major renovation wins. We build both paths — so the recommendation can be real.",
            },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h2 className="font-display text-2xl text-ivory">{x.t}</h2>
              <p className="mt-2 text-sm text-text-muted">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz — centerpiece */}
      <section className="section">
        <div className="container-wide">
          <RenovateVsRebuildQuiz />
          <p className="mt-6 text-center text-sm text-text-dim">
            Still deciding whether to stay at all?{" "}
            <Link href="/move-or-improve-calculator-nj" className="text-gold underline-offset-2 hover:underline">
              Move or Improve calculator
            </Link>{" "}
            compares selling costs vs improving in place.
          </p>
        </div>
      </section>

      {/* Before / after */}
      <section id="transformations" className="section scroll-mt-28 border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Lot transformations</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Drag to see what the same lot can become
            </h2>
            <p className="mt-4 text-text-muted">
              No project type is more dramatic than a knockdown. Slide between the house that no
              longer fits and the architecture the lot was waiting for.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {transformationPairs.map((pair) => (
              <BeforeAfterCompare key={pair.id} pair={pair} />
            ))}
          </div>
        </div>
      </section>

      {/* Cost drivers + Cost Studio */}
      <section className="section">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="eyebrow">Investment clarity</p>
              <h2 className="mt-3 font-display text-4xl text-ivory">
                What drives rebuild cost?
              </h2>
              <p className="mt-4 max-w-xl text-text-muted">
                When renovation quotes climb toward 50–60% of rebuild cost for a compromised result,
                starting fresh often wins on value. Here is what actually moves the number.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {costDrivers.map((d) => (
                  <div key={d.title} className="card p-5">
                    <h3 className="font-display text-xl text-ivory">{d.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card border-gold/30 bg-gold/5 p-7">
              <h3 className="font-display text-3xl text-ivory">Get a live construction range</h3>
              <p className="mt-3 text-sm text-text-muted">
                Our Cost Studio is calibrated to real Vantage plan anchors (~$241–$348/sq ft base
                construction) and includes a knockdown path for rebuild complexity.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-text-muted">
                <li>· Size, finish tier, basement, garage, lifestyle packages</li>
                <li>· Land & sitework excluded and clearly stated</li>
                <li>· Built for Warren, Basking Ridge, Watchung & North Jersey</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/cost-to-build-a-house-nj" className="btn btn-primary">
                  Open Cost Studio
                </Link>
                <a href="#feasibility" className="btn btn-secondary">
                  Personalized rebuild range
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Demystify the timeline</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              How a Vantage rebuild actually unfolds
            </h2>
            <p className="mt-4 text-text-muted">
              Typical door-to-door: about 12–18 months. Click each phase — duration, what happens on
              site, and what you experience as the homeowner.
            </p>
          </div>
          <div className="mt-10 max-w-3xl">
            <RebuildTimeline />
          </div>
          <div className="mt-8">
            <Link href="/custom-homes/process" className="btn btn-secondary">
              Full 7-step custom home process
            </Link>
          </div>
        </div>
      </section>

      {/* Honesty: taxes + living */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">The questions most builders dodge</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">Radical honesty</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-7 sm:p-8">
              <h3 className="font-display text-3xl text-ivory">Property taxes & reassessment</h3>
              <div className="mt-4 space-y-3 text-text-muted">
                <p>
                  Every New Jersey homeowner considering a rebuild is quietly terrified their taxes
                  will explode. We will not pretend that is irrational.
                </p>
                <p>
                  Significant improvements and new construction can trigger reassessment. The impact
                  depends on your town, current assessment, and how the new home is valued —
                  not a single statewide scare story.
                </p>
                <p>
                  Part of a real feasibility conversation is walking the realistic picture for{" "}
                  <strong className="text-ivory">your</strong> municipality — not selling past the
                  fear.
                </p>
              </div>
            </div>
            <div className="card p-7 sm:p-8">
              <h3 className="font-display text-3xl text-ivory">Where will we live?</h3>
              <div className="mt-4 space-y-3 text-text-muted">
                <p>
                  You cannot live in a house that is gone. Plan on temporary housing for most of the
                  12–18 month journey — rent nearby, family, or a short-term lease timed to demo and
                  C.O.
                </p>
                <p>
                  Families who feel calm about rebuilds are the ones who mapped housing early, not
                  the ones who hoped the schedule would magically shrink.
                </p>
                <p>
                  We help sequence the calendar so you know when keys leave, when the lot is active,
                  and when you come home to the street you never wanted to leave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof by town */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Local proof</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">Rebuilds near you</h2>
            <p className="mt-4 text-text-muted">
              You have likely driven past custom work without knowing the builder. {company.name}{" "}
              serves {company.focusTowns.join(", ")}, and surrounding communities across{" "}
              {company.counties.join(", ")} counties — with deep roots in Warren Township.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rebuildProofTowns.map((t) => (
              <Link key={t.town} href={t.href} className="card card-hover p-6">
                <h3 className="font-display text-2xl text-ivory">{t.town}</h3>
                <p className="mt-2 text-sm text-text-muted">{t.note}</p>
                <span className="mt-4 inline-block text-sm text-gold">Town guide →</span>
              </Link>
            ))}
            <Link href="/land/evaluation" className="card card-hover border-gold/40 p-6">
              <h3 className="font-display text-2xl text-ivory">Start with the lot</h3>
              <p className="mt-2 text-sm text-text-muted">
                Land Evaluation is step one of every serious rebuild — setbacks, grading, legal
                footprint.
              </p>
              <span className="mt-4 inline-block text-sm text-gold">Land evaluation →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Case study narrative */}
      <section className="section">
        <div className="container-v">
          <p className="eyebrow">One family&apos;s story</p>
          <h2 className="mt-3 font-display text-4xl text-ivory">{rebuildCaseStudy.title}</h2>
          <p className="mt-2 text-sm text-gold">{rebuildCaseStudy.town}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {rebuildCaseStudy.metrics.map((m) => (
              <div key={m.label} className="card p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-text-dim">{m.label}</p>
                <p className="mt-2 font-display text-2xl text-ivory">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="prose-v mt-8 max-w-3xl space-y-4 text-text-muted">
            {rebuildCaseStudy.story.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-text-dim">Before</p>
              <p className="mt-2 text-sm text-text-muted">{rebuildCaseStudy.original}</p>
            </div>
            <div className="card border-gold/40 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-gold">After</p>
              <p className="mt-2 text-sm text-text-muted">{rebuildCaseStudy.result}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Knockdown & rebuild FAQs</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Cost, taxes, timelines, living arrangements, foundations, and permits — answered
            straight.
          </p>
          <div className="mt-8 space-y-4">
            {rebuildFaqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-xl text-ivory sm:text-2xl">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="section">
        <div className="container-v max-w-3xl">
          <RebuildFeasibilityForm />
        </div>
      </section>

      {/* Related links */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Continue exploring</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/land/evaluation", label: "Land evaluation", note: "Lot capacity first" },
              { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "Build cost ranges" },
              { href: "/design-studio", label: "Design Studio", note: "Style & vision" },
              { href: "/transformations", label: "Transformations", note: "If renovate wins" },
              { href: "/move-or-improve-calculator-nj", label: "Move or Improve", note: "Stay vs sell" },
              { href: "/custom-homes", label: "Custom homes", note: "New construction" },
              { href: "/custom-homes/process", label: "7-step process", note: "How we build" },
              { href: "/start", label: "Schedule consult", note: "Talk with the team" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-5">
                <span className="font-display text-xl text-ivory">{l.label}</span>
                <p className="mt-1 text-xs text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
