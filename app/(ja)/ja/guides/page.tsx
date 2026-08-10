import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { JsonLd } from "@/components/JsonLd";
import { japaneseGuides } from "@/lib/japanese-guides";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

const guideTopics = [
  { label: "初心者・ルール", categories: ["初心者ガイド", "デッキ構築", "ルール用語"] },
  { label: "デッキ・商品", categories: ["商品・デッキ", "商品ガイド"] },
  { label: "カード検索", categories: ["カード検索"] },
];

function topicId(index: number) {
  return `ja-guide-topic-${index + 1}`;
}

export const metadata: Metadata = createPageMetadata({
  title: "パルワールドカードゲーム 攻略ガイド｜遊び方・デッキ・商品",
  description: "パルワールドカードゲームの日本語攻略ガイド一覧。遊び方、デッキ構築、トライアルデッキ比較、BP01ボックス、カードリスト、用語を解説。",
  path: "/ja/guides",
  absoluteTitle: true,
  locale: "ja",
  image: JAPANESE_SOCIAL_IMAGE,
});

export default function JapaneseGuidesPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "パルワールドカードゲーム 日本語攻略ガイド",
        inLanguage: "ja-JP",
        itemListElement: japaneseGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `https://palworldcardgame.wiki/ja/guide/${guide.slug}`,
        })),
      }} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>日本語攻略</span> · 初心者からデッキ作りまで</p>
        <h1>知りたい順に読める、<br />実戦ガイド。</h1>
        <p>初めての対戦、デッキ構築、商品選びまで、結論、手順、注意点の順にわかりやすく解説します。</p>
      </header>
      <div className="shell">
        <AdsterraBannerAd />
      </div>
      <section className="hub-index shell" aria-labelledby="ja-guide-index-title">
        <div className="hub-index-heading">
          <p className="hub-index-eyebrow">カテゴリから探す</p>
          <h2 id="ja-guide-index-title">知りたい内容を選ぶ。</h2>
        </div>
        <nav className="hub-index-links hub-index-topic-links" aria-label="攻略ガイドのカテゴリ">
          {guideTopics.map((topic, index) => <a className="hub-index-link" href={`#${topicId(index)}`} key={topic.label}>{topic.label}</a>)}
        </nav>
      </section>
      <div className="section shell ja-guide-index">
        {guideTopics.map((topic, topicIndex) => (
          <section id={topicId(topicIndex)} key={topic.label} aria-labelledby={`${topicId(topicIndex)}-title`}>
            <div className="section-heading compact">
              <div><p className="eyebrow">攻略カテゴリ</p><h2 id={`${topicId(topicIndex)}-title`}>{topic.label}</h2></div>
            </div>
            <div className="guide-grid">
              {japaneseGuides.map((guide, index) => topic.categories.includes(guide.category) ? (
                <Link href={`/ja/guide/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
                  <span className="guide-number">0{index + 1}</span>
                  <div>
                    <span className="mini-label">{guide.category} · {guide.readTime}</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                  </div>
                  <span className="guide-arrow">↗</span>
                </Link>
              ) : null)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
