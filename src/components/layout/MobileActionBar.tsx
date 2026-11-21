import { site } from "@/data/site";
import { whatsappLink } from "@/lib/booking";

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={site.phoneHref}
          className="rounded-full border border-ink/20 py-3 text-center text-[0.9375rem] font-medium text-ink active:bg-paper"
        >
          Call front desk
        </a>
        <a
          href={whatsappLink(`Hello ${site.name}, I’d like to book a room.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-forest py-3 text-center text-[0.9375rem] font-medium text-ivory active:bg-forest-deep"
        >
          WhatsApp to book
        </a>
      </div>
    </div>
  );
}
