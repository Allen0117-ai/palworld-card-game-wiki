"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktopViewport } from "@/components/useDesktopViewport";

const adsterraBannerEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED !== "false"
  && process.env.NEXT_PUBLIC_ADSTERRA_BANNER_ENABLED !== "false";

const bannerByDevice = {
  desktop: {
    height: 90,
    key: "9bd285eb6652f6632a6edece99fe6613",
    src: "https://www.highperformanceformat.com/9bd285eb6652f6632a6edece99fe6613/invoke.js",
    width: 728,
  },
  mobile: {
    height: 50,
    key: "2f015011f98dcad22cb5580efe19ba9a",
    src: "https://www.highperformanceformat.com/2f015011f98dcad22cb5580efe19ba9a/invoke.js",
    width: 320,
  },
} as const;

type Banner = (typeof bannerByDevice)[keyof typeof bannerByDevice];

function BannerSlot({ banner }: { banner: Banner }) {
  const slotRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const host = hostRef.current;
    if (!host) return;

    setIsReady(false);
    const revealRenderedAd = () => {
      if (host.querySelector("iframe, a, img, video")) setIsReady(true);
    };
    const observer = new MutationObserver(revealRenderedAd);
    observer.observe(host, { childList: true, subtree: true });

    const optionsScript = document.createElement("script");
    optionsScript.text = `atOptions = {\n  'key' : '${banner.key}',\n  'format' : 'iframe',\n  'height' : ${banner.height},\n  'width' : ${banner.width},\n  'params' : {}\n};`;

    const invokeScript = document.createElement("script");
    invokeScript.async = true;
    invokeScript.src = banner.src;
    invokeScript.addEventListener("load", revealRenderedAd);
    host.append(optionsScript, invokeScript);

    return () => {
      observer.disconnect();
      host.replaceChildren();
    };
  }, [banner, shouldLoad]);

  return (
    <aside
      ref={slotRef}
      className={`adsterra-slot adsterra-banner-slot${isReady ? " is-ready" : ""}`}
      aria-label={isReady ? "Advertisement" : undefined}
      aria-hidden={!isReady}
    >
      <div className="adsterra-slot-inner">
        {isReady ? <span className="adsterra-label">Advertisement</span> : null}
        <div
          ref={hostRef}
          className="adsterra-banner-host"
          style={shouldLoad ? { height: banner.height, width: banner.width } : undefined}
        />
      </div>
    </aside>
  );
}

export function AdsterraBannerAd() {
  const isDesktop = useDesktopViewport();

  if (!adsterraBannerEnabled) return null;
  if (isDesktop === null) {
    return <aside className="adsterra-slot adsterra-banner-slot" aria-hidden />;
  }

  const banner = bannerByDevice[isDesktop ? "desktop" : "mobile"];
  return <BannerSlot key={banner.key} banner={banner} />;
}
