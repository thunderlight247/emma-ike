import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import Confirmation from "./Confirmation";

export const metadata: Metadata = {
  title: "Booking confirmation",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <section className="min-h-[80svh] pt-36 pb-24 md:pt-48">
      <Container>
        <Suspense fallback={<p className="text-lg text-stone">Checking your payment…</p>}>
          <Confirmation />
        </Suspense>
      </Container>
    </section>
  );
}
