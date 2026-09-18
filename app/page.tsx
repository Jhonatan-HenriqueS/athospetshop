import { Hero } from "@/components/sections/hero";
import { Categories, CareBanner, Showcase } from "@/components/sections/catalog";
import { About, Trust } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";
import { FinalCTA } from "@/components/sections/final-cta";
import { Reveal } from "@/components/shared/reveal";
import { businessSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function Home() {
  return <main id="conteudo" tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema()).replace(/</g, "\\u003c") }} />
    <Hero />
    <Reveal><Categories /><CareBanner /><Showcase /><About /><Trust /><FAQ /><Location /><FinalCTA /></Reveal>
  </main>;
}
