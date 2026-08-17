"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktopViewport } from "@/components/useDesktopViewport";

const adsterraNativeDesktopEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED !== "false"
  && process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_ENABLED !== "false";
const nativeContainerId = "container-ffedc1b118688c6fd911f92592c932fb";
const nativeScriptUrl = "https://pl30773798.effectivecpmnetwork.com/ffedc1b118688c6fd911f92592c932fb/invoke.js";

function DesktopNativeAd() {
  const slotRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    const container = containerRef.current;
    if (!host || !container) return;

    setIsReady(false);
    const revealRenderedAd = () => {
      if (container.querySelector("iframe, a, img, video") || container.children.length > 0) {
        setIsReady(true);
      }
    };
    const observer = new MutationObserver(revealRenderedAd);
    observer.observe(container, { childList: true, subtree: true });

    const invokeScript = document.createElement("script");
    invokeScript.async = true;
    invokeScript.dataset.cfasync = "false";
    invokeScript.src = nativeScriptUrl;
    invokeScript.addEventListener("load", revealRenderedAd);
    host.insertBefore(invokeScript, container);

    return () => {
      observer.disconnect();
      invokeScript.remove();
      container.replaceChildren();
    };
  }, [shouldLoad]);

  return (
    <aside
      ref={slotRef}
      className={`adsterra-slot adsterra-native-desktop${isReady ? " is-ready" : ""}`}
      aria-label={isReady ? "Advertisement" : undefined}
      aria-hidden={!isReady}
    >
      <div className="adsterra-slot-inner">
        {isReady ? <span className="adsterra-label">Advertisement</span> : null}
        <div ref={hostRef} className="adsterra-native-host">
          <div ref={containerRef} id={shouldLoad ? nativeContainerId : undefined} />
        </div>
      </div>
    </aside>
  );
}

export function AdsterraNativeAd() {
  const isDesktop = useDesktopViewport();

  if (!adsterraNativeDesktopEnabled) return null;
  if (isDesktop !== true) {
    return <aside className="adsterra-slot adsterra-native-desktop" aria-hidden />;
  }
  return <DesktopNativeAd />;
}
