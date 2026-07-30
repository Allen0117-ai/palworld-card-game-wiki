import { notFound } from "next/navigation";
import Link from "next/link";
import { cards, decks } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() { return cards.map((card) => ({ slug: card.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = cards.find((item) => item.slug === slug);
  if (!card) return {};
  return {
    title: `${card.name} · Palworld TCG – ${card.rarity} ${card.color} Card Stats & Price`,
    description: `Stats and strategy for ${card.name} (${card.number}), a ${card.rarity} ${card.color} card from Dawn of Palpagos.`,
  };
}

export default async function CardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = cards.find((item) => item.slug === slug);
  if (!card) notFound();
  const relatedDecks = decks.filter((deck) => deck.core.includes(card.slug));

  return (
    <div className="detail-layout shell">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Thing", name: card.name, description: card.summary, identifier: card.number, additionalType: `Palworld TCG ${card.type} card` }} />
      <aside className="detail-art">
        <img src={card.image} alt={`${card.name} — ${card.subtitle}, ${card.number}`} width={400} height={559} />
        <p>Official card image · ©Bushiroad ©PALWORLD</p>
      </aside>
      <article className="detail-content">
        <p className="eyebrow"><span>{card.number}</span> · Dawn of Palpagos</p>
        <h1>{card.name}</h1>
        <div className="detail-tags"><span className="tag">{card.rarity}</span><span className="tag">{card.color}</span><span className="tag">{card.type}</span></div>
        <p className="hero-lede">{card.subtitle}. {card.summary}</p>
        <div className="stats-row">
          <div className="stat"><span>Cost</span><strong>{card.cost}</strong></div>
          <div className="stat"><span>Power</span><strong>{card.power || "—"}</strong></div>
          <div className="stat"><span>Strike</span><strong>{card.strike || "—"}</strong></div>
        </div>
        <section className="content-block">
          <h2>Official card text</h2>
          <p>{card.ability}</p>
        </section>
        <section className="content-block">
          <h2>Strategy snapshot</h2>
          <p>{card.summary} Start by testing two to four copies, then adjust once you know how often you want to see it in your opening and midgame hands.</p>
        </section>
        <section className="content-block">
          <h2>Decks using this card</h2>
          {relatedDecks.length ? <ul>{relatedDecks.map((deck) => <li key={deck.slug}><Link className="text-link" href={`/deck/${deck.slug}`}>{deck.name} →</Link></li>)}</ul> : <p>No featured launch deck uses this card yet. Try it in the deck builder.</p>}
          <Link className="button primary" href="/tools/deck-builder">Open deck builder</Link>
        </section>
        <section className="content-block">
          <h2>Price & availability</h2>
          <p>Verified market-price data is coming soon. We do not publish estimated prices without a reliable marketplace source.</p>
        </section>
      </article>
    </div>
  );
}
