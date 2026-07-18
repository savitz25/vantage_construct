import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${company.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle information you share when contacting Vantage Construction."
      />
      <section className="section pt-0">
        <div className="container-v prose-v card space-y-4 p-8">
          <p>
            When you submit a form or contact us by phone or email, we use your information to
            respond to your inquiry and provide construction-related services. We do not sell your
            personal information.
          </p>
          <p>
            Contact us at{" "}
            <a className="text-gold" href={`mailto:${company.email}`}>
              {company.email}
            </a>{" "}
            with privacy questions.
          </p>
        </div>
      </section>
    </>
  );
}
