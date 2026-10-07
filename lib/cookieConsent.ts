"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "pick-a-lock:cookie-consent";
const CHANGE_EVENT = "pick-a-lock:cookie-consent-changed";

export type CookieConsent = "accepted" | "declined";

function read(): CookieConsent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredCookieConsent(consent: CookieConsent): void {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // localStorage unavailable (private browsing, disabled storage) — fail silently.
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getServerSnapshot() {
  return null;
}

/** The visitor's cookie-consent choice — `null` until they answer the banner. Updates live when
 *  `setStoredCookieConsent` is called, including from other mounted components on the page. */
export function useCookieConsent(): CookieConsent | null {
  return useSyncExternalStore(subscribe, read, getServerSnapshot);
}
