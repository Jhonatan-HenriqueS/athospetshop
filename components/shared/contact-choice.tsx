"use client";

import type { ReactElement } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, ShoppingBag, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/business";

export function ContactChoice({ children }: { children: ReactElement }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild data-contact-choice>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="contact-choice-overlay" />
        <Dialog.Content className="contact-choice-modal">
          <Dialog.Close
            className="contact-choice-close"
            aria-label="Fechar opções de contato"
          >
            <X size={22} aria-hidden="true" />
          </Dialog.Close>
          <Dialog.Title className="contact-choice-title">
            Como podemos ajudar?
          </Dialog.Title>
          <Dialog.Description className="contact-choice-description">
            Escolha a equipe certa para cuidar do seu pet.
          </Dialog.Description>
          <div className="contact-choice-grid">
            <div className="contact-choice-option">
              <div className="contact-choice-flex">
                <span className="contact-choice-icon">
                  <ShoppingBag aria-hidden="true" />
                </span>
                <h3>Pet Shop</h3>
              </div>
              <p className="contact-choice-phone">(69) 99222-2466</p>
              <p>
                Fale com a equipe e descubra produtos, opções e disponibilidade.
              </p>
              <Button asChild className="athos-button contact-choice-action">
                <a
                  href={whatsappLink(
                    "Olá! Quero conhecer os produtos da Athos Pet Shop e consultar as opções disponíveis para meu pet.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar produtos{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="contact-choice-option">
              <div className="contact-choice-flex">
                <span className="contact-choice-icon">
                  <Stethoscope aria-hidden="true" />
                </span>
                <h3>Clínica Veterinária</h3>
              </div>
              <p className="contact-choice-phone">(69) 99290-0750</p>
              <p>Fale com a clínica e encontre um horário para a consulta.</p>
              <Button asChild className="athos-button contact-choice-action">
                <a
                  href={`https://wa.me/5569992900750?text=${encodeURIComponent("Olá! Gostaria de agendar uma consulta para meu pet na clínica Athos. Quais horários estão disponíveis?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar consulta <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
