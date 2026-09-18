import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable || !siteUrl) return [];
  return ["/", "/privacidade"].map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
