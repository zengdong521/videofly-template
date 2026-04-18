import { siteConfig } from "@/config/site";

export interface ProductOfferInput {
  name: string;
  description: string;
  priceUsd: number;
  credits: number;
  period?: "month" | "year" | "one-time";
  url: string;
  sku?: string;
}

/**
 * Build Product + Offer JSON-LD schema for pricing plans / credit packs.
 * Enables Google rich results (price card, AI Overview) to surface
 * structured pricing data.
 */
export function buildProductOfferSchema(items: ProductOfferInput[]): string {
  if (items.length === 0) return "";

  const graph = items.map((item) => ({
    "@type": "Product",
    name: item.name,
    description: item.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    ...(item.sku ? { sku: item.sku } : {}),
    offers: {
      "@type": "Offer",
      price: item.priceUsd.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: item.url,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: item.priceUsd.toFixed(2),
        priceCurrency: "USD",
        ...(item.period && item.period !== "one-time"
          ? {
              billingDuration: 1,
              billingIncrement: 1,
              unitCode: item.period === "month" ? "MON" : "ANN",
            }
          : {}),
      },
    },
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}
