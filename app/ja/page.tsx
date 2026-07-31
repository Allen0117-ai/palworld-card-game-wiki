import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { japaneseCards, japaneseDecks } from "@/lib/japanese";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

const title = "パルワールドカードゲーム攻略｜カードリスト・デッキ・ルール";
const description = "パルワールド オフィシャルカードゲームの日本語攻略サイト。BP01・TD01・TD02のカードリスト、デッキレシピ、初心者向けルール・遊び方を掲載。";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/ja",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

const faq = [
  {
    question: "パルワールドカードゲームは何枚で遊びますか？",
    answer: "メインデッキ50枚とソウルデッキ10枚を用意します。対戦開始時のライフは10です。",
  },
  {
    question: "デッキには何色まで入れられますか？",
    answer: "メインデッキに入れられるカードは2色までです。無色カードは色数に含みません。",
  },
  {
    question: "BP01のカードは何種類ありますか？",
    answer: "ブースターパック第1弾「パルパゴスの夜明け」には、基本カード100種類があります。",
  },
];

export default function JapaneseHomePage() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Palpagos Archive 日本語版",
          url: "https://palworldcardgame.wiki/ja",
          inLanguage: "ja-JP",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ]} />

      <section className="hero hero-map">
        <Image
          className="hero-map-background"
          src="/hero-palpagos-map.webp"
          alt=""
          width={1915}
          height={821}
          sizes="100vw"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="hero-map-overlay" />
        <div className="hero-map-lights" aria-hidden="true">
          <span className="map-light map-light-gold" />
          <span className="map-light map-light-sky" />
        </div>
        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow"><span>日本語攻略データベース</span> · カード · デッキ · ルール</p>
            <h1>
              <span className="hero-title-keyword">パルワールドカードゲーム攻略</span>
              迷ったときに、<br /><em>すぐ答えが見つかる。</em>
            </h1>
            <p className="hero-lede">
              BP01・TD01・TD02の日本語カードを検索。デッキの動かし方や、初めて遊ぶ人向けのルールもわかりやすく整理しています。
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/ja/cards">カードリストを見る <span>◆</span></Link>
              <Link className="button ghost" href="/ja/rules">遊び方を確認する</Link>
            </div>
            <div className="hero-stats" aria-label="収録内容">
              <div><strong>{japaneseCards.length}</strong><span>日本語カード</span></div>
              <div><strong>BP01</strong><span>ブースター第1弾</span></div>
              <div><strong>50+10</strong><span>デッキ枚数</span></div>
            </div>
          </div>

          <div className="hero-product" aria-label="日本語版カード">
            <div className="hero-product-stage" data-tilt>
              <div className="hero-product-stamp">
                <span>ブースターパック第1弾 · BP01</span>
                <strong>パルパゴスの夜明け</strong>
                <small>日本語版カード収録</small>
              </div>
              {["EBP01-025", "EBP01-002", "EBP01-073"].map((number, index) => {
                const card = japaneseCards.find((item) => item.number === number);
                if (!card) return null;
                const positions = ["hero-card-back", "hero-card-front", "hero-card-third"];
                return (
                  <div className={`hero-card ${positions[index]}`} key={number}>
                    <Image
                      src={card.image}
                      alt={`${card.name} 日本語版カード`}
                      width={400}
                      height={559}
                      sizes="(max-width: 760px) 150px, 218px"
                      loading="eager"
                    />
                    <span className="hero-card-glare" aria-hidden="true" />
                  </div>
                );
              })}
              <span className="hero-credit">カード画像 · ©Bushiroad ©PALWORLD</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="サイトの内容">
        <div>日本語カードリスト <span>◆</span> 初心者向けルール <span>◆</span> デッキレシピ <span>◆</span> カード効果検索</div>
      </section>

      <section className="launch-paths shell" data-reveal>
        <div className="launch-paths-heading">
          <div>
            <p className="eyebrow"><span>目的から探す</span> · はじめての方へ</p>
            <h2>知りたいことを、すぐ確認。</h2>
          </div>
          <p>英語ページの直訳ではなく、日本のプレイヤーが検索する言葉と読みやすい順番で情報をまとめています。</p>
        </div>
        <div className="launch-path-grid">
          <Link href="/ja/cards"><span>01 · カード検索</span><strong>カードリスト</strong><p>カード名・番号・色・種類・効果から絞り込めます。</p></Link>
          <Link href="/ja/rules"><span>02 · 初心者向け</span><strong>ルール・遊び方</strong><p>準備、ターンの流れ、バトル、勝利条件を順番に解説します。</p></Link>
          <Link href="/ja/decks"><span>03 · 対戦準備</span><strong>デッキレシピ</strong><p>公式トライアルデッキと、初心者向けサンプルを紹介します。</p></Link>
          <Link href="/ja/cards?q=BP01"><span>04 · 収録カード</span><strong>BP01 カード一覧</strong><p>「パルパゴスの夜明け」の基本カード100種類を確認できます。</p></Link>
          <Link href="/ja/deck/red-blue-launch-pressure"><span>05 · TD01</span><strong>レッド・ブルー</strong><p>素材と建築物を使うトライアルデッキの動かし方です。</p></Link>
          <Link href="/ja/deck/green-blue-base-value"><span>06 · TD02</span><strong>グリーン・パープル</strong><p>食材、回復、ステルスを使うデッキの基本です。</p></Link>
        </div>
      </section>

      <section className="section shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">デッキ攻略</p>
            <h2>最初に覚える3つのデッキ。</h2>
          </div>
          <Link className="text-link" href="/ja/decks">デッキ一覧を見る →</Link>
        </div>
        <div className="launch-path-grid">
          {japaneseDecks.map((deck, index) => (
            <Link href={`/ja/deck/${deck.slug}`} key={deck.slug}>
              <span>0{index + 1} · {deck.japaneseStatus}</span>
              <strong>{deck.japaneseName}</strong>
              <p>{deck.japaneseDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="article-shell ja-home-faq" data-reveal>
        <p className="eyebrow"><span>よくある質問</span> · 初心者向け</p>
        <h2>まず知っておきたい基本。</h2>
        <dl className="glossary-list">
          {faq.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <Link className="button primary" href="/ja/rules">ルールを詳しく見る</Link>
      </section>
    </>
  );
}
