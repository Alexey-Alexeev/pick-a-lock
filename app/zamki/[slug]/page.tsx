import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndexableLockTypes, getLockType, getCity } from "@/lib/content";
import { buildLockTypePage } from "@/lib/pageModel";
import { buildMetadata } from "@/lib/seo/metadata";
import { InfoPageTemplate } from "@/components/design-system/InfoPageTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, faqPageSchema } from "@/components/seo/schema";


interface PageParams {
  slug: string;
}

function resolve(params: PageParams) {
  const lockType = getLockType(params.slug);
  if (!lockType) return null;
  return buildLockTypePage(lockType);
}

export function generateStaticParams(): PageParams[] {
  return getIndexableLockTypes().map((lt) => ({ slug: lt.slug }));
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
    pathname: `/zamki/${resolvedParams.slug}/`,
    indexable: model.indexable,
  });
}

export default async function LockTypePage({ params }: { params: Promise<PageParams> }) {
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
