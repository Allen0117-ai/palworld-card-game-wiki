"use client";

import { useState } from "react";

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

type VideoEmbedProps = {
  videoId: string;
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl?: string;
  note?: string;
};

export function VideoEmbed({
  videoId,
  title,
  description,
  sourceLabel,
  sourceUrl,
  note,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }

  const youtubeUrl = sourceUrl || `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <figure className="official-video" data-video-id={videoId}>
      <div>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            className="video-load-button"
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play ${title} on this page`}
          >
            <span className="video-play-icon" aria-hidden="true">▶</span>
            <strong>{title}</strong>
            <span>{description}</span>
            <small>Play video · YouTube loads after your click</small>
          </button>
        )}
      </div>
      <figcaption>
        {sourceLabel} · <a href={youtubeUrl} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
        {note ? <span> · {note}</span> : null}
      </figcaption>
    </figure>
  );
}
