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
    desc: { es: "Construye RestaurantOS, un SaaS multi-tenant", en: "Building RestaurantOS, a multi-tenant SaaS" },
    color: "#58a6ff",
  },
  {
    icon: Code2,
    label: { es: "Full Stack", en: "Full Stack" },
    desc: { es: "Next.js, Express y Prisma de punta a punta", en: "Next.js, Express and Prisma end to end" },
    color: "#a371f7",
  },
  {
    icon: GraduationCap,
    label: { es: "Univalle", en: "Univalle" },
    desc: { es: "9.º semestre de Ingeniería de Sistemas", en: "9th semester of Systems Engineering" },
    color: "#3fb950",
  },
  {
    icon: Zap,
    label: { es: "AI-900", en: "AI-900" },
    desc: { es: "Microsoft AI-900 en preparación", en: "Microsoft AI-900 in preparation" },
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
            whileHover={{ y: -3 }}
            className="group relative flex flex-col items-center"
            title={a.desc[lang]}
          >
            <div
              className="flex h-11 w-11 items-center justify-center border-2 cursor-help"
              style={{
                borderColor: `${a.color}99`,
                backgroundColor: `${a.color}1c`,
                boxShadow: "3px 3px 0 0 #010409",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: a.color }} />
            </div>
            <span className="mt-1.5 text-[0.75rem] text-[#8b949e] group-hover:text-[#e6edf3] transition-colors text-center leading-tight">
              {a.label[lang]}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
