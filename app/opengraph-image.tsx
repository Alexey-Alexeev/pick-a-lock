import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0b0d10",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c9a227",
            marginBottom: 32,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: "#e8e6e1",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Срочное вскрытие и замена замков
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#e3be48",
            marginTop: 28,
          }}
        >
          Москва и Московская область
        </div>
      </div>
    ),
    { ...size }
  );
}
