import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";

interface HowToSchemaProps {
  locale: Locale;
  pathname: string;
  toolName: string;
  toolDescription: string;
  steps: Array<{ name: string; text: string }>;
}

export function buildHowToSchema({
  locale,
  pathname,
  toolName,
  toolDescription,
  steps,
}: HowToSchemaProps): string {
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: toolName,
    description: toolDescription,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    url: `${siteConfig.url}${localePrefix}${pathname}`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return JSON.stringify(howToSchema);
}
