"use client";

import Link from "next/link";

export default function TranslateButton({ lang }: { lang: "es" | "en" }) {
  return (
    <Link
      href={lang === "es" ? "/en" : "/"}
      className="pixel-btn font-display border border-[#30363d] bg-[#21262d] px-3 py-2 text-[0.9375rem] text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff]"
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      hrefLang={lang === "es" ? "en" : "es"}
    >
      {lang === "es" ? "EN" : "ES"}
    </Link>
  );
}
