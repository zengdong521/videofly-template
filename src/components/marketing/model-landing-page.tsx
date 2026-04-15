import Script from "next/script";

import { getComparePageEntries } from "@/config/compare-pages";
import type { Locale } from "@/config/i18n-config";
import type { ModelPageConfig } from "@/config/model-pages";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { buildFaqSchema } from "@/components/seo/faq-schema";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/i18n/navigation";

interface ModelLandingPageProps {
  config: ModelPageConfig;
  locale: Locale;
}

export function ModelLandingPage({ config, locale }: ModelLandingPageProps) {
  const copy = config.copy[locale];
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${siteConfig.url}${localePrefix}/${config.slug}`;
  const relatedComparisons = getComparePageEntries().filter((entry) =>
    entry.models.includes(config.modelName)
  );

  const breadcrumbSchema = buildBreadcrumbSchema({
    items: [
      {
        name: locale === "zh" ? "首页" : "Home",
        url: `${siteConfig.url}${localePrefix}`,
      },
      {
        name: config.modelName,
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
    about: {
      "@type": "SoftwareApplication",
      name: config.modelName,
      provider: {
        "@type": "Organization",
        name: config.provider,
      },
    },
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
  });

  const faqSchema = copy.faqs.length > 0 ? buildFaqSchema(copy.faqs) : "";

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
      {faqSchema && (
        <Script
          id={`${config.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
      )}
      <div className="bg-background">
        <section className="border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                {config.provider}
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

        <section className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-[1.3fr_0.9fr] md:py-18">
          <article className="rounded-3xl border border-border/70 bg-card p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              {locale === "zh" ? `${config.modelName} 是什么` : `What ${config.modelName} is useful for`}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">{copy.intro}</p>
          </article>
          <aside className="rounded-3xl border border-border/70 bg-muted/30 p-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
              {locale === "zh" ? "快速判断" : "Quick take"}
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">{copy.comparisonBody}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {locale === "zh"
                ? "这是一页由 VideoAI 团队整理的工作流与使用建议，不代表模型提供方的官方产品文档。"
                : "This page is an editorial workflow guide prepared by the VideoAI team and should not be treated as official documentation from the model provider."}
            </p>
          </aside>
        </section>

        <section className="container mx-auto grid gap-8 px-4 py-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.strengthsTitle}</h2>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              {copy.strengths.map((item) => (
                <li key={item} className="rounded-2xl border border-border/50 bg-background px-4 py-3 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.useCasesTitle}</h2>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              {copy.useCases.map((item) => (
                <li key={item} className="rounded-2xl border border-border/50 bg-background px-4 py-3 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14">
          <div className="rounded-[2rem] border border-border/70 bg-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.workflowTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {copy.workflowSteps.map((step, index) => (
                <div key={step} className="rounded-3xl border border-border/50 bg-background p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
                    {locale === "zh" ? `步骤 ${index + 1}` : `Step ${index + 1}`}
                  </p>
                  <p className="mt-3 leading-7 text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
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

        <section className="container mx-auto px-4 py-6">
          <div className="rounded-[2rem] border border-border/70 bg-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              {locale === "zh" ? "相关模型对比" : "Related comparisons"}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedComparisons.map((entry) => (
                <article
                  key={entry.slug}
                  className="rounded-3xl border border-border/50 bg-background p-6"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
                    {entry.models.join(" vs ")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">
                    {entry.copy[locale].title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {entry.copy[locale].description}
                  </p>
                  <div className="mt-5">
                    <Button asChild variant="outline">
                      <LocaleLink href={`/compare/${entry.slug}`}>
                        {locale === "zh" ? "查看对比" : "Read comparison"}
                      </LocaleLink>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:py-18">
          <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              {copy.comparisonTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-muted-foreground">
              {copy.comparisonBody}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <LocaleLink href="/text-to-video">{copy.primaryCta}</LocaleLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <LocaleLink href="/reference-to-video">
                  {locale === "zh" ? "试试参考视频生成" : "Try Reference to Video"}
                </LocaleLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
