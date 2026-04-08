import Script from "next/script";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
// import { ShowcaseSection } from "@/components/landing/showcase-section";
import { HowItWorks } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { Button } from "@/components/ui/button";

import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { i18n } from "@/config/i18n-config";
import { buildAlternates, resolveOgImage } from "@/lib/seo";
import { getConfiguredAIProvider } from "@/ai";
import { buildServiceSchema } from "@/components/seo/service-schema";
import { LocaleLink } from "@/i18n/navigation";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

interface PageMetadataProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: PageMetadataProps) {
  const { locale } = await params;

  const titles = {
    en: "Seedance 2.0 AI Video Generator | VideoAI",
    zh: "Seedance 2.0 AI 视频生成器 | VideoAI",
  };

  const descriptions = {
    en: "Seedance 2.0 AI video generator for text to video, image to video, and reference image to video. Create short-form clips for ads, demos, and social media.",
    zh: "Seedance 2.0 AI 视频生成器，支持文生视频、图生视频和参考图生视频。",
  };

  const keywords = {
    en: [
      "Seedance 2.0",
      "Seedance AI",
      "text to video",
      "image to video",
      "reference image to video",
    ],
    zh: [
      "Seedance 2.0",
      "Seedance AI",
      "文生视频",
      "图生视频",
      "参考图生视频",
    ],
  };

  const canonicalUrl = `${siteConfig.url}${locale === i18n.defaultLocale ? "" : `/${locale}`}`;
  const alternates = buildAlternates("/", locale);
  const ogImage = resolveOgImage("/og-home.jpg");

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: keywords[locale] || keywords.en,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
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

export default async function HomePage({ params: _params }: HomePageProps) {
  const { locale } = await _params;
  const serviceSchema = buildServiceSchema();
  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema }}
      />
      <HeroSection currentProvider={getConfiguredAIProvider()} />
      {/* <ShowcaseSection /> */}
      <FeaturesSection />
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border/70 bg-card p-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
              {locale === "zh" ? "模型对比" : "Compare"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {locale === "zh"
                ? "先判断模型路线，再开始生成"
                : "Choose the right model direction before you generate"}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {locale === "zh"
                ? "查看不同 AI 视频工作流的静态对比页，快速理解 Seedance 2.0、Seedance 2.0 Fast 与其他路线分别适合哪类内容。"
                : "Use the comparison pages to understand whether Seedance 2.0, Seedance 2.0 Fast, or another AI video workflow is the best fit for your goals."}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <LocaleLink href="/compare" title={locale === "zh" ? "查看模型对比" : "Explore comparisons"}>
                  {locale === "zh" ? "查看模型对比" : "Explore comparisons"}
                </LocaleLink>
              </Button>
            </div>
          </article>
          <article className="rounded-3xl border border-border/70 bg-card p-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
              {locale === "zh" ? "创作指南" : "Guides"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {locale === "zh"
                ? "从 Prompt 到广告创作的教程内容"
                : "Tutorials for prompts, ads, and launch workflows"}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {locale === "zh"
                ? "阅读 Seedance prompt 写法、产品发布流程和短视频广告创作指南，把搜索流量和用户教育一起做起来。"
                : "Browse practical guides on Seedance prompting, product launch workflows, and short-form AI ad creation."}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <LocaleLink href="/guides" title={locale === "zh" ? "阅读指南" : "Read guides"}>
                  {locale === "zh" ? "阅读指南" : "Read guides"}
                </LocaleLink>
              </Button>
            </div>
          </article>
        </div>
      </section>
      <HowItWorks />
      <PricingSection />
      <CTASection />
      <FAQSection />
    </>
  );
}
