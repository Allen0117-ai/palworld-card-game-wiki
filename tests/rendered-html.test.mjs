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
  "/cards/promos",
  "/events",
  "/updates",
  "/sets",
  "/sets/legends-awaken-bp02",
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
  "/terms",
  "/ai-policy",
  "/ja",
  "/ja/cards",
  "/ja/decks",
  "/ja/rules",
  "/ja/search",
  "/ja/guides",
  "/ja/tools/deck-builder",
  "/ja/guide/how-to-play",
  "/ja/guide/deck-building-rules",
  "/ja/guide/trial-deck-comparison",
  "/ja/guide/bp01-booster-box",
  "/ja/guide/card-list-guide",
  "/ja/guide/keyword-glossary",
  ...launchCards.map((card) => `/card/${card.slug}`),
  ...launchCards.map((card) => `/ja/card/${card.slug}`),
  "/deck/red-blue-launch-pressure",
  "/deck/green-blue-base-value",
  "/deck/mono-red-pal-rush",
  "/ja/deck/red-blue-launch-pressure",
  "/ja/deck/green-blue-base-value",
  "/ja/deck/mono-red-pal-rush",
  "/blog/how-to-play-palworld-card-game",
  "/blog/palworld-card-game-deck-building-rules",
  "/blog/red-blue-vs-green-purple-trial-deck",
  "/blog/palworld-card-game-products-where-to-buy",
  "/blog/dawn-of-palpagos-card-list-guide",
  "/blog/palworld-card-game-keyword-glossary",
  "/blog/palworld-tcg-rarity-guide",
  "/blog/dawn-of-palpagos-chase-cards",
  "/blog/dawn-of-palpagos-pull-rates",
  "/blog/palworld-online-vs-card-game",
  "/blog/palworld-1-0-vs-card-game",
  "/blog/palworld-card-game-2026-roadmap",
  "/blog/palworld-card-game-errata-tracker",
  "/blog/palworld-card-game-color-guide",
  "/blog/palworld-tcg-first-edition-vs-reprint",
  "/blog/palworld-tcg-booster-box-vs-trial-deck-vs-singles",
  "/blog/palworld-tcg-card-size-sleeves",
  "/blog/are-palworld-tcg-trial-decks-worth-it",
  "/blog/palworld-tcg-english-vs-japanese-cards",
  "/blog/palworld-tcg-deck-tier-list",
  "/blog/palworld-tcg-best-cards-by-color",
  "/blog/palworld-tcg-trial-deck-upgrade-guide",
  "/blog/palworld-tcg-tournament-decklists",
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

test("published copy stays player-facing", async () => {
  const internalPhrases = /indexable search tool|same canonical URL|source-backed home|living reveal tracker|living guide status|kept on one URL|permanent set index|do not stop at one page|help shape the next update|no paid links yet|events guide vs 2026 roadmap|同じ正規URL|継続更新ページ/i;

  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, internalPhrases, `${route} exposes internal publishing language`);
  }
});

test("server-rendered documents declare the correct language", async () => {
  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    const expectedLanguage = route === "/ja" || route.startsWith("/ja/") ? "ja" : "en";
    assert.match(html, new RegExp(`<html lang="${expectedLanguage}"`), `${route} has the wrong html lang`);
  }
});

test("analytics consent preserves opt-in regions and explicit visitor choices", async () => {
  const defaultsSource = await readFile(
    new URL("../lib/analytics-consent-defaults.ts", import.meta.url),
    "utf8",
  );
  const consentSource = await readFile(
    new URL("../components/AnalyticsConsent.tsx", import.meta.url),
    "utf8",
  );
  const privacyHtml = await (await render("/privacy")).text();

  assert.match(defaultsSource, /analytics_storage: 'granted'/);
  assert.match(defaultsSource, /region: \$\{JSON\.stringify\(ANALYTICS_OPT_IN_REGIONS\)\}/);
  assert.match(defaultsSource, /"CH"/);
  assert.match(defaultsSource, /"GB"/);
  assert.match(defaultsSource, /ad_storage: 'denied'/);
  assert.match(defaultsSource, /savedAnalyticsConsent === 'accepted'/);
  assert.match(consentSource, /consent === "loading" \|\| consent === null/);
  assert.match(consentSource, /consent !== "declined" && choice === "declined"/);
  assert.match(privacyHtml, /Region-aware privacy/);
  assert.match(privacyHtml, /Vercel Web Analytics counts anonymous visits without cookies/);
});

test("English page titles stay concise", async () => {
  for (const route of publicRoutes.filter((item) => item !== "/ja" && !item.startsWith("/ja/"))) {
    const html = await (await render(route)).text();
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#x27;", "'") ?? "";
    assert.ok(title.length <= 65, `${route} title is ${title.length} characters: ${title}`);
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
  const homeDescription = homeHtml.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  assert.ok(homeDescription.length >= 140 && homeDescription.length <= 160, `homepage description is ${homeDescription.length} characters`);
  assert.match(homeHtml, /id="about-palworld-card-game"/);
  assert.match(homeHtml, /id="home-final-cta-title"/);
  assert.match(homeHtml, /https:\/\/en\.palworld-official-cardgame\.com\/for-beginners/);
  assert.match(homeHtml, /https:\/\/www\.youtube\.com\/watch\?v=UdbMWxWcMcw/);

  for (const route of [
    "/card/chillet-dragon-whisperer-ebp01-025",
    "/deck/red-blue-launch-pressure",
    "/blog/how-to-play-palworld-card-game",
  ]) {
    const html = await (await render(route)).text();
    assert.match(html, /"@type":"BreadcrumbList"/, `${route} is missing BreadcrumbList data`);
  }
});

test("editorial responsibility and publisher identity are visible and structured", async () => {
  const aboutHtml = await (await render("/about")).text();
  const guideHtml = await (await render("/blog/how-to-play-palworld-card-game")).text();

  assert.match(aboutHtml, /id="editorial-team"/);
  assert.match(aboutHtml, /No unsupported claims/);
  assert.match(guideHtml, /Palpagos Archive Editorial Team/);
  assert.match(guideHtml, /"author":\{"@type":"Organization","name":"Palpagos Archive Editorial Team"/);
  assert.match(guideHtml, /"publisher":\{"@type":"Organization","name":"Palworld Card Game Wiki"/);
  assert.match(guideHtml, /"publishingPrinciples":"https:\/\/palworldcardgame\.wiki\/about#editorial-policy"/);
});

test("all rendered JSON-LD blocks are valid JSON", async () => {
  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length > 0, `${route} has no JSON-LD`);
    for (const [, json] of blocks) assert.doesNotThrow(() => JSON.parse(json), `${route} has invalid JSON-LD`);
  }
});

test("AI discovery policy separates search access from model training", async () => {
  const robots = await (await render("/robots.txt")).text();
  const policyHtml = await (await render("/ai-policy")).text();
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");

  assert.match(robots, /User-Agent: OAI-SearchBot[\s\S]*Allow: \//i);
  assert.match(robots, /User-Agent: GPTBot[\s\S]*Disallow: \//i);
  assert.match(llms, /## Priority answers/);
  assert.match(llms, /https:\/\/palworldcardgame\.wiki\/rules/);
  assert.match(policyHtml, /search discovery and model training are separate uses/i);
  assert.match(policyHtml, /No RSL or other machine-readable reuse licence/i);
});

test("security response headers are present", async () => {
  const response = await render("/");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
  assert.match(response.headers.get("content-security-policy-report-only") ?? "", /frame-ancestors 'self'/);
});

test("priority guides expose complete cited answer blocks", async () => {
  for (const route of [
    "/blog/how-to-play-palworld-card-game",
    "/blog/palworld-card-game-deck-building-rules",
    "/blog/red-blue-vs-green-purple-trial-deck",
    "/blog/palworld-card-game-products-where-to-buy",
    "/blog/dawn-of-palpagos-pull-rates",
    "/blog/palworld-tcg-deck-tier-list",
    "/blog/palworld-tcg-best-cards-by-color",
    "/blog/palworld-tcg-trial-deck-upgrade-guide",
    "/blog/palworld-tcg-tournament-decklists",
  ]) {
    const html = await (await render(route)).text();
    const answer = html.match(/<div class="quick-answer">[\s\S]*?<p>(.*?)<\/p>/)?.[1]
      .replace(/<[^>]+>/g, " ")
      .trim() ?? "";
    const wordCount = answer.split(/\s+/).filter(Boolean).length;
    assert.ok(wordCount >= 55, `${route} quick answer has only ${wordCount} words`);
    assert.match(html, /class="quick-answer-source"[^>]*>Primary source:/, `${route} has no adjacent primary source`);
  }
});

test("search landing pages explain their unique indexable value", async () => {
  const englishHtml = await (await render("/search")).text();
  const japaneseHtml = await (await render("/ja/search")).text();
  assert.match(englishHtml, /What can you search on Palpagos Archive\?/);
  assert.match(englishHtml, /Use a card name, card number, rules question/);
  assert.match(japaneseHtml, /このサイトでは何を検索できますか/);
});

test("Japanese pages use native copy, Japanese card data and reciprocal hreflang", async () => {
  const homeHtml = await (await render("/ja")).text();
  const cardsHtml = await (await render("/ja/cards")).text();
  const cardHtml = await (await render("/ja/card/jormuntide-ignis-savage-lava-dragon")).text();
  const englishCardHtml = await (await render("/card/jormuntide-ignis-savage-lava-dragon")).text();

  assert.match(homeHtml, /パルワールドカードゲーム攻略/);
  assert.match(cardsHtml, /カードリスト/);
  assert.match(cardHtml, /荒ぶる溶岩竜/);
  assert.match(cardHtml, /BP01-001/);
  assert.match(cardHtml, /hrefLang="en" href="https:\/\/palworldcardgame\.wiki\/card\/jormuntide-ignis-savage-lava-dragon"/);
  assert.match(cardHtml, /hrefLang="ja" href="https:\/\/palworldcardgame\.wiki\/ja\/card\/jormuntide-ignis-savage-lava-dragon"/);
  assert.match(englishCardHtml, /hrefLang="ja" href="https:\/\/palworldcardgame\.wiki\/ja\/card\/jormuntide-ignis-savage-lava-dragon"/);
});

test("Japanese edition has full search, official Q&A, guides and deck building", async () => {
  const homeHtml = await (await render("/ja")).text();
  const rulesHtml = await (await render("/ja/rules?q=BP01-100")).text();
  const searchHtml = await (await render("/ja/search?q=パルパゴス")).text();
  const builderHtml = await (await render("/ja/tools/deck-builder?deck=mono-red-pal-rush")).text();
  const deckHtml = await (await render("/ja/deck/mono-red-pal-rush")).text();

  assert.match(homeHtml, /日本語カード148枚/);
  assert.match(homeHtml, /デッキビルダー/);
  assert.match(homeHtml, /日本語攻略ガイド/);
  assert.match(rulesHtml, /公式(?:日本語)?Q(?:&amp;|\\u0026)A/);
  assert.match(rulesHtml, /冒険の始まり/);
  assert.match(searchHtml, /攻略ガイド/);
  assert.match(builderHtml, /50(?:<!-- -->)? \/ (?:<!-- -->)?50枚/);
  assert.match(deckHtml, /一緒に使うカードを画像で確認/);
  assert.match(deckHtml, /この50枚をデッキビルダーで開く/);
});

test("Japanese homepage prioritizes current official information and native product visuals", async () => {
  const homeHtml = await (await render("/ja")).text();
  const guidesHtml = await (await render("/ja/guides")).text();

  assert.match(homeHtml, /公式最新情報/);
  assert.match(homeHtml, /秋葉原で期間限定ストア開催/);
  assert.match(homeHtml, /BP02「目覚めし伝説」10月30日発売/);
  assert.match(homeHtml, /class="product-pack ja-product-pack"/);
  assert.match(homeHtml, /公式日本語カード/);
  assert.doesNotMatch(homeHtml, /日本語版で追加したもの/);
  assert.doesNotMatch(homeHtml, /設計しています/);
  assert.doesNotMatch(guidesHtml, /英語版の文章を置き換えた/);
  assert.doesNotMatch(homeHtml, /palworld-card-game-dawn-of-palpagos-booster-pack\.webp/);
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

test("new deck guides render their key title, official source and update-center entry", async () => {
  const guides = [
    ["/blog/palworld-tcg-deck-tier-list", /Palworld TCG Deck Tier List/],
    ["/blog/palworld-tcg-best-cards-by-color", /Best Palworld TCG Cards by Color/],
    ["/blog/palworld-tcg-trial-deck-upgrade-guide", /Palworld TCG Trial Deck Upgrade Guide/],
    ["/blog/palworld-tcg-tournament-decklists", /Palworld TCG Tournament Decklists/],
  ];

  for (const [route, title] of guides) {
    const html = await (await render(route)).text();
    assert.match(html, title, `${route} is missing its key title`);
    assert.match(html, /class="quick-answer-source"[^>]*>Primary source:/, `${route} has no official source`);
  }

  const updatesHtml = await (await render("/updates")).text();
  assert.match(updatesHtml, /href="\/blog\/palworld-tcg-deck-tier-list"/);
  assert.match(updatesHtml, /href="\/blog\/palworld-tcg-best-cards-by-color"/);
  assert.match(updatesHtml, /href="\/blog\/palworld-tcg-trial-deck-upgrade-guide"/);
  assert.match(updatesHtml, /href="\/blog\/palworld-tcg-tournament-decklists"/);
});

test("gameplay guides use real visual instruction and exact labeled upgrade tests", async () => {
  const howToHtml = await (await render("/blog/how-to-play-palworld-card-game")).text();
  const upgradeHtml = await (await render("/blog/palworld-tcg-trial-deck-upgrade-guide")).text();
  const tierHtml = await (await render("/blog/palworld-tcg-deck-tier-list")).text();

  assert.match(howToHtml, /youtube\.com\/embed\/UdbMWxWcMcw/);
  assert.match(howToHtml, /Practice one real TD01 engine turn/);
  assert.match(howToHtml, /\/cards\/catalog\/ETD01-008\.png/);
  assert.match(howToHtml, /Materials are counters created by card effects/);

  assert.match(upgradeHtml, /Exact first test: four cards out, four cards in/);
  assert.match(upgradeHtml, /Jolthog Cryst/);
  assert.match(upgradeHtml, /Antique Wooden Chair/);
  assert.match(upgradeHtml, /Refined Metal Spear/);
  assert.match(upgradeHtml, /Community-reconstructed TD01 quantity list/);
  assert.match(upgradeHtml, /Compare it with the cards in your box/);

  assert.match(tierHtml, /488 public decks/);
  assert.match(tierHtml, /does not reveal paper-tournament finishes/);
});

test("franchise update guides answer card-player questions without internal publishing language", async () => {
  const onlineHtml = await (await render("/blog/palworld-online-vs-card-game")).text();
  const versionHtml = await (await render("/blog/palworld-1-0-vs-card-game")).text();

  assert.match(onlineHtml, /Palworld Online is not the card game/);
  assert.match(onlineHtml, /Garena under Pocketpair license/);
  assert.match(onlineHtml, /exact launch date has not been announced/);
  assert.match(versionHtml, /72(?:<!-- -->)?<\/strong><span>Pal records added in 1\.0/);
  assert.match(versionHtml, /0(?:<!-- -->)?<\/strong><span>exact matches/);
  assert.match(versionHtml, /href="\/cards\/pals"/);

  for (const html of [onlineHtml, versionHtml]) {
    const guideBody = html.match(/<div id="guide-content" class="guide-body">(.*?)<section class="source-panel">/s)?.[1] ?? "";
    assert.doesNotMatch(guideBody, /SEO|search intent|target keyword|content strategy|AI-generated|rank in Google/i);
  }
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
    assert.match(html, /What would you like to learn next\?/, `${route} is missing related learning links`);
    assert.match(html, /<img\b/, `${route} does not render card images`);
  }
});

test("deck discovery links homepage, deck pools and card pages in both directions", async () => {
  const homeHtml = await (await render("/")).text();
  const decksHtml = await (await render("/decks")).text();
  assert.match(homeHtml, /02 · Build &amp; compete/);
  assert.match(homeHtml, /href="\/decks"/);
  assert.doesNotMatch(homeHtml, /Launch deck center/);
  assert.match(decksHtml, /Choose by goal/);
  assert.match(decksHtml, /Start with the direct plan/);
  assert.match(decksHtml, /Practice setup and timing/);
  assert.match(decksHtml, /Load a complete 50-card deck/);
  assert.match(decksHtml, /Review the provisional tier list/);

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
  assert.match(deckHtml, /Complete 50-card deck list/);
  assert.match(deckHtml, /50(?:<!-- -->)? cards/);
  assert.match(deckHtml, /Open this list in deck builder/);

  const builderHtml = await (await render("/tools/deck-builder?deck=mono-red-pal-rush")).text();
  assert.match(builderHtml, /Starting deck loaded/);
  assert.match(builderHtml, /Red \/ Blue BP01 Structure Starter/);
  assert.match(builderHtml, /50(?:<!-- -->)? \/ (?:<!-- -->)?50 cards/);
});

test("wiki indexes and living guides expose the new navigation and utility features", async () => {
  const homeHtml = await (await render("/")).text();
  const filteredCardsHtml = await (await render("/cards?set=EBP01")).text();
  const guideHtml = await (await render("/blog/palworld-card-game-2026-roadmap")).text();
  const deckHtml = await (await render("/deck/mono-red-pal-rush")).text();

  assert.match(homeHtml, /Open the tool or answer you need/);
  assert.match(homeHtml, /href="\/cards"/);
  assert.match(homeHtml, /href="\/rules"/);
  assert.match(homeHtml, /href="\/updates"/);
  assert.match(filteredCardsHtml, /100(?:<!-- -->)? \/ (?:<!-- -->)?148/);
  assert.match(guideHtml, /Latest page information/);
  assert.match(guideHtml, /Update history/);
  assert.match(deckHtml, /Copy deck list/);
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

test("homepage resumes saved work and keeps the deck builder easy to reach", async () => {
  const homeHtml = await (await render("/")).text();

  assert.match(homeHtml, /Start something worth saving/);
  assert.match(homeHtml, /href="\/tools\/deck-builder"/);
  assert.match(homeHtml, /Open deck builder/);
});

test("the BP01 checklist can generate a collection progress share card", async () => {
  const checklistHtml = await (await render("/tools/dawn-of-palpagos-checklist")).text();

  assert.match(checklistHtml, /Share collection progress/);
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

test("the set index separates booster sets from related products", async () => {
  const response = await render("/sets");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Palworld TCG(?:<br\/>)?sets list/);
  assert.match(html, /Dawn of Palpagos/);
  assert.match(html, /Legends Awaken/);
  assert.match(html, /Trial Deck products, not additional booster sets/);
  assert.match(html, /href="\/cards\?set=EBP01"/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList","numberOfItems":2/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("the BP02 tracker exposes confirmed facts without inventing a card list", async () => {
  const response = await render("/sets/legends-awaken-bp02");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Legends Awaken/);
  assert.match(html, /October 30, 2026/);
  assert.match(html, /100 normal card types/);
  assert.match(html, /exact parallel count/);
  assert.match(html, /Bushiroad has not published a complete official English BP02 card list/);
  assert.match(html, /Palpagos Archive Editorial Team/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("the promo index lists official PR series and separates prototype cards", async () => {
  const response = await render("/cards/promos");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /PR Card Pack Vol\.1 checklist/);
  assert.match(html, /EPR-002/);
  assert.match(html, /ESOUL-008/);
  assert.match(html, /EPR-009S/);
  assert.match(html, /Foiled Chillet Soul Promo Card/);
  assert.match(html, /prototype demo cards[^.]*not legal in tournaments/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList","numberOfItems":17/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("the events guide explains Bushi Navi registration and tournament preparation", async () => {
  const response = await render("/events");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Palworld TCG(?:<br\/>)?tournaments/);
  assert.match(html, /Register with Bushi Navi in five steps/);
  assert.match(html, /Standard format, Swiss rounds and best-of-one games/);
  assert.match(html, /Tournament-ready checklist/);
  assert.match(html, /September–October 2026 demo sessions/);
  assert.match(html, /Daedream paper deck case/);
  assert.match(html, /demo-session-september-october-2026/);
  assert.match(html, /href="\/cards\/promos"/);
  assert.match(html, /href="\/blog\/palworld-card-game-2026-roadmap"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("existing high-value pages cover the selected long-tail keywords", async () => {
  const rulesHtml = await (await render("/rules")).text();
  const decksHtml = await (await render("/decks")).text();
  const buyingHtml = await (await render("/blog/palworld-card-game-products-where-to-buy")).text();
  const roadmapHtml = await (await render("/blog/palworld-card-game-2026-roadmap")).text();
  const sleevesHtml = await (await render("/blog/palworld-tcg-card-size-sleeves")).text();

  assert.match(rulesHtml, /Rulebook PDF &amp; Official Q&amp;A/);
  assert.match(rulesHtml, /Open official rules PDF/);
  assert.match(decksHtml, /Starter Deck Lists &amp; Trial Deck Guides/);
  assert.match(decksHtml, /starter deck guide/);
  assert.match(buyingHtml, /Should you buy Palworld TCG on TCGplayer\?/);
  assert.match(buyingHtml, /preorder list/);
  assert.match(roadmapHtml, /2026 Release Schedule, Sets &amp; Events/);
  assert.match(roadmapHtml, /href="\/sets"/);
  assert.match(roadmapHtml, /href="\/events"/);
  assert.match(sleevesHtml, /Which Palworld TCG playmat do you need\?/);
  assert.match(sleevesHtml, /Official accessories coming in September and October/);
  assert.match(sleevesHtml, /33\.8×59\.5×0\.2cm/);
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

test("the August 6 update includes newly verified events and accessories", async () => {
  const homeHtml = await (await render("/")).text();
  const updatesHtml = await (await render("/updates")).text();
  const roadmapHtml = await (await render("/blog/palworld-card-game-2026-roadmap")).text();
  const resourcesHtml = await (await render("/resources")).text();
  const relatedGuidesHtml = roadmapHtml.match(/<section class="related-guides">.*?<\/section>/s)?.[0] ?? "";

  assert.match(roadmapHtml, /3\.5 million pack sales/);
  assert.match(roadmapHtml, /Singapore festival release events/);
  assert.match(roadmapHtml, /September 5: Los Angeles Release Party/);
  assert.match(roadmapHtml, /September–October: new store demo sessions/);
  assert.match(roadmapHtml, /September 25: playmats and storage boxes/);
  assert.match(roadmapHtml, /October 16: four official sleeve designs/);
  assert.match(homeHtml, /href="\/blog\/palworld-tcg-card-size-sleeves"[^>]*><span>Official products/);
  assert.match(homeHtml, /href="\/events"[^>]*><span>Official demos/);
  assert.match(homeHtml, /href="\/cards"[^>]*><span>Official database/);
  assert.match(homeHtml, /href="\/updates"[^>]*>View the complete update log/);
  assert.match(homeHtml, /03 · Collect &amp; track/);
  assert.match(updatesHtml, /Affected pages/);
  assert.match(updatesHtml, /Source: (?:<!-- -->)?Official events hub/);
  assert.match(updatesHtml, /Source: (?:<!-- -->)?Official card list/);
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

test("retention improvements keep primary actions easy to reach", async () => {
  const homeHtml = await (await render("/")).text();
  const cardsHtml = await (await render("/cards")).text();
  const japaneseCardsHtml = await (await render("/ja/cards")).text();
  const builderHtml = await (await render("/tools/deck-builder?deck=mono-red-pal-rush")).text();
  const rulesHtml = await (await render("/rules")).text();
  const boosterHtml = await (await render("/blog/palworld-booster-box")).text();
  const cardHtml = await (await render("/card/suzaku-hellfire-wings")).text();

  assert.match(homeHtml, /href="\/card\/chillet-dragon-whisperer-ebp01-025"/);
  assert.match(homeHtml, /href="\/card\/suzaku-hellfire-wings"/);
  assert.match(homeHtml, /href="\/card\/helzephyr-wings-of-the-moonless-night-ebp01-073"/);
  assert.match(homeHtml, /data-analytics-event="home_stat_click"/);
  assert.match(homeHtml, /Tap a card to open its details/);
  assert.ok(cardsHtml.indexOf('id="card-search"') < cardsHtml.indexOf("Found a card?"));
  assert.ok(cardsHtml.indexOf("cards-quick-builder") < cardsHtml.indexOf('id="card-results"'));
  assert.ok(cardsHtml.indexOf('id="card-results"') < cardsHtml.indexOf("More card views"));
  assert.ok(cardsHtml.indexOf('id="rarity-filter"') < cardsHtml.indexOf('id="set-filter"'));
  assert.ok(cardsHtml.indexOf('id="lucky-filter"') < cardsHtml.indexOf('id="set-filter"'));
  assert.match(cardsHtml, /id="lucky-filter"/);
  assert.ok(japaneseCardsHtml.indexOf('id="ja-rarity-filter"') < japaneseCardsHtml.indexOf('id="ja-set-filter"'));
  assert.ok(japaneseCardsHtml.indexOf('id="ja-lucky-filter"') < japaneseCardsHtml.indexOf('id="ja-set-filter"'));
  assert.match(builderHtml, /class="mobile-deck-bar"/);
  assert.match(builderHtml, /class="deck-cost-curve"/);
  assert.match(builderHtml, /Test opening hand/);
  assert.match(rulesHtml, /Popular questions/);
  assert.match(boosterHtml, /Browse BP01 cards/);
  assert.match(cardHtml, /href="\/tools\/deck-builder\?card=suzaku-hellfire-wings"/);
});

test("analytics records the second-page funnel and consented return visits", async () => {
  const journeySource = await readFile(
    new URL("../components/AnalyticsJourney.tsx", import.meta.url),
    "utf8",
  );
  const consentSource = await readFile(
    new URL("../components/AnalyticsConsent.tsx", import.meta.url),
    "utf8",
  );

  assert.match(journeySource, /journey_start/);
  assert.match(journeySource, /journey_second_page/);
  assert.match(journeySource, /retention_eligible/);
  assert.match(journeySource, /return_visit/);
  assert.match(journeySource, /ANALYTICS_CONSENT_STORAGE_KEY\) !== "accepted"/);
  assert.match(consentSource, /analytics_consent_accept/);
  assert.doesNotMatch(consentSource, /window\.location\.reload/);
});

test("the sitemap uses stable content dates without ignored priority hints", async () => {
  const response = await render("/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(xml, /<loc>https:\/\/palworldcardgame\.wiki\/tools\/dawn-of-palpagos-checklist<\/loc>/);
  assert.match(xml, /<loc>https:\/\/palworldcardgame\.wiki\/ja<\/loc>/);
  assert.match(xml, /hreflang="ja" href="https:\/\/palworldcardgame\.wiki\/ja\/cards"/);
  assert.match(xml, /<lastmod>2026-07-31T00:00:00\.000Z<\/lastmod>/);
  assert.match(xml, /<lastmod>2026-07-30T00:00:00\.000Z<\/lastmod>/);
  assert.doesNotMatch(xml, /<priority>/);
  assert.doesNotMatch(xml, /<changefreq>/);

  const sitemapRoutes = [...xml.matchAll(/<loc>(https:\/\/palworldcardgame\.wiki[^<]*)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname);
  assert.deepEqual(new Set(sitemapRoutes), new Set(publicRoutes), "sitemap and published-route inventory differ");
});

test("every external page link is live", async () => {
  const response = await render("/");
  const html = await response.text();
  const links = [...new Set(
    [...html.matchAll(/<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["']/gi)].map((match) => match[1]),
  )];

  for (const href of links) {
    const hostname = new URL(href).hostname;
    if (hostname.endsWith("palworld-official-cardgame.com")) continue;

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

test("the complete official Japanese card image catalog is present", async () => {
  const japaneseCards = JSON.parse(
    await readFile(new URL("../lib/official-cards-ja.generated.json", import.meta.url), "utf8"),
  );
  assert.equal(japaneseCards.length, 148);
  assert.ok(japaneseCards.every((card) => card.image.startsWith("/cards/ja-official/")));
  await Promise.all(japaneseCards.map((card) => (
    access(new URL(`../public${card.image}`, import.meta.url))
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
  assert.match(html, /href="\/rules#attack-first-turn">Stable answer link/);
});
