import type { Metadata } from "next";
import Link from "next/link";
import { JapaneseDeckBuilder } from "@/components/JapaneseDeckBuilder";
import { JsonLd } from "@/components/JsonLd";
import { cardByNumber } from "@/lib/data";
import { decodeDeckList, sanitizeDeckName } from "@/lib/deck-share";
import { japaneseDecks } from "@/lib/japanese";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

type SearchParams = Promise<{ deck?: string; list?: string; name?: string; resume?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { list, name } = await searchParams;
  const sharedDeck = decodeDeckList(list);
  const cardCount = Object.values(sharedDeck).reduce((sum, copies) => sum + copies, 0);
  const deckName = sanitizeDeckName(name, "共有されたデッキ");
  return createPageMetadata({
    title: cardCount ? `${deckName}｜パルワールドカードゲーム デッキ` : "パルワールドカードゲーム デッキビルダー｜日本語カード対応",
    description: cardCount
      ? `${deckName}の${cardCount}枚デッキを開き、カードを入れ替えて自分のデッキとして保存・共有できます。`
      : "BP01・TD01・TD02の日本語カード148枚に対応。50枚、同名4枚、2色までのルールを確認しながら無料でデッキを作れます。",
    path: "/ja/tools/deck-builder",
    absoluteTitle: true,
    locale: "ja",
    image: JAPANESE_SOCIAL_IMAGE,
  });
}

export default async function JapaneseDeckBuilderPage({ searchParams }: { searchParams: SearchParams }) {
  const { deck: requestedDeckSlug, list: sharedDeckCode, name: sharedDeckName, resume } = await searchParams;
  const starterDeck = japaneseDecks.find((deck) => deck.slug === requestedDeckSlug && deck.recipe);
  const starterDeckList = Object.fromEntries((starterDeck?.recipe || []).map((entry) => {
    const card = cardByNumber(entry.cardNumber);
    if (!card) throw new Error(`${starterDeck?.japaneseName} references missing card ${entry.cardNumber}`);
    return [card.slug, entry.copies];
  }));
  const sharedDeck = decodeDeckList(sharedDeckCode);
  const hasSharedDeck = Object.keys(sharedDeck).length > 0;
  const initialDeck = hasSharedDeck ? sharedDeck : starterDeckList;
  const initialName = hasSharedDeck
    ? sanitizeDeckName(sharedDeckName, "共有されたデッキ")
    : starterDeck?.japaneseName;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "パルワールドカードゲーム 日本語デッキビルダー",
        url: "https://palworldcardgame.wiki/ja/tools/deck-builder",
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        inLanguage: "ja-JP",
        offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
      }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>無料デッキ作成ツール</span> · 登録不要</p>
        <h1>日本語カードで、<br />そのままデッキを作る。</h1>
        <p>BP01・TD01・TD02の全148枚に対応。50枚、同名4枚、2色までの条件を確認しながら、保存・共有できます。</p>
        {hasSharedDeck && <p className="builder-template-note">共有されたデッキを読み込みました。<strong>変更して、自分のデッキとして共有できます。</strong></p>}
        {!hasSharedDeck && starterDeck && <p className="builder-template-note">サンプルを読み込みました：<strong>{starterDeck.japaneseName}</strong></p>}
        {!hasSharedDeck && !starterDeck && <p><Link className="text-link" href="/ja/deck/mono-red-pal-rush">初心者向け50枚サンプルから始める →</Link></p>}
        <p><Link className="text-link" href="/ja/guide/deck-building-rules">先にデッキ構築ルールを確認する →</Link></p>
      </header>
      <JapaneseDeckBuilder
        initialDeck={initialDeck}
        initialName={initialName}
        isSharedDeck={hasSharedDeck}
        resumeSavedDraft={!hasSharedDeck && !starterDeck && resume === "1"}
      />
    </>
  );
}
