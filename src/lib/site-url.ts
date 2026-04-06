const FALLBACK_SITE_URL = "https://donney.pro";

export function normalizeSiteUrl(url?: string | null): string {
  const value = url?.trim() || FALLBACK_SITE_URL;
  const normalized = value.replace(/\/+$/, "");

  if (
    process.env.NODE_ENV === "production" &&
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalized)
  ) {
    return FALLBACK_SITE_URL;
  }

  return normalized || FALLBACK_SITE_URL;
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL);
}

export { FALLBACK_SITE_URL };
