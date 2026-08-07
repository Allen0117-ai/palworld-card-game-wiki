import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Terms for using the independent Palworld Card Game Wiki, including accuracy, copyright, tools, external links and contact information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="simple-page simple-page-enhanced shell">
      <header className="simple-page-intro">
        <p className="eyebrow"><span>Terms of use</span> · Effective August 7, 2026</p>
        <h1>Terms for using this site.</h1>
        <p>Palworld Card Game Wiki is an independent fan resource. By using the site, you agree to use its guides and tools responsibly and to verify important tournament, purchasing and rules decisions with current official sources.</p>
      </header>

      <section className="simple-page-panel">
        <h2>Information and accuracy</h2>
        <p>We work to keep card text, rules, product details and dates accurate, but official material can change. The latest official rules, Q&amp;A, card database and event documents take priority over this site. Nothing here is legal, financial or investment advice.</p>
      </section>

      <section className="simple-page-note">
        <h2>Deck and collection tools</h2>
        <p>The deck builder, checklist and saved progress are provided as convenience tools without a guarantee that a list is tournament legal in every event. Drafts and checklist progress are stored locally on your device unless a page clearly says otherwise.</p>

        <h2>Copyright and trademarks</h2>
        <p>Palworld names, characters, official card images and promotional artwork belong to their respective owners. They are displayed for identification, education and product discussion. Original explanations, organization and site code remain protected by their applicable rights.</p>

        <h2>External links</h2>
        <p>External stores, communities, videos and databases are operated by third parties. A link does not guarantee availability, price, accuracy, safety or endorsement. Check the destination and seller before sharing information or making a purchase.</p>

        <h2>Advertising</h2>
        <p>The site may use third-party advertising to support hosting and maintenance. Ads are separate from editorial content and do not imply that this site endorses an advertiser, product or offer. Pages with paid or affiliate relationships will identify them clearly.</p>

        <h2>Changes and contact</h2>
        <p>These terms may change when the site or its tools change. Material revisions will update the effective date on this page.</p>
        <div className="article-actions">
          <Link className="button ghost" href="/about#editorial-policy">Editorial policy</Link>
          <Link className="button ghost" href="/privacy">Privacy policy</Link>
          <a className="button ghost" href="mailto:paweyan163@gmail.com">Contact</a>
        </div>
      </section>
    </article>
  );
}
