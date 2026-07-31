"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

const CONSENT_STORAGE_KEY = "palpagos-analytics-consent";
const CONSENT_CHANGED_EVENT = "palpagos:analytics-consent-changed";
const OPEN_PRIVACY_CHOICES_EVENT = "palpagos:open-privacy-choices";
const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const TRACKING_IS_CONFIGURED = Boolean(GOOGLE_ANALYTICS_ID && CLARITY_PROJECT_ID);

type AnalyticsConsentChoice = "accepted" | "declined";
type ConsentSnapshot = AnalyticsConsentChoice | "loading" | null;

declare global {
  interface Window {
    clarity?: ((command: string, ...args: unknown[]) => void) & {
      q?: unknown[][];
    };
    gtag?: (...args: unknown[]) => void;
  }
}

function clearAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name && (/^_ga/.test(name) || /^_cl/.test(name))));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
  }
}

function updateAnalyticsConsent(isAccepted: boolean) {
  const analyticsStorage = isAccepted ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: analyticsStorage,
  });
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: analyticsStorage,
  });
}

function revokeAnalyticsConsent() {
  updateAnalyticsConsent(false);
  window.clarity?.("consent", false);
  clearAnalyticsCookies();
}

function readConsentSnapshot(): ConsentSnapshot {
  const savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return savedConsent === "accepted" || savedConsent === "declined" ? savedConsent : null;
}

function subscribeToConsent(onConsentChange: () => void) {
  window.addEventListener("storage", onConsentChange);
  window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
  return () => {
    window.removeEventListener("storage", onConsentChange);
    window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
  };
}

export function PrivacyChoicesButton() {
  return (
    <button
      className="footer-privacy-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_CHOICES_EVENT))}
    >
      Privacy choices
    </button>
  );
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsentSnapshot,
    (): ConsentSnapshot => "loading",
  );
  const [privacyChoicesOpen, setPrivacyChoicesOpen] = useState(false);

  useEffect(() => {
    if (!TRACKING_IS_CONFIGURED) {
      return;
    }

    const openPrivacyChoices = () => setPrivacyChoicesOpen(true);
    window.addEventListener(OPEN_PRIVACY_CHOICES_EVENT, openPrivacyChoices);
    return () => window.removeEventListener(OPEN_PRIVACY_CHOICES_EVENT, openPrivacyChoices);
  }, []);

  useEffect(() => {
    if (!TRACKING_IS_CONFIGURED || consent === "loading") {
      return;
    }

    updateAnalyticsConsent(consent === "accepted");
  }, [consent]);

  if (!TRACKING_IS_CONFIGURED || consent === "loading") {
    return null;
  }

  const saveConsent = (choice: AnalyticsConsentChoice) => {
    const isRevokingConsent = consent === "accepted" && choice === "declined";
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    setPrivacyChoicesOpen(false);

    if (isRevokingConsent) {
      revokeAnalyticsConsent();
      window.location.reload();
    }
  };

  const closeBanner = () => {
    if (consent === null) {
      saveConsent("declined");
      return;
    }
    setPrivacyChoicesOpen(false);
  };

  return (
    <>
      {GOOGLE_ANALYTICS_ID ? <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} /> : null}

      {CLARITY_PROJECT_ID ? (
        <Script
          id="clarity-tracker"
          src={`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`}
          strategy="afterInteractive"
        />
      ) : null}

      {consent === null || privacyChoicesOpen ? (
        <aside className="privacy-banner" aria-label="Analytics privacy choices">
          <span className="privacy-banner-mark" aria-hidden="true">◆</span>
          <div className="privacy-banner-copy">
            <strong>Help improve the archive</strong>
            <p>
              Cookieless analytics is on. Allow analytics cookies for complete visits and
              connected masked replays.{" "}<a href="/privacy">Privacy details</a>
            </p>
          </div>
          <div className="privacy-banner-actions">
            <button type="button" className="privacy-allow" onClick={() => saveConsent("accepted")}>
              Allow analytics
            </button>
            <button type="button" className="privacy-decline" onClick={() => saveConsent("declined")}>
              No cookies
            </button>
          </div>
          <button
            className="privacy-banner-close"
            type="button"
            aria-label="Close privacy notice"
            onClick={closeBanner}
          >
            ×
          </button>
        </aside>
      ) : null}
    </>
  );
}
