"use client";

import { motion } from "framer-motion";

type Tech = { name: string; color: string };
type TechGroup = {
  key: string;
  title: { es: string; en: string };
  learning?: boolean;
  items: Tech[];
};

export const techGroups: TechGroup[] = [
  {
    key: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "React", color: "#61dafb" },
      { name: "Next.js", color: "#ffffff" },
      { name: "TypeScript", color: "#3178c6" },
      { name: "HTML", color: "#e34c26" },
      { name: "CSS", color: "#7e57c2" },
      { name: "Vue.js", color: "#42b883" },
      { name: "Tailwind CSS", color: "#38bdf8" },
      { name: "shadcn/ui", color: "#e6edf3" },
      { name: "Framer Motion", color: "#ff4f9c" },
      { name: "React Hook Form", color: "#ec5990" },
      { name: "Zod", color: "#5b8def" },
    ],
  },
  {
    key: "backend",
    title: { es: "Backend", en: "Backend" },
    items: [
      { name: "Node.js", color: "#68a063" },
      { name: "Express", color: "#e6edf3" },
      { name: "Prisma", color: "#5a67d8" },
      { name: "APIs REST", color: "#58a6ff" },
      { name: "Microservicios", color: "#a371f7" },
      { name: "JWT", color: "#d63aff" },
      { name: "PHP", color: "#777bb4" },
    ],
  },
  {
    key: "data",
    title: { es: "Datos", en: "Data" },
    items: [
      { name: "SQL", color: "#f7b955" },
      { name: "PostgreSQL", color: "#5b8dd6" },
      { name: "NoSQL", color: "#3fb950" },
      { name: "Python", color: "#4b8bbe" },
      { name: "Pandas", color: "#e70488" },
      { name: "NumPy", color: "#4dabcf" },
    ],
  },
  {
    key: "tools",
    title: { es: "Herramientas", en: "Tools" },
    items: [
      { name: "Git y GitHub", color: "#f05032" },
      { name: "Jira", color: "#2684ff" },
      { name: "Vercel", color: "#ffffff" },
    ],
  },
  {
    key: "ai",
    title: { es: "IA en mi flujo de trabajo", en: "AI in my workflow" },
    items: [
      { name: "Claude Code", color: "#d97757" },
      { name: "GitHub Copilot", color: "#a371f7" },
      { name: "Azure AI (AI-900)", color: "#0078d4" },
    ],
  },
  {
    key: "learning",
    title: { es: "Aprendiendo ahora", en: "Learning now" },
    learning: true,
    items: [
      { name: "Jest", color: "#e5534b" },
      { name: "Playwright", color: "#2ead33" },
      { name: "React Native", color: "#61dafb" },
      { name: "APIs de LLM", color: "#f7b955" },
      { name: "Docker", color: "#2496ed" },
      { name: "MCP", color: "#d97757" },
    ],
  },
];

export const techCount = new Set(techGroups.flatMap((g) => g.items.map((t) => t.name))).size;

export default function TechStack({ lang }: { lang: "es" | "en" }) {
  let index = 0;
  return (
    <div className="space-y-5">
      {techGroups.map((group) => (
        <div key={group.key}>
          <h3
            className={`font-display mb-2.5 text-[0.875rem] uppercase ${
              group.learning ? "text-[#3fb950]" : "text-[#8b949e]"
            }`}
          >
            {group.learning ? "> " : ""}
            {group.title[lang]}
            {group.learning && <span className="blink">_</span>}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((t) => (
              <motion.span
                key={t.name}
                className={`pixel-btn inline-flex cursor-default items-center gap-2 border bg-[#0d1117] px-2.5 py-1.5 text-xs font-medium text-[#e6edf3] ${
                  group.learning ? "border-dashed border-[#3fb950]/60" : "border-[#30363d]"
                }`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index++ * 0.02 }}
              >
                <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: t.color }} />
                {t.name}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
