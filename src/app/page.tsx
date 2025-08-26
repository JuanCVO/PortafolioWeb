"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@app/components/ui/button";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import TranslateButton from "@app/components/ui/TranslateButton";
import TechStack from "@app/components/ui/TechStack";
import Panel from "@app/components/ui/Panel";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");

  const texts = {
    es: {
      greeting: "¡Hola! No soy un robot",
      about:
        "Soy un Tecnólogo en Desarrollo de Software con experiencia en desarrollo web, donde aplico soluciones creativas e innovadoras.",
      experienceTitle: "Experiencia",
      experience: [
        {
          title:
            "Analista de Datos – JM La Distribuidora (Feb 2020 – Dic 2021)",
          tasks: [
            "Procesamiento y análisis de datos con Pandas, NumPy y Excel.",
            "Automatización de reportes estratégicos.",
          ],
        },
      ],
      educationTitle: "Educación",
      education: [
        "Ingeniería en Sistemas – Universidad del Valle (En curso)",
        "Tecnólogo en Desarrollo de Software – Univ. del Valle (Feb 2022 – Abr 2025)",
        "Técnico en Gestión Empresarial – SENA (Feb 2020 – Nov 2021)",
        "Bachiller Técnico – I.E. Corazón del Valle (2015 – 2021)",
      ],
      skillsTitle: "Mis tecnologías",
      languagesTitle: "Idiomas",
      languages: "Español (Nativo), Inglés (B1)",
      contactTitle: "Contacto",
      downloadCV: "Descargar CV",
    },
    en: {
      greeting: "Hello! I'm not a robot",
      about:
        "I am a Software Development Technologist with experience in web development, where I apply creative and innovative solutions.",
      experienceTitle: "Experience",
      experience: [
        {
          title:
            "Data Analyst – JM La Distribuidora (Feb 2020 – Dec 2021)",
          tasks: [
            "Data processing and analysis with Pandas, NumPy, and Excel.",
            "Automation of strategic reports.",
          ],
        },
      ],
      educationTitle: "Education",
      education: [
        "Systems Engineering – Universidad del Valle (Ongoing)",
        "Software Development Technologist – Univ. del Valle (Feb 2022 – Apr 2025)",
        "Business Management Technician – SENA (Feb 2020 – Nov 2021)",
        "Technical High School – I.E. Corazón del Valle (2015 – 2021)",
      ],
      skillsTitle: "My technologies",
      languagesTitle: "Languages",
      languages: "Spanish (Native), English (B1)",
      contactTitle: "Contact",
      downloadCV: "Download CV",
    },
  };

  return (
    <main className="relative max-w-5xl mx-auto p-4 sm:p-6 md:p-10 space-y-10">
      {/* Botón de traducción */}
      <TranslateButton setLang={setLang} lang={lang} className="fixed top-4 right-4 z-50" />

      {/* Fondos decorativos (opcionales) */}
      <div className="pointer-events-none absolute top-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" />

      {/* Inicio */}
      <Panel>
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <Image
            src="/foto.png"
            alt="Foto de perfil"
            width={220}
            height={220}
            className="rounded-full border-4 border-white/80 shadow-lg object-cover"
          />
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {texts[lang].greeting}
            </h1>
            <p className="text-base sm:text-lg text-gray-100">
              {texts[lang].about}
            </p>
          </div>
        </div>
      </Panel>

      {/* Experiencia (panel gris + tarjetas internas oscuras) */}
      <Panel title={texts[lang].experienceTitle}>
        <div className="grid gap-4 sm:gap-6 justify-center">
          {texts[lang].experience.map((exp, idx) => (
            <div
              key={idx}
              className="bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5"
            >
              <p className="font-semibold mb-3">{exp.title}</p>
              <ul className="grid gap-2">
                {exp.tasks.map((t, i) => (
                  <li
                    key={i}
                    className="bg-white/5 rounded-xl px-3 py-2 text-sm leading-snug"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      {/* Educación (mismas tarjetas internas) */}
      <Panel title={texts[lang].educationTitle}>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {texts[lang].education.map((ed, i) => (
            <div
              key={i}
              className="bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5 text-sm"
            >
              {ed}
            </div>
          ))}
        </div>
      </Panel>

      {/* Tecnologías (igual al ejemplo) */}
      <Panel title={texts[lang].skillsTitle}>
        <TechStack />
      </Panel>

      {/* Idiomas */}
      <Panel title={texts[lang].languagesTitle}>
        <div className="bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5 text-sm">
          {texts[lang].languages}
        </div>
      </Panel>

      {/* Contacto (tarjetas por icono) */}
      <Panel title={texts[lang].contactTitle}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
          <a
            href="mailto:velezospinajuancamilo@gmail.com"
            aria-label="Correo"
            className="w-full bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5 flex flex-col items-center gap-2 hover:-translate-y-1 transition"
          >
            <Mail className="w-8 h-8" />
            <span className="text-xs">Email</span>
          </a>
          <a
            href="https://github.com/JuanCVO"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-full bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5 flex flex-col items-center gap-2 hover:-translate-y-1 transition"
          >
            <Github className="w-8 h-8" />
            <span className="text-xs">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/juan-camilo-vélez-ospina-a63086255/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-full bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5 flex flex-col items-center gap-2 hover:-translate-y-1 transition"
          >
            <Linkedin className="w-8 h-8" />
            <span className="text-xs">LinkedIn</span>
          </a>
          <a
            href="./cv/ES - CV Developer Web - Juan Camilo V..pdf"
            download
            aria-label="Descargar CV"
            className="w-full bg-[#0f172a] rounded-2xl p-5 shadow-lg border border-white/5 flex flex-col items-center gap-2 hover:-translate-y-1 transition"
          >
            <Button
              variant="secondary"
              className="w-full justify-center gap-2 text-xs sm:text-sm"
            >
              <Download className="w-4 h-4" />
              {texts[lang].downloadCV}
            </Button>
          </a>
        </div>
      </Panel>
    </main>
  );
}
