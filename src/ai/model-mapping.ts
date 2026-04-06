/**
 * AI Provider Model Mapping Configuration
 *
 * This file defines the mapping between internal model IDs and provider-specific model IDs,
 * along with parameter transformation rules.
 *
 * @version 1.0.0
 * @last-updated 2026-01-26
 */

// ============================================================================
// Type Definitions
// ============================================================================

import type { ProviderType } from "./types";

export type GenerationMode =
  | "text-to-video"
  | "image-to-video"
  | "reference-to-video"
  | "frames-to-video";

export interface ProviderModelConfig {
  /** Provider-specific model ID */
  providerModelId: string | ((params: Record<string, any>) => string);
  /** API endpoint (optional, if different from default) */
  apiEndpoint?: string;
  /** Parameter transformation function */
  transformParams?: (
    internalModelId: string,
    params: Record<string, any>
  ) => Record<string, any>;
  /** Response transformation function */
  transformResponse?: (response: any) => any;
  /** Whether this provider supports this model */
  supported: boolean;
}

export interface ModelMapping {
  /** Internal unified model ID */
  internalId: string;
  /** Display name */
  displayName: string;
  /** Provider-specific configurations */
  providers: {
    evolink?: ProviderModelConfig;
    kie?: ProviderModelConfig;
    apimart?: ProviderModelConfig;
  };
}

// ============================================================================
// Parameter Transformers
// ============================================================================

/**
 * Transform aspect_ratio parameter for different providers
 */
function transformAspectRatio(
  value: string,
  provider: ProviderType
): string {
  if (provider === "evolink") {
    return value; // "16:9", "9:16", etc.
  }

  // KIE uses landscape/portrait for some models
  const kieMapping: Record<string, string> = {
    "16:9": "landscape",
    "9:16": "portrait",
  };

  return kieMapping[value] || value;
}

/**
 * Transform duration parameter (number vs string)
 */
function transformDuration(
  value: number,
  provider: ProviderType
): number | string {
  if (provider === "evolink") {
    return value; // number
  }
  return String(value); // KIE uses string
}

/**
 * Normalize quality across providers
 */
function normalizeQuality(
  value: string | undefined,
  provider: ProviderType,
  internalModelId: string
): string | undefined {
  if (!value) return undefined;
  const normalized = String(value).toLowerCase();

  if (provider === "evolink") {
    if (normalized === "standard") return "720p";
    if (normalized === "high") return "1080p";
    if (normalized === "480p") return "480p";
    if (normalized === "720p") return "720p";
    if (normalized === "1080p") return "1080p";
    return value;
  }

  // KIE special case: Sora uses size = standard/high
  if (internalModelId === "sora-2") {
    if (normalized === "high" || normalized === "1080p") return "high";
    if (normalized === "standard" || normalized === "720p" || normalized === "480p") {
      return "standard";
    }
    return value;
  }

  // KIE/APImart default: resolution string
  if (normalized === "standard") return "720p";
  if (normalized === "high") return "1080p";
  if (normalized === "480p") return "480p";
  if (normalized === "720p") return "720p";
  if (normalized === "1080p") return "1080p";
  return value;
}

/**
 * Evolink parameter transformer
 */
function evolinkParamsTransformer(
  internalModelId: string,
  params: Record<string, any>
): Record<string, any> {
  const quality = normalizeQuality(params.quality, "evolink", internalModelId);
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls
    : params.imageUrl
      ? [params.imageUrl]
      : undefined;
  const result: Record<string, any> = {
    ...params,
    aspect_ratio: params.aspectRatio || "16:9",
    duration: params.duration || 10,
    remove_watermark: params.removeWatermark ?? true,
    callback_url: params.callbackUrl,
    quality,
    image_urls: imageUrls,
  };

  // Remove internal field names
  result.aspectRatio = undefined;
  result.removeWatermark = undefined;
  result.callbackUrl = undefined;
  result.imageUrl = undefined;
  result.imageUrls = undefined;
  result.mode = undefined;
  result.outputNumber = undefined;
  result.generateAudio = undefined;

  return result;
}

function getSeedance2EvolinkVariant(
  internalModelId: string,
  params: Record<string, any>
): string {
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls.filter(Boolean)
    : params.imageUrl
      ? [params.imageUrl]
      : [];
  const videoUrls = Array.isArray(params.videoUrls)
    ? params.videoUrls.filter(Boolean)
    : [];
  const audioUrls = Array.isArray(params.audioUrls)
    ? params.audioUrls.filter(Boolean)
    : [];
  const normalizedMode = normalizeGenerationMode(
    params.mode,
    imageUrls.length > 0
  );
  const fastSuffix = internalModelId === "seedance-2.0-fast" ? "fast-" : "";

  if (
    normalizedMode === "reference-to-video" ||
    normalizedMode === "frames-to-video" ||
    videoUrls.length > 0 ||
    audioUrls.length > 0
  ) {
    return `seedance-2.0-${fastSuffix}reference-to-video`;
  }

  if (imageUrls.length > 0) {
    return `seedance-2.0-${fastSuffix}image-to-video`;
  }

  return `seedance-2.0-${fastSuffix}text-to-video`;
}

function evolinkSeedance2ParamsTransformer(
  internalModelId: string,
  params: Record<string, any>
): Record<string, any> {
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls.filter(Boolean)
    : params.imageUrl
      ? [params.imageUrl]
      : [];
  const videoUrls = Array.isArray(params.videoUrls)
    ? params.videoUrls.filter(Boolean)
    : [];
  const audioUrls = Array.isArray(params.audioUrls)
    ? params.audioUrls.filter(Boolean)
    : [];
  const normalizedQuality =
    normalizeQuality(params.quality, "evolink", internalModelId) || "720p";
  const quality = normalizedQuality === "1080p" ? "720p" : normalizedQuality;
  const variant = getSeedance2EvolinkVariant(internalModelId, params);

  const result: Record<string, any> = {
    prompt: params.prompt,
    duration: params.duration || 5,
    aspect_ratio: params.aspectRatio || "16:9",
    quality,
    generate_audio: params.generateAudio ?? true,
    callback_url: params.callbackUrl,
  };

  if (variant.includes("image-to-video") || variant.includes("reference-to-video")) {
    result.image_urls = imageUrls;
  }

  if (variant.includes("reference-to-video")) {
    if (videoUrls.length > 0) {
      result.video_urls = videoUrls;
    }
    if (audioUrls.length > 0) {
      result.audio_urls = audioUrls;
    }
  }

  return result;
}

/**
 * KIE parameter transformer
 */
function kieParamsTransformer(
  internalModelId: string,
  params: Record<string, any>
): Record<string, any> {
  const baseInput: Record<string, any> = {
    prompt: params.prompt,
  };
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls
    : params.imageUrl
      ? [params.imageUrl]
      : undefined;

  // Transform common parameters
  if (params.aspectRatio) {
    if (internalModelId === "veo-3.1") {
      baseInput.aspect_ratio = params.aspectRatio;
    } else {
      baseInput.aspect_ratio = transformAspectRatio(params.aspectRatio, "kie");
    }
  }

  if (params.duration) {
    baseInput.duration = transformDuration(params.duration, "kie");
  }

  if (imageUrls && imageUrls.length > 0) {
    // Sora 2 uses image_urls
    if (internalModelId === "sora-2") {
      baseInput.image_urls = imageUrls;
    }
    // Seedance uses input_urls
    else if (internalModelId === "seedance-1.5-pro") {
      baseInput.input_urls = imageUrls;
    }
    // Veo 3.1 uses imageUrls (camelCase)
    else if (internalModelId === "veo-3.1") {
      baseInput.imageUrls = imageUrls;
    }
  }

  baseInput.remove_watermark = params.removeWatermark ?? true;

  // Sora 2 specific parameters
  if (internalModelId === "sora-2") {
    // KIE's Sora 2 uses n_frames instead of duration
    if (params.duration) {
      baseInput.n_frames = String(params.duration);
      baseInput.duration = undefined;
    }
    const size = normalizeQuality(params.quality, "kie", internalModelId);
    if (size) {
      baseInput.size = size;
    }
  }

  // Veo 3.1 specific parameters
  if (internalModelId === "veo-3.1") {
    baseInput.aspect_ratio = params.aspectRatio || "16:9";
    // Veo 3.1 doesn't use duration
    baseInput.duration = undefined;
  }

  // Seedance 1.5 Pro specific parameters
  if (internalModelId === "seedance-1.5-pro") {
    baseInput.resolution =
      normalizeQuality(params.quality, "kie", internalModelId) || "720p";
    baseInput.fixed_lens = params.fixedLens ?? true;
    baseInput.generate_audio = params.generateAudio ?? false;
  }

  return {
    input: baseInput,
  };
}

/**
 * APImart parameter transformer
 *
 * APImart uses the same endpoint for all models: POST /v1/videos/generations
 * Currently supports Seedance models (1.0 Pro Fast/Quality, 1.5 Pro, 2.0).
 * To add new models, add model-specific logic below.
 */
function apimartParamsTransformer(
  internalModelId: string,
  params: Record<string, any>
): Record<string, any> {
  const imageUrls = Array.isArray(params.imageUrls)
    ? params.imageUrls
    : params.imageUrl
      ? [params.imageUrl]
      : undefined;

  const result: Record<string, any> = {
    prompt: params.prompt,
    duration: params.duration || 5,
    callback_url: params.callbackUrl,
  };

  // Seedance 2.0 uses 'size' instead of 'aspect_ratio'
  const isSeedance2 =
    internalModelId === "seedance-2.0" ||
    internalModelId === "seedance-2.0-fast";

  if (isSeedance2) {
    // Seedance 2.0: use 'size' parameter
    result.size = params.aspectRatio || "16:9";
    result.resolution =
      normalizeQuality(params.quality, "apimart", internalModelId) || "480p";
    result.generate_audio = params.generateAudio ?? false;

    // Optional Seedance 2.0 specific params
    if (params.seed !== undefined) {
      result.seed = params.seed;
    }
    if (params.cameraFixed !== undefined) {
      result.camera_fixed = params.cameraFixed;
    }
    if (params.returnLastFrame !== undefined) {
      result.return_last_frame = params.returnLastFrame;
    }
    if (params.videoUrls && params.videoUrls.length > 0) {
      result.video_urls = params.videoUrls;
    }
    if (params.audioUrls && params.audioUrls.length > 0) {
      result.audio_urls = params.audioUrls;
    }
    if (params.imageWithRoles && params.imageWithRoles.length > 0) {
      result.image_with_roles = params.imageWithRoles;
    } else if (imageUrls && imageUrls.length > 0) {
      result.image_urls = imageUrls;
    }
    if (params.tools && params.tools.length > 0) {
      result.tools = params.tools;
    }
  } else {
    // Seedance 1.5 Pro / 1.0 Pro
    result.aspect_ratio = params.aspectRatio || "16:9";

    if (internalModelId === "seedance-1.5-pro") {
      result.resolution =
        normalizeQuality(params.quality, "apimart", internalModelId) || "720p";
      result.audio = params.generateAudio ?? false;
    }

    if (
      internalModelId === "seedance-1.0-pro-fast" ||
      internalModelId === "seedance-1.0-pro-quality"
    ) {
      result.resolution =
        normalizeQuality(params.quality, "apimart", internalModelId) || "1080p";
    }

    if (imageUrls && imageUrls.length > 0) {
      result.image_urls = imageUrls;
    }
  }

  return result;
}

// ============================================================================
// Model Mappings
// ============================================================================

export const MODEL_MAPPINGS: Record<string, ModelMapping> = {
  // -------------------------------------------------------------------------
  // Sora 2
  // -------------------------------------------------------------------------
  "sora-2": {
    internalId: "sora-2",
    displayName: "Sora 2",
    providers: {
      evolink: {
        providerModelId: "sora-2",
        supported: true,
        transformParams: evolinkParamsTransformer,
      },
      kie: {
        providerModelId: (params: any) =>
          (Array.isArray(params.imageUrls) && params.imageUrls.length > 0) || params.imageUrl
            ? "sora-2-image-to-video"
            : "sora-2-text-to-video",
        supported: true,
        transformParams: kieParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Veo 3.1
  // -------------------------------------------------------------------------
  "veo-3.1": {
    internalId: "veo-3.1",
    displayName: "Veo 3.1",
    providers: {
      evolink: {
        providerModelId: "veo3.1-fast",
        supported: true,
        transformParams: evolinkParamsTransformer,
      },
      kie: {
        providerModelId: (params: any) => {
          const quality = String(params.quality || "").toLowerCase();
          if (quality === "high" || quality === "1080p" || quality === "4k") {
            return "veo3";
          }
          return "veo3_fast";
        },
        apiEndpoint: "/api/v1/veo/generate", // Different endpoint
        supported: true,
        transformParams: (internalModelId, params) => {
          // Veo 3.1 has a different structure on KIE
          const imageUrls = Array.isArray(params.imageUrls)
            ? params.imageUrls
            : params.imageUrl
              ? [params.imageUrl]
              : undefined;

          const result: Record<string, any> = {
            prompt: params.prompt,
            aspect_ratio: params.aspectRatio || "16:9",
            callBackUrl: params.callbackUrl,
          };

          if (imageUrls && imageUrls.length > 0) {
            result.imageUrls = imageUrls;
          }

          // Determine generation type (only if explicitly provided)
          if (params.mode === "frames-to-video") {
            result.generationType = "FIRST_AND_LAST_FRAMES_2_VIDEO";
          } else if (params.mode === "reference-to-video") {
            result.generationType = "REFERENCE_2_VIDEO";
          } else if (params.mode === "text-to-video") {
            result.generationType = "TEXT_2_VIDEO";
          }

          return result;
        },
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 1.5 Pro
  // -------------------------------------------------------------------------
  "seedance-1.5-pro": {
    internalId: "seedance-1.5-pro",
    displayName: "Seedance 1.5 Pro",
    providers: {
      evolink: {
        providerModelId: "seedance-1.5-pro",
        supported: true,
        transformParams: evolinkParamsTransformer,
      },
      kie: {
        providerModelId: "bytedance/seedance-1.5-pro",
        supported: true,
        transformParams: kieParamsTransformer,
      },
      apimart: {
        providerModelId: "doubao-seedance-1-5-pro",
        supported: true,
        transformParams: apimartParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 1.0 Pro Fast (APImart only)
  // -------------------------------------------------------------------------
  "seedance-1.0-pro-fast": {
    internalId: "seedance-1.0-pro-fast",
    displayName: "Seedance 1.0 Pro Fast",
    providers: {
      apimart: {
        providerModelId: "doubao-seedance-1-0-pro-fast",
        supported: true,
        transformParams: apimartParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 1.0 Pro Quality (APImart only)
  // -------------------------------------------------------------------------
  "seedance-1.0-pro-quality": {
    internalId: "seedance-1.0-pro-quality",
    displayName: "Seedance 1.0 Pro Quality",
    providers: {
      apimart: {
        providerModelId: "doubao-seedance-1-0-pro-quality",
        supported: true,
        transformParams: apimartParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 2.0 (APImart only)
  // -------------------------------------------------------------------------
  "seedance-2.0": {
    internalId: "seedance-2.0",
    displayName: "Seedance 2.0",
    providers: {
      evolink: {
        providerModelId: (params: any) =>
          getSeedance2EvolinkVariant("seedance-2.0", params),
        supported: true,
        transformParams: evolinkSeedance2ParamsTransformer,
      },
      apimart: {
        providerModelId: "doubao-seedance-2.0",
        supported: true,
        transformParams: apimartParamsTransformer,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Seedance 2.0 Fast (APImart only)
  // -------------------------------------------------------------------------
  "seedance-2.0-fast": {
    internalId: "seedance-2.0-fast",
    displayName: "Seedance 2.0 Fast",
    providers: {
      evolink: {
        providerModelId: (params: any) =>
          getSeedance2EvolinkVariant("seedance-2.0-fast", params),
        supported: true,
        transformParams: evolinkSeedance2ParamsTransformer,
      },
      apimart: {
        providerModelId: "doubao-seedance-2.0-fast",
        supported: true,
        transformParams: apimartParamsTransformer,
      },
    },
  },
};

const MODEL_MODE_SUPPORT: Record<
  string,
  Partial<Record<ProviderType, GenerationMode[]>>
> = {
  "sora-2": {
    evolink: ["text-to-video", "image-to-video"],
    kie: ["text-to-video", "image-to-video"],
  },
  "veo-3.1": {
    evolink: ["text-to-video", "image-to-video"],
    kie: [
      "text-to-video",
      "image-to-video",
      "reference-to-video",
      "frames-to-video",
    ],
  },
  "seedance-1.5-pro": {
    evolink: ["text-to-video", "image-to-video"],
    kie: ["text-to-video", "image-to-video"],
    apimart: ["text-to-video", "image-to-video"],
  },
  "seedance-1.0-pro-fast": {
    apimart: ["text-to-video", "image-to-video"],
  },
  "seedance-1.0-pro-quality": {
    apimart: ["text-to-video", "image-to-video"],
  },
  "seedance-2.0": {
    evolink: [
      "text-to-video",
      "image-to-video",
      "reference-to-video",
      "frames-to-video",
    ],
    apimart: ["text-to-video", "image-to-video", "reference-to-video", "frames-to-video"],
  },
  "seedance-2.0-fast": {
    evolink: [
      "text-to-video",
      "image-to-video",
      "reference-to-video",
      "frames-to-video",
    ],
    apimart: ["text-to-video", "image-to-video", "reference-to-video", "frames-to-video"],
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get provider model ID for internal model
 */
export function getProviderModelId(
  internalModelId: string,
  provider: ProviderType,
  params?: Record<string, any>
): string {
  const mapping = MODEL_MAPPINGS[internalModelId];
  if (!mapping) {
    throw new Error(`Unknown internal model ID: ${internalModelId}`);
  }

  const providerConfig = mapping.providers[provider];
  if (!providerConfig || !providerConfig.supported) {
    throw new Error(
      `Model ${internalModelId} is not supported by provider ${provider}`
    );
  }

  const providerModelId = providerConfig.providerModelId;

  // Handle dynamic model IDs (functions)
  if (typeof providerModelId === "function") {
    return providerModelId(params || {});
  }

  return providerModelId;
}

/**
 * Get provider config for internal model
 */
export function getProviderConfig(
  internalModelId: string,
  provider: ProviderType
): ProviderModelConfig | undefined {
  const mapping = MODEL_MAPPINGS[internalModelId];
  return mapping?.providers[provider];
}

/**
 * Check if a provider supports a specific model
 */
export function isModelSupported(
  internalModelId: string,
  provider: ProviderType
): boolean {
  const mapping = MODEL_MAPPINGS[internalModelId];
  if (!mapping) return false;

  const providerConfig = mapping.providers[provider];
  return providerConfig?.supported || false;
}

export function normalizeGenerationMode(
  mode?: string,
  hasImageInput = false
): GenerationMode {
  switch (mode) {
    case "image-to-video":
    case "reference-to-video":
    case "frames-to-video":
      return mode;
    case "text-image-to-video":
    case "t2v":
    case "text-to-video":
      return hasImageInput ? "image-to-video" : "text-to-video";
    case "i2v":
      return "image-to-video";
    case "r2v":
      return "reference-to-video";
    default:
      return hasImageInput ? "image-to-video" : "text-to-video";
  }
}

export function isModelModeSupported(
  internalModelId: string,
  provider: ProviderType,
  mode: GenerationMode
): boolean {
  if (!isModelSupported(internalModelId, provider)) {
    return false;
  }

  const supportedModes = MODEL_MODE_SUPPORT[internalModelId]?.[provider];
  if (!supportedModes) {
    return false;
  }

  return supportedModes.includes(mode);
}

/**
 * Transform parameters for a specific provider
 */
export function transformParamsForProvider(
  internalModelId: string,
  provider: ProviderType,
  params: Record<string, any>
): Record<string, any> {
  const mapping = MODEL_MAPPINGS[internalModelId];
  if (!mapping) {
    throw new Error(`Unknown internal model ID: ${internalModelId}`);
  }

  const providerConfig = mapping.providers[provider];
  if (!providerConfig || !providerConfig.supported) {
    throw new Error(
      `Model ${internalModelId} is not supported by provider ${provider}`
    );
  }

  if (providerConfig.transformParams) {
    return providerConfig.transformParams(internalModelId, params);
  }

  return params;
}

/**
 * Get all supported models for a provider
 */
export function getSupportedModels(provider: ProviderType): string[] {
  return Object.values(MODEL_MAPPINGS)
    .filter((mapping) => mapping.providers[provider]?.supported)
    .map((mapping) => mapping.internalId);
}

/**
 * Get model display name
 */
export function getModelDisplayName(internalModelId: string): string {
  const mapping = MODEL_MAPPINGS[internalModelId];
  return mapping?.displayName || internalModelId;
}
