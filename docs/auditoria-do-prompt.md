# Auditoria do prompt — 18/09/2026

Fonte: `/home/jhonatan/Downloads/prompt-athos-codex-astra(1).md`. A conferência considera o briefing completo e a implementação efetiva, distinguindo código entregue de informações e ações externas ainda necessárias para publicar.

## Detalhes encontrados nesta conferência

1. **Entrada dos cards em sequência:** havia animação de seções, mas faltava o intervalo entre cards exigido na seção 8. Categorias, produtos e avaliações agora entram individualmente, com duração de 0,55s, deslocamento de 16px e intervalo de 50ms. Cada card aguarda sua própria entrada na tela; o hero permanece imediato.
2. **Redução de movimento incompleta:** GSAP e rolagem suave já respeitavam a preferência, mas hover ainda deslocava cards e ampliava imagens. O problema foi reproduzido no Chrome com `prefers-reduced-motion: reduce` (deslocamento de −5px e escala 1,04). Esses efeitos e o deslocamento de pressão dos botões foram desativados nessa preferência.
3. **Frase do bloco editorial 12:** o sentido estava distribuído na página, mas a frase exata não aparecia. A nota da vitrine agora inclui “Consulte a disponibilidade e planeje sua visita”, sem urgência artificial.

4. **FAQ sem JavaScript:** a abertura de todas as respostas por `noscript` ainda permitia a animação CSS do Accordion, que podia reduzir temporariamente a altura das respostas. A alternativa sem JS agora força altura automática e desativa animações; a verificação confere também esse estado.

## Conferência por requisito

| Item do prompt | Situação | Implementação / evidência |
| --- | --- | --- |
| 1. Projeto existente e objetivo comercial | Implementado | Versões de Next/React preservadas; contato por WhatsApp e rota; nenhuma publicação |
| 2. Anexos e referências | Conferido | Dez anexos preservados em `references/`; referência 10 principal; inventário em `fontes-e-assets.md` |
| 2. Logo original e fotografias | Implementado com limitação da fonte | Marca extraída sem redesenho; fachada real de 408px; interior citado no briefing não estava entre os arquivos recebidos |
| 2. Pets e produtos | Implementado | Imagens ilustrativas locais; prompts, origens e edição registrados; não apresentados como pacientes ou estoque atual |
| 3. Dados centralizados | Implementado | `lib/business.ts`; número contratado preservado e divergência documentada |
| 3. Conferência pública | Registrada | Maps conferido em 17/09; screenshot e limites em `verificacao-publica.md`; Instagram analisado pelos anexos |
| 4. Cores, tipografia e medidas | Implementado | Tema creme/caramelo, Manrope/Caveat, container 1200px, hero 44%/56%, ajustes por largura |
| 5.1 Header | Implementado | Navegação, WhatsApp real, menu Sheet, cabeçalho sticky e compensação de âncoras |
| 5.2 Hero | Implementado | Headline A, subtítulo, dois CTAs, microcopy, pets, formas e selo local sem estatísticas inventadas |
| 5.3 Benefícios | Implementado | Quatro itens e grid móvel 2 × 2 |
| 5.4 Categorias | Implementado | Seis cards na ordem pedida; mensagens específicas no WhatsApp |
| 5.5 Banner | Implementado | Corgi, texto e CTA; sem desconto ou prazo fictício |
| 5.6 Vitrine | Implementado | Cinco cards; colunas adaptáveis; consulta contextual e ausência de preços/estoque presumidos |
| 5.7 Institucional | Implementado | Foto à esquerda, texto à direita, três benefícios e âncora de localização |
| 5.8 Avaliações | Implementado com fonte | Três trechos verificados com autoria, link e data; sem fotos de autores e sem AggregateRating |
| 5.9 FAQ | Implementado | Oito respostas no HTML, Accordion, teclado e alternativa legível sem JavaScript |
| 5.10 Localização | Implementado com fallback autorizado | Endereço, fachada, horário por consulta e rota; iframe configurável depende de chave |
| 5.11 Faixa final | Implementado | Texto, CTA de conversa e pet; sem formulário de newsletter |
| 5.12 Rodapé | Implementado | Quatro grupos, contato, redes, privacidade e retorno ao topo |
| 6. Copy e rubrica | Implementado | Quinze blocos em `copy.md`, alternativas de headline, changelog, sete critérios e nota geral mínima 6,5 |
| 7. Stack e arquitetura | Implementado | App Router, Server Components, Button/Card/Accordion/Sheet reais, WhatsAppButton e Tailwind v4 |
| 8. Movimento | Completado nesta auditoria | Entradas individuais e intervalos entre cards; escopo/limpeza de GSAP e redução de movimento também no hover |
| 8. Responsividade e acessibilidade | Verificado no escopo documentado | Cinco larguras, teclado, toque simulado, foco, menu em tela baixa, contraste automatizado e conteúdo sem JS |
| 9. WhatsApp e Instagram | Implementado | Número e mensagens codificados, links reais, sem envio automático ou feed de terceiros |
| 9. Maps Embed API | Código pronto; credencial pendente | Modo place, ação Carregar mapa, título, referrer policy, dimensões e fallback; API real não testada sem chave |
| 10. SEO e identidade local | Código pronto; domínio pendente | Title/description, JSON-LD, imagem social, favicon, robots/sitemap e canonicals condicionados ao domínio real |
| 10. Preview | Implementado | Noindex com rastreamento permitido; sem canonical fictício e sitemap sem URLs inventadas |
| 10. Ações após deploy | Documentadas | Search Console, sitemap e Perfil da Empresa no README; não declaradas como executadas |
| 11. Desempenho | Medidas implementadas; métricas de campo futuras | Next/Image, preload no hero, fontes auto-hospedadas e imagens locais; sem alegar CWV ou Lighthouse medidos |
| 11. Privacidade e segurança | Implementação compatível; revisão jurídica pendente | Sem cadastro, formulário, analytics ou pixel; política inicial fiel aos recursos; dados jurídicos não inventados |
| 12. Verificação e entrega | Documentadas | Build, lint, TypeScript, SEO, navegador, screenshots, fontes, copy, rubrica e pendências |

## O que depende de informação externa

- Confirmar **(69) 99222-2466**, fornecido no briefing, diante do número diferente na fachada e no Maps.
- Informar o domínio real para ativar URLs canônicas, imagem social absoluta, sitemap de produção e indexação.
- Configurar uma chave restrita da Maps Embed API e verificar o mapa incorporado com ela. A rota externa já funciona.
- Confirmar identificação jurídica, hospedagem e práticas de dados para finalizar a política de privacidade.
- Fornecer horários oficiais e reconfirmar as avaliações antes da publicação. Até lá, a copy direciona a consulta à equipe.

Esses itens não foram substituídos por dados inventados. A publicação continua dependendo de autorização expressa, conforme o próprio prompt.

## Limites da conclusão

A entrega local pode ser revisada e utilizada com os fallbacks previstos. Isso não equivale a site publicado, API de mapas autenticada, validação jurídica, certificação integral de acessibilidade ou metas de campo comprovadas. A fidelidade é de composição e linguagem visual; pets ilustrativos, fontes aproximadas, textos em português e as seções adicionais justificam diferenças em relação ao screenshot.

O relatório automatizado atualizado está em [verification-results.json](verification-results.json); a documentação de execução e publicação está em [entrega.md](entrega.md).
