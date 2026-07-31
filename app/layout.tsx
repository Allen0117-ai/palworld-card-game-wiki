import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Inter, Oxanium } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { InteractionEffects } from "@/components/InteractionEffects";
import { MobileNav } from "@/components/MobileNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnalyticsConsent, PrivacyChoicesButton } from "@/components/AnalyticsConsent";
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
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <InteractionEffects />
        <ScrollReveal />
        <header className="site-header">
          <div className="shell nav-wrap">
            <Link className="brand" href="/" aria-label="Palworld Card Game Wiki home">
              <span className="brand-mark">◆</span>
              <span className="brand-copy">Palpagos Archive<small>Palworld Card Game Wiki</small></span>
            </Link>
            <nav className="desktop-nav" aria-label="Main navigation">
              <Link href="/rules">Rules</Link>
              <Link href="/cards">Cards</Link>
              <Link href="/decks">Decks</Link>
              <Link href="/blog">Guides</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/search">Search</Link>
            </nav>
            <Link className="nav-cta" href="/tools/deck-builder">Build a deck <span>◆</span></Link>
            <MobileNav />
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <Link className="brand footer-brand" href="/">
                <span className="brand-mark">◆</span>
                <span className="brand-copy">Palpagos Archive<small>Palworld Card Game Wiki</small></span>
              </Link>
              <p>An unofficial, non-commercial card database and strategy companion built by fans, for players.</p>
            </div>
            <div>
              <strong>Explore</strong>
              <Link href="/cards">Card database</Link>
              <Link href="/decks">Trial Deck guides</Link>
              <Link href="/tools/deck-builder">Deck builder</Link>
              <Link href="/tools/dawn-of-palpagos-checklist">BP01 checklist</Link>
              <Link href="/rules">Rules &amp; FAQ</Link>
              <Link href="/blog">Guides</Link>
              <Link href="/resources">Source hub</Link>
            </div>
            <div>
              <strong>Site</strong>
              <Link href="/about">About & disclaimer</Link>
              <Link href="/privacy">Privacy</Link>
              <PrivacyChoicesButton />
              <a href="mailto:paweyan163@gmail.com">Contact</a>
            </div>
          </div>
          <div className="shell legal">
            <span>© 2026 Palworld Card Game Wiki · ©Bushiroad ©PALWORLD</span>
            <span>Unofficial fan site. Not affiliated with or endorsed by Pocketpair or Bushiroad.</span>
          </div>
        </footer>
        <Analytics />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
