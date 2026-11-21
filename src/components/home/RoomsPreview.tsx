import { rooms } from "@/data/rooms";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import RoomFeature from "./RoomFeature";

export default function RoomsPreview() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em]">
            Two rooms. Choose cool air or the lower rate.
          </h2>
          <ButtonLink href="/rooms" variant="secondary">
            Compare rooms
          </ButtonLink>
        </div>
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {rooms.map((room, i) => (
            <RoomFeature key={room.id} room={room} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
