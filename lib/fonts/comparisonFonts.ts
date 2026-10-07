import { Playfair_Display, Manrope, IBM_Plex_Mono, Cormorant_Garamond, Golos_Text, JetBrains_Mono, Spectral, Geist, Geist_Mono } from "next/font/google";

// Combo A — Playfair Display + Manrope + IBM Plex Mono: classic high-contrast luxury serif
export const playfairDisplay = Playfair_Display({ variable: "--font-combo-a-display", subsets: ["latin", "cyrillic"], weight: ["700", "800"] });
export const manrope = Manrope({ variable: "--font-combo-a-body", subsets: ["latin", "cyrillic"], weight: ["500", "600"] });
export const ibmPlexMono = IBM_Plex_Mono({ variable: "--font-combo-a-mono", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });

// Combo B — Cormorant Garamond + Golos Text + JetBrains Mono: refined, delicate serif
export const cormorantGaramond = Cormorant_Garamond({ variable: "--font-combo-b-display", subsets: ["latin", "cyrillic"], weight: ["600", "700"] });
export const golosTextCombo = Golos_Text({ variable: "--font-combo-b-body", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });
export const jetbrainsMonoCombo = JetBrains_Mono({ variable: "--font-combo-b-mono", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });

// Combo C — Spectral + Geist + Geist Mono: contemporary, architectural serif
export const spectral = Spectral({ variable: "--font-combo-c-display", subsets: ["latin", "cyrillic"], weight: ["600", "700"] });
export const geistCombo = Geist({ variable: "--font-combo-c-body", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });
export const geistMonoCombo = Geist_Mono({ variable: "--font-combo-c-mono", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });

export const ALL_COMPARISON_FONT_VARIABLES = [
  playfairDisplay.variable,
  manrope.variable,
  ibmPlexMono.variable,
  cormorantGaramond.variable,
  golosTextCombo.variable,
  jetbrainsMonoCombo.variable,
  spectral.variable,
  geistCombo.variable,
  geistMonoCombo.variable,
].join(" ");
