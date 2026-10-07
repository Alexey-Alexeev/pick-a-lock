"use client";

import Image from "next/image";
import { SITE_TELEGRAM_URL, SITE_WHATSAPP_URL } from "@/lib/seo/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Icon-only links to chat on Telegram or WhatsApp — header/footer companion to PhoneLink. */
export function MessengerLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={SITE_TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        onClick={() => trackEvent("telegram_click")}
        className="shrink-0 transition-transform duration-200 hover:scale-110"
      >
        <Image src="/tg.png" alt="" width={28} height={28} className="h-7 w-7" />
      </a>
      <a
        href={SITE_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        onClick={() => trackEvent("whatsapp_click")}
        className="shrink-0 transition-transform duration-200 hover:scale-110"
      >
        <Image src="/whatsapp.png" alt="" width={28} height={28} className="h-7 w-7" />
      </a>
    </div>
  );
}
