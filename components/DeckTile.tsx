import Link from "next/link";
import { Deck } from "@/lib/data";

export function DeckTile({ deck, rank }: { deck: Deck; rank: number }) {
  return (
    <Link href={`/deck/${deck.slug}`} className="deck-tile">
      <span className="deck-rank">0{rank}</span>
      <div className="deck-info">
        <div className="color-pips">{deck.colors.map((color) => <span className={`pip ${color}`} key={color} />)}</div>
        <h3>{deck.name}</h3>
        <p>{deck.archetype} · {deck.difficulty}</p>
      </div>
      <div className="deck-score"><strong>{deck.score}</strong><span>lab score</span></div>
    </Link>
  );
}
