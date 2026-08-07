import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { createEditorialAuthorJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "Learn how Palworld Card Game Wiki verifies official rules, card data, product information and clearly labels independent strategy guidance.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="simple-page simple-page-enhanced shell">
      <JsonLd data={{
        "@context": "https://schema.org",
        ...createEditorialAuthorJsonLd(),
        description: "The team that writes, checks and maintains Palworld Card Game Wiki using official rules, card lists and product sources.",
        parentOrganization: {
          "@type": "Organization",
          name: "Palworld Card Game Wiki",
          url: "https://palworldcardgame.wiki",
        },
      }} />
      <header className="simple-page-intro">
        <p className="eyebrow"><span>About</span> · Independent fan resource</p>
        <h1>About Palworld Card Game Wiki.</h1>
        <p>Palworld Card Game Wiki is an unofficial, non-commercial database, learning guide and deck-building companion. Use it to check card text, learn the rules and prepare a deck.</p>
      </header>
      <section className="info-card-grid" aria-label="What guides this site">
        <div><span>01</span><h2>Official facts first</h2><p>Rules, card data, errata and product pages decide factual claims.</p></div>
        <div><span>02</span><h2>Plain-English help</h2><p>Rules and product details are explained through the questions players actually ask.</p></div>
        <div><span>03</span><h2>Clear source labels</h2><p>Community ideas stay clearly separated from confirmed rules and results.</p></div>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Verification</span> · How we work</p>
        <h2>Useful answers, checked carefully.</h2>
        <p>Community discussion helps us discover questions and early deck ideas, but we do not present those ideas as confirmed rules or tournament results. Every launch guide shows its source status and update date.</p>
        <Link className="button ghost" href="/resources">Open our source hub</Link>
      </section>
      <section className="simple-page-panel" id="editorial-team">
        <p className="eyebrow"><span>Editorial team</span> · Named responsibility</p>
        <h2>Palpagos Archive Editorial Team</h2>
        <p>This independent fan project publishes under the Palpagos Archive Editorial Team name. Before publication, we check card text, rules, product details, dates and source labels. We do not claim tournament credentials or official affiliation.</p>
        <p>Practical recommendations are based on the live card database, deck-building constraints and worked examples. When a conclusion comes from community discussion or a limited opening sample, the page labels that limitation instead of presenting it as an official fact.</p>
      </section>
      <section className="simple-page-note" id="editorial-policy">
        <h2>Editorial and correction policy</h2>
        <ol>
          <li><strong>Primary sources first:</strong> official rules, Q&amp;A, card lists, product pages and announcements control factual claims.</li>
          <li><strong>Independent analysis is labeled:</strong> buying advice, deck suggestions and community observations are kept separate from confirmed facts.</li>
          <li><strong>Dates reflect real work:</strong> visible update dates change only when the page receives a meaningful factual or editorial revision.</li>
          <li><strong>Corrections stay transparent:</strong> confirmed errors are fixed promptly, and important changes are recorded in the page history.</li>
          <li><strong>No unsupported claims:</strong> prices, pull rates, tournament results and credentials are published only when a reliable source supports them.</li>
        </ol>
        <div className="article-actions">
          <Link className="button ghost" href="/resources">Review our sources</Link>
          <a className="button ghost" href="mailto:paweyan163@gmail.com">Report a factual error</a>
        </div>
      </section>
      <section className="simple-page-note">
        <h2>Independent and unofficial</h2>
        <p>Official card and promotional images are shown only to identify the cards, products and rules being discussed. ©Bushiroad ©PALWORLD.</p>
        <p>Palworld and all related names, characters and artwork belong to their respective owners. This site is not affiliated with, endorsed by or sponsored by Pocketpair, Inc. or Bushiroad.</p>
        <a className="text-link" href="mailto:paweyan163@gmail.com">Corrections or takedown request</a>
        <p><Link className="text-link" href="/terms">Read the site terms</Link> · <Link className="text-link" href="/ai-policy">AI and crawler policy</Link></p>
      </section>
    </article>
  );
}
