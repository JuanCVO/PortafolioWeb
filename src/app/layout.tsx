import type { Metadata } from "next";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelBody = DotGothic16({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-pixel-body",
});

const pixelHeading = Press_Start_2P({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-pixel",
});

const siteUrl = "https://portafolio-web-juancvos-projects.vercel.app";
const title = "Juan Camilo Vélez | Desarrollador Frontend · Full Stack";
const description =
  "Portafolio de Juan Camilo Vélez: desarrollador frontend y full stack con React, Next.js, Node.js y TypeScript. Estudiante de Ingeniería de Sistemas en la Universidad del Valle.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Juan Camilo Vélez", url: "https://github.com/JuanCVO" }],
  keywords: ["Frontend", "Full Stack", "React", "Next.js", "TypeScript", "Node.js", "Portafolio", "Colombia"],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "JuanCVO",
    locale: "es_CO",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${pixelBody.variable} ${pixelHeading.variable}`}>
      <body className="bg-[#0d1117] text-[#e6edf3] antialiased">
        {children}
      </body>
    </html>
  );
}
