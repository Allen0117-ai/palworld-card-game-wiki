import Link from "next/link";
import { Card } from "@/lib/data";

export function CardTile({ card, enableTilt = false }: { card: Card; enableTilt?: boolean }) {
  const isFoil = card.rarity === "RR";

  return (
    <Link
      className={`card-tile${isFoil ? " card-tile-foil" : ""}`}
      href={`/card/${card.slug}`}
      data-tilt={enableTilt ? "" : undefined}
    >
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={card.image}
          alt={`${card.name} — ${card.subtitle}, ${card.number}`}
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
    </Link>
  );
}
