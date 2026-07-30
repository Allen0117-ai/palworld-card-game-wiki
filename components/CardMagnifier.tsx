"use client";

import Image from "next/image";
import { useRef } from "react";

type CardMagnifierProps = {
  alt: string;
  isFoil?: boolean;
  src: string;
};

export function CardMagnifier({ alt, isFoil = false, src }: CardMagnifierProps) {
  const lensRef = useRef<HTMLSpanElement>(null);

  function moveLens(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.classList.add("is-magnifying");
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
    const lens = lensRef.current;
    if (!lens) return;

    lens.style.left = `${x}%`;
    lens.style.top = `${y}%`;
    lens.style.backgroundPosition = `${x}% ${y}%`;
  }

  return (
    <div
      className={`card-magnifier${isFoil ? " is-foil" : ""}`}
      data-tilt
      onPointerMove={moveLens}
      onPointerLeave={(event) => event.currentTarget.classList.remove("is-magnifying")}
    >
      <Image src={src} alt={alt} width={400} height={559} priority />
      {isFoil && <span className="detail-foil" aria-hidden="true" />}
      <span
        ref={lensRef}
        className="magnifier-lens"
        style={{ backgroundImage: `url("${src}")` }}
        aria-hidden="true"
      />
      <span className="magnifier-hint" aria-hidden="true">Move to inspect</span>
    </div>
  );
}
