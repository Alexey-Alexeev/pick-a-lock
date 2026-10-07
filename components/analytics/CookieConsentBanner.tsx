"use client";

import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { useCookieConsent, setStoredCookieConsent } from "@/lib/cookieConsent";

export function CookieConsentBanner() {
  const consent = useCookieConsent();

  function respond(consent: "accepted" | "declined") {
    setStoredCookieConsent(consent);
  }

  if (consent !== null) return null;

  return (
    // Mobile keeps the fixed call/CTA action bar at the bottom (see MobileActionBar), so the
    // banner sits just above it there and flush to the bottom from md up, where that bar is hidden.
    <div className="fixed inset-x-0 bottom-[76px] z-50 border-t border-border bg-paper px-6 py-5 sm:px-10 md:bottom-0">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Сайт использует файлы cookie для аналитики и улучшения работы. Подробнее — в{" "}
          <Link href="/privacy/" className="underline underline-offset-2 hover:text-accent-ink">
            политике обработки персональных данных
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="sm" onPress={() => respond("declined")}>
            Отклонить
          </Button>
          <Button variant="accent" size="sm" onPress={() => respond("accepted")}>
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
}
