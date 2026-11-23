import { Fredoka, Nunito } from "next/font/google";
import PixelBurst from "@/components/ui/PixelBurst";

const display = Fredoka({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const body = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});

export default function PortfolioDocument({
  children,
  lang,
}: Readonly<{ children: React.ReactNode; lang: "es" | "en" }>) {
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#0d1117] text-[#e6edf3] antialiased">
        {children}
        <PixelBurst />
      </body>
    </html>
  );
}
