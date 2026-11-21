"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/data/site";
import { formatDate, formatGHS, whatsappLink } from "@/lib/booking";
import { ButtonLink } from "@/components/ui/Button";

interface VerifyResult {
  status?: string;
  reference?: string;
  amount?: number;
  channel?: string;
  email?: string;
  error?: string;
  booking?: { room?: string; checkIn?: string; checkOut?: string; nights?: number; guest?: string };
}

type State = { kind: "loading" } | { kind: "missing" } | { kind: "done"; result: VerifyResult } | { kind: "error"; message: string };

export default function Confirmation() {
  const params = useSearchParams();
  const reference = params.get("reference") || params.get("trxref") || "";
  const [state, setState] = useState<State>(reference ? { kind: "loading" } : { kind: "missing" });

  useEffect(() => {
    if (!reference) return;
    let cancelled = false;
    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then(async (res) => {
        const result = (await res.json()) as VerifyResult;
        if (cancelled) return;
        if (!res.ok) setState({ kind: "error", message: result.error || "We couldn’t check this payment." });
        else setState({ kind: "done", result });
      })
      .catch(() => !cancelled && setState({ kind: "error", message: "We couldn’t reach the server to check your payment." }));
    return () => {
      cancelled = true;
    };
  }, [reference]);

  const helpLink = whatsappLink(
    `Hello ${site.name}, I paid online and want to confirm my booking. Payment reference: ${reference || "(none)"}`,
  );

  if (state.kind === "loading") {
    return <p className="text-lg text-stone">Checking your payment with Paystack…</p>;
  }

  if (state.kind === "missing") {
    return (
      <div>
        <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-medium tracking-[-0.02em]">
          No payment to show
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-stone">
          This page opens after paying online. If you’ve paid and landed here, send us a WhatsApp message and we’ll
          find your booking.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={helpLink}>Message the front desk</ButtonLink>
          <ButtonLink href="/rooms" variant="secondary">
            See rooms
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (state.kind === "error" || state.result.status !== "success") {
    const message =
      state.kind === "error"
        ? state.message
        : `Paystack reports this payment as ${state.result.status ?? "not completed"}. You haven’t been charged for a completed booking.`;
    return (
      <div>
        <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-medium tracking-[-0.02em]">
          Payment not confirmed
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-stone">{message}</p>
        <p className="mt-3 text-stone">Reference: {reference}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={helpLink}>Message the front desk</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="secondary">
            Call {site.phoneDisplay}
          </ButtonLink>
        </div>
      </div>
    );
  }

  const { result } = state;
  const b = result.booking ?? {};
  return (
    <div>
      <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-medium tracking-[-0.02em]">
        Payment received. See you soon{b.guest ? `, ${b.guest.split(" ")[0]}` : ""}.
      </h1>
      <p className="mt-6 max-w-[46ch] text-lg text-stone">
        Paystack has sent a receipt to {result.email}. We’ll confirm your room on WhatsApp or by phone.
      </p>
      <dl className="mt-10 grid max-w-2xl gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
        {b.room && (
          <div>
            <dt className="text-sm text-stone">Room</dt>
            <dd className="mt-1 font-display text-2xl">{b.room}</dd>
          </div>
        )}
        {b.checkIn && b.checkOut && (
          <div>
            <dt className="text-sm text-stone">Dates</dt>
            <dd className="mt-1 font-display text-2xl">
              {formatDate(b.checkIn)} to {formatDate(b.checkOut)}
            </dd>
          </div>
        )}
        {typeof result.amount === "number" && (
          <div>
            <dt className="text-sm text-stone">Paid</dt>
            <dd className="mt-1 font-display text-2xl">{formatGHS(result.amount)}</dd>
          </div>
        )}
        <div>
          <dt className="text-sm text-stone">Reference</dt>
          <dd className="mt-1 font-display text-2xl break-all">{result.reference}</dd>
        </div>
      </dl>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={helpLink}>Send reference on WhatsApp</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Directions
        </ButtonLink>
      </div>
    </div>
  );
}
