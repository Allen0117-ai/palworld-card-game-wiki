export const ADSENSE_CLIENT_ID = "ca-pub-3736712756888915";

export const ADSENSE_SCRIPT_SRC =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

const ADSENSE_CONTENT_PREFIXES = [
  "/blog",
  "/card",
  "/cards",
  "/deck",
  "/decks",
  "/events",
  "/resources",
  "/rules",
  "/sets",
  "/updates",
  "/ja/card",
  "/ja/cards",
  "/ja/deck",
  "/ja/decks",
  "/ja/guide",
  "/ja/guides",
  "/ja/rules",
] as const;

export function isAdSenseContentPath(pathname: string) {
  if (pathname === "/" || pathname === "/ja") return true;

  return ADSENSE_CONTENT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
