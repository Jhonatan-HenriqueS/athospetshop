import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export default function NotFound() {
  return <main id="conteudo" tabIndex={-1} className="content-container not-found"><PawPrint size={54} aria-hidden="true" /><p className="eyebrow">404 · Página não encontrada</p><h1>Esse caminho deu uma voltinha.</h1><p>Volte ao início para conhecer a Athos ou fale com a nossa equipe.</p><div><Button asChild variant="outline" className="athos-button secondary-button"><Link href="/">Voltar ao início</Link></Button><WhatsAppButton /></div></main>;
}
