import type { MetadataRoute } from "next";

import { i18n } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    "/api/",
    "/admin",
    "/login",
    "/register",
    "/my-creations",
    "/credits",
    "/settings",
  ];
  const localizedPrivatePaths = i18n.locales.flatMap((locale) =>
    locale === i18n.defaultLocale
      ? privatePaths
      : privatePaths.map((path) => `/${locale}${path}`)
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: localizedPrivatePaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
