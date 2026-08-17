import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { AdsterraNativeAd } from "@/components/AdsterraNativeAd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { EditorialByline } from "@/components/EditorialByline";
import { JsonLd } from "@/components/JsonLd";
import {
  createBreadcrumbJsonLd,
  createEditorialAuthorJsonLd,
  createPageMetadata,
  createPublisherJsonLd,
  SITE_URL,
} from "@/lib/seo";
import { getPalworldBoosterSet } from "@/lib/sets";

const legendsAwaken = getPalworldBoosterSet("BP02");
const pagePath = "/sets/legends-awaken-bp02";
const pageTitle = "Palworld Legends Awaken BP02 – Release Date & Card List";
const pageDescription = "Track Palworld Legends Awaken BP02: October 30 release date, official preorder status, confirmed 100-card set, reveal checklist and card-list updates.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  absoluteTitle: true,
  type: "article",
});

export default function LegendsAwakenPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      datePublished: "2026-08-05",
      dateModified: "2026-08-17",
      author: createEditorialAuthorJsonLd(),
      publisher: createPublisherJsonLd(),
      mainEntityOfPage: `${SITE_URL}${pagePath}`,
      about: {
        "@type": "Thing",
        name: "Palworld Official Card Game Booster Pack Legends Awaken BP02",
      },
    },
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Sets", path: "/sets" },
      { name: "Legends Awaken BP02", path: pagePath },
    ]),
  ];

  return (
    <article className="article-shell">
      <JsonLd data={structuredData} />
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Sets", href: "/sets" },
        { name: "Legends Awaken BP02" },
      ]} />
      <p className="eyebrow"><span>Palworld TCG Set 2</span> · Release facts and reveals</p>
      <h1>Legends Awaken<br />BP02 card list.</h1>
      <p className="article-lede">Check the release date, confirmed set size and official reveal status for the second Palworld TCG booster set. The numbered card list will appear after Bushiroad publishes it.</p>

      <EditorialByline reviewed="August 17, 2026" sourceStatus="Official BP02 product page" />

      <div className="quick-answer">
        <strong>What is confirmed</strong>
        <p>Legends Awaken is Palworld TCG Set 2, officially numbered BP02 and scheduled for October 30, 2026. Local-store preorders are open. Bushiroad confirms 100 normal card types across RR, R, U and C, plus parallels in all five colors. The current official English page does not publish the full numbered card list, exact parallel count, box configuration or every new mechanic.</p>
        <a className="quick-answer-source" href={legendsAwaken.officialUrl} target="_blank" rel="noreferrer">Primary source: official Legends Awaken product page ↗</a>
      </div>

      <h2>Legends Awaken BP02 confirmed facts</h2>
      <div className="stat-table">
        <div><strong>BP02</strong><span>set code</span></div>
        <div><strong>Oct 30</strong><span>2026 release</span></div>
        <div><strong>100</strong><span>normal types</span></div>
        <div><strong>5</strong><span>featured colors</span></div>
        <div><strong>TBD</strong><span>parallel count</span></div>
      </div>
      <p>The product specification confirms the release date, 100 normal card types, RR, R, U and C base rarities, and Red, Blue, Green, Purple and Colorless cards. It confirms parallel cards but does not state their exact count. “TBD” here means not officially published—not zero.</p>

      <AdsterraBannerAd />

      <h2>Where can you preorder Legends Awaken BP02?</h2>
      <p>The official product page says preorders are available at local stores. Start with Bushiroad&apos;s retailer finder, then confirm the store&apos;s allocation, deposit, cancellation terms, language, sealed quantity and estimated delivery date. The publisher does not list one universal BP02 price or guarantee that every store will receive stock.</p>
      <div className="article-actions">
        <a className="button primary" href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Find an official retailer ↗</a>
        <Link className="button ghost" href="/blog/palworld-card-game-products-where-to-buy">Open the regional buying guide</Link>
      </div>

      <h2>BP02 reveal checklist</h2>
      <div className="comparison-table" role="region" aria-label="Legends Awaken BP02 reveal checklist" tabIndex={0}>
        <div className="comparison-head"><span>Detail</span><strong>Status</strong><strong>Current answer</strong></div>
        <div><span>Release date</span><p>Confirmed</p><p>October 30, 2026.</p></div>
        <div><span>Preorders</span><p>Confirmed</p><p>Available through local stores; allocation varies.</p></div>
        <div><span>Normal cards</span><p>Confirmed</p><p>100 types across RR, R, U and C.</p></div>
        <div><span>Featured colors</span><p>Confirmed</p><p>Red, Blue, Green, Purple and Colorless.</p></div>
        <div><span>Numbered card list</span><p>Pending</p><p>The complete official list is not published.</p></div>
        <div><span>Parallels and box contents</span><p>Pending</p><p>Exact parallel count and sealed configuration are not published.</p></div>
      </div>

      <h2>Is the complete BP02 card list available?</h2>
      <p>Bushiroad has not published a complete official English BP02 card list, so a numbered checklist is not yet available. Product artwork, store preorder images and social posts may show individual cards before the database is complete, but they do not prove the final card count by rarity, every card number or the full list of parallel treatments.</p>
      <div className="callout"><strong>Before using a reveal:</strong> match the card name, number and text to an official Bushiroad source. Retailer images, placeholders and fan translations can be incomplete or wrong.</div>

      <h2>BP01 vs BP02: what is known today?</h2>
      <div className="comparison-table" role="region" aria-label="Dawn of Palpagos and Legends Awaken comparison" tabIndex={0}>
        <div className="comparison-head"><span>Fact</span><strong>BP01 Dawn of Palpagos</strong><strong>BP02 Legends Awaken</strong></div>
        <div><span>Release</span><p>July 30, 2026</p><p>October 30, 2026</p></div>
        <div><span>Normal cards</span><p>100 types</p><p>100 types</p></div>
        <div><span>Parallels</span><p>61 types confirmed</p><p>Confirmed; exact count not published</p></div>
        <div><span>Card list</span><p>Complete searchable base list live</p><p>Complete list not published yet</p></div>
        <div><span>What you can check</span><p>Cards, decks and collection progress</p><p>Release facts and official reveal status</p></div>
      </div>

      <h2>How to follow Legends Awaken without mixing rumors with facts</h2>
      <ol>
        <li>Use the official BP02 product page for the release date and set specification.</li>
        <li>Use the official card list when Bushiroad adds BP02 as a searchable product.</li>
        <li>Treat retailer descriptions as purchasing information, not the final card database.</li>
        <li>Check the official card list for newly published card numbers and text.</li>
      </ol>
      <p>Use this BP02 page for set facts and card-list availability. For dated product launches and tournament milestones, check the <Link className="text-link" href="/blog/palworld-card-game-2026-roadmap">2026 Roadmap</Link>.</p>

      <h2>What can you do before the BP02 list arrives?</h2>
      <p>Players can learn the current card pool and rules without guessing at future strategies. Browse BP01 to understand the launch colors and card-number format, compare the two fixed Trial Decks, and save current lists in the deck builder. A real BP02 deck or tier list should wait for official card text and enough play data.</p>
      <div className="article-actions">
        <Link className="button primary" href="/sets">Browse every confirmed set</Link>
        <Link className="button ghost" href="/cards?set=EBP01">Explore the BP01 card list</Link>
        <Link className="button ghost" href="/decks">Compare current deck lists</Link>
        <Link className="button ghost" href="/tools/deck-builder">Open the deck builder</Link>
      </div>

      <ContentFreshnessPanel
        updated="August 17, 2026"
        verified="August 17, 2026"
        sourceStatus="Official BP02 product page"
        summary="Tracks the BP02 release, confirmed set size, reveal status and future official card-list availability."
        changeSummary="The official product page still confirms October 30, 100 normal card types and five colors; the numbered card list and exact parallel count remain pending."
        published="August 5, 2026"
        history={[
          { date: "2026-08-07", note: "Added preorder status, featured colors and pending reveal fields." },
          { date: "2026-08-17", note: "Rechecked the official product page and pending card-list fields." },
        ]}
      />

      <AdsterraNativeAd />
      <section className="source-panel">
        <p className="eyebrow">Official sources</p>
        <h2>Official BP02 sources</h2>
        <p>The product and card-list pages below publish the release details and future numbered cards.</p>
        <div>
          <a href={legendsAwaken.officialUrl} target="_blank" rel="noreferrer">Official Legends Awaken product page ↗</a>
          <a href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Official Bushiroad retailer finder ↗</a>
          <a href="https://en.palworld-official-cardgame.com/products" target="_blank" rel="noreferrer">Official product index ↗</a>
          <a href="https://en.palworld-official-cardgame.com/cardlist" target="_blank" rel="noreferrer">Official card list ↗</a>
        </div>
      </section>
    </article>
  );
}
