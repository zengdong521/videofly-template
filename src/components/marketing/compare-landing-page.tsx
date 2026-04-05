import Script from "next/script";

import { buildBreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/config/i18n-config";
import type { ComparePageConfig } from "@/config/compare-pages";
import { siteConfig } from "@/config/site";
import { LocaleLink } from "@/i18n/navigation";

interface CompareLandingPageProps {
  config: ComparePageConfig;
  locale: Locale;
}

export function CompareLandingPage({
  config,
  locale,
}: CompareLandingPageProps) {
  const copy = config.copy[locale];
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${siteConfig.url}${localePrefix}/compare/${config.slug}`;

  const breadcrumbSchema = buildBreadcrumbSchema({
    items: [
      {
        name: locale === "zh" ? "首页" : "Home",
        url: `${siteConfig.url}${localePrefix}`,
      },
      {
        name: locale === "zh" ? "模型对比" : "Model Comparisons",
        url: `${siteConfig.url}${localePrefix}/compare`,
      },
      {
        name: `${config.models[0]} vs ${config.models[1]}`,
        url: pageUrl,
      },
    ],
  });

  const webPageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    about: config.models.map((model) => ({
      "@type": "Thing",
      name: model,
    })),
  });

  return (
    <>
      <Script
        id={`${config.slug}-breadcrumb-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Script
        id={`${config.slug}-webpage-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webPageSchema }}
      />
      <div className="bg-background">
        <section className="border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                {config.models[0]} vs {config.models[1]}
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-primary/80">
                <span>
                  {locale === "zh"
                    ? `作者：${siteConfig.name} Team`
                    : `By ${siteConfig.name} Team`}
                </span>
                <span>
                  {locale === "zh"
                    ? "更新于 2026-04-01"
                    : "Updated 2026-04-01"}
                </span>
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {copy.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <LocaleLink href="/text-to-video">{copy.primaryCta}</LocaleLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <LocaleLink href="/image-to-video">{copy.secondaryCta}</LocaleLink>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-border/70 bg-card p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.summaryTitle}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{copy.summaryBody}</p>
          </article>
          <aside className="rounded-3xl border border-border/70 bg-muted/30 p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.winnerTitle}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{copy.winnerBody}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {locale === "zh"
                ? "本页用于帮助你比较不同工作流的适用场景，不代表任一模型方的官方性能声明。"
                : "This page is intended to help compare workflow fit and should not be interpreted as an official performance claim from any model provider."}
            </p>
          </aside>
        </section>

        <section className="container mx-auto px-4 py-6">
          <div className="rounded-[2rem] border border-border/70 bg-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.categoryTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {copy.categories.map((category) => (
                <article key={category.label} className="rounded-3xl border border-border/50 bg-background p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
                    {category.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{category.winner}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{category.reason}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-3">
          {copy.sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-border/70 bg-card p-8">
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="container mx-auto px-4 py-6">
          <div className="rounded-[2rem] border border-border/70 bg-muted/30 p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.faqTitle}</h2>
            <div className="mt-8 space-y-4">
              {copy.faqs.map((faq) => (
                <article key={faq.question} className="rounded-3xl border border-border/50 bg-background p-6">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:py-18">
          <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              {locale === "zh" ? "继续进入实际生成流程" : "Move from research to generation"}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-muted-foreground">
              {locale === "zh"
                ? "如果你已经完成模型判断，下一步就是直接用工具页开始生成、试稿和迭代。"
                : "Once you know which model direction fits your goal, the next step is to start generating and iterating inside the tool pages."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <LocaleLink href="/text-to-video">{copy.primaryCta}</LocaleLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <LocaleLink href="/reference-to-video">
                  {locale === "zh" ? "查看参考视频生成" : "Open Reference to Video"}
                </LocaleLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
