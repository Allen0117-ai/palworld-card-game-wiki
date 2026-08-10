import Image from "next/image";

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

type CommunityVideoCardProps = {
  videoId: string;
  title: string;
  channelName: string;
  description: string;
};

export function CommunityVideoCard({
  videoId,
  title,
  channelName,
  description,
}: CommunityVideoCardProps) {
  if (!YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <figure className="community-video-card" data-video-id={videoId}>
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} by ${channelName} on YouTube`}
      >
        <span className="community-video-thumbnail">
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={`${title} video thumbnail`}
            fill
            sizes="(max-width: 840px) calc(100vw - 40px), 798px"
          />
          <span className="community-video-badge">Community video</span>
          <span className="community-video-play" aria-hidden="true">▶</span>
        </span>
        <span className="community-video-copy">
          <small>By {channelName}</small>
          <strong>{title}</strong>
          <span>{description}</span>
          <b>Watch on YouTube ↗</b>
        </span>
      </a>
      <figcaption>Independent creator video · Not official rules · Checked August 10, 2026</figcaption>
    </figure>
  );
}
