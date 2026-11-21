export const site = {
  name: "Emma-Ike Guesthouse",
  shortName: "Emma-Ike",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Clean, affordable en-suite rooms directly opposite Melcom in Mandela, Agona Swedru. Air-conditioned and standard rooms, an on-site restaurant and bar, free parking and a 24-hour front desk.",

  phoneDisplay: "+233 24 475 4107",
  phoneHref: "tel:+233244754107",
  phoneE164: "+233244754107",
  /** Digits only, international format. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233244754107",

  address: {
    street: "Opposite Swedru Melcom Shop, Mandela",
    locality: "Agona Swedru",
    region: "Central Region",
    country: "Ghana",
    countryCode: "GH",
    plusCode: "G8P3+M3M",
  },
  geo: { lat: 5.536706, lng: -0.6973404 },

  checkIn: { label: "from 12:30 PM", iso: "12:30" },
  checkOut: { label: "by 12:00 PM", iso: "12:00" },

  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
    "https://maps.google.com/maps?q=5.536706,-0.6973404&z=17&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Emma-Ike+Guesthouse+Agona+Swedru",

  /** Approximate road times; traffic around Kasoa can add more. */
  landmarks: [
    { place: "Winneba", time: "About 30 min", note: "South on the Swedru–Winneba road" },
    { place: "Kasoa", time: "About 1 hr", note: "Via the Winneba junction on the N1" },
    { place: "Accra (Kaneshie)", time: "About 1 hr 45 min", note: "Allow longer at peak hours" },
    { place: "Cape Coast", time: "About 1 hr 45 min", note: "West along the N1 coastal highway" },
  ],

  nav: [
    { href: "/rooms", label: "Rooms & rates" },
    { href: "/services", label: "Dining & services" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
