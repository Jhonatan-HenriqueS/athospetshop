import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export const metadata = pageMetadata("/privacidade", "Política de Privacidade | Athos", "Saiba como este site utiliza dados e como funcionam os links de contato e localização da Athos.");

export default function Privacy() {
  return <main id="conteudo" tabIndex={-1} className="content-container legal-page"><Link href="/" className="text-link"><ArrowLeft size={16} aria-hidden="true" />Voltar para a Athos</Link><p className="eyebrow">Sua privacidade</p><h1>Política de Privacidade</h1><p className="legal-lead">Informações sobre a navegação neste site e o contato com a {business.name}.</p>
    <section><h2>Sobre esta página</h2><p>Este texto descreve os recursos disponíveis neste site. A identificação jurídica completa da empresa, os responsáveis pelo tratamento e as práticas do atendimento ainda precisam ser confirmados. Esta é uma versão inicial informativa, sujeita a revisão pela Athos.</p></section>
    <section><h2>Navegação e dados técnicos</h2><p>O site apresenta informações da Athos e links de contato. Não há cadastro, formulário, checkout, newsletter, pixels de publicidade ou ferramentas de análise de audiência nesta implementação. As fontes e as imagens são servidas pelo próprio site.</p><p>A infraestrutura que hospeda o site pode processar informações técnicas necessárias para entregar as páginas e proteger o serviço, como endereço IP, data e hora da requisição e informações do navegador. O provedor e os prazos de retenção devem ser informados após a definição da hospedagem.</p></section>
    <section><h2>Contato pelo WhatsApp e Instagram</h2><p>Ao tocar em um link de WhatsApp ou Instagram, você acessa um serviço externo. A abertura do WhatsApp preenche uma sugestão de mensagem, que você pode editar. Nenhuma mensagem é enviada automaticamente.</p><p>As informações que você decidir compartilhar na conversa serão tratadas no atendimento e pela plataforma utilizada, conforme suas próprias políticas. Compartilhe somente o que for necessário para sua solicitação. Uma mensagem enviada não confirma agendamento.</p></section>
    <section><h2>Google Maps</h2><p>Os links de localização abrem o Google Maps. Quando o mapa interativo estiver disponível, ele será carregado apenas após tocar em “Carregar mapa”. Nesse momento, o navegador se conecta ao Google, que pode receber informações técnicas da conexão e aplicar suas próprias políticas de privacidade e cookies.</p><p>Você pode consultar o endereço e usar os demais recursos da página sem carregar o mapa.</p></section>
    <section><h2>Cookies e serviços externos</h2><p>Esta implementação não cria cookies de publicidade nem de análise de audiência. Os serviços externos acessados por você e a infraestrutura escolhida para hospedagem podem utilizar recursos próprios, conforme suas políticas.</p></section>
    <section><h2>Dúvidas e solicitações sobre dados</h2><p>Para perguntar sobre o tratamento de suas informações, solicitar esclarecimentos ou encaminhar uma solicitação de acesso, correção ou exclusão, entre em contato com a Athos. A equipe poderá orientar o encaminhamento e a verificação necessária para tratar o pedido.</p><WhatsAppButton message="Olá! Gostaria de falar sobre privacidade e tratamento dos meus dados pela Athos.">Falar sobre privacidade</WhatsAppButton></section>
    <p className="legal-updated">Versão inicial: 17 de setembro de 2026.</p>
  </main>;
}
