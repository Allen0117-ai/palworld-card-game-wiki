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
      ["Official beginner page", "Game overview and the official starting path.", "https://en.palworld-official-cardgame.com/for-beginners"],
      ["Quick Manual", "The official one-page setup, turn, battle and deck-building reference.", "https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf"],
      ["Official Rule & Q&A", "Search current rulings, card interactions, errata and tournament documents.", "https://en.palworld-official-cardgame.com/rule"],
      ["Official card list", "Source card numbers, images, stats and printed text.", "https://en.palworld-official-cardgame.com/cardlist"],
    ],
  },
  {
    title: "Products & play",
    description: "Find the launch products, a nearby store and the official places where organized play is announced.",
    links: [
      ["Dawn of Palpagos BP01", "Official details for the first 100-card booster set.", "https://en.palworld-official-cardgame.com/products/bp01"],
      ["Red / Blue Trial Deck", "Contents and official product notices for TD01.", "https://en.palworld-official-cardgame.com/products/td01"],
      ["Green / Purple Trial Deck", "Contents and official product notices for TD02.", "https://en.palworld-official-cardgame.com/products/td02"],
      ["Official retailer finder", "Search Bushiroad's store list before trusting a marketplace listing.", "https://www.en.bushi-navi.com/storelist?default=true"],
      ["Official events", "Demos, tournaments and organized-play announcements.", "https://en.palworld-official-cardgame.com/events"],
    ],
  },
  {
    title: "Community & ongoing discussion",
    description: "Useful for questions, early deck ideas and launch observations. Community claims may be incomplete, so verify rules against official sources.",
    links: [
      ["Official YouTube", "Tutorials, product videos and official announcements.", "https://www.youtube.com/@PalworldOCG_EN"],
      ["Official English X account", "Fast launch updates and event notices.", "https://x.com/PalworldOCG_EN"],
      ["PalworldTCG on Reddit", "Player questions, deck experiments and collecting discussion.", "https://www.reddit.com/r/PalworldTCG/"],
      ["Bushiroad DeckLog", "Official deck creation service; featured and tournament lists will become more useful as events begin.", "https://decklog-en.bushiroad.com/"],
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
          <span>Official rules and card data decide facts. Community sources help us discover questions, early ideas and missing explanations.</span>
        </div>
        {resourceGroups.map((group) => (
          <section className="resource-group" key={group.title}>
            <div>
              <p className="eyebrow">Information source</p>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </div>
            <div className="resource-links">
              {group.links.map(([label, description, href]) => (
                <a href={href} target="_blank" rel="noreferrer" key={href}>
                  <span>External source ↗</span>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
        <section className="question-box">
          <div><p className="eyebrow">Help shape the next update</p><h2>Couldn&apos;t find your answer?</h2></div>
          <p>Send the question exactly as you searched it. We will use repeated questions to decide the next guide and will correct any sourced factual error.</p>
          <a className="button primary" href="mailto:hello@palworldcardgame.wiki?subject=Palworld%20Card%20Game%20question%20or%20correction">Submit a question or correction</a>
        </section>
      </div>
    </>
  );
}
