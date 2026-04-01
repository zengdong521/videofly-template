import type { Metadata } from "next";

import { CompareLandingPage } from "@/components/marketing/compare-landing-page";
import { getComparePageConfig } from "@/config/compare-pages";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

const config = getComparePageConfig("sora-2-vs-veo-3-1");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = config.copy[locale];
  const alternates = buildAlternates(`/compare/${config.slug}`, locale);
  const ogImage = resolveOgImage(config.ogImage);

  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      "Sora 2 vs Veo 3.1",
      "AI video model comparison",
      "Sora vs Veo",
      "text to video comparison",
      "AI video generator comparison",
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

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CompareLandingPage config={config} locale={locale} />;
}
