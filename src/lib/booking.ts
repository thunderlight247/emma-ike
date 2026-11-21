import { site } from "@/data/site";
import type { Room } from "@/data/rooms";

const DAY = 86_400_000;

/** Number of nights between two YYYY-MM-DD strings. 0 if invalid. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = Date.parse(`${checkIn}T00:00:00Z`);
  const b = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  const nights = Math.round((b - a) / DAY);
  return nights > 0 ? nights : 0;
}

/** Today's date in the visitor's local time, as YYYY-MM-DD. */
export function todayISO(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function addDays(iso: string, days: number): string {
  const t = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(t)) return "";
  return new Date(t + days * DAY).toISOString().slice(0, 10);
}

export function formatDate(iso: string): string {
  const t = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(t)) return iso;
  return new Date(t).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const cedis = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });
export const formatGHS = (amount: number) => `₵${cedis.format(amount)}`;

export const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface BookingDetails {
  room: Room;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

export function bookingTotal(room: Room, checkIn: string, checkOut: string) {
  const nights = nightsBetween(checkIn, checkOut);
  return { nights, total: nights * room.pricePerNight };
}

export function buildWhatsAppMessage(b: BookingDetails): string {
  const { nights, total } = bookingTotal(b.room, b.checkIn, b.checkOut);
  const guests = [plural(b.adults, "adult"), b.children > 0 ? plural(b.children, "child", "children") : null]
    .filter(Boolean)
    .join(", ");

  const lines = [
    `Hello ${site.name}, I’d like to reserve a room.`,
    "",
    `Room: ${b.room.name}${b.room.airConditioned ? " (air-conditioned)" : " (non-AC)"}`,
    `Check-in: ${formatDate(b.checkIn)}`,
    `Check-out: ${formatDate(b.checkOut)} (${plural(nights, "night")})`,
    `Guests: ${guests}`,
    `Estimated total: ${formatGHS(total)}`,
    "",
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
  ];
  if (b.email) lines.push(`Email: ${b.email}`);
  if (b.notes) lines.push(`Notes: ${b.notes}`);
  lines.push("", "Please confirm availability. Thank you.");
  return lines.join("\n");
}

export const paystackEnabled = Boolean(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
