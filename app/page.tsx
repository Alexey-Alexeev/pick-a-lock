import type { Metadata } from "next";
import { getCity, getActiveCities } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { HomeTemplate } from "@/components/city/HomeTemplate";
import { CityPreferenceRedirect } from "@/components/city/CityPreferenceRedirect";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Срочная установка, аварийное вскрытие и замена замков в Москве и Московской области",
    description:
      "Срочное вскрытие, замена, установка и ремонт замков в Москве и городах Московской области. Выезд мастера на адрес, цены известны заранее.",
    pathname: "/",
    indexable: true,
  });
}

export default function HomePage() {
  const moscow = getCity("moscow");
  if (!moscow) return null;

  return (
    <>
      <JsonLd data={localBusinessSchema(moscow)} />
      <CityPreferenceRedirect activeCitySlugs={getActiveCities().map((c) => c.slug)} />
      <HomeTemplate city={moscow} heroLocation="Москве и Московской области" />
    </>
  );
}
