import type { MediaItem } from "@/data/media";
import SmartImage from "./SmartImage";

interface MediaImageProps {
  item: MediaItem;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Fills its (relatively positioned) parent with a MediaItem. */
export default function MediaImage({ item, sizes, priority, className = "" }: MediaImageProps) {
  return (
    <SmartImage
      src={item.src}
      fallbackSrc={item.fallback}
      alt={item.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
