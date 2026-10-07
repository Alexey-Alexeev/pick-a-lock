"use client";

import { useEffect } from "react";
import { setStoredCitySlug } from "@/lib/cityPreference";

/** Records that the visitor explicitly viewed this city, so the root page can return them to it later. */
export function CityPreferenceSync({ citySlug }: { citySlug: string }) {
  useEffect(() => {
    setStoredCitySlug(citySlug);
  }, [citySlug]);

  return null;
}
