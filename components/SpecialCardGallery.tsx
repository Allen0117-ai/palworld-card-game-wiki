"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import type { SpecialArtwork } from "@/lib/data";
import { SharePanel } from "@/components/SharePanel";

const galleryImageSizes = "(max-width: 520px) 68vw, (max-width: 760px) 63vw, (max-width: 1050px) 300px, 330px";

function getCircularOffset(cardIndex: number, activeIndex: number, cardCount: number) {
  let offset = cardIndex - activeIndex;
  if (offset > cardCount / 2) offset -= cardCount;
  if (offset < -cardCount / 2) offset += cardCount;
  return offset;
}

function getPositionClass(offset: number) {
  if (offset === 0) return "special-gallery-card-active";
  if (offset === -1) return "special-gallery-card-previous";
  if (offset === 1) return "special-gallery-card-next";
  return offset < 0 ? "special-gallery-card-far-previous" : "special-gallery-card-far-next";
}

export function SpecialCardGallery({ artwork }: { artwork: SpecialArtwork[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCardRef = useRef<HTMLAnchorElement>(null);
  const active = artwork[activeIndex];

  if (!active) return null;

  function selectCard(nextIndex: number) {
    if (nextIndex === activeIndex) return;
    resetActiveCardTilt();
    setActiveIndex(nextIndex);
  }

  function selectPrevious() {
    selectCard((activeIndex - 1 + artwork.length) % artwork.length);
  }

  function selectNext() {
    selectCard((activeIndex + 1) % artwork.length);
  }

  function selectSideCard(event: ReactMouseEvent<HTMLAnchorElement>, cardIndex: number) {
    if (cardIndex === activeIndex) return;
    event.preventDefault();
    selectCard(cardIndex);
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
        <span className="special-gallery-aura" aria-hidden="true" />
        {artwork.map((item, cardIndex) => {
          const positionOffset = getCircularOffset(cardIndex, activeIndex, artwork.length);
          const isActive = positionOffset === 0;

          return (
            <Link
              ref={isActive ? activeCardRef : null}
              className={`special-gallery-card ${getPositionClass(positionOffset)}`}
              href={`/card/${item.card.slug}?variant=${item.variantNumber}`}
              onClick={(event) => selectSideCard(event, cardIndex)}
              onPointerMove={isActive ? tiltActiveCard : undefined}
              onPointerLeave={isActive ? resetActiveCardTilt : undefined}
              aria-label={isActive ? `Explore ${item.card.name}` : `Show ${item.card.name}`}
              aria-current={isActive ? "true" : undefined}
              aria-hidden={isActive ? undefined : true}
              tabIndex={isActive ? 0 : -1}
              data-analytics-event={isActive ? "gallery_card_click" : undefined}
              data-analytics-label={isActive ? item.variantNumber : undefined}
              key={item.variantNumber}
            >
              <span className="special-gallery-card-face">
                <Image
                  src={item.image}
                  alt={isActive ? `${item.card.name} — ${item.card.subtitle}, ${item.variantNumber} special artwork` : ""}
                  width={1117}
                  height={1560}
                  sizes={galleryImageSizes}
                  loading="lazy"
                />
                {isActive ? <span className="special-gallery-glare" aria-hidden="true" /> : null}
              </span>
            </Link>
          );
        })}

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
        <div className="special-gallery-actions">
          <SharePanel
            assetKey={`gallery-${active.variantNumber}`}
            triggerLabel="Share this artwork"
            shareUrl={`/card/${active.card.slug}?variant=${active.variantNumber}`}
            shareText={`${active.card.name} — ${active.card.subtitle}, ${active.variantNumber} ${active.rarity} parallel artwork. Which treatment would you collect?`}
            className="share-trigger-inline"
            payload={{
              kind: "card",
              eyebrow: `${active.variantNumber} · ${active.rarity} parallel`,
              title: `${active.card.name} — ${active.card.subtitle}`,
              body: `Special artwork treatment. Card text matches the ${active.card.number} base card.`,
              image: active.image,
              accent: active.card.color,
              facts: [
                `${active.card.color} ${active.card.type}`,
                `Cost ${active.card.cost}`,
                active.card.power ? `${active.card.power} power` : "",
                active.card.strike ? `Strike ${active.card.strike}` : "",
              ].filter(Boolean),
            }}
          />
          <Link
            className="text-link"
            href={`/card/${active.card.slug}?variant=${active.variantNumber}`}
            data-analytics-event="gallery_card_click"
            data-analytics-label={`${active.variantNumber}:details-link`}
          >
            Explore this card →
          </Link>
        </div>
      </div>

      <div className="special-gallery-pagination" aria-label="Choose a special card">
        {artwork.map((item, index) => (
          <button
            className={index === activeIndex ? "is-active" : ""}
            type="button"
            onClick={() => selectCard(index)}
            aria-label={`Show ${item.card.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
            key={item.variantNumber}
          />
        ))}
      </div>
    </div>
  );
}
