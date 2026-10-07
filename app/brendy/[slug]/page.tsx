import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndexableBrands, getBrand, getCity } from "@/lib/content";
import { buildBrandPage } from "@/lib/pageModel";
import { buildMetadata } from "@/lib/seo/metadata";
import { InfoPageTemplate } from "@/components/design-system/InfoPageTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, faqPageSchema } from "@/components/seo/schema";

export const revalidate = 86400;

interface PageParams {
  slug: string;
}

function resolve(params: PageParams) {
  const brand = getBrand(params.slug);
  if (!brand) return null;
  return buildBrandPage(brand);
}

export function generateStaticParams(): PageParams[] {
  return getIndexableBrands().map((b) => ({ slug: b.slug }));
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
    pathname: `/brendy/${resolvedParams.slug}/`,
    indexable: model.indexable,
  });
}

export default async function BrandPage({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = await params;
  const model = resolve(resolvedParams);
  if (!model) notFound();

  const moscow = getCity("moscow");

  return (
    <>
      {moscow && <JsonLd data={localBusinessSchema(moscow)} />}
      {faqPageSchema(model.faq) && <JsonLd data={faqPageSchema(model.faq)!} />}
      <InfoPageTemplate model={model} />
    </>
  );
}
