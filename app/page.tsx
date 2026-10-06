import { Hero } from "@/components/sections/hero";
import {
  Categories,
  CareBanner,
} from "@/components/sections/catalog";
import { CareCollections } from "@/components/sections/care-collections";
import { About, Trust } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";
import { FinalCTA } from "@/components/sections/final-cta";
import { Reveal } from "@/components/shared/reveal";
import { businessSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema()).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Reveal>
        <Categories />
        <CareBanner />
        <div className="content-container" data-reveal>
          <CareCollections />
        </div>
        <About />
        <Trust />
        <FAQ />
        <Location />
        <FinalCTA />
      </Reveal>
    </main>
  );
}
