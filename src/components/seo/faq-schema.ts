interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Build FAQPage JSON-LD schema from Q&A pairs.
 * Used on pages with genuine FAQ content to help AI search engines
 * (Google AI Overview, ChatGPT Search, Perplexity) cite answers directly.
 */
export function buildFaqSchema(faqs: FaqItem[]): string {
  if (faqs.length === 0) return "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}
