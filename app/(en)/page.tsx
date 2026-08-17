import Link from "next/link";
import Image from "next/image";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { HeroSearch } from "@/components/HeroSearch";
import { HomeProgressHub } from "@/components/HomeProgressHub";
import { HubLinkGrid } from "@/components/HubLinkGrid";
import { officialRuleCount } from "@/lib/rules";
import { createPageMetadata } from "@/lib/seo";

const homeTitle = "Palworld Trading Card Game (TCG) – Rules, Cards & Decks";
const homeDescription = "Your Palworld trading card game guide for rules, all 148 launch cards, deck lists, BP01 and BP02 products, events, and a free legal deck builder.";

export const metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <section className="hero hero-map">
        <Image
          className="hero-map-background"
          src="/hero-palpagos-map.webp"
          alt=""
          width={1915}
          height={821}
          sizes="100vw"
          priority
          aria-hidden="true"
        />
        <div className="hero-map-overlay" />
        <div className="hero-map-lights" aria-hidden="true">
          <span className="map-light map-light-gold" />
          <span className="map-light map-light-sky" />
        </div>
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-particle-mist hero-particle-mist-gold" />
          <span className="hero-particle-mist hero-particle-mist-sky" />
        </div>
        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow"><span>Player field guide</span> · Learn · Build · Collect</p>
            <h1>
              <span className="hero-title-keyword">Palworld Trading Card Game Wiki</span>
              Find your answer.<br /><em>Build your Pal team.</em>
            </h1>
            <p className="hero-lede">
              Learn the Palworld TCG, search official rulings, browse all 148
              launch main-deck cards, follow BP02 and build a legal deck. Choose
              the next task that matches how you want to play.
            </p>
            <HeroSearch />
            <div className="hero-actions">
              <Link className="button primary" href="/blog/how-to-play-palworld-card-game">Learn how to play <span>◆</span></Link>
              <Link className="button ghost" href="/cards">Browse 148 cards</Link>
              <Link className="button ghost" href="/tools/deck-builder">Build a deck</Link>
            </div>
            <div className="hero-stats" aria-label="Database highlights">
              <Link href="/cards" data-analytics-event="home_stat_click" data-analytics-label="launch-cards"><strong>148</strong><span>launch main-deck cards</span></Link>
              <Link href="/rules" data-analytics-event="home_stat_click" data-analytics-label="official-rulings"><strong>{officialRuleCount}</strong><span>official Q&amp;As indexed</span></Link>
              <Link href="/blog/palworld-card-game-deck-building-rules" data-analytics-event="home_stat_click" data-analytics-label="legal-deck"><strong>50+10</strong><span>legal deck</span></Link>
            </div>
          </div>

          <div className="hero-product" aria-label="Dawn of Palpagos launch card showcase">
            <div className="hero-product-stage" data-tilt>
              <div className="hero-product-stamp">
                <span>First booster set · EBP01</span>
                <strong>Dawn of Palpagos</strong>
                <small>Official launch product</small>
              </div>
              <Link
                className="hero-card hero-card-back"
                href="/card/chillet-dragon-whisperer-ebp01-025"
                aria-label="Open Chillet — Dragon Whisperer card details"
                data-analytics-event="home_showcase_card_click"
                data-analytics-label="chillet"
              >
                <Image
                  src="/cards/showcase/EBP01-025SSP.webp"
                  alt="Chillet EBP01-025SSP special artwork card"
                  width={1117}
                  height={1560}
                  sizes="(max-width: 520px) 116px, (max-width: 760px) 142px, (max-width: 1050px) 176px, 205px"
                />
                <span className="hero-card-glare" aria-hidden="true" />
              </Link>
              <Link
                className="hero-card hero-card-front"
                href="/card/suzaku-hellfire-wings"
                aria-label="Open Suzaku — Hellfire Wings card details"
                data-analytics-event="home_showcase_card_click"
                data-analytics-label="suzaku"
              >
                <Image
                  src="/cards/showcase/EBP01-002SP.webp"
                  alt="Suzaku EBP01-002SP special artwork card"
                  width={1117}
                  height={1560}
                  sizes="(max-width: 520px) 125px, (max-width: 760px) 151px, (max-width: 1050px) 187px, 218px"
                  priority
                />
                <span className="hero-card-glare" aria-hidden="true" />
              </Link>
              <Link
                className="hero-card hero-card-third"
                href="/card/helzephyr-wings-of-the-moonless-night-ebp01-073"
                aria-label="Open Helzephyr — Wings of the Moonless Night card details"
                data-analytics-event="home_showcase_card_click"
                data-analytics-label="helzephyr"
              >
                <Image
                  src="/cards/showcase/EBP01-073SSP.webp"
                  alt="Helzephyr EBP01-073SSP special artwork card"
                  width={1117}
                  height={1560}
                  sizes="(max-width: 520px) 108px, (max-width: 760px) 130px, (max-width: 1050px) 158px, 184px"
                />
                <span className="hero-card-glare" aria-hidden="true" />
              </Link>
              <span className="hero-credit">Official product images · ©Bushiroad ©PALWORLD</span>
              <span className="hero-card-action-hint">Tap a card to open its details</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Site features">
        <div>Verified rules <span>◆</span> 148-card database <span>◆</span> Deck builder <span>◆</span> Collection checklist <span>◆</span> Verified updates</div>
      </section>

      <section className="launch-paths shell" data-reveal>
        <div className="launch-paths-heading">
          <div><p className="eyebrow"><span>Choose your path</span> · Start with your goal</p><h2>Three ways to use the wiki.</h2></div>
          <p>Start with the path that matches you now. Each one leads to the cards, rules and tools needed for the next step.</p>
        </div>
        <div className="launch-path-grid">
          <Link href="/blog/how-to-play-palworld-card-game"><span>01 · New player</span><strong>Learn your first game</strong><p>Follow setup, turn order, combat and winning step by step.</p></Link>
          <Link href="/decks"><span>02 · Build &amp; compete</span><strong>Choose and improve a deck</strong><p>Compare Trial Decks, copy a complete list and open it in the builder.</p></Link>
          <Link href="/sets"><span>03 · Collect &amp; track</span><strong>Browse sets and save progress</strong><p>Check BP01, follow BP02 and track base cards, parallels and promos.</p></Link>
        </div>
      </section>

      <div className="shell" data-reveal>
        <HubLinkGrid
          eyebrow="Wiki index"
          title="Find the guide, tool or answer you need."
          intro="The main database, rules, deck, set and update pages are collected here without repeating them further down the homepage."
          items={[
            { href: "/blog/how-to-play-palworld-card-game", label: "Start here", title: "How to play", description: "Learn setup, phases, attacks, blocking and winning." },
            { href: "/cards", label: "Card database", title: "Cards", description: "Search all 148 launch cards by name, number and stats.", badge: "148 cards" },
            { href: "/rules", label: "Official rulings", title: "Rules & FAQ", description: "Find plain-English answers and official Q&A sources." },
            { href: "/decks", label: "Deck guides", title: "Decks", description: "Choose by goal, compare Trial Decks and copy a complete list." },
            { href: "/sets", label: "Series index", title: "Sets & products", description: "Compare BP01, BP02, Trial Decks and the confirmed 2026–27 schedule.", badge: "2 named sets" },
            { href: "/tools/deck-builder", label: "Free tool", title: "Deck builder", description: "Build a legal list from every launch card.", badge: "No account" },
            { href: "/tools/dawn-of-palpagos-checklist", label: "Collection tool", title: "BP01 checklist", description: "Track base cards, parallels and the special Soul." },
            { href: "/updates", label: "Verified changes", title: "Updates", description: "See what changed and which cards, rules or decks are affected." },
            { href: "/events", label: "Official play", title: "Events", description: "Find Bushi Navi registration, formats and current programs." },
          ]}
        />
      </div>

      <div className="shell">
        <AdsterraBannerAd />
      </div>

      <section className="home-about-game shell" aria-labelledby="about-palworld-card-game" data-reveal>
        <div className="home-about-copy">
          <p className="eyebrow"><span>About the game</span> · Official facts</p>
          <h2 id="about-palworld-card-game">What is the Palworld Official Card Game?</h2>
          <p>The Palworld Official Card Game is a two-player physical trading card game based on the world of Palworld. Lead a team of Pals, use Gear, Event and Structure cards, and manage resources to build stronger turns than your opponent.</p>
          <p>Every legal list uses a 50-card Main Deck and a separate 10-card Soul Deck. Begin with a ready-to-play Trial Deck, learn setup and combat, then explore BP01 cards to build a team that matches your play style.</p>
          <div className="article-actions">
            <Link className="button primary" href="/blog">Explore all guides</Link>
            <a className="button ghost" href="https://en.palworld-official-cardgame.com/for-beginners" target="_blank" rel="noreferrer">Official beginner page <span>↗</span></a>
          </div>
        </div>
        <dl className="home-game-facts" aria-label="Palworld Official Card Game facts">
          <div><dt>Concept</dt><dd>Bushiroad</dd></div>
          <div><dt>Development</dt><dd>Yuhodo</dd></div>
          <div><dt>Format</dt><dd>Physical TCG</dd></div>
          <div><dt>Players</dt><dd>2</dd></div>
          <div><dt>Launch</dt><dd>Jul 30, 2026</dd></div>
          <div><dt>Launch card pool</dt><dd>148 cards</dd></div>
        </dl>
      </section>

      <HomeProgressHub />

      <section className="latest-updates shell" data-reveal>
        <div className="latest-updates-heading">
          <div><p className="eyebrow"><span>Latest verified</span> · August 17, 2026</p><h2>What changed recently.</h2></div>
          <div className="latest-updates-copy">
            <p>Short, dated updates checked against official news, event pages and the live card database.</p>
            <Link className="text-link" href="/updates">View the complete update log →</Link>
          </div>
        </div>
        <div className="latest-update-grid">
          <Link href="/blog/palworld-tcg-tournament-decklists" data-analytics-event="latest_update_click" data-analytics-label="official-tournament-results">
            <span>Official results · Aug 17</span>
            <strong>Osaka and Tokyo deck recipes published</strong>
            <p>Official Japanese sources now show early undefeated Grand Release lists, with their event limits kept clear.</p>
          </Link>
          <Link href="/blog/palworld-card-game-products-where-to-buy" data-analytics-event="latest_update_click" data-analytics-label="bp01-shortage-notice">
            <span>Official stock notice · Aug 12</span>
            <strong>BP01 shortage acknowledged</strong>
            <p>The publisher confirmed continuing shortages but did not announce a restock date.</p>
          </Link>
          <Link href="/cards" data-analytics-event="latest_update_click" data-analytics-label="official-card-list">
            <span>Official database · Live</span>
            <strong>All 148 launch Main Deck cards indexed</strong>
            <p>Search BP01, TD01 and TD02 by name, number, color, type, cost, rarity and Lucky icon.</p>
          </Link>
        </div>
      </section>

      <section className="home-final-cta shell" aria-labelledby="home-final-cta-title" data-reveal>
        <div>
          <p className="eyebrow">Choose one useful next step</p>
          <h2 id="home-final-cta-title">Play, build or check what changed.</h2>
          <p>Learn the first game, open a legal deck in the builder, or review the latest verified changes before your next match.</p>
        </div>
        <div className="article-actions">
          <Link className="button primary" href="/blog/how-to-play-palworld-card-game">Learn how to play</Link>
          <Link className="button ink" href="/tools/deck-builder">Open deck builder</Link>
          <Link className="button ink" href="/updates">View updates</Link>
        </div>
      </section>
    </>
  );
}
