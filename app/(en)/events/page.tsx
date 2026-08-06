import type { Metadata } from "next";
import Link from "next/link";
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

const pagePath = "/events";
const pageTitle = "Palworld TCG Tournaments – Events, Rules & Bushi Navi";
const pageDescription = "Learn how to enter Palworld TCG tournaments through Bushi Navi, check shop-event formats and prizes, and prepare a legal deck for official play.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  absoluteTitle: true,
  type: "article",
});

export default function EventsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      datePublished: "2026-08-05",
      dateModified: "2026-08-06",
      author: createEditorialAuthorJsonLd(),
      publisher: createPublisherJsonLd(),
      mainEntityOfPage: `${SITE_URL}${pagePath}`,
      about: [
        { "@type": "Thing", name: "Palworld Official Card Game tournaments" },
        { "@type": "SoftwareApplication", name: "Bushi Navi", applicationCategory: "Event registration" },
      ],
    },
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Events", path: pagePath },
    ]),
  ];

  return (
    <article className="article-shell">
      <JsonLd data={structuredData} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Events" }]} />
      <p className="eyebrow"><span>Official play guide</span> · Tournaments and registration</p>
      <h1>Palworld TCG<br />tournaments.</h1>
      <p className="article-lede">Find an official event, understand the published format, register through Bushi Navi and arrive with a legal deck instead of relying on a marketplace or social post.</p>

      <div className="article-trust">
        <span>Updated August 6, 2026</span>
        <strong>Official event pages checked</strong>
        <span>Local organizer details still control attendance</span>
      </div>
      <EditorialByline reviewed="August 6, 2026" sourceStatus="Official events, rules and tournament pages" />

      <div className="quick-answer">
        <strong>How to enter a Palworld TCG tournament</strong>
        <p>Start on the official Palworld Card Game events page, then use Bushi Navi to find and register for the actual store or regional event. New September–October demo sessions require advance registration and give participants a Daedream paper deck case. Regular shop tournaments use Standard format, Swiss rounds and best-of-one games until one undefeated player remains. Bring an exact 50-card Main Deck, a separate 10-card Soul Deck, legal sleeves and any counters the organizer requires. Check the event listing again before travelling because capacity, check-in time, prize stock and local procedures can change.</p>
        <a className="quick-answer-source" href="https://en.palworld-official-cardgame.com/events" target="_blank" rel="noreferrer">Primary source: official events hub ↗</a>
      </div>

      <ContentFreshnessPanel
        updated="August 6, 2026"
        verified="August 6, 2026"
        sourceStatus="Official event hub + event-specific regulations"
        summary="Explains event discovery, Bushi Navi registration, current shop formats, prize sources and tournament preparation."
        changeSummary="Added the September–October demo sessions, advance registration and Daedream participation reward."
        published="August 5, 2026"
      />

      <h2>Where to find official Palworld TCG events</h2>
      <p>The publisher&apos;s events hub is the starting point for competitive and casual programs. It links to shop tournaments, demo sessions, release events, Challengers Cup and Masters League information as those programs open. Bushi Navi is the registration system used by the official event pages; a store&apos;s ordinary calendar or social post can provide useful local context, but it should match an official event listing before you rely on it.</p>
      <div className="article-actions">
        <a className="button primary" href="https://en.palworld-official-cardgame.com/events" target="_blank" rel="noreferrer">Open official events ↗</a>
        <a className="button ghost" href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Find an official store ↗</a>
        <Link className="button ghost" href="/blog/palworld-tcg-tournament-decklists">Check published decklists</Link>
        <Link className="button ghost" href="/blog/palworld-card-game-2026-roadmap">Check the dated roadmap</Link>
      </div>

      <h2>September–October 2026 demo sessions</h2>
      <p>The new official store-demo program is for players who want guided practice before entering a tournament. Advance registration is required through Bushi Navi. Every participant is scheduled to receive a paper deck case featuring Daedream; use the official store finder for the actual location, date and remaining capacity.</p>
      <div className="article-actions">
        <a className="button primary" href="https://en.palworld-official-cardgame.com/events/demo-session-september-october-2026" target="_blank" rel="noreferrer">Open September–October demos ↗</a>
        <a className="button ghost" href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Find a participating store ↗</a>
      </div>

      <h2>Register with Bushi Navi in five steps</h2>
      <ol>
        <li>Install or open Bushi Navi and sign in to your account.</li>
        <li>Search for Palworld OFFICIAL CARD GAME events in your region.</li>
        <li>Open the exact store or tournament listing and read its date, capacity and check-in rules.</li>
        <li>Register before the organizer&apos;s deadline; a saved store page is not the same as a confirmed event entry.</li>
        <li>Check the listing again before travel for cancellations, time changes or organizer instructions.</li>
      </ol>
      <div className="callout"><strong>Beginner warning:</strong> buying cards from a store does not automatically register you for its tournament. The official event page says advance registration is handled through Bushi Navi.</div>

      <h2>Current official tournament paths</h2>
      <div className="comparison-table" role="region" aria-label="Palworld TCG official event types" tabIndex={0}>
        <div className="comparison-head"><span>Program</span><strong>Best for</strong><strong>Published status</strong></div>
        <div><span>Shop tournaments</span><p>Regular local competitive play</p><p>Started in August 2026 at official tournament stores.</p></div>
        <div><span>Grand Release</span><p>Launch-month competition and promos</p><p>One eligible event per official store from August 1–31, 2026.</p></div>
        <div><span>Challengers Cup</span><p>Higher-stakes regional competition</p><p>The official events hub places the first season from September.</p></div>
        <div><span>Masters League</span><p>Road toward the first World Championship</p><p>Use the current official hub for region and qualification announcements.</p></div>
        <div><span>Demo sessions</span><p>Learning before entering competition</p><p>September–October store demos require advance registration and include a Daedream paper deck case.</p></div>
      </div>

      <h2>Shop tournament rules at a glance</h2>
      <p>The official shop-tournament page lists Standard format, Swiss rounds and best-of-one games. Rounds continue until the published stopping condition produces one undefeated player. The event page does not replace the complete game rules, floor rules or judge instructions, so arrive early enough to ask about unclear sleeves, language editions or card corrections.</p>
      <div className="stat-table">
        <div><strong>50</strong><span>Main Deck</span></div>
        <div><strong>10</strong><span>Soul Deck</span></div>
        <div><strong>2</strong><span>colors maximum</span></div>
        <div><strong>4</strong><span>same-name limit</span></div>
        <div><strong>8</strong><span>Lucky maximum</span></div>
      </div>
      <p>Those construction limits describe a legal starting point, not every floor-rule detail. Use the <Link className="text-link" href="/blog/palworld-card-game-deck-building-rules">complete deck-building guide</Link> and run the finished list through the deck builder before registering.</p>

      <h2>Grand Release Tournament format and prizes</h2>
      <p>The August Grand Release Tournament uses Standard format, up to five Swiss rounds, best-of-one games and 30 minutes per round. Every participant receives one random card from a nine-card PR pack, a three-card Entry Soul Card Set and a Bushi Navi flair. The champion receives the announced Lily Everhart and Lyleen playmat plus a champion flair.</p>
      <p>Prize cards and availability can rotate after launch month. The <Link className="text-link" href="/cards/promos">promo card index</Link> records published PR numbers and separates participation rewards from winner-only or store-distributed prizes.</p>

      <h2>Tournament-ready checklist</h2>
      <ul>
        <li><strong>Registration:</strong> your Bushi Navi entry shows the correct store, date and event.</li>
        <li><strong>Main Deck:</strong> exactly 50 cards, no more than two named colors and no more than four copies of one complete card name.</li>
        <li><strong>Soul Deck:</strong> exactly 10 Soul cards kept physically separate from the Main Deck.</li>
        <li><strong>Lucky limit:</strong> no more than eight Lucky icons in the Main Deck.</li>
        <li><strong>Language:</strong> use the edition accepted in the event&apos;s region; the launch policy requires English Main Decks outside the listed Asian territories.</li>
        <li><strong>Condition:</strong> use consistent sleeves and ask the organizer about damaged, marked or corrected cards before play.</li>
        <li><strong>Arrival:</strong> bring the listed counters and arrive before check-in closes.</li>
      </ul>
      <div className="article-actions">
        <Link className="button primary" href="/tools/deck-builder">Check a deck in the builder</Link>
        <Link className="button ghost" href="/rules">Search official rulings</Link>
        <Link className="button ghost" href="/blog/palworld-tcg-english-vs-japanese-cards">Check card-language policy</Link>
        <Link className="button ghost" href="/blog/palworld-card-game-errata-tracker">Review confirmed errata</Link>
      </div>

      <h2>Where to check changing event dates</h2>
      <p>Use this guide for registration, tournament format and deck preparation. For dated product launches, festivals and new event announcements, check the <Link className="text-link" href="/blog/palworld-card-game-2026-roadmap">Palworld Card Game 2026 Roadmap</Link> and confirm the final details in Bushi Navi before travelling.</p>

      <section className="source-panel">
        <p className="eyebrow">Official sources</p>
        <h2>Official tournament sources</h2>
        <p>Always open the current event-specific page before attending; local check-in instructions and capacity can change.</p>
        <div>
          <a href="https://en.palworld-official-cardgame.com/events" target="_blank" rel="noreferrer">Official events hub ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/shop-tournaments" target="_blank" rel="noreferrer">Official shop tournaments ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/grand-release-tournament" target="_blank" rel="noreferrer">Official Grand Release Tournament ↗</a>
          <a href="https://en.palworld-official-cardgame.com/rule" target="_blank" rel="noreferrer">Official Rule &amp; Q&amp;A ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/demo-sessions-2026" target="_blank" rel="noreferrer">Official demo sessions ↗</a>
          <a href="https://en.palworld-official-cardgame.com/events/demo-session-september-october-2026" target="_blank" rel="noreferrer">September–October store demos ↗</a>
        </div>
      </section>
    </article>
  );
}
