import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";

interface HowToSchemaProps {
  locale: Locale;
  toolName: string;
  toolDescription: string;
  steps: Array<{ name: string; text: string }>;
}

export function buildHowToSchema({
  locale,
  toolName,
  toolDescription,
  steps,
}: HowToSchemaProps): string {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: toolName,
    description: toolDescription,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    url: `${siteConfig.url}/${toolName.toLowerCase().replace(/\s+/g, "-")}`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return JSON.stringify(howToSchema);
}
