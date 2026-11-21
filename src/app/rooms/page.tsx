import type { Metadata } from "next";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { formatGHS } from "@/lib/booking";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import RoomsExplorer from "@/components/rooms/RoomsExplorer";
import ReserveButton from "@/components/booking/ReserveButton";

export const metadata: Metadata = {
  title: "Rooms & rates",
  description:
    "Compare Standard (non-AC) and air-conditioned Executive rooms at Emma-Ike Guesthouse, Agona Swedru. All rooms are en-suite with a fridge, satellite TV and daily housekeeping.",
  alternates: { canonical: "/rooms" },
};

const comparison: { label: string; value: (r: (typeof rooms)[number]) => string }[] = [
  { label: "Rate per night", value: (r) => formatGHS(r.pricePerNight) },
  { label: "Air-conditioning", value: (r) => (r.airConditioned ? "Yes" : "No") },
  { label: "Bed", value: (r) => r.bed },
  { label: "Sleeps", value: (r) => `${r.maxAdults} adults, ${r.maxChildren} ${r.maxChildren === 1 ? "child" : "children"}` },
  { label: "En-suite bathroom", value: () => "Yes" },
  { label: "Free toiletries", value: () => "Yes" },
  { label: "Fridge", value: () => "Yes" },
  { label: "Flat-screen satellite TV", value: () => "Yes" },
  { label: "Seating area", value: () => "Yes" },
  { label: "Daily housekeeping", value: () => "Yes" },
];

export default function RoomsPage() {
  return (
    <>
      <PageIntro title="Rooms & rates">
        <p>
          Every room has its own bathroom, a fridge, satellite TV and a place to sit, and is cleaned daily. The only
          choice is whether you want air-conditioning.
        </p>
      </PageIntro>

      <section className="pb-24 md:pb-36">
        <Container>
          <RoomsExplorer />
        </Container>
      </section>

      <section className="border-t border-line bg-paper py-24 md:py-32">
        <Container>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em]">
            Side by side
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">Comparison of room types</caption>
              <thead>
                <tr className="border-b border-ink/20">
                  <th scope="col" className="w-[40%] py-4 pr-6 text-sm font-medium text-stone">
                    Room
                  </th>
                  {rooms.map((r) => (
                    <th key={r.id} scope="col" className="py-4 pr-6 font-display text-2xl font-medium">
                      {r.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th scope="row" className="py-4 pr-6 font-normal text-stone">
                      {row.label}
                    </th>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-4 pr-6">
                        {row.value(r)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="pt-8" />
                  {rooms.map((r) => (
                    <td key={r.id} className="pt-8 pr-6">
                      <ReserveButton prefill={{ roomId: r.id }} variant="secondary">
                        Reserve {r.name.replace(" Room", "")}
                      </ReserveButton>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <div className="border-t border-ink/15 pt-6">
              <h3 className="font-display text-[1.75rem] font-medium">Travelling with children</h3>
              <p className="mt-2 max-w-[44ch] text-stone">
                Children are welcome, and there are activities on site to keep them busy. Tell us their ages when you
                book and we’ll suggest the best room for your family.
              </p>
            </div>
            <div className="border-t border-ink/15 pt-6">
              <h3 className="font-display text-[1.75rem] font-medium">Times</h3>
              <p className="mt-2 max-w-[44ch] text-stone">
                Check-in is {site.checkIn.label}, check-out {site.checkOut.label}. The front desk is open 24 hours for
                late arrivals.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
