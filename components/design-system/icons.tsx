import type { SVGProps } from "react";

/**
 * Custom blueprint-style icon set — the design system explicitly bans library icon sets.
 * Thin stroke (1.5), no fill, no rounded joins; cyan is reserved for axis/measurement
 * ticks, never for the primary glyph stroke.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h3.2l1.3 4.2-2 1.6a12 12 0 0 0 6.7 6.7l1.6-2 4.2 1.3V19a2 2 0 0 1-2.1 2C10.8 20.6 3.4 13.2 3 6.1 2.95 5 3.9 4 5 4Z" />
      <path d="M15 4c2.5.3 4.7 2.5 5 5" style={{ stroke: "var(--cyan)" }} strokeOpacity=".8" />
    </svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 6.5a4 4 0 0 1-5.1 5.1L4 17l3 3 5.4-5.4a4 4 0 0 1 5.1-5.1L15 12l-2-2Z" />
      <path d="M15.5 5.5 18 3M19 6.5 21 4.5" style={{ stroke: "var(--cyan)" }} strokeOpacity=".8" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8.5 12 15l7-6.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
