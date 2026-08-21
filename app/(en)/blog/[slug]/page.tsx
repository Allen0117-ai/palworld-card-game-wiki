import { notFound } from "next/navigation";
import Link from "next/link";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { AdsterraNativeAd } from "@/components/AdsterraNativeAd";
import Image from "next/image";
import { cardByNumber, guides } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideToc } from "@/components/GuideToc";
import { getGuidePrimaryImage, GuideSeoImagePanel } from "@/components/SeoImagePanel";
import { SharePanel } from "@/components/SharePanel";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { EditorialByline } from "@/components/EditorialByline";
import { VideoEmbed } from "@/components/VideoEmbed";
import { CommunityVideoCard } from "@/components/CommunityVideoCard";
import type { Metadata } from "next";
import {
  createBreadcrumbJsonLd,
  createEditorialAuthorJsonLd,
  createPageMetadata,
  createPublisherJsonLd,
} from "@/lib/seo";
import { getEnglishGuideMaintenance } from "@/lib/content-maintenance";
import {
  commercialGuideContent,
  commercialGuidePrimaryActions,
  commercialGuideQuickAnswers,
  commercialGuideSources,
  commercialRelatedGuideSlugs,
} from "@/lib/commercial-guide-content";
import {
  competitiveGuideContent,
  competitiveGuidePrimaryActions,
  competitiveGuideQuickAnswers,
  competitiveGuideSources,
  competitiveRelatedGuideSlugs,
} from "@/lib/competitive-guide-content";

function GuideCardStrip({ numbers, caption }: { numbers: string[]; caption: string }) {
  const cards = numbers.map((number) => {
    const card = cardByNumber(number);
    if (!card) throw new Error(`Guide references missing card ${number}`);
    return card;
  });

  return (
    <figure className="guide-card-strip">
      <div>
        {cards.map((card) => (
          <Link href={`/card/${card.slug}`} key={card.number}>
            <Image
              src={card.image}
              alt={`${card.name} ${card.number} official card`}
              width={300}
              height={card.type === "Structure" ? 215 : 419}
              sizes="(max-width: 600px) 31vw, 190px"
              unoptimized
            />
            <span>{card.name}<small>{card.number}</small></span>
          </Link>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type GuideSource = { label: string; href: string };
type GuideSourceKind = "Official" | "Official video" | "Community" | "Independent";

function getGuideSourceKind(source: GuideSource): GuideSourceKind {
  const label = source.label.toLowerCase();
  const hostname = new URL(source.href).hostname.replace(/^www\./, "");

  if (hostname === "reddit.com" || label.includes("community")) return "Community";
  if ((hostname === "youtube.com" || hostname === "youtu.be") && label.includes("official")) return "Official video";
  if (label.includes("official") || hostname.endsWith("palworld-official-cardgame.com")) return "Official";
  return "Independent";
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  const primaryImage = getGuidePrimaryImage(slug);
  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/blog/${guide.slug}`,
    absoluteTitle: true,
    type: "article",
    image: primaryImage,
  });
}

const guideQuickAnswers: Record<string, { label: string; answer: string }> = {
  "palworld-booster-box": {
    label: "The short answer",
    answer: "A sealed Dawn of Palpagos BP01 booster box contains 12 packs with 7 cards per pack—84 cards total. The official Japanese carton contains 12 boxes, or 144 packs and 1,008 cards before duplicates. Confirm English case quantities with the seller because the English product page does not publish a universal case configuration.",
  },
  "how-to-play-palworld-card-game": {
    label: "Start in three steps",
    answer: "1) Use a 50-card Main Deck and separate 10-card Soul Deck; set life to 10 and draw five cards. 2) Take turns in Stand, Draw, Soul, Main and End order, resting Souls to pay costs. 3) Deploy Pals, attack and block; reduce the opponent to 0 life or empty their Main Deck to win the match.",
  },
  "palworld-card-game-deck-building-rules": {
    label: "Legal deck checklist",
    answer: "A legal Palworld Card Game deck has exactly 50 cards in the Main Deck and exactly 10 Soul cards in a separate Soul Deck. The Main Deck may use no more than two of the four named colors—Red, Blue, Green and Purple—while Colorless cards may be added to any legal color combination. You may include up to four cards with the same complete printed card name, even when different card numbers, artwork or rarities exist. The 50-card Main Deck may contain no more than eight cards showing the Lucky icon. There is no required ratio of Pals, Gear, Events or Structures, so a list can be technically legal but still play poorly. Before saving a list, check the exact card count, chosen colors, duplicate-name total and Lucky total. Then make sure the opening hand can usually make an early play instead of containing only expensive finishers. The site's deck builder checks these construction limits automatically.",
  },
  "red-blue-vs-green-purple-trial-deck": {
    label: "Fast recommendation",
    answer: "Choose the Red/Blue Trial Deck, TD01, if you want the clearer first-game plan: create Materials, use Structures, apply direct damage and support attacks with draw, rest effects and defensive Quick cards. Choose the Green/Purple Trial Deck, TD02, if you enjoy building Ingredients, protecting key cards with Taunt, attacking through Stealth, using removal and planning effects in the correct order. Neither deck is stronger simply because of its included parallel card; that card changes the treatment, not the underlying rules text. Both products are complete beginner decks with a fixed 50-card Main Deck, 10 Soul cards, a paper playmat and guide, counters, one BP01 booster pack and one parallel replacement card. One deck is enough for one player. For two friends, buying one of each exposes all four launch colors and more mechanics; buying matching decks creates a simpler, more symmetrical learning game. Pick by preferred play style, not launch-week collector price.",
  },
  "palworld-card-game-products-where-to-buy": {
    label: "Best launch-day path",
    answer: "New player: buy one Trial Deck. Two new players: buy one Trial Deck each. Collector or upgrader: add Dawn of Palpagos boosters after you can already play a complete deck.",
  },
  "dawn-of-palpagos-card-list-guide": {
    label: "Launch database snapshot",
    answer: "BP01 contains 100 base cards. The two Trial Decks add 24 unique Main Deck entries each, giving players 148 searchable launch Main Deck cards before counting parallel treatments.",
  },
  "palworld-card-game-keyword-glossary": {
    label: "How to read a keyword",
    answer: "The bold keyword is a reusable rules shortcut. Parenthetical text explains it. The official Q&A says the effect is unchanged when a card omits the reminder text.",
  },
  "palworld-tcg-rarity-guide": {
    label: "Rarity in one minute",
    answer: "Dawn of Palpagos uses C, U, R and RR for base cards. Its parallel list also uses SR, OSR, SP and SSP, while Trial Decks use TSR and TSP. Match the complete card number before buying: rarity describes the printed treatment and scarcity, not automatic deck strength or guaranteed value.",
  },
  "dawn-of-palpagos-chase-cards": {
    label: "Collector answer",
    answer: "The four confirmed BP01 SSP cards are Jormuntide Ignis EBP01-001SSP, Chillet EBP01-025SSP, Lyleen EBP01-049SSP and Helzephyr EBP01-073SSP. They are clear collector targets, but launch-week prices are too unstable for an honest value ranking.",
  },
  "dawn-of-palpagos-pull-rates": {
    label: "Current answer",
    answer: "No official BP01 pull-rate percentage is available. Bushiroad confirms 100 base card types and 61 parallel card types, but it does not publish per-pack, per-box or per-rarity odds. Small community samples show which treatments can appear, not how often every sealed box will contain them. Expect duplicates, do not assume a specific parallel is guaranteed, and do not expect one 12-pack box to complete the base set.",
  },
  "palworld-online-vs-card-game": {
    label: "The direct answer",
    answer: "No. Palworld Online is a separate mobile MMO developed and published by Garena under license from Pocketpair. It is not an online client for the physical Palworld Official Card Game, and no official digital version of the card game has been announced.",
  },
  "palworld-1-0-vs-card-game": {
    label: "The direct answer",
    answer: "Palworld 1.0 and the Palworld Official Card Game share the same world and many familiar Pals, but they are different games. None of the 72 Pal records added in version 1.0 appear in the current 148-card launch database under the same name.",
  },
  "palworld-card-game-2026-roadmap": {
    label: "Next confirmed dates",
    answer: "Grand Release Tournaments run through August 31, store demos continue during September and October, accessories arrive from September 25, and Legends Awaken BP02 releases October 30. Eternal Ascent TD03 and TD04 follow on December 18, and an unnamed new booster pack is scheduled for January 29, 2027.",
  },
  "palworld-card-game-errata-tracker": {
    label: "Confirmed product notices",
    answer: "Two official launch notices are confirmed. A Red/Blue Trial Deck card omits its Strike text but remains legal with the corrected behavior. BP01 packs and boxes misspell “Palworld”; Bushiroad says the packaging spelling will be corrected in future reprints, and the notice does not change any card text or gameplay.",
  },
  "palworld-card-game-color-guide": {
    label: "Choose by play style",
    answer: "Red applies direct pressure, Blue controls tempo and cards, Green builds Ingredient-powered boards, and Purple disrupts combat through Stealth, removal, night and graveyard effects. A legal deck may use up to two of these colors plus Colorless cards.",
  },
  ...competitiveGuideQuickAnswers,
  ...commercialGuideQuickAnswers,
};

const guidePrimaryActions: Record<string, Array<{ label: string; detail: string; href: string }>> = {
  "palworld-booster-box": [
    { label: "Browse BP01 cards", detail: "See every card before buying", href: "/cards" },
    { label: "Compare Trial Decks", detail: "Choose a ready-to-play first deck", href: "/blog/red-blue-vs-green-purple-trial-deck" },
    { label: "Track your collection", detail: "Save BP01 progress on this device", href: "/tools/dawn-of-palpagos-checklist" },
  ],
  "how-to-play-palworld-card-game": [
    { label: "Search a rule", detail: "Check all official Q&As", href: "/rules" },
    { label: "Copy a beginner deck", detail: "Open an illustrated 50-card list", href: "/deck/mono-red-pal-rush" },
    { label: "Build your own deck", detail: "Use legal limits while you build", href: "/tools/deck-builder" },
  ],
  "palworld-card-game-deck-building-rules": [
    { label: "Open the deck builder", detail: "Check cards, colors and Lucky limits", href: "/tools/deck-builder" },
    { label: "Copy a legal deck", detail: "Start from a complete 50-card list", href: "/deck/mono-red-pal-rush" },
    { label: "Search official rulings", detail: "Check card-specific questions and exceptions", href: "/rules" },
  ],
  "palworld-card-game-keyword-glossary": [
    { label: "Search official rulings", detail: "Find card-specific answers", href: "/rules" },
    { label: "Browse keyword cards", detail: "Search card text and effects", href: "/cards" },
    { label: "See keywords in a deck", detail: "Learn with illustrated combinations", href: "/decks" },
  ],
  "palworld-tcg-rarity-guide": [
    { label: "Browse every BP01 card", detail: "Filter the official card list", href: "/cards" },
    { label: "See chase artwork", detail: "Compare confirmed SSP and SP cards", href: "/blog/dawn-of-palpagos-chase-cards" },
    { label: "Track your set", detail: "Save base and parallel progress", href: "/tools/dawn-of-palpagos-checklist" },
  ],
  "palworld-card-game-errata-tracker": [
    { label: "Search all rulings", detail: "Check the official Q&A database", href: "/rules" },
    { label: "Read deck rules", detail: "Confirm every legal deck limit", href: "/blog/palworld-card-game-deck-building-rules" },
    { label: "Browse corrected cards", detail: "Open official card details", href: "/cards" },
  ],
  "palworld-card-game-color-guide": [
    { label: "Compare beginner decks", detail: "Red/Blue or Green/Purple", href: "/blog/red-blue-vs-green-purple-trial-deck" },
    { label: "Build a two-color deck", detail: "See legality checks as you add cards", href: "/tools/deck-builder" },
    { label: "Browse by color", detail: "Filter all 148 launch cards", href: "/cards" },
  ],
  "palworld-online-vs-card-game": [
    { label: "Browse the card database", detail: "See the current 148-card launch pool", href: "/cards" },
    { label: "Learn the card game", detail: "Set up and play a first match", href: "/blog/how-to-play-palworld-card-game" },
    { label: "Compare with Palworld 1.0", detail: "See which ideas carry over", href: "/blog/palworld-1-0-vs-card-game" },
  ],
  "palworld-1-0-vs-card-game": [
    { label: "Browse Pal cards", detail: "Open the launch Pal collection", href: "/cards/pals" },
    { label: "Build a card game deck", detail: "Use every current launch card", href: "/tools/deck-builder" },
    { label: "Read about Palworld Online", detail: "Separate the MMO from the card game", href: "/blog/palworld-online-vs-card-game" },
  ],
  ...competitiveGuidePrimaryActions,
  ...commercialGuidePrimaryActions,
};

const guideContent: Record<string, React.ReactNode> = {
  "palworld-booster-box": (
    <>
      <h2>Dawn of Palpagos Booster Box — What&apos;s Inside</h2>
      <p>The Palworld Dawn of Palpagos Booster Box is the sealed display for BP01, the first booster set for the Palworld Official Card Game. It launched on July 30, 2026 alongside the Red/Blue and Green/Purple Trial Decks.</p>
      <div className="stat-table">
        <div><strong>12</strong><span>packs per box</span></div>
        <div><strong>7</strong><span>cards per pack</span></div>
        <div><strong>84</strong><span>cards opened</span></div>
        <div><strong>100</strong><span>base card types</span></div>
        <div><strong>61</strong><span>parallel types</span></div>
      </div>
      <p>The 84-card total counts every card opened, not 84 guaranteed unique cards. Duplicate cards are normal, and one box is not guaranteed to complete the set.</p>

      <h3>Pack breakdown — 12 packs × 7 cards</h3>
      <p>Each sealed box contains 12 booster packs, and each pack contains 7 cards. The cards can include Pals, Gear, Events and Structures from the four colors plus Colorless cards.</p>

      <h2>How many boxes are in a Palworld booster case?</h2>
      <p>The official Japanese product specification calls the outer case a carton and lists <strong>12 boxes per carton</strong>. With 12 packs in each box and 7 cards in each pack, that Japanese carton contains 144 packs and 1,008 cards before duplicates.</p>
      <div className="comparison-table" role="region" aria-label="Palworld booster box and Japanese carton quantities" tabIndex={0}>
        <div className="comparison-head"><span>Product</span><strong>Sealed quantity</strong><strong>Total cards</strong></div>
        <div><span>1 pack</span><p>7 cards</p><p>7 cards</p></div>
        <div><span>1 box</span><p>12 packs</p><p>84 cards</p></div>
        <div><span>1 Japanese carton</span><p>12 boxes / 144 packs</p><p>1,008 cards</p></div>
      </div>
      <div className="callout"><strong>English case warning:</strong> the official English BP01 page confirms 12 packs per box but does not publish a case count. Before buying an English “case,” ask the seller how many factory-sealed boxes are included and whether the listing is a distributor case or a store-made bundle.</div>

      <h3>Card rarities and pull rates</h3>
      <p>The official base rarities are C, U, R and RR, with separate parallel treatments. Bushiroad has not published guaranteed per-box pull odds, so no specific number of rare or parallel cards should be treated as guaranteed.</p>
      <div className="callout"><strong>Pull-rate warning:</strong> early box openings are useful observations, but they are not official odds. See our <Link className="text-link" href="/blog/dawn-of-palpagos-pull-rates">verified pull-rate tracker</Link> before relying on community estimates.</div>

      <h3>Dawn of Palpagos BP01 card list</h3>
      <p>BP01 has 100 base cards and 61 parallel card types. Browse the complete searchable list before buying so you know which colors, cards and artwork you want to open.</p>
      <Link className="button primary" href="/cards">Browse the BP01 card list</Link>

      <h2>Palworld Booster Box Price — What Should You Compare?</h2>
      <p>There is no single reliable worldwide price to publish: retailer prices, stock, shipping and tax change by country and can move quickly after release. Compare the final delivered price instead of trusting the first listing or a marketplace asking price.</p>
      <h3>Does Dawn of Palpagos have an official English MSRP?</h3>
      <p>The official English BP01 page lists the release date, set size and product contents but does not publish one universal English MSRP. Treat a retailer&apos;s “MSRP” label as a local claim and compare the final delivered price in your own country.</p>
      <div className="comparison-table" role="region" aria-label="Palworld booster box price comparison checklist" tabIndex={0}>
        <div className="comparison-head"><span>Check</span><strong>Why it matters</strong><strong>What to verify</strong></div>
        <div><span>Product</span><p>Single packs and sealed boxes are different listings.</p><p>“BP01,” “Dawn of Palpagos” and “12 packs.”</p></div>
        <div><span>Language</span><p>Tournament support differs by region.</p><p>English edition if you play outside Asian territories.</p></div>
        <div><span>Condition</span><p>Loose packs do not equal a sealed display.</p><p>Factory-sealed box and a clear return policy.</p></div>
        <div><span>Total cost</span><p>A low sticker price can hide expensive delivery.</p><p>Price plus shipping, tax and import fees.</p></div>
        <div><span>Seller</span><p>Marketplace stock can be unverified or overpriced.</p><p>Official retailer status, reviews and buyer protection.</p></div>
      </div>

      <h3>Is a Palworld Booster Box worth it?</h3>
      <p>A box makes the most sense for collectors, players who enjoy opening packs, or players upgrading more than one deck. It is a weaker first purchase if your main goal is to start playing immediately, because a box does not guarantee a legal 50-card Main Deck plus 10-card Soul Deck.</p>

      <h2>Where to Buy Dawn of Palpagos Booster Boxes</h2>
      <ol>
        <li>Start with Bushiroad&apos;s official retailer finder.</li>
        <li>Confirm the listing says BP01 Dawn of Palpagos and 12 packs per box.</li>
        <li>Check the language, sealed condition, delivery date and return policy.</li>
        <li>Compare the final delivered price across at least two trusted stores.</li>
      </ol>
      <p><a className="button primary" href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Find an official retailer ↗</a></p>
      <div className="callout"><strong>Affiliate disclosure:</strong> this page has no paid shopping links. The retailer finder above is Bushiroad&apos;s official store list.</div>

      <h2>Booster Box vs Trial Deck — Which Should You Buy?</h2>
      <div className="comparison-table" role="region" aria-label="Palworld booster box and Trial Deck comparison" tabIndex={0}>
        <div className="comparison-head"><span>Question</span><strong>Booster Box</strong><strong>Trial Deck</strong></div>
        <div><span>Contents</span><p>12 random packs, 84 cards total</p><p>Fixed 50-card deck, 10 Souls and play accessories</p></div>
        <div><span>Ready to play?</span><p>No complete legal deck is guaranteed</p><p>Yes, immediately</p></div>
        <div><span>Best for</span><p>Collecting, opening and upgrades</p><p>Learning and playing a first game</p></div>
        <div><span>Card choice</span><p>Random cards from BP01</p><p>Known Red/Blue or Green/Purple list</p></div>
        <div><span>Simple pick</span><p>Buy after choosing a deck or collecting goal</p><p>Buy first if you are a new player</p></div>
      </div>
      <p>Not sure which starter product fits your play style? Compare the <Link className="text-link" href="/blog/red-blue-vs-green-purple-trial-deck">Red/Blue and Green/Purple Trial Decks</Link>.</p>

      <h2>Palworld Booster Box FAQ</h2>
      <h3>How many packs are in a Palworld Booster Box?</h3>
      <p>A Dawn of Palpagos BP01 booster box contains 12 booster packs.</p>
      <h3>How many cards are in a Palworld Booster Box?</h3>
      <p>There are 7 cards per pack and 12 packs per box, for 84 cards total. Duplicates are possible.</p>
      <h3>How many booster boxes are in a Palworld case?</h3>
      <p>The official Japanese carton contains 12 boxes. The official English product page does not publish a universal English case count, so verify the exact sealed quantity in the seller&apos;s listing.</p>
      <h3>Are Palworld Booster Box pull rates guaranteed?</h3>
      <p>No official per-box pull odds have been published. Do not treat early opening videos or small community samples as guaranteed ratios.</p>
      <h3>Can I play with one Booster Box?</h3>
      <p>A box does not guarantee a legal deck. A Trial Deck is the safer first purchase because it includes a fixed 50-card Main Deck and 10 Soul cards.</p>
      <h3>What set is the first Palworld Booster Box?</h3>
      <p>The first box is BP01 Dawn of Palpagos, released July 30, 2026.</p>
      <h3>What is the Dawn of Palpagos Booster Box MSRP?</h3>
      <p>The official English product page does not publish one universal MSRP. Local prices vary by country, tax, shipping and store stock.</p>
    </>
  ),
  "how-to-play-palworld-card-game": (
    <>
      <h2>What do you need to play the Palworld Card Game?</h2>
      <ul>
        <li><strong>Main Deck:</strong> exactly 50 Pal, Gear, Event and Structure cards.</li>
        <li><strong>Soul Deck:</strong> exactly 10 Soul cards. Souls are the resource used to pay card and ability costs.</li>
        <li><strong>Counters:</strong> track life, Materials and Ingredients when cards create or consume them.</li>
        <li><strong>A playmat:</strong> optional for casual play, but very helpful while learning the Base, Soul Area, decks and Graveyard.</li>
      </ul>
      <div className="callout"><strong>Best first purchase:</strong> either Trial Deck is ready to play and includes a 50-card Main Deck, 10-card Soul Deck, paper playmat and play guide, counters and one BP01 booster pack.</div>

      <h2>Watch the official game tutorial</h2>
      <p>This 11-minute publisher tutorial shows the table layout, turn flow, card deployment, attacks, blocking and Damage Checks. Keep the current Quick Manual nearby for exact wording and any later rules updates.</p>
      <VideoEmbed
        videoId="UdbMWxWcMcw"
        title="Palworld Official Card Game tutorial"
        description="Watch the full setup, turn flow, combat and Damage Check demonstration."
        sourceLabel="Official tutorial · 11:09 · Published June 18, 2026"
        note="Prototype cards shown; current rules and card text control"
      />

      <h2>Watch a community beginner walkthrough</h2>
      <p>This independent walkthrough gives new players another explanation of the basic flow. Use it as a visual companion; the current official rules and Q&amp;A still control every ruling.</p>
      <CommunityVideoCard
        videoId="08i8nsunjOk"
        title="How to play the PalWorld Official Card Game"
        channelName="The Card Gamer"
        description="A second beginner-friendly look at setup, turns and playing a first match."
      />

      <h2>How do you set up your first game?</h2>
      <ol>
        <li>Place and shuffle your Main Deck. Place the separate Soul Deck beside your Soul Area.</li>
        <li>Set both life counters to 10.</li>
        <li>Decide who goes first. The winner of the chosen method may choose first or second.</li>
        <li>The player going second puts one Soul from their Soul Deck into the Soul Area in the stand state.</li>
        <li>Each player draws five Main Deck cards.</li>
        <li>Starting with the first player, each player may mulligan once. A mulligan returns all five cards, shuffles the deck, then draws five new cards; you cannot keep only some cards.</li>
      </ol>
      <p>Need to build your own list first? <Link className="text-link" href="/blog/palworld-card-game-deck-building-rules">Check the full deck-building rules</Link>, including colors, copy limits and Lucky cards.</p>

      <h2>What are the five phases of a turn?</h2>
      <div className="phase-list">
        <div><span>1</span><strong>Stand Phase</strong><p>Stand all cards in your Base and Soul Area so they can be used again.</p></div>
        <div><span>2</span><strong>Draw Phase</strong><p>Draw one card. The player going first skips this phase on their first turn.</p></div>
        <div><span>3</span><strong>Soul Phase</strong><p>Move two Souls from the Soul Deck into the Soul Area in the stand state. The Soul Area cannot exceed 10 Souls.</p></div>
        <div><span>4</span><strong>Main Phase</strong><p>Play cards, activate abilities, assign Pals to Structures, attack, or rest three Souls to draw one extra card once per turn.</p></div>
        <div><span>5</span><strong>End Phase</strong><p>Damage on Pals and Structures becomes 0, end-of-turn effects finish, then pass the turn.</p></div>
      </div>

      <h2>What each card type does</h2>
      <ul>
        <li><strong>Pals</strong> form your team. They can attack, block and work at Structures. A Pal has Power for battle and Strike for player damage.</li>
        <li><strong>Structures</strong> stay in your Base and create ongoing value. Many ask you to assign a Pal by resting it.</li>
        <li><strong>Gear</strong> supports Pals or provides reusable effects after deployment.</li>
        <li><strong>Events</strong> resolve a one-time effect, then normally go to the Graveyard.</li>
        <li><strong>Souls</strong> are kept in a separate deck and rested to pay costs.</li>
      </ul>

      <h2>Practice one real TD01 engine turn</h2>
      <p>This example uses current Red/Blue Trial Deck cards and their printed effects. It is a rules practice line, not a claim that it is always the best play.</p>
      <GuideCardStrip
        numbers={["ETD01-008", "ETD01-024", "ETD01-009"]}
        caption="Stone Pit creates Materials and a card; Ribbuny can be assigned to work; Weapon Workbench turns a Material and another assignment into damage and extra Strike."
      />
      <ol>
        <li><strong>Look for a playable hand:</strong> Stone Pit plus a cost-2 Pal gives you a concrete early plan. A hand crowded with cost-6 to cost-8 cards is a sensible full-hand mulligan.</li>
        <li><strong>Spend three ready Souls:</strong> pay one to deploy <Link className="text-link" href="/card/stone-pit-etd01-008">Stone Pit</Link>, then two to deploy <Link className="text-link" href="/card/ribbuny-little-princess-etd01-024">Ribbuny</Link>.</li>
        <li><strong>Work the Structure:</strong> rest and assign Ribbuny to Stone Pit. Its printed ability gives you three Materials and draws one card.</li>
        <li><strong>Convert the resource later:</strong> <Link className="text-link" href="/card/weapon-workbench-etd01-009">Weapon Workbench</Link> can consume one Material and assign a Pal to deal 800 damage to a Pal, then give all your Pals Strike +1 for that turn.</li>
      </ol>
      <div className="callout"><strong>Important:</strong> Materials are counters created by card effects; they do not replace Souls. Souls pay the printed cost in the top-left corner, while Materials pay only effects that specifically ask you to consume them.</div>

      <h2>How do attacking, blocking and battles work?</h2>
      <p>Rest one of your standing Pals to attack. The target can be the opposing player, a Structure, or normally a Pal already in the rest state. Assault is the keyword that allows a Pal to attack standing Pals.</p>
      <h3>If a Pal attacks another Pal</h3>
      <p>Both combat Pals deal damage equal to their Power to each other. A Pal is put into the Graveyard when its damage is equal to or greater than its current Power.</p>
      <h3>If a Pal attacks a Structure</h3>
      <p>The Pal deals its Power as damage to the Structure&apos;s Durability. A Structure does not deal damage back.</p>
      <h3>If a Pal attacks the opposing player</h3>
      <p>The defending player may rest a Pal to block, changing the attack target to that blocker. The defender may also use legal Quick cards or Interrupt effects at their stated timing.</p>

      <h2>How do Damage Checks and the Lucky icon work?</h2>
      <p>If a player attack is not blocked or interrupted, put cards from the top of the defending player&apos;s Main Deck into the Graveyard one at a time, up to the attacker&apos;s Strike. If no Lucky icon appears, the defender then loses life equal to the full Strike. If a Lucky icon appears, the check stops and that life loss is cancelled.</p>
      <div className="example-box"><strong>Example</strong><p>A Pal with Strike 4 hits the opposing player. If the second checked card has a Lucky icon, those two cards remain in the Graveyard, the check stops, and the defender loses no life from that damage.</p></div>

      <h2>First-game mistakes to avoid</h2>
      <ul>
        <li>Do not mix the 10-card Soul Deck into the Main Deck.</li>
        <li>Do not attack a standing opposing Pal unless your card has Assault or another effect allows it.</li>
        <li>Remember that the first player skips their first Draw Phase.</li>
        <li>Damage clears in the End Phase, but a Pal or Structure destroyed before then still goes to the Graveyard.</li>
        <li>Keep a possible Interrupt or Quick response in mind before spending every Soul.</li>
      </ul>
    </>
  ),

  "palworld-card-game-deck-building-rules": (
    <>
      <h2>How many cards are in a legal Palworld deck?</h2>
      <p>Your Main Deck contains Pals, Gear, Events and Structures. It must contain exactly 50 cards. The Soul Deck contains exactly 10 Soul cards and does not count toward the 50.</p>
      <p>For card-specific interactions and exceptions, <Link className="text-link" href="/rules">search the rules and official Q&amp;A</Link>.</p>
      <h2>How many colors can a deck use?</h2>
      <p>A Main Deck may use up to two of Red, Blue, Green and Purple. Colorless cards can be included with any chosen colors. The rule limits colors in deck construction; it does not require an even split.</p>
      <div className="example-box"><strong>Legal examples</strong><p>Red only; Red and Blue; Green and Purple plus Colorless; or a Colorless-only deck.</p></div>
      <h2>How does the four-copy limit work?</h2>
      <p>You may include up to four cards with the same card name in total, even when the card number, artwork or rarity differs. The official Q&amp;A defines the Main Name as the portion before the “–”, but the deck copy limit applies to the complete printed card name.</p>
      <h2>How many Lucky-icon cards are legal?</h2>
      <p>A legal 50-card Main Deck may include up to eight cards with the Lucky icon. The normal same-name copy limit still applies, so eight Lucky cards cannot all be copies of one name.</p>
      <h2>There is no required card-type ratio</h2>
      <p>The official Q&amp;A confirms that a deck may use any number of Pal, Gear, Structure and Event cards as long as all construction rules are followed. A 50-Pal deck is technically legal, but legal does not mean consistent.</p>
      <h2>A beginner-friendly starting structure</h2>
      <p>There is no official required ratio, so use this as a beginner-friendly starting point rather than a deck-building rule:</p>
      <ul>
        <li><strong>Early plays:</strong> enough cost 2-4 cards to avoid passing the first useful turns.</li>
        <li><strong>Engines:</strong> cards that draw, create Materials or Ingredients, or repeatedly improve the Base.</li>
        <li><strong>Interaction:</strong> damage, resting, removal, Quick or Interrupt cards.</li>
        <li><strong>Finishers:</strong> a smaller group of expensive cards that end a game or swing a board.</li>
      </ul>
      <h2>Five checks before saving a deck</h2>
      <ol>
        <li>Is the Main Deck exactly 50 cards?</li>
        <li>Did you choose no more than two non-Colorless colors?</li>
        <li>Are there no more than four copies of each full card name?</li>
        <li>Are there no more than eight Lucky-icon cards?</li>
        <li>Can the opening hand usually play something before the expensive finishers?</li>
      </ol>
      <Link className="button primary" href="/tools/deck-builder">Check a list in the deck builder</Link>
    </>
  ),

  "red-blue-vs-green-purple-trial-deck": (
    <>
      <h2>What comes in each Palworld Trial Deck?</h2>
      <ul>
        <li>A fixed 50-card Main Deck and 10-card Soul Deck.</li>
        <li>A paper playmat and play guide.</li>
        <li>Life, Material and Ingredient counters.</li>
        <li>One Dawn of Palpagos BP01 booster pack.</li>
        <li>One parallel-rarity card replacing a card in the Main Deck.</li>
      </ul>
      <h2>See the launch Trial Decks up close</h2>
      <p>This independent first look shows the physical Trial Deck products before you choose one. Use the verified card-pool links below for exact card text and product facts.</p>
      <CommunityVideoCard
        videoId="ItjyWw-tGKY"
        title="Trial Deck Dawn of Palpagos First Look"
        channelName="Bob's Japan"
        description="See the launch Trial Deck products, cards and included items in a hands-on preview."
      />
      <h2>Palworld starter deck lists: TD01 and TD02</h2>
      <p>Palworld calls its starter products Trial Decks. Each official card-pool page below lists all 24 unique Main Deck cards, with card numbers, effects and a beginner play sequence. The public product pages do not publish copy-by-copy quantities for the fixed 50-card deck, so these are verified card pools rather than reconstructed recipes.</p>
      <p><Link className="text-link" href="/deck/red-blue-launch-pressure">Open the TD01 Red / Blue card list →</Link></p>
      <p><Link className="text-link" href="/deck/green-blue-base-value">Open the TD02 Green / Purple card list →</Link></p>
      <div className="comparison-table" role="region" aria-label="Trial Deck comparison table" tabIndex={0}>
        <div className="comparison-head"><span>Question</span><strong>Red / Blue TD01</strong><strong>Green / Purple TD02</strong></div>
        <div><span>Main feel</span><p>Damage, Structures, card flow</p><p>Ingredients, Taunt, Stealth, removal</p></div>
        <div><span>Resource engine</span><p>Stone Pit creates Materials and draws</p><p>Berry Plantation creates Ingredients and draws</p></div>
        <div><span>Defense</span><p>Rest effects, Quick cards and Interrupt</p><p>Taunt bodies, life gain and Interrupt</p></div>
        <div><span>Closing threats</span><p>Grizzbolt, Blazamut, Mammorest Cryst</p><p>Broncherry, Felbat, Astegon, Mammorest</p></div>
        <div><span>Best for</span><p>Players who want a direct plan</p><p>Players who enjoy setup and sequencing</p></div>
      </div>
      <h2>Why should a beginner choose Red / Blue?</h2>
      <p>TD01&apos;s Red cards make Materials and convert them into damage. Stone Pit and Weapon Workbench show the relationship clearly. Blue supports the plan with card draw, resting effects and defensive Quick cards. New players can usually see the next action without tracking as many conditional effects.</p>
      <h2>Who should choose Green / Purple?</h2>
      <p>TD02 uses Ingredients for Green power boosts and life gain while Purple changes combat with Stealth, removal and graveyard recovery. Cards such as Astegon can affect both players&apos; Pals, so the order of actions matters more.</p>
      <h2>Which Trial Decks should two friends buy?</h2>
      <p>Buying one of each gives both players different mechanics and exposes the full four-color launch experience. If both players want the simplest learning match, two copies of the same Trial Deck create a more symmetrical game, but one of each is more useful for discovering personal preferences.</p>
      <h2>Do not choose by rarity alone</h2>
      <p>Both decks include a parallel replacement, but the treatment does not change the underlying rules text. Choose the play pattern you want to learn; the included booster pack is a bonus, not a complete upgrade plan.</p>
      <h2>Why one Trial Deck card may look different</h2>
      <p>Every Trial Deck includes one TSR or TSP parallel card in place of a card in the fixed 50-card Main Deck. The deck still contains 50 cards and remains ready to play. If you prefer to protect an expensive-looking parallel, you can play it in a sleeve or obtain the regular version of the same card for the deck; launch-day marketplace asking prices are not verified long-term values.</p>
      <Link className="button primary" href="/decks">Open both Trial Deck guides</Link>
    </>
  ),

  "palworld-card-game-products-where-to-buy": (
    <>
      <h2>Launch date and products</h2>
      <p>The Palworld Official Card Game launched on July 30, 2026 with the Dawn of Palpagos BP01 booster and two Trial Decks: Red/Blue TD01 and Green/Purple TD02.</p>
      <h2>What a Trial Deck gives you</h2>
      <p>Each Trial Deck can be played immediately. It includes the 50-card Main Deck, 10 Soul cards, a paper playmat and guide, life and resource counters, and one BP01 booster. This is the most complete first purchase because a booster pack alone cannot create a legal deck.</p>
      <h2>What BP01 is for</h2>
      <p>Dawn of Palpagos contains 100 base card types plus 61 parallel card types. Use boosters to collect, experiment and upgrade after you have a playable foundation. Parallel artwork may be more collectible, but the rarity treatment does not automatically make a card stronger in play.</p>
      <h2>Where to buy safely</h2>
      <ol>
        <li>Start with Bushiroad&apos;s official retailer finder.</li>
        <li>Confirm the language and product code: BP01, TD01 or TD02.</li>
        <li>Check whether a listing is a single pack, sealed box or Trial Deck.</li>
        <li>Avoid paying a premium based only on an unverified marketplace asking price.</li>
      </ol>
      <h2>Launch availability: what community reports can and cannot prove</h2>
      <p>Launch-day posts showed stock varying sharply by city. The official English account said on August 19 that additional BP01 stock is on the way and a 2nd Edition is planned, but it did not give an English arrival date. The official Japanese account separately expects additional first-edition shipments in Japan in late September. Check Bushi Navi, call the store before travelling and do not treat Japan&apos;s timing or a seller estimate as a worldwide schedule.</p>
      <div className="callout"><strong>Product notice:</strong> the Red/Blue Trial Deck has an official errata notice for omitted “Strike” text on one printed card. The product page says the card remains legal and functions with the corrected text.</div>
      <p><a className="button primary" href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Find an official retailer ↗</a></p>
    </>
  ),

  "dawn-of-palpagos-card-list-guide": (
    <>
      <h2>BP01 at a glance</h2>
      <div className="stat-table">
        <div><strong>100</strong><span>base cards</span></div>
        <div><strong>59</strong><span>Pals</span></div>
        <div><strong>19</strong><span>Structures</span></div>
        <div><strong>12</strong><span>Events</span></div>
        <div><strong>10</strong><span>Gear</span></div>
      </div>
      <h2>Base cards by color</h2>
      <p>The July 30 official card database snapshot contains 24 Red, 24 Blue, 24 Green, 25 Purple and 3 Colorless BP01 base cards.</p>
      <h2>Base cards by rarity</h2>
      <p>The searchable base set shows 34 C, 30 U, 24 R and 12 RR-level entries. One official database entry displays a combined “RR/SSP” label; parallel treatments are counted separately by the product as 61 types.</p>
      <h2>What the Trial Deck card pools add</h2>
      <p>TD01 adds 24 unique Red, Blue and Colorless Main Deck entries. TD02 adds 24 unique Green, Purple and Colorless entries. The sealed decks contain duplicates to reach 50 cards, plus a separate 10-card Soul Deck.</p>
      <h2>How to use the database</h2>
      <ul>
        <li>Search a Pal name or card number when checking a pull.</li>
        <li>Search an ability word such as “Interrupt” or “night” to find related cards.</li>
        <li>Filter by set before comparing Trial Deck cards with BP01 upgrades.</li>
        <li>Open any card’s detail page for its official text, stats and set information; selected cards also include beginner deck tips.</li>
      </ul>
      <Link className="button primary" href="/cards">Search all 148 launch cards</Link>
    </>
  ),

  "palworld-card-game-keyword-glossary": (
    <>
      <h2>Combat keywords</h2>
      <dl className="glossary-list">
        <div><dt>Assault</dt><dd>The Pal can attack opposing Pals in the stand state.</dd></div>
        <div><dt>Brave X</dt><dd>When this Pal attacks, it gets the printed amount of Power until end of turn.</dd></div>
        <div><dt>Breakthrough</dt><dd>When the opposing combat Pal goes to the Graveyard during this card&apos;s attack, the opposing player is also dealt damage.</dd></div>
        <div><dt>Stealth</dt><dd>This card cannot be blocked.</dd></div>
        <div><dt>Taunt</dt><dd>If a card with Taunt can legally be attacked, the opponent cannot choose another target. If several Taunt cards are available, the attacker chooses among them.</dd></div>
        <div><dt>Vigilance</dt><dd>At the end of your turn, stand this card.</dd></div>
      </dl>
      <h2>Response keywords</h2>
      <dl className="glossary-list">
        <div><dt>Quick</dt><dd>During your Main Phase it can be played normally. During the opponent&apos;s turn it can be used only during battle. Multiple Quick cards may be played one at a time.</dd></div>
        <div><dt>Interrupt</dt><dd>An ability used from the hand at Quick timing. Pay its listed cost to nullify the opponent&apos;s attack so battle damage does not occur.</dd></div>
      </dl>
      <h2>Ability timing labels</h2>
      <dl className="glossary-list">
        <div><dt>AUTO</dt><dd>Activates automatically when its condition is met. You normally cannot choose to ignore it.</dd></div>
        <div><dt>ACT</dt><dd>An activated ability you choose to use by paying the shown cost and meeting its timing.</dd></div>
        <div><dt>CONT</dt><dd>A continuous ability that applies while the card is in the Base and its condition is true, unless the text says otherwise.</dd></div>
        <div><dt>On Deploy</dt><dd>Activates whenever the card is deployed, including deployment from the deck or Graveyard by an effect.</dd></div>
      </dl>
      <h2>Palworld-specific terms</h2>
      <dl className="glossary-list">
        <div><dt>Assign</dt><dd>Rest a standing Pal to work at a Structure or pay the displayed assignment cost.</dd></div>
        <div><dt>Butcher</dt><dd>Put the specified Pal from your Base into the Graveyard.</dd></div>
        <div><dt>Material / Ingredient</dt><dd>Player resources created and consumed by card abilities. They have no effect by themselves.</dd></div>
        <div><dt>Night / Nocturnal</dt><dd>Night is a game state created by card effects. It has no default rule effect, but it enables cards that refer to night. Nocturnal gives the printed benefit while it is night.</dd></div>
      </dl>
      <div className="callout"><strong>Rules priority:</strong> for a specific interaction, search the official Q&amp;A by card number. This glossary explains the general rule but does not replace a card-specific ruling.</div>
    </>
  ),

  "palworld-tcg-rarity-guide": (
    <>
      <h2>Palworld TCG rarity levels: base labels</h2>
      <ul>
        <li><strong>C — Common:</strong> the broadest base rarity.</li>
        <li><strong>U — Uncommon:</strong> less frequent than Common.</li>
        <li><strong>R — Rare:</strong> a higher base rarity treatment.</li>
        <li><strong>RR — Double Rare:</strong> the top regular base label shown for most BP01 cards.</li>
      </ul>
      <p><Link className="text-link" href="/cards">Browse the card list</Link> to verify a card number, base rarity and official card text.</p>
      <h2>Parallel labels shown in the official card list</h2>
      <p>The live database includes labels such as SR, OSR, SP, SSP and a special Soul treatment. Trial Deck products use TSR and TSP labels for their parallel replacement cards. Parallel versions normally keep the same game identity and rules as the corresponding card.</p>
      <h2>Why rarity is not the same as power</h2>
      <p>A Common support card may be essential to a deck engine, while a visually rare card may not fit your colors or plan. Build around card text and consistency first; collect around artwork and scarcity separately.</p>
      <h2>How to evaluate a collectible card</h2>
      <ul>
        <li>Confirm the exact card number and rarity label.</li>
        <li>Compare the artwork with the official card list.</li>
        <li>Check condition, language and whether the listing is an actual completed sale.</li>
        <li>Do not treat launch-day asking prices as a stable market value.</li>
      </ul>
    </>
  ),

  "dawn-of-palpagos-chase-cards": (
    <>
      <h2>What counts as a Dawn of Palpagos chase card?</h2>
      <p>A chase card is a card collectors actively hope to open because of its rarity, artwork, character or market demand. It is not automatically the strongest card in a deck, and an expensive asking price does not prove a completed sale.</p>
      <div className="stat-table">
        <div><strong>30</strong><span>SR cards</span></div>
        <div><strong>15</strong><span>OSR cards</span></div>
        <div><strong>12</strong><span>SP cards</span></div>
        <div><strong>4</strong><span>SSP cards</span></div>
        <div><strong>1</strong><span>SSS Soul</span></div>
      </div>

      <h2>The four confirmed BP01 SSP cards</h2>
      <div className="comparison-table" role="region" aria-label="Dawn of Palpagos SSP chase cards" tabIndex={0}>
        <div className="comparison-head"><span>Card number</span><strong>Card</strong><strong>Why collectors notice it</strong></div>
        <div><span>EBP01-001SSP</span><p><Link className="text-link" href="/card/jormuntide-ignis-savage-lava-dragon">Jormuntide Ignis — Savage Lava Dragon</Link></p><p>Flagship Red Lucky Pal and a dramatic SSP treatment.</p></div>
        <div><span>EBP01-025SSP</span><p><Link className="text-link" href="/card/chillet-dragon-whisperer-ebp01-025">Chillet — Dragon Whisperer</Link></p><p>Popular Pal with a calm alternate-art scene.</p></div>
        <div><span>EBP01-049SSP</span><p><Link className="text-link" href="/card/lyleen-blessing-of-the-goddess">Lyleen — Blessing of the Goddess</Link></p><p>Character appeal plus a premium Green centerpiece.</p></div>
        <div><span>EBP01-073SSP</span><p><Link className="text-link" href="/card/helzephyr-wings-of-the-moonless-night-ebp01-073">Helzephyr — Wings of the Moonless Night</Link></p><p>High-contrast Purple artwork and the SSP label.</p></div>
      </div>

      <h2>Standout SP artwork to know</h2>
      <p>SP cards are a broader collector tier than SSP. Four easy cards to recognize are Suzaku EBP01-002SP, Mounted Machine Gun EBP01-015SP, Relaxaurus EBP01-026SP and Shadowbeak EBP01-074SP. Other collectors may prefer a different character, so this is an artwork shortlist rather than a price ranking.</p>

      <h2>How to check a chase-card price safely</h2>
      <ol>
        <li>Match the complete card number, including SSP, SP, OSR or SR.</li>
        <li>Confirm the language and condition shown in the listing.</li>
        <li>Compare completed sales, not only unsold asking prices.</li>
        <li>Use several recent sales and ignore a single extreme listing.</li>
        <li>Recheck the market before buying because launch-week prices move quickly.</li>
      </ol>
      <div className="callout"><strong>No investment ranking:</strong> this page identifies official variants and collector appeal. It does not promise that a card will hold or increase its value.</div>

      <h2>Track the full set</h2>
      <p>The master checklist includes all 100 base cards, 61 parallel cards and the special SSS Soul entry. Progress saves locally without an account.</p>
      <Link className="button primary" href="/tools/dawn-of-palpagos-checklist">Open the 162-card checklist</Link>
    </>
  ),

  "dawn-of-palpagos-pull-rates": (
    <>
      <h2>What is officially confirmed about BP01 pull rates?</h2>
      <p>Dawn of Palpagos released on July 30, 2026 and contains 100 base card types plus 61 parallel card types. The official card list identifies the available treatments, but the product page does not publish complete odds for each label.</p>
      <h2>Why are early opening videos not true pull rates?</h2>
      <p>One box or even ten boxes can show what is possible, but not a stable probability. Cases may vary, videos may omit packs, and replacement patterns can be misunderstood. Publishing a percentage without a large, auditable sample would mislead buyers.</p>
      <h2>What can community opening data tell us?</h2>
      <p>One public tracker has now collected results from more than 48 packs. That is more useful than a single opening, but it is still a small, mixed sample. Treat it as a community observation, not an official collation guarantee.</p>
      <h2>When is a pull-rate estimate useful?</h2>
      <ul>
        <li>Sealed product with the region and language recorded.</li>
        <li>Every pack counted, including duplicates.</li>
        <li>Card numbers and rarity labels checked against the official database.</li>
        <li>A visible sample size and clear separation between observed frequency and official guarantee.</li>
      </ul>
      <div className="callout"><strong>Status — July 31:</strong> the community sample is growing, but it is not large or controlled enough for us to present estimated odds as guarantees.</div>
    </>
  ),

  "palworld-online-vs-card-game": (
    <>
      <h2>No — Palworld Online is not the card game</h2>
      <p>The name has caused some understandable confusion. Palworld Online is a new mobile MMO from Garena, made under official license from Pocketpair. The Palworld Official Card Game is Bushiroad&apos;s physical two-player card game. They use the same wider Palworld setting, but one is not a digital version of the other.</p>
      <div className="callout"><strong>Confirmed August 3, 2026:</strong> Garena announced Palworld Online for mobile with a 2026 release window. The exact launch date has not been announced.</div>

      <h2>What Palworld Online actually is</h2>
      <p>Garena describes it as a multiplayer survival adventure built around a seamless shared world. Players will travel with Pals, form groups, build shared settlements and take part in both cooperative and competitive activities.</p>
      <ul>
        <li><strong>Platform:</strong> mobile, with touch controls and optional one-tap actions.</li>
        <li><strong>World:</strong> a connected open world with new story material and side stories.</li>
        <li><strong>Multiplayer:</strong> groups, shared bases, open-world bosses, PvE and PvP.</li>
        <li><strong>Developer and publisher:</strong> Garena, working under license from Pocketpair.</li>
        <li><strong>Release:</strong> planned for 2026; the date, regional rollout and business model are still unconfirmed.</li>
      </ul>

      <h2>Palworld Online vs the Palworld Official Card Game</h2>
      <div className="comparison-table" role="region" aria-label="Palworld Online and Palworld Official Card Game comparison" tabIndex={0}>
        <div className="comparison-head"><span>Question</span><strong>Palworld Online</strong><strong>Official Card Game</strong></div>
        <div><span>What is it?</span><p>A mobile survival MMO</p><p>A physical competitive card game</p></div>
        <div><span>Who makes it?</span><p>Garena under Pocketpair license</p><p>Bushiroad using the Palworld IP</p></div>
        <div><span>How do you play?</span><p>Explore, capture Pals, build and play with others</p><p>Use a 50-card Main Deck and 10-card Soul Deck</p></div>
        <div><span>Where?</span><p>Mobile devices</p><p>At a table with physical cards</p></div>
        <div><span>Availability</span><p>Planned for 2026; exact date pending</p><p>Released July 30, 2026</p></div>
      </div>

      <h2>Can you play the official card game online?</h2>
      <p>Palworld Online does not fill that role. As of August 5, 2026, Bushiroad has not announced an official digital client for the Palworld Official Card Game. Fan-made ways to play may exist, but they are separate from both Palworld Online and the official physical game.</p>

      <h2>Will Palworld Online add new cards to the TCG?</h2>
      <p>Nothing has been announced. A Pal or character appearing in Palworld Online does not automatically make it part of the card game. New cards are confirmed only when Bushiroad publishes a product announcement or adds them to the official card list.</p>
      <p>The sensible place to check is the <Link className="text-link" href="/cards">current card database</Link>, which covers all 148 launch Main Deck entries from BP01 and the two Trial Decks.</p>

      <h2>What card game players should watch next</h2>
      <ul>
        <li>Named Pals or characters revealed through official Palworld Online channels.</li>
        <li>Any Bushiroad announcement of a crossover, promo card or themed set.</li>
        <li>A confirmed release date, because the current 2026 window is broad.</li>
      </ul>
      <p>Until one of those announcements appears, the two games are best treated as separate releases that happen to share the same universe.</p>
    </>
  ),

  "palworld-1-0-vs-card-game": (
    <>
      <h2>They share a world, not a ruleset</h2>
      <p>Palworld 1.0 is the full release of Pocketpair&apos;s open-world survival game. The Palworld Official Card Game turns familiar Pals, gear and building ideas into a separate turn-based tabletop game. Knowing the video game helps with the names and flavor, but it does not teach you the card game rules.</p>
      <div className="stat-table">
        <div><strong>72</strong><span>Pal records added in 1.0</span></div>
        <div><strong>287</strong><span>Pals in the 1.0 game total</span></div>
        <div><strong>148</strong><span>launch Main Deck cards indexed</span></div>
        <div><strong>0</strong><span>exact matches from the 72 additions</span></div>
      </div>

      <h2>Are any of the 72 new Palworld 1.0 Pals in the card game?</h2>
      <p>Not in the current launch card pool. We compared the 72 Pal records added between the last Early Access build and version 1.0 with every name in the 148-card BP01, TD01 and TD02 Main Deck database. There were no exact matches.</p>
      <p>That result is a snapshot, not a promise about future sets. Bushiroad can add later Pals whenever it announces new cards; until then, a video-game appearance alone is not confirmation.</p>

      <h2>Which familiar Pals already have cards?</h2>
      <p>The launch set leans on Pals that players knew before version 1.0. Examples include <Link className="text-link" href="/card/chillet-dragon-whisperer-ebp01-025">Chillet</Link>, <Link className="text-link" href="/card/grizzbolt-rumbling-tank-etd01-001">Grizzbolt</Link>, <Link className="text-link" href="/card/lyleen-blessing-of-the-goddess">Lyleen</Link> and <Link className="text-link" href="/card/depresso-late-night-hustler-ebp01-079">Depresso</Link>. Their card abilities are inspired by the setting, but they follow card text rather than video-game stats.</p>

      <h2>How the mechanics compare</h2>
      <div className="comparison-table" role="region" aria-label="Palworld 1.0 and Palworld Official Card Game mechanics comparison" tabIndex={0}>
        <div className="comparison-head"><span>Idea</span><strong>Palworld 1.0</strong><strong>Official Card Game</strong></div>
        <div><span>Collecting</span><p>Capture Pals while exploring the world</p><p>Build a deck from fixed card releases</p></div>
        <div><span>Combat</span><p>Real-time battles with a player and Pal team</p><p>Turn-based attacks, blocking, Power and Strike</p></div>
        <div><span>Base</span><p>Place buildings and assign workers in the world</p><p>Deploy Structures and rest Pals to use some effects</p></div>
        <div><span>Resources</span><p>Gather and craft with world materials</p><p>Pay costs with Souls; some cards create Materials or Ingredients</p></div>
        <div><span>Progress</span><p>Explore regions, level Pals and unlock technology</p><p>Draw cards, build a board and reduce the opponent to 0 life</p></div>
      </div>

      <h2>What carried over well</h2>
      <p>The card game keeps the most recognizable parts of Palworld. Pals still fight and work. Structures still reward assigning the right Pal. Materials and Ingredients turn the survival-crafting theme into small card engines. The resemblance makes the game feel familiar without copying the video game turn for turn.</p>

      <h2>What version 1.0 did not add to the card rules</h2>
      <p>Sunreach, the World Tree, Awakening and Mutation are major parts of the 1.0 update, but none appears as a named mechanic in the current launch card database or official card-game rules. Breeding, map exploration and real-time capture also remain video-game systems rather than tabletop rules.</p>

      <h2>Do you need to play Palworld 1.0 first?</h2>
      <p>No. The card game has its own setup, deck-building rules and win conditions. If you are starting from scratch, the fastest route is the <Link className="text-link" href="/blog/how-to-play-palworld-card-game">first-game walkthrough</Link>, followed by either ready-to-play Trial Deck.</p>
    </>
  ),

  "palworld-card-game-2026-roadmap": (
    <>
      <h2>Confirmed Palworld TCG release dates</h2>
      <div className="comparison-table" role="region" aria-label="Confirmed and unconfirmed Palworld TCG 2026 and 2027 dates" tabIndex={0}>
        <div className="comparison-head"><span>Date</span><strong>Status</strong><strong>Confirmed release or event</strong></div>
        <div><span>Through Aug 31</span><p>Confirmed</p><p>Grand Release Tournaments at participating stores.</p></div>
        <div><span>Sep–Oct</span><p>Confirmed window</p><p>Store demo sessions; exact dates depend on each location.</p></div>
        <div><span>Sep 25</span><p>Confirmed</p><p>Official playmats and storage boxes.</p></div>
        <div><span>Oct 2</span><p>Confirmed</p><p>Sleeve &amp; Card Set Vol. 1.</p></div>
        <div><span>Oct 16</span><p>Confirmed</p><p>Four official sleeve designs.</p></div>
        <div><span>Oct 30</span><p>Confirmed</p><p>Legends Awaken BP02 booster release.</p></div>
        <div><span>Dec 18</span><p>Confirmed date</p><p>Eternal Ascent TD03 Red・Green and TD04 Blue・Purple.</p></div>
        <div><span>Jan 29, 2027</span><p>Confirmed date</p><p>New booster pack; name and set details pending.</p></div>
      </div>
      <div className="callout"><strong>Still unconfirmed:</strong> the complete BP02 numbered card list, exact parallel count, per-region preorder allocation and a worldwide BP01 restock calendar. These stay marked as pending until an official source publishes them.</div>

      <h2>July 9: 3.5 million pack sales announced</h2>
      <p>Bushiroad announced that Dawn of Palpagos had reached 3.5 million pack sales worldwide before the July 30 release. This is an official publisher milestone, not a secondary-market price signal or a guarantee that every local store has stock.</p>
      <h2>July 30: Dawn of Palpagos launch</h2>
      <p>The first release wave contains the 100-card BP01 base set plus parallel treatments and two ready-to-play Trial Decks: Red/Blue TD01 and Green/Purple TD02. Each Trial Deck supplies a complete 50-card Main Deck, 10-card Soul Deck and the basic play accessories needed for a first match.</p>
      <h2>August 1–2: Singapore festival release events</h2>
      <p>Bushiroad Card Game Festival Singapore has ended. Its Palworld program included a Special Release Tournament, a Shacho Cup using unmodified English TD01 or TD02 decks, and demos with a Chillet foldable deck-case reward. This remains here as a completed launch milestone, not a current registration option.</p>
      <h2>August 1-31: Grand Release Tournament</h2>
      <p>Official tournament stores may hold one Grand Release Tournament during August. The announced format is Standard, up to five Swiss rounds, best-of-one and 30 minutes per round. Registration is handled through Bushi Navi, so players should check the actual store listing before travelling.</p>
      <ul>
        <li><strong>Participation:</strong> an Entry Soul Card Set and a Bushi Navi flair. The separate shop-tournament program lists the PR Vol.1 participation card.</li>
        <li><strong>Champion:</strong> a Lily Everhart and Lyleen playmat plus a champion flair.</li>
        <li><strong>Important:</strong> prize availability and local entry details come from the organizer; a marketplace listing is not an event registration.</li>
      </ul>
      <h2>August: regular shop tournaments begin</h2>
      <p>August shop tournaments use Swiss rounds and best-of-one games until one undefeated player remains. Every participant receives one random card from the nine-card PR Card Pack Vol. 1 series and a Bushi Navi flair. The champion receives two additional promo cards and a champion flair; stores also receive two extra promo packs to distribute by their own announced method.</p>
      <h2>September 5: Los Angeles Release Party</h2>
      <p>The official Release Party page lists a one-day event at Crowne Plaza Los Angeles Harbor Hotel in San Pedro, California. The main event is five Swiss rounds, best-of-one and 30 minutes per round, with Entry Soul cards and a PR Card Pack Vol. 1 card for participation. Players with more than three wins receive a Vol. 1.5 promo card, while the undefeated player also receives the Lily Everhart and Lyleen playmat. A separate eight-player single-elimination event is also listed.</p>
      <h2>September–October: new store demo sessions</h2>
      <p>The new official demo program requires advance registration through Bushi Navi. Participants receive a paper deck case featuring Daedream. Exact dates and available places depend on the participating store, so open the live store listing before travelling.</p>
      <h2>September 25: playmats and storage boxes</h2>
      <p>Two rubber playmats and two storage boxes release with Shadowbeak — Seed of Despair and Petallia — Sweet Blessings designs. The official playmats measure 33.8×59.5×0.2cm, while the storage boxes measure 23×10.5×8cm.</p>
      <h2>Autumn: the first competitive season</h2>
      <p>Official announcements place shop tournaments from August, the first Challengers Cup season from September through November, and regional Masters League competition across the 2026-27 season. Dates and locations can change, so the official event calendar remains the final source.</p>
      <h2>October 2: Sleeve &amp; Card Set Vol. 1</h2>
      <p>The set contains 75 sleeves and 10 cards across five card types in Red, Blue, Purple and Colorless. The cards are unique to this set and may be randomly replaced with parallel versions; exact card text should still be checked against an official reveal.</p>
      <h2>October 16: four official sleeve designs</h2>
      <p>The confirmed designs are Grizzbolt — Rumbling Tank, Relaxaurus — Hungry Gunner, Petallia — Sweet Blessings and Shadowbeak — Seed of Despair. Each sleeve measures approximately 6.7×9.2cm on the outside.</p>
      <h2>October 30: Legends Awaken BP02</h2>
      <p>The second booster is confirmed as <strong>Legends Awaken</strong>. Bushiroad lists 100 normal card types across RR, R, U and C, plus parallel versions, and says the set features Legendary Pals. The official announcement does not include the complete card list, exact parallel count or every new mechanic.</p>
      <h2>December 18: Eternal Ascent TD03 and TD04</h2>
      <p>Bushiroad has named the two December Trial Decks Eternal Ascent Red・Green (TD03) and Eternal Ascent Blue・Purple (TD04). Each product contains a 50-card Main Deck, 10-card Soul Deck, paper playmat and play guide, Life Counter, plus Material and Ingredient counters. The official announcement does not include the individual card lists.</p>
      <h2>January 29, 2027: next booster pack</h2>
      <p>A new booster pack is scheduled for January 29, 2027. The official announcement does not yet publish its name, set code, card count or featured Pals, so the set index records the date without inventing a product identity.</p>
      <h2>What to bookmark</h2>
      <ul>
        <li>Use the official news page for product announcements.</li>
        <li>Use the official event calendar and Bushi Navi for a real registration.</li>
        <li>Browse the card database for cards already published in the official list.</li>
      </ul>
      <p>For cards in each expansion, open the <Link className="text-link" href="/sets">set list</Link>. For registration and deck preparation, use the <Link className="text-link" href="/events">tournament guide</Link>. For published PR card numbers, check the <Link className="text-link" href="/cards/promos">promo card list</Link>.</p>
      <div className="callout"><strong>Before you plan:</strong> product and event details can change. Recheck the official page before buying or travelling.</div>
    </>
  ),

  "palworld-card-game-errata-tracker": (
    <>
      <h2>Current confirmed product errata</h2>
      <div className="verification-strip">
        <strong>TD01 · Confirmed</strong>
        <span>One printed card omits its Strike text. The official product notice—not the misprint—controls how the card works.</span>
      </div>
      <p>The accessible text on the official product page does not name the affected card. Use the official notice and current card database when identifying the printed copy.</p>
      <div className="verification-strip">
        <strong>BP01 packaging · Confirmed</strong>
        <span>The word “Palworld” is misspelled on first-wave packs and boxes. Bushiroad says it will adjust the packaging in future reprints.</span>
      </div>
      <p>This BP01 notice concerns the sealed packaging, not the playable card text. It confirms one future packaging correction, but it does not publish a reprint date or a card-level identifier for loose first-print cards. See the <Link className="text-link" href="/blog/palworld-tcg-first-edition-vs-reprint">First Edition vs reprint guide</Link> before paying for an unsupported loose-card claim.</p>
      <h2>Errata and Q&amp;A are different</h2>
      <ul>
        <li><strong>Errata</strong> corrects a printing or published-text error.</li>
        <li><strong>Official Q&amp;A</strong> explains how valid card text interacts with the rules or another card.</li>
        <li><strong>Community rulings</strong> can help locate a question, but they do not replace an official answer.</li>
      </ul>
      <h2>What to check before a tournament</h2>
      <ol>
        <li>Search the exact card number in the official card list.</li>
        <li>Check the product page for a visible errata notice.</li>
        <li>Search the official Q&amp;A by card number and keyword.</li>
        <li>If the answer is still unclear, ask the event judge before the round begins.</li>
      </ol>
      <h2>How to tell whether an errata report is official</h2>
      <p>A reliable correction links directly to the publisher and names the affected product or card, the corrected text or behavior, and the notice date. Treat screenshots and second-hand reports without that source as unconfirmed.</p>
      <div className="callout"><strong>Last checked August 10, 2026:</strong> two product notices are confirmed: the TD01 Strike omission and the BP01 pack-and-box spelling error. Search the Rules &amp; Q&amp;A center for card interactions that are rulings rather than misprints.</div>
      <Link className="button primary" href="/rules">Search official rulings</Link>
    </>
  ),

  "palworld-card-game-color-guide": (
    <>
      <h2>Red: damage and Material pressure</h2>
      <p>Red launch cards reward proactive turns. Its Structures create Materials, its effects deal direct damage to Pals, and its larger threats can turn a developed Base into immediate pressure. Choose Red if you want the clearest path from setup to attacking.</p>
      <h2>Blue: draw, rest and defensive timing</h2>
      <p>Blue helps a deck see more cards, change which opposing cards are standing or rested, and protect important turns with Quick or Interrupt effects. Choose Blue if you enjoy keeping options open and winning through better timing rather than only raw Power.</p>
      <h2>Green: Ingredients, Taunt and durable boards</h2>
      <p>Green creates and consumes Ingredients for Power boosts, life gain and value. Taunt Pals can protect another target by restricting legal attacks. Choose Green if you like building an engine and making one strong, carefully prepared turn.</p>
      <h2>Purple: Stealth, removal and graveyard value</h2>
      <p>Purple makes blocking difficult with Stealth, removes or weakens opposing Pals, and uses night or Graveyard interactions for extra value. Choose Purple if you enjoy sequencing effects and forcing awkward defensive choices.</p>
      <h2>The two safest launch pairings</h2>
      <div className="comparison-table" role="region" aria-label="Launch color pairing comparison table" tabIndex={0}>
        <div className="comparison-head"><span>Pair</span><strong>What it teaches</strong><strong>Best for</strong></div>
        <div><span>Red / Blue</span><p>Materials, damage, draw and Quick timing</p><p>A direct first deck with flexible defense</p></div>
        <div><span>Green / Purple</span><p>Ingredients, Taunt, Stealth and removal</p><p>Players who enjoy setup and sequencing</p></div>
      </div>
      <h2>How to upgrade without breaking the deck</h2>
      <ol>
        <li>Play the unchanged Trial Deck several times and identify cards that sit unused in hand.</li>
        <li>Choose one existing engine—Materials or Ingredients—instead of adding every exciting pull.</li>
        <li>Add BP01 cards in small groups, usually two to four copies depending on how often the effect is needed.</li>
        <li>Keep enough low-cost plays, card flow and interaction after every change.</li>
        <li>Change only a few slots, then record whether the new card was useful when drawn.</li>
      </ol>
      <h2>Why early results still do not make a settled tier list</h2>
      <p>Official Osaka and Tokyo Grand Release recipes now provide real event evidence, but a reliable tier list still needs repeated results, known field sizes and matchup data. Choose colors by the play style above and treat early rankings as provisional.</p>
      <Link className="button primary" href="/tools/deck-builder">Test a two-color list</Link>
    </>
  ),
  ...competitiveGuideContent,
  ...commercialGuideContent,
};

const officialSources: Record<string, GuideSource[]> = {
  "palworld-booster-box": [
    { label: "Official BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official launch product announcement", href: "https://en.palworld-official-cardgame.com/news/post-bp01-td0102-preorder" },
    { label: "Official Japanese box and 12-box carton specification", href: "https://palworld-official-cardgame.com/products/bp01" },
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official retailer finder", href: "https://www.en.bushi-navi.com/storelist?default=true" },
  ],
  "how-to-play-palworld-card-game": [
    { label: "Official Quick Manual", href: "https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/rule" },
    { label: "Official beginner page", href: "https://en.palworld-official-cardgame.com/for-beginners" },
    { label: "Official tutorial video", href: "https://www.youtube.com/watch?v=UdbMWxWcMcw" },
    { label: "Community video — The Card Gamer beginner walkthrough", href: "https://www.youtube.com/watch?v=08i8nsunjOk" },
  ],
  "palworld-card-game-deck-building-rules": [
    { label: "Official Quick Manual", href: "https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/question" },
  ],
  "red-blue-vs-green-purple-trial-deck": [
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official launch card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Community video — Bob's Japan Trial Deck first look", href: "https://www.youtube.com/watch?v=ItjyWw-tGKY" },
  ],
  "palworld-card-game-products-where-to-buy": [
    { label: "Official product list", href: "https://en.palworld-official-cardgame.com/products" },
    { label: "Official retailer finder", href: "https://www.en.bushi-navi.com/storelist?default=true" },
    { label: "Dawn of Palpagos product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official English BP01 stock and 2nd Edition update", href: "https://x.com/PalworldOCG_EN/status/2089880025566675341" },
    { label: "Official Japanese first-edition shipment update", href: "https://x.com/PalworldOCG/status/2090352524444447078" },
    { label: "Community launch availability discussion — unverified", href: "https://www.reddit.com/r/PalworldTCG/comments/1vavklw/where_to_get_palworld_cards/" },
  ],
  "dawn-of-palpagos-card-list-guide": [
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
  ],
  "palworld-card-game-keyword-glossary": [
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/question" },
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
  ],
  "palworld-tcg-rarity-guide": [
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
  ],
  "dawn-of-palpagos-chase-cards": [
    { label: "Official BP01 161-card list", href: "https://en.palworld-official-cardgame.com/cardlist/searchresults?expansion=EBP01" },
    { label: "Official BP01 product specifications", href: "https://en.palworld-official-cardgame.com/products/bp01" },
  ],
  "dawn-of-palpagos-pull-rates": [
    { label: "Official BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Community opening sample tracker — not official odds", href: "https://www.reddit.com/r/PalworldTCG/comments/1v893g8/palworld_tcg_rarity_guide_pull_rates_from_10/" },
    { label: "48+ pack community tracker — not official odds", href: "https://www.reddit.com/r/PalworldTCG/comments/1v9fipg/estimated_pull_rates_card_odds_based_on_48/" },
  ],
  "palworld-online-vs-card-game": [
    { label: "Garena announcement — Palworld Online", href: "https://www.garena.sg/news/7UPUTA" },
    { label: "Official Palworld Card Game product list", href: "https://en.palworld-official-cardgame.com/products" },
    { label: "Official Palworld Card Game card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official Palworld Card Game rules", href: "https://en.palworld-official-cardgame.com/rule" },
  ],
  "palworld-1-0-vs-card-game": [
    { label: "Official Palworld 1.0 changelog", href: "https://store.steampowered.com/news/app/1623730/view/686383649529010623" },
    { label: "Pocketpair 1.0 launch announcement", href: "https://www.pocketpair.jp/en/game-news/palworld-1-0-july-10-cinematic-trailer-revealed/" },
    { label: "Version 1.0 Pal roster used for the name comparison", href: "https://www.palmods.gg/guides/whats-new/new-pals" },
    { label: "Official Palworld Card Game card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
  ],
  "palworld-card-game-2026-roadmap": [
    { label: "Official news and latest updates", href: "https://en.palworld-official-cardgame.com/news" },
    { label: "Official 3.5 million pack-sales announcement", href: "https://en.palworld-official-cardgame.com/news/post-4" },
    { label: "Official Singapore festival update", href: "https://en.palworld-official-cardgame.com/news/post-bcgf2026" },
    { label: "Official Legends Awaken announcement", href: "https://en.palworld-official-cardgame.com/news/post-preoders-bp02-ss01" },
    { label: "Official 2026–27 product schedule", href: "https://en.palworld-official-cardgame.com/news/post-becsu-26" },
    { label: "Official Grand Release Tournament", href: "https://en.palworld-official-cardgame.com/events/grand-release-tournament" },
    { label: "Official August shop tournaments", href: "https://en.palworld-official-cardgame.com/events/shop-tournaments" },
    { label: "Official Los Angeles Release Party", href: "https://en.palworld-official-cardgame.com/events/release-party-in-los-angeles" },
    { label: "Official 2026 event roadmap", href: "https://en.palworld-official-cardgame.com/news/post-becs-26" },
    { label: "Official September–October demo sessions", href: "https://en.palworld-official-cardgame.com/events/demo-session-september-october-2026" },
    { label: "Official Eternal Ascent announcement", href: "https://en.palworld-official-cardgame.com/news/post-7" },
    { label: "Official Eternal Ascent TD03", href: "https://en.palworld-official-cardgame.com/products/TD03" },
    { label: "Official Eternal Ascent TD04", href: "https://en.palworld-official-cardgame.com/products/TD04" },
    { label: "Official accessory release list", href: "https://en.palworld-official-cardgame.com/products" },
    { label: "Official Sleeve & Card Set Vol.1 contents", href: "https://en.palworld-official-cardgame.com/products/ss01" },
    { label: "Official English X updates", href: "https://x.com/PalworldOCG_EN" },
  ],
  "palworld-card-game-errata-tracker": [
    { label: "Official Red / Blue Trial Deck errata notice", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official BP01 packaging correction notice", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/rule" },
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
  ],
  "palworld-card-game-color-guide": [
    { label: "Official launch card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official Spring 2026 play-style overview", href: "https://en.palworld-official-cardgame.com/news/post-becs-26" },
  ],
  ...competitiveGuideSources,
  ...commercialGuideSources,
};

const relatedGuideSlugs: Record<string, string[]> = {
  "palworld-booster-box": [
    "palworld-card-game-products-where-to-buy",
    "dawn-of-palpagos-pull-rates",
    "palworld-tcg-rarity-guide",
  ],
  "how-to-play-palworld-card-game": [
    "palworld-card-game-deck-building-rules",
    "palworld-card-game-keyword-glossary",
    "palworld-card-game-color-guide",
  ],
  "palworld-card-game-deck-building-rules": [
    "palworld-card-game-color-guide",
    "red-blue-vs-green-purple-trial-deck",
    "how-to-play-palworld-card-game",
  ],
  "red-blue-vs-green-purple-trial-deck": [
    "palworld-card-game-products-where-to-buy",
    "palworld-card-game-color-guide",
    "palworld-booster-box",
  ],
  "palworld-card-game-products-where-to-buy": [
    "palworld-booster-box",
    "red-blue-vs-green-purple-trial-deck",
    "palworld-card-game-2026-roadmap",
  ],
  "dawn-of-palpagos-card-list-guide": [
    "palworld-tcg-rarity-guide",
    "palworld-card-game-color-guide",
    "palworld-card-game-keyword-glossary",
  ],
  "palworld-card-game-keyword-glossary": [
    "how-to-play-palworld-card-game",
    "palworld-card-game-deck-building-rules",
    "palworld-card-game-errata-tracker",
  ],
  "palworld-tcg-rarity-guide": [
    "dawn-of-palpagos-chase-cards",
    "dawn-of-palpagos-pull-rates",
    "palworld-booster-box",
  ],
  "dawn-of-palpagos-chase-cards": [
    "dawn-of-palpagos-pull-rates",
    "palworld-tcg-rarity-guide",
    "dawn-of-palpagos-card-list-guide",
  ],
  "dawn-of-palpagos-pull-rates": [
    "dawn-of-palpagos-chase-cards",
    "palworld-booster-box",
    "palworld-tcg-rarity-guide",
  ],
  "palworld-online-vs-card-game": [
    "palworld-1-0-vs-card-game",
    "how-to-play-palworld-card-game",
    "dawn-of-palpagos-card-list-guide",
  ],
  "palworld-1-0-vs-card-game": [
    "palworld-online-vs-card-game",
    "dawn-of-palpagos-card-list-guide",
    "how-to-play-palworld-card-game",
  ],
  "palworld-card-game-2026-roadmap": [
    "palworld-card-game-products-where-to-buy",
    "palworld-card-game-errata-tracker",
    "palworld-booster-box",
  ],
  "palworld-card-game-errata-tracker": [
    "palworld-card-game-keyword-glossary",
    "palworld-card-game-2026-roadmap",
    "how-to-play-palworld-card-game",
  ],
  "palworld-card-game-color-guide": [
    "red-blue-vs-green-purple-trial-deck",
    "palworld-card-game-deck-building-rules",
    "dawn-of-palpagos-card-list-guide",
  ],
  ...competitiveRelatedGuideSlugs,
  ...commercialRelatedGuideSlugs,
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  const quickAnswer = guideQuickAnswers[slug];
  const quickAnswerSource = officialSources[slug]?.[0];
  if (!guide || !guideContent[slug] || !quickAnswer) notFound();
  const related = (relatedGuideSlugs[slug] || []).map((relatedSlug) => {
    const relatedGuide = guides.find((item) => item.slug === relatedSlug);
    if (!relatedGuide) throw new Error(`Guide ${slug} references missing related guide ${relatedSlug}`);
    return relatedGuide;
  });
  const primaryImage = getGuidePrimaryImage(slug);
  const primaryActions = guidePrimaryActions[slug] || [];
  const articleDate = guide.published || "2026-07-30";
  const maintenance = getEnglishGuideMaintenance(slug);
  const boosterBoxFaqs = slug === "palworld-booster-box" ? [
    ["How many packs are in a Palworld Booster Box?", "A Dawn of Palpagos BP01 booster box contains 12 booster packs."],
    ["How many cards are in a Palworld Booster Box?", "There are 7 cards per pack and 12 packs per box, for 84 cards total. Duplicates are possible."],
    ["Are Palworld Booster Box pull rates guaranteed?", "No official per-box pull odds have been published."],
    ["Can I play with one Booster Box?", "A box does not guarantee a legal deck. A Trial Deck includes a fixed 50-card Main Deck and 10 Soul cards."],
    ["What set is the first Palworld Booster Box?", "The first box is BP01 Dawn of Palpagos, released July 30, 2026."],
    ["What is the Dawn of Palpagos Booster Box MSRP?", "The official English product page does not publish one universal MSRP. Compare the final delivered price from trusted local retailers."],
  ] : [];
  const structuredData: Record<string, unknown>[] = [
    { "@context": "https://schema.org", "@type": "Article", headline: guide.heading || guide.title, description: guide.description, image: primaryImage?.url, datePublished: articleDate, dateModified: guide.modified || articleDate, author: createEditorialAuthorJsonLd(), publisher: createPublisherJsonLd(), mainEntityOfPage: `https://palworldcardgame.wiki/blog/${guide.slug}` },
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/blog" },
      { name: guide.heading || guide.title, path: `/blog/${guide.slug}` },
    ]),
  ];
  if (slug === "how-to-play-palworld-card-game") {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Palworld OFFICIAL CARD GAME Tutorial Video",
      description: "Official publisher tutorial covering setup, turn flow, card deployment, attacks, blocking and Damage Checks.",
      thumbnailUrl: "https://i.ytimg.com/vi/UdbMWxWcMcw/hqdefault.jpg",
      uploadDate: "2026-06-18",
      duration: "PT11M9S",
      embedUrl: "https://www.youtube-nocookie.com/embed/UdbMWxWcMcw",
      contentUrl: "https://www.youtube.com/watch?v=UdbMWxWcMcw",
    });
  }
  if (boosterBoxFaqs.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: boosterBoxFaqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    });
  }

  return (
    <article className="article-shell">
      <JsonLd data={structuredData} />
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/blog" },
        { name: guide.heading || guide.title },
      ]} />
      <p className="eyebrow"><span>{guide.category}</span> · {guide.readTime}</p>
      <h1>{guide.heading || guide.title}</h1>
      <p className="article-lede">{guide.description}</p>
      <div className="guide-intro-flow">
        <EditorialByline
          reviewed={guide.updated}
          sourceStatus={guide.sourceStatus}
        />
        <GuideSeoImagePanel slug={slug} />
        <GuideToc contentId="guide-content" />
        <div className="guide-answer-slot">
          <div className="quick-answer">
            <strong>{quickAnswer.label}</strong>
            <p>{quickAnswer.answer}</p>
            {quickAnswerSource ? (
              <a className="quick-answer-source" href={quickAnswerSource.href} target="_blank" rel="noreferrer">
                Primary source: {quickAnswerSource.label} ↗
              </a>
            ) : null}
            <SharePanel
              assetKey={`guide-${slug}`}
              triggerLabel="Share this quick answer"
              shareUrl={`/blog/${guide.slug}`}
              shareText={`${guide.heading || guide.title}\n${quickAnswer.answer}`}
              className="share-trigger-inline"
              payload={{
                kind: "guide",
                eyebrow: `${guide.category} · ${quickAnswer.label}`,
                title: guide.heading || guide.title,
                body: quickAnswer.answer,
                prompt: "Send this to the player who needs the fast version.",
              }}
            />
          </div>
          {primaryActions.length ? (
            <nav className="guide-primary-actions" aria-label="Recommended next steps">
              {primaryActions.map((action) => (
                <Link
                  href={action.href}
                  key={action.href}
                  data-analytics-event="next_step_click"
                  data-analytics-label={`${slug}:${action.href}`}
                >
                  <strong>{action.label}</strong>
                  <span>{action.detail} →</span>
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
      <AdsterraBannerAd />
      <div id="guide-content" className="guide-body">
        {guideContent[slug]}
      </div>

      <ContentFreshnessPanel
        updated={guide.updated}
        verified={guide.updated}
        sourceStatus={guide.sourceStatus}
        summary={guide.description}
        changeSummary={maintenance.changeSummary}
        published={articleDate}
        history={maintenance.history}
      />

      <AdsterraNativeAd />

      <section className="source-panel">
        <p className="eyebrow">Sources and evidence</p>
        <h2>Source links</h2>
        <p>Use the official links below for current rules, card text, products and dates. Independent or community links are included only when they add clearly identified examples.</p>
        <div>
          {(officialSources[slug] || []).map((source) => {
            const sourceKind = getGuideSourceKind(source);
            return (
              <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                <span className="source-kind">{sourceKind}</span>
                <strong>{source.label} ↗</strong>
              </a>
            );
          })}
        </div>
      </section>

      <section className="related-guides">
        <p className="eyebrow">Keep going</p>
        <h2>Next useful answers</h2>
        {related.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}><span>{item.category}</span><strong>{item.title} →</strong></Link>)}
      </section>

      <div className="article-actions">
        <Link className="button primary" href="/rules">Search rules &amp; FAQ</Link>
        <Link className="button primary" href="/cards">Browse cards</Link>
        <Link className="button ghost" href="/tools/deck-builder">Build a deck</Link>
        <Link className="button ghost" href="/resources">Open source hub</Link>
      </div>
    </article>
  );
}
