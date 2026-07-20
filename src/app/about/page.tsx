import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Vantage Construction | Victor Lobozzo Master Builder NJ",
  description:
    "Family-owned luxury custom home builder founded in 1990 by Master Builder Victor Lobozzo. Craftsmanship, cost discipline, and No Surprises across Warren, Watchung, Basking Ridge & Short Hills.",
  path: "/about",
});

const focusTownLinks = [
  { label: "Warren", href: "/locations/warren-nj" },
  { label: "Watchung", href: "/locations/watchung-nj" },
  { label: "Basking Ridge", href: "/locations/basking-ridge-nj" },
  { label: "Millburn–Short Hills", href: "/locations/millburn-short-hills-nj" },
] as const;

const differencePoints = [
  {
    title: "Clear communication",
    body: "Meetings, Zoom, or text — with real responsiveness. You always know where the project stands, what decisions matter next, and why.",
  },
  {
    title: "Cost discipline & transparency",
    body: "Ranges before romance. We talk budget early, design to a target when possible, and surface tradeoffs before they become surprises.",
  },
  {
    title: "Craftsmanship standards",
    body: "Old-world care for how things are built, paired with modern systems and detailing that still look right years after the keys turn.",
  },
  {
    title: "Experience over the full life of the project",
    body: "From first conversation through walkthrough — and beyond. Clients who still love their homes 15+ years later are the real proof.",
  },
  {
    title: "Local knowledge & accountability",
    body: "Deep focus in Somerset, Morris, Union, and Essex counties. A family name, New Jersey licenses, and a reputation that has to travel town by town.",
  },
  {
    title: "Elite trade partners",
    body: "A curated network of trusted trades across our focus towns — not a race to the lowest bid, but a standard for how work gets done.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="hero-grid grain relative overflow-hidden border-b border-border pt-[4.75rem] pb-0 sm:pt-24">
        <div className="container-wide pb-10 sm:pb-12 lg:pb-14">
          <nav className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-navy">About</span>
          </nav>

          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="max-w-2xl">
              <p className="eyebrow">Our story · Since {company.founded}</p>
              <h1 className="mt-3 font-display text-[2.15rem] leading-[1.1] text-ivory sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Built on craft. Led by trust. Measured in decades.
              </h1>
              <p className="mt-4 max-w-xl text-base text-text-muted sm:text-lg">
                A family-owned custom builder in {company.serviceAreaLabel} — blending old-world
                craftsmanship with modern execution, and a simple promise:{" "}
                <span className="font-medium text-ivory">{company.philosophy}</span>.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link href="/start" className="btn btn-primary min-h-12">
                  Start a conversation
                </Link>
                <a href="#victor" className="btn btn-secondary min-h-12">
                  Meet Victor
                </a>
              </div>
            </div>

            {/* Proof strip */}
            <dl className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-surface/90 p-5 shadow-[var(--shadow)] sm:p-6">
              {[
                { label: "Years of craft", value: company.yearsExperience },
                { label: "Founded", value: String(company.founded) },
                { label: "Focus towns", value: "4+" },
              ].map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-gold sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Full-bleed signature project */}
        <div className="relative h-[min(42vh,320px)] w-full sm:h-[min(48vh,420px)] lg:h-[min(52vh,480px)]">
          <SmartImage
            src="/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp"
            alt="Luxury custom home site in North Jersey — Vantage Construction craftsmanship"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-center text-xs font-medium tracking-wide text-white/90 sm:bottom-6 sm:left-8 sm:text-left sm:text-sm">
            Signature custom work · {company.focusTowns.slice(0, 3).join(" · ")} & beyond
          </p>
        </div>
      </section>

      {/* 2. Origin story */}
      <section className="section" id="story">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:items-start">
            <div>
              <p className="eyebrow">Origin</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                A family business, measured in homes that still feel right years later
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-text-muted sm:text-lg">
              <p>
                Vantage Construction began in {company.founded} with a straightforward idea: build
                luxury homes the way you would want your own built — carefully, honestly, and with
                standards that outlast trends.
              </p>
              <p>
                Today we remain family-owned and hands-on, led by Master Builder {company.founder}.
                We serve homeowners who care as much about how a project feels as how it looks:
                clear conversations, disciplined costs, and craftsmanship you can see in the
                details — and feel in how the house lives.
              </p>
              <p>
                {company.tagline} That is not marketing language for us. It is how we decide what to
                recommend, what to push back on, and how we show up when decisions get hard.
              </p>
              <blockquote className="border-l-2 border-gold pl-5 font-display text-2xl leading-snug text-ivory sm:text-3xl">
                No surprises means we surface the truth early — budget, site, timeline, and
                tradeoffs — so you can choose with confidence.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meet Victor */}
      <section id="victor" className="section scroll-mt-28 border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
            {/* Portrait / craft panel */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] sm:aspect-[5/6]">
                <SmartImage
                  src="/media/plans/d973d32e-ridgeview-hires17-768x512.webp"
                  alt={`${company.founder}, Master Builder — luxury custom home craftsmanship in North Jersey`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
                    Master builder · Founder
                  </p>
                  <p className="mt-2 font-display text-3xl text-white sm:text-4xl">
                    {company.founder}
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    Hands-on leadership · {company.yearsExperience} years · Warren, NJ
                  </p>
                </div>
              </div>
              {/* Architect-style plate */}
              <aside className="mt-4 rounded-xl border border-border bg-surface p-4 sm:absolute sm:-bottom-4 sm:-right-4 sm:mt-0 sm:w-52 sm:shadow-[var(--shadow)]">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  At a glance
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
                  <li>Founded {company.founded}</li>
                  <li>NJ Builder #{company.licenses.builder}</li>
                  <li>HIC #{company.licenses.hic}</li>
                </ul>
              </aside>
            </div>

            <div className="lg:pt-2">
              <p className="eyebrow">Leadership</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                How Victor works — and what clients can expect
              </h2>
              <div className="mt-5 space-y-4 text-text-muted leading-relaxed sm:mt-6">
                <p>
                  For over three decades, Victor has led Vantage in building some of the finest
                  luxury residences in Central and Northern New Jersey. Clients know him for
                  attention to detail, a cost-conscious mind, and the kind of responsiveness that
                  makes a large project feel manageable.
                </p>
                <p>
                  He is hands-on by design — not as a figurehead, but as the person who holds the
                  standard: how decisions are framed, how trades are chosen, and how communication
                  stays clear when the work gets complex. The goal is not a short-term win. It is a
                  home that still delights fifteen years later.
                </p>
                <p>
                  Expect straight answers, thoughtful pushback when a choice does not serve you, and
                  a process built so you are never left guessing what happens next.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { t: "Hands-on leadership", d: "Present where standards are set" },
                  { t: "Cost clarity", d: "Ranges and tradeoffs, early" },
                  { t: "Long-term thinking", d: "Build for how you will live" },
                  { t: "Direct access", d: "Meetings, Zoom, or text" },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="rounded-xl border border-border bg-surface px-4 py-3.5"
                  >
                    <p className="font-medium text-ivory">{item.t}</p>
                    <p className="mt-0.5 text-sm text-text-dim">{item.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link href="/start" className="btn btn-primary min-h-12">
                  Talk with Victor&apos;s team
                </Link>
                <Link href="/custom-homes/process" className="btn btn-secondary min-h-12">
                  See our process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What makes Vantage different */}
      <section id="values" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">The Vantage difference</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl lg:text-5xl">
              What guides every project
            </h2>
            <p className="mt-4 text-text-muted">
              Not a list of slogans — the habits we practice when budget, design, and site reality
              meet.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {differencePoints.map((item, i) => (
              <article
                key={item.title}
                className="card card-hover flex flex-col p-6 sm:p-7"
              >
                <span className="font-display text-2xl text-gold/80 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Proof & credibility */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow">Credibility</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                Proof that travels by reputation
              </h2>
              <p className="mt-4 text-text-muted">
                In this market, trust is earned project by project — through licenses, networks, and
                homes that still feel well-built long after the celebration.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-6 sm:col-span-2 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  America&apos;s Trusted Builders
                </p>
                <p className="mt-3 text-text-muted leading-relaxed">{company.recognition}</p>
              </div>
              <div className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-dim">
                  Experience
                </p>
                <p className="mt-2 font-display text-3xl text-ivory">
                  {company.yearsExperience} years
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Family-owned since {company.founded}, focused on lasting quality — not volume.
                </p>
              </div>
              <div className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-dim">
                  Licensing
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  N.J. Registered Builder #{company.licenses.builder}
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  HIC #{company.licenses.hic}
                </p>
              </div>
              <div className="card p-6 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-dim">
                  How we plan with you
                </p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary min-h-11">
                    Open Cost Studio
                  </Link>
                  <Link href="/design-studio" className="btn btn-secondary min-h-11">
                    Open Design Studio
                  </Link>
                  <Link href="/insights" className="btn btn-secondary min-h-11">
                    Resource Center
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Project proof strip */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                src: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
                alt: "Custom home exterior craftsmanship",
                label: "Exterior craft",
              },
              {
                src: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
                alt: "North Jersey residential lot and landscape",
                label: "Site & setting",
              },
              {
                src: "/media/basements/home-theater.jpg",
                alt: "Luxury finished lower level",
                label: "Interior living",
              },
            ].map((img) => (
              <div
                key={img.src}
                className="group relative aspect-[16/11] overflow-hidden rounded-2xl border border-border"
              >
                <SmartImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service area */}
      <section id="service" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow">Where we build</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl lg:text-5xl">
                Intentional focus, not a map full of pins
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                We specialize in {company.serviceAreaLabel} — with deep roots in{" "}
                {company.focusTowns.join(", ")} — across {company.counties.join(", ")} counties.
                That focus is intentional: better trade relationships, better site judgment, and
                accountability that stays local.
              </p>
              <p className="mt-4 text-sm text-text-dim">{company.address.full}</p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link href="/locations" className="btn btn-primary min-h-12">
                  Explore town guides
                </Link>
                <Link href="/custom-homes" className="btn btn-secondary min-h-12">
                  Custom homes
                </Link>
                <Link href="/about/careers" className="btn btn-secondary min-h-12">
                  Join our team
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {focusTownLinks.map((town) => (
                <Link
                  key={town.href}
                  href={town.href}
                  className="card card-hover flex min-h-[4.5rem] flex-col justify-center p-5 transition"
                >
                  <span className="font-display text-2xl text-ivory">{town.label}</span>
                  <span className="mt-1 text-sm font-semibold text-gold-deep">Town guide →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Closing invitation */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(196,160,53,0.12),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(11,31,74,0.06),transparent_45%)]" />
            <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:p-12">
              <div>
                <p className="eyebrow">Complimentary consultation</p>
                <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                  When you are ready, start with a calm conversation
                </h2>
                <p className="mt-4 max-w-xl text-text-muted leading-relaxed">
                  No hard sell. A clear discussion about your lot, home, timeline, and budget —
                  so you can decide whether Vantage is the right partner for the work ahead.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:items-start lg:items-stretch">
                <Link href="/start" className="btn btn-primary min-h-12 w-full sm:w-auto lg:w-full">
                  Start a conversation
                </Link>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="btn btn-secondary min-h-12 w-full sm:w-auto lg:w-full"
                >
                  Call {company.phone}
                </a>
                <Link
                  href="/insights/faq"
                  className="text-center text-sm font-semibold text-gold-deep underline-offset-2 hover:underline lg:text-left"
                >
                  Browse answers first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
