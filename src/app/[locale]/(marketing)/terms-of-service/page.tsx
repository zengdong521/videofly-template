import { redirect } from "next/navigation";
import type { Locale } from "@/config/i18n-config";

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/terms`);
}
