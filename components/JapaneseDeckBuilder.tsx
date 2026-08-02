"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getJapaneseCardImageAlt,
  japaneseCards,
  japaneseColorLabel,
  japaneseTypeLabel,
} from "@/lib/japanese";
import { encodeDeckList, normalizeStoredDeck, sanitizeDeckName, type DeckMap } from "@/lib/deck-share";
import { JAPANESE_DECK_DRAFT_STORAGE_KEY } from "@/lib/progress-storage";
import { trackUserAction } from "@/lib/user-action-analytics";

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
  const [isDeckPanelOpen, setIsDeckPanelOpen] = useState(false);
  const [openingHand, setOpeningHand] = useState<string[]>([]);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const total = Object.values(deck).reduce((sum, value) => sum + value, 0);
  const deckCards = japaneseCards.filter((card) => deck[card.slug]);
  const selectedColors = useMemo(
    () => new Set(deckCards.filter((card) => card.color !== "colorless").map((card) => card.color)),
    [deckCards],
  );
  const luckyCount = deckCards
    .filter((card) => card.subtype?.includes("Lucky"))
    .reduce((sum, card) => sum + (deck[card.slug] || 0), 0);
  const typeCounts = deckCards.reduce<Record<string, number>>((counts, card) => {
    counts[card.type] = (counts[card.type] || 0) + (deck[card.slug] || 0);
    return counts;
  }, {});
  const costCurve = deckCards.reduce<Record<number, number>>((counts, card) => {
    counts[card.cost] = (counts[card.cost] || 0) + (deck[card.slug] || 0);
    return counts;
  }, {});
  const highestCostCount = Math.max(1, ...Object.values(costCurve));
  const isLegalMainDeck = total === 50 && selectedColors.size <= 2 && luckyCount <= 8;
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

  useEffect(() => {
    if (!isDeckPanelOpen) return;
    mobileCloseButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDeckPanelOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isDeckPanelOpen]);

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
    if (card.subtype?.includes("Lucky") && luckyCount >= 8) {
      setNotice("ラッキーアイコンを持つカードは合計8枚までです。");
      return;
    }
    setDeck((current) => ({ ...current, [slug]: (current[slug] || 0) + 1 }));
    setOpeningHand([]);
    setNotice("");
    trackUserAction("deck_add_card", { locale: "ja", card: card.number, total: total + 1 });
  }

  function removeCard(slug: string) {
    setDeck((current) => {
      const next = { ...current };
      if ((next[slug] || 0) <= 1) delete next[slug];
      else next[slug] -= 1;
      return next;
    });
    setOpeningHand([]);
  }

  function saveDeck() {
    localStorage.setItem(JAPANESE_DECK_DRAFT_STORAGE_KEY, JSON.stringify({ version: 1, deck, name: deckName }));
    setNotice("この端末にデッキを保存しました。");
    trackUserAction("deck_save", { locale: "ja", total, legal: isLegalMainDeck });
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
        trackUserAction("share_complete", { kind: "deck", locale: "ja" });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setNotice("共有URLをコピーしました。");
        trackUserAction("share_copy_link", { kind: "deck", locale: "ja" });
      }
    } catch {
      setNotice("共有をキャンセルしました。");
    }
  }

  function drawOpeningHand() {
    if (total !== 50) {
      setNotice("メインデッキを50枚にしてから、最初の手札を確認してください。");
      return;
    }

    const shuffledCards = deckCards.flatMap((card) => Array.from(
      { length: deck[card.slug] || 0 },
      () => card.name,
    ));
    for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffledCards[index], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[index]];
    }
    setOpeningHand(shuffledCards.slice(0, 5));
    setNotice("最初の手札5枚です。もう一度押すと引き直せます。");
    trackUserAction("deck_test_hand", { locale: "ja", total });
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

      <aside id="ja-deck-summary" className={`deck-panel${isDeckPanelOpen ? " mobile-open" : ""}`}>
        <button ref={mobileCloseButtonRef} className="mobile-deck-close" type="button" onClick={() => setIsDeckPanelOpen(false)} aria-label="デッキ一覧を閉じる">×</button>
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
        <div className="deck-status"><span>{total} / 50枚</span><span>{selectedColors.size} / 2色</span><span>{luckyCount} / 8 ラッキー</span></div>
        <p className={`deck-legality${isLegalMainDeck ? " is-legal" : ""}`}>
          {isLegalMainDeck ? "メインデッキ完成 · プレイには別にソウルデッキ10枚が必要です。" : `あと${Math.max(0, 50 - total)}枚 · メインデッキのみ`}
        </p>
        {deckCards.length > 0 ? (
          <div className="deck-breakdown" aria-label="デッキ統計">
            <div className="deck-type-counts">
              {(["Pal", "Gear", "Event", "Structure"] as const).map((cardType) => (
                <span key={cardType}><strong>{typeCounts[cardType] || 0}</strong>{japaneseTypeLabel(cardType)}</span>
              ))}
            </div>
            <div className="deck-cost-curve" aria-label="コスト分布">
              {Array.from({ length: 11 }, (_, costValue) => (
                <span key={costValue} title={`コスト${costValue}：${costCurve[costValue] || 0}枚`}>
                  <i style={{ height: `${Math.max(4, ((costCurve[costValue] || 0) / highestCostCount) * 42)}px` }} />
                  <small>{costValue}</small>
                </span>
              ))}
            </div>
          </div>
        ) : null}
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
        {openingHand.length ? (
          <div className="opening-hand" aria-live="polite">
            <strong>最初の手札</strong>
            <ol>{openingHand.map((cardName, index) => <li key={`${cardName}-${index}`}>{cardName}</li>)}</ol>
          </div>
        ) : null}
        <div className="builder-actions">
          <button className="button primary" onClick={saveDeck}>この端末に保存</button>
          <button className="button ghost" onClick={drawOpeningHand} disabled={total !== 50}>最初の手札を試す</button>
          <button className="button ink" onClick={shareDeck} disabled={total === 0}>共有URLを作る</button>
          <button className="button ghost" onClick={loadDeck}>保存データを開く</button>
          <button className="button ghost" onClick={() => { setDeck({}); setOpeningHand([]); setNotice("デッキを空にしました。"); }}>すべて削除</button>
        </div>
        <p className="save-note" aria-live="polite">{notice}</p>
      </aside>
      {isDeckPanelOpen ? <button className="mobile-deck-backdrop" type="button" onClick={() => setIsDeckPanelOpen(false)} aria-label="デッキ一覧を閉じる" /> : null}
      <button
        className="mobile-deck-bar"
        type="button"
        aria-controls="ja-deck-summary"
        aria-expanded={isDeckPanelOpen}
        onClick={() => {
          setIsDeckPanelOpen(true);
          trackUserAction("deck_open_summary", { locale: "ja", total, colors: selectedColors.size });
        }}
      >
        <span><strong>{total}/50</strong> 枚</span>
        <span><strong>{selectedColors.size}/2</strong> 色</span>
        <span>デッキを見る ↑</span>
      </button>
    </div>
  );
}
