"use client";

import { useEffect } from "react";

const COLORS = ["#58a6ff", "#3fb950", "#f7b955", "#f78166", "#a371f7"];
const PARTICLES = 12;

function burst(x: number, y: number) {
  for (let i = 0; i < PARTICLES; i++) {
    const size = Math.random() < 0.5 ? 4 : 6;
    const el = document.createElement("span");
    Object.assign(el.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: COLORS[i % COLORS.length],
      pointerEvents: "none",
      zIndex: "110",
    });
    document.body.appendChild(el);

    // Reparte las partículas en círculo con algo de azar y un empujón hacia abajo (gravedad)
    const angle = (Math.PI * 2 * i) / PARTICLES + Math.random() * 0.5;
    const distance = 24 + Math.random() * 28;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance + 14;

    const animation = el.animate(
      [
        { transform: "translate(-50%, -50%)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`, opacity: 0 },
      ],
      { duration: 520 + Math.random() * 180, easing: "steps(6, end)", fill: "forwards" }
    );
    animation.onfinish = () => el.remove();
  }
}

// Explosión de píxeles al hacer clic en cualquier botón o enlace
export default function PixelBurst() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointerDown = (e: PointerEvent) => {
      if (reduceMotion.matches || e.button !== 0) return;
      const target = e.target as Element | null;
      if (!target?.closest("a[href], button, [role='button']")) return;
      burst(e.clientX, e.clientY);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

  return null;
}
