import { NextResponse } from "next/server";
import { getSecretKey, paystackRequest } from "@/lib/paystack";

interface VerifyData {
  status: "success" | "failed" | "abandoned" | "ongoing" | "pending" | "reversed" | string;
  reference: string;
  amount: number;
  currency: string;
  paid_at: string | null;
  channel: string;
  customer: { email: string };
  metadata?: {
    room_name?: string;
    check_in?: string;
    check_out?: string;
    nights?: number;
    guest_name?: string;
  } | null;
}

export async function GET(request: Request) {
  if (!getSecretKey()) {
    return NextResponse.json({ error: "Online payment isn’t set up yet." }, { status: 503 });
  }

  const reference = new URL(request.url).searchParams.get("reference") ?? "";
  if (!/^[\w.=-]{4,100}$/.test(reference)) {
    return NextResponse.json({ error: "Missing or invalid payment reference." }, { status: 400 });
  }

  try {
    const { data } = await paystackRequest<VerifyData>(`/transaction/verify/${encodeURIComponent(reference)}`);
    // TODO: when a database is connected, record the booking here (idempotently, by reference)
    // and also handle Paystack's charge.success webhook as the source of truth.
    return NextResponse.json({
      status: data.status,
      reference: data.reference,
      amount: data.amount / 100,
      currency: data.currency,
      paidAt: data.paid_at,
      channel: data.channel,
      email: data.customer?.email,
      booking: {
        room: data.metadata?.room_name,
        checkIn: data.metadata?.check_in,
        checkOut: data.metadata?.check_out,
        nights: data.metadata?.nights,
        guest: data.metadata?.guest_name,
      },
    });
  } catch (err) {
    console.error("Paystack verify failed", err);
    return NextResponse.json({ error: "We couldn’t check this payment with Paystack." }, { status: 502 });
  }
}
