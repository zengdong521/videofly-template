import { execFileSync } from "node:child_process";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import { i18n } from "@/config/i18n-config";
import { getSiteUrl } from "@/lib/site-url";

export const SITEMAP_REVALIDATE_SECONDS = 3600;

type SitemapChangeFrequency = "daily" | "weekly" | "monthly";

interface ScannedPage {
  path: string;
  file: string;
  priority: number;
  changeFrequency: SitemapChangeFrequency;
}

interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}

const EXCLUDED_ROUTE_GROUPS = ["/(dashboard)/", "/(admin)/", "/(auth)/"];
const EXCLUDED_ROUTE_PATHS = new Set([
  "privacy-policy",
  "terms-of-service",
  "og-image",
]);

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getLastModified(filePath: string): Date | undefined {
  try {
    const timestamp = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", filePath],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();

    if (timestamp) {
      return new Date(timestamp);
    }
  } catch (error) {
    console.warn(`Failed to get git timestamp for ${filePath}`, error);
  }

  return undefined;
}

async function scanPages(
  dir: string,
  baseDir: string
): Promise<ScannedPage[]> {
  const pages: ScannedPage[] = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (
        entry.name.startsWith("_") ||
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === "api"
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        pages.push(...(await scanPages(fullPath, baseDir)));
        continue;
      }

      if (entry.name !== "page.tsx") {
        continue;
      }

      if (EXCLUDED_ROUTE_GROUPS.some((segment) => fullPath.includes(segment))) {
        continue;
      }

      const relativePath = fullPath.replace(baseDir, "");
      const routePath =
        relativePath
          .replace(/\/page\.tsx$/, "")
          .replace(/\[.*?\]/g, "")
          .replace(/\/\([^)]+\)/g, "")
          .replace("//", "/")
          .replace(/^\//, "") || "/";

      if (EXCLUDED_ROUTE_PATHS.has(routePath)) {
        continue;
      }

      let priority = 0.8;
      let changeFrequency: SitemapChangeFrequency = "weekly";

      if (routePath === "/" || routePath === "") {
        priority = 1.0;
      } else if (routePath.includes("pricing")) {
        priority = 0.9;
        changeFrequency = "monthly";
      } else if (routePath.includes("privacy") || routePath.includes("terms")) {
        priority = 0.3;
        changeFrequency = "monthly";
      } else if (routePath.includes("-to-")) {
        priority = 0.9;
      } else if (/\d/.test(routePath)) {
        priority = 0.6;
        changeFrequency = "monthly";
      }

      pages.push({
        path: routePath === "/" ? "" : routePath,
        file: fullPath,
        priority,
        changeFrequency,
      });
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return pages;
}

export async function buildSitemapEntries(): Promise<SitemapEntry[]> {
  const baseUrl = getSiteUrl();
  const appDir = join(process.cwd(), "src", "app", "[locale]");
  const routes = await scanPages(appDir, appDir);

  console.log("🗺️ Sitemap: 发现页面:", routes.length);

  const entries: SitemapEntry[] = [];

  for (const route of routes) {
    let lastModified = getLastModified(route.file);

    if (!lastModified) {
      try {
        lastModified = (await stat(route.file)).mtime;
      } catch (error) {
        console.warn(`Failed to read mtime for ${route.file}`, error);
      }
    }

    for (const locale of i18n.locales) {
      const localePath = locale === i18n.defaultLocale ? "" : `/${locale}`;
      const url = `${baseUrl}${localePath}${route.path ? `/${route.path}` : ""}`;

      entries.push({
        url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  console.log(`🗺️ Sitemap: 生成 ${entries.length} 个 URL`);

  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((entry) => {
      const parts = [
        "<url>",
        `<loc>${escapeXml(entry.url)}</loc>`,
      ];

      if (entry.lastModified) {
        parts.push(`<lastmod>${entry.lastModified.toISOString()}</lastmod>`);
      }

      parts.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
      parts.push(`<priority>${entry.priority.toString()}</priority>`);
      parts.push("</url>");

      return parts.join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");
}
