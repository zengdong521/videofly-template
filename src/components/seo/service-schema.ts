import { siteConfig } from "@/config/site";

/**
 * Build a SoftwareApplication / Service schema for VideoAI
 * Used on homepage to help Google understand the product
 */
export function buildServiceSchema(): string {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VideoAI",
    description:
      "AI-powered short video creation platform. Generate stunning videos from text, images, or reference footage using Sora 2, Veo 3.1, and Seedance AI models.",
    url: siteConfig.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "9.90",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      description: "Basic plan starting at $9.90/month",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "126",
      bestRating: "5",
    },
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
      "Text to Video AI generation",
      "Image to Video animation",
      "Reference Video style transfer",
      "Multiple AI models (Sora 2, Veo 3.1, Seedance)",
      "Multiple aspect ratios",
      "Commercial license",
      "No watermark on paid plans",
    ],
  };

  return JSON.stringify(serviceSchema);
}
