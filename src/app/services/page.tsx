import type { Metadata } from "next";
import { media, propertyPhoto, type MediaItem } from "@/data/media";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/booking";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import MediaImage from "@/components/ui/MediaImage";
import { ButtonLink } from "@/components/ui/Button";
import ClosingCta from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Dining & services",
  description:
    "On-site restaurant, continental breakfast, bar and lounge, family activities, laundry service and a 24-hour front desk at Emma-Ike Guesthouse, Agona Swedru.",
  alternates: { canonical: "/services" },
};

interface Service {
  id: string;
  title: string;
  body: string[];
  image: MediaItem;
}

const services: Service[] = [
  {
    id: "restaurant",
    title: "The restaurant",
    body: [
      "Meals are cooked and served on site, so after a long journey you can eat without going back out onto the road.",
      "Ask at the front desk for today’s menu and serving times, or order when you book.",
    ],
    image: media.dining.restaurant,
  },
  {
    id: "breakfast",
    title: "Continental breakfast",
    body: [
      "A simple, filling start to the day: tea or coffee, bread, eggs and fruit.",
      "Ask when you book whether breakfast is included in your rate.",
    ],
    image: media.dining.breakfast,
  },
  {
    id: "lounge",
    title: "Bar & lounge",
    body: [
      "A calm spot for a cold drink once the heat of the day has passed, or to catch up with the people you’re travelling with.",
    ],
    image: media.dining.lounge,
  },
  {
    id: "family",
    title: "Families & children",
    body: [
      "Children are welcome at Emma-Ike, and there are activities on site to keep them busy while you rest.",
      "The courtyard is inside the compound, away from the traffic on the main road.",
    ],
    image: propertyPhoto,
  },
  {
    id: "laundry",
    title: "Laundry service",
    body: [
      "Hand your clothes in at the front desk and they’ll come back washed and folded. Useful on longer stays or work trips.",
      "Ask at the front desk for turnaround times and prices.",
    ],
    image: media.services.laundry,
  },
  {
    id: "front-desk",
    title: "24-hour front desk",
    body: [
      "Someone is at reception day and night. Arrive late, check out early, or ask for help at any hour.",
      `Call ${site.phoneDisplay} or message us on WhatsApp before you arrive.`,
    ],
    image: media.services.frontDesk,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro title="Dining & services">
        <p>Food, drinks, laundry and help at any hour, all inside the compound.</p>
      </PageIntro>

      <nav aria-label="On this page" className="border-y border-line">
        <Container className="flex gap-6 overflow-x-auto py-4 text-[0.9375rem] whitespace-nowrap">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-stone transition-colors hover:text-forest">
              {s.title}
            </a>
          ))}
        </Container>
      </nav>

      <div className="py-20 md:py-28">
        <Container className="space-y-24 md:space-y-32">
          {services.map((s, i) => (
            <section key={s.id} id={s.id} className="grid scroll-mt-32 items-center gap-10 md:grid-cols-12 md:gap-16">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-wall md:col-span-7 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <MediaImage item={s.image} sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em]">
                  {s.title}
                </h2>
                <div className="mt-6 max-w-[44ch] space-y-4 text-[1.0625rem] text-stone">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.id === "front-desk" && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={site.phoneHref}>Call the front desk</ButtonLink>
                    <ButtonLink href={whatsappLink()} variant="secondary">
                      WhatsApp
                    </ButtonLink>
                  </div>
                )}
              </div>
            </section>
          ))}
        </Container>
      </div>

      <ClosingCta />
    </>
  );
}
