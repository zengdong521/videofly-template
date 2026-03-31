import type { Locale } from "@/config/i18n-config";
import { priceFaqDataMap } from "@/config/price/price-faq-data";

interface FAQPageSchemaProps {
  locale: Locale;
}

export function buildFAQPageSchema(locale: Locale): string {
  const faqData = priceFaqDataMap[locale] ?? priceFaqDataMap["en"];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return JSON.stringify(faqSchema);
}
