import { siteConfig } from "@/config/site";

interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
}

/**
 * Build ItemList JSON-LD for listing/hub pages (e.g. /guides, /compare).
 * Helps AI search engines understand collection structure and surface entries.
 */
export function buildItemListSchema(
  listName: string,
  listUrl: string,
  items: ItemListEntry[],
): string {
  if (items.length === 0) return "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: listUrl,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return JSON.stringify(schema);
}
