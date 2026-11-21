import { media } from "@/data/media";
import Container from "@/components/ui/Container";
import MediaImage from "@/components/ui/MediaImage";
import { ButtonLink } from "@/components/ui/Button";

export default function Dining() {
  return (
    <section className="bg-wall/60 py-24 md:py-36">
      <Container>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em] md:col-span-6">
            Breakfast, dinner and a cold drink, without leaving the compound.
          </h2>
          <p className="max-w-[44ch] text-[1.0625rem] text-stone md:col-span-5 md:col-start-8">
            The restaurant serves meals through the day, from a continental breakfast in the morning. In the evening,
            the bar and lounge is the place to wind down.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-[repeat(2,minmax(15rem,1fr))]">
          <figure className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem] bg-wall md:col-span-7 md:row-span-2">
            <MediaImage item={media.dining.restaurant} sizes="(min-width: 768px) 58vw, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(28,25,23,0.7))] p-6 pt-20 text-ivory md:p-8 md:pt-24">
              <span className="block font-display text-3xl">The restaurant</span>
              <span className="mt-1 block text-ivory/80">Meals cooked on site, served through the day.</span>
            </figcaption>
          </figure>
          <figure className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-wall md:col-span-5">
            <MediaImage item={media.dining.breakfast} sizes="(min-width: 768px) 42vw, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(28,25,23,0.7))] p-6 pt-16 text-ivory">
              <span className="block font-display text-2xl">Continental breakfast</span>
            </figcaption>
          </figure>
          <figure className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-wall md:col-span-5">
            <MediaImage item={media.dining.lounge} sizes="(min-width: 768px) 42vw, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(28,25,23,0.7))] p-6 pt-16 text-ivory">
              <span className="block font-display text-2xl">Bar & lounge</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10">
          <ButtonLink href="/services" variant="secondary">
            See dining & services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
