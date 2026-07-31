import Image from "next/image";
import Link from "next/link";
import { cardByNumber, Deck, getCardImageAlt } from "@/lib/data";

export function DeckRecipe({ deck }: { deck: Deck }) {
  if (!deck.recipe) return null;

  const totalCards = deck.recipe.reduce((total, entry) => total + entry.copies, 0);
  if (totalCards !== 50) {
    throw new Error(`${deck.name} recipe has ${totalCards} cards instead of 50`);
  }

  const recipeCards = deck.recipe.map((entry) => {
    const card = cardByNumber(entry.cardNumber);
    if (!card) throw new Error(`${deck.name} recipe references missing card ${entry.cardNumber}`);
    return { card, copies: entry.copies };
  });

  return (
    <section className="deck-guide-section" aria-labelledby="sample-deck-list">
      <p className="eyebrow"><span>Copy-ready sample</span> · 50 Main Deck cards</p>
      <h2 id="sample-deck-list">Complete beginner deck list</h2>
      <p className="deck-section-intro">This is an editorial starting list, not an official tournament result. Copy it first, play five games, then change only a few cards at a time. Add the separate 10-card Soul Deck required by the rules.</p>
      <div className="deck-recipe-grid">
        {recipeCards.map(({ card, copies }) => (
          <article className="deck-recipe-card" key={card.slug}>
            <Link href={`/card/${card.slug}`}>
              <span className="deck-recipe-art">
                <Image
                  src={card.image}
                  alt={getCardImageAlt(card)}
                  width={400}
                  height={card.type === "Structure" ? 286 : 559}
                  sizes="(max-width: 520px) 38vw, 135px"
                  loading="lazy"
                />
                <strong aria-label={`${copies} copies`}>×{copies}</strong>
              </span>
              <span>{card.name}</span>
              <small>{card.number} · Cost {card.cost}</small>
            </Link>
          </article>
        ))}
      </div>
      <div className="deck-recipe-summary">
        <strong>{totalCards} cards</strong>
        <span>{recipeCards.length} unique cards</span>
        <span>Red / Blue</span>
      </div>
      <Link className="button primary" href={`/tools/deck-builder?deck=${deck.slug}`}>Open this list in deck builder</Link>
    </section>
  );
}
