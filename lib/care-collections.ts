type CareCollection = {
  id: string;
  title: string;
  description: string;
  tone: "sand" | "sage" | "peach";
  images: readonly [string, string, string];
};

// JPEGs provisórios já existentes no projeto. Troque cada caminho pela foto final.
// A ordem das imagens corresponde aos três espaços de cada card.
export const careCollections = [
  {
    id: "vermifugos",
    title: "Vermífugos",
    description: "Cuidado contra vermes para mais bem-estar em cada fase.",
    tone: "sand",
    images: [
      "/images/Iphone/medicacao4.jpeg",
      "/images/Iphone/medicacao5.jpeg",
      "/images/Iphone/medicacao6.jpeg",
    ],
  },
  {
    id: "carrapaticidas",
    title: "Carrapaticidas",
    description: "Controle de carrapatos para mais conforto no dia a dia.",
    tone: "sage",
    images: [
      "/images/Iphone/medicacao1.jpeg",
      "/images/Iphone/medicacao2.jpeg",
      "/images/Iphone/medicacao3.jpeg",
    ],
  },
  {
    id: "suplementos",
    title: "Suplementos",
    description: "Vitaminas e apoio nutricional para complementar o cuidado com seu pet.",
    tone: "peach",
    images: [
      "/images/Iphone/medicacao7.jpeg",
      "/images/Iphone/medicacao8.jpeg",
      "/images/Iphone/medicacao9.jpeg",
    ],
  },
] as const satisfies readonly CareCollection[];
