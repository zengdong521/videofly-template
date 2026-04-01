import type { Metadata } from "next";
import Script from "next/script";
import type { Locale } from "@/config/i18n-config";
import { siteConfig } from "@/config/site";
import { buildAlternates, resolveOgImage } from "@/lib/seo";

function buildBreadcrumbSchema(locale: Locale) {
  const items = locale === "zh"
    ? [
        { position: 1, name: "首页", url: `${siteConfig.url}/zh` },
        { position: 2, name: "隐私政策", url: `${siteConfig.url}/zh/privacy` },
      ]
    : [
        { position: 1, name: "Home", url: siteConfig.url },
        { position: 2, name: "Privacy Policy", url: `${siteConfig.url}/privacy` },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const alternates = buildAlternates("/privacy", locale);
    const ogImage = resolveOgImage();

    // Title: 50-70 characters (Google 会截断过长的标题)
    const titles = {
        en: "Privacy Policy | VideoAI Data Protection & Privacy Commitment",
        zh: "隐私政策 | VideoAI 用户数据保护与隐私承诺",
    };

    // Description: 150-170 characters
    const descriptions = {
        en: "Read VideoAI's privacy policy. Learn how we protect your data, secure personal information, and ensure your privacy rights with full transparency.",
        zh: "查看 VideoAI 完整隐私政策。了解我们如何保护您的数据、安全处理个人信息，并确保您的隐私权得到充分保障。",
    };

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        keywords: undefined, // Google 不使用 keywords meta tag
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
            publishedTime: "2026-02-08T00:00:00Z",
            modifiedTime: "2026-04-01T00:00:00Z",
            images: ogImage ? [ogImage] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            images: ogImage ? [ogImage] : undefined,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

// 字符数验证（仅供参考）
// English Title: "Privacy Policy | VideoAI Data Protection & Privacy Commitment" = 66 chars ✓
// English Description: "Read VideoAI's privacy policy. Learn how we protect your data..." = 156 chars ✓

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const breadcrumbSchema = buildBreadcrumbSchema(locale);

    return (
        <div className="container mx-auto max-w-4xl py-12 md:py-24">
            {/* BreadcrumbList Structured Data */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumb Navigation - Google SEO 重要元素 */}
            <nav aria-label="Breadcrumb" className="mb-8 text-sm">
                <ol className="flex items-center gap-2 text-muted-foreground">
                    <li>
                        <a href={locale === "zh" ? "/zh" : "/"} className="hover:text-primary transition-colors">
                            {locale === "zh" ? "首页" : "Home"}
                        </a>
                    </li>
                    <li className="text-muted-foreground/50">/</li>
                    <li className="text-foreground font-medium">
                        {locale === "zh" ? "隐私政策" : "Privacy Policy"}
                    </li>
                </ol>
            </nav>

            {/* Hero Section */}
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {locale === "zh" ? "隐私政策" : "Privacy Policy"}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                    {locale === "zh"
                        ? "VideoAI 致力于保护您的隐私和数据安全"
                        : "VideoAI is committed to protecting your privacy and data security"}
                </p>
                <p className="text-sm text-muted-foreground">
                    {locale === "zh"
                        ? "生效日期：2026年2月8日"
                        : "Effective Date: February 8, 2026"}
                </p>
            </header>

            {/* Privacy Protection Visual */}
            <div className="relative w-full h-64 md:h-80 mb-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-primary/50 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-muted-foreground">
                    {locale === "zh"
                        ? "🔒 您的数据安全是我们的首要任务"
                        : "🔒 Your data security is our top priority"}
                </div>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                {/* Table of Contents */}
                <nav aria-label="Table of contents" className="bg-card border rounded-xl p-6 mb-12 not-prose">
                    <h2 className="text-xl font-semibold mb-4">
                        {locale === "zh" ? "目录" : "Table of Contents"}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <a href="#introduction" className="text-primary hover:underline">
                            1. {locale === "zh" ? "引言" : "Introduction"}
                        </a>
                        <a href="#data-collection" className="text-primary hover:underline">
                            2. {locale === "zh" ? "数据收集" : "Data Collection"}
                        </a>
                        <a href="#data-usage" className="text-primary hover:underline">
                            3. {locale === "zh" ? "数据使用" : "Data Usage"}
                        </a>
                        <a href="#data-sharing" className="text-primary hover:underline">
                            4. {locale === "zh" ? "数据共享" : "Data Sharing"}
                        </a>
                        <a href="#data-security" className="text-primary hover:underline">
                            5. {locale === "zh" ? "数据安全" : "Data Security"}
                        </a>
                        <a href="#user-rights" className="text-primary hover:underline">
                            6. {locale === "zh" ? "用户权利" : "User Rights"}
                        </a>
                        <a href="#childrens-privacy" className="text-primary hover:underline">
                            7. {locale === "zh" ? "儿童隐私" : "Children's Privacy"}
                        </a>
                        <a href="#policy-changes" className="text-primary hover:underline">
                            8. {locale === "zh" ? "政策变更" : "Policy Changes"}
                        </a>
                        <a href="#contact" className="text-primary hover:underline">
                            9. {locale === "zh" ? "联系我们" : "Contact Us"}
                        </a>
                    </div>
                </nav>

                {locale === "zh" ? (
                    <>
                        {/* 中文版 */}

                        <section id="introduction" className="mb-12">
                            <h2>1. 引言</h2>
                            <p>
                                VideoAI（"我们"）深知隐私权对于每一位用户的重要性。本隐私政策（"政策"）详细说明当您访问、使用或注册 VideoAI 平台时，我们如何收集、使用、存储、共享和保护您的个人信息。我们承诺以透明、合法的方式处理您的数据，并始终将您的数据保护置于首位。
                            </p>
                            <p>
                                通过使用 VideoAI 的文本转视频、图片转视频或参考视频转视频服务，您确认已阅读、理解并同意本政策的所有条款。如果您不同意本政策的任何部分，请立即停止使用我们的服务。
                            </p>
                        </section>

                        {/* Data Collection Section */}
                        <section id="data-collection" className="mb-12">
                            <h2>2. 数据收集</h2>
                            <p>
                                为确保 VideoAI 能够为您提供高质量的视频生成服务，我们需要在您使用平台时收集以下类型的个人信息：
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">账户信息</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        您的电子邮件地址、用户名、头像以及社交媒体登录信息（如果您选择通过 Google 或其他平台注册）。
                                    </p>
                                </div>

                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">使用数据</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        您生成的视频类型、使用的提示词、生成频率、访问时间、设备信息以及您的 IP 地址等操作日志。
                                    </p>
                                </div>

                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">输入内容</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        您上传的图片、文本描述、参考视频或其他用于生成视频的所有输入内容。这些内容将仅用于为您提供视频生成服务。
                                    </p>
                                </div>

                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">生成内容</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        使用 VideoAI 服务生成的视频内容。我们会存储您的生成记录以便您随时访问和管理您的创作历史。
                                    </p>
                                </div>
                            </div>

                            <p>
                                <strong>Cookies 与追踪技术：</strong>VideoAI 使用 Cookies 和类似追踪技术来记住您的偏好设置、分析网站流量并个性化您的使用体验。您可以通过浏览器设置管理 Cookie 偏好。
                            </p>
                        </section>

                        <section id="data-usage" className="mb-12">
                            <h2>3. 数据使用</h2>
                            <p>
                                VideoAI 收集您的个人信息主要用于以下合法业务目的，我们确保每种使用方式都经过审慎评估，以保护您的隐私权益：
                            </p>
                            <ul>
                                <li><strong>服务提供：</strong>为您提供稳定、安全的 AI 视频生成服务，包括处理您的请求、管理您的账户和处理付款交易。</li>
                                <li><strong>服务优化：</strong>分析使用趋势以改进我们的算法、提升生成质量、优化用户界面和增强整体用户体验。</li>
                                <li><strong>账户管理：</strong>处理用户注册、身份验证、密码找回以及账户安全验证等账户相关服务。</li>
                                <li><strong>通信通知：</strong>向您发送服务更新、安全警报、系统通知以及您可能感兴趣的产品资讯（您可随时退订）。</li>
                                <li><strong>积分与订阅：</strong>管理您的积分余额、订阅计划、购买历史记录以及相关的账单处理。</li>
                                <li><strong>安全防护：</strong>监测和预防欺诈活动、滥用行为、安全威胁，确保平台和用户的安全。</li>
                                <li><strong>法律合规：</strong>遵守适用法律法规，在必要时配合执法机关的合法要求。</li>
                            </ul>
                        </section>

                        <section id="data-sharing" className="mb-12">
                            <h2>4. 数据共享</h2>
                            <p>
                                VideoAI 郑重承诺<strong>绝不会出售您的个人信息</strong>。我们仅在以下有限且必要的场景下与可信的第三方共享您的数据：
                            </p>

                            <div className="bg-card border rounded-xl p-6 my-6 not-prose">
                                <h3 className="font-semibold mb-4">服务提供商</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    我们与以下类型的可信服务提供商共享必要数据，以支撑 VideoAI 的核心功能：
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>云服务器托管</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>支付处理服务</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>AI 模型提供商</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>邮件发送服务</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>数据分析服务</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>客户支持工具</span>
                                    </div>
                                </div>
                            </div>

                            <ul>
                                <li><strong>法律义务：</strong>当法律法规、法院命令或政府机构要求时，我们可能会披露您的个人信息。</li>
                                <li><strong>权利保护：</strong>当我们认为有必要保护 VideoAI、我们的用户或公众的权利、财产或安全时，我们可能会披露相关信息。</li>
                                <li><strong>业务转让：</strong>如果 VideoAI 发生合并、收购或资产出售，您的个人信息可能会作为交易的一部分转让给新的所有者。</li>
                            </ul>
                        </section>

                        <section id="data-security" className="mb-12">
                            <h2>5. 数据安全</h2>
                            <p>
                                VideoAI 采用业界领先的<strong>数据安全技术和管理措施</strong>来保护您的个人信息免受未经授权的访问、泄露、篡改或破坏：
                            </p>

                            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 my-6 not-prose">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            传输加密
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            所有数据传输均使用 TLS/SSL 加密协议，确保您的数据在互联网传输过程中的安全性。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            存储加密
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            敏感数据采用 AES-256 加密标准存储，有效防止数据在存储层面被非法访问。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            访问控制
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            严格实施基于角色的访问控制（RBAC），确保只有授权人员才能访问敏感数据，且访问行为全程审计。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            定期审计
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            我们定期进行安全漏洞扫描和渗透测试，及时发现并修复潜在的安全风险。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                <strong>重要提示：</strong>尽管我们采取了上述安全措施，但没有任何互联网传输方法或电子存储系统是100%安全的。我们无法保证您的数据的绝对安全性，但我们会尽一切努力保护您的个人信息安全。
                            </p>
                        </section>

                        <section id="user-rights" className="mb-12">
                            <h2>6. 您的权利</h2>
                            <p>
                                作为 VideoAI 的用户，您对您的个人数据享有以下合法权利。我们致力于帮助您轻松行使这些权利：
                            </p>

                            <div className="bg-card border rounded-xl p-6 my-6 not-prose">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">1</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">访问权</h3>
                                            <p className="text-sm text-muted-foreground">您有权随时访问我们持有的关于您的个人信息。</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">更正权</h3>
                                            <p className="text-sm text-muted-foreground">您可以要求更正不准确或不完整的个人数据。</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">3</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">删除权</h3>
                                            <p className="text-sm text-muted-foreground">在特定条件下，您可以要求删除您的个人数据。</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">4</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">限制处理权</h3>
                                            <p className="text-sm text-muted-foreground">您可以要求在特定情况下限制我们对您数据的处理。</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">5</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">数据可携权</h3>
                                            <p className="text-sm text-muted-foreground">您有权以结构化、常用的格式获取您的个人数据。</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">6</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">投诉权</h3>
                                            <p className="text-sm text-muted-foreground">如果您认为我们违反了数据保护法律，您有权向当地数据保护机构投诉。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                如需行使上述任何权利，请通过账户设置页面或发送邮件至 <a href="mailto:privacy@donney.pro" className="text-primary hover:underline">privacy@donney.pro</a> 与我们联系。我们将在30天内响应您的请求。
                            </p>
                        </section>

                        <section id="childrens-privacy" className="mb-12">
                            <h2>7. 儿童隐私</h2>
                            <p>
                                VideoAI 的服务<strong>不面向未满13岁（或您所在司法管辖区法律规定的其他年龄）的儿童</strong>。我们不会故意收集未满最低年龄限制的儿童的个人信息。
                            </p>
                            <p>
                                如果您是家长或监护人，并发现您的孩子可能在不知情的情况下向我们提供了个人信息，请立即通过 <a href="mailto:privacy@donney.pro" className="text-primary hover:underline">privacy@donney.pro</a> 联系我们。我们将迅速调查并采取必要措施删除相关数据。
                            </p>
                        </section>

                        <section id="policy-changes" className="mb-12">
                            <h2>8. 政策变更</h2>
                            <p>
                                VideoAI 可能不时更新本隐私政策，以反映服务变化、用户反馈或法律法规的变更。我们承诺：
                            </p>
                            <ul>
                                <li><strong>及时通知：</strong>对于重大变更，我们将通过服务内通知或电子邮件提前通知您。</li>
                                <li><strong>清晰说明：</strong>更新后的政策将清晰标注变更内容和时间。</li>
                                <li><strong>持续同意：</strong>继续使用服务即表示您同意更新后的政策条款。</li>
                            </ul>
                            <p>
                                我们鼓励您定期查看本页面，了解最新的隐私保护措施。
                            </p>
                        </section>

                        <section id="contact" className="mb-12">
                            <h2>9. 联系我们</h2>
                            <p>
                                如果您对本隐私政策有任何疑问、担忧或建议，欢迎随时与我们联系：
                            </p>

                            <div className="bg-card border rounded-xl p-6 my-6 not-prose">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">电子邮件</h3>
                                        <a href="mailto:privacy@donney.pro" className="text-primary hover:underline">privacy@donney.pro</a>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                我们通常会在1-3个工作日内回复您的邮件。对于紧急的安全问题，请使用邮件标题"URGENT"以获得更快响应。
                            </p>
                        </section>
                    </>
                ) : (
                    <>
                        {/* 英文版 */}

                        <section id="introduction" className="mb-12">
                            <h2>1. Introduction</h2>
                            <p>
                                At VideoAI ("we," "us," or "our"), we deeply value your privacy. This Privacy Policy ("Policy") explains in detail how we collect, use, store, share, and protect your personal information when you visit, use, or register on the VideoAI platform. We are committed to handling your data in a transparent and lawful manner, always prioritizing your data protection.
                            </p>
                            <p>
                                By using VideoAI's text-to-video, image-to-video, or reference-to-video services, you confirm that you have read, understood, and agree to all terms of this Policy. If you disagree with any part of this Policy, please stop using our services immediately.
                            </p>
                        </section>

                        <section id="data-collection" className="mb-12">
                            <h2>2. Data Collection</h2>
                            <p>
                                To ensure VideoAI can provide you with high-quality video generation services, we need to collect the following types of personal information when you use our platform:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">Account Information</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Your email address, username, profile picture, and social media login information (if you choose to register via Google or other platforms).
                                    </p>
                                </div>

                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">Usage Data</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Types of videos you generate, prompts you use, generation frequency, access times, device information, and your IP address and other operation logs.
                                    </p>
                                </div>

                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">Input Content</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Images, text descriptions, reference videos, or other inputs you upload to generate videos. This content will only be used to provide you with video generation services.
                                    </p>
                                </div>

                                <div className="bg-card border rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold">Generated Content</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Video content generated using VideoAI services. We store your generation history so you can access and manage your creations anytime.
                                    </p>
                                </div>
                            </div>

                            <p>
                                <strong>Cookies and Tracking Technologies:</strong> VideoAI uses cookies and similar tracking technologies to remember your preferences, analyze website traffic, and personalize your experience. You can manage cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section id="data-usage" className="mb-12">
                            <h2>3. Data Usage</h2>
                            <p>
                                VideoAI collects your personal information primarily for the following legitimate business purposes. We ensure that each type of use is carefully evaluated to protect your privacy rights:
                            </p>
                            <ul>
                                <li><strong>Service Provision:</strong> To provide you with stable, secure AI video generation services, including processing your requests, managing your account, and handling payment transactions.</li>
                                <li><strong>Service Optimization:</strong> To analyze usage trends, improve our algorithms, enhance generation quality, optimize user interface, and improve overall user experience.</li>
                                <li><strong>Account Management:</strong> To handle user registration, identity verification, password recovery, and account security verification.</li>
                                <li><strong>Communications:</strong> To send you service updates, security alerts, system notifications, and product information you may be interested in (you can unsubscribe anytime).</li>
                                <li><strong>Credits and Subscriptions:</strong> To manage your credit balance, subscription plans, purchase history, and related billing processing.</li>
                                <li><strong>Security Protection:</strong> To monitor and prevent fraudulent activities, abuse, security threats, and ensure the safety of the platform and users.</li>
                                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations, and cooperate with law enforcement when legally required.</li>
                            </ul>
                        </section>

                        <section id="data-sharing" className="mb-12">
                            <h2>4. Data Sharing</h2>
                            <p>
                                VideoAI solemnly promises <strong>never to sell your personal information</strong>. We only share your data with trusted third parties in the following limited and necessary scenarios:
                            </p>

                            <div className="bg-card border rounded-xl p-6 my-6 not-prose">
                                <h3 className="font-semibold mb-4">Service Providers</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    We share necessary data with trusted service providers to support VideoAI's core functionality:
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Cloud Hosting</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Payment Processing</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>AI Model Providers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Email Services</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Analytics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Customer Support</span>
                                    </div>
                                </div>
                            </div>

                            <ul>
                                <li><strong>Legal Obligations:</strong> We may disclose your personal information when required by laws, court orders, or government agencies.</li>
                                <li><strong>Rights Protection:</strong> We may disclose relevant information when we believe it is necessary to protect the rights, property, or safety of VideoAI, our users, or the public.</li>
                                <li><strong>Business Transfer:</strong> If VideoAI undergoes a merger, acquisition, or asset sale, your personal information may be transferred to the new owner as part of the transaction.</li>
                            </ul>
                        </section>

                        <section id="data-security" className="mb-12">
                            <h2>5. Data Security</h2>
                            <p>
                                VideoAI employs industry-leading <strong>data security technologies and management measures</strong> to protect your personal information from unauthorized access, disclosure, alteration, or destruction:
                            </p>

                            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 my-6 not-prose">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Transmission Encryption
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            All data transmissions use TLS/SSL encryption protocols, ensuring your data is protected during internet transmission.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Storage Encryption
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Sensitive data is stored using AES-256 encryption standards, effectively preventing unauthorized access to data at the storage level.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            Access Control
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            We strictly implement Role-Based Access Control (RBAC), ensuring only authorized personnel can access sensitive data, with full audit trails.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Regular Audits
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            We conduct regular security vulnerability scans and penetration tests to promptly identify and address potential security risks.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                <strong>Important Notice:</strong> Although we have implemented the above security measures, no internet transmission method or electronic storage system is 100% secure. We cannot guarantee absolute security of your data, but we will do everything in our power to protect your personal information.
                            </p>
                        </section>

                        <section id="user-rights" className="mb-12">
                            <h2>6. Your Rights</h2>
                            <p>
                                As a VideoAI user, you have the following legitimate rights over your personal data. We are committed to helping you easily exercise these rights:
                            </p>

                            <div className="bg-card border rounded-xl p-6 my-6 not-prose">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">1</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Right to Access</h3>
                                            <p className="text-sm text-muted-foreground">You have the right to access the personal information we hold about you at any time.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Right to Rectification</h3>
                                            <p className="text-sm text-muted-foreground">You can request correction of inaccurate or incomplete personal data.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">3</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Right to Erasure</h3>
                                            <p className="text-sm text-muted-foreground">Under specific conditions, you can request deletion of your personal data.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">4</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Right to Restrict Processing</h3>
                                            <p className="text-sm text-muted-foreground">You can request that we restrict processing of your data under specific circumstances.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">5</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Right to Data Portability</h3>
                                            <p className="text-sm text-muted-foreground">You have the right to obtain your personal data in a structured, commonly used format.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold">6</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Right to Lodge a Complaint</h3>
                                            <p className="text-sm text-muted-foreground">If you believe we have violated data protection laws, you have the right to lodge a complaint with your local data protection authority.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                To exercise any of the above rights, please contact us through your account settings or send an email to <a href="mailto:privacy@donney.pro" className="text-primary hover:underline">privacy@donney.pro</a>. We will respond to your request within 30 days.
                            </p>
                        </section>

                        <section id="childrens-privacy" className="mb-12">
                            <h2>7. Children's Privacy</h2>
                            <p>
                                VideoAI's services are <strong>not intended for children under 13 (or other age as required by local law in your jurisdiction)</strong>. We do not knowingly collect personal information from children below the minimum age limit.
                            </p>
                            <p>
                                If you are a parent or guardian and discover that your child may have unknowingly provided us with personal information, please contact us immediately at <a href="mailto:privacy@donney.pro" className="text-primary hover:underline">privacy@donney.pro</a>. We will promptly investigate and take necessary steps to delete the relevant data.
                            </p>
                        </section>

                        <section id="policy-changes" className="mb-12">
                            <h2>8. Changes to Policy</h2>
                            <p>
                                VideoAI may update this Privacy Policy from time to time to reflect changes in our services, user feedback, or laws and regulations. We commit to:
                            </p>
                            <ul>
                                <li><strong>Timely Notification:</strong> For significant changes, we will notify you in advance through in-service notifications or email.</li>
                                <li><strong>Clear Explanation:</strong> Updated policies will clearly indicate what changes have been made and when.</li>
                                <li><strong>Continued Consent:</strong> Continued use of the service means you agree to the updated policy terms.</li>
                            </ul>
                            <p>
                                We encourage you to review this page regularly to learn about our latest privacy protection measures.
                            </p>
                        </section>

                        <section id="contact" className="mb-12">
                            <h2>9. Contact Us</h2>
                            <p>
                                If you have any questions, concerns, or suggestions about this Privacy Policy, please feel free to contact us anytime:
                            </p>

                            <div className="bg-card border rounded-xl p-6 my-6 not-prose">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <a href="mailto:privacy@donney.pro" className="text-primary hover:underline">privacy@donney.pro</a>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                We typically respond to your emails within 1-3 business days. For urgent security issues, please use "URGENT" in the email subject line for faster response.
                            </p>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}