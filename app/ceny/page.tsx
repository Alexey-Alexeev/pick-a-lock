import type { Metadata } from "next";
import { getCity, getIndexableServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { PriceTable } from "@/components/design-system/PriceTable";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Цены на вскрытие, замену и установку замков",
    description:
      "Актуальные цены на вскрытие, замену, установку и ремонт замков в Москве. В городах Московской области стоимость уточняется по телефону.",
    pathname: "/ceny/",
    indexable: true,
  });
}

export default function PricesPage() {
  const services = getIndexableServices();
  const moscow = getCity("moscow");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Цены", path: "/ceny/" }]} />
      <TechnicalLabel className="mt-6 block">Цены</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        Цены на услуги
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Ниже — базовые цены на услуги в Москве. Итоговая стоимость зависит от сложности работы,
        типа замка и города — точную сумму мастер называет после уточнения деталей.
      </p>
      <div className="mt-10 max-w-2xl">{moscow && <PriceTable services={services} city={moscow} />}</div>
    </div>
  );
}
