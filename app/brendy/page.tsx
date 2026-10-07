import type { Metadata } from "next";
import { getIndexableBrands } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { InfoHubList } from "@/components/design-system/InfoHubList";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Бренды замков — с какими производителями мы работаем",
    description:
      "Вскрытие, ремонт и замена замков популярных производителей: Abus, Cisa, Dom, Evva, Gerda, Kaba, Kale, Keso, Mottura, Gardian.",
    pathname: "/brendy/",
    indexable: true,
  });
}

export default function BrandsPage() {
  const brands = getIndexableBrands();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-16">
      <Breadcrumbs items={[{ name: "Бренды замков", path: "/brendy/" }]} />
      <TechnicalLabel className="mt-6 block">Бренды замков</TechnicalLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-foreground">
        С какими брендами работаем?
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Мастера учитывают конструктивные особенности конкретного бренда — выберите производителя вашего замка.
      </p>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        На практике мастера работают с замками большинства производителей, которые встречаются на российском рынке, — ниже описаны лишь{" "}
        {brands.length} брендов, с которыми сталкиваемся чаще всего:{" "}
        {brands.map((b, i) => (
          <span key={b.slug}>
            {i > 0 && (i === brands.length - 1 ? " и " : ", ")}
            {b.name}
          </span>
        ))}
        . Если вашего бренда нет в этом списке, это не повод для беспокойства — мастер так же уверенно подберёт инструмент и под него.
      </p>

      <div className="mt-10">
        <InfoHubList
          items={brands.map((b) => ({
            slug: b.slug,
            name: b.name,
            summary: b.tagline,
            price: b.priceFrom,
            href: `/brendy/${b.slug}/`,
          }))}
        />
      </div>
    </div>
  );
}
