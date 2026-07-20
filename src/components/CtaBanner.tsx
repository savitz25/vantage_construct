import Link from "next/link";
import { company } from "@/lib/company";

export function CtaBanner({
  title = "Ready to turn your dream home into reality?",
  body = "Schedule a complimentary consultation — a simple, no-obligation phone or Zoom call.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section">
      <div className="container-v">
        <div className="card relative overflow-hidden px-8 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(11,31,74,0.06),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(196,160,53,0.14),transparent_45%)]" />
          <div className="relative">
            <p className="eyebrow justify-center">Complimentary consultation</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl text-ivory sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">{body}</p>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link href="/start" className="btn btn-primary min-h-12">
                Start my project
              </Link>
              <a href={`tel:${company.phoneTel}`} className="btn btn-secondary min-h-12">
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
