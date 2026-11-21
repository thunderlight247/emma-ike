import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import MapEmbed from "@/components/ui/MapEmbed";
import { ButtonLink } from "@/components/ui/Button";

export default function Location() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <p className="max-w-[20ch] font-display text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.025em]">
          Find Melcom on the main road. We’re right across from it.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <MapEmbed className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]" />

          <div className="lg:col-span-5">
            <address className="text-[1.0625rem] not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
              <br />
              <span className="text-stone">Plus code {site.address.plusCode}</span>
            </address>

            <h2 className="mt-10 text-sm font-medium text-stone">Approximate drive times</h2>
            <ul className="mt-3 border-t border-line">
              {site.landmarks.map((l) => (
                <li key={l.place} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span>
                    <span className="block text-lg font-medium">{l.place}</span>
                    <span className="block text-sm text-stone">{l.note}</span>
                  </span>
                  <span className="shrink-0 font-display text-xl">{l.time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.mapsLink}>Get directions</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="secondary">
                Call {site.phoneDisplay}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
