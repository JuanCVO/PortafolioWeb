import { motion } from "framer-motion"; 


export default function TechStack() {
  const techs = [
    // Tu stack actual (mantengo todo)
    { name: "React", color: "#61dafb" },
    { name: "Next.js", color: "#000000" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Node.js", color: "#3c873a" },
    { name: "Express", color: "#4154b1" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "Prisma", color: "#0c719f" },
    { name: "Tailwind CSS", color: "#38bdf8" },
    
    // Frontend + herramientas modernas
    { name: "shadcn/ui", color: "#ffffff" },
    { name: "Framer Motion", color: "#ff4f9c" },
    { name: "Zustand", color: "#ff5e5b" },
    
    // Backend + DevOps
    { name: "Docker", color: "#2496ed" },
    { name: "Vercel", color: "#000000" },
    { name: "Git", color: "#f05032" },
    
    // Data/ML (tu experiencia)
    { name: "Python", color: "#3776ab" },
    { name: "Pandas", color: "#150458" },
    { name: "NumPy", color: "#013243" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((t, i) => (
        <motion.span
          key={t.name}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#30363d]/50 bg-[#0d1117]/50 px-3 py-1.5 text-xs font-medium text-[#e6edf3] shadow-md backdrop-blur-sm hover:scale-105 transition-all duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(88, 166, 255, 0.3)" }}
        >
          <span 
            className="h-2.5 w-2.5 rounded-full shrink-0" 
            style={{ backgroundColor: t.color }} 
          />
          {t.name}
        </motion.span>
      ))}
    </div>
  );
}