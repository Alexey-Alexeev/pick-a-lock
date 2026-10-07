import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — вскрытие и замена замков`,
    short_name: SITE_NAME,
    description: "Срочное вскрытие, замена, установка и ремонт замков в Москве и Московской области.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d10",
    theme_color: "#0b0d10",
    icons: [
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  };
}
