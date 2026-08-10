import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { AdsterraNativeAd } from "@/components/AdsterraNativeAd";
import { JapaneseRuleExplorer } from "@/components/JapaneseRuleExplorer";
import { JsonLd } from "@/components/JsonLd";
import {
  JAPANESE_COMPREHENSIVE_RULES_URL,
  JAPANESE_PLAY_GUIDE_URL,
  JAPANESE_PLAYMAT_URL,
  japaneseFeaturedRuleAnswers,
  japaneseOfficialRuleCount,
} from "@/lib/japanese-rules";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム ルール・遊び方・公式Q&A検索",
  description: `パルワールドカードゲームの遊び方を初心者向けに解説。デッキ枚数、ターンの流れ、攻撃、ダメージチェックに加え、公式日本語Q&A ${japaneseOfficialRuleCount}件を検索できます。`,
  path: "/ja/rules",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

const phases = [
  ["1", "スタンドフェイズ", "自分の拠点とソウルエリアにあるカードをスタンドします。"],
  ["2", "ドローフェイズ", "メインデッキから1枚引きます。先攻の最初のターンは引きません。"],
  ["3", "ソウルフェイズ", "ソウルデッキから2枚をスタンド状態でソウルエリアに置きます。"],
  ["4", "メインフェイズ", "カードのプレイ、能力、アサイン、攻撃を好きな順番で行います。"],
  ["5", "エンドフェイズ", "パルと建築物のダメージを0にし、ターン終了時の処理を行います。"],
];

export default async function JapaneseRulesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const hasQuery = Boolean(q.trim());

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "ja-JP",
        mainEntity: japaneseFeaturedRuleAnswers.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }} />

      <header className={`page-hero rules-hero shell${hasQuery ? " has-query" : ""}`}>
        <div className="rules-query-desktop-copy">
          <p className="eyebrow"><span>ルール回答センター</span> · 公式日本語Q&amp;A収録</p>
          <h1>遊び方から個別裁定まで、<br />ここで解決。</h1>
          <p>初心者向けの基本ルールと、カード固有の公式Q&amp;Aをまとめて検索できます。カード番号でも、普段の言葉でも探せます。</p>
          <div className="rules-hero-stats">
            <div><strong>{japaneseOfficialRuleCount}</strong><span>公式Q&amp;A</span></div>
            <div><strong>5</strong><span>ターンのフェイズ</span></div>
            <div><strong>50+10</strong><span>デッキ枚数</span></div>
          </div>
        </div>
        {hasQuery && <h1 className="rules-query-mobile-title">ルール検索結果</h1>}
      </header>

      <div className="shell">
        <AdsterraBannerAd />
      </div>

      <JapaneseRuleExplorer initialQuery={q} />

      <div className="shell">
        <AdsterraNativeAd />
      </div>

      <article className="article-shell ja-rules-guide" id="beginner-guide">
        <p className="eyebrow"><span>最初の対戦ガイド</span> · 5分で全体像をつかむ</p>
        <h2>初めて遊ぶ人が、先に覚えること。</h2>
        <div className="verification-strip">
          <strong>必要な数字</strong>
          <span>メインデッキ50枚・ソウルデッキ10枚・初期ライフ10・初期手札5枚です。</span>
        </div>

        <h2>対戦前の準備</h2>
        <ol>
          <li>メインデッキ50枚とソウルデッキ10枚を分けて置きます。</li>
          <li>ライフを10にし、先攻・後攻を決めます。</li>
          <li>後攻プレイヤーはソウル1枚を、スタンド状態でソウルエリアに置きます。</li>
          <li>お互いにメインデッキから5枚引きます。引き直しは5枚すべてを戻し、1度だけ行えます。</li>
        </ol>

        <h2>ターンの流れ</h2>
        <p>「起こす → 引く → ソウルを増やす → 行動する → 終了」の順で覚えると迷いません。</p>
        <div className="phase-list">
          {phases.map(([number, name, detail]) => (
            <div key={number}><span>{number}</span><strong>{name}</strong><p>{detail}</p></div>
          ))}
        </div>

        <h2>攻撃と勝利条件</h2>
        <p>スタンド状態のパルをレストして攻撃します。相手プレイヤー、相手の建築物、または基本的にレスト状態の相手パルを選べます。相手のライフを0以下にするか、相手のメインデッキを0枚にすると勝利です。</p>
        <div className="callout"><strong>迷いやすい点：</strong>登場したターンのパルも、スタンド状態なら攻撃できます。先攻の最初のターンに飛ばすのはドローフェイズです。</div>

        <h2>公式ルール資料</h2>
        <p>細かな処理や大会での裁定は更新される場合があります。必ず最新版の公式資料を優先してください。</p>
        <div className="official-rule-links">
          <a href={JAPANESE_PLAY_GUIDE_URL} target="_blank" rel="noreferrer"><span>初心者向け</span><strong>公式プレイガイド PDF ↗</strong></a>
          <a href={JAPANESE_COMPREHENSIVE_RULES_URL} target="_blank" rel="noreferrer"><span>詳細ルール</span><strong>総合ルール PDF ↗</strong></a>
          <a href={JAPANESE_PLAYMAT_URL} target="_blank" rel="noreferrer"><span>対戦準備</span><strong>公式プレイマット PDF ↗</strong></a>
        </div>
        <div className="article-actions">
          <Link className="button primary" href="/ja/guide/how-to-play">遊び方を詳しく読む</Link>
          <Link className="button ghost" href="/ja/tools/deck-builder">デッキを作る</Link>
        </div>
      </article>
    </>
  );
}
