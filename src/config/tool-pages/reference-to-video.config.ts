import { ToolPageConfig } from "./types";
import { NEW_USER_GIFT } from "@/config/pricing-user";

/**
 * Reference to Video 工具页面配置
 */
export const referenceToVideoConfig: ToolPageConfig = {
  // SEO 配置
  seo: {
    title: "Reference to Video - Create Videos from Reference Images",
    description: "Use reference images to guide AI video generation. Keep character identity, style, and composition while creating a brand-new video.",
    keywords: [
      "reference to video",
      "video to video AI",
      "AI video transformation",
      "video restyle AI",
      "video variation generator",
      "AI video editing",
      "video style transfer",
      "AI video maker from reference",
      "reference video AI",
      "video to video free",
      "video remix AI",
      "AI video generator from video",
    ],
    ogImage: "/og-reference-to-video.jpg",
  },

  // 生成器配置
  generator: {
    mode: "reference-to-video",
    uiMode: "compact",

    defaults: {
      model: "seedance-2.0",
      duration: 5,
      aspectRatio: "16:9",
      outputNumber: 1,
    },

    models: {
      available: ["seedance-2.0", "seedance-2.0-fast"],
      default: "seedance-2.0",
    },

    features: {
      showImageUpload: true, // 用于上传参考视频帧
      showPromptInput: true,
      showModeSelector: false,
    },

    promptPlaceholder: "Describe the motion and style you want... e.g., 'Keep the character design, add cinematic camera movement and snowfall'",

    settings: {
      showDuration: true,
      showAspectRatio: true,
      showQuality: false,
      showOutputNumber: false,
      showAudioGeneration: false,

      aspectRatios: ["16:9", "9:16", "1:1", "4:3"],
    },
  },

  // Landing Page 配置
  landing: {
    hero: {
      title: "Guide AI Videos with Reference Images",
      description: "Upload one or more reference images and let AI generate a new video that keeps the look, characters, and style cues you care about.",
      ctaText: "Try It Now",
      ctaSubtext: `${NEW_USER_GIFT.credits} free credits to start`,
    },

    examples: [
      {
        thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
        title: "Character Consistency",
        prompt: "Keep the same character appearance while adding soft camera motion and anime-style lighting",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&q=80",
        title: "Mood Transformation",
        prompt: "Preserve the subject design, add fog, rain, and a moody cinematic atmosphere",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
        title: "Scene Variation",
        prompt: "Use the reference composition and turn the scene into a snowy winter night with gentle motion",
      },
    ],

    features: [
      "Upload reference images (JPG, PNG, WEBP up to 10MB)",
      "Guide character design, style, framing, and composition",
      "Generate brand-new motion from still references",
      "Create multiple visual variations from one image set",
      "Reference video upload is temporarily unavailable",
    ],

    supportedModels: [
      { name: "Seedance 2.0", provider: "ByteDance", color: "#10b981" },
    ],

    stats: {
      videosGenerated: "100K+",
      usersCount: "15K+",
      avgRating: 4.7,
    },
  },

  // 多语言 key 前缀
  i18nPrefix: "ToolPage.ReferenceToVideo",
};
