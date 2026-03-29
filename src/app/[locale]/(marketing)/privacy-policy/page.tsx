import { redirect } from "next/navigation";
import type { Locale } from "@/config/i18n-config";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/privacy`);
}
