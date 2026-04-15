interface HowToStep {
  name: string;
  text: string;
}

/**
 * Build HowTo JSON-LD schema from step data.
 * Used on guide articles that contain clear step-by-step instructions.
 */
export function buildHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
): string {
  if (steps.length === 0) return "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return JSON.stringify(schema);
}
