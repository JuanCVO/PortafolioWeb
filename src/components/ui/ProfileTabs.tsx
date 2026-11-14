"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Book, FolderGit2, Package, Layers, History, Mail } from "lucide-react";

export type Tab = "overview" | "repositories" | "projects" | "skills" | "background" | "contact";

export const TAB_LABELS: Record<Tab, { es: string; en: string }> = {
  overview: { es: "Resumen", en: "Overview" },
  repositories: { es: "Repositorios", en: "Repositories" },
  projects: { es: "Proyectos", en: "Projects" },
  skills: { es: "Stack", en: "Stack" },
  background: { es: "Trayectoria", en: "Background" },
  contact: { es: "Contacto", en: "Contact" },
};

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  counts: { repos: number; projects: number; skills: number };
  lang: "es" | "en";
}

export default function ProfileTabs({ active, onChange, counts, lang }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const tabs: { key: Tab; icon: React.ElementType; count?: number }[] = [
    { key: "overview", icon: Book },
    { key: "repositories", icon: FolderGit2, count: counts.repos },
    { key: "projects", icon: Package, count: counts.projects },
    { key: "skills", icon: Layers, count: counts.skills },
    { key: "background", icon: History },
    { key: "contact", icon: Mail },
  ];

  // En pantallas angostas la fila se desplaza: mantiene la pestaña activa centrada
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !current || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active, reduceMotion]);

  return (
    <div id="profile-tabs" className="sticky top-14 z-40 border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-md">
      <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className="mx-auto max-w-6xl px-4">
        <div ref={listRef} className="no-scrollbar relative flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                aria-current={isActive ? "true" : undefined}
                className={`font-display relative flex items-center gap-2 whitespace-nowrap border-b-4 px-2.5 py-3 text-[0.875rem] ${
                  isActive
                    ? "border-[#f78166] text-[#e6edf3]"
                    : "border-transparent text-[#8b949e] hover:text-[#e6edf3]"
                }`}
              >
                <Icon className="h-4 w-4 lg:max-xl:hidden" />
                {TAB_LABELS[tab.key][lang]}
                {tab.count !== undefined && (
                  <span
                    className={`border px-1.5 py-[1px] text-[0.75rem] lg:max-xl:hidden ${
                      isActive
                        ? "border-[#30363d] bg-[#30363d] text-[#e6edf3]"
                        : "border-[#21262d] bg-[#21262d] text-[#8b949e]"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
