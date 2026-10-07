import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActiveCities, getCity, getIndexableServices, getService } from "@/lib/content";
import { buildCityServicePage } from "@/lib/pageModel";
import { buildMetadata } from "@/lib/seo/metadata";
import { CityServiceTemplate } from "@/components/city/CityServiceTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, serviceSchema as serviceSchemaLd, faqPageSchema } from "@/components/seo/schema";

export const revalidate = 86400;

interface PageParams {
  city: string;
  service: string;
}

function resolve(params: PageParams) {
  const city = getCity(params.city);
  const service = getService(params.service);
  if (!city || !service) return null;
  return buildCityServicePage(city, service);
}

export function generateStaticParams(): PageParams[] {
  const cities = getActiveCities();
  const services = getIndexableServices();
  const params: PageParams[] = [];
  for (const city of cities) {
    const allowed = city.availableServiceSlugs;
    for (const service of services) {
      if (allowed && allowed.length > 0 && !allowed.includes(service.slug)) continue;
      params.push({ city: city.slug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const model = resolve(resolvedParams);
  if (!model) return {};
  return buildMetadata({
    title: model.title,
    description: model.description,
    pathname: `/${resolvedParams.city}/${resolvedParams.service}/`,
    indexable: model.indexable,
  });
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const model = resolve(resolvedParams);
  if (!model) notFound();

  return (
    <>
      <JsonLd data={localBusinessSchema(model.city)} />
      <JsonLd data={serviceSchemaLd(model.service, model.city, model.price, model.displayName)} />
      {faqPageSchema(model.faq) && <JsonLd data={faqPageSchema(model.faq)!} />}
      <CityServiceTemplate model={model} />
    </>
  );
}
