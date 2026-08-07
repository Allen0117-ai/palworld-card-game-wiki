import type { Metadata } from "next";
import Script from "next/script";
import { SiteDocument } from "@/components/SiteDocument";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";
import { ANALYTICS_CONFIGURED, ANALYTICS_CONSENT_DEFAULTS_SCRIPT } from "@/lib/analytics-consent-defaults";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://palworldcardgame.wiki"),
  title: {
    default: "Palworld Card Game Guide – Rules, Cards, Decks & Builder",
    template: "%s | Palworld Wiki",
  },
  description:
    "Learn Palworld Card Game rules, browse all 148 launch cards, compare Trial Decks and products, track BP01, find events, and build a legal deck for free.",
  openGraph: {
    title: "Palworld Card Game Wiki",
    description:
      "Clear launch-day rules, cards, Trial Deck help and tools for the Palworld Official Card Game.",
    type: "website",
    images: [
      {
        url: "https://palworldcardgame.wiki/og.png",
        width: 1200,
        height: 630,
        alt: "Palworld Card Game Wiki — cards, decks and deck builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://palworldcardgame.wiki/og.png"],
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteDocument
      language="en"
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
