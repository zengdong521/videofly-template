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
}

interface SitemapEntry {
  url: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
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
    },
    {
      path: "pricing",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "ai-disclaimer",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      path: "compare",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      path: "guides",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      path: "privacy",
      priority: 0.3,
      changeFrequency: "monthly",
    },
    {
      path: "terms",
      priority: 0.3,
      changeFrequency: "monthly",
    },
  ];

  const toolRoutes: SitemapRoute[] = getToolPageRoutes().map((route) => ({
    path: route,
    priority: 0.9,
    changeFrequency: "weekly",
  }));

  const modelRoutes: SitemapRoute[] = Object.values(modelPageConfigs).map((page) => ({
    path: page.slug,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const compareRoutes: SitemapRoute[] = getComparePageEntries().map((page) => ({
    path: `compare/${page.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const guideRoutes: SitemapRoute[] = getGuideEntries().map((page) => ({
    path: `guides/${page.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...modelRoutes,
    ...compareRoutes,
    ...guideRoutes,
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
