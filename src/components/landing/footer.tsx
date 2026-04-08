"use client";

import { Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import { cn } from "@/components/ui";
import { LocaleLink } from "@/i18n/navigation";

export function LandingFooter() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const homeTitle = locale === "zh" ? "VideoAI 首页" : "VideoAI Home";

  const footerSections = [
    {
      title: t('product'),
      links: [
        { title: t('imageToVideo'), href: "/image-to-video" },
        { title: t('textToVideo'), href: "/text-to-video" },
        { title: t('referenceToVideo'), href: "/reference-to-video" },
        { title: t('pricing'), href: "/pricing" },
      ],
    },
    {
      title: t('legal'),
      links: [
        { title: t('privacy'), href: "/privacy" },
        { title: t('terms'), href: "/terms" },
        { title: t('aiDisclaimer'), href: "/ai-disclaimer" },
      ],
    },
    {
      title: t('resources'),
      links: [
        { title: t('compareModels'), href: "/compare" },
        { title: t('guides'), href: "/guides" },
      ],
    },
  ];


  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <LocaleLink
              href="/"
              title={homeTitle}
              className="flex items-center gap-2 text-xl font-semibold mb-4"
            >
              🎬 VideoAI
            </LocaleLink>
            <p className="text-sm text-muted-foreground mb-4">
              {t('description')}
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
                      title={link.title}
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
            {t('madeWith')}
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
            {t('byTeam')}
          </p>
        </div>

        {/* AI Model Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {t('affiliation')}
            {" "}
            <LocaleLink
              href="/ai-disclaimer"
              title={t('readAiDisclaimer')}
              className="underline hover:text-foreground transition-colors"
            >
              {t('readAiDisclaimer')}
            </LocaleLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
