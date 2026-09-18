import Image from "next/image";
import { Heart, PawPrint } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function FinalCTA() {
  return <section className="content-container final-cta-section" aria-labelledby="final-cta-title" data-reveal><div className="final-cta">
    <div className="final-cta-copy"><p className="eyebrow"><PawPrint size={16} aria-hidden="true" /> Vamos cuidar juntos</p><h2 id="final-cta-title">O próximo cuidado começa com uma conversa.</h2><p>Conte o que seu pet precisa. Consulte produtos e atendimento com a equipe da Athos.</p></div>
    <WhatsAppButton className="final-cta-button">Conversar com a Athos</WhatsAppButton>
    <div className="final-cta-pet" aria-hidden="true"><span /><Image src="/images/gato.webp" alt="" width={480} height={588} sizes="210px" /><Heart size={28} /></div>
  </div></section>;
}
