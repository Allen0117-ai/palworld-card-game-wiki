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
          <p className="eyebrow"><span>Unofficial field guide</span> · Dawn of Palpagos</p>
          <h1>Master the wild.<br /><em>Build your team.</em></h1>
          <p className="hero-lede">
            Explore real cards, discover launch-set strategies, and shape your next
            Palworld Card Game deck in one player-first companion.
          </p>
          <HeroSearch />
          <div className="hero-actions">
            <Link className="button primary" href="/tools/deck-builder">Open deck builder <span>◆</span></Link>
            <Link className="button ghost" href="/cards">Browse all cards</Link>
          </div>
          <div className="hero-stats" aria-label="Database highlights">
            <div><strong>100</strong><span>base cards in BP01</span></div>
            <div><strong>4</strong><span>deck colors</span></div>
            <div><strong>50+10</strong><span>legal deck</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Featured launch cards">
          <div className="map-ring ring-one" />
          <div className="map-ring ring-two" />
          <div className="hero-card hero-card-left">
            <img src="/cards/EBP01-001.png" alt="Jormuntide Ignis official card" width={400} height={559} />
          </div>
          <div className="hero-card hero-card-main">
            <img src="/cards/EBP01-002.png" alt="Suzaku official card" width={400} height={559} />
          </div>
          <div className="hero-card hero-card-right">
            <img src="/cards/EBP01-049.png" alt="Lyleen official card" width={400} height={559} />
          </div>
          <span className="hero-credit">Official card images · ©Bushiroad ©PALWORLD</span>
        </div>
      </section>

      <section className="ticker" aria-label="Site features">
        <div>Card database <span>◆</span> Deck builder <span>◆</span> Deck guides <span>◆</span> Official card data <span>◆</span> Beginner guides</div>
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

      <section className="product-section">
        <div className="shell product-grid">
          <div className="product-copy">
            <p className="eyebrow"><span>First booster set</span> · EBP01</p>
            <h2>Answer the call<br />of Palpagos.</h2>
            <p>Dawn of Palpagos introduces 100 base cards, four colors and alternate treatments built around the creatures, tools and survival systems of Palworld.</p>
            <a className="button primary" href="https://en.palworld-official-cardgame.com/products/ebp01/" target="_blank" rel="noreferrer">Visit official product page <span>↗</span></a>
          </div>
          <div className="product-pack">
            <img src="/media-kit/bp01-booster.png" alt="Dawn of Palpagos booster pack" width={828} height={1713} loading="lazy" />
          </div>
          <div className="product-art">
            <img src="/media-kit/card-back.png" alt="Official Palworld Card Game card back" width={607} height={849} loading="lazy" />
          </div>
        </div>
        <p className="asset-credit shell">Official promotional assets shown unmodified · ©Bushiroad ©PALWORLD</p>
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

      <section className="official-banner shell" aria-label="Dawn of Palpagos official launch artwork">
        <img src="/media-kit/launch-banner.jpg" alt="Dawn of Palpagos official promotional artwork" width={1920} height={1080} loading="lazy" />
        <div className="official-banner-caption">
          <div><span>Official launch artwork</span><strong>Dawn of Palpagos</strong></div>
          <span>©Bushiroad ©PALWORLD</span>
        </div>
      </section>
    </>
  );
}
