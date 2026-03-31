import { siteConfig } from "@/config/site";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function buildBreadcrumbSchema({ items }: BreadcrumbSchemaProps): string {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return JSON.stringify(breadcrumbSchema);
}

export function buildToolBreadcrumbs(toolName: string, toolUrl: string, locale: string): string {
  const baseUrl = siteConfig.url;
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  const items: BreadcrumbItem[] = [
    { name: "Home", url: `${baseUrl}${localePrefix}` },
    { name: toolName, url: `${baseUrl}${localePrefix}${toolUrl}` },
  ];

  return buildBreadcrumbSchema({ items });
}
