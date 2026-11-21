"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import BookingModal from "./BookingModal";

export interface BookingPrefill {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
}

interface BookingContextValue {
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  // Bumped on each open so the form remounts with the new prefill.
  const [session, setSession] = useState(0);

  const openBooking = useCallback((next: BookingPrefill = {}) => {
    setPrefill(next);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal key={session} open={open} prefill={prefill} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}
