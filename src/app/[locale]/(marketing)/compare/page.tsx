import type { Metadata } from "next";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import { buildItemListSchema } from "@/components/seo/itemlist-schema";
import { getComparePageEntries } from "@/config/compare-pages";
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
  const alternates = buildAlternates("/compare", locale);
  const title =
    locale === "zh" ? "AI 视频模型对比" : "AI Video Model Comparisons";
  const description =
    locale === "zh"
      ? "查看 Seedance 2.0 与其他 AI 视频工作流的对比，快速理解不同路线适合的创作场景。"
      : "Compare Seedance 2.0 with other AI video workflows to understand which direction fits your content goals.";

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

export default async function CompareHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const entries = getComparePageEntries();
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const listUrl = `${siteConfig.url}${localePrefix}/compare`;
  const itemListSchema = buildItemListSchema(
    locale === "zh" ? "AI 视频模型对比" : "AI Video Model Comparisons",
    listUrl,
    entries.map((entry) => ({
      name: entry.copy[locale].title,
      url: `${siteConfig.url}${localePrefix}/compare/${entry.slug}`,
      description: entry.copy[locale].description,
    })),
  );

  return (
    <div className="bg-background">
      {itemListSchema && (
        <Script
          id="compare-itemlist-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: itemListSchema }}
        />
      )}
      <section className="border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
              {locale === "zh" ? "模型对比" : "Comparisons"}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              {locale === "zh"
                ? "AI 视频模型怎么选"
                : "How to choose the right AI video model"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {locale === "zh"
                ? "这里整理了当前几个核心 AI 视频模型的对比页，适合在真正开始生成前先做判断。"
                : "This hub collects the highest-intent comparison pages for the main AI video model workflows available in VideoAI."}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-14 md:grid-cols-3">
        {entries.map((entry) => (
          <article key={entry.slug} className="rounded-3xl border border-border/70 bg-card p-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
              {entry.models.join(" vs ")}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {entry.copy[locale].title}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {entry.copy[locale].description}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <LocaleLink href={`/compare/${entry.slug}`}>
                  {locale === "zh" ? "查看对比" : "Read comparison"}
                </LocaleLink>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
