# Novos blocos da vitrine

Abaixo dos cinco cards existentes em “Boas escolhas para o dia a dia”, foram acrescentados três blocos: Vermífugos, Carrapaticidas e Suplementos. Cada bloco tem uma divisória, uma descrição curta, um botão de consulta no WhatsApp e três espaços de imagem (nove ao todo).

Os JPEGs provisórios são arquivos já existentes no projeto; nenhuma imagem foi gerada. Os caminhos estão centralizados em `lib/care-collections.ts`, na ordem em que aparecem:

| Bloco | Foto 1 | Foto 2 | Foto 3 |
| --- | --- | --- | --- |
| Vermífugos | `medicacao4.jpeg` | `medicacao5.jpeg` | `medicacao6.jpeg` |
| Carrapaticidas | `medicacao1.jpeg` | `medicacao2.jpeg` | `medicacao3.jpeg` |
| Suplementos | `medicacao7.jpeg` | `medicacao8.jpeg` | `medicacao9.jpeg` |

Pasta atual: `public/images/Iphone/`. Para substituir uma foto, altere o caminho correspondente na configuração ou substitua o arquivo JPEG mantendo o nome. Ao finalizar as fotos, revise também seus textos alternativos em `components/sections/care-collections.tsx`.

As fotos preenchem espaços de proporção 4:5, com recorte central (`object-fit: cover`) para eliminar faixas de fundo e manter as bordas alinhadas. Prefira fotos com o produto centralizado e margem ao redor. O card usa o mesmo recuo nos quatro lados. Há três colunas em telas maiores e uma coluna até 640px. O conteúdo continua renderizado no servidor, e as imagens inferiores usam carregamento adiado com `next/image`.
