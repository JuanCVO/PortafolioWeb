"use client";

import { useState } from "react";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Code2,
  FileText,
  Pin,
  Wrench,
  Briefcase,
  GraduationCap,
  Globe,
  Trophy,
  Building2,
  Sparkles,
} from "lucide-react";
import TranslateButton from "@/components/ui/TranslateButton";
import TechStack from "@/components/ui/TechStack";
import RepoCard from "@/components/ui/RepoCard";
import ScrambleText from "@/components/ui/ScrambleText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileAnimation from "@/components/ui/ProfileAnimation";
import RestaurantOSModal from "@/components/ui/RestaurantOSModal";
import ProfileTabs from "@/components/ui/ProfileTabs";
import AchievementBadges from "@/components/ui/AchievementBadges";
import StatusPill from "@/components/ui/StatusPill";

type Tab = "overview" | "repositories" | "projects" | "stars";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [restaurantOSOpen, setRestaurantOSOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const t = {
    es: {
      role: "Software Developer · Ingeniería en Sistemas",
      bio: "Construyo software útil para negocios reales. Me enfoco en desarrollo web con Next.js y React, creando interfaces limpias y sistemas funcionales como RestaurantOS. Estoy aprendiendo backend con Node.js y bases de datos, y me apasiona mejorar la experiencia de usuario en cada proyecto.",
      location: "Tuluá, Valle del Cauca, Colombia",
      repos: "Repositorios destacados",
      experience: "Experiencia",
      education: "Educación",
      skills: "Stack técnico",
      languages: "Idiomas",
      downloadCV: "Descargar CV",
      readme: "README.md",
      topLanguages: "Lenguajes principales",
      achievements: "Logros",
      organizations: "Organización",
      pinned: "Destacados",
      readmeBody:
        "Hola, soy Juan Camilo VO. Tecnólogo en Desarrollo de Software de la Universidad del Valle y estudiante de Ingeniería en Sistemas. Me apasiona construir soluciones reales como RestaurantOS y explorar nuevas tecnologías. Quiero dominar arquitecturas modernas, aprender Rust o Go para backend de alto rendimiento, y crear productos que impacten de verdad. Mi meta: pasar de construir apps locales a soluciones escalables que lleguen a miles.",
      expJob: "Analista de Datos – JM La Distribuidora",
      expPeriod: "Feb 2020 – Dic 2021",
      expTasks: [
        "Procesamiento y análisis de datos con Pandas, NumPy y Excel.",
        "Automatización de reportes estratégicos.",
      ],
      langValue: "Español (Nativo) · Inglés (B1)",
      edu: [
        { title: "Ingeniería en Sistemas", place: "Universidad del Valle", period: "2025 – en curso" },
        { title: "Tecnólogo en Desarrollo de Software", place: "Universidad del Valle", period: "Feb 2022 – Abr 2025" },
        { title: "Técnico en Gestión Empresarial", place: "SENA", period: "Feb 2020 – Nov 2021" },
        { title: "Bachiller Técnico", place: "I.E. Corazón del Valle", period: "2015 – 2021" },
      ],
      followMe: "Sígueme",
      contact: "Contactar",
      viewAll: "Ver todo",
      madeWith: "Hecho con",
    },
    en: {
      role: "Software Developer · Systems Engineering",
      bio: "I build useful software for real businesses. I focus on web development with Next.js and React, creating clean interfaces and functional systems like RestaurantOS. I'm learning backend with Node.js and databases, and I'm passionate about improving user experience in every project.",
      location: "Tuluá, Valle del Cauca, Colombia",
      repos: "Featured repositories",
      experience: "Experience",
      education: "Education",
      skills: "Tech stack",
      languages: "Languages",
      downloadCV: "Download CV",
      readme: "README.md",
      contributions: "Contribution activity",
      topLanguages: "Top languages",
      achievements: "Achievements",
      organizations: "Organization",
      pinned: "Pinned",
      readmeBody:
        "Hi, I'm Juan Camilo VO. Software Development Technologist from Universidad del Valle, currently studying Systems Engineering. I love building real solutions like RestaurantOS and exploring new technologies. I want to master modern architectures, learn Rust or Go for high-performance backends, and create products that truly make an impact. My goal: go from building local apps to scalable solutions reaching thousands.",
      expJob: "Data Analyst – JM La Distribuidora",
      expPeriod: "Feb 2020 – Dec 2021",
      expTasks: [
        "Data processing and analysis with Pandas, NumPy, and Excel.",
        "Automation of strategic reports.",
      ],
      langValue: "Spanish (Native) · English (B1)",
      edu: [
        { title: "Systems Engineering", place: "Universidad del Valle", period: "2025 – ongoing" },
        { title: "Software Development Technologist", place: "Universidad del Valle", period: "Feb 2022 – Apr 2025" },
        { title: "Business Management Technician", place: "SENA", period: "Feb 2020 – Nov 2021" },
        { title: "Technical High School", place: "I.E. Corazón del Valle", period: "2015 – 2021" },
      ],
      followMe: "Follow me",
      contact: "Contact",
      viewAll: "View all",
      madeWith: "Made with",
    },
  };

  const text = t[lang];

  const repos = [
    {
      name: "restauranteOS",
      desc:
        lang === "es"
          ? "SaaS para gestión de restaurantes – POS, inventario y pedidos."
          : "Restaurant management SaaS – POS, inventory and orders.",
      lang: "TypeScript",
      stars: 3,
      forks: 1,
    },
    {
      name: "portafolio-web",
      desc:
        lang === "es"
          ? "Mi portafolio personal con diseño inspirado en GitHub. Next.js + Tailwind CSS."
          : "My personal portfolio with GitHub-inspired design. Next.js + Tailwind CSS.",
      lang: "TypeScript",
      stars: 1,
      forks: 0,
    },
  ];

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "repositories" || tab === "projects") scrollToId("repos");
    else if (tab === "stars") scrollToId("skills");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-[#30363d] bg-[#010409]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Code2 className="h-7 w-7 text-[#58a6ff]" />
            <ScrambleText className="font-mono text-base font-semibold tracking-tight" text="JuanCVO" />
            <span className="hidden text-[#8b949e] sm:inline">/</span>
            <span className="hidden font-mono text-sm text-[#e6edf3] sm:inline">portafolio</span>
            <span className="hidden rounded-full border border-[#30363d] px-1.5 py-0.5 text-[10px] text-[#8b949e] sm:inline">
              Public
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/JuanCVO"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1.5 text-xs font-medium text-[#e6edf3] transition hover:border-[#58a6ff] hover:text-[#58a6ff] sm:flex"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
              <span>{text.followMe}</span>
            </a>
            <TranslateButton lang={lang} setLang={setLang} />
          </div>
        </div>
      </nav>

      {/* Profile tabs */}
      <ProfileTabs
        active={activeTab}
        onChange={handleTabChange}
        counts={{ repos: repos.length, projects: 1, stars: 4 }}
        lang={lang}
      />

      {/* Layout */}
      <div className="mx-auto max-w-6xl px-4 py-6 md:flex md:gap-6 md:py-8">
        {/* Sidebar */}
        <aside className="mb-6 w-full shrink-0 md:mb-0 md:w-72">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="profile-container mb-4">
              <ProfileAnimation src="/foto.png" alt="Juan Camilo Vélez" />
            </div>
            <h1 className="text-xl font-bold leading-tight">Juan Camilo Vélez Ospina</h1>
            <p className="mt-1 font-mono text-base text-[#8b949e]">JuanCVO</p>

            <div className="mt-3">
              <StatusPill lang={lang} />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#e6edf3]">{text.bio}</p>

            <div className="mt-4 flex w-full flex-col gap-2 text-sm text-[#8b949e]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{text.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 shrink-0" />
                <span>Universidad del Valle</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href="mailto:velezospinajuancamilo@gmail.com"
                  className="truncate transition hover:text-[#58a6ff]"
                >
                  velezospinajuancamilo@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-col gap-2">
              <a
                href="/cv/ES - CV Developer Web - Juan Camilo V..pdf"
                download
                className="flex items-center justify-center gap-2 rounded-md border border-[#238636] bg-[#238636] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#2ea043]"
              >
                <Download className="h-4 w-4" /> {text.downloadCV}
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://github.com/JuanCVO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1.5 text-xs transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/juan-camilo-vélez-ospina-a63086255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1.5 text-xs transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-6 w-full">
              <div className="mb-2 flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-[#8b949e]" />
                <h3 className="text-xs font-semibold text-[#e6edf3]">{text.achievements}</h3>
              </div>
              <AchievementBadges lang={lang} />
            </div>

            {/* Organizations */}
            <div className="mt-6 w-full">
              <div className="mb-2 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#8b949e]" />
                <h3 className="text-xs font-semibold text-[#e6edf3]">{text.organizations}</h3>
              </div>
              <div className="flex gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] bg-[#0d1117] text-[11px] font-bold text-[#58a6ff]"
                  title="Universidad del Valle"
                >
                  UV
                </div>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] bg-[#0d1117] text-[10px] font-bold text-[#3fb950]"
                  title="SENA"
                >
                  SENA
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 space-y-4">
          <ScrollReveal delay={0.1}>
            <GhBox
              title={text.readme}
              icon={FileText}
              actions={
                <a
                  href="https://github.com/JuanCVO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#8b949e] transition hover:text-[#58a6ff]"
                >
                  {text.viewAll}
                </a>
              }
            >
              <div className="flex items-start gap-2 rounded-md border border-[#30363d] bg-[#0d1117] p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#f7b955]" />
                <p className="text-sm leading-relaxed text-[#e6edf3]">{text.readmeBody}</p>
              </div>
            </GhBox>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div id="repos">
              <GhBox
                title={text.pinned}
                icon={Pin}
                actions={
                  <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] text-[#8b949e]">
                    {repos.length}
                  </span>
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {repos.map((r) =>
                    r.name === "restauranteOS" ? (
                      <RepoCard
                        key={r.name}
                        {...r}
                        hasDemo
                        onClick={() => setRestaurantOSOpen(true)}
                      />
                    ) : (
                      <RepoCard key={r.name} {...r} />
                    )
                  )}
                </div>
              </GhBox>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div id="skills">
              <GhBox title={text.skills} icon={Wrench}>
                <TechStack />
              </GhBox>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <GhBox title={text.experience} icon={Briefcase}>
              <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#e6edf3]">{text.expJob}</p>
                    <p className="font-mono text-xs text-[#8b949e]">{text.expPeriod}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] text-[#8b949e]">
                    {lang === "es" ? "Pasado" : "Past"}
                  </span>
                </div>
                <ul className="space-y-2">
                  {text.expTasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#3fb950]" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </GhBox>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <GhBox title={text.education} icon={GraduationCap}>
              <div className="relative space-y-3 pl-5">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[#30363d]" />
                {text.edu.map((e, i) => (
                  <div
                    key={i}
                    className="relative rounded-md border border-[#30363d] bg-[#0d1117] p-3 transition hover:border-[#58a6ff]"
                  >
                    <div className="absolute -left-[17px] top-3.5 h-2.5 w-2.5 rounded-full border-2 border-[#161b22] bg-[#58a6ff]" />
                    <p className="text-sm font-semibold text-[#e6edf3]">{e.title}</p>
                    <p className="text-xs text-[#8b949e]">{e.place}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-[#6e7681]">{e.period}</p>
                  </div>
                ))}
              </div>
            </GhBox>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <GhBox title={text.languages} icon={Globe}>
              <div className="flex items-center gap-3 rounded-md border border-[#30363d] bg-[#0d1117] p-3">
                <Globe className="h-4 w-4 text-[#58a6ff]" />
                <p className="text-sm text-[#8b949e]">{text.langValue}</p>
              </div>
            </GhBox>
          </ScrollReveal>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-[#30363d] bg-[#010409]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-2 text-xs text-[#8b949e]">
            <Code2 className="h-4 w-4 text-[#58a6ff]" />
            <span>
              © 2025 Juan Camilo Vélez · {text.madeWith} Next.js + Tailwind
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://github.com/JuanCVO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b949e] transition hover:text-[#58a6ff]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/juan-camilo-vélez-ospina-a63086255/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b949e] transition hover:text-[#58a6ff]"
            >
              LinkedIn
            </a>
            <a
              href="mailto:velezospinajuancamilo@gmail.com"
              className="text-[#8b949e] transition hover:text-[#58a6ff]"
            >
              {text.contact}
            </a>
          </div>
        </div>
      </footer>

      <RestaurantOSModal
        isOpen={restaurantOSOpen}
        onClose={() => setRestaurantOSOpen(false)}
        lang={lang}
      />
    </div>
  );
}

function GhBox({
  title,
  icon: Icon,
  actions,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22] transition-colors hover:border-[#30363d]">
      <div className="flex items-center justify-between gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-[#8b949e]" />}
          <h2 className="truncate text-sm font-semibold tracking-tight text-[#e6edf3]">{title}</h2>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
