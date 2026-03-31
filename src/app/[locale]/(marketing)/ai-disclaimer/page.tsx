import type { Metadata } from "next";

import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const alternates = buildAlternates("/ai-disclaimer", locale);
    const ogImage = resolveOgImage();
    const titles = {
        en: "AI Provider Disclaimer",
        zh: "AI 模型免责声明",
    };
    const descriptions = {
        en: "Review VideoAI's disclaimer about OpenAI, Google DeepMind, ByteDance, and third-party AI model providers.",
        zh: "查看 VideoAI 关于 OpenAI、Google DeepMind、ByteDance 等第三方 AI 模型提供商的免责声明。",
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
            type: "article",
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

export default async function AIDisclaimerPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    return (
        <div className="container mx-auto max-w-4xl py-12 md:py-24">
            <div className="prose prose-gray dark:prose-invert max-w-none">
                {locale === "zh" ? (
                    <>
                        <h1>AI 模型提供商免责声明</h1>
                        <p className="lead">生效日期：2026年3月31日</p>

                        <h2>概述</h2>
                        <p>
                            VideoAI 平台集成了多种第三方人工智能视频生成模型，包括但不限于：
                        </p>
                        <ul>
                            <li><strong>Sora 2</strong> - 由 OpenAI 开发</li>
                            <li><strong>Veo 3.1</strong> - 由 Google DeepMind 开发</li>
                            <li><strong>Seedance 1.5</strong> - 由 ByteDance 开发</li>
                        </ul>

                        <h2>独立关系声明</h2>
                        <p>
                            VideoAI 与上述第三方 AI 模型提供商（包括 OpenAI、Google DeepMind 和 ByteDance）之间不存在任何关联、代言、授权或合作关系。VideoAI 是一个独立的平台，我们仅通过 API 接口集成这些模型服务商提供的技术能力。
                        </p>
                        <p>
                            任何关于 VideoAI 与上述公司之间存在关联的说法均为不实信息。
                        </p>

                        <h2>责任声明</h2>
                        <p>
                            对于因使用第三方 AI 模型而产生的任何问题，包括但不限于：
                        </p>
                        <ul>
                            <li>生成内容的质量、准确性或适当性</li>
                            <li>模型的可用性、响应时间或技术故障</li>
                            <li>任何第三方服务提供商的政策或行为</li>
                        </ul>
                        <p>
                            VideoAI 不承担任何直接、间接、特殊或后果性的责任。用户在使用第三方 AI 模型时应自行承担风险。
                        </p>

                        <h2>内容安全</h2>
                        <p>
                            请参阅我们的服务条款了解关于内容生成和使用规范的所有要求。所有用户必须遵守适用于您所在司法管辖区的法律法规。
                        </p>

                        <h2>联系我们</h2>
                        <p>
                            如果您对本免责声明有任何疑问，请联系我们：support@donney.pro
                        </p>
                    </>
                ) : (
                    <>
                        <h1>AI Model Provider Disclaimer</h1>
                        <p className="lead">Effective Date: March 31, 2026</p>

                        <h2>Overview</h2>
                        <p>
                            The VideoAI platform integrates multiple third-party artificial intelligence video generation models, including but not limited to:
                        </p>
                        <ul>
                            <li><strong>Sora 2</strong> - Developed by OpenAI</li>
                            <li><strong>Veo 3.1</strong> - Developed by Google DeepMind</li>
                            <li><strong>Seedance 1.5</strong> - Developed by ByteDance</li>
                        </ul>

                        <h2>Independent Relationship Statement</h2>
                        <p>
                            VideoAI is not affiliated with, endorsed by, authorized by, or in any partnership or business relationship with any of the aforementioned third-party AI model providers (including OpenAI, Google DeepMind, and ByteDance). VideoAI is an independent platform that solely integrates the technical capabilities provided by these model service providers through API interfaces.
                        </p>
                        <p>
                            Any claims suggesting a relationship between VideoAI and the companies mentioned above are false information.
                        </p>

                        <h2>Limitation of Liability</h2>
                        <p>
                            VideoAI assumes no direct, indirect, special, or consequential liability for any issues arising from the use of third-party AI models, including but not limited to:
                        </p>
                        <ul>
                            <li>The quality, accuracy, or appropriateness of generated content</li>
                            <li>The availability, response time, or technical failures of the models</li>
                            <li>The policies or actions of any third-party service provider</li>
                        </ul>
                        <p>
                            Users assume all risks when using third-party AI models.
                        </p>

                        <h2>Content Safety</h2>
                        <p>
                            Please refer to our Terms of Service for all requirements regarding content generation and usage policies. All users must comply with applicable laws and regulations in their jurisdiction.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this disclaimer, please contact us at: support@donney.pro
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
