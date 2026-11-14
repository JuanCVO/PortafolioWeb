"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CV_FILENAME, CV_PATH, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/links";
import { stepped } from "@/lib/utils";

const copy = {
  es: {
    eyebrow: "contacto",
    title: "¿Construimos algo juntos?",
    body: "Busco un equipo donde aprender y aportar desde el frontend. Si tienes una vacante o un proyecto en mente, escríbeme.",
    write: "Escribir un correo",
    copy: "Copiar correo",
    copied: "¡Copiado!",
    cv: "Descargar CV",
    subject: "Hola Juan Camilo, vi tu portafolio",
    facts: ["Colombia · UTC-5", "Español nativo · Inglés B1"],
  },
  en: {
    eyebrow: "contact",
    title: "Want to build something together?",
    body: "I'm looking for a team where I can learn and contribute from the frontend. If you have an opening or a project in mind, get in touch.",
    write: "Send an email",
    copy: "Copy email",
    copied: "Copied!",
    cv: "Download CV",
    subject: "Hi Juan Camilo, I saw your portfolio",
    facts: ["Colombia · UTC-5", "Spanish native · English B1"],
  },
};

// Sobre en pixel art: cada celda de una cuadrícula de 16x12 es un cuadrado
const W = 16;
const H = 12;

function envelopeCell(row: number, col: number): string | null {
  if (row < 1 || row > 10 || col < 1 || col > 14) return null;
  if (row === 1 || row === 10 || col === 1 || col === 14) return "#e6edf3"; // contorno
  const d = row - 2;
  if (row <= 7 && (col === 2 + d || col === 13 - d)) return "#58a6ff"; // solapa
  return "#1c2128"; // papel
}

function PixelEnvelope() {
  const cells: React.ReactNode[] = [];
  for (let row = 0; row < H; row++) {
    for (let col = 0; col < W; col++) {
      const fill = envelopeCell(row, col);
      if (fill) cells.push(<rect key={`${row}-${col}`} x={col} y={row} width={1} height={1} fill={fill} />);
    }
  }

  return (
    <motion.div
      className="relative mb-4 h-12 w-16"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: stepped(4) }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} shapeRendering="crispEdges" className="h-full w-full" aria-hidden>
        {cells}
      </svg>
      <span className="blink absolute -right-1 -top-1 h-3 w-3 border-2 border-[#161b22] bg-[#f78166]" />
    </motion.div>
  );
}

export default function ContactCTA({ lang }: { lang: "es" | "en" }) {
  const t = copy[lang];
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      // Sin Clipboard API (http, navegadores viejos): copia con un textarea temporal
      const area = document.createElement("textarea");
      area.value = EMAIL;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      area.remove();
    }
    if (!ok) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const smallBtn =
    "pixel-btn font-display flex min-w-[8.5rem] flex-1 items-center justify-center gap-1.5 border border-[#30363d] bg-[#21262d] px-2 py-2.5 text-[0.875rem] hover:border-[#58a6ff] hover:text-[#58a6ff]";

  return (
    <section id="contact" className="mx-auto mt-10 max-w-6xl px-4">
      <ScrollReveal>
        <div className="pixel-box overflow-hidden border border-[#30363d] bg-[#161b22]">
          <div aria-hidden className="pixel-stripe h-2" />
          <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <PixelEnvelope />
              <p className="font-display text-[0.875rem] uppercase text-[#3fb950]">
                {"> "}
                {t.eyebrow}
                <span className="blink">_</span>
              </p>
              <h2 className="font-display mt-3 text-xl leading-snug text-[#e6edf3] md:text-3xl">{t.title}</h2>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#8b949e]">{t.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-[0.875rem] text-[#8b949e]">
                <li className="flex items-center gap-1.5 border border-[#30363d] bg-[#0d1117] px-2.5 py-1">
                  <MapPin className="h-3.5 w-3.5 text-[#58a6ff]" />
                  {t.facts[0]}
                </li>
                <li className="flex items-center gap-1.5 border border-[#30363d] bg-[#0d1117] px-2.5 py-1">
                  <Globe className="h-3.5 w-3.5 text-[#58a6ff]" />
                  {t.facts[1]}
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}`}
                className="pixel-btn pixel-shine font-display flex items-center justify-center gap-2 border border-[#238636] bg-[#238636] px-4 py-3.5 text-[0.9375rem] text-white hover:bg-[#2ea043]"
              >
                <Mail className="h-4 w-4" />
                {t.write}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={`pixel-btn font-display flex items-center justify-center gap-2 border px-4 py-3 text-[0.9375rem] ${
                  copied
                    ? "border-[#3fb950] bg-[#3fb950]/10 text-[#3fb950]"
                    : "border-[#30363d] bg-[#21262d] text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                }`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? t.copied : t.copy}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? t.copied : ""}
              </span>
              <p className="break-all text-center text-[0.875rem] text-[#6e7681]">{EMAIL}</p>

              <div className="flex flex-wrap gap-2">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={smallBtn}>
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={smallBtn}>
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
                <a href={CV_PATH} download={CV_FILENAME} className={smallBtn}>
                  <Download className="h-3.5 w-3.5" />
                  CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
