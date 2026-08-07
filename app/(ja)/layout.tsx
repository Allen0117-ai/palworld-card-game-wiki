import type { Metadata } from "next";
import Script from "next/script";
import { SiteDocument } from "@/components/SiteDocument";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";
import { ANALYTICS_CONFIGURED, ANALYTICS_CONSENT_DEFAULTS_SCRIPT } from "@/lib/analytics-consent-defaults";
import { JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://palworldcardgame.wiki"),
  title: {
    default: "パルワールドカードゲーム攻略",
    template: "%s | Palworld Wiki",
  },
  description:
    "パルワールド オフィシャルカードゲームのカードリスト、公式Q&A、デッキレシピ、初心者向け攻略。",
  openGraph: {
    title: "パルワールドカードゲーム攻略",
    description:
      "日本語カードリスト、公式Q&A、デッキレシピ、デッキビルダー。",
    type: "website",
    locale: "ja_JP",
    images: [JAPANESE_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [JAPANESE_SOCIAL_IMAGE],
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
};

export default function JapaneseRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteDocument
      language="ja"
      beforeInteractiveScripts={
        <>
          {ANALYTICS_CONFIGURED ? (
            <Script id="analytics-consent-defaults" strategy="beforeInteractive">
              {ANALYTICS_CONSENT_DEFAULTS_SCRIPT}
            </Script>
          ) : null}
        </>
      }
    >
      {children}
    </SiteDocument>
  );
}
