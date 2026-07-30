import Link from "next/link";
import { Card, getInitials } from "@/lib/data";

export function CardTile({ card }: { card: Card }) {
  return (
    <Link className="card-tile" href={`/card/${card.slug}`}>
      <div className={`card-art art-${card.color}`} data-initials={getInitials(card.name)} role="img" aria-label={`${card.name} — ${card.subtitle} (${card.number}, ${card.rarity}, ${card.color})`}>
        <span className="rarity">{card.rarity}</span>
      </div>
      <div className="card-meta">
        <h3>{card.name}</h3>
        <p>{card.number} · {card.color} · {card.type}</p>
      </div>
    </Link>
  );
}
