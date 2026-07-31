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
      <div className="shell">
        <div className="callout"><strong>はじめての方へ：</strong> カードの見方やデッキの枚数がわからない場合は、先に<Link className="text-link" href="/ja/rules">ルール・遊び方</Link>を確認してください。カード名と効果テキストは、日本語版の公式表記に基づいています。</div>
      </div>
      <JapaneseCardExplorer initialQuery={q} />
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
