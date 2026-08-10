import Link from "next/link";
import type { Metadata } from "next";
import { AdPrivacyChoicesButton } from "@/components/AdPrivacyChoicesButton";
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
        <p className="eyebrow"><span>Privacy</span> · Updated August 10, 2026</p>
        <h1>Your data stays yours.</h1>
        <p>The deck builder saves drafts only on your device. Analytics helps us improve the site, and advertising partners may use cookies or similar identifiers when ads are enabled.</p>
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
      <section className="simple-page-panel" id="advertising" tabIndex={-1}>
        <p className="eyebrow"><span>Advertising</span> · Google AdSense and Adsterra</p>
        <h2>How advertising data may be used.</h2>
        <p>
          This site uses Google AdSense and may use Adsterra to serve and measure advertising. Third parties, including
          Google, Adsterra and their advertising partners, may place or read cookies in your browser, or use web beacons, IP addresses and
          other device identifiers, as a result of ads being served on this site. Those technologies
          may be used to select, deliver, limit and measure ads,
          prevent fraud and understand advertising performance.
        </p>
        <p>
          Google processes information from sites that use its services under its own policies. Read
          <a className="text-link" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer"> how Google uses information from partner sites and apps ↗</a>.
          We do not send saved deck lists, checklist progress, email addresses or other directly
          identifying information to Google or Adsterra in ad requests.
        </p>
        <p>
          Adsterra code may load directly on content pages when its placements are enabled. Your
          analytics-cookie choice does not control Adsterra advertising, and Adsterra does not
          provide this site with a non-personalized mode. Read <a className="text-link" href="https://adsterra.com/privacy-policy-managed" target="_blank" rel="noreferrer">Adsterra&apos;s privacy policy ↗</a>.
        </p>
        <p>
          Where regional law requires it, eligible visitors receive a Google-certified consent or
          opt-out message for advertising choices. Personalized ads are not requested when the
          required consent signal is unavailable. You can change an available Google advertising
          choice below, and you can also manage ad personalization in
          <a className="text-link" href="https://myadcenter.google.com/" target="_blank" rel="noreferrer"> My Ad Center ↗</a>.
        </p>
        <div className="article-actions">
          <AdPrivacyChoicesButton className="button ghost" />
        </div>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Advertising safeguards</span> · Limited use</p>
        <h2>What we do not use for ad targeting.</h2>
        <p>
          The site is not directed to children under 13 and does not create child profiles. We do
          not build advertising audiences from sensitive information, precise location, saved decks,
          card collection progress, health, financial, political, religious or sexual information.
          We do not sell personal information.
        </p>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Your control</span> · Stored in this browser</p>
        <h2>Remove a draft whenever you want.</h2>
        <p>Use the deck builder&apos;s clear option, or clear this site&apos;s browser storage in your browser settings.</p>
        <Link className="button primary" href="/tools/deck-builder">Open deck builder</Link>
      </section>
      <section className="simple-page-note">
        <h2>Questions and updates</h2>
        <p>We update this policy when the site changes how it collects, uses or shares information. Privacy and advertising questions can be sent to <a className="text-link" href="mailto:paweyan163@gmail.com">paweyan163@gmail.com</a>.</p>
      </section>
    </article>
  );
}
