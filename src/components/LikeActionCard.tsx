"use client";

import { StatusChip, type StatusTone } from "@/components/StatusChip";

type LikeActionCardProps = {
  disabled: boolean;
  busy: boolean;
  connected: boolean;
  alreadyLiked: boolean;
  onLike: () => void;
  txHash?: string;
  feedback?: string;
  feedbackTone?: StatusTone;
};

export function LikeActionCard({
  disabled,
  busy,
  connected,
  alreadyLiked,
  onLike,
  txHash,
  feedback,
  feedbackTone = "neutral",
}: LikeActionCardProps) {
  const label = !connected
    ? "Connect wallet first"
    : alreadyLiked
      ? "Already liked"
      : busy
        ? "Submitting..."
        : "Like on Base";

  return (
    <section className="sticker-card card-gap">
      <h2 className="section-title">Like Action</h2>
      <button className="pressable like-btn" disabled={disabled} onClick={onLike}>
        {label}
      </button>

      {feedback ? <StatusChip tone={feedbackTone} label={feedback} /> : null}

      {txHash ? (
        <a
          className="tx-link"
          href={`https://basescan.org/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          View tx: {txHash.slice(0, 10)}...{txHash.slice(-6)}
        </a>
      ) : null}
    </section>
  );
}
