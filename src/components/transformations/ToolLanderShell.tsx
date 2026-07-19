import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TrackToolLanderView } from "@/components/TrackPageEvent";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export type ToolLanderEducation = {
  title: string;
  body: string;
};

type Props = {
  toolId: string;
  path: string;
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  disclaimer?: string;
  /** Primary service page for “Learn how we build…” */
  serviceHref: string;
  serviceCtaLabel: string;
  secondaryLinks?: { href: string; label: string }[];
  educationHeading: string;
  educationIntro: string;
  education: ToolLanderEducation[];
  faqs: { q: string; a: string }[] | readonly { q: string; a: string }[];
  faqHeading?: string;
  consultHeading: string;
  consultBody: string;
  children: React.ReactNode;
};

/**
 * Shared tool-lander layout: compact hero → interactive tool → education → FAQs → consult.
 */
export function ToolLanderShell({
  toolId,
  path,
  breadcrumbs,
  eyebrow,
  title,
  description,
  disclaimer,
  serviceHref,
  serviceCtaLabel,
  secondaryLinks = [],
  educationHeading,
  educationIntro,
  education,
  faqs,
  faqHeading = "FAQs",
  consultHeading,
  consultBody,
  children,
}: Props) {
  return (
    <>
      <TrackToolLanderView tool={toolId} path={path} />
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd([...faqs])} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="hero-grid grain border-b border-border pt-28 pb-8 sm:pt-32 sm:pb-10">
        <div className="container-wide relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">{title}</h1>
              <p className="mt-3 text-lg text-text-muted">{description}</p>
              {disclaimer ? (
                <p className="mt-3 text-xs text-text-dim">*{disclaimer}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={serviceHref} className="btn btn-secondary">
                {serviceCtaLabel}
              </Link>
              <Link href="/start" className="btn btn-primary">
                Schedule a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {children}

      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Beyond the calculator</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">{educationHeading}</h2>
            <p className="mt-4 text-text-muted">{educationIntro}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {education.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={serviceHref} className="btn btn-primary">
              {serviceCtaLabel}
            </Link>
            {secondaryLinks.map((l) => (
              <Link key={l.href} href={l.href} className="btn btn-secondary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">{faqHeading}</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{f.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-v text-center">
          <h2 className="font-display text-4xl text-ivory">{consultHeading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">{consultBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start" className="btn btn-primary">
              Schedule a consultation
            </Link>
            <Link href={serviceHref} className="btn btn-secondary">
              {serviceCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
