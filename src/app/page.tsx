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
  Package,
  Award,
  Play,
} from "lucide-react";
import TranslateButton from "@/components/ui/TranslateButton";
import TechStack, { techCount } from "@/components/ui/TechStack";
import RepoCard from "@/components/ui/RepoCard";
import ScrambleText from "@/components/ui/ScrambleText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileAnimation from "@/components/ui/ProfileAnimation";
import RestaurantOSModal from "@/components/ui/RestaurantOSModal";
import ProfileTabs from "@/components/ui/ProfileTabs";
import AchievementBadges from "@/components/ui/AchievementBadges";
import StatusPill from "@/components/ui/StatusPill";

type Tab = "overview" | "repositories" | "projects" | "skills";

const LINKEDIN_URL = "https://www.linkedin.com/in/jcvo07";
const CV_PATH = "/cv/Juan_Camilo_Velez_CV_Frontend.pdf";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [restaurantOSOpen, setRestaurantOSOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const t = {
    es: {
      role: "Desarrollador Frontend · Full Stack",
      bio: "Estudiante de Ingeniería de Sistemas y desarrollador web. Trabajo con React, Next.js, Node.js y TypeScript, y vengo del análisis de datos con Python. Me gusta construir aplicaciones completas, de la interfaz a la base de datos, y apoyarme en herramientas de IA para trabajar mejor. Busco un equipo donde aprender y aportar desde el frontend.",
      location: "Tuluá, Valle del Cauca, Colombia",
      experience: "Experiencia",
      education: "Educación",
      skills: "Stack técnico",
      languages: "Idiomas",
      downloadCV: "Descargar CV",
      readme: "README.md",
      achievements: "Logros",
      organizations: "Organización",
      pinned: "Repositorios destacados",
      projects: "Proyectos",
      certification: "Certificación",
      readmeBody:
        "Hola, soy Juan Camilo VO. Tecnólogo en Desarrollo de Software de la Universidad del Valle y estudiante de noveno semestre de Ingeniería de Sistemas. Me apasiona construir soluciones reales como RestaurantOS y explorar nuevas tecnologías. Ahora mismo estoy afianzando testing (Jest, Playwright), React Native y APIs de LLM. Mi meta: pasar de construir apps locales a soluciones escalables que lleguen a miles.",
      jobs: [
        {
          title: "Analista de Datos",
          org: "JM La Distribuidora · Tuluá, Valle del Cauca",
          period: "Feb 2020 – Dic 2021",
          status: "Pasado",
          tasks: [
            "Procesé y analicé datos de la operación para generar informes estratégicos.",
            "Usé Pandas, NumPy y Excel para visualizar información y apoyar la toma de decisiones.",
            "Automaticé reportes y organicé la información de distintos puntos, reduciendo el trabajo manual de su elaboración.",
          ],
        },
        {
          title: "Servicio al cliente",
          org: "Almacén Es Tío · Celeste Restaurant",
          period: "2019 – 2020 · 2023 – Presente",
          status: "Actual",
          tasks: [
            "Atención directa, resolución de problemas y trabajo en equipo bajo presión, base de cómo me comunico hoy con perfiles no técnicos.",
          ],
        },
      ],
      projectList: [
        {
          key: "restaurantos",
          name: "RestaurantOS",
          status: "En desarrollo",
          statusColor: "#f7b955",
          desc: "Plataforma web multi-tenant para gestionar la operación de un restaurante, de punta a punta: mesas, órdenes, inventario, caja, empleados y reportes en PDF.",
          tags: ["Next.js", "Node.js", "Express", "Prisma", "PostgreSQL"],
        },
        {
          key: "bsf",
          name: "Conteo de mosca soldado negra (BSF)",
          status: "En diseño",
          statusColor: "#a371f7",
          desc: "App para contar individuos cruzando fotos a intervalos y video de una cámara fija. Problema planteado por INTEP Roldanillo.",
          tags: ["Diseño de solución", "Análisis de datos"],
        },
      ],
      demo: "Ver demo",
      viewCode: "Ver código",
      certName: "Microsoft AI-900 · Azure AI Fundamentals",
      certStatus: "En preparación",
      langs: [
        { name: "Español", level: "Nativo", n: 6 },
        { name: "Inglés", level: "B1", n: 3 },
      ],
      edu: [
        { title: "Ingeniería de Sistemas", place: "Universidad del Valle", period: "9.º semestre de 10 · en curso" },
        { title: "Tecnología en Desarrollo de Software", place: "Universidad del Valle", period: "Feb 2022 – Abr 2025" },
        { title: "Técnico en Gestión Empresarial", place: "SENA", period: "2020 – 2021" },
        { title: "Bachiller Técnico", place: "I.E. Corazón del Valle", period: "2015 – 2021" },
      ],
      followMe: "Sígueme",
      contact: "Contactar",
      viewAll: "Ver todo",
      madeWith: "Hecho con",
    },
    en: {
      role: "Frontend Developer · Full Stack",
      bio: "Systems Engineering student and web developer. I work with React, Next.js, Node.js and TypeScript, and I come from data analysis with Python. I enjoy building complete applications, from the interface to the database, and using AI tools to work better. I'm looking for a team where I can learn and contribute from the frontend.",
      location: "Tuluá, Valle del Cauca, Colombia",
      experience: "Experience",
      education: "Education",
      skills: "Tech stack",
      languages: "Languages",
      downloadCV: "Download CV",
      readme: "README.md",
      achievements: "Achievements",
      organizations: "Organization",
      pinned: "Pinned repositories",
      projects: "Projects",
      certification: "Certification",
      readmeBody:
        "Hi, I'm Juan Camilo VO. Software Development Technologist from Universidad del Valle and ninth-semester Systems Engineering student. I love building real solutions like RestaurantOS and exploring new technologies. Right now I'm getting solid on testing (Jest, Playwright), React Native and LLM APIs. My goal: go from building local apps to scalable solutions reaching thousands.",
      jobs: [
        {
          title: "Data Analyst",
          org: "JM La Distribuidora · Tuluá, Valle del Cauca",
          period: "Feb 2020 – Dec 2021",
          status: "Past",
          tasks: [
            "Processed and analyzed operational data to produce strategic reports.",
            "Used Pandas, NumPy and Excel to visualize information and support decision-making.",
            "Automated reports and organized information from different locations, reducing the manual work of producing them.",
          ],
        },
        {
          title: "Customer service",
          org: "Almacén Es Tío · Celeste Restaurant",
          period: "2019 – 2020 · 2023 – Present",
          status: "Current",
          tasks: [
            "Direct customer service, problem solving and teamwork under pressure — the foundation of how I communicate with non-technical people today.",
          ],
        },
      ],
      projectList: [
        {
          key: "restaurantos",
          name: "RestaurantOS",
          status: "In development",
          statusColor: "#f7b955",
          desc: "Multi-tenant web platform to run a restaurant end to end: tables, orders, inventory, cash, employees and PDF reports.",
          tags: ["Next.js", "Node.js", "Express", "Prisma", "PostgreSQL"],
        },
        {
          key: "bsf",
          name: "Black soldier fly (BSF) counting",
          status: "In design",
          statusColor: "#a371f7",
          desc: "App that counts individuals by crossing interval photos with video from a fixed camera. Problem posed by INTEP Roldanillo.",
          tags: ["Solution design", "Data analysis"],
        },
      ],
      demo: "View demo",
      viewCode: "View code",
      certName: "Microsoft AI-900 · Azure AI Fundamentals",
      certStatus: "In preparation",
      langs: [
        { name: "Spanish", level: "Native", n: 6 },
        { name: "English", level: "B1", n: 3 },
      ],
      edu: [
        { title: "Systems Engineering", place: "Universidad del Valle", period: "9th of 10 semesters · ongoing" },
        { title: "Software Development Technology", place: "Universidad del Valle", period: "Feb 2022 – Apr 2025" },
        { title: "Business Management Technician", place: "SENA", period: "2020 – 2021" },
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
      name: "restaurante-saas",
      desc:
        lang === "es"
          ? "RestaurantOS: SaaS multi-tenant para restaurantes. Mesas, inventario, caja y reportes PDF."
          : "RestaurantOS: multi-tenant SaaS for restaurants. Tables, inventory, cash and PDF reports.",
      lang: "TypeScript",
      stars: 1,
      forks: 0,
    },
    {
      name: "PortafolioWeb",
      desc:
        lang === "es"
          ? "Mi portafolio personal con diseño inspirado en GitHub, en versión retro pixelada. Next.js + Tailwind CSS."
          : "My personal portfolio with a GitHub-inspired design, in retro pixel style. Next.js + Tailwind CSS.",
      lang: "TypeScript",
      stars: 1,
      forks: 0,
    },
  ];

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "repositories") scrollToId("repos");
    else if (tab === "projects") scrollToId("projects");
    else if (tab === "skills") scrollToId("skills");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 h-14 border-b border-[#30363d] bg-[#010409]/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <Code2 className="h-7 w-7 text-[#58a6ff]" />
            <ScrambleText className="font-pixel text-xs" text="JuanCVO" />
            <span className="hidden text-[#8b949e] sm:inline">/</span>
            <span className="font-pixel hidden text-[0.8125rem] text-[#e6edf3] sm:inline">
              portafolio<span className="blink text-[#3fb950]">_</span>
            </span>
            <span className="hidden border border-[#30363d] px-1.5 py-0.5 text-[0.8125rem] text-[#8b949e] sm:inline">
              Public
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/JuanCVO"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn font-pixel hidden items-center gap-1.5 border border-[#30363d] bg-[#21262d] px-2.5 py-2 text-[0.8125rem] text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff] sm:flex"
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
        counts={{ repos: repos.length, projects: text.projectList.length, skills: techCount }}
        lang={lang}
      />

      {/* Layout */}
      <div className="mx-auto max-w-6xl px-4 py-6 md:flex md:gap-6 md:py-8">
        {/* Sidebar */}
        <aside className="mb-6 w-full shrink-0 md:mb-0 md:w-72">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-5">
              <ProfileAnimation src="/foto.png" alt="Juan Camilo Vélez" />
            </div>
            <h1 className="font-pixel text-sm leading-relaxed">Juan Camilo Vélez Ospina</h1>
            <p className="mt-1 font-mono text-base text-[#8b949e]">JuanCVO</p>
            <p className="font-pixel mt-2 text-[0.75rem] uppercase leading-relaxed text-[#3fb950]">{text.role}</p>

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
                href={CV_PATH}
                download="Juan_Camilo_Velez_CV_Frontend.pdf"
                className="pixel-btn font-pixel flex items-center justify-center gap-2 border border-[#238636] bg-[#238636] px-3 py-2.5 text-[0.8125rem] text-white hover:bg-[#2ea043]"
              >
                <Download className="h-4 w-4" /> {text.downloadCV}
              </a>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                <a
                  href="https://github.com/JuanCVO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn font-pixel flex items-center justify-center gap-1.5 border border-[#30363d] bg-[#21262d] px-2 py-2 text-[0.75rem] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn font-pixel flex items-center justify-center gap-1.5 border border-[#30363d] bg-[#21262d] px-2 py-2 text-[0.75rem] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-6 w-full">
              <div className="mb-3 flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-[#8b949e]" />
                <h3 className="font-pixel text-[0.75rem] uppercase text-[#e6edf3]">{text.achievements}</h3>
              </div>
              <AchievementBadges lang={lang} />
            </div>

            {/* Organizations */}
            <div className="mt-6 w-full">
              <div className="mb-2 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#8b949e]" />
                <h3 className="font-pixel text-[0.75rem] uppercase text-[#e6edf3]">{text.organizations}</h3>
              </div>
              <div className="flex gap-2">
                <div
                  className="font-pixel flex h-8 w-8 items-center justify-center border border-[#30363d] bg-[#0d1117] text-[0.75rem] text-[#58a6ff]"
                  title="Universidad del Valle"
                >
                  UV
                </div>
                <div
                  className="font-pixel flex h-8 w-auto items-center justify-center border border-[#30363d] bg-[#0d1117] px-1.5 text-[0.6875rem] text-[#3fb950]"
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
                  className="text-[0.875rem] text-[#8b949e] transition hover:text-[#58a6ff]"
                >
                  {text.viewAll}
                </a>
              }
            >
              <div className="flex items-start gap-2 border border-[#30363d] bg-[#0d1117] p-3">
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
                  <span className="border border-[#30363d] px-2 py-0.5 text-[0.8125rem] text-[#8b949e]">
                    {repos.length}
                  </span>
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <RepoCard {...repos[0]} hasDemo onClick={() => setRestaurantOSOpen(true)} />
                  <RepoCard {...repos[1]} href="https://github.com/JuanCVO/PortafolioWeb" />
                </div>
              </GhBox>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div id="projects">
              <GhBox
                title={text.projects}
                icon={Package}
                actions={
                  <span className="border border-[#30363d] px-2 py-0.5 text-[0.8125rem] text-[#8b949e]">
                    {text.projectList.length}
                  </span>
                }
              >
                <div className="grid gap-3">
                  {text.projectList.map((p) => (
                    <div
                      key={p.key}
                      className="border border-[#30363d] bg-[#0d1117] p-4"
                    >
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <p className="font-pixel text-[0.875rem] leading-relaxed text-[#e6edf3]">{p.name}</p>
                        <span
                          className="font-pixel shrink-0 border px-2 py-1 text-[0.6875rem]"
                          style={{
                            color: p.statusColor,
                            borderColor: `${p.statusColor}80`,
                            backgroundColor: `${p.statusColor}14`,
                          }}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#8b949e]">{p.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[#30363d] bg-[#161b22] px-2 py-0.5 text-[0.875rem] text-[#8b949e]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {p.key === "restaurantos" && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => setRestaurantOSOpen(true)}
                            className="pixel-btn font-pixel flex items-center gap-1.5 border border-[#1f6feb] bg-[#1f6feb1a] px-3 py-2 text-[0.75rem] text-[#58a6ff] hover:bg-[#1f6feb35]"
                          >
                            <Play className="h-3 w-3 fill-[#58a6ff]" />
                            {text.demo}
                          </button>
                          <a
                            href="https://github.com/JuanCVO/restaurante-saas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pixel-btn font-pixel flex items-center gap-1.5 border border-[#30363d] bg-[#21262d] px-3 py-2 text-[0.75rem] hover:border-[#58a6ff] hover:text-[#58a6ff]"
                          >
                            <Github className="h-3 w-3" />
                            {text.viewCode}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GhBox>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div id="skills">
              <GhBox
                title={text.skills}
                icon={Wrench}
                actions={
                  <span className="border border-[#30363d] px-2 py-0.5 text-[0.8125rem] text-[#8b949e]">
                    {techCount}
                  </span>
                }
              >
                <TechStack lang={lang} />
              </GhBox>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GhBox title={text.experience} icon={Briefcase}>
              <div className="space-y-3">
                {text.jobs.map((job) => (
                  <div key={job.title} className="border border-[#30363d] bg-[#0d1117] p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#e6edf3]">{job.title}</p>
                        <p className="text-xs text-[#8b949e]">{job.org}</p>
                        <p className="mt-0.5 font-mono text-xs text-[#6e7681]">{job.period}</p>
                      </div>
                      <span
                        className={`shrink-0 border px-2 py-0.5 text-[0.8125rem] ${
                          job.status === "Actual" || job.status === "Current"
                            ? "border-[#3fb950]/60 bg-[#3fb950]/10 text-[#3fb950]"
                            : "border-[#30363d] text-[#8b949e]"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {job.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#3fb950]" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </GhBox>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <GhBox title={text.education} icon={GraduationCap}>
              <div className="relative space-y-3 pl-5">
                <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-[#30363d]" />
                {text.edu.map((e, i) => (
                  <div
                    key={i}
                    className="pixel-card relative border border-[#30363d] bg-[#0d1117] p-3 hover:border-[#58a6ff]"
                  >
                    <div className="absolute -left-[19px] top-3.5 h-3 w-3 border-2 border-[#161b22] bg-[#58a6ff]" />
                    <p className="text-sm font-semibold text-[#e6edf3]">{e.title}</p>
                    <p className="text-xs text-[#8b949e]">{e.place}</p>
                    <p className="mt-0.5 font-mono text-[0.875rem] text-[#6e7681]">{e.period}</p>
                  </div>
                ))}
              </div>
            </GhBox>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <GhBox title={text.certification} icon={Award}>
              <div className="flex items-center justify-between gap-3 border border-[#30363d] bg-[#0d1117] p-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 shrink-0 text-[#f7b955]" />
                  <p className="text-sm text-[#e6edf3]">{text.certName}</p>
                </div>
                <span className="font-pixel shrink-0 border border-[#f7b955]/60 bg-[#f7b955]/10 px-2 py-1 text-[0.6875rem] text-[#f7b955]">
                  {text.certStatus}
                </span>
              </div>
            </GhBox>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <GhBox title={text.languages} icon={Globe}>
              <div className="space-y-3 border border-[#30363d] bg-[#0d1117] p-3">
                {text.langs.map((l) => (
                  <div key={l.name} className="flex items-center justify-between gap-3">
                    <p className="text-sm text-[#e6edf3]">{l.name}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1" aria-hidden>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <span key={i} className={`h-2.5 w-5 ${i < l.n ? "bg-[#3fb950]" : "bg-[#30363d]"}`} />
                        ))}
                      </div>
                      <span className="font-mono text-xs text-[#8b949e]">{l.level}</span>
                    </div>
                  </div>
                ))}
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
              © {new Date().getFullYear()} Juan Camilo Vélez · {text.madeWith} Next.js + Tailwind
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
              href={LINKEDIN_URL}
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
    <div className="pixel-box overflow-hidden border border-[#30363d] bg-[#161b22]">
      <div className="flex items-center justify-between gap-2 border-b border-[#30363d] bg-[#1c2128] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-[#8b949e]" />}
          <h2 className="font-pixel truncate text-[0.875rem] text-[#e6edf3]">{title}</h2>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
