# Athos — Centro Veterinário e Pet Shop

Landing page em português para a Athos, em Ji-Paraná. Implementada no projeto existente com Next.js 16.3.5, React 19.2.8, TypeScript e Tailwind CSS 4. Visual baseado nas referências Erudites, com identidade caramelo da Athos, imagem original da marca e fotografia real da fachada.

## Executar

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para servir o build de produção:

```bash
npm run build
npm run start
```

## Verificar

```bash
npm run lint
npm run typecheck
npm run test:seo
npm run test:smoke
```

O smoke test requer o site rodando e Google Chrome instalado. Usa Playwright e axe-core, confere 360, 390, 768, 1024 e 1440px, menu por teclado e em tela baixa, FAQ, reduced motion, conteúdo sem JavaScript, links, imagens, preview SEO e rotas. Não envia mensagens nem carrega mapas externos. Destino alternativo: `TEST_BASE_URL=http://localhost:3100 npm run test:smoke`. `PLAYWRIGHT_CHANNEL` permite selecionar outro canal instalado. Resultados e screenshots ficam em `docs/`.

Os testes de SEO no navegador assumem a configuração inicial sem domínio e sem chave. As capturas verificam a aparência; a análise automática de acessibilidade não equivale a certificação integral. Metas de campo LCP ≤ 2,5s, INP ≤ 200ms e CLS ≤ 0,1 continuam a medir em produção; não foi alegada nota Lighthouse.

## Configuração de publicação

Copie `.env.example` para `.env.local` e preencha apenas dados reais:

| Variável | Função |
| --- | --- |
| `SITE_URL` | Origem HTTPS real, sem caminho. Gera metadataBase, canonical por rota, URLs sociais e identidade canônica. Sem ela não há canonical ou domínio fictício. |
| `SITE_INDEXABLE` | `true` somente quando produção estiver aprovada. Padrão `false`: páginas com noindex, rastreamento permitido e sitemap vazio. Previews Vercel mantêm noindex. |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | Chave pública restrita da Maps Embed API. Ausente: foto, endereço e link externo permanecem funcionais. |
| `NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID` | Place ID confirmado, opcional. Sem ele é usada consulta com nome e endereço completo. |

Recrie o build após modificar variáveis: o conteúdo é pré-renderizado. Não configure domínio fictício, localhost, IP ou URL com caminho.

### Mapa

A implementação usa `https://www.google.com/maps/embed/v1/place` somente após “Carregar mapa”. A chave é pública no navegador: habilite a Maps Embed API no projeto Google e restrinja a credencial à API e aos domínios HTTP referrers autorizados. Consulte a [documentação atual da Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map) e os [pré-requisitos](https://developers.google.com/maps/documentation/embed/get-started) para configuração e condições da plataforma. Não foi assumida configuração de faturamento nem executada chamada com chave real.

Antes de publicar, teste visualmente o pin com a chave e o domínio definitivos. Os dois links externos fornecidos foram abertos e conferidos no Chrome, mas isso não valida uma credencial de embed. O endereço permanece disponível sem JavaScript e sem conexão com o mapa.

### Dados e privacidade

`lib/business.ts` é a fonte tipada de nome, endereço, contato e canais. Todos os CTAs usam **(69) 99222-2466**, conforme o contratante. Maps e letreiro mostram **(69) 99290-0750**: conferir o contato antes da publicação, sem trocar silenciosamente o número.

Não há formulário, banco de dados, checkout, newsletter, analytics ou pixel. `/privacidade` descreve a implementação e é uma versão inicial: identificação jurídica, hospedagem, práticas de atendimento e retenção precisam de revisão do responsável. Não foram inventados CNPJ, controlador ou prazo legal.

## Estrutura

- `app/`: home, privacidade, 404, robots, sitemap, layout e tema.
- `components/sections/`: hero, benefícios, categorias, banner, vitrine, institucional, avaliações, FAQ, localização e CTA final.
- `components/layout/`: header, Sheet móvel e footer.
- `components/shared/`: logo original, botão WhatsApp, símbolos de marca e animação GSAP.
- `components/ui/`: Button, Card, Accordion e Sheet reais do shadcn/Radix.
- `lib/`: empresa, copy, avaliações verificadas e metadados.
- `public/images/`: imagens finais locais e otimizadas. Nenhum asset depende do diretório privado do gerador.
- `docs/`: referências, decisões, copy, avaliação editorial, fontes e evidências de verificação.

O hero usa `next/image` com preload; imagens inferiores usam lazy loading. Fontes Manrope e Caveat são auto-hospedadas por `next/font`. GSAP usa escopo e limpeza, respeita reduced motion e não depende de opacity zero para apresentar conteúdo.

## Antes e depois da publicação

1. Confirmar o WhatsApp contratado e alinhar contato com o Perfil da Empresa quando apropriado.
2. Fornecer domínio, credencial de embed restrita e, se desejado, Place ID confirmado.
3. Revisar a política com identificação jurídica e provedor reais.
4. Reconfirmar avaliações, autorização de uso dos materiais da empresa e disponibilidade dos serviços/produtos. Melhorar resolução de logo/fachada com arquivos originais.
5. Receber e publicar horários oficiais; manter consulta por WhatsApp até lá.
6. Rebuild, conferir canonical de ambas as rotas, sitemap, noindex e comportamento do mapa. Habilitar indexação apenas na produção aprovada.
7. Após deploy autorizado: verificar domínio no Search Console, enviar sitemap, inspecionar URLs e alinhar nome/endereço/telefone com o Perfil da Empresa.
8. Acompanhar buscas locais e contatos qualificados. Nenhuma promessa de posição, indexação ou presença em respostas de IA.

Não foi feita publicação nem alteração em contas externas.

## Documentação

[Auditoria do prompt](docs/auditoria-do-prompt.md) · [Entrega e verificações](docs/entrega.md) · [Revisão final](docs/revisao.md) · [Decisões visuais](docs/decisoes-visuais.md) · [Fontes e assets](docs/fontes-e-assets.md) · [Copy](docs/copy.md) · [Autoavaliação editorial](docs/avaliacao-editorial.md) · [Conferência pública](docs/verificacao-publica.md) · [Prompts das imagens](docs/image-generation-prompts.json)
