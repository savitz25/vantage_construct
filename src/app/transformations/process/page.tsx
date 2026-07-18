import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Existing Home Transformation Process",
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
        eyebrow="Existing homes"
        title="A clear path to transforming your home"
        description="Whether you need an addition, full renovation, finished basement, attic conversion, or outdoor living upgrade — our process keeps communication open and surprises rare."
      />
      <section className="section pt-0">
        <div className="container-v space-y-4">
          {steps.map((step, i) => (
            <div key={step.title} className="card flex gap-5 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong font-display text-xl text-gold">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-2xl text-ivory">{step.title}</h2>
                <p className="mt-2 text-text-muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
