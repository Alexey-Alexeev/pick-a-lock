import type { Metadata } from "next";
import { getCity, getIndexableServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { ServiceList } from "@/components/design-system/ServiceList";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Услуги по вскрытию, замене и ремонту замков",
    description:
      "Полный список услуг: вскрытие замков, дверей, автомобилей и сейфов, замена и установка замков, ремонт и извлечение сломанного ключа.",
    pathname: "/services/",
    indexable: true,
  });
}

export default function ServicesPage() {
  const services = getIndexableServices();
  const moscow = getCity("moscow");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Услуги", path: "/services/" }]} />
      <TechnicalLabel className="mt-6 block">Услуги</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        Вскрытие, замена и ремонт замков
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Выберите услугу, чтобы увидеть описание, цену и условия работы в вашем городе.
      </p>

      <div className="mt-10">{moscow && <ServiceList services={services} city={moscow} />}</div>
    </div>
  );
}
