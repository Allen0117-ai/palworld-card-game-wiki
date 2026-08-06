"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getJapaneseCardImageAlt,
  japaneseCards,
  japaneseColorLabel,
  japaneseDecks,
  japaneseTypeLabel,
} from "@/lib/japanese";
import { japaneseGuides } from "@/lib/japanese-guides";
import { japaneseRuleAnswers } from "@/lib/japanese-rules";
import { rankSearchItems, scoreSearchText } from "@/lib/search";

const searchablePages = [
  {
    href: "/ja/cards",
    label: "カードリスト",
    title: "パルワールドカードゲーム カードリスト",
    description: "日本語カード148枚を名前、番号、色、種類、効果から検索できます。",
    searchText: "カード カードリスト カード一覧 BP01 TD01 TD02 日本語",
  },
  {
    href: "/ja/rules",
    label: "ルール・Q&A",
    title: "パルワールドカードゲーム ルール・遊び方",
    description: "初心者向けの基本と公式日本語Q&Aを検索できます。",
    searchText: "ルール 遊び方 Q&A 裁定 攻撃 ターン デッキ構築",
  },
  {
    href: "/ja/decks",
    label: "デッキレシピ",
    title: "パルワールドカードゲーム デッキ例",
    description: "トライアルデッキと初心者向け50枚デッキを確認できます。",
    searchText: "デッキレシピ デッキ例 TD01 TD02 初心者 50枚",
  },
  {
    href: "/ja/guides",
    label: "攻略ガイド",
    title: "パルワールドカードゲーム 攻略ガイド",
    description: "遊び方、商品選び、カードの探し方を順番に読めます。",
    searchText: "攻略 ガイド 遊び方 商品 BP01 ボックス カードリスト",
  },
  {
    href: "/ja/tools/deck-builder",
    label: "無料ツール",
    title: "日本語デッキビルダー",
    description: "日本語カード148枚から、ルールに合う50枚デッキを作れます。",
    searchText: "デッキ 作る 組む デッキビルダー 50枚 ツール",
  },
  {
    href: "/ja/cards",
    label: "カードデータ",
    title: "BP01・TD01・TD02 日本語カードリスト",
    description: "カード名、番号、色、種類、コスト、効果で絞り込めます。",
    searchText: "カードリスト カード一覧 BP01 TD01 TD02 日本語",
  },
];

export function JapaneseSiteSearchResults({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim();

  const answerResults = useMemo(() => normalized ? rankSearchItems(
    japaneseRuleAnswers,
    normalized,
    (answer) => `${answer.question} ${answer.answer} ${answer.category} ${answer.searchTerms.join(" ")} ${answer.cardNumbers.join(" ")}`,
    (answer) => (answer.featured ? 18 : 0) + Math.min(60, scoreSearchText(normalized, answer.question) * 0.5),
  ).slice(0, 8) : [], [normalized]);

  const cardResults = useMemo(() => normalized ? rankSearchItems(
    japaneseCards,
    normalized,
    (card) => `${card.name} ${card.englishName} ${card.japaneseNumber} ${card.number} ${card.ability} ${japaneseColorLabel(card.color)} ${japaneseTypeLabel(card.type)} ${card.setName}`,
  ) : [], [normalized]);

  const guideResults = useMemo(() => normalized ? rankSearchItems(
    japaneseGuides,
    normalized,
    (guide) => `${guide.title} ${guide.description} ${guide.category} ${guide.keywords.join(" ")}`,
  ) : [], [normalized]);

  const deckResults = useMemo(() => normalized ? rankSearchItems(
    japaneseDecks,
    normalized,
    (deck) => `${deck.japaneseName} ${deck.japaneseDescription} ${deck.japaneseArchetype} ${deck.japaneseStatus}`,
  ) : [], [normalized]);

  const pageResults = useMemo(() => normalized ? rankSearchItems(
    searchablePages,
    normalized,
    (page) => `${page.title} ${page.description} ${page.searchText}`,
  ) : [], [normalized]);

  const hasResults = answerResults.length + cardResults.length + guideResults.length + deckResults.length + pageResults.length > 0;

  return (
    <div className="search-center shell">
      <form className="search-page-form" role="search" action="/ja/search">
        <label htmlFor="ja-site-search">カード・ルール・デッキ・攻略をまとめて検索</label>
        <div>
          <input id="ja-site-search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：最初のターンに攻撃できますか？" />
          <button type="submit">検索</button>
        </div>
      </form>

      {!normalized && (
        <div className="search-suggestions">
          <span>よく検索される言葉：</span>
          {["デッキは何枚？", "最初のターンに攻撃", "BP01", "クイック", "トライアルデッキ"].map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>
          ))}
        </div>
      )}

      {normalized && !hasResults && (
        <div className="search-empty">
          <strong>該当する情報が見つかりませんでした。</strong>
          <p>カード番号、カード名、または短い言葉に変えて検索してください。</p>
        </div>
      )}

      {normalized && answerResults.length > 0 && (
        <section className="search-group answer-search-group" aria-live="polite">
          <div className="search-group-heading"><h2>ルールの回答</h2><span>{answerResults.length}</span></div>
          <div className="direct-answer-list">
            {answerResults.map((answer, index) => (
              <article className="direct-answer" key={answer.id}>
                <span>{index === 0 ? "最も近い回答" : answer.category}</span>
                <h3>{answer.question}</h3>
                <p>{answer.answer}</p>
                <footer>
                  <a href={answer.sourceUrl} target="_blank" rel="noreferrer">{answer.sourceLabel} ↗</a>
                  {answer.guideUrl && <Link href={answer.guideUrl}>詳しい解説 →</Link>}
                </footer>
              </article>
            ))}
          </div>
          <Link className="text-link" href={`/ja/rules?q=${encodeURIComponent(normalized)}`}>ルール回答センターでもっと探す →</Link>
        </section>
      )}

      {normalized && pageResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>カード・ツール</h2><span>{pageResults.length}</span></div>
          <div className="search-result-list">
            {pageResults.map((page) => (
              <Link href={page.href} key={page.href}>
                <span>{page.label}</span><strong>{page.title}</strong><p>{page.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {normalized && guideResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>攻略ガイド</h2><span>{guideResults.length}</span></div>
          <div className="search-result-list">
            {guideResults.map((guide) => (
              <Link href={`/ja/guide/${guide.slug}`} key={guide.slug}>
                <span>{guide.category}</span><strong>{guide.title}</strong><p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {normalized && deckResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>デッキ</h2><span>{deckResults.length}</span></div>
          <div className="search-result-list">
            {deckResults.map((deck) => (
              <Link href={`/ja/deck/${deck.slug}`} key={deck.slug}>
                <span>{deck.japaneseStatus}</span><strong>{deck.japaneseName}</strong><p>{deck.japaneseDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {normalized && cardResults.length > 0 && (
        <section className="search-group">
          <div className="search-group-heading"><h2>カード</h2><span>{cardResults.length}</span></div>
          <div className="search-card-results">
            {cardResults.slice(0, 18).map((card) => (
              <Link href={`/ja/card/${card.slug}`} key={card.slug}>
                <Image src={card.image} alt={getJapaneseCardImageAlt(card)} width={80} height={112} loading="lazy" />
                <div><strong>{card.name}</strong><span>{card.japaneseNumber} · {japaneseColorLabel(card.color)} · {japaneseTypeLabel(card.type)}</span></div>
              </Link>
            ))}
          </div>
          {cardResults.length > 18 && <Link className="button ghost" href={`/ja/cards?q=${encodeURIComponent(normalized)}`}>カード結果をすべて見る</Link>}
        </section>
      )}
    </div>
  );
}
