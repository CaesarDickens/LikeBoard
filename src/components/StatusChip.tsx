export type StatusTone = "neutral" | "good" | "warn" | "bad";

type StatusChipProps = {
  label: string;
  tone?: StatusTone;
};

export function StatusChip({ label, tone = "neutral" }: StatusChipProps) {
  return <span className={`status-chip ${tone}`}>{label}</span>;
}
