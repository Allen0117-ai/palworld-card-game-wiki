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
        <p>The deck builder saves drafts only on your device. Privacy-friendly analytics helps us understand which guides are useful.</p>
      </header>
      <section className="privacy-highlight">
        <span aria-hidden="true">◆</span>
        <div><strong>Local-only deck saving</strong><p>Your saved deck list is not sent to us.</p></div>
      </section>
      <section className="info-card-grid" aria-label="Current privacy practices">
        <div><span>01</span><h2>No account</h2><p>No registration, profile or login is required.</p></div>
        <div><span>02</span><h2>No deck collection</h2><p>We do not collect the cards you add to a saved deck.</p></div>
        <div><span>03</span><h2>Your choice</h2><p>Where prior consent is required, analytics cookies stay off unless you allow them. You can opt out at any time.</p></div>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Analytics</span> · Region-aware privacy</p>
        <h2>What analytics may collect.</h2>
        <p>
          Vercel Web Analytics counts anonymous visits without cookies. Google Analytics uses
          region-aware consent settings: analytics storage may be enabled by default where prior
          consent is not required, while it stays disabled until permission is granted in regions
          that require opt-in consent. Microsoft Clarity stays in limited, cookieless mode until
          you allow analytics cookies.
        </p>
        <p>
          Analytics may measure pages viewed, visit length, general location, traffic source,
          device and browser information, plus masked heatmaps and session replays when permitted.
          Clarity uses strict masking, so page text and user-entered content are hidden from
          recordings. Advertising storage, Google Signals and ad personalization remain disabled.
          We use this information only to understand which guides are useful and where the site is
          difficult to use. We do not sell personal information. You can opt out or change your
          choice at any time through <strong>Privacy choices</strong> in the footer.
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
