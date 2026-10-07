export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pick-a-lock.ru";
export const SITE_NAME = "Pick-a-Lock";
export const SITE_PHONE_DISPLAY = "+7 (966) 106-88-28";
export const SITE_PHONE_HREF = "+79661068828";
export const SITE_WHATSAPP_URL = "https://wa.me/79661068828";
export const SITE_TELEGRAM_URL = "https://t.me/+79661068828";

/** Legal operator of the site and processor of personal data submitted through its forms —
 *  required for the "Обязательная информация" and Политика обработки персональных данных pages. */
export const SITE_OWNER_NAME = "Соколов Артём Валерьевич";
export const SITE_OWNER_STATUS = "самозанятый (плательщик налога на профессиональный доход)";

export function canonicalUrl(pathname: string): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${clean}`;
}
