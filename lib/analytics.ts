"use client";

type AnalyticsEvent =
  | "phone_click"
  | "form_open"
  | "form_submit"
  | "telegram_submit"
  | "telegram_click"
  | "whatsapp_click"
  | "cta_click";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    __YM_COUNTER_ID__?: number;
  }
}

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string>): void {
  if (typeof window === "undefined") return;

  try {
    if (window.ym && window.__YM_COUNTER_ID__) {
      window.ym(window.__YM_COUNTER_ID__, "reachGoal", event, params);
    }
    if (window.gtag) {
      window.gtag("event", event, params);
    }
  } catch {
    // analytics must never break the UI
  }
}

export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

const UTM_STORAGE_KEY = "pick-a-lock:utm";

export function captureUtmFromLocation(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UtmParams = {
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      utmContent: params.get("utm_content") ?? undefined,
      utmTerm: params.get("utm_term") ?? undefined,
    };
    const hasAny = Object.values(utm).some(Boolean);
    if (hasAny) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    }
  } catch {
    // sessionStorage may be unavailable (private mode); UTM passthrough is best-effort
  }
}

export function getStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
