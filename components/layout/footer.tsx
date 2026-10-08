import { ContactChoice } from "@/components/shared/contact-choice";
import { OpeningStatus } from "@/components/shared/opening-status";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, MapPin, PawPrint } from "lucide-react";
import { business, fullAddress, openingHours, navigation } from "@/lib/business";
import { Logo } from "@/components/shared/logo";
import { WhatsAppIcon } from "@/components/shared/brand-icons";

export function Footer() {
  return <footer className="site-footer">
    <div className="content-container">
      <div className="footer-grid">
        <div className="footer-brand"><Logo /><p>Carinho, cuidado e companhia<br />em {business.address.city}.</p><div className="social-links"><a href={business.instagram} aria-label="Athos no Instagram" target="_blank" rel="noopener noreferrer"><Image className="footer-social-logo" src="/images/instagram-logo.png" alt="" width={32} height={32} /></a><ContactChoice><button type="button" aria-label="Conversar com a Athos no WhatsApp"><Image className="footer-social-logo" src="/images/whatsapp-logo.svg" alt="" width={32} height={32} /></button></ContactChoice></div></div>
        <div><h2>Explore a Athos</h2><nav aria-label="Navegação do rodapé">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></div>
        <div><h2>Vamos conversar?</h2><a className="footer-contact" href={business.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4 shrink-0" /><span>{business.phoneDisplay} — Loja Pet Shop</span></a><a className="footer-contact" href="https://wa.me/5569992900750" target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4 shrink-0" /><span>(69) 99290-0750 — Clínica Pet Shop</span></a><address><MapPin size={17} aria-hidden="true" /><a href={business.maps} target="_blank" rel="noopener noreferrer">{fullAddress}</a></address><div className="hours-link">{openingHours.map((hours) => <p key={hours}>{hours}</p>)}<OpeningStatus /></div></div>
        <div><h2>Mais perto de você</h2><a href={business.instagram} target="_blank" rel="noopener noreferrer">Nosso Instagram ↗</a><Link href="/privacidade">Política de Privacidade</Link><p className="footer-signature">Todo pet merece<br /><span>se sentir em casa.</span><PawPrint size={22} aria-hidden="true" /></p></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {business.name}. Todos os direitos reservados.</p><a href="#topo" className="back-to-top" aria-label="Voltar ao topo"><ArrowUp size={17} aria-hidden="true" /></a></div>
    </div>
  </footer>;
}
