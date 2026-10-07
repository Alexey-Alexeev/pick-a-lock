import type { CityServicePageModel } from "@/lib/pageModel";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { LocationContext } from "@/components/design-system/LocationContext";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { PriceBlock } from "@/components/design-system/PriceBlock";
import { PhoneLink } from "@/components/design-system/PhoneLink";
import { CallMasterForm } from "@/components/design-system/CallMasterForm";
import { Process } from "@/components/design-system/Process";
import { FaqDisclosure } from "@/components/design-system/FaqDisclosure";
import { CTA } from "@/components/design-system/CTA";
import { getActiveCities, getIndexableServices, getAllLockTypes, getAllBrands } from "@/lib/content";
import Link from "next/link";

function ListBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <TechnicalLabel as="h2">{label}</TechnicalLabel>
      <ul className="mt-4 flex flex-col">
        {items.map((item, i) => (
          <li key={i} className="border-b border-border py-3.5 text-sm leading-relaxed text-foreground first:border-t sm:text-[16px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A row of related terms. Lock types and brands have their own pages, so they are links — the
 * relationship is already computed here and was being thrown away as plain text. Terms without a
 * page (object types, stub lock types) render as plain text in the same row, so the row reads
 * consistently either way. Separated by spacing rather than a "·", per the project design rules.
 */
function TermList({ items }: { items: { key: string; name: string; href?: string }[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-relaxed text-foreground sm:text-[16px]">
      {items.map((item) => (
        <li key={item.key}>
          {item.href ? (
            <Link
              href={item.href}
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent-ink"
            >
              {item.name}
            </Link>
          ) : (
            item.name
          )}
        </li>
      ))}
    </ul>
  );
}

export function CityServiceTemplate({ model }: { model: CityServicePageModel }) {
  const { city, service } = model;
  const cities = getActiveCities().map((c) => ({ slug: c.slug, name: c.name }));
  const services = getIndexableServices().map((s) => ({ slug: s.slug, name: s.name }));
  const lockTypesBySlug = new Map(getAllLockTypes().map((lt) => [lt.slug, lt]));
  const relevantLockTypes = (service.relatedLockTypeSlugs ?? [])
    .map((slug) => lockTypesBySlug.get(slug))
    .filter((lt) => lt != null);
  const brandsBySlug = new Map(getAllBrands().map((b) => [b.slug, b]));
  const relevantBrandSlugs = Array.from(
    new Set(relevantLockTypes.flatMap((lt) => lt.relatedBrandSlugs ?? []))
  );
  const relevantBrands = relevantBrandSlugs
    .map((slug) => brandsBySlug.get(slug))
    .filter((b) => b != null);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 sm:px-10">
        <Breadcrumbs
          items={[
            { name: city.name, path: `/${city.slug}/` },
            { name: model.displayName, path: `/${city.slug}/${service.slug}/` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-8 sm:px-10 sm:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <LocationContext cityPrepositional={city.prepositionalName} />
            <h1 className="mt-6 font-display text-[2.5rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[3.25rem]">
              {model.h1}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{model.intro}</p>
            <div className="mt-8">
              <PhoneLink className="text-foreground" />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-border bg-surface/60 p-6 sm:p-8" id="order-form">
              <PriceBlock
                label="Стоимость"
                price={model.price}
                meta={
                  city.responseTimeMinutes
                    ? [{ label: "Выезд мастера", value: `~${city.responseTimeMinutes} мин` }]
                    : undefined
                }
              />
              <div className="mt-8 border-t border-border pt-8">
                <CallMasterForm cities={cities} services={services} defaultCitySlug={city.slug} defaultServiceSlug={service.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* When needed / includes */}
        <section className="grid grid-cols-1 gap-10 border-t border-border py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <ListBlock label="Когда обращаются" items={model.whenNeeded} />
          <ListBlock label="Что входит в работу" items={model.includes} />
        </section>

        {(relevantLockTypes.length > 0 || service.objectTypes.length > 0) && (
          <section className="grid grid-cols-1 gap-10 border-t border-border py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
            {relevantLockTypes.length > 0 && (
              <div>
                <TechnicalLabel as="h2">Типы замков</TechnicalLabel>
                <TermList
                  items={relevantLockTypes.map((lt) => ({
                    key: lt.slug,
                    name: lt.name,
                    // Stub lock types are noindex and near-empty — naming them is useful, linking
                    // to them is not, so those render as plain text.
                    href: lt.isIndexable ? `/zamki/${lt.slug}/` : undefined,
                  }))}
                />
                {city.custom?.lockTypesIntro && (
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[16px]">{city.custom.lockTypesIntro}</p>
                )}
              </div>
            )}
            {service.objectTypes.length > 0 && (
              <div>
                <TechnicalLabel as="h2">Выезжаем на объекты</TechnicalLabel>
                <TermList items={service.objectTypes.map((name) => ({ key: name, name }))} />
              </div>
            )}
          </section>
        )}

        {relevantBrands.length > 0 && (
          <section className="border-t border-border py-16 sm:py-20">
            <TechnicalLabel as="h2">Бренды</TechnicalLabel>
            <TermList
              items={relevantBrands.map((b) => ({
                key: b.slug,
                name: b.name,
                href: b.isIndexable ? `/brendy/${b.slug}/` : undefined,
              }))}
            />
            {city.custom?.brandsIntro && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-[16px]">{city.custom.brandsIntro}</p>
            )}
          </section>
        )}

        {/* Process */}
        <section className="border-t border-border py-16 sm:py-20">
          <TechnicalLabel as="h2">Как проходит работа</TechnicalLabel>
          <div className="mt-6">
            <Process steps={model.processSteps.map((description) => ({ description }))} />
          </div>
        </section>

        {/* Advantages */}
        <section className="border-t border-border py-16 sm:py-20">
          <ListBlock label="Преимущества" items={model.advantages} />
        </section>

        {model.customContent && (
          <section className="border-t border-border py-16 text-sm leading-relaxed text-muted sm:py-20">
            {model.customContent}
          </section>
        )}

        {/* FAQ */}
        <section className="border-t border-border py-16 sm:py-20">
          <TechnicalLabel as="h2">Частые вопросы</TechnicalLabel>
          <div className="mt-6 max-w-2xl">
            <FaqDisclosure items={model.faq} />
          </div>
        </section>

        {/* Related / nearby */}
        <section className="grid grid-cols-1 gap-10 border-t border-border py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {model.relatedServices.length > 0 && (
            <div>
              <TechnicalLabel as="h2">Другие услуги в {city.prepositionalName}</TechnicalLabel>
              <div className="mt-4 flex flex-col gap-2.5">
                {model.relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${city.slug}/${s.slug}/`}
                    className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-[16px]"
                  >
                    {s.shortName}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {model.nearbyCities.length > 0 && (
            <div>
              <TechnicalLabel as="h2">{model.displayName} рядом</TechnicalLabel>
              <div className="mt-4 flex flex-col gap-2.5">
                {model.nearbyCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/${service.slug}/`}
                    className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-[16px]"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <CTA
        title={`${model.displayName} в ${city.prepositionalName} — вызовите мастера`}
        description="Позвоните или оставьте заявку — мастер свяжется с вами и уточнит детали перед выездом."
        formHref="#order-form"
      />
    </div>
  );
}
