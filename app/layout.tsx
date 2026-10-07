import type { Metadata } from "next";
import { Unbounded, Golos_Text, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/design-system/Header";
import { Footer } from "@/components/design-system/Footer";
import { MobileActionBar } from "@/components/design-system/MobileActionBar";
import { UtmCapture } from "@/components/analytics/UtmCapture";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/seo/site";
import "./globals.css";

// Weights capped at 300/400 — the design system explicitly bans heavier Unbounded cuts.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Срочная установка, аварийное вскрытие и замена замков в Москве и МО",
  description:
    "Срочное вскрытие, замена, установка и ремонт замков в Москве и Московской области. Выезд мастера на адрес.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${golos.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-foreground">
        <a
          href="#main-content"
          className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-[var(--radius-xs)] bg-accent px-4 py-2 font-mono text-sm text-accent-foreground opacity-0 transition-transform duration-150 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Перейти к содержимому
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <AnalyticsScripts />
        <UtmCapture />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
