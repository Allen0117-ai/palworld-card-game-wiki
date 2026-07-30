import type { Card } from "@/lib/data";
import type { ReactNode } from "react";
import { CardAbilityText } from "./CardAbilityText";

type CardDetailsTableProps = {
  card: Card;
  displayNumber: string;
  displayRarity: string;
};

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="card-fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function CardDetailsTable({ card, displayNumber, displayRarity }: CardDetailsTableProps) {
  return (
    <dl className="card-fact-grid">
      <Fact label="Card type">{card.type}</Fact>
      {card.subtype && <Fact label="Subtype">{card.subtype}</Fact>}
      <Fact label="Color"><span className={`card-color-value color-${card.color}`}><i />{card.color}</span></Fact>
      <Fact label="Cost">{card.cost}</Fact>
      <Fact label={card.type === "Structure" ? "Durability" : "Power"}>{card.power ?? "—"}</Fact>
      <Fact label="Strike">{card.strike ?? "—"}</Fact>
      <Fact label="Element">
        <span className="card-chip-list">
          {card.elements.length ? card.elements.map((element) => <span className="card-chip" key={element}>{element}</span>) : "—"}
        </span>
      </Fact>
      <Fact label="Work suitability">
        <span className="card-chip-list">
          {card.workSuitability
            ? card.workSuitability.split("|").map((work) => <span className="card-chip" key={work}>{work}</span>)
            : "—"}
        </span>
      </Fact>
      <div className="card-fact card-fact-text">
        <dt>Card text</dt>
        <dd><CardAbilityText text={card.ability} /></dd>
      </div>
      <Fact label="Rarity">{displayRarity}</Fact>
      <Fact label="Card number">{displayNumber}</Fact>
      <div className="card-fact card-fact-set">
        <dt>Card set</dt>
        <dd>{card.setName}</dd>
      </div>
    </dl>
  );
}
