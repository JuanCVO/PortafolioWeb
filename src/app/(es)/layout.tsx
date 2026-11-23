import type { Metadata } from "next";
import PortfolioDocument from "@/components/PortfolioDocument";
import { siteMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata: Metadata = siteMetadata("es");

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PortfolioDocument lang="es">{children}</PortfolioDocument>;
}
