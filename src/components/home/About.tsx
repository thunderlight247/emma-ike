import { propertyPhoto } from "@/data/media";
import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import MediaImage from "@/components/ui/MediaImage";
import ParallaxFrame from "@/components/ui/ParallaxFrame";

export default function About() {
  return (
    <section className="py-24 md:py-36">
      <Container className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <figure className="md:col-span-7">
          <ParallaxFrame className="aspect-[4/3] rounded-[1.5rem] bg-wall md:aspect-[8/5]">
            <MediaImage item={propertyPhoto} sizes="(min-width: 768px) 58vw, 100vw" />
          </ParallaxFrame>
          <figcaption className="mt-4 text-sm text-stone">The courtyard at Emma-Ike, Mandela.</figcaption>
        </figure>

        <div className="md:col-span-5">
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em]">
            A quiet courtyard just off the busy main road.
          </h2>
          <div className="mt-8 max-w-[46ch] space-y-5 text-[1.0625rem] text-stone">
            <p>
              Emma-Ike sits right across from the Melcom shop in Mandela, so it’s easy to find after a long trip and
              a short walk from the shops and transport of central Swedru.
            </p>
            <p>
              Step through the gate and it’s calmer: shaded by trees, with yellow rooms around a paved courtyard and
              parking inside the compound. Rooms are cleaned every day, and someone is always at the front desk.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
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
      </Container>
    </section>
  );
}
