import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JapaneseCardTile } from "@/components/JapaneseCardTile";
import { JapaneseDeckGuide } from "@/components/JapaneseDeckGuide";
import { JsonLd } from "@/components/JsonLd";
import {
  getJapaneseCard,
  getJapaneseDeck,
  japaneseColorLabel,
  japaneseDecks,
} from "@/lib/japanese";
import { createBreadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return japaneseDecks.map((deck) => ({ slug: deck.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const deck = getJapaneseDeck(slug);
  if (!deck) return {};
  const imageCard = getJapaneseCard(deck.core[0]);

  return createPageMetadata({
    title: `${deck.japaneseName}｜デッキリスト・回し方`,
    description: `${deck.japaneseName}の特徴、主要カード、初心者向けの回し方${deck.recipe ? "、50枚のデッキレシピ" : "、収録カード一覧"}を日本語で紹介します。`,
    path: `/ja/deck/${deck.slug}`,
    absoluteTitle: true,
    type: "article",
    locale: "ja",
    image: imageCard ? {
      url: `${SITE_URL}${imageCard.image}`,
      width: 400,
      height: imageCard.type === "Structure" ? 286 : 559,
      alt: `${deck.japaneseName}の主要カード`,
    } : undefined,
  });
}

export default async function JapaneseDeckDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = getJapaneseDeck(slug);
  if (!deck) notFound();

  const core = deck.core.map((cardSlug) => {
    const card = getJapaneseCard(cardSlug);
    if (!card) throw new Error(`${deck.japaneseName} references missing core card ${cardSlug}`);
    return card;
  });
  const pool = deck.cardPool.map((cardSlug) => {
    const card = getJapaneseCard(cardSlug);
    if (!card) throw new Error(`${deck.japaneseName} references missing pool card ${cardSlug}`);
    return card;
  });
  const otherDecks = japaneseDecks.filter((item) => item.slug !== deck.slug);

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${deck.japaneseName} デッキリスト・回し方`,
          description: deck.japaneseDescription,
          inLanguage: "ja-JP",
          datePublished: deck.published,
          dateModified: deck.modified,
          mainEntityOfPage: `${SITE_URL}/ja/deck/${deck.slug}`,
          author: { "@type": "Organization", name: "Palworld Card Game Wiki", url: SITE_URL },
        },
        createBreadcrumbJsonLd([
          { name: "ホーム", path: "/ja" },
          { name: "デッキレシピ", path: "/ja/decks" },
          { name: deck.japaneseName, path: `/ja/deck/${deck.slug}` },
        ]),
      ]} />
      <header className="page-hero shell">
        <Breadcrumbs items={[
          { name: "ホーム", href: "/ja" },
          { name: "デッキレシピ", href: "/ja/decks" },
          { name: deck.japaneseName },
        ]} />
        <div className="color-pips">{deck.colors.map((color) => <span className={`pip ${color}`} key={color} />)}</div>
        <p className="eyebrow"><span>{deck.japaneseStatus}</span> · 初心者向けデッキガイド</p>
        <h1>{deck.japaneseName}</h1>
        <p>{deck.japaneseDescription}</p>
        {deck.status === "Official Trial Deck" ? <p><a className="text-link" href="#official-card-pool">収録カード一覧へ移動 →</a></p> : null}
      </header>

      <article className="article-shell">
        <div className="verification-strip">
          <strong>{deck.japaneseStatus}</strong>
          <span>{deck.status === "Official Trial Deck" ? "商品内容と収録カードは公式情報に基づいています。基本の回し方を初心者向けにわかりやすく解説します。" : "初心者がゲームの流れを覚えるための参考レシピです。公式大会の入賞デッキではありません。"}</span>
        </div>

        <div className="deck-at-a-glance" aria-label="デッキの特徴">
          <div><span>色</span><strong>{deck.colors.map(japaneseColorLabel).join(" ＋ ")}</strong></div>
          <div><span>戦い方</span><strong>{deck.japaneseArchetype}</strong></div>
          <div><span>おすすめ</span><strong>初心者</strong></div>
        </div>

        <h2>動きを覚える主要カード</h2>
        <p>まずはこの4枚の役割を確認すると、デッキ全体の狙いがつかみやすくなります。カードを押すと日本語の効果を読めます。</p>
        <div className="card-grid listing">
          {core.map((card) => <JapaneseCardTile card={card} key={card.slug} />)}
        </div>

        <JapaneseDeckGuide deck={deck} />

        {deck.status === "Official Trial Deck" ? (
          <section className="deck-guide-section" aria-labelledby="official-card-pool">
            <p className="eyebrow"><span>公式カードプール</span> · 24種類</p>
            <h2 id="official-card-pool">収録されるメインデッキカード</h2>
            <p>公式カードリストに掲載されている24種類です。商品には固定のメインデッキ50枚、ソウルカード10枚、差し替えのTSRまたはTSPカード1枚、BP01ブースターパック1個などが入っています。</p>
            <div className="pool-table" role="table" aria-label={`${deck.japaneseName} 収録カード`}>
              {pool.map((card) => (
                <Link className="pool-row" role="row" href={`/ja/card/${card.slug}`} key={card.slug}>
                  <span role="cell">{card.japaneseNumber}</span>
                  <strong role="cell">{card.name}</strong>
                  <span role="cell">{japaneseColorLabel(card.color)} · コスト {card.cost}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="article-actions">
          <Link className="button primary" href={deck.recipe ? `/ja/tools/deck-builder?deck=${deck.slug}` : "/ja/tools/deck-builder"}>{deck.recipe ? "この50枚をデッキビルダーで開く" : "デッキビルダーで作る"}</Link>
          <a className="button ghost" href={deck.japaneseSourceUrl} target="_blank" rel="noreferrer">公式商品情報を確認する ↗</a>
        </div>

        <section className="deck-next-steps" aria-labelledby="ja-keep-learning">
          <p className="eyebrow"><span>次に見る</span> · 対戦準備を進める</p>
          <h2 id="ja-keep-learning">ほかの攻略も確認</h2>
          <div>
            <Link href="/ja/rules"><span>初心者向け</span><strong>ルール・遊び方を見る →</strong></Link>
            <Link href="/ja/guide/deck-building-rules"><span>デッキ作り</span><strong>構築ルールを確認する →</strong></Link>
            {otherDecks.map((otherDeck) => (
              <Link href={`/ja/deck/${otherDeck.slug}`} key={otherDeck.slug}>
                <span>ほかのデッキ</span><strong>{otherDeck.japaneseName} →</strong>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
