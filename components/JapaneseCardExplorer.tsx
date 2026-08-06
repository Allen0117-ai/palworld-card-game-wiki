"use client";

import { useMemo, useState } from "react";
import {
  japaneseCards,
  japaneseColorLabel,
  japaneseTypeLabel,
} from "@/lib/japanese";
import { JapaneseCardTile } from "./JapaneseCardTile";
import { trackUserAction } from "@/lib/user-action-analytics";

const PAGE_SIZE = 24;
const cardColors = new Set(["red", "blue", "green", "purple", "colorless"]);
const cardTypes = new Set(["Pal", "Gear", "Event", "Structure"]);
const cardSets = new Set(["EBP01", "ETD01", "ETD02"]);

type JapaneseCardExplorerProps = {
  initialQuery?: string;
  initialColor?: string;
  initialSet?: string;
  initialType?: string;
};

export function JapaneseCardExplorer({ initialQuery = "", initialColor = "all", initialSet = "all", initialType = "all" }: JapaneseCardExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [color, setColor] = useState(cardColors.has(initialColor) ? initialColor : "all");
  const [type, setType] = useState(cardTypes.has(initialType) ? initialType : "all");
  const [cost, setCost] = useState("all");
  const [rarity, setRarity] = useState("all");
  const [lucky, setLucky] = useState("all");
  const [set, setSet] = useState(cardSets.has(initialSet) ? initialSet : "all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(() => japaneseCards.filter((card) => {
    const searchableText = `${card.name} ${card.englishName} ${card.japaneseNumber} ${card.number} ${card.ability}`.toLowerCase();
    return searchableText.includes(query.trim().toLowerCase())
      && (color === "all" || card.color === color)
      && (type === "all" || card.type === type)
      && (cost === "all" || card.cost === Number(cost))
      && (rarity === "all" || card.rarity === rarity)
      && (lucky === "all" || (lucky === "yes" ? card.subtype?.includes("Lucky") : !card.subtype?.includes("Lucky")))
      && (set === "all" || card.set === set);
  }), [query, color, type, cost, rarity, lucky, set]);

  const costs = [...new Set(japaneseCards.map((card) => card.cost))].sort((a, b) => a - b);
  const rarities = [...new Set(japaneseCards.map((card) => card.rarity))].sort();
  const visibleResults = results.slice(0, visibleCount);
  const resetPage = () => setVisibleCount(PAGE_SIZE);
  const trackFilter = (filter: string, value: string) => trackUserAction("card_filter", { locale: "ja", filter, value });

  return (
    <div className="page-layout shell">
      <aside className="filters" aria-label="カード絞り込み">
        <div className="filter-group">
          <label htmlFor="ja-card-search">カード検索</label>
          <input
            id="ja-card-search"
            className="input"
            value={query}
            onChange={(event) => { setQuery(event.target.value); resetPage(); }}
            onBlur={() => query.trim() && trackFilter("search", query.trim().slice(0, 60))}
            placeholder="カード名・効果・カード番号"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="ja-rarity-filter">レアリティ</label>
          <select id="ja-rarity-filter" className="select" value={rarity} onChange={(event) => { setRarity(event.target.value); resetPage(); trackFilter("rarity", event.target.value); }}>
            <option value="all">すべてのレアリティ</option>
            {rarities.map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="ja-lucky-filter">ラッキーアイコン</label>
          <select id="ja-lucky-filter" className="select" value={lucky} onChange={(event) => { setLucky(event.target.value); resetPage(); trackFilter("lucky", event.target.value); }}>
            <option value="all">すべてのカード</option>
            <option value="yes">ラッキーカード</option>
            <option value="no">ラッキーなし</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="ja-set-filter">収録セット</label>
          <select id="ja-set-filter" className="select" value={set} onChange={(event) => { setSet(event.target.value); resetPage(); trackFilter("set", event.target.value); }}>
            <option value="all">すべてのカード</option>
            <option value="EBP01">BP01 ブースターパック</option>
            <option value="ETD01">TD01 レッド・ブルー</option>
            <option value="ETD02">TD02 グリーン・パープル</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="ja-color-filter">色</label>
          <select id="ja-color-filter" className="select" value={color} onChange={(event) => { setColor(event.target.value); resetPage(); trackFilter("color", event.target.value); }}>
            <option value="all">すべての色</option>
            {["red", "blue", "green", "purple", "colorless"].map((value) => (
              <option value={value} key={value}>{japaneseColorLabel(value)}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="ja-type-filter">カードの種類</label>
          <select id="ja-type-filter" className="select" value={type} onChange={(event) => { setType(event.target.value); resetPage(); trackFilter("type", event.target.value); }}>
            <option value="all">すべての種類</option>
            {["Pal", "Gear", "Structure", "Event"].map((value) => (
              <option value={value} key={value}>{japaneseTypeLabel(value)}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="ja-cost-filter">コスト</label>
          <select id="ja-cost-filter" className="select" value={cost} onChange={(event) => { setCost(event.target.value); resetPage(); trackFilter("cost", event.target.value); }}>
            <option value="all">すべてのコスト</option>
            {costs.map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
        </div>
        <div className="filter-group" aria-live="polite">
          <strong>検索結果</strong>
          <span className="filter-count">{results.length} / {japaneseCards.length}</span>
        </div>
      </aside>
      <div>
        {results.length ? (
          <>
            <div id="ja-card-results" className="card-grid listing">
              {visibleResults.map((card) => <JapaneseCardTile card={card} key={card.slug} />)}
            </div>
            <div className="load-more">
              <p aria-live="polite">{results.length}枚中 {visibleResults.length}枚を表示</p>
              {visibleResults.length < results.length && (
                <button
                  className="button ghost"
                  type="button"
                  aria-controls="ja-card-results"
                  onClick={() => {
                    setVisibleCount((count) => Math.min(count + PAGE_SIZE, results.length));
                    trackUserAction("card_load_more", { locale: "ja", shown: visibleResults.length, results: results.length });
                  }}
                >
                  さらに{Math.min(PAGE_SIZE, results.length - visibleResults.length)}枚を見る
                </button>
              )}
            </div>
          </>
        ) : <div className="empty-state">条件に一致するカードがありません。</div>}
      </div>
    </div>
  );
}
