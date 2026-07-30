import Link from "next/link";
import Image from "next/image";
import { Card, getCardImageAlt } from "@/lib/data";

export function CardTile({ card, enableTilt = false }: { card: Card; enableTilt?: boolean }) {
  const isFoil = card.rarity === "RR";
  const className = `card-tile${isFoil ? " card-tile-foil" : ""}`;
  const cardPreview = (
    <>
      <div className="card-image-wrap">
        <Image
          className="card-image"
          src={card.image}
          alt={getCardImageAlt(card)}
          width={400}
          height={559}
          loading="lazy"
        />
        {isFoil && <span className="card-foil" aria-hidden="true" />}
        <span className={`color-tab ${card.color}`}>{card.rarity}</span>
      </div>
      <div className="card-meta">
        <h3>{card.name}</h3>
        <p>{card.number} · {card.color} · {card.type}</p>
      </div>
    </>
  );

  return (
    <article className={className} data-tilt={enableTilt ? "" : undefined}>
      <Link href={`/card/${card.slug}`}>
        {cardPreview}
      </Link>
      <details className="card-rules">
        <summary>Read card text</summary>
        <p>{card.ability || "This card has no printed ability text."}</p>
      </details>
      <Link className="card-guide-link" href={`/card/${card.slug}`}>
        {card.hasGuide ? "View card guide" : "View card details"}
      </Link>
    </article>
  );
}
