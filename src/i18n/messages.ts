import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";

/**
 * Static translation messages map for each supported locale
 */
const messagesMap: Record<string, object> = {
  en: enMessages,
  zh: zhMessages,
};

/**
 * Get translation messages for a given locale
 */
export function getMessagesForLocale(locale: string): object {
  return messagesMap[locale] ?? messagesMap["en"];
}