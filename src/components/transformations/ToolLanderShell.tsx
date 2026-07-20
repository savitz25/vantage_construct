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

      <section className="hero-grid grain border-b border-border pt-[4.75rem] pb-6 sm:pt-24 sm:pb-10">
        <div className="container-wide relative">
          <Breadcrumbs
            items={breadcrumbs.map((b, i) =>
              i === breadcrumbs.length - 1 && !b.href
                ? { ...b, path: path }
                : b,
            )}
            variant="inline"
            className="mb-4 sm:mb-5"
          />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
            <div className="max-w-2xl">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-2 font-display text-[1.85rem] leading-tight text-ivory sm:mt-3 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-2 text-base text-text-muted sm:mt-3 sm:text-lg">{description}</p>
              {disclaimer ? (
                <p className="mt-2 text-xs text-text-dim sm:mt-3">*{disclaimer}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-end">
              <a href="#tool" className="btn btn-primary min-h-12 w-full sm:w-auto">
                Start calculator
              </a>
              <Link href={serviceHref} className="btn btn-secondary min-h-12 w-full sm:w-auto">
                {serviceCtaLabel}
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
          <div className="mt-8 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <Link href="/start" className="btn btn-primary min-h-12">
              Start my project
            </Link>
            <Link href={serviceHref} className="btn btn-secondary min-h-12">
              {serviceCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
