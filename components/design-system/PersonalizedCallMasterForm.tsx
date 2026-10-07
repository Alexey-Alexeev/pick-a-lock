"use client";

import { CallMasterForm, type CallMasterFormOption } from "./CallMasterForm";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";

export function PersonalizedCallMasterForm({
  cities,
  services,
}: {
  cities: CallMasterFormOption[];
  services: CallMasterFormOption[];
}) {
  const currentSlug = useCurrentCitySlug(cities.map((c) => c.slug));
  return <CallMasterForm cities={cities} services={services} defaultCitySlug={currentSlug} />;
}
