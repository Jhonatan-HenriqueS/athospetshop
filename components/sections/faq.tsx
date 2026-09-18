import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { faqs } from "@/lib/content";
import { Heart, MessageCircle } from "lucide-react";

export function FAQ() {
  return <section id="duvidas" className="faq-section" aria-labelledby="faq-title" data-reveal>
    <div className="content-container faq-grid">
      <div className="faq-intro"><span className="icon-disc faq-icon"><MessageCircle size={25} aria-hidden="true" /></span><p className="eyebrow">Pode perguntar</p><h2 id="faq-title">Antes de vir,<br />tire suas dúvidas.</h2><p>Veja como falar com a Athos, consultar produtos e encontrar a loja.</p><WhatsAppButton variant="outline" className="secondary-button">Conversar com a equipe</WhatsAppButton><p className="faq-reassurance">Tire suas dúvidas com a equipe antes de decidir.</p><p className="handwritten faq-note" aria-hidden="true">A gente está<br />por perto.<Heart size={24} /></p></div>
      <Accordion type="single" collapsible defaultValue="question-0" className="faq-accordion">
        {faqs.map((faq, index) => <AccordionItem value={`question-${index}`} key={faq.question}><AccordionTrigger><span className="faq-number" aria-hidden="true">{String(index + 1).padStart(2,"0")}</span>{faq.question}</AccordionTrigger><AccordionContent forceMount><p>{faq.answer}</p></AccordionContent></AccordionItem>)}
      </Accordion>
    </div>
    <noscript><style>{`.faq-accordion [data-slot="accordion-content"] { display: block !important; height: auto !important; animation: none !important; } .faq-accordion [data-slot="accordion-content"] > div { height: auto !important; }`}</style></noscript>
  </section>;
}
