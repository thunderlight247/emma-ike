import { media } from "@/data/media";
import { lowestRate } from "@/data/rooms";
import { formatGHS } from "@/lib/booking";
import MediaImage from "@/components/ui/MediaImage";
import Container from "@/components/ui/Container";
import HeroHeadline from "./HeroHeadline";
import AvailabilityBar from "./AvailabilityBar";

export default function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest-deep">
      <div className="absolute inset-0 -z-10">
        <MediaImage item={media.hero} sizes="100vw" priority />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,48,36,0.55)_0%,rgba(28,25,23,0.15)_35%,rgba(28,25,23,0.72)_100%)]" />
      </div>

      <Container className="pt-40 pb-8 md:pb-12">
        <HeroHeadline text="Modern comfort in the heart of Agona Swedru" scopeId="hero" />
        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-hero-anim className="max-w-[44ch] text-lg leading-relaxed text-ivory/85">
            Directly opposite Melcom in Mandela. En-suite rooms with or without air-conditioning, a restaurant and
            bar on site, and a front desk that never closes.
          </p>
          <p data-hero-anim className="shrink-0 text-ivory/85">
            Rooms from <span className="font-display text-3xl text-ivory">{formatGHS(lowestRate)}</span> a night
          </p>
        </div>
        <div className="mt-10">
          <AvailabilityBar />
        </div>
      </Container>
    </section>
  );
}
