import Link from "next/link";
import { cardByNumber } from "./data";

type GuideSource = { label: string; href: string };
type PrimaryAction = { label: string; detail: string; href: string };
type QuickAnswer = { label: string; answer: string };

function CardTextLink({ number }: { number: string }) {
  const card = cardByNumber(number);
  if (!card) throw new Error(`Competitive guide references missing card ${number}`);
  return <Link className="text-link" href={`/card/${card.slug}`}>{card.name} · {number}</Link>;
}

export const competitiveGuideQuickAnswers: Record<string, QuickAnswer> = {
  "palworld-tcg-deck-tier-list": {
    label: "Launch-format ranking",
    answer: "There is no results-based S-tier Palworld TCG deck yet because the official Featured Decks and Tournament Decks sections still show no published entries. This provisional launch ranking puts upgraded Red/Blue Materials–Structures and Green/Purple Ingredients–Taunt in A tier. Those placements are editorial estimates based on card synergy and complete deck engines, not match records. The unchanged TD01 and TD02 Trial Decks sit in B tier because they are coherent beginner decks with several BP01 upgrade options.",
  },
  "palworld-tcg-best-cards-by-color": {
    label: "Best cards at a glance",
    answer: "The safest launch-card shortlist is Suzaku, Bushi and Primitive Furnace for Red; Jormuntide, Azurobe and Sphere Workbench for Blue; Lyleen, Digtoise and Breeding Farm for Green; and Shadowbeak, Katress and Pyrin Noct for Purple. These are not universal auto-includes. They stand out because they create resources, draw or filter cards, interrupt attacks, control opposing Pals or provide a real finisher. Choose cards that support one deck engine, then check the two-color, four-copy and eight-Lucky limits before saving the list.",
  },
  "palworld-tcg-trial-deck-upgrade-guide": {
    label: "First upgrade plan",
    answer: "Upgrade only four slots first. For TD01 Red/Blue, test two Primitive Furnace and two Sphere Workbench to improve Materials and card selection; then consider Suzaku or Azurobe after checking the Lucky limit. For TD02 Green/Purple, test two Breeding Farm and two Pyrin Noct to improve Ingredient conversion and defense; then consider Lyleen or Katress after checking the Lucky limit. Remove the least useful vanilla or redundant high-cost cards one for one, keep the Main Deck at exactly 50 cards and play several games before changing the next group.",
  },
  "palworld-tcg-tournament-decklists": {
    label: "Official results status",
    answer: "No official Palworld TCG tournament decklist is published in the English deck-recipe database as of August 6, 2026: both Featured Decks and Tournament Decks show no entries. Grand Release and shop tournaments are active, but their official pages publish formats and prizes rather than winning lists. Challengers Cup is scheduled to begin in September and Masters League in November. Treat community lists as unverified until the event, placement and complete deck can be confirmed.",
  },
};

export const competitiveGuidePrimaryActions: Record<string, PrimaryAction[]> = {
  "palworld-tcg-deck-tier-list": [
    { label: "Open a ranked deck guide", detail: "See the complete Red/Blue starter", href: "/deck/mono-red-pal-rush" },
    { label: "Upgrade a Trial Deck", detail: "Change the first four slots safely", href: "/blog/palworld-tcg-trial-deck-upgrade-guide" },
    { label: "Build and compare", detail: "Test a legal 50-card list", href: "/tools/deck-builder" },
  ],
  "palworld-tcg-best-cards-by-color": [
    { label: "Browse every launch card", detail: "Filter the official 148-card pool", href: "/cards" },
    { label: "Choose two colors", detail: "Compare the four play styles", href: "/blog/palworld-card-game-color-guide" },
    { label: "Add cards to a deck", detail: "Check copy and Lucky limits", href: "/tools/deck-builder" },
  ],
  "palworld-tcg-trial-deck-upgrade-guide": [
    { label: "Open TD01 guide", detail: "Learn Red/Blue before changing it", href: "/deck/red-blue-launch-pressure" },
    { label: "Open TD02 guide", detail: "Learn Green/Purple before changing it", href: "/deck/green-blue-base-value" },
    { label: "Build the upgrade", detail: "Keep the finished list legal", href: "/tools/deck-builder" },
  ],
  "palworld-tcg-tournament-decklists": [
    { label: "Check official deck recipes", detail: "See newly published tournament lists", href: "https://en.palworld-official-cardgame.com/deckrecipe" },
    { label: "Find an official event", detail: "Registration, formats and prizes", href: "/events" },
    { label: "Review the provisional tier list", detail: "Use launch shells while results grow", href: "/blog/palworld-tcg-deck-tier-list" },
  ],
};

export const competitiveGuideContent: Record<string, React.ReactNode> = {
  "palworld-tcg-deck-tier-list": (
    <>
      <h2>Palworld TCG deck tier list</h2>
      <div className="comparison-table" role="region" aria-label="Palworld TCG launch deck tier list" tabIndex={0}>
        <div className="comparison-head"><span>Tier</span><strong>Deck shell</strong><strong>Why it is here</strong></div>
        <div><span>A</span><p>Red/Blue Materials–Structures</p><p>Reliable resource engines, card flow, direct Pal damage and several ways to finish a game.</p></div>
        <div><span>A</span><p>Green/Purple Ingredients–Taunt</p><p>Strong board protection, life gain, removal and flexible value turns after setup.</p></div>
        <div><span>B</span><p>TD01 Red/Blue unchanged</p><p>Clear beginner plan and good interaction, but several simple cards can become stronger BP01 engine pieces.</p></div>
        <div><span>B</span><p>TD02 Green/Purple unchanged</p><p>Coherent Ingredient plan with Taunt and Stealth, but less consistent before targeted BP01 upgrades.</p></div>
        <div><span>Unranked</span><p>Other color pairs</p><p>The card pool supports experiments, but these pairs do not yet have complete published lists or official results to compare.</p></div>
      </div>
      <div className="callout"><strong>No S tier yet:</strong> the official English deck-recipe page currently has no Featured Decks or Tournament Decks. The rankings below are editorial estimates based on card synergy, not tournament results.</div>

      <h2>How this provisional ranking works</h2>
      <p>This list ranks complete launch shells rather than isolated cards. A deck moves up when its low-cost plays, resource engine, interaction and finishers support the same plan. It moves down when it relies on drawing one expensive card or mixes several engines that compete for Souls, assignments or deck space.</p>
      <ul>
        <li><strong>Consistency:</strong> can the deck make a useful early play and keep cards moving?</li>
        <li><strong>Interaction:</strong> can it stop an attack, rest a threat, deal damage or remove a Pal?</li>
        <li><strong>Conversion:</strong> do Materials or Ingredients become board advantage instead of sitting unused?</li>
        <li><strong>Closing power:</strong> can the deck turn a stable base into player damage?</li>
      </ul>

      <h2>A tier: Red/Blue Materials–Structures</h2>
      <p>Red/Blue has the clearest launch-day curve. Red creates Materials and converts them into damage or Gear. Blue draws and filters cards, rests opposing Pals and protects a lead with Quick effects. The two colors share a practical Structure plan, so the deck does not need unrelated subthemes to function.</p>
      <p><CardTextLink number="EBP01-016" /> produces Materials and a card, while <CardTextLink number="EBP01-043" /> turns an assigned Pal into card selection. <CardTextLink number="EBP01-002" /> supplies immediate Pal damage and a late threat; <CardTextLink number="EBP01-029" /> draws a card and rests a Pal as it enters.</p>
      <p>Try the <Link className="text-link" href="/deck/mono-red-pal-rush">complete Red/Blue BP01 Structure Starter</Link> if you want a 50-card example that loads directly into the deck builder. It is a beginner starting list, not a tournament result.</p>

      <h2>A tier: Green/Purple Ingredients–Taunt</h2>
      <p>Green/Purple trades immediate speed for resilient turns. Green creates Ingredients, protects important cards with Taunt and can recover life. Purple supplies Stealth, graveyard play, attack interruption and direct removal. The pair becomes stronger when every card either feeds the Ingredient engine, protects a key Pal or converts a defeated Pal into value.</p>
      <p><CardTextLink number="EBP01-049" /> creates three Ingredients and can deploy another Pal from the top five cards. <CardTextLink number="EBP01-063" /> turns Ingredients into cards or deployment. <CardTextLink number="EBP01-075" /> rewards planned butchering, while <CardTextLink number="EBP01-077" /> is both a real attacker and an Interrupt from hand.</p>
      <p>The official TD02 pool provides a clear starting engine, but no complete upgraded 50-card result list is available yet. Use the <Link className="text-link" href="/deck/green-blue-base-value">illustrated TD02 guide</Link>, then make small upgrades.</p>

      <h2>B tier: the unchanged Trial Decks</h2>
      <p>TD01 and TD02 belong in B tier, not because they are bad products, but because they are designed to teach. Both provide a complete legal deck with a clear plan and everything needed for one player. Their simple low-cost Pals make first turns easier, yet those slots can later become cards that draw, create resources or interact.</p>
      <p>Do not replace half the deck after one game. Learn which cards are consistently weak in your own hand, change four slots, then test again. The <Link className="text-link" href="/blog/palworld-tcg-trial-deck-upgrade-guide">Trial Deck upgrade guide</Link> gives a safe first package for both products.</p>

      <h2>What is not ranked yet</h2>
      <p>Red/Green, Red/Purple, Blue/Green and Blue/Purple may produce strong decks, and single-color experiments are legal. They remain unranked until complete 50-card lists can be compared. A color combination alone is not enough to judge consistency or matchups.</p>

      <h2>What could change the ranking?</h2>
      <p>Published Featured Decks, Tournament Decks and Challengers Cup results will provide the first matchup data. Repeated finishes matter more than one local result.</p>
      <ul>
        <li>Complete 50-card Main Deck and 10-card Soul Deck lists.</li>
        <li>Event name, format, number of rounds and final placement.</li>
      </ul>

      <h2>Which deck should a beginner choose?</h2>
      <p>Choose Red/Blue if you want the more direct first plan and Green/Purple if you enjoy setup and sequencing. The difference between A and B here is upgrade readiness, not whether a new player can enjoy or learn from the product.</p>
    </>
  ),

  "palworld-tcg-best-cards-by-color": (
    <>
      <h2>Best Palworld TCG cards by color</h2>
      <p>A useful core card either advances its color&apos;s main engine or solves a problem that engine cannot ignore. The 20 cards below are launch-format shortlists from BP01, chosen from official card text. They are editorial picks, not a tournament popularity chart.</p>

      <h2>Best Red cards</h2>
      <div className="comparison-table" role="region" aria-label="Best Red Palworld TCG cards" tabIndex={0}>
        <div className="comparison-head"><span>Card</span><strong>Role</strong><strong>Why it matters</strong></div>
        <div><span><CardTextLink number="EBP01-002" /></span><p>Finisher and removal</p><p>Deals 700 damage on deploy and increases other Red non-battle damage.</p></div>
        <div><span><CardTextLink number="EBP01-003" /></span><p>Wide-board payoff</p><p>Gives every other Red Pal +300 Power while it remains in the base.</p></div>
        <div><span><CardTextLink number="EBP01-004" /></span><p>Attack protection</p><p>Can return to hand after attacking or be discarded as an Interrupt to nullify an attack.</p></div>
        <div><span><CardTextLink number="EBP01-016" /></span><p>Material engine</p><p>Creates three Materials, draws a card and can reduce the next Gear cost.</p></div>
        <div><span><CardTextLink number="EBP01-020" /></span><p>Board reset</p><p>Deals 1200 damage to every opposing Pal when deployed.</p></div>
      </div>
      <p>Red&apos;s strongest cards reward a focused damage or Material plan. Pump-Action Shotgun is powerful but expensive, so it belongs in a deck that can actually produce or conserve the Souls and Materials needed for its turn.</p>

      <h2>Best Blue cards</h2>
      <div className="comparison-table" role="region" aria-label="Best Blue Palworld TCG cards" tabIndex={0}>
        <div className="comparison-head"><span>Card</span><strong>Role</strong><strong>Why it matters</strong></div>
        <div><span><CardTextLink number="EBP01-027" /></span><p>Finisher and control</p><p>Draws a card, rests a cost-7-or-lower Pal and prevents its next normal stand.</p></div>
        <div><span><CardTextLink number="EBP01-029" /></span><p>Tempo</p><p>Replaces itself by drawing, then rests an opposing Pal.</p></div>
        <div><span><CardTextLink number="EBP01-038" /></span><p>Attack protection</p><p>Works as an Interrupt from hand to nullify an attack.</p></div>
        <div><span><CardTextLink number="EBP01-043" /></span><p>Card selection</p><p>Draws two and discards one after assigning a Pal.</p></div>
        <div><span><CardTextLink number="EBP01-047" /></span><p>Refill</p><p>Draws three cards with no extra engine requirement.</p></div>
      </div>
      <p>Blue&apos;s draw and rest effects are best when they protect a lead or set up the next attack. A deck filled with draw alone can run short of Pals, so keep a balanced curve and enough cards that affect the board.</p>

      <h2>Best Green cards</h2>
      <div className="comparison-table" role="region" aria-label="Best Green Palworld TCG cards" tabIndex={0}>
        <div className="comparison-head"><span>Card</span><strong>Role</strong><strong>Why it matters</strong></div>
        <div><span><CardTextLink number="EBP01-049" /></span><p>Ingredient engine</p><p>Creates three Ingredients and can deploy a cost-6-or-lower Pal from the top five cards.</p></div>
        <div><span><CardTextLink number="EBP01-050" /></span><p>Combat finisher</p><p>Scales at ten Souls and can gain Power plus Breakthrough.</p></div>
        <div><span><CardTextLink number="EBP01-054" /></span><p>Protection</p><p>A 1500-Power Taunt Pal that redirects legal attacks away from other targets.</p></div>
        <div><span><CardTextLink number="EBP01-063" /></span><p>Ingredient conversion</p><p>Turns Ingredients into card access or a cost-8-or-lower Pal deployment.</p></div>
        <div><span><CardTextLink number="EBP01-072" /></span><p>Recovery</p><p>Gains one life and draws one card without requiring an established board.</p></div>
      </div>
      <p>Lyleen and Breeding Farm reward a deck with enough Pals worth finding or deploying. Digtoise instead needs a plan that can reach ten Souls without spending every turn empty.</p>

      <h2>Best Purple cards</h2>
      <div className="comparison-table" role="region" aria-label="Best Purple Palworld TCG cards" tabIndex={0}>
        <div className="comparison-head"><span>Card</span><strong>Role</strong><strong>Why it matters</strong></div>
        <div><span><CardTextLink number="EBP01-073" /></span><p>Nocturnal removal</p><p>At night, deploying Nocturnal Pals can put suitable opposing Pals into the graveyard.</p></div>
        <div><span><CardTextLink number="EBP01-074" /></span><p>Night engine</p><p>Creates night while rested, doubles allied Pal auto abilities at night and converts a butcher into removal.</p></div>
        <div><span><CardTextLink number="EBP01-075" /></span><p>Graveyard engine</p><p>Turns butchering into a large attack and returns a lower-cost normal Pal from the graveyard.</p></div>
        <div><span><CardTextLink number="EBP01-077" /></span><p>Finisher and defense</p><p>A Strike-3 Nocturnal Pal that can instead be discarded as an Interrupt.</p></div>
        <div><span><CardTextLink number="EBP01-081" /></span><p>Life recovery</p><p>Can discard a card on attack to gain one life.</p></div>
      </div>
      <p>Purple rewards careful sequencing. Shadowbeak, Helzephyr and Katress fit decks built around night, butchering and graveyard targets; adding one to an unrelated list does not create the full engine.</p>

      <h2>Best cards are not always four-copy cards</h2>
      <p>A high-cost finisher may be excellent at one or two copies and awkward at four. A low-cost engine card may need more copies because the deck wants it early. Start by defining the job of each slot instead of filling the deck with the highest-rarity cards.</p>
      <ul>
        <li>Use enough low-cost Pals to make early turns.</li>
        <li>Choose one main resource engine.</li>
        <li>Add interaction that works when behind.</li>
        <li>Limit expensive finishers so they do not crowd the opening hand.</li>
        <li>Check the eight-card Lucky limit as well as the same-name copy limit.</li>
      </ul>

      <h2>Best first color pair</h2>
      <p>Red/Blue is the simplest pair for immediate pressure, card flow and Structure play. Green/Purple offers more protection and recovery, but its best turns require more setup. The other legal pairs may be worth testing after the first two receive complete, repeatable decklists.</p>
    </>
  ),

  "palworld-tcg-trial-deck-upgrade-guide": (
    <>
      <h2>Upgrade the engine before the finisher</h2>
      <p>TD01 and TD02 are already complete 50-card Main Decks with separate 10-card Soul Decks. The safest first upgrade is not replacing every simple card with an expensive BP01 pull. Improve four engine slots, confirm the deck still makes early plays, then add finishers only after several games.</p>
      <div className="stat-table">
        <div><strong>50</strong><span>Main Deck cards after every swap</span></div>
        <div><strong>10</strong><span>separate Soul cards</span></div>
        <div><strong>4</strong><span>same-name maximum</span></div>
        <div><strong>8</strong><span>Lucky maximum</span></div>
      </div>

      <h2>TD01 Red/Blue first four-card upgrade</h2>
      <div className="comparison-table" role="region" aria-label="TD01 first upgrade package" tabIndex={0}>
        <div className="comparison-head"><span>Add</span><strong>Reason</strong><strong>What it improves</strong></div>
        <div><span>2× <CardTextLink number="EBP01-016" /></span><p>Creates three Materials and draws a card after assigning a Pal.</p><p>More reliable Material turns and Gear discounts.</p></div>
        <div><span>2× <CardTextLink number="EBP01-043" /></span><p>Draws two and discards one after assigning a Pal.</p><p>Better card selection without changing colors.</p></div>
      </div>
      <p>For each added card, remove one copy from a slot that rarely affects the game. Start with simple low-Power Pals without abilities, redundant copies of situational cards or the highest-cost card that repeatedly stays in hand. Do not remove so many cheap Pals that Stone Pit, Primitive Furnace, Primitive Workbench or Sphere Workbench run out of assignment targets.</p>

      <h2>TD01 optional threat package</h2>
      <p>After the engine works, test one or two copies of <CardTextLink number="EBP01-002" /> for deploy damage and one or two <CardTextLink number="EBP01-029" /> for a card plus a rest effect. Both are Lucky Pals, so count every Lucky icon already in the Main Deck before adding them.</p>
      <p>A more defensive TD01 can use <CardTextLink number="EBP01-038" /> as another Interrupt from hand. A slower Gear build can test <CardTextLink number="EBP01-020" />, but seven-cost cards should not be added merely because their ceiling is high.</p>

      <h2>TD02 Green/Purple first four-card upgrade</h2>
      <div className="comparison-table" role="region" aria-label="TD02 first upgrade package" tabIndex={0}>
        <div className="comparison-head"><span>Add</span><strong>Reason</strong><strong>What it improves</strong></div>
        <div><span>2× <CardTextLink number="EBP01-063" /></span><p>Turns Ingredients into card access or a Pal deployment.</p><p>A repeatable payoff for Berry Plantation and Flopie.</p></div>
        <div><span>2× <CardTextLink number="EBP01-077" /></span><p>Can attack as a Strike-3 Pal or leave hand as an Interrupt.</p><p>Flexible defense without needing a full night engine.</p></div>
      </div>
      <p>Start cuts with Green or Purple Pals that have no printed ability and high-cost cards that duplicate a role the deck already performs. Preserve Berry Plantation, Campfire, Broncherry, Astegon and Felbat until testing proves a different plan, because those cards explain how the original deck creates Ingredients, protects its board and turns a stable base into damage.</p>

      <h2>TD02 optional engine package</h2>
      <p>Test one or two <CardTextLink number="EBP01-049" /> when the deck has enough cost-6-or-lower Pals worth finding. Add <CardTextLink number="EBP01-075" /> only when the list also contains Pals that create value when butchered or useful normal Pals to return from the graveyard.</p>
      <p><CardTextLink number="EBP01-074" /> and <CardTextLink number="EBP01-073" /> form a stronger night package together, but they should not be the first upgrade. Both cost seven or more, and their text becomes much weaker when the rest of the deck does not support Nocturnal turns.</p>

      <h2>Which Trial Deck cards should you remove?</h2>
      <p>Use performance, not rarity, to decide. After each game, note which cards were drawn but could not advance the board, protect an attack or support the deck&apos;s resource plan.</p>
      <ol>
        <li><strong>Cut blank cards first:</strong> a Pal with no ability is the easiest slot to compare with a BP01 card.</li>
        <li><strong>Trim duplicate roles:</strong> several expensive finishers can make the opening hand unplayable.</li>
        <li><strong>Keep the curve:</strong> replace a low-cost card with another low-cost card when possible.</li>
        <li><strong>Protect the engine:</strong> do not cut the Structures, Gear or Pals that create the deck&apos;s named resource.</li>
        <li><strong>Recount everything:</strong> finish at exactly 50 cards and recheck colors, same-name copies and Lucky icons.</li>
      </ol>

      <h2>A four-game upgrade test</h2>
      <div className="comparison-table" role="region" aria-label="Four-game Trial Deck upgrade test" tabIndex={0}>
        <div className="comparison-head"><span>Game</span><strong>Question</strong><strong>What to record</strong></div>
        <div><span>1</span><p>Did the new engine card appear?</p><p>Turn drawn and whether it could be used.</p></div>
        <div><span>2</span><p>Did the deck still make early plays?</p><p>First playable Pal, Structure or interaction.</p></div>
        <div><span>3</span><p>Did the removed card have a missing role?</p><p>Any turn where the old effect would have helped.</p></div>
        <div><span>4</span><p>Did the package improve the same plan?</p><p>Materials, Ingredients, cards, defense and closing turn.</p></div>
      </div>
      <p>If the answer is unclear after four games, keep testing instead of replacing another group. A small recorded sample is more useful than changing 20 cards and not knowing which change mattered.</p>

      <h2>Do you need a second Trial Deck?</h2>
      <p>Not automatically. One copy is enough to play. A second copy can supply additional fixed cards, but targeted singles are more controlled once you know the exact quantities missing. Compare the second deck price with the individual cards before buying.</p>
    </>
  ),

  "palworld-tcg-tournament-decklists": (
    <>
      <h2>Palworld TCG tournament decklist status</h2>
      <div className="comparison-table" role="region" aria-label="Palworld TCG tournament decklist status" tabIndex={0}>
        <div className="comparison-head"><span>Official source</span><strong>Status on August 6</strong><strong>What is available</strong></div>
        <div><span>English Deck Recipe</span><p>No Featured Decks or Tournament Decks listed</p><p>DeckLog creation link only.</p></div>
        <div><span>Grand Release Tournament</span><p>August 1–31 events underway</p><p>Format, prizes and registration; no winning decklists.</p></div>
        <div><span>Shop Tournaments</span><p>August program active</p><p>Swiss best-of-one format and prize information; no winning decklists.</p></div>
        <div><span>Challengers Cup</span><p>First season planned for September</p><p>Event announcement; results are not yet available.</p></div>
        <div><span>Masters League 26/27</span><p>Road begins in November</p><p>World Championship path announced; results are not yet available.</p></div>
      </div>
      <div className="callout"><strong>Direct answer:</strong> the official English Deck Recipe database has no tournament lists yet. For now, start with TD01, TD02 or a clearly labeled beginner list.</div>

      <h2>Where official tournament decklists should appear</h2>
      <p>The publisher&apos;s English Deck Recipe page has separate sections for Featured Decks and Tournament Decks. Both currently say “No entries found.” Check those sections first when you see a new winner claim or deck screenshot.</p>
      <p>The official events hub currently lists Grand Release, shop tournaments, Challengers Cup and Masters League. Event pages establish the format, schedule and prizes, but they do not currently publish player names, standings or complete 50-card lists.</p>

      <h2>What counts as a verified tournament decklist?</h2>
      <p>A screenshot of cards is not enough by itself. A useful result needs the list and the event context so another player can understand what the finish means.</p>
      <ul>
        <li><strong>Event:</strong> official name, date, region and organizer.</li>
        <li><strong>Format:</strong> Standard or another published format, plus best-of-one or best-of-three.</li>
        <li><strong>Result:</strong> champion, finalist, undefeated finish or another clearly defined placement.</li>
        <li><strong>Deck:</strong> complete 50-card Main Deck and 10-card Soul Deck, including quantities.</li>
        <li><strong>Source:</strong> publisher, organizer or identifiable player post that can be opened and checked.</li>
      </ul>
      <p>If a post is missing one of these details, treat it as a community deck rather than a confirmed winning list.</p>

      <h2>Current tournament formats</h2>
      <p>The Grand Release Tournament uses a pre-constructed legal deck, Standard format, up to five Swiss rounds, best of one and 30 minutes per round. Shop tournaments use Standard, Swiss and best of one until one undefeated player remains. Registration is handled through Bushi Navi.</p>
      <p>Those rules matter when comparing results. A list that succeeds in a short best-of-one shop event may value immediate consistency differently from a future multi-day championship format.</p>

      <h2>What to play before results are published</h2>
      <p>Use a complete list whose source is clear. TD01 and TD02 are official products with fixed card pools. The <Link className="text-link" href="/deck/mono-red-pal-rush">Red/Blue BP01 Structure Starter</Link> is an editorial 50-card beginner list that can be opened in the deck builder. None of these should be called the tournament best deck.</p>
      <p>The <Link className="text-link" href="/blog/palworld-tcg-deck-tier-list">provisional deck tier list</Link> ranks launch shells by consistency, interaction and finishing plan. S tier remains empty until official results are available.</p>

      <h2>How to read an early result</h2>
      <ol>
        <li>Confirm whether the event required a legal pre-constructed deck.</li>
        <li>Count the rounds and players before treating one undefeated finish as a stable metagame.</li>
        <li>Check whether the published list is complete and whether card language or errata affected eligibility.</li>
        <li>Look for repeated color pairs and engine cards across several events.</li>
        <li>Keep older lists when BP02 or a rules update changes the format; label the historical card pool instead of silently replacing them.</li>
      </ol>

      <h2>Results timeline</h2>
      <div className="comparison-table" role="region" aria-label="Palworld TCG results tracker timeline" tabIndex={0}>
        <div className="comparison-head"><span>Date</span><strong>Source</strong><strong>Available information</strong></div>
        <div><span>August 6, 2026</span><p>Official Deck Recipe database</p><p>No Featured Decks or Tournament Decks published.</p></div>
        <div><span>August 2026</span><p>Grand Release and shop event pages</p><p>Formats and prizes published; no official winning lists found.</p></div>
        <div><span>September 2026</span><p>Challengers Cup</p><p>Scheduled; event results are not yet available.</p></div>
        <div><span>November 2026</span><p>Masters League 26/27 path</p><p>Scheduled to begin; decklists and standings are not yet available.</p></div>
      </div>

      <h2>Prepare for an event</h2>
      <p>Use the <Link className="text-link" href="/events">Palworld TCG tournament guide</Link> for registration and preparation. Check official card text in the card database, confirm construction rules, then save a legal list in the deck builder.</p>
    </>
  ),
};

export const competitiveGuideSources: Record<string, GuideSource[]> = {
  "palworld-tcg-deck-tier-list": [
    { label: "Official English Deck Recipe database", href: "https://en.palworld-official-cardgame.com/deckrecipe" },
    { label: "Official launch card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
  ],
  "palworld-tcg-best-cards-by-color": [
    { label: "Official BP01 card list", href: "https://en.palworld-official-cardgame.com/cardlist/searchresults?expansion=EBP01" },
    { label: "Official Rule & Q&A", href: "https://en.palworld-official-cardgame.com/rule" },
    { label: "Official deck construction rules", href: "https://en.palworld-official-cardgame.com/news/post-bp01-td0102-preorder" },
  ],
  "palworld-tcg-trial-deck-upgrade-guide": [
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official BP01 card list", href: "https://en.palworld-official-cardgame.com/cardlist/searchresults?expansion=EBP01" },
    { label: "Official deck construction rules", href: "https://en.palworld-official-cardgame.com/news/post-bp01-td0102-preorder" },
  ],
  "palworld-tcg-tournament-decklists": [
    { label: "Official English Deck Recipe database", href: "https://en.palworld-official-cardgame.com/deckrecipe" },
    { label: "Official events hub", href: "https://en.palworld-official-cardgame.com/events" },
    { label: "Official Grand Release Tournament", href: "https://en.palworld-official-cardgame.com/events/grand-release-tournament" },
    { label: "Official shop tournaments", href: "https://en.palworld-official-cardgame.com/events/shop-tournaments" },
  ],
};

export const competitiveRelatedGuideSlugs: Record<string, string[]> = {
  "palworld-tcg-deck-tier-list": [
    "palworld-tcg-trial-deck-upgrade-guide",
    "palworld-tcg-best-cards-by-color",
    "palworld-tcg-tournament-decklists",
  ],
  "palworld-tcg-best-cards-by-color": [
    "palworld-tcg-deck-tier-list",
    "palworld-card-game-color-guide",
    "palworld-tcg-trial-deck-upgrade-guide",
  ],
  "palworld-tcg-trial-deck-upgrade-guide": [
    "palworld-tcg-deck-tier-list",
    "red-blue-vs-green-purple-trial-deck",
    "palworld-tcg-best-cards-by-color",
  ],
  "palworld-tcg-tournament-decklists": [
    "palworld-tcg-deck-tier-list",
    "palworld-card-game-deck-building-rules",
    "palworld-card-game-2026-roadmap",
  ],
};
