"use client";

import { useState } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";

// [slug de Simple Icons, color, nombre]. Los íconos oscuros se aclaran para el fondo oscuro.
const icons: [string, string, string][] = [
  ["react", "61DAFB", "React"],
  ["nextdotjs", "FFFFFF", "Next.js"],
  ["typescript", "3178C6", "TypeScript"],
  ["html5", "E34C26", "HTML"],
  ["css", "7E57C2", "CSS"],
  ["vuedotjs", "42B883", "Vue.js"],
  ["tailwindcss", "38BDF8", "Tailwind CSS"],
  ["framer", "FF4F9C", "Framer Motion"],
  ["zod", "5B8DEF", "Zod"],
  ["reacthookform", "EC5990", "React Hook Form"],
  ["shadcnui", "E6EDF3", "shadcn/ui"],
  ["nodedotjs", "68A063", "Node.js"],
  ["express", "E6EDF3", "Express"],
  ["prisma", "8B9BFF", "Prisma"],
  ["jsonwebtokens", "D63AFF", "JWT"],
  ["php", "777BB4", "PHP"],
  ["postgresql", "5B8DD6", "PostgreSQL"],
  ["python", "4B8BBE", "Python"],
  ["pandas", "E70488", "Pandas"],
  ["numpy", "4DABCF", "NumPy"],
  ["git", "F05032", "Git"],
  ["github", "E6EDF3", "GitHub"],
  ["jira", "2684FF", "Jira"],
  ["vercel", "FFFFFF", "Vercel"],
  ["claude", "D97757", "Claude Code"],
  ["githubcopilot", "A371F7", "GitHub Copilot"],
  ["jest", "E5534B", "Jest"],
  ["docker", "2496ED", "Docker"],
];

const images = icons.map(([slug, color]) => `https://cdn.simpleicons.org/${slug}/${color}`);

export default function TechCloud({ lang }: { lang: "es" | "en" }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // El que está bajo el cursor tiene prioridad; si no, el último que se tocó
  const shown = hovered ?? selected;
  const current = shown !== null ? icons[shown] : null;

  return (
    <div className="mb-6 flex flex-col items-center gap-3 border border-dashed border-[#30363d] bg-[#0d1117] px-3 py-5">
      <IconCloud
        images={images}
        onHover={setHovered}
        onSelect={setSelected}
        label={lang === "es" ? "Nube 3D interactiva de tecnologías" : "Interactive 3D technology cloud"}
        playLabel={lang === "es" ? "Reanudar animación" : "Resume animation"}
        pauseLabel={lang === "es" ? "Pausar animación" : "Pause animation"}
      />
      {/* Altura fija para que el layout no salte al aparecer el nombre */}
      <p
        className="font-display h-5 text-[1rem]"
        style={{ color: current ? `#${current[1]}` : undefined }}
        aria-live="polite"
      >
        {current ? current[2] : ""}
      </p>
    </div>
  );
}
