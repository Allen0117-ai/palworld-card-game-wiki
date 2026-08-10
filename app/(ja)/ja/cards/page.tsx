import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { AdsterraNativeAd } from "@/components/AdsterraNativeAd";
import { JapaneseCardExplorer } from "@/components/JapaneseCardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { japaneseCards } from "@/lib/japanese";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";
import { HubLinkGrid } from "@/components/HubLinkGrid";

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム カードリスト｜BP01・TD01・TD02",
  description: "パルワールドカードゲームの日本語カードリスト。BP01、TD01、TD02の全148枚をカード名・番号・色・種類・コスト・レアリティ・効果で検索できます。",
  path: "/ja/cards",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

type CardSearchParams = Promise<{ q?: string; color?: string; set?: string; type?: string }>;

export default async function JapaneseCardsPage({ searchParams }: { searchParams: CardSearchParams }) {
  const { q = "", color = "all", set = "all", type = "all" } = await searchParams;

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
        <AdsterraBannerAd />
        <HubLinkGrid
          compact
          eyebrow="カード索引"
          title="収録セット・色・種類から探す。"
          intro="先に分類を選び、さらに詳しい条件で絞り込めます。"
          items={[
            { href: "/ja/cards?set=EBP01", label: "ブースター", title: "BP01", description: "パルパゴスの夜明け 基本100枚。" },
            { href: "/ja/cards?set=ETD01", label: "トライアルデッキ", title: "TD01", description: "レッド・ブルーのカード。" },
            { href: "/ja/cards?set=ETD02", label: "トライアルデッキ", title: "TD02", description: "グリーン・パープルのカード。" },
            { href: "/ja/cards?color=red", label: "色", title: "レッド", description: "ダメージと素材を使うカード。" },
            { href: "/ja/cards?color=blue", label: "色", title: "ブルー", description: "手札と建築物を使うカード。" },
            { href: "/ja/cards?color=green", label: "色", title: "グリーン", description: "食材、回復、挑発のカード。" },
            { href: "/ja/cards?color=purple", label: "色", title: "パープル", description: "隠密と除去を使うカード。" },
            { href: "/ja/cards?type=Pal", label: "カード種類", title: "パル", description: "パルカードだけを表示。" },
          ]}
        />
      </div>
      <JapaneseCardExplorer key={`${q}-${color}-${set}-${type}`} initialQuery={q} initialColor={color} initialSet={set} initialType={type} />
      <div className="shell">
        <AdsterraNativeAd />
      </div>
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
