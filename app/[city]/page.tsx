import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActiveCities, getCity } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { shouldIndexCity } from "@/lib/seo/should-index";
import { HomeTemplate } from "@/components/city/HomeTemplate";
import { CityPreferenceSync } from "@/components/city/CityPreferenceSync";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schema";

export const revalidate = 86400;

interface PageParams {
  city: string;
}

export function generateStaticParams(): PageParams[] {
  return getActiveCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCity(resolvedParams.city);
  if (!city) return {};

  return buildMetadata({
    title: `Срочная установка, аварийное вскрытие и замена замков в ${city.prepositionalName}`,
    description: `Срочное вскрытие, замена, установка и ремонт замков в ${city.prepositionalName}. Выезд мастера на адрес, цены известны заранее.`,
    pathname: `/${resolvedParams.city}/`,
    indexable: shouldIndexCity(city).indexable,
  });
}

export default async function CityHomePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const city = getCity(resolvedParams.city);
  if (!city) notFound();

  return (
    <>
      <JsonLd data={localBusinessSchema(city)} />
      <CityPreferenceSync citySlug={city.slug} />
      <HomeTemplate city={city} heroLocation={city.prepositionalName} />
    </>
  );
}
