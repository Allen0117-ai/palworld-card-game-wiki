import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { AdsterraNativeAd } from "@/components/AdsterraNativeAd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { EditorialByline } from "@/components/EditorialByline";
import { JsonLd } from "@/components/JsonLd";
import { promoCardSeries } from "@/lib/promos";
import {
  createBreadcrumbJsonLd,
  createEditorialAuthorJsonLd,
  createPageMetadata,
  createPublisherJsonLd,
  SITE_URL,
} from "@/lib/seo";

const pagePath = "/cards/promos";
const pageTitle = "Palworld TCG Promo Cards List – PR Packs & Events";
const pageDescription = "Browse the verified Palworld TCG promo card list, including PR Card Pack Vol.1, Vol.1.5, Soul promos, event distribution and legality warnings.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  absoluteTitle: true,
});

export default function PromoCardsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${pagePath}`,
      datePublished: "2026-08-05",
      dateModified: "2026-08-05",
      author: createEditorialAuthorJsonLd(),
      publisher: createPublisherJsonLd(),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: promoCardSeries.reduce((total, series) => total + series.cardCount, 0),
        itemListElement: promoCardSeries.flatMap((series) => series.cardNumbers).map((cardNumber, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: cardNumber,
        })),
      },
    },
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Cards", path: "/cards" },
      { name: "Promo cards", path: pagePath },
    ]),
  ];

  return (
    <article className="article-shell">
      <JsonLd data={structuredData} />
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Cards", href: "/cards" },
        { name: "Promo cards" },
      ]} />
      <p className="eyebrow"><span>Official event card index</span> · Current list</p>
      <h1>Palworld TCG<br />promo cards list.</h1>
      <p className="article-lede">Check confirmed PR packs, Soul promos and event rewards, including exact card numbers when the official English event pages publish them.</p>

      <div className="article-trust">
        <span>Updated August 5, 2026</span>
        <strong>Official event sources</strong>
        <span>PR Vol.1 and Vol.1.5 card numbers</span>
      </div>
      <EditorialByline reviewed="August 5, 2026" sourceStatus="Official events and prize pages" />

      <div className="quick-answer">
        <strong>Which promos are confirmed?</strong>
        <p>The official English event pages currently identify two numbered PR series: PR Card Pack Vol.1 contains nine possible cards—EPR-002 through EPR-009 plus ESOUL-008—and PR Card Pack Vol.1.5 contains eight “S” cards, EPR-002S through EPR-009S. Bushiroad also confirms a limited-edition Foiled Chillet Soul Promo Card from qualifying demo sessions and three Entry Soul cards at selected release tournaments. Exact availability depends on the event, date, result and remaining prize stock. Prototype demo decks are separate teaching products and are explicitly not tournament legal.</p>
        <a className="quick-answer-source" href="https://en.palworld-official-cardgame.com/events/shop-tournaments" target="_blank" rel="noreferrer">Primary source: official shop-tournament prizes ↗</a>
      </div>

      <ContentFreshnessPanel
        updated="August 5, 2026"
        verified="August 5, 2026"
        sourceStatus="Official events, demo and tournament pages"
        summary="Tracks published PR card numbers, confirmed Soul promos, event distribution and prototype-deck legality."
        changeSummary="Added PR Vol.1, PR Vol.1.5, demo rewards, release-event rewards and their distribution conditions."
        published="August 5, 2026"
      />
      <AdsterraBannerAd />

      <h2>Palworld TCG promo cards at a glance</h2>
      <div className="stat-table">
        <div><strong>9</strong><span>PR Vol.1 cards</span></div>
        <div><strong>8</strong><span>PR Vol.1.5 cards</span></div>
        <div><strong>1</strong><span>named demo Soul</span></div>
        <div><strong>3</strong><span>Entry Souls shown</span></div>
        <div><strong>0</strong><span>prototype legality</span></div>
      </div>
      <p>The numbered checklist below covers the 17 card numbers visible in the official shop-tournament prize page. Other confirmed event rewards remain listed by the official name used on their source page until a reliable card number is published there.</p>

      <h2>PR Card Pack Vol.1 checklist</h2>
      <p>Each Vol.1 pack contains one randomly selected card from a nine-card series. Participation at an eligible shop tournament or selected release event awards one card, not the complete nine-card set.</p>
      <dl className="glossary-list">
        <div><dt>Main Deck</dt><dd>{promoCardSeries[0].cardNumbers.slice(0, 8).join(" · ")}</dd></div>
        <div><dt>Soul card</dt><dd>ESOUL-008</dd></div>
        <div><dt>Distribution</dt><dd>{promoCardSeries[0].distribution}</dd></div>
      </dl>
      <div className="callout"><strong>Random pack:</strong> the official page says one of nine card types. Attending once does not guarantee a specific EPR number or a complete set.</div>

      <h2>PR Card Pack Vol.1.5 checklist</h2>
      <p>Vol.1.5 is an eight-card “S” series used for higher-finish or special distribution. The September shop-tournament page awards one pack to the champion and one additional pack through a store-selected method. The Los Angeles Release Party lists one pack for players finishing with more than three wins.</p>
      <dl className="glossary-list">
        <div><dt>Card numbers</dt><dd>{promoCardSeries[1].cardNumbers.join(" · ")}</dd></div>
        <div><dt>Pack size</dt><dd>One randomly selected promo card from the eight-card series.</dd></div>
        <div><dt>Distribution</dt><dd>{promoCardSeries[1].distribution}</dd></div>
      </dl>

      <h2>Demo Soul promo: Foiled Chillet</h2>
      <p>The official Demo Caravan page names a limited-edition Foiled Chillet Soul Promo Card. Qualifying participants receive it after completing the demo, alongside the event&apos;s current accessory reward and Bushi Navi flair. The broader Demo Sessions page says the post-July 1 foil reward requires showing or registering a Bushi Navi account after the demo.</p>
      <p>Availability can vary by event and supplies. Check the live official event listing before travelling; a completed marketplace sale proves resale activity, not the rules for receiving the card at an event.</p>

      <h2>Entry Soul Card Set and release prizes</h2>
      <p>The August Grand Release Tournament and September Los Angeles Release Party each list a three-card Entry Soul Card Set for participants. The official pages show the reward artwork but do not publish a complete set of readable card numbers, so no numbers are taken from reseller titles or guessed from images.</p>
      <div className="comparison-table" role="region" aria-label="Palworld promo card distribution guide" tabIndex={0}>
        <div className="comparison-head"><span>Event path</span><strong>Confirmed card reward</strong><strong>Important condition</strong></div>
        <div><span>Demo Caravan</span><p>Foiled Chillet Soul Promo Card</p><p>Complete the demo; Bushi Navi and stock conditions apply.</p></div>
        <div><span>Shop tournament</span><p>One random PR Card Pack Vol.1 card</p><p>Register through Bushi Navi and attend an eligible store event.</p></div>
        <div><span>Grand Release</span><p>PR Vol.1 card plus Entry Soul Card Set</p><p>August event availability is controlled by the organizer.</p></div>
        <div><span>Higher finish</span><p>PR Card Pack Vol.1.5 where specified</p><p>The exact win or store-distribution condition depends on the event page.</p></div>
      </div>

      <h2>Are Palworld promo cards tournament legal?</h2>
      <p>Do not treat every item handed out at a demo as a tournament card. Bushiroad explicitly says the prototype demo cards are for demos and casual play and are not legal in tournaments. For a numbered EPR or ESOUL promo, confirm the exact official card entry and the current event regulations before building a sanctioned deck. The event page explains how a prize is distributed; the official card list and tournament rules control how a playable card is used.</p>
      <div className="callout"><strong>Safe rule:</strong> prototype deck cards are not tournament legal. A sealed promo pack, foil stamp or high resale price does not by itself prove legality or change the printed gameplay effect.</div>

      <h2>How to verify a promo card</h2>
      <ul>
        <li>Open the official event or card page for the exact PR series.</li>
        <li>Match the complete card number, including any “S” suffix.</li>
        <li>Check the event month and location because prize rules can rotate.</li>
        <li>Confirm tournament legality separately from the way the card was distributed.</li>
      </ul>
      <div className="article-actions">
        <Link className="button primary" href="/events">Find tournaments and registration</Link>
        <Link className="button ghost" href="/blog/palworld-card-game-2026-roadmap">Check current event dates</Link>
        <Link className="button ghost" href="/cards">Browse released card data</Link>
        <Link className="button ghost" href="/rules">Search tournament rules</Link>
        <Link className="button ghost" href="/sets">Browse booster sets</Link>
      </div>

      <AdsterraNativeAd />
      <section className="source-panel">
        <p className="eyebrow">Official sources</p>
        <h2>Official promo and event sources</h2>
        <p>Prize contents and distribution conditions come from the current official English pages below.</p>
        <div>
          <a href="https://en.palworld-official-cardgame.com/events/shop-tournaments" target="_blank" rel="noreferrer">Official shop tournaments ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/demo-caravan" target="_blank" rel="noreferrer">Official Demo Caravan ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/demo-sessions-2026" target="_blank" rel="noreferrer">Official demo sessions ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/grand-release-tournament" target="_blank" rel="noreferrer">Official Grand Release Tournament ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/release-party-in-los-angeles" target="_blank" rel="noreferrer">Official Los Angeles Release Party ↗</a>
        </div>
      </section>
    </article>
  );
}
