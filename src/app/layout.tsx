import type { Metadata } from "next";
import { Open_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@app/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});


export const metadata: Metadata = {
  title: "Portafolio Web",
  description: "Portafolio profesional de desarrollador web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className={`${openSans.variable} font-sans relative bg-[#0f172a] text-white antialiased`}>
        
        {children}
      </body>
    </html>
  );
}
