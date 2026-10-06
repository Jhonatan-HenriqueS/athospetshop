# Cuidados e bem-estar

Uma única seção reúne três cards, nesta ordem: Carrapaticidas, Vermífugos e Suplementos. Cada card apresenta uma foto com os produtos reunidos, ícone, categoria, descrição curta e consulta pelo WhatsApp.

As fotos fornecidas ficam em `public/images/Iphone/Carrapaticidas.png`, `Vermifugos.png` e `Suplementos.png`. Os caminhos, descrições e textos alternativos estão centralizados em `lib/care-collections.ts`.

As imagens usam a proporção original 4:3, sem faixas de fundo. O layout exibe três colunas no desktop, duas em tablets (último card centralizado) e uma até 700px. Os botões se alinham na base dos cards. O componente é renderizado no servidor e usa carregamento adiado de imagens.
