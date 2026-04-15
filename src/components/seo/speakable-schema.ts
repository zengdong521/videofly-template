/**
 * Build Speakable JSON-LD schema.
 * Marks page sections most suitable for text-to-speech and AI assistant citation.
 * Uses CSS selectors to identify speakable content blocks.
 */
export function buildSpeakableSchema(
  url: string,
  cssSelectors: string[],
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return JSON.stringify(schema);
}
