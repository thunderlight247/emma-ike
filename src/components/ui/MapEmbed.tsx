import { site } from "@/data/site";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] border border-line bg-paper ${className}`}>
      <iframe
        title={`Map showing ${site.name}, opposite Melcom in Agona Swedru`}
        src={site.mapsEmbedUrl}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
