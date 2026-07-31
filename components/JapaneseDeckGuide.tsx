import Image from "next/image";
import Link from "next/link";
import {
  getJapaneseCardImageAlt,
  japaneseCards,
  type JapaneseDeck,
} from "@/lib/japanese";

function cardForNumber(cardNumber: string) {
  const card = japaneseCards.find((item) => item.number === cardNumber);
  if (!card) throw new Error(`Japanese deck guide references missing card ${cardNumber}`);
  return card;
}

export function JapaneseDeckGuide({ deck }: { deck: JapaneseDeck }) {
  const recipeCards = deck.recipe?.map((entry) => ({
    card: cardForNumber(entry.cardNumber),
    copies: entry.copies,
  }));

  return (
    <>
      <section className="deck-guide-section" aria-labelledby="ja-deck-game-plan">
        <p className="eyebrow"><span>初心者向け</span> · 3つの動きから覚える</p>
        <h2 id="ja-deck-game-plan">このデッキの基本的な回し方</h2>
        <p className="deck-section-intro">すべてのカードを暗記する必要はありません。序盤の準備、中盤の主力、最後の攻め方を先に覚えましょう。</p>
        <div className="deck-plan-grid">
          {deck.japaneseGamePlan.map((step, index) => (
            <article className="deck-plan-step" key={step.title}>
              <span className="deck-plan-number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="deck-plan-cards" aria-label={`${step.title}で使うカード`}>
                {step.cardNumbers.map(cardForNumber).map((card) => (
                  <Link className="deck-plan-card" href={`/ja/card/${card.slug}`} key={card.slug}>
                    <Image
                      src={card.image}
                      alt={getJapaneseCardImageAlt(card)}
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

      {recipeCards ? (
        <section className="deck-guide-section" aria-labelledby="ja-sample-deck-list">
          <p className="eyebrow"><span>サンプルレシピ</span> · メインデッキ50枚</p>
          <h2 id="ja-sample-deck-list">初心者向けデッキレシピ</h2>
          <p className="deck-section-intro">まずはこの50枚で数回遊び、使いにくかったカードを少しずつ入れ替えてください。別にソウルデッキ10枚が必要です。</p>
          <div className="deck-recipe-grid">
            {recipeCards.map(({ card, copies }) => (
              <article className="deck-recipe-card" key={card.slug}>
                <Link href={`/ja/card/${card.slug}`}>
                  <span className="deck-recipe-art">
                    <Image
                      src={card.image}
                      alt={getJapaneseCardImageAlt(card)}
                      width={400}
                      height={card.type === "Structure" ? 286 : 559}
                      sizes="(max-width: 520px) 38vw, 135px"
                      loading="lazy"
                    />
                    <strong aria-label={`${copies}枚`}>×{copies}</strong>
                  </span>
                  <span>{card.name}</span>
                  <small>{card.japaneseNumber} · コスト {card.cost}</small>
                </Link>
              </article>
            ))}
          </div>
          <div className="deck-recipe-summary">
            <strong>50枚</strong>
            <span>{recipeCards.length}種類</span>
            <span>赤・青</span>
          </div>
        </section>
      ) : null}
    </>
  );
}
