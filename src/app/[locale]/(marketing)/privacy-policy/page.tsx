import { permanentRedirect } from "next/navigation";
import { i18n, type Locale } from "@/config/i18n-config";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const localePrefix = locale === i18n.defaultLocale ? "" : `/${locale}`;
  permanentRedirect(`${localePrefix}/privacy`);
}
