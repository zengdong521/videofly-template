import type { Metadata } from "next";

import { GuideArticlePage } from "@/components/marketing/guide-article-page";
import { getGuideConfig } from "@/config/guides";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

const config = getGuideConfig("best-ai-video-workflow-for-product-launches");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = config.copy[locale];
  const alternates = buildAlternates(`/guides/${config.slug}`, locale);
  const ogImage = resolveOgImage(config.ogImage);

  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      "AI video workflow",
      "product launch video workflow",
      "AI video for product launches",
      "launch video guide",
    ],
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "article",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <GuideArticlePage config={config} locale={locale} />;
}
