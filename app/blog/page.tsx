import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/data";

export const metadata: Metadata = { title: "Palworld Card Game Guides & News", description: "Beginner rules, rarity explanations and launch guides for the Palworld Official Card Game." };

export default function GuidesPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="eyebrow"><span>Learn</span> · Rules, collecting & strategy</p>
        <h1>Clear answers.<br />Better games.</h1>
        <p>Useful launch-week guides written around the questions new players and collectors are actually asking.</p>
      </header>
      <div className="guide-grid shell section">
        {guides.map((guide, index) => (
          <Link href={`/blog/${guide.slug}`} className={`guide-card guide-${index + 1}`} key={guide.slug}>
            <span className="guide-number">0{index + 1}</span>
            <div><span className="mini-label">{guide.category} · {guide.readTime}</span><h3>{guide.title}</h3><p>{guide.description}</p></div>
            <span className="guide-arrow">↗</span>
          </Link>
        ))}
      </div>
    </>
  );
}
