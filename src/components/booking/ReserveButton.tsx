"use client";

import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { useBooking, type BookingPrefill } from "./BookingProvider";

interface ReserveButtonProps {
  prefill?: BookingPrefill;
  variant?: "primary" | "secondary" | "light" | "ghost-light";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function ReserveButton({
  prefill,
  variant = "primary",
  className = "",
  children,
  onClick,
}: ReserveButtonProps) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openBooking(prefill);
      }}
      className={buttonClass(variant, className)}
    >
      {children ?? "Reserve a room"}
    </button>
  );
}
