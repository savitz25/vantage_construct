import Link from "next/link";

export type PathwayLink = {
  href: string;
  label: string;
  note: string;
};

const DEFAULT_PATHWAYS: PathwayLink[] = [
  {
    href: "/cost-to-build-a-house-nj",
    label: "Open Cost Studio",
    note: "Directional construction ranges for North Jersey",
  },
  {
    href: "/land/evaluation",
    label: "Evaluate my lot",
    note: "Buildability before you fall in love with a listing",
  },
  {
    href: "/custom-homes/rebuilds",
    label: "Renovate vs rebuild",
    note: "Assessment when the street is right but the house is not",
  },
  {
    href: "/studios",
    label: "Browse Studios",
    note: "Kitchens, basements, garages, outdoor living & more",
  },
  {
    href: "/calculators",
    label: "All calculators",
    note: "Move or improve, ADU payback, multi-lot HBU",
  },
  {
    href: "/start",
    label: "Start a conversation",
    note: "Complimentary consult — phone or Zoom",
  },
];

/**
 * End-of-page / mid-content pathway grid — keeps major pages from becoming dead ends
 * and pushes authority to Cost Studio, land, rebuilds, Studios, and calculators.
 */
export function PlanningPathways({
  title = "Clear next steps",
  body = "Tools and pathways most homeowners use after reading — pick the one that matches where you are.",
  pathways = DEFAULT_PATHWAYS,
  className = "",
}: {
  title?: string;
  body?: string;
  pathways?: PathwayLink[];
  className?: string;
}) {
  return (
    <section
      className={`section-sm border-t border-border bg-bg-elevated ${className}`}
      aria-labelledby="planning-pathways-heading"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Keep planning</p>
          <h2
            id="planning-pathways-heading"
            className="mt-2 font-display text-3xl text-ivory sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm text-text-muted sm:text-base">{body}</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((p) => (
            <Link
              key={p.href + p.label}
              href={p.href}
              className="card card-hover flex min-h-[5rem] flex-col justify-center p-5 transition"
            >
              <span className="font-display text-xl text-ivory sm:text-2xl">{p.label}</span>
              <span className="mt-1.5 text-sm text-text-dim">{p.note}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
