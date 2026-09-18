import { Logo } from "@/components/shared/logo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navigation } from "@/lib/business";
import Link from "next/link";

export function Header() {
  return <header className="site-header">
    <div className="content-container header-inner">
      <Logo />
      <nav aria-label="Navegação principal" className="desktop-nav">
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions"><WhatsAppButton className="header-whatsapp" /><MobileMenu /></div>
    </div>
  </header>;
}
