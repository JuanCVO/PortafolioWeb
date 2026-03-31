"use client";

export default function TranslateButton({ lang, setLang }: { lang: "es" | "en"; setLang: (v: "es" | "en") => void }) {
  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs font-medium text-[#e6edf3] transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}