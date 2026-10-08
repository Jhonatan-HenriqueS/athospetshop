import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Heart,
  MapPin,
  PawPrint,
  Stethoscope,
} from "lucide-react";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="opening-screen">
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="hero-section"
      >
        <div className="content-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Pet shop e centro veterinário em Ji-Paraná
            </p>
            <h1 id="hero-title">
              Nossa família cuidando da sua <span>família.</span>
            </h1>
            <p className="hero-description">
              Da alimentação ao cuidado veterinário, encontre na Athos apoio
              para cuidar do seu pet em Ji-Paraná.
            </p>
            <div className="hero-actions">
              <WhatsAppButton chooseContact />
              <Button
                asChild
                variant="outline"
                className="athos-button secondary-button"
              >
                <a href="#a-athos">
                  Conhecer a Athos
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-blob blob-one" aria-hidden="true" />
            <div className="hero-blob blob-two" aria-hidden="true" />
            <div className="hero-blob blob-three" aria-hidden="true" />
            <PawPrint className="hero-paw" aria-hidden="true" />
            <Heart className="hero-heart" aria-hidden="true" />
            <p className="handwritten hero-note" aria-hidden="true">
              Carinho em
              <br />
              cada cuidado.
              <ArrowDownRight />
            </p>
            <Image
              className="hero-pets"
              src="/images/pets-hero.webp"
              alt="Golden retriever e gato tigrado juntos, em imagem ilustrativa"
              width={1200}
              height={1200}
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 52vw, 740px"
              preload
            />
            <div className="local-badge">
              <MapPin size={19} aria-hidden="true" />
              <span>Aqui em</span>
              <strong>Ji-Paraná</strong>
              <span>perto de você ♡</span>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-label="Cuidado e praticidade para seu pet"
        className="benefits-section"
      >
        <div className="content-container benefits-grid">
          {[
            {
              icon: PawPrint,
              title: "Para cães e gatos",
              text: "Produtos para a rotina do seu companheiro.",
            },
            {
              icon: Stethoscope,
              title: "Cuidado veterinário",
              text: "Converse com a equipe sobre atendimento.",
            },
            {
              icon: WhatsAppIcon,
              title: "Contato pelo WhatsApp",
              text: "Consulte antes de sair de casa.",
            },
            {
              icon: MapPin,
              title: "Aqui em Ji-Paraná",
              text: "Encontre a Athos no Jardim dos Migrantes.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div className="benefit" key={title}>
              <span className="icon-disc">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
