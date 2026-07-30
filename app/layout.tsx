import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ variable: "--font-body", subsets: ["latin"] });
const barlow = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://palworldcardgame.wiki"),
  title: { default: "Palworld TCG Card Database – Cards, Decks & Prices", template: "%s | Palworld Card Game Wiki" },
  description: "Complete database of Palworld Trading Card Game cards. Browse card stats, deck lists, pull rates, and prices.",
  openGraph: {
    title: "Palworld Card Game Wiki",
    description: "Cards, decks, tools and launch-meta guides for the Palworld Official Card Game.",
    type: "website",
    images: [{ url: "https://palworldcardgame.wiki/og.png", width: 1200, height: 630, alt: "Palworld Card Game Wiki — cards, decks and deck builder" }],
  },
  twitter: { card: "summary_large_image", images: ["https://palworldcardgame.wiki/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable}`}>
        <header className="site-header">
          <div className="shell nav-wrap">
            <Link className="brand" href="/" aria-label="Palworld Card Game Wiki home">
              <span className="brand-block">P</span>
              <span>PWCG<small>//WIKI</small></span>
            </Link>
            <nav aria-label="Main navigation">
              <Link href="/cards">Cards</Link>
              <Link href="/decks">Decks</Link>
              <Link href="/tools/deck-builder">Deck Builder</Link>
              <Link href="/blog">Guides</Link>
            </nav>
            <Link className="nav-cta" href="/tools/deck-builder">Build a deck <span>↗</span></Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <Link className="brand footer-brand" href="/">
                <span className="brand-block">P</span>
                <span>PWCG<small>//WIKI</small></span>
              </Link>
              <p>An independent card database and strategy companion built for players.</p>
            </div>
            <div>
              <strong>Explore</strong>
              <Link href="/cards">Card database</Link>
              <Link href="/decks">Meta decks</Link>
              <Link href="/tools/deck-builder">Deck builder</Link>
              <Link href="/blog">Guides</Link>
            </div>
            <div>
              <strong>Site</strong>
              <Link href="/about">About & disclaimer</Link>
              <Link href="/privacy">Privacy</Link>
              <a href="mailto:hello@palworldcardgame.wiki">Contact</a>
            </div>
          </div>
          <div className="shell legal">
            <span>© 2026 Palworld Card Game Wiki</span>
            <span>Fan-made. Not affiliated with Pocketpair or Bushiroad.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
