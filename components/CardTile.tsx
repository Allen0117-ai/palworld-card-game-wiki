import Link from "next/link";
import { Card } from "@/lib/data";

export function CardTile({ card }: { card: Card }) {
  return (
    <Link className="card-tile" href={`/card/${card.slug}`}>
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={card.image}
          alt={`${card.name} — ${card.subtitle}, ${card.number}`}
          width={400}
          height={559}
          loading="lazy"
        />
        <span className={`color-tab ${card.color}`}>{card.rarity}</span>
      </div>
      <div className="card-meta">
        <h3>{card.name}</h3>
        <p>{card.number} · {card.color} · {card.type}</p>
      </div>
    </Link>
  );
}
