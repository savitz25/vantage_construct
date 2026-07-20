import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { transformServices, transformTools } from "@/lib/transformations/ia";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Existing Home Transformation Process | Vantage",
  description:
    "How Vantage Construction renovates and customizes existing homes in New Jersey — clear phases, communication, and no surprises.",
  path: "/transformations/process",
});

const steps = [
  {
    title: "Discovery & vision",
    body: "Walk your home, understand lifestyle needs, and define the transformation goals and ballpark investment.",
  },
  {
    title: "Design & scope",
    body: "Develop a clear scope, selections direction, and feasibility so expectations are aligned before construction.",
  },
  {
    title: "Agreement & planning",
    body: "Detailed pricing, timeline, and milestones — with transparency on how living through construction will work.",
  },
  {
    title: "Permits & build",
    body: "We coordinate approvals, manage trades, minimize disruption where possible, and keep you informed throughout.",
  },
  {
    title: "Finish & celebrate",
    body: "Walkthroughs, punch lists, and a polished handoff so you can enjoy the renewed space with confidence.",
  },
];

export default function ExistingProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Transformations", href: "/transformations" },
          { label: "Renovation Process", path: "/transformations/process" },
        ]}
        eyebrow="Existing homes"
        title="A clear path to transforming your home"
        description="Whether you’re finishing a lower level, adding a suite, or reimagining a kitchen — the same no-surprises process applies: discovery, design clarity, permits, build, and a polished handoff."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/start" className="btn btn-primary">
            Schedule a consultation
          </Link>
          <Link href="/transformations" className="btn btn-secondary">
            All transformations
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-v">
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={step.title} className="card flex gap-5 p-6 sm:p-8">
                <span className="font-display text-3xl text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-display text-2xl text-ivory">{step.title}</h2>
                  <p className="mt-2 text-text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Start with a service or a tool</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {transformServices.slice(0, 3).map((s) => (
              <Link key={s.href} href={s.href} className="card card-hover p-6">
                <h3 className="font-display text-xl text-ivory">{s.label}</h3>
                <p className="mt-2 text-sm text-text-muted line-clamp-2">{s.body}</p>
              </Link>
            ))}
            {transformTools.map((t) => (
              <Link key={t.href} href={t.href} className="card card-hover p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">Tool</p>
                <h3 className="mt-1 font-display text-xl text-ivory">{t.label}</h3>
                <p className="mt-2 text-sm text-text-muted line-clamp-2">{t.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
