"use client";

import { useState } from "react";
import { rooms } from "@/data/rooms";
import RoomFeature from "@/components/home/RoomFeature";

const filters = [
  { id: "all", label: "All rooms" },
  { id: "ac", label: "Air-conditioned" },
  { id: "non-ac", label: "Non-AC" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function RoomsExplorer() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = rooms.filter((r) =>
    filter === "all" ? true : filter === "ac" ? r.airConditioned : !r.airConditioned,
  );

  return (
    <div>
      <div role="radiogroup" aria-label="Filter rooms" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-5 py-2.5 text-[0.9375rem] transition-colors ${
                active ? "border-forest bg-forest text-ivory" : "border-line text-ink hover:border-stone/60"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-stone" aria-live="polite">
        Showing {visible.length} of {rooms.length} room types
      </p>

      <div className="mt-14 space-y-24 md:space-y-32">
        {visible.map((room, i) => (
          <RoomFeature key={room.id} room={room} reverse={i % 2 === 1} showFeatures />
        ))}
      </div>
    </div>
  );
}
