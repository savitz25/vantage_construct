import Link from "next/link";

const intents = [
  {
    title: "Design my home",
    body: "Interactive Design Studio — shape size, style, and finishes with a Vision Summary.",
    href: "/design-studio",
    cta: "Open Design Studio",
    primary: true,
  },
  {
    title: "See what it costs",
    body: "Live North Jersey construction ranges with an interactive house model.",
    href: "/cost-to-build-a-house-nj",
    cta: "Open Cost Studio",
    primary: true,
  },
  {
    title: "Build a custom home",
    body: "New construction on your lot — process, craft, and no-surprises planning.",
    href: "/custom-homes",
    cta: "Start custom path",
  },
  {
    title: "Transform my home",
    body: "Kitchens, basements, additions, outdoor living — explore Studios first.",
    href: "/transformations",
    cta: "Browse renovations",
  },
  {
    title: "Evaluate my lot",
    body: "Buildability, setbacks, multi-lot potential, and land development paths.",
    href: "/land/evaluation",
    cta: "Evaluate my lot",
  },
  {
    title: "See available homes",
    body: "Fully customizable plan library with transparent base pricing.",
    href: "/available-homes",
    cta: "Browse designs",
  },
  {
    title: "ADU or accessory building",
    body: "Guest suites, pool houses, collector garages — feasibility and cost reality.",
    href: "/custom-homes/accessory-buildings",
    cta: "Explore accessories",
  },
  {
    title: "I’m a realtor",
    body: "Land-to-home packages, knockdowns, and client-ready builder support.",
    href: "/partners/realtors",
    cta: "Partner with us",
  },
  {
    title: "I’m an investor",
    body: "Loan, equity, and hybrid structures with a proven local builder.",
    href: "/partners/investors",
    cta: "Investor overview",
  },
] as const;

export function IntentSelector() {
  return (
    <div className="intent-grid">
      {intents.map((item) => (
        <Link
          key={item.href + item.title}
          href={item.href}
          className={`intent-card card card-hover group ${
            "primary" in item && item.primary ? "intent-card-primary" : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl text-ivory transition group-hover:text-navy-soft sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
          </div>
          <span className="intent-cta">
            {item.cta}
            <span aria-hidden className="ml-1">
              →
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
