export type Business = {
  name: string;
  shortName: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  maps: string;
  secondaryMaps: string;
  coordinates: { latitude: number; longitude: number };
  address: { street: string; neighborhood: string; city: string; state: string; country: string };
};

export const business: Business = {
  name: "Athos Centro Veterinário e Pet Shop",
  shortName: "Athos",
  phone: "+5569992222466",
  phoneDisplay: "(69) 99222-2466",
  whatsapp: "https://wa.me/5569992222466",
  instagram: "https://www.instagram.com/athoscentroveterinario/",
  instagramHandle: "@athoscentroveterinario",
  maps: "https://maps.app.goo.gl/2mTcRD3yX1iBPRYY6",
  secondaryMaps: "https://maps.app.goo.gl/jbJyAc5jz6oH6Sj37",
  // Place marker (!3d/!4d), not the camera center (@), from both Maps links.
  // Verified on 2026-09-23.
  coordinates: { latitude: -10.8746245, longitude: -61.9629766 },
  address: {
    street: "Rua Monte Castelo, 452",
    neighborhood: "Jardim dos Migrantes",
    city: "Ji-Paraná",
    state: "RO",
    country: "BR",
  },
};

export const fullAddress = `${business.address.street} — ${business.address.neighborhood}, ${business.address.city} — ${business.address.state}`;

export const navigation = [
  { label: "Início", href: "/#inicio" },
  { label: "Para seu pet", href: "/#para-seu-pet" },
  { label: "A Athos", href: "/#a-athos" },
  { label: "Dúvidas", href: "/#duvidas" },
  { label: "Como chegar", href: "/#localizacao" },
];

export const defaultMessage = "Olá! Encontrei a Athos pelo site e gostaria de informações sobre produtos e atendimento.";

export function whatsappLink(message = defaultMessage) {
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function categoryMessage(category: string) {
  return `Olá! Encontrei a Athos pelo site e gostaria de consultar opções e disponibilidade de ${category.toLocaleLowerCase("pt-BR")}.`;
}
