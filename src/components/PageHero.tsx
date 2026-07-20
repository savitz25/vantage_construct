import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  crumbs,
  /** Tighter tool-style hero (used by some landers) */
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Integrated breadcrumb trail above the eyebrow / H1 */
  crumbs?: Crumb[];
  compact?: boolean;
}) {
  return (
    <section
      className={`hero-grid grain ${
        compact
          ? "border-b border-border pt-[5.25rem] pb-8 sm:pt-24 sm:pb-10"
          : "pt-[5.25rem] pb-12 sm:pt-24 sm:pb-14 lg:pb-16"
      }`}
    >
      <div className={`relative ${compact ? "container-wide" : "container-v"}`}>
        {crumbs?.length ? (
          <Breadcrumbs items={crumbs} variant="inline" className="mb-5 sm:mb-6" />
        ) : null}

        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1
          className={`max-w-4xl font-display text-ivory ${
            eyebrow ? "mt-3" : crumbs?.length ? "mt-1" : "mt-0"
          } ${
            compact
              ? "text-4xl sm:text-5xl"
              : "text-4xl sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]"
          }`}
        >
          {title}
        </h1>
        {description ? (
          <p className={`max-w-2xl text-text-muted ${compact ? "mt-3 text-base sm:text-lg" : "mt-4 text-lg"}`}>
            {description}
          </p>
        ) : null}
        {children ? <div className={compact ? "mt-6" : "mt-7"}>{children}</div> : null}
      </div>
    </section>
  );
}
