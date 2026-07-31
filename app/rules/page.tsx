import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RuleExplorer } from "@/components/RuleExplorer";
import { SeoImagePanel } from "@/components/SeoImagePanel";
import { featuredRuleAnswers, officialRuleCount } from "@/lib/rules";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q = "" } = await searchParams;
  const question = q.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 100);

  return createPageMetadata({
    title: question || "Palworld TCG Rules, Rulebook PDF & Official Q&A",
    description: question
      ? `See the sourced Palworld Card Game ruling for “${question}” and share the answer with your playgroup.`
      : "Search Palworld TCG rules in plain English, open the official rulebook PDF and check all 97 launch-day Q&A rulings with source links.",
    path: "/rules",
  });
}

export default async function RulesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const hasQuery = Boolean(q.trim());

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: featuredRuleAnswers.slice(0, 20).map((rule) => ({
          "@type": "Question",
          name: rule.question,
          acceptedAnswer: { "@type": "Answer", text: rule.answer },
        })),
      }} />
      <header className={`page-hero rules-hero shell${hasQuery ? " has-query" : ""}`}>
        <div className="rules-query-desktop-copy">
          <p className="eyebrow"><span>Rules answer center</span> · Checked July 30, 2026</p>
          <h1>Palworld TCG rules.<br />Get the ruling.</h1>
          <p>Search in normal language. We combine plain-English essentials with all {officialRuleCount} official launch-day Q&amp;As and always show where the answer came from.</p>
          <div className="article-actions">
            <a className="button ghost" href="https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf" target="_blank" rel="noreferrer">Open official rules PDF ↗</a>
            <Link className="button ghost" href="/blog/how-to-play-palworld-card-game">Read the beginner rulebook guide</Link>
          </div>
          <div className="rules-hero-stats" aria-label="Rules database coverage">
            <div><strong>{featuredRuleAnswers.length}</strong><span>plain-English essentials</span></div>
            <div><strong>{officialRuleCount}</strong><span>official Q&amp;As indexed</span></div>
            <div><strong>1</strong><span>search across every answer</span></div>
          </div>
        </div>
        {hasQuery && <h1 className="rules-query-mobile-title">Rule answer.</h1>}
      </header>
      <div className="seo-image-panel-shell rules-visual-panel shell">
        <SeoImagePanel
          label="Rules in real card text"
          title="Quick, Interrupt, Taunt and Stealth examples"
          caption="Official cards that connect the searchable Palworld rules database with real printed keyword examples."
          cardNumbers={["EBP01-004", "EBP01-077", "EBP01-054", "ETD02-018"]}
        />
      </div>
      <RuleExplorer initialQuery={q} />
    </>
  );
}
