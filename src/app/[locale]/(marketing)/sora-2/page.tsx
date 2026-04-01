import type { Metadata } from "next";

import { ModelLandingPage } from "@/components/marketing/model-landing-page";
import type { Locale } from "@/config/i18n-config";
import { getModelPageConfig } from "@/config/model-pages";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

const config = getModelPageConfig("sora-2");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = config.copy[locale];
  const alternates = buildAlternates("/sora-2", locale);
  const ogImage = resolveOgImage(config.ogImage);

  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      "Sora 2",
      "Sora 2 AI video generator",
      "OpenAI video model",
      "text to video",
      "image to video",
      "AI video generator",
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

export default async function Sora2Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <ModelLandingPage config={config} locale={locale} />;
}
