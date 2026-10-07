import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { PhoneLink } from "@/components/design-system/PhoneLink";
import { CallMasterForm } from "@/components/design-system/CallMasterForm";
import { getActiveCities, getIndexableServices } from "@/lib/content";
import { SITE_NAME } from "@/lib/seo/site";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Контакты",
    description: `Телефон и форма заявки ${SITE_NAME} — службы вскрытия и замены замков в Москве и Московской области.`,
    pathname: "/contacts/",
    indexable: true,
  });
}

export default function ContactsPage() {
  const cities = getActiveCities().map((c) => ({ slug: c.slug, name: c.name }));
  const services = getIndexableServices().map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <div className="mx-auto max-w-xl px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Контакты", path: "/contacts/" }]} />
      <TechnicalLabel className="mt-6 block">Контакты</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">Контакты</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Звоните или оставьте заявку — мастер свяжется с вами, уточнит адрес и время выезда.
      </p>

      <div className="mt-6">
        <PhoneLink size="lg" className="text-foreground" />
      </div>

      <div id="order-form" className="mt-10 border border-border p-6 sm:p-8">
        <CallMasterForm cities={cities} services={services} defaultCitySlug="moscow" />
      </div>
    </div>
  );
}
