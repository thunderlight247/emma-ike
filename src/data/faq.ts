import { site } from "./site";

export const faqs = [
  {
    q: "What time is check-in and check-out?",
    a: `Check-in is ${site.checkIn.label} and check-out is ${site.checkOut.label}. The front desk is open 24 hours, so you can arrive late. Send us a WhatsApp message if you expect to arrive after dark.`,
  },
  {
    q: "Is there parking?",
    a: "Yes. Parking is free and inside the compound.",
  },
  {
    q: "Is breakfast available?",
    a: "Yes. A continental breakfast is served at the on-site restaurant. Ask when you book whether it’s included in your rate.",
  },
  {
    q: "How often are rooms cleaned?",
    a: "Every day. Housekeeping tidies the room, makes the bed and replaces towels and toiletries.",
  },
  {
    q: "Can I smoke on the property?",
    a: "No. Emma-Ike is a non-smoking guesthouse, inside the rooms and in shared areas.",
  },
  {
    q: "Which rooms have air-conditioning?",
    a: "Executive Rooms are air-conditioned. Standard Rooms aren’t, which keeps their rate lower. Both have a private bathroom, fridge and satellite TV.",
  },
  {
    q: "How do I find you?",
    a: `We’re in Mandela, directly opposite the Melcom shop in Agona Swedru. On Google Maps, search for Emma-Ike Guesthouse or use the plus code ${site.address.plusCode}.`,
  },
];
