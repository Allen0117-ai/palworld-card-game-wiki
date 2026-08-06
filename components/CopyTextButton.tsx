"use client";

import { useState } from "react";

type CopyTextButtonProps = {
  text: string;
  label: string;
  copiedLabel: string;
  errorLabel: string;
};

export function CopyTextButton({ text, label, copiedLabel, errorLabel }: CopyTextButtonProps) {
  const [status, setStatus] = useState("");

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(copiedLabel);
    } catch {
      setStatus(errorLabel);
    }
  }

  return (
    <span className="copy-text-control">
      <button className="button ghost" type="button" onClick={copyText}>{label}</button>
      <span className="copy-text-status" aria-live="polite">{status}</span>
    </span>
  );
}
