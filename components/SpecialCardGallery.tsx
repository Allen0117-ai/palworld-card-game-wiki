"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { SpecialArtwork } from "@/lib/data";

export function SpecialCardGallery({ artwork }: { artwork: SpecialArtwork[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCardRef = useRef<HTMLAnchorElement>(null);
  const active = artwork[activeIndex];
  const previous = artwork[(activeIndex - 1 + artwork.length) % artwork.length];
  const next = artwork[(activeIndex + 1) % artwork.length];

  if (!active) return null;

  function selectPrevious() {
    setActiveIndex((index) => (index - 1 + artwork.length) % artwork.length);
  }

  function selectNext() {
    setActiveIndex((index) => (index + 1) % artwork.length);
  }

  function tiltActiveCard(event: ReactPointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "touch") return;

    const cardBounds = event.currentTarget.getBoundingClientRect();
    const horizontalPosition = (event.clientX - cardBounds.left) / cardBounds.width - 0.5;
    const verticalPosition = (event.clientY - cardBounds.top) / cardBounds.height - 0.5;
    const cardStyle = event.currentTarget.style;

    cardStyle.setProperty("--gallery-tilt-x", `${(-verticalPosition * 7).toFixed(2)}deg`);
    cardStyle.setProperty("--gallery-tilt-y", `${(horizontalPosition * 7).toFixed(2)}deg`);
    cardStyle.setProperty("--gallery-pointer-x", `${((horizontalPosition + 0.5) * 100).toFixed(1)}%`);
    cardStyle.setProperty("--gallery-pointer-y", `${((verticalPosition + 0.5) * 100).toFixed(1)}%`);
  }

  function resetActiveCardTilt() {
    const cardStyle = activeCardRef.current?.style;
    if (!cardStyle) return;

    cardStyle.setProperty("--gallery-tilt-x", "0deg");
    cardStyle.setProperty("--gallery-tilt-y", "0deg");
    cardStyle.setProperty("--gallery-pointer-x", "50%");
    cardStyle.setProperty("--gallery-pointer-y", "50%");
  }

  return (
    <div className="special-gallery">
      <div className={`special-gallery-stage color-${active.card.color}`}>
        <div className="special-gallery-card special-gallery-card-previous" aria-hidden="true">
          <Image src={previous.image} alt="" width={1117} height={1560} sizes="240px" />
        </div>
        <span className="special-gallery-aura" aria-hidden="true" />
        <Link
          ref={activeCardRef}
          key={active.variantNumber}
          className="special-gallery-card special-gallery-card-active"
          href={`/card/${active.card.slug}?variant=${active.variantNumber}`}
          onPointerMove={tiltActiveCard}
          onPointerLeave={resetActiveCardTilt}
        >
          <Image
            src={active.image}
            alt={`${active.card.name} — ${active.card.subtitle}, ${active.variantNumber} special artwork`}
            width={1117}
            height={1560}
            sizes="(max-width: 760px) 72vw, 470px"
            priority
          />
          <span className="special-gallery-glare" aria-hidden="true" />
        </Link>
        <div className="special-gallery-card special-gallery-card-next" aria-hidden="true">
          <Image src={next.image} alt="" width={1117} height={1560} sizes="240px" />
        </div>

        <button className="special-gallery-arrow special-gallery-arrow-previous" type="button" onClick={selectPrevious} aria-label="Show previous special card">
          <span aria-hidden="true">←</span>
        </button>
        <button className="special-gallery-arrow special-gallery-arrow-next" type="button" onClick={selectNext} aria-label="Show next special card">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="special-gallery-details" aria-live="polite">
        <div>
          <span>{active.rarity} parallel · {active.variantNumber}</span>
          <strong>{active.card.name} — {active.card.subtitle}</strong>
          <small>Special artwork; card text matches {active.card.number}.</small>
        </div>
        <Link className="text-link" href={`/card/${active.card.slug}?variant=${active.variantNumber}`}>
          Explore this card →
        </Link>
      </div>

      <div className="special-gallery-pagination" aria-label="Choose a special card">
        {artwork.map((item, index) => (
          <button
            className={index === activeIndex ? "is-active" : ""}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${item.card.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
            key={item.variantNumber}
          />
        ))}
      </div>
    </div>
  );
}
