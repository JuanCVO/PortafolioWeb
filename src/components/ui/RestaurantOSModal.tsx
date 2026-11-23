"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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
  Package,
  ShoppingCart,
  Github,
} from "lucide-react";

interface Slide {
  key: string;
  img: string;
  label: { es: string; en: string };
  desc: { es: string; en: string };
  accent: string;
  Icon: React.ElementType;
}

const slides: Slide[] = [
  {
    key: "login",
    img: "/restaurantos/login.png",
    label: { es: "Inicio de sesión", en: "Sign in" },
    desc: {
      es: "Autenticación con JWT, roles (admin y empleado) y datos aislados por restaurante",
      en: "JWT authentication, roles (admin and employee) and per-restaurant data isolation",
    },
    accent: "#f97316",
    Icon: UtensilsCrossed,
  },
  {
    key: "dashboard",
    img: "/restaurantos/dashboard.png",
    label: { es: "Panel principal", en: "Dashboard" },
    desc: {
      es: "Ventas archivadas, caja del día, propinas e historial de cierres en un mismo panel",
      en: "Archived sales, daily cash, tips and closing history in one dashboard",
    },
    accent: "#58a6ff",
    Icon: LayoutDashboard,
  },
  {
    key: "mesas",
    img: "/restaurantos/mesas.png",
    label: { es: "Gestión de mesas", en: "Table management" },
    desc: {
      es: "Mesas disponibles u ocupadas, filtros y búsqueda para gestionar el salón",
      en: "Available and occupied tables, filters and search to manage the dining room",
    },
    accent: "#3fb950",
    Icon: Grid3x3,
  },
  {
    key: "inventario",
    img: "/restaurantos/inventario.png",
    label: { es: "Inventario", en: "Inventory" },
    desc: {
      es: "Productos por categoría con precio, existencias y alertas de stock bajo",
      en: "Products by category with prices, quantities and low-stock alerts",
    },
    accent: "#60a5fa",
    Icon: Package,
  },
  {
    key: "compras-gastos",
    img: "/restaurantos/compras-gastos.png",
    label: { es: "Compras y gastos", en: "Purchases and expenses" },
    desc: {
      es: "Registro de compras, gastos, base de caja y pagos a empleados",
      en: "Recording purchases, expenses, opening cash and employee payments",
    },
    accent: "#a78bfa",
    Icon: ShoppingCart,
  },
];

const techTags = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Prisma", "PostgreSQL"];

function ParallaxCard({ slide, lang }: { slide: Slide; lang: "es" | "en" }) {
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
        <div className="relative" style={{ aspectRatio: "1877/971" }}>
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
                  <span className="font-display text-[0.875rem] text-[#8b949e]">
                    {lang === "es" ? "Cargando..." : "Loading..."}
                  </span>
                </div>
              )}
              <Image
                src={slide.img}
                alt={slide.label[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
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
                <p className="font-semibold text-[#e6edf3]">{slide.label[lang]}</p>
                <p className="mt-1 text-xs text-[#8b949e]">RestaurantOS</p>
              </div>
              <p className="text-[0.8125rem] text-[#484f58] px-6 text-center">
                {lang === "es" ? "Captura no disponible" : "Screenshot unavailable"}
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

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
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handler);
      previouslyFocused?.focus();
    };
  }, [isOpen, prev, next]);

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
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="restaurantos-title"
            aria-describedby="restaurantos-description"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-x-3 top-1/2 z-50 -translate-y-1/2 mx-auto max-w-2xl"
          >
            <div className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-xl border border-[#30363d] bg-[#161b22] shadow-[0_24px_80px_rgba(0,0,0,0.8)]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#30363d] px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-500 p-2 shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                    <UtensilsCrossed className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span id="restaurantos-title" className="font-display text-[1rem] text-[#e6edf3]">RestaurantOS</span>
                      <span className="border border-[#30363d] px-1.5 py-0.5 text-[0.8125rem] text-[#8b949e]">{lang === "es" ? "Público" : "Public"}</span>
                      <span className="border border-[#f7b955]/60 bg-[#f7b955]/10 px-1.5 py-0.5 text-[0.8125rem] text-[#f7b955]">
                        {lang === "es" ? "En desarrollo" : "In development"}
                      </span>
                    </div>
                    <p id="restaurantos-description" className="mt-1 text-xs text-[#8b949e]">
                      {lang === "es"
                        ? "SaaS multi-tenant para gestión de restaurantes"
                        : "Multi-tenant restaurant management SaaS"}
                    </p>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="rounded-md p-1.5 text-[#8b949e] transition hover:bg-[#30363d] hover:text-[#e6edf3]"
                  aria-label={lang === "es" ? "Cerrar galería" : "Close gallery"}
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
                      <ParallaxCard slide={slide} lang={lang} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nav buttons */}
                <button
                  onClick={prev}
                  className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-[#30363d] bg-[#21262d] p-2 text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#e6edf3] shadow-lg"
                  aria-label={lang === "es" ? "Captura anterior" : "Previous screenshot"}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-[#30363d] bg-[#21262d] p-2 text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#e6edf3] shadow-lg"
                  aria-label={lang === "es" ? "Captura siguiente" : "Next screenshot"}
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
                    className="flex h-8 w-8 items-center justify-center"
                    aria-label={lang === "es" ? `Ver captura ${i + 1}` : `View screenshot ${i + 1}`}
                    aria-current={i === current ? "true" : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 transition-all duration-300"
                      style={{
                        width: i === current ? 24 : 6,
                        backgroundColor: i === current ? slides[i].accent : "#30363d",
                      }}
                    />
                  </button>
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
                    <div className="mb-0.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: slide.accent }} />
                        <p className="text-sm font-semibold text-[#e6edf3]">{slide.label[lang]}</p>
                      </div>
                      <a href={slide.img} target="_blank" rel="noopener noreferrer" className="text-xs text-[#58a6ff] underline-offset-2 hover:underline">
                        {lang === "es" ? "Ver tamaño completo" : "View full size"}
                      </a>
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
                      className="rounded-full border border-[#30363d] bg-[#0d1117] px-2 py-0.5 text-[0.8125rem] text-[#8b949e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/JuanCVO/restaurante-saas"
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
                <span className="text-[0.8125rem] text-[#484f58]">
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
