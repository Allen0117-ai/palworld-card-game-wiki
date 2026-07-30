import Link from "next/link";
import { CardTile } from "@/components/CardTile";
import { DeckTile } from "@/components/DeckTile";
import { cards, decks, guides } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { HeroSearch } from "@/components/HeroSearch";

export default function Home() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Organization", name: "Palworld Card Game Wiki", url: "https://palworldcardgame.wiki" },
        { "@context": "https://schema.org", "@type": "WebSite", name: "Palworld Card Game Wiki", url: "https://palworldcardgame.wiki", potentialAction: { "@type": "SearchAction", target: "https://palworldcardgame.wiki/cards?q={search_term_string}", "query-input": "required name=search_term_string" } },
      ]} />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span>Launch set live</span> · Dawn of Palpagos</p>
          <h1>Build smarter.<br /><em>Battle sharper.</em></h1>
          <p className="hero-lede">
            A fast, independent companion for the Palworld Official Card Game.
            Explore cards, test legal lists, and learn the launch meta.
          </p>
          <HeroSearch />
          <div className="hero-actions">
            <Link className="button primary" href="/tools/deck-builder">Open deck builder <span>↗</span></Link>
            <Link className="button ghost" href="/cards">Browse all cards</Link>
          </div>
          <div className="hero-stats" aria-label="Database highlights">
            <div><strong>241</strong><span>cards tracked</span></div>
            <div><strong>4</strong><span>deck colors</span></div>
            <div><strong>50+10</strong><span>legal deck</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Featured launch cards">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="show-card show-card-left">
            <span className="card-kicker">EBP01 · RR</span>
            <div className="card-creature">JI</div>
            <strong>Jormuntide<br />Ignis</strong>
            <small>Red · Pal</small>
          </div>
          <div className="show-card show-card-main">
            <span className="card-kicker">EBP01 · RR</span>
            <div className="card-creature">SU</div>
            <strong>Suzaku</strong>
            <small>Red · Pal</small>
          </div>
          <div className="show-card show-card-right">
            <span className="card-kicker">EBP01 · RR</span>
            <div className="card-creature">LY</div>
            <strong>Lyleen</strong>
            <small>Green · Pal</small>
          </div>
          <div className="spark spark-a">✦</div>
          <div className="spark spark-b">+</div>
        </div>
      </section>

      <section className="ticker" aria-label="Site features">
        <div>Card database <span>✦</span> Deck builder <span>✦</span> Meta decks <span>✦</span> Pull-rate tracker <span>✦</span> Beginner guides <span>✦</span></div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Fresh from BP01</p>
            <h2>Cards worth knowing</h2>
          </div>
          <Link className="text-link" href="/cards">View card database →</Link>
        </div>
        <div className="card-grid">
          {cards.slice(0, 4).map((card) => <CardTile key={card.slug} card={card} />)}
        </div>
      </section>

      <section className="section shell split-section">
        <div>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Community lab</p>
              <h2>Decks to test</h2>
            </div>
            <Link className="text-link" href="/decks">All decks →</Link>
          </div>
          <div className="deck-list">
            {decks.map((deck, index) => <DeckTile key={deck.slug} deck={deck} rank={index + 1} />)}
          </div>
        </div>
        <aside className="builder-promo">
          <div className="builder-promo-top">
            <span className="mini-label">Free tool</span>
            <span className="tool-mark">50</span>
          </div>
          <h3>Your next deck<br />starts here.</h3>
          <p>Search the launch card pool, stay inside the two-color rule, and save a legal list on your device.</p>
          <Link className="button ink" href="/tools/deck-builder">Start building <span>↗</span></Link>
        </aside>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learn the game</p>
            <h2>Launch guides</h2>
          </div>
          <Link className="text-link" href="/blog">View all guides →</Link>
        </div>
        <div className="guide-grid">
          {guides.map((guide, index) => (
            <Link href={`/blog/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
              <span className="guide-number">0{index + 1}</span>
              <div>
                <span className="mini-label">{guide.category} · {guide.readTime}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </div>
              <span className="guide-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
