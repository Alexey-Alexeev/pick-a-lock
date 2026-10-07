import Link from "next/link";
import { PhoneLink } from "./PhoneLink";
import { MessengerLinks } from "./MessengerLinks";
import { LinkButton } from "./LinkButton";
import { TechnicalLabel } from "./TechnicalLabel";
import { MegaMenu, type MegaMenuGroup } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { HeaderCitySelect } from "./HeaderCitySelect";
import { getIndexableServices, getIndexableLockTypes, getIndexableBrands, getActiveCities } from "@/lib/content";

const FLAT_LINKS = [
  { href: "/ceny/", label: "Цены" },
  { href: "/cities/", label: "Города" },
  { href: "/blog/", label: "Статьи" },
  { href: "/contacts/", label: "Контакты" },
];

export async function Header() {
  const services = getIndexableServices();
  const lockTypes = getIndexableLockTypes();
  const brands = getIndexableBrands();
  const cities = getActiveCities()
    .map((c) => ({ slug: c.slug, name: c.name }))
    .sort((a, b) => a.name.localeCompare(b.name, "ru"));

  const groups: MegaMenuGroup[] = [
    {
      label: "Услуги",
      items: services.map((s) => ({ slug: s.slug, name: s.shortName })),
      cityAware: true,
      moreHref: "/services/",
      moreLabel: "Все услуги →",
    },
    {
      label: "Виды замков",
      items: lockTypes.map((lt) => ({ href: `/zamki/${lt.slug}/`, name: lt.name })),
      moreHref: "/zamki/",
      moreLabel: "Все типы →",
    },
    {
      label: "Бренды замков",
      items: brands.map((b) => ({ href: `/brendy/${b.slug}/`, name: b.name })),
      moreHref: "/brendy/",
      moreLabel: "Все бренды →",
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-6 sm:px-10">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-display text-lg font-light tracking-[-0.02em] text-foreground"
        >
          Мастер замков
        </Link>
        <nav className="hidden items-center gap-6 font-mono text-[12px] uppercase tracking-[0.14em] text-muted xl:flex">
          <HeaderCitySelect cities={cities} />
          <MegaMenu label="Услуги" groups={groups} cities={cities} />
          {FLAT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <TechnicalLabel className="hidden sm:inline">Доступны 24/7</TechnicalLabel>
          <PhoneLink
            size="sm"
            className="hidden shrink-0 whitespace-nowrap text-foreground sm:inline-flex"
          />
          <MessengerLinks className="hidden text-muted sm:flex" />
          <LinkButton href="#order-form" variant="accent" size="sm" className="hidden sm:inline-flex">
            Вызвать мастера
          </LinkButton>
          <MobileMenu groups={groups} flatLinks={FLAT_LINKS} cities={cities} />
        </div>
      </div>
    </header>
  );
}
