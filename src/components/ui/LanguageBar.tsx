"use client";

import { motion } from "framer-motion";

interface LangEntry {
  name: string;
  percent: number;
  color: string;
}

const langs: LangEntry[] = [
  { name: "TypeScript", percent: 62, color: "#3178c6" },
  { name: "JavaScript", percent: 18, color: "#f1e05a" },
  { name: "Python", percent: 10, color: "#3572A5" },
  { name: "CSS", percent: 7, color: "#563d7c" },
  { name: "HTML", percent: 3, color: "#e34c26" },
];

export default function LanguageBar() {
  return (
    <div className="w-full">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#0d1117] ring-1 ring-[#30363d]">
        {langs.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ width: 0 }}
            animate={{ width: `${l.percent}%` }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: l.color }}
            className="h-full"
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {langs.map((l) => (
          <div key={l.name} className="flex items-center gap-1.5 text-xs">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="font-medium text-[#e6edf3]">{l.name}</span>
            <span className="text-[#8b949e]">{l.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
