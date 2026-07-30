import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page shell">
      <p className="eyebrow"><span>Lost in Palpagos</span> · Page not found</p>
      <h1>This trail ends here.</h1>
      <p>The page may have moved, but your field guide is still close by.</p>
      <div className="hero-actions">
        <Link className="button primary" href="/">Return home</Link>
        <Link className="button ghost" href="/cards">Browse cards</Link>
      </div>
    </main>
  );
}
