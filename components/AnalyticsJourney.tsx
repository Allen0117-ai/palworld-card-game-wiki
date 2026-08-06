"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  ANALYTICS_CONSENT_CHANGED_EVENT,
  ANALYTICS_CONSENT_STORAGE_KEY,
} from "@/lib/analytics-consent";
import { trackUserAction } from "@/lib/user-action-analytics";

const RETURN_VISIT_STORAGE_KEY = "palpagos-return-visit-v1";

type ReturnVisitState = {
  firstVisitDate: string;
  lastVisitDate: string;
  visitDays: number;
};

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(firstDate: string, lastDate: string) {
  const firstTimestamp = Date.parse(`${firstDate}T00:00:00Z`);
  const lastTimestamp = Date.parse(`${lastDate}T00:00:00Z`);
  if (!Number.isFinite(firstTimestamp) || !Number.isFinite(lastTimestamp)) return 0;
  return Math.max(0, Math.round((lastTimestamp - firstTimestamp) / 86_400_000));
}

function readReturnVisitState(value: string | null): ReturnVisitState | null {
  if (!value) return null;

  const parsedState: unknown = JSON.parse(value);
  if (!parsedState || typeof parsedState !== "object") return null;

  const candidate = parsedState as Partial<ReturnVisitState>;
  if (
    typeof candidate.firstVisitDate !== "string"
    || typeof candidate.lastVisitDate !== "string"
    || typeof candidate.visitDays !== "number"
  ) return null;

  return {
    firstVisitDate: candidate.firstVisitDate,
    lastVisitDate: candidate.lastVisitDate,
    visitDays: candidate.visitDays,
  };
}

function trackConsentedReturnVisit() {
  try {
    if (window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) !== "accepted") return;

    const today = dateKey();
    const savedState = readReturnVisitState(window.localStorage.getItem(RETURN_VISIT_STORAGE_KEY));
    if (!savedState) {
      window.localStorage.setItem(RETURN_VISIT_STORAGE_KEY, JSON.stringify({
        firstVisitDate: today,
        lastVisitDate: today,
        visitDays: 1,
      } satisfies ReturnVisitState));
      trackUserAction("retention_eligible", { visitDays: 1 });
      return;
    }
    if (savedState.lastVisitDate === today) return;

    const nextState: ReturnVisitState = {
      ...savedState,
      lastVisitDate: today,
      visitDays: savedState.visitDays + 1,
    };
    window.localStorage.setItem(RETURN_VISIT_STORAGE_KEY, JSON.stringify(nextState));
    trackUserAction("return_visit", {
      daysSinceFirstVisit: daysBetween(savedState.firstVisitDate, today),
      visitDays: nextState.visitDays,
    });
  } catch (error) {
    console.warn("Return visit analytics is unavailable.", error);
  }
}

export function AnalyticsJourney() {
  const pathname = usePathname();
  const landingPathRef = useRef(pathname);
  const hasStartedRef = useRef(false);
  const hasTrackedSecondPageRef = useRef(false);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackUserAction("journey_start", { path: pathname });
      trackConsentedReturnVisit();
      return;
    }
    if (hasTrackedSecondPageRef.current || pathname === landingPathRef.current) return;

    hasTrackedSecondPageRef.current = true;
    trackUserAction("journey_second_page", {
      from: landingPathRef.current,
      to: pathname,
    });
  }, [pathname]);

  useEffect(() => {
    window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, trackConsentedReturnVisit);
    return () => window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, trackConsentedReturnVisit);
  }, []);

  return null;
}
