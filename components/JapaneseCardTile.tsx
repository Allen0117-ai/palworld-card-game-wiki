import Image from "next/image";
import Link from "next/link";
import {
  getJapaneseCardImageAlt,
  japaneseColorLabel,
  japaneseTypeLabel,
  type JapaneseCard,
} from "@/lib/japanese";

export function JapaneseCardTile({ card }: { card: JapaneseCard }) {
  const isFoil = card.rarity === "RR";
  const isLandscape = card.type === "Structure";
  const className = `card-tile${isFoil ? " card-tile-foil" : ""}${isLandscape ? " card-tile-landscape" : ""}`;

  return (
    <article className={className}>
      <Link href={`/ja/card/${card.slug}`}>
        <div className="card-image-wrap">
          <Image
            className="card-image"
            src={card.image}
            alt={getJapaneseCardImageAlt(card)}
            width={400}
            height={isLandscape ? 286 : 559}
            loading="lazy"
          />
          {isFoil && <span className="card-foil" aria-hidden="true" />}
          <span className={`color-tab ${card.color}`}>{card.rarity}</span>
        </div>
        <div className="card-meta">
          <h3>{card.name}</h3>
          <p>{card.japaneseNumber} · {japaneseColorLabel(card.color)} · {japaneseTypeLabel(card.type)}</p>
        </div>
      </Link>
      <details className="card-rules">
        <summary>カード効果を読む</summary>
        <p>{card.ability || "このカードに効果テキストはありません。"}</p>
      </details>
      <Link className="card-guide-link" href={`/ja/card/${card.slug}`}>カード詳細を見る</Link>
    </article>
  );
}
