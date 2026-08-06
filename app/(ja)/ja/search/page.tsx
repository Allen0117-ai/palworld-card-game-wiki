import type { Metadata } from "next";
import Link from "next/link";
import { JapaneseSiteSearchResults } from "@/components/JapaneseSiteSearchResults";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム 検索｜カード・ルール・デッキ",
  description: "日本語カード148枚、公式Q&A、デッキレシピ、初心者向け攻略をまとめて検索できます。カード名、番号、効果、質問に対応。",
  path: "/ja/search",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

export default async function JapaneseSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const hasQuery = Boolean(q.trim());

  return (
    <>
      <header className={`page-hero search-page-hero shell${hasQuery ? " has-query" : ""}`}>
        <div className="search-query-desktop-copy">
          <p className="eyebrow"><span>サイト内検索</span> · カード・ルール・デッキ・攻略</p>
          <h1>メニューを探す前に、<br />答えを見つける。</h1>
          <p>日本語のカード名、カード番号、効果、ルールの質問、デッキ名、商品名を1つの検索欄から探せます。</p>
        </div>
        {hasQuery && <h1 className="search-query-mobile-title">検索結果</h1>}
      </header>
      <JapaneseSiteSearchResults initialQuery={q} />
      <section className="search-explainer shell" aria-labelledby="ja-search-explainer-title">
        <p className="eyebrow"><span>日本語Wiki検索</span> · わかる言葉から探す</p>
        <h2 id="ja-search-explainer-title">このサイトでは何を検索できますか？</h2>
        <p>カード名、カード番号、ルールの質問、デッキ名、商品名から探せます。カード詳細、公式裁定、デッキレシピ、初心者向け攻略へすぐ移動できます。</p>
        <div className="search-explainer-grid">
          <Link href="/ja/cards"><strong>カード</strong><span>日本語カード名、番号、色、種類、能力テキストから探せます。</span></Link>
          <Link href="/ja/rules"><strong>ルール</strong><span>初心者向けの説明と公式Q&amp;Aをまとめて確認できます。</span></Link>
          <Link href="/ja/decks"><strong>デッキ</strong><span>トライアルデッキと初心者向けレシピを開けます。</span></Link>
          <Link href="/ja/guides"><strong>攻略</strong><span>遊び方、構築ルール、商品比較などを検索できます。</span></Link>
        </div>
      </section>
    </>
  );
}
