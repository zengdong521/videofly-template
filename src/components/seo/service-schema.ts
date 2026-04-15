import { siteConfig } from "@/config/site";

/**
 * Build a SoftwareApplication / Service schema for VideoAI
 * Used on homepage to help Google and AI search engines understand the product
 */
export function buildServiceSchema(): string {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VideoAI",
    description:
      "Seedance AI video generator for text to video, image to video, and reference to video workflows. Create short-form videos with Seedance 2.0 and Seedance 2.0 Fast.",
    url: siteConfig.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    featureList: [
      "Seedance 2.0 text to video generation",
      "Seedance 2.0 image to video animation",
      "Seedance reference image to video generation",
      "Seedance 2.0 Fast short-form video generation",
      "Multiple aspect ratios",
      "Commercial license",
      "No watermark on paid plans",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Free Tier",
        price: "0",
        priceCurrency: "USD",
        description: "10 free credits on signup",
      },
      {
        "@type": "Offer",
        name: "Basic Plan",
        price: "9.90",
        priceCurrency: "USD",
        billingIncrement: "P1M",
        description: "280 credits per month, HD videos, fast generation",
      },
      {
        "@type": "Offer",
        name: "Pro Plan",
        price: "29.90",
        priceCurrency: "USD",
        billingIncrement: "P1M",
        description: "960 credits per month, no watermark, commercial use",
      },
      {
        "@type": "Offer",
        name: "Ultimate Plan",
        price: "79.90",
        priceCurrency: "USD",
        billingIncrement: "P1M",
        description: "2,850 credits per month, priority support, API access",
      },
    ],
  };

  return JSON.stringify(serviceSchema);
}
