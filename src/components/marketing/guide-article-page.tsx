import Script from "next/script";

import { buildBreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { buildFaqSchema } from "@/components/seo/faq-schema";
import { buildHowToSchema } from "@/components/seo/howto-schema";
import { buildSpeakableSchema } from "@/components/seo/speakable-schema";
import { Button } from "@/components/ui/button";
import type { GuideConfig } from "@/config/guides";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { LocaleLink } from "@/i18n/navigation";

interface GuideArticlePageProps {
  config: GuideConfig;
  locale: Locale;
}

export function GuideArticlePage({ config, locale }: GuideArticlePageProps) {
  const copy = config.copy[locale];
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${siteConfig.url}${localePrefix}/guides/${config.slug}`;

  const breadcrumbSchema = buildBreadcrumbSchema({
    items: [
      {
        name: locale === "zh" ? "首页" : "Home",
        url: `${siteConfig.url}${localePrefix}`,
      },
      {
        name: locale === "zh" ? "指南" : "Guides",
        url: `${siteConfig.url}${localePrefix}/guides`,
      },
      {
        name: copy.title,
        url: pageUrl,
      },
    ],
  });

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.title,
    description: copy.description,
    datePublished: copy.publishedAt,
    dateModified: copy.publishedAt,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    url: pageUrl,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
  });

  const faqSchema = copy.faqs.length > 0 ? buildFaqSchema(copy.faqs) : "";

  const howToSchema =
    copy.steps.length > 0
      ? buildHowToSchema(
          copy.title,
          copy.description,
          copy.steps.map((step) => ({ name: step.title, text: step.description })),
        )
      : "";

  const speakableSchema = buildSpeakableSchema(pageUrl, [
    "[data-speakable='guide-intro']",
  ]);

  return (
    <>
      <Script
        id={`${config.slug}-breadcrumb-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Script
        id={`${config.slug}-article-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      {faqSchema && (
        <Script
          id={`${config.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
      )}
      {howToSchema && (
        <Script
          id={`${config.slug}-howto-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: howToSchema }}
        />
      )}
      <Script
        id={`${config.slug}-speakable-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: speakableSchema }}
      />
      <div className="bg-background">
        <section className="border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-sm text-primary/80">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium">
                  {copy.category}
                </span>
                <span>{copy.readTime}</span>
                <span>
                  {locale === "zh"
                    ? `作者：${siteConfig.name} Team`
                    : `By ${siteConfig.name} Team`}
                </span>
                <span>
                  {locale === "zh"
                    ? `发布于 ${copy.publishedAt}`
                    : `Published ${copy.publishedAt}`}
                </span>
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {copy.heroDescription}
              </p>
            </div>
          </div>
        </section>

        <article className="container mx-auto px-4 py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_280px]">
            <div className="space-y-8">
              <section className="rounded-3xl border border-border/70 bg-card p-8">
                <p data-speakable="guide-intro" className="leading-8 text-muted-foreground">{copy.intro}</p>
              </section>

              {copy.sections.map((section) => (
                <section key={section.title} className="rounded-3xl border border-border/70 bg-card p-8">
                  <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                  <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
                </section>
              ))}

              <section className="rounded-3xl border border-border/70 bg-card p-8">
                <h2 className="text-2xl font-semibold tracking-tight">{copy.stepsTitle}</h2>
                <div className="mt-8 space-y-4">
                  {copy.steps.map((step, index) => (
                    <div key={step.title} className="rounded-3xl border border-border/50 bg-background p-6">
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
                        {locale === "zh" ? `步骤 ${index + 1}` : `Step ${index + 1}`}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                      <p className="mt-3 leading-7 text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-border/70 bg-muted/30 p-8">
                <h2 className="text-2xl font-semibold tracking-tight">{copy.faqTitle}</h2>
                <div className="mt-8 space-y-4">
                  {copy.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-3xl border border-border/50 bg-background p-6">
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-3xl border border-border/70 bg-card p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
                {locale === "zh" ? "接下来" : "Next step"}
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                {copy.excerpt}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild>
                  <LocaleLink href="/text-to-video">{copy.primaryCta}</LocaleLink>
                </Button>
                <Button asChild variant="outline">
                  <LocaleLink href="/compare">{copy.secondaryCta}</LocaleLink>
                </Button>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
