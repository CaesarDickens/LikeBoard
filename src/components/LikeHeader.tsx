import { WalletButton } from "@/components/WalletButton";

export function LikeHeader() {
  return (
    <header className="brand-card sticker-card">
      <div>
        <p className="brand-kicker">Base Mini App</p>
        <h1 className="brand-title">LikeBoard</h1>
        <p className="brand-subtitle">Tap-friendly onchain reaction board.</p>
      </div>
      <WalletButton />
    </header>
  );
}
