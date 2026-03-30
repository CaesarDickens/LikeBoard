"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const coinbaseConnector = connectors.find((connector) =>
    connector.name.toLowerCase().includes("coinbase"),
  );
  const injectedConnector = connectors.find((connector) => connector.id === "injected");

  if (isConnected && address) {
    return (
      <button className="pressable wallet-btn" onClick={() => disconnect()}>
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <div className="wallet-group">
      <button
        className="pressable wallet-btn"
        disabled={isPending || !coinbaseConnector}
        onClick={() => coinbaseConnector && connect({ connector: coinbaseConnector })}
      >
        {isPending ? "Connecting..." : "Coinbase Wallet"}
      </button>
      <button
        className="pressable wallet-btn alt"
        disabled={isPending || !injectedConnector}
        onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      >
        Browser Wallet
      </button>
    </div>
  );
}
