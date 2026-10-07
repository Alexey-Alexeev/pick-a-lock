"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredCitySlug } from "./cityPreference";

/**
 * Resolves which city the visitor is "in" for personalization purposes: the city segment
 * of the current URL wins (you're explicitly looking at that city), otherwise falls back
 * to the saved preference, otherwise Moscow.
 */
export function useCurrentCitySlug(validSlugs: string[], fallback = "moscow"): string {
  const pathname = usePathname();
  const [slug, setSlug] = useState(fallback);

  useEffect(() => {
    const bySlug = new Set(validSlugs);
    const pathSlug = pathname?.split("/").filter(Boolean)[0];

    if (pathSlug && bySlug.has(pathSlug)) {
      setSlug(pathSlug);
      return;
    }
    const stored = getStoredCitySlug();
    setSlug(stored && bySlug.has(stored) ? stored : fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, validSlugs.join(",")]);

  return slug;
}
