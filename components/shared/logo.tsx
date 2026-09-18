import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";

export function Logo() {
  return <Link href="/" className="brand-logo" aria-label={`${business.name} — início`}>
    <Image src="/images/logo-athos.png" alt="" width={56} height={56} className="rounded-full" />
    <span aria-hidden="true"><strong>ATHOS</strong><small>Centro Veterinário e Pet Shop</small></span>
  </Link>;
}
