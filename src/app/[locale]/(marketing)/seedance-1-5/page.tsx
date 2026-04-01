import type { Metadata } from "next";

import { ModelLandingPage } from "@/components/marketing/model-landing-page";
import type { Locale } from "@/config/i18n-config";
import { getModelPageConfig } from "@/config/model-pages";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

const config = getModelPageConfig("seedance-1-5");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = config.copy[locale];
  const alternates = buildAlternates("/seedance-1-5", locale);
  const ogImage = resolveOgImage(config.ogImage);

  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      "Seedance 1.5",
      "Seedance 1.5 AI video generator",
      "ByteDance AI video",
      "short form AI video",
      "text to video",
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

export default async function Seedance15Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <ModelLandingPage config={config} locale={locale} />;
}
