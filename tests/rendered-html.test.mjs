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
  "/decks",
  "/tools/deck-builder",
  "/blog",
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
