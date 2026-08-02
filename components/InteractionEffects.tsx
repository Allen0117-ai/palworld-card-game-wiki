"use client";

import { useEffect, useRef } from "react";
import { trackUserAction } from "@/lib/user-action-analytics";

const SPARK_COUNT = 6;

function resetTilt(element: HTMLElement | null) {
  if (!element) return;
  element.style.setProperty("--tilt-x", "0deg");
  element.style.setProperty("--tilt-y", "0deg");
}

export function InteractionEffects() {
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const sparkLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function trackMarkedClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;
      const eventName = target?.dataset.analyticsEvent;
      if (!eventName) return;

      trackUserAction(eventName, {
        label: target.dataset.analyticsLabel || target.textContent?.trim().slice(0, 80) || "unknown",
        path: window.location.pathname,
      });
    }

    document.addEventListener("click", trackMarkedClick);
    return () => document.removeEventListener("click", trackMarkedClick);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const cursorAura = cursorAuraRef.current;
    const sparkLayer = sparkLayerRef.current;
    if (!cursorAura || !sparkLayer) return;
    const activeCursorAura = cursorAura;
    const activeSparkLayer = sparkLayer;

    document.documentElement.classList.add("pointer-effects-ready");
    let activeTilt: HTMLElement | null = null;

    function movePointer(event: PointerEvent) {
      activeCursorAura.style.setProperty("--pointer-x", `${event.clientX}px`);
      activeCursorAura.style.setProperty("--pointer-y", `${event.clientY}px`);
      activeCursorAura.classList.add("is-visible");

      const eventTarget = event.target;
      const interactiveTarget = eventTarget instanceof Element
        ? eventTarget.closest("a, button, input, select, [data-tilt]")
        : null;
      activeCursorAura.classList.toggle("is-interactive", Boolean(interactiveTarget));

      const tiltTarget = eventTarget instanceof Element
        ? eventTarget.closest<HTMLElement>("[data-tilt]")
        : null;
      if (activeTilt !== tiltTarget) {
        resetTilt(activeTilt);
        activeTilt = tiltTarget;
      }
      if (!tiltTarget) return;

      const bounds = tiltTarget.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;
      tiltTarget.style.setProperty("--tilt-x", `${(0.5 - relativeY) * 7}deg`);
      tiltTarget.style.setProperty("--tilt-y", `${(relativeX - 0.5) * 9}deg`);
      tiltTarget.style.setProperty("--shine-x", `${relativeX * 100}%`);
      tiltTarget.style.setProperty("--shine-y", `${relativeY * 100}%`);
    }

    function hidePointer() {
      activeCursorAura.classList.remove("is-visible", "is-interactive");
      resetTilt(activeTilt);
      activeTilt = null;
    }

    function createClickSparks(event: PointerEvent) {
      if (event.button !== 0) return;

      for (let index = 0; index < SPARK_COUNT; index += 1) {
        const spark = document.createElement("span");
        const angle = (360 / SPARK_COUNT) * index + 30;
        const distance = index % 2 === 0 ? 30 : 23;
        spark.className = "cursor-spark";
        spark.style.left = `${event.clientX}px`;
        spark.style.top = `${event.clientY}px`;
        spark.style.setProperty("--spark-x", `${Math.cos(angle * Math.PI / 180) * distance}px`);
        spark.style.setProperty("--spark-y", `${Math.sin(angle * Math.PI / 180) * distance}px`);
        spark.style.setProperty("--spark-rotation", `${angle + 45}deg`);
        activeSparkLayer.appendChild(spark);
        spark.addEventListener("animationend", () => spark.remove(), { once: true });
      }
    }

    window.addEventListener("pointermove", movePointer, { passive: true });
    window.addEventListener("pointerdown", createClickSparks, { passive: true });
    document.documentElement.addEventListener("mouseleave", hidePointer);
    window.addEventListener("blur", hidePointer);

    return () => {
      document.documentElement.classList.remove("pointer-effects-ready");
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerdown", createClickSparks);
      document.documentElement.removeEventListener("mouseleave", hidePointer);
      window.removeEventListener("blur", hidePointer);
      resetTilt(activeTilt);
    };
  }, []);

  return (
    <>
      <div ref={cursorAuraRef} className="cursor-aura" aria-hidden="true" />
      <div ref={sparkLayerRef} className="cursor-spark-layer" aria-hidden="true" />
    </>
  );
}
