"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdPrivacyChoicesButton } from "./AdPrivacyChoicesButton";
import { PrivacyChoicesButton } from "./AnalyticsConsent";
import { MobileNav } from "./MobileNav";

function isJapanesePath(pathname: string) {
  return pathname === "/ja" || pathname.startsWith("/ja/");
}

export function LocalizedSkipLink() {
  const pathname = usePathname();
  return <a className="skip-link" href="#main-content">{isJapanesePath(pathname) ? "本文へ移動" : "Skip to main content"}</a>;
}

export function LocalizedSiteHeader() {
  const pathname = usePathname();
  const japanese = isJapanesePath(pathname);

  if (japanese) {
    return (
      <header className="site-header ja-chrome">
        <div className="shell nav-wrap">
          <Link className="brand" href="/ja">
            <span className="brand-mark" aria-hidden="true">◆</span>
            <span className="brand-copy">Palpagos Archive<small>パルワールドカードゲーム攻略</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="メインナビゲーション">
            <Link href="/ja/rules">ルール</Link>
            <Link href="/ja/cards">カード</Link>
            <Link href="/ja/decks">デッキ</Link>
            <Link href="/ja/guides">攻略</Link>
            <Link href="/ja/search">検索</Link>
          </nav>
          <Link className="language-switch" href="/">English</Link>
          <Link className="nav-cta" href="/ja/tools/deck-builder">デッキを作る <span>◆</span></Link>
          <MobileNav locale="ja" />
        </div>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">◆</span>
          <span className="brand-copy">Palpagos Archive<small>Palworld Card Game Wiki</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/rules">Rules</Link>
          <Link href="/cards">Cards</Link>
          <Link href="/sets">Sets</Link>
          <Link href="/decks">Decks</Link>
          <Link href="/blog">Guides</Link>
          <Link href="/updates">Updates</Link>
        </nav>
        <Link className="language-switch" href="/ja">日本語</Link>
        <Link className="nav-cta" href="/tools/deck-builder">Build a deck <span>◆</span></Link>
        <MobileNav />
      </div>
    </header>
  );
}

export function LocalizedSiteFooter() {
  const pathname = usePathname();
  const japanese = isJapanesePath(pathname);

  if (japanese) {
    return (
      <footer className="site-footer ja-chrome">
        <div className="shell footer-grid">
          <div>
            <Link className="brand footer-brand" href="/ja">
              <span className="brand-mark" aria-hidden="true">◆</span>
              <span className="brand-copy">Palpagos Archive<small>パルワールドカードゲーム攻略</small></span>
            </Link>
            <p>カードリスト、デッキレシピ、ルールを日本のプレイヤー向けに整理した非公式ファンサイトです。</p>
          </div>
          <div>
            <strong>攻略メニュー</strong>
            <Link href="/ja/cards">カードリスト</Link>
            <Link href="/ja/decks">デッキレシピ</Link>
            <Link href="/ja/tools/deck-builder">デッキビルダー</Link>
            <Link href="/ja/rules">ルール・遊び方</Link>
            <Link href="/ja/guides">攻略ガイド</Link>
            <Link href="/ja/search">サイト内検索</Link>
          </div>
          <div>
            <strong>サイト情報</strong>
            <Link href="/">English</Link>
            <PrivacyChoicesButton locale="ja" />
            <AdPrivacyChoicesButton locale="ja" />
            <Link href="/privacy">プライバシー</Link>
            <a href="https://palworld-official-cardgame.com/" target="_blank" rel="noreferrer">公式サイト</a>
            <a href="mailto:paweyan163@gmail.com">お問い合わせ</a>
          </div>
        </div>
        <div className="shell legal">
          <span>© 2026 Palworld Card Game Wiki · ©Bushiroad ©PALWORLD</span>
          <span>非公式ファンサイトです。Pocketpairおよびブシロードとは関係ありません。</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">◆</span>
            <span className="brand-copy">Palpagos Archive<small>Palworld Card Game Wiki</small></span>
          </Link>
          <p>An unofficial, independent card database and strategy companion built by fans, for players. Browse sourced rules, all 148 launch cards, beginner guides, collection tools and a free deck builder.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/cards">Card database</Link>
          <Link href="/sets">Set list</Link>
          <Link href="/events">Events &amp; tournaments</Link>
          <Link href="/updates">Verified updates</Link>
          <Link href="/decks">Trial Deck guides</Link>
          <Link href="/tools/deck-builder">Deck builder</Link>
          <Link href="/tools/dawn-of-palpagos-checklist">BP01 checklist</Link>
          <Link href="/rules">Rules &amp; FAQ</Link>
          <Link href="/blog">Guides</Link>
          <Link href="/resources">Source hub</Link>
        </div>
        <div>
          <strong>Official &amp; site</strong>
          <a href="https://en.palworld-official-cardgame.com/" target="_blank" rel="noreferrer">Official game site ↗</a>
          <a href="https://www.youtube.com/watch?v=UdbMWxWcMcw" target="_blank" rel="noreferrer">Official tutorial ↗</a>
          <a href="https://www.youtube.com/@PalworldOCG_EN" target="_blank" rel="noreferrer">Official YouTube ↗</a>
          <Link href="/about">About & disclaimer</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <PrivacyChoicesButton />
          <AdPrivacyChoicesButton />
          <a href="mailto:paweyan163@gmail.com">Contact</a>
        </div>
      </div>
      <div className="shell legal">
        <span>© 2026 Palworld Card Game Wiki · ©Bushiroad ©PALWORLD</span>
        <span>Unofficial fan site. Not affiliated with or endorsed by Pocketpair or Bushiroad.</span>
      </div>
    </footer>
  );
}
