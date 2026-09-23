# Entrega — Athos

> Atualização de 23/09/2026: a pedido do usuário, o mapa com fachada e chave Google foi substituído por Leaflet + OpenStreetMap, com carregamento ao chegar à seção e pin conferido nos dois links originais. A pendência de chave descrita neste registro anterior foi eliminada. Implementação atual e testes: [README — Mapa](../README.md#mapa).

Entrega inicial em 17/09/2026, com auditoria complementar em 18/09/2026. Implementação local concluída no projeto existente, sem publicação ou alterações em contas externas.

## O que foi entregue

- Landing page em português com identidade caramelo da Athos, logo original, fachada real e pets ilustrativos.
- Sequência da referência vertical: header, hero, quatro benefícios, seis categorias, banner, cinco cards de vitrine, institucional, três avaliações, FAQ, localização, faixa final e rodapé.
- Copy final organizada nos [15 blocos](copy.md), alternativas de headline e [autoavaliação editorial](avaliacao-editorial.md). Sem preços, estoque, horários, promoções ou serviços não confirmados.
- 22 links de WhatsApp na página inicial, usando o número contratado e mensagens contextualizadas. Instagram e rota externa preservados.
- Menu móvel em Sheet, FAQ em Accordion, Button e Card reais do shadcn/Radix. Teclado, foco, retorno ao topo e menu com rolagem em telas baixas.
- Fontes Manrope/Caveat, imagens locais em WebP, hero com preload e movimento discreto por GSAP com reduced motion.
- Política de privacidade inicial, página 404, metadata, imagem social, favicon, robots, sitemap e JSON-LD com uma entidade empresarial.
- Mapa configurável, carregado por ação quando houver chave. Sem credencial, fachada, endereço e rota continuam funcionando.

## Como abrir

```bash
npm ci
npm run dev
```

Para a versão de produção:

```bash
npm run build
npm run start
```

Porta padrão: `http://localhost:3000`. Se ela já estiver ocupada por outra instância, o modo de desenvolvimento informa a porta alternativa no terminal.

## Verificações executadas

A [auditoria do prompt](auditoria-do-prompt.md) relaciona cada requisito à implementação e registra as correções complementares.

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Concluído; home, privacidade, 404 e rotas de metadata pré-renderizadas |
| `npm run lint` | Sem erros |
| `npm run typecheck` | Sem erros |
| `npm run test:seo` | Passou: preview, origem inválida, produção opt-in, canonicals, sitemap, robots e schema |
| `npm run test:smoke` em produção | Passou em Chrome/Playwright |
| 360, 390, 768, 1024 e 1440px | Sem overflow horizontal, imagens visíveis quebradas ou CTAs cortados |
| axe WCAG 2 A/AA e 2.1 AA | Zero violações apontadas nos cinco tamanhos, no menu aberto e em privacidade |
| Teclado e toque simulado | Menu abre/fecha, Escape devolve foco, links fecham o menu e FAQ expande/recolhe |
| Tela baixa, 390 × 568px | CTA do menu com largura completa e alcançável pela rolagem |
| Sem JavaScript | H1, contatos, rota e oito respostas do FAQ disponíveis |
| GSAP e reduced motion | Cards entram em sequência; transformações são removidas ao mudar a preferência e o hover não desloca/amplia elementos |
| Links e SEO renderizado | 22 destinos WhatsApp corretos, seis contextos de categoria, schema sem AggregateRating |
| Navegação e rotas | Retorno ao topo, privacidade 200, página inexistente 404, robots e sitemap de preview |
| Erros no navegador | Nenhum capturado na rodada automatizada |

Relatório legível por máquina: [verification-results.json](verification-results.json). Capturas completas: [360px](screenshots/athos-360.png), [390px](screenshots/athos-390.png), [768px](screenshots/athos-768.png), [1024px](screenshots/athos-1024.png), [1440px](screenshots/athos-1440.png). [Menu em tela baixa](screenshots/menu-short.png).

Após o último ajuste do recorte do gato, as capturas foram atualizadas com `node scripts/capture-preview.mjs`, conferindo dimensões e imagens nos cinco tamanhos. As verificações não equivalem a certificação integral de acessibilidade. Safari, Firefox e aparelhos físicos não foram testados. Core Web Vitals de campo e Lighthouse não foram medidos.

## Diferenças em relação às referências

A composição foi preservada com textos em português e conversão por WhatsApp. FAQ e localização foram acrescentados conforme o briefing. Pets e produtos são imagens ilustrativas geradas; a marca não foi redesenhada. A fotografia de interior não estava entre os anexos recebidos, por isso foi usada a fachada. Logo e fachada têm resolução limitada às fontes disponíveis. Produtos não apresentam preços ou estoque presumidos. Detalhes em [decisões visuais](decisoes-visuais.md) e [fontes e assets](fontes-e-assets.md).

## Pendências concretas para publicação

1. **Contato:** confirmar `(69) 99222-2466`, fornecido no briefing. A fachada e o Maps apresentam `(69) 99290-0750`; não houve substituição silenciosa.
2. **Domínio:** preencher `SITE_URL` com a origem HTTPS real e habilitar `SITE_INDEXABLE=true` somente na produção aprovada. Até lá, preview com noindex e sitemap vazio.
3. **Mapa incorporado:** fornecer chave restrita da Maps Embed API e conferir o pin com a credencial e o domínio finais. Os links externos foram conferidos; a API com chave real ainda não foi testada.
4. **Privacidade:** confirmar identificação jurídica, hospedagem e práticas de tratamento e retenção com o responsável. O texto atual é informativo e inicial.
5. **Informações comerciais:** receber horários oficiais e reconfirmar avaliações antes da publicação. A página funciona sem inventar esses dados.

Depois de uma publicação autorizada: verificar Search Console, enviar sitemap, inspecionar URLs e alinhar nome, endereço e contato com o Perfil da Empresa. Nada disso foi declarado como feito sem acesso.
