import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Schedule a Consultation | Custom Home Builder North Jersey",
  description:
    "Start a complimentary consultation with Vantage Construction — phone or Zoom. Luxury custom homes, rebuilds, and renovations in Central & Northern New Jersey.",
  path: "/start",
});

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const pick = (key: string) => {
    const value = params[key];
    return typeof value === "string" ? value : "";
  };

  const source = pick("source");
  const config = pick("config");
  const name = pick("name");
  const email = pick("email");
  const phone = pick("phone");

  const defaultMessage =
    source === "design-studio" && config
      ? `I'm following up from Design Studio. Configuration ID: ${config}. Please review my Vision Summary preferences for our complimentary consultation.`
      : "";

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
                {config ? (
                  <li>
                    Design Studio config: <strong className="text-ivory">{config}</strong>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="card p-7">
              <h2 className="font-display text-2xl text-ivory">Prefer to design first?</h2>
              <p className="mt-3 text-sm text-text-muted">
                Shape size, style, finishes, and lifestyle in our interactive studio before we talk.
              </p>
              <a href="/design-studio" className="btn btn-secondary mt-5">
                Open Design Studio
              </a>
            </div>
          </div>
          <ContactForm
            defaultName={name}
            defaultEmail={email}
            defaultPhone={phone}
            defaultIntent={source === "design-studio" ? "Design Studio follow-up" : "New custom home"}
            defaultMessage={defaultMessage}
          />
        </div>
      </section>
    </>
  );
}
