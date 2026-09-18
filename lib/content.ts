import { business } from "@/lib/business";

export const categories = [
  { title: "Alimentação para cães", image: "cao", tone: "peach" },
  { title: "Alimentação para gatos", image: "gato", tone: "rose" },
  { title: "Cuidado veterinário", image: "cuidado-veterinario", tone: "sage" },
  { title: "Higiene e cuidados", image: "higiene", tone: "sand" },
  { title: "Brinquedos e acessórios", image: "brinquedos", tone: "gold" },
  { title: "Conforto e bem-estar", image: "conforto", tone: "cream" },
] as const;

export const products = [
  { title: "Alimentação para cães", description: "Para cada fase do seu companheiro.", image: "alimentacao-caes", tag: "ALIMENTAÇÃO" },
  { title: "Alimentação para gatos", description: "Carinho também na hora de comer.", image: "alimentacao-gatos", tag: "ALIMENTAÇÃO" },
  { title: "Brinquedos para se divertir", description: "Mais momentos para brincar juntos.", image: "brinquedos", tag: "DIVERSÃO" },
  { title: "Higiene no dia a dia", description: "Pequenos cuidados, todos os dias.", image: "higiene", tag: "CUIDADOS" },
  { title: "Comedouros e bebedouros", description: "Praticidade para a rotina do seu pet.", image: "comedouros", tag: "BEM-ESTAR" },
] as const;

export const faqs = [
  { question: "Como falar com a Athos?", answer: `Toque em “Falar no WhatsApp” para abrir uma conversa com o número ${business.phoneDisplay}. Você também pode conhecer a empresa pelo Instagram ${business.instagramHandle}.` },
  { question: "Onde fica a Athos?", answer: `Na ${business.address.street}, ${business.address.neighborhood}, em ${business.address.city} — ${business.address.state}. Use o link de localização desta página para abrir a rota.` },
  { question: "A Athos é pet shop ou centro veterinário?", answer: "A Athos reúne pet shop e centro veterinário. Para conhecer os serviços veterinários disponíveis, fale com a equipe." },
  { question: "Encontro produtos para cães e gatos?", answer: "A loja apresenta produtos para cães e gatos. Consulte pelo WhatsApp as opções, marcas e tamanhos disponíveis para seu pet." },
  { question: "Como consultar um produto específico?", answer: "Envie o nome, a marca ou uma foto pelo WhatsApp. Consulte a disponibilidade e o valor antes da visita." },
  { question: "Como solicitar atendimento veterinário?", answer: "Entre em contato com a equipe para verificar o serviço, os horários e a necessidade de agendamento. Uma mensagem enviada não representa agendamento confirmado." },
  { question: "Qual é o horário de funcionamento?", answer: "Consulte os horários atualizados pelo WhatsApp antes de se deslocar." },
  { question: "Onde acompanho as novidades da Athos?", answer: `No Instagram ${business.instagramHandle}. Acompanhe publicações sobre a loja, produtos e a rotina com os pets.` },
];
