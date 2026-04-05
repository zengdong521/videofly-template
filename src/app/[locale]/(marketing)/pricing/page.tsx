import type { Metadata } from "next";

import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates("/pricing", locale);
  const ogImage = resolveOgImage("/og-pricing.jpg");
  const titles = {
    en: "AI Video Pricing Plans",
    zh: "AI 视频生成定价方案",
  };
  const descriptions = {
    en: "Compare VideoAI pricing plans, credit packages, and subscription options for AI video generation.",
    zh: "查看 VideoAI 的 AI 视频生成套餐、积分包和订阅方案，快速选择适合你的价格计划。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: alternates.canonical,
      siteName: siteConfig.name,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function PricingPage({
  params: _params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  void _params;

  return (
    <>
      <div className="flex w-full flex-col gap-0">
        <PricingSection />
        <FAQSection />
      </div>
    </>
  );
}
