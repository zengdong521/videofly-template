import { getToolPageConfig, getToolPageConfigForProvider } from "@/config/tool-pages";
import { ToolPageLayout } from "@/components/tool/tool-page-layout";
import type { Locale } from "@/config/i18n-config";
import { buildAlternates, resolveOgImage } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { getConfiguredAIProvider } from "@/ai";
import { buildHowToSchema } from "@/components/seo/howto-schema";
import { buildToolBreadcrumbs } from "@/components/seo/breadcrumb-schema";
import Script from "next/script";

interface ImageToVideoPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: ImageToVideoPageProps) {
  const { locale } = await params;
  const config = getToolPageConfig("image-to-video");
  const alternates = buildAlternates("/image-to-video", locale);
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

export default async function ImageToVideoPage({ params }: ImageToVideoPageProps) {
  const config = getToolPageConfigForProvider(
    "image-to-video",
    getConfiguredAIProvider()
  );
  const { locale } = await params;
  const howToSchema = buildHowToSchema({
    locale,
    pathname: "/image-to-video",
    toolName: config.seo.title,
    toolDescription: config.seo.description,
    steps: [
      { name: "Upload Image", text: "Upload a photo (JPG, PNG, WEBP up to 10MB)" },
      { name: "Add Description", text: "Describe how you want the image to be animated" },
      { name: "Set Options", text: "Choose video duration and aspect ratio" },
      { name: "Generate & Download", text: "Generate and download your animated video in minutes" },
    ],
  });
  const breadcrumbSchema = buildToolBreadcrumbs(
    locale === "zh" ? "图片转视频" : "Image to Video",
    "/image-to-video",
    locale
  );
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: howToSchema }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <ToolPageLayout
        config={config}
        locale={locale}
        toolRoute="image-to-video"
      />
    </>
  );
}
