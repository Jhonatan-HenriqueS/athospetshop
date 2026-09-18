import type { Metadata } from "next";
import { business } from "@/lib/business";

// Only the owner's real, public HTTPS origin may generate absolute URLs.
export function getSiteUrl(raw = process.env.SITE_URL): string | undefined {
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:" || url.username || url.password || url.port ||
        url.pathname !== "/" || url.search || url.hash || !host.includes(".") ||
        /(^|\.)(localhost|example\.(com|org|net))$/.test(host) ||
        /\.(local|localhost|test|invalid)$/.test(host) ||
        /^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(":")) return undefined;
    return url.origin;
  } catch { return undefined; }
}

export const siteUrl = getSiteUrl();
export const indexable = Boolean(siteUrl && process.env.SITE_INDEXABLE === "true" &&
  process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production"));

export const title = `Athos | Pet Shop e Centro Veterinário em ${business.address.city}`;
export const description = `Conheça a Athos em ${business.address.city}: pet shop e centro veterinário no ${business.address.neighborhood}. Consulte produtos e atendimento pelo WhatsApp.`;

export function pageMetadata(path: string, pageTitle = title, pageDescription = description): Metadata {
  return {
    title: pageTitle,
    description: pageDescription,
    ...(siteUrl ? {
      metadataBase: new URL(siteUrl),
      alternates: { canonical: new URL(path, siteUrl).toString() },
      openGraph: {
        title: pageTitle, description: pageDescription, siteName: business.name,
        url: new URL(path, siteUrl).toString(), type: "website", locale: "pt_BR",
        images: [{ url: `${siteUrl}/images/athos-social.png`, width: 1200, height: 630, alt: business.name }],
      },
      twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images: [`${siteUrl}/images/athos-social.png`] },
    } : {}),
    robots: { index: indexable, follow: true },
  };
}

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["PetStore", "VeterinaryCare"],
    "@id": siteUrl ? `${siteUrl}/#athos` : `${business.instagram}#athos`,
    name: business.name, telephone: business.phone,
    ...(siteUrl ? { url: siteUrl, logo: `${siteUrl}/images/logo-athos.png`, image: `${siteUrl}/images/fachada-athos.webp` } : {}),
    // Address and pin checked directly in Google Maps on 2026-09-17.
    address: {
      "@type": "PostalAddress", streetAddress: `${business.address.street}, ${business.address.neighborhood}`,
      addressLocality: business.address.city, addressRegion: business.address.state, addressCountry: business.address.country,
    },
    sameAs: [business.instagram],
  };
}
