import type { Metadata } from "next";
import Link from "next/link";
import { getActiveCities } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Города обслуживания — Москва и Московская область",
    description:
      "Полный список городов Москвы и Московской области, где выполняется вскрытие, замена и ремонт замков.",
    pathname: "/cities/",
    indexable: true,
  });
}

export default function CitiesPage() {
  const moscow = getActiveCities().filter((c) => c.region === "moscow");
  const oblast = getActiveCities()
    .filter((c) => c.region === "moscow-oblast")
    .sort((a, b) => a.name.localeCompare(b.name, "ru"));

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Города", path: "/cities/" }]} />
      <TechnicalLabel className="mt-6 block">География</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        Вскрытие и замена замков в Москве и Московской области
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Выберите свой город, чтобы увидеть услуги, цены и зону обслуживания мастера.
      </p>

      {moscow.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <TechnicalLabel>Москва</TechnicalLabel>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2.5">
            {moscow.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/`}
                className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-base"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 border-t border-border pt-8">
        <TechnicalLabel>Московская область</TechnicalLabel>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2.5">
          {oblast.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/`}
              className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-accent-ink sm:text-base"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
