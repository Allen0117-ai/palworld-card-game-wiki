import type { ReactNode } from "react";
import {
  japaneseColorLabel,
  japaneseElementLabel,
  japaneseSubtypeLabel,
  japaneseTypeLabel,
  japaneseWorkLabel,
  type JapaneseCard,
} from "@/lib/japanese";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="card-fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function JapaneseCardDetailsTable({ card }: { card: JapaneseCard }) {
  return (
    <dl className="card-fact-grid">
      <Fact label="カードの種類">{japaneseTypeLabel(card.type)}</Fact>
      {card.subtype && <Fact label="サブタイプ">{japaneseSubtypeLabel(card.subtype)}</Fact>}
      <Fact label="色">
        <span className={`card-color-value color-${card.color}`}><i />{japaneseColorLabel(card.color)}</span>
      </Fact>
      <Fact label="コスト">{card.cost}</Fact>
      <Fact label={card.type === "Structure" ? "耐久力" : "戦闘力"}>{card.power ?? "—"}</Fact>
      <Fact label="打撃力">{card.strike ?? "—"}</Fact>
      <Fact label="属性">
        <span className="card-chip-list">
          {card.elements.length
            ? card.elements.map((element) => <span className="card-chip" key={element}>{japaneseElementLabel(element)}</span>)
            : "—"}
        </span>
      </Fact>
      <Fact label="仕事適性">
        <span className="card-chip-list">
          {card.workSuitability
            ? card.workSuitability.split("|").map((work) => <span className="card-chip" key={work}>{japaneseWorkLabel(work)}</span>)
            : "—"}
        </span>
      </Fact>
      <div className="card-fact card-fact-text">
        <dt>カード効果</dt>
        <dd className="ja-ability-text">
          {card.ability
            ? card.ability.split("\n").map((line, index) => <p key={`${index}-${line}`}>{line}</p>)
            : <p>このカードに効果テキストはありません。</p>}
        </dd>
      </div>
      <Fact label="レアリティ">{card.rarity}</Fact>
      <Fact label="カード番号">{card.japaneseNumber}</Fact>
      <div className="card-fact card-fact-set">
        <dt>収録セット</dt>
        <dd>{card.setName}</dd>
      </div>
    </dl>
  );
}
