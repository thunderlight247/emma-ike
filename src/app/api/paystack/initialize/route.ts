import { NextResponse } from "next/server";
import { getRoom } from "@/data/rooms";
import { site } from "@/data/site";
import { nightsBetween } from "@/lib/booking";
import { getSecretKey, paystackRequest } from "@/lib/paystack";

interface InitializeBody {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!getSecretKey()) {
    return NextResponse.json({ error: "Online payment isn’t set up yet." }, { status: 503 });
  }

  let body: InitializeBody;
  try {
    body = (await request.json()) as InitializeBody;
  } catch {
    return NextResponse.json({ error: "The booking details couldn’t be read." }, { status: 400 });
  }

  const room = getRoom(body.roomId);
  if (!room) return NextResponse.json({ error: "Choose a room." }, { status: 400 });

  const checkIn = body.checkIn ?? "";
  const checkOut = body.checkOut ?? "";
  if (!ISO_DATE.test(checkIn) || !ISO_DATE.test(checkOut)) {
    return NextResponse.json({ error: "Choose your check-in and check-out dates." }, { status: 400 });
  }

  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1 || nights > 30) {
    return NextResponse.json({ error: "Stays booked online must be 1 to 30 nights." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address for your receipt." }, { status: 400 });
  }

  const adults = Math.max(1, Math.min(Number(body.adults) || 1, room.maxAdults));
  const children = Math.max(0, Math.min(Number(body.children) || 0, room.maxChildren));

  // Amount is always computed on the server from the room data, never trusted from the client.
  const amountGHS = room.pricePerNight * nights;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  try {
    const result = await paystackRequest<{ authorization_url: string; reference: string }>(
      "/transaction/initialize",
      {
        method: "POST",
        body: {
          email,
          amount: amountGHS * 100, // pesewas
          currency: "GHS",
          channels: ["card", "mobile_money"],
          callback_url: `${origin}/booking/confirmation`,
          metadata: {
            property: site.name,
            room_id: room.id,
            room_name: room.name,
            check_in: checkIn,
            check_out: checkOut,
            nights,
            adults,
            children,
            guest_name: (body.name ?? "").slice(0, 120),
            guest_phone: (body.phone ?? "").slice(0, 40),
            notes: (body.notes ?? "").slice(0, 500),
            custom_fields: [
              { display_name: "Room", variable_name: "room", value: room.name },
              { display_name: "Dates", variable_name: "dates", value: `${checkIn} to ${checkOut}` },
              { display_name: "Guest", variable_name: "guest", value: body.name ?? "" },
              { display_name: "Phone", variable_name: "phone", value: body.phone ?? "" },
            ],
          },
        },
      },
    );
    return NextResponse.json({ authorizationUrl: result.data.authorization_url, reference: result.data.reference });
  } catch (err) {
    console.error("Paystack initialize failed", err);
    return NextResponse.json({ error: "Paystack couldn’t start the payment." }, { status: 502 });
  }
}
