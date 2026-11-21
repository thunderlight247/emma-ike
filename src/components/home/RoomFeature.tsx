import type { Room } from "@/data/rooms";
import { formatGHS, plural } from "@/lib/booking";
import MediaImage from "@/components/ui/MediaImage";
import ReserveButton from "@/components/booking/ReserveButton";

/** Large editorial room row; alternates image side with `reverse`. */
export default function RoomFeature({ room, reverse = false, showFeatures = false }: { room: Room; reverse?: boolean; showFeatures?: boolean }) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
      <div className={`grid grid-cols-6 gap-3 md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
        <div className="relative col-span-6 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-wall sm:col-span-4 sm:aspect-[4/5]">
          <MediaImage item={room.image} sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div className="relative hidden aspect-[3/5] self-end overflow-hidden rounded-[1.25rem] bg-wall sm:col-span-2 sm:block">
          <MediaImage item={room.detailImage} sizes="20vw" />
        </div>
      </div>

      <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
        <p className="inline-flex rounded-full border border-forest/30 px-3 py-1 text-sm text-forest">
          {room.airConditioned ? "Air-conditioned" : "Non-AC"}
        </p>
        <h3 className="mt-5 font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-none font-medium tracking-[-0.02em]">
          {room.name}
        </h3>
        <p className="mt-5 max-w-[44ch] text-[1.0625rem] text-stone">{room.description}</p>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-5 text-sm">
          <div>
            <dt className="text-stone">Bed</dt>
            <dd className="mt-1 font-medium">{room.bed}</dd>
          </div>
          <div>
            <dt className="text-stone">Sleeps</dt>
            <dd className="mt-1 font-medium">
              {plural(room.maxAdults, "adult")}
              {room.maxChildren > 0 ? ` + ${room.maxChildren}` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-stone">Bathroom</dt>
            <dd className="mt-1 font-medium">En-suite</dd>
          </div>
        </dl>

        {showFeatures && (
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9375rem]">
            {room.features.map((f) => (
              <li key={f} className="border-b border-line/70 pb-2">
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p>
            <span className="font-display text-[2.75rem] leading-none font-medium">{formatGHS(room.pricePerNight)}</span>
            <span className="ml-2 text-stone">per night</span>
          </p>
          <ReserveButton prefill={{ roomId: room.id }}>Reserve this room</ReserveButton>
        </div>
      </div>
    </article>
  );
}
