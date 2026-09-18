"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, fullAddress } from "@/lib/business";

export function LocationMap({ embedUrl }: { embedUrl?: string }) {
  const [loaded, setLoaded] = useState(false);
  return <div className="location-map">
    {loaded && embedUrl ? <iframe src={embedUrl} title={`Localização da ${business.name}: ${fullAddress}`} width="600" height="400" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <>
      <Image src="/images/fachada-athos.webp" alt="A fachada da Athos, seu ponto de referência para chegar à loja" width={408} height={408} sizes="(max-width: 767px) 90vw, 560px" className="location-photo" />
      <div className="map-caption"><span className="icon-disc"><MapPin aria-hidden="true" /></span><div><strong>É aqui que a gente se encontra.</strong><span>{business.address.street} · {business.address.city}</span></div>
        {embedUrl ? <Button className="athos-button" onClick={() => setLoaded(true)}>Carregar mapa</Button> : <a href={business.maps} className="map-external" aria-label="Abrir localização da Athos no Google Maps" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={20} aria-hidden="true" /></a>}
      </div>
      {embedUrl && <p className="map-privacy">Ao carregar o mapa, você se conecta ao Google Maps.</p>}
    </>}
  </div>;
}
