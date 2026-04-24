"use client";

interface Props {
  lang: "es" | "en";
}

export default function StatusPill({ lang }: Props) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#3fb95040] bg-[#3fb95015] px-2.5 py-1 text-[11px] text-[#3fb950]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
      </span>
      {lang === "es" ? "Disponible para oportunidades" : "Available for opportunities"}
    </div>
  );
}
