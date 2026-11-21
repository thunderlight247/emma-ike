import type { Metadata } from "next";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/booking";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import MapEmbed from "@/components/ui/MapEmbed";
import Faq from "@/components/ui/Faq";
import { ButtonLink } from "@/components/ui/Button";
import ReserveButton from "@/components/booking/ReserveButton";

export const metadata: Metadata = {
  title: "Contact & directions",
  description:
    "Call or WhatsApp Emma-Ike Guesthouse on +233 24 475 4107. We’re opposite the Melcom shop in Mandela, Agona Swedru. Front desk open 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact & directions">
        <p>The front desk answers day and night. WhatsApp is the quickest way to book.</p>
      </PageIntro>

      <section className="pb-24 md:pb-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="border-t border-ink/15 pt-6">
              <h2 className="text-sm font-medium text-stone">Phone and WhatsApp</h2>
              <a
                href={site.phoneHref}
                className="mt-2 block font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-tight font-medium tracking-[-0.01em] transition-colors hover:text-forest"
              >
                {site.phoneDisplay}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={site.phoneHref}>Call now</ButtonLink>
                <ButtonLink href={whatsappLink(`Hello ${site.name}, I’d like to ask about a room.`)} variant="secondary">
                  Chat on WhatsApp
                </ButtonLink>
              </div>
            </div>

            <div className="mt-12 border-t border-ink/15 pt-6">
              <h2 className="text-sm font-medium text-stone">Address</h2>
              <address className="mt-2 text-lg not-italic">
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.region}, {site.address.country}
              </address>
              <p className="mt-2 text-stone">Plus code {site.address.plusCode}</p>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block underline decoration-ink/30 underline-offset-4 hover:decoration-forest"
              >
                Open in Google Maps
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
              <div>
                <dt className="text-sm text-stone">Front desk</dt>
                <dd className="mt-1 font-display text-2xl">Open 24 hours</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">Check-in</dt>
                <dd className="mt-1 font-display text-2xl">{site.checkIn.label}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">Check-out</dt>
                <dd className="mt-1 font-display text-2xl">{site.checkOut.label}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]" />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em]">
              Before you come
            </h2>
            <p className="mt-6 max-w-[34ch] text-stone">Answers to what guests ask most. Anything else, just call.</p>
            <div className="mt-8">
              <ReserveButton>Reserve a room</ReserveButton>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </Container>
      </section>
    </>
  );
}
