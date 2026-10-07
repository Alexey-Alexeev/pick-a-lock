"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredCitySlug } from "@/lib/cityPreference";

/**
 * On the root page only: if the visitor previously viewed a specific city, send them
 * straight back to it instead of the generic Moscow + region landing page.
 */
export function CityPreferenceRedirect({ activeCitySlugs }: { activeCitySlugs: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const stored = getStoredCitySlug();
    if (stored && stored !== "moscow" && activeCitySlugs.includes(stored)) {
      router.replace(`/${stored}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
