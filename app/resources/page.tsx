import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palworld Card Game Resource Hub – Rules, Cards, Events & Community",
  description: "A curated starting point for official Palworld Card Game rules, card data, products, retailers, events, deck tools and community discussion.",
};

const resourceGroups = [
  {
    title: "Official facts",
    description: "Use these first when a card interaction, product detail or tournament rule must be exact.",
    links: [
      { label: "Official beginner page", description: "Game overview and the official starting path.", href: "https://en.palworld-official-cardgame.com/for-beginners", source: "Official · Primary source" },
      { label: "Quick Manual", description: "The official one-page setup, turn, battle and deck-building reference.", href: "https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf", source: "Official · Primary source" },
      { label: "Official Rule & Q&A", description: "Search current rulings, card interactions, errata and tournament documents.", href: "https://en.palworld-official-cardgame.com/rule", source: "Official · Primary source" },
      { label: "Official card list", description: "Source card numbers, images, stats and printed text.", href: "https://en.palworld-official-cardgame.com/cardlist", source: "Official · Primary source" },
      { label: "Official news feed", description: "New product, campaign, retailer and event announcements in date order.", href: "https://en.palworld-official-cardgame.com/news", source: "Official · Latest updates" },
    ],
  },
  {
    title: "Products & organized play",
    description: "Find launch products, a nearby store and the official places where organized play is announced.",
    links: [
      { label: "Dawn of Palpagos BP01", description: "Official details for the first 100-card booster set.", href: "https://en.palworld-official-cardgame.com/products/bp01", source: "Official · Product page" },
      { label: "Red / Blue Trial Deck", description: "Contents and official product notices for TD01.", href: "https://en.palworld-official-cardgame.com/products/td01", source: "Official · Product page" },
      { label: "Green / Purple Trial Deck", description: "Contents and official product notices for TD02.", href: "https://en.palworld-official-cardgame.com/products/td02", source: "Official · Product page" },
      { label: "Official retailer finder", description: "Search Bushiroad's store list before trusting a marketplace listing.", href: "https://www.en.bushi-navi.com/storelist?default=true", source: "Official · Store finder" },
      { label: "Official events", description: "Demos, tournaments and organized-play announcements.", href: "https://en.palworld-official-cardgame.com/events", source: "Official · Event calendar" },
    ],
  },
  {
    title: "Independent databases & tools",
    description: "Good shortcuts for browsing sets and experimenting with decks. These are not official rules authorities.",
    links: [
      { label: "Palworld Wiki", description: "Independent overview and cross-links to broader Palworld information.", href: "https://palworld.wiki.gg/wiki/Palworld_Official_Card_Game", source: "Independent wiki · Verify rules" },
      { label: "PalworldTCG.gg card browser", description: "A third-party way to scan BP01 reveals and card information.", href: "https://palworldtcg.gg/set/bp01", source: "Third-party database · Verify data" },
      { label: "Palpagos.gg", description: "Community-built deck and card tools for exploring player-created ideas.", href: "https://palpagos.gg/", source: "Community tool · User-created decks" },
      { label: "Bushiroad DeckLog", description: "The publisher's deck creation service for saving and sharing lists.", href: "https://decklog-en.bushiroad.com/", source: "Official tool · Deck lists vary" },
      { label: "PalworldCard.com", description: "Independent rules, product and video index with official materials gathered in one place.", href: "https://palworldcard.com/pages/game-rules.html", source: "Independent guide · Verify rules" },
      { label: "PalSphere beginner guide", description: "A second plain-English explanation of setup, colors, Souls and the turn flow.", href: "https://palsphere.com/how-to-play-the-palworld-card-game-a-beginners-guide/", source: "Independent guide · Verify rules" },
    ],
  },
  {
    title: "Community & launch coverage",
    description: "Use these to discover questions, deck experiments and launch context—not as the final word on a rule.",
    links: [
      { label: "Official YouTube", description: "Tutorials, product videos and official announcements.", href: "https://www.youtube.com/@PalworldOCG_EN", source: "Official · Video channel" },
      { label: "PalworldTCG on Reddit", description: "Player questions, early deck experiments and collecting discussion.", href: "https://www.reddit.com/r/PalworldTCG/", source: "Community · Unverified discussion" },
      { label: "GamesRadar launch report", description: "External reporting from the game's announcement and launch cycle.", href: "https://www.gamesradar.com/games/survival/still-not-beating-the-pokemon-comparisons-palworld-is-getting-an-official-card-game-thats-launching-this-july/", source: "Media report · January 2026" },
      { label: "PC Gamer launch report", description: "Independent media context around the card game's announcement.", href: "https://www.pcgamer.com/games/card-games/palworld-takes-the-red-rag-to-a-bull-approach-to-its-nintendo-lawsuit-announces-a-2-player-competitive-card-game/", source: "Media report · January 2026" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <header className="page-hero shell">
        <p className="eyebrow"><span>Curated information hub</span> · Checked July 30, 2026</p>
        <h1>Know where the<br />answer came from.</h1>
        <p>We bring scattered Palworld Card Game information into one starting point, explain it in plain English, and clearly separate official facts from community discussion.</p>
      </header>
      <div className="resource-hub shell">
        <div className="verification-strip">
          <strong>Our source rule</strong>
          <span><b>Official</b> rules and card data decide facts. <b>Independent</b> sources help compare information. <b>Community</b> posts are ideas and discussion until verified.</span>
        </div>
        {resourceGroups.map((group) => (
          <section className="resource-group" key={group.title}>
            <div>
              <p className="eyebrow">Information source</p>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </div>
            <div className="resource-links">
              {group.links.map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                  <span>{link.source} ↗</span>
                  <strong>{link.label}</strong>
                  <p>{link.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
        <section className="question-box">
          <div><p className="eyebrow">Help shape the next update</p><h2>Couldn&apos;t find your answer?</h2></div>
          <p>Send the question exactly as you searched it. We will use repeated questions to decide the next guide and will correct any sourced factual error.</p>
          <a className="button primary" href="mailto:paweyan163@gmail.com?subject=Palworld%20Card%20Game%20question%20or%20correction">Submit a question or correction</a>
        </section>
      </div>
    </>
  );
}
