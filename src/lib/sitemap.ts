import { getComparePageEntries } from "@/config/compare-pages";
import { getGuideEntries } from "@/config/guides";
import { i18n, localeConfig, type Locale } from "@/config/i18n-config";
import { modelPageConfigs } from "@/config/model-pages";
import { getToolPageRoutes } from "@/config/tool-pages";
import { getSiteUrl } from "@/lib/site-url";

type SitemapChangeFrequency = "daily" | "weekly" | "monthly";

interface SitemapRoute {
  path: string;
  priority: number;
  changeFrequency: SitemapChangeFrequency;
  lastModified: string;
}

interface SitemapAlternate {
  hreflang: string;
  url: string;
}

interface SitemapEntry {
  url: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
  lastModified: string;
  alternates: SitemapAlternate[];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getSitemapRoutes(): SitemapRoute[] {
  const staticRoutes: SitemapRoute[] = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: "2026-04-14",
    },
    {
      path: "pricing",
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: "2026-04-10",
    },
    {
      path: "compare",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: "2026-04-01",
    },
    {
      path: "guides",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: "2026-04-01",
    },
  ];

  const toolRoutes: SitemapRoute[] = getToolPageRoutes().map((route) => ({
    path: route,
    priority: 1.0,
    changeFrequency: "weekly",
    lastModified: "2026-04-14",
  }));

  const modelRoutes: SitemapRoute[] = Object.values(modelPageConfigs).map((page) => ({
    path: page.slug,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: "2026-04-01",
  }));

  const compareRoutes: SitemapRoute[] = getComparePageEntries().map((page) => ({
    path: `compare/${page.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: "2026-04-01",
  }));

  const guideRoutes: SitemapRoute[] = getGuideEntries().map((page) => ({
    path: `guides/${page.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: "2026-04-01",
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...guideRoutes,
    ...compareRoutes,
    ...modelRoutes,
  ];
}

export function buildSitemapEntries(): SitemapEntry[] {
  const baseUrl = getSiteUrl();
  const routes = getSitemapRoutes();

  console.log("🗺️ Sitemap: 发现页面:", routes.length);

  const buildUrl = (locale: Locale, path: string) => {
    const localePath = locale === i18n.defaultLocale ? "" : `/${locale}`;
    const pagePath = path ? `/${path}` : "";
    return `${baseUrl}${localePath}${pagePath}`;
  };

  const entries = routes.flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: buildUrl(locale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      lastModified: route.lastModified,
      alternates: [
        ...i18n.locales.map((loc) => ({
          hreflang: localeConfig[loc].hreflang,
          url: buildUrl(loc, route.path),
        })),
        { hreflang: "x-default", url: buildUrl(i18n.defaultLocale, route.path) },
      ],
    }))
  );

  console.log(`🗺️ Sitemap: 生成 ${entries.length} 个 URL`);

  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((entry) =>
      [
        "<url>",
        `<loc>${escapeXml(entry.url)}</loc>`,
        `<lastmod>${entry.lastModified}</lastmod>`,
        `<changefreq>${entry.changeFrequency}</changefreq>`,
        `<priority>${entry.priority.toString()}</priority>`,
        ...entry.alternates.map(
          (alt) =>
            `<xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.url)}" />`
        ),
        "</url>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    body,
    "</urlset>",
    "",
  ].join("\n");
}
