# Reveal durante a rolagem

A animação continua centralizada em `components/shared/reveal.tsx`, com GSAP, ScrollTrigger e `useGSAP`. Não há biblioteca nova nem alteração do smooth scroll de âncoras.

| Parâmetro | Antes | Desktop/tablet | Mobile até 767px |
| --- | --- | --- | --- |
| Duração | 0,55s | 1,05s | 0,95s |
| Deslocamento vertical | 16px | 30px | 24px |
| Opacidade | Sem fade | 0 → 1 | 0 → 1 |
| Escala dos cards | Sem escala | 0,985 → 1 | 0,99 → 1 |
| Easing | power2.out | power3.out | power3.out |
| Intervalo dos cards | índice × 0,05s | 0,10s por card do lote | 0,08s por card do lote |
| Início | top 94% | top 88% | top 88% |

A escala discreta dá profundidade sem animar filtros ou sombras. As sombras CSS existentes são preservadas. Textos e seções inteiras recebem apenas movimento e opacidade.

`ScrollTrigger.batch` coordena entradas ocorridas em uma janela de 0,05s, com até três elementos por lote. Cada card mantém seu próprio ponto de entrada; o último card de uma lista longa no celular não herda o atraso de todos os anteriores. `once: true` e o registro de elementos revelados evitam repetir entradas concluídas ao mudar de breakpoint.

O HTML permanece visível por padrão. Só elementos abaixo da tela recebem preparação para fade após a inicialização. Conteúdo já visível na hidratação não é ocultado; com JavaScript desativado, todo o conteúdo permanece acessível. Foco por teclado finaliza imediatamente a animação do elemento focado.

`prefers-reduced-motion: reduce` impede a criação dos efeitos. Ao mudar a preferência, `matchMedia` reverte o contexto. Todos os tweens são criados dentro do contexto, inclusive aqueles reproduzidos posteriormente pelos callbacks do batch. O cleanup reverte somente os recursos locais e remove o listener de foco. Ao concluir a entrada, os estilos temporários de transformação e opacidade são removidos.

Para revisão visual, conferir a cascata da primeira linha de categorias e a entrada dos cards de remédios no computador; no celular, conferir cards sucessivos e navegação por âncoras. O conteúdo, medidas, imagens, cores e links não foram alterados nesta tarefa.

Validação concluída: lint sem avisos, TypeScript e build de produção aprovados. Testes de navegador em 390, 768, 1366 e 1920px confirmaram fade intermediário, dimensões e sombras preservadas, ausência de replay, conteúdo visível após percorrer a página e limpeza ao alternar breakpoint/movimento reduzido. Também foram verificados fallback sem JavaScript, foco por teclado e navegação para a política de privacidade e retorno. Um caso de transformação residual após reload com scroll restaurado foi corrigido com restauração explícita das propriedades inline originais no cleanup.
