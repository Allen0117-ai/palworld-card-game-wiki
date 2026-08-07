import Link from "next/link";

type QuickAnswer = {
  label: string;
  answer: string;
};

type PrimaryAction = {
  label: string;
  detail: string;
  href: string;
};

type GuideSource = {
  label: string;
  href: string;
};

export const commercialGuideQuickAnswers: Record<string, QuickAnswer> = {
  "palworld-card-game-products-where-to-buy": {
    label: "Safe buying answer",
    answer: "Start with Bushiroad's official retailer finder, select your country and confirm stock with the store. BP02 Legends Awaken preorders are officially open through local stores, but allocation and delivery dates depend on each seller. Buyers in Canada, Germany, the Netherlands and Spain should choose the English edition, compare the final delivered price after tax and shipping, and verify the exact product, sealed quantity, cancellation terms and buyer protection. The official English product pages do not publish one universal worldwide MSRP, so marketplace asking prices are not reliable market value.",
  },
  "palworld-tcg-first-edition-vs-reprint": {
    label: "The short answer",
    answer: "First Edition wording on sealed packaging describes that sealed product, but no official card-level First Edition stamp guide has been published for loose BP01 cards. Do not pay a premium for a loose card based only on an unsupported first-print claim.",
  },
  "palworld-tcg-booster-box-vs-trial-deck-vs-singles": {
    label: "Fast recommendation",
    answer: "Buy a Trial Deck to start playing, a booster box for the opening and collecting experience, or singles when you already know the exact cards your deck needs. Most new players should start with one Trial Deck.",
  },
  "palworld-tcg-card-size-sleeves": {
    label: "Exact size",
    answer: "Palworld TCG cards are 63×88mm and use standard-size trading card sleeves. A complete deck uses 60 cards across the Main Deck and Soul Deck, so buy at least 60 matching sleeves plus several spares.",
  },
  "are-palworld-tcg-trial-decks-worth-it": {
    label: "Verdict",
    answer: "Yes for a new player: one Trial Deck contains a complete 50-card Main Deck, 10 Soul cards, play accessories, one BP01 pack and one parallel-rarity replacement card. Collectors or experienced deck builders may prefer targeted singles instead.",
  },
  "palworld-tcg-english-vs-japanese-cards": {
    label: "Tournament answer",
    answer: "Outside Japan, Mainland China, Taiwan, Hong Kong and South Korea, official events require an English-edition Main Deck. The official launch policy allows Soul cards of different languages, but local event rules should still be checked before play.",
  },
};

export const commercialGuidePrimaryActions: Record<string, PrimaryAction[]> = {
  "palworld-card-game-products-where-to-buy": [
    { label: "Find an official retailer", detail: "Open Bushiroad's store finder", href: "https://www.en.bushi-navi.com/storelist?default=true" },
    { label: "Compare all three options", detail: "Box, Trial Deck or singles", href: "/blog/palworld-tcg-booster-box-vs-trial-deck-vs-singles" },
    { label: "Check the full BP01 set", detail: "Know what you are buying", href: "/cards" },
  ],
  "palworld-tcg-first-edition-vs-reprint": [
    { label: "Identify BP01 cards", detail: "Match exact numbers and artwork", href: "/cards" },
    { label: "Read the rarity guide", detail: "Separate rarity from print claims", href: "/blog/palworld-tcg-rarity-guide" },
    { label: "Check collector targets", detail: "See confirmed SSP and SP cards", href: "/blog/dawn-of-palpagos-chase-cards" },
  ],
  "palworld-tcg-booster-box-vs-trial-deck-vs-singles": [
    { label: "Compare both Trial Decks", detail: "Choose your first colors", href: "/blog/red-blue-vs-green-purple-trial-deck" },
    { label: "Inspect every BP01 card", detail: "Plan singles before buying", href: "/cards" },
    { label: "Find official stores", detail: "Check local stock safely", href: "/blog/palworld-card-game-products-where-to-buy" },
  ],
  "palworld-tcg-card-size-sleeves": [
    { label: "Choose a first deck", detail: "Compare TD01 and TD02", href: "/blog/red-blue-vs-green-purple-trial-deck" },
    { label: "Protect a collection", detail: "Track every BP01 card", href: "/tools/dawn-of-palpagos-checklist" },
    { label: "See collector cards", detail: "Identify high-rarity artwork", href: "/blog/dawn-of-palpagos-chase-cards" },
  ],
  "are-palworld-tcg-trial-decks-worth-it": [
    { label: "Compare TD01 and TD02", detail: "Pick the right play style", href: "/blog/red-blue-vs-green-purple-trial-deck" },
    { label: "Open both deck lists", detail: "See every included card", href: "/decks" },
    { label: "Plan an upgrade", detail: "Build with legal limits", href: "/tools/deck-builder" },
  ],
  "palworld-tcg-english-vs-japanese-cards": [
    { label: "Browse English cards", detail: "Check official English text", href: "/cards" },
    { label: "Browse Japanese cards", detail: "Open the Japanese database", href: "/ja/cards" },
    { label: "Check deck legality", detail: "Review construction rules", href: "/blog/palworld-card-game-deck-building-rules" },
  ],
};

export const commercialGuideContent: Record<string, React.ReactNode> = {
  "palworld-card-game-products-where-to-buy": (
    <>
      <h2>Where can you buy Palworld TCG products safely?</h2>
      <p>The safest starting point is Bushiroad&apos;s official retailer finder. It lists approved stores by region and avoids sending buyers directly to an unknown marketplace seller.</p>
      <ol>
        <li>Open the official retailer finder and select your country or region.</li>
        <li>Call or check the store before travelling because launch stock can change during the day.</li>
        <li>Confirm the exact product: BP01 booster pack, 12-pack booster box, TD01 or TD02.</li>
        <li>Check the language, sealed condition, delivery date and return policy.</li>
        <li>Compare the final cost after shipping, tax and import fees.</li>
      </ol>
      <p><a className="button primary" href="https://www.en.bushi-navi.com/storelist?default=true" target="_blank" rel="noreferrer">Find an official retailer ↗</a></p>

      <h2>Can you preorder Palworld Legends Awaken BP02?</h2>
      <p>Yes. The official BP02 product page says Legends Awaken preorders are available at local stores for the October 30, 2026 release. It does not publish one worldwide preorder retailer list, price or allocation guarantee, so use the official store finder and confirm the seller&apos;s deposit, cancellation and estimated-delivery terms before paying.</p>
      <p><Link className="text-link" href="/sets/legends-awaken-bp02">Check the BP02 release facts and card-list status →</Link></p>

      <h2>Where to buy Palworld TCG in Canada and Europe</h2>
      <p>The official launch policy supports the English edition outside Japan, Mainland China, Taiwan, Hong Kong and South Korea. The country name below changes the buying checks—not the card language or product contents.</p>
      <div className="comparison-table" role="region" aria-label="Palworld TCG buying guidance for Canada and Europe" tabIndex={0}>
        <div className="comparison-head"><span>Region</span><strong>Best starting point</strong><strong>Check before paying</strong></div>
        <div><span>Canada</span><p>Select Canada in the official store finder and confirm English stock in CAD.</p><p>GST/HST, domestic shipping, preorder allocation and whether a US listing adds import fees.</p></div>
        <div><span>Germany</span><p>Use an official or established EU store selling the English edition.</p><p>Final euro price, VAT, shipping, cancellation terms and the exact BP01 or BP02 code.</p></div>
        <div><span>Netherlands</span><p>Check local or EU English-edition stock through the store finder.</p><p>VAT, tracked delivery, sealed quantity and cross-border return address.</p></div>
        <div><span>Spain</span><p>Use a trusted Spanish or EU store and confirm the cards are English.</p><p>Final euro price, mainland or island shipping, preorder delivery and returns.</p></div>
      </div>
      <div className="callout"><strong>Language note:</strong> the publisher&apos;s current policy says only the English edition is sold and supported outside the listed Asian territories. Do not assume a German, Dutch or Spanish listing means the cards are translated into that language.</div>

      <h2>Does Palworld TCG have an official English MSRP?</h2>
      <div className="comparison-table" role="region" aria-label="Official Palworld TCG price references" tabIndex={0}>
        <div className="comparison-head"><span>Product</span><strong>Official Japan price</strong><strong>What English buyers should know</strong></div>
        <div><span>BP01 pack</span><p>¥440 including tax</p><p>The English product page does not publish one worldwide MSRP.</p></div>
        <div><span>BP01 box</span><p>¥5,280 including tax</p><p>A box must contain 12 packs; compare the delivered local price.</p></div>
        <div><span>BP01 carton</span><p>¥63,360 for 12 boxes</p><p>Do not confuse a carton listing with a single box.</p></div>
        <div><span>TD01 or TD02</span><p>¥1,980 including tax</p><p>Each Trial Deck is a complete product for one player.</p></div>
      </div>
      <div className="callout"><strong>Important:</strong> Japanese suggested retail prices are a reference for Japan, not a currency-converted English MSRP. Distribution, tax and shipping differ by country.</div>

      <h2>Launch-week price snapshot — August 3, 2026</h2>
      <p>Community reports show that some local US stores initially sold BP01 boxes around $40–$65, while sold-out areas produced much higher marketplace and reseller listings. These are dated, anecdotal observations—not an official MSRP or a stable market value.</p>
      <p>A high asking price proves only what a seller wants. Before paying more than a trusted store price, compare several completed sales and decide whether you need the product immediately.</p>

      <h2>Should you buy Palworld TCG on TCGplayer?</h2>
      <p>TCGplayer is a marketplace, so the individual seller, listing and buyer protection matter more than the marketplace name alone. For sealed product, confirm BP01 Dawn of Palpagos, the English language, a factory-sealed 12-pack box and the final delivered cost. For singles, match the exact card number and treatment before paying; a base card and its SR, OSR, SP or SSP version can look similar in a short listing while carrying very different collector prices.</p>
      <p>A TCGplayer market price is not an official MSRP or a guaranteed future value. Prices and stock move quickly, so compare several recent completed sales before buying.</p>

      <h2>How can you verify a BP01 booster-box listing?</h2>
      <ul>
        <li><strong>Correct name:</strong> Dawn of Palpagos, BP01.</li>
        <li><strong>Correct quantity:</strong> 12 packs with 7 cards in each pack.</li>
        <li><strong>Correct format:</strong> a sealed display, not 12 unrelated loose packs.</li>
        <li><strong>Correct language:</strong> English if you plan to use the Main Deck cards in supported English tournaments.</li>
        <li><strong>Buyer protection:</strong> clear store identity, payment protection and a return policy.</li>
      </ul>

      <h2>What to do when booster boxes are sold out</h2>
      <ol>
        <li>Check several official local stores rather than one marketplace search.</li>
        <li>Ask whether the store has a waiting list, preorder list or customer notification.</li>
        <li>Follow the official Palworld OCG and store accounts for verified shipment updates.</li>
        <li>Buy a Trial Deck if your real goal is to start playing now.</li>
        <li>Buy singles if your real goal is one exact deck card.</li>
      </ol>
      <p>As of August 3, 2026, no public official BP01 restock calendar has been announced. A retailer&apos;s estimated arrival date applies to that retailer and should not be presented as a worldwide reprint date.</p>

      <h2>Which Palworld TCG product should a beginner buy?</h2>
      <div className="comparison-table" role="region" aria-label="Palworld TCG first purchase guide" tabIndex={0}>
        <div className="comparison-head"><span>Your goal</span><strong>Best first purchase</strong><strong>Reason</strong></div>
        <div><span>Play immediately</span><p>One Trial Deck</p><p>It contains a legal Main Deck, Soul Deck and play accessories.</p></div>
        <div><span>Play with a friend</span><p>Two Trial Decks</p><p>Each player needs a complete deck.</p></div>
        <div><span>Open and collect</span><p>One sealed BP01 box</p><p>You receive 12 random packs and 84 cards total.</p></div>
        <div><span>Upgrade one deck</span><p>Targeted singles</p><p>You avoid paying for random cards you do not need.</p></div>
      </div>
      <p>For the full decision, use our <Link className="text-link" href="/blog/palworld-tcg-booster-box-vs-trial-deck-vs-singles">booster box vs Trial Deck vs singles guide</Link>.</p>

      <h2>Buying FAQ</h2>
      <h3>Does Palworld TCG have an official US MSRP?</h3>
      <p>The official English BP01 page does not publish one universal US MSRP. Use trusted local store prices and the final delivered cost rather than a marketplace “MSRP” label.</p>
      <h3>How many packs are in a BP01 box?</h3>
      <p>A sealed Dawn of Palpagos box contains 12 packs, with 7 cards per pack.</p>
      <h3>Should I buy loose packs?</h3>
      <p>Loose packs may be fine from a trusted local store, but they are not equivalent to a sealed box. Confirm the seller and return policy before buying loose packs online.</p>
      <h3>Should I pay a launch-week premium?</h3>
      <p>Only if immediate access is worth the extra cost to you. High first-week prices can change quickly, and no seller can guarantee future value.</p>
      <h3>Where can I buy Palworld TCG in Canada?</h3>
      <p>Start with the official Bushiroad store finder, select Canada, then compare the final CAD price after GST/HST and shipping. Confirm English stock directly with the store before travelling or preordering.</p>
      <h3>Can I buy Palworld TCG in Germany, the Netherlands or Spain?</h3>
      <p>Yes, through stores carrying the supported English edition. Use the official finder first, then verify VAT, delivery, returns and the exact product code before buying from a local or cross-border EU seller.</p>
    </>
  ),

  "palworld-tcg-first-edition-vs-reprint": (
    <>
      <h2>What “First Edition” currently proves</h2>
      <p>A First Edition label on sealed packaging can identify that sealed pack or box as first-print packaging. It does not automatically create a visible First Edition stamp on every loose card inside.</p>
      <div className="comparison-table" role="region" aria-label="Palworld TCG First Edition fact check" tabIndex={0}>
        <div className="comparison-head"><span>Claim</span><strong>Current evidence</strong><strong>Safe conclusion</strong></div>
        <div><span>Sealed box says First Edition</span><p>The wording can be checked on the original packaging.</p><p>It supports a claim about that sealed product.</p></div>
        <div><span>Loose card is First Edition</span><p>No official card-level identification guide was found for BP01.</p><p>Do not accept the claim without official evidence.</p></div>
        <div><span>EBP01 proves First Edition</span><p>EBP01 is the printed set code on English BP01 cards.</p><p>The code alone is not an official First Edition certificate.</p></div>
        <div><span>A reprint will look different</span><p>No official BP01 reprint comparison guide has been published.</p><p>Wait for verified product details before assuming a difference.</p></div>
      </div>

      <h2>Can you identify a First Edition card after opening it?</h2>
      <p>Not reliably from the currently published official information. Once a card is separated from its wrapper or box, a seller may not be able to prove which print run supplied it.</p>
      <div className="callout"><strong>Collector rule:</strong> value the exact card, rarity, language and condition you can verify. Treat a loose-card “first print” premium as unsupported until an official identifier exists.</div>

      <h2>What about first-wave packaging differences?</h2>
      <p>Collectors have discussed printing and packaging differences in early English products. Community photos can document a physical difference, but they do not establish rarity, print quantity or future value. No official guide currently defines a packaging variation as a separate collectible card edition.</p>

      <h2>Has a BP01 reprint been officially detailed?</h2>
      <p>No official BP01 page currently gives a reprint date or explains how reprinted booster cards would be marked. The Trial Deck product pages do state that included cards may be reprinted or featured in future products, but that notice does not describe a BP01 booster reprint.</p>

      <h2>How to buy sealed First Edition product safely</h2>
      <ol>
        <li>Ask for clear photos of every side of the exact box—not a stock image.</li>
        <li>Check that the product is Dawn of Palpagos BP01 and the expected language.</li>
        <li>Inspect the seal, corners and signs of reopening or damage.</li>
        <li>Keep the receipt and seller description with the sealed product.</li>
        <li>Compare completed sales for the same sealed product and condition.</li>
      </ol>

      <h2>Is First Edition worth more?</h2>
      <p>It may attract collectors, but a label alone does not guarantee a higher long-term price. Supply, condition, demand and verified completed sales matter. Launch-week asking prices are especially unreliable because sellers can list any number.</p>

      <h2>First Edition FAQ</h2>
      <h3>Do BP01 cards have a First Edition stamp?</h3>
      <p>No official card-level First Edition stamp or identification guide has been published for loose BP01 cards.</p>
      <h3>Does EBP01 mean First Edition?</h3>
      <p>No official source defines EBP01 as proof of First Edition status. Treat it as the English BP01 set code, not a separate authenticity certificate.</p>
      <h3>Should I open a First Edition box?</h3>
      <p>Open it if your goal is playing and collecting the cards. Keep it sealed only if owning the sealed product matters more to you than the opening experience; future value is not guaranteed.</p>
    </>
  ),

  "palworld-tcg-booster-box-vs-trial-deck-vs-singles": (
    <>
      <h2>The three ways to start buying Palworld TCG</h2>
      <div className="comparison-table" role="region" aria-label="Palworld TCG Booster Box Trial Deck and singles comparison" tabIndex={0}>
        <div className="comparison-head"><span>Question</span><strong>Booster Box</strong><strong>Trial Deck / Singles</strong></div>
        <div><span>What you get</span><p>12 random BP01 packs, 84 cards total</p><p>Trial Deck: fixed 60 cards. Singles: exact cards chosen.</p></div>
        <div><span>Ready to play?</span><p>No legal deck is guaranteed</p><p>Trial Deck: yes. Singles: only after completing a list.</p></div>
        <div><span>Best for</span><p>Opening, collecting and broad upgrades</p><p>Trial Deck: beginners. Singles: focused upgrades.</p></div>
        <div><span>Main risk</span><p>Duplicates and missing the cards you want</p><p>Trial Deck: limited customization. Singles: changing prices.</p></div>
      </div>

      <h2>Buy a Trial Deck if you want to play now</h2>
      <p>TD01 Red/Blue and TD02 Green/Purple each contain a fixed 50-card Main Deck, 10 Soul cards, a paper playmat and guide, counters, one BP01 booster pack and one parallel-rarity replacement card.</p>
      <p>This is the simplest first purchase because one product supplies everything one player needs for a normal game. Choose <Link className="text-link" href="/blog/red-blue-vs-green-purple-trial-deck">Red/Blue for a more direct plan or Green/Purple for more setup and sequencing</Link>.</p>

      <h2>Buy a booster box if opening packs is part of the goal</h2>
      <p>A BP01 Dawn of Palpagos box contains 12 packs with 7 cards each. It is useful for seeing many cards, collecting artwork and making broad upgrades, but the 84 cards are random and duplicates are normal.</p>
      <p>A box is not a shortcut to a legal deck. You may still lack enough copies, the correct colors or a complete 10-card Soul Deck.</p>

      <h2>Buy singles when you know the exact list</h2>
      <p>Singles are the most efficient choice when a deck builder or tested list tells you exactly which card numbers and quantities are missing. You avoid opening unrelated colors and hoping for a specific pull.</p>
      <div className="callout"><strong>Price-check habit:</strong> match the exact card number and rarity. A regular card, SR, OSR, SP or SSP version can have very different collector prices while filling the same basic deck role.</div>

      <h2>Best purchase by player type</h2>
      <div className="comparison-table" role="region" aria-label="Best Palworld TCG product by buyer type" tabIndex={0}>
        <div className="comparison-head"><span>Buyer</span><strong>Start with</strong><strong>Add next</strong></div>
        <div><span>Completely new player</span><p>One Trial Deck</p><p>A few tested singles or BP01 packs for fun</p></div>
        <div><span>Two friends</span><p>One Trial Deck each</p><p>Swap decks, then choose upgrade cards</p></div>
        <div><span>Competitive player</span><p>A known deck shell</p><p>Targeted singles after testing</p></div>
        <div><span>Set collector</span><p>Booster box</p><p>Singles to fill checklist gaps</p></div>
        <div><span>Artwork collector</span><p>Exact singles</p><p>Sealed product only if desired</p></div>
      </div>

      <h2>A simple first-month buying plan</h2>
      <ol>
        <li>Buy one Trial Deck and play it unchanged several times.</li>
        <li>Identify the colors and card effects you actually enjoy.</li>
        <li>Build a legal upgrade list before spending more.</li>
        <li>Buy singles for essential cards; open packs only when the opening experience has value to you.</li>
      </ol>

      <h2>Buying FAQ</h2>
      <h3>Can one booster box make a complete deck?</h3>
      <p>It is not guaranteed. A legal deck needs an exact 50-card Main Deck and a separate 10-card Soul Deck within color and copy limits.</p>
      <h3>Do I need two Trial Decks?</h3>
      <p>One Trial Deck is enough for one player. Two are useful for two players or for additional copies, but buying a second copy is not automatically the best upgrade.</p>
      <h3>Are singles cheaper than a box?</h3>
      <p>For a small, exact upgrade list, singles are usually the more controlled purchase. A box provides a broader random collection and an opening experience instead.</p>
    </>
  ),

  "palworld-tcg-card-size-sleeves": (
    <>
      <h2>Palworld TCG card dimensions</h2>
      <div className="stat-table">
        <div><strong>63mm</strong><span>card width</span></div>
        <div><strong>88mm</strong><span>card height</span></div>
        <div><strong>60</strong><span>cards used per player</span></div>
        <div><strong>75</strong><span>official sleeve pack</span></div>
      </div>
      <p>Palworld TCG cards use the 63×88mm standard-size format. Bushiroad&apos;s official Palworld sleeves are approximately 67×92mm on the outside, which is the regular-size sleeve category sold by card shops.</p>

      <h2>Which sleeves fit Palworld TCG cards?</h2>
      <p>Choose sleeves clearly labelled for 63×88mm standard-size cards. Bushiroad&apos;s official Palworld sleeves are approximately 67×92mm on the outside and come in packs of 75.</p>
      <div className="comparison-table" role="region" aria-label="Palworld TCG sleeve choices" tabIndex={0}>
        <div className="comparison-head"><span>Protection</span><strong>What to buy</strong><strong>Best use</strong></div>
        <div><span>Single sleeve</span><p>Standard-size opaque deck sleeves</p><p>Normal play and shuffling</p></div>
        <div><span>Double sleeve</span><p>Perfect-fit inner sleeve plus compatible standard outer sleeve</p><p>Extra protection for valuable deck cards</p></div>
        <div><span>Collection storage</span><p>Soft sleeve plus standard binder pocket</p><p>Base cards and complete-set collecting</p></div>
        <div><span>Rigid protection</span><p>Soft sleeve inside a standard trading-card top loader</p><p>Shipping or storing valuable pulls</p></div>
      </div>

      <h2>How many sleeves do you need?</h2>
      <p>A player uses 50 Main Deck cards and 10 Soul cards. Buy at least 60 matching sleeves, but 65–75 is safer because a split or marked sleeve should be replaced immediately.</p>
      <ul>
        <li><strong>One player:</strong> one 75-count official sleeve pack is enough.</li>
        <li><strong>Two players:</strong> buy two packs so each deck has a consistent sleeve design.</li>
        <li><strong>Collection:</strong> count the cards you plan to protect and keep extra sleeves for new pulls.</li>
      </ul>

      <h2>Avoid Japanese-size or small-size sleeves</h2>
      <p>Some card games use narrower “Japanese size” sleeves. Despite Palworld&apos;s Japanese publisher, Palworld cards themselves are 63×88mm standard size. Small-size sleeves may not fit.</p>

      <h2>Should the Main Deck and Soul Deck use different sleeves?</h2>
      <p>The two decks remain physically separate during play, so different sleeve colors can make setup easier. For an official event, check the current tournament rules and judge guidance about sleeve condition and consistency before the round.</p>

      <h2>Which Palworld TCG playmat do you need?</h2>
      <p>Both official Trial Decks include a paper playmat that marks the game areas, so a new player does not need to buy a separate playmat before learning. A cloth or rubber playmat is an optional comfort and protection upgrade; it does not change deck legality or card effects.</p>
      <p>For an official tournament, follow the organizer&apos;s table-space and accessory instructions. Event-exclusive or champion playmats are collectible prizes, but owning one is not required to play in a normal event.</p>

      <h2>Official accessories coming in September and October</h2>
      <div className="comparison-table" role="region" aria-label="Official Palworld TCG accessory release dates and dimensions" tabIndex={0}>
        <div className="comparison-head"><span>Release</span><strong>Products</strong><strong>Official size</strong></div>
        <div><span>September 25</span><p>Shadowbeak and Petallia rubber playmats</p><p>33.8×59.5×0.2cm</p></div>
        <div><span>September 25</span><p>Shadowbeak and Petallia storage boxes</p><p>23×10.5×8cm</p></div>
        <div><span>October 16</span><p>Grizzbolt, Relaxaurus, Petallia and Shadowbeak sleeves</p><p>6.7×9.2cm outside</p></div>
      </div>
      <p>The measurements above come from the current official product listings. A release date does not guarantee that every local store will carry every design, so check the Bushiroad retailer list or ask your store before travelling.</p>

      <h2>Best simple setup for a beginner</h2>
      <ol>
        <li>Buy one pack of 75 opaque standard-size sleeves.</li>
        <li>Sleeve the 50-card Main Deck and 10 Soul cards.</li>
        <li>Keep the remaining 15 sleeves as identical replacements.</li>
        <li>Use a deck box that holds at least 60 sleeved standard cards plus counters.</li>
      </ol>

      <h2>Sleeve FAQ</h2>
      <h3>Are Palworld cards the same size as Pokémon cards?</h3>
      <p>Both use the common 63×88mm card format, so standard-size sleeves made for that format should fit.</p>
      <h3>Will official Palworld sleeves cover a full deck?</h3>
      <p>Yes. The official product contains 75 sleeves, while one player uses 60 cards across both decks.</p>
      <h3>Do I need top loaders for playing?</h3>
      <p>No. Top loaders are rigid storage and shipping protection. Use normal deck sleeves for cards you shuffle and play.</p>
    </>
  ),

  "are-palworld-tcg-trial-decks-worth-it": (
    <>
      <h2>What one Palworld Trial Deck includes</h2>
      <ul>
        <li>A fixed 50-card Main Deck.</li>
        <li>A separate 10-card Soul Deck.</li>
        <li>One TSR or TSP parallel-rarity card replacing a card in the Main Deck.</li>
        <li>One Dawn of Palpagos BP01 booster pack.</li>
        <li>A paper playmat and play guide.</li>
        <li>Life, Material and Ingredient counters.</li>
      </ul>
      <p>The official Japanese suggested retail price is ¥1,980 including tax. The English product page does not publish one universal worldwide MSRP, so compare trusted local stores rather than converting the Japanese price directly.</p>

      <h2>Why a Trial Deck is worth it for beginners</h2>
      <p>A booster box gives random cards, but a Trial Deck gives one complete legal starting deck. You can learn the turn structure, resource system and combat without first researching 50 individual purchases.</p>
      <div className="comparison-table" role="region" aria-label="Palworld Trial Deck value by buyer type" tabIndex={0}>
        <div className="comparison-head"><span>Buyer</span><strong>Worth it?</strong><strong>Reason</strong></div>
        <div><span>First-time TCG player</span><p>Yes</p><p>Everything needed for one player is in one box.</p></div>
        <div><span>Two new players</span><p>Yes, buy two</p><p>Each person needs a complete deck.</p></div>
        <div><span>Experienced deck builder</span><p>Maybe</p><p>Check whether the fixed cards support your intended list.</p></div>
        <div><span>Parallel collector</span><p>Maybe</p><p>One TSR or TSP replacement is included, but the exact result varies.</p></div>
        <div><span>Specific-card buyer</span><p>Usually not</p><p>Targeted singles give more control.</p></div>
      </div>

      <h2>TD01 vs TD02</h2>
      <p><strong>TD01 Red/Blue</strong> is the more direct starting point, using Materials, damage, Structures and card flow. <strong>TD02 Green/Purple</strong> rewards more setup with Ingredients, Taunt, Stealth and removal.</p>
      <p>Both are complete decks. The better value is the one you will actually play, not the one with the highest marketplace listing for a possible parallel.</p>
      <Link className="button primary" href="/blog/red-blue-vs-green-purple-trial-deck">Compare TD01 and TD02</Link>

      <h2>How the guaranteed parallel works</h2>
      <p>Each Trial Deck contains one TSR or TSP parallel-rarity card that replaces the normal version of a card in the fixed 50-card Main Deck. The deck still contains 50 Main Deck cards and remains playable.</p>
      <div className="callout"><strong>Do not confuse products:</strong> the guaranteed Trial Deck parallel is separate from the random seven cards in the included BP01 booster pack.</div>

      <h2>Should you buy one or two copies?</h2>
      <p>One copy is enough to learn and play. A second copy can provide more copies of included cards, another parallel and another booster, but it is not automatically the cheapest route to an optimized list.</p>
      <p>Play the first copy, create an upgrade list, then compare the missing singles with the cost of another sealed deck.</p>

      <h2>When a booster box or singles are better</h2>
      <ul>
        <li>Choose a booster box if opening BP01 and collecting many different cards is the main experience you want.</li>
        <li>Choose singles if you already have a deck and need exact quantities.</li>
        <li>Choose another Trial Deck if a second player needs a complete ready-to-play product.</li>
      </ul>

      <h2>Trial Deck FAQ</h2>
      <h3>Can two people play with one Trial Deck?</h3>
      <p>No. One Trial Deck supplies one complete player deck. Two players need one deck each.</p>
      <h3>Is the included deck random?</h3>
      <p>The main list is fixed, except that one normal card is replaced by a TSR or TSP parallel. The included BP01 booster pack is random.</p>
      <h3>Can Trial Deck cards be reprinted?</h3>
      <p>Yes. The official product page says cards in the product may be reprinted or featured in future products.</p>
    </>
  ),

  "palworld-tcg-english-vs-japanese-cards": (
    <>
      <h2>The biggest difference is tournament eligibility</h2>
      <p>The official launch policy says that tournaments held outside Japan, Mainland China, Taiwan, Hong Kong and South Korea accept only English-edition Main Decks. It separately states that Soul cards of different languages may be included in the Soul Deck.</p>
      <div className="comparison-table" role="region" aria-label="English and Japanese Palworld TCG card comparison" tabIndex={0}>
        <div className="comparison-head"><span>Question</span><strong>English cards</strong><strong>Japanese cards</strong></div>
        <div><span>English-region tournament Main Deck</span><p>Accepted under the launch policy</p><p>Not accepted unless current event rules say otherwise</p></div>
        <div><span>Soul Deck</span><p>Accepted</p><p>Different-language Soul cards are allowed by the launch policy</p></div>
        <div><span>Casual play</span><p>Easy for English readers</p><p>Use with your group&apos;s agreement and a reliable text reference</p></div>
        <div><span>Collecting</span><p>Best for English labels and text</p><p>Best if you prefer Japanese text or regional products</p></div>
      </div>

      <h2>Can English and Japanese cards be mixed?</h2>
      <p>For a sanctioned Main Deck outside the listed Asian territories, use English-edition cards. The explicit mixed-language exception applies to the separate Soul Deck. For casual games, players can agree on their own approach, but that does not replace tournament policy.</p>

      <h2>Do both versions use the same card size?</h2>
      <p>Both editions use the 63×88mm standard trading card format. Bushiroad&apos;s official sleeves are approximately 67×92mm on the outside, so choose standard-size sleeves rather than narrow small-size sleeves.</p>

      <h2>Which language should you buy?</h2>
      <div className="comparison-table" role="region" aria-label="Which Palworld TCG language to buy" tabIndex={0}>
        <div className="comparison-head"><span>Your goal</span><strong>Recommended language</strong><strong>Why</strong></div>
        <div><span>Play English-region events</span><p>English Main Deck</p><p>Matches the published tournament language policy.</p></div>
        <div><span>Learn rules in English</span><p>English</p><p>You can read the printed card without a translation reference.</p></div>
        <div><span>Collect Japanese releases</span><p>Japanese</p><p>Choose the regional presentation you personally prefer.</p></div>
        <div><span>Use decorative Soul cards</span><p>Either language</p><p>The launch policy allows mixed-language Soul cards.</p></div>
      </div>

      <h2>How to compare the same card across languages</h2>
      <ol>
        <li>Use the official English and Japanese card databases.</li>
        <li>Match the card name, set, artwork and printed card number carefully.</li>
        <li>Use the official regional text when checking an effect or correction.</li>
        <li>Ask the event judge before a tournament if a language or printing is unclear.</li>
      </ol>
      <div className="callout"><strong>Do not rely on memory:</strong> translated summaries are useful for casual reference, but the official card list and event policy should control a tournament decision.</div>

      <h2>Language FAQ</h2>
      <h3>Can I use Japanese Main Deck cards in a US tournament?</h3>
      <p>Under the published launch policy, tournaments outside the listed Asian territories require an English-edition Main Deck. Check the current event rules before attending.</p>
      <h3>Can my Soul Deck mix English and Japanese cards?</h3>
      <p>The official launch announcement says Soul cards of different languages may be included in the Soul Deck.</p>
      <h3>Are Japanese cards automatically more valuable?</h3>
      <p>No. Value depends on the exact card, rarity, condition, supply and verified sales. Language alone does not guarantee a premium.</p>
    </>
  ),
};

export const commercialGuideSources: Record<string, GuideSource[]> = {
  "palworld-card-game-products-where-to-buy": [
    { label: "Official Bushiroad retailer finder", href: "https://www.en.bushi-navi.com/storelist?default=true" },
    { label: "Official English BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official BP02 preorder and release information", href: "https://en.palworld-official-cardgame.com/products/bp02" },
    { label: "Official English-edition sales and tournament policy", href: "https://en.palworld-official-cardgame.com/news/post-bp01-td0102-preorder" },
    { label: "Official Japanese launch prices and product specifications", href: "https://palworld-official-cardgame.com/products/bp01" },
    { label: "Launch-week store and price reports — unverified community snapshot", href: "https://www.reddit.com/r/Palworld/comments/1vdkfjj/best_place_to_get_a_booster_box_of_the_new_tcg/" },
  ],
  "palworld-tcg-first-edition-vs-reprint": [
    { label: "Official English BP01 product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official English Trial Deck reprint notice", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "First Edition identification questions — unverified community discussion", href: "https://www.reddit.com/r/PalworldTCG/comments/1ve1xe6/how_can_we_tell_which_cards_are_1st_edition/" },
  ],
  "palworld-tcg-booster-box-vs-trial-deck-vs-singles": [
    { label: "Official BP01 booster product page", href: "https://en.palworld-official-cardgame.com/products/bp01" },
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official launch product specifications", href: "https://en.palworld-official-cardgame.com/news/post-bp01-td0102-preorder" },
  ],
  "palworld-tcg-card-size-sleeves": [
    { label: "Official Japanese sleeve specifications", href: "https://palworld-official-cardgame.com/products/supply_bp01" },
    { label: "Official Palworld accessory release list", href: "https://en.palworld-official-cardgame.com/products" },
    { label: "Official Grizzbolt sleeve dimensions", href: "https://en.palworld-official-cardgame.com/products/grizzbolt-rumbling-tank-sleeves" },
    { label: "Official Shadowbeak playmat dimensions", href: "https://en.palworld-official-cardgame.com/products/shadowbeak-seed-of-despair-rubber-playmat" },
    { label: "Official Petallia storage-box dimensions", href: "https://en.palworld-official-cardgame.com/products/petallia-sweet-blessings-storage-box" },
    { label: "Official Sleeve & Card Set Vol.1 contents", href: "https://en.palworld-official-cardgame.com/products/ss01" },
  ],
  "are-palworld-tcg-trial-decks-worth-it": [
    { label: "Official Red / Blue Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td01" },
    { label: "Official Green / Purple Trial Deck", href: "https://en.palworld-official-cardgame.com/products/td02" },
    { label: "Official Japanese Trial Deck price and parallel details", href: "https://palworld-official-cardgame.com/products/td01" },
  ],
  "palworld-tcg-english-vs-japanese-cards": [
    { label: "Official launch language and tournament policy", href: "https://en.palworld-official-cardgame.com/news/post-bp01-td0102-preorder" },
    { label: "Official English card list", href: "https://en.palworld-official-cardgame.com/cardlist" },
    { label: "Official Japanese card list", href: "https://palworld-official-cardgame.com/cardlist" },
    { label: "Official Japanese sleeve specifications", href: "https://palworld-official-cardgame.com/products/supply_bp01" },
  ],
};

export const commercialRelatedGuideSlugs: Record<string, string[]> = {
  "palworld-card-game-products-where-to-buy": [
    "palworld-tcg-booster-box-vs-trial-deck-vs-singles",
    "are-palworld-tcg-trial-decks-worth-it",
    "palworld-booster-box",
  ],
  "palworld-tcg-first-edition-vs-reprint": [
    "dawn-of-palpagos-chase-cards",
    "palworld-tcg-rarity-guide",
    "palworld-card-game-products-where-to-buy",
  ],
  "palworld-tcg-booster-box-vs-trial-deck-vs-singles": [
    "are-palworld-tcg-trial-decks-worth-it",
    "red-blue-vs-green-purple-trial-deck",
    "palworld-card-game-products-where-to-buy",
  ],
  "palworld-tcg-card-size-sleeves": [
    "are-palworld-tcg-trial-decks-worth-it",
    "dawn-of-palpagos-chase-cards",
    "palworld-tcg-english-vs-japanese-cards",
  ],
  "are-palworld-tcg-trial-decks-worth-it": [
    "red-blue-vs-green-purple-trial-deck",
    "palworld-tcg-booster-box-vs-trial-deck-vs-singles",
    "palworld-card-game-products-where-to-buy",
  ],
  "palworld-tcg-english-vs-japanese-cards": [
    "palworld-tcg-card-size-sleeves",
    "palworld-card-game-deck-building-rules",
    "palworld-card-game-products-where-to-buy",
  ],
};
