import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  getJapaneseCard,
  getJapaneseCardImageAlt,
  japaneseColorLabel,
  japaneseDecks,
} from "@/lib/japanese";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム デッキレシピ・回し方",
  description: "パルワールドカードゲームの日本語デッキレシピ。TD01レッド・ブルー、TD02グリーン・パープルと、BP01初心者向け50枚デッキの回し方を紹介します。",
  path: "/ja/decks",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

export default function JapaneseDecksPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "パルワールドカードゲーム デッキレシピ",
        inLanguage: "ja-JP",
        itemListElement: japaneseDecks.map((deck, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: deck.japaneseName,
          url: `https://palworldcardgame.wiki/ja/deck/${deck.slug}`,
        })),
      }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>初心者向けデッキ攻略</span> · カード画像つき</p>
        <h1>パルワールドカードゲーム<br />デッキレシピ</h1>
        <p>公式トライアルデッキ2種と、BP01の初心者向け50枚サンプルを掲載。最初に出すカード、中盤の動き、勝ちにつなげる攻め方を順番に確認できます。</p>
      </header>

      <section className="deck-explorer shell">
        <div className="deck-data-note">公式商品情報とカードデータを確認して掲載しています</div>
        <div className="deck-page-grid">
          {japaneseDecks.map((deck) => {
            const previewCards = deck.core.slice(0, 3).map((slug) => {
              const card = getJapaneseCard(slug);
              if (!card) throw new Error(`${deck.japaneseName} references missing card ${slug}`);
              return card;
            });

            return (
              <article className="deck-page-card" key={deck.slug}>
                <div className="deck-page-card-art" aria-hidden="true">
                  {previewCards.map((card) => (
                    <Image
                      src={card.image}
                      alt=""
                      width={400}
                      height={card.type === "Structure" ? 286 : 559}
                      key={card.slug}
                    />
                  ))}
                </div>
                <div className="color-pips">
                  {deck.colors.map((color) => <span className={`pip ${color}`} key={color} title={japaneseColorLabel(color)} />)}
                </div>
                <span className="source-badge">{deck.japaneseStatus}</span>
                <h2>{deck.japaneseName}</h2>
                <p>{deck.japaneseDescription}</p>
                <div className="deck-page-card-facts">
                  <span>{deck.colors.map(japaneseColorLabel).join("・")}</span>
                  <span>{deck.japaneseArchetype}</span>
                  <span>{deck.recipe ? "50枚レシピあり" : "カードプール掲載"}</span>
                </div>
                <Link className="text-link" href={`/ja/deck/${deck.slug}`}>回し方とカードを見る →</Link>
                <span className="sr-only">{previewCards.map(getJapaneseCardImageAlt).join("、")}</span>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
