import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: "Read how Palworld Card Game Wiki handles local deck drafts, accounts, analytics and user data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="simple-page simple-page-enhanced shell">
      <header className="simple-page-intro">
        <p className="eyebrow"><span>Privacy</span> · Plain-language summary</p>
        <h1>Your data stays yours.</h1>
        <p>The deck builder saves drafts only on your device. Limited cookieless analytics helps us count visits by default.</p>
      </header>
      <section className="privacy-highlight">
        <span aria-hidden="true">◆</span>
        <div><strong>Local-only deck saving</strong><p>Your saved deck list is not sent to us.</p></div>
      </section>
      <section className="info-card-grid" aria-label="Current privacy practices">
        <div><span>01</span><h2>No account</h2><p>No registration, profile or login is required.</p></div>
        <div><span>02</span><h2>No deck collection</h2><p>We do not collect the cards you add to a saved deck.</p></div>
        <div><span>03</span><h2>Your choice</h2><p>Analytics cookies stay off unless you allow them.</p></div>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Analytics</span> · Cookieless by default</p>
        <h2>What analytics may collect.</h2>
        <p>
          Google Analytics and Microsoft Clarity load in limited, cookieless mode by default. This
          can count page views but cannot reliably connect pages into one visit or recognize a
          returning visitor. If you allow analytics cookies, they can measure pages viewed, visit
          length, general location, traffic source, device and browser information, plus connected
          heatmaps and session replays.
        </p>
        <p>
          Clarity uses strict masking, so page text and user-entered content are hidden from
          recordings. Advertising storage and personalization remain disabled.
          We use this information only to understand which guides are useful and where the site is
          difficult to use. We do not sell personal information. You can change your choice at any
          time through <strong>Privacy choices</strong> in the footer.
        </p>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Your control</span> · Stored in this browser</p>
        <h2>Remove a draft whenever you want.</h2>
        <p>Use the deck builder&apos;s clear option, or clear this site&apos;s browser storage in your browser settings.</p>
        <Link className="button primary" href="/tools/deck-builder">Open deck builder</Link>
      </section>
    </article>
  );
}
