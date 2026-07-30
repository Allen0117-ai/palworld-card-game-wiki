"use client";

import { useMemo, useState } from "react";
import { CardTile } from "./CardTile";
import { cards } from "@/lib/data";

export function CardExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [color, setColor] = useState("all");
  const [type, setType] = useState("all");
  const [cost, setCost] = useState("all");
  const [rarity, setRarity] = useState("all");

  const results = useMemo(() => cards.filter((card) => {
    const matchesQuery = `${card.name} ${card.subtitle} ${card.number}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery
      && (color === "all" || card.color === color)
      && (type === "all" || card.type === type)
      && (cost === "all" || card.cost === Number(cost))
      && (rarity === "all" || card.rarity === rarity);
  }), [query, color, type, cost, rarity]);

  return (
    <div className="page-layout shell">
      <aside className="filters" aria-label="Card filters">
        <div className="filter-group">
          <label htmlFor="card-search">Search cards</label>
          <input id="card-search" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name or card no." />
        </div>
        <div className="filter-group">
          <label htmlFor="color-filter">Color</label>
          <select id="color-filter" className="select" value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="all">All colors</option>
            <option value="red">Red</option><option value="blue">Blue</option><option value="green">Green</option>
            <option value="purple">Purple</option><option value="colorless">Colorless</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="type-filter">Card type</label>
          <select id="type-filter" className="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All types</option>
            <option value="Pal">Pal</option><option value="Gear">Gear</option><option value="Event">Event</option><option value="Structure">Structure</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="cost-filter">Cost</label>
          <select id="cost-filter" className="select" value={cost} onChange={(e) => setCost(e.target.value)}>
            <option value="all">All costs</option>
            {[2, 3, 6, 7, 8].map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="rarity-filter">Rarity</label>
          <select id="rarity-filter" className="select" value={rarity} onChange={(e) => setRarity(e.target.value)}>
            <option value="all">All rarities</option>
            <option value="RR">RR</option><option value="R">R</option>
          </select>
        </div>
        <div className="filter-group"><strong>Results</strong><span className="filter-count">{results.length}</span></div>
      </aside>
      <div>
        {results.length ? <div className="card-grid listing">{results.map((card) => <CardTile card={card} key={card.slug} />)}</div> : <div className="empty-state">No cards match those filters.</div>}
      </div>
    </div>
  );
}
