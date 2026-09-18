"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { business, navigation, whatsappLink } from "@/lib/business";
import { WhatsAppIcon } from "@/components/shared/brand-icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu-trigger" aria-label="Abrir menu de navegação"><Menu className="size-6" /></Button></SheetTrigger>
    <SheetContent className="mobile-sheet" aria-describedby="menu-description">
      <SheetHeader><SheetTitle>Conheça a Athos</SheetTitle><SheetDescription id="menu-description">Carinho, cuidado e companhia em {business.address.city}.</SheetDescription></SheetHeader>
      <nav aria-label="Navegação móvel" className="mobile-nav">
        {navigation.map((item) => <SheetClose key={item.href} asChild><Link href={item.href}>{item.label}<ArrowUpRight aria-hidden="true" size={18} /></Link></SheetClose>)}
      </nav>
      <SheetClose asChild><a className="mobile-contact" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-5" />Falar no WhatsApp</a></SheetClose>
      <p className="mobile-menu-note">Seu pet faz parte da família.<br />E a gente cuida dessa conexão.</p>
    </SheetContent>
  </Sheet>;
}
