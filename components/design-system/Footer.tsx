import Link from "next/link";
import { getActiveCities } from "@/lib/content";
import { TechnicalLabel } from "./TechnicalLabel";
import { PhoneLink } from "./PhoneLink";
import { MessengerLinks } from "./MessengerLinks";
import { FooterLocationLine } from "./FooterLocationLine";
import { SITE_NAME, SITE_OWNER_NAME, SITE_OWNER_STATUS } from "@/lib/seo/site";

export function Footer() {
  const allCities = getActiveCities();
  const topCities = [...allCities].sort((a, b) => b.priority - a.priority).slice(0, 16);
  const cityOptions = allCities.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <footer className="border-t border-border bg-ink-elevated pb-24 text-ink-foreground md:pb-0">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.6fr]">
          <div className="flex flex-col gap-4">
            <span className="font-display text-lg font-light tracking-[-0.02em]">Мастер замков</span>
            <p className="max-w-xs text-sm leading-relaxed text-ink-foreground-muted">
              Аварийное вскрытие, замена, установка и ремонт замков в Москве и Московской области.
            </p>
            <PhoneLink className="text-ink-foreground" />
            <MessengerLinks className="text-ink-foreground-muted" />
          </div>

          <div className="flex flex-col gap-3">
            <TechnicalLabel inverse>Разделы</TechnicalLabel>
            <nav className="flex flex-col gap-2.5 text-sm text-ink-foreground-muted">
              <Link href="/services/" className="transition-colors hover:text-ink-foreground">Услуги</Link>
              <Link href="/zamki/" className="transition-colors hover:text-ink-foreground">Виды замков</Link>
              <Link href="/brendy/" className="transition-colors hover:text-ink-foreground">Бренды замков</Link>
              <Link href="/ceny/" className="transition-colors hover:text-ink-foreground">Цены</Link>
              <Link href="/cities/" className="transition-colors hover:text-ink-foreground">Города</Link>
              <Link href="/blog/" className="transition-colors hover:text-ink-foreground">Статьи</Link>
              <Link href="/contacts/" className="transition-colors hover:text-ink-foreground">Контакты</Link>
              <Link href="/privacy/" className="transition-colors hover:text-ink-foreground">
                Политика конфиденциальности
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <TechnicalLabel inverse>География</TechnicalLabel>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-ink-foreground-muted">
              {topCities.map((city) => (
                <Link key={city.slug} href={`/${city.slug}/`} className="transition-colors hover:text-ink-foreground">
                  {city.name}
                </Link>
              ))}
            </div>
            <Link href="/cities/" className="mt-1 text-sm text-ink-foreground underline underline-offset-4">
              Все города →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-border pt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          <FooterLocationLine cities={cityOptions} />
        </div>
        <p className="mt-4 font-mono text-[11px] normal-case tracking-normal text-ink-foreground-muted">
          {SITE_OWNER_NAME}, {SITE_OWNER_STATUS}
        </p>
      </div>
    </footer>
  );
}
