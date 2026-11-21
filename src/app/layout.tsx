import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { amenities, roomFeatures } from "@/data/amenities";
import { rooms, lowestRate } from "@/data/rooms";
import { propertyPhoto } from "@/data/media";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import BookingProvider from "@/components/booking/BookingProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Rooms opposite Melcom, Agona Swedru`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: site.name,
    title: `${site.name}, Agona Swedru`,
    description: site.description,
    images: [{ url: propertyPhoto.src, width: 800, height: 500, alt: propertyPhoto.alt }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1b4332",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${site.url}/#lodging`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: [`${site.url}${propertyPhoto.src}`],
  telephone: site.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsLink,
  checkinTime: site.checkIn.iso,
  checkoutTime: site.checkOut.iso,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  smokingAllowed: false,
  currenciesAccepted: "GHS",
  priceRange: `From GHS ${lowestRate} per night`,
  amenityFeature: [...amenities.map((a) => a.schemaName), ...roomFeatures].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  containsPlace: rooms.map((r) => ({
    "@type": "HotelRoom",
    name: r.name,
    bed: r.bed,
    occupancy: { "@type": "QuantitativeValue", maxValue: r.maxAdults + r.maxChildren },
    amenityFeature: r.features.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <BookingProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileActionBar />
          </BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
