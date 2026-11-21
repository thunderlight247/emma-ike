"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Word-by-word blur-in headline (adapted from the React Bits BlurText
 * pattern) plus the staggered arrival of the elements marked
 * data-hero-anim inside the hero. The page's one orchestrated motion moment.
 */
export default function HeroHeadline({ text, scopeId }: { text: string; scopeId: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) return;
    const words = ref.current?.querySelectorAll("[data-word]") ?? [];
    const rest = scope.querySelectorAll("[data-hero-anim]:not(h1)");

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.set([ref.current, ...rest], { animation: "none" })
        .set(ref.current, { opacity: 1 })
        .fromTo(
          words,
          { opacity: 0, y: 28, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.3, stagger: 0.07 },
        )
        .fromTo(
          rest,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.9",
        );
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <h1
      ref={ref}
      data-hero-anim
      className="max-w-[14ch] font-display text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.95] font-medium tracking-[-0.025em] text-ivory"
    >
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} data-word className="inline-block whitespace-pre will-change-[filter,transform]">
          {word}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
