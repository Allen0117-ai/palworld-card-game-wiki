"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_SCRIPT_SRC, isAdSenseContentPath } from "@/lib/adsense";

export function AdSenseScript() {
  const pathname = usePathname();
  const isContentPage = isAdSenseContentPath(pathname);

  useEffect(() => {
    if (isContentPage) return;

    const adSenseWasLoaded = document.querySelector(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
    );
    if (adSenseWasLoaded) window.location.reload();
  }, [isContentPage]);

  if (!isContentPage) return null;

  return (
    <Script
      id="adsense"
      async
      crossOrigin="anonymous"
      data-ad-client={ADSENSE_CLIENT_ID}
      src={ADSENSE_SCRIPT_SRC}
      strategy="afterInteractive"
    />
  );
}
