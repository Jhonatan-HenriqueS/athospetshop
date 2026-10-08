import { ContactChoice } from "@/components/shared/contact-choice";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { whatsappLink } from "@/lib/business";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  message?: string;
  className?: string;
  variant?: "default" | "outline";
  icon?: boolean;
  label?: string;
  chooseContact?: boolean;
};

export function WhatsAppButton({ children = "Falar no WhatsApp", message, className, variant = "default", icon = true, label, chooseContact = false }: Props) {
  if (chooseContact) {
    return (
      <ContactChoice>
        <Button type="button" variant={variant} className={cn("athos-button", className)} aria-label={label}>
          {icon && <WhatsAppIcon className="size-[18px] shrink-0" />}
          {children}
        </Button>
      </ContactChoice>
    );
  }
  return (
    <Button asChild variant={variant} className={cn("athos-button", className)}>
      <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {icon && <WhatsAppIcon className="size-[18px] shrink-0" />}
        {children}
      </a>
    </Button>
  );
}
