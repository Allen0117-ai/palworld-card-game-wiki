import type { Metadata } from "next";
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
    </>
  );
}
