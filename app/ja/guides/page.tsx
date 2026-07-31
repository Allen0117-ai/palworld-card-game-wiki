import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { japaneseGuides } from "@/lib/japanese-guides";
import { createPageMetadata, JAPANESE_SOCIAL_IMAGE } from "@/lib/seo";

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
      <section className="section shell ja-guide-index">
        <div className="guide-grid">
          {japaneseGuides.map((guide, index) => (
            <Link href={`/ja/guide/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
              <span className="guide-number">0{index + 1}</span>
              <div>
                <span className="mini-label">{guide.category} · {guide.readTime}</span>
                <h2>{guide.title}</h2>
                <p>{guide.description}</p>
              </div>
              <span className="guide-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
