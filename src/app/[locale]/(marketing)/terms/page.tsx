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
    const alternates = buildAlternates("/terms", locale);
    const ogImage = resolveOgImage();
    const titles = {
        en: "Terms of Service",
        zh: "服务条款",
    };
    const descriptions = {
        en: "Read the VideoAI terms of service, billing rules, and platform usage requirements.",
        zh: "查看 VideoAI 服务条款、计费规则和平台使用要求。",
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

export default async function TermsPage({
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
                        <h1>服务条款</h1>
                        <p className="lead">生效日期：2026年2月8日</p>

                        <h2>1. 接受条款</h2>
                        <p>
                            欢迎使用 VideoAI（"我们"、"我们的"或"本平台"）。访问或使用我们的网站和服务，即表示您同意受这些服务条款（"条款"）的约束。如果您不同意这些条款的任何部分，您就没有权利使用我们的服务。
                        </p>

                        <h2>2. 服务描述</h2>
                        <p>
                            VideoAI 是一个 AI 驱动的视频生成平台，允许用户通过文本、图片等输入生成视频内容。我们要努力提供高质量的服务，但不保证生成的视频总是完全符合您的期望。
                        </p>

                        <h2>3. 用户账户</h2>
                        <p>
                            为了使用某些功能，您可能需要注册账户。您负责维护账户信息的保密性，并对该账户下的所有活动负责。您必须提供准确、完整的信息。
                        </p>

                        <h2>4. 使用规范</h2>
                        <p>您同意不使用本服务从事以下行为：</p>
                        <ul>
                            <li>生成非法、有害、威胁、辱骂、骚扰、诽谤、淫秽或其他令人反感的内容。</li>
                            <li>生成露骨的性内容、不适宜工作场所观看的内容，或任何形式的色情内容。</li>
                            <li>侵犯任何人的知识产权或其他权利。</li>
                            <li>干扰或破坏服务的完整性或性能。</li>
                            <li>试图未经授权访问服务或其相关系统或网络。</li>
                        </ul>

                        <h2>4.1 内容安全与适度性</h2>
                        <p>
                            VideoAI 严格禁止使用本服务生成以下类型的内容：
                        </p>
                        <ul>
                            <li>露骨的性内容、色情内容或任何性暗示内容</li>
                            <li>不适宜工作场所观看的内容</li>
                            <li>暴力、血腥或令人极度反感的内容</li>
                            <li>未成年人相关的任何不当内容</li>
                            <li>骚扰、歧视或仇恨内容</li>
                        </ul>
                        <p>
                            任何违反本条款的内容生成行为将导致账户立即终止，且已消耗的积分不予退还。我们保留对违规内容进行报告的权利。
                        </p>

                        <h2>5. 知识产权</h2>
                        <p>
                            根据本条款，您保留对您上传到本平台的内容的所有权。对于使用本平台生成的视频内容，在您遵守本条款的前提下，我们授予您使用、复制和分发这些内容的权利。
                        </p>

                        <h2>6. 积分与支付</h2>
                        <p>
                            本服务的某些功能需要使用积分。积分可以通过购买或订阅获得。除法律规定外，支付的所有费用均不可退还。我们保留随时更改价格和收费模式的权利。
                        </p>

                        <h2>7. 免责声明</h2>
                        <p>
                            本服务按"现状"和"可用"基础提供，不附带任何形式的明示或暗示保证。我们不保证服务将不间断、及时、安全或无错误。
                        </p>

                        <h2>8. 责任限制</h2>
                        <p>
                            在法律允许的最大范围内，VideoAI 不对任何间接、偶然、特殊、后果性或惩罚性损害承担责任，包括但不限于利润损失、数据丢失或商誉受损。
                        </p>

                        <h2>9. 条款变更</h2>
                        <p>
                            我们要保留随时修改这些条款的权利。修改后的条款将在发布到网站后生效。您在变更后继续使用服务即表示您接受修改后的条款。
                        </p>

                        <h2>10. 联系我们</h2>
                        <p>
                            如果您对这些条款有任何疑问，请联系我们：support@donney.pro
                        </p>
                    </>
                ) : (
                    <>
                        <h1>Terms of Service</h1>
                        <p className="lead">Effective Date: February 8, 2026</p>

                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            Welcome to VideoAI ("we," "our," or "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to any part of these Terms, you do not have permission to access the Service.
                        </p>

                        <h2>2. Description of Service</h2>
                        <p>
                            VideoAI is an AI-powered video generation platform that allows users to create video content from text, images, and other inputs. We strive to provide high-quality services but do not guarantee that generated videos will always meet your exact expectations.
                        </p>

                        <h2>3. User Accounts</h2>
                        <p>
                            To access certain features, you may need to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must provide accurate and complete information.
                        </p>

                        <h2>4. Usage Guidelines</h2>
                        <p>You agree not to use the Service to:</p>
                        <ul>
                            <li>Generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable.</li>
                            <li>Generate explicit sexual content, content not suitable for workplace viewing, or any form of pornographic material.</li>
                            <li>Infringe upon the intellectual property or other rights of any person or entity.</li>
                            <li>Interfere with or disrupt the integrity or performance of the Service.</li>
                            <li>Attempt to gain unauthorized access to the Service or its related systems or networks.</li>
                        </ul>

                        <h2>4.1 Content Safety and Appropriateness</h2>
                        <p>
                            VideoAI strictly prohibits the use of this Service to generate the following types of content:
                        </p>
                        <ul>
                            <li>Explicit sexual content, pornographic material, or any sexually suggestive content</li>
                            <li>Content not suitable for workplace viewing</li>
                            <li>Violent, gory, or highly offensive content</li>
                            <li>Any inappropriate content involving minors</li>
                            <li>Harassment, discrimination, or hate speech</li>
                        </ul>
                        <p>
                            Any content generation that violates these terms will result in immediate account termination, and consumed credits will not be refunded. We reserve the right to report violating content.
                        </p>

                        <h2>5. Intellectual Property</h2>
                        <p>
                            Subject to these Terms, you retain ownership of the content you upload to the platform. For video content generated using the platform, we grant you the right to use, reproduce, and distribute such content, provided you comply with these Terms.
                        </p>

                        <h2>6. Credits and Payments</h2>
                        <p>
                            Certain features of the Service require credits. Credits can be obtained through purchase or subscription. Except as required by law, all fees paid are non-refundable. We reserve the right to change our prices and billing methods at any time.
                        </p>

                        <h2>7. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.
                        </p>

                        <h2>8. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, VideoAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill.
                        </p>

                        <h2>9. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Modified terms will become effective upon posting to the website. Your continued use of the Service after changes constitutes your acceptance of the modified Terms.
                        </p>

                        <h2>10. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: support@donney.pro
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
