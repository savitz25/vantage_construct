import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Careers at Vantage Construction | Join Our NJ Building Team",
  description:
    "Careers with Vantage Construction — craftspeople and project professionals for luxury custom homes and renovations in Central & Northern New Jersey.",
  path: "/about/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build with a team that takes pride in the work"
        description="We're always interested in craftspeople, project professionals, and partners who share our commitment to excellence, integrity, and client-centric service."
      />
      <section className="section pt-0">
        <div className="container-v card p-8">
          <h2 className="font-display text-3xl text-ivory">How to reach us</h2>
          <p className="mt-4 text-text-muted">
            Email{" "}
            <a className="text-gold" href={`mailto:${company.email}`}>
              {company.email}
            </a>{" "}
            with your background and interests, or call{" "}
            <a className="text-gold" href={`tel:${company.phoneTel}`}>
              {company.phone}
            </a>
            .
          </p>
        </div>
      </section>
      <CtaBanner title="Prefer a conversation first?" />
    </>
  );
}
