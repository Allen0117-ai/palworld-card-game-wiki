"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ShareCardPayload } from "@/lib/share-card";
import { trackUserAction } from "@/lib/user-action-analytics";

type SharePanelProps = {
  payload: ShareCardPayload;
  shareText: string;
  shareUrl: string;
  triggerLabel: string;
  assetKey: string;
  className?: string;
  disabled?: boolean;
};

function absoluteShareUrl(shareUrl: string) {
  return new URL(shareUrl, window.location.origin).toString();
}

export function SharePanel({
  payload,
  shareText,
  shareUrl,
  triggerLabel,
  assetKey,
  className = "",
  disabled = false,
}: SharePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [shareFile, setShareFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [status, setStatus] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const generatedAssetKeyRef = useRef("");
  const dialogTitleId = `share-title-${assetKey.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80)}`;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  async function openSharePanel() {
    setIsOpen(true);
    trackUserAction("share_open", { kind: payload.kind, title: payload.title.slice(0, 80) });
    if (shareFile && generatedAssetKeyRef.current === assetKey) return;
    if (isCreating) return;

    setIsCreating(true);
    setStatus("Creating your share card…");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      setShareFile(null);
    }
    try {
      const { createShareImageFile } = await import("@/lib/share-card");
      const createdFile = await createShareImageFile(payload);
      setShareFile(createdFile);
      setPreviewUrl(URL.createObjectURL(createdFile));
      generatedAssetKeyRef.current = assetKey;
      setStatus("Your share card is ready.");
    } catch {
      setStatus("The poster could not be created. You can still share the direct link.");
    } finally {
      setIsCreating(false);
    }
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(absoluteShareUrl(shareUrl));
      setStatus("Link copied — send it to your playgroup.");
      trackUserAction("share_copy_link", { kind: payload.kind });
    } catch {
      setStatus("The link could not be copied. Please copy it from your browser.");
    }
  }

  async function shareNow() {
    if (!navigator.share) {
      await copyShareLink();
      return;
    }

    const resolvedUrl = absoluteShareUrl(shareUrl);
    const canShareImage = Boolean(
      shareFile
      && navigator.canShare
      && navigator.canShare({ files: [shareFile] }),
    );

    try {
      await navigator.share(canShareImage && shareFile ? {
        title: payload.title,
        text: `${shareText}\n${resolvedUrl}`,
        files: [shareFile],
      } : {
        title: payload.title,
        text: shareText,
        url: resolvedUrl,
      });
      setStatus("Shared — nice choice.");
      trackUserAction("share_complete", { kind: payload.kind });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("Share cancelled.");
        return;
      }
      setStatus("The share menu could not open. Copy the link instead.");
    }
  }

  return (
    <>
      <button
        className={`share-trigger ${className}`.trim()}
        type="button"
        onClick={openSharePanel}
        disabled={disabled}
      >
        <span aria-hidden="true">◆</span>
        {triggerLabel}
      </button>

      {isOpen ? createPortal((
        <div
          className="share-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section className="share-dialog" role="dialog" aria-modal="true" aria-labelledby={dialogTitleId}>
            <button
              ref={closeButtonRef}
              className="share-dialog-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close share preview"
            >
              ×
            </button>

            <div className={`share-preview${previewUrl ? " is-ready" : ""}`}>
              {previewUrl ? (
                <div
                  className="share-preview-image"
                  style={{ backgroundImage: `url("${previewUrl}")` }}
                  role="img"
                  aria-label={`Share card preview for ${payload.title}`}
                />
              ) : (
                <div className="share-preview-loading">
                  <span aria-hidden="true">◆</span>
                  <strong>{isCreating ? "Creating your card…" : "Preview unavailable"}</strong>
                </div>
              )}
            </div>

            <div className="share-dialog-copy">
              <div className="share-signal" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="eyebrow"><span>Palpagos transmission</span> · Online</p>
              <h2 id={dialogTitleId}>Your find is ready to travel.</h2>
              <p>A high-resolution collector poster, made to catch attention and bring friends straight back to the useful part.</p>

              <div className="share-delivery" aria-label="Included in this share">
                <span><b>01</b><strong>Poster</strong><small>1080 × 1350</small></span>
                <span><b>02</b><strong>Direct link</strong><small>Easy to open</small></span>
                <span><b>03</b><strong>Mobile ready</strong><small>Made for feeds</small></span>
              </div>

              <div className="share-dialog-actions">
                <button className="button primary" type="button" onClick={shareNow} disabled={isCreating}>
                  Share the poster <span>↗</span>
                </button>
                <button className="button ghost" type="button" onClick={copyShareLink}>
                  Copy link
                </button>
                {previewUrl ? (
                  <a className="button ghost" href={previewUrl} download={shareFile?.name || "palworld-share-card.png"}>
                    Save poster
                  </a>
                ) : null}
              </div>
              <p className="share-status" aria-live="polite">{status}</p>
            </div>
          </section>
        </div>
      ), document.body) : null}
    </>
  );
}
