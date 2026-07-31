import Image from "next/image";
import Link from "next/link";
import {
  getJapaneseCard,
  japaneseColorLabel,
  type JapaneseDeck,
} from "@/lib/japanese";

export function JapaneseDeckTile({ deck, rank }: { deck: JapaneseDeck; rank: number }) {
  const preview = deck.core.slice(0, 3).map((slug) => {
    const card = getJapaneseCard(slug);
    if (!card) throw new Error(`${deck.japaneseName} references missing card ${slug}`);
    return card;
  });

  return (
    <Link className="deck-tile" href={`/ja/deck/${deck.slug}`}>
      <span className="deck-rank">0{rank}</span>
      <span className="deck-tile-art" aria-hidden="true">
        {preview.map((card) => (
          <Image src={card.image} alt="" width={80} height={112} loading="lazy" key={card.slug} />
        ))}
      </span>
      <span className="deck-info">
        <span className="color-pips">
          {deck.colors.map((color) => <span className={`pip ${color}`} title={japaneseColorLabel(color)} key={color} />)}
        </span>
        <h3>{deck.japaneseName}</h3>
        <p>{deck.japaneseArchetype}</p>
        <span className="deck-best-for">{deck.japaneseDescription}</span>
        <span className="deck-tile-facts">
          <span>3ステップ解説</span>
          <span>{deck.recipe ? "50枚レシピ" : "公式カードプール"}</span>
        </span>
      </span>
      <span className="deck-score deck-status-badge">
        <strong>{deck.japaneseStatus}</strong>
        <em>詳細を見る →</em>
      </span>
    </Link>
  );
}
