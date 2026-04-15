import { permanentRedirect } from "next/navigation";
import type { Locale } from "@/config/i18n-config";

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/terms`);
}
