"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SmartImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

/**
 * next/image with a two-step fallback: primary src, then fallbackSrc, then a
 * neutral colour block. Prevents broken-image icons if a file or remote photo
 * is missing.
 */
export default function SmartImage({ src, alt, fallbackSrc, className, fill, ...rest }: SmartImageProps) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const current = stage === 0 ? src : stage === 1 && fallbackSrc ? fallbackSrc : null;

  if (!current) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`block bg-wall ${fill ? "absolute inset-0" : "h-full w-full"}`}
      />
    );
  }

  return (
    <Image
      {...rest}
      key={current}
      src={current}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setStage((s) => (s === 0 && fallbackSrc ? 1 : 2))}
    />
  );
}
