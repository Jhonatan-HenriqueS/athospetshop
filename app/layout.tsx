import type { Metadata } from "next";
import { Manrope, Caveat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { pageMetadata } from "@/lib/seo";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: "500", display: "swap" });

export const metadata: Metadata = pageMetadata("/");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${manrope.variable} ${caveat.variable}`}><body id="topo"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header />{children}<Footer /></body></html>;
}
