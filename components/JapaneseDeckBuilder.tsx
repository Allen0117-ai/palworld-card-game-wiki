"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  getJapaneseCardImageAlt,
  japaneseCards,
  japaneseColorLabel,
  japaneseTypeLabel,
} from "@/lib/japanese";
import { encodeDeckList, normalizeStoredDeck, sanitizeDeckName, type DeckMap } from "@/lib/deck-share";
import { JAPANESE_DECK_DRAFT_STORAGE_KEY } from "@/lib/progress-storage";

function readJapaneseSavedDraft() {
  const savedDraft = localStorage.getItem(JAPANESE_DECK_DRAFT_STORAGE_KEY);
  if (!savedDraft) return null;

  const parsedDraft: unknown = JSON.parse(savedDraft);
  const storedDeck = parsedDraft && typeof parsedDraft === "object" && "deck" in parsedDraft
    ? normalizeStoredDeck(parsedDraft.deck)
    : normalizeStoredDeck(parsedDraft);
  if (!storedDeck) return null;

  const storedName = parsedDraft && typeof parsedDraft === "object" && "name" in parsedDraft && typeof parsedDraft.name === "string"
    ? sanitizeDeckName(parsedDraft.name, "無題のデッキ")
    : "無題のデッキ";
  return { deck: storedDeck, name: storedName };
}

export function JapaneseDeckBuilder({
  initialDeck = {},
  initialName = "無題のデッキ",
  isSharedDeck = false,
  resumeSavedDraft = false,
}: {
  initialDeck?: DeckMap;
  initialName?: string;
  isSharedDeck?: boolean;
  resumeSavedDraft?: boolean;
}) {
  const [deck, setDeck] = useState<DeckMap>(initialDeck);
  const [deckName, setDeckName] = useState(() => sanitizeDeckName(initialName, "無題のデッキ"));
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const [set, setSet] = useState("all");
  const [notice, setNotice] = useState(isSharedDeck ? "共有されたデッキを読み込みました。自由に変更して自分のデッキにできます。" : "");
  const total = Object.values(deck).reduce((sum, value) => sum + value, 0);
  const deckCards = japaneseCards.filter((card) => deck[card.slug]);
  const selectedColors = useMemo(
    () => new Set(deckCards.filter((card) => card.color !== "colorless").map((card) => card.color)),
    [deckCards],
  );
  const visible = japaneseCards.filter((card) => (
    `${card.name} ${card.englishName} ${card.japaneseNumber} ${card.number} ${card.ability}`.toLowerCase().includes(query.toLowerCase())
    && (color === "all" || card.color === color)
    && (set === "all" || card.set === set)
  ));

  useEffect(() => {
    if (!resumeSavedDraft) return;
    const resumeTimer = window.setTimeout(() => {
      try {
        const savedDraft = readJapaneseSavedDraft();
        if (!savedDraft) {
          setNotice("保存されたデッキはまだありません。");
          return;
        }
        setDeck(savedDraft.deck);
        setDeckName(savedDraft.name);
        setNotice("保存したデッキの続きを開きました。");
      } catch {
        setNotice("保存データを読み込めませんでした。新しいデッキを作成してください。");
      }
    }, 0);

    return () => window.clearTimeout(resumeTimer);
  }, [resumeSavedDraft]);

  function addCard(slug: string) {
    const card = japaneseCards.find((item) => item.slug === slug);
    if (!card || total >= 50) return;
    const copiesWithSameName = deckCards
      .filter((item) => item.name === card.name)
      .reduce((sum, item) => sum + (deck[item.slug] || 0), 0);
    if (copiesWithSameName >= 4) {
      setNotice("同じカード名は合計4枚までです。");
      return;
    }
    if (card.color !== "colorless" && !selectedColors.has(card.color) && selectedColors.size >= 2) {
      setNotice("メインデッキに入れられる色は2色までです。");
      return;
    }
    setDeck((current) => ({ ...current, [slug]: (current[slug] || 0) + 1 }));
    setNotice("");
  }

  function removeCard(slug: string) {
    setDeck((current) => {
      const next = { ...current };
      if ((next[slug] || 0) <= 1) delete next[slug];
      else next[slug] -= 1;
      return next;
    });
  }

  function saveDeck() {
    localStorage.setItem(JAPANESE_DECK_DRAFT_STORAGE_KEY, JSON.stringify({ version: 1, deck, name: deckName }));
    setNotice("この端末にデッキを保存しました。");
  }

  function loadDeck() {
    try {
      const savedDraft = readJapaneseSavedDraft();
      if (!savedDraft) {
        setNotice("保存データを読み込めませんでした。");
        return;
      }
      setDeck(savedDraft.deck);
      setDeckName(savedDraft.name);
      setNotice("保存したデッキを読み込みました。");
    } catch {
      setNotice("保存データを読み込めませんでした。");
    }
  }

  async function shareDeck() {
    if (!total) return;
    const encoded = encodeDeckList(deck);
    const parameters = new URLSearchParams({ list: encoded, name: deckName });
    const sharePath = `/ja/tools/deck-builder?${parameters.toString()}`;
    const shareUrl = `${window.location.origin}${sharePath}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: deckName,
          text: `パルワールドカードゲームの「${deckName}」を共有します。`,
          url: shareUrl,
        });
        setNotice("デッキを共有しました。");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setNotice("共有URLをコピーしました。");
      }
    } catch {
      setNotice("共有をキャンセルしました。");
    }
  }

  return (
    <div className="builder-layout shell">
      <section className="builder-panel">
        <div className="builder-toolbar">
          <input className="input" aria-label="カードを検索" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="カード名・番号・効果で検索" />
          <select className="select" aria-label="色で絞り込む" value={color} onChange={(event) => setColor(event.target.value)}>
            <option value="all">すべての色</option>
            <option value="red">赤</option><option value="blue">青</option>
            <option value="green">緑</option><option value="purple">紫</option><option value="colorless">無色</option>
          </select>
          <select className="select" aria-label="商品で絞り込む" value={set} onChange={(event) => setSet(event.target.value)}>
            <option value="all">全148枚</option>
            <option value="EBP01">BP01</option>
            <option value="ETD01">TD01 レッド・ブルー</option>
            <option value="ETD02">TD02 グリーン・パープル</option>
          </select>
        </div>
        <p className="builder-result-count">{visible.length}枚を表示 · 公式日本語カード情報 · 2026年7月30日更新</p>
        <div className="builder-card-list">
          {visible.map((card) => (
            <button className="builder-card" key={card.slug} onClick={() => addCard(card.slug)} aria-label={`${card.name}を追加`}>
              <span className={`builder-art${card.type === "Structure" ? " builder-art-landscape" : ""}`}>
                <Image src={card.image} alt={getJapaneseCardImageAlt(card)} width={400} height={card.type === "Structure" ? 286 : 559} loading="lazy" />
              </span>
              <strong>{card.name}</strong>
              <small>{card.japaneseNumber} · {japaneseTypeLabel(card.type)} · コスト{card.cost}</small>
            </button>
          ))}
        </div>
      </section>

      <aside className="deck-panel">
        <p className="eyebrow">メインデッキ</p>
        <input
          className="deck-name-input"
          value={deckName}
          onChange={(event) => setDeckName(sanitizeDeckName(event.target.value, ""))}
          onBlur={() => setDeckName((currentName) => sanitizeDeckName(currentName, "無題のデッキ"))}
          aria-label="デッキ名"
          maxLength={52}
        />
        <div className="deck-progress"><span style={{ width: `${Math.min(total / 50 * 100, 100)}%` }} /></div>
        <div className="deck-status"><span>{total} / 50枚</span><span>{selectedColors.size} / 2色</span></div>
        <div className="deck-rows" aria-label="追加したカード">
          {deckCards.length === 0 && <div className="empty-state">カードを押すとデッキに追加できます。</div>}
          {deckCards.map((card) => (
            <div className="deck-row" key={card.slug}>
              <div><strong>{card.name}</strong><br /><small>{japaneseColorLabel(card.color)} · コスト{card.cost}</small></div>
              <div className="qty-controls">
                <button onClick={() => removeCard(card.slug)} aria-label={`${card.name}を1枚減らす`}>−</button>
                <span>{deck[card.slug]}</span>
                <button onClick={() => addCard(card.slug)} aria-label={`${card.name}を1枚増やす`}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="builder-actions">
          <button className="button primary" onClick={saveDeck}>この端末に保存</button>
          <button className="button ink" onClick={shareDeck} disabled={total === 0}>共有URLを作る</button>
          <button className="button ghost" onClick={loadDeck}>保存データを開く</button>
          <button className="button ghost" onClick={() => { setDeck({}); setNotice("デッキを空にしました。"); }}>すべて削除</button>
        </div>
        <p className="save-note" aria-live="polite">{notice}</p>
      </aside>
    </div>
  );
}
