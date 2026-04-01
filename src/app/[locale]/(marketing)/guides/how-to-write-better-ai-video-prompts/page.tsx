import type { Metadata } from "next";

import { GuideArticlePage } from "@/components/marketing/guide-article-page";
import { getGuideConfig } from "@/config/guides";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

const config = getGuideConfig("how-to-write-better-ai-video-prompts");

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
      "AI video prompts",
      "how to write AI video prompts",
      "text to video prompt guide",
      "AI video prompt examples",
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
