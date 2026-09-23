# Conferência pública — 17/09/2026

> Atualização de 23/09/2026: a pedido do usuário, o mapa com fachada e chave Google foi substituído por Leaflet + OpenStreetMap, com carregamento ao chegar à seção e pin conferido nos dois links originais. A pendência de chave descrita neste registro anterior foi eliminada. Implementação atual e testes: [README — Mapa](../README.md#mapa).

A tentativa inicial via ferramenta de navegação falhou nos links curtos e foi limitada no Instagram. A segunda tentativa via navegador Chrome/Playwright conseguiu abrir o Google Maps. Portanto, a limitação inicial do briefing não foi tratada como uma verificação concluída.

Os dois links fornecidos redirecionaram para a mesma entidade **Athos Centro Veterinário**:

- [Link principal](https://maps.app.goo.gl/2mTcRD3yX1iBPRYY6).
- [Segundo link](https://maps.app.goo.gl/jbJyAc5jz6oH6Sj37).

Nome, fachada, endereço e posição do pin foram vistos no navegador. A evidência está em `screenshots/maps-verification.png`, preservando a interface e a atribuição do Google.

Endereço exibido: Rua Monte Castelo, 452, Jardim dos Migrantes, Ji-Paraná — RO. Corresponde ao briefing. Não se adicionaram coordenadas ou CEP à copy. O endereço agora está incluído no JSON-LD.

O Maps mantém **(69) 99290-0750**; o número explicitamente contratado é **(69) 99222-2466**. Todos os CTAs usam somente o número contratado. O dono deve confirmar o canal e, se necessário, alinhar o Perfil da Empresa. Nenhum número foi alterado em sistemas externos.

## Avaliações

O cadastro apresentou nota **4,9**, **52 avaliações** e os três relatos utilizados em `lib/reviews.ts`. Foram reproduzidos somente trechos curtos (23 palavras ao todo, contando o emoji como palavra), com os nomes tal como exibidos: Érika Krystyna, Karina Ozame e Carine Rambo teles. Reticências indicam cortes. Cada fonte é acessível pelo link do Maps; nenhum retrato foi copiado. As cinco estrelas de cada relato foram conferidas na interface renderizada. Não há avaliação própria inventada, garantia clínica nem AggregateRating em JSON-LD.

Reconfirmar nota, quantidade e permanência dos relatos antes da publicação. Não foi implementada sincronização automática com o Google. As avaliações são relatos dos autores, não promessas de resultado.

## Limites

- O perfil do Instagram continua sem verificação de conteúdo ao vivo; sua análise visual veio dos anexos. O link fornecido foi preservado.
- O mapa externo foi conferido, mas a **Maps Embed API não foi testada com credencial real**. Sem chave, a página usa a fachada e o link externo.
- Não foi copiada a indicação “Aberto agora” nem uma tabela incompleta de horários. A equipe deve fornecer a tabela oficial.
- Sem domínio, Search Console ou autorização de publicação, não foram executadas ações externas de SEO ou deploy.
