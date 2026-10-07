import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { business, openingHours } from "@/lib/business";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { LocationMap } from "@/components/sections/location-map";

export function Location() {
  return (
    <section
      id="localizacao"
      className="section-space content-container location-section"
      aria-labelledby="location-title"
      data-reveal
    >
      <div className="location-copy" data-reveal-direction="left">
        <p className="eyebrow">Perto de você, em Ji-Paraná</p>
        <h2 id="location-title">Venha conhecer a Athos em Ji-Paraná.</h2>
        <p>
          Vai passar pela região? Venha conhecer a Athos no Jardim dos
          Migrantes.
        </p>
        <address>
          <MapPin size={21} aria-hidden="true" />
          <span>
            {business.address.street}
            <br />
            {business.address.neighborhood}, {business.address.city} —{" "}
            {business.address.state}
          </span>
        </address>
        <div className="location-hours">
          <Clock3 size={20} aria-hidden="true" />
          <div>
            <strong>Horário de funcionamento</strong>
            {openingHours.map((hours) => (
              <p key={hours}>{hours}</p>
            ))}
          </div>
        </div>
        <div className="location-actions">
          <Button asChild className="athos-button">
            <a href={business.maps} target="_blank" rel="noopener noreferrer">
              Abrir rota no Maps
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Button>
          <WhatsAppButton variant="outline" className="secondary-button" />
        </div>
      </div>
      <LocationMap />
    </section>
  );
}
