"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT_ID, ADSENSE_SCRIPT_SRC, isAdSenseContentPath } from "@/lib/adsense";

export function AdSenseScript() {
  const pathname = usePathname();
  const isContentPage = isAdSenseContentPath(pathname);

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
