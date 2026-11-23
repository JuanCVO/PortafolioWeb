import type { Metadata } from "next";

const siteUrl = "https://portafolio-web-juancvos-projects.vercel.app";

export function siteMetadata(lang: "es" | "en"): Metadata {
  const english = lang === "en";
  const title = english
    ? "Juan Camilo Vélez | Frontend · Full Stack Developer"
    : "Juan Camilo Vélez | Desarrollador Frontend · Full Stack";
  const description = english
    ? "Portfolio of Juan Camilo Vélez, a frontend and full stack developer working with React, Next.js, Node.js and TypeScript. Systems Engineering student at Universidad del Valle."
    : "Portafolio de Juan Camilo Vélez: desarrollador frontend y full stack con React, Next.js, Node.js y TypeScript. Estudiante de Ingeniería de Sistemas en la Universidad del Valle.";
  const path = english ? "/en" : "/";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    authors: [{ name: "Juan Camilo Vélez", url: "https://github.com/JuanCVO" }],
    keywords: ["Frontend", "Full Stack", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Colombia"],
    alternates: {
      canonical: path,
      languages: { "es-CO": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "JuanCVO",
      locale: english ? "en_US" : "es_CO",
      alternateLocale: english ? ["es_CO"] : ["en_US"],
      type: "website",
      images: [{ url: "/foto.png", alt: "Juan Camilo Vélez" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/foto.png"],
    },
  };
}
