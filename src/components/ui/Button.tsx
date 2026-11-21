import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-medium tracking-[-0.005em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-forest-deep active:bg-forest-deep",
  secondary: "border border-ink/20 text-ink hover:border-forest hover:text-forest",
  light: "bg-ivory text-forest hover:bg-wall",
  "ghost-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `${base} ${variants[variant]} ${extra}`;

interface ButtonLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", className = "", children, ...rest }: ButtonLinkProps) {
  const cls = buttonClass(variant, className);
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
