import Link from "next/link";
import type { InfoPageModel } from "@/lib/pageModel";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { PhoneLink } from "@/components/design-system/PhoneLink";
import { Process } from "@/components/design-system/Process";
import { FaqDisclosure } from "@/components/design-system/FaqDisclosure";
import { CTA } from "@/components/design-system/CTA";
import { PersonalizedLocationContext } from "@/components/design-system/PersonalizedLocationContext";
import { PersonalizedCallMasterForm } from "@/components/design-system/PersonalizedCallMasterForm";
import { PersonalizedServiceLinks } from "@/components/design-system/PersonalizedServiceLinks";
import { PersonalizedPriceBlock } from "@/components/design-system/PersonalizedPriceBlock";
import { getActiveCities, getIndexableServices } from "@/lib/content";

function ListBlock({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <TechnicalLabel as="h2">{label}</TechnicalLabel>
      <ul className="mt-4 flex flex-col">
        {items.map((item, i) => (
          <li
            key={i}
            className="border-b border-border py-3.5 text-sm leading-relaxed text-foreground first:border-t sm:text-[16px]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InfoPageTemplate({ model }: { model: InfoPageModel }) {
  const activeCities = getActiveCities();
  const cities = activeCities.map((c) => ({ slug: c.slug, name: c.name }));
  const citiesWithPrepositional = activeCities.map((c) => ({ slug: c.slug, prepositionalName: c.prepositionalName }));
  const services = getIndexableServices().map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 sm:px-10">
        <Breadcrumbs items={model.breadcrumbItems} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-8 sm:px-10 sm:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <PersonalizedLocationContext cities={citiesWithPrepositional} />
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
              <PersonalizedPriceBlock price={model.price} cities={cities} />
              <div className="mt-8 border-t border-border pt-8">
                <PersonalizedCallMasterForm cities={cities} services={services} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {(model.leftItems.length > 0 || model.rightItems.length > 0) && (
          <section className="grid grid-cols-1 gap-10 border-t border-border py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <ListBlock label={model.leftLabel} items={model.leftItems} />
            <ListBlock label={model.rightLabel} items={model.rightItems} />
          </section>
        )}

        {model.processSteps.length > 0 && (
          <section className="border-t border-border py-16 sm:py-20">
            <TechnicalLabel as="h2">Как проходит работа</TechnicalLabel>
            <div className="mt-6">
              <Process steps={model.processSteps.map((description) => ({ description }))} />
            </div>
          </section>
        )}

        {model.advantages.length > 0 && (
          <section className="border-t border-border py-16 sm:py-20">
            <ListBlock label="Преимущества" items={model.advantages} />
          </section>
        )}

        {model.article.length > 0 && (
          <section className="border-t border-border py-16 sm:py-20">
            <div className="flex max-w-2xl flex-col gap-5 text-sm leading-relaxed text-muted sm:text-[16px]">
              {model.article.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {model.faq.length > 0 && (
          <section className="border-t border-border py-16 sm:py-20">
            <TechnicalLabel as="h2">Частые вопросы</TechnicalLabel>
            <div className="mt-6 max-w-2xl">
              <FaqDisclosure items={model.faq} />
            </div>
          </section>
        )}

        {model.otherBrands && model.otherBrands.length > 0 && (
          <section className="border-t border-border py-16 sm:py-20">
            <TechnicalLabel as="h2">Работаем и с другими брендами</TechnicalLabel>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[16px]">
              {model.name} — не единственный бренд, с которым мы работаем. Среди прочих:
            </p>
            <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2.5">
              {model.otherBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={b.href}
                  className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-[16px]"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {(model.relatedServices.length > 0 || model.relatedSecondary.length > 0) && (
          <section className="grid grid-cols-1 gap-10 border-t border-border py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
            {model.relatedServices.length > 0 && (
              <div>
                <TechnicalLabel as="h2">{model.relatedLabel}</TechnicalLabel>
                <PersonalizedServiceLinks services={model.relatedServices} cities={cities} />
              </div>
            )}
            {model.relatedSecondary.length > 0 && (
              <div>
                <TechnicalLabel as="h2">{model.relatedSecondaryLabel}</TechnicalLabel>
                <div className="mt-4 flex flex-col gap-2.5">
                  {model.relatedSecondary.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-[16px]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <CTA
        title={`${model.name} — вызовите мастера прямо сейчас`}
        description="Позвоните или оставьте заявку — мастер свяжется с вами и уточнит детали перед выездом."
        formHref="#order-form"
      />
    </div>
  );
}
