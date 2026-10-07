import type { Metadata } from "next";
import { getIndexableLockTypes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { InfoHubList } from "@/components/design-system/InfoHubList";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Виды замков — какой механизм установлен у вас",
    description:
      "Сувальдные, цилиндровые, кодовые и другие типы замков: особенности конструкции, где применяются и как мастер подбирает способ вскрытия, замены или ремонта.",
    pathname: "/zamki/",
    indexable: true,
  });
}

export default function LockTypesPage() {
  const lockTypes = getIndexableLockTypes();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Виды замков", path: "/zamki/" }]} />
      <TechnicalLabel className="mt-6 block">Виды замков</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        Типы запирающих механизмов
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Выберите тип замка, чтобы узнать его особенности и какая услуга нужна — вскрытие, замена или ремонт.
      </p>

      <div className="mt-10">
        <InfoHubList
          items={lockTypes.map((lt) => ({
            slug: lt.slug,
            name: lt.name,
            summary: lt.tagline,
            price: lt.priceFrom,
            href: `/zamki/${lt.slug}/`,
          }))}
        />
      </div>
    </div>
  );
}
