"use client";

declare global {
  interface Window {
    googlefc?: {
      callbackQueue?: Array<() => void>;
      showRevocationMessage?: () => void;
    };
  }
}

export function AdPrivacyChoicesButton({
  locale = "en",
  className = "footer-privacy-button",
}: {
  locale?: "en" | "ja";
  className?: string;
}) {
  const openAdPrivacyChoices = () => {
    const googleConsent = window.googlefc;
    if (typeof googleConsent?.showRevocationMessage === "function") {
      googleConsent.callbackQueue ??= [];
      googleConsent.callbackQueue.push(googleConsent.showRevocationMessage);
      return;
    }

    if (window.location.pathname === "/privacy") {
      window.open("https://myadcenter.google.com/", "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign("/privacy#advertising");
  };

  return (
    <button className={className} type="button" onClick={openAdPrivacyChoices}>
      {locale === "ja" ? "プライバシーと Cookie の設定" : "Privacy and cookie settings"}
    </button>
  );
}
