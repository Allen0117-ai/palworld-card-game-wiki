import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/data";
import { SeoImagePanel } from "@/components/SeoImagePanel";
import { createPageMetadata } from "@/lib/seo";

const guideTopics = [
  { label: "Start & rules", categories: ["Start Here", "Rules", "Corrections"] },
  { label: "Cards & deck building", categories: ["Card List", "Deck Building"] },
  { label: "Products & buying", categories: ["Buying Guide", "Accessory Guide"] },
  { label: "Collecting & updates", categories: ["Collecting", "Collector Guide", "News Tracker", "Franchise Update"] },
];

function topicId(topic: string) {
  return `guide-topic-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export const metadata: Metadata = createPageMetadata({
  title: "Palworld Card Game Guides – Rules, Cards & Decks",
  description: "Current Palworld Card Game guides for rules, Trial Deck choices, booster prices, First Edition cards, sleeves, products and verified updates.",
  path: "/blog",
  absoluteTitle: true,
});

export default function GuidesPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="eyebrow"><span>Launch guide center</span> · Updated August 6, 2026</p>
        <h1>Clear answers.<br />Better first games.</h1>
        <p>Start with the questions players are asking today. Every guide separates confirmed facts from open questions, including franchise news that directly affects card game fans.</p>
      </header>
      <div className="seo-image-panel-shell shell">
        <SeoImagePanel
          label="Featured guide cards"
          title="Rules, cards, decks and collecting"
          caption="Representative cards from all four Palworld Card Game colors featured across our launch guides."
          cardNumbers={["EBP01-002", "EBP01-025", "EBP01-050", "EBP01-074"]}
        />
      </div>
      <section className="hub-index shell" aria-labelledby="guide-index-title">
        <div className="hub-index-heading">
          <p className="hub-index-eyebrow">Browse by topic</p>
          <h2 id="guide-index-title">Choose the answer you need.</h2>
        </div>
        <nav className="hub-index-links hub-index-topic-links" aria-label="Guide topics">
          {guideTopics.map((topic) => <a className="hub-index-link" href={`#${topicId(topic.label)}`} key={topic.label}>{topic.label}</a>)}
        </nav>
      </section>
      <div className="shell section">
        {guideTopics.map((topic) => (
          <section id={topicId(topic.label)} key={topic.label} aria-labelledby={`${topicId(topic.label)}-title`}>
            <div className="section-heading compact">
              <div><p className="eyebrow">Guide topic</p><h2 id={`${topicId(topic.label)}-title`}>{topic.label}</h2></div>
            </div>
            <div className="guide-grid">
              {guides.map((guide, index) => topic.categories.includes(guide.category) ? (
                <Link href={`/blog/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
                  <span className="guide-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><span className="mini-label">{guide.category} · {guide.readTime}</span><h3>{guide.title}</h3><p>{guide.description}</p><small className="guide-source-label">{guide.sourceStatus} · Updated {guide.updated}</small></div>
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
