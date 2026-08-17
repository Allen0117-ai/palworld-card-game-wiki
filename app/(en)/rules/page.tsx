import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { CommunityVideoCard } from "@/components/CommunityVideoCard";
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
    title: question
      ? `${question.slice(0, 42)}${question.length > 42 ? "…" : ""} – Rule Answer`
      : "Palworld TCG Comprehensive Rules & Official Q&A",
    description: question
      ? `See the sourced Palworld Card Game ruling for “${question}” and share the answer with your playgroup.`
      : "Read Palworld TCG comprehensive rules and official Q&A for deck limits, setup, turn order, combat, keywords and card rulings, with direct sources.",
    path: "/rules",
    absoluteTitle: true,
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
          <p className="eyebrow"><span>Rules answer center</span> · Official Q&amp;A searchable below</p>
          <h1>Palworld TCG<br />comprehensive rules &amp; FAQ.</h1>
          <p>Use this rules center as a searchable companion to the Palworld TCG rulebook. Search all {officialRuleCount} official Q&amp;As for deck limits, setup, turn order, combat, keywords or card rulings; every answer links to its source.</p>
          <div className="quick-answer">
            <strong>Rules in 20 seconds</strong>
            <p>Build exactly 50 Main Deck cards plus a separate 10-card Soul Deck, using no more than two named colors. Each turn follows Stand → Draw → Soul → Main → End; the first player skips their first Draw Phase.</p>
          </div>
          <div className="article-actions">
            <a className="button ghost" href="https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf" target="_blank" rel="noreferrer">Open official rules PDF ↗</a>
            <Link className="button ghost" href="/blog/how-to-play-palworld-card-game">Read the beginner rulebook guide</Link>
            <Link className="button ghost" href="/blog/palworld-card-game-deck-building-rules">Check deck-building limits</Link>
            <Link className="button ghost" href="/tools/deck-builder">Build and check a legal deck</Link>
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
      {!hasQuery ? (
        <section className="community-video-section shell">
          <p className="eyebrow">Community walkthrough</p>
          <h2>See the rules used in a real match</h2>
          <p>This independent tutorial combines explanation with live play. It helps show timing and turn flow, but the official rules database below remains the source for exact rulings.</p>
          <CommunityVideoCard
            videoId="bDsuOFxtA5U"
            title="Palworld CCG — Tutorial and Live Play — First Impressions"
            channelName="Tabletop Royale"
            description="Watch the basic rules move from explanation into a real tabletop game."
          />
        </section>
      ) : null}
      <RuleExplorer initialQuery={q} />
      <div className="shell">
        <AdsterraBannerAd />
      </div>
    </>
  );
}
