import { notFound } from "next/navigation";
import Link from "next/link";
import { CardTile } from "@/components/CardTile";
import { cards, decks } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() { return decks.map((deck) => ({ slug: deck.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const deck = decks.find((item) => item.slug === slug);
  if (!deck) return {};
  return { title: `${deck.name} · Palworld TCG Strategy & Card Pool`, description: deck.description };
}

const deckPlans: Record<string, React.ReactNode> = {
  "red-blue-launch-pressure": (
    <>
      <h2>How Red / Blue wins games</h2>
      <p>Red converts Materials and card effects into direct Pal damage. Blue adds card flow, temporary resting effects and defensive Quick cards. The simple plan is to develop a Structure early, keep enough cards to answer attacks, then use a large Pal to turn resource advantage into pressure.</p>
      <h3>Opening turns</h3>
      <p>Stone Pit is the clean engine: assign a standing Pal to gain 3 Materials and draw a card. Your cheap Pals make that assignment easier. Avoid filling your opening hand with only cost 7 and 8 finishers; the deck wants something useful at costs 2, 3 or 4.</p>
      <h3>Middle game</h3>
      <p>Weapon Workbench spends Materials to deal 800 damage and gives all your Pals +1 Strike for the turn. Blue cards such as Elphidran Aqua and Single-Shot Sphere Launcher help replace cards, while Crystal Breath and Interrupt Pals make opposing attacks less certain.</p>
      <h3>Closing turns</h3>
      <p>Grizzbolt can attack standing Pals through Assault. Blazamut deals 1000 damage on deploy. Mammorest Cryst grows with your Structures. Pick the finisher that fits the board instead of playing the most expensive card automatically.</p>
    </>
  ),
  "green-blue-base-value": (
    <>
      <h2>How Green / Purple wins games</h2>
      <p>Green builds Ingredients, protects targets with Taunt and creates powerful combat turns. Purple adds Stealth attackers, direct removal and graveyard recovery. This deck rewards players who prefer setting up one strong turn over dealing small damage immediately.</p>
      <h3>Opening turns</h3>
      <p>Berry Plantation is the central engine: assign a Pal to gain 3 Ingredients and draw a card. Flopie creates two Ingredients when deployed, so early low-cost Pals can both develop your base and fuel later abilities.</p>
      <h3>Middle game</h3>
      <p>Campfire consumes Ingredients and an assigned Pal to gain life and give all your Pals +1000 Power for the turn. Green Taunt Pals protect more fragile threats. Purple answers include Hanging Trap, Strike from the Darkness and Interrupt Pals.</p>
      <h3>Closing turns</h3>
      <p>Felbat attacks through blockers with Stealth and gains life on attack. Astegon reduces Power and can remove every Pal at 300 Power or less when it attacks, including your own, so sequence the effect carefully.</p>
    </>
  ),
  "mono-red-pal-rush": (
    <>
      <h2>A safe first-deck process</h2>
      <ol>
        <li>Choose one or two colors and one clear plan: direct damage, Ingredients, Structures, or night/graveyard value.</li>
        <li>Add enough cost 2-4 cards to make your first turns playable.</li>
        <li>Choose a small number of expensive finishers instead of filling the deck with them.</li>
        <li>Add card draw or selection so the deck can keep functioning after its opening hand.</li>
        <li>Add interaction: Quick cards, Interrupt, damage, resting effects or removal.</li>
        <li>Play five games, record cards that stay unused in hand, and change only a few slots at a time.</li>
      </ol>
      <div className="callout"><strong>Launch-day rule:</strong> A popular card is not automatically correct for your list. Start with a coherent plan and use actual games to decide the final copies.</div>
    </>
  ),
};

export default async function DeckDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = decks.find((item) => item.slug === slug);
  if (!deck) notFound();
  const core = deck.core.map((cardSlug) => cards.find((card) => card.slug === cardSlug)).filter(Boolean);
  const pool = deck.cardPool.map((cardSlug) => cards.find((card) => card.slug === cardSlug)).filter(Boolean);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: `${deck.name} Palworld TCG Deck Guide`, description: deck.description, author: { "@type": "Organization", name: "Palworld Card Game Wiki" } }} />
      <header className="page-hero shell">
        <div className="color-pips">{deck.colors.map((color) => <span className={`pip ${color}`} key={color} />)}</div>
        <p className="eyebrow"><span>{deck.status}</span> · Updated {deck.updated}</p>
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
      </header>
      <article className="article-shell">
        <div className="verification-strip">
          <strong>{deck.status}</strong>
          <span>{deck.status === "Official Trial Deck" ? "Product and card facts are verified. Strategy is our plain-English editorial analysis." : "This is a testing framework, not a tournament result or meta ranking."}</span>
        </div>
        <h2>Cards that explain the plan</h2>
        <div className="card-grid listing">{core.map((card) => card && <CardTile card={card} key={card.slug} />)}</div>
        {deckPlans[deck.slug]}
        <h2>{deck.status === "Official Trial Deck" ? "All unique main-deck cards in this product" : "BP01 card pool"}</h2>
        {deck.status === "Official Trial Deck" && <p>The official card database lists the following 24 unique main-deck card entries. The sealed product is a fixed 50-card main deck plus 10 Soul cards; this table describes the unique card pool, not copy quantities.</p>}
        <div className="pool-table" role="table" aria-label={`${deck.name} card pool`}>
          {pool.map((card) => card && (
            <div className="pool-row" role="row" key={card.slug}>
              <span role="cell">{card.number}</span>
              <strong role="cell">{card.name}{card.subtitle ? ` — ${card.subtitle}` : ""}</strong>
              <span role="cell">{card.color} · {card.type} · Cost {card.cost}</span>
            </div>
          ))}
        </div>
        <div className="callout"><strong>Freshness note:</strong> The game launched on July 30, 2026. Tournament results are not yet mature enough for honest tier rankings; this page will be updated when official deck lists and meaningful event data appear.</div>
        <Link className="button primary" href="/tools/deck-builder">Customize in deck builder</Link>
        {" "}
        <a className="button ghost" href={deck.sourceUrl} target="_blank" rel="noreferrer">Check official source ↗</a>
      </article>
    </>
  );
}
