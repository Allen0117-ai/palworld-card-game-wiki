import { notFound } from "next/navigation";
import Link from "next/link";
import { guides } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { GuideToc } from "@/components/GuideToc";
import { getGuidePrimaryImage, GuideSeoImagePanel } from "@/components/SeoImagePanel";
import type { Metadata } from "next";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  const primaryImage = getGuidePrimaryImage(slug);
  return {
    title: guide.title,
    description: guide.description,
    openGraph: primaryImage ? {
      type: "article",
      title: guide.title,
      description: guide.description,
      images: [primaryImage],
    } : undefined,
  };
}

const guideQuickAnswers: Record<string, { label: string; answer: React.ReactNode }> = {
  "how-to-play-palworld-card-game": {
    label: "The short version",
    answer: "Both players start with 10 life. Build a 50-card Main Deck and a separate 10-card Soul Deck, use Souls to pay costs, and attack with Pals. Reduce the opposing player to 0 life to win. You also lose if your Main Deck has no cards remaining.",
  },
  "palworld-card-game-deck-building-rules": {
    label: "Legal deck checklist",
    answer: "Exactly 50 Main Deck cards, exactly 10 Soul cards, up to two colors plus Colorless, no more than four cards with the same full card name, and no more than eight cards with a Lucky icon.",
  },
  "red-blue-vs-green-purple-trial-deck": {
    label: "Fast recommendation",
    answer: "Choose Red/Blue if you want direct damage, Structures and clearer immediate pressure. Choose Green/Purple if you enjoy resource setup, Taunt defense, Stealth attacks and more sequencing decisions. Both products are complete first decks.",
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
    label: "Base rarity",
    answer: "Dawn of Palpagos uses C, U, R and RR for base cards. The set also has 61 parallel card types. Rarity describes distribution and treatment, not automatic deck strength.",
  },
  "dawn-of-palpagos-pull-rates": {
    label: "Current answer",
    answer: "Bushiroad confirms 100 base card types plus 61 parallel types in BP01, but we have not found official per-rarity pull odds. A few launch-day openings are not enough to publish reliable percentages.",
  },
  "palworld-card-game-2026-roadmap": {
    label: "Next confirmed dates",
    answer: "The game launches worldwide on July 30, Grand Release Tournaments run during August, Sleeve & Card Set Vol. 1 arrives October 2, and the second booster set—Legends Awaken—releases October 30, 2026.",
  },
  "palworld-card-game-errata-tracker": {
    label: "Confirmed launch correction",
    answer: "The official Red/Blue Trial Deck page reports a printed card with omitted “Strike” text. Bushiroad says the card remains legal at every level of play and functions as though the correct Strike text is present.",
  },
  "palworld-card-game-color-guide": {
    label: "Choose by play style",
    answer: "Red applies direct pressure, Blue controls tempo and cards, Green builds Ingredient-powered boards, and Purple disrupts combat through Stealth, removal, night and graveyard effects. A legal deck may use up to two of these colors plus Colorless cards.",
  },
};

const guideContent: Record<string, React.ReactNode> = {
  "how-to-play-palworld-card-game": (
    <>
      <h2>What you need for your first game</h2>
      <ul>
        <li><strong>Main Deck:</strong> exactly 50 Pal, Gear, Event and Structure cards.</li>
        <li><strong>Soul Deck:</strong> exactly 10 Soul cards. Souls are the resource used to pay card and ability costs.</li>
        <li><strong>Counters:</strong> track life, Materials and Ingredients when cards create or consume them.</li>
        <li><strong>A playmat:</strong> optional for casual play, but very helpful while learning the Base, Soul Area, decks and Graveyard.</li>
      </ul>
      <div className="callout"><strong>Best first purchase:</strong> either Trial Deck is ready to play and includes a 50-card Main Deck, 10-card Soul Deck, paper playmat and play guide, counters and one BP01 booster pack.</div>

      <h2>Set up the game step by step</h2>
      <ol>
        <li>Place and shuffle your Main Deck. Place the separate Soul Deck beside your Soul Area.</li>
        <li>Set both life counters to 10.</li>
        <li>Decide who goes first. The winner of the chosen method may choose first or second.</li>
        <li>The player going second puts one Soul from their Soul Deck into the Soul Area in the stand state.</li>
        <li>Each player draws five Main Deck cards.</li>
        <li>Starting with the first player, each player may mulligan once. A mulligan returns all five cards, shuffles the deck, then draws five new cards; you cannot keep only some cards.</li>
      </ol>

      <h2>The five phases of a turn</h2>
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

      <h2>How attacks, blocking and battle work</h2>
      <p>Rest one of your standing Pals to attack. The target can be the opposing player, a Structure, or normally a Pal already in the rest state. Assault is the keyword that allows a Pal to attack standing Pals.</p>
      <h3>If a Pal attacks another Pal</h3>
      <p>Both combat Pals deal damage equal to their Power to each other. A Pal is put into the Graveyard when its damage is equal to or greater than its current Power.</p>
      <h3>If a Pal attacks a Structure</h3>
      <p>The Pal deals its Power as damage to the Structure&apos;s Durability. A Structure does not deal damage back.</p>
      <h3>If a Pal attacks the opposing player</h3>
      <p>The defending player may rest a Pal to block, changing the attack target to that blocker. The defender may also use legal Quick cards or Interrupt effects at their stated timing.</p>

      <h2>Damage Check and the Lucky icon</h2>
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
      <h2>Main Deck and Soul Deck are separate</h2>
      <p>Your Main Deck contains Pals, Gear, Events and Structures. It must contain exactly 50 cards. The Soul Deck contains exactly 10 Soul cards and does not count toward the 50.</p>
      <h2>Choose up to two colors</h2>
      <p>A Main Deck may use up to two of Red, Blue, Green and Purple. Colorless cards can be included with any chosen colors. The rule limits colors in deck construction; it does not require an even split.</p>
      <div className="example-box"><strong>Legal examples</strong><p>Red only; Red and Blue; Green and Purple plus Colorless; or a Colorless-only deck.</p></div>
      <h2>The four-copy rule uses the full card name</h2>
      <p>You may include up to four cards with the same card name in total, even when the card number, artwork or rarity differs. The official Q&amp;A defines the Main Name as the portion before the “–”, but the deck copy limit applies to the complete printed card name.</p>
      <h2>Lucky icon limit</h2>
      <p>A legal 50-card Main Deck may include up to eight cards with the Lucky icon. The normal same-name copy limit still applies, so eight Lucky cards cannot all be copies of one name.</p>
      <h2>There is no required card-type ratio</h2>
      <p>The official Q&amp;A confirms that a deck may use any number of Pal, Gear, Structure and Event cards as long as all construction rules are followed. A 50-Pal deck is technically legal, but legal does not mean consistent.</p>
      <h2>A beginner-friendly starting structure</h2>
      <p>There is no official required ratio, so treat this as an editorial testing framework rather than a rule:</p>
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
      <h2>What both Trial Decks include</h2>
      <ul>
        <li>A fixed 50-card Main Deck and 10-card Soul Deck.</li>
        <li>A paper playmat and play guide.</li>
        <li>Life, Material and Ingredient counters.</li>
        <li>One Dawn of Palpagos BP01 booster pack.</li>
        <li>One parallel-rarity card replacing a card in the Main Deck.</li>
      </ul>
      <div className="comparison-table" role="region" aria-label="Trial Deck comparison table" tabIndex={0}>
        <div className="comparison-head"><span>Question</span><strong>Red / Blue TD01</strong><strong>Green / Purple TD02</strong></div>
        <div><span>Main feel</span><p>Damage, Structures, card flow</p><p>Ingredients, Taunt, Stealth, removal</p></div>
        <div><span>Resource engine</span><p>Stone Pit creates Materials and draws</p><p>Berry Plantation creates Ingredients and draws</p></div>
        <div><span>Defense</span><p>Rest effects, Quick cards and Interrupt</p><p>Taunt bodies, life gain and Interrupt</p></div>
        <div><span>Closing threats</span><p>Grizzbolt, Blazamut, Mammorest Cryst</p><p>Broncherry, Felbat, Astegon, Mammorest</p></div>
        <div><span>Best for</span><p>Players who want a direct plan</p><p>Players who enjoy setup and sequencing</p></div>
      </div>
      <h2>Why Red / Blue is easier to read at first</h2>
      <p>TD01&apos;s Red cards make Materials and convert them into damage. Stone Pit and Weapon Workbench show the relationship clearly. Blue supports the plan with card draw, resting effects and defensive Quick cards. New players can usually see the next action without tracking as many conditional effects.</p>
      <h2>Why Green / Purple offers more tactical choices</h2>
      <p>TD02 uses Ingredients for Green power boosts and life gain while Purple changes combat with Stealth, removal and graveyard recovery. Cards such as Astegon can affect both players&apos; Pals, so the order of actions matters more.</p>
      <h2>Which should two friends buy?</h2>
      <p>Buying one of each gives both players different mechanics and exposes the full four-color launch experience. If both players want the simplest learning match, two copies of the same Trial Deck create a more symmetrical game, but one of each is more useful for discovering personal preferences.</p>
      <h2>Do not choose by rarity alone</h2>
      <p>Both decks include a parallel replacement, but the treatment does not change the underlying rules text. Choose the play pattern you want to learn; the included booster pack is a bonus, not a complete upgrade plan.</p>
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
        <li>Open any card’s detail page for its official text, stats and set information; selected cards also include editorial strategy notes.</li>
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
      <h2>Base labels</h2>
      <ul>
        <li><strong>C — Common:</strong> the broadest base rarity.</li>
        <li><strong>U — Uncommon:</strong> less frequent than Common.</li>
        <li><strong>R — Rare:</strong> a higher base rarity treatment.</li>
        <li><strong>RR — Double Rare:</strong> the top regular base label shown for most BP01 cards.</li>
      </ul>
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

  "dawn-of-palpagos-pull-rates": (
    <>
      <h2>What is officially confirmed</h2>
      <p>Dawn of Palpagos released on July 30, 2026 and contains 100 base card types plus 61 parallel card types. The official card list identifies the available treatments, but the product page does not publish complete odds for each label.</p>
      <h2>Why early videos are not a true pull rate</h2>
      <p>One box or even ten boxes can show what is possible, but not a stable probability. Cases may vary, videos may omit packs, and replacement patterns can be misunderstood. Publishing a percentage without a large, auditable sample would mislead buyers.</p>
      <h2>What we will require before showing percentages</h2>
      <ul>
        <li>Sealed product with the region and language recorded.</li>
        <li>Every pack counted, including duplicates.</li>
        <li>Card numbers and rarity labels checked against the official database.</li>
        <li>A visible sample size and clear separation between observed frequency and official guarantee.</li>
      </ul>
      <div className="callout"><strong>Status — July 30:</strong> verification in progress. We will not invent “one per box” claims to fill an information gap.</div>
    </>
  ),

  "palworld-card-game-2026-roadmap": (
    <>
      <h2>July 30: Dawn of Palpagos launch</h2>
      <p>The first release wave contains the 100-card BP01 base set plus parallel treatments and two ready-to-play Trial Decks: Red/Blue TD01 and Green/Purple TD02. Each Trial Deck supplies a complete 50-card Main Deck, 10-card Soul Deck and the basic play accessories needed for a first match.</p>
      <h2>August 1-31: Grand Release Tournament</h2>
      <p>Official tournament stores may hold one Grand Release Tournament during August. The announced format is Standard, up to five Swiss rounds, best-of-one and 30 minutes per round. Registration is handled through Bushi Navi, so players should check the actual store listing before travelling.</p>
      <ul>
        <li><strong>Participation:</strong> one PR Card Pack containing one of nine card types, an Entry Soul Card Set and a Bushi Navi flair.</li>
        <li><strong>Champion:</strong> a Lily Everhart and Lyleen playmat plus a champion flair.</li>
        <li><strong>Important:</strong> prize availability and local entry details come from the organizer; a marketplace listing is not an event registration.</li>
      </ul>
      <h2>Autumn: the first competitive season</h2>
      <p>Official announcements place shop tournaments from August, the first Challengers Cup season from September through November, and regional Masters League competition across the 2026-27 season. Dates and locations can change, so the official event calendar remains the final source.</p>
      <h2>October 2: Sleeve &amp; Card Set Vol. 1</h2>
      <p>The announced set contains five exclusive card types—one copy of each—and 75 sleeves. Full card details were not yet published in the June announcement, so any effect text or rarity claims circulating before an official reveal should be treated as unverified.</p>
      <h2>October 30: Legends Awaken BP02</h2>
      <p>The second booster is confirmed as <strong>Legends Awaken</strong>. Bushiroad lists 100 normal card types across RR, R, U and C, plus parallel versions. The complete card list, exact parallel count and new mechanics were not confirmed in the announcement we checked.</p>
      <h2>What to bookmark</h2>
      <ul>
        <li>Use the official news page for product announcements.</li>
        <li>Use the official event calendar and Bushi Navi for a real registration.</li>
        <li>Use our card database only for cards already published in the official list.</li>
      </ul>
      <div className="callout"><strong>Tracker rule:</strong> confirmed dates are shown as facts. Teasers, retailer placeholders and community speculation stay labeled until an official source supports them.</div>
    </>
  ),

  "palworld-card-game-errata-tracker": (
    <>
      <h2>Current confirmed product errata</h2>
      <div className="verification-strip">
        <strong>TD01 · Confirmed</strong>
        <span>One printed card omits its Strike text. The official product notice—not the misprint—controls how the card works.</span>
      </div>
      <p>The accessible text on the official product page does not name the affected card, so this tracker does not guess from a photograph. Players should use the official notice and current card database when identifying the printed copy.</p>
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
      <h2>How this tracker will update</h2>
      <p>Each entry needs a direct official link, the affected product or card number, the corrected behavior and the date we checked it. Reports without a primary source remain outside the confirmed list.</p>
      <div className="callout"><strong>Last checked July 30, 2026:</strong> one product-page correction is confirmed here. Search our Rules &amp; Q&amp;A center for card interactions that are rulings rather than misprints.</div>
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
      <h2>Why there is no honest launch-day tier list yet</h2>
      <p>Card text can suggest strong synergies, but a real tier list needs repeated tournament results, known lists and matchup data. This guide describes verified mechanics and an editorial starting point; it does not present first-day opinions as a settled meta.</p>
      <Link className="button primary" href="/tools/deck-builder">Test a two-color list</Link>
    </>
  ),
};

const officialSources: Record<string, Array<{ label: string; href: string }>> = {
  "how-to-play-palworld-card-game": [
    { label: "Official Quick Manual", href: "https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/rule" },
    { label: "Official beginner page", href: "https://en.palworld-official-cardgame.com/for-beginners" },
  ],
  "palworld-card-game-deck-building-rules": [
    { label: "Official Quick Manual", href: "https://en.palworld-official-cardgame.com/wordpress/wp-content/uploads/2026/06/26104921/Palworld-OFFICIAL-CARD-GAME-Play-Guide_EN.pdf" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/question" },
  ],
  "red-blue-vs-green-purple-trial-deck": [
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official launch card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
  ],
  "palworld-card-game-products-where-to-buy": [
    { label: "Official product list", href: "https://en.palworld-official-cardgame.com/products" },
    { label: "Official retailer finder", href: "https://www.en.bushi-navi.com/storelist?default=true" },
    { label: "Dawn of Palpagos product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
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
  "dawn-of-palpagos-pull-rates": [
    { label: "Official BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
  ],
  "palworld-card-game-2026-roadmap": [
    { label: "Official news and latest updates", href: "https://en.palworld-official-cardgame.com/news" },
    { label: "Official Legends Awaken announcement", href: "https://en.palworld-official-cardgame.com/news/post-preoders-bp02-ss01" },
    { label: "Official Grand Release Tournament", href: "https://en.palworld-official-cardgame.com/events/grand-release-tournament" },
    { label: "Official 2026 event roadmap", href: "https://en.palworld-official-cardgame.com/news/post-becs-26" },
  ],
  "palworld-card-game-errata-tracker": [
    { label: "Official Red / Blue Trial Deck errata notice", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/rule" },
    { label: "Official card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
  ],
  "palworld-card-game-color-guide": [
    { label: "Official launch card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official Spring 2026 play-style overview", href: "https://en.palworld-official-cardgame.com/news/post-becs-26" },
  ],
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  const quickAnswer = guideQuickAnswers[slug];
  if (!guide || !guideContent[slug] || !quickAnswer) notFound();
  const related = guides.filter((item) => item.slug !== slug).slice(0, 3);
  const primaryImage = getGuidePrimaryImage(slug);

  return (
    <article className="article-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, image: primaryImage?.url, datePublished: "2026-07-30", dateModified: "2026-07-30", author: { "@type": "Organization", name: "Palworld Card Game Wiki" }, mainEntityOfPage: `https://palworldcardgame.wiki/blog/${guide.slug}` }} />
      <p className="eyebrow"><span>{guide.category}</span> · {guide.readTime}</p>
      <h1>{guide.title}</h1>
      <p className="article-lede">{guide.description}</p>
      <div className="guide-intro-flow">
        <div className="article-trust">
          <span>Updated {guide.updated}</span>
          <strong>{guide.sourceStatus}</strong>
          <span>Launch-day edition</span>
        </div>
        <GuideSeoImagePanel slug={slug} />
        <GuideToc contentId="guide-content" />
        <div className="guide-answer-slot">
          <div className="quick-answer">
            <strong>{quickAnswer.label}</strong>
            <p>{quickAnswer.answer}</p>
          </div>
        </div>
      </div>
      <div id="guide-content" className="guide-body">
        {guideContent[slug]}
      </div>

      <section className="source-panel">
        <p className="eyebrow">Sources & verification</p>
        <h2>Where these facts came from</h2>
        <p>We explain official material in our own words and add examples or editorial analysis. Rule and card facts are checked against the sources below.</p>
        <div>
          {(officialSources[slug] || []).map((source) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label} ↗</a>
          ))}
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
