import Link from "next/link";
import { ArrowUp, MapPin, PawPrint } from "lucide-react";
import { business, fullAddress, navigation, whatsappLink } from "@/lib/business";
import { Logo } from "@/components/shared/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/brand-icons";

export function Footer() {
  return <footer className="site-footer">
    <div className="content-container">
      <div className="footer-grid">
        <div className="footer-brand"><Logo /><p>Carinho, cuidado e companhia<br />em {business.address.city}.</p><div className="social-links"><a href={business.instagram} aria-label="Athos no Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a><a href={whatsappLink()} aria-label="Conversar com a Athos no WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a></div></div>
        <div><h2>Explore a Athos</h2><nav aria-label="Navegação do rodapé">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></div>
        <div><h2>Vamos conversar?</h2><a className="footer-contact" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" />{business.phoneDisplay}</a><address><MapPin size={17} aria-hidden="true" /><a href={business.maps} target="_blank" rel="noopener noreferrer">{fullAddress}</a></address><a className="hours-link" href={whatsappLink("Olá! Gostaria de consultar os horários da Athos antes de visitar.")} target="_blank" rel="noopener noreferrer">Consulte os horários pelo WhatsApp</a></div>
        <div><h2>Mais perto de você</h2><a href={business.instagram} target="_blank" rel="noopener noreferrer">Nosso Instagram ↗</a><Link href="/privacidade">Política de Privacidade</Link><p className="footer-signature">Todo pet merece<br /><span>se sentir em casa.</span><PawPrint size={22} aria-hidden="true" /></p></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {business.name}. Todos os direitos reservados.</p><a href="#topo" className="back-to-top" aria-label="Voltar ao topo"><ArrowUp size={17} aria-hidden="true" /></a></div>
    </div>
  </footer>;
}
