"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/cookieConsent";

/** Loads analytics only after the cookie-consent banner records an "accepted" choice — these
 *  trackers set cookies, so they must not run before the visitor has agreed. */
export function AnalyticsScripts() {
  const consent = useCookieConsent();

  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (consent !== "accepted") return null;

  return (
    <>
      {ymId && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${ymId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
            window.__YM_COUNTER_ID__ = ${ymId};
          `}
        </Script>
      )}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
              window.gtag = gtag;
            `}
          </Script>
        </>
      )}
    </>
  );
}
