import Image from "next/image";
import { BugOff, Leaf, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { careCollections } from "@/lib/care-collections";

const icons = { vermifugos: ShieldCheck, carrapaticidas: BugOff, suplementos: Leaf };

export function CareCollections() {
  return (
    <div className="care-collections">
      {careCollections.map((collection) => {
        const Icon = icons[collection.id];
        return (
          <section
            id={collection.id}
            className="care-collection"
            aria-labelledby={`${collection.id}-title`}
            key={collection.id}
          >
            <hr className="care-collection-divider" />
            <Card className={`care-collection-card care-tone-${collection.tone}`} data-reveal-card>
              <div className="care-collection-heading">
                <span className="care-collection-icon" aria-hidden="true"><Icon /></span>
                <div className="care-collection-copy">
                  <h3 id={`${collection.id}-title`}>{collection.title}</h3>
                  <p>{collection.description}</p>
                </div>
                <WhatsAppButton
                  variant="outline"
                  className="secondary-button care-collection-action"
                  label={`Consultar opções de ${collection.title.toLocaleLowerCase("pt-BR")}`}
                  message={`Olá! Gostaria de conhecer as opções de ${collection.title.toLocaleLowerCase("pt-BR")} da Athos e consultar a disponibilidade.`}
                >
                  Consultar opções
                </WhatsAppButton>
              </div>
              <ul className="care-photo-grid" aria-label={`Fotos de ${collection.title.toLocaleLowerCase("pt-BR")}`}>
                {collection.images.map((src, index) => (
                  <li className="care-photo" key={`${collection.id}-${index}`}>
                    <Image
                      src={src}
                      alt={`Foto provisória de produto para ${collection.title.toLocaleLowerCase("pt-BR")} — ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1550px) 28vw, 425px"
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        );
      })}
    </div>
  );
}
