import type { CSSProperties } from "react";
import { TechnicalLabel } from "./TechnicalLabel";
import { LocationContext } from "./LocationContext";
import { PriceBlock } from "./PriceBlock";
import { Button } from "./Button";

export interface PaletteTokens {
  ink: string;
  inkElevated: string;
  inkForeground: string;
  inkForegroundMuted: string;
  paper: string;
  surface: string;
  surfaceSunken: string;
  foreground: string;
  muted: string;
  border: string;
  accent: string;
  accentInk: string;
  accentForeground: string;
}

interface PaletteDirectionPreviewProps {
  label: string;
  description: string;
  tokens: PaletteTokens;
}

export function PaletteDirectionPreview({ label, description, tokens }: PaletteDirectionPreviewProps) {
  const style = {
    "--ink": tokens.ink,
    "--ink-elevated": tokens.inkElevated,
    "--ink-foreground": tokens.inkForeground,
    "--ink-foreground-muted": tokens.inkForegroundMuted,
    "--paper": tokens.paper,
    "--surface": tokens.surface,
    "--surface-sunken": tokens.surfaceSunken,
    "--foreground": tokens.foreground,
    "--muted": tokens.muted,
    "--border": tokens.border,
    "--accent": tokens.accent,
    "--accent-ink": tokens.accentInk,
    "--accent-foreground": tokens.accentForeground,
    background: "var(--paper)",
  } as CSSProperties;

  return (
    <div style={style} className="border border-border">
      <div className="flex items-baseline justify-between gap-4 border-b border-border px-6 py-4">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="font-mono text-xs text-muted">{description}</span>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <LocationContext cityPrepositional="Балашихе" note="Выезд по городу и ближайшим районам" />
        <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-foreground">
          Вскрытие замков
        </h3>
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex gap-2.5 bg-surface p-2">
            {["ink", "ink-elevated", "surface", "surface-sunken", "border", "accent"].map((name) => (
              <div
                key={name}
                className="h-10 w-10 border border-border"
                style={{ background: `var(--${name})` }}
                title={name}
              />
            ))}
          </div>
          <Button variant="primary" size="sm">Вызвать мастера</Button>
        </div>
        <PriceBlock label="Стоимость" price="1500" meta={[{ label: "Выезд", value: "24/7" }]} />
      </div>

      <div className="flex flex-col gap-5 bg-ink px-6 py-6 text-ink-foreground sm:px-8">
        <TechnicalLabel inverse>24/7 — Москва и область</TechnicalLabel>
        <p className="font-display text-xl font-semibold tracking-[-0.01em]">
          Не можете открыть дверь?
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" size="sm">Вызвать мастера</Button>
          <span className="text-accent">
            <Button variant="outline" size="sm">Вызвать мастера</Button>
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-foreground-muted">
          Gold-filled — Gold-outline
        </span>
      </div>
    </div>
  );
}
