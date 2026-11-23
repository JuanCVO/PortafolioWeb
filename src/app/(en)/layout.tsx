import type { Metadata } from "next";
import PortfolioDocument from "@/components/PortfolioDocument";
import { siteMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata: Metadata = siteMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PortfolioDocument lang="en">{children}</PortfolioDocument>;
}
