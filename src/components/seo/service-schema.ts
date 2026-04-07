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
  };

  return JSON.stringify(serviceSchema);
}
