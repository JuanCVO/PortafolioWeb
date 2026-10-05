"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const GRID = 56; // resolución del "sprite"
const LEVELS = 5; // niveles de color por canal

const stepEase = (t: number) => Math.floor(t * 4) / 4;

export default function ProfileAnimation({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(false);

  // Dibuja la foto a baja resolución y reduce la paleta → look de sprite pixelado
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      canvas.width = GRID;
      canvas.height = GRID;
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) * 0.5;
      const sy = (img.height - side) * 0.15;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, GRID, GRID);
      const data = ctx.getImageData(0, 0, GRID, GRID);
      for (let i = 0; i < data.data.length; i += 4) {
        for (let c = 0; c < 3; c++) {
          data.data[i + c] = Math.round((data.data[i + c] / 255) * (LEVELS - 1)) * (255 / (LEVELS - 1));
        }
      }
      ctx.putImageData(data, 0, 0);
      setReady(true);
    };
  }, [src]);

  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: stepEase }}
    >
      <div
        className="pixel-box relative h-40 w-40 overflow-hidden border-4 border-[#30363d] bg-[#0d1117] md:h-64 md:w-64"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title="Pasa el cursor para ver la foto real"
      >
        <Image
          src={src}
          alt={alt}
          width={260}
          height={260}
          className="h-full w-full object-cover object-[50%_15%]"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pixel-img absolute inset-0 h-full w-full transition-opacity duration-150"
          style={{ opacity: ready && !hover ? 1 : 0 }}
        />
      </div>

      <span className="font-pixel absolute -bottom-3 -right-3 border-2 border-[#30363d] bg-[#238636] px-2 py-1 text-[0.75rem] text-white shadow-[3px_3px_0_0_#010409]">
        LVL 9
      </span>
    </motion.div>
  );
}
