"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getStoredCitySlug } from "./cityPreference";

// The stored preference never changes from outside this hook's own writers, so there's nothing
// to subscribe to — useSyncExternalStore is used here purely for its SSR-safe snapshot read
// (null on the server, the real localStorage value once hydrated), same as useReducedMotion.
function subscribe() {
  return () => {};
}

/**
 * Resolves which city the visitor is "in" for personalization purposes: the city segment
 * of the current URL wins (you're explicitly looking at that city), otherwise falls back
 * to the saved preference, otherwise Moscow.
 */
export function useCurrentCitySlug(validSlugs: string[], fallback = "moscow"): string {
  const pathname = usePathname();
  const storedSlug = useSyncExternalStore(subscribe, getStoredCitySlug, () => null);

  const bySlug = new Set(validSlugs);
  const pathSlug = pathname?.split("/").filter(Boolean)[0];
  if (pathSlug && bySlug.has(pathSlug)) return pathSlug;
  return storedSlug && bySlug.has(storedSlug) ? storedSlug : fallback;
}
