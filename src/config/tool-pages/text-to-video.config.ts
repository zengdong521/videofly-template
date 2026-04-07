import { ToolPageConfig } from "./types";
import { NEW_USER_GIFT } from "@/config/pricing-user";

/**
 * Text to Video 工具页面配置
 */
export const textToVideoConfig: ToolPageConfig = {
  // SEO 配置
  seo: {
    title: "Seedance 2.0 Text to Video - AI Video Generator from Text",
    description: "Turn prompts into short-form videos with Seedance 2.0 text to video. Create AI video ads, product demos, and social clips from text with fast iteration.",
    keywords: [
      "Seedance 2.0 text to video",
      "Seedance text to video",
      "Seedance AI video generator from text",
      "ByteDance Seedance text to video",
      "short-form AI video generator",
      "text to video",
      "text to video AI",
      "AI video generator from text",
      "AI video creation",
      "video generator online",
      "Seedance 2.0 video AI",
      "AI video generator for TikTok ads",
      "AI video generator for product demos",
      "text to video free",
      "AI video maker",
      "generate video from description",
      "video AI tool",
      "online video generator",
    ],
    ogImage: "/og-text-to-video.jpg",
  },

  // 生成器配置
  generator: {
    mode: "text-to-video",
    uiMode: "compact",

    defaults: {
      model: "seedance-2.0",
      duration: 5,
      aspectRatio: "16:9",
      outputNumber: 1,
    },

    models: {
      available: ["seedance-2.0", "seedance-2.0-fast", "seedance-1.5-pro"],
      default: "seedance-2.0",
    },

    features: {
      showImageUpload: false,
      showPromptInput: true,
      showModeSelector: false,
    },

    promptPlaceholder: "Describe the video you want to create... e.g., 'A serene mountain landscape at sunset with birds flying'",

    settings: {
      showDuration: true,
      showAspectRatio: true,
      showQuality: false,
      showOutputNumber: false,
      showAudioGeneration: true,

      durations: [4, 5, 6, 8, 10, 12, 15],
      aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9", "adaptive"],
    },
  },

  // Landing Page 配置
  landing: {
    hero: {
      title: "Create Videos from Text with Seedance 2.0",
      description: "Describe your scene in plain text and generate short-form AI videos for ads, product marketing, and social content with Seedance 2.0.",
      ctaText: "Start Creating",
      ctaSubtext: `${NEW_USER_GIFT.credits} free credits to try`,
    },

    examples: [
      {
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
        title: "Cinematic Mountain Scene",
        prompt: "A majestic mountain range at golden hour, camera slowly flying through valleys",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
        title: "Urban City Timelapse",
        prompt: "New York City timelapse at night, cars leaving light trails, buildings glowing",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        title: "Ocean Sunset",
        prompt: "Calm ocean waves at sunset, camera slowly zooming out, peaceful atmosphere",
      },
    ],

    features: [
      "Simply describe what you want to see",
      "Access to Seedance 2.0 and Seedance 2.0 Fast workflows",
      "Cinematic quality up to 1080p",
      "Generate audio and sound effects automatically",
      "Multiple aspect ratios for any platform",
    ],

    supportedModels: [
      { name: "Seedance 2.0", provider: "ByteDance", color: "#10b981" },
      { name: "Seedance 1.0 Fast", provider: "ByteDance", color: "#34d399" },
      { name: "Seedance 1.0 Quality", provider: "ByteDance", color: "#059669" },
    ],

    stats: {
      videosGenerated: "1M+",
      usersCount: "100K+",
      avgRating: 4.9,
    },
  },

  // 多语言 key 前缀
  i18nPrefix: "ToolPage.TextToVideo",
};
