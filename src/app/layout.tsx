import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { MenubarComponent } from "@app/components/MenubarComponent";

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
    <html lang="es">
      <body
        className={`${openSans.variable} font-sans relative bg-[#0f172a] text-white antialiased`}
      >
        <MenubarComponent />
        {children}
      </body>
    </html>
  );
}
