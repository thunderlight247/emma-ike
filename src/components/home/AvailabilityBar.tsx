"use client";

import { useEffect, useState, type FormEvent } from "react";
import { rooms } from "@/data/rooms";
import { addDays, todayISO } from "@/lib/booking";
import { useBooking } from "@/components/booking/BookingProvider";

const fieldWrap = "flex flex-col gap-1 px-5 py-3";
const fieldLabel = "text-[0.8125rem] text-ivory/75";
const control =
  "w-full bg-transparent text-[0.9375rem] font-medium text-ivory focus:outline-none [color-scheme:dark] [&>option]:text-ink";

export default function AvailabilityBar() {
  const { openBooking } = useBooking();
  const [min, setMin] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const t = todayISO();
    setMin(t);
    setCheckIn(t);
    setCheckOut(addDays(t, 1));
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    openBooking({
      roomId: roomId || undefined,
      checkIn,
      checkOut,
      adults: Math.min(guests, 2),
      children: Math.max(guests - 2, 0),
    });
  }

  return (
    <form
      onSubmit={submit}
      data-hero-anim
      aria-label="Check dates"
      className="grid grid-cols-2 overflow-hidden rounded-[1.5rem] border border-ivory/25 bg-ink/25 backdrop-blur-xl lg:grid-cols-[1fr_1fr_0.8fr_1.1fr_auto] lg:rounded-full"
    >
      <label className={`${fieldWrap} border-b border-ivory/15 lg:border-r lg:border-b-0 lg:pl-8`}>
        <span className={fieldLabel}>Check-in</span>
        <input
          type="date"
          min={min}
          value={checkIn}
          onChange={(e) => {
            const v = e.target.value;
            setCheckIn(v);
            if (v && (!checkOut || checkOut <= v)) setCheckOut(addDays(v, 1));
          }}
          className={control}
        />
      </label>
      <label className={`${fieldWrap} border-b border-l border-ivory/15 lg:border-b-0 lg:border-l-0 lg:border-r`}>
        <span className={fieldLabel}>Check-out</span>
        <input
          type="date"
          min={checkIn ? addDays(checkIn, 1) : min}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={control}
        />
      </label>
      <label className={`${fieldWrap} border-b border-ivory/15 lg:border-r lg:border-b-0`}>
        <span className={fieldLabel}>Guests</span>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={control}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>
      <label className={`${fieldWrap} border-b border-l border-ivory/15 lg:border-b-0 lg:border-l-0`}>
        <span className={fieldLabel}>Room</span>
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)} className={control}>
          <option value="">Any room</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} ({r.airConditioned ? "AC" : "non-AC"})
            </option>
          ))}
        </select>
      </label>
      <div className="col-span-2 p-2 lg:col-span-1">
        <button
          type="submit"
          className="h-full w-full rounded-full bg-ivory px-7 py-3.5 text-[0.9375rem] font-medium text-forest transition-colors hover:bg-wall"
        >
          Check dates
        </button>
      </div>
    </form>
  );
}
