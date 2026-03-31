"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileAnimation({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -5, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={260}
        height={260}
        className="h-40 w-40 rounded-full border-4 border-[#30363d]/50 shadow-2xl object-cover object-[50%_15%] md:h-64 md:w-64"
      />
      
      {/* Anillo flotante */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#58a6ff]/30 bg-gradient-to-r from-[#58a6ff]/10"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
        transition={{ 
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
      
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#58a6ff]/20 via-transparent blur-xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}