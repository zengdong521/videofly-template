"use client";

import { Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import { cn } from "@/components/ui";
import { LocaleLink } from "@/i18n/navigation";

export function LandingFooter() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('product'),
      links: [
        { title: "Image to Video", href: "/image-to-video" },
        { title: "Text to Video", href: "/text-to-video" },
        { title: "Reference to Video", href: "/reference-to-video" },
        { title: "Pricing", href: "/pricing" },
      ],
    },
    // {
    //   title: t('company'),
    //   links: [
    //     { title: "About", href: "/about" },
    //     { title: "Blog", href: "/blog" },
    //     { title: "Careers", href: "/careers" },
    //     { title: "Contact", href: "/contact" },
    //   ],
    // },
    {
      title: t('legal'),
      links: [
        { title: t('privacy'), href: "/privacy" },
        { title: t('terms'), href: "/terms" },
        { title: "AI Disclaimer", href: "/ai-disclaimer" },
        // { title: t('cookie'), href: "/cookies" },
      ],
    },
  ];


  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <LocaleLink
              href="/"
              className="flex items-center gap-2 text-xl font-semibold mb-4"
            >
              🎬 VideoAI
            </LocaleLink>
            <p className="text-sm text-muted-foreground mb-4">
              Transform your ideas into stunning videos with AI.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: currentYear })}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
            by VideoAI Team
          </p>
        </div>

        {/* AI Model Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {locale === "zh"
              ? "VideoAI 与 OpenAI、Google DeepMind、ByteDance 之间无关联。整合第三方 AI 模型技术。"
              : "VideoAI is not affiliated with OpenAI, Google DeepMind, or ByteDance."}
            {" "}
            <LocaleLink
              href="/ai-disclaimer"
              className="underline hover:text-foreground transition-colors"
            >
              {locale === "zh" ? "了解更多" : "Learn more"}
            </LocaleLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
