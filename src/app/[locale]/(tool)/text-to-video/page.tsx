import { getToolPageConfig, getToolPageConfigForProvider } from "@/config/tool-pages";
import { ToolPageLayout } from "@/components/tool/tool-page-layout";
import type { Locale } from "@/config/i18n-config";
import { buildAlternates, resolveOgImage } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { getConfiguredAIProvider } from "@/ai";
import { buildHowToSchema } from "@/components/seo/howto-schema";
import Script from "next/script";

interface TextToVideoPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: TextToVideoPageProps) {
  const { locale } = await params;
  const config = getToolPageConfig("text-to-video");
  const alternates = buildAlternates("/text-to-video", locale);
  const ogImage = resolveOgImage(config.seo?.ogImage);

  return {
    title: config.seo?.title,
    description: config.seo?.description,
    keywords: config.seo?.keywords,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: config.seo?.title,
      description: config.seo?.description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      type: "website",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo?.title,
      description: config.seo?.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function TextToVideoPage({ params }: TextToVideoPageProps) {
  const config = getToolPageConfigForProvider(
    "text-to-video",
    getConfiguredAIProvider()
  );
  const { locale } = await params;
  const howToSchema = buildHowToSchema({
    locale,
    toolName: config.seo.title,
    toolDescription: config.seo.description,
    steps: [
      { name: "Enter Prompt", text: "Describe the video you want to create in the text input field" },
      { name: "Select Settings", text: "Choose video duration, aspect ratio, and other options" },
      { name: "Generate Video", text: "Click generate and wait 2-5 minutes for your AI video to be created" },
      { name: "Download & Share", text: "Preview, download, or share your generated video" },
    ],
  });
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: howToSchema }}
      />
      <ToolPageLayout
        config={config}
        locale={locale}
        toolRoute="text-to-video"
      />
    </>
  );
}
