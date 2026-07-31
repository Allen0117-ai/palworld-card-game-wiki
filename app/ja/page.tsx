import Image from "next/image";
import Link from "next/link";
import { JapaneseCardTile } from "@/components/JapaneseCardTile";
import { JapaneseDeckTile } from "@/components/JapaneseDeckTile";
import { JapaneseHeroSearch } from "@/components/JapaneseHeroSearch";
import { JapaneseHomeProgressHub } from "@/components/JapaneseHomeProgressHub";
import { JsonLd } from "@/components/JsonLd";
import { japaneseCards, japaneseDecks } from "@/lib/japanese";
import { japaneseGuides } from "@/lib/japanese-guides";
import { japaneseOfficialRuleCount } from "@/lib/japanese-rules";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

const title = "パルワールドカードゲーム攻略｜カードリスト・デッキ・ルール";
const description = "パルワールド オフィシャルカードゲームの日本語攻略サイト。全148枚のカードリスト、公式Q&A、デッキレシピ、デッキビルダー、初心者向け遊び方を掲載。";
const featuredCardNumbers = ["EBP01-001", "EBP01-025", "EBP01-049", "EBP01-073"];
const featuredCards = featuredCardNumbers.map((number) => {
  const card = japaneseCards.find((item) => item.number === number);
  if (!card) throw new Error(`Japanese homepage references missing card ${number}`);
  return card;
});

export const metadata = createPageMetadata({
  title,
  description,
  path: "/ja",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

export default function JapaneseHomePage() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Palpagos Archive 日本語版",
          url: "https://palworldcardgame.wiki/ja",
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "パルワールドカードゲーム攻略",
          url: "https://palworldcardgame.wiki/ja",
          inLanguage: "ja-JP",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://palworldcardgame.wiki/ja/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
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
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-particle-mist hero-particle-mist-gold" />
          <span className="hero-particle-mist hero-particle-mist-sky" />
        </div>
        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow"><span>日本語プレイヤーガイド</span> · カード · デッキ · ルール</p>
            <h1>
              <span className="hero-title-keyword">パルワールドカードゲーム攻略</span>
              答えを探す。<br /><em>次の一手へ。</em>
            </h1>
            <p className="hero-lede">
              日本語カード148枚、公式Q&amp;A、デッキレシピ、無料デッキビルダーをひとつに。初めての対戦から細かな裁定まで迷わず探せます。
            </p>
            <JapaneseHeroSearch />
            <div className="hero-actions">
              <Link className="button primary" href="/ja/rules">ルールを質問する <span>◆</span></Link>
              <Link className="button ghost" href="/ja/cards">カード148枚を見る</Link>
            </div>
            <div className="hero-stats" aria-label="収録内容">
              <div><strong>{japaneseCards.length}</strong><span>日本語カード</span></div>
              <div><strong>{japaneseOfficialRuleCount}</strong><span>公式Q&amp;A</span></div>
              <div><strong>50+10</strong><span>デッキ枚数</span></div>
            </div>
          </div>

          <div className="hero-product" aria-label="日本語版カード">
            <div className="hero-product-stage" data-tilt>
              <div className="hero-product-stamp">
                <span>ブースターパック第1弾 · BP01</span>
                <strong>パルパゴスの夜明け</strong>
                <small>日本語カード148枚を掲載</small>
              </div>
              {featuredCards.slice(0, 3).map((card, index) => (
                <div className={`hero-card ${["hero-card-back", "hero-card-front", "hero-card-third"][index]}`} key={card.slug}>
                  <Image
                    src={card.image}
                    alt={`${card.name} ${card.japaneseNumber} 日本語版カード`}
                    width={400}
                    height={559}
                    sizes="(max-width: 520px) 125px, (max-width: 760px) 151px, 218px"
                    loading="eager"
                  />
                  <span className="hero-card-glare" aria-hidden="true" />
                </div>
              ))}
              <span className="hero-credit">公式カード画像 · ©Bushiroad ©PALWORLD</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="サイトの機能">
        <div>日本語カード148枚 <span>◆</span> 公式Q&amp;A 97件 <span>◆</span> デッキビルダー <span>◆</span> 初心者向け攻略 <span>◆</span> カード効果検索</div>
      </section>

      <section className="launch-paths shell" data-reveal>
        <div className="launch-paths-heading">
          <div><p className="eyebrow"><span>目的から探す</span> · 今やりたいこと</p><h2>答えまで、最短で。</h2></div>
          <p>遊び方、商品選び、デッキ作り、カード裁定まで、今知りたい内容からすぐに探せます。</p>
        </div>
        <div className="launch-path-grid">
          <Link href="/ja/guide/how-to-play"><span>01 · 初めての対戦</span><strong>どうやって遊ぶ？</strong><p>準備、ターン、攻撃、ブロック、勝利条件を順番に確認。</p></Link>
          <Link href="/ja/guide/trial-deck-comparison"><span>02 · 最初の商品</span><strong>TD01とTD02はどっち？</strong><p>戦い方、難しさ、向いている人を比較。</p></Link>
          <Link href="/ja/guide/deck-building-rules"><span>03 · デッキ作り</span><strong>構築ルールは？</strong><p>50枚、2色、同名4枚、ラッキー8枚を解説。</p></Link>
          <Link href="/ja/tools/deck-builder"><span>04 · 無料ツール</span><strong>日本語カードで組みたい</strong><p>148枚から選び、保存・共有できるデッキビルダー。</p></Link>
          <Link href="/ja/deck/mono-red-pal-rush"><span>05 · 完成デッキ</span><strong>50枚をそのまま使いたい</strong><p>初心者向けの全カード入りサンプルを確認。</p></Link>
          <Link href="/ja/rules"><span>06 · 個別の疑問</span><strong>カード裁定を探したい</strong><p>基本回答と公式Q&amp;A {japaneseOfficialRuleCount}件をまとめて検索。</p></Link>
        </div>
      </section>

      <JapaneseHomeProgressHub />

      <section className="section shell split-section" data-reveal>
        <div>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">デッキ攻略センター</p>
              <h2>カードを見て、動きを覚える。</h2>
            </div>
            <Link className="text-link" href="/ja/decks">デッキ一覧を見る →</Link>
          </div>
          <p className="deck-home-intro">公式トライアルデッキ2種と、50枚すべてを掲載した初心者向けデッキ。各ガイドで基本の動かし方と主要カードを画像つきで確認できます。</p>
          <div className="deck-list">
            {japaneseDecks.map((deck, index) => <JapaneseDeckTile deck={deck} rank={index + 1} key={deck.slug} />)}
          </div>
        </div>
        <aside className="builder-promo">
          <div className="builder-promo-top">
            <span className="mini-label">無料ツール</span>
            <span className="tool-mark">50</span>
          </div>
          <h3>次のデッキを、<br />ここから。</h3>
          <p>日本語カード148枚を検索。2色と同名4枚の上限を確認しながら、50枚のデッキを端末に保存・共有できます。</p>
          <Link className="button ink" href="/ja/tools/deck-builder">デッキを作る <span>↗</span></Link>
        </aside>
      </section>

      <section className="latest-updates shell" data-reveal>
        <div className="latest-updates-heading">
          <div><p className="eyebrow"><span>公式最新情報</span> · 最終更新 2026.07.31</p><h2>公式の最新情報。</h2></div>
          <p>新商品、イベント、大会など、対戦前に確認しておきたい公式情報をまとめています。</p>
        </div>
        <div className="latest-update-grid">
          <a href="https://palworld-official-cardgame.com/news/post-2026popup" target="_blank" rel="noreferrer">
            <span>公式イベント · 7月28日</span>
            <strong>秋葉原で期間限定ストア開催</strong>
            <p>8月1日から9月13日まで開催。販売商品、営業時間、購入特典を公式情報で確認できます。</p>
          </a>
          <a href="https://palworld-official-cardgame.com/products/category/booster-packs" target="_blank" rel="noreferrer">
            <span>公式商品情報 · 7月10日</span>
            <strong>BP02「目覚めし伝説」10月30日発売</strong>
            <p>第2弾の発売日と商品情報を、公式ブースターパック一覧から確認できます。</p>
          </a>
          <a href="https://palworld-official-cardgame.com/events" target="_blank" rel="noreferrer">
            <span>公式大会情報 · 開催中</span>
            <strong>発売記念大会・ショップ大会を確認</strong>
            <p>参加前に最新の日程、会場、参加方法を公式イベントページで確認できます。</p>
          </a>
        </div>
      </section>

      <section className="section shell ja-featured-cards" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">BP01 注目パル</p>
            <h2>カードを大きく、効果まで。</h2>
          </div>
          <Link className="text-link" href="/ja/cards">カードリストを見る →</Link>
        </div>
        <div className="card-grid listing">
          {featuredCards.map((card) => <JapaneseCardTile card={card} key={card.slug} />)}
        </div>
        <p className="ja-dark-credit">公式日本語カード画像を使用 · ©Bushiroad ©PALWORLD</p>
      </section>

      <section className="product-section" data-reveal>
        <div className="shell product-grid">
          <div className="product-copy">
            <p className="eyebrow"><span>ブースターパック第1弾</span> · BP01</p>
            <h2>パルパゴスの<br />夜明け。</h2>
            <p>基本カード100種とパラレル61種を収録。1ボックス12パック、1パック7枚。初めて買う人が迷いやすいトライアルデッキとの違いも整理しました。</p>
            <div className="article-actions">
              <Link className="button primary" href="/ja/guide/bp01-booster-box">ボックスガイドを読む <span>→</span></Link>
              <a className="button ghost" href="https://palworld-official-cardgame.com/products/bp01" target="_blank" rel="noreferrer">公式商品ページ <span>↗</span></a>
            </div>
            <div className="product-collector-links">
              <Link className="text-link" href="/ja/cards?q=BP01">BP01カード一覧 →</Link>
              <Link className="text-link" href="/ja/guide/card-list-guide">カードリストの使い方 →</Link>
            </div>
          </div>
          <div className="product-pack ja-product-pack" aria-label="BP01 日本語版カード">
            <Image
              className="ja-product-card ja-product-card-back"
              src={featuredCards[1].image}
              alt={`${featuredCards[1].name} ${featuredCards[1].japaneseNumber} 日本語版カード`}
              width={400}
              height={559}
              sizes="(max-width: 760px) 36vw, 210px"
              loading="lazy"
            />
            <Image
              className="ja-product-card ja-product-card-front"
              src={featuredCards[3].image}
              alt={`${featuredCards[3].name} ${featuredCards[3].japaneseNumber} 日本語版カード`}
              width={400}
              height={559}
              sizes="(max-width: 760px) 36vw, 210px"
              loading="lazy"
            />
            <span className="ja-product-pack-label"><strong>BP01</strong> 公式日本語カード</span>
          </div>
          <div className="product-art">
            <Image src="/media-kit/palworld-card-game-official-card-back.webp" alt="パルワールドカードゲーム 公式カード裏面" width={607} height={849} loading="lazy" />
          </div>
        </div>
        <p className="asset-credit shell">公式日本語カード画像・公式カード裏面を使用 · ©Bushiroad ©PALWORLD</p>
      </section>

      <section className="section shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">日本語攻略ガイド</p>
            <h2>遊び方・デッキ・商品選びがわかる。</h2>
          </div>
          <Link className="text-link" href="/ja/guides">攻略をすべて見る →</Link>
        </div>
        <div className="guide-grid">
          {japaneseGuides.map((guide, index) => (
            <Link href={`/ja/guide/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
              <span className="guide-number">0{index + 1}</span>
              <div>
                <span className="mini-label">{guide.category} · {guide.readTime}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </div>
              <span className="guide-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="official-banner shell" aria-label="パルパゴスの夜明け 公式キービジュアル" data-reveal>
        <Image src="/media-kit/palworld-card-game-dawn-of-palpagos-launch-artwork.webp" alt="パルワールドカードゲーム パルパゴスの夜明け 公式キービジュアル" width={1440} height={810} loading="lazy" />
        <div className="official-banner-caption">
          <div><span>公式キービジュアル</span><strong>パルパゴスの夜明け</strong></div>
          <span>©Bushiroad ©PALWORLD</span>
        </div>
      </section>
    </>
  );
}
