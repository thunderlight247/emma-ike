import { amenities } from "@/data/amenities";
import Container from "@/components/ui/Container";

export default function Amenities() {
  return (
    <section className="border-y border-line bg-paper py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em]">
              What’s here when you arrive
            </h2>
            <p className="mt-6 max-w-[34ch] text-stone">
              Everything below is part of a stay at Emma-Ike. Ask the front desk about anything else you need.
            </p>
          </div>
        </div>

        <dl className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
          {amenities.map((a) => (
            <div key={a.id} className="border-t border-ink/15 py-7">
              <dt className="font-display text-[1.75rem] leading-tight font-medium">{a.name}</dt>
              <dd className="mt-2 max-w-[38ch] text-stone">{a.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
