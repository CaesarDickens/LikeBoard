import { StatusChip, type StatusTone } from "@/components/StatusChip";

type LikeCountPanelProps = {
  postId: bigint | null;
  likeCount?: bigint;
  liked?: boolean;
  connected: boolean;
  loading: boolean;
};

export function LikeCountPanel({
  postId,
  likeCount,
  liked,
  connected,
  loading,
}: LikeCountPanelProps) {
  const likeValue = postId === null ? "--" : loading ? "..." : (likeCount ?? 0n).toString();

  const likedLabel = !connected
    ? "Connect wallet to check"
    : postId === null
      ? "Enter postId"
      : loading
        ? "Checking..."
        : liked
          ? "Already liked"
          : "Not liked yet";

  const likedTone: StatusTone = !connected
    ? "neutral"
    : liked
      ? "good"
      : "warn";

  return (
    <section className="sticker-card card-gap">
      <h2 className="section-title">Live Onchain Data</h2>
      <div className="metric-card">
        <p className="metric-label">Likes</p>
        <p className="metric-value">{likeValue}</p>
      </div>
      <div className="status-row">
        <span className="status-text">Wallet status</span>
        <StatusChip tone={likedTone} label={likedLabel} />
      </div>
    </section>
  );
}
