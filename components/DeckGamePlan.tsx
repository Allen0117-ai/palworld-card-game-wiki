import Image from "next/image";
import Link from "next/link";
import { cardByNumber, Deck, getCardImageAlt } from "@/lib/data";

function cardsForNumbers(cardNumbers: string[]) {
  return cardNumbers.map((cardNumber) => {
    const card = cardByNumber(cardNumber);
    if (!card) throw new Error(`Deck guide references missing card ${cardNumber}`);
    return card;
  });
}

export function DeckGamePlan({ deck }: { deck: Deck }) {
  return (
    <>
      <section className="deck-guide-section" aria-labelledby="deck-game-plan">
        <p className="eyebrow"><span>Beginner walkthrough</span> · Follow the arrows</p>
        <h2 id="deck-game-plan">Play this deck in three steps</h2>
        <p className="deck-section-intro">You do not need to memorize every card. Learn the deck’s early engine, its middle turn and its finishing move first.</p>
        <div className="deck-plan-grid">
          {deck.gamePlan.map((planStep) => (
            <article className="deck-plan-step" key={planStep.step}>
              <span className="deck-plan-number">{planStep.step}</span>
              <div>
                <h3>{planStep.title}</h3>
                <p>{planStep.description}</p>
              </div>
              <div className="deck-plan-cards" aria-label={`Cards for ${planStep.title}`}>
                {cardsForNumbers(planStep.cardNumbers).map((card) => (
                  <Link className="deck-plan-card" href={`/card/${card.slug}`} key={card.slug}>
                    <Image
                      src={card.image}
                      alt={getCardImageAlt(card)}
                      width={400}
                      height={card.type === "Structure" ? 286 : 559}
                      sizes="(max-width: 520px) 34vw, 118px"
                      loading="lazy"
                    />
                    <span>{card.name}</span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="deck-guide-section" aria-labelledby="deck-combos">
        <p className="eyebrow"><span>Card pairings</span> · What works together</p>
        <h2 id="deck-combos">Three combinations to remember</h2>
        <div className="deck-combo-grid">
          {deck.combos.map((combo) => (
            <article className="deck-combo-card" key={combo.title}>
              <div className="deck-combo-images">
                {cardsForNumbers(combo.cardNumbers).map((card) => (
                  <Link href={`/card/${card.slug}`} key={card.slug} aria-label={`View ${card.name}`}>
                    <Image
                      src={card.image}
                      alt={getCardImageAlt(card)}
                      width={400}
                      height={card.type === "Structure" ? 286 : 559}
                      sizes="96px"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
              <h3>{combo.title}</h3>
              <p>{combo.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
