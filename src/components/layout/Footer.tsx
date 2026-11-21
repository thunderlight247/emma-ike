import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/booking";
import Container from "@/components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-deep text-ivory/80">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <p className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.02em] text-ivory">
            Emma-Ike
          </p>
          <p className="mt-2 text-ivory/70">Guesthouse, Agona Swedru</p>
          <p className="mt-8 max-w-[34ch]">
            Clean, affordable rooms opposite Melcom in Mandela, with someone at the front desk day and night.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-medium text-ivory">Find us</h2>
          <address className="mt-4 not-italic">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region}
            <br />
            Plus code {site.address.plusCode}
          </address>
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-ivory underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-medium text-ivory">Contact</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={site.phoneHref} className="hover:text-ivory">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                WhatsApp
              </a>
            </li>
            <li>Front desk open 24 hours</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-medium text-ivory">Stay</h2>
          <ul className="mt-4 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>Check-in {site.checkIn.label}</li>
            <li>Check-out {site.checkOut.label}</li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-ivory/15 py-6 pb-28 text-sm text-ivory/60 md:flex-row md:justify-between md:pb-6">
        <p>
          © {year} {site.name}
        </p>
        <p>Room and dining photos are illustrative.</p>
      </Container>
    </footer>
  );
}
