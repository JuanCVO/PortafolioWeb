"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateData(): number[][] {
  const rand = seededRandom(42);
  const weeks: number[][] = [];
  for (let w = 0; w < 53; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const isWeekend = d === 0 || d === 6;
      const weekendFactor = isWeekend ? 0.4 : 1;
      const recentFactor = w > 40 ? 1.4 : w > 20 ? 1 : 0.7;
      const r = rand() * weekendFactor * recentFactor;

      if (r < 0.35) week.push(0);
      else if (r < 0.6) week.push(1);
      else if (r < 0.8) week.push(2);
      else if (r < 0.93) week.push(3);
      else week.push(4);
    }
    weeks.push(week);
  }
  return weeks;
}

function cellCount(week: number, day: number, level: number): number {
  if (level === 0) return 0;
  return level * 2 + ((week + day) % 4);
}

const MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ContributionGraph({ lang }: { lang: "es" | "en" }) {
  const data = useMemo(() => generateData(), []);
  const total = useMemo(
    () => data.flat().reduce((sum, v) => sum + cellCount(0, 0, v), 0),
    [data]
  );
  const [hovered, setHovered] = useState<{ w: number; d: number; level: number } | null>(null);

  const months = lang === "es" ? MONTHS_ES : MONTHS_EN;

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          <div className="flex gap-[3px] pl-9 mb-1">
            {months.map((m) => (
              <div
                key={m}
                className="text-[10px] text-[#8b949e] font-mono"
                style={{ width: `${Math.floor(53 / 12) * 13}px`, minWidth: `${Math.floor(53 / 12) * 13}px` }}
              >
                {m}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col gap-[3px] pr-2 pt-[1px] text-[10px] text-[#8b949e] font-mono">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-[11px] leading-[11px]">
                  {i === 1 && (lang === "es" ? "Lun" : "Mon")}
                  {i === 3 && (lang === "es" ? "Mié" : "Wed")}
                  {i === 5 && (lang === "es" ? "Vie" : "Fri")}
                </div>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {data.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <motion.div
                      key={di}
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: (wi + di) * 0.006,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      onMouseEnter={() => setHovered({ w: wi, d: di, level })}
                      onMouseLeave={() => setHovered(null)}
                      className="h-[11px] w-[11px] rounded-[2px] cursor-pointer transition-all hover:ring-1 hover:ring-[#e6edf3] hover:scale-125"
                      style={{ backgroundColor: COLORS[level] }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-[#8b949e]">
        <span>
          {hovered ? (
            <>
              <span className="font-semibold text-[#e6edf3]">
                {cellCount(hovered.w, hovered.d, hovered.level)}
              </span>{" "}
              {lang === "es" ? "contribuciones" : "contributions"}
            </>
          ) : (
            <>
              <span className="font-semibold text-[#e6edf3]">{total}+</span>{" "}
              {lang === "es" ? "contribuciones en el último año" : "contributions in the last year"}
            </>
          )}
        </span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>{lang === "es" ? "Menos" : "Less"}</span>
          {COLORS.map((c, i) => (
            <div key={i} className="h-[11px] w-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          <span>{lang === "es" ? "Más" : "More"}</span>
        </div>
      </div>
    </div>
  );
}
