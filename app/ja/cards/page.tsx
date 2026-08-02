import type { Metadata } from "next";
import Link from "next/link";
import { JapaneseCardExplorer } from "@/components/JapaneseCardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { japaneseCards } from "@/lib/japanese";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム カードリスト｜BP01・TD01・TD02",
  description: "パルワールドカードゲームの日本語カードリスト。BP01、TD01、TD02の全148枚をカード名・番号・色・種類・コスト・レアリティ・効果で検索できます。",
  path: "/ja/cards",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

export default async function JapaneseCardsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "パルワールドカードゲーム カードリスト",
        description: "BP01・TD01・TD02の日本語カード一覧",
        inLanguage: "ja-JP",
        numberOfItems: japaneseCards.length,
      }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>日本語カードデータ</span> · BP01・TD01・TD02</p>
        <h1>パルワールドカードゲーム<br />カードリスト</h1>
        <p>全148枚の日本語カードを掲載。カード名、カード番号、色、種類、コスト、レアリティ、カード効果から探せます。</p>
        <div className="article-actions">
          <Link className="button primary" href="/ja/tools/deck-builder">デッキを作る</Link>
          <Link className="button ghost" href="/ja/guide/card-list-guide">カードの探し方を見る</Link>
        </div>
      </header>
      <JapaneseCardExplorer initialQuery={q} />
      <section className="card-next-steps shell" aria-labelledby="ja-card-next-steps-title">
        <p className="eyebrow"><span>カードを見つけたら</span> · 次のステップ</p>
        <h2 id="ja-card-next-steps-title">カードリストから、実際のデッキへ。</h2>
        <div>
          <Link href="/ja/tools/deck-builder" data-analytics-event="next_step_click" data-analytics-label="ja-cards-to-builder"><strong>デッキを作る</strong><span>枚数・色・同名カードを確認 →</span></Link>
          <Link href="/ja/rules" data-analytics-event="next_step_click" data-analytics-label="ja-cards-to-rules"><strong>ルールを確認</strong><span>公式Q&amp;Aを日本語で検索 →</span></Link>
          <Link href="/ja/decks" data-analytics-event="next_step_click" data-analytics-label="ja-cards-to-decks"><strong>デッキ例を見る</strong><span>画像つきの使い方と組み合わせ →</span></Link>
        </div>
      </section>
      <section className="card-link-index shell" aria-label="全カードリンク">
        <details>
          <summary>全148枚のカード名から探す</summary>
          <div>
            {japaneseCards.map((card) => (
              <Link href={`/ja/card/${card.slug}`} key={card.slug}>
                <span>{card.japaneseNumber}</span>
                <strong>{card.name}</strong>
              </Link>
            ))}
          </div>
        </details>
      </section>
    </>
  );
}
