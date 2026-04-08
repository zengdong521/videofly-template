import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const isZh = locale === "zh";
  const homeHref = isZh ? "/zh" : "/";
  const generatorHref = isZh ? "/zh/text-to-video" : "/text-to-video";

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-muted-foreground/20 select-all mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            {isZh ? "页面未找到" : "Page Not Found"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isZh
              ? "抱歉，你访问的页面不存在或已被移除。"
              : "Sorry, the page you're looking for doesn't exist or has been moved."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={homeHref}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isZh ? "返回首页" : "Back to Home"}
            </Link>
            <Link
              href={generatorHref}
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              {isZh ? "体验 AI 视频生成" : "Try AI Video Generator"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
