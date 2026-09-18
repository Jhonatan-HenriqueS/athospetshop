# Inventário de fontes e imagens

## Material recebido

| Arquivo local | Conteúdo | Uso |
| --- | --- | --- |
| references/attachment-01.png | Fachada frontal, 408px | `public/images/fachada-athos.webp`, foto real do institucional/localização |
| references/attachment-02.png | Fachada em perspectiva no Google Maps | Referência de arquitetura e cores; atribuição preservada no original |
| references/attachment-03.png | Expositor PremieR/Nattu no Google Maps | Referência de categorias; sem inferência de estoque ou parceria |
| references/attachment-04.png | Captura móvel da fachada | Referência, sem interface do celular no site |
| references/attachment-05.png | Feed do Instagram | Tom próximo, produtos e comunidade; sem republicar retratos |
| references/attachment-06.png | Segundo trecho do feed | Referência visual, sem inferir especialidades |
| references/attachment-07.png | Repetição do anexo 06 | Preservado como recebido |
| references/attachment-08.png | Captura da marca circular | Recorte exato do círculo: x100, y360, 392 × 392. Símbolo para favicon: x210, y448, 173 × 134, contido sem deformação |
| references/attachment-09.png | Erudites em dois painéis | Referência complementar |
| references/attachment-10.png | Erudites vertical | Referência principal da sequência |

Não foram removidas atribuições de screenshots para fazê-los passar por fotografias originais. O anexo 01 já foi fornecido como fotografia isolada. Solicitar originais em alta resolução da logo e fachada antes de ampliações futuras. O arquivo de interior listado no briefing não estava presente.

## Assets gerados

Modo: ferramenta integrada `image_gen`, sem CLI/API key. Prompts exatos: `image-generation-prompts.json`. Os PNGs originais permanecem em `/home/jhonatan/.codex/generated_images/01a0b002-626c-7ad3-9535-e24f97d6a388/`; todos os arquivos consumidos estão no workspace.

| Final em public/images | Conteúdo | Identificador do original |
| --- | --- | --- |
| pets-hero.webp | Golden retriever e gato; alfa preservado | exec-ee28d1c4-2118-461b-be15-40aba38b47b1.png |
| cao.webp | Recorte do cachorro para categoria | Mesmo original do hero |
| gato.webp | Gato isolado, com alfa; removido o pelo do cachorro adjacente | Edição integrada exec-fed87cac-30c0-40fb-8d43-f8b9fa812ee8.png; entrada preservada em references/gato-antes-do-recorte.webp |
| cuidado-veterinario.webp | Estetoscópio | exec-fcbaa455-f9de-480a-a86e-9855230d8ba7.png |
| higiene.webp | Frasco neutro e escova | exec-2290fb43-aa67-4995-95e0-fac1b65169aa.png |
| brinquedos.webp | Bola e corda | exec-171d6cd9-5f88-4353-96c7-e172fcf1a583.png |
| conforto.webp | Cama clara | exec-3dbc0d13-3001-43b6-8b05-67cf8b438f64.png |
| alimentacao-caes.webp | Embalagem neutra e ração | exec-43262aec-01ff-41c8-b6d0-f96c94c89f58.png |
| alimentacao-gatos.webp | Embalagem neutra, ração e gato | exec-f38da208-b033-478c-ad9d-7cd29a3405e7.png |
| comedouros.webp | Fonte e comedouro ilustrativos | exec-255ba46d-88cc-4dc3-a23d-5e5372742978.png |
| corgi.webp | Corgi com transparência | exec-9e59e628-e60a-4f0d-826b-03b21a8847f8.png |
| athos-social.png | Composição social 1200 × 630 com logo/pets e tipografia | `scripts/prepare-social.mjs` |

Os arquivos foram otimizados para WebP com `sharp`, sem reconstruir o desenho da marca. Geração e composição não representam garantia de exclusividade jurídica. As imagens de produtos são categorias ilustrativas; a página informa isso ao visitante.

## Fontes técnicas

- Next.js 16.3.5: guias instalados em `node_modules/next/dist/docs/`, incluindo Server/Client Components, Image, Font, Metadata, robots e sitemap.
- [Tema do Tailwind v4](https://tailwindcss.com/docs/theme).
- [Button shadcn/Radix](https://ui.shadcn.com/docs/components/radix/button), [Accordion](https://ui.shadcn.com/docs/components/accordion), [Sheet](https://ui.shadcn.com/docs/components/sheet). A base foi selecionada explicitamente, sem misturar `render` com `asChild`.
- [GSAP com React](https://gsap.com/resources/React/): `useGSAP`, escopo e limpeza.
- [Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map): modo `place`, key e query.
- [Schema.org VeterinaryCare](https://schema.org/VeterinaryCare): entidade consistente com tipos PetStore e VeterinaryCare; sem assumir herança de LocalBusiness e sem AggregateRating.
- Símbolo WhatsApp: [Simple Icons, CC0](https://github.com/simple-icons/simple-icons/blob/develop/icons/whatsapp.svg). Instagram: geometria linear reconhecível, sem pacote adicional. Demais ícones: Lucide.
- Fontes Manrope e Caveat via Google Fonts/next/font (SIL Open Font License). A fonte exata da Erudites não foi identificada.
