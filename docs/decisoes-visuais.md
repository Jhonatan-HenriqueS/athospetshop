# Direção de arte e decisões

> Atualização de 23/09/2026: a pedido do usuário, o mapa com fachada e chave Google foi substituído por Leaflet + OpenStreetMap, com carregamento ao chegar à seção e pin conferido nos dois links originais. A pendência de chave descrita neste registro anterior foi eliminada. Implementação atual e testes: [README — Mapa](../README.md#mapa).

A referência principal é `references/attachment-10.png` (Erudites vertical). O anexo 09, em dois painéis, complementa os detalhes. Os dez anexos foram abertos individualmente; o anexo 07 repete o 06. A foto de interior mencionada no briefing não veio entre os dez anexos efetivamente recebidos.

A página preserva header horizontal, hero 44%/56% com texto à esquerda, golden retriever e gato à direita, formas orgânicas caramelo, quatro benefícios, seis categorias, banner com pet à esquerda, cinco produtos no desktop, institucional com imagem à esquerda, três avaliações, faixa final e quatro grupos de rodapé. FAQ e localização entram entre as avaliações e a faixa final, conforme o briefing.

A paleta é uma aproximação das fotos: creme `#FAF7F2`, caramelo `#A96F43`, ação `#84502E`, areia `#CFA77C`, texto `#29221D`. Não é um manual oficial. Manrope é a aproximação tipográfica adotada; Caveat aparece só nas anotações. Ambas são auto-hospedadas por `next/font`, com `display: swap` e subconjunto latino. Não há alteração da tipografia dentro da marca original.

Os componentes Button, Card, Accordion e Sheet foram instalados pelo CLI oficial shadcn 4.21.0, com base Radix e preset Nova. A composição dos links usa `asChild`. A estilização Tailwind v4 foi adaptada ao tema Athos; os detalhes de composição e os breakpoints estão em `app/globals.css`. A arquitetura mantém páginas e conteúdo no servidor. O JavaScript é limitado a menu, acordeão, mapa sob demanda e GSAP.

O hero aparece imediatamente, com preload do `next/image`. As entradas de seção usam GSAP, ScrollTrigger e `useGSAP` com escopo e limpeza, deslocamento de 16px por 0,55s, sem ocultar conteúdo. Categorias, produtos e avaliações entram individualmente, com intervalos de 50ms entre cards e gatilhos de entrada próprios para preservar a experiência no celular. Reduced motion desativa as entradas, a rolagem suave e os deslocamentos/zoom por hover ou pressão de botões. Não há interceptação de scroll.

## Diferenças justificadas

- Pets gerados especificamente para este projeto, em vez de ampliar os animais dos screenshots. São imagens ilustrativas, não pacientes da Athos.
- Logo original extraída geometricamente da captura, sem redesenho. A fonte disponível é limitada a cerca de 392px. O favicon deriva do símbolo original com proporção preservada.
- Foto frontal real de 408 × 408px no institucional e localização; a fotografia do interior não estava disponível.
- Produtos ilustrativos sem marca e sem preços; nenhum estoque é declarado. As fotos do expositor não provam disponibilidade atual.
- Busca, carrinho, conta, favoritos e newsletter substituídos por contato real.
- Trechos reais de avaliações adicionados depois que o Maps pôde ser aberto no navegador. Fotos de autores não foram reproduzidas.
- Mapa visual depende da chave. Sem ela, há foto real, endereço e link funcional, sem simulação de cartografia.
- A vitrine usa cinco colunas apenas a partir de 1200px, três em faixas intermediárias, duas em tablets e uma no celular estreito para preservar nomes e botões.

## Refinamentos finais

Os textos de leitura usam 14–16px, com microcopy de 12px nas áreas de consulta. O hero usa 16px no corpo, e os botões quebram de linha no celular quando necessário. O selo local foi reposicionado no tablet para preservar os rostos dos pets. O menu móvel permite rolagem em telas baixas; o CTA ocupa a largura disponível e o botão de fechar mantém sua área de toque própria.

## Comparação

Os screenshots de verificação ficam em `docs/screenshots/athos-{largura}.png`. Compare a ordem, os alinhamentos e o hero com `references/attachment-10.png`; não compare a altura total diretamente, porque foram acrescentados FAQ, localização e CTAs maiores, além da copy em português.

## Escala responsiva — 04/10/2026

A solicitação posterior de uma página mais ampla substitui as medidas compactas descritas acima. O conteúdo agora tem largura máxima de 1440px, espaçamento vertical de 72–128px, títulos de seção de 32–52px e textos principais de 17–20px. Os botões de conteúdo têm altura mínima de 56px.

Categorias usam três colunas no desktop, duas no tablet e cards horizontais individuais nos celulares estreitos. A vitrine apresenta três cards por linha no desktop, dois no tablet e um no celular; a última linha fica centralizada. Institucional, avaliações, FAQ, localização, banners e rodapé acompanham a escala maior. O mapa interativo foi preservado.

Na conclusão, o botão de contato final passou a ocupar a largura disponível no celular, sem a antiga limitação de 220px. A área da imagem do corgi ganhou altura para preservar a cabeça no recorte mobile. O `sizes` da imagem do CTA final acompanha suas dimensões de exibição.

A revisão de geometria cobriu 17 larguras entre 320 e 2560px, sem rolagem horizontal, botões cortados ou sobreposição entre marca, navegação e ações do cabeçalho. A altura inicial continua usando a altura dinâmica da janela como mínimo; telas pequenas permitem rolagem sem comprimir o conteúdo.

Validação final: `npm run build`, `npm run lint`, `npm run typecheck`, `test:smoke` e `test:map` passaram. As suítes de navegador foram executadas contra o build de produção local. O relatório e as capturas atualizados estão em `docs/verification-results.json` e `docs/screenshots/`.
