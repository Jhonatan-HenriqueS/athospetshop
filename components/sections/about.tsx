import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  PawPrint,
  Stethoscope,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { business } from "@/lib/business";
import { reviews, googleRating } from "@/lib/reviews";

export function About() {
  return (
    <section
      id="a-athos"
      className="about-section"
      aria-labelledby="about-title"
      data-reveal
    >
      <div className="content-container about-grid">
        <div className="about-art">
          <div className="about-blob" aria-hidden="true" />
          <div className="shop-photo">
            <Image
              src="/images/fachada-athos.webp"
              alt="Fachada da Athos: letreiro caramelo, vitrine e rampa de acesso na Rua Monte Castelo"
              width={408}
              height={408}
              sizes="(max-width: 767px) 70vw, (max-width: 1000px) 390px, 460px"
            />
            <span>
              <MapPin size={15} aria-hidden="true" />
              Jardim dos Migrantes
            </span>
          </div>
          <div className="about-pet">
            <Image
              src="/images/gato.webp"
              alt=""
              width={480}
              height={588}
              sizes="(max-width: 767px) 32vw, 210px"
            />
          </div>
          <p className="handwritten about-note" aria-hidden="true">
            Um lugar para
            <br />
            cuidar de quem
            <br />
            você ama.
            <Heart size={24} />
          </p>
        </div>
        <div className="about-copy">
          <p className="eyebrow">Conheça a Athos</p>
          <h2 id="about-title">
            Mais perto de você
            <br className="desktop-break" /> e do seu pet.
          </h2>
          <p className="about-intro">
            Seu pet faz parte da família. E as escolhas do dia a dia também são
            uma forma de cuidar.
          </p>
          <p>
            No Jardim dos Migrantes, a Athos reúne pet shop e centro
            veterinário. Um endereço em Ji-Paraná para encontrar produtos e
            conversar com a equipe sobre os cuidados do seu companheiro.
          </p>
          <div className="about-benefits">
            {[
              { icon: PawPrint, text: "Produtos para a rotina" },
              { icon: Stethoscope, text: "Cuidado veterinário" },
              { icon: WhatsAppIcon, text: "Contato com a equipe" },
            ].map(({ icon: Icon, text }) => (
              <div key={text}>
                <span className="icon-disc">
                  <Icon aria-hidden="true" />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            className="athos-button secondary-button"
          >
            <a href="#localizacao">
              Como chegar
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section
      className="section-space content-container"
      aria-labelledby="trust-title"
      data-reveal
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Carinho que vira história</p>
          <h2 id="trust-title">Quem conhece a Athos pode contar.</h2>
          <p>Relatos de quem compartilhou sua experiência no Google.</p>
        </div>
        <a
          href={business.maps}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver avaliações no Google
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="trust-grid">
        {reviews.map((review) => (
          <Card className="review-card" key={review.author} data-reveal-card>
            <div
              className="review-stars"
              role="img"
              aria-label="Avaliação de 5 estrelas"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={13}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote>“{review.excerpt}…”</blockquote>
            <div className="review-author">
              <span aria-hidden="true">{review.initials}</span>
              <div>
                <h3>{review.author}</h3>
                <a
                  href={business.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ler a avaliação de ${review.author} no Google Maps`}
                >
                  Avaliação no Google
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p className="image-disclaimer hidden">
        Trechos de avaliações públicas. Nota {googleRating.score}/5 em{" "}
        {googleRating.count} avaliações, conferida em {googleRating.checkedAt}.{" "}
        <a href={business.maps} target="_blank" rel="noopener noreferrer">
          Leia os relatos completos no Google.
        </a>
      </p>
    </section>
  );
}
