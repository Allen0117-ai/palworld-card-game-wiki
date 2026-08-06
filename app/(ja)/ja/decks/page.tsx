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
import { HubLinkGrid } from "@/components/HubLinkGrid";

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
        <p>公式トライアルデッキ2種と、BP01の初心者向け50枚デッキを掲載。最初に出すカード、中盤の動き、勝ちにつなげる攻め方を順番に確認できます。</p>
        <div className="article-actions">
          <Link className="button primary" href="/ja/tools/deck-builder">デッキを作る</Link>
          <Link className="button ghost" href="/ja/guide/deck-building-rules">構築ルールを見る</Link>
        </div>
      </header>

      <section className="deck-explorer shell">
        <div className="deck-data-note">商品内容とカード情報は、公式発表に基づいて掲載しています</div>
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

      <section className="section shell split-section ja-deck-choice">
        <div>
          <p className="eyebrow"><span>最初の1個を選ぶ</span> · TD01 / TD02</p>
          <h2>攻めるか、整えて勝つか。</h2>
          <p className="deck-home-intro">レッド・ブルーは素材と建築物から直接的な攻めへつなぎます。グリーン・パープルは食材、回復、隠密を使い、順番を考えて有利を広げます。</p>
          <div className="article-actions">
            <Link className="button primary" href="/ja/guide/trial-deck-comparison">2つを詳しく比較する</Link>
          </div>
        </div>
        <aside className="builder-promo">
          <div className="builder-promo-top"><span className="mini-label">日本語カード対応</span><span className="tool-mark">50</span></div>
          <h3>レシピを見たら、<br />自分の50枚へ。</h3>
          <p>カードを入れ替えながら、2色と同名4枚の条件を確認。完成したデッキは端末に保存して共有できます。</p>
          <Link className="button ink" href="/ja/tools/deck-builder">デッキビルダーを開く ↗</Link>
        </aside>
      </section>
      <div className="shell section">
        <HubLinkGrid
          eyebrow="次にすること"
          title="デッキ例を、自分の50枚に変える。"
          intro="構築ルールを確認してから、カードを探すかデッキビルダーで入れ替えてみましょう。"
          items={[
            { href: "/ja/guide/deck-building-rules", label: "構築ルール", title: "枚数と条件を確認", description: "50枚、2色、同名4枚、ラッキー8枚を確認できます。" },
            { href: "/ja/tools/deck-builder", label: "無料ツール", title: "自分のデッキを作る", description: "カードを入れ替えながら条件を確認できます。" },
            { href: "/ja/cards", label: "カードリスト", title: "入れたいカードを探す", description: "カード名、番号、色、効果から検索できます。" },
          ]}
        />
      </div>
    </>
  );
}
