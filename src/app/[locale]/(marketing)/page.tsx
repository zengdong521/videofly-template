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
import { buildFAQPageSchema } from "@/components/seo/faq-schema";
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
    en: "AI Video Generator - Create Stunning Videos with Sora 2 & Veo 3.1",
    zh: "AI视频生成器 - 使用Sora 2和Veo 3.1创建精彩视频",
  };

  const descriptions = {
    en: "Transform your ideas into stunning videos with AI. Access Sora 2, Veo 3.1, and more. Fast, easy, and professional quality video generation in minutes. Start creating today!",
    zh: "用AI将您的想法转化为精彩视频。访问Sora 2、Veo 3.1等模型。快速、简单、专业品质的视频生成，几分钟内完成。立即开始创作！",
  };

  const canonicalUrl = `${siteConfig.url}${locale === i18n.defaultLocale ? "" : `/${locale}`}`;
  const alternates = buildAlternates("/", locale);
  const ogImage = resolveOgImage("/og-home.jpg");

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
  const faqSchema = buildFAQPageSchema(locale);
  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
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
                ? "查看 Sora 2、Veo 3.1 和 Seedance 1.5 的静态对比页，快速理解不同模型更适合哪类内容。"
                : "Use the comparison pages to understand whether Sora 2, Veo 3.1, or Seedance 1.5 is the best fit for your workflow."}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <LocaleLink href="/compare">
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
                ? "阅读 prompt 写法、产品发布流程和短视频广告创作指南，把搜索流量和用户教育一起做起来。"
                : "Browse practical guides on prompt writing, product launch workflows, and short-form AI ad creation."}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <LocaleLink href="/guides">
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
