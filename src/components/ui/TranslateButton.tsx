"use client";

export default function TranslateButton({ lang, setLang }: { lang: "es" | "en"; setLang: (v: "es" | "en") => void }) {
  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="pixel-btn font-display border border-[#30363d] bg-[#21262d] px-3 py-2 text-[0.9375rem] text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff]"
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
