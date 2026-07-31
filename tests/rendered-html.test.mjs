import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

const launchCards = JSON.parse(
  await readFile(new URL("../lib/official-cards.generated.json", import.meta.url), "utf8"),
);

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );
}

const publicRoutes = [
  "/",
  "/cards",
  "/cards/pals",
  "/decks",
  "/tools/deck-builder",
  "/tools/dawn-of-palpagos-checklist",
  "/blog",
  "/blog/palworld-booster-box",
  "/resources",
  "/rules",
  "/search",
  "/about",
  "/privacy",
  ...launchCards.map((card) => `/card/${card.slug}`),
  "/deck/red-blue-launch-pressure",
  "/deck/green-blue-base-value",
  "/deck/mono-red-pal-rush",
  "/blog/how-to-play-palworld-card-game",
  "/blog/palworld-card-game-deck-building-rules",
  "/blog/red-blue-vs-green-purple-trial-deck",
  "/blog/palworld-card-game-products-where-to-buy",
  "/blog/dawn-of-palpagos-card-list-guide",
  "/blog/palworld-card-game-keyword-glossary",
  "/blog/palworld-tcg-rarity-guide",
  "/blog/dawn-of-palpagos-chase-cards",
  "/blog/dawn-of-palpagos-pull-rates",
  "/blog/palworld-card-game-2026-roadmap",
  "/blog/palworld-card-game-errata-tracker",
  "/blog/palworld-card-game-color-guide",
];

test("every published page renders successfully", async () => {
  for (const route of publicRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} returned ${response.status}`);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      `${route} did not return HTML`,
    );
  }
});

test("every published page has a self-referencing canonical and matching social metadata", async () => {
  for (const route of publicRoutes) {
    const response = await render(route);
    const html = await response.text();
    const expectedCanonical = `https://palworldcardgame.wiki${route}`;
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    const openGraphTitle = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
    const openGraphDescription = html.match(/<meta property="og:description" content="([^"]*)"/)?.[1];

    assert.equal(canonical, expectedCanonical, `${route} has the wrong canonical URL`);
    assert.equal(openGraphTitle, title, `${route} Open Graph title does not match its title`);
    assert.equal(openGraphDescription, description, `${route} Open Graph description does not match its description`);
  }
});

test("homepage heading and detail-page breadcrumbs describe the page clearly", async () => {
  const homeHtml = await (await render("/")).text();
  assert.match(homeHtml, /<h1><span class="hero-title-keyword">Palworld Card Game Wiki<\/span>/);

  for (const route of [
    "/card/chillet-dragon-whisperer-ebp01-025",
    "/deck/red-blue-launch-pressure",
    "/blog/how-to-play-palworld-card-game",
  ]) {
    const html = await (await render(route)).text();
    assert.match(html, /"@type":"BreadcrumbList"/, `${route} is missing BreadcrumbList data`);
  }
});

test("the booster box guide exposes verified product facts and structured data", async () => {
  const response = await render("/blog/palworld-booster-box");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Palworld Booster Box Guide/);
  assert.match(html, /12 packs/);
  assert.match(html, /84 cards total/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"FAQPage"/);
});

test("deck guides explain play sequences with card images and useful next steps", async () => {
  for (const route of [
    "/deck/red-blue-launch-pressure",
    "/deck/green-blue-base-value",
    "/deck/mono-red-pal-rush",
  ]) {
    const html = await (await render(route)).text();
    assert.match(html, /Play this deck in three steps/, `${route} is missing its beginner sequence`);
    assert.match(html, /Three combinations to remember/, `${route} is missing visual card pairings`);
    assert.match(html, /Do not stop at one page/, `${route} is missing retention links`);
    assert.match(html, /<img\b/, `${route} does not render card images`);
  }
});

test("deck discovery links homepage, deck pools and card pages in both directions", async () => {
  const homeHtml = await (await render("/")).text();
  assert.match(homeHtml, /class="deck-tile-art"/);
  assert.match(homeHtml, /3-step plan/);
  assert.match(homeHtml, /Complete 50-card list/);

  const deckHtml = await (await render("/deck/red-blue-launch-pressure")).text();
  assert.match(deckHtml, /<nav class="breadcrumbs" aria-label="Breadcrumb">/);
  assert.ok(
    deckHtml.includes('href="/card/ribbuny-little-princess-etd01-024"')
      || deckHtml.includes('\\"href\\":\\"/card/ribbuny-little-princess-etd01-024\\"'),
    "the Trial Deck pool does not link its final card",
  );
  assert.match(deckHtml, /property="og:image" content="https:\/\/palworldcardgame\.wiki\/og\/decks\/red-blue-launch-pressure\.png"/);
  assert.match(deckHtml, /"dateModified":"2026-07-31"/);

  const cardHtml = await (await render("/card/ribbuny-little-princess-etd01-024")).text();
  assert.match(cardHtml, /<nav class="breadcrumbs" aria-label="Breadcrumb">/);
  assert.match(cardHtml, /href="\/deck\/red-blue-launch-pressure"/);
});

test("the BP01 starter provides a complete 50-card list that opens in the builder", async () => {
  const deckHtml = await (await render("/deck/mono-red-pal-rush")).text();
  assert.match(deckHtml, /Complete beginner deck list/);
  assert.match(deckHtml, /50(?:<!-- -->)? cards/);
  assert.match(deckHtml, /Open this list in deck builder/);

  const builderHtml = await (await render("/tools/deck-builder?deck=mono-red-pal-rush")).text();
  assert.match(builderHtml, /Loaded template/);
  assert.match(builderHtml, /Red \/ Blue BP01 Structure Starter/);
  assert.match(builderHtml, /50(?:<!-- -->)? \/ (?:<!-- -->)?50 cards/);
});

test("shareable cards, rulings, guides and deck links render their share actions", async () => {
  const cardHtml = await (await render("/card/suzaku-hellfire-wings")).text();
  const rulesHtml = await (await render("/rules?q=Can%20I%20attack%20on%20the%20first%20turn%3F")).text();
  const guideHtml = await (await render("/blog/how-to-play-palworld-card-game")).text();
  const sharedDeckHtml = await (await render("/tools/deck-builder?list=EBP01-001x2,EBP01-002x2&name=Palpagos%20Pressure")).text();

  assert.match(cardHtml, /Share this card/);
  assert.match(rulesHtml, /Share this ruling/);
  assert.match(guideHtml, /Share this quick answer/);
  assert.match(sharedDeckHtml, /A friend shared this deck with you/);
  assert.match(sharedDeckHtml, /Palpagos Pressure/);
  assert.match(sharedDeckHtml, /Share draft/);
});

test("the Pal collection page stays scoped to TCG Pal cards", async () => {
  const response = await render("/cards/pals");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Palworld Pals in the/);
  assert.match(html, /91(?:<!-- -->)? launch entries/);
  assert.match(html, /91(?:<!-- -->)? \/ (?:<!-- -->)?91/);
  assert.match(html, /Card-game scope/);
  assert.doesNotMatch(html, /<option value="Gear">/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("site search finds the Pal card collection", async () => {
  const response = await render("/search?q=palworld%20pals");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /href="\/cards\/pals"/);
  assert.match(html, /Palworld Pals in the Official Card Game/);
});

test("site search finds the BP01 collection checklist", async () => {
  const response = await render("/search?q=bp01%20checklist");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /href="\/tools\/dawn-of-palpagos-checklist"/);
  assert.match(html, /Dawn of Palpagos Card Checklist/);
});

test("the July 31 update includes newly verified official events and social sources", async () => {
  const homeHtml = await (await render("/")).text();
  const roadmapHtml = await (await render("/blog/palworld-card-game-2026-roadmap")).text();
  const resourcesHtml = await (await render("/resources")).text();
  const relatedGuidesHtml = roadmapHtml.match(/<section class="related-guides">.*?<\/section>/s)?.[0] ?? "";

  assert.match(roadmapHtml, /3\.5 million pack sales/);
  assert.match(roadmapHtml, /Singapore festival release events/);
  assert.match(roadmapHtml, /September 5: Los Angeles Release Party/);
  assert.match(homeHtml, /href="\/blog\/palworld-card-game-2026-roadmap"[^>]*><span>Official news/);
  assert.match(homeHtml, /href="\/blog\/palworld-card-game-products-where-to-buy"[^>]*><span>Buyer watch/);
  assert.match(homeHtml, /href="\/blog\/red-blue-vs-green-purple-trial-deck"[^>]*><span>Trial Deck FAQ/);
  assert.match(relatedGuidesHtml, /palworld-card-game-products-where-to-buy/);
  assert.match(relatedGuidesHtml, /palworld-card-game-errata-tracker/);
  assert.match(relatedGuidesHtml, /palworld-booster-box/);
  assert.match(resourcesHtml, /Official X/);
  assert.match(resourcesHtml, /Official tutorial video/);
});

test("every internal link points to a published page", async () => {
  const knownRoutes = new Set(publicRoutes);

  for (const route of publicRoutes) {
    const response = await render(route);
    const html = await response.text();
    const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)]
      .map((match) => match[1])
      .filter((href) => href.startsWith("/") && !href.startsWith("//"));

    for (const href of links) {
      assert.ok(knownRoutes.has(href), `${route} links to unpublished route ${href}`);
    }
  }
});

test("every published page is reachable from the homepage within three internal-link steps", async () => {
  const knownRoutes = new Set(publicRoutes);
  const linkGraph = new Map();

  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)]
      .map((match) => match[1])
      .filter((href) => knownRoutes.has(href));
    linkGraph.set(route, new Set(links));
  }

  const routeDepth = new Map([["/", 0]]);
  const routeQueue = ["/"];
  while (routeQueue.length) {
    const currentRoute = routeQueue.shift();
    const currentDepth = routeDepth.get(currentRoute);
    for (const linkedRoute of linkGraph.get(currentRoute) || []) {
      if (routeDepth.has(linkedRoute)) continue;
      routeDepth.set(linkedRoute, currentDepth + 1);
      routeQueue.push(linkedRoute);
    }
  }

  for (const route of publicRoutes) {
    assert.ok(routeDepth.has(route), `${route} is an orphan page`);
    assert.ok(routeDepth.get(route) <= 3, `${route} needs ${routeDepth.get(route)} clicks from the homepage`);
  }
});

test("the sitemap uses stable content dates without ignored priority hints", async () => {
  const response = await render("/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(xml, /<loc>https:\/\/palworldcardgame\.wiki\/tools\/dawn-of-palpagos-checklist<\/loc>/);
  assert.match(xml, /<lastmod>2026-07-31T00:00:00\.000Z<\/lastmod>/);
  assert.match(xml, /<lastmod>2026-07-30T00:00:00\.000Z<\/lastmod>/);
  assert.doesNotMatch(xml, /<priority>/);
  assert.doesNotMatch(xml, /<changefreq>/);
});

test("every external page link is live", async () => {
  const response = await render("/");
  const html = await response.text();
  const links = [...new Set(
    [...html.matchAll(/<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["']/gi)].map((match) => match[1]),
  )];

  for (const href of links) {
    const externalResponse = await fetch(href, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
      headers: { "user-agent": "PalworldCardGameWiki-LinkCheck/1.0" },
    });
    assert.ok(externalResponse.status < 400, `${href} returned ${externalResponse.status}`);
  }
});

test("unknown pages use the branded not-found experience", async () => {
  const response = await render("/this-page-does-not-exist");
  assert.equal(response.status, 404);
  assert.match(await response.text(), /This trail ends here\./);
});

test("browser icon assets are present", async () => {
  await Promise.all([
    access(new URL("../app/favicon.ico", import.meta.url)),
    access(new URL("../app/icon.png", import.meta.url)),
  ]);
});

test("the complete launch card image catalog is present", async () => {
  const expectedCards = [
    "EBP01-001",
    "EBP01-100",
    "ETD01-001",
    "ETD01-024",
    "ETD02-001",
    "ETD02-024",
  ];
  await Promise.all(expectedCards.map((number) => (
    access(new URL(`../public/cards/catalog/${number}.png`, import.meta.url))
  )));
});

test("the optimized launch artwork assets are present", async () => {
  await Promise.all([
    access(new URL("../public/media-kit/palworld-card-game-dawn-of-palpagos-booster-pack.webp", import.meta.url)),
    access(new URL("../public/media-kit/palworld-card-game-dawn-of-palpagos-launch-artwork.webp", import.meta.url)),
    access(new URL("../public/media-kit/palworld-card-game-official-card-back.webp", import.meta.url)),
    ..."002SP 025SSP 026SP 049SSP 050SP 051SP 073SSP 075SP".split(" ").map((number) => (
      access(new URL(`../public/cards/showcase/EBP01-${number}.webp`, import.meta.url))
    )),
  ]);
});

test("parallel artwork pages keep the official card text and clearer labels", async () => {
  const response = await render("/card/suzaku-hellfire-wings?variant=EBP01-002SP");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /EBP01-002SP parallel artwork/);
  assert.match(html, /Official card details/);
  assert.match(html, /ability-badge ability-badge-cont/);
  assert.match(html, /ability-damage/);
});

test("the image optimizer accepts WebP assets whose storage metadata is generic", async () => {
  const webp = await readFile(new URL("../public/hero-palpagos-map.webp", import.meta.url));
  const response = await worker.fetch(
    new Request("http://localhost/_vinext/image?url=%2Fhero-palpagos-map.webp&w=640&q=75", {
      headers: { accept: "image/webp" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response(webp, {
          headers: { "content-type": "application/octet-stream" },
        }),
      },
    },
    context,
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/webp");
});

test("natural-language questions return the correct direct answer first", async () => {
  const questionMatrix = [
    ["how big is my deck", "How many cards are in a Palworld Card Game deck?"],
    ["is this game for 2 players", "How many players can play?"],
    ["how do you win", "How do you win or lose the game?"],
    ["starting health", "How much life does each player start with?"],
    ["opening hand size", "How many cards are in the opening hand?"],
    ["can i redraw my starting cards", "How does a mulligan or redraw work?"],
    ["does going second get a soul", "Does the second player start with an extra Soul?"],
    ["does first player draw", "Does the first player draw on the first turn?"],
    ["can a new pal attack right away", "Can I attack on the first turn or with a Pal deployed this turn?"],
    ["what am i allowed to attack", "What can a Pal attack?"],
    ["how do i block", "How does blocking work?"],
    ["do structures hit back", "Does a Structure deal damage back when attacked?"],
    ["what is a damage check", "How does player damage and a damage check work?"],
    ["what does lucky do", "What does the Lucky icon do during damage?"],
    ["can my deck have 3 colors", "How many colors can a deck use?"],
    ["maximum copies of one card", "How many copies of the same card can I use?"],
    ["what does quick mean", "What does Quick mean?"],
    ["how does interrupt stop an attack", "What does Interrupt do?"],
    ["explain taunt", "How does Taunt work?"],
    ["what does stealth mean", "What does Stealth mean?"],
    ["what is assault", "What does Assault mean?"],
    ["can i spend souls to draw", "Can I rest three Souls to draw a card?"],
    ["what do i buy to start", "What should a new player buy first?"],
    ["where can i shop for cards", "Where can I buy Palworld Card Game products?"],
    ["is one booster enough to play", "Can I start playing with only a booster pack?"],
    ["best meta deck", "What is the best deck or launch-day tier list?"],
    ["what are the booster pull odds", "What are the Dawn of Palpagos pull rates?"],
    ["when is the release tournament", "When are the Grand Release Tournaments?"],
    ["what set releases next", "What Palworld Card Game products come after launch?"],
    ["is there a td01 misprint", "Is there any confirmed Palworld Card Game errata?"],
  ];

  const mismatches = [];
  for (const [query, expectedQuestion] of questionMatrix) {
    const response = await render(`/search?q=${encodeURIComponent(query)}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const bestMatch = html.match(/<article class="direct-answer"[\s\S]*?<h3>(.*?)<\/h3>/)?.[1];
    if (bestMatch !== expectedQuestion) mismatches.push({ query, expectedQuestion, bestMatch });
  }
  assert.deepEqual(mismatches, []);
});

test("rules center exposes official answers and clear sourcing", async () => {
  const response = await render("/rules");
  const html = await response.text();
  assert.match(html, /97(?:<!-- -->)? official launch-day Q&amp;As/);
  assert.match(html, /Comprehensive Rules/);
  assert.match(html, /Ask a rules question in your own words/);
  assert.match(html, /If a Lucky icon appears, the check stops and that life loss is cancelled\./);
});
