"use client";

import { Rocket, GraduationCap, Code2, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  lang: "es" | "en";
}

const achievements = [
  {
    icon: Rocket,
    label: { es: "SaaS Builder", en: "SaaS Builder" },
    desc: { es: "Construyó y desplegó RestaurantOS", en: "Built and deployed RestaurantOS" },
    color: "#58a6ff",
  },
  {
    icon: Code2,
    label: { es: "Full Stack", en: "Full Stack" },
    desc: { es: "Frontend y backend con TypeScript", en: "Frontend and backend with TypeScript" },
    color: "#a371f7",
  },
  {
    icon: GraduationCap,
    label: { es: "Univalle", en: "Univalle" },
    desc: { es: "Estudiante de Ingeniería en Sistemas", en: "Systems Engineering student" },
    color: "#3fb950",
  },
  {
    icon: Zap,
    label: { es: "Fast Learner", en: "Fast Learner" },
    desc: { es: "Siempre aprendiendo nuevas tecnologías", en: "Always learning new technologies" },
    color: "#f7b955",
  },
];

export default function AchievementBadges({ lang }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {achievements.map((a, i) => {
        const Icon = a.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            className="group relative flex flex-col items-center"
            title={a.desc[lang]}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 cursor-help group-hover:shadow-lg"
              style={{
                borderColor: `${a.color}55`,
                background: `radial-gradient(circle at 30% 30%, ${a.color}28, ${a.color}10)`,
              }}
            >
              <Icon className="h-4 w-4" style={{ color: a.color }} />
            </div>
            <span className="mt-1.5 text-[9.5px] text-[#8b949e] group-hover:text-[#e6edf3] transition-colors text-center leading-tight">
              {a.label[lang]}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
