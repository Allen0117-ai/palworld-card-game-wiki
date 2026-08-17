import type { Metadata } from "next";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { cards, decks, getCardImageAlt } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { DeckExplorer, type DeckPreview } from "@/components/DeckExplorer";
import { SeoImagePanel } from "@/components/SeoImagePanel";
import { HubLinkGrid } from "@/components/HubLinkGrid";
import { VideoEmbed } from "@/components/VideoEmbed";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Palworld TCG Starter Deck Lists & Trial Deck Guides",
  description: "Compare Palworld TCG starter deck lists, both official Trial Deck pools and a complete 50-card beginner deck with illustrated plans and key combinations.",
  path: "/decks",
  absoluteTitle: true,
});

export default function DecksPage() {
  const deckPreviews: DeckPreview[] = decks.map((deck) => ({
    slug: deck.slug,
    name: deck.name,
    colors: deck.colors,
    archetype: deck.archetype,
    status: deck.status,
    description: deck.description,
    hasRecipe: Boolean(deck.recipe),
    previewCards: deck.core.slice(0, 3).map((cardSlug) => {
      const card = cards.find((item) => item.slug === cardSlug);
      if (!card) throw new Error(`${deck.name} references missing preview card ${cardSlug}`);
      return {
        slug: card.slug,
        image: card.image,
        imageAlt: getCardImageAlt(card),
        isStructure: card.type === "Structure",
      };
    }),
  }));

  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: decks.map((deck, index) => ({ "@type": "ListItem", position: index + 1, url: `https://palworldcardgame.wiki/deck/${deck.slug}` })) },
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "Palworld OFFICIAL CARD GAME Play Guide Video",
          description: "Official subtitled play guide showing the board, Souls, attacks and Structures in motion.",
          thumbnailUrl: "https://i.ytimg.com/vi/jniYAuCaaBE/hqdefault.jpg",
          uploadDate: "2026-05-07",
          duration: "PT13M19S",
          embedUrl: "https://www.youtube-nocookie.com/embed/jniYAuCaaBE",
          contentUrl: "https://www.youtube.com/watch?v=jniYAuCaaBE",
        },
      ]} />
      <header className="page-hero shell">
        <p className="eyebrow"><span>Illustrated deck center</span> · Updated August 17, 2026</p>
        <h1>Palworld TCG deck lists.<br />Learn the sequence.</h1>
        <p>Choose between two official Trial Deck lists and one complete 50-card BP01 beginner deck. Every starter deck guide shows what to play early, how the key cards combine and how the deck aims to finish.</p>
      </header>
      <div className="shell">
        <HubLinkGrid
          eyebrow="Choose by goal"
          title="What do you want from your next deck?"
          intro="Pick the situation that matches you. Each route leads to a complete guide instead of one unsupported overall ranking."
          items={[
            { href: "/deck/red-blue-launch-pressure", label: "First match", title: "Start with the direct plan", description: "Use Red and Blue for Materials, Structures and clear pressure." },
            { href: "/deck/green-blue-base-value", label: "More tactical", title: "Practice setup and timing", description: "Use Green and Purple for Ingredients, Taunt and Stealth." },
            { href: "/deck/mono-red-pal-rush", label: "Copy a full list", title: "Load a complete 50-card deck", description: "Open a beginner BP01 list and remix it in the builder." },
            { href: "/blog/palworld-tcg-tournament-decklists", label: "Early official results", title: "Review Osaka and Tokyo recipes", description: "See the first published Grand Release lists with their event context." },
          ]}
          compact
          headingId="deck-goal-title"
        />
      </div>
      <div className="seo-image-panel-shell shell">
        <SeoImagePanel
          label="Official Trial Deck cards"
          title="Red / Blue TD01 and Green / Purple TD02"
          caption="Four cards that introduce the Material, Structure, Taunt and Stealth plans in the two Palworld Trial Decks."
          cardNumbers={["ETD01-008", "ETD01-018", "ETD02-006", "ETD02-018"]}
        />
      </div>
      <DeckExplorer decks={deckPreviews} />
      <div className="shell">
        <AdsterraBannerAd />
      </div>
      <section className="shell section deck-video-section" aria-labelledby="deck-video-title">
        <p className="eyebrow"><span>Watch before you build</span> · Official play guide</p>
        <h2 id="deck-video-title">See how a first game moves.</h2>
        <p>Watch the shorter official demonstration after comparing the decks. It shows how Souls, Pals, Structures and attacks fit together before you open a list in the builder.</p>
        <VideoEmbed
          videoId="jniYAuCaaBE"
          title="Palworld Official Card Game Play Guide"
          description="See the board, Souls, Structures and attacks in a compact subtitled demonstration."
          sourceLabel="Official Play Guide · English subtitles"
          note="Prototype cards shown; use current card text for final details"
        />
      </section>
      <div className="shell section">
        <HubLinkGrid
          eyebrow="Next step"
          title="Turn a deck idea into a first game."
          intro="Check the construction rules, find a card, or open a sample list in the builder."
          items={[
            { href: "/blog/palworld-card-game-deck-building-rules", label: "Rules guide", title: "Check deck limits", description: "Learn the 50-card, two-color and copy-limit rules." },
            { href: "/tools/deck-builder", label: "Free tool", title: "Build your version", description: "Edit a list and check it as you go." },
            { href: "/cards", label: "Card database", title: "Find cards to add", description: "Search every launch card by name or effect." },
            { href: "/updates", label: "Verified changes", title: "Check the latest format notes", description: "See which cards, rules or deck guides changed." },
          ]}
          headingId="deck-next-step-title"
        />
      </div>
    </>
  );
}
