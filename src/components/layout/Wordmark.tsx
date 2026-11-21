import Link from "next/link";

export default function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex flex-col leading-none" aria-label="Emma-Ike Guesthouse, home">
      <span
        className={`font-display text-[1.75rem] font-semibold tracking-[-0.02em] transition-colors ${
          light ? "text-ivory" : "text-ink group-hover:text-forest"
        }`}
      >
        Emma-Ike
      </span>
      <span className={`mt-1 text-[0.75rem] tracking-[0.02em] ${light ? "text-ivory/75" : "text-stone"}`}>
        Guesthouse, Agona Swedru
      </span>
    </Link>
  );
}
