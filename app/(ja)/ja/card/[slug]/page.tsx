import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { CardMagnifier } from "@/components/CardMagnifier";
import { JapaneseCardDetailsTable } from "@/components/JapaneseCardDetailsTable";
import { JapaneseRecentCardTracker } from "@/components/JapaneseRecentCardTracker";
import { JsonLd } from "@/components/JsonLd";
import {
  getJapaneseCard,
  getJapaneseCardImageAlt,
  japaneseCards,
  japaneseColorLabel,
  japaneseTypeLabel,
} from "@/lib/japanese";
import { getJapaneseCardStrategy } from "@/lib/japanese-card-strategy";
import { createBreadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return japaneseCards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = getJapaneseCard(slug);
  if (!card) return {};

  return createPageMetadata({
    title: `${card.name}｜${card.japaneseNumber} カード効果・収録情報`,
    description: `${card.name}（${card.japaneseNumber}）のカード効果、使い方、採用枚数、コスト、戦闘力、レアリティ、収録セットを掲載。`,
    path: `/ja/card/${card.slug}`,
    absoluteTitle: true,
    locale: "ja",
    image: {
      url: `${SITE_URL}${card.image}`,
      width: 400,
      height: card.type === "Structure" ? 286 : 559,
      alt: getJapaneseCardImageAlt(card),
    },
  });
}

export default async function JapaneseCardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getJapaneseCard(slug);
  if (!card) notFound();
  const strategy = getJapaneseCardStrategy(card);

  const relatedCards = japaneseCards
    .filter((item) => item.slug !== card.slug && item.color === card.color && item.type === card.type)
    .slice(0, 4);

  return (
    <>
      <JapaneseRecentCardTracker slug={card.slug} name={card.name} number={card.japaneseNumber} />
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Thing",
          name: card.name,
          alternateName: card.englishName,
          description: `${card.name}（${card.japaneseNumber}）のカード情報`,
          identifier: card.japaneseNumber,
          inLanguage: "ja-JP",
          image: `${SITE_URL}${card.image}`,
          additionalType: `パルワールドカードゲーム ${japaneseTypeLabel(card.type)}カード`,
        },
        createBreadcrumbJsonLd([
          { name: "ホーム", path: "/ja" },
          { name: "カードリスト", path: "/ja/cards" },
          { name: card.name, path: `/ja/card/${card.slug}` },
        ]),
      ]} />
      <div className="detail-breadcrumb-shell shell">
        <Breadcrumbs items={[
          { name: "ホーム", href: "/ja" },
          { name: "カードリスト", href: "/ja/cards" },
          { name: card.name },
        ]} />
      </div>
      <div className="detail-layout shell">
        <figure className="detail-art">
          <CardMagnifier
            src={card.image}
            alt={`${getJapaneseCardImageAlt(card)} 詳細画像`}
            hintLabel="動かして拡大"
            isFoil={card.rarity === "RR"}
            isLandscape={card.type === "Structure"}
          />
          <figcaption>{card.japaneseNumber} · カード画像 ©Bushiroad ©PALWORLD</figcaption>
        </figure>
        <article className="detail-content">
          <section className="card-data-panel">
            <p className="eyebrow"><span>{card.japaneseNumber}</span> · 日本語版カード情報</p>
            <h1>{card.name}</h1>
            <p className="card-data-summary">
              {japaneseColorLabel(card.color)}・{japaneseTypeLabel(card.type)}カード。カード効果と収録情報をまとめています。
            </p>
            <JapaneseCardDetailsTable card={card} />
          </section>
          <ContentFreshnessPanel
            locale="ja"
            updated="2026-08-07"
            verified="2026-08-07"
            sourceStatus="公式日本語カードリスト＋編集部による使い方分析"
            summary={`${card.name}の公式カード情報に、デッキでの役割、採用枚数と使い方を追加しました。`}
          />

          <section className="content-block">
            <h2>{card.name}のカード効果</h2>
            <p>{card.ability || "このカードに効果テキストはありません。"}</p>
            <p>実際の対戦では、最新の総合ルールと公式Q&amp;Aもあわせて確認してください。</p>
            <div className="article-actions">
              <Link className="text-link" href={`/ja/rules?q=${encodeURIComponent(card.japaneseNumber)}`}>このカードの公式Q&amp;Aを探す →</Link>
              <Link className="text-link" href={`/ja/tools/deck-builder?card=${card.slug}`} data-analytics-event="card_to_builder" data-analytics-label={card.japaneseNumber}>このカードをデッキに入れる →</Link>
            </div>
          </section>

          <section className="content-block">
            <h2>{card.name}の使い方・採用枚数</h2>
            <p>{strategy.overview}</p>
            <div className="comparison-table" role="region" aria-label={`${card.name}のデッキ採用ガイド`} tabIndex={0}>
              <div className="comparison-head"><span>確認点</span><strong>おすすめ</strong><strong>理由</strong></div>
              <div><span>合うデッキ</span><p>{strategy.bestIn}</p><p>カードの色と効果を、デッキの中心となる動きに合わせます。</p></div>
              <div><span>採用枚数</span><p>{strategy.suggestedCopies}</p><p>初手と中盤で使えた回数を記録し、実戦後に調整します。</p></div>
            </div>
            <h3>{card.name}を使う3ステップ</h3>
            <ol>{strategy.playPattern.map((step) => <li key={step}>{step}</li>)}</ol>
            <div className="callout"><strong>注意点：</strong>{strategy.watchFor}</div>
          </section>

          <section className="content-block">
            <h2>同じ色・種類の関連カード</h2>
            <p>{japaneseColorLabel(card.color)}の{japaneseTypeLabel(card.type)}カードを続けて比較できます。</p>
            <div className="related-card-strip">
              {relatedCards.map((relatedCard) => (
                <Link href={`/ja/card/${relatedCard.slug}`} key={relatedCard.slug}>
                  <Image
                    src={relatedCard.image}
                    alt={getJapaneseCardImageAlt(relatedCard)}
                    width={400}
                    height={relatedCard.type === "Structure" ? 286 : 559}
                    sizes="(max-width: 520px) 38vw, 120px"
                    loading="lazy"
                  />
                  <strong>{relatedCard.name}</strong>
                  <span>{relatedCard.japaneseNumber}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="content-block">
            <h2>収録カードをもっと見る</h2>
            <p>{card.setName}のほかのカードも、カードリストから検索できます。</p>
            <Link className="button primary" href={`/ja/cards?q=${card.set.replace(/^E/, "")}`}>カードリストで探す</Link>
          </section>
        </article>
      </div>
    </>
  );
}
