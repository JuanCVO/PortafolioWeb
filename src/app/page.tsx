"use client";

import { useState } from "react";
import { Download, Mail, Github, Linkedin, MapPin, Book, Code2 } from "lucide-react";
import TranslateButton from "@/components/ui/TranslateButton";
import TechStack from "@/components/ui/TechStack";
import RepoCard from "@/components/ui/RepoCard"
import ScrambleText from "@/components/ui/ScrambleText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileAnimation from "@/components/ui/ProfileAnimation";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");

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
      readmeBody: "Hola, soy Juan Camilo VO. Tecnólogo en Desarrollo de Software de la Universidad del Valle y estudiante de Ingeniería en Sistemas. Me apasiona construir soluciones reales como RestaurantOS y explorar nuevas tecnologías. Quiero dominar arquitecturas modernas, aprender Rust o Go para backend de alto rendimiento, y crear productos que impacten de verdad. Mi meta: pasar de construir apps locales a soluciones escalables que lleguen a miles.",      expJob: "Analista de Datos – JM La Distribuidora",
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
      readmeBody: "Hi, I'm Juan Camilo VO. Software Development Technologist from Universidad del Valle, currently studying Systems Engineering. I love building real solutions like RestaurantOS and exploring new technologies. I want to master modern architectures, learn Rust or Go for high-performance backends, and create products that truly make an impact. My goal: go from building local apps to scalable solutions reaching thousands.",      expJob: "Data Analyst – JM La Distribuidora",
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
    },
  };

  const text = t[lang];

  const repos = [
    {
      name: "restauranteOS",
      desc: lang === "es"
        ? "SaaS para gestión de restaurantes – POS, inventario y pedidos."
        : "Restaurant management SaaS – POS, inventory and orders.",
      lang: "TypeScript",
      stars: 3,
      forks: 1,
    },
    {
    name: "portafolio-web",
    desc: lang === "es"
      ? "Mi portafolio personal con diseño inspirado en GitHub. Next.js + Tailwind CSS."
      : "My personal portfolio with GitHub-inspired design. Next.js + Tailwind CSS.",
    lang: "TypeScript",
    stars: 1,
    forks: 0,
    },
  ];

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[#30363d] bg-[#161b22] px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-10 w-10 text-[#58a6ff]" />
            <ScrambleText className="font-mono text-xl font-bold tracking-tight" text="JuanCVO" />
          </div>
          <TranslateButton lang={lang} setLang={setLang} />
        </div>
      </nav>

      {/* Layout */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:flex md:gap-6">

        {/* Sidebar */}
        <aside className="mb-6 w-full shrink-0 md:mb-0 md:w-72">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="profile-container mb-4">
              <ProfileAnimation src="/foto.png" alt="Juan Camilo Vélez" />
            </div>
            <h1 className="text-xl font-bold">Juan Camilo Vélez Ospina</h1>
            <p className="mt-1 font-mono text-sm text-[#8b949e]">JuanCVO</p>
            <p className="mt-3 text-sm leading-relaxed text-[#e6edf3]">{text.bio}</p>

            <div className="mt-4 flex w-full flex-col gap-2 text-sm text-[#8b949e]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{text.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>{text.role}</span>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-col gap-2">
              <a href="https://github.com/JuanCVO" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm transition hover:border-[#58a6ff] hover:text-[#58a6ff]">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/juan-camilo-vélez-ospina-a63086255/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm transition hover:border-[#58a6ff] hover:text-[#58a6ff]">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href="mailto:velezospinajuancamilo@gmail.com"
                className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm transition hover:border-[#58a6ff] hover:text-[#58a6ff]">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a href="/cv/ES - CV Developer Web - Juan Camilo V..pdf" download
                className="flex items-center gap-2 rounded-md border border-[#238636] bg-[#238636] px-3 py-2 text-sm text-white transition hover:bg-[#2ea043]">
                <Download className="h-4 w-4" /> {text.downloadCV}
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-5">
        <ScrollReveal delay={0.1}>
          <GhBox title={text.readme} icon="">
            <p className="text-sm leading-relaxed text-[#e6edf3]">{text.readmeBody}</p>
          </GhBox>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GhBox title={text.repos} icon="">
            <div className="grid gap-3 sm:grid-cols-2">
              {repos.map((r) => <RepoCard key={r.name} {...r} />)}
            </div>
          </GhBox>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <GhBox title={text.skills} icon="">
            <TechStack />
          </GhBox>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <GhBox title={text.experience} icon="">
            <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
              <p className="font-semibold text-[#e6edf3]">{text.expJob}</p>
              <p className="mb-3 font-mono text-xs text-[#8b949e]">{text.expPeriod}</p>
              <ul className="space-y-2">
                {text.expTasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
                    <span className="mt-1 text-[#3fb950]">▸</span> {task}
                  </li>
                ))}
              </ul>
            </div>
          </GhBox>
        </ScrollReveal>
          <ScrollReveal delay={0.5}>

          <GhBox title={text.education} icon="">
            <div className="space-y-3">
              {text.edu.map((e, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#58a6ff]" />
                  <div>
                    <p className="text-sm font-semibold text-[#e6edf3]">{e.title}</p>
                    <p className="text-xs text-[#8b949e]">{e.place}</p>
                    <p className="font-mono text-xs text-[#8b949e]">{e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </GhBox>
          </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <GhBox title={text.languages} icon="">
            <p className="text-sm text-[#8b949e]">{text.langValue}</p>
          </GhBox>
        </ScrollReveal>

        </main>
      </div>
    </div>
  );
}

function GhBox({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22]">
      <div className="flex items-center gap-2 border-b border-[#30363d] px-4 py-3">
        {icon && <span>{icon}</span>}
        <h2 className="text-lg font-black tracking-tight text-[#e6edf3] drop-shadow-sm">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}