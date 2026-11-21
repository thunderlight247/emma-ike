import { faqs } from "@/data/faq";

export default function Faq() {
  return (
    <div className="border-t border-line">
      {faqs.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex items-baseline justify-between gap-6 py-5 text-lg font-medium text-ink transition-colors hover:text-forest">
            <span>{item.q}</span>
            <span aria-hidden="true" className="faq-sign shrink-0 font-display text-2xl leading-none text-forest" />
          </summary>
          <p className="max-w-[60ch] pb-6 text-stone">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
