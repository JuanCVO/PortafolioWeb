"use client";

import { Book, FolderGit2, Package, Layers } from "lucide-react";

type Tab = "overview" | "repositories" | "projects" | "skills";

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  counts: { repos: number; projects: number; skills: number };
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
    { key: "skills", label: { es: "Stack", en: "Stack" }, icon: Layers, count: counts.skills },
  ];

  return (
    <div className="sticky top-14 z-40 border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`font-pixel relative flex items-center gap-2 whitespace-nowrap border-b-4 px-3 py-3 text-[0.8125rem] ${
                  isActive
                    ? "border-[#f78166] text-[#e6edf3]"
                    : "border-transparent text-[#8b949e] hover:text-[#e6edf3]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label[lang]}
                {tab.count !== undefined && (
                  <span
                    className={`border px-1.5 py-[1px] text-[0.75rem] ${
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
      </div>
    </div>
  );
}
