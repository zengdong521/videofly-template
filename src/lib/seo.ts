import { existsSync } from "node:fs";
import { join } from "node:path";

import { i18n, localeConfig, type Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";

function normalizePathname(pathname: string): string {
  const trimmed = pathname.trim();
  if (trimmed === "" || trimmed === "/") {
    return "";
  }
  const normalized = trimmed.replace(/^\/+/, "").replace(/\/+$/, "");
  return `/${normalized}`;
}

export function getLocaleUrl(pathname: string, locale: Locale): string {
  const normalizedPath = normalizePathname(pathname);
  const prefix = locale === i18n.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${normalizedPath}`;
}

export function buildAlternates(pathname: string, locale: Locale) {
  const languages = Object.fromEntries(
    i18n.locales.map((loc) => [localeConfig[loc].hreflang, getLocaleUrl(pathname, loc)])
  );
  languages["x-default"] = getLocaleUrl(pathname, i18n.defaultLocale);

  return {
    canonical: getLocaleUrl(pathname, locale),
    languages,
  };
}

function hasPublicAsset(assetPath: string): boolean {
  if (!assetPath.startsWith("/")) {
    return true;
  }

  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\/+/, "")));
}

export function resolveOgImage(preferred?: string): string | undefined {
  const candidates = [preferred, siteConfig.ogImage].filter(
    (value): value is string => Boolean(value)
  );

  return candidates.find(hasPublicAsset);
}
