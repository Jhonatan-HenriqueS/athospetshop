import Image from "next/image";
import { ArrowRight, PawPrint } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { categories, products } from "@/lib/content";
import { categoryMessage, whatsappLink } from "@/lib/business";
import { CareCollections } from "@/components/sections/care-collections";

export function Categories() {
  return (
    <section
      id="para-seu-pet"
      className="section-space content-container"
      aria-labelledby="categories-title"
      data-reveal
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Para cada momento, um cuidado</p>
          <h2 id="categories-title">O que seu pet precisa, mais perto.</h2>
          <p>
            Explore as categorias e consulte as opções disponíveis na Athos.
          </p>
        </div>
        <a className="text-link" href="#vitrine">
          Explorar opções
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <Card
            className={`category-card tone-${category.tone}`}
            key={category.title}
            data-reveal-card
          >
            <a
              href={whatsappLink(categoryMessage(category.title))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${category.title.toLowerCase()} pelo WhatsApp`}
            >
              <div className="category-image">
                <Image
                  src={`/images/Iphone/${category.image}.jpeg`}
                  alt=""
                  width={480}
                  height={480}
                  sizes="(max-width: 540px) 42vw, (max-width: 1000px) 46vw, (max-width: 1550px) 30vw, 460px"
                />
              </div>
              <div className="category-info">
                <h3>{category.title}</h3>
                <span className="circle-arrow">
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function CareBanner() {
  return (
    <section
      className="content-container"
      aria-labelledby="care-banner-title"
      data-reveal
    >
      <div className="care-banner">
        <div className="banner-pet">
          <div className="banner-pet-blob" aria-hidden="true" />
          <Image
            src="/images/corgi.webp"
            alt=""
            width={640}
            height={640}
            sizes="(max-width: 767px) 380px, 430px"
          />
        </div>
        <div className="banner-copy">
          <p className="eyebrow">Cuidado que faz parte da rotina</p>
          <h2 id="care-banner-title">Mais carinho em cada escolha.</h2>
          <p>
            Alimentação, diversão e conforto para os momentos que vocês
            compartilham.
          </p>
          <WhatsAppButton
            message="Olá! Gostaria de consultar opções de alimentação, diversão e conforto para meu pet."
            icon={false}
          >
            Consultar opções
            <ArrowRight size={16} aria-hidden="true" />
          </WhatsAppButton>
        </div>
        <div className="banner-products" aria-hidden="true">
          <span className="banner-badge">
            Converse
            <br />
            com a<br />
            <strong>Athos ♡</strong>
          </span>
          <Image
            src="/images/alimentacao-caes.webp"
            alt=""
            width={200}
            height={200}
            sizes="250px"
          />
          <PawPrint />
        </div>
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <section
      className="section-space content-container"
      id="vitrine"
      aria-labelledby="showcase-title"
      data-reveal
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Uma rotina cheia de carinho</p>
          <h2 id="showcase-title">Boas escolhas para o dia a dia.</h2>
          <p>
            Conheça algumas categorias e confirme modelos, tamanhos e
            disponibilidade pelo WhatsApp.
          </p>
        </div>
        <a
          className="text-link"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar com a equipe
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <Card className="product-card" key={product.title} data-reveal-card>
            <div className="product-image">
              <Image
                src={`/images/${product.image}.webp`}
                alt={`Imagem ilustrativa: ${product.title.toLowerCase()}`}
                width={600}
                height={600}
                sizes="(max-width: 540px) 92vw, (max-width: 1000px) 46vw, (max-width: 1550px) 30vw, 460px"
              />
            </div>
            <div className="product-info">
              <p className="product-tag">{product.tag}</p>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <WhatsAppButton
                className="product-button"
                message={categoryMessage(product.title)}
                icon={false}
                label={`Consultar disponibilidade: ${product.title.toLowerCase()}`}
              >
                Consultar disponibilidade
              </WhatsAppButton>
            </div>
          </Card>
        ))}
      </div>
      <p className="image-disclaimer hidden">
        Imagens ilustrativas das categorias. Consulte a disponibilidade e
        planeje sua visita.
      </p>
      <CareCollections />
    </section>
  );
}

//1 Fotos reais dos produtos, beleza, nutrição, vermifigo e vitaminas
//2 Seção para carrapatos, vermifigos
//3 de segunda a sexta das 7:00 as 18:30 e sabado 7:00 as 13:00
