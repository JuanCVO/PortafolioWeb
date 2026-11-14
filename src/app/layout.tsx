import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import PixelBurst from "@/components/ui/PixelBurst";

// Títulos, pestañas y botones. También se dibuja en el carnet 3D
const display = Fredoka({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

// Texto corrido
const body = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});

const siteUrl ="https://portafolio-web-juancvos-projects.vercel.app";
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
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#0d1117] text-[#e6edf3] antialiased">
        {children}
        <PixelBurst />
      </body>
    </html>
  );
}
