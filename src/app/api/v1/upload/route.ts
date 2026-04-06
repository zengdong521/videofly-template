import { nanoid } from "nanoid";

import { requireAuth } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { handleApiError, apiSuccess } from "@/lib/api/response";
import { getStorage } from "@/lib/storage";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
];

const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/aac",
  "audio/m4a",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_AUDIO_SIZE = 20 * 1024 * 1024; // 20MB

function isAllowedType(type: string): boolean {
  return [
    ...ALLOWED_IMAGE_TYPES,
    ...ALLOWED_VIDEO_TYPES,
    ...ALLOWED_AUDIO_TYPES,
  ].includes(type);
}

function getMaxFileSize(type: string): number {
  if (ALLOWED_VIDEO_TYPES.includes(type)) {
    return MAX_VIDEO_SIZE;
  }
  if (ALLOWED_AUDIO_TYPES.includes(type)) {
    return MAX_AUDIO_SIZE;
  }
  return MAX_IMAGE_SIZE;
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request);
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new ApiError("Missing file", 400);
    }

    if (!isAllowedType(file.type)) {
      throw new ApiError(
        `Invalid content type. Allowed: ${[
          ...ALLOWED_IMAGE_TYPES,
          ...ALLOWED_VIDEO_TYPES,
          ...ALLOWED_AUDIO_TYPES,
        ].join(", ")}`,
        400
      );
    }

    if (file.size > getMaxFileSize(file.type)) {
      throw new ApiError("File too large", 400);
    }

    const ext = file.name.split(".").pop() || "jpg";
    const key = `uploads/${user.id}/${nanoid()}.${ext}`;

    const storage = getStorage();
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await storage.uploadFile({
      key,
      body: buffer,
      contentType: file.type,
    });

    return apiSuccess({ publicUrl: uploaded.url, key });
  } catch (error) {
    return handleApiError(error);
  }
}
