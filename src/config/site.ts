/**
 * Site configuration
 * Central place for website settings, auth providers, and features
 */
import { getSiteUrl } from "@/lib/site-url";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github?: string;
    twitter?: string;
    discord?: string;
  };
  auth: {
    enableGoogleLogin: boolean;
    enableMagicLinkLogin: boolean;
    defaultProvider: "google" | "email";
  };
  routes: {
    defaultLoginRedirect: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "VideoAI",
  description: "Seedance 2.0 AI video generator for text to video, image to video, and reference image to video. Create short-form clips for ads, demos, and social media.",
  url: getSiteUrl(),
  ogImage: "/og.png",
  links: {},
  auth: {
    enableGoogleLogin: true,
    enableMagicLinkLogin: true,
    defaultProvider: "google",
  },
  routes: {
    defaultLoginRedirect: "/text-to-video",
  },
};

// Helper to get enabled auth providers
export function getEnabledAuthProviders() {
  const providers: string[] = [];
  if (siteConfig.auth.enableGoogleLogin) providers.push("google");
  if (siteConfig.auth.enableMagicLinkLogin) providers.push("email");
  return providers;
}
