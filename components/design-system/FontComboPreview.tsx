interface FontComboPreviewProps {
  label: string;
  description: string;
  displayVar: string;
  bodyVar: string;
  monoVar: string;
  displayWeight?: number;
}

export function FontComboPreview({
  label,
  description,
  displayVar,
  bodyVar,
  monoVar,
  displayWeight = 700,
}: FontComboPreviewProps) {
  return (
    <div className="border border-border p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="font-mono text-xs text-muted">{description}</span>
      </div>

      <h2
        style={{ fontFamily: `var(${displayVar})`, fontWeight: displayWeight }}
        className="mt-6 text-4xl leading-[1.04] tracking-[-0.01em] text-foreground sm:text-5xl"
      >
        Вскрытие замков
      </h2>
      <h3
        style={{ fontFamily: `var(${displayVar})`, fontWeight: displayWeight }}
        className="mt-3 text-xl leading-tight tracking-[-0.01em] text-foreground"
      >
        Аварийная служба в Москве
      </h3>
      <p style={{ fontFamily: `var(${bodyVar})` }} className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        Срочное вскрытие, замена и ремонт замков. Мастер выезжает на адрес и называет стоимость
        до начала работ.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <span style={{ fontFamily: `var(${monoVar})` }} className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Москва / 24—7
        </span>
        <span style={{ fontFamily: `var(${displayVar})`, fontWeight: displayWeight }} className="text-2xl text-accent-ink">
          от 1500 ₽
        </span>
      </div>
      <button
        style={{ fontFamily: `var(${bodyVar})` }}
        className="mt-5 h-11 border-0 bg-ink px-5 text-sm font-medium text-ink-foreground"
      >
        Вызвать мастера
      </button>
    </div>
  );
}
