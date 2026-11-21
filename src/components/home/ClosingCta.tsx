import { site } from "@/data/site";
import { whatsappLink } from "@/lib/booking";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import ReserveButton from "@/components/booking/ReserveButton";

export default function ClosingCta() {
  return (
    <section className="bg-forest py-20 text-ivory md:py-28">
      <Container className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-medium tracking-[-0.02em]">
            Staying in Swedru? Send us your dates.
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg text-ivory/80">
            Pick a room and your dates, and we’ll confirm on WhatsApp. Or call the front desk, any time of day.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <ReserveButton variant="light">Reserve a room</ReserveButton>
          <ButtonLink href={whatsappLink(`Hello ${site.name}, I have a question about booking.`)} variant="ghost-light">
            Message on WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
