import type { Metadata } from "next";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import { buildItemListSchema } from "@/components/seo/itemlist-schema";
import { getGuideEntries } from "@/config/guides";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates } from "@/lib/seo";
import { LocaleLink } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates("/guides", locale);
  const title = locale === "zh" ? "AI 视频指南" : "AI Video Guides";
  const description =
    locale === "zh"
      ? "查看 AI 视频创作指南，覆盖 prompt 写法、广告制作、产品发布工作流和模型选择。"
      : "Browse AI video guides covering prompting, ad creation, product launch workflows, and model selection.";

  return {
    title,
    description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GuidesHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const guides = getGuideEntries();
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const listUrl = `${siteConfig.url}${localePrefix}/guides`;
  const itemListSchema = buildItemListSchema(
    locale === "zh" ? "AI 视频指南" : "AI Video Guides",
    listUrl,
    guides.map((g) => ({
      name: g.copy[locale].title,
      url: `${siteConfig.url}${localePrefix}/guides/${g.slug}`,
      description: g.copy[locale].excerpt,
    })),
  );

  return (
    <div className="bg-background">
      {itemListSchema && (
        <Script
          id="guides-itemlist-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: itemListSchema }}
        />
      )}
      <section className="border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
              {locale === "zh" ? "指南" : "Guides"}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              {locale === "zh"
                ? "AI 视频创作实战指南"
                : "Practical guides for AI video creation"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {locale === "zh"
                ? "这里会逐步覆盖 prompt 写法、模型选择、广告创作和发布工作流等更接近实际搜索意图的内容。"
                : "This section expands VideoAI beyond landing pages with tutorial-style content designed to capture real search intent."}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-14 md:grid-cols-3">
        {guides.map((guide) => (
          <article key={guide.slug} className="rounded-3xl border border-border/70 bg-card p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-primary/80">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium">
                {guide.copy[locale].category}
              </span>
              <span>{guide.copy[locale].readTime}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {guide.copy[locale].title}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {guide.copy[locale].excerpt}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <LocaleLink href={`/guides/${guide.slug}`}>
                  {locale === "zh" ? "阅读指南" : "Read guide"}
                </LocaleLink>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
