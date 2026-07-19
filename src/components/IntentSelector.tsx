import Link from "next/link";

const intents = [
  {
    title: "Design Studio",
    body: "Shape your vision interactively and unlock a personalized Vision Summary.",
    href: "/design-studio",
  },
  {
    title: "New Custom Home",
    body: "Design and build a luxury residence tailored to your life.",
    href: "/custom-homes",
  },
  {
    title: "Home Transformation",
    body: "Additions, renovations, basements, attics, and outdoor living.",
    href: "/transformations",
  },
  {
    title: "Land & Spec",
    body: "Evaluate land, multi-lot development, or explore spec homes.",
    href: "/land",
  },
  {
    title: "ADU / Accessory",
    body: "Maximize your property with an ADU, garage, workshop, or studio.",
    href: "/custom-homes/adus",
  },
  {
    title: "Realtor Partner",
    body: "Turn land listings into home packages and grow commissions.",
    href: "/partners/realtors",
  },
  {
    title: "Investor Partner",
    body: "Loan, equity, and hybrid structures with a proven local builder.",
    href: "/partners/investors",
  },
] as const;

export function IntentSelector() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {intents.map((item) => (
        <Link key={item.href} href={item.href} className="card card-hover group p-6">
          <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold-deep">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-text-muted">{item.body}</p>
          <span className="mt-5 inline-flex text-sm text-gold">Explore →</span>
        </Link>
      ))}
    </div>
  );
}
