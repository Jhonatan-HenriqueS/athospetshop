import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { business, whatsappLink } from "@/lib/business";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { LocationMap } from "@/components/sections/location-map";

export function Location() {
  return <section id="localizacao" className="section-space content-container location-section" aria-labelledby="location-title" data-reveal>
    <div className="location-copy"><p className="eyebrow">Perto de você, em Ji-Paraná</p><h2 id="location-title">Venha conhecer a Athos em Ji-Paraná.</h2><p>Vai passar pela região? Consulte os horários e venha conhecer a Athos no Jardim dos Migrantes.</p><address><MapPin size={21} aria-hidden="true" /><span>{business.address.street}<br />{business.address.neighborhood}, {business.address.city} — {business.address.state}</span></address><a className="location-hours" href={whatsappLink("Olá! Gostaria de consultar os horários da Athos antes de visitar.")} target="_blank" rel="noopener noreferrer"><Clock3 size={20} aria-hidden="true" />Consulte os horários pelo WhatsApp</a><div className="location-actions"><Button asChild className="athos-button"><a href={business.maps} target="_blank" rel="noopener noreferrer">Abrir rota no Maps<ArrowUpRight size={17} aria-hidden="true" /></a></Button><WhatsAppButton variant="outline" className="secondary-button" /></div></div>
    <LocationMap />
  </section>;
}
