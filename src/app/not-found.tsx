import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-32 pb-24">
      <Container>
        <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-medium tracking-[-0.02em]">
          This page doesn’t exist.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-stone">
          The link may be old or mistyped. Head back to the home page or see our rooms.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to home page</ButtonLink>
          <ButtonLink href="/rooms" variant="secondary">
            See rooms
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
