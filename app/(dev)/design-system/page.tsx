import type { Metadata } from "next";
import { getActiveCities, getCity, getIndexableServices } from "@/lib/content";
import { SectionHeading } from "@/components/design-system/SectionHeading";
import { TechnicalLabel } from "@/components/design-system/TechnicalLabel";
import { Button } from "@/components/design-system/Button";
import { LinkButton } from "@/components/design-system/LinkButton";
import { LocationContext } from "@/components/design-system/LocationContext";
import { ServiceList } from "@/components/design-system/ServiceList";
import { PriceBlock } from "@/components/design-system/PriceBlock";
import { PriceTable } from "@/components/design-system/PriceTable";
import { Process } from "@/components/design-system/Process";
import { CTA } from "@/components/design-system/CTA";
import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import { FaqDisclosure } from "@/components/design-system/FaqDisclosure";
import { CallMasterForm } from "@/components/design-system/CallMasterForm";
import { PaletteDirectionPreview, type PaletteTokens } from "@/components/design-system/PaletteDirectionPreview";
import { FontComboPreview } from "@/components/design-system/FontComboPreview";
import {
  playfairDisplay,
  manrope,
  ibmPlexMono,
  cormorantGaramond,
  golosTextCombo,
  jetbrainsMonoCombo,
  spectral,
  geistCombo,
  geistMonoCombo,
} from "@/lib/fonts/comparisonFonts";

export function generateMetadata(): Metadata {
  return { title: "Design System", robots: { index: false, follow: false } };
}

// A — Black / Champagne Gold: the most luxurious, obsidian + warm ivory + muted champagne
const PALETTE_A: PaletteTokens = {
  ink: "#15130f",
  inkElevated: "#1e1b15",
  inkForeground: "#f4efe2",
  inkForegroundMuted: "#a89c85",
  paper: "#f5f1e6",
  surface: "#ece4d2",
  surfaceSunken: "#e1d7be",
  foreground: "#18150f",
  muted: "#6d6554",
  border: "#dcd1b2",
  accent: "#bb9c65",
  accentInk: "#8f7442",
  accentForeground: "#171309",
};

// B — Espresso / Bronze: warmer, softer, less dramatic than A
const PALETTE_B: PaletteTokens = {
  ink: "#231b13",
  inkElevated: "#2d2419",
  inkForeground: "#f2ead8",
  inkForegroundMuted: "#a89579",
  paper: "#f3ecdc",
  surface: "#e9dfc6",
  surfaceSunken: "#ded1b0",
  foreground: "#211a10",
  muted: "#72654a",
  border: "#d8c89f",
  accent: "#a3703f",
  accentInk: "#7a5329",
  accentForeground: "#faf2e2",
};

// C — Black / Burgundy / Gold: obsidian with a burgundy-tinted elevated surface, gold accent
const PALETTE_C: PaletteTokens = {
  ink: "#120d0d",
  inkElevated: "#281318",
  inkForeground: "#f2eae1",
  inkForegroundMuted: "#a4938d",
  paper: "#f4eee3",
  surface: "#eae0d2",
  surfaceSunken: "#ded0c9",
  foreground: "#16100f",
  muted: "#6d5f5c",
  border: "#d9c8bc",
  accent: "#c2a05f",
  accentInk: "#93763f",
  accentForeground: "#140c0c",
};

const COLOR_SWATCHES = [
  { name: "ink", var: "--ink" },
  { name: "ink-elevated", var: "--ink-elevated" },
  { name: "paper", var: "--paper" },
  { name: "surface", var: "--surface" },
  { name: "surface-sunken", var: "--surface-sunken" },
  { name: "border", var: "--border" },
  { name: "muted", var: "--muted" },
  { name: "accent", var: "--accent" },
  { name: "accent-ink", var: "--accent-ink" },
];

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 border-t border-border py-14">
      <TechnicalLabel>{label}</TechnicalLabel>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  const moscow = getCity("moscow")!;
  const services = getIndexableServices();
  const cities = getActiveCities().map((c) => ({ slug: c.slug, name: c.name }));
  const serviceOptions = services.map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <div
      className={`mx-auto max-w-[1400px] px-6 py-16 sm:px-10 ${playfairDisplay.variable} ${manrope.variable} ${ibmPlexMono.variable} ${cormorantGaramond.variable} ${golosTextCombo.variable} ${jetbrainsMonoCombo.variable} ${spectral.variable} ${geistCombo.variable} ${geistMonoCombo.variable}`}
    >
      <TechnicalLabel>Internal / Not indexed</TechnicalLabel>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em]">Design System</h1>
      <p className="mt-3 max-w-xl text-muted">
        Luxury black &amp; gold refinement — three obsidian/ivory/gold color directions and three
        editorial-serif typography systems, compared live through the real components below.
      </p>

      <Block label="Color Directions — A / B / C — Black &amp; Gold">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <PaletteDirectionPreview
            label="A — Obsidian / Champagne"
            description="Black / ivory / champagne gold"
            tokens={PALETTE_A}
          />
          <PaletteDirectionPreview
            label="B — Espresso / Bronze"
            description="Deep espresso / cream / bronze"
            tokens={PALETTE_B}
          />
          <PaletteDirectionPreview
            label="C — Obsidian / Burgundy / Gold"
            description="Black / burgundy surface / gold"
            tokens={PALETTE_C}
          />
        </div>
      </Block>

      <Block label="Typography Directions — A / B / C — Editorial Serif">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <FontComboPreview
            label="A — Playfair Display / Manrope / IBM Plex Mono"
            description="Classic high-contrast luxury serif"
            displayVar="--font-combo-a-display"
            bodyVar="--font-combo-a-body"
            monoVar="--font-combo-a-mono"
            displayWeight={700}
          />
          <FontComboPreview
            label="B — Cormorant Garamond / Golos Text / JetBrains Mono"
            description="Refined, delicate serif"
            displayVar="--font-combo-b-display"
            bodyVar="--font-combo-b-body"
            monoVar="--font-combo-b-mono"
            displayWeight={700}
          />
          <FontComboPreview
            label="C — Spectral / Geist / Geist Mono"
            description="Contemporary, architectural serif"
            displayVar="--font-combo-c-display"
            bodyVar="--font-combo-c-body"
            monoVar="--font-combo-c-mono"
            displayWeight={700}
          />
        </div>
      </Block>

      <Block label="Live system — Colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLOR_SWATCHES.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div
                className="h-20 border border-border"
                style={{ background: `var(${c.var})` }}
              />
              <span className="font-mono text-xs text-muted">{c.var}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block label="Live system — Typography">
        <div className="flex flex-col gap-6">
          <SectionHeading size="lg" eyebrow="Display / lg">Вскрытие замков</SectionHeading>
          <SectionHeading size="md" eyebrow="Display / md">Вскрытие замков</SectionHeading>
          <SectionHeading size="sm" eyebrow="Display / sm">Вскрытие замков</SectionHeading>
          <p className="max-w-xl font-body text-base leading-relaxed text-foreground">
            Geist — основной текстовый шрифт для заголовков и текста. Нейтральный, точный, с полной
            поддержкой кириллицы.
          </p>
          <span className="font-mono text-sm text-muted">Geist Mono — SERVICE 01 / 24-7 / PRICE FROM</span>
        </div>
      </Block>

      <Block label="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Вызвать мастера</Button>
          <Button variant="accent">Вызвать мастера</Button>
          <Button variant="outline">Подробнее</Button>
          <LinkButton href="/" variant="primary" size="sm">
            Link button
          </LinkButton>
        </div>
      </Block>

      <Block label="Location Context">
        <LocationContext cityPrepositional="Балашихе" note="Выезд мастера по городу и ближайшим районам" />
      </Block>

      <Block label="Breadcrumbs">
        <Breadcrumbs items={[{ name: "Балашиха", path: "/balashikha/" }, { name: "Вскрытие замков", path: "/balashikha/vskrytie-zamkov/" }]} />
      </Block>

      <Block label="Price">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <PriceBlock
            label="Вскрытие замка"
            price="1500"
            meta={[{ label: "Выезд", value: "24 / 7" }, { label: "Время", value: "~40 мин" }]}
          />
          <PriceTable services={services.slice(0, 5)} city={moscow} />
        </div>
      </Block>

      <Block label="Service List">
        <ServiceList services={services.slice(0, 5)} city={moscow} />
      </Block>

      <Block label="Process">
        <Process
          steps={[
            { title: "Заявка", description: "Коротко описываете проблему по телефону или на сайте." },
            { title: "Уточнение", description: "Мастер уточняет детали и называет стоимость." },
            { title: "Выезд", description: "Мастер приезжает на адрес в согласованное время." },
            { title: "Решение", description: "Задача решается на месте, оплата по факту." },
          ]}
        />
      </Block>

      <Block label="FAQ">
        <FaqDisclosure items={services[0].faq} />
      </Block>

      <Block label="Form">
        <div className="max-w-md">
          <CallMasterForm cities={cities} services={serviceOptions} defaultCitySlug="moscow" />
        </div>
      </Block>

      <div className="border-t border-border">
        <TechnicalLabel className="block py-6">CTA (full-width, dark)</TechnicalLabel>
      </div>
      <CTA
        title="Не можете открыть дверь?"
        description="Работаем круглосуточно в Москве и области — мы приедем и решим проблему."
      />
    </div>
  );
}
