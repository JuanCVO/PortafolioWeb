"use client";

import { Book, FolderGit2, Package, Star } from "lucide-react";

type Tab = "overview" | "repositories" | "projects" | "stars";

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  counts: { repos: number; projects: number; stars: number };
  lang: "es" | "en";
}

export default function ProfileTabs({ active, onChange, counts, lang }: Props) {
  const tabs: {
    key: Tab;
    label: { es: string; en: string };
    icon: React.ElementType;
    count?: number;
  }[] = [
    { key: "overview", label: { es: "Resumen", en: "Overview" }, icon: Book },
    { key: "repositories", label: { es: "Repositorios", en: "Repositories" }, icon: FolderGit2, count: counts.repos },
    { key: "projects", label: { es: "Proyectos", en: "Projects" }, icon: Package, count: counts.projects },
    { key: "stars", label: { es: "Destacados", en: "Stars" }, icon: Star, count: counts.stars },
  ];

  return (
    <div className="sticky top-[57px] z-40 border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`relative flex items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-[#f78166] text-[#e6edf3] font-semibold"
                    : "border-transparent text-[#8b949e] hover:text-[#e6edf3]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label[lang]}
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-2 py-[1px] text-[10px] font-semibold transition ${
                      isActive ? "bg-[#30363d] text-[#e6edf3]" : "bg-[#21262d] text-[#8b949e]"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
