"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  LayoutDashboard,
  Grid3x3,
  ShoppingCart,
  Github,
} from "lucide-react";

interface Slide {
  key: string;
  img: string;
  label: string;
  desc: { es: string; en: string };
  accent: string;
  Icon: React.ElementType;
}

const slides: Slide[] = [
  {
    key: "login",
    img: "/restaurantos/login.png",
    label: "Inicio de sesión",
    desc: {
      es: "Autenticación segura con roles y credenciales por restaurante",
      en: "Secure authentication with roles and restaurant credentials",
    },
    accent: "#f97316",
    Icon: UtensilsCrossed,
  },
  {
    key: "dashboard",
    img: "/restaurantos/dashboard.png",
    label: "Dashboard",
    desc: {
      es: "Métricas en tiempo real: pedidos activos, mesas, ingresos y propinas del día",
      en: "Real-time metrics: active orders, tables, daily revenue and tips",
    },
    accent: "#58a6ff",
    Icon: LayoutDashboard,
  },
  {
    key: "mesas",
    img: "/restaurantos/mesas.png",
    label: "Gestión de Mesas",
    desc: {
      es: "Vista visual del salón con estado de disponibilidad u ocupación en tiempo real",
      en: "Visual floor view with real-time availability and occupancy status",
    },
    accent: "#3fb950",
    Icon: Grid3x3,
  },
  {
    key: "gastos",
    img: "/restaurantos/gastos.png",
    label: "Compras y Gastos",
    desc: {
      es: "Control de compras, base de caja, gastos operativos y pagos a empleados",
      en: "Purchase control, cash base, operating expenses and employee payments",
    },
    accent: "#a78bfa",
    Icon: ShoppingCart,
  },
];

const techTags = ["Next.js", "TypeScript", "Tailwind CSS", "LocalStorage", "Framer Motion"];

function ParallaxCard({ slide }: { slide: Slide }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, visible: false });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 350,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 350,
    damping: 28,
  });
  const scale = useSpring(1, { stiffness: 350, damping: 28 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setGlare({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        visible: true,
      });
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
    setGlare((g) => ({ ...g, visible: false }));
  }, [mouseX, mouseY, scale]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.015);
  }, [scale]);

  const { Icon } = slide;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: "1100px" }}
      className="w-full select-none cursor-default"
    >
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="relative" style={{ aspectRatio: "16/9" }}>
          {!imgError ? (
            <>
              {!imgLoaded && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#161b22]"
                >
                  <div
                    className="rounded-2xl p-4 animate-pulse"
                    style={{
                      backgroundColor: `${slide.accent}18`,
                      border: `1px solid ${slide.accent}35`,
                    }}
                  >
                    <Icon className="h-12 w-12" style={{ color: slide.accent }} />
                  </div>
                  <span className="text-xs text-[#8b949e]">
                    Agrega la imagen en /public/restaurantos/{slide.key}.png
                  </span>
                </div>
              )}
              <img
                src={slide.img}
                alt={slide.label}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 bg-[#161b22] h-full">
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: `${slide.accent}15`,
                  border: `1px solid ${slide.accent}35`,
                  boxShadow: `0 0 30px ${slide.accent}18`,
                }}
              >
                <Icon className="h-14 w-14" style={{ color: slide.accent }} />
              </div>
              <div className="text-center px-4">
                <p className="font-semibold text-[#e6edf3]">{slide.label}</p>
                <p className="mt-1 text-xs text-[#8b949e] font-mono">restauranteOS</p>
              </div>
              <p className="text-[10px] text-[#484f58] px-6 text-center">
                Coloca la captura en /public/restaurantos/{slide.key}.png
              </p>
            </div>
          )}
        </div>

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${slide.accent}, transparent)`, opacity: glare.visible ? 1 : 0.4 }}
        />

        {/* Glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200"
          style={{
            opacity: glare.visible ? 1 : 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.07) 0%, transparent 55%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: "es" | "en";
}

export default function RestaurantOSModal({ isOpen, onClose, lang }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i + 1) % slides.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, prev, next]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const slide = slides[current];

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-x-3 top-1/2 z-50 -translate-y-1/2 mx-auto max-w-2xl"
          >
            <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-[0_24px_80px_rgba(0,0,0,0.8)]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#30363d] px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-500 p-2 shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                    <UtensilsCrossed className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#e6edf3]">restauranteOS</span>
                      <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] text-[#8b949e]">Public</span>
                    </div>
                    <p className="text-xs text-[#8b949e]">
                      {lang === "es"
                        ? "SaaS para gestión de restaurantes"
                        : "Restaurant management SaaS"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md p-1.5 text-[#8b949e] transition hover:bg-[#30363d] hover:text-[#e6edf3]"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Carousel */}
              <div className="relative px-5 pt-5 pb-3">
                <div className="relative overflow-hidden">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <ParallaxCard slide={slide} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nav buttons */}
                <button
                  onClick={prev}
                  className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-[#30363d] bg-[#21262d] p-2 text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#e6edf3] shadow-lg"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-[#30363d] bg-[#21262d] p-2 text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#e6edf3] shadow-lg"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1.5 pb-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 24 : 6,
                      backgroundColor: i === current ? slides[i].accent : "#30363d",
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Caption */}
              <div className="border-t border-[#30363d] px-5 py-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: slide.accent }} />
                      <p className="text-sm font-semibold text-[#e6edf3]">{slide.label}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-[#8b949e] pl-3.5">
                      {slide.desc[lang]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-[#30363d] px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#30363d] bg-[#0d1117] px-2 py-0.5 text-[10px] text-[#8b949e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/JuanCVO/restauranteOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
                >
                  <Github className="h-3.5 w-3.5" />
                  {lang === "es" ? "Ver código" : "View code"}
                </a>
              </div>

              {/* Keyboard hint */}
              <div className="flex justify-center pb-3">
                <span className="text-[10px] text-[#484f58] font-mono">
                  ← → {lang === "es" ? "navegar" : "navigate"} · ESC {lang === "es" ? "cerrar" : "close"}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
