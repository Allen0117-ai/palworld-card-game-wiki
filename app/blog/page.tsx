import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/data";

export const metadata: Metadata = { title: "Palworld Card Game Guides – Rules, Products, Decks & Cards", description: "Complete launch-day Palworld Card Game guides for first games, deck rules, Trial Deck choices, BP01 cards, keywords, rarity and products." };

export default function GuidesPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="eyebrow"><span>Launch-day guide center</span> · Updated July 30, 2026</p>
        <h1>Clear answers.<br />Better first games.</h1>
        <p>Start with the questions players are asking today. Every guide labels official facts, editorial analysis and anything that still needs tournament evidence.</p>
      </header>
      <div className="guide-grid shell section">
        {guides.map((guide, index) => (
          <Link href={`/blog/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
            <span className="guide-number">0{index + 1}</span>
            <div><span className="mini-label">{guide.category} · {guide.readTime}</span><h3>{guide.title}</h3><p>{guide.description}</p><small className="guide-source-label">{guide.sourceStatus} · Updated {guide.updated}</small></div>
            <span className="guide-arrow">↗</span>
          </Link>
        ))}
      </div>
    </>
  );
}
