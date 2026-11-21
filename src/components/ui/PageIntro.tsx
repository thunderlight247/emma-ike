import type { ReactNode } from "react";
import Container from "./Container";

export default function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="pt-36 pb-14 md:pt-48 md:pb-20">
      <Container className="grid gap-8 md:grid-cols-12 md:items-end">
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.025em] md:col-span-7">
          {title}
        </h1>
        {children && <div className="max-w-[46ch] text-lg text-stone md:col-span-5">{children}</div>}
      </Container>
    </section>
  );
}
