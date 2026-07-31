import Link from "next/link";
import Image from "next/image";
import { DeckTile } from "@/components/DeckTile";
import { decks, guides, homepageSpecialArtwork } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { HeroSearch } from "@/components/HeroSearch";
import { SpecialCardGallery } from "@/components/SpecialCardGallery";
import { featuredRuleAnswers, officialRuleCount } from "@/lib/rules";
import { createPageMetadata } from "@/lib/seo";

const homeTitle = "Palworld Card Game Guide – Rules, Cards, Decks & Builder";
const homeDescription = "Get clear Palworld Card Game rules, all 148 launch main-deck cards, Trial Deck guides, product answers and a free deck builder.";

export const metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Organization", name: "Palworld Card Game Wiki", url: "https://palworldcardgame.wiki" },
        { "@context": "https://schema.org", "@type": "WebSite", name: "Palworld Card Game Wiki", url: "https://palworldcardgame.wiki", potentialAction: { "@type": "SearchAction", target: "https://palworldcardgame.wiki/search?q={search_term_string}", "query-input": "required name=search_term_string" } },
      ]} />
      <section className="hero hero-map">
        <Image
          className="hero-map-background"
          src="/hero-palpagos-map.webp"
          alt=""
          width={1915}
          height={821}
          sizes="100vw"
          fetchPriority="high"
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
            <p className="eyebrow"><span>Launch-day field guide</span> · Rules · Cards · Decks</p>
            <h1>
              <span className="hero-title-keyword">Palworld Card Game Wiki</span>
              Find your answer.<br /><em>Build your Pal team.</em>
            </h1>
            <p className="hero-lede">
              Ask rules in normal language, browse all 148 launch main-deck
              cards, compare Trial Decks, and build a legal deck.
            </p>
            <HeroSearch />
            <div className="hero-actions">
              <Link className="button primary" href="/rules">Ask a rules question <span>◆</span></Link>
              <Link className="button ghost" href="/cards">Browse 148 cards</Link>
            </div>
            <div className="hero-stats" aria-label="Database highlights">
              <div><strong>148</strong><span>launch main-deck cards</span></div>
              <div><strong>{officialRuleCount}</strong><span>official Q&amp;As indexed</span></div>
              <div><strong>50+10</strong><span>legal deck</span></div>
            </div>
          </div>

          <div className="hero-product" aria-label="Dawn of Palpagos launch card showcase">
            <div className="hero-product-stage" data-tilt>
              <div className="hero-product-stamp">
                <span>First booster set · EBP01</span>
                <strong>Dawn of Palpagos</strong>
                <small>Official launch product</small>
              </div>
              <div className="hero-card hero-card-back">
                <Image
                  src="/cards/showcase/EBP01-025SSP.webp"
                  alt="Chillet EBP01-025SSP special artwork card"
                  width={1117}
                  height={1560}
                  sizes="(max-width: 520px) 116px, (max-width: 760px) 142px, (max-width: 1050px) 176px, 205px"
                  loading="eager"
                />
                <span className="hero-card-glare" aria-hidden="true" />
              </div>
              <div className="hero-card hero-card-front">
                <Image
                  src="/cards/showcase/EBP01-002SP.webp"
                  alt="Suzaku EBP01-002SP special artwork card"
                  width={1117}
                  height={1560}
                  sizes="(max-width: 520px) 125px, (max-width: 760px) 151px, (max-width: 1050px) 187px, 218px"
                  loading="eager"
                />
                <span className="hero-card-glare" aria-hidden="true" />
              </div>
              <div className="hero-card hero-card-third">
                <Image
                  src="/cards/showcase/EBP01-073SSP.webp"
                  alt="Helzephyr EBP01-073SSP special artwork card"
                  width={1117}
                  height={1560}
                  sizes="(max-width: 520px) 108px, (max-width: 760px) 130px, (max-width: 1050px) 158px, 184px"
                  loading="eager"
                />
                <span className="hero-card-glare" aria-hidden="true" />
              </div>
              <span className="hero-credit">Official product images · ©Bushiroad ©PALWORLD</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Site features">
        <div>Launch-day rules <span>◆</span> 148-card database <span>◆</span> Trial Deck guides <span>◆</span> Source labels <span>◆</span> Beginner answers</div>
      </section>

      <section className="launch-paths shell" data-reveal>
        <div className="launch-paths-heading">
          <div><p className="eyebrow"><span>What do you need today?</span> · Start with a task</p><h2>Get the answer faster.</h2></div>
          <p>The official information is accurate but scattered. We organize it around the real jobs a new player is trying to finish.</p>
        </div>
        <div className="launch-path-grid">
          <Link href="/blog/how-to-play-palworld-card-game"><span>01 · First game</span><strong>How do I play?</strong><p>Setup, phases, attacks, blocking and winning.</p></Link>
          <Link href="/blog/red-blue-vs-green-purple-trial-deck"><span>02 · Buying</span><strong>Which Trial Deck?</strong><p>Red/Blue and Green/Purple compared clearly.</p></Link>
          <Link href="/blog/palworld-card-game-deck-building-rules"><span>03 · Rules</span><strong>How do I build a legal deck?</strong><p>50 cards, 10 Souls, two colors and copy limits.</p></Link>
          <Link href="/tools/dawn-of-palpagos-checklist"><span>04 · Collection</span><strong>Track my BP01 set</strong><p>Check off all 162 base, parallel and special Soul entries.</p></Link>
          <Link href="/deck/mono-red-pal-rush"><span>05 · Ready deck</span><strong>Can I copy a complete deck?</strong><p>Open an illustrated 50-card beginner list and load it into the builder.</p></Link>
          <Link href="/rules"><span>06 · Rules answer center</span><strong>Can I ask a specific question?</strong><p>Search {featuredRuleAnswers.length} essentials and all {officialRuleCount} official Q&amp;As.</p></Link>
        </div>
      </section>

      <section className="section shell split-section" data-reveal>
        <div>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Launch deck center</p>
              <h2>See the cards. Learn the plan.</h2>
            </div>
            <Link className="text-link" href="/decks">View illustrated deck guides →</Link>
          </div>
          <p className="deck-home-intro">Start with a verified Trial Deck or copy the complete 50-card beginner list. Every guide includes a three-step game plan and visual card combinations.</p>
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
          <p>Search all 148 launch cards, stay inside the two-color and copy limits, and save a legal list on your device.</p>
          <Link className="button ink" href="/tools/deck-builder">Start building <span>↗</span></Link>
        </aside>
      </section>

      <section className="latest-updates shell" data-reveal>
        <div className="latest-updates-heading">
          <div><p className="eyebrow"><span>Updated today</span> · July 31, 2026</p><h2>What changed at launch.</h2></div>
          <p>Checked against the official news feed, event pages and launch-day community questions.</p>
        </div>
        <div className="latest-update-grid">
          <Link href="/blog/palworld-card-game-2026-roadmap">
            <span>Official news · Jul 30</span>
            <strong>Singapore and Los Angeles events added</strong>
            <p>See the newly confirmed dates, formats, prizes and Bushi Navi registration details.</p>
          </Link>
          <Link href="/blog/palworld-card-game-products-where-to-buy">
            <span>Buyer watch · Jul 31</span>
            <strong>Stock and launch-price warning</strong>
            <p>Use official retailers, call before travelling and do not treat marketplace asking prices as settled value.</p>
          </Link>
          <Link href="/blog/dawn-of-palpagos-chase-cards">
            <span>Collector guide · Jul 31</span>
            <strong>Four SSP chase cards confirmed</strong>
            <p>See exact card numbers, standout SP artwork and safer ways to check launch prices.</p>
          </Link>
        </div>
      </section>

      <section className="section shell special-gallery-section" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">SP &amp; SSP parallel gallery</p>
            <h2>See the cards at their best.</h2>
          </div>
          <Link className="text-link" href="/cards">View card database →</Link>
        </div>
        <SpecialCardGallery artwork={homepageSpecialArtwork} />
        <p className="asset-credit">Official card artwork shown unmodified · Parallel art shares card text with its base card · ©Bushiroad ©PALWORLD</p>
      </section>

      <section className="product-section" data-reveal>
        <div className="shell product-grid">
          <div className="product-copy">
            <p className="eyebrow"><span>First booster set</span> · EBP01</p>
            <h2>Answer the call<br />of Palpagos.</h2>
            <p>Dawn of Palpagos introduces 100 base cards, four colors and alternate treatments built around the creatures, tools and survival systems of Palworld.</p>
            <div className="article-actions">
              <Link className="button primary" href="/blog/palworld-booster-box">Read the Booster Box guide <span>→</span></Link>
              <a className="button ghost" href="https://en.palworld-official-cardgame.com/products/bp01" target="_blank" rel="noreferrer">Official product page <span>↗</span></a>
            </div>
            <div className="product-collector-links" aria-label="Collector guides">
              <Link className="text-link" href="/blog/dawn-of-palpagos-chase-cards">View chase cards →</Link>
              <Link className="text-link" href="/blog/dawn-of-palpagos-pull-rates">Check pull rates →</Link>
            </div>
          </div>
          <div className="product-pack">
            <Image src="/media-kit/palworld-card-game-dawn-of-palpagos-booster-pack.webp" alt="Palworld Card Game Dawn of Palpagos BP01 booster pack" width={828} height={1713} loading="lazy" />
          </div>
          <div className="product-art">
            <Image src="/media-kit/palworld-card-game-official-card-back.webp" alt="Official Palworld Card Game card back design" width={607} height={849} loading="lazy" />
          </div>
        </div>
        <p className="asset-credit shell">Official promotional assets shown unmodified · ©Bushiroad ©PALWORLD</p>
      </section>

      <section className="section shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learn the game</p>
            <h2>Launch guides</h2>
          </div>
          <Link className="text-link" href="/blog">View all guides →</Link>
        </div>
        <div className="guide-grid">
          {guides.slice(0, 6).map((guide, index) => (
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

      <section className="official-banner shell" aria-label="Dawn of Palpagos official launch artwork" data-reveal>
        <Image src="/media-kit/palworld-card-game-dawn-of-palpagos-launch-artwork.webp" alt="Palworld Card Game Dawn of Palpagos official launch artwork" width={1440} height={810} loading="lazy" />
        <div className="official-banner-caption">
          <div><span>Official launch artwork</span><strong>Dawn of Palpagos</strong></div>
          <span>©Bushiroad ©PALWORLD</span>
        </div>
      </section>
    </>
  );
}
