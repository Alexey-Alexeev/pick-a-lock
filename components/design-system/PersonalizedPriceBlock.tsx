"use client";

import { PriceBlock } from "./PriceBlock";
import { useCurrentCitySlug } from "@/lib/useCurrentCitySlug";

export function PersonalizedPriceBlock({
  price,
  cities,
}: {
  price?: string;
  cities: { slug: string; name: string }[];
}) {
  const currentSlug = useCurrentCitySlug(cities.map((c) => c.slug));
  const match = cities.find((c) => c.slug === currentSlug);
  const locationLabel = currentSlug !== "moscow" && match ? match.name : "Москва и область";

  return (
    <PriceBlock label="Стоимость" price={price} meta={[{ label: "Выезд мастера", value: locationLabel }]} />
  );
}
