import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Inter, Oxanium } from "next/font/google";
import Script from "next/script";
import { InteractionEffects } from "@/components/InteractionEffects";
import { LocalizedSiteFooter, LocalizedSiteHeader, LocalizedSkipLink } from "@/components/LocalizedSiteChrome";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import "./globals.css";

const inter = Inter({ variable: "--font-body", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800", "900"] });
const oxanium = Oxanium({ variable: "--font-ui", subsets: ["latin"], weight: ["600", "700", "800"] });
const analyticsConfigured = Boolean(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
);

export const metadata: Metadata = {
  metadataBase: new URL("https://palworldcardgame.wiki"),
  title: { default: "Palworld Card Game Guide – Rules, Cards, Decks & Builder", template: "%s | Palworld Card Game Wiki" },
  description: "Get clear Palworld Card Game rules, all 148 launch main-deck cards, Trial Deck guides, product answers and a free deck builder.",
  openGraph: {
    title: "Palworld Card Game Wiki",
    description: "Clear launch-day rules, cards, Trial Deck help and tools for the Palworld Official Card Game.",
    type: "website",
    images: [{ url: "https://palworldcardgame.wiki/og.png", width: 1200, height: 630, alt: "Palworld Card Game Wiki — cards, decks and deck builder" }],
  },
  twitter: { card: "summary_large_image", images: ["https://palworldcardgame.wiki/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script id="localized-document-language" strategy="beforeInteractive">
          {`document.documentElement.lang = window.location.pathname === '/ja' || window.location.pathname.startsWith('/ja/') ? 'ja' : 'en';`}
        </Script>
        {analyticsConfigured ? (
          <Script id="analytics-consent-defaults" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_personalization: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              gtag('set', 'allow_google_signals', false);
              gtag('set', 'allow_ad_personalization_signals', false);
              window.clarity = window.clarity || function () {
                (window.clarity.q = window.clarity.q || []).push(arguments);
              };
              window.clarity('consentv2', {
                ad_Storage: 'denied',
                analytics_Storage: 'denied'
              });
            `}
          </Script>
        ) : null}
      </head>
      <body className={`${inter.variable} ${cinzel.variable} ${oxanium.variable}`}>
        <LocalizedSkipLink />
        <InteractionEffects />
        <ScrollReveal />
        <LocalizedSiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <LocalizedSiteFooter />
        <Analytics />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
