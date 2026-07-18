import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Start Your Project — Schedule a Consultation",
  description:
    "Schedule a complimentary, no-obligation consultation with Vantage Construction. Phone or Zoom — luxury custom homes and renovations in Central & Northern New Jersey.",
  path: "/start",
});

export default function StartPage() {
  return (
    <>
      <PageHero
        eyebrow="Complimentary consultation"
        title="Discover your possibilities"
        description="A simple, no-obligation phone or Zoom call. Share your vision — we’ll help you understand process, timeline, and next steps with clarity."
      />
      <section className="section pt-0">
        <div className="container-v grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="card p-7">
              <h2 className="font-display text-2xl text-ivory">Prefer to call or email?</h2>
              <ul className="mt-4 space-y-3 text-text-muted">
                <li>
                  Phone:{" "}
                  <a className="text-gold" href={`tel:${company.phoneTel}`}>
                    {company.phone}
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a className="text-gold" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </li>
                <li>Office: {company.address.full}</li>
              </ul>
            </div>
            <div className="card p-7">
              <h2 className="font-display text-2xl text-ivory">What we’ll cover</h2>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                <li>Your goals, timeline, and lifestyle needs</li>
                <li>Ballpark considerations and process overview</li>
                <li>Whether Design & Discovery is the right next step</li>
                <li>Questions about plans, land, renovations, or partnerships</li>
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
