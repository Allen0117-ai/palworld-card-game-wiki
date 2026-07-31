import Link from "next/link";
import Image from "next/image";
import { cards, Deck, getCardImageAlt } from "@/lib/data";

export function DeckTile({ deck, rank }: { deck: Deck; rank: number }) {
  const previewCards = deck.core.slice(0, 3).map((cardSlug) => {
    const card = cards.find((item) => item.slug === cardSlug);
    if (!card) throw new Error(`${deck.name} references missing homepage card ${cardSlug}`);
    return card;
  });

  return (
    <Link href={`/deck/${deck.slug}`} className="deck-tile">
      <span className="deck-rank">0{rank}</span>
      <span className="deck-tile-art" aria-label={`${deck.name} card preview`}>
        {previewCards.map((card) => (
          <Image
            src={card.image}
            alt={getCardImageAlt(card)}
            width={400}
            height={card.type === "Structure" ? 286 : 559}
            sizes="72px"
            loading="lazy"
            key={card.slug}
          />
        ))}
      </span>
      <div className="deck-info">
        <div className="color-pips">{deck.colors.map((color) => <span className={`pip ${color}`} key={color} />)}</div>
        <h3>{deck.name}</h3>
        <p>{deck.archetype} · {deck.difficulty}</p>
        <span className="deck-best-for">{deck.bestFor}</span>
        <span className="deck-tile-facts">
          <span className="deck-fact-secondary">3-step plan</span>
          <span className="deck-fact-secondary">3 visual combos</span>
          <span className="deck-fact-primary">{deck.recipe ? "Complete 50-card list" : "Verified 24-card pool"}</span>
        </span>
      </div>
      <span className="deck-score deck-status-badge">
        <strong>{deck.status === "Official Trial Deck" ? "OFFICIAL" : "STARTER"}</strong>
        <span>{deck.updated}</span>
        <em>Open guide →</em>
      </span>
    </Link>
  );
}
