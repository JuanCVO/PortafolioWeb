"use client";

import { Card, CardContent } from "@app/components/ui/card";
import { Button } from "@app/components/ui/button";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import {
  SiNodedotjs, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiReact, SiNextdotjs, SiPhp, SiMysql, SiPostgresql, SiGit,
  SiGithub, SiJira,
} from "react-icons/si";

export default function Home() {
  return (
    <main className="relative max-w-4xl mx-auto p-6 pt-20 space-y-10">
      <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 left-[20%] w-[350px] h-[350px] bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-10 right-[15%] w-[300px] h-[300px] bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 right-1/3 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-bl from-emerald-400/15 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" />

      <section id="inicio" className="mb-10 flex flex-col md:flex-row items-center gap-6">
        <Image
          src="/foto.png"
          alt="Juan Camilo Vélez Ospina"
          width={250}
          height={250}
          className="rounded-full border-4 border-white shadow-lg object-cover"
        />
        <Card className="bg-[#233c98] text-white rounded-2xl shadow-lg w-full">
          <CardContent className="p-6 space-y-2">
            <h1 className="text-4xl font-bold">¡Hola! No soy un robot</h1>
            <p className="text-lg">
              Soy un Tecnólogo en Desarrollo de Software con experiencia en desarrollo web, donde aplico soluciones creativas e innovadoras.
            </p>
          </CardContent>
        </Card>
      </section>

      
      <section id="experiencia" className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Experiencia</h2>
        <Card className="bg-[#233c98] text-white rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="font-bold">Analista de Datos – JM La Distribuidora (Feb 2020 – Dic 2021)</p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>Procesamiento y análisis de datos con Pandas, NumPy y Excel.</li>
                <li>Automatización de reportes estratégicos.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Servicio al Cliente</p>
              <p className="text-sm">Celeste Restaurant (Sep 2023 – Dic 2024)<br />Almacén Es Tío (Ene 2019 – Feb 2020)</p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>Atención al cliente y resolución de problemas.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      
      <section id="educacion" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Educación</h2>
        <Card className="bg-[#233c98] text-white rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Ingeniería en Sistemas – Universidad del Valle (En curso)</li>
              <li>Tecnólogo en Desarrollo de Software – Univ. del Valle (Feb 2022 – Abr 2025)</li>
              <li>Técnico en Gestión Empresarial – SENA (Feb 2020 – Nov 2021)</li>
              <li>Bachiller Técnico – I.E. Corazón del Valle (2015 – 2021)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      
      <section id="habilidades" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Tecnologías</h2>
        <Card className="bg-[#233c98] text-white rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-2">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {[
  ["Node.js", <SiNodedotjs key="nodejs" className="text-green-400" />],
  ["JavaScript", <SiJavascript key="js" className="text-yellow-300" />],
  ["HTML", <SiHtml5 key="html" className="text-orange-500" />],
  ["CSS", <SiCss3 key="css" className="text-blue-400" />],
  ["Tailwind CSS", <SiTailwindcss key="tailwind" className="text-cyan-300" />],
  ["React.js", <SiReact key="react" className="text-blue-300" />],
  ["Next.js", <SiNextdotjs key="next" className="text-white" />],
  ["PHP", <SiPhp key="php" className="text-purple-400" />],
  ["MySQL", <SiMysql key="mysql" className="text-yellow-300" />],
  ["PostgreSQL", <SiPostgresql key="postgresql" className="text-blue-200" />],
  ["Git", <SiGit key="git" className="text-orange-400" />],
  ["GitHub", <SiGithub key="github" className="text-gray-300" />],
  ["Jira", <SiJira key="jira" className="text-blue-300" />],
].map(([name, icon], idx) => (
  <li key={idx} className="flex items-center space-x-2">
    {icon} <span>{name}</span>
  </li>
))}
            </ul>
          </CardContent>
        </Card>
      </section>

      
      <section id="idiomas" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Idiomas</h2>
        <Card className="bg-[#233c98] text-white rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <p className="text-sm">Español (Nativo), Inglés (B1)</p>
          </CardContent>
        </Card>
      </section>

      
      <section id="contacto" className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Contacto</h2>
        <Card className="bg-[#233c98] text-white rounded-2xl shadow-lg">
          <CardContent className="p-6 flex flex-wrap justify-center gap-6">
            <a href="mailto:velezospinajuancamilo@gmail.com" aria-label="Correo">
              <Mail className="w-10 h-10 hover:text-blue-200" />
            </a>
            <a href="https://github.com/JuanCVO" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-10 h-10 hover:text-blue-200" />
            </a>
            <a href="https://www.linkedin.com/in/juan-camilo-vélez-ospina-a63086255/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-10 h-10 hover:text-blue-200" />
            </a>
            <a href="./cv/ES - CV Developer Web - Juan Camilo V..pdf" download aria-label="Descargar CV">
              <Button variant="secondary" className="flex items-center gap-2">
                <Download className="w-5 h-5" /> Descargar CV
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
