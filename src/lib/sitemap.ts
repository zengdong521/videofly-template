import { getComparePageEntries } from "@/config/compare-pages";
import { getGuideEntries } from "@/config/guides";
import { i18n } from "@/config/i18n-config";
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

interface SitemapEntry {
  url: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
  lastModified: string;
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
      path: "ai-disclaimer",
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: "2026-04-01",
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
    {
      path: "privacy",
      priority: 0.2,
      changeFrequency: "monthly",
      lastModified: "2026-03-15",
    },
    {
      path: "terms",
      priority: 0.2,
      changeFrequency: "monthly",
      lastModified: "2026-03-15",
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

  const entries = routes.flatMap((route) =>
    i18n.locales.map((locale) => {
      const localePath = locale === i18n.defaultLocale ? "" : `/${locale}`;
      const pagePath = route.path ? `/${route.path}` : "";

      return {
        url: `${baseUrl}${localePath}${pagePath}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        lastModified: route.lastModified,
      };
    })
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
        "</url>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");
}
