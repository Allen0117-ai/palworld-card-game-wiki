import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム ルール・遊び方｜初心者向け",
  description: "パルワールドカードゲームのルールと遊び方を初心者向けに解説。必要なカード、対戦準備、ターンの流れ、攻撃・ブロック、勝利条件、デッキ構築ルールがわかります。",
  path: "/ja/rules",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

const faq = [
  {
    question: "対戦には何が必要ですか？",
    answer: "各プレイヤーがメインデッキ50枚、ソウルデッキ10枚、ライフや素材を記録するカウンターを用意します。",
  },
  {
    question: "最初の手札は何枚ですか？",
    answer: "メインデッキから5枚引きます。必要なら手札をすべて戻してシャッフルし、1度だけ5枚引き直せます。",
  },
  {
    question: "どうなれば勝ちですか？",
    answer: "相手のライフを0以下にするか、相手のメインデッキを0枚にすると勝利です。",
  },
  {
    question: "同じ名前のカードは何枚まで入れられますか？",
    answer: "同じカード名は4枚までです。ラッキーアイコンを持つカードは、メインデッキ全体で8枚まで入れられます。",
  },
];

const phases = [
  ["1", "スタンドフェイズ", "自分のベースとソウルエリアにあるカードをスタンドします。"],
  ["2", "ドローフェイズ", "メインデッキから1枚引きます。先攻の最初のターンは引きません。"],
  ["3", "ソウルフェイズ", "ソウルデッキから2枚をスタンド状態でソウルエリアに置きます。"],
  ["4", "メインフェイズ", "カードを使う、能力を使う、パルをアサインする、攻撃するなど、好きな順番で行います。"],
  ["5", "エンドフェイズ", "パルと建築物が受けているダメージを0にし、ターン終了時の処理を行います。"],
];

export default function JapaneseRulesPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "ja-JP",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>初心者向けルールガイド</span> · 対戦準備から勝利条件まで</p>
        <h1>パルワールドカードゲーム<br />ルール・遊び方</h1>
        <p>初めて遊ぶ人が迷いやすいポイントを、対戦の順番に沿って説明します。カードの細かな処理で迷った場合は、公式の最新ルールとQ&amp;Aを優先してください。</p>
        <div className="article-actions">
          <a className="button ghost" href="https://palworld-official-cardgame.com/" target="_blank" rel="noreferrer">公式サイトを確認する ↗</a>
          <Link className="button primary" href="/ja/cards">カードリストを見る</Link>
        </div>
      </header>

      <article className="article-shell">
        <div className="verification-strip">
          <strong>最初に覚える数字</strong>
          <span>メインデッキ50枚・ソウルデッキ10枚・初期ライフ10・初期手札5枚です。</span>
        </div>

        <h2>対戦前の準備</h2>
        <ol>
          <li>メインデッキ50枚をよくシャッフルし、裏向きで置きます。</li>
          <li>ソウルデッキ10枚を、メインデッキとは別に置きます。</li>
          <li>お互いのライフを10にします。</li>
          <li>先攻・後攻を決め、メインデッキから5枚引きます。</li>
          <li>手札を引き直す場合は5枚すべてを戻し、シャッフルして5枚引きます。引き直しは1回だけです。</li>
        </ol>

        <h2>ターンの流れ</h2>
        <p>自分のターンは5つのフェイズで進みます。最初は「使ったカードを戻す → 1枚引く → ソウルを増やす → 行動する → 終了」と覚えれば大丈夫です。</p>
        <div className="phase-list">
          {phases.map(([number, name, detail]) => (
            <div key={number}><span>{number}</span><strong>{name}</strong><p>{detail}</p></div>
          ))}
        </div>

        <h2>カードを使う方法</h2>
        <p>カードや能力のコストは、主にソウルをレストして支払います。パルはベースに出して戦い、建築物にはパルをアサインして能力を使います。素材や食材は、一部のカードが作る専用カウンターです。</p>
        <div className="glossary-list">
          <div><dt>スタンド</dt><dd>カードが縦向きで、行動に使える状態です。</dd></div>
          <div><dt>レスト</dt><dd>カードを横向きにした状態です。攻撃やコストの支払いでレストします。</dd></div>
          <div><dt>アサイン</dt><dd>自分のパルを建築物に置き、その仕事や能力に使うことです。</dd></div>
          <div><dt>クイック</dt><dd>バトル中の決められたタイミングでも使えるカードや能力です。</dd></div>
        </div>

        <h2>攻撃・ブロック・ダメージ</h2>
        <p>スタンド状態のパルをレストすると、相手プレイヤーか相手のスタンド状態のパルを攻撃できます。相手は条件を満たすパルでブロックでき、クイックやインタラプトを使うタイミングを確認したあと、バトルを解決します。</p>
        <p>プレイヤーへの攻撃が通った場合は、攻撃したパルの打撃力と同じ枚数まで、相手のメインデッキ上から1枚ずつ墓地に置いてダメージチェックを行います。途中でラッキーアイコンが出ると、その攻撃によるライフ減少は発生しません。</p>

        <h2>勝利条件</h2>
        <ul>
          <li>相手のライフが0以下になった。</li>
          <li>相手のメインデッキが0枚になった。</li>
        </ul>
        <p>両方のプレイヤーが同時に敗北条件を満たした場合は引き分けです。</p>

        <h2>デッキ構築ルール</h2>
        <ul>
          <li>メインデッキはちょうど50枚。</li>
          <li>ソウルデッキは別に10枚。</li>
          <li>メインデッキの色は2色まで。無色は色数に含みません。</li>
          <li>同じカード名は4枚まで。</li>
          <li>ラッキーアイコンを持つカードは合計8枚まで。</li>
        </ul>

        <h2>よくある質問</h2>
        <dl className="glossary-list">
          {faq.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="source-panel">
          <h2>公式情報について</h2>
          <p>カードの個別処理や大会ルールは更新される場合があります。迷ったときは公式サイトの総合ルールとQ&amp;Aを確認してください。</p>
          <div>
            <a href="https://palworld-official-cardgame.com/" target="_blank" rel="noreferrer">パルワールドカードゲーム公式サイト ↗</a>
          </div>
        </div>
      </article>
    </>
  );
}
