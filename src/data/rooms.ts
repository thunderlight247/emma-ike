import { media, type MediaItem } from "./media";
import { roomFeatures } from "./amenities";

export type RoomTier = "standard" | "executive";

export interface Room {
  id: string;
  tier: RoomTier;
  name: string;
  summary: string;
  description: string;
  /** Nightly rate in Ghana cedis. */
  pricePerNight: number;
  airConditioned: boolean;
  bed: string;
  maxAdults: number;
  maxChildren: number;
  features: string[];
  image: MediaItem;
  detailImage: MediaItem;
}

/*
 * CONFIRM WITH THE PROPERTY BEFORE LAUNCH:
 * pricePerNight, bed and occupancy below are placeholders. They were not
 * available from any public listing. Update them here and every page, the
 * booking totals and the Paystack amount follow automatically.
 */
export const rooms: Room[] = [
  {
    id: "standard",
    tier: "standard",
    name: "Standard Room",
    summary: "A clean, comfortable en-suite room at the best price in the house.",
    description:
      "Everything you need for a good night’s sleep and an easy morning: a private bathroom, a fridge for cold water, satellite TV and a corner to sit. No air-conditioning, which keeps the rate low.",
    pricePerNight: 250,
    airConditioned: false,
    bed: "Double bed",
    maxAdults: 2,
    maxChildren: 1,
    features: roomFeatures,
    image: media.rooms.standard,
    detailImage: media.rooms.standardDetail,
  },
  {
    id: "executive",
    tier: "executive",
    name: "Executive Room",
    summary: "Our air-conditioned room, for cool, quiet nights.",
    description:
      "The same en-suite comfort as the Standard Room, with air-conditioning to keep you cool through the afternoon heat. A good choice for longer stays and for anyone travelling for work.",
    pricePerNight: 400,
    airConditioned: true,
    bed: "Double bed",
    maxAdults: 2,
    maxChildren: 2,
    features: ["Air-conditioning", ...roomFeatures],
    image: media.rooms.executive,
    detailImage: media.rooms.executiveDetail,
  },
];

export const getRoom = (id: string | undefined | null) => rooms.find((r) => r.id === id);

export const lowestRate = Math.min(...rooms.map((r) => r.pricePerNight));
