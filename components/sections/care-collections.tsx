import Image from "next/image";
import {
  ArrowRight,
  BugOff,
  Heart,
  Leaf,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { careCollections } from "@/lib/care-collections";

const icons = {
  vermifugos: ShieldCheck,
  carrapaticidas: BugOff,
  suplementos: Leaf,
};

export function CareCollections() {
  return (
    <section
      className="care-collections"
      id="cuidados-bem-estar"
      aria-labelledby="care-collections-title"
    >
      <header className="care-collections-intro">
        <div className="care-collections-copy">
          <p className="eyebrow">Cuidados e bem-estar</p>
          <h2 id="care-collections-title">
            Remédios e apoio para o dia a dia do seu pet
          </h2>
          <p className="care-collections-description">
            Proteção, saúde e bem-estar em todas as fases da vida. Encontre aqui
            os principais medicamentos e suplementos para cuidar do seu pet.
          </p>
        </div>
        <div className="care-collections-decoration" aria-hidden="true">
          <PawPrint className="care-collections-paw" />
          <span className="handwritten">
            Mais saúde
            <br />
            para quem
            <br />
            sempre está
            <br />
            ao seu lado.
            <Heart />
          </span>
        </div>
      </header>
      <div className="care-collections-grid">
        {careCollections.map((collection) => {
          const Icon = icons[collection.id];
          return (
            <article
              id={collection.id}
              className="care-collection-card"
              aria-labelledby={`${collection.id}-title`}
              key={collection.id}
              data-reveal-card
            >
              <div className="care-collection-image">
                <Image
                  src={collection.image}
                  alt={collection.alt}
                  fill
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, (max-width: 1550px) 30vw, 460px"
                />
              </div>
              <div className="care-collection-body">
                <div className="care-collection-heading">
                  <div>
                    <p className="care-collection-tag">{collection.tag}</p>
                    <h3 id={`${collection.id}-title`}>{collection.title}</h3>
                  </div>
                </div>
                <p className="care-collection-description">
                  {collection.description}
                </p>
                <WhatsAppButton
                  icon={false}
                  className="care-collection-action"
                  label={`Consultar opções de ${collection.title.toLocaleLowerCase("pt-BR")}`}
                  message={`Olá! Gostaria de conhecer as opções de ${collection.title.toLocaleLowerCase("pt-BR")} da Athos e consultar a disponibilidade.`}
                >
                  Consultar opções <ArrowRight size={18} aria-hidden="true" />
                </WhatsAppButton>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
