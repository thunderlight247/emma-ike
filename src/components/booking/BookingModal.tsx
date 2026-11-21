"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { rooms, getRoom } from "@/data/rooms";
import { site } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";
import {
  addDays,
  bookingTotal,
  buildWhatsAppMessage,
  formatDate,
  formatGHS,
  paystackEnabled,
  plural,
  todayISO,
  whatsappLink,
} from "@/lib/booking";
import type { BookingPrefill } from "./BookingProvider";

interface BookingModalProps {
  open: boolean;
  prefill: BookingPrefill;
  onClose: () => void;
}

type Errors = Partial<Record<"dates" | "name" | "phone" | "email" | "guests", string>>;

const field =
  "w-full rounded-xl border border-line bg-ivory px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-stone/60 hover:border-stone/50 focus:border-forest focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-ink";

export default function BookingModal({ open, prefill, onClose }: BookingModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const [minDate, setMinDate] = useState("");
  const [roomId, setRoomId] = useState(getRoom(prefill.roomId)?.id ?? rooms[0].id);
  const [checkIn, setCheckIn] = useState(prefill.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(prefill.checkOut ?? "");
  const [adults, setAdults] = useState(prefill.adults ?? 1);
  const [children, setChildren] = useState(prefill.children ?? 0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [payState, setPayState] = useState<"idle" | "loading" | "error">("idle");
  const [payError, setPayError] = useState("");

  // Separate from `open` so the panel can animate in after mounting.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const room = getRoom(roomId) ?? rooms[0];
  const { nights, total } = bookingTotal(room, checkIn, checkOut);

  // Dates depend on the visitor's clock, so set them after mount.
  useEffect(() => {
    const today = todayISO();
    setMinDate(today);
    setCheckIn((v) => v || today);
    setCheckOut((v) => v || addDays(prefill.checkIn || today, 1));
  }, [prefill.checkIn]);

  // Focus, Escape and scroll lock while open.
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  const maxGuests = room.maxAdults + room.maxChildren;

  function validate(requireEmail: boolean): boolean {
    const next: Errors = {};
    if (nights < 1) next.dates = "Choose a check-out date after your check-in date.";
    else if (nights > 30) next.dates = "For stays longer than 30 nights, message us on WhatsApp.";
    if (adults > room.maxAdults || children > room.maxChildren)
      next.guests = `The ${room.name} sleeps up to ${plural(room.maxAdults, "adult")} and ${plural(room.maxChildren, "child", "children")}.`;
    if (!name.trim()) next.name = "Enter the name the booking should be under.";
    if (!/^[+\d][\d\s-]{7,}$/.test(phone.trim())) next.phone = "Enter a phone number we can reach you on.";
    if (requireEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Paystack needs an email address to send your receipt.";
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Check the email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function details() {
    return {
      room,
      checkIn,
      checkOut,
      adults,
      children,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      notes: notes.trim() || undefined,
    };
  }

  function handleWhatsApp(e: FormEvent) {
    e.preventDefault();
    if (!validate(false)) return;
    window.open(whatsappLink(buildWhatsAppMessage(details())), "_blank", "noopener,noreferrer");
  }

  async function handlePaystack() {
    if (!validate(true)) return;
    setPayState("loading");
    setPayError("");
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          checkIn,
          checkOut,
          adults,
          children,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          notes: notes.trim(),
        }),
      });
      const data = (await res.json()) as { authorizationUrl?: string; error?: string };
      if (!res.ok || !data.authorizationUrl) throw new Error(data.error || "Payment could not be started.");
      window.location.assign(data.authorizationUrl);
    } catch (err) {
      setPayState("error");
      setPayError(
        `${err instanceof Error ? err.message : "Payment could not be started."} You can still book on WhatsApp.`,
      );
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[60] transition-[visibility] ${open ? "pointer-events-auto visible" : "pointer-events-none invisible delay-500"}`}
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
    >
      <div
        className={`absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col rounded-t-[1.75rem] bg-ivory shadow-[0_-20px_60px_-20px_rgba(28,25,23,0.35)] transition-transform duration-500 ease-out-expo md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[34rem] md:rounded-none md:rounded-l-[1.75rem] ${
          shown ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 pt-6 pb-5 md:px-8 md:pt-8">
          <div>
            <h2 id={titleId} className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.01em]">
              Reserve your room
            </h2>
            <p className="mt-1 text-sm text-stone">
              Check-in {site.checkIn.label}. Check-out {site.checkOut.label}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleWhatsApp} noValidate className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-8">
          <fieldset>
            <legend className={label}>Room</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {rooms.map((r) => (
                <label
                  key={r.id}
                  className={`cursor-pointer rounded-2xl border p-4 transition-colors ${
                    r.id === roomId ? "border-forest bg-forest-soft/40" : "border-line hover:border-stone/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="room"
                    value={r.id}
                    checked={r.id === roomId}
                    onChange={() => setRoomId(r.id)}
                    className="sr-only"
                  />
                  <span className="block font-medium">{r.name}</span>
                  <span className="block text-sm text-stone">
                    {r.airConditioned ? "Air-conditioned" : "Non-AC"}
                  </span>
                  <span className="mt-2 block font-display text-2xl">
                    {formatGHS(r.pricePerNight)}
                    <span className="font-sans text-sm text-stone"> per night</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bk-in" className={label}>
                Check-in
              </label>
              <input
                ref={firstFieldRef}
                id="bk-in"
                type="date"
                min={minDate}
                value={checkIn}
                onChange={(e) => {
                  const v = e.target.value;
                  setCheckIn(v);
                  if (v && (!checkOut || checkOut <= v)) setCheckOut(addDays(v, 1));
                }}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="bk-out" className={label}>
                Check-out
              </label>
              <input
                id="bk-out"
                type="date"
                min={checkIn ? addDays(checkIn, 1) : minDate}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={field}
              />
            </div>
          </div>
          {errors.dates && <p className="mt-2 text-sm text-red-800">{errors.dates}</p>}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bk-adults" className={label}>
                Adults
              </label>
              <select
                id="bk-adults"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className={field}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bk-children" className={label}>
                Children
              </label>
              <select
                id="bk-children"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className={field}
              >
                {[0, 1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.guests ? (
            <p className="mt-2 text-sm text-red-800">{errors.guests}</p>
          ) : (
            <p className="mt-2 text-sm text-stone">Sleeps up to {maxGuests} guests.</p>
          )}

          <div className="mt-6 grid gap-4">
            <div>
              <label htmlFor="bk-name" className={label}>
                Full name
              </label>
              <input
                id="bk-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
              />
              {errors.name && <p className="mt-2 text-sm text-red-800">{errors.name}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-phone" className={label}>
                  Phone
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="024 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={field}
                />
                {errors.phone && <p className="mt-2 text-sm text-red-800">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="bk-email" className={label}>
                  Email <span className="font-normal text-stone">(for online payment)</span>
                </label>
                <input
                  id="bk-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                />
                {errors.email && <p className="mt-2 text-sm text-red-800">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="bk-notes" className={label}>
                Anything we should know? <span className="font-normal text-stone">(optional)</span>
              </label>
              <textarea
                id="bk-notes"
                rows={2}
                placeholder="Arrival time, extra bed, breakfast…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={field}
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-paper p-5" aria-live="polite">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-stone">
                {nights > 0
                  ? `${formatGHS(room.pricePerNight)} × ${plural(nights, "night")}`
                  : "Choose your dates to see the total"}
              </span>
              <span className="font-display text-3xl font-medium">{formatGHS(total)}</span>
            </div>
            {nights > 0 && (
              <p className="mt-1 text-sm text-stone">
                {formatDate(checkIn)} to {formatDate(checkOut)}
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-3 pb-2">
            <button type="submit" className={buttonClass("primary", "w-full py-4")}>
              Book via WhatsApp
            </button>
            <button
              type="button"
              onClick={handlePaystack}
              disabled={!paystackEnabled || payState === "loading"}
              className={buttonClass("secondary", "w-full py-4")}
            >
              {payState === "loading" ? "Opening Paystack…" : "Pay online with Paystack"}
            </button>
            <p className="text-center text-sm text-stone">
              {paystackEnabled
                ? "Pay by MTN MoMo, Telecel Cash or card, in cedis."
                : "Online payment isn’t available yet. Book on WhatsApp and we’ll confirm how to pay."}
            </p>
            {payState === "error" && <p className="text-center text-sm text-red-800">{payError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
