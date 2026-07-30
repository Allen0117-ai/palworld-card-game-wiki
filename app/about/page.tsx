import Link from "next/link";

export default function AboutPage() {
  return (
    <article className="simple-page simple-page-enhanced shell">
      <header className="simple-page-intro">
        <p className="eyebrow"><span>About</span> · Independent fan resource</p>
        <h1>Built for players.</h1>
        <p>Palworld Card Game Wiki is an unofficial, non-commercial database, learning guide and deck-building companion. We turn scattered official information into clear, useful answers.</p>
      </header>
      <section className="info-card-grid" aria-label="What guides this site">
        <div><span>01</span><h2>Official facts first</h2><p>Rules, card data, errata and product pages decide factual claims.</p></div>
        <div><span>02</span><h2>Plain-English help</h2><p>We organize scattered information around the questions players actually ask.</p></div>
        <div><span>03</span><h2>Clear source labels</h2><p>Community ideas stay clearly separated from confirmed rules and results.</p></div>
      </section>
      <section className="simple-page-panel">
        <p className="eyebrow"><span>Verification</span> · How we work</p>
        <h2>Useful answers, checked carefully.</h2>
        <p>Community discussion helps us discover questions and early deck ideas, but we do not present those ideas as confirmed rules or tournament results. Every launch guide shows its source status and update date.</p>
        <Link className="button ghost" href="/resources">Open our source hub</Link>
      </section>
      <section className="simple-page-note">
        <h2>Independent and unofficial</h2>
        <p>Official card and promotional images are displayed for identification, education and product promotion under the official media and fan-content guidance. ©Bushiroad ©PALWORLD.</p>
        <p>Palworld and all related names, characters and artwork belong to their respective owners. This site is not affiliated with, endorsed by or sponsored by Pocketpair, Inc. or Bushiroad.</p>
        <a className="text-link" href="mailto:paweyan163@gmail.com">Corrections or takedown request</a>
      </section>
    </article>
  );
}
